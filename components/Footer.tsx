import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-indigo-600 tracking-tight">
              EnhanceBilling<span className="text-slate-400 font-light"></span>
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Empowering healthcare providers with AI-driven coding precision and revenue intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/icd10-intelligence" className="hover:text-indigo-600 transition">Search ICD-10</Link></li>
              <li><Link href="/audit" className="hover:text-indigo-600 transition">Revenue Audit</Link></li>
              <li><Link href="/about" className="hover:text-indigo-600 transition">Our Mission</Link></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900">Compliance</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/privacy" className="hover:text-indigo-600 transition font-medium">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-600 transition font-medium">Terms of Service</Link></li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">HIPAA Compliant</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">
            © {currentYear} EnhanceBilling. Built for the future of healthcare.
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <p>Made with ❤️ for Medical Professionals</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
