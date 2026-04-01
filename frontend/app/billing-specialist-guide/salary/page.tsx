import Link from 'next/link';

export default function SalaryGuide() {
  const topStates = [
    { state: "California", avg: "$64,070", top10: "$104,500+", growth: "High" },
    { state: "New Jersey", avg: "$58,400", top10: "$81,000+", growth: "Steady" },
    { state: "Washington", avg: "$56,700", top10: "$79,000+", growth: "Moderate" },
    { state: "Texas", avg: "$48,200", top10: "$68,000+", growth: "Very High" },
    { state: "Florida", avg: "$46,900", top10: "$65,000+", growth: "High" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* HEADER */}
      <header className="bg-indigo-50/50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="mb-6">
            <Link href="/billing-specialist-guide" className="text-xs font-bold text-indigo-600 uppercase tracking-widest hover:underline">
              ← Back to Main Guide
            </Link>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Billing Specialist <span className="text-indigo-600">Salary Guide</span> (2026)
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            A comprehensive breakdown of earnings by state, experience level, and work environment.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        
        {/* TOP 5 STATES TABLE */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-6">Highest Paying States for Specialists</h2>
          <div className="overflow-x-auto rounded-3xl border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-5 text-xs font-black uppercase tracking-widest">State</th>
                  <th className="p-5 text-xs font-black uppercase tracking-widest">Average Salary</th>
                  <th className="p-5 text-xs font-black uppercase tracking-widest">Top 10% Earners</th>
                  <th className="p-5 text-xs font-black uppercase tracking-widest">Job Demand</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topStates.map((item) => (
                  <tr key={item.state} className="hover:bg-slate-50 transition-colors">
                    <td className="p-5 font-bold text-slate-800">{item.state}</td>
                    <td className="p-5 text-slate-600">{item.avg}</td>
                    <td className="p-5 text-indigo-600 font-bold">{item.top10}</td>
                    <td className="p-5">
                      <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                        {item.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* REMOTE VS ON-SITE SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
            <h3 className="text-xl font-black mb-3">Remote / WFH</h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              Remote billing roles have surged by 40% since 2024. Specialists working from home often see a slight base-pay reduction but save an average of $5,000/year on commuting costs.
            </p>
            <p className="font-black text-slate-900">$42k - $58k Average</p>
          </div>
          <div className="p-8 bg-indigo-600 rounded-3xl text-white">
            <h3 className="text-xl font-black mb-3">In-Office / Hospital</h3>
            <p className="text-sm text-indigo-100 mb-4 leading-relaxed">
              Hospital systems and large RCM firms often pay a premium for on-site specialists due to complex local facility rules and team management requirements.
            </p>
            <p className="font-black">$48k - $72k Average</p>
          </div>
        </section>

        {/* HOW TO INCREASE PAY */}
        <article className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-black mb-6">How to Boost Your Billing Salary</h2>
          <p className="text-slate-600 mb-6">
            Simply having a high-school diploma is no longer enough for the top tier of RCM roles. If you want to break the $60,000 barrier, focus on these three levers:
          </p>
          <ul className="space-y-6">
            <li>
              <strong className="text-slate-900 block text-lg">1. Specialist Certifications</strong>
              <span className="text-slate-600">The <strong>AAPC CPC</strong> (Certified Professional Coder) certification remains the "Gold Standard," but adding a <strong>CPB</strong> (Certified Professional Biller) can increase base pay by 15-20%.</span>
            </li>
            <li>
              <strong className="text-slate-900 block text-lg">2. Master Specialized Coding</strong>
              <span className="text-slate-600">Surgical billing and Cardiology typically pay significantly more than General Practice or Pediatrics due to the complexity of the 2026 NCCI edits.</span>
            </li>
            <li>
              <strong className="text-slate-900 block text-lg">3. Leverage Professional Tech</strong>
              <span className="text-slate-600">Specialists who use automation tools, like our <strong>ICD-10 Intelligence Search</strong>, can process 30% more claims per day—making them invaluable to practice managers.</span>
            </li>
          </ul>
        </article>

        {/* CTA TO TOOLS */}
        <div className="mt-20 text-center p-12 bg-slate-900 rounded-[40px] text-white">
          <h2 className="text-3xl font-black mb-4 tracking-tight">Become a Top-Earner.</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Elite billing specialists don't work harder; they work smarter with professional tools.
          </p>
          <Link href="/tools" className="inline-block bg-indigo-600 hover:bg-indigo-500 px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all">
            Get Started with Enhancebilling Tools
          </Link>
        </div>
      </main>
    </div>
  );
}
