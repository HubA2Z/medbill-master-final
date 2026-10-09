import type { Metadata } from 'next';

export const SITE = {
  name: 'Enhancely',
  url: 'https://www.enhancely.in',
  tagline: 'Precision clinical coding and revenue intelligence for modern healthcare teams.',
  ogImage: '/og.png',
  author: {
    name: 'Ashim',
    role: 'Medical Billing & RCM Specialist',
    bio: 'Ashim works in US medical billing and revenue cycle management every day: claim follow-up, denial management and appeals, and claim status checks with payers including UnitedHealthcare, Cigna, Optum, UMR and Meritain Health. Hands-on with eClinicalWorks, Tebra, and Office Ally, Ashim builds the Enhancely tools to fix the problems billing teams actually run into.',
  },
  defaultDescription:
    'Professional medical billing and coding tools for RCM teams: ICD-10 code search, claim scrubber, E/M audit tool, and insurance call notes. Free, no sign-up.',
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
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [SITE.ogImage] },
  };
}
