import IcdSearch from '@/components/IcdSearch';
import { Container, JsonLd, PageHero, SectionHeading, CtaBand } from '@/components/ui';
import { pageMeta, SITE } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Free ICD-10-CM Code Search & Lookup (2026)',
  description:
    'Search 70,000+ ICD-10-CM diagnosis codes in real time from the National Library of Medicine. Autocomplete, lay-term synonyms, one-click copy, and CSV export — free for billers and coders.',
  path: '/icd10-intelligence',
});

const FAQ = [
  {
    q: 'Where does the ICD-10 code data come from?',
    a: 'Every search is sent live to the National Library of Medicine (NLM) Clinical Tables API for ICD-10-CM, so results reflect the current published code set rather than a stale export.',
  },
  {
    q: 'Can I search with everyday terms instead of clinical language?',
    a: 'Yes. Common lay terms such as “sugar”, “high blood pressure”, “bp”, “sob”, “pink eye”, or “kidney stones” are mapped to their clinical equivalents before searching.',
  },
  {
    q: 'Is it safe to type patient details into the search?',
    a: 'Search by condition, symptom, or code only. Never enter patient names, dates of birth, member IDs, or other PHI. Enhancely does not need or store patient information.',
  },
  {
    q: 'Is the code list saved anywhere?',
    a: 'Your code list and recent searches are stored only in your own browser so you can pick up where you left off. They are never sent to our servers.',
  },
  {
    q: 'Can I rely on these results for final claim coding?',
    a: 'Enhancely is a reference tool. Always confirm the final code — including specificity, laterality, and payer policy — against official guidelines or with a certified coder.',
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Enhancely ICD-10-CM Code Search',
            url: `${SITE.url}/icd10-intelligence`,
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
          },
        ]}
      />
      <PageHero
        crumbs={[{ name: 'Tools', href: '/tools' }, { name: 'ICD-10 Search', href: '/icd10-intelligence' }]}
        eyebrow="Live NLM data · 70,000+ codes"
        title="ICD-10-CM code search"
        subtitle="Look up diagnosis codes by condition, symptom, or code. Build a code list for a claim and copy it in one click."
      />

      <section className="py-10 sm:py-12">
        <Container>
          <IcdSearch />
        </Container>
      </section>

      <section className="border-t border-line bg-bg-soft py-16">
        <Container size="md">
          <SectionHeading eyebrow="FAQ" title="Using the ICD-10 lookup" />
          <div className="divide-y divide-line rounded-2xl border border-line bg-white">
            {FAQ.map((f) => (
              <details key={f.q} className="group p-5 sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                  {f.q}
                  <span className="text-xl leading-none text-brand transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
