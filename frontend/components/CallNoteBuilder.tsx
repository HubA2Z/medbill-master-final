'use client';

import { useMemo, useState } from 'react';
import { downloadText } from '@/lib/icd';
import { CheckIcon, CopyIcon, DownloadIcon, EditIcon, TrashIcon, LockIcon } from './icons';

type ClaimStatus = 'In Process' | 'Paid' | 'Denied' | 'Not on File';
type PRType = 'CO-PAY' | 'CO-INSURANCE' | 'DEDUCTIBLE' | 'BALANCE DUE' | 'N/A';

const STATUSES: { id: ClaimStatus; tone: string }[] = [
  { id: 'In Process', tone: 'text-sky-700' },
  { id: 'Paid', tone: 'text-emerald-700' },
  { id: 'Denied', tone: 'text-rose-700' },
  { id: 'Not on File', tone: 'text-amber-700' },
];

const EMPTY_PAID = { paymentDate: '', paidAmount: '', ptResp: '', ptRespType: 'CO-PAY' as PRType, mode: 'EFT', refNum: '', refAmount: '', clearedDate: '', payTo: '', eobSource: 'Payer Portal' };
const EMPTY_DENIED = { reason: '', denialCode: '', deniedDate: '', corrTFL: '90', corrFax: '', applTFL: '180', applFax: '' };
const EMPTY_CLAIM = { dos: '', claimNum: '', receivedDate: '', processedDate: '', nextAction: '' };

type Paid = typeof EMPTY_PAID;
type Denied = typeof EMPTY_DENIED;

interface ClaimEntry {
  id: number;
  status: ClaimStatus;
  dos: string;
  claimNum: string;
  receivedDate: string;
  processedDate: string;
  action: string;
  paid: Paid;
  denied: Denied;
  payerId: string;
  policyActive: boolean;
  ipDays: string;
}

function fmt(d: string) {
  if (!d) return 'N/A';
  const [y, m, day] = d.split('-');
  return y && m && day ? `${m}/${day}/${y}` : d;
}

function buildStatusNote(c: Omit<ClaimEntry, 'id'>): string {
  let note = `[${c.status.toUpperCase()}] Received Date: ${fmt(c.receivedDate)} | Processed Date: ${fmt(c.processedDate)}. `;
  if (c.status === 'Paid') {
    const p = c.paid;
    note += `Paid: $${p.paidAmount || '0.00'} on ${fmt(p.paymentDate)}. PT RESP: $${p.ptResp || '0.00'} (${p.ptRespType}). `;
    note += `Mode: ${p.mode} #${p.refNum || 'N/A'} (Amt: $${p.refAmount || '0.00'}). Cleared: ${fmt(p.clearedDate)}. `;
    note += `EOB Source: ${p.eobSource || 'N/A'}. PayTo: ${p.payTo || 'N/A'}`;
  } else if (c.status === 'Denied') {
    const d = c.denied;
    note += `Denied ${fmt(d.deniedDate)}: ${d.denialCode ? `${d.denialCode} – ` : ''}${d.reason || 'Reason N/A'}. `;
    note += `CORR TFL: ${d.corrTFL || 'N/A'} (Fax: ${d.corrFax || 'N/A'}) | APPL TFL: ${d.applTFL || 'N/A'} (Fax: ${d.applFax || 'N/A'})`;
  } else if (c.status === 'Not on File') {
    note += `Claim not on file. Policy is ${c.policyActive ? 'ACTIVE' : 'INACTIVE'}. Payer ID: ${c.payerId || 'N/A'}. Manual resubmit required.`;
  } else {
    note += `Currently In Process. Expected completion in ${c.ipDays || '30'} days.`;
  }
  return note;
}

function claimBlock(c: Omit<ClaimEntry, 'id'>) {
  return `DOS: ${fmt(c.dos)} | CLM#: ${c.claimNum || 'N/A'}\nSTATUS: ${buildStatusNote(c)}\nACTION: ${c.action || 'N/A'}`;
}

