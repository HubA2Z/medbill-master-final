import Link from 'next/link';

const billingTools = [
  {
    title:       'ICD-10 Intelligence',
    description: 'Search 70,000+ ICD-10-CM codes in real time via NLM Clinical Tables. Autocomplete, synonym mapping, and one-click copy.',
    link:        '/icd10-intelligence',
    tag:         'Coding',
    icon: (
      <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
      </svg>
    ),
  },
  {
    title:       'Call Note Builder',
    description: 'Structured templates for insurance follow-up calls, claim appeals, denial tracking, and representative notes.',
    link:        '/call-note-builder',
    tag:         'Insurance Follow-up',
    icon: (
      <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
];

const comingSoon = [
  { title: 'Claim Scrubber',     description: 'Auto-detect unbundling errors and modifier mismatches before submission.' },
  { title: 'E/M Level Advisor',  description: 'Upload encounter notes and get an instant E/M coding recommendation.' },
  { title: 'Denial Tracker',     description: 'Track and manage denial patterns across payers with root-cause analysis.' },
];

export default function ToolsHub() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-14 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-3">Professional Utilities</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
            Billing <span className="text-indigo-600">Toolbox</span>
          </h1>
          <p className="text-slate-500 text-base">
            Precision tools built for medical billing specialists and clinic administrators.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-14">

        {/* Active tools */}
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Available Now</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {billingTools.map((tool) => (
            <Link key={tool.title} href={tool.link} className="group block">
              <div className="h-full bg-white border border-slate-200 rounded-2xl p-7 hover:border-indigo-400 hover:shadow-lg transition-all duration-200 flex flex-col">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                    {tool.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-full">
                    {tool.tag}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{tool.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed grow">{tool.description}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600 group-hover:gap-3 transition-all">
                  Open Tool
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming soon */}
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Coming Soon</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {comingSoon.map((tool) => (
            <div key={tool.title} className="bg-white border border-dashed border-slate-300 rounded-2xl p-6 opacity-60">
              <div className="w-10 h-10 bg-slate-100 rounded-xl mb-4" />
              <h3 className="font-bold text-slate-700 mb-1">{tool.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{tool.description}</p>
              <span className="mt-4 inline-block text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200 px-2.5 py-1 rounded-full">
                In Development
              </span>
            </div>
          ))}
        </div>

        {/* Lead card */}
        <div className="relative bg-slate-900 rounded-3xl p-10 text-white overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">Revenue Cycle Management</p>
              <h3 className="text-3xl font-black mb-3 tracking-tight">
                Do you need a <span className="text-indigo-400">Biller</span>?
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                Our experts manage your entire revenue cycle so you can focus on patients.
                Reduce your billing burden and maximize collections today.
              </p>
            </div>
            <Link
              href="/#audit-form"
              className="shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
