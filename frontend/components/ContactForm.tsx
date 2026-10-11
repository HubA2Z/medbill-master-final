'use client';

import { useId, useState } from 'react';
import { submitLead } from '@/lib/api';
import { CheckIcon } from './icons';

const TOPICS = ['General question', 'Feedback on a tool', 'Report an error in an article', 'Billing services / audit', 'Advertising or partnership', 'Privacy or data request'];

export default function ContactForm() {
  const uid = useId();
  const [d, setD] = useState({ name: '', email: '', clinicName: '', topic: TOPICS[0], message: '' });
  const [hp, setHp] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const set = (k: keyof typeof d) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setD((x) => ({ ...x, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    try {
      await submitLead({ name: d.name, email: d.email, clinicName: d.clinicName, source: `Contact form: ${d.topic}`, message: d.message, website: hp });
      setState('done');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="py-10 text-center" role="status">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-ok"><CheckIcon className="h-6 w-6" /></div>
        <h2 className="text-lg font-semibold text-ink">Message sent</h2>
        <p className="mt-2 text-sm text-ink-3">Thanks for reaching out. We usually reply within one to two business days.</p>
        <button type="button" onClick={() => { setState('idle'); setD({ name: '', email: '', clinicName: '', topic: TOPICS[0], message: '' }); }} className="mt-5 text-sm font-semibold text-brand-ink underline underline-offset-4">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="field-label">Your name *</span><input id={`${uid}-n`} className="field" required maxLength={120} value={d.name} onChange={set('name')} autoComplete="name" /></label>
        <label className="block"><span className="field-label">Email *</span><input id={`${uid}-e`} type="email" className="field" required maxLength={200} value={d.email} onChange={set('email')} autoComplete="email" /></label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="field-label">Practice or company (optional)</span><input className="field" maxLength={200} value={d.clinicName} onChange={set('clinicName')} autoComplete="organization" /></label>
        <label className="block"><span className="field-label">Topic</span>
          <select className="field" value={d.topic} onChange={set('topic')}>{TOPICS.map((t) => <option key={t}>{t}</option>)}</select>
        </label>
      </div>
      <label className="block"><span className="field-label">Message *</span>
        <textarea className="field min-h-[160px]" required maxLength={3000} value={d.message} onChange={set('message')} placeholder="How can we help? Please don’t include patient names, member IDs or other health information." />
      </label>
      {/* Honeypot: hidden from people, often filled by bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} className="hidden" aria-hidden="true" />
      {state === 'error' && <p className="text-sm text-danger" role="alert">Something went wrong. Please check the fields and try again.</p>}
      <button type="submit" disabled={state === 'sending'} className="w-full rounded-xl bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-hover disabled:opacity-60 sm:w-auto">
        {state === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
