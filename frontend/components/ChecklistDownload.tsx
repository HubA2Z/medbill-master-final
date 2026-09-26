'use client';

import { useEffect, useRef, useState } from 'react';
import { submitLead } from '@/lib/api';
import { CheckIcon, DownloadIcon, XIcon } from './icons';

const PDF = '/revenue-leak-checklist-2026.pdf';

export default function ChecklistDownload() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    try {
      await submitLead({ name: 'Checklist Requester', email, clinicName: 'N/A (Checklist Download)', source: 'Revenue Leak Checklist', monthlyVolume: 'Requested PDF', lastSearch: 'N/A' });
      setState('done');
      window.open(PDF, '_blank', 'noopener');
    } catch (err) {
      console.error('Checklist request failed:', err);
      setState('error');
    }
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-navy hover:bg-brand-soft">
        <DownloadIcon className="h-4 w-4" /> Download checklist
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => { setOpen(false); if (state === 'done') { setState('idle'); setEmail(''); } }}
        onClick={(e) => { if (e.target === dialogRef.current) setOpen(false); }}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl p-0 shadow-2xl backdrop:bg-navy/70 backdrop:backdrop-blur-sm"
        aria-labelledby="checklist-title"
      >
        <div className="relative p-7 sm:p-8">
          <button type="button" onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-lg p-1.5 text-ink-3 hover:bg-bg-soft" aria-label="Close">
            <XIcon className="h-5 w-5" />
          </button>
          {state === 'done' ? (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-ok"><CheckIcon className="h-6 w-6" /></div>
              <h3 className="mt-4 text-lg font-semibold text-ink">Your checklist is ready</h3>
              <p className="mt-2 text-sm text-ink-3">It should open in a new tab. If not, <a href={PDF} target="_blank" rel="noopener" className="font-semibold text-brand-ink underline">download it here</a>.</p>
            </div>
          ) : (
            <>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-xs font-bold text-brand-ink">PDF</span>
              <h3 id="checklist-title" className="mt-4 text-xl font-semibold text-ink">2026 Revenue Leak Checklist</h3>
              <p className="mt-1 text-sm text-ink-2">Enter your email to get the 10-minute revenue audit checklist.</p>
              <form onSubmit={onSubmit} className="mt-6 space-y-3">
                <label htmlFor="checklist-email" className="sr-only">Work email</label>
                <input id="checklist-email" type="email" required autoComplete="email" placeholder="you@clinic.com" className="field" value={email} onChange={(e) => setEmail(e.target.value)} />
                {state === 'error' && <p role="alert" className="text-sm text-danger">Something went wrong. Please try again.</p>}
                <button type="submit" disabled={state === 'sending'} className="w-full rounded-xl bg-brand px-4 py-3 font-semibold text-white hover:bg-brand-hover disabled:opacity-60">
                  {state === 'sending' ? 'Sending…' : 'Get my checklist →'}
                </button>
              </form>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
