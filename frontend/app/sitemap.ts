import type { MetadataRoute } from 'next';
import { ROUTES, SITE } from '@/lib/site';
import { getDbPosts } from '@/lib/blog';

// Rendered per request so articles published in /admin appear immediately.
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fixed: MetadataRoute.Sitemap = ROUTES.map((r) => ({
    url: r.path === '/' ? SITE.url : `${SITE.url}${r.path}`,
    lastModified: new Date(r.updated),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
  const known = new Set(fixed.map((f) => f.url));
  const posts = (await getDbPosts())
    .map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt || p.publishedAt || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
    .filter((p) => !known.has(p.url));
  return [...fixed, ...posts];
}
