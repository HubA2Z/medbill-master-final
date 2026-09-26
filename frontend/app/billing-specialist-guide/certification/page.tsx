import GuideNav, { NextChapter } from '@/components/GuideNav';
import { Container, PageHero, Callout, CtaBand } from '@/components/ui';
import { pageMeta } from '@/lib/site';

const PATH = '/billing-specialist-guide/certification';

export const metadata = pageMeta({
  title: 'CPC vs. CCS: AAPC vs. AHIMA Certification Guide 2026',
  description:
    'CPC vs. CCS compared: settings, difficulty, exam fees, and membership requirements for AAPC and AHIMA certifications — and which to choose for your career in 2026.',
  path: PATH,
});

const ROWS = [
  { f: 'Primary setting', a: 'Outpatient / clinics', h: 'Inpatient / hospitals' },
  { f: 'Flagship credential', a: 'CPC (Certified Professional Coder)', h: 'CCS (Certified Coding Specialist)' },
  { f: 'Difficulty', a: 'Moderate (entry-friendly)', h: 'High (advanced focus)' },
  { f: 'Exam fee (approx.)', a: '$399 – $490', h: '$299 (member) – $399' },
  { f: 'Membership required', a: 'Yes (~$180/year)', h: 'Optional (recommended)' },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Career Guide', href: '/billing-specialist-guide' }, { name: 'Certification', href: PATH }]}
        eyebrow="Career guide · Certification"
        title={<>AAPC vs. AHIMA: <span className="text-brand">2026 certification guide</span></>}
        subtitle="Which credential will unlock the highest salary for your career path? Requirements, costs, and industry standing compared."
      />
      <GuideNav current={PATH} />

      <section className="py-14">
        <Container size="md">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Side-by-side comparison</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
            <table className="table-clinical min-w-[560px]">
              <thead>
                <tr><th scope="col">Feature</th><th scope="col" className="!text-brand-ink">AAPC (CPC / CPB)</th><th scope="col">AHIMA (CCS / CCA)</th></tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.f}><th scope="row" className="!bg-white !normal-case !tracking-normal !text-sm !text-ink-3 font-medium">{r.f}</th><td className="!text-ink">{r.a}</td><td className="!text-ink">{r.h}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-line p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft font-bold text-brand-ink">A</span>
              <h3 className="mt-4 text-lg font-semibold text-ink">AAPC: the outpatient standard</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">If your goal is a <strong className="text-ink">physician’s office, multi-specialty clinic, or billing company</strong>, AAPC is the preferred choice. The <strong className="text-ink">CPC</strong> is considered the gold standard for outpatient coding.</p>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-ink-2 marker:text-brand">
                <li>Focuses on CPT, HCPCS, and ICD-10-CM</li>
                <li>Specialty credentials (e.g., cardiology, orthopedics)</li>
                <li>Large community and networking support</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-line p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg-soft font-bold text-ink">H</span>
              <h3 className="mt-4 text-lg font-semibold text-ink">AHIMA: the hospital authority</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">For <strong className="text-ink">large health systems or inpatient hospital roles</strong>, AHIMA is the heavyweight. The <strong className="text-ink">CCS</strong> proves you can handle complex hospital records and ICD-10-PCS.</p>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-ink-2 marker:text-brand">
                <li>Heavy emphasis on inpatient systems (DRGs)</li>
                <li>Preferred by large health networks</li>
                <li>Higher technical difficulty</li>
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <Callout tone="warn" title="2026 codebook alert">
              Starting May 1, 2026, AHIMA exams (CCS and CCS-P) require the <strong>2026 official codebook sets</strong>. Testing with outdated books can forfeit your exam fee — make sure your ICD-10-CM and ICD-10-PCS manuals are current before scheduling.
            </Callout>
          </div>

          <div className="mt-12 rounded-2xl bg-bg-soft p-7 text-center">
            <h2 className="text-xl font-bold text-ink">Which one should you choose?</h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-ink-2">Beginners should start with the <strong className="text-ink">AAPC CPC</strong>. Experienced coders aiming for higher-paying hospital roles should pursue the <strong className="text-ink">AHIMA CCS</strong>.</p>
          </div>

          <NextChapter current={PATH} />
        </Container>
      </section>

      <CtaBand title="Practice with real tools." body="Sharpen your code lookup speed with our free, live ICD-10-CM search." primary={{ label: 'Try ICD-10 search', href: '/icd10-intelligence' }} secondary={{ label: 'All tools', href: '/tools' }} />
    </>
  );
}
