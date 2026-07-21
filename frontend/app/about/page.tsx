import Link from 'next/link';

const values = [
  {
    label: 'Accuracy First',
    body: 'Every code lookup is verified against the live NLM Clinical Tables API — not a stale monthly export.',
    icon: '🎯',
  },
  {
    label: 'Zero PHI',
    body: 'We never request, transmit, or store Protected Health Information. Our platform is a B2B reference tool.',
    icon: '🔒',
  },
  {
    label: 'Revenue Impact',
    body: 'Correct coding directly increases collections. We exist to close the gap between documentation and payment.',
    icon: '💰',
  },
  {
    label: 'ICD-11 Ready',
    body: 'Our architecture is already being prepared for the ICD-11 transition — so your team won\'t be caught off guard.',
    icon: '🚀',
  },
];

const stats = [
  { value: '70,000+', label: 'ICD-10 Codes' },
  { value: '500+', label: 'Clinics Served' },
  { value: '98.7%', label: 'Coding Accuracy' },
  { value: '48 hrs', label: 'Avg Audit Turnaround' },
];

export default function About() {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">
      {/* Enhanced Hero */}
      <section className="relative py-32 px-6 bg-slate-950 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-950" />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e520_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 border border-indigo-500/30 bg-indigo-950/50 rounded-2xl text-indigo-400 text-sm font-semibold mb-8 tracking-widest">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-400" />
            </span>
            ESTABLISHED 2026
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 text-white leading-[1.05] tracking-tighter">
            Precision that pays.<br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Every time.</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Enhancely synchronizes with live regulatory data to eliminate coding errors, 
            accelerate reimbursements, and protect your revenue in an evolving healthcare landscape.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <Link
              href="/audit"
              className="px-8 py-4 bg-white text-slate-950 font-semibold rounded-2xl hover:bg-slate-100 transition-all active:scale-[0.985] shadow-xl"
            >
              Start Free Audit
            </Link>
            <Link
              href="#values"
              className="px-8 py-4 border border-white/30 hover:bg-white/5 text-white font-medium rounded-2xl transition-all"
            >
              Learn how we work
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip - More modern */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {stats.map((s, i) => (
            <div 
              key={s.label} 
              className="text-center group"
            >
              <p className="text-4xl md:text-5xl font-black text-white tracking-tighter group-hover:scale-105 transition-transform">
                {s.value}
              </p>
              <p className="text-indigo-100/80 text-sm font-semibold uppercase tracking-[2px] mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-16">
            {/* Vision */}
            <div>
              <div className="uppercase text-indigo-600 text-xs font-bold tracking-[3px] mb-4">OUR MISSION</div>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-6">
                Medical coding is now a data science.
              </h2>
              <div className="prose prose-slate text-lg leading-relaxed">
                <p>
                  The pace of regulatory change in healthcare demands more than static databases. 
                  We built Enhancely to move at the speed of the NLM — delivering real-time accuracy 
                  that protects both patient care and practice revenue.
                </p>
                <p className="mt-6">
                  Every claim tells a story. We make sure it gets paid correctly.
                </p>
              </div>
            </div>

            {/* Live Sync Card - Elevated */}
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-3xl p-10 relative overflow-hidden group">
              <div className="absolute top-6 right-6 text-7xl opacity-10 group-hover:opacity-20 transition-opacity">⚡</div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                <span className="font-mono uppercase text-xs tracking-widest font-semibold text-emerald-600">LIVE INTEGRATION</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Always synced with the National Library of Medicine</h3>
              <p className="text-slate-600 leading-relaxed">
                Direct, low-latency connection to the <strong>NLM Clinical Tables API</strong>. 
                No outdated exports. Every lookup is validated against the latest 2026 schemas in real time.
              </p>
            </div>

            {/* Values Section */}
            <div id="values">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-indigo-600">PRINCIPLES</div>
                  <h3 className="text-3xl font-black tracking-tight">Built Different</h3>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {values.map((v, index) => (
                  <div 
                    key={v.label} 
                    className="bg-white border border-slate-100 hover:border-indigo-200 rounded-3xl p-8 transition-all hover:-translate-y-1 hover:shadow-xl group"
                  >
                    <div className="text-4xl mb-6 transition-transform group-hover:scale-110">{v.icon}</div>
                    <h4 className="font-bold text-xl mb-3 text-slate-900">{v.label}</h4>
                    <p className="text-slate-600 leading-relaxed">{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-5 lg:sticky lg:top-12 space-y-8">
            {/* Primary CTA Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-10 text-white shadow-2xl">
              <div className="uppercase text-indigo-200 text-xs font-bold tracking-widest mb-3">FOR CLINICS</div>
              <h3 className="text-3xl font-black leading-none tracking-tighter mb-6">
                Your revenue deserves better than guesswork.
              </h3>
              
              <p className="text-indigo-100 mb-8">
                From real-time code validation to full denial management — we handle the complexity so you can focus on care.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  'Full Revenue Cycle Management',
                  'Denial Appeals & Recovery',
                  'Rapid 48-Hour Audits',
                  'E/M Optimization',
                  'ICD-11 Transition Support'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-1 block w-4 h-4 bg-white/20 rounded flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/#audit-form"
                className="block w-full bg-white hover:bg-slate-100 active:bg-white text-center py-4 px-8 text-indigo-700 font-bold rounded-2xl transition-all text-sm uppercase tracking-widest shadow-inner"
              >
                Become a Partner →
              </Link>
            </div>

            {/* Trust Card */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 bg-white text-emerald-600 text-xs font-mono tracking-widest rounded-full flex items-center gap-1.5 border">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  COMPLIANT
                </div>
              </div>
              
              <p className="font-semibold text-slate-900 mb-2">HIPAA + SOC 2 Ready</p>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                Zero PHI exposure. We are a pure B2B reference and revenue operations platform. 
                All communications are encrypted end-to-end.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-950 py-24 px-6 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <div className="inline text-indigo-400 text-sm font-mono tracking-[3px] mb-4 block">NEXT STEP</div>
          <h2 className="text-5xl font-black tracking-tighter mb-6">Stop leaving money on the table.</h2>
          <p className="text-slate-400 text-lg mb-10">
            Get a complimentary 48-hour revenue integrity audit from our senior coding team.
          </p>
          
          <Link
            href="/audit"
            className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold text-base hover:bg-slate-100 transition-all active:scale-95 shadow-2xl"
          >
            Claim Your Free Audit
            <span aria-hidden="true" className="text-xl">→</span>
          </Link>
          
          <p className="text-xs text-slate-500 mt-8">No obligation. Results in 48 hours.</p>
        </div>
      </section>
    </div>
  );
}
