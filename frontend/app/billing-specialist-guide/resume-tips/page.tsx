import Link from 'next/link';
import GuideNav, { NextChapter } from '@/components/GuideNav';
import ChecklistDownload from '@/components/ChecklistDownload';
import { Container, PageHero, CheckItem, ButtonLink, CtaBand } from '@/components/ui';
import { pageMeta } from '@/lib/site';

const PATH = '/billing-specialist-guide/resume-tips';

export const metadata = pageMeta({
  title: 'Medical Billing Resume Tips & 2026 Skills',
  description:
    'The 2026 medical billing skill stack and resume power-phrases that get interviews — denial analytics, eligibility logic, compliance — plus a free revenue leak checklist.',
  path: PATH,
});

const SKILLS = [
  { t: 'Advanced denial analytics', d: 'Don’t just fix denials — prevent them. Highlight root-cause analysis that identifies payer patterns and NCCI unbundling errors.' },
  { t: 'Eligibility & pre-auth logic', d: 'Showcase real-time eligibility verification experience that reduces “member not eligible” rejections — one of the biggest revenue killers in 2026.' },
  { t: 'Compliance & ethics', d: 'Put HIPAA, False Claims Act, and OIG guidelines front and center. Precision coding is a legal requirement, not a suggestion.' },
];

const PHRASES = [
  'Maintained a [X]% first-pass clean claim rate across [number] weekly submissions.',
  'Reduced Days in A/R from [X] to [Y] through prioritized payer follow-up.',
  'Managed appeals for surgical modifiers 51, 59, and XS, recovering $[amount] in denied revenue.',
];

