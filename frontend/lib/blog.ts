// Server-side helpers for articles written in the /admin editor (stored in MongoDB via the Express API).
import { SITE } from './site';
import { POSTS, type Post } from './posts';

export type DbPost = {
  slug: string; // without "/blog/"
  title: string;
  seoTitle?: string;
  description: string;
  category: string;
  coverImage?: string;
  contentHtml?: string;
  author?: string;
  readTime?: string;
  publishedAt?: string;
  updatedAt?: string;
};

const API = () => process.env.INTERNAL_API_URL || SITE.url;
export const REVALIDATE = 60;

export async function getDbPosts(): Promise<DbPost[]> {
  try {
    const r = await fetch(`${API()}/api/posts`, { next: { revalidate: REVALIDATE, tags: ['posts'] } });
    if (!r.ok) return [];
    const data = await r.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getDbPost(slug: string): Promise<DbPost | null> {
  if (!/^[a-z0-9-]{1,120}$/.test(slug)) return null;
  try {
    const r = await fetch(`${API()}/api/posts/${slug}`, { next: { revalidate: REVALIDATE, tags: ['posts', `post:${slug}`] } });
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  }
}

/** DB post → the same shape as the hand-built articles, for listings. */
export const toListing = (p: DbPost): Post => ({
  slug: `/blog/${p.slug}`,
  title: p.title,
  seoTitle: p.seoTitle || p.title,
  description: p.description,
  date: (p.publishedAt || p.updatedAt || new Date().toISOString()).slice(0, 10),
  readTime: p.readTime || '5 min',
  category: p.category || 'Insights',
});

/** All articles (admin-written + original), newest first. */
export async function getAllListings(): Promise<Post[]> {
  const db = (await getDbPosts()).map(toListing);
  const seen = new Set(db.map((p) => p.slug));
  return [...db, ...POSTS.filter((p) => !seen.has(p.slug))].sort((a, b) => b.date.localeCompare(a.date));
}
