'use client';

import Link from 'next/link';
import { useState } from 'react';
import { scrubClaim, type ScrubResponse, type ScrubFinding } from '@/lib/api';
import { CheckIcon, CopyIcon, TrashIcon, XIcon } from './icons';

const LETTERS = 'ABCDEFGHIJKL'.split('');
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;
type Line = { cpt: string; mods: string[]; units: string; ptrs: string };
const emptyLine = (): Line => ({ cpt: '', mods: ['', '', '', ''], units: '1', ptrs: 'A' });

const EXAMPLES: { name: string; dx: string[]; lines: Line[] }[] = [
  {
    name: 'E/M + joint injection',
    dx: ['M17.11'],
    lines: [
      { cpt: '99213', mods: ['', '', '', ''], units: '1', ptrs: 'A' },
      { cpt: '20610', mods: ['LT', '', '', ''], units: '1', ptrs: 'A' },
    ],
  },
  {
    name: 'Debridement + wound care',
    dx: ['L97.212', 'E11.622'],
    lines: [
      { cpt: '11042', mods: ['', '', '', ''], units: '1', ptrs: 'AB' },
      { cpt: '97597', mods: ['', '', '', ''], units: '1', ptrs: 'A' },
    ],
  },
  {
    name: 'Therapy units',
    dx: ['M54.50'],
    lines: [
      { cpt: '97110', mods: ['GP', '', '', ''], units: '4', ptrs: 'A' },
      { cpt: '97140', mods: ['GP', '59', '', ''], units: '2', ptrs: 'A' },
    ],
  },
];

const SEV: Record<ScrubFinding['severity'], { label: string; cls: string; dot: string }> = {
  error: { label: 'Error', cls: 'border-rose-200 bg-rose-50', dot: 'bg-danger' },
  warning: { label: 'Warning', cls: 'border-amber-200 bg-amber-50', dot: 'bg-amber-500' },
  info: { label: 'Note', cls: 'border-sky-200 bg-sky-50', dot: 'bg-sky-500' },
  pass: { label: 'OK', cls: 'border-emerald-200 bg-emerald-50', dot: 'bg-ok' },
};

const RULE_LABEL: Record<string, string> = {
  ptp: 'NCCI pair edit', mue: 'MUE units', modifier: 'Modifier', diagnosis: 'Diagnosis', format: 'Code format', duplicate: 'Duplicate', em: 'E/M rule',
};

