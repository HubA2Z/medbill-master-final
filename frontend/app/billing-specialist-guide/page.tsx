import Link from 'next/link';
import GuideNav, { NextChapter } from '@/components/GuideNav';
import { Container, PageHero, CheckItem, ButtonLink, CtaBand, JsonLd } from '@/components/ui';
import { ArrowRight } from '@/components/icons';
import { pageMeta, SITE } from '@/lib/site';

const PATH = '/billing-specialist-guide';

export const metadata = pageMeta({
  title: 'Billing Specialist Guide 2026: Job, Salary & Certification',
  description:
    'Everything about becoming a medical billing specialist in 2026: responsibilities, average salary ($48k–$72k), job growth, top certifications (CPC), and the tools of the trade.',
  path: PATH,
});

const SPOKES = [
  { t: 'Salary guide', d: 'Pay by state, experience, and remote vs. on-site roles.', href: '/billing-specialist-guide/salary' },
  { t: 'Certifications', d: 'Comparing CPC vs. CCS vs. CPB for career growth.', href: '/billing-specialist-guide/certification' },
  { t: 'Resume & skills', d: 'Resume power-phrases and the 2026 RCM skill stack.', href: '/billing-specialist-guide/resume-tips' },
];

export default function Page() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: 'The Ultimate Guide to Becoming a Billing Specialist', url: `${SITE.url}${PATH}`, publisher: { '@type': 'Organization', name: SITE.name } }} />
      <PageHero
        crumbs={[{ name: 'Career Guide', href: PATH }]}
        eyebrow="Career guide · 2026"
        title={<>The ultimate guide to becoming a <span className="text-brand">billing specialist</span></>}
        subtitle="Everything you need to know about the 2026 medical billing landscape — from salary benchmarks and certifications to the daily tools of the trade."
      />
      <GuideNav current={PATH} />

      <section className="py-14">
        <Container size="md">
          <div className="grid gap-4 rounded-2xl bg-navy p-6 text-white sm:grid-cols-3 sm:p-8">
            {[
              { l: 'Average salary', v: '$48,000 – $72,000' },
              { l: 'Job growth', v: '+9.2% (steady)' },
              { l: 'Top certification', v: 'CPC (AAPC)' },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-teal-400 pl-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-300">{s.l}</p>
                <p className="mt-1 text-xl font-bold">{s.v}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-bold tracking-tight text-ink">Explore key topics</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {SPOKES.map((s) => (
              <Link key={s.href} href={s.href} className="group rounded-2xl border border-line p-5 transition-colors hover:border-brand/40">
                <h3 className="flex items-center justify-between font-semibold text-ink group-hover:text-brand-ink">{s.t} <ArrowRight className="h-4 w-4" /></h3>
                <p className="mt-2 text-sm text-ink-2">{s.d}</p>
              </Link>
            ))}
          </div>

          <article className="prose-clinical mt-14">
            <h2>What is a billing specialist?</h2>
            <p>A <strong>medical billing specialist</strong> ensures healthcare providers are reimbursed for their services. In 2026, the role has evolved beyond data entry into a data-driven revenue cycle management (RCM) position that requires mastery of insurance policies, NCCI edits, and clinical documentation.</p>
            <h3>Core responsibilities</h3>
          </article>
          <ul className="mt-4 space-y-3 text-ink-2">
            <CheckItem><strong className="text-ink">Claim submission:</strong> translating clinical notes into standardized CPT and ICD-10 codes.</CheckItem>
            <CheckItem><strong className="text-ink">Insurance follow-up:</strong> communicating with payers to resolve unpaid or underpaid claims.</CheckItem>
            <CheckItem><strong className="text-ink">Denial management:</strong> identifying root causes of claim rejections and filing appeals.</CheckItem>
          </ul>

          <div className="mt-12 flex flex-col gap-5 rounded-2xl border border-line bg-bg-tint p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-ink">Ready to work faster?</p>
              <p className="mt-1 text-sm text-ink-2">Use our free Call Note Builder to standardize your insurance follow-ups.</p>
            </div>
            <ButtonLink href="/call-note-builder">Open tool</ButtonLink>
          </div>

          <NextChapter current={PATH} />
        </Container>
      </section>

      <CtaBand title="Work smarter with professional tools." body="Free ICD-10 search and call notes for billers — plus full-service RCM support for practices." primary={{ label: 'Explore tools', href: '/tools' }} secondary={{ label: 'Free practice audit', href: '/audit' }} />
    </>
  );
}
