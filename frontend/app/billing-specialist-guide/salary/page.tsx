import Link from 'next/link';
import GuideNav, { NextChapter } from '@/components/GuideNav';
import { Container, PageHero, Badge, Callout, CtaBand } from '@/components/ui';
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

          <div className="mt-6">
            <Callout title="About these figures">
              All salary figures on this page are estimates. Actual pay varies widely by state and city, years of experience, credentials, specialty, and employer type. For current, official data, see the U.S. Bureau of Labor Statistics <strong>Occupational Outlook Handbook</strong> entry for <strong>Medical Records Specialists</strong>, which covers medical coders and billing-related roles, and compare it with local job postings in your area.
            </Callout>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-bg-soft p-6">
              <h3 className="text-lg font-semibold text-ink">Remote / WFH</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">Remote billing roles are now common, especially at RCM companies and multi-location groups. Base pay can run slightly lower than on-site roles, but savings on commuting, parking, and work clothing often narrow the gap.</p>
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
            <p>The <strong>AAPC CPC</strong> (Certified Professional Coder) remains the “gold standard,” and adding a <strong>CPB</strong> (Certified Professional Biller) shows billing-specific expertise that employers often reward with higher offers. Compare options in our <Link href="/billing-specialist-guide/certification">certification guide</Link>.</p>
            <h3>2. Master specialized coding</h3>
            <p>Surgical billing and cardiology typically pay significantly more than general practice or pediatrics due to the complexity of the 2026 NCCI edits.</p>
            <h3>3. Leverage professional tech</h3>
            <p>Specialists who use tools like our <Link href="/icd10-intelligence">ICD-10 code search</Link> and <Link href="/call-note-builder">call note builder</Link> process more claims per day — making them invaluable to practice managers.</p>

            <h2>What drives billing and coding pay</h2>
            <p>Two people with the same job title can earn very different amounts. These are the factors that make the biggest difference in practice:</p>
            <h3>Credentials</h3>
            <p>A recognized credential such as the CPC, CPB, CCS, or CCA tells an employer you’ve passed an independent exam. Many coding jobs list a credential as a requirement, not a preference, so it can decide whether you qualify for the role at all. Removing the CPC-A apprentice designation is another common point where pay conversations open up.</p>
            <h3>Specialty</h3>
            <p>Complex specialties such as surgery, orthopedics, cardiology, oncology, anesthesia, and interventional radiology involve more modifiers, bundling rules, and prior authorizations. Experience in these areas is harder to find, and employers tend to pay for it. Primary care and pediatrics are excellent training grounds but usually sit at the lower end of the range.</p>
            <h3>Role type: coding, billing, or A/R follow-up</h3>
            <p>Coding roles that require reading operative notes or inpatient records generally pay more than entry-level billing roles. Within billing, A/R follow-up specialists who can work aged claims, handle complex denials, and write effective appeals tend to earn more than charge entry or payment posting staff. Roles that combine billing with analysis, such as denial trending or payer contract reviews, often pay more again.</p>
            <h3>Remote vs. on-site</h3>
            <p>Remote roles widen the pool of applicants, which can keep pay competitive. On-site hospital roles sometimes pay more because they involve facility billing, team coordination, or supervisory duties. Some remote employers also set pay by the cost of living where you live.</p>
            <h3>System experience</h3>
            <p>Hands-on experience with widely used EHR and PM systems such as <strong>Epic</strong>, <strong>eClinicalWorks</strong>, <strong>athenahealth</strong>, and <strong>Tebra</strong> shortens your training time, and employers notice that. Epic experience is especially valued by hospitals and large health systems. Clearinghouse and portal experience (Availity, Office Ally, Waystar) matters too.</p>
            <h3>Experience and track record</h3>
            <p>Years in the field matter, but so does what you can show: the payers you know well, the denial types you’ve resolved, and the A/R you’ve owned. A biller who can explain how they cleaned up a 90+ day bucket is in a stronger position than one who can only list job titles.</p>

            <h2>How to negotiate your salary</h2>
            <ul>
              <li><strong>Research the local range first.</strong> Check the BLS data for your state or metro area and compare it with current job postings for similar roles.</li>
              <li><strong>Bring specifics.</strong> Describe the payers, specialties, and systems you know, and the volume of work you handle. Concrete examples carry more weight than general claims.</li>
              <li><strong>Let them name a number first when you can.</strong> If you must give one, offer a range based on your research rather than a single figure.</li>
              <li><strong>Look at the whole offer.</strong> Paid CEUs, certification exam reimbursement, AAPC or AHIMA membership dues, remote equipment, schedule flexibility, and productivity bonuses all have real value.</li>
              <li><strong>Ask about the review cycle.</strong> Find out when raises are considered and what goals would support a raise, then get them in writing if possible.</li>
            </ul>

            <h2>Common career paths</h2>
            <p>Billing and coding offer more growth than many people expect. Two common ladders:</p>
            <ul>
              <li><strong>Billing track:</strong> charge entry or payment posting → A/R follow-up specialist → senior biller or denial specialist → billing supervisor → billing or revenue cycle manager.</li>
              <li><strong>Coding track:</strong> coder (often with CPC-A) → certified coder → specialty or senior coder → coding auditor (for example, with a CPMA) or clinical documentation integrity (CDI) specialist.</li>
            </ul>
            <p>Other paths include credentialing, payer contracting, compliance, practice management, and training or education roles. Moving between tracks is common; denial work gives billers strong coding instincts, and coders who understand the payment side are easier to promote.</p>

            <h2>Frequently asked questions</h2>
            <h3>Do certified billers earn more than non-certified billers?</h3>
            <p>Often, yes, although it depends on the employer and the role. A credential can qualify you for jobs that list certification as a requirement, which tends to open up higher-paying positions.</p>
            <h3>Do remote billing jobs pay less?</h3>
            <p>Sometimes, but not always. Pay depends on the employer, the role, and whether pay is adjusted for your location. Compare the full offer, including the costs you save by working from home.</p>
            <h3>What is the fastest way to increase my pay?</h3>
            <p>Earning a recognized credential, building experience in a complex specialty, and learning a widely used system such as Epic are three of the most reliable levers. Taking ownership of difficult A/R and denials also builds a track record you can point to in reviews.</p>
            <h3>Where can I find official salary data?</h3>
            <p>The U.S. Bureau of Labor Statistics publishes national and state wage data in its Occupational Outlook Handbook under “Medical Records Specialists.” Professional associations such as AAPC and AHIMA also publish salary information for their members.</p>
          </article>

          <NextChapter current={PATH} />
        </Container>
      </section>

      <CtaBand title="Become a top earner." body="Elite billing specialists don’t work harder — they work smarter with professional tools." primary={{ label: 'Get started with free tools', href: '/tools' }} secondary={null} />
    </>
  );
}
