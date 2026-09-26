import type { MetadataRoute } from 'next';
import { ROUTES, SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: r.path === '/' ? SITE.url : `${SITE.url}${r.path}`,
    lastModified: new Date(r.updated),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
