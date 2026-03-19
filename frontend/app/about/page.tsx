import Link from 'next/link';

export default function OurMission() {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-indigo-100">
      {/* 🏔️ Deep Hero Section */}
      <section className="relative py-32 px-6 bg-slate-900 overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block px-4 py-1 border border-indigo-500 rounded-full text-indigo-400 text-xs font-bold mb-6 tracking-widest uppercase">
            ESTABLISHED 2026
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 text-white leading-tight">
            The Standard in <span className="text-indigo-500">Clinical Accuracy.</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed font-medium">
            EnhanceBilling exists to eliminate the financial friction in modern healthcare through 
            data-driven precision and live regulatory synchronization.
          </p>
        </div>
      </section>

      {/* 🏢 Core Mission Content */}
      <section className="max-w-5xl mx-auto py-24 px-6">
        <div className="grid md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-7 space-y-12">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter uppercase">Our Vision</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Medical coding is no longer a manual administrative task—it is a data science. 
                With the rapid evolution of ICD-10-CM and the upcoming transition into more 
                complex diagnosis modeling, providers need a partner who moves at the speed of the NLM.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                We believe that every medical claim represents a patient’s journey and a provider’s 
                dedication. Our mission is to ensure that journey is never interrupted by 
                avoidable administrative denials.
              </p>
            </div>

            {/* 📡 THE LIVE NLM SYNC BLOCK (STAYING) */}
            <div className="bg-slate-50 border-l-8 border-indigo-600 p-10 rounded-r-3xl">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">📡</span>
                <h3 className="text-2xl font-bold text-slate-900">Live NLM Sync</h3>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed">
                We maintain a direct, low-latency integration with the <strong>National Library of Medicine (NLM) Clinical Tables API</strong>. 
                While other tools rely on monthly database exports, EnhanceBilling verifies every 
                query against the live 2026 code schemas in real-time.
              </p>
            </div>
          </div>

          {/* 💰 SIDEBAR: THE BILLING PARTNER PITCH (NEW) */}
          <div className="md:col-span-5 sticky top-32">
            <div className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl transform md:rotate-2">
              <h3 className="text-3xl font-black mb-6 leading-tight uppercase">Your Global Billing Partner</h3>
              <p className="text-indigo-100 mb-8 leading-relaxed font-medium">
                Searching for codes is just the beginning. EnhanceBilling offers full-cycle 
                Revenue Management for specialized clinics.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 font-bold">
                  <span className="w-5 h-5 bg-white text-indigo-600 rounded-full flex items-center justify-center text-[10px]">✓</span> 
                  Full Claim Outsourcing
                </li>
                <li className="flex items-center gap-3 font-bold">
                  <span className="w-5 h-5 bg-white text-indigo-600 rounded-full flex items-center justify-center text-[10px]">✓</span> 
                  Denial Management
                </li>
                <li className="flex items-center gap-3 font-bold">
                  <span className="w-5 h-5 bg-white text-indigo-600 rounded-full flex items-center justify-center text-[10px]">✓</span> 
                  24-Hour Coding Audits
                </li>
              </ul>
              <Link href="/#audit-form" className="block w-full">
  <button className="w-full bg-white text-indigo-900 font-black py-5 rounded-2xl hover:bg-slate-100 transition tracking-widest uppercase text-sm shadow-xl shadow-indigo-900/20 active:scale-95">
    Partner With Us
  </button>
</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 🌎 Deep Data Content (Rich SEO Layer) */}
      <section className="bg-slate-50 py-24 px-6 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-12 uppercase tracking-tighter">Engineered for Accuracy</h2>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="bg-white p-8 rounded-3xl border border-slate-200">
              <h4 className="font-black text-indigo-600 mb-3 uppercase tracking-widest text-xs">Security</h4>
              <p className="text-slate-700 leading-relaxed font-medium italic">"We treat clinic data as the highest form of corporate trust."</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200">
              <h4 className="font-black text-indigo-600 mb-3 uppercase tracking-widest text-xs">Innovation</h4>
              <p className="text-slate-700 leading-relaxed font-medium italic">"Bridging the gap between government clinical data and private clinic revenue."</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}