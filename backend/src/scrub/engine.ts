import {
  CPT_RE, HCPCS_RE, ICD_RE, MODIFIERS, NCCI_BYPASS, EM_ONLY, PROCEDURE_ONLY,
  normCode, normIcd, isEM, isSurgery, isLab, isNewPatientEM, isEstablishedEM,
} from './codes';
import type { ScrubStore, PtpEdit } from './store';
import type { IcdLookup } from './icd';

export type Severity = 'error' | 'warning' | 'info' | 'pass';

export interface Finding {
  severity: Severity;
  rule: 'format' | 'ptp' | 'mue' | 'modifier' | 'diagnosis' | 'duplicate' | 'em';
  line?: number; // 1-based service line, undefined = claim level
  code?: string;
  message: string;
  fix?: string;
}

export interface ScrubLineInput {
  cpt: string;
  modifiers?: string[];
  units?: number;
  dxPointers?: string[]; // letters A–L pointing into the claim's diagnosis list
}

export interface ScrubInput {
  dos?: string; // yyyy-mm-dd
  diagnoses: string[]; // up to 12, in order A–L
  lines: ScrubLineInput[];
}

export interface ScrubResult {
  status: 'clean' | 'warnings' | 'errors';
  counts: Record<Severity, number>;
  findings: Finding[];
  diagnoses: { letter: string; code: string; valid: boolean; description?: string }[];
  data: { ptp: boolean; mue: boolean; ptpVersion?: string; mueVersion?: string };
}

const LETTERS = 'ABCDEFGHIJKL'.split('');
const toYmd = (d?: string) => {
  const s = (d || new Date().toISOString().slice(0, 10)).replace(/-/g, '');
  return /^\d{8}$/.test(s) ? parseInt(s, 10) : parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''), 10);
};
const activeOn = (e: PtpEdit, ymd: number) => e.eff <= ymd && (e.del === 0 || e.del > ymd);