const RESUME_SKILLS = [
  { t: 'Payer portals', d: 'Availity, UnitedHealthcare provider portal, Cigna for HCP, Medicare MAC portals, and plan-specific TPA portals.' },
  { t: 'Clearinghouses', d: 'Office Ally, Waystar, Availity, Trizetto — claim submission, rejection reports, and ERA retrieval.' },
  { t: 'EHR / PM systems', d: 'Epic, eClinicalWorks, athenahealth, Tebra, NextGen — name the modules you used, such as billing, reports, or eligibility.' },
  { t: 'Denial work', d: 'Reading CARC and RARC codes, root-cause tracking, corrected claims, and reconsiderations.' },
  { t: 'Code sets', d: 'ICD-10-CM, CPT, HCPCS Level II, and modifiers; NCCI edits and medical necessity checks.' },
  { t: 'Appeals', d: 'Writing appeal letters, gathering records, and tracking appeal levels and deadlines.' },
  { t: 'A/R follow-up', d: 'Working aging buckets, prioritizing by dollar value and timely filing, and documenting every touch.' },
  { t: 'Eligibility verification', d: 'Benefits checks, prior authorizations, referrals, and coordination of benefits.' },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Career Guide', href: '/billing-specialist-guide' }, { name: 'Resume & skills', href: PATH }]}
        eyebrow="Career guide · Resume & skills"
        title={<>The 2026 <span className="text-brand">biller’s edge</span>: skills & professional strategy</>}
        subtitle="Whether you’re crafting a standout resume or a provider looking for better RCM results, precision is the metric that matters."
      />
      <GuideNav current={PATH} />

      <section className="py-14">
        <Container className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-ink"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm text-white">01</span> The 2026 skill stack</h2>
            <p className="mt-4 border-l-4 border-brand-soft pl-4 italic text-ink-2">“In 2026, a resume that only mentions ‘data entry’ will be ignored. Modern RCM requires technical mastery.”</p>
            <div className="mt-6 space-y-4">
              {SKILLS.map((s) => (
                <div key={s.t} className="rounded-2xl border border-line p-5">
                  <h3 className="font-semibold text-ink">{s.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{s.d}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-14 flex items-center gap-3 text-2xl font-bold tracking-tight text-ink"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm text-white">02</span> Resume power-phrases</h2>
            <div className="mt-6 rounded-2xl bg-navy p-6 font-mono text-sm leading-relaxed text-slate-200">
              <p className="mb-3 text-xs uppercase tracking-wider text-teal-300">// Performance metrics</p>
              <ul className="space-y-3">
                {PHRASES.map((p) => <li key={p}>• “{p}”</li>)}
              </ul>
            </div>
            <p className="mt-3 text-sm text-ink-3">Replace every bracketed placeholder with your own real, verifiable numbers. If you don’t know a figure, leave that bullet out rather than guess.</p>

            <h2 className="mt-14 flex items-center gap-3 text-2xl font-bold tracking-tight text-ink"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm text-white">03</span> Skills to list on your resume</h2>
            <p className="mt-4 leading-relaxed text-ink-2">Hiring managers and applicant tracking systems look for specific tools and tasks, not general phrases like “detail-oriented.” Name the actual systems and work you know:</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {RESUME_SKILLS.map((s) => (
                <div key={s.t} className="rounded-2xl border border-line p-5">
                  <h3 className="font-semibold text-ink">{s.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{s.d}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-14 flex items-center gap-3 text-2xl font-bold tracking-tight text-ink"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm text-white">04</span> Quantify your work accurately</h2>
            <article className="prose-clinical mt-4">
              <p>Numbers make a resume believable, but only if they’re true and you can explain them in an interview. Good sources include productivity reports from your PM system, your team’s A/R aging reports, and your own work logs. Things you can usually measure:</p>
              <ul>
                <li>Claims or accounts worked per day: “Worked [number] accounts per day across [payer names].”</li>
                <li>A/R ownership: “Owned the [payer] 90+ day bucket, about $[amount] in outstanding claims.”</li>
                <li>Volume: “Submitted [number] professional claims per week through [clearinghouse].”</li>
                <li>Denials: “Resolved [number] denials per month, focused on [CO-16 / CO-197 / timely filing].”</li>
                <li>Scope: “Supported billing for [number] providers in [specialty] across [number] locations.”</li>
              </ul>
              <p>If you don’t have exact figures, describe scope instead: the payers, specialties, and claim types you handled. Never estimate a recovery amount or percentage you can’t support.</p>

              <h3>Sample professional summary</h3>
              <blockquote>Medical billing specialist with [number] years of experience in [specialty] billing and A/R follow-up. Skilled in [EHR/PM system], [clearinghouse], and payer portals including Availity and [payer portal]. Experienced in denial resolution using CARC/RARC codes, corrected claims, and written appeals. [Credential, e.g., CPB or CPC-A].</blockquote>

              <h3>Sample experience bullets</h3>
              <ul>
                <li>Worked an average of [number] A/R accounts per day for [payers], prioritizing by timely filing deadline and balance.</li>
                <li>Verified eligibility and benefits for [number] patients per day using [portal or PM tool], reducing front-end rejections.</li>
                <li>Prepared and submitted [number] appeals per month with supporting medical records and payer policy citations.</li>
                <li>Posted ERA and paper EOB payments in [system] and flagged underpayments against the fee schedule.</li>
                <li>Corrected and resubmitted clearinghouse rejections daily in [Office Ally / Waystar].</li>
              </ul>
            </article>

            <h2 className="mt-14 flex items-center gap-3 text-2xl font-bold tracking-tight text-ink"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm text-white">05</span> Common resume mistakes</h2>
            <article className="prose-clinical mt-4">
              <ul>
                <li><strong>Listing duties instead of results.</strong> “Responsible for follow-up” says less than “Worked [number] accounts per day for [payer].”</li>
                <li><strong>Leaving out system names.</strong> If you used eClinicalWorks or Epic, say so. Employers often filter for the system they use.</li>
                <li><strong>Inflated or unverifiable numbers.</strong> A reference check or a few interview questions can expose them quickly.</li>
                <li><strong>Including patient information.</strong> Never use real patient names, account numbers, or claim details in examples. That’s a HIPAA problem and a red flag for employers.</li>
                <li><strong>Unclear credential status.</strong> List your credential exactly as issued (for example, CPC-A) and include “in progress” with an expected date if you’re still studying.</li>
              </ul>
            </article>

            <h2 className="mt-14 flex items-center gap-3 text-2xl font-bold tracking-tight text-ink"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm text-white">06</span> ATS and cover letter tips</h2>
            <article className="prose-clinical mt-4">
              <h3>Getting past applicant tracking systems</h3>
              <ul>
                <li>Use a simple layout with standard headings: Summary, Skills, Experience, Certifications, Education.</li>
                <li>Avoid tables, text boxes, and graphics, which some systems can’t read.</li>
                <li>Mirror the job posting’s wording where it matches your experience, such as “A/R follow-up,” “denial management,” or “eligibility verification.”</li>
                <li>Write out acronyms once, for example “Accounts Receivable (A/R).”</li>
                <li>Save as .docx or PDF, whichever the posting requests.</li>
              </ul>
              <h3>Writing a short cover letter</h3>
              <p>Keep it to three short paragraphs. Name the role and why it fits you. Then give one or two concrete examples tied to the posting, such as the payers or system they mention. Close with your availability and a thank-you. Tailor each letter; a generic one is easy to spot.</p>
            </article>

            <h2 className="mt-14 flex items-center gap-3 text-2xl font-bold tracking-tight text-ink"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm text-white">07</span> Interview questions to prepare for</h2>
            <article className="prose-clinical mt-4">
              <ul>
                <li>“Walk me through how you work a denied claim from start to finish.”</li>
                <li>“What does CO-16 mean, and how would you resolve it?” (Review <Link href="/blog/claim-denial-codes-explained">common denial codes</Link> before the interview.)</li>
                <li>“How do you prioritize an A/R queue with hundreds of open claims?”</li>
                <li>“What information do you document after a payer call?” A tool like our <Link href="/call-note-builder">call note builder</Link> shows a clean structure.</li>
                <li>“Tell me about an appeal you wrote. What was the outcome?” Our <Link href="/blog/medical-claim-appeal-guide">appeal guide</Link> can help you frame your answer.</li>
                <li>“How do you check a claim for errors before submission?” Mention scrubbing edits and tools such as a <Link href="/claim-scrubber">claim scrubber</Link>.</li>
              </ul>
            </article>

            <h2 className="mt-14 flex items-center gap-3 text-2xl font-bold tracking-tight text-ink"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm text-white">08</span> Frequently asked questions</h2>
            <article className="prose-clinical mt-4">
              <h3>How long should a medical billing resume be?</h3>
              <p>One page is enough for most billers with under ten years of experience. Two pages are fine for senior or management roles if every line is relevant.</p>
              <h3>Should I list certifications I’m still working on?</h3>
              <p>Yes. List them as “in progress” with an expected completion date. Our <Link href="/billing-specialist-guide/certification">certification guide</Link> compares the options.</p>
              <h3>I have no billing experience. What do I put on my resume?</h3>
              <p>Highlight related work such as front desk, insurance verification, customer service, or data entry, plus your training, credential progress, and any coding or billing coursework.</p>
              <h3>Should I include salary expectations?</h3>
              <p>Not on the resume itself. If an application asks, give a researched range. See our <Link href="/billing-specialist-guide/salary">salary guide</Link> for what affects pay.</p>
            </article>

            <NextChapter current={PATH} />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-2xl border-2 border-brand p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">For providers</p>
              <h3 className="mt-2 text-xl font-semibold text-ink">Are you a provider?</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">Stop settling for “good enough” billing. Our proven billing experts treat your revenue as their own.</p>
              <ul className="mt-4 space-y-2 text-sm text-ink-2">
                <CheckItem>Claims scrubbed before submission</CheckItem>
                <CheckItem>Dedicated denial recovery team</CheckItem>
                <CheckItem>Full HIPAA & security compliance</CheckItem>
              </ul>
              <ButtonLink href="/audit" className="mt-5 w-full">Request free practice audit</ButtonLink>
            </div>

            <div className="rounded-2xl bg-navy p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-300">Free resource</p>
              <h3 className="mt-2 text-lg font-semibold">2026 Revenue Leak Checklist</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">Is your current process losing money? Audit your practice in 10 minutes.</p>
              <ol className="my-5 space-y-2 text-sm text-slate-200">
                <li className="flex items-center gap-3"><span className="flex h-5 w-5 items-center justify-center rounded bg-white/10 text-xs font-bold">1</span> Check Days in A/R trends</li>
                <li className="flex items-center gap-3"><span className="flex h-5 w-5 items-center justify-center rounded bg-white/10 text-xs font-bold">2</span> Identify unworked denials</li>
              </ol>
              <ChecklistDownload />
            </div>
          </aside>
        </Container>
      </section>

      <CtaBand title="Precision is profit." body="Whether you’re advancing your career or optimizing your clinic’s collections, Enhancely provides the tools and expertise to make it happen." primary={{ label: 'Try coding tools', href: '/tools' }} secondary={{ label: 'Consult our team', href: '/audit' }} />
    </>
  );
}
