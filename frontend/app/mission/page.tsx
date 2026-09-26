import { Container, PageHero, CtaBand, Eyebrow } from '@/components/ui';
import { TargetIcon, RefreshIcon, SparkIcon } from '@/components/icons';
import { pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Our Mission — Precision Is Non-Negotiable',
  description:
    'Why Enhancely exists: eliminating coding friction, advocating for accurate representation of patient care, and keeping practices ahead of ICD-11 and AI-driven denials.',
  path: '/mission',
});

const PILLARS = [
  { icon: SparkIcon, t: 'Eliminating friction', d: 'Administrative burden is a leading cause of physician burnout. Our mission starts by removing the “search fatigue” of legacy coding software — answers in milliseconds, not minutes.' },
  { icon: TargetIcon, t: 'Coding advocacy', d: 'We don’t just provide codes; we advocate for the most accurate representation of patient care. Correct coding ensures clinics are reimbursed fairly for the complex work they do every day.' },
  { icon: RefreshIcon, t: 'Future-proofing', d: 'As the industry moves toward ICD-11 and AI-driven denials, our mission is to keep partners ahead of the curve — bridging government data and private-practice implementation.' },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'About', href: '/about' }, { name: 'Mission', href: '/mission' }]}
        eyebrow="Our mission"
        title={<>Precision is <span className="text-brand">non-negotiable.</span></>}
        subtitle="In an era of shifting regulations and complex diagnostics, Enhancely is the anchor for clinical financial integrity."
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {PILLARS.map(({ icon: I, t, d }) => (
              <div key={t} className="rounded-2xl border border-line p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand-ink"><I className="h-5 w-5" /></span>
                <h2 className="mt-5 text-lg font-semibold text-ink">{t}</h2>
                <p className="mt-2 leading-relaxed text-ink-2">{d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-bg-soft py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow className="mb-2">The live NLM standard</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">Frozen databases are a liability.</h2>
            <p className="mt-4 leading-relaxed text-ink-2">Most coding tools operate on static databases that are updated quarterly. Enhancely’s core engine syncs directly with the National Library of Medicine — when a code is updated at the federal level, it’s reflected on our platform. No downloads. No delays.</p>
          </div>
          <figure className="rounded-2xl bg-navy p-8 text-white">
            <blockquote className="text-lg leading-relaxed text-slate-200">
              “We didn’t build Enhancely to be another search bar. We built it to be the central nervous system of your billing department. When your codes are right, your revenue is stable, and your focus returns to the patient.”
            </blockquote>
            <figcaption className="mt-5 text-sm font-semibold text-teal-300">— The founders, Enhancely</figcaption>
          </figure>
        </Container>
      </section>

      <CtaBand
        title="Become a billing partner"
        body="Beyond our search technology, we offer full revenue cycle management — we handle the claims, manage the denials, and help scale your practice’s profitability."
        primary={{ label: 'Apply for partnership', href: '/audit' }}
        secondary={{ label: 'About us', href: '/about' }}
      />
    </>
  );
}
