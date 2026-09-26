'use client';

import { useState } from 'react';
import { submitLead } from '@/lib/api';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    try {
      await submitLead({ name: 'Newsletter Subscriber', email, clinicName: 'N/A (Newsletter)', source: 'Blog Newsletter' });
      setState('done');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') return <p role="status" className="font-semibold text-brand-ink">You’re subscribed — watch your inbox for the next update.</p>;

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <label htmlFor="nl-email" className="sr-only">Work email</label>
      <input id="nl-email" type="email" required autoComplete="email" placeholder="Your work email" className="field flex-1" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit" disabled={state === 'sending'} className="rounded-xl bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-hover disabled:opacity-60">
        {state === 'sending' ? 'Subscribing…' : 'Subscribe'}
      </button>
      {state === 'error' && <p role="alert" className="text-sm text-danger sm:hidden">Something went wrong. Try again.</p>}
    </form>
  );
}
