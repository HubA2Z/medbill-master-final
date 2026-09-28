'use client';

export type AdminPost = {
  _id: string;
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  category: string;
  coverImage?: string;
  contentHtml?: string;
  status: 'draft' | 'published';
  readTime?: string;
  publishedAt?: string | null;
  updatedAt?: string;
};

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const r = await fetch(`/api/admin${path}`, { credentials: 'same-origin', ...init, headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) } });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) {
    const e: any = new Error(data?.error || `Request failed (${r.status})`);
    e.status = r.status;
    throw e;
  }
  return data as T;
}

export const adminApi = {
  me: () => call<{ signedIn: boolean; configured: boolean }>('/me'),
  login: (email: string, password: string) => call<{ ok: true }>('/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => call<{ ok: true }>('/logout', { method: 'POST' }),
  list: () => call<AdminPost[]>('/posts'),
  get: (id: string) => call<AdminPost>(`/posts/${id}`),
  create: (p: Partial<AdminPost>) => call<AdminPost>('/posts', { method: 'POST', body: JSON.stringify(p) }),
  update: (id: string, p: Partial<AdminPost>) => call<AdminPost>(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(p) }),
  remove: (id: string) => call<{ ok: true }>(`/posts/${id}`, { method: 'DELETE' }),
  async upload(file: File): Promise<string> {
    const r = await fetch('/api/admin/upload', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': file.type }, body: file });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data?.error || 'Upload failed');
    return data.url;
  },
};
