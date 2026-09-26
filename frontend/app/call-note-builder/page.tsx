import CallNoteBuilder from '@/components/CallNoteBuilder';
import { Container, PageHero, SectionHeading, CtaBand, JsonLd } from '@/components/ui';
import { pageMeta, SITE } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Medical Billing Call Note Builder — Free RCM Tool',
  description:
    'Generate standardized insurance follow-up call notes in seconds. Log paid, denied, in-process, and not-on-file claims, then copy one clean note into your PM system. Free, no sign-up.',
  path: '/call-note-builder',
});

const STEPS = [
  { t: 'Enter the call details', d: 'Payer, phone, rep name, and call reference number go in the header of every note.' },
  { t: 'Log each claim', d: 'Pick a status — paid, denied, in process, or not on file — and fill in only the fields that status needs.' },
  { t: 'Copy one clean note', d: 'All claims from the call combine into one consistent, audit-ready note you can paste into any EHR or PM system.' },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Enhancely Call Note Builder',
          url: `${SITE.url}/call-note-builder`,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }}
      />
      <PageHero
        crumbs={[{ name: 'Tools', href: '/tools' }, { name: 'Call Note Builder', href: '/call-note-builder' }]}
        eyebrow="Free workflow tool"
        title="Insurance call note builder"
        subtitle="Standardize every payer follow-up. Consistent notes mean cleaner audit trails, faster handoffs, and fewer repeat calls."
      />

      <section className="py-10 sm:py-12 bg-white">
        <Container>
          <CallNoteBuilder />
        </Container>
      </section>

      <section className="border-t border-line bg-bg-soft py-16">
        <Container>
          <SectionHeading eyebrow="How it works" title="From phone call to documented follow-up in under a minute" />
          <ol className="grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.t} className="rounded-2xl border border-line bg-white p-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-soft text-sm font-bold text-brand-ink">{i + 1}</span>
                <h3 className="mt-4 font-semibold text-ink">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand
        title="Too many claims to chase by phone?"
        body="Our certified billing team handles payer follow-up, denials, and appeals end to end. Start with a free 48-hour audit."
      />
    </>
  );
}
