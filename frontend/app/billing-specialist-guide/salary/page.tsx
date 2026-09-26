import Link from 'next/link';
import GuideNav, { NextChapter } from '@/components/GuideNav';
import { Container, PageHero, Badge, CtaBand } from '@/components/ui';
import { pageMeta } from '@/lib/site';

const PATH = '/billing-specialist-guide/salary';

export const metadata = pageMeta({
  title: 'Medical Billing Specialist Salary Guide 2026 (by State)',
  description:
    'Medical billing specialist salaries in 2026 by state, remote vs. in-office pay, and three proven ways to boost your earnings past $60,000.',
  path: PATH,
});

const STATES = [
  { state: 'California', avg: '$64,070', top: '$104,500+', demand: 'High' },
  { state: 'New Jersey', avg: '$58,400', top: '$81,000+', demand: 'Steady' },
  { state: 'Washington', avg: '$56,700', top: '$79,000+', demand: 'Moderate' },
  { state: 'Texas', avg: '$48,200', top: '$68,000+', demand: 'Very high' },
  { state: 'Florida', avg: '$46,900', top: '$65,000+', demand: 'High' },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Career Guide', href: '/billing-specialist-guide' }, { name: 'Salary', href: PATH }]}
        eyebrow="Career guide · Salary"
        title={<>Billing specialist <span className="text-brand">salary guide</span> (2026)</>}
        subtitle="A breakdown of earnings by state, experience level, and work environment."
      />
      <GuideNav current={PATH} />

      <section className="py-14">
        <Container size="md">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Highest-paying states for specialists</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
            <table className="table-clinical min-w-[560px]">
              <thead>
                <tr><th scope="col">State</th><th scope="col">Average salary</th><th scope="col">Top 10% earners</th><th scope="col">Job demand</th></tr>
              </thead>
              <tbody>
                {STATES.map((s) => (
                  <tr key={s.state}>
                    <td className="font-semibold !text-ink">{s.state}</td>
                    <td>{s.avg}</td>
                    <td className="font-semibold !text-brand-ink">{s.top}</td>
                    <td><Badge>{s.demand}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-bg-soft p-6">
              <h3 className="text-lg font-semibold text-ink">Remote / WFH</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">Remote billing roles have surged by 40% since 2024. Specialists working from home often see a slight base-pay reduction but save an average of $5,000/year on commuting costs.</p>
              <p className="mt-4 text-xl font-bold text-ink">$42k – $58k <span className="text-sm font-normal text-ink-3">average</span></p>
            </div>
            <div className="rounded-2xl bg-navy p-6 text-white">
              <h3 className="text-lg font-semibold">In-office / hospital</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">Hospital systems and large RCM firms often pay a premium for on-site specialists due to complex local facility rules and team management requirements.</p>
              <p className="mt-4 text-xl font-bold">$48k – $72k <span className="text-sm font-normal text-slate-400">average</span></p>
            </div>
          </div>

          <article className="prose-clinical mt-14">
            <h2>How to boost your billing salary</h2>
            <p>A high-school diploma alone is no longer enough for the top tier of RCM roles. If you want to break the $60,000 barrier, focus on these three levers:</p>
            <h3>1. Specialist certifications</h3>
            <p>The <strong>AAPC CPC</strong> (Certified Professional Coder) remains the “gold standard,” but adding a <strong>CPB</strong> (Certified Professional Biller) can increase base pay by 15–20%. Compare options in our <Link href="/billing-specialist-guide/certification">certification guide</Link>.</p>
            <h3>2. Master specialized coding</h3>
            <p>Surgical billing and cardiology typically pay significantly more than general practice or pediatrics due to the complexity of the 2026 NCCI edits.</p>
            <h3>3. Leverage professional tech</h3>
            <p>Specialists who use tools like our <Link href="/icd10-intelligence">ICD-10 code search</Link> and <Link href="/call-note-builder">call note builder</Link> process more claims per day — making them invaluable to practice managers.</p>
          </article>

          <NextChapter current={PATH} />
        </Container>
      </section>

      <CtaBand title="Become a top earner." body="Elite billing specialists don’t work harder — they work smarter with professional tools." primary={{ label: 'Get started with free tools', href: '/tools' }} secondary={null} />
    </>
  );
}
