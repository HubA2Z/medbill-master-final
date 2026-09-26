import ClaimScrubber from '@/components/ClaimScrubber';
import { Container, PageHero, SectionHeading, CtaBand, JsonLd } from '@/components/ui';
import { pageMeta, SITE } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Free Claim Scrubber: NCCI Edit, MUE & Modifier Checker',
  description:
    'Check CPT/HCPCS codes, modifiers, units, and ICD-10 diagnoses before you submit. Flags NCCI procedure-pair edits, MUE unit limits, modifier errors (25, 59, XS, RT/LT), and invalid diagnoses. Free.',
  path: '/claim-scrubber',
});

const CHECKS = [
  { t: 'NCCI procedure pairs', d: 'Flags codes that CMS bundles together, and tells you whether modifier 59, XE/XS/XP/XU, 25 or a laterality modifier can separate them.' },
  { t: 'MUE unit limits', d: 'Compares billed units with CMS Medically Unlikely Edits — per line or per day, depending on the code.' },
  { t: 'Modifier logic', d: 'Catches 25 on non-E/M codes, 26 + TC together, 59 with X modifiers, 50 with RT/LT, and E/M billed with a procedure without 25.' },
  { t: 'Diagnosis checks', d: 'Verifies each ICD-10-CM code is billable, pointers are valid, external-cause codes aren’t first, and RT/LT matches the diagnosis side.' },
];

const FAQ = [
  { q: 'Which payers do these edits apply to?', a: 'The procedure-pair and unit checks use the CMS NCCI practitioner edits for Medicare. Many commercial payers and Medicaid programs follow NCCI closely, but always confirm payer-specific policies.' },
  { q: 'How current is the NCCI data?', a: 'CMS publishes new NCCI files every quarter. Enhancely loads them automatically, and each result shows which quarter was used.' },
  { q: 'Does it check whether a diagnosis supports the procedure?', a: 'Not yet. Medical-necessity coverage (LCDs and NCDs) varies by Medicare contractor and is the next feature we’re adding.' },
  { q: 'Is it safe to use with patient claims?', a: 'Enter only codes, modifiers, units, and dates — no names, member IDs, or other patient information. Nothing you enter is stored.' },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Enhancely Claim Scrubber', url: `${SITE.url}/claim-scrubber`, applicationCategory: 'HealthApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
          { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
        ]}
      />
      <PageHero
        crumbs={[{ name: 'Tools', href: '/tools' }, { name: 'Claim Scrubber', href: '/claim-scrubber' }]}
        eyebrow="Free tool · CMS NCCI edits"
        title="Claim scrubber"
        subtitle="Check CPT codes, modifiers, units, and diagnoses together before you submit — and see exactly which edit would trigger a denial and how to fix it."
      />

      <section className="py-10 sm:py-12">
        <Container size="md">
          <ClaimScrubber />
          <p className="mt-6 text-xs leading-relaxed text-ink-3">
            Reference tool only. Results are based on CMS NCCI edits and general coding rules and don’t guarantee payment. Verify payer policies and documentation. CPT® is a registered trademark of the American Medical Association; no CPT descriptions are shown.
          </p>
        </Container>
      </section>

      <section className="border-t border-line bg-bg-soft py-16">
        <Container>
          <SectionHeading eyebrow="What it checks" title="Four layers of pre-submission edits" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CHECKS.map((c) => (
              <div key={c.t} className="rounded-2xl border border-line bg-white p-6">
                <h3 className="font-semibold text-ink">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 max-w-3xl">
            <SectionHeading eyebrow="FAQ" title="About the claim scrubber" />
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
        </Container>
      </section>

      <CtaBand title="Let us scrub every claim for you." body="Our certified billing team catches edits before submission and works the denials that slip through. Start with a free 48-hour audit." />
    </>
  );
}
