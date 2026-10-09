import { Router } from 'express';
import { postRepo } from '../admin/repo';

// Served at /sitemap.xml via vercel.json. Keep this list in sync with frontend/lib/site.ts ROUTES.
const SITE = 'https://www.enhancely.in';
const ROUTES = [
  { path: '/', priority: 1.0, updated: '2026-09-25', changeFrequency: 'weekly' },
  { path: '/tools', priority: 0.8, updated: '2026-09-25', changeFrequency: 'monthly' },
  { path: '/icd10-intelligence', priority: 0.9, updated: '2026-09-25', changeFrequency: 'weekly' },
  { path: '/claim-scrubber', priority: 0.9, updated: '2026-09-26', changeFrequency: 'monthly' },
  { path: '/em-audit-tool', priority: 0.9, updated: '2026-10-01', changeFrequency: 'monthly' },
  { path: '/call-note-builder', priority: 0.9, updated: '2026-09-25', changeFrequency: 'monthly' },
  { path: '/audit', priority: 0.8, updated: '2026-09-25', changeFrequency: 'monthly' },
  { path: '/billing-specialist-guide', priority: 0.9, updated: '2026-09-25', changeFrequency: 'monthly' },
  { path: '/billing-specialist-guide/salary', priority: 0.8, updated: '2026-09-25', changeFrequency: 'monthly' },
  { path: '/billing-specialist-guide/certification', priority: 0.8, updated: '2026-09-25', changeFrequency: 'monthly' },
  { path: '/billing-specialist-guide/resume-tips', priority: 0.8, updated: '2026-09-25', changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.8, updated: '2026-09-25', changeFrequency: 'weekly' },
  { path: '/blog/medical-claim-appeal-guide', priority: 0.8, updated: '2026-10-09', changeFrequency: 'monthly' },
  { path: '/blog/year-end-billing-checklist-2027', priority: 0.8, updated: '2026-10-09', changeFrequency: 'monthly' },
  { path: '/blog/icd-10-2026-updates', priority: 0.7, updated: '2026-07-21', changeFrequency: 'yearly' },
  { path: '/blog/reduce-claim-denials', priority: 0.7, updated: '2026-07-15', changeFrequency: 'yearly' },
  { path: '/blog/em-coding-2026', priority: 0.8, updated: '2026-09-28', changeFrequency: 'yearly' },
  { path: '/blog/ai-in-medical-billing', priority: 0.7, updated: '2026-07-08', changeFrequency: 'yearly' },
  { path: '/about', priority: 0.6, updated: '2026-09-25', changeFrequency: 'yearly' },
  { path: '/mission', priority: 0.5, updated: '2026-09-25', changeFrequency: 'yearly' },
  { path: '/hipaa', priority: 0.6, updated: '2026-09-25', changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.3, updated: '2026-09-25', changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, updated: '2026-09-25', changeFrequency: 'yearly' },
];

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const day = (d: any) => new Date(d).toISOString().slice(0, 10);

const router = Router();
router.get('/sitemap.xml', async (_req, res) => {
  let posts: any[] = [];
  try { posts = await postRepo.listPublished(); } catch (e) { console.error('sitemap posts failed', e); }
  const known = new Set(ROUTES.map((r) => r.path));
  const urls = [
    ...ROUTES.map((r) => ({ loc: r.path === '/' ? SITE : SITE + r.path, lastmod: r.updated, freq: r.changeFrequency, pri: r.priority })),
    ...posts.filter((p) => !known.has('/blog/' + p.slug)).map((p) => ({ loc: `${SITE}/blog/${p.slug}`, lastmod: day(p.updatedAt || p.publishedAt || Date.now()), freq: 'monthly', pri: 0.7 })),
  ];
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `<url><loc>${esc(u.loc)}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.freq}</changefreq><priority>${u.pri}</priority></url>`).join('\n') +
    '\n</urlset>\n';
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
  res.send(xml);
});

export default router;
