import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/reduce-claim-denials';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout slug={SLUG} cta={{ title: 'Want to slash your denial rate?', body: 'Get a free revenue audit and a personalized denial reduction plan within 48 hours.', label: 'Start your free audit', href: '/audit' }}>
      <p className="lead">
        Every denied claim costs staff time to research, correct, and resubmit, and some never get paid at all. The good news is that most denials follow patterns, and patterns can be fixed. This guide walks through the revenue cycle from front to back: what causes denials at each stage, what to change, and which numbers to track so you know it’s working. How much your denials drop depends on your specialty, payer mix, and starting point, so treat this as a framework, not a promise.
      </p>

      <h2>Start by knowing where your denials come from</h2>
      <p>Before changing anything, pull a denial report for the last few months and group it two ways: by <strong>claim adjustment reason code (CARC)</strong> and by <strong>payer</strong>. Add remark codes (RARCs) where they help explain the reason. If you need a refresher on reading these codes, see <Link href="/blog/claim-denial-codes-explained">claim denial codes explained</Link>.</p>
      <p>Most practices find that a small number of reasons account for most of their denials. Those few reasons are where to start. The rest of this guide is organized by where in the revenue cycle each type of denial starts.</p>

      <h2>Front end: eligibility, authorization, and registration</h2>
      <p>Front-end denials are often the most preventable, because the information needed to avoid them exists before the patient is seen.</p>

      <h3>Verify eligibility and benefits before every visit</h3>
      <ul>
        <li>Run an eligibility check before each appointment, not only at the first visit. Coverage changes at the start of the year, with job changes, and at open enrollment.</li>
        <li>Confirm which plan is primary when a patient has more than one. Coordination of benefits problems are a common source of denials and delays.</li>
        <li>Check that the service is a covered benefit and whether the provider is in network for that plan.</li>
        <li>Note the deductible, copay, and coinsurance so the front desk can collect appropriately. Our article on <Link href="/blog/deductible-vs-out-of-pocket-maximum">deductibles and out-of-pocket maximums</Link> helps explain these to patients.</li>
      </ul>

      <h3>Get authorizations and referrals in place</h3>
      <ul>
        <li>Keep a current list of services that require prior authorization for each major payer, and update it when payers publish changes.</li>
        <li>Record the authorization number, approved units, date range, and servicing provider in the PM system so they flow to the claim.</li>
        <li>Watch for authorizations that expire or run out of units partway through a course of treatment.</li>
        <li>For HMO and similar plans, confirm a referral is on file when required.</li>
      </ul>

      <h3>Get registration right the first time</h3>
      <p>Small demographic errors cause rejections and denials that are frustrating because they’re so avoidable: a misspelled name, the wrong date of birth, a member ID missing a prefix, or an outdated address. Scan the card front and back at every visit, and compare it to what’s in the system.</p>

      <h2>Mid-cycle: documentation, coding, and claim edits</h2>

      <h3>Documentation that supports the claim</h3>
      <p>A claim is only as strong as the note behind it. Medical necessity denials usually trace back to documentation that doesn’t clearly show why the service was needed. Work with providers on:</p>
      <ul>
        <li>Clearly stating the reason for the visit or procedure and the relevant history.</li>
        <li>Linking each service to a supporting diagnosis.</li>
        <li>Meeting payer policy or LCD criteria for services that have them, such as prior conservative treatment.</li>
        <li>Signing and completing notes promptly.</li>
      </ul>

      <h3>Coding specificity</h3>
      <p>Code to the highest level of detail the documentation supports, including laterality, type, and complications. Unspecified codes are valid, but some payers edit against them for certain services, and a header code without its required characters will reject. Our <Link href="/icd10-intelligence">ICD-10 search</Link> helps you find the complete, billable code.</p>
      <p>For office visits, make sure the E/M level matches the medical decision making or total time documented. Score a sample of visits with our <Link href="/em-audit-tool">E/M audit tool</Link>, and see <Link href="/blog/office-visit-denials">office visit denials</Link> for the problems that come up most.</p>

      <h3>Modifiers</h3>
      <p>Modifiers are a frequent cause of bundling and duplicate denials. Common trouble spots include modifier 25 on an E/M billed with a procedure on the same day, modifiers 59 and the X modifiers (XE, XS, XP, XU) for distinct services, and laterality modifiers. Use them only when the documentation supports them; adding a modifier just to get past an edit creates audit risk.</p>

      <h3>Scrub every claim before it goes out</h3>
      <p>A claim scrubber catches NCCI procedure-to-procedure edits, units over the MUE, missing modifiers, invalid codes, and payer-specific formatting problems before the payer sees them. Combine your PM system’s edits with clearinghouse edits, and review rejection reports daily. You can check code pairs and units for free with our <Link href="/claim-scrubber">claim scrubber</Link>.</p>

      <Callout title="Fix it once, not every time">
        When the same edit or denial keeps showing up, don’t just correct each claim. Change the template, the charge entry rule, the registration step, or the provider’s workflow that causes it.
      </Callout>

      <h2>Back end: denial management and appeals</h2>

      <h3>Work denials quickly and by category</h3>
      <ul>
        <li>Review ERAs and denials daily and route them to the right person: registration issues to the front desk, coding issues to coders, authorization issues to the auth team.</li>
        <li>Decide quickly whether each denial needs a corrected claim, a reopening, a call to the payer, or an appeal.</li>
        <li>Calendar filing and appeal deadlines the day the denial arrives.</li>
        <li>Document every payer call with a reference number. Our <Link href="/call-note-builder">call note builder</Link> keeps notes consistent across the team.</li>
      </ul>

      <h3>Appeal what you can support</h3>
      <p>Not every denial is final. When the claim was billed correctly and the record supports it, appeal with the right documentation and a clear letter. Our <Link href="/blog/medical-claim-appeal-guide">medical claim appeal guide</Link> includes a letter template and Medicare appeal levels. If the record doesn’t support the service as billed, correct it or write it off instead.</p>

      <h3>Run a root-cause review</h3>
      <p>Once a month, look at denials by CARC, payer, provider, location, and CPT code. Ask what caused each top category and who can prevent it. Track the fix and check the next month whether that category went down. This feedback loop is what turns denial management into denial prevention.</p>

      <h2>KPIs to track</h2>
      <p>Measure the same way every month so trends are meaningful. Benchmarks vary widely by specialty and payer mix, so compare your practice against its own history first.</p>
      <ul>
        <li><strong>Denial rate:</strong> the share of claims (or charges) denied in a period, out of all claims adjudicated in that period. Decide whether you measure by claim count or dollars and stay consistent.</li>
        <li><strong>First-pass resolution rate (clean claim rate):</strong> the share of claims paid or correctly adjudicated on the first submission, without rework, rejection, or resubmission.</li>
        <li><strong>Days in A/R:</strong> total accounts receivable divided by average daily charges over a recent period. It shows how long, on average, it takes to collect.</li>
        <li><strong>A/R over 90 or 120 days:</strong> the share of receivables older than those cutoffs, which often points to unworked denials.</li>
        <li><strong>Appeal overturn rate:</strong> the share of appealed claims that are paid after appeal, tracked by payer and reason.</li>
      </ul>
      <p>For a broader end-of-year review of these numbers, see our <Link href="/blog/year-end-billing-checklist-2027">year-end billing checklist</Link>.</p>

      <h2>A simple action plan</h2>
      <ol>
        <li>Pull a denial report and find your top reasons by CARC and payer.</li>
        <li>Fix the front-end causes first: eligibility, authorization, and registration.</li>
        <li>Scrub every claim and review rejections daily.</li>
        <li>Audit coding and documentation for your highest-volume services.</li>
        <li>Work denials daily, appeal what’s supported, and review root causes monthly.</li>
      </ol>

      <h2>Frequently asked questions</h2>
      <h3>What is the most common cause of claim denials?</h3>
      <p>It varies by practice, but eligibility and registration errors, missing authorizations, coding and modifier problems, and medical necessity are common categories. Your own denial report by CARC is the only reliable answer for your practice.</p>
      <h3>How much can a practice reduce denials?</h3>
      <p>Results vary by practice. Specialty, payer mix, staffing, and how many denials are preventable all affect the outcome. Practices that track denials and fix root causes generally see improvement over time.</p>
      <h3>What’s the difference between a rejection and a denial?</h3>
      <p>A rejection is returned before the payer processes the claim, usually for format or data errors, and it can be corrected and resubmitted. A denial is a processed claim the payer won’t pay, which may need a corrected claim or an appeal.</p>

      <p><em>This guide is general information. Payer rules, authorization requirements, and filing deadlines vary by payer and contract; confirm with payers and their provider manuals.</em></p>
    </ArticleLayout>
  );
}
