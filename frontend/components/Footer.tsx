import Link from 'next/link';
import { Logo } from './icons';
import { SITE } from '@/lib/site';

const COLUMNS = [
  {
    title: 'Tools',
    links: [
      { name: 'ICD-10 Code Search', href: '/icd10-intelligence' },
      { name: 'Claim Scrubber', href: '/claim-scrubber' },
      { name: 'E/M Audit Tool 2026', href: '/em-audit-tool' },
      { name: 'Call Note Builder', href: '/call-note-builder' },
      { name: 'Free Revenue Audit', href: '/audit' },
      { name: 'All Tools', href: '/tools' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Billing Specialist Guide', href: '/billing-specialist-guide' },
      { name: 'Salary Guide 2026', href: '/billing-specialist-guide/salary' },
      { name: 'Certification Guide', href: '/billing-specialist-guide/certification' },
      { name: 'Resume Tips', href: '/billing-specialist-guide/resume-tips' },
      { name: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Our Mission', href: '/mission' },
      { name: 'HIPAA Compliance', href: '/hipaa' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg-soft">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-14 pb-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" aria-label="Enhancely home"><Logo /></Link>
            <p className="max-w-xs text-sm leading-relaxed text-ink-3">{SITE.tagline}</p>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-2">
              <span className="h-2 w-2 rounded-full bg-ok" /> Zero-PHI platform · HIPAA-aligned
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ink-3 hover:text-brand-ink">{l.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Enhancely. All rights reserved.</p>
          <p>ICD-10-CM data via the NLM Clinical Tables API. Reference use only — verify final codes with a certified coder.</p>
        </div>
      </div>
    </footer>
  );
}
