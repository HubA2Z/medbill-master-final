import Link from 'next/link';

const values = [
  {
    label: 'Accuracy First',
    body:  'Every code lookup is verified against the live NLM Clinical Tables API — not a stale monthly export.',
  },
  {
    label: 'Zero PHI',
    body:  'We never request, transmit, or store Protected Health Information. Our platform is a B2B reference tool.',
  },
  {
    label: 'Revenue Impact',
    body:  'Correct coding directly increases collections. We exist to close the gap between documentation and payment.',
  },
  {
    label: 'ICD-11 Ready',
    body:  'Our architecture is already being prepared for the ICD-11 transition — so your team won\'t be caught off guard.',
  },
];

const stats = [
  { value: '70,000+', label: 'ICD-10 Codes' },
  { value: '500+',    label: 'Clinics Served' },
  { value: '98.7%',  label: 'Coding Accuracy' },
  { value: '48 hrs', label: 'Avg Audit Turnaround' },
];

export default function About() {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">

      {/* Hero */}
      <section className="relative py-28 px-6 bg-slate-900 overflow-hidden text-center">
        <div className="absolute inset-0 bg-indigo-600/5" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-indigo-500/40 bg-indigo-500/10 rounded-full text-indigo-400 text-xs font-bold mb-6 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
            Established 2026
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 text-white leading-[1.05] tracking-tight">
            The Standard in<br />
            <span className="text-indigo-400">Clinical Accuracy.</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            EnhanceBilling exists to eliminate financial friction in modern healthcare through
            data-driven precision and live regulatory synchronization.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <div className="bg-indigo-600">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`px-8 py-6 text-center text-white ${i < stats.length - 1 ? 'border-r border-indigo-500/50' : ''}`}>
              <p className="text-3xl font-black">{s.value}</p>
              <p className="text-indigo-200 text-xs font-semibold uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission + Sidebar */}
      <section className="max-w-5xl mx-auto py-20 px-6">
        <div className="grid md:grid-cols-12 gap-14 items-start">

          {/* Left content */}
          <div className="md:col-span-7 space-y-10">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-3">Our Vision</p>
              <h2 className="text-3xl font-black text-slate-900 mb-5 tracking-tight">
                Medical coding is now a data science.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                With the rapid evolution of ICD-10-CM and the impending ICD-11 transition, providers need a
                partner who moves at the speed of the NLM — not the speed of quarterly database refreshes.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Every medical claim represents a patient&apos;s journey and a provider&apos;s dedication.
                Our mission is to ensure that journey is never interrupted by avoidable administrative denials.
              </p>
            </div>

            {/* Live NLM Sync card */}
            <div className="bg-slate-50 border-l-4 border-indigo-600 pl-8 pr-6 py-7 rounded-r-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <h3 className="text-lg font-black text-slate-900">Live NLM Sync</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We maintain a direct, low-latency integration with the{' '}
                <strong>National Library of Medicine Clinical Tables API</strong>. While other tools
                rely on monthly exports, EnhanceBilling verifies every query against live 2026 code
                schemas in real time.
              </p>
            </div>

            {/* Values grid */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-5">Our Principles</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {values.map((v) => (
                  <div key={v.label} className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h4 className="font-black text-slate-900 mb-2">{v.label}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar CTA */}
          <div className="md:col-span-5 sticky top-28">
            <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-2xl">
              <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-4">Billing Partnership</p>
              <h3 className="text-2xl font-black mb-3 leading-tight">
                Your Global Revenue Partner
              </h3>
              <p className="text-indigo-100 text-sm leading-relaxed mb-7">
                Code search is just the start. EnhanceBilling offers full-cycle revenue management
                for specialized clinics worldwide.
              </p>
              <ul className="space-y-3 mb-8">
                {['Full Claim Outsourcing', 'Denial Management & Appeals', '24-Hour Coding Audits', 'E/M Level Optimization'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-semibold">
                    <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/#audit-form"
                className="block w-full bg-white text-indigo-700 font-black py-4 rounded-xl text-center text-sm uppercase tracking-widest hover:bg-slate-50 transition active:scale-95 shadow-lg"
              >
                Partner With Us →
              </Link>
            </div>

            {/* Secondary info card */}
            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">HIPAA Compliant</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                All data transit is encrypted via SSL/TLS 1.3. We operate as a non-PHI B2B platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA section */}
      <section className="bg-slate-50 border-t border-slate-200 py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 mb-4">Ready to stop leaving revenue on the table?</h2>
          <p className="text-slate-500 mb-8">Request a free 48-hour revenue audit from our certified billing team.</p>
          <Link
            href="/audit"
            className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition shadow-lg"
          >
            Get Free Revenue Audit
          </Link>
        </div>
      </section>
    </div>
  );
}
