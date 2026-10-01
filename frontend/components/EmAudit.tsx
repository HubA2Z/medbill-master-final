'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { cx } from './ui';
import { CheckIcon, CopyIcon } from './icons';

/* ---------- Rules (2021+ office/outpatient E/M framework, current for 2026) ---------- */

type Lvl = 0 | 1 | 2 | 3; // 0 straightforward, 1 low, 2 moderate, 3 high
const LVL_NAME = ['Straightforward', 'Low', 'Moderate', 'High'];
const NEW = ['99202', '99203', '99204', '99205'];
const EST = ['99212', '99213', '99214', '99215'];
const TIME_NEW = [15, 30, 45, 60];
const TIME_EST = [10, 20, 30, 40];

const PROBLEMS: { v: Lvl; label: string; ex: string }[] = [
  { v: 0, label: 'Minimal', ex: '1 self-limited or minor problem' },
  { v: 1, label: 'Low', ex: '2+ minor problems; 1 stable chronic illness; 1 acute uncomplicated illness or injury; 1 stable acute illness' },
  { v: 2, label: 'Moderate', ex: '1+ chronic illness with exacerbation, progression or side effects; 2+ stable chronic illnesses; 1 undiagnosed new problem with uncertain prognosis; 1 acute illness with systemic symptoms; 1 acute complicated injury' },
  { v: 3, label: 'High', ex: '1+ chronic illness with severe exacerbation, progression or side effects; 1 acute or chronic illness or injury that poses a threat to life or bodily function' },
];

const RISK: { v: Lvl; label: string; ex: string }[] = [
  { v: 0, label: 'Minimal', ex: 'e.g. rest, gargles, bandages, OTC advice' },
  { v: 1, label: 'Low', ex: 'e.g. OTC drug management, minor surgery without risk factors, PT/OT' },
  { v: 2, label: 'Moderate', ex: 'e.g. prescription drug management; minor surgery with risk factors; elective major surgery without risk factors; care significantly limited by social determinants of health' },
  { v: 3, label: 'High', ex: 'e.g. drug therapy needing intensive toxicity monitoring; elective major surgery with risk factors; emergency major surgery; decision about hospitalization or escalation; DNR / de-escalation due to poor prognosis; parenteral controlled substances' },
];

type Data = { notes: number; results: number; orders: number; historian: boolean; interp: boolean; discuss: boolean };

function dataLevel(d: Data): { lvl: Lvl; why: string } {
  const c1 = d.notes + d.results + d.orders;
  const catA = c1 + (d.historian ? 1 : 0) >= 3;
  const cats = (catA ? 1 : 0) + (d.interp ? 1 : 0) + (d.discuss ? 1 : 0);
  if (cats >= 2) return { lvl: 3, why: '2 of 3 data categories met' };
  if (cats >= 1) return { lvl: 2, why: catA ? '3+ items from notes/results/orders/historian' : d.interp ? 'independent interpretation of a test' : 'discussion with an external physician/QHP/appropriate source' };
  if (c1 >= 2 || d.historian) return { lvl: 1, why: d.historian ? 'independent historian' : '2 items from notes/results/orders' };
  return { lvl: 0, why: 'minimal or no data' };
}

const median3 = (a: Lvl, b: Lvl, c: Lvl) => [a, b, c].sort((x, y) => x - y)[1] as Lvl;

function timeLevel(isNew: boolean, mins: number): number {
  const t = isNew ? TIME_NEW : TIME_EST;
  let lvl = -1;
  t.forEach((m, i) => { if (mins >= m) lvl = i; });
  return lvl;
}

function prolonged(isNew: boolean, mins: number, medicare: boolean): { code: string; units: number; first: number } | null {
  if (medicare) {
    const first = isNew ? 89 : 69;
    if (mins < first) return { code: 'G2212', units: 0, first };
    return { code: 'G2212', units: Math.floor((mins - (first - 15)) / 15), first };
  }
  const first = isNew ? 75 : 55;
  if (mins < first) return { code: '99417', units: 0, first };
  return { code: '99417', units: Math.floor((mins - (first - 15)) / 15), first };
}

/* ---------- UI ---------- */

