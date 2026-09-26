// Parsers for the CMS NCCI data files (practitioner PTP edits and practitioner MUEs).
// Formats are detected loosely because CMS occasionally tweaks headers between quarters.

import type { PtpEdit } from '../src/scrub/store';

const CODE = /^([0-9]{4}[0-9FTU]|[A-V][0-9]{4})$/;

function splitRow(line: string): string[] {
  if (line.includes('\t')) return line.split('\t').map((s) => s.trim());
  // CSV with optional quotes
  const out: string[] = [];
  let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { if (q && line[i + 1] === '"') { cur += '"'; i++; } else q = !q; }
    else if (ch === ',' && !q) { out.push(cur.trim()); cur = ''; }
    else cur += ch;
  }
  out.push(cur.trim());
  return out;
}

/**
 * PTP rows: Column1, Column2, *(pre-1996), Effective (yyyymmdd), Deletion (yyyymmdd or *), Modifier indicator, Rationale
 * Returns edits grouped by column-one code.
 */
export function parsePtp(text: string, keepDeletedAfter = 0): Map<string, PtpEdit[]> {
  const out = new Map<string, PtpEdit[]>();
  for (const raw of text.split(/\r?\n/)) {
    const c = splitRow(raw);
    if (c.length < 6) continue;
    const col1 = c[0].toUpperCase(), col2 = c[1].toUpperCase();
    if (!CODE.test(col1) || !CODE.test(col2)) continue;
    // Find the two date columns and the modifier indicator after them.
    const rest = c.slice(2);
    const dateIdx = rest.findIndex((x) => /^\d{8}$/.test(x));
    if (dateIdx < 0) continue;
    const eff = parseInt(rest[dateIdx], 10);
    const delRaw = rest[dateIdx + 1] || '*';
    const del = /^\d{8}$/.test(delRaw) ? parseInt(delRaw, 10) : 0;
    const mi = (rest[dateIdx + 2] || '').charAt(0);
    if (!['0', '1', '9'].includes(mi)) continue;
    if (del && del < keepDeletedAfter) continue;
    const arr = out.get(col1) || [];
    arr.push({ col2, mi: mi as PtpEdit['mi'], eff, del });
    out.set(col1, arr);
  }
  return out;
}

export interface MueRow { code: string; mue: number; mai: string; rationale: string }

/** MUE rows: HCPCS/CPT Code, MUE value, MAI ("1 Line Edit" / "2 Date of Service Edit: Policy" / "3 ..."), Rationale */
export function parseMue(text: string): MueRow[] {
  const out: MueRow[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const c = splitRow(raw);
    if (c.length < 3) continue;
    const code = c[0].toUpperCase();
    if (!CODE.test(code) || !/^\d+$/.test(c[1])) continue;
    const mai = (c[2].match(/[123]/) || [''])[0];
    out.push({ code, mue: parseInt(c[1], 10), mai, rationale: (c[3] || '').slice(0, 80) });
  }
  return out;
}

/** Pick the newest set of zip links matching a filter, by the year/quarter found in the URL. */
export function pickLatest(urls: string[], match: RegExp): string[] {
  const m = urls.filter((u) => match.test(u));
  const key = (u: string) => {
    const s = u.toLowerCase();
    const a = s.match(/(20\d\d)[-_]?q([1-4])/) || s.match(/q([1-4])[-_]?(20\d\d)/);
    if (!a) return 0;
    return s.match(/(20\d\d)[-_]?q([1-4])/) ? parseInt(a[1]) * 10 + parseInt(a[2]) : parseInt(a[2]) * 10 + parseInt(a[1]);
  };
  const best = Math.max(0, ...m.map(key));
  return m.filter((u) => key(u) === best);
}

export function zipLinks(html: string, base: string): string[] {
  const out = new Set<string>();
  for (const mm of html.matchAll(/href="([^"]+\.zip)"/gi)) {
    try { out.add(new URL(mm[1], base).toString()); } catch { /* skip */ }
  }
  return Array.from(out);
}
