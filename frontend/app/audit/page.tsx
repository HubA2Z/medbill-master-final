'use client';
import { useState } from 'react';
import axios from 'axios';

export default function RevenueAudit() {
  // 1. Setup State (Synchronized with Home page keys for MongoDB)
  const [auditData, setAuditData] = useState({
    name: '',         // Contact person
    email: '',
    clinicName: '',    // Changed from 'practiceName' to match Home lead
    monthlyVolume: '0-500' // Matches the dropdown
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // 2. Handle Submit
  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // We send it to the same /api/leads endpoint
      await axios.post('/api/leads', {
        ...auditData,
        source: 'Deep Revenue Audit Page' // Tagging the source so we know it's a high-value lead
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Audit request failed", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* 📊 Hero Section */}
      <section className="py-24 px-6 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Stop Leaving <span className="text-indigo-400">Revenue</span> on the Table.
          </h1>
          <p className="text-xl text-slate-400 mb-10">
            Our 2026 AI-driven audit identifies coding leaks, unbundling errors, and under-coded E/M levels in under 48 hours.
          </p>
        </div>
      </section>

      {/* 📈 Content & Form Section */}
      <section className="max-w-5xl mx-auto py-20 px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Why Clinics Fail Audits</h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>Statistically, 30% of medical claims are denied on the first submission. This "silent leak" costs the average mid-sized practice over $150,000 annually.</p>
              <ul className="space-y-4 font-medium">
                <li className="flex gap-3">
                  <span className="text-indigo-600 font-bold">01.</span>
                  <span><strong>Incorrect Modifiers:</strong> Misusing -25 or -59 modifiers is the #1 trigger for RAC audits.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo-600 font-bold">02.</span>
                  <span><strong>Under-coding:</strong> Fear of audits often leads providers to code Level 3 when documentation supports Level 4.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 💰 THE FORM */}
          <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl relative overflow-hidden">
            {!isSubmitted ? (
              <>
                <h3 className="text-2xl font-bold mb-6 text-slate-900">Request Your Custom Audit</h3>
                <form onSubmit={handleAuditSubmit} className="space-y-4">
                  <input 
                    required
                    type="text" 
                    placeholder="Your Full Name" 
                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900"
                    onChange={(e) => setAuditData({...auditData, name: e.target.value})}
                  />
                  <input 
                    required
                    type="text" 
                    placeholder="Clinic / Practice Name" 
                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900"
                    onChange={(e) => setAuditData({...auditData, clinicName: e.target.value})}
                  />
                  <input 
                    required
                    type="email" 
                    placeholder="Professional Email" 
                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900"
                    onChange={(e) => setAuditData({...auditData, email: e.target.value})}
                  />
                  <select 
                    className="w-full p-4 rounded-xl border border-slate-200 bg-white text-slate-700 outline-none"
                    onChange={(e) => setAuditData({...auditData, monthlyVolume: e.target.value})}
                  >
                    <option value="0-500">Average Monthly Claims: 0-500</option>
                    <option value="500-2000">500 - 2,000</option>
                    <option value="2000+">2,000+</option>
                  </select>
                  <button 
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white font-black py-5 rounded-xl hover:bg-indigo-700 transition shadow-lg disabled:bg-slate-400"
                  >
                    {loading ? "PREPARING REPORT..." : "GENERATE MY REPORT"}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                <div className="text-5xl mb-6">✅</div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">Request Submitted</h3>
                <p className="text-slate-600 leading-relaxed">
                  Thank you! Your request has been submitted. We will contact you as early as possible.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
