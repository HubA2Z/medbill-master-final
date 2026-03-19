import Link from 'next/link';
export default function MissionManifesto() {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-indigo-100">
      {/* 🚀 The Manifesto Hero */}
      <section className="py-28 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 blur-[120px] -mr-32"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
            Precision is <br /> 
            <span className="text-indigo-500 italic">Non-Negotiable.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            In an era of shifting regulations and complex diagnostics, 
            MedBillMaster is the anchor for clinical financial integrity.
          </p>
        </div>
      </section>

      {/* 🏛️ The Three Pillars of Impact */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="text-4xl">⚖️</div>
            <h3 className="text-2xl font-black text-slate-900 uppercase">Eliminating Friction</h3>
            <p className="text-slate-600 leading-relaxed">
              Administrative burden is the #1 cause of physician burnout. Our mission starts by 
              removing the "search fatigue" associated with legacy coding software. We provide 
              answers in milliseconds, not minutes.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-4xl">🎯</div>
            <h3 className="text-2xl font-black text-slate-900 uppercase">Coding Advocacy</h3>
            <p className="text-slate-600 leading-relaxed">
              We don't just provide codes; we advocate for the most accurate representation of 
              patient care. Correct coding ensures that clinics are reimbursed fairly for the 
              complex work they perform every day.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-4xl">🔄</div>
            <h3 className="text-2xl font-black text-slate-900 uppercase">Future Proofing</h3>
            <p className="text-slate-600 leading-relaxed">
              As we move toward ICD-11 and AI-driven denials, our mission is to keep our 
              partners ahead of the curve. We bridge the gap between government data 
              and private practice implementation.
            </p>
          </div>
        </div>
      </section>

      {/* 📡 THE LIVE NLM SECTION (REDESIGNED FOR MISSION) */}
      <section className="bg-slate-50 py-24 px-6 border-y border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter uppercase">The Live NLM Standard</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Most coding tools operate on static, "frozen" databases that are updated 
              quarterly. This is a liability in a modern clinic.
            </p>
            <div className="p-6 bg-white border border-indigo-100 rounded-3xl shadow-sm">
              <p className="text-indigo-900 font-bold mb-2">Direct NLM Clinical Tables Integration</p>
              <p className="text-sm text-slate-500 leading-relaxed">
                MedBillMaster's core engine syncs directly with the National Library of Medicine. 
                When a code is updated at the federal level, it is updated on our platform 
                instantly. No downloads. No delays. 100% 2026 Compliance.
              </p>
            </div>
          </div>
          <div className="md:w-1/2 bg-slate-900 p-12 rounded-[3rem] text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">A Message to Our Partners</h3>
            <p className="text-slate-400 leading-relaxed mb-8 italic">
              "We didn't build MedBillMaster to be another search bar. We built it to be 
              the central nervous system of your billing department. When your codes 
              are right, your revenue is stable, and your focus returns to the patient."
            </p>
            <p className="font-black text-indigo-400 uppercase tracking-widest text-sm">— The Founders, MedBillMaster</p>
          </div>
        </div>
      </section>

      {/* 🤝 THE BILLING PARTNER SECTION */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter uppercase">Become a Billing Partner</h2>
        <p className="text-xl text-slate-600 mb-12 leading-relaxed">
          Beyond our search technology, we offer elite Revenue Cycle Management. 
          We don't just find the codes—we handle the claims, manage the denials, 
          and scale your practice's profitability.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          
         <Link href="/#audit-form" className="inline-block">
  <button className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 uppercase tracking-widest text-sm active:scale-95 hover:-translate-y-1">
    Apply for Partnership
  </button>
</Link>
          
        </div>
      </section>
    </div>
  );
}