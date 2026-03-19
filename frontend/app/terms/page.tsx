export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <div className="max-w-4xl mx-auto py-20 px-6 bg-white shadow-sm border-x border-slate-100 min-h-screen">
        <h1 className="text-5xl font-black mb-6 text-slate-900">Terms of Service</h1>
        <p className="text-slate-500 mb-12 italic">Please read these terms carefully before using the MedBillMaster search engine.</p>

        <div className="space-y-8">
          <div className="p-6 bg-indigo-50 rounded-2xl border-l-4 border-indigo-600">
            <h3 className="font-bold text-indigo-900 mb-2">Accuracy Disclaimer</h3>
            <p className="text-indigo-800">EnhanceBilling is a reference tool. We do not guarantee the accuracy of ICD-10-CM codes. Final coding decisions must be verified by a certified CPC (Certified Professional Coder).</p>
          </div>

          <section>
            <h2 className="text-xl font-bold mb-3 underline decoration-indigo-300">A. Acceptance of Terms</h2>
            <p>By accessing EnhanceBilling, you agree to be bound by these Terms and all applicable laws and regulations in the United States healthcare sector.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 underline decoration-indigo-300">B. Use License</h2>
            <p>Permission is granted to medical billing professionals to use this search engine for legitimate claim submission research. You may not scrape this site for commercial database resale.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 underline decoration-indigo-300">C. Financial Liability</h2>
            <p>In no event shall EnhanceBilling or its partners be liable for any damages (including, without limitation, damages for loss of clinic revenue or claim denials) arising out of the use or inability to use the materials on MedBillMaster.</p>
          </section>
        </div>
      </div>
    </div>
  );
}