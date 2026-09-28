export type Post = {
  slug: string; // URL path — do not change for existing posts (indexed URLs)
  title: string;
  seoTitle: string;
  description: string;
  date: string; // ISO
  readTime: string;
  category: string;
};

export const POSTS: Post[] = [
  {
    slug: '/blog/icd-10-2026-updates',
    title: '2026 ICD-10-CM Highlights: Key Changes Every Medical Biller and Coder Must Know',
    seoTitle: '2026 ICD-10-CM Updates: Key Code Changes for Billers & Coders',
    description:
      'Over 250 new codes, with major updates in diabetes, mental health, musculoskeletal, and Long COVID. What changes on October 1, 2026 and how to prepare.',
    date: '2026-07-21',
    readTime: '12 min',
    category: 'Regulatory',
  },
  {
    slug: '/blog/reduce-claim-denials',
    title: 'How to Reduce Claim Denials by 40% — Proven Strategies for 2026',
    seoTitle: 'How to Reduce Claim Denials by 40%: 7 Proven Strategies (2026)',
    description:
      'Seven systems top-performing billing teams use to cut denials dramatically — from documentation and specificity to claim scrubbing and appeals.',
    date: '2026-07-15',
    readTime: '11 min',
    category: 'Revenue Cycle',
  },
  {
    slug: '/blog/em-coding-2026',
    title: 'Updated E/M Coding Guidelines 2026: MDM, Time, G2211 & Medicare Changes',
    seoTitle: 'Updated E/M Coding Guidelines 2026: MDM, Time & G2211',
    description:
      'The 2026 E/M coding guide: MDM levels, time thresholds, 99417 vs G2212, G2211, split/shared visits, modifier 25, and what changed in Medicare for 2026.',
    date: '2026-09-28',
    readTime: '12 min',
    category: 'Coding',
  },
  {
    slug: '/blog/ai-in-medical-billing',
    title: 'The Role of AI in Medical Billing: Opportunities, Risks, and the Human Edge in 2026',
    seoTitle: 'AI in Medical Billing 2026: Opportunities & Risks',
    description:
      'Where AI is making the biggest impact in revenue cycle management, the risks to understand, and why a human-in-the-loop approach wins.',
    date: '2026-07-08',
    readTime: '13 min',
    category: 'Industry Trends',
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug)!;

export function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
