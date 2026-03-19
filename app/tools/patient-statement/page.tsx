import StatementGenerator from "@/components/tools/StatementGenerator";
import Link from 'next/link';

export default function PatientStatementPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Link href="/tools" className="inline-block mb-8 text-sm font-bold text-slate-400 hover:text-indigo-600 transition">
          ← Back to Toolbox
        </Link>
        <StatementGenerator />
      </div>
    </main>
  );
}