'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BillingResumeAndProviderGuide() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Calling your existing Nodemailer API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email, 
          subject: "LEAD: Revenue Leak Checklist Download",
          message: `A user at ${email} has requested the 2026 Revenue Leak Checklist.`
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // This triggers the actual file download if you have the PDF in your public folder
        window.open('/revenue-leak-checklist-2026.pdf', '_blank'); 
        
        setTimeout(() => {
          setIsModalOpen(false);
          setIsSubmitted(false);
          setEmail('');
        }, 4000);
      }
    } catch (error) {
      console.error("Error sending lead to Nodemailer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* --- REUSE YOUR EXISTING HEADER & CONTENT SECTIONS HERE --- */}

      {/* LEAD MAGNET COMPONENT */}
      <div className="max-w-4xl mx-auto px-6 mb-20">
        <div className="bg-indigo-900 rounded-[40px] p-10 md:p-16 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-4">Elite Resource</p>
            <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Is your practice losing <span className="text-indigo-300">$5,000+</span> every month?</h2>
            <p className="text-indigo-100/70 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
              Most billing leaks happen in the first 48 hours of a claim's life. Use our <strong>2026 Revenue Leak Checklist</strong> to audit your current biller's performance in under 10 minutes.
            </p>
            
            <button 
              onClick={handleDownloadClick}
              className="group bg-white text-indigo-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center gap-3 mx-auto shadow-xl active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Get Free Audit Checklist
            </button>
          </div>
        </div>
      </div>

      {/* --- NODEMAILER POPUP MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative">
            
            {/* Close Button */}
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {!isSubmitted ? (
              <div className="p-10 space-y-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight">Unlock the Checklist</h3>
                  <p className="text-slate-500 text-sm mt-2">Enter your work email. We'll send the PDF directly to your inbox via our secure server.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input 
                    type="email" 
                    required 
                    placeholder="dr.smith@clinic.com"
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 focus:border-indigo-600 focus:bg-white rounded-xl outline-none transition-all text-sm font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? "Processing..." : "Send Checklist Now"}
                    <span className="text-lg">→</span>
                  </button>
                </form>
                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">Secure Transfer via Enhancebilling RCM</p>
              </div>
            ) : (
              <div className="p-16 text-center space-y-4">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900">Lead Received!</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Check your email. We've sent the checklist and our team will reach out to see how we can help your practice.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ... [Rest of the page] ... */}
    </div>
  );
}
