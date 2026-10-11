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
    slug: '/blog/modifier-25-guide',
    title: 'Modifier 25 Explained: When a Same-Day E/M Is Separately Billable',
    seoTitle: 'Modifier 25 Explained: Rules, Examples & Denials',
    description:
      'When to use modifier 25 on a same-day E/M: global days, documentation, preventive + problem visits, modifier 57 vs 25, examples, and how to fix denials.',
    date: '2026-10-11',
    readTime: '7 min',
    category: 'Coding',
  },
  {
    slug: '/blog/prior-authorization-guide',
    title: 'Prior Authorization Guide for Billing Teams: Requests to Denials',
    seoTitle: 'Prior Authorization Guide for Medical Billing Teams',
    description:
      'How to check, submit, and track prior authorizations, handle peer-to-peer reviews and retro-auth, fix CO-197 denials, and compare MA vs Original Medicare rules.',
    date: '2026-10-11',
    readTime: '7 min',
    category: 'Revenue Cycle',
  },
  {
    slug: '/blog/insurance-eligibility-verification-guide',
    title: 'Insurance Eligibility Verification: Checklist, Script & Note Format',
    seoTitle: 'Insurance Eligibility Verification Checklist & Script',
    description:
      'What to verify before every visit: coverage, network, referrals, deductibles, COB, MA vs Medicare, 270/271 checks, a call script, and a note format to copy.',
    date: '2026-10-11',
    readTime: '7 min',
    category: 'Revenue Cycle',
  },
  {
    slug: '/blog/medical-billing-vs-medical-coding',
    title: 'Medical Billing vs Medical Coding: Duties, Credentials & Careers',
    seoTitle: 'Medical Billing vs Medical Coding: Which Career Fits?',
    description:
      'How medical billing and coding differ: daily duties, claim lifecycle handoffs, CPB, CPC, CCA, and CCS credentials, remote work, career paths, and how to start.',
    date: '2026-10-11',
    readTime: '6 min',
    category: 'Careers',
  },
  {
    slug: '/blog/medical-claim-appeal-guide',
    title: 'How to Appeal a Denied Medical Claim: Steps, Deadlines & Letter Template',
    seoTitle: 'How to Appeal a Denied Medical Claim (+ Letter Template)',
    description:
      'Step-by-step guide to medical claim appeals: corrected claim vs appeal, Medicare\u2019s 5 appeal levels and deadlines, commercial payer appeals, and a copy-ready appeal letter.',
    date: '2026-10-09',
    readTime: '10 min',
    category: 'Denials',
  },
  {
    slug: '/blog/year-end-billing-checklist-2027',
    title: 'Year-End Medical Billing Checklist: How to Prepare for 2027',
    seoTitle: 'Year-End Medical Billing Checklist: Prepare for 2027',
    description:
      'Get ready for January 1, 2027: new CPT/HCPCS codes, the Medicare fee schedule, deductible resets, timely filing, prior auths, credentialing, and E/M audits.',
    date: '2026-10-09',
    readTime: '9 min',
    category: 'Revenue Cycle',
  },
  {
    slug: '/blog/icd-10-2026-updates',
    title: 'ICD-10-CM Code Updates for 2026–2027: What Billers and Coders Must Know',
    seoTitle: 'ICD-10-CM Updates 2026–2027: Guide for Billers & Coders',
    description: 'How annual ICD-10-CM updates work: October 1 effective dates, new, revised and deleted codes, no grace period, and how to prepare your practice.',
    date: '2026-07-21',
    readTime: '8 min',
    category: 'Regulatory',
  },
  {
    slug: '/blog/reduce-claim-denials',
    title: 'How to Reduce Claim Denials: A Front-to-Back Revenue Cycle Guide',
    seoTitle: 'How to Reduce Claim Denials: Practical Guide for Billers',
    description: 'Reduce claim denials at every stage: eligibility, authorization, coding, modifiers, claim scrubbing, appeals, root-cause fixes and the KPIs to track.',
    date: '2026-07-15',
    readTime: '7 min',
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
    title: 'AI in Medical Billing: Real Uses, Risks, and What It Means for Billers',
    seoTitle: 'AI in Medical Billing: Uses, Risks & Vendor Checklist',
    description: 'Where AI fits in medical billing: eligibility, claim scrubbing, coding suggestions and denial prediction, plus HIPAA risks and how to evaluate vendors.',
    date: '2026-07-08',
    readTime: '7 min',
    category: 'Technology',
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug)!;

export function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
