'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type SearchResult = {
  code: string;
  description: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

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
    }, 220);
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

          {/* Search bar */}
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

            {/* Autocomplete dropdown */}
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

          {/* Quick search tags */}
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

          {/* ── Results column ── */}
          <div className="lg:col-span-8">

            {/* Table header row */}
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

            {/* Results table */}
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
                              {copiedCode === item.code ? (
                                <>
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                  Copied
                                </>
                              ) : (
                                <>
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                  Copy
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4}>
                          <div className={`flex flex-col items-center justify-center py-20 gap-3 text-slate-400 ${hasSearched ? '' : ''}`}>
                            {hasSearched ? (
                              <>
                                <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="text-center">
                                  <p className="font-bold text-slate-600">No matches found</p>
                                  <p className="text-sm mt-1 text-slate-400">Try a condition name, symptom, or shorter keyword.</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                                </svg>
                                <div className="text-center">
                                  <p className="font-bold text-slate-500">Search to see results here</p>
                                  <p className="text-sm mt-1">
                                    Try{' '}
                                    <button onClick={() => { setQuery('Hypertension'); void handleSearch('Hypertension'); }} className="text-indigo-500 font-semibold hover:underline">"Hypertension"</button>
                                    {' '}or{' '}
                                    <button onClick={() => { setQuery('Flu'); void handleSearch('Flu'); }} className="text-indigo-500 font-semibold hover:underline">"Flu"</button>
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table footer with result count */}
              {results.length > 0 && (
                <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                  <p className="text-xs text-slate-400 font-medium">
                    Showing <span className="font-bold text-slate-600">{results.length}</span> result{results.length !== 1 ? 's' : ''} for <span className="font-bold text-indigo-600">"{query}"</span>
                  </p>
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Ready to use
                  </span>
                </div>
              )}
            </div>

            {/* CTA banner — shown only after results */}
            {results.length > 0 && (
              <div className="mt-6 relative overflow-hidden bg-indigo-600 p-7 rounded-2xl text-white shadow-lg">
                <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full" />
                <div className="absolute -bottom-8 -left-4 w-20 h-20 bg-white/5 rounded-full" />
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mb-1">Revenue Cycle Management</p>
                    <h3 className="text-xl font-black mb-1">Do you need a Biller?</h3>
                    <p className="text-indigo-100 text-sm">Our experts handle your full revenue cycle — so you can focus on patients.</p>
                  </div>
                  <Link
                    href="#audit-form"
                    className="shrink-0 bg-white text-indigo-600 px-5 py-2.5 rounded-xl font-black text-sm hover:bg-slate-900 hover:text-white transition-all shadow"
                  >
                    Book Free Consultation →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="lg:col-span-4">
            <div id="audit-form" className="bg-slate-900 rounded-3xl p-7 text-white shadow-2xl scroll-mt-24 sticky top-24">

              {message === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black mb-2">You're on the list!</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    We'll reach out within one business day to schedule your free revenue audit.
                  </p>
                  <button
                    onClick={() => setMessage('')}
                    className="text-xs font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 underline underline-offset-4"
                  >
                    Submit another request
                  </button>
                </div>
              ) : message === 'error' ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
                    </svg>
                  </div>
                  <p className="font-bold mb-2">Something went wrong</p>
                  <p className="text-slate-400 text-sm mb-6">Please try again in a moment.</p>
                  <button
                    onClick={() => setMessage('')}
                    className="text-xs font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 underline underline-offset-4"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <>
                  {/* Social proof */}
                  <div className="flex items-center gap-2.5 mb-6 pb-6 border-b border-slate-800">
                    <div className="flex -space-x-2">
                      {[['bg-indigo-400', 'D'], ['bg-blue-400', 'S'], ['bg-emerald-400', 'M']].map(([c, l], i) => (
                        <div key={i} className={`w-7 h-7 rounded-full border-2 border-slate-900 ${c} flex items-center justify-center text-[10px] font-black text-white`}>
                          {l}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 leading-tight">
                      <span className="text-white font-semibold">500+ clinics</span> already enrolled
                    </p>
                  </div>

                  <div className="mb-5">
                    <h3 className="text-xl font-black mb-1">Free Revenue Audit</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Is your clinic losing 15% of revenue to coding errors? Let our billers find out — for free.
                    </p>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="space-y-3">
                    {([
                      { key: 'name',       placeholder: 'John Smith',          type: 'text',  label: 'Your Name' },
                      { key: 'clinicName', placeholder: 'Clinic / Office Name', type: 'text', label: 'Clinic Name' },
                      { key: 'email',      placeholder: 'you@clinic.com',       type: 'email', label: 'Email Address' },
                    ] as const).map((field) => (
                      <div key={field.key}>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-widest">
                          {field.label}
                        </label>
                        <input
                          required
                          type={field.type}
                          value={leadData[field.key]}
                          placeholder={field.placeholder}
                          className="w-full p-3.5 rounded-xl bg-slate-800 text-white placeholder:text-slate-600 outline-none transition focus:ring-2 focus:ring-indigo-500 text-sm border border-slate-700 focus:border-indigo-500"
                          onChange={(e) => setLeadData({ ...leadData, [field.key]: e.target.value })}
                        />
                      </div>
                    ))}

                    <button
                      disabled={isSubmitting}
                      className={`w-full mt-1 py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all shadow-lg ${
                        isSubmitting
                          ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white'
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                          </svg>
                          Sending…
                        </span>
                      ) : 'Start My Free Audit'}
                    </button>
                  </form>
                </>
              )}

              <div className="flex items-center justify-center gap-1.5 mt-6 pt-5 border-t border-slate-800">
                <svg className="w-3 h-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  HIPAA Compliant · No Spam · Cancel Anytime
                </p>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
