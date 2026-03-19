import Link from 'next/link';

export default function Header() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* BRANDING */}
      <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-indigo-200 shadow-lg italic">
          M
        </div>
        <span className="text-2xl font-black tracking-tighter text-slate-900">
          Enhance<span className="text-indigo-600">Billing</span>
        </span>
      </Link>
      
      {/* NAVIGATION & TOOLS */}
      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden md:flex items-center gap-6">
          <Link href="/about" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition">
            About
          </Link>
          <Link href="/hipaa" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition">
            HIPAA
          </Link>
        </div>

        {/* THE TOOLS BUTTON */}
        <Link 
          href="/tools" 
          className="flex items-center gap-2 bg-white text-indigo-600 border-2 border-indigo-100 px-4 py-2 rounded-full text-sm font-bold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm group"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" height="16" 
            viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" strokeWidth="2.5" 
            strokeLinecap="round" strokeLinejoin="round" 
            className="group-hover:rotate-45 transition-transform"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
          <span>Tools</span>
        </Link>

        {/* PRIMARY CTA */}
        <Link 
          href="/#audit-form" 
          className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-600 transition-all shadow-md active:scale-95"
        >
          Free Audit
        </Link>
      </div>
    </nav>
  );
}