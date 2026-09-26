'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { searchIcd, type IcdResult } from '@/lib/api';
import { icdChapter, toCsv, downloadText, safeStorage } from '@/lib/icd';
import { CheckIcon, CopyIcon, DownloadIcon, SearchIcon, TrashIcon, XIcon, ClockIcon } from './icons';

const EXAMPLES = ['Type 2 diabetes', 'Hypertension', 'Anxiety', 'Asthma', 'Low back pain', 'UTI', 'COVID-19', 'E11.9'];
const recentStore = safeStorage<string[]>('enh:icd:recent', []);
const listStore = safeStorage<IcdResult[]>('enh:icd:list', []);

export default function IcdSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IcdResult[]>([]);
  const [lastTerm, setLastTerm] = useState('');
  const [suggestions, setSuggestions] = useState<IcdResult[]>([]);
  const [showDrop, setShowDrop] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [copied, setCopied] = useState<string | null>(null);
  const [recent, setRecent] = useState<string[]>([]);
  const [list, setList] = useState<IcdResult[]>([]);
  const [filter, setFilter] = useState('');

  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestAbort = useRef<AbortController | null>(null);

  // Load saved state + ?q= param on mount
  useEffect(() => {
    setRecent(recentStore.get());
    setList(listStore.get());
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) { setQuery(q); void run(q); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flash = (key: string) => { setCopied(key); setTimeout(() => setCopied(null), 1600); };
  const copy = (text: string, key: string) => { navigator.clipboard?.writeText(text).then(() => flash(key)).catch(() => {}); };

  const run = useCallback(async (term: string) => {
    const t = term.trim();
    if (!t) return;
    setShowDrop(false);
    setActiveIdx(-1);
    setStatus('loading');
    setFilter('');
    try {
      const data = await searchIcd(t, 100);
      setResults(data);
      setLastTerm(t);
      setStatus('done');
      setRecent((r) => { const next = [t, ...r.filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, 8); recentStore.set(next); return next; });
      const url = new URL(window.location.href);
      url.searchParams.set('q', t);
      window.history.replaceState(null, '', url.toString());
    } catch {
      setResults([]);
      setStatus('error');
    }
  }, []);

  // Debounced autocomplete
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) { setSuggestions([]); return; }
    const t = window.setTimeout(async () => {
      suggestAbort.current?.abort();
      const ctrl = new AbortController();
      suggestAbort.current = ctrl;
      try {
        const data = await searchIcd(q, 7, ctrl.signal);
        setSuggestions(data);
        setActiveIdx(-1);
      } catch { /* aborted or failed — ignore */ }
    }, 220);
    return () => window.clearTimeout(t);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => { if (!boxRef.current?.contains(e.target as Node)) setShowDrop(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const pick = (s: IcdResult) => { setQuery(s.code); void run(s.code); };

  const toggleList = (r: IcdResult) => {
    setList((l) => {
      const next = l.some((x) => x.code === r.code) ? l.filter((x) => x.code !== r.code) : [...l, r];
      listStore.set(next);
      return next;
    });
  };
  const clearList = () => { setList([]); listStore.set([]); };
  const clearRecent = () => { setRecent([]); recentStore.set([]); };

  const shown = filter.trim()
    ? results.filter((r) => (r.code + ' ' + r.description).toLowerCase().includes(filter.toLowerCase()))
    : results;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      {/* ── Main column ── */}
      <div className="min-w-0">
        <div ref={boxRef} className="relative">
          <form
            role="search"
            onSubmit={(e) => { e.preventDefault(); if (activeIdx >= 0 && suggestions[activeIdx]) pick(suggestions[activeIdx]); else void run(query); }}
            className="flex items-center gap-2 rounded-2xl border border-line-strong bg-white p-2 shadow-sm focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15"
          >
            <SearchIcon className="ml-2 h-5 w-5 shrink-0 text-ink-3" />
            <label htmlFor="icd-q" className="sr-only">Search ICD-10-CM codes</label>
            <input
              id="icd-q"
              ref={inputRef}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowDrop(true); }}
              onFocus={() => setShowDrop(true)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') { e.preventDefault(); setShowDrop(true); setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1)); }
                else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, -1)); }
                else if (e.key === 'Escape') { setShowDrop(false); }
              }}
              placeholder="Condition, symptom, or code — e.g. “type 2 diabetes” or “J45”"
              className="min-w-0 flex-1 bg-transparent py-2.5 text-base text-ink outline-none placeholder:text-slate-400"
              autoComplete="off"
              role="combobox"
              aria-expanded={showDrop && suggestions.length > 0}
              aria-controls="icd-suggest"
              aria-autocomplete="list"
            />
            {query && (
              <button type="button" onClick={() => { setQuery(''); setSuggestions([]); inputRef.current?.focus(); }} className="rounded-lg p-2 text-ink-3 hover:bg-bg-soft" aria-label="Clear search">
                <XIcon className="h-4 w-4" />
              </button>
            )}
            <button type="submit" className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover">
              Search
            </button>
          </form>

          {showDrop && suggestions.length > 0 && query.trim().length >= 2 && (
            <ul id="icd-suggest" role="listbox" className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-line bg-white shadow-xl">
              {suggestions.map((s, i) => (
                <li key={`${s.code}-${i}`} role="option" aria-selected={i === activeIdx}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => pick(s)}
                    className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm ${i === activeIdx ? 'bg-bg-tint' : 'hover:bg-bg-soft'} ${i > 0 ? 'border-t border-line' : ''}`}
                  >
                    <span className="line-clamp-1 text-ink-2">{s.description}</span>
                    <span className="shrink-0 rounded-md bg-brand-soft px-2 py-0.5 font-mono text-xs font-semibold text-brand-ink">{s.code}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-ink-3">Try:</span>
          {EXAMPLES.map((t) => (
            <button key={t} type="button" onClick={() => { setQuery(t); void run(t); }} className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink-2 hover:border-brand hover:text-brand-ink">
              {t}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="mt-8">
          {status !== 'idle' && (
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-ink-2" aria-live="polite">
                {status === 'loading' && 'Searching the NLM Clinical Tables…'}
                {status === 'done' && (
                  <><span className="font-semibold text-ink">{results.length}</span> {results.length === 1 ? 'code' : 'codes'} for “{lastTerm}”</>
                )}
                {status === 'error' && 'Search is temporarily unavailable. Please try again.'}
              </p>
              {status === 'done' && results.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter results" aria-label="Filter results" className="field !w-40 !py-1.5 text-sm" />
                  <button type="button" onClick={() => copy(shown.map((r) => r.code).join(', '), '__all')} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-2 hover:border-brand">
                    {copied === '__all' ? <CheckIcon className="h-3.5 w-3.5 text-ok" /> : <CopyIcon className="h-3.5 w-3.5" />} Copy codes
                  </button>
                  <button type="button" onClick={() => downloadText(`icd10-${lastTerm.replace(/\W+/g, '-')}.csv`, toCsv(shown), 'text/csv')} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-2 hover:border-brand">
                    <DownloadIcon className="h-3.5 w-3.5" /> CSV
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            {status === 'loading' ? (
              <ul className="divide-y divide-line">
                {Array.from({ length: 6 }).map((_, i) => (
                  <li key={i} className="flex animate-pulse items-center gap-4 px-4 py-4">
                    <div className="h-6 w-20 rounded-md bg-bg-soft" /><div className="h-4 flex-1 rounded bg-bg-soft" />
                  </li>
                ))}
              </ul>
            ) : shown.length > 0 ? (
              <ul className="divide-y divide-line">
                {shown.map((r) => {
                  const inList = list.some((x) => x.code === r.code);
                  return (
                    <li key={r.code} className="group flex flex-col gap-2 px-4 py-3.5 hover:bg-bg-soft/70 sm:flex-row sm:items-center sm:gap-4">
                      <button type="button" onClick={() => copy(r.code, r.code)} title="Copy code" className="w-fit shrink-0 rounded-md bg-brand-soft px-2.5 py-1 font-mono text-sm font-bold text-brand-ink hover:bg-brand hover:text-white sm:w-24 sm:text-center">
                        {copied === r.code ? 'Copied' : r.code}
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.95rem] leading-snug text-ink">{r.description}</p>
                        <p className="mt-0.5 text-xs text-ink-3">{icdChapter(r.code)}</p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button type="button" onClick={() => copy(`${r.code} – ${r.description}`, r.code + ':d')} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-3 hover:bg-white hover:text-ink">
                          {copied === r.code + ':d' ? <CheckIcon className="h-3.5 w-3.5 text-ok" /> : <CopyIcon className="h-3.5 w-3.5" />} Code + desc
                        </button>
                        <button type="button" onClick={() => toggleList(r)} aria-pressed={inList} className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold ${inList ? 'bg-brand text-white' : 'border border-line bg-white text-ink-2 hover:border-brand'}`}>
                          {inList ? '✓ In list' : '+ List'}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="px-6 py-16 text-center">
                <SearchIcon className="mx-auto h-9 w-9 text-line-strong" />
                <p className="mt-3 font-medium text-ink-2">
                  {status === 'done' ? (filter ? 'No results match that filter.' : 'No matching codes. Try a broader or clinical term.') : 'Search to see ICD-10-CM codes'}
                </p>
                <p className="mt-1 text-sm text-ink-3">Common lay terms work too — “sugar”, “bp”, “sob”, “pink eye”.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Sidebar ── */}
      <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-line bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink">My code list <span className="text-ink-3 font-normal">({list.length})</span></h2>
            {list.length > 0 && (
              <button type="button" onClick={clearList} className="inline-flex items-center gap-1 text-xs text-ink-3 hover:text-danger"><TrashIcon className="h-3.5 w-3.5" /> Clear</button>
            )}
          </div>
          {list.length === 0 ? (
            <p className="text-sm text-ink-3">Add codes with <span className="font-semibold">+ List</span> to build a set for a claim, then copy them in one click.</p>
          ) : (
            <>
              <ul className="max-h-64 space-y-1.5 overflow-y-auto pr-1">
                {list.map((r) => (
                  <li key={r.code} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 shrink-0 rounded bg-brand-soft px-1.5 font-mono text-xs font-bold text-brand-ink">{r.code}</span>
                    <span className="line-clamp-2 flex-1 text-ink-2">{r.description}</span>
                    <button type="button" onClick={() => toggleList(r)} aria-label={`Remove ${r.code}`} className="text-ink-3 hover:text-danger"><XIcon className="h-3.5 w-3.5" /></button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => copy(list.map((r) => r.code).join(', '), '__list')} className="rounded-lg bg-brand px-3 py-2 text-xs font-semibold text-white hover:bg-brand-hover">
                  {copied === '__list' ? 'Copied ✓' : 'Copy codes'}
                </button>
                <button type="button" onClick={() => copy(list.map((r) => `${r.code} – ${r.description}`).join('\n'), '__listd')} className="rounded-lg border border-line px-3 py-2 text-xs font-semibold text-ink-2 hover:border-brand">
                  {copied === '__listd' ? 'Copied ✓' : 'With descriptions'}
                </button>
              </div>
            </>
          )}
        </div>

        {recent.length > 0 && (
          <div className="rounded-2xl border border-line bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-1.5 text-sm font-semibold text-ink"><ClockIcon className="h-4 w-4 text-ink-3" /> Recent searches</h2>
              <button type="button" onClick={clearRecent} className="text-xs text-ink-3 hover:text-ink">Clear</button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {recent.map((r) => (
                <button key={r} type="button" onClick={() => { setQuery(r); void run(r); }} className="rounded-full bg-bg-soft px-2.5 py-1 text-xs text-ink-2 hover:bg-bg-tint hover:text-brand-ink">{r}</button>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-2xl bg-navy p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-300">Billing support</p>
          <h2 className="mt-2 font-semibold">Coding denials eating your A/R?</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">Our certified team audits your claims and reports coding leaks within 48 hours — free.</p>
          <Link href="/audit" className="mt-4 block rounded-lg bg-white px-4 py-2.5 text-center text-sm font-semibold text-navy hover:bg-brand-soft">Request free audit</Link>
        </div>
      </aside>
    </div>
  );
}
