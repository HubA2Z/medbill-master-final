import Link from 'next/link';

export default function BillingSpecialistPillar() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* 1. HERO SECTION */}
      <header className="bg-slate-50 border-b border-slate-200 pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="mb-6">
            <Link href="/tools" className="text-xs font-bold text-indigo-600 uppercase tracking-widest hover:underline">
              ← Back to Toolbox
            </Link>
          </nav>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6">
            The Ultimate Guide to Becoming a <span className="text-indigo-600">Billing Specialist</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about the 2026 medical billing landscape: from salary benchmarks and certifications to the daily tools of the trade.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        
        {/* 2. "AT A GLANCE" TABLE (FOR SEO SNIPPETS) */}
        <section className="mb-16">
          <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-2xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-indigo-500 p-1 rounded-md text-xs uppercase">2026 Data</span> 
              Quick Snapshot
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border-l-2 border-indigo-500 pl-4">
                <p className="text-indigo-300 text-xs font-bold uppercase mb-1">Average Salary</p>
                <p className="text-2xl font-black">$48,000 - $72,000</p>
              </div>
              <div className="border-l-2 border-indigo-500 pl-4">
                <p className="text-indigo-300 text-xs font-bold uppercase mb-1">Job Growth</p>
                <p className="text-2xl font-black">+9.2% (Steady)</p>
              </div>
              <div className="border-l-2 border-indigo-500 pl-4">
                <p className="text-indigo-300 text-xs font-bold uppercase mb-1">Top Certification</p>
                <p className="text-2xl font-black">CPC (AAPC)</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CLUSTER NAVIGATION (THE "SPOKES") */}
        <section className="mb-20">
          <h2 className="text-3xl font-black mb-8 text-slate-900">Explore Key Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/billing-specialist-guide/salary" className="p-6 border border-slate-200 rounded-2xl hover:border-indigo-600 transition-all group">
              <h3 className="font-bold mb-2 group-hover:text-indigo-600">Salary Guide →</h3>
              <p className="text-xs text-slate-500">Pay by state, experience, and remote opportunities.</p>
            </Link>
            <Link href="/billing-specialist-guide/certification" className="p-6 border border-slate-200 rounded-2xl hover:border-indigo-600 transition-all group">
              <h3 className="font-bold mb-2 group-hover:text-indigo-600">Certifications →</h3>
              <p className="text-xs text-slate-500">Comparing CPC vs. CCS vs. CPB for career growth.</p>
            </Link>
            <Link href="/billing-specialist-guide/resume-tips" className="p-6 border border-slate-200 rounded-2xl hover:border-indigo-600 transition-all group">
              <h3 className="font-bold mb-2 group-hover:text-indigo-600">Career Tips →</h3>
              <p className="text-xs text-slate-500">Resume templates and interview prep for RCM roles.</p>
            </Link>
          </div>
        </section>

        {/* 4. CONTENT MODULAR SECTION: JOB DESCRIPTION */}
        <article className="prose prose-slate max-w-none">
          <h2 className="text-3xl font-black mb-6">What is a Billing Specialist?</h2>
          <p className="text-slate-600 leading-7 mb-6">
            A <strong>Medical Billing Specialist</strong> ensures that healthcare providers are reimbursed for their services. In 2026, this role has evolved beyond simple data entry into a data-driven RCM (Revenue Cycle Management) position that requires mastery of insurance policies, NCCI edits, and clinical documentation.
          </p>
          
          <h3 className="text-xl font-bold mb-4">Core Responsibilities</h3>
          <ul className="space-y-4 mb-10">
            <li className="flex gap-3">
              <span className="text-indigo-600 font-bold">✓</span>
              <span><strong>Claim Submission:</strong> Translating clinical notes into standardized CPT and ICD-10 codes.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-600 font-bold">✓</span>
              <span><strong>Insurance Follow-up:</strong> Communicating with payers to resolve unpaid or underpaid claims.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-600 font-bold">✓</span>
              <span><strong>Denial Management:</strong> Identifying root causes of claim rejections and filing appeals.</span>
            </li>
          </ul>

          {/* INTERNAL AD: LINKING BACK TO YOUR TOOL */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 my-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-black text-lg mb-1">Ready to work faster?</h4>
              <p className="text-sm text-slate-500">Use our free Call Note Builder to standardize your insurance follow-ups.</p>
            </div>
            <Link href="/call-note-builder" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all">
              Open Tool
            </Link>
          </div>
        </article>

      </main>
    </div>
  );
}