const Counter = ({ label, hint, value, onChange }: { label: string; hint: string; value: number; onChange: (n: number) => void }) => (
  <div className="flex items-center justify-between gap-3 rounded-xl border border-line p-3">
    <div className="min-w-0">
      <div className="text-sm font-medium text-ink">{label}</div>
      <div className="text-xs text-ink-3">{hint}</div>
    </div>
    <div className="flex shrink-0 items-center gap-1">
      <button type="button" aria-label={`Decrease ${label}`} onClick={() => onChange(Math.max(0, value - 1))} className="h-8 w-8 rounded-lg border border-line text-lg leading-none text-ink-2 hover:border-brand">−</button>
      <span className="w-7 text-center font-mono font-semibold text-ink">{value}</span>
      <button type="button" aria-label={`Increase ${label}`} onClick={() => onChange(Math.min(9, value + 1))} className="h-8 w-8 rounded-lg border border-line text-lg leading-none text-ink-2 hover:border-brand">+</button>
    </div>
  </div>
);

const Toggle = ({ label, hint, checked, onChange }: { label: string; hint?: string; checked: boolean; onChange: (b: boolean) => void }) => (
  <label className={cx('flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors', checked ? 'border-brand bg-brand-soft/50' : 'border-line hover:border-brand/40')}>
    <input type="checkbox" className="mt-0.5 h-4 w-4 accent-brand" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    <span className="min-w-0">
      <span className="block text-sm font-medium text-ink">{label}</span>
      {hint && <span className="block text-xs text-ink-3">{hint}</span>}
    </span>
  </label>
);

