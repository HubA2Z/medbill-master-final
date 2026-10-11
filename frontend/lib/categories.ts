// Blog categories. `name` must match the `category` value on posts (static and admin-written).
export const CATEGORIES = [
  { slug: 'denials-appeals', name: 'Denials', label: 'Denials & Appeals', description: 'Denial codes explained, how to fix and appeal denied claims, and how to prevent the same denials from coming back.' },
  { slug: 'coding', name: 'Coding', label: 'Medical Coding', description: 'E/M levels, modifiers, ICD-10-CM specificity, and coding rules billers and coders use every day.' },
  { slug: 'revenue-cycle', name: 'Revenue Cycle', label: 'Revenue Cycle', description: 'Eligibility, prior authorization, A/R follow-up, timely filing, and the processes that get claims paid the first time.' },
  { slug: 'patient-billing', name: 'Patient Billing', label: 'Patient Billing', description: 'Deductibles, coinsurance, out-of-pocket limits, estimates, and explaining patient balances clearly.' },
  { slug: 'regulatory', name: 'Regulatory', label: 'Regulatory Updates', description: 'Annual code set updates, CMS rules, and changes that affect billing and coding.' },
  { slug: 'technology', name: 'Technology', label: 'Healthcare Technology', description: 'AI, automation, and software in medical billing, and how to evaluate them.' },
  { slug: 'careers', name: 'Careers', label: 'Careers', description: 'Becoming a medical biller or coder: duties, certifications, salary factors, and resume tips.' },
] as const;

export type Category = (typeof CATEGORIES)[number];
export const categoryByName = (name: string) => CATEGORIES.find((c) => c.name.toLowerCase() === name.toLowerCase());
export const categoryHref = (name: string) => {
  const c = categoryByName(name);
  return c ? `/blog/category/${c.slug}` : '/blog';
};
