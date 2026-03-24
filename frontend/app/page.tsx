'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type SearchResult = {
  code: string;
  description: string;
};

// Use relative paths for Vercel. 
// This will hit your vercel.json rewrite rule: /api/(.*) -> backend/src/server.ts
const API_BASE_URL = '/api';

const QUICK_SEARCHES = ['Diabetes', 'Hypertension', 'Anxiety', 'Asthma', 'COVID-19', 'Depression'];

const STATS = [
  { value: '70,000+', label: 'ICD-10 Codes' },
  { value: '500+',    label: 'Clinics Served' },
  { value: '98.7%',  label: 'Coding Accuracy' },
  { value: '$2.4M',  label: 'Avg Revenue Recovered' },
];

/* ── Skeleton rows for the loading table ── */
function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="animate-pulse border-b border-slate-100">
          <td className="py-4 pl-5 pr-3 w-10">
            <div className="h-4 w-5 bg-slate-200 rounded" />
          </td>
          <td className="py-4 px-4">
            <div className="h-5 w-24 bg-slate-200 rounded-lg" />
          </td>
          <td className="py-4 px-4">
            <div className="h-4 w-4/5 bg-slate-100 rounded" />
          </td>
          <td className="py-4 px-4 text-right">
            <div className="h-7 w-16 bg-slate-100 rounded-lg ml-auto" />
          </td>
        </tr>
      ))}
    </>
  );
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [leadData, setLeadData] = useState({ name: '', email: '', clinicName: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const resultCountLabel = useMemo(() => {
    if (!hasSearched) return 'Ready when you are';
    if (isSearching) return 'Searching…';
    if (results.length === 0) return 'No matching records';
    return `${results.length} match${results.length === 1 ? '' : 'es'} found`;
  }, [hasSearched, isSearching, results.length]);

  const fetchCodes = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      setSuggestions([]);
      setHasSearched(false);
      return;
    }
    setIsSearching(true);
    try {
      // Changed to use the /api prefix correctly
      const response = await axios.get<SearchResult[]>(
        `${API_BASE_URL}/codes/search?query=${encodeURIComponent(searchTerm)}`
      );
      setResults(response.data);
      setSuggestions(response.data.slice(0, 6));
      setHasSearched(true);
    } catch {
      setResults([]);
      setSuggestions([]);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = async (searchTerm = query) => {
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    await fetchCodes(searchTerm);
  };

  const handleSuggestionPick = (item: SearchResult) => {
    setQuery(`${item.code} – ${item.description}`);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    void handleSearch(item.code);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 1800);
    });
  };

  // Debounced Auto-suggestions
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
      return;
    }
    const timer = window.setTimeout(async () => {
      try {
        const response = await axios.get<SearchResult[]>(
          `${API_BASE_URL}/codes/search?query=${encodeURIComponent(query)}`
        );
        const next = response.data.slice(0, 6);
        setSuggestions(next);
        setShowSuggestions(next.length > 0);
        setActiveSuggestionIndex(-1);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300); // Slightly increased debounce for better API performance
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!searchContainerRef.current?.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Fixed: Pointing to /api/leads to match backend route
      await axios.post(`${API_BASE_URL}/leads`, { ...leadData, lastSearch: query });
      setMessage('success');
      setLeadData({ name: '', email: '', clinicName: '' });
    } catch {
      setMessage('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">

        {/* ── HERO ── */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
            ICD-10-CM · 2024 Edition · Live Database
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 leading-[1.08] tracking-tight">
            Precision Coding.{' '}
            <span className="text-indigo-600">Maximized Revenue.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 mb-8 max-w-xl mx-auto leading-relaxed">
            Instant access to 70,000+ ICD-10-CM codes. Built for medical billing specialists and clinic administrators.
          </p>

          <div ref={searchContainerRef} className="relative group mb-4">
            <div className="absolute -inset-0.5 bg-indigo-500 rounded-2xl blur opacity-15 group-hover:opacity-30 transition duration-700" />
            <div className="relative flex bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200">
              <span className="flex items-center pl-5 text-slate-400 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(suggestions.length > 0)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') { e.preventDefault(); setShowSuggestions(true); setActiveSuggestionIndex((p) => Math.min(p + 1, suggestions.length - 1)); return; }
                  if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveSuggestionIndex((p) => Math.max(p - 1, -1)); return; }
                  if (e.key === 'Escape')    { setShowSuggestions(false); setActiveSuggestionIndex(-1); return; }
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]
                      ? handleSuggestionPick(suggestions[activeSuggestionIndex])
                      : void handleSearch();
                  }
                }}
                placeholder="Search condition or ICD code (e.g. 'Diabetes')…"
                className="w-full py-5 px-4 text-base sm:text-lg outline-none bg-transparent placeholder:text-slate-400"
              />
              <button
                onClick={() => void handleSearch()}
                className="shrink-0 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-7 sm:px-10 font-black text-sm tracking-wider transition-all duration-150"
              >
                {isSearching ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    SEARCHING
                  </span>
                ) : 'SEARCH'}
              </button>
            </div>

            {showSuggestions && (
              <div className="absolute z-30 mt-2 w-full rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
                {suggestions.map((item, i) => (
                  <button
                    key={`${item.code}-${i}`}
                    className={`w-full px-5 py-3.5 text-left flex items-center justify-between gap-4 transition-colors ${
                      i === activeSuggestionIndex ? 'bg-indigo-50' : 'hover:bg-slate-50'
                    } ${i > 0 ? 'border-t border-slate-100' : ''}`}
                    onClick={() => handleSuggestionPick(item)}
                  >
                    <span className="text-slate-800 text-sm line-clamp-1">{item.description}</span>
                    <span className="font-mono text-xs px-2 py-1 rounded-md bg-slate-100 text-indigo-600 font-semibold whitespace-nowrap">
                      {item.code}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-xs text-slate-400 font-semibold self-center mr-1">Try:</span>
            {QUICK_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => { setQuery(term); void handleSearch(term); }}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
              <p className="text-2xl font-black text-indigo-600">{s.value}</p>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── RESULTS + SIDEBAR ── */}
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
                ICD-10 Database Results
              </h2>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                hasSearched && results.length > 0
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'bg-slate-100 text-slate-400'
              }`}>
                {resultCountLabel}
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="py-3 pl-5 pr-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 w-12">#</th>
                      <th className="py-3 px-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 w-36">ICD Code</th>
                      <th className="py-3 px-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Description</th>
                      <th className="py-3 px-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400 w-24">Copy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isSearching ? (
                      <SkeletonRows />
                    ) : results.length > 0 ? (
                      results.map((item, i) => (
                        <tr
                          key={item.code}
                          className={`border-b border-slate-100 hover:bg-indigo-50/40 transition-colors group ${
                            i === results.length - 1 ? 'border-b-0' : ''
                          }`}
                        >
                          <td className="py-4 pl-5 pr-3 text-slate-400 font-mono text-xs font-semibold">
                            {i + 1}
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-mono font-bold text-xs whitespace-nowrap">
                              {item.code}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-700 font-medium leading-snug">
                            {item.description}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => handleCopy(item.code)}
                              title={`Copy ${item.code}`}
                              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                                copiedCode === item.code
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-slate-100 text-slate-500 hover:bg-indigo-600 hover:text-white'
                              }`}
                            >
                              {copiedCode === item.code ? 'Copied' : 'Copy'}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4}>
                          <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
                            <p className="font-bold text-slate-600">
                              {hasSearched ? 'No matches found' : 'Search to see results here'}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="lg:col-span-4">
            <div id="audit-form" className="bg-slate-900 rounded-3xl p-7 text-white shadow-2xl sticky top-24">
              {message === 'success' ? (
                <div className="text-center py-8">
                  <h3 className="text-xl font-black mb-2">You're on the list!</h3>
                  <button onClick={() => setMessage('')} className="text-xs font-bold text-indigo-400 uppercase underline">
                    Submit another
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-black mb-5">Free Revenue Audit</h3>
                  <form onSubmit={handleLeadSubmit} className="space-y-3">
                    <input
                      required
                      placeholder="Your Name"
                      value={leadData.name}
                      onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none"
                    />
                    <input
                      required
                      placeholder="Clinic Name"
                      value={leadData.clinicName}
                      onChange={(e) => setLeadData({ ...leadData, clinicName: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      value={leadData.email}
                      onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none"
                    />
                    <button
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-indigo-600 font-black text-sm tracking-widest uppercase hover:bg-indigo-500 transition-all"
                    >
                      {isSubmitting ? 'Sending...' : 'Start My Free Audit'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
