'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [leadData, setLeadData] = useState({ name: '', email: '', clinicName: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // 🔍 FIXED: Variable 'res' changed to 'response' to fix Build Error
  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await axios.get(`/api/codes/search?query=${query}`);
      setResults(response.data); 
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  // 📬 FIXED: Removed http://localhost:5000 to fix "Not Secure" warning
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('/api/leads', { ...leadData, lastSearch: query });
      setMessage("✅ Consultation Request Sent!");
      setLeadData({ name: '', email: '', clinicName: '' });
    } catch (err) {
      setMessage("❌ Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="max-w-7xl mx-auto p-6 lg:p-12">
        
        {/* HERO & SEARCH SECTION */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-[1.1]">
            Precision Coding. <span className="text-indigo-600">Maximized Revenue.</span>
          </h1>
          <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto">
            Access the world’s most advanced ICD-10-CM database. Optimized for medical billing specialists and clinic administrators.
          </p>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search condition or code (e.g. 'Diabetes')..." 
                className="w-full p-6 text-xl outline-none"
              />
              <button onClick={handleSearch} className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 font-black transition-all">SEARCH</button>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* RESULTS COLUMN */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex justify-between items-end mb-4 px-2">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Database Results</h2>
              <span className="text-xs text-indigo-600 font-bold">Showing top {results.length} matches</span>
            </div>

            {results.length > 0 ? (
              <>
                {results.map((item: any) => (
                  <div key={item.code} className="group bg-white border border-slate-200 p-6 rounded-2xl hover:border-indigo-400 hover:shadow-xl transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-mono font-bold text-sm mb-2 inline-block">{item.code}</span>
                        <h3 className="text-xl font-bold text-slate-800">{item.description}</h3>
                      </div>
                      <button 
                        onClick={() => navigator.clipboard.writeText(item.code)} 
                        className="opacity-0 group-hover:opacity-100 bg-slate-100 p-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-all"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                ))}

                {/* CALL TO ACTION CARD */}
                <div className="mt-8 bg-indigo-600 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Do you need a Biller?</h3>
                    <p className="text-indigo-100 text-sm">Our experts manage your revenue cycle so you can focus on patients.</p>
                  </div>
                  <Link href="#audit-form" className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-slate-900 hover:text-white transition-all whitespace-nowrap">
                    Book Free Consultation
                  </Link>
                </div>
              </>
            ) : (
              <div className="h-80 border-4 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400">
                <p className="font-bold">Waiting for input...</p>
                <p className="text-sm">Try "Hypertension" or "Flu"</p>
              </div>
            )}
          </div>

          {/* SIDEBAR: LEAD GENERATION FORM */}
          <aside className="lg:col-span-4 space-y-8">
            <div id="audit-form" className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl scroll-mt-32">
              {message ? (
                <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl text-white">✅</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Request Submitted</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    Your request has been submitted. We will contact you as early as possible.
                  </p>
                  <button onClick={() => setMessage('')} className="text-xs font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 underline underline-offset-4">Send another request</button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2 italic">Free Revenue Audit</h3>
                    <p className="text-slate-400 text-sm font-medium">
                      Is your clinic losing 15% of revenue to coding errors? Let our masters verify.
                    </p>
                  </div>
                  
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <input 
                      required 
                      value={leadData.name} 
                      placeholder="Full Name" 
                      className="w-full p-4 rounded-xl bg-white text-slate-900 outline-none transition focus:ring-2 focus:ring-indigo-500" 
                      onChange={(e) => setLeadData({...leadData, name: e.target.value})} 
                    />
                    <input 
                      required 
                      value={leadData.clinicName} 
                      placeholder="Clinic / Office Name" 
                      className="w-full p-4 rounded-xl bg-white text-slate-900 outline-none transition focus:ring-2 focus:ring-indigo-500" 
                      onChange={(e) => setLeadData({...leadData, clinicName: e.target.value})} 
                    />
                    <input 
                      required 
                      type="email" 
                      value={leadData.email} 
                      placeholder="Email Address" 
                      className="w-full p-4 rounded-xl bg-white text-slate-900 outline-none transition focus:ring-2 focus:ring-indigo-500" 
                      onChange={(e) => setLeadData({...leadData, email: e.target.value})} 
                    />

                    <button 
                      disabled={isSubmitting} 
                      className={`w-full ${isSubmitting ? 'bg-slate-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-black py-4 rounded-xl transition shadow-lg mt-2 uppercase tracking-widest text-sm`}
                    >
                      {isSubmitting ? 'SENDING...' : 'START AUDIT'}
                    </button>
                  </form>
                </>
              )}
              <p className="text-[10px] text-center text-slate-500 mt-6 font-bold uppercase tracking-widest pt-4 border-t border-slate-800">
                🛡️ HIPAA COMPLIANT DATA TRANSIT
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
