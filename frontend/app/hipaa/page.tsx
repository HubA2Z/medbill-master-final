import Link from 'next/link';

const matrix = [
  { label: 'SSL / TLS 1.3',   sub: 'Encrypted Data Transit',    icon: '🔒' },
  { label: 'No PHI Storage',  sub: 'B2B Information Only',       icon: '🚫' },
  { label: 'AES-256',         sub: 'Lead Data Encryption',       icon: '🔐' },
  { label: 'MFA Protected',   sub: 'Admin Dashboard Access',     icon: '🛡️' },
  { label: 'HTTPS Only',      sub: 'All Requests Encrypted',     icon: '🌐' },
  { label: 'Audit Logs',      sub: 'Full Access Trail',          icon: '📋' },
];

const safeguards = [
  {
    title: 'Access Control',
    body:  'Only authorized personnel with verified credentials access Lead Management dashboards, protected by Multi-Factor Authentication (MFA).',
  },
  {
    title: 'Transmission Security',
    body:  'Every search on EnhanceBilling is routed via a secure HTTPS / TLS 1.3 connection, ensuring data remains confidential between the provider and our NLM gateway.',
  },
  {
    title: 'Data Minimization',
    body:  'We collect only what is necessary — clinic name, provider email, and claim volume. No patient identifiers are ever transmitted or stored.',
  },
  {
    title: 'Incident Response',
    body:  'Our security team maintains a documented incident response plan with a 72-hour breach notification commitment, exceeding HIPAA minimum requirements.',
  },
];

export default function HIPAACompliance() {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">

      {/* Hero */}
      <section className="relative py-24 px-6 bg-slate-900 text-white overflow-hidden text-center">
        <div className="absolute inset-0 bg-indigo-900/20" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-indigo-500/30 bg-indigo-500/10 rounded-full text-indigo-400 text-xs font-bold mb-6 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
            Health Data Security Protocol
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-5 tracking-tight leading-[1.05]">
            HIPAA <span className="text-indigo-400">Compliance</span><br />& Data Integrity
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            EnhanceBilling operates under strict adherence to the Administrative Simplification
            provisions of the Health Insurance Portability and Accountability Act.
          </p>
        </div>
      </section>

      {/* Verification matrix */}
      <section className="bg-slate-50 border-b border-slate-200 py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 text-center mb-7">Verification Matrix</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {matrix.map((item) => (
              <div key={item.label} className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="font-bold text-slate-900 text-sm">{item.label}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 italic">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Status card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Compliance Status</p>
              </div>
              <p className="text-lg font-black text-emerald-600 mb-1">Active & Compliant</p>
              <p className="text-sm text-slate-500">Last security review: Q1 2026</p>
            </div>

            {/* BAA card */}
            <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg">
              <h4 className="font-black text-lg mb-2 leading-tight">Business Associate Agreement</h4>
              <p className="text-indigo-100 text-sm leading-relaxed mb-5">
                Are you a Covered Entity looking to partner with EnhanceBilling for billing services?
                We provide full BAA documentation for all partnership clients.
              </p>
              <Link href="/#audit-form">
                <button className="w-full bg-white text-indigo-700 font-black py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-indigo-50 transition active:scale-95 shadow-sm">
                  Request BAA →
                </button>
              </Link>
            </div>

            {/* Contact */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Security Contact</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                To report a security concern or request compliance documentation, use the contact form on our{' '}
                <Link href="/audit" className="text-indigo-600 font-semibold hover:underline">audit page</Link>.
              </p>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                1. Non-PHI Environment Declaration
              </h2>
              <blockquote className="border-l-4 border-indigo-600 pl-6 py-4 bg-slate-50 rounded-r-2xl text-slate-600 italic text-base leading-relaxed mb-5">
                &ldquo;EnhanceBilling is engineered as a reference utility for the healthcare billing industry.
                Our public search infrastructure does not require, request, or store Protected Health Information (PHI).&rdquo;
              </blockquote>
              <p className="text-slate-600 leading-relaxed">
                As a B2B platform we only collect business-level information (Clinic Name, Provider Email)
                for the purpose of revenue cycle consulting. We strictly prohibit users from entering patient
                names, SSNs, or date-of-birth data into our search queries or lead forms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">
                2. Technical Safeguards
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {safeguards.map((s) => (
                  <div key={s.title} className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h4 className="font-black text-slate-900 mb-2">{s.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{s.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                3. Administrative Simplification
              </h2>
              <p className="text-slate-600 leading-relaxed">
                In alignment with 2026 CMS standards, EnhanceBilling streamlines the administrative
                burden of medical coding. By providing a secure portal for ICD-10-CM research, we help
                clinics maintain their own HIPAA compliance by reducing human error in the coding
                process — a major source of data breaches and audit failures.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