export default function ClaimScrubber() {
  const [dos, setDos] = useState(() => new Date().toISOString().slice(0, 10));
  const [dx, setDx] = useState<string[]>(['', '', '', '']);
  const [lines, setLines] = useState<Line[]>([emptyLine()]);
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [result, setResult] = useState<ScrubResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const setLine = (i: number, patch: Partial<Line>) => setLines((ls) => ls.map((l, j) => (j === i ? { ...l, ...patch } : l)));
  const setMod = (i: number, k: number, v: string) => setLines((ls) => ls.map((l, j) => (j === i ? { ...l, mods: l.mods.map((m, n) => (n === k ? v : m)) } : l)));

  const loadExample = (e: (typeof EXAMPLES)[number]) => {
    const d = [...e.dx]; while (d.length < 4) d.push('');
    setDx(d); setLines(e.lines.map((l) => ({ ...l, mods: [...l.mods] }))); setResult(null); setState('idle');
  };
  const reset = () => { setDx(['', '', '', '']); setLines([emptyLine()]); setResult(null); setState('idle'); };

  async function run(e?: React.FormEvent) {
    e?.preventDefault();
    setState('loading');
    try {
      const r = await scrubClaim({
        dos,
        diagnoses: dx.map((d) => d.trim()).filter(Boolean),
        lines: lines.filter((l) => l.cpt.trim()).map((l) => ({
          cpt: l.cpt.trim(),
          modifiers: l.mods.map((m) => m.trim()).filter(Boolean),
          units: parseInt(l.units, 10) || 1,
          dxPointers: l.ptrs.toUpperCase().replace(/[^A-L]/g, '').split(''),
        })),
      });
      setResult(r); setState('done');
      setTimeout(() => document.getElementById('scrub-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    } catch {
      setState('error');
    }
  }

  const summaryText = () =>
    result
      ? [`Claim check (DOS ${dos}) — ${result.counts.error} errors, ${result.counts.warning} warnings`,
         ...result.findings.filter((f) => f.severity !== 'pass').map((f) => `[${SEV[f.severity].label}]${f.line ? ` Line ${f.line}` : ''} ${f.message}${f.fix ? ` → ${f.fix}` : ''}`)].join('\n')
      : '';

  const usedDx = dx.filter((d) => d.trim()).length;

  return (
    <div className="space-y-6">
      <form onSubmit={run} className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-ink-3">Try an example:</span>
          {EXAMPLES.map((e) => (
            <button key={e.name} type="button" onClick={() => loadExample(e)} className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink-2 hover:border-brand hover:text-brand-ink">{e.name}</button>
          ))}
          <button type="button" onClick={reset} className="ml-auto text-xs text-ink-3 hover:text-ink">Clear</button>
        </div>

        {/* Diagnoses */}
        <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-semibold text-ink">1 · Diagnoses (Box 21)</h2>
              <p className="text-sm text-ink-3">ICD-10-CM codes in claim order. Letters are used as pointers on each line.</p>
            </div>
            <label className="block">
              <span className="field-label">Date of service</span>
              <input type="date" className="field !w-44" value={dos} onChange={(e) => setDos(e.target.value)} />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {dx.map((d, i) => (
              <label key={i} className="flex items-center gap-2">
                <span className="w-5 shrink-0 text-center text-sm font-bold text-brand">{LETTERS[i]}</span>
                <input className="field font-mono uppercase" value={d} placeholder={i === 0 ? 'E11.9' : ''} onChange={(e) => setDx(dx.map((x, j) => (j === i ? e.target.value.toUpperCase() : x)))} aria-label={`Diagnosis ${LETTERS[i]}`} />
              </label>
            ))}
          </div>
          {dx.length < 12 && (
            <button type="button" onClick={() => setDx([...dx, ...Array(Math.min(4, 12 - dx.length)).fill('')])} className="mt-3 text-sm font-semibold text-brand-ink hover:underline">+ More diagnoses (up to 12)</button>
          )}
        </section>

        {/* Lines */}
        <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
          <div className="mb-4">
            <h2 className="font-semibold text-ink">2 · Service lines (Box 24)</h2>
            <p className="text-sm text-ink-3">CPT/HCPCS, up to 4 modifiers, units, and diagnosis pointers (e.g. “AB”).</p>
          </div>
          <div className="hidden grid-cols-[2rem_7rem_1fr_5rem_6rem_2rem] gap-2 px-1 pb-2 text-xs font-semibold uppercase tracking-wider text-ink-3 md:grid">
            <span>#</span><span>CPT/HCPCS</span><span>Modifiers</span><span>Units</span><span>Dx ptr</span><span />
          </div>
          <div className="space-y-3">
            {lines.map((l, i) => (
              <div key={i} className="grid grid-cols-2 gap-2 rounded-xl border border-line p-3 md:grid-cols-[2rem_7rem_1fr_5rem_6rem_2rem] md:items-center md:border-0 md:p-1">
                <span className="col-span-2 text-sm font-semibold text-ink-3 md:col-span-1">{i + 1}</span>
                <input className="field font-mono uppercase" value={l.cpt} placeholder="99213" maxLength={5} onChange={(e) => setLine(i, { cpt: e.target.value.toUpperCase() })} aria-label={`Line ${i + 1} CPT`} />
                <div className="col-span-2 grid grid-cols-4 gap-1.5 md:col-span-1">
                  {l.mods.map((m, k) => (
                    <input key={k} className="field !px-2 text-center font-mono uppercase" value={m} maxLength={2} placeholder="—" onChange={(e) => setMod(i, k, e.target.value.toUpperCase())} aria-label={`Line ${i + 1} modifier ${k + 1}`} />
                  ))}
                </div>
                <input className="field" inputMode="numeric" value={l.units} onChange={(e) => setLine(i, { units: e.target.value.replace(/\D/g, '') })} aria-label={`Line ${i + 1} units`} />
                <input className="field font-mono uppercase" value={l.ptrs} maxLength={4} placeholder="A" onChange={(e) => setLine(i, { ptrs: e.target.value.toUpperCase().replace(/[^A-L]/g, '') })} aria-label={`Line ${i + 1} diagnosis pointers`} />
                <button type="button" onClick={() => setLines(lines.length > 1 ? lines.filter((_, j) => j !== i) : [emptyLine()])} className="justify-self-end rounded-md p-1.5 text-ink-3 hover:bg-danger-soft hover:text-danger" aria-label={`Remove line ${i + 1}`}>
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          {lines.length < 12 && (
            <button type="button" onClick={() => setLines([...lines, emptyLine()])} className="mt-3 text-sm font-semibold text-brand-ink hover:underline">+ Add service line</button>
          )}
        </section>

        <button type="submit" disabled={state === 'loading' || !usedDx && !lines.some((l) => l.cpt)} className="w-full rounded-xl bg-brand px-5 py-3.5 font-semibold text-white shadow-sm hover:bg-brand-hover disabled:opacity-60">
          {state === 'loading' ? 'Checking claim…' : 'Check claim'}
        </button>
        {state === 'error' && <p role="alert" className="rounded-lg bg-danger-soft px-3 py-2.5 text-sm text-danger">The check couldn’t run right now. Please try again in a moment.</p>}
      </form>

      {/* Results */}
      {result && (
        <section id="scrub-results" className="scroll-mt-24 space-y-4" aria-live="polite">
          <div className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5 ${result.status === 'errors' ? 'bg-rose-50 border border-rose-200' : result.status === 'warnings' ? 'bg-amber-50 border border-amber-200' : 'bg-emerald-50 border border-emerald-200'}`}>
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${result.status === 'errors' ? 'bg-danger' : result.status === 'warnings' ? 'bg-amber-500' : 'bg-ok'}`}>
                {result.status === 'clean' ? <CheckIcon className="h-5 w-5" /> : result.status === 'errors' ? <XIcon className="h-5 w-5" /> : <span className="font-bold">!</span>}
              </span>
              <div>
                <p className="font-semibold text-ink">
                  {result.status === 'clean' ? 'No issues found' : result.status === 'errors' ? 'Likely to be denied as entered' : 'Review before submitting'}
                </p>
                <p className="text-sm text-ink-2">{plural(result.counts.error, 'error')} · {plural(result.counts.warning, 'warning')} · {plural(result.counts.pass, 'edit')} passed</p>
              </div>
            </div>
            <button type="button" onClick={() => navigator.clipboard?.writeText(summaryText()).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); })} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-sm font-semibold text-ink-2 hover:border-brand">
              {copied ? <CheckIcon className="h-4 w-4 text-ok" /> : <CopyIcon className="h-4 w-4" />} Copy results
            </button>
          </div>

          {result.findings.length > 0 && (
            <ul className="space-y-2">
              {result.findings.map((f, i) => (
                <li key={i} className={`rounded-xl border p-4 ${SEV[f.severity].cls}`}>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <span className={`h-2 w-2 rounded-full ${SEV[f.severity].dot}`} />
                    <span className="text-ink">{SEV[f.severity].label}</span>
                    <span className="text-ink-3">· {RULE_LABEL[f.rule] || f.rule}</span>
                    {f.line && <span className="text-ink-3">· Line {f.line}</span>}
                    {f.code && <span className="rounded bg-white/70 px-1.5 font-mono text-ink-2">{f.code}</span>}
                  </div>
                  <p className="mt-1.5 text-[0.95rem] text-ink">{f.message}</p>
                  {f.fix && <p className="mt-1 text-sm text-ink-2"><span className="font-semibold">Fix: </span>{f.fix}</p>}
                </li>
              ))}
            </ul>
          )}

          {result.diagnoses.length > 0 && (
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="mb-3 text-sm font-semibold text-ink">Diagnoses on this claim</p>
              <ul className="space-y-1.5 text-sm">
                {result.diagnoses.map((d) => (
                  <li key={d.letter} className="flex gap-3">
                    <span className="w-4 font-bold text-brand">{d.letter}</span>
                    <span className={`w-20 font-mono font-semibold ${d.valid ? 'text-ink' : 'text-danger line-through'}`}>{d.code}</span>
                    <span className="text-ink-2">{d.description || (d.valid ? '' : 'Not a billable ICD-10-CM code')}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-xs text-ink-3">
            Checked against {result.data.ptp ? `CMS NCCI practitioner PTP edits (${result.data.ptpVersion})` : 'code-format and modifier rules only (NCCI data loading)'}
            {result.data.mue ? ` and MUEs (${result.data.mueVersion})` : ''}. Medicare rules; commercial payers may differ. Diagnosis-to-procedure coverage (LCD/NCD) is not yet checked.
          </p>

          {result.status !== 'clean' && (
            <div className="flex flex-col gap-3 rounded-2xl bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold">Seeing these edits on your claims every week?</p>
              <Link href="/audit" className="rounded-xl bg-white px-4 py-2.5 text-center text-sm font-semibold text-navy hover:bg-brand-soft">Get a free denial audit</Link>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
