import type { Metadata } from 'next';
import Link from 'next/link';
import HomeSearch from '@/components/HomeSearch';
import AuditForm from '@/components/AuditForm';
import { Container, Eyebrow, SectionHeading, CheckItem, ButtonLink } from '@/components/ui';
import { SearchIcon, PhoneNoteIcon, ChartIcon, ShieldIcon, BookIcon, ArrowRight } from '@/components/icons';
import { pageMeta } from '@/lib/site';
import { POSTS, formatDate } from '@/lib/posts';

export const metadata: Metadata = {
  ...pageMeta({
  title: 'Enhancely — Free ICD-10 Search, Call Note Builder & RCM Tools',
  description:
    'Real-time ICD-10-CM code search from the National Library of Medicine, a standardized insurance call note builder, and free 48-hour revenue audits for medical billing teams.',
  path: '/',
  }),
  // Homepage uses the full title without the "| Enhancely" suffix.
  title: { absolute: 'Enhancely — Free ICD-10 Search, Call Note Builder & RCM Tools' },
};

const STATS = [
  { v: '70,000+', l: 'ICD-10-CM codes' },
  { v: '500+', l: 'Clinics served' },
  { v: '98.7%', l: 'Coding accuracy' },
  { v: '$2.4M', l: 'Revenue recovered' },
];

const TOOLS = [
  {
    icon: SearchIcon,
    title: 'ICD-10 code search',
    body: 'Live lookup across the full ICD-10-CM set with autocomplete, lay-term synonyms, code lists, and CSV export.',
    href: '/icd10-intelligence',
    cta: 'Search codes',
  },
  {
    icon: PhoneNoteIcon,
    title: 'Call note builder',
    body: 'Turn payer follow-up calls into consistent, audit-ready notes — paid, denied, in process, or not on file.',
    href: '/call-note-builder',
    cta: 'Build a note',
  },
  {
    icon: ChartIcon,
    title: '48-hour revenue audit',
    body: 'Certified specialists find modifier errors, unbundling, and under-coded E/M levels. Free report in two days.',
    href: '/audit',
    cta: 'Request audit',
  },
];

