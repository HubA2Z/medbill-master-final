import Link from 'next/link';

const billingTools = [
  {
    title: 'ICD-10 Intelligence',
    description: 'Real-time search across 70,000+ ICD-10-CM codes via live NLM Clinical Tables. Smart synonyms, autocomplete, and instant copy.',
    link: '/icd10-intelligence',
    tag: 'Core Tool',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
      </svg>
    ),
  },
  {
    title: 'Call Note Builder',
    description: 'Professional templates for insurance calls, appeals, denial tracking, and payer correspondence.',
    link: '/call-note-builder',
    tag: 'Workflow',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
];

const comingSoon = [
  { 
    title: 'Claim Scrubber', 
    description: 'Automatically detect unbundling issues, modifier errors, and compliance risks before submission.' 
  },
  { 
    title: 'E/M Level Advisor', 
    description: 'Upload encounter notes and receive instant, guideline-based E/M coding recommendations.' 
  },
  { 
    title: 'Denial Tracker', 
    description: 'Monitor denial trends, root causes, and recovery performance across all payers.' 
  },
];

export default function ToolsHub() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 py-24 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm mb-6">
            <span className="text-emerald-400">●</span>
            PROFESSIONAL TOOLKIT
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter mb-6">
            Tools that actually<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">move the needle.</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Purpose-built utilities for medical billers, coders, and revenue cycle teams.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Available Tools */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-widest text-indigo-600">Available Now</p>
          <div className="h-px bg-slate-200 flex-1 mx-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {billingTools.map((tool) => (
            <Link 
              key={tool.title} 
              href={tool.link} 
              className="group"
            >
              <div className="h-full bg-white border border-slate-100 hover:border-indigo-200 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                    {tool.icon}
                  </div>
                  <span className="px-4 py-1 text-xs font-bold bg-indigo-50 text-indigo-700 rounded-full tracking-widest">
                    {tool.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-black mb-3 tracking-tight">{tool.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-8 flex-1">{tool.description}</p>

                <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  Launch Tool
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Coming Soon</p>
          <div className="h-px bg-slate-200 flex-1 mx-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {comingSoon.map((tool) => (
            <div 
              key={tool.title} 
              className="bg-white border border-dashed border-slate-300 hover:border-slate-400 rounded-3xl p-8 transition-all group"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-2xl mb-6 group-hover:bg-slate-200 transition-colors" />
              <h3 className="font-bold text-lg mb-2 text-slate-900">{tool.title}</h3>
              <p className="text-slate-500 text-[15px] leading-relaxed">{tool.description}</p>
              
              <div className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-4 py-2 rounded-2xl">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                In Development
              </div>
            </div>
          ))}
        </div>

        {/* Career Authority Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-10 md:p-16 mb-20 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-2/5">
            <div className="inline-flex items-center gap-3 bg-white/10 px-5 py-2 rounded-2xl mb-6">
              <span className="text-2xl">📈</span>
              <span className="font-semibold tracking-wide">CAREER GROWTH</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight leading-none mb-6">
              What does a Billing Specialist actually do in 2026?
            </h2>
          </div>

          <div className="lg:w-3/5 space-y-6">
            <p className="text-slate-300 text-lg leading-relaxed">
              Explore detailed billing specialist job descriptions, salary ranges, required certifications, 
              and the skills that separate top performers in Revenue Cycle Management.
            </p>
            
            <Link
              href="/billing-specialist-guide"
              className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all group"
            >
              Read the Full Career Guide
              <span className="group-hover:translate-x-1 transition">→</span>
            </Link>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-white border border-slate-200 rounded-3xl p-10 md:p-16 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-indigo-600 text-sm font-black tracking-[2px] mb-4">REVENUE CYCLE SUPPORT</div>
            <h3 className="text-4xl font-black tracking-tight mb-6">
              Need full-service billing support?
            </h3>
            <p className="text-slate-600 text-lg mb-10">
              Let our certified team handle your revenue cycle from end to end — so you can focus on patient care.
            </p>
            
            <Link
              href="/#audit-form"
              className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-2xl font-bold text-lg tracking-wider transition-all active:scale-95 shadow-lg"
            >
              Book a Free Revenue Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
