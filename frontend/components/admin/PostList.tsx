'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { adminApi, type AdminPost } from '@/lib/adminApi';
import { POSTS } from '@/lib/posts';
import { EditIcon, TrashIcon } from '../icons';

const fmt = (d?: string | null) => (d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—');

export default function PostList() {
  const [posts, setPosts] = useState<AdminPost[] | null>(null);
  const [err, setErr] = useState('');

  const load = () => adminApi.list().then(setPosts).catch((e) => setErr(e.message));
  useEffect(() => { load(); }, []);

  async function del(p: AdminPost) {
    if (!window.confirm(`Delete “${p.title}”? This can’t be undone.`)) return;
    try { await adminApi.remove(p._id); load(); } catch (e: any) { setErr(e.message); }
  }
  async function signOut() { await adminApi.logout().catch(() => {}); window.location.reload(); }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">Articles</h1>
          <p className="text-sm text-ink-3">Write, publish, and edit blog posts. Published posts appear on the site within about a minute.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={signOut} className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink-2 hover:border-brand">Sign out</button>
          <Link href="/admin/posts/new" className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover">+ New article</Link>
        </div>
      </div>

      {err && <p role="alert" className="mt-6 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">{err}</p>}

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
        {posts === null ? (
          <p className="p-8 text-center text-ink-3">Loading…</p>
        ) : posts.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-medium text-ink">No articles yet</p>
            <p className="mt-1 text-sm text-ink-3">Your first post will show up here.</p>
            <Link href="/admin/posts/new" className="mt-4 inline-block rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover">Write your first article</Link>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {posts.map((p) => (
              <li key={p._id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.status === 'published' ? 'bg-emerald-50 text-ok' : 'bg-warn-soft text-warn'}`}>{p.status === 'published' ? 'Published' : 'Draft'}</span>
                    <span className="text-xs text-ink-3">{p.category} · updated {fmt(p.updatedAt)}</span>
                  </div>
                  <Link href={`/admin/posts/${p._id}`} className="mt-1 block truncate font-semibold text-ink hover:text-brand-ink">{p.title}</Link>
                  <p className="truncate text-xs text-ink-3">/blog/{p.slug}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  {p.status === 'published' && <a href={`/blog/${p.slug}`} target="_blank" rel="noopener" className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink-2 hover:border-brand">View</a>}
                  <Link href={`/admin/posts/${p._id}`} className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink-2 hover:border-brand"><EditIcon className="h-3.5 w-3.5" /> Edit</Link>
                  <button onClick={() => del(p)} className="rounded-lg p-1.5 text-ink-3 hover:bg-danger-soft hover:text-danger" aria-label={`Delete ${p.title}`}><TrashIcon className="h-4 w-4" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-line-strong p-5">
        <p className="text-sm font-semibold text-ink">Original articles</p>
        <p className="mt-1 text-sm text-ink-3">These {POSTS.length} launch articles are built into the site code, so they aren’t editable here. Ask your developer to change them.</p>
        <ul className="mt-3 space-y-1 text-sm">
          {POSTS.map((p) => <li key={p.slug}><a href={p.slug} target="_blank" rel="noopener" className="text-brand-ink hover:underline">{p.title}</a></li>)}
        </ul>
      </div>
    </div>
  );
}
