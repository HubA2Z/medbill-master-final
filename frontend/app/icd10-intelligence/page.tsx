'use client';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type SearchResult = { code: string; description: string };

// FIXED: Using relative path for Vercel production and local proxy
const API_BASE_URL = '/api';

const EXAMPLES = ['Asthma', 'Diabetes', 'COVID-19', 'Back Pain', 'Anxiety', 'Hypertension'];

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="animate-pulse border-b border-slate-100">
          <td className="py-4 pl-5 pr-3 w-10"><div className="h-4 w-5 bg-slate-200 rounded" /></td>
          <td className="py-4 px-4"><div className="h-5 w-24 bg-slate-200 rounded-lg" /></td>
          <td className="py-4 px-4"><div className="h-4 w-4/5 bg-slate-100 rounded" /></td>
          <td className="py-4 px-4 text-right"><div className="h-7 w-16 bg-slate-100 rounded-lg ml-auto" /></td>
        </tr>
      ))}
    </>
  );
}

export default function ICD10Intelligence() {
  const [query,        setQuery]        = useState('');
  const [results,      setResults]      = useState<SearchResult[]>([]);
  const [suggestions,  setSuggestions]  = useState<SearchResult[]>([]);
  const [showDrop,      setShowDrop]     = useState(false);
  const [activeIdx,    setActiveIdx]    = useState(-1);
  const [isSearching,  setIsSearching]  = useState(false);
  const [hasSearched,  setHasSearched]  = useState(false);
  const [copiedCode,   setCopiedCode]   = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchResults = async (term: string) => {
    if (!term.trim()) { setResults([]); setHasSearched(false); return; }
    setIsSearching(true);
    try {
      // Points to /api/codes/search via relative path
      const res = await axios.get<SearchResult[]>(`${API_BASE_URL}/codes/search?query=${encodeURIComponent(term)}`);
      setResults(res.data);
      setHasSearched(true);
    } catch {
      setResults([]);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = (term = query) => {
    setShowDrop(false);
    setActiveIdx(-1);
    void fetchResults(term);
  };

  const pickSuggestion = (item: SearchResult) => {
    setQuery(`${item.code} – ${item.description}`);
    setShowDrop(false);
    setActiveIdx(-1);
    void fetchResults(item.code);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 1800);
    });
  };

  // Debounced suggestions logic
  useEffect(() => {
    if (!query.trim()) { setSuggestions([]); setShowDrop(false); return; }
    const t = window.setTimeout(async () => {
      try {
        const res = await axios.get<SearchResult[]>(`${API_BASE_URL}/codes/search?query=${encodeURIComponent(query)}`);
        const next = res.data.slice(0, 6);
        setSuggestions(next);
        setShowDrop(next.length > 0);
        setActiveIdx(-1);
      } catch {
        setSuggestions([]); setShowDrop(false);
      }
    }, 250); // Balanced debounce for responsiveness
    return () => window.clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setShowDrop(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-indigo-500/30 bg-indigo-500/10 rounded-full text-indigo-400 text-xs font-bold mb-5 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
            Live Database · 70,000+ Codes
          </div>
          <h1 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight leading-[1.05]">
            ICD-10 <span className="text-indigo-400">Intelligence</span>
          </h1>
          <p className="text-slate-400 text-base mb-8 max-w-lg mx-auto leading-relaxed">
            Instant ICD-10-CM lookup powered by precise coding data.
            Search by condition, symptom, or code.
          </p>

          {/* Search bar Container */}
          <div ref={containerRef} className="relative max-w-xl mx-auto">
            <div className="flex bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <span className="flex items-center pl-4 text-slate-400 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowDrop(true); }}
                onFocus={() => setShowDrop(suggestions.length > 0)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') { e.preventDefault(); setShowDrop(true); setActiveIdx((p) => Math.min(p + 1, suggestions.length - 1)); return; }
                  if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx((p) => Math.max(p - 1, -1)); return; }
                  if (e.key === 'Escape')    { setShowDrop(false); setActiveIdx(-1); return; }
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    activeIdx >= 0 && suggestions[activeIdx] ? pickSuggestion(suggestions[activeIdx]) : handleSearch();
                  }
                }}
                placeholder="Search condition or code (e.g. 'Asthma')…"
                className="w-full py-4 px-4 text-slate-900 outline-none bg-transparent text-base placeholder:text-slate-400"
              />
              <button
                onClick={() => handleSearch()}
                className="shrink-0 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-6 font-black text-sm tracking-wide transition-all"
              >
                {isSearching ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                ) : 'SEARCH'}
              </button>
            </div>

            {/* Dropdown Suggestions */}
            {showDrop && suggestions.length > 0 && (
              <div className="absolute z-30 mt-2 w-full rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden text-slate-900">
                {suggestions.map((item, i) => (
                  <button
                    key={`${item.code}-${i}`}
                    onClick={() => pickSuggestion(item)}
                    className={`w-full px-5 py-3.5 text-left flex items-center justify-between gap-4 transition-colors text-sm ${
                      i === activeIdx ? 'bg-indigo-50' : 'hover:bg-slate-50'
                    } ${i > 0 ? 'border-t border-slate-100' : ''}`}
                  >
                    <span className="line-clamp-1 text-slate-800">{item.description}</span>
                    <span className="font-mono text-xs px-2 py-1 rounded-md bg-slate-100 text-indigo-600 font-semibold whitespace-nowrap">{item.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Examples */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="text-xs text-slate-500 font-semibold self-center">Try:</span>
            {EXAMPLES.map((t) => (
              <button
                key={t}
                onClick={() => { setQuery(t); handleSearch(t); }}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-slate-300 hover:bg-white/20 hover:text-white transition-all"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Results Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* Table Column */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Search Results</h2>
              {hasSearched && (
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${results.length > 0 ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                  {results.length > 0 ? `${results.length} results` : 'No matches'}
                </span>
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="py-3 pl-5 pr-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 w-12">#</th>
                      <th className="py-3 px-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 w-32">Code</th>
                      <th className="py-3 px-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Description</th>
                      <th className="py-3 px-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400 w-20">Copy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isSearching ? (
                      <SkeletonRows />
                    ) : results.length > 0 ? (
                      results.map((item, i) => (
                        <tr key={item.code} className={`border-b border-slate-100 hover:bg-indigo-50/40 transition-colors ${i === results.length - 1 ? 'border-b-0' : ''}`}>
                          <td className="py-3.5 pl-5 pr-3 text-slate-400 font-mono text-xs font-semibold">{i + 1}</td>
                          <td className="py-3.5 px-4">
                            <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-mono font-bold text-xs whitespace-nowrap">
                              {item.code}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium leading-snug">{item.description}</td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleCopy(item.code)}
                              className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all ${
                                copiedCode === item.code
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-slate-100 text-slate-500 hover:bg-indigo-600 hover:text-white'
                              }`}
                            >
                              {copiedCode === item.code ? (
                                <><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Done</>
                              ) : (
                                <><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy</>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4}>
                          <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
                            <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d={hasSearched
                                ? "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                : "M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                              } />
                            </svg>
                            <div className="text-center">
                              <p className="font-bold text-slate-500 text-sm">
                                {hasSearched ? 'No matches found' : 'Search to see results'}
                              </p>
                              <p className="text-xs mt-1 text-slate-400">
                                {hasSearched ? 'Try a shorter keyword.' : 'Enter a condition or code above.'}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4">
            <div className="bg-slate-900 rounded-2xl p-6 text-white sticky top-24 shadow-xl">
              <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-4">Revenue Optimization</p>
              <h3 className="text-lg font-black mb-2 leading-tight">Expert Billing Support</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Our certified team handles full-cycle revenue management. Focus on patients while we handle the codes.
              </p>
              <ul className="space-y-2.5 mb-6">
                {['HIPAA Compliant', 'Denial Recovery', 'Fast Turnaround'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300 font-medium">
                    <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/#audit-form"
                className="block w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-3 rounded-xl text-center text-xs uppercase tracking-widest transition-all active:scale-95"
              >
                Free Coding Audit
              </Link>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
