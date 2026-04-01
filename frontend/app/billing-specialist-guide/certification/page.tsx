import Link from 'next/link';

export default function CertificationGuide() {
  const comparison = [
    { feature: "Primary Setting", aapc: "Outpatient / Clinics", ahima: "Inpatient / Hospitals" },
    { feature: "Flagship Credential", aapc: "CPC (Professional Coder)", ahima: "CCS (Coding Specialist)" },
    { feature: "Difficulty", aapc: "Moderate (Entry-friendly)", ahima: "High (Advanced focus)" },
    { feature: "Exam Fee (Approx)", aapc: "$399 - $490", ahima: "$299 (Member) - $399" },
    { feature: "Membership Req.", aapc: "Yes (~$180/year)", ahima: "Optional (but recommended)" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* HEADER */}
      <header className="bg-slate-900 py-20 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-8">
            <Link href="/billing-specialist-guide" className="text-xs font-bold text-indigo-400 uppercase tracking-widest hover:text-white transition-colors">
              ← Back to Main Guide
            </Link>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            AAPC vs. AHIMA: <span className="text-indigo-400">2026 Certification Guide</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Which credential will unlock the highest salary for your career path? Let's break down the requirements, costs, and industry prestige.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        
        {/* THE COMPARISON TABLE */}
        <section className="mb-20">
          <h2 className="text-3xl font-black mb-8 text-center">The Comparison Showdown</h2>
          <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Feature</th>
                  <th className="p-6 text-xs font-black uppercase tracking-widest text-indigo-600">AAPC (CPC/CPB)</th>
                  <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-900">AHIMA (CCS/CCA)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparison.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50/50">
                    <td className="p-6 font-bold text-slate-500 text-sm">{row.feature}</td>
                    <td className="p-6 text-slate-700 font-medium">{row.aapc}</td>
                    <td className="p-6 text-slate-700 font-medium">{row.ahima}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* DETAILED BREAKDOWN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <span className="font-black text-indigo-600">A</span>
            </div>
            <h3 className="text-2xl font-black">AAPC: The Outpatient Standard</h3>
            <p className="text-slate-600 leading-relaxed">
              If your goal is to work in a <strong>physician's office, multi-specialty clinic, or billing company</strong>, AAPC is the preferred choice. The <strong>CPC (Certified Professional Coder)</strong> is considered the "Gold Standard" for outpatient coding.
            </p>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>• Focuses on CPT, HCPCS, and ICD-10-CM.</li>
              <li>• Offers specialized credentials (like Cardiology or Orthopedics).</li>
              <li>• Huge community support and networking.</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
              <span className="font-black text-slate-900">H</span>
            </div>
            <h3 className="text-2xl font-black">AHIMA: The Hospital Authority</h3>
            <p className="text-slate-600 leading-relaxed">
              For those aiming for <strong>large health systems or inpatient hospital roles</strong>, AHIMA is the heavyweight. The <strong>CCS (Certified Coding Specialist)</strong> proves you can handle complex hospital records and ICD-10-PCS.
            </p>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>• Heavy emphasis on Inpatient systems (DRGs).</li>
              <li>• Preferred by large corporate health networks.</li>
              <li>• Higher technical difficulty for the exams.</li>
            </ul>
          </div>
        </div>

        {/* 2026 ALERT BOX */}
        <section className="bg-amber-50 border-l-4 border-amber-400 p-8 rounded-r-3xl mb-16">
          <h4 className="font-black text-amber-900 mb-2 uppercase tracking-tight text-sm">⚠️ 2026 Codebook Alert</h4>
          <p className="text-amber-800 text-sm leading-relaxed">
            Starting May 1st, 2026, all AHIMA exams (CCS and CCS-P) will require the <strong>2026 official codebook sets</strong>. Testing with outdated books will result in an immediate forfeit of exam fees. Ensure your ICD-10-CM and ICD-10-PCS manuals are current before scheduling.
          </p>
        </section>

        {/* FINAL VERDICT CTA */}
        <div className="bg-slate-50 rounded-[40px] p-10 md:p-16 text-center border border-slate-200">
          <h2 className="text-3xl font-black mb-6">Which one should you choose?</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            If you are a beginner, start with the <strong>AAPC CPC</strong>. If you are an experienced coder looking to move into high-paying hospital roles, go for the <strong>AHIMA CCS</strong>.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/tools" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all">
              Practice with our Tools
            </Link>
            <Link href="/billing-specialist-guide/resume-tips" className="bg-white border border-slate-300 text-slate-900 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:border-indigo-600 transition-all">
              Next: Resume Tips →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
