'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type SearchResult = {
  code: string;
  description: string;
};

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
};

const API_BASE_URL = '/api';
const QUICK_SEARCHES = ['Diabetes', 'Hypertension', 'Anxiety', 'Asthma', 'COVID-19', 'Depression'];

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

  // Blog
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Fetch Blogs
  useEffect(() => {
    axios.get<BlogPost[]>(`${API_BASE_URL}/blog`)
      .then(res => setBlogPosts(res.data))
      .catch(() => {
        // Fallback
        setBlogPosts([
          { id: 1, title: "2026 ICD-10-CM Highlights", excerpt: "Major updates you need to know.", date: "Jul 18, 2026", readTime: "6 min", category: "Regulatory", slug: "/blog/icd-10-2026-updates" },
          { id: 2, title: "Reducing Claim Denials", excerpt: "Strategies used by top billing teams.", date: "Jul 10, 2026", readTime: "8 min", category: "Revenue", slug: "/blog/reduce-claim-denials" },
        ]);
      })
      .finally(() => setIsLoadingBlogs(false));
  }, []);

  const fetchCodes = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/codes/search?query=${encodeURIComponent(searchTerm)}`);
      setResults(res.data);
      setHasSearched(true);
    } catch {
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = () => {
    setShowSuggestions(false);
    fetchCodes(query);
  };

  const handleSuggestionPick = (item: SearchResult) => {
    setQuery(item.description);
    setShowSuggestions(false);
    fetchCodes(item.code);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  // Debounced suggestions
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/codes/search?query=${encodeURIComponent(query)}`);
        setSuggestions(res.data.slice(0, 6));
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* HERO */}
      <div className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e520_1px,transparent_1px)] [background-size:50px_50px]" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-full text-sm mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            LIVE NLM SYNC — 2026
          </div>

          <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            Accurate Codes.<br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Faster Revenue.</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Real-time ICD-10 search powered by the National Library of Medicine.<br />
            Built for billing professionals who refuse to leave money on the table.
          </p>

          {/* Enhanced Search Bar */}
          <div ref={searchContainerRef} className="max-w-3xl mx-auto relative">
            <div className="relative flex bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
              <div className="flex items-center pl-6 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 01-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
                placeholder="Search by condition or code (e.g. Type 2 Diabetes)..."
                className="flex-1 py-7 px-4 text-lg bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="px-12 bg-indigo-600 hover:bg-indigo-700 font-semibold text-white transition-all active:scale-95"
              >
                {isSearching ? 'SEARCHING...' : 'SEARCH'}
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute mt-3 w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 max-h-96 overflow-y-auto">
                {suggestions.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionPick(item)}
                    className="w-full px-6 py-4 text-left hover:bg-slate-50 flex justify-between items-center border-b border-slate-100 last:border-none"
                  >
                    <span className="text-slate-700">{item.description}</span>
                    <span className="font-mono text-indigo-600 font-bold">{item.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {QUICK_SEARCHES.map(term => (
              <button
                key={term}
                onClick={() => { setQuery(term); fetchCodes(term); }}
                className="text-xs px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full transition"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="bg-white py-8 text-slate-900">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
          {[
            { value: '70,000+', label: 'ICD-10 Codes' },
            { value: '500+', label: 'Clinics Served' },
            { value: '98.7%', label: 'Accuracy Rate' },
            { value: '$2.4M', label: 'Revenue Recovered' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-black text-indigo-600">{stat.value}</p>
              <p className="text-sm font-medium text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RESULTS SECTION */}
      {hasSearched && (
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Search Results</h2>
            <span className="text-sm text-slate-400">{results.length} matches</span>
          </div>

          <div className="bg-white rounded-3xl shadow overflow-hidden">
            {/* Table remains the same but wrapped in better UI */}
            {/* ... paste your existing table code here or simplify ... */}
            <div className="overflow-x-auto">
              {/* Your existing table JSX */}
            </div>
          </div>
        </div>
      )}

      {/* LEAD FORM + BLOG */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-10 py-16">
        <div className="md:col-span-5">
          <div className="bg-slate-900 rounded-3xl p-10 sticky top-8">
            <h3 className="text-3xl font-black mb-6">Ready for a Revenue Boost?</h3>
            <p className="text-slate-400 mb-8">Get a free 48-hour revenue audit from our certified team.</p>
            
            {/* Your existing lead form */}
            {/* ... paste your form here ... */}
          </div>
        </div>

        <div className="md:col-span-7">
          <h3 className="text-xl font-bold mb-6 text-white">Latest Insights</h3>
          {/* Dynamic Blog Cards */}
          <div className="grid gap-6">
            {blogPosts.map(post => (
              <Link href={post.slug} key={post.id} className="block bg-slate-900/50 hover:bg-slate-800 border border-white/10 rounded-2xl p-6 transition">
                <div className="flex justify-between text-xs mb-3">
                  <span>{post.date}</span>
                  <span className="text-indigo-400">{post.category}</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">{post.title}</h4>
                <p className="text-slate-400 text-sm line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
