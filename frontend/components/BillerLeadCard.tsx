import Link from 'next/link';

export default function BillerLeadCard() {
  return (
    <div className="mt-12 bg-[#0f172a] p-10 rounded-[3rem] border-t-8 border-indigo-600 shadow-2xl relative overflow-hidden group">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="max-w-xl text-center md:text-left">
          <h3 className="text-3xl font-black text-white leading-[1.1] mb-4 tracking-[-0.05em] uppercase italic">
            Tired of <span className="text-indigo-400">Coding Denials</span>?
          </h3>
          <p className="text-slate-400 text-sm font-medium tracking-wide">
            Stop worrying about NCD/LCD edits. Our expert billers manage your 
            entire revenue cycle so you can focus on patient care.
          </p>
        </div>
        <Link 
          href="/#audit" 
          className="whitespace-nowrap bg-indigo-600 text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-indigo-600 transition-all shadow-xl active:scale-95"
        >
          Book Free Consultation
        </Link>
      </div>
      {/* Decorative Blur */}
      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-all"></div>
    </div>
  );
}