function LevelPicker({ title, items, value, onChange }: { title: string; items: { v: Lvl; label: string; ex: string }[]; value: Lvl; onChange: (v: Lvl) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-ink">{title}</legend>
      <div className="grid gap-2">
        {items.map((it) => (
          <label key={it.v} className={cx('flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors', value === it.v ? 'border-brand bg-brand-soft/50' : 'border-line hover:border-brand/40')}>
            <input type="radio" className="mt-1 accent-brand" checked={value === it.v} onChange={() => onChange(it.v)} />
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-ink">{it.label}</span>
              <span className="block text-xs leading-relaxed text-ink-3">{it.ex}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const Section = ({ n, title, sub, children }: { n: number; title: string; sub?: string; children: React.ReactNode }) => (
  <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
    <h2 className="font-semibold text-ink">{n} · {title}</h2>
    {sub && <p className="mb-4 text-sm text-ink-3">{sub}</p>}
    {!sub && <div className="mb-4" />}
    {children}
  </section>
);

type Flag = { tone: 'ok' | 'warn' | 'bad' | 'info'; text: string };
const TONE = {
  ok: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  warn: 'border-amber-200 bg-amber-50 text-amber-900',
  bad: 'border-rose-200 bg-rose-50 text-rose-900',
  info: 'border-sky-200 bg-sky-50 text-sky-900',
};

export default function EmAudit() {
  const [isNew, setIsNew] = useState(false);
  const [payer, setPayer] = useState<'medicare' | 'commercial'>('medicare');
  const [billed, setBilled] = useState('99214');
  const [problems, setProblems] = useState<Lvl>(1);
  const [risk, setRisk] = useState<Lvl>(1);
  const [data, setData] = useState<Data>({ notes: 0, results: 0, orders: 0, historian: false, interp: false, discuss: false });
  const [timeDoc, setTimeDoc] = useState(false);
  const [mins, setMins] = useState('');
  const [mod25, setMod25] = useState(false);
  const [g2211, setG2211] = useState(false);
  const [g2211Exception, setG2211Exception] = useState(false);
  const [newSeen3y, setNewSeen3y] = useState(false);
  const [copied, setCopied] = useState(false);

  const codes = isNew ? NEW : EST;
  const setD = (p: Partial<Data>) => setData((d) => ({ ...d, ...p }));

  const r = useMemo(() => {
    const dl = dataLevel(data);
    const mdm = median3(problems, dl.lvl, risk);
    const m = parseInt(mins, 10);
    const hasTime = timeDoc && !Number.isNaN(m) && m > 0;
    const tl = hasTime ? timeLevel(isNew, m) : -1;
    const best = Math.max(mdm, tl);
    const method = tl > mdm ? 'time' : 'MDM';
    const supported = codes[best];
    const billedIdx = codes.indexOf(billed);
    const flags: Flag[] = [];

    // Verdict
    let verdict: { tone: Flag['tone']; title: string; body: string };
    if (billed === '99211') {
      verdict = { tone: 'info', title: '99211 isn’t scored by MDM or time', body: '99211 is for a visit that may not require a physician or QHP (often nurse visits under incident-to rules). The MDM/time levels below are shown for reference only.' };
    } else if (billedIdx === -1) {
      verdict = { tone: 'warn', title: `${billed} doesn’t match the patient type`, body: `You selected a ${isNew ? 'new' : 'established'} patient, so the billed code should be one of ${codes.join(', ')}.` };
    } else if (billedIdx === best) {
      verdict = { tone: 'ok', title: `${billed} is supported`, body: `Documentation supports ${supported} by ${method}.` };
    } else if (billedIdx > best) {
      verdict = { tone: 'bad', title: `Overcoding risk: ${billed} billed, ${supported} supported`, body: `The note supports ${supported} by ${method}. Billing ${billed} without more documentation is a common audit and downcoding target.` };
    } else {
      verdict = { tone: 'warn', title: `Possible undercoding: ${billed} billed, ${supported} supported`, body: `The note supports ${supported} by ${method}. Consider whether the higher level is appropriate — that’s revenue left on the table.` };
    }

    // Gap analysis toward billed level (if over)
    if (billedIdx > best && billedIdx >= 0) {
      const target = billedIdx as Lvl;
      const gaps: string[] = [];
      if (problems < target) gaps.push(`problems at ${LVL_NAME[target]}`);
      if (dl.lvl < target) gaps.push(`data at ${LVL_NAME[target]}`);
      if (risk < target) gaps.push(`risk at ${LVL_NAME[target]}`);
      const metCount = 3 - gaps.length;
      flags.push({ tone: 'info', text: `To support ${billed} by MDM, 2 of 3 elements must reach ${LVL_NAME[target]}. Currently ${metCount} of 3 do. Missing: ${gaps.join(', ')}.` });
      const need = (isNew ? TIME_NEW : TIME_EST)[target];
      flags.push({ tone: 'info', text: `Or by time: ${billed} needs at least ${need} minutes of total practitioner time on the date of service, with the activities documented.` });
    }

    // Time
    if (timeDoc && !hasTime) flags.push({ tone: 'warn', text: 'Time is selected but no minutes were entered. Time-based billing needs the total minutes in the note.' });
    if (hasTime) {
      flags.push({ tone: 'info', text: `Time supports ${tl >= 0 ? codes[tl] : 'no office E/M level'} (${m} min). Count only the billing practitioner’s time on the date of the encounter — not clinical staff time or separately reported services.` });
      if (best === 3 && tl === 3) {
        const p = prolonged(isNew, m, payer === 'medicare');
        if (p) {
          if (p.units > 0) flags.push({ tone: 'ok', text: `Prolonged service: add ${p.code} × ${p.units} (first unit at ${p.first} min for ${payer === 'medicare' ? 'Medicare' : 'CPT/commercial'}; each additional full 15 min adds a unit).` });
          else flags.push({ tone: 'info', text: `No prolonged service yet: ${p.code} starts at ${p.first} minutes for ${payer === 'medicare' ? 'Medicare' : 'CPT/commercial payers'}.` });
        }
        if (payer === 'medicare') flags.push({ tone: 'info', text: 'Medicare uses G2212, not 99417. Billing 99417 to Medicare is denied.' });
      }
    } else if (best === 3) {
      flags.push({ tone: 'info', text: 'Prolonged services (99417 / G2212) can only be added when the visit is billed by time.' });
    }

    // New vs established
    if (isNew && newSeen3y) flags.push({ tone: 'bad', text: 'Patient was seen by the same specialty in the same group within 3 years, so they are established. Bill 99212–99215 instead.' });

    // G2211
    if (g2211) {
      if (payer !== 'medicare') flags.push({ tone: 'warn', text: 'G2211 is a Medicare add-on. Check whether this commercial or Medicaid payer recognizes it before billing.' });
      else if (mod25 && !g2211Exception) flags.push({ tone: 'bad', text: 'G2211 isn’t payable when the E/M has modifier 25, unless the other same-day service is an annual wellness visit, vaccine administration, or a Medicare Part B preventive service.' });
      else flags.push({ tone: 'ok', text: 'G2211 looks appropriate. Make sure the note shows the ongoing longitudinal relationship (continuing focal point for care, or ongoing care of a single serious or complex condition).' });
    }

    // Modifier 25
    if (mod25) flags.push({ tone: 'info', text: 'Modifier 25: the E/M must be significant and separately identifiable from the procedure’s own pre-procedure evaluation. Score only the extra work when deciding the level.' });

    // Risk note
    if (risk >= 2 && problems === 0) flags.push({ tone: 'warn', text: 'Moderate or high risk with only a minimal problem is unusual and often questioned on audit. Check that the problem is documented accurately.' });

    return { dl, mdm, tl, best, supported, method, verdict, flags, hasTime, m };
  }, [data, problems, risk, mins, timeDoc, isNew, billed, codes, payer, mod25, g2211, g2211Exception, newSeen3y]);

  const summary = () =>
    [
      `E/M audit — ${isNew ? 'New' : 'Established'} patient, ${payer === 'medicare' ? 'Medicare' : 'Commercial'}`,
      `Billed: ${billed}${mod25 ? '-25' : ''}${g2211 ? ' + G2211' : ''}`,
      `MDM: Problems ${LVL_NAME[problems]} · Data ${LVL_NAME[r.dl.lvl]} (${r.dl.why}) · Risk ${LVL_NAME[risk]} → ${LVL_NAME[r.mdm]} (${codes[r.mdm]})`,
      r.hasTime ? `Time: ${r.m} min → ${r.tl >= 0 ? codes[r.tl] : 'below lowest level'}` : 'Time: not used',
      `Supported: ${r.supported} by ${r.method}`,
      `Result: ${r.verdict.title}`,
      ...r.flags.map((f) => `- ${f.text}`),
    ].join('\n');

  const copy = async () => {
    try { await navigator.clipboard.writeText(summary()); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ }
  };

  const reset = () => {
    setProblems(1); setRisk(1); setData({ notes: 0, results: 0, orders: 0, historian: false, interp: false, discuss: false });
    setTimeDoc(false); setMins(''); setMod25(false); setG2211(false); setG2211Exception(false); setNewSeen3y(false);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-6">
        <Section n={1} title="Visit details" sub="Office or other outpatient visit (99202–99215).">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <span className="field-label">Patient type</span>
              <div className="flex rounded-xl border border-line p-1">
                {[['Established', false], ['New', true]].map(([l, v]) => (
                  <button key={String(l)} type="button" onClick={() => { setIsNew(v as boolean); setBilled((v ? NEW : EST)[EST.indexOf(billed) >= 0 ? EST.indexOf(billed) : NEW.indexOf(billed) >= 0 ? NEW.indexOf(billed) : 2]); }}
                    className={cx('flex-1 rounded-lg px-3 py-1.5 text-sm font-medium', isNew === v ? 'bg-brand text-white' : 'text-ink-2 hover:text-ink')}>{l as string}</button>
                ))}
              </div>
            </div>
            <div>
              <span className="field-label">Payer</span>
              <div className="flex rounded-xl border border-line p-1">
                {(['medicare', 'commercial'] as const).map((p) => (
                  <button key={p} type="button" onClick={() => setPayer(p)} className={cx('flex-1 rounded-lg px-3 py-1.5 text-sm font-medium', payer === p ? 'bg-brand text-white' : 'text-ink-2 hover:text-ink')}>{p === 'medicare' ? 'Medicare' : 'Commercial'}</button>
                ))}
              </div>
            </div>
            <label className="block">
              <span className="field-label">Billed code</span>
              <select className="field font-mono" value={billed} onChange={(e) => setBilled(e.target.value)}>
                {(isNew ? NEW : ['99211', ...EST]).map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {isNew && <Toggle label="Seen by same specialty in this group within 3 years" hint="If yes, the patient is established" checked={newSeen3y} onChange={setNewSeen3y} />}
            <Toggle label="Modifier 25 (procedure same day)" checked={mod25} onChange={setMod25} />
            <Toggle label="Billing G2211" hint="Longitudinal care add-on" checked={g2211} onChange={setG2211} />
            {g2211 && mod25 && <Toggle label="Same-day AWV, vaccine admin, or Part B preventive service" hint="The exception that allows G2211 with modifier 25" checked={g2211Exception} onChange={setG2211Exception} />}
          </div>
        </Section>

        <Section n={2} title="Number and complexity of problems addressed" sub="Count only problems addressed at this visit — not every diagnosis on the problem list.">
          <LevelPicker title="Highest level documented" items={PROBLEMS} value={problems} onChange={setProblems} />
        </Section>

        <Section n={3} title="Data reviewed and analyzed" sub="Each unique test counts once. Ordering a test includes reviewing its result — don’t count both.">
          <div className="grid gap-2 sm:grid-cols-2">
            <Counter label="External notes reviewed" hint="Each unique source" value={data.notes} onChange={(n) => setD({ notes: n })} />
            <Counter label="Test results reviewed" hint="Each unique test" value={data.results} onChange={(n) => setD({ results: n })} />
            <Counter label="Tests ordered" hint="Each unique test" value={data.orders} onChange={(n) => setD({ orders: n })} />
            <Toggle label="Independent historian" hint="e.g. parent, caregiver, EMS" checked={data.historian} onChange={(b) => setD({ historian: b })} />
            <Toggle label="Independent interpretation of a test" hint="Performed by another provider, not separately billed" checked={data.interp} onChange={(b) => setD({ interp: b })} />
            <Toggle label="Discussion of management with external physician/QHP" hint="Or appropriate source; not separately billed" checked={data.discuss} onChange={(b) => setD({ discuss: b })} />
          </div>
          <p className="mt-3 text-sm text-ink-2">Data level: <strong>{LVL_NAME[r.dl.lvl]}</strong> <span className="text-ink-3">— {r.dl.why}</span></p>
        </Section>

        <Section n={4} title="Risk of complications from patient management">
          <LevelPicker title="Highest risk documented" items={RISK} value={risk} onChange={setRisk} />
        </Section>

        <Section n={5} title="Total time (optional)" sub="Use when time gives a higher level than MDM. Total practitioner time on the date of the encounter.">
          <div className="flex flex-wrap items-end gap-4">
            <Toggle label="Time is documented in the note" checked={timeDoc} onChange={setTimeDoc} />
            <label className="block">
              <span className="field-label">Total minutes</span>
              <input type="number" min={0} max={600} inputMode="numeric" className="field !w-32" value={mins} disabled={!timeDoc} onChange={(e) => setMins(e.target.value)} placeholder="e.g. 42" />
            </label>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[22rem] text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-ink-3"><tr><th className="py-1.5">Level</th><th>New</th><th>Min</th><th>Est.</th><th>Min</th></tr></thead>
              <tbody className="divide-y divide-line font-mono">
                {[0, 1, 2, 3].map((i) => (
                  <tr key={i}><td className="py-1.5 font-sans text-ink-2">{LVL_NAME[i]}</td><td>{NEW[i]}</td><td>{TIME_NEW[i]}+</td><td>{EST[i]}</td><td>{TIME_EST[i]}+</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>

      {/* Results */}
      <aside className="lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="space-y-4 rounded-2xl border border-line bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-ink">Audit result</h2>
            <button type="button" onClick={reset} className="text-xs text-ink-3 hover:text-ink">Reset</button>
          </div>
          <div className={cx('rounded-xl border p-4', TONE[r.verdict.tone])}>
            <div className="font-semibold">{r.verdict.title}</div>
            <p className="mt-1 text-sm leading-relaxed">{r.verdict.body}</p>
          </div>

          <dl className="grid grid-cols-3 gap-2 text-center">
            {[['Problems', problems], ['Data', r.dl.lvl], ['Risk', risk]].map(([k, v]) => (
              <div key={k as string} className={cx('rounded-xl border p-2', v === r.mdm || (v as number) >= r.mdm ? 'border-brand/40 bg-brand-soft/40' : 'border-line')}>
                <dt className="text-[11px] uppercase tracking-wider text-ink-3">{k as string}</dt>
                <dd className="text-sm font-semibold text-ink">{LVL_NAME[v as number]}</dd>
              </div>
            ))}
          </dl>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-xl bg-bg-soft p-3"><div className="text-xs text-ink-3">By MDM</div><div className="font-mono font-semibold text-ink">{codes[r.mdm]}</div><div className="text-xs text-ink-3">{LVL_NAME[r.mdm]}</div></div>
            <div className="rounded-xl bg-bg-soft p-3"><div className="text-xs text-ink-3">By time</div><div className="font-mono font-semibold text-ink">{r.hasTime ? (r.tl >= 0 ? codes[r.tl] : '—') : '—'}</div><div className="text-xs text-ink-3">{r.hasTime ? `${r.m} min` : 'not used'}</div></div>
          </div>
          <p className="text-xs text-ink-3">MDM level = the level met or exceeded by 2 of the 3 elements.</p>

          {r.flags.length > 0 && (
            <ul className="space-y-2">
              {r.flags.map((f, i) => <li key={i} className={cx('rounded-xl border p-3 text-sm leading-relaxed', TONE[f.tone])}>{f.text}</li>)}
            </ul>
          )}

          <button type="button" onClick={copy} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover">
            {copied ? <><CheckIcon className="h-4 w-4" /> Copied</> : <><CopyIcon className="h-4 w-4" /> Copy audit note</>}
          </button>
          <p className="text-xs text-ink-3">Next: run the codes through the <Link className="font-semibold text-brand-ink hover:underline" href="/claim-scrubber">claim scrubber</Link>.</p>
        </div>
      </aside>
    </div>
  );
}
