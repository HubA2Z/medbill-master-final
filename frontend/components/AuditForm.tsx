'use client';

import { useId, useState } from 'react';
import { submitLead } from '@/lib/api';
import { CheckIcon, LockIcon } from './icons';

export default function AuditForm({ source = 'Revenue Audit Page', compact = false }: { source?: string; compact?: boolean }) {
  const uid = useId();
  const [data, setData] = useState({ name: '', clinicName: '', email: '', monthlyVolume: '0-500' });
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    try {
      await submitLead({ ...data, source });
      setState('done');
    } catch (err) {
      console.error('Lead submission failed:', err);
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="py-8 text-center" role="status">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-ok">
          <CheckIcon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-ink">Request received</h3>
        <p className="mt-2 text-sm text-ink-3">Our billing team will reach out within one business day.</p>
        <button type="button" onClick={() => { setState('idle'); setData({ name: '', clinicName: '', email: '', monthlyVolume: '0-500' }); }} className="mt-5 text-sm font-semibold text-brand-ink underline underline-offset-4">
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
      <div className={compact ? 'grid gap-4' : 'grid gap-4 sm:grid-cols-2'}>
        <div>
          <label htmlFor={`${uid}-name`} className="field-label">Full name</label>
          <input id={`${uid}-name`} required autoComplete="name" className="field" placeholder="Jane Doe" value={data.name} onChange={set('name')} />
        </div>
        <div>
          <label htmlFor={`${uid}-clinic`} className="field-label">Practice name</label>
          <input id={`${uid}-clinic`} required autoComplete="organization" className="field" placeholder="Riverside Family Clinic" value={data.clinicName} onChange={set('clinicName')} />
        </div>
      </div>
      <div>
        <label htmlFor={`${uid}-email`} className="field-label">Work email</label>
        <input id={`${uid}-email`} required type="email" autoComplete="email" className="field" placeholder="you@clinic.com" value={data.email} onChange={set('email')} />
      </div>
      <div>
        <label htmlFor={`${uid}-vol`} className="field-label">Monthly claim volume</label>
        <select id={`${uid}-vol`} className="field" value={data.monthlyVolume} onChange={set('monthlyVolume')}>
          <option value="0-500">0 – 500 claims / month</option>
          <option value="500-2000">500 – 2,000 claims / month</option>
          <option value="2000+">2,000+ claims / month</option>
        </select>
      </div>

      {state === 'error' && (
        <p role="alert" className="rounded-lg bg-danger-soft px-3 py-2.5 text-sm text-danger">
          Something went wrong sending your request. Please try again in a moment.
        </p>
      )}

      <button type="submit" disabled={state === 'sending'} className="w-full rounded-xl bg-brand px-5 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60">
        {state === 'sending' ? 'Sending…' : 'Get my free audit'}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-ink-3">
        <LockIcon className="h-3.5 w-3.5" /> Business details only — never enter patient information.
      </p>
    </form>
  );
}
