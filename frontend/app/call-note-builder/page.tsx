'use client';

import React, { useState } from 'react';

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
  // GLOBAL CALL INFO
  const [patientName, setPatientName] = useState('');
  const [insurance, setInsurance] = useState('');
  const [phone, setPhone] = useState('');
  const [repName, setRepName] = useState('');
  const [callRef, setCallRef] = useState('');
  
  // CURRENT CLAIM STATE
  const [status, setStatus] = useState<ClaimStatus>('In Process');
  const [dos, setDos] = useState('');
  const [claimNum, setClaimNum] = useState('');
  const [receivedDate, setReceivedDate] = useState('');
  const [processedDate, setProcessedDate] = useState('');
  const [nextAction, setNextAction] = useState('');

  // PAID DATA STATE
  const [paidData, setPaidData] = useState({
    paymentDate: '',
    paidAmount: '',
    ptResp: '',
    ptRespType: 'CO-PAY' as PRType,
    mode: 'EFT',
    refNum: '',
    refAmount: '',
    clearedDate: '',
    payTo: '',
    eobSource: 'Payer Portal' // e.g., Portal, Fax, Mail
  });

  // DENIED DATA STATE
  const [deniedData, setDeniedData] = useState({
    reason: '',
    deniedDate: '',
    corrTFL: '90',
    corrFax: '',
    applTFL: '180',
    applFax: ''
  });

  // NOT ON FILE STATE
  const [payerId, setPayerId] = useState('');
  const [isPolicyActive, setIsPolicyActive] = useState(true);

  const [batch, setBatch] = useState<ClaimEntry[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddOrUpdate = () => {
    let note = `[${status.toUpperCase()}] Received Date: ${receivedDate || 'N/A'} | Processed Date: ${processedDate || 'N/A'}. `;
    
    if (status === 'Paid') {
      note += `Paid: $${paidData.paidAmount} on ${paidData.paymentDate}. PT RESP: $${paidData.ptResp} (${paidData.ptRespType}). `;
      note += `Mode: ${paidData.mode} #${paidData.refNum} (Amt: $${paidData.refAmount}). Cleared: ${paidData.clearedDate}. `;
      note += `EOB Source: ${paidData.eobSource}. PayTo: ${paidData.payTo}`;
    } else if (status === 'Denied') {
      note += `Denied ${deniedData.deniedDate}: ${deniedData.reason}. `;
      note += `CORR TFL: ${deniedData.corrTFL} (Fax: ${deniedData.corrFax}) | APPL TFL: ${deniedData.applTFL} (Fax: ${deniedData.applFax})`;
    } else if (status === 'Not on File') {
      note += `Claim not on file. Policy is ${isPolicyActive ? 'ACTIVE' : 'INACTIVE'}. Payer ID: ${payerId || 'N/A'}. Manual resubmit required.`;
    } else {
      note += `Currently In Process. Expected completion in 30 days.`;
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

    // RESET FIELDS
    setDos(''); setClaimNum(''); setNextAction(''); setReceivedDate(''); setProcessedDate('');
    setStatus('In Process');
  };

  const editItem = (item: ClaimEntry) => {
    setEditingId(item.id);
    setDos(item.dos);
    setClaimNum(item.claimNum);
    setReceivedDate(item.receivedDate);
    setProcessedDate(item.processedDate);
    setNextAction(item.action);
    setStatus(item.status);
    setPaidData(item.rawData.paidData);
    setDeniedData(item.rawData.deniedData);
    setPayerId(item.rawData.payerId);
    setIsPolicyActive(item.rawData.isPolicyActive);
  };

  const generateFinalNote = () => {
    const head = `PATIENT: ${patientName}\nINS: ${insurance} (${phone}) | REP: ${repName} | REF: ${callRef}\n${"=".repeat(60)}\n`;
    const body = batch.map(c => `DOS: ${c.dos} | CLM#: ${c.claimNum}\nSTATUS: ${c.note}\nACTION: ${c.action || 'N/A'}\n${"-".repeat(40)}`).join('\n');
    return head + body;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* CALL CONTEXT HEADER */}
        <div className="bg-[#0f172a] text-white p-8 rounded-[40px] shadow-2xl border-b-8 border-indigo-600">
          <input className="w-full bg-transparent border-b-2 border-slate-700 text-3xl font-black outline-none placeholder:text-slate-600 uppercase mb-6" placeholder="Patient Name" value={patientName} onChange={(e)=>setPatientName(e.target.value.toUpperCase())} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1"><label className="text-[10px] font-bold text-indigo-400">INSURANCE</label><input className="w-full bg-slate-800 p-2 rounded-lg text-sm" value={insurance} onChange={(e)=>setInsurance(e.target.value.toUpperCase())} /></div>
            <div className="space-y-1"><label className="text-[10px] font-bold text-indigo-400">PHONE</label><input className="w-full bg-slate-800 p-2 rounded-lg text-sm" value={phone} onChange={(e)=>setPhone(e.target.value)} /></div>
            <div className="space-y-1"><label className="text-[10px] font-bold text-indigo-400">REP NAME</label><input className="w-full bg-slate-800 p-2 rounded-lg text-sm" value={repName} onChange={(e)=>setRepName(e.target.value)} /></div>
            <div className="space-y-1"><label className="text-[10px] font-bold text-indigo-400">REF #</label><input className="w-full bg-slate-800 p-2 rounded-lg text-sm" value={callRef} onChange={(e)=>setCallRef(e.target.value)} /></div>
          </div>
        </div>

        {!isDone ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border space-y-8 relative">
              
              {/* CORE DATES */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-black text-indigo-600">DOS</label><input type="date" className="w-full p-2 border rounded-xl bg-slate-50 text-sm" value={dos} onChange={(e)=>setDos(e.target.value)} /></div>
                <div className="space-y-1"><label className="text-[10px] font-black text-indigo-600">CLAIM #</label><input className="w-full p-2 border rounded-xl bg-slate-50 text-sm" value={claimNum} onChange={(e)=>setClaimNum(e.target.value)} /></div>
                <div className="space-y-1"><label className="text-[10px] font-black text-indigo-600">REC'D DATE</label><input type="date" className="w-full p-2 border rounded-xl bg-slate-50 text-sm" value={receivedDate} onChange={(e)=>setReceivedDate(e.target.value)} /></div>
                <div className="space-y-1"><label className="text-[10px] font-black text-indigo-600">PROC'D DATE</label><input type="date" className="w-full p-2 border rounded-xl bg-slate-50 text-sm" value={processedDate} onChange={(e)=>setProcessedDate(e.target.value)} /></div>
              </div>

              {/* STATUS SELECTOR */}
              <div className="flex bg-slate-100 p-1 rounded-2xl gap-1">
                {['In Process', 'Paid', 'Denied', 'Not on File'].map((s) => (
                  <button key={s} onClick={()=>setStatus(s as ClaimStatus)} className={`flex-1 py-3 text-[10px] font-black rounded-xl transition-all ${status === s ? 'bg-white shadow text-indigo-600' : 'text-slate-400'}`}>{s.toUpperCase()}</button>
                ))}
              </div>

              {/* PAID DETAILS SECTION */}
              {status === 'Paid' && (
                <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 grid grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in">
                   <div className="space-y-1"><label className="text-[9px] font-bold text-emerald-700">PAYMENT DATE</label><input type="date" className="w-full p-2 border rounded-lg text-xs" value={paidData.paymentDate} onChange={(e)=>setPaidData({...paidData, paymentDate: e.target.value})} /></div>
                   <div className="space-y-1"><label className="text-[9px] font-bold text-emerald-700">PAID AMOUNT $</label><input className="w-full p-2 border rounded-lg text-xs" value={paidData.paidAmount} onChange={(e)=>setPaidData({...paidData, paidAmount: e.target.value})} /></div>
                   <div className="space-y-1"><label className="text-[9px] font-bold text-emerald-700">CLEARED DATE</label><input type="date" className="w-full p-2 border rounded-lg text-xs" value={paidData.clearedDate} onChange={(e)=>setPaidData({...paidData, clearedDate: e.target.value})} /></div>
                   
                   <div className="space-y-1"><label className="text-[9px] font-bold text-emerald-700">PT RESP TYPE</label>
                    <select className="w-full p-2 border rounded-lg text-xs bg-white" value={paidData.ptRespType} onChange={(e)=>setPaidData({...paidData, ptRespType: e.target.value as PRType})}>
                      <option>CO-PAY</option><option>CO-INSURANCE</option><option>DEDUCTIBLE</option><option>BALANCE DUE</option>
                    </select>
                   </div>
                   <div className="space-y-1"><label className="text-[9px] font-bold text-emerald-700">PT RESP AMT $</label><input className="w-full p-2 border rounded-lg text-xs" value={paidData.ptResp} onChange={(e)=>setPaidData({...paidData, ptResp: e.target.value})} /></div>
                   <div className="space-y-1"><label className="text-[9px] font-bold text-emerald-700">EOB SOURCE</label><input className="w-full p-2 border rounded-lg text-xs" value={paidData.eobSource} placeholder="Portal/Fax" onChange={(e)=>setPaidData({...paidData, eobSource: e.target.value})} /></div>
                   
                   <div className="space-y-1"><label className="text-[9px] font-bold text-emerald-700">CHECK/EFT #</label><input className="w-full p-2 border rounded-lg text-xs" value={paidData.refNum} onChange={(e)=>setPaidData({...paidData, refNum: e.target.value})} /></div>
                   <div className="space-y-1"><label className="text-[9px] font-bold text-emerald-700">CHECK/EFT AMT $</label><input className="w-full p-2 border rounded-lg text-xs" value={paidData.refAmount} onChange={(e)=>setPaidData({...paidData, refAmount: e.target.value})} /></div>
                   <div className="space-y-1"><label className="text-[9px] font-bold text-emerald-700">PAY TO ADDRESS</label><input className="w-full p-2 border rounded-lg text-xs" value={paidData.payTo} onChange={(e)=>setPaidData({...paidData, payTo: e.target.value})} /></div>
                </div>
              )}

              {/* DENIED DETAILS SECTION */}
              {status === 'Denied' && (
                <div className="p-6 bg-rose-50 rounded-3xl border border-rose-100 grid grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in">
                   <div className="col-span-2 space-y-1"><label className="text-[9px] font-bold text-rose-700">DENIAL REASON</label><input className="w-full p-2 border rounded-lg text-xs" value={deniedData.reason} onChange={(e)=>setDeniedData({...deniedData, reason: e.target.value})} /></div>
                   <div className="space-y-1"><label className="text-[9px] font-bold text-rose-700">DENIED DATE</label><input type="date" className="w-full p-2 border rounded-lg text-xs" value={deniedData.deniedDate} onChange={(e)=>setDeniedData({...deniedData, deniedDate: e.target.value})} /></div>
                   
                   <div className="space-y-1"><label className="text-[9px] font-bold text-rose-700">CORR. TFL (DAYS)</label><input className="w-full p-2 border rounded-lg text-xs font-bold" value={deniedData.corrTFL} onChange={(e)=>setDeniedData({...deniedData, corrTFL: e.target.value})} /></div>
                   <div className="col-span-2 space-y-1"><label className="text-[9px] font-bold text-rose-700">CORRECTED CLAIM FAX</label><input className="w-full p-2 border rounded-lg text-xs" value={deniedData.corrFax} onChange={(e)=>setDeniedData({...deniedData, corrFax: e.target.value})} /></div>
                   
                   <div className="space-y-1"><label className="text-[9px] font-bold text-rose-700">APPEAL TFL (DAYS)</label><input className="w-full p-2 border rounded-lg text-xs font-bold" value={deniedData.applTFL} onChange={(e)=>setDeniedData({...deniedData, applTFL: e.target.value})} /></div>
                   <div className="col-span-2 space-y-1"><label className="text-[9px] font-bold text-rose-700">APPEAL FAX / DEPT</label><input className="w-full p-2 border rounded-lg text-xs" value={deniedData.applFax} onChange={(e)=>setDeniedData({...deniedData, applFax: e.target.value})} /></div>
                </div>
              )}

              {/* NOT ON FILE SECTION */}
              {status === 'Not on File' && (
                <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex justify-between items-center gap-8 animate-in fade-in">
                   <div className="flex-1 space-y-1">
                      <label className="text-[10px] font-black text-slate-500">PAYER ID</label>
                      <input className="w-full p-3 border-2 border-indigo-100 rounded-2xl font-black text-indigo-600" value={payerId} onChange={(e)=>setPayerId(e.target.value)} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500">POLICY ACTIVE?</label>
                      <button onClick={()=>setIsPolicyActive(!isPolicyActive)} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase transition-all ${isPolicyActive ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-rose-500 text-white'}`}>
                        {isPolicyActive ? 'YES - ACTIVE' : 'NO - INACTIVE'}
                      </button>
                   </div>
                </div>
              )}

              {/* ACTION / NEXT STEPS */}
              <div className="pt-6 border-t">
                <label className="text-[10px] font-black text-orange-600 uppercase">Next Steps / Internal Note</label>
                <textarea className="w-full p-4 mt-2 bg-orange-50 border border-orange-100 rounded-2xl text-sm italic outline-none focus:border-orange-200" placeholder="What needs to be done next?" value={nextAction} onChange={(e)=>setNextAction(e.target.value)} />
              </div>

              <button onClick={handleAddOrUpdate} className={`w-full text-white font-black py-5 rounded-[24px] text-xs uppercase tracking-widest shadow-xl transition-all ${editingId ? 'bg-orange-500 shadow-orange-100' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                {editingId ? '💾 Save Changes to Batch' : '🚀 Add to Batch'}
              </button>
            </div>

            {/* QUEUE SIDEBAR */}
            <div className="bg-white/50 p-6 rounded-[40px] border-2 border-dashed border-slate-300 flex flex-col h-fit sticky top-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 text-center">In Batch ({batch.length})</h3>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {batch.map((c) => (
                  <div key={c.id} className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-indigo-500 group relative">
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={()=>editItem(c)} className="p-1 bg-slate-100 rounded text-indigo-600 hover:bg-indigo-600 hover:text-white text-[8px] font-bold uppercase">Edit</button>
                      <button onClick={()=>setBatch(batch.filter(b=>b.id !== c.id))} className="p-1 bg-slate-100 rounded text-red-600 hover:bg-red-600 hover:text-white text-[8px] font-bold uppercase">Del</button>
                    </div>
                    <p className="text-[10px] font-black text-indigo-600 italic">DOS: {c.dos}</p>
                    <p className="text-[8px] text-slate-500 font-bold line-clamp-1">{c.note}</p>
                  </div>
                ))}
              </div>
              {batch.length > 0 && (
                <button onClick={()=>setIsDone(true)} className="mt-8 w-full bg-[#0f172a] text-white font-black py-4 rounded-[24px] text-[10px] tracking-widest uppercase">Generate Note</button>
              )}
            </div>
          </div>
        ) : (
          /* FINAL OUTPUT VIEW */
          <div className="bg-white p-10 rounded-[50px] shadow-2xl border-b-[12px] border-indigo-600 animate-in zoom-in-95">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black italic">FINALIZED CALL LOG</h2>
                <button onClick={()=>setIsDone(false)} className="text-[10px] font-black text-indigo-600 underline uppercase tracking-widest">Edit Batch</button>
             </div>
             <pre className="bg-slate-50 p-8 rounded-[32px] font-mono text-[12px] text-slate-700 whitespace-pre-wrap border-2 leading-relaxed shadow-inner">
               {generateFinalNote()}
             </pre>
             <button onClick={() => {navigator.clipboard.writeText(generateFinalNote()); alert("Note Copied Successfully!");}} className="mt-8 w-full bg-indigo-600 text-white font-black py-6 rounded-[30px] text-sm tracking-widest uppercase shadow-2xl hover:scale-[1.01] transition-transform">📋 Copy Complete Batch Note</button>
          </div>
        )}
      </div>
    </div>
  );
}