function Field({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

export default function CallNoteBuilder() {
  const [call, setCall] = useState({ patient: '', insurance: '', phone: '', rep: '', ref: '' });
  const [status, setStatus] = useState<ClaimStatus>('In Process');
  const [claim, setClaim] = useState(EMPTY_CLAIM);
  const [paid, setPaid] = useState<Paid>(EMPTY_PAID);
  const [denied, setDenied] = useState<Denied>(EMPTY_DENIED);
  const [payerId, setPayerId] = useState('');
  const [policyActive, setPolicyActive] = useState(true);
  const [ipDays, setIpDays] = useState('30');

  const [batch, setBatch] = useState<ClaimEntry[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const current: Omit<ClaimEntry, 'id'> = { status, ...claim, action: claim.nextAction, paid, denied, payerId, policyActive, ipDays };
  const preview = claimBlock(current);

  const finalNote = useMemo(() => {
    const head = `PATIENT: ${call.patient || 'N/A'}\nINS: ${call.insurance || 'N/A'} (${call.phone || 'N/A'}) | REP: ${call.rep || 'N/A'} | REF: ${call.ref || 'N/A'}\n${'='.repeat(60)}\n`;
    return head + batch.map((c) => `${claimBlock(c)}\n${'-'.repeat(40)}`).join('\n');
  }, [call, batch]);

  const flash = (k: string) => { setCopied(k); setTimeout(() => setCopied(null), 1600); };
  const copy = (text: string, k: string) => navigator.clipboard?.writeText(text).then(() => flash(k)).catch(() => {});

  const resetClaim = () => {
    setClaim(EMPTY_CLAIM); setPaid(EMPTY_PAID); setDenied(EMPTY_DENIED); setPayerId(''); setPolicyActive(true); setIpDays('30'); setStatus('In Process'); setEditingId(null);
  };

  const addOrUpdate = () => {
    const entry: ClaimEntry = { id: editingId ?? Date.now(), ...current };
    setBatch((b) => (editingId ? b.map((x) => (x.id === editingId ? entry : x)) : [...b, entry]));
    resetClaim();
  };

  const edit = (c: ClaimEntry) => {
    setEditingId(c.id);
    setStatus(c.status);
    setClaim({ dos: c.dos, claimNum: c.claimNum, receivedDate: c.receivedDate, processedDate: c.processedDate, nextAction: c.action });
    setPaid(c.paid); setDenied(c.denied); setPayerId(c.payerId); setPolicyActive(c.policyActive); setIpDays(c.ipDays);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const upd = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, key: keyof T) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setter((s) => ({ ...s, [key]: e.target.value }));

  return (
    <div className="space-y-6">
      {/* Call details */}
      <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-semibold text-ink">1 · Call details</h2>
          <p className="flex items-center gap-1.5 text-xs text-ink-3"><LockIcon className="h-3.5 w-3.5" /> Everything stays in this browser tab — nothing is sent or saved.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Field label="Patient / account" className="lg:col-span-1">
            <input className="field uppercase" value={call.patient} onChange={(e) => setCall({ ...call, patient: e.target.value.toUpperCase() })} placeholder="DOE, JOHN" />
          </Field>
          <Field label="Insurance">
            <input className="field uppercase" value={call.insurance} onChange={(e) => setCall({ ...call, insurance: e.target.value.toUpperCase() })} placeholder="AETNA" />
          </Field>
          <Field label="Phone">
            <input className="field" inputMode="tel" value={call.phone} onChange={upd(setCall, 'phone')} placeholder="1-800-…" />
          </Field>
          <Field label="Rep name">
            <input className="field" value={call.rep} onChange={upd(setCall, 'rep')} />
          </Field>
          <Field label="Call ref #">
            <input className="field" value={call.ref} onChange={upd(setCall, 'ref')} />
          </Field>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Claim editor */}
        <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-ink">2 · {editingId ? 'Edit claim' : 'Add a claim'}</h2>
            {editingId && <button type="button" onClick={resetClaim} className="text-sm text-ink-3 hover:text-ink">Cancel edit</button>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Date of service"><input type="date" className="field" value={claim.dos} onChange={upd(setClaim, 'dos')} /></Field>
            <Field label="Claim #"><input className="field" value={claim.claimNum} onChange={upd(setClaim, 'claimNum')} /></Field>
            <Field label="Received date"><input type="date" className="field" value={claim.receivedDate} onChange={upd(setClaim, 'receivedDate')} /></Field>
            <Field label="Processed date"><input type="date" className="field" value={claim.processedDate} onChange={upd(setClaim, 'processedDate')} /></Field>
          </div>

          <div role="tablist" aria-label="Claim status" className="mt-6 grid grid-cols-2 gap-1 rounded-xl bg-bg-soft p-1 sm:grid-cols-4">
            {STATUSES.map((s) => (
              <button
                key={s.id}
                role="tab"
                type="button"
                aria-selected={status === s.id}
                onClick={() => setStatus(s.id)}
                className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${status === s.id ? `bg-white shadow-sm ${s.tone}` : 'text-ink-3 hover:text-ink'}`}
              >
                {s.id}
              </button>
            ))}
          </div>

          <div className="mt-5">
            {status === 'In Process' && (
              <div className="grid gap-4 rounded-xl border border-sky-100 bg-sky-50/60 p-4 sm:grid-cols-3">
                <Field label="Expected completion (days)"><input className="field" inputMode="numeric" value={ipDays} onChange={(e) => setIpDays(e.target.value)} /></Field>
              </div>
            )}

            {status === 'Paid' && (
              <div className="grid gap-4 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Payment date"><input type="date" className="field" value={paid.paymentDate} onChange={upd(setPaid, 'paymentDate')} /></Field>
                <Field label="Paid amount ($)"><input className="field" inputMode="decimal" value={paid.paidAmount} onChange={upd(setPaid, 'paidAmount')} /></Field>
                <Field label="Cleared date"><input type="date" className="field" value={paid.clearedDate} onChange={upd(setPaid, 'clearedDate')} /></Field>
                <Field label="Patient resp. type">
                  <select className="field" value={paid.ptRespType} onChange={upd(setPaid, 'ptRespType')}>
                    <option>CO-PAY</option><option>CO-INSURANCE</option><option>DEDUCTIBLE</option><option>BALANCE DUE</option><option>N/A</option>
                  </select>
                </Field>
                <Field label="Patient resp. amount ($)"><input className="field" inputMode="decimal" value={paid.ptResp} onChange={upd(setPaid, 'ptResp')} /></Field>
                <Field label="EOB source"><input className="field" value={paid.eobSource} onChange={upd(setPaid, 'eobSource')} placeholder="Portal / Fax / Mail" /></Field>
                <Field label="Payment mode">
                  <select className="field" value={paid.mode} onChange={upd(setPaid, 'mode')}>
                    <option>EFT</option><option>CHECK</option><option>VCC</option>
                  </select>
                </Field>
                <Field label="Check / EFT #"><input className="field" value={paid.refNum} onChange={upd(setPaid, 'refNum')} /></Field>
                <Field label="Check / EFT amount ($)"><input className="field" inputMode="decimal" value={paid.refAmount} onChange={upd(setPaid, 'refAmount')} /></Field>
                <Field label="Pay-to address" className="sm:col-span-2 lg:col-span-3"><input className="field" value={paid.payTo} onChange={upd(setPaid, 'payTo')} /></Field>
              </div>
            )}

            {status === 'Denied' && (
              <div className="grid gap-4 rounded-xl border border-rose-100 bg-rose-50/60 p-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Denial code (CARC)"><input className="field uppercase" value={denied.denialCode} onChange={(e) => setDenied({ ...denied, denialCode: e.target.value.toUpperCase() })} placeholder="CO-16" /></Field>
                <Field label="Denial reason" className="lg:col-span-1"><input className="field" value={denied.reason} onChange={upd(setDenied, 'reason')} /></Field>
                <Field label="Denied date"><input type="date" className="field" value={denied.deniedDate} onChange={upd(setDenied, 'deniedDate')} /></Field>
                <Field label="Corrected claim TFL (days)"><input className="field" inputMode="numeric" value={denied.corrTFL} onChange={upd(setDenied, 'corrTFL')} /></Field>
                <Field label="Corrected claim fax" className="lg:col-span-2"><input className="field" value={denied.corrFax} onChange={upd(setDenied, 'corrFax')} /></Field>
                <Field label="Appeal TFL (days)"><input className="field" inputMode="numeric" value={denied.applTFL} onChange={upd(setDenied, 'applTFL')} /></Field>
                <Field label="Appeal fax / dept." className="lg:col-span-2"><input className="field" value={denied.applFax} onChange={upd(setDenied, 'applFax')} /></Field>
              </div>
            )}

            {status === 'Not on File' && (
              <div className="grid gap-4 rounded-xl border border-amber-100 bg-amber-50/60 p-4 sm:grid-cols-2">
                <Field label="Payer ID"><input className="field font-mono" value={payerId} onChange={(e) => setPayerId(e.target.value)} /></Field>
                <div>
                  <span className="field-label">Policy active?</span>
                  <div className="grid grid-cols-2 gap-1 rounded-lg bg-white p-1 border border-line">
                    <button type="button" onClick={() => setPolicyActive(true)} className={`rounded-md py-2 text-sm font-semibold ${policyActive ? 'bg-ok text-white' : 'text-ink-3'}`}>Active</button>
                    <button type="button" onClick={() => setPolicyActive(false)} className={`rounded-md py-2 text-sm font-semibold ${!policyActive ? 'bg-danger text-white' : 'text-ink-3'}`}>Inactive</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Field label="Next steps / internal note" className="mt-5">
            <textarea rows={3} className="field" value={claim.nextAction} onChange={upd(setClaim, 'nextAction')} placeholder="e.g. Resubmit corrected claim with modifier 25; follow up in 14 days." />
          </Field>

          <div className="mt-5 rounded-xl border border-dashed border-line-strong bg-bg-soft p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-3">Live preview</p>
            <pre className="whitespace-pre-wrap break-words font-mono text-[0.8rem] leading-relaxed text-ink-2">{preview}</pre>
          </div>

          <button type="button" onClick={addOrUpdate} className={`mt-5 w-full rounded-xl px-5 py-3.5 font-semibold text-white shadow-sm ${editingId ? 'bg-amber-600 hover:bg-amber-700' : 'bg-brand hover:bg-brand-hover'}`}>
            {editingId ? 'Save changes' : '+ Add claim to call note'}
          </button>
        </section>

        {/* Batch */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-2xl border border-line bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-ink">3 · Claims on this call <span className="font-normal text-ink-3">({batch.length})</span></h2>
              {batch.length > 0 && <button type="button" onClick={() => { setBatch([]); resetClaim(); }} className="text-xs text-ink-3 hover:text-danger">Clear all</button>}
            </div>
            {batch.length === 0 ? (
              <p className="text-sm text-ink-3">Claims you add appear here. Add as many as you discussed on the call, then copy one combined note.</p>
            ) : (
              <ul className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
                {batch.map((c) => (
                  <li key={c.id} className={`rounded-xl border p-3 ${editingId === c.id ? 'border-amber-400 bg-amber-50' : 'border-line'}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink">DOS {fmt(c.dos)}</p>
                        <p className="text-xs text-ink-3">{c.status}{c.claimNum ? ` · #${c.claimNum}` : ''}</p>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <button type="button" onClick={() => copy(claimBlock(c), `c${c.id}`)} className="rounded-md p-1.5 text-ink-3 hover:bg-bg-soft hover:text-ink" aria-label="Copy this claim">
                          {copied === `c${c.id}` ? <CheckIcon className="h-4 w-4 text-ok" /> : <CopyIcon className="h-4 w-4" />}
                        </button>
                        <button type="button" onClick={() => edit(c)} className="rounded-md p-1.5 text-ink-3 hover:bg-bg-soft hover:text-ink" aria-label="Edit claim"><EditIcon className="h-4 w-4" /></button>
                        <button type="button" onClick={() => setBatch((b) => b.filter((x) => x.id !== c.id))} className="rounded-md p-1.5 text-ink-3 hover:bg-danger-soft hover:text-danger" aria-label="Delete claim"><TrashIcon className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </div>

      {/* Final note */}
      {batch.length > 0 && (
        <section className="rounded-2xl border border-brand/30 bg-white p-5 sm:p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-semibold text-ink">4 · Final call note</h2>
            <div className="flex gap-2">
              <button type="button" onClick={() => downloadText(`call-note-${new Date().toISOString().slice(0, 10)}.txt`, finalNote)} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-sm font-semibold text-ink-2 hover:border-brand">
                <DownloadIcon className="h-4 w-4" /> .txt
              </button>
              <button type="button" onClick={() => copy(finalNote, 'final')} className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover">
                {copied === 'final' ? <><CheckIcon className="h-4 w-4" /> Copied</> : <><CopyIcon className="h-4 w-4" /> Copy full note</>}
              </button>
            </div>
          </div>
          <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap break-words rounded-xl bg-bg-soft p-4 font-mono text-[0.8rem] leading-relaxed text-ink-2">{finalNote}</pre>
        </section>
      )}
    </div>
  );
}
