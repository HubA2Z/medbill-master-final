import Link from 'next/link';
import BillerLeadCard from '@/components/BillerLeadCard';

const billingTools = [
  {
    title: "Call Note Builder",
    description: "Structured templates for insurance follow-ups, claim appeals, and representative tracking.",
    link: "/call-note-builder",
    icon: "📞",
    tag: "Insurance Follow-up"
  },
  {
    title: "ICD-10 Intelligence",
    description: "AI-powered diagnostic search with NCD/LCD validation and cross-walking.",
    link: "/",
    icon: "🔍",
    tag: "Coding"
  }
];

export default function ToolsHub() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
            Billing <span className="text-indigo-600">Toolbox</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Professional utilities for the Enhance Billing ecosystem.</p>
        </div>

        {/* TOOLS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {billingTools.map((tool) => (
            <Link key={tool.title} href={tool.link} className="group">
              <div className="h-full bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-indigo-600 transition-all duration-300 flex flex-col">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-2">
                  {tool.tag}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3 underline decoration-transparent group-hover:decoration-indigo-600 transition-all">
                  {tool.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-grow">
                  {tool.description}
                </p>
                <div className="mt-8 flex items-center text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-600 transition-colors">
                  Open Tool 
                  <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>




                  
                </div>

                
              </div>
            </Link>

            
          ))}

          {/* --- NEW LEAD GENERATION SECTION --- */}
          <div className="h-full bg-[#0f172a] p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between border-t-8 border-indigo-500 relative overflow-hidden group">
            {/* Subtle background decoration */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-all"></div>
            
            <div>
  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-900/40">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  </div>
  
  {/* HEADING: Extreme weight, italicized for speed/urgency */}
  <h3 className="text-3xl font-black text-white leading-[1.1] mb-5 tracking-[-0.05em] uppercase italic italic">
    Do you need a <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 underline decoration-indigo-500/50 underline-offset-4">Biller</span>?
  </h3>
  
  {/* BODY: Clean, high-readability tracking */}
  <p className="text-slate-400 text-[13px] leading-relaxed mb-8 tracking-wide font-medium">
    Our experts manage your entire <span className="text-slate-200">revenue cycle</span> so you can focus on patients. Reduce your burden and maximize collections today.
  </p>
</div>

            <Link 
              href="/#audit-form" 
              className="w-full bg-indigo-600 text-white text-center py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-indigo-600 transition-all shadow-xl active:scale-95"
            >
              Book for Free Consultation
            </Link>
          </div>
          {/* --- END LEAD SECTION --- */}

        </div>
      </div>
    </div>
  );
}