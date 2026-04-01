import Link from 'next/link';

export default function BillingResumeAndProviderGuide() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* 1. HERO SECTION */}
      <header className="bg-white border-b border-slate-200 pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="mb-6">
            <Link href="/billing-specialist-guide" className="text-xs font-bold text-indigo-600 uppercase tracking-widest hover:underline">
              ← Back to Career Guide
            </Link>
          </nav>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
            The 2026 <span className="text-indigo-600">Biller’s Edge</span>: Skills & Professional Strategy
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Whether you are crafting a world-class resume or a provider looking for elite RCM results, 
            precision is the only metric that matters.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: THE SPECIALIST GUIDE (7 UNITS) */}
          <div className="lg:col-span-7 space-y-12">
            <section>
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm">01</span>
                The 2026 Skill Stack
              </h2>
              <p className="text-slate-600 mb-6 italic border-l-4 border-indigo-100 pl-4">
                "In 2026, a resume that only mentions 'Data Entry' will be ignored. Modern RCM requires technical mastery."
              </p>
              
              <div className="space-y-6">
                <div className="p-5 bg-white border border-slate-200 rounded-2xl">
                  <h4 className="font-bold text-slate-900 mb-1">Advanced Denial Analytics</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Don't just fix denials; prevent them. Highlight your ability to use root-cause analysis to identify payer patterns and NCCI unbundling errors.</p>
                </div>
                <div className="p-5 bg-white border border-slate-200 rounded-2xl">
                  <h4 className="font-bold text-slate-900 mb-1">Eligibility & Pre-Auth Logic</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Showcase experience with real-time eligibility verification to reduce "Member Not Eligible" rejections—the #1 revenue killer in 2026.</p>
                </div>
                <div className="p-5 bg-white border border-slate-200 rounded-2xl">
                  <h4 className="font-bold text-slate-900 mb-1">Compliance & Ethics</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Ensure HIPAA, False Claims Act, and OIG guidelines are front and center. Precision coding is a legal requirement, not a suggestion.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm">02</span>
                Resume Power-Phrases
              </h2>
              <div className="bg-slate-900 rounded-3xl p-8 text-indigo-100 font-mono text-sm leading-relaxed">
                <p className="mb-4 text-indigo-400">// Replace "Responsible for billing" with:</p>
                <ul className="space-y-3">
                  <li>• "Maintained a 98.5% first-pass clean claim rate across 500+ weekly submissions."</li>
                  <li>• "Reduced Days in A/R from 45 to 31 through strategic payer follow-up."</li>
                  <li>• "Managed complex appeals for surgical modifiers 51, 59, and XS, recovering $45k in lost revenue."</li>
                </ul>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: THE PROVIDER'S PERSPECTIVE (5 UNITS) */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 space-y-8">
              
              {/* PROVIDER CARD */}
              <div className="bg-white border-2 border-indigo-600 rounded-[32px] p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <span className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Expert Partner</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">Are you a Provider?</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Stop settling for "good enough" billing. We provide a team of <strong>proven billing experts</strong> who treat your revenue as their own.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm font-medium">
                    <span className="text-indigo-600">✓</span> 98% First-Pass Clean Claims
                  </li>
                  <li className="flex items-start gap-2 text-sm font-medium">
                    <span className="text-indigo-600">✓</span> Dedicated Denial Recovery Team
                  </li>
                  <li className="flex items-start gap-2 text-sm font-medium">
                    <span className="text-indigo-600">✓</span> Full HIPAA & Security Compliance
                  </li>
                </ul>
                <Link href="/#audit-form" className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                  Request Free Practice Audit
                </Link>
              </div>

              {/* LEAD MAGNET CHECKLIST BOX */}
              <div className="bg-indigo-900 rounded-[32px] p-8 text-white">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Free Resource</p>
                <h3 className="text-xl font-black mb-4">2026 Revenue Leak Checklist</h3>
                <p className="text-indigo-200 text-xs leading-relaxed mb-6">
                  Is your current process losing money? Audit your practice in 10 minutes with our professional checklist.
                </p>
                <div className="space-y-4 mb-8">
                   <div className="flex items-center gap-3 text-xs">
                     <div className="w-5 h-5 rounded bg-indigo-500/30 flex items-center justify-center">1</div>
                     <span>Check Days in A/R Trends</span>
                   </div>
                   <div className="flex items-center gap-3 text-xs">
                     <div className="w-5 h-5 rounded bg-indigo-500/30 flex items-center justify-center">2</div>
                     <span>Identify Unworked Denials</span>
                   </div>
                </div>
                <Link href="/#audit-form" className="flex items-center justify-center gap-2 w-full bg-white text-indigo-900 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                   Download Checklist
                </Link>
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: THE PROMISE */}
        <section className="mt-24 bg-white border border-slate-200 rounded-[40px] p-12 text-center">
          <h2 className="text-3xl font-black mb-4">Precision is Profit.</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-8">
            Whether you are looking to advance your career or optimize your clinic's collections, 
            Enhancebilling provides the tools and expertise to make it happen.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/tools" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all">
              Try Coding Tools
            </Link>
            <Link href="/#audit-form" className="bg-white border border-slate-300 text-slate-900 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:border-indigo-600 transition-all">
              Consult with our Team
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