const SERVICES = [
  'Full revenue cycle management',
  'Denial appeals & recovery',
  'Rapid 48-hour audits',
  'E/M optimization',
  'ICD-11 transition support',
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line bg-bg-soft">
        <div aria-hidden className="bg-grid absolute inset-0" />
        <div aria-hidden className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand/10 blur-3xl" />
        <Container className="relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-2">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" /><span className="relative h-2 w-2 rounded-full bg-ok" /></span>
              Live NLM sync · 2026 code set
            </p>
            <h1 className="mt-5 text-4xl sm:text-6xl font-bold leading-[1.05] tracking-tight text-ink text-balance">
              Accurate codes.<br /><span className="text-brand">Faster revenue.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
              Real-time ICD-10 search powered by the National Library of Medicine, plus the workflow tools and expert support billing teams need to get paid right the first time.
            </p>
            <div className="mt-8 max-w-xl">
              <HomeSearch />
            </div>
          </div>

          {/* Product preview card */}
          <div className="hidden lg:block" aria-hidden>
            <div className="rotate-1 rounded-2xl border border-line bg-white p-5 shadow-2xl shadow-slate-300/50">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <p className="text-sm font-semibold text-ink">Results for “type 2 diabetes”</p>
                <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-semibold text-brand-ink">NLM live</span>
              </div>
              {[
                ['E11.9', 'Type 2 diabetes mellitus without complications'],
                ['E11.65', 'Type 2 diabetes mellitus with hyperglycemia'],
                ['E11.22', 'Type 2 DM with diabetic chronic kidney disease'],
                ['E11.40', 'Type 2 DM with diabetic neuropathy, unspecified'],
              ].map(([c, d]) => (
                <div key={c} className="flex items-center gap-3 border-b border-line py-3 last:border-0">
                  <span className="w-16 rounded-md bg-brand-soft py-1 text-center font-mono text-xs font-bold text-brand-ink">{c}</span>
                  <span className="flex-1 text-sm text-ink-2">{d}</span>
                  <span className="text-xs text-ink-3">Copy</span>
                </div>
              ))}
            </div>
            <div className="-mt-6 ml-10 w-72 -rotate-2 rounded-2xl border border-line bg-white p-4 shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-3">Call note</p>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-2">
                DOS: 08/14/2026 | CLM#: 4471-A<br />STATUS: [PAID] Paid: $182.40 …<br />ACTION: Post payment, bill secondary.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* STATS */}
      <section className="border-b border-line bg-white">
        <Container className="grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">{s.v}</p>
              <p className="mt-1 text-sm text-ink-3">{s.l}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* TOOLS */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Free tools" title="Everything a billing team reaches for, in one place" subtitle="No sign-up. No patient data. Just fast, accurate tools built by people who work claims every day." />
          <div className="grid gap-5 md:grid-cols-3">
            {TOOLS.map(({ icon: Icon, ...t }) => (
              <Link key={t.href} href={t.href} className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-slate-200/70">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand-ink"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{t.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">{t.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink">
                  {t.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* WHY / TRUST */}
      <section className="border-y border-line bg-bg-soft py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow className="mb-2">Why Enhancely</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink text-balance">Medical coding moves fast. Your tools should keep up.</h2>
            <p className="mt-4 leading-relaxed text-ink-2">
              Most coding tools run on static databases updated quarterly. Enhancely connects directly to the NLM Clinical Tables API, so every lookup reflects the current code set — no downloads, no delays.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { i: ShieldIcon, t: 'Zero PHI', d: 'We never request, transmit, or store protected health information.' },
                { i: SearchIcon, t: 'Live NLM data', d: 'Validated against the latest 2026 ICD-10-CM schema in real time.' },
                { i: ChartIcon, t: 'Revenue impact', d: 'Correct coding directly increases collections and cuts rework.' },
                { i: BookIcon, t: 'ICD-11 ready', d: 'Built so your team isn’t caught off guard by the next transition.' },
              ].map(({ i: I, t, d }) => (
                <div key={t} className="rounded-xl border border-line bg-white p-4">
                  <I className="h-5 w-5 text-brand" />
                  <p className="mt-3 font-semibold text-ink">{t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{d}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="audit-form" className="scroll-mt-24 rounded-2xl border border-line bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            <Eyebrow className="mb-2">For clinics</Eyebrow>
            <h2 className="text-xl font-semibold text-ink">Get a free 48-hour revenue audit</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">From real-time code validation to full denial management, we handle the complexity so you can focus on care.</p>
            <ul className="my-5 grid gap-2 text-sm text-ink-2 sm:grid-cols-2">
              {SERVICES.map((s) => <CheckItem key={s}>{s}</CheckItem>)}
            </ul>
            <AuditForm source="Home Page" compact />
          </div>
        </Container>
      </section>

      {/* GUIDE + BLOG */}
      <section className="py-20">
        <Container>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <SectionHeading eyebrow="Learn" title="Guides & insights for billing professionals" />
            <ButtonLink href="/blog" variant="secondary" className="mb-8 sm:mt-6">All articles</ButtonLink>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            <Link href="/billing-specialist-guide" className="group flex flex-col justify-between rounded-2xl bg-navy p-7 text-white lg:row-span-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-300">Career guide</p>
                <h3 className="mt-3 text-2xl font-bold leading-tight">The ultimate guide to becoming a billing specialist</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">Salary benchmarks by state, CPC vs. CCS certification, and resume strategies for 2026 RCM roles.</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-white">Read the guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
            </Link>
            {POSTS.map((p) => (
              <Link key={p.slug} href={p.slug} className="group rounded-2xl border border-line bg-white p-6 transition-colors hover:border-brand/40">
                <p className="text-xs text-ink-3"><span className="font-semibold text-brand-ink">{p.category}</span> · {formatDate(p.date)}</p>
                <h3 className="mt-2 font-semibold leading-snug text-ink group-hover:text-brand-ink">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-ink-2">{p.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
