'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/adminApi';
import { LockIcon } from '../icons';

/** Shows a login form until the admin session cookie is valid, then renders children. */
export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<'checking' | 'out' | 'in' | 'unconfigured'>('checking');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    adminApi.me()
      .then((m) => setState(m.signedIn ? 'in' : m.configured ? 'out' : 'unconfigured'))
      .catch(() => setState('out'));
  }, []);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr('');
    try { await adminApi.login(email, password); setState('in'); setPassword(''); }
    catch (x: any) { setErr(x.message || 'Login failed'); }
    finally { setBusy(false); }
  }

  if (state === 'checking') return <p className="py-24 text-center text-ink-3">Loading…</p>;
  if (state === 'in') return <>{children}</>;

  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <div className="rounded-2xl border border-line bg-white p-7 shadow-sm">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand-ink"><LockIcon className="h-5 w-5" /></span>
        <h1 className="mt-4 text-xl font-semibold text-ink">Admin sign in</h1>
        {state === 'unconfigured' ? (
          <p className="mt-3 text-sm leading-relaxed text-ink-2">
            Admin login isn’t set up yet. In Vercel → Settings → Environment Variables, add <code className="rounded bg-bg-soft px-1">ADMIN_EMAIL</code> and <code className="rounded bg-bg-soft px-1">ADMIN_PASSWORD</code>, then redeploy.
          </p>
        ) : (
          <form onSubmit={onLogin} className="mt-5 space-y-4">
            <label className="block"><span className="field-label">Email</span><input className="field" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
            <label className="block"><span className="field-label">Password</span><input className="field" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
            {err && <p role="alert" className="text-sm text-danger">{err}</p>}
            <button disabled={busy} className="w-full rounded-xl bg-brand px-4 py-3 font-semibold text-white hover:bg-brand-hover disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in'}</button>
          </form>
        )}
      </div>
    </div>
  );
}
