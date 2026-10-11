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
    slug: '/blog/timely-filing-limits-guide',
    title: 'Timely Filing Limits: Medicare, Medicaid, Commercial and Proof',
    seoTitle: 'Timely Filing Limits Guide: Avoid CO-29 Denials',
    description:
      'Medicare’s one-year timely filing limit, why other payer limits vary, secondary and corrected claim rules, proof of timely filing, and how to prevent CO-29.',
    date: '2026-10-12',
    readTime: '8 min',
    category: 'Denials',
  },
  {
    slug: '/blog/modifier-59-x-modifiers-guide',
    title: 'Modifier 59 vs XE, XS, XP, XU: When to Use Each',
    seoTitle: 'Modifier 59 vs X Modifiers (XE, XS, XP, XU) Guide',
    description:
      'How NCCI edits and modifier indicators work, when modifier 59 or an X modifier applies, payer differences, documentation needs, and audit risk.',
    date: '2026-10-12',
    readTime: '7 min',
    category: 'Coding',
  },
  {
    slug: '/blog/coordination-of-benefits-secondary-claims',
    title: 'Coordination of Benefits and Secondary Claims: A Biller’s Guide',
    seoTitle: 'Coordination of Benefits & Secondary Claims Guide',
    description:
      'Who is primary, Medicare Secondary Payer basics, Medicaid as payer of last resort, billing secondary claims with CAS data, crossovers, and CO-22 fixes.',
    date: '2026-10-12',
    readTime: '8 min',
    category: 'Revenue Cycle',
  },
  {
    slug: '/blog/corrected-claims-frequency-codes',
    title: 'Corrected Claims: Frequency Codes 7 and 8, and When to Use Them',
    seoTitle: 'Corrected Claims Guide: Frequency Codes 7 & 8 Explained',
    description:
      'When to send a corrected claim, a new claim, an appeal or a reopening; how frequency codes 1, 7 and 8 work; the original claim number; and avoiding duplicate denials.',
    date: '2026-10-12',
    readTime: '8 min',
    category: 'Denials',
  },
  {
    slug: '/blog/cms-1500-claim-form-guide',
    title: 'CMS-1500 Claim Form: Box-by-Box Guide to the Boxes Billers Get Wrong',
    seoTitle: 'CMS-1500 Claim Form Guide: Box-by-Box Instructions',
    description:
      'A box-by-box guide to the CMS-1500 (02/12): patient and insured fields, referring provider, diagnosis pointers, service lines, NPIs, and the errors each one causes.',
    date: '2026-10-12',
    readTime: '9 min',
    category: 'Revenue Cycle',
  },
  {
    slug: '/blog/place-of-service-codes-guide',
    title: 'Place of Service Codes: The POS Codes Billers Use Most',
    seoTitle: 'Place of Service (POS) Codes Guide for Medical Billing',
    description:
      'POS 11, 02, 10, 19, 22, 23, 21, 31 and more: what each place of service code means, facility vs non-facility payment, telehealth POS, and POS-related denials.',
    date: '2026-10-12',
    readTime: '7 min',
    category: 'Coding',
  },
  {
    slug: '/blog/telehealth-billing-guide',
    title: 'Telehealth Billing Guide: POS 02 vs 10, Modifiers 95 and 93',
    seoTitle: 'Telehealth Billing Guide: POS, Modifiers & Denials',
    description:
      'How to bill telehealth: POS 02 vs 10, modifiers 95, 93 and FQ, Medicare vs commercial rules, documentation, virtual check-ins and e-visits, and common denials.',
    date: '2026-10-12',
    readTime: '8 min',
    category: 'Coding',
  },
  {
    slug: '/blog/accounts-receivable-follow-up-guide',
    title: 'A/R Follow-Up: How to Work an Aging Report and Get Claims Paid',
    seoTitle: 'A/R Follow-Up Guide: Working Aging Reports & Claims',
    description:
      'How to read an aging report, prioritize unpaid claims, check claim status, document payer calls, handle common statuses, and track the A/R KPIs that matter.',
    date: '2026-10-12',
    readTime: '8 min',
    category: 'Revenue Cycle',
  },
  {
    slug: '/blog/payment-posting-era-guide',
    title: 'Payment Posting and ERA Reconciliation: A Practical Guide',
    seoTitle: 'Payment Posting & ERA (835) Reconciliation Guide',
    description:
      'How to post ERAs and EOBs correctly: CAS group codes, contractual adjustments vs denials, recoupments and PLB adjustments, EFT reassociation, and daily reconciliation.',
    date: '2026-10-12',
    readTime: '8 min',
    category: 'Revenue Cycle',
  },
  {
    slug: '/blog/medical-necessity-lcd-ncd-abn',
    title: 'Medical Necessity, LCDs, NCDs and the ABN: A Biller’s Guide',
    seoTitle: 'Medical Necessity, LCD vs NCD & ABN Modifiers Guide',
    description:
      'What “reasonable and necessary” means for Medicare, how to use LCDs, NCDs and the Coverage Database, and when to give an ABN with GA, GZ, GY or GX.',
    date: '2026-10-12',
    readTime: '8 min',
    category: 'Regulatory',
  },
  {
    slug: '/blog/provider-credentialing-enrollment-guide',
    title: 'Provider Credentialing and Payer Enrollment: A Billing Team Guide',
    seoTitle: 'Provider Credentialing & Payer Enrollment Guide',
    description:
      'Credentialing vs enrollment vs contracting, NPI types, CAQH, PECOS and the 855 forms, revalidation, and what billing should do while a provider is pending.',
    date: '2026-10-12',
    readTime: '8 min',
    category: 'Revenue Cycle',
  },
  {
    slug: '/blog/workers-compensation-billing-guide',
    title: 'Workers’ Compensation Billing: Intake, Claims and Follow-Up',
    seoTitle: 'Workers’ Compensation Billing Guide for Practices',
    description:
      'How workers’ comp billing differs from health insurance: intake details, state rules, authorization, CMS-1500 boxes 10a and 14, denials and adjuster follow-up.',
    date: '2026-10-12',
    readTime: '8 min',
    category: 'Revenue Cycle',
  },
  {
    slug: '/blog/medicare-advantage-billing-guide',
    title: 'Medicare Advantage vs Original Medicare: What Billers Need to Know',
    seoTitle: 'Medicare Advantage Billing Guide vs Original Medicare',
    description:
      'How to identify Medicare Advantage patients, bill the right plan, handle referrals and prior auth, contracted vs non-contracted rules, dual eligibles, and common denials.',
    date: '2026-10-12',
    readTime: '8 min',
    category: 'Revenue Cycle',
  },
  {
    slug: '/blog/ncci-edits-mue-explained',
    title: 'NCCI Edits and MUEs Explained: PTP Edits, Modifier Indicators and Units',
    seoTitle: 'NCCI Edits & MUEs Explained for Medical Billers',
    description:
      'How NCCI procedure-to-procedure edits and Medically Unlikely Edits work, modifier indicators, MUE adjudication indicators, and how to fix CO-97, CO-236 and CO-151.',
    date: '2026-10-12',
    readTime: '8 min',
    category: 'Coding',
  },
  {
    slug: '/blog/clearinghouse-rejections-guide',
    title: 'Clearinghouse Rejections: 999 and 277CA Reports, Common Causes and Fixes',
    seoTitle: 'Clearinghouse Rejections Guide: 999, 277CA & Fixes',
    description:
      'Rejection vs denial, how to read 999 and 277CA reports, the most common rejection reasons, a daily rejection workflow, and how to prevent rejections.',
    date: '2026-10-12',
    readTime: '8 min',
    category: 'Revenue Cycle',
  },
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
