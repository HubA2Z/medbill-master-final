'use client';

import React, { useState } from 'react';

// --- SEO Metadata (Next.js 14+) ---
// Note: If this is a 'use client' file, move this metadata 
// to a separate 'layout.tsx' or a 'metadata.ts' if needed, 
// but including JSON-LD inside the component is perfectly fine.

type ClaimStatus = 'In Process' | 'Not on File' | 'Paid' | 'Denied';
type PRType = 'CO-PAY' | 'CO-INSURANCE' | 'DEDUCTIBLE' | 'BALANCE DUE' | 'N/A';

interface ClaimEntry {
  id: number;
  dos: string;
  status: ClaimStatus;
  claimNum: string;
  receivedDate: string;
  processedDate: string;
  note: string;
  action: string;
  rawData: any; 
}

export default function CallNoteBuilder() {
  const [patientName, setPatientName] = useState('');
  const [insurance, setInsurance] = useState('');
  const [phone, setPhone] = useState('');
  const [repName, setRepName] = useState('');
  const [callRef, setCallRef] = useState('');
  
  const [status, setStatus] = useState<ClaimStatus>('In Process');
  const [dos, setDos] = useState('');
  const [claimNum, setClaimNum] = useState('');
  const [receivedDate, setReceivedDate] = useState('');
  const [processedDate, setProcessedDate] = useState('');
  const [nextAction, setNextAction] = useState('');

  const [paidData, setPaidData] = useState({
    paymentDate: '', paidAmount: '', ptResp: '',
    ptRespType: 'CO-PAY' as PRType, mode: 'EFT',
    refNum: '', refAmount: '', clearedDate: '',
    payTo: '', eobSource: 'Payer Portal'
  });

  const [deniedData, setDeniedData] = useState({
    reason: '', deniedDate: '', corrTFL: '90',
    corrFax: '', applTFL: '180', applFax: ''
  });

  const [payerId, setPayerId] = useState('');
  const [isPolicyActive, setIsPolicyActive] = useState(true);
  const [batch, setBatch] = useState<ClaimEntry[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddOrUpdate = () => {
    let note = `[${status.toUpperCase()}] Received: ${receivedDate || 'N/A'} | Processed: ${processedDate || 'N/A'}. `;
    
    if (status === 'Paid') {
      note += `Paid: $${paidData.paidAmount} on ${paidData.paymentDate}. PT RESP: $${paidData.ptResp} (${paidData.ptRespType}). `;
      note += `Ref: ${paidData.refNum}. EOB: ${paidData.eobSource}.`;
    } else if (status === 'Denied') {
      note += `Denied ${deniedData.deniedDate}: ${deniedData.reason}. `;
      note += `CORR TFL: ${deniedData.corrTFL} | APPL TFL: ${deniedData.applTFL}`;
    } else if (status === 'Not on File') {
      note += `Claim not on file. Policy: ${isPolicyActive ? 'ACTIVE' : 'INACTIVE'}. Payer ID: ${payerId || 'N/A'}.`;
    } else {
      note += `In Process. Check back in 30 days.`;
    }

    const newEntry: ClaimEntry = {
      id: editingId || Date.now(),
      dos, status, claimNum, receivedDate, processedDate, note, action: nextAction,
      rawData: { status, paidData, deniedData, payerId, isPolicyActive }
    };

    if (editingId) {
      setBatch(batch.map(item => item.id === editingId ? newEntry : item));
      setEditingId(null);
    } else {
      setBatch([...batch, newEntry]);
    }

    setDos(''); setClaimNum(''); setNextAction(''); setReceivedDate(''); setProcessedDate('');
    setStatus('In Process');
  };

  const generateFinalNote = () => {
    const head = `PATIENT: ${patientName}\nINS: ${insurance} (${phone}) | REP: ${repName} | REF: ${callRef}\n${"=".repeat(60)}\n`;
    const body = batch.map(c => `DOS: ${c.dos} | CLM#: ${c.claimNum}\nSTATUS: ${c.note}\nACTION: ${c.action || 'N/A'}\n${"-".repeat(40)}`).join('\n');
    return head + body;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      
      {/* ✅ FIX: Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Enhancebilling Call Note Builder",
            "operatingSystem": "Web",
            "applicationCategory": "BusinessApplication",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "Professional RCM tool for medical billers to standardize insurance call documentation."
          }),
        }}
      />

      <div className="max-w-6xl mx-auto space-y-6">
        {/* ... (Your existing Call Context Header UI) ... */}
        <div className="bg-[#0f172a] text-white p-8 rounded-[40px] shadow-2xl border-b-8 border-indigo-600">
          <input className="w-full bg-transparent border-b-2 border-slate-700 text-3xl font-black outline-none placeholder:text-slate-600 uppercase mb-6" placeholder="Patient Name" value={patientName} onChange={(e)=>setPatientName(e.target.value.toUpperCase())} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="space-y-1"><label className="text-[10px] font-bold text-indigo-400 uppercase">Insurance</label><input className="w-full bg-slate-800 p-2 rounded-lg text-sm" value={insurance} onChange={(e)=>setInsurance(e.target.value.toUpperCase())} /></div>
             <div className="space-y-1"><label className="text-[10px] font-bold text-indigo-400 uppercase">Phone</label><input className="w-full bg-slate-800 p-2 rounded-lg text-sm" value={phone} onChange={(e)=>setPhone(e.target.value)} /></div>
             <div className="space-y-1"><label className="text-[10px] font-bold text-indigo-400 uppercase">Rep Name</label><input className="w-full bg-slate-800 p-2 rounded-lg text-sm" value={repName} onChange={(e)=>setRepName(e.target.value)} /></div>
             <div className="space-y-1"><label className="text-[10px] font-bold text-indigo-400 uppercase">Ref #</label><input className="w-full bg-slate-800 p-2 rounded-lg text-sm" value={callRef} onChange={(e)=>setCallRef(e.target.value)} /></div>
          </div>
        </div>

        {/* MAIN BUILDER AREA */}
        {!isDone ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border space-y-8 relative">
              {/* ... (Your existing form fields for DOS, Claim #, Status Selector, Paid/Denied Sections) ... */}
              {/* Note: Keep your existing logic here for the UI components */}
              <button onClick={handleAddOrUpdate} className={`w-full text-white font-black py-5 rounded-[24px] text-xs uppercase tracking-widest shadow-xl transition-all ${editingId ? 'bg-orange-500' : 'bg-indigo-600'}`}>
                {editingId ? '💾 Save Changes' : '🚀 Add to Batch'}
              </button>
            </div>

            <div className="bg-white/50 p-6 rounded-[40px] border-2 border-dashed border-slate-300 flex flex-col h-fit sticky top-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase mb-6 text-center">Batch Queue ({batch.length})</h3>
              {/* Batch list mapping */}
              {batch.length > 0 && (
                <button onClick={()=>setIsDone(true)} className="mt-8 w-full bg-[#0f172a] text-white font-black py-4 rounded-[24px] text-[10px] tracking-widest uppercase">Generate Note</button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white p-10 rounded-[50px] shadow-2xl border-b-[12px] border-indigo-600">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black italic">FINALIZED CALL LOG</h2>
                <button onClick={()=>setIsDone(false)} className="text-[10px] font-black text-indigo-600 underline uppercase">Edit Batch</button>
             </div>
             <pre className="bg-slate-50 p-8 rounded-[32px] font-mono text-[12px] text-slate-700 whitespace-pre-wrap border-2 leading-relaxed shadow-inner">
               {generateFinalNote()}
             </pre>
             <button onClick={() => {navigator.clipboard.writeText(generateFinalNote()); alert("Note Copied!");}} className="mt-8 w-full bg-indigo-600 text-white font-black py-6 rounded-[30px] text-sm tracking-widest uppercase shadow-2xl">📋 Copy Complete Batch Note</button>
          </div>
        )}

        {/* ✅ FIX: Thin Content SEO Section */}
        <section className="max-w-4xl mx-auto mt-24 pb-20 border-t pt-12">
          <h2 className="text-3xl font-black text-slate-800 mb-6">Why Professional Call Documentation Matters in RCM</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-indigo-600">Standardizing Your Audit Trail</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In medical billing, if it wasn&apos;t documented, it didn&apos;t happen. Using a <strong>standardized call note builder</strong> ensures that every appeal contains the necessary data points: Representative Name, Reference Number, and the specific Payer Rationale. This tool helps RCM teams maintain a consistent audit trail across all claims.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-indigo-600">Reducing Denials with Accurate Data</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Capturing the <strong>Timely Filing Limit (TFL)</strong> for corrected claims and appeals during the initial call is the most effective way to prevent technical denials. By documentation the exact fax number or department discussed, you reduce the "he-said-she-said" friction during the second-level appeal process.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
