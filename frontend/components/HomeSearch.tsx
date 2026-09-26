'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SearchIcon } from './icons';

const QUICK = ['Diabetes', 'Hypertension', 'Anxiety', 'Asthma', 'COVID-19', 'Depression'];

export default function HomeSearch() {
  const [q, setQ] = useState('');
  const router = useRouter();
  const go = (term: string) => {
    const t = term.trim();
    if (t) router.push(`/icd10-intelligence?q=${encodeURIComponent(t)}`);
  };

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => { e.preventDefault(); go(q); }}
        className="flex items-center gap-2 rounded-2xl border border-line-strong bg-white p-2 shadow-lg shadow-slate-200/70 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15"
      >
        <SearchIcon className="ml-2 h-5 w-5 shrink-0 text-ink-3" />
        <label htmlFor="home-q" className="sr-only">Search ICD-10 codes</label>
        <input
          id="home-q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search ICD-10 by condition or code…"
          className="min-w-0 flex-1 bg-transparent py-3 text-base text-ink outline-none placeholder:text-slate-400"
          autoComplete="off"
        />
        <button type="submit" className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-hover">
          Search
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK.map((t) => (
          <button key={t} type="button" onClick={() => go(t)} className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink-2 hover:border-brand hover:text-brand-ink">
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
