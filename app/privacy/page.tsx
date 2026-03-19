export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 text-slate-800">
      <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
      <p className="text-sm text-slate-500 mb-10">Last Updated: March 2026</p>
      
      <section className="space-y-8 leading-relaxed">
        <div>
          <h2 className="text-2xl font-bold mb-4">1. Data Collection</h2>
          <p>We collect practice names, professional emails, and claim volume data solely for the purpose of providing medical billing audits and ICD-10-CM search services.</p>
        </div>

        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900">2. HIPAA Statement</h2>
          <p className="text-indigo-800">EnhanceBilling operates in compliance with HIPAA standards for data transit. We do not request or store Protected Health Information (PHI) or specific patient records through our web forms.</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">3. Data Usage</h2>
          <p>Your data is never sold to third parties. It is used exclusively by our audit team to contact you regarding your requested Revenue Report.</p>
        </div>
      </section>
    </div>
  );
}