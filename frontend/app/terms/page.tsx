const sections = [
  {
    id:    'A',
    title: 'Acceptance of Terms',
    body:  'By accessing Enhancely, you agree to be bound by these Terms and all applicable laws and regulations governing the United States healthcare sector. If you do not agree with any part of these terms, you may not access the service.',
  },
  {
    id:    'B',
    title: 'Use License',
    body:  'Permission is granted to licensed medical billing professionals and clinic administrators to use this search engine for legitimate claim submission research. You may not scrape, reproduce, or redistribute this site\'s content for commercial database resale or competing services.',
  },
  {
    id:    'C',
    title: 'Accuracy Disclaimer',
    body:  'Enhancely is a reference tool powered by the NLM Clinical Tables API. We do not guarantee the accuracy or completeness of ICD-10-CM codes. All final coding decisions must be verified by a Certified Professional Coder (CPC) or equivalent credentialed specialist.',
  },
  {
    id:    'D',
    title: 'No PHI Submission',
    body:  'You must not enter Protected Health Information (PHI) — including patient names, Social Security Numbers, or dates of birth — into any search field or form on this platform. EnhanceBilling is a B2B reference utility, not a patient-facing application.',
  },
  {
    id:    'E',
    title: 'Financial Liability',
    body:  'In no event shall Enhancely or its partners be liable for any damages arising out of the use or inability to use this platform, including but not limited to claim denials, audit findings, or loss of clinic revenue resulting from reliance on search results.',
  },
  {
    id:    'F',
    title: 'Modifications',
    body:  'Enhancely reserves the right to revise these terms at any time without notice. By continuing to use the platform after changes are posted, you agree to be bound by the revised terms.',
  },
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto py-16 px-6">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-3">Legal</p>
          <h1 className="text-4xl font-black tracking-tight mb-2">Terms of Service</h1>
          <p className="text-sm text-slate-400 italic">
            Last updated: March 2026 · Enhancely Platform
          </p>
        </div>

        {/* Disclaimer banner */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-10">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z" />
            </svg>
            <div>
              <p className="font-bold text-indigo-900 mb-1">Important Notice</p>
              <p className="text-indigo-800 text-sm leading-relaxed">
                Enhancely is a reference tool. We do not guarantee the accuracy of ICD-10-CM
                codes returned by search queries. Final coding decisions must be verified by a
                Certified Professional Coder (CPC).
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
          {sections.map((s) => (
            <div key={s.id} className="p-7">
              <h2 className="font-black text-slate-900 mb-2 flex items-center gap-2.5">
                <span className="w-6 h-6 bg-indigo-600 text-white rounded-md flex items-center justify-center text-xs font-black shrink-0">
                  {s.id}
                </span>
                {s.title}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 text-center mt-8">
          © {new Date().getFullYear()} Enhancely. All rights reserved.
        </p>
      </div>
    </div>
  );
}