export async function scrubClaim(input: ScrubInput, store: ScrubStore, icdLookup: IcdLookup): Promise<ScrubResult> {
  const findings: Finding[] = [];
  const add = (f: Finding) => findings.push(f);
  const ymd = toYmd(input.dos);

  // ── Normalize ─────────────────────────────────────────────────────────────
  const dx = (input.diagnoses || []).map(normIcd).filter(Boolean).slice(0, 12);
  const lines = (input.lines || [])
    .map((l) => ({
      cpt: normCode(l.cpt),
      mods: (l.modifiers || []).map(normCode).filter(Boolean).slice(0, 4),
      units: Math.max(1, Math.floor(Number(l.units) || 1)),
      ptrs: (l.dxPointers || []).map((p) => normCode(p)).filter(Boolean).slice(0, 4),
    }))
    .filter((l) => l.cpt);

  if (!lines.length) add({ severity: 'error', rule: 'format', message: 'Add at least one service line (CPT/HCPCS code).' });
  if (!dx.length) add({ severity: 'error', rule: 'diagnosis', message: 'No diagnosis codes entered. Every claim needs at least one ICD-10-CM code.' });

  // ── Diagnoses ────────────────────────────────────────────────────────────
  const dxInfo = dx.length ? await icdLookup(dx.filter((c) => ICD_RE.test(c.replace('.', '')))) : {};
  const dxOut = dx.map((code, i) => {
    const letter = LETTERS[i];
    if (!ICD_RE.test(code.replace('.', ''))) {
      add({ severity: 'error', rule: 'diagnosis', code, message: `Dx ${letter} "${code}" is not a valid ICD-10-CM format.`, fix: 'ICD-10-CM codes start with a letter followed by 2 digits, e.g. E11.9.' });
      return { letter, code, valid: false };
    }
    const info = dxInfo[code];
    if (info?.unknown) {
      add({ severity: 'info', rule: 'diagnosis', code, message: `Dx ${letter} ${code}: could not be verified right now (ICD service unavailable).` });
      return { letter, code, valid: true };
    }
    if (!info?.found) {
      add({
        severity: 'error', rule: 'diagnosis', code,
        message: `Dx ${letter} ${code} is not a billable ICD-10-CM code.`,
        fix: 'It may be a category/header code that needs more characters, or it may not exist. Look it up in the ICD-10 search.',
      });
      return { letter, code, valid: false };
    }
    return { letter, code, valid: true, description: info.description };
  });

  const first = dx[0];
  if (first && /^[V-Y]/.test(first)) {
    add({ severity: 'error', rule: 'diagnosis', code: first, message: `External cause code ${first} cannot be the first-listed diagnosis.`, fix: 'List the injury or condition first; external cause codes (V00–Y99) are secondary only.' });
  }
  const seenDx = new Set<string>();
  dx.forEach((c) => { if (seenDx.has(c)) add({ severity: 'warning', rule: 'diagnosis', code: c, message: `Diagnosis ${c} is listed more than once.` }); seenDx.add(c); });

  const descOf = (letter: string) => dxOut.find((d) => d.letter === letter)?.description?.toLowerCase() || '';

  // ── Line-level checks ─────────────────────────────────────────────────────
  lines.forEach((l, idx) => {
    const n = idx + 1;
    const c = l.cpt;

    if (!CPT_RE.test(c) && !HCPCS_RE.test(c)) {
      add({ severity: 'error', rule: 'format', line: n, code: c, message: `"${c}" is not a valid CPT or HCPCS code format.`, fix: 'CPT: 5 digits (or 4 digits + F/T/U). HCPCS Level II: a letter + 4 digits, e.g. J1100.' });
    }

    // Dx pointers
    if (!l.ptrs.length) {
      if (dx.length) add({ severity: 'error', rule: 'diagnosis', line: n, code: c, message: `Line ${n} (${c}) has no diagnosis pointer.`, fix: 'Point each service to at least one diagnosis (A–L).' });
    } else {
      l.ptrs.forEach((p) => {
        const i = LETTERS.indexOf(p);
        if (i < 0 || i >= dx.length) add({ severity: 'error', rule: 'diagnosis', line: n, code: c, message: `Line ${n} points to Dx "${p}", which isn't on the claim.` });
      });
      if (new Set(l.ptrs).size !== l.ptrs.length) add({ severity: 'warning', rule: 'diagnosis', line: n, code: c, message: `Line ${n} repeats the same diagnosis pointer.` });
    }

    // Modifiers
    const m = new Set(l.mods);
    if (m.size !== l.mods.length) add({ severity: 'warning', rule: 'modifier', line: n, code: c, message: `Line ${n} has a duplicate modifier.` });
    l.mods.forEach((mod) => {
      if (!MODIFIERS[mod]) add({ severity: 'warning', rule: 'modifier', line: n, code: c, message: `Modifier ${mod} isn't in our reference list — confirm it's valid for this payer.` });
      if (EM_ONLY.has(mod) && !isEM(c)) add({ severity: 'error', rule: 'modifier', line: n, code: c, message: `Modifier ${mod} is for E/M services only, but ${c} is not an E/M code.` });
      if (PROCEDURE_ONLY.has(mod) && isEM(c)) add({ severity: 'error', rule: 'modifier', line: n, code: c, message: `Modifier ${mod} is for procedures, not E/M code ${c}.` });
      if (mod === '91' && !isLab(c)) add({ severity: 'warning', rule: 'modifier', line: n, code: c, message: `Modifier 91 (repeat lab test) is used on ${c}, which is not a lab code.` });
      if ((mod === 'GZ' || mod === 'GY')) add({ severity: 'info', rule: 'modifier', line: n, code: c, message: `Modifier ${mod} signals an expected denial — make sure that's intended.` });
    });
    if (m.has('26') && m.has('TC')) add({ severity: 'error', rule: 'modifier', line: n, code: c, message: `Line ${n} has both 26 and TC. Bill the global service with neither, or split into two lines.` });
    if (m.has('59') && ['XE', 'XS', 'XP', 'XU'].some((x) => m.has(x))) add({ severity: 'warning', rule: 'modifier', line: n, code: c, message: `Don't report 59 together with an X{EPSU} modifier on the same line — use one.` });
    if (m.has('RT') && m.has('LT')) add({ severity: 'warning', rule: 'modifier', line: n, code: c, message: `Line ${n} has both RT and LT. For a bilateral procedure most payers want modifier 50 (or two lines, RT and LT).` });
    if (m.has('50') && (m.has('RT') || m.has('LT'))) add({ severity: 'warning', rule: 'modifier', line: n, code: c, message: `Modifier 50 (bilateral) shouldn't be combined with RT/LT.` });
    if (m.has('50') && l.units > 1) add({ severity: 'warning', rule: 'modifier', line: n, code: c, message: `With modifier 50, Medicare expects 1 unit (the bilateral payment is applied automatically).` });

    // Laterality vs diagnosis wording
    const side = m.has('RT') && !m.has('LT') ? 'right' : m.has('LT') && !m.has('RT') ? 'left' : '';
    if (side && l.ptrs.length) {
      const other = side === 'right' ? 'left' : 'right';
      const descs = l.ptrs.map(descOf).filter(Boolean);
      if (descs.length && descs.every((d) => d.includes(other) && !d.includes(side) && !d.includes('bilateral'))) {
        add({ severity: 'error', rule: 'modifier', line: n, code: c, message: `Line ${n} is billed ${side.toUpperCase() === 'RIGHT' ? 'RT' : 'LT'} (${side}), but the linked diagnosis is for the ${other} side.`, fix: 'Match the laterality modifier to the diagnosis, or correct the diagnosis.' });
      }
    }
  });

  // ── Claim-level combinations ─────────────────────────────────────────────
  const emLines = lines.map((l, i) => ({ l, n: i + 1 })).filter((x) => isEM(x.l.cpt));
  const procLines = lines.map((l, i) => ({ l, n: i + 1 })).filter((x) => isSurgery(x.l.cpt));
  if (emLines.length && procLines.length) {
    emLines.forEach(({ l, n }) => {
      if (!l.mods.includes('25') && !l.mods.includes('57')) {
        add({ severity: 'warning', rule: 'em', line: n, code: l.cpt, message: `E/M ${l.cpt} is billed with a procedure on the same day without modifier 25 (or 57 for a decision for major surgery).`, fix: 'Add 25 only if the E/M was significant and separately identifiable, and documented as such.' });
      }
    });
  }
  if (lines.some((l) => isNewPatientEM(l.cpt)) && lines.some((l) => isEstablishedEM(l.cpt))) {
    add({ severity: 'error', rule: 'em', message: 'Both a new-patient (99202–99205) and an established-patient (99211–99215) office visit are on the same claim.' });
  }
  if (emLines.length > 1) add({ severity: 'warning', rule: 'em', message: 'More than one E/M code on the same date — usually only one is payable per provider per day.' });

  // Duplicates
  const byCode = new Map<string, number[]>();
  lines.forEach((l, i) => byCode.set(l.cpt, [...(byCode.get(l.cpt) || []), i + 1]));
  byCode.forEach((ns, code) => {
    if (ns.length < 2) return;
    const later = ns.slice(1).map((n) => lines[n - 1]);
    const justified = later.every((l) => l.mods.some((x) => ['76', '77', '91', '59', 'XE', 'XS', 'XP', 'XU', 'RT', 'LT'].includes(x)));
    if (!justified) add({ severity: 'warning', rule: 'duplicate', code, message: `${code} appears on lines ${ns.join(', ')}. Combine units on one line, or add 76/77/91/59/RT/LT to show why it's repeated.` });
  });

  // ── NCCI PTP ─────────────────────────────────────────────────────────────
  const meta = await store.meta().catch(() => null);
  const hasPtp = Boolean(meta?.ptpVersion);
  const hasMue = Boolean(meta?.mueVersion);
  const uniqueCodes = Array.from(new Set(lines.map((l) => l.cpt)));

  if (hasPtp && uniqueCodes.length > 1) {
    const ptpByCol1: Record<string, PtpEdit[]> = {};
    await Promise.all(uniqueCodes.map(async (c) => { ptpByCol1[c] = await store.getPtp(c); }));
    const reported = new Set<string>();
    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines.length; j++) {
        if (i === j) continue;
        const a = lines[i], b = lines[j];
        if (a.cpt === b.cpt) continue;
        const edit = ptpByCol1[a.cpt]?.find((e) => e.col2 === b.cpt && activeOn(e, ymd));
        if (!edit || edit.mi === '9') continue;
        const key = `${a.cpt}>${b.cpt}`;
        if (reported.has(key)) continue;
        reported.add(key);
        const bypass = b.mods.filter((x) => NCCI_BYPASS.has(x));
        const bypassA = a.mods.filter((x) => NCCI_BYPASS.has(x));
        if (edit.mi === '0') {
          add({ severity: 'error', rule: 'ptp', line: j + 1, code: b.cpt, message: `NCCI edit: ${b.cpt} is bundled into ${a.cpt} and can never be paid separately with it (modifier indicator 0).`, fix: `Remove ${b.cpt}, or bill only the column-one code ${a.cpt}.` });
        } else if (bypass.length) {
          const sameSide = (['RT', 'LT'].some((s) => bypass.includes(s) && bypassA.includes(s)));
          if (sameSide) add({ severity: 'warning', rule: 'ptp', line: j + 1, code: b.cpt, message: `NCCI edit ${a.cpt} / ${b.cpt}: both lines use the same side (${bypass.join(', ')}), so the laterality modifier doesn't show they're distinct.` });
          else add({ severity: 'pass', rule: 'ptp', line: j + 1, code: b.cpt, message: `NCCI edit ${a.cpt} / ${b.cpt} is bypassed by modifier ${bypass.join(', ')}. Make sure documentation supports a distinct service.` });
        } else {
          add({ severity: 'error', rule: 'ptp', line: j + 1, code: b.cpt, message: `NCCI edit: ${b.cpt} is bundled into ${a.cpt} (modifier indicator 1).`, fix: `If ${b.cpt} was truly distinct (different site, session, or encounter), add 59 or XE/XS/XP/XU to line ${j + 1}. Otherwise remove it.` });
        }
      }
    }
  }

  // ── MUE ──────────────────────────────────────────────────────────────────
  if (hasMue) {
    const totals = new Map<string, number>();
    lines.forEach((l) => totals.set(l.cpt, (totals.get(l.cpt) || 0) + l.units));
    await Promise.all(
      Array.from(totals.entries()).map(async ([code, total]) => {
        const e = await store.getMue(code);
        if (!e || !(e.mue >= 0)) return;
        const lineMax = Math.max(...lines.filter((l) => l.cpt === code).map((l) => l.units));
        const kind = e.mai === '1' ? 'per line' : 'per day';
        const units = e.mai === '1' ? lineMax : total;
        if (units > e.mue) {
          add({
            severity: e.mai === '2' ? 'error' : 'warning', rule: 'mue', code,
            message: `MUE: ${code} is billed with ${units} units; the CMS limit is ${e.mue} ${kind}${e.mai === '2' ? ' and cannot be exceeded' : ''}.`,
            fix: e.mai === '1' ? 'Units above the limit may be billed on a separate line with an appropriate modifier (e.g. 76, 91, 59/X{EPSU}) if documented.' : e.mai === '2' ? 'This is an absolute limit — reduce units.' : 'Units above the limit require clear documentation of medical necessity; expect a denial or appeal.',
          });
        }
      }),
    );
  }

  if (!hasPtp || !hasMue) {
    add({ severity: 'info', rule: 'ptp', message: `${!hasPtp ? 'NCCI procedure-pair' : ''}${!hasPtp && !hasMue ? ' and ' : ''}${!hasMue ? 'MUE units' : ''} data isn't loaded yet, so those checks were skipped.` });
  }

  const counts: Record<Severity, number> = { error: 0, warning: 0, info: 0, pass: 0 };
  findings.forEach((f) => counts[f.severity]++);
  const order: Record<Severity, number> = { error: 0, warning: 1, info: 2, pass: 3 };
  findings.sort((a, b) => order[a.severity] - order[b.severity] || (a.line || 0) - (b.line || 0));

  return {
    status: counts.error ? 'errors' : counts.warning ? 'warnings' : 'clean',
    counts,
    findings,
    diagnoses: dxOut,
    data: { ptp: hasPtp, mue: hasMue, ptpVersion: meta?.ptpVersion, mueVersion: meta?.mueVersion },
  };
}
