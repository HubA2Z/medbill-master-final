import Link from 'next/link';
import { Container, PageHero, SectionHeading, Badge, CtaBand } from '@/components/ui';
import { SearchIcon, PhoneNoteIcon, ChartIcon, ArrowRight, BookIcon } from '@/components/icons';
import { pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Free Medical Billing & Coding Tools for RCM Teams',
  description:
    'Free tools for medical billers, coders, and revenue cycle teams: live ICD-10-CM code search, an insurance call note builder, and a 48-hour revenue audit. Claim scrubber and denial tracker coming soon.',
  path: '/tools',
});

const AVAILABLE = [
  {
    icon: SearchIcon,
    tag: 'Core tool',
    title: 'ICD-10 code search',
    body: 'Real-time search across 70,000+ ICD-10-CM codes via live NLM Clinical Tables. Smart synonyms, autocomplete, code lists, instant copy, and CSV export.',
    href: '/icd10-intelligence',
  },
  {
    icon: PhoneNoteIcon,
    tag: 'Workflow',
    title: 'Call note builder',
    body: 'Standardized notes for insurance calls — paid, denied, in-process, and not-on-file claims — combined into one copy-ready call log.',
    href: '/call-note-builder',
  },
  {
    icon: ChartIcon,
    tag: 'Service',
    title: 'Free revenue audit',
    body: 'Certified billing specialists review your revenue cycle for modifier errors, unbundling, and under-coded E/M — report in 48 hours.',
    href: '/audit',
  },
];

const SOON = [
  { title: 'Claim scrubber', body: 'Detect unbundling issues, modifier errors, and compliance risks before submission.' },
  { title: 'E/M level advisor', body: 'Guideline-based E/M level recommendations from encounter details.' },
  { title: 'Denial tracker', body: 'Monitor denial trends, root causes, and recovery performance across payers.' },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Tools', href: '/tools' }]}
        eyebrow="Professional toolkit"
        title="Tools that actually move the needle"
        subtitle="Purpose-built utilities for medical billers, coders, and revenue cycle teams. Free, fast, and zero-PHI."
      />

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Available now" title="Start using today" />
          <div className="grid gap-5 md:grid-cols-3">
            {AVAILABLE.map(({ icon: Icon, ...t }) => (
              <Link key={t.href} href={t.href} className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-slate-200/70">
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand-ink"><Icon className="h-5 w-5" /></span>
                  <Badge tone="slate">{t.tag}</Badge>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">{t.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">{t.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink">Open tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
              </Link>
            ))}
          </div>

          <div className="mt-16">
            <SectionHeading eyebrow="On the roadmap" title="Coming soon" />
            <div className="grid gap-5 md:grid-cols-3">
              {SOON.map((t) => (
                <div key={t.title} className="rounded-2xl border border-dashed border-line-strong bg-bg-soft p-6">
                  <Badge tone="warn">In development</Badge>
                  <h3 className="mt-4 font-semibold text-ink">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{t.body}</p>
                </div>
              ))}
            </div>
          </div>

          <Link href="/billing-specialist-guide" className="group mt-16 flex flex-col gap-6 rounded-2xl border border-line bg-bg-tint p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <BookIcon className="h-8 w-8 shrink-0 text-brand" />
              <div>
                <h2 className="text-xl font-semibold text-ink">What does a billing specialist actually do in 2026?</h2>
                <p className="mt-1 text-ink-2">Job descriptions, salary ranges, certifications, and the skills that separate top performers in RCM.</p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand-ink">Read the career guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
          </Link>
        </Container>
      </section>

      <CtaBand title="Need full-service billing support?" body="Let our certified team handle your revenue cycle end to end — so you can focus on patient care." primary={{ label: 'Book a free consultation', href: '/audit' }} secondary={null} />
    </>
  );
}
