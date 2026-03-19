import Link from 'next/link';
export default function HIPAACompliance() {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-indigo-100 text-slate-900">
      {/* 🛡️ Clinical Header Section */}
      <section className="py-24 px-6 bg-[#0f172a] text-white relative overflow-hidden">
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-xs font-bold mb-8 uppercase tracking-[0.2em]">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            Health Data Security Protocol
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">
            HIPAA <span className="text-indigo-500 underline decoration-indigo-500/30 underline-offset-8">Compliance</span> & <br /> Data Integrity
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            EnhanceBilling operates under strict adherence to the Administrative Simplification 
            provisions of the Health Insurance Portability and Accountability Act.
          </p>
        </div>
      </section>

      {/* 📑 The Compliance Framework */}
      <section className="max-w-6xl mx-auto py-24 px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* LEFT: The "Quick Verification" Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-200 pb-2">
                Verification Matrix
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-1">✓</div>
                  <div>
                    <span className="block font-bold text-slate-800">SSL/TLS 1.3</span>
                    <span className="text-xs text-slate-500 italic">Encrypted Data Transit</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-1">✓</div>
                  <div>
                    <span className="block font-bold text-slate-800">No PHI Storage</span>
                    <span className="text-xs text-slate-500 italic">B2B Information Only</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-1">✓</div>
                  <div>
                    <span className="block font-bold text-slate-800">AES-256</span>
                    <span className="text-xs text-slate-500 italic">Lead Data Encryption</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* B2B Billing Partner Card */}
            <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
              <h4 className="font-black text-xl mb-4 leading-tight">Business Associate Agreement (BAA)</h4>
              <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                Are you a Covered Entity looking to partner with EnhanceBilling for billing? 
                We provide full BAA documentation for all partnership clients.
              </p>
             <Link href="/#audit-form" className="block w-full">
  <button className="w-full bg-white text-indigo-600 font-black py-4 rounded-xl text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all active:scale-[0.98] shadow-sm hover:shadow-md">
    Request BAA
  </button>
</Link>
            </div>
          </div>

          {/* RIGHT: Deep Document Content */}
          <div className="lg:col-span-2 space-y-16">
            <section className="prose prose-slate max-w-none">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-6">1. Non-PHI Environment Declaration</h2>
              <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-indigo-600 pl-6 bg-slate-50 py-4 rounded-r-xl">
                "EnhanceBilling is engineered as a reference utility for the healthcare billing industry. 
                Our public search infrastructure does not require, request, or store Protected Health Information (PHI)."
              </p>
              <p className="text-lg text-slate-600 mt-6">
                As a B2B platform, we only collect business-level information (Clinic Name, Provider Email) for the purpose 
                of revenue cycle consulting. We strictly prohibit users from entering patient names, SSNs, 
                or date-of-birth data into our search queries or lead forms.
              </p>
            </section>

            <section className="prose prose-slate max-w-none">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-6">2. Technical Safeguards</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-2 underline decoration-indigo-200">Access Control</h4>
                  <p className="text-sm text-slate-500">Only authorized personnel with verified credentials can access Lead Management dashboards, which are protected by Multi-Factor Authentication (MFA).</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-2 underline decoration-indigo-200">Transmission Security</h4>
                  <p className="text-sm text-slate-500">Every search performed on EnhanceBilling is routed via a secure HTTPS connection, ensuring data remains confidential between the provider and our NLM gateway.</p>
                </div>
              </div>
            </section>

            <section className="prose prose-slate max-w-none">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-6">3. Administrative Simplification</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                In alignment with 2026 CMS standards, EnhanceBilling streamlines the administrative burden 
                of medical coding. By providing a secure portal for ICD-10-CM research, we help clinics 
                maintain their own HIPAA compliance by reducing human error in the coding process—a 
                major source of data breaches and audit failures.
              </p>
            </section>
          </div>

        </div>
      </section>
    </div>
  );
}