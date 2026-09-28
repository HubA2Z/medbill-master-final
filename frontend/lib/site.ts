import type { Metadata } from 'next';

export const SITE = {
  name: 'Enhancely',
  url: 'https://www.enhancely.in',
  tagline: 'Precision clinical coding and revenue intelligence for modern healthcare teams.',
  defaultDescription:
    'Free ICD-10 code search, a standardized call note builder, and 48-hour revenue audits for medical billers, coders, and RCM teams.',
};

/**
 * Every indexable URL on the site. This is the single source of truth for the
 * sitemap — add a route here when you add a page.
 * `updated` is a fixed date so the sitemap doesn't claim every page changed on every deploy.
 */
export const ROUTES: { path: string; priority: number; updated: string; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '/', priority: 1.0, updated: '2026-09-25', changeFrequency: 'weekly' },
  { path: '/tools', priority: 0.8, updated: '2026-09-25', changeFrequency: 'monthly' },
  { path: '/icd10-intelligence', priority: 0.9, updated: '2026-09-25', changeFrequency: 'weekly' },
  { path: '/claim-scrubber', priority: 0.9, updated: '2026-09-26', changeFrequency: 'monthly' },
  { path: '/call-note-builder', priority: 0.9, updated: '2026-09-25', changeFrequency: 'monthly' },
  { path: '/audit', priority: 0.8, updated: '2026-09-25', changeFrequency: 'monthly' },
  { path: '/billing-specialist-guide', priority: 0.9, updated: '2026-09-25', changeFrequency: 'monthly' },
  { path: '/billing-specialist-guide/salary', priority: 0.8, updated: '2026-09-25', changeFrequency: 'monthly' },
  { path: '/billing-specialist-guide/certification', priority: 0.8, updated: '2026-09-25', changeFrequency: 'monthly' },
  { path: '/billing-specialist-guide/resume-tips', priority: 0.8, updated: '2026-09-25', changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.8, updated: '2026-09-25', changeFrequency: 'weekly' },
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

/**
 * Builds per-page metadata with a self-referencing canonical URL.
 * (The old site set canonical "/" globally, which told Google every page was the homepage.)
 */
export function pageMeta({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  publishedTime?: string;
}): Metadata {
  const url = path === '/' ? SITE.url : `${SITE.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type,
      locale: 'en_US',
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
