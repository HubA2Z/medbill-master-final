'use client';
import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

const reasons = [
  {
    num: '01',
    title: 'Incorrect Modifiers',
    body:  'Misusing -25 or -59 modifiers is the #1 trigger for RAC audits and automatic denials.',
  },
  {
    num: '02',
    title: 'Under-coding E/M Levels',
    body:  'Fear of audits leads providers to code Level 3 when documentation clearly supports Level 4 or 5.',
  },
  {
    num: '03',
    title: 'Unbundling Errors',
    body:  'Separate billing of services included in a global package triggers payer flags and recoupment.',
  },
];

export default function RevenueAudit() {
  const [auditData, setAuditData] = useState({
    name:          '',
    email:         '',
    clinicName:    '',
    monthlyVolume: '0-500',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError,     setIsError]     = useState(false);
  const [loading,     setLoading]     = useState(false);

  const handleAuditSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setIsError(false);
    try {
     await axios.post(`${API_BASE_URL}/leads`, {
  ...auditData,
  source: 'Revenue Audit Page',
});
      setIsSubmitted(true);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* Hero */}
      <section className="relative py-24 px-6 bg-slate-900 text-white text-center overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-indigo-500/30 bg-indigo-500/10 rounded-full text-indigo-400 text-xs font-bold mb-6 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
            48-Hour Turnaround
          </span>
          <h1 className="text-4xl sm:text-6xl font-black mb-5 leading-[1.05] tracking-tight">
            Stop Leaving <span className="text-indigo-400">Revenue</span><br />on the Table.
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Our billing experts identify coding leaks, unbundling errors, and under-coded E/M levels —
            and deliver a full report within 48 hours. Free.
          </p>
        </div>
      </section>

      {/* Trust strip */}
      <div className="bg-indigo-600 py-4 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 text-white text-sm font-semibold">
          {['No Credit Card Required', '48-Hour Report Delivery', 'Certified Billing Specialists', 'HIPAA Compliant'].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Content + Form */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 gap-14 items-start">

          {/* Left: Why clinics fail */}
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-3">The Problem</p>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Why Clinics Lose Revenue</h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              <strong className="text-slate-700">30% of medical claims are denied</strong> on first submission.
              This &ldquo;silent leak&rdquo; costs the average mid-sized practice over $150,000 annually — and most
              never know it&apos;s happening.
            </p>

            <div className="space-y-5">
              {reasons.map((r) => (
                <div key={r.num} className="flex gap-4">
                  <span className="text-indigo-600 font-black text-sm shrink-0 mt-0.5">{r.num}.</span>
                  <div>
                    <p className="font-bold text-slate-900 mb-1">{r.title}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{r.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom note */}
            <div className="mt-10 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <p className="text-sm text-emerald-800 font-semibold leading-relaxed">
                On average, clinics that complete a revenue audit recover <strong>12–18%</strong> in
                previously uncollected claims within 90 days.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl">
            {isSubmitted ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-black mb-2">You&apos;re on the list!</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Our billing team will review your profile and reach out within one business day
                  to begin your free revenue audit.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 underline underline-offset-4"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-black mb-1">Request Your Free Audit</h3>
                  <p className="text-slate-400 text-sm">We&apos;ll reach out within 24 hours.</p>
                </div>

                {isError && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium">
                    Something went wrong. Please try again.
                  </div>
                )}

                <form onSubmit={handleAuditSubmit} className="space-y-4">
                  {[
                    { key: 'name',       placeholder: 'Your Full Name',         type: 'text',  label: 'Full Name' },
                    { key: 'clinicName', placeholder: 'Clinic / Practice Name', type: 'text',  label: 'Clinic Name' },
                    { key: 'email',      placeholder: 'you@clinic.com',         type: 'email', label: 'Work Email' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-widest">
                        {field.label}
                      </label>
                      <input
                        required
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full p-3.5 rounded-xl bg-slate-800 text-white placeholder:text-slate-600 outline-none transition focus:ring-2 focus:ring-indigo-500 text-sm border border-slate-700 focus:border-indigo-500"
                        onChange={(e) => setAuditData({ ...auditData, [field.key]: e.target.value })}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-widest">
                      Monthly Claim Volume
                    </label>
                    <select
                      className="w-full p-3.5 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:ring-2 focus:ring-indigo-500 text-sm"
                      onChange={(e) => setAuditData({ ...auditData, monthlyVolume: e.target.value })}
                    >
                      <option value="0-500">0 – 500 claims / month</option>
                      <option value="500-2000">500 – 2,000 claims / month</option>
                      <option value="2000+">2,000+ claims / month</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all shadow-lg mt-1 ${
                      loading
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Preparing Report…
                      </span>
                    ) : 'Generate My Free Report'}
                  </button>
                </form>
              </>
            )}

            <div className="flex items-center justify-center gap-1.5 mt-6 pt-5 border-t border-slate-800">
              <svg className="w-3 h-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                HIPAA Compliant · No Spam · Free Forever
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
