import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const platform = [
    { name: 'Search ICD-10', href: '/icd10-intelligence' },
    { name: 'Revenue Audit', href: '/audit' },
    { name: 'Tools', href: '/tools' },
    { name: 'Our Mission', href: '/about' },
  ];

  const compliance = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'HIPAA Compliance', href: '/hipaa' },
  ];

  return (
    <footer className="bg-white border-t border-slate-200 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-700 transition-colors shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z" />
                </svg>
              </div>
              <span className="font-black text-lg text-slate-900 tracking-tight">
                Enhance<span className="text-indigo-600">Billing</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Empowering healthcare providers with precision ICD-10 coding and revenue cycle intelligence.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">HIPAA Compliant Platform</span>
            </div>
          </div>

          {/* Platform links */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Platform</h4>
            <ul className="space-y-2.5">
              {platform.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance links */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Compliance</h4>
            <ul className="space-y-2.5">
              {compliance.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-slate-400 text-xs">
            © {currentYear} EnhanceBilling. All rights reserved.
          </p>
          <p className="text-slate-400 text-xs">
            Built for medical billing professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}
