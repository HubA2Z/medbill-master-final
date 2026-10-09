import Link from 'next/link';
import EmAudit from '@/components/EmAudit';
import { Container, PageHero, SectionHeading, CtaBand, JsonLd } from '@/components/ui';
import { ToolPageGuard } from '@/components/AdsterraExtras';
import { pageMeta, SITE } from '@/lib/site';
import AdSlot from '@/components/AdSlot';

export const metadata = pageMeta({
  title: 'E/M Audit Tool 2026: Free MDM & Time Calculator (99202–99215)',
  description:
    'Free E/M audit tool for 2026. Score MDM (problems, data, risk) or total time, check the billed level for 99202–99215, and catch G2211, modifier 25, and prolonged service (99417/G2212) errors.',
  path: '/em-audit-tool',
});

const HOW = [
  { t: 'Score MDM', d: 'Pick the highest level documented for problems and risk, and count data items. The tool applies the 2-of-3 rule automatically.' },
  { t: 'Or use time', d: 'Enter total practitioner time on the date of service. The higher of MDM or time sets the supported level.' },
  { t: 'Compare to billed', d: 'See whether the billed code is supported, overcoded, or undercoded — and exactly which element is missing.' },
  { t: 'Check add-ons', d: 'Flags G2211 with modifier 25, Medicare G2212 vs. CPT 99417 timing, and new vs. established patient errors.' },
];

const FAQ = [
  { q: 'Which E/M codes does the tool cover?', a: 'Office and other outpatient visits: 99202–99205 for new patients and 99211–99215 for established patients. 99211 is shown for reference because it is not scored by MDM or time.' },
  { q: 'How is the MDM level calculated?', a: 'MDM has three elements: problems addressed, data reviewed and analyzed, and risk of patient management. The visit level is the highest level met or exceeded by at least two of the three.' },
  { q: 'What are the 2026 time thresholds for office visits?', a: 'New patients: 99202 15 minutes, 99203 30, 99204 45, 99205 60. Established patients: 99212 10 minutes, 99213 20, 99214 30, 99215 40. Time is total practitioner time on the date of the encounter.' },
  { q: 'When do I bill 99417 vs. G2212?', a: 'Both are prolonged-service add-ons for 99205 and 99215 billed by time. CPT payers use 99417 starting at 75 minutes (new) or 55 minutes (established). Medicare uses G2212 starting at 89 minutes (new) or 69 minutes (established). Each additional full 15 minutes adds a unit.' },
  { q: 'Can G2211 be billed with modifier 25?', a: 'For Medicare, generally no. The exception is when the other same-day service is an annual wellness visit, vaccine administration, or a Medicare Part B preventive service.' },
  { q: 'Is it safe to use with real encounters?', a: 'Yes. The tool runs entirely in your browser and stores nothing. Don’t enter patient names or identifiers — none are needed.' },
];

export default function Page() {
  return (
    <>
      <ToolPageGuard />
      <JsonLd
        data={[
          { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Enhancely E/M Audit Tool 2026', url: `${SITE.url}/em-audit-tool`, applicationCategory: 'HealthApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
          { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
        ]}
      />
      <PageHero
        crumbs={[{ name: 'Tools', href: '/tools' }, { name: 'E/M Audit Tool', href: '/em-audit-tool' }]}
        eyebrow="Free tool · 2026 E/M guidelines"
        title="E/M audit tool 2026"
        subtitle="Score an office visit by MDM or time, check it against the billed code, and catch add-on and modifier errors before the payer does."
      />

      <section className="py-10 sm:py-12">
        <Container>
          <EmAudit />
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-ink-3">
            Reference tool only, based on the office/outpatient E/M guidelines in effect for 2026 and CMS Medicare rules. It doesn’t replace a certified coder’s review or payer policy. CPT® is a registered trademark of the American Medical Association. For the full rules, read our <Link href="/blog/em-coding-2026" className="font-semibold text-brand-ink hover:underline">E/M coding guidelines 2026</Link>.
          </p>
        </Container>
      </section>

      <section className="border-t border-line bg-bg-soft py-16">
        <Container>
          <SectionHeading eyebrow="How it works" title="Audit an E/M visit in under a minute" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HOW.map((c) => (
              <div key={c.t} className="rounded-2xl border border-line bg-white p-6">
                <h3 className="font-semibold text-ink">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 max-w-3xl">
            <SectionHeading eyebrow="FAQ" title="About the E/M audit tool" />
            <div className="divide-y divide-line rounded-2xl border border-line bg-white">
              {FAQ.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                    {f.q}<span className="text-xl leading-none text-brand transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-ink-2">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          <AdSlot unit="banner300x250" className="mt-14" />
        </Container>
      </section>

      <CtaBand title="Want every E/M visit audited?" body="Our certified coders review your E/M levels for under- and overcoding and show you the revenue impact. Start with a free 48-hour audit." />
    </>
  );
}
