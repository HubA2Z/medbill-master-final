const sections = [
  {
    num:   '1',
    title: 'Information We Collect',
    body:  'We collect business-level information only: practice name, professional email address, and monthly claim volume. This data is submitted voluntarily through our revenue audit request forms. We do not collect, process, or store any Protected Health Information (PHI) or personal patient data.',
  },
  {
    num:   '2',
    title: 'HIPAA Compliance Statement',
    highlight: true,
    body:  'Enhancely operates in compliance with HIPAA\'s Administrative Simplification provisions. Our platform is designed as a non-PHI B2B reference utility. We strictly prohibit the entry of patient names, Social Security Numbers, or dates of birth through any interface on this platform.',
  },
  {
    num:   '3',
    title: 'How We Use Your Data',
    body:  'Your submitted information is used exclusively by our certified billing team to contact you regarding your requested Revenue Audit or consultation. We do not sell, trade, or transfer your information to third parties without your explicit consent.',
  },
  {
    num:   '4',
    title: 'Data Security',
    body:  'All data submitted through EnhanceBilling is transmitted via SSL/TLS 1.3 encrypted connections. Lead data stored in our systems is encrypted at rest using AES-256. Access to this data is restricted to authorized personnel protected by Multi-Factor Authentication.',
  },
  {
    num:   '5',
    title: 'Search Data',
    body:  'ICD-10 code searches are routed through our backend to the National Library of Medicine (NLM) Clinical Tables API. We log the search terms submitted (e.g., "Diabetes") only to improve our synonym mapping and user experience. No personally identifiable information is associated with search logs.',
  },
  {
    num:   '6',
    title: 'Your Rights',
    body:  'You may request deletion of any personal information we hold about you at any time. To submit a data deletion request, use the contact form on our audit page. We will process your request within 30 business days.',
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto py-16 px-6">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-3">Legal</p>
          <h1 className="text-4xl font-black tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-sm text-slate-400 italic">
            Last updated: March 2026 · EnhanceBilling Platform
          </p>
        </div>

        {/* Intro */}
        <p className="text-slate-600 leading-relaxed mb-10 text-base">
          Enhancely (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting the privacy of
          healthcare billing professionals who use our platform. This policy describes what information
          we collect, how we use it, and how we protect it.
        </p>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((s) => (
            <div
              key={s.num}
              className={`rounded-2xl p-7 border ${
                s.highlight
                  ? 'bg-indigo-50 border-indigo-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <h2 className={`font-black mb-3 flex items-center gap-2.5 ${s.highlight ? 'text-indigo-900' : 'text-slate-900'}`}>
                <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-black shrink-0 text-white ${s.highlight ? 'bg-indigo-600' : 'bg-slate-800'}`}>
                  {s.num}
                </span>
                {s.title}
              </h2>
              <p className={`text-sm leading-relaxed ${s.highlight ? 'text-indigo-800' : 'text-slate-600'}`}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-400">
          <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>HIPAA Compliant · AES-256 Encrypted · No PHI Stored</span>
        </div>
        <p className="text-xs text-slate-400 text-center mt-3">
          © {new Date().getFullYear()} Enhancely. All rights reserved.
        </p>
      </div>
    </div>
  );
}
