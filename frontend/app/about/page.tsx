import { Container, PageHero, SectionHeading, CheckItem, CtaBand, ButtonLink, Eyebrow } from '@/components/ui';
import { TargetIcon, LockIcon, ChartIcon, SparkIcon } from '@/components/icons';
import { pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'About Us — Precision Coding & Revenue Intelligence',
  description:
    'Enhancely syncs with live NLM regulatory data to eliminate coding errors, accelerate reimbursements, and protect practice revenue. Learn how we work and what we stand for.',
  path: '/about',
});

const VALUES = [
  { icon: TargetIcon, t: 'Accuracy first', d: 'Every code lookup is verified against the live NLM Clinical Tables API — not a stale monthly export.' },
  { icon: LockIcon, t: 'Zero PHI', d: 'We never request, transmit, or store Protected Health Information. Our platform is a B2B reference tool.' },
  { icon: ChartIcon, t: 'Revenue impact', d: 'Correct coding directly increases collections. We exist to close the gap between documentation and payment.' },
  { icon: SparkIcon, t: 'ICD-11 ready', d: 'Our architecture is already being prepared for the ICD-11 transition — so your team won’t be caught off guard.' },
];

const STATS = [
  { v: '70,000+', l: 'ICD-10 codes' },
  { v: '500+', l: 'Clinics served' },
  { v: '98.7%', l: 'Coding accuracy' },
  { v: '48 hrs', l: 'Avg. audit turnaround' },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'About', href: '/about' }]}
        eyebrow="About Enhancely · Est. 2026"
        title={<>Precision that pays. <span className="text-brand">Every time.</span></>}
        subtitle="Enhancely synchronizes with live regulatory data to eliminate coding errors, accelerate reimbursements, and protect your revenue in an evolving healthcare landscape."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/audit" size="lg">Start free audit</ButtonLink>
          <ButtonLink href="/mission" variant="secondary" size="lg">Read our mission</ButtonLink>
        </div>
      </PageHero>

      <section className="border-b border-line">
        <Container className="grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-3xl font-bold tracking-tight text-ink">{s.v}</p>
              <p className="mt-1 text-sm text-ink-3">{s.l}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="space-y-14">
            <div>
              <Eyebrow className="mb-2">Our mission</Eyebrow>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">Medical coding is now a data science.</h2>
              <div className="prose-clinical mt-4">
                <p>The pace of regulatory change in healthcare demands more than static databases. We built Enhancely to move at the speed of the NLM — delivering real-time accuracy that protects both patient care and practice revenue.</p>
                <p>Every claim tells a story. We make sure it gets paid correctly.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-bg-soft p-7">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ok"><span className="h-2 w-2 rounded-full bg-ok" /> Live integration</p>
              <h3 className="mt-3 text-xl font-semibold text-ink">Always synced with the National Library of Medicine</h3>
              <p className="mt-2 leading-relaxed text-ink-2">Direct, low-latency connection to the <strong className="text-ink">NLM Clinical Tables API</strong>. No outdated exports. Every lookup is validated against the latest 2026 schemas in real time.</p>
            </div>

            <div>
              <SectionHeading eyebrow="Principles" title="Built different" />
              <div className="grid gap-5 sm:grid-cols-2">
                {VALUES.map(({ icon: I, t, d }) => (
                  <div key={t} className="rounded-2xl border border-line p-6">
                    <I className="h-6 w-6 text-brand" />
                    <h3 className="mt-4 font-semibold text-ink">{t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-navy p-7 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-300">For clinics</p>
              <h3 className="mt-3 text-2xl font-bold leading-tight">Your revenue deserves better than guesswork.</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">From real-time code validation to full denial management — we handle the complexity so you can focus on care.</p>
              <ul className="mt-5 space-y-2.5 text-sm text-slate-200">
                {['Full revenue cycle management', 'Denial appeals & recovery', 'Rapid 48-hour audits', 'E/M optimization', 'ICD-11 transition support'].map((x) => <CheckItem key={x}>{x}</CheckItem>)}
              </ul>
              <ButtonLink href="/audit" variant="white" className="mt-6 w-full">Become a partner →</ButtonLink>
            </div>
            <div className="rounded-2xl border border-line p-6">
              <p className="font-semibold text-ink">HIPAA-aligned, zero-PHI by design</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">We are a pure B2B reference and revenue operations platform. All communications are encrypted in transit.</p>
            </div>
          </aside>
        </Container>
      </section>

      <CtaBand title="Stop leaving money on the table." body="Get a complimentary 48-hour revenue integrity audit from our senior coding team. No obligation." />
    </>
  );
}
