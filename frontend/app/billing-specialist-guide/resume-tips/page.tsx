import Link from 'next/link';

export default function JobDescriptionGuide() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* HEADER */}
      <header className="bg-indigo-600 py-20 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="mb-8">
            <Link href="/billing-specialist-guide" className="text-xs font-bold text-indigo-200 uppercase tracking-widest hover:text-white transition-colors">
              ← Back to Main Guide
            </Link>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            The 2026 <span className="text-indigo-200">Billing Specialist</span> Job Description
          </h1>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you are a clinic looking to hire or a specialist building a resume, these are the high-impact requirements for modern RCM.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        
        {/* HIRING MANAGER ADVISORY (THE CONVERSION HOOK) */}
        <section className="mb-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] p-10 text-center">
          <h2 className="text-2xl font-black mb-4 tracking-tight">Hiring a Biller is expensive. <span className="text-indigo-600">Outsourcing is efficient.</span></h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            The average cost of a full-time billing specialist in 2026 exceeds <strong>$65,000/year</strong> plus benefits. Most clinics see a 15% increase in collections by switching to a dedicated RCM partner instead of hiring in-house.
          </p>
          <Link href="/#audit-form" className="inline-block bg-slate-900 text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl">
            Skip the Hire - Request an Audit
          </Link>
        </section>

        {/* THE TEMPLATE SECTION */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-slate-900">Standard Job Description</h2>
            <span className="hidden sm:block text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200 px-3 py-1 rounded-full">
              Copy-Paste Ready
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm prose prose-slate max-w-none">
            <h3 className="text-xl font-bold mb-4">Role Overview</h3>
            <p>We are seeking a <strong>Medical Billing Specialist</strong> to manage the full revenue cycle, ensuring claim accuracy and maximum reimbursement through meticulous follow-up and denial management.</p>
            
            <h4 className="font-bold">Key Responsibilities:</h4>
            <ul className="space-y-2 text-slate-600">
              <li>• Audit clinical documentation for ICD-10 and CPT code accuracy.</li>
              <li>• Submit electronic and paper claims to primary and secondary payers.</li>
              <li>• Conduct <strong>Insurance Follow-up</strong> using standardized call note builders.</li>
              <li>• Resolve <strong>NCCI Edits</strong> and manage complex modifier logic (59, XS, XP).</li>
              <li>• Identify denial patterns and provide root-cause analysis for clinic leadership.</li>
            </ul>

            <h4 className="font-bold mt-8">Required Qualifications:</h4>
            <ul className="space-y-2 text-slate-600">
              <li>• 2+ years of experience in Medical Billing or Revenue Cycle Management.</li>
              <li>• Proficiency with modern RCM tools and EHR/PMS systems.</li>
              <li>• Certification preferred: <strong>AAPC CPC</strong> or <strong>AHIMA CCS</strong>.</li>
              <li>• Strong understanding of HIPAA compliance and False Claims Act regulations.</li>
            </ul>
          </div>
        </section>

        {/* WHY OUTSOURCE SECTION (SALES COPY) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="space-y-4">
            <h3 className="text-2xl font-black">Why Providers are Moving Away from In-House Billing</h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              In 2026, the complexity of payer rules changes weekly. In-house staff often lack the specialized tools (like real-time ICD-10 intelligence) required to stay ahead of AI-driven denials. 
            </p>
          </div>
          <div className="bg-indigo-50 p-8 rounded-3xl space-y-4">
            <h4 className="font-black text-indigo-900">The Outsourcing Advantage:</h4>
            <ul className="space-y-3 text-sm text-indigo-800/80">
              <li className="flex items-center gap-2">✓ Lower Overhead (No benefits/office space)</li>
              <li className="flex items-center gap-2">✓ Advanced Denial Management Tech</li>
              <li className="flex items-center gap-2">✓ 98% First-Pass Clean Claim Rate</li>
              <li className="flex items-center gap-2">✓ Monthly Performance Reporting</li>
            </ul>
          </div>
        </div>

        {/* FINAL CONVERSION CARD */}
        <section className="bg-slate-900 rounded-[40px] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4 tracking-tight">Stop Managing Billers. Start Managing Patients.</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              We provide the expertise and the tools (Call Note Builders, Coding Intelligence) so your clinic can thrive without the HR headache.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/#audit-form" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all">
                Get a Custom Quote
              </Link>
              <Link href="/tools" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all border border-white/20">
                Explore our Tools
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
