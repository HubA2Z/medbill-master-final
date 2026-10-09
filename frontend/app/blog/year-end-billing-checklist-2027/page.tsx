import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/year-end-billing-checklist-2027';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout
      slug={SLUG}
      coverImage="/images/blog/cover-year-end-2027.webp"
      cta={{ title: 'Start 2027 with a clean A/R.', body: 'Our billing team reviews your open claims, denials, and E/M levels and shows you what to fix before January. Free 48-hour audit.', label: 'Request your free audit', href: '/audit' }}
    >
      <p className="lead">
        January 1 is the busiest reset in medical billing: new CPT and HCPCS codes, new Medicare payment rates, new insurance cards, and deductibles that start over at zero. Practices that prepare in October and November get paid in January. Practices that don’t spend the first quarter working denials.
      </p>
      <p>Here’s a practical year-end checklist for billing teams, in the order we’d work it.</p>

      <h2>Key dates for Q4 2026</h2>
      <ul>
        <li><strong>October 1:</strong> FY 2027 ICD-10-CM codes took effect. Code by date of service: September dates use the old code set, October dates use the new one.</li>
        <li><strong>October 15 – December 7:</strong> Medicare Open Enrollment. Many patients will have a different plan on January 1.</li>
        <li><strong>November 1:</strong> ACA Marketplace open enrollment begins in most states.</li>
        <li><strong>Early November:</strong> CMS usually publishes the final Medicare Physician Fee Schedule (PFS) rule for the next year.</li>
        <li><strong>January 1, 2027:</strong> new CPT/HCPCS codes, new fee schedules, deductible resets.</li>
        <li><strong>January 1 – March 31:</strong> Medicare Advantage Open Enrollment, so plans can change again.</li>
      </ul>

      <h2>1. Load the 2027 code sets</h2>
      <p>The AMA publishes the new CPT code set in the fall, and CMS publishes the annual HCPCS Level II update. Both take effect for dates of service on or after January 1.</p>
      <ul>
        <li>Add new codes and inactivate deleted ones in your practice management system and charge master, with an effective date, not by overwriting.</li>
        <li>Update superbills, EHR order sets, provider “favorites,” and any charge-entry templates.</li>
        <li>Flag deleted codes your providers use often, so they don’t keep picking them in January.</li>
      </ul>

      <h2>2. Update fee schedules when the final rule is out</h2>
      <p>The final PFS rule sets the Medicare conversion factor and relative values for the year. Once your Medicare Administrative Contractor posts the 2027 fee schedule for your locality, load it into your PM system so expected payments and patient estimates are right.</p>
      <ul>
        <li>If any commercial contracts pay a percentage of Medicare, check which year’s rates they use and whether rates change automatically.</li>
        <li>Review contracts up for renewal and send renegotiation requests before rates roll over.</li>
        <li>Watch the final rule for E/M changes, the telehealth services list, and add-on codes such as G2211. Telehealth flexibilities have had expiration dates several times, so confirm what applies on January 1 before scheduling virtual visits.</li>
      </ul>

      <h2>3. Work down A/R before timely filing runs out</h2>
      <p>Medicare’s timely filing limit is one calendar year from the date of service, so claims for late-2025 visits are reaching their deadline now. Commercial limits are often shorter, commonly 90 to 180 days.</p>
      <ul>
        <li>Run an aging report and work 90+ day claims first, oldest dates of service at the top.</li>
        <li>Resubmit rejections that never became claims. A clearinghouse rejection doesn’t stop the timely filing clock.</li>
        <li>Keep proof of timely filing (clearinghouse acceptance reports) for anything you appeal.</li>
      </ul>
      <p>Our guide to <Link href="/blog/claim-denial-codes-explained">claim denial codes</Link> covers how to fix CO-29 and the other common denials.</p>

      <h2>4. Get the front desk ready for deductible season</h2>
      <p>Most patients’ deductibles reset on January 1. For the first months of the year, patients owe more per visit, and payment surprises cause disputes.</p>
      <ul>
        <li><strong>Re-verify eligibility at every patient’s first visit of 2027.</strong> Ask for the new insurance card even if they say nothing changed.</li>
        <li>Check deductible and out-of-pocket accumulators in the 271 response, and collect a fair estimate at check-in.</li>
        <li>Expect plan changes from Medicare Open Enrollment, and again through March from Medicare Advantage Open Enrollment.</li>
        <li>Train staff to explain the difference in one sentence. Our <Link href="/blog/deductible-vs-out-of-pocket-maximum">deductible vs. out-of-pocket maximum</Link> guide has wording you can use.</li>
      </ul>
      <Callout title="Patients asking about Medicare plans?">
        Billing staff shouldn’t recommend plans, but you can point patients to neutral help. This <a href="https://texasfiles.in/medicare-open-enrollment-texas-guide" target="_blank" rel="noopener">plain-English Medicare Open Enrollment guide</a> explains the dates and how to compare plans.
      </Callout>

      <h2>5. Renew prior authorizations that cross the new year</h2>
      <p>Authorizations often end on a set date or don’t carry over when a patient changes plans. Ongoing services are most at risk: physical therapy, infusions, imaging series, and DME rentals.</p>
      <ul>
        <li>Pull a list of active authorizations with end dates in December or January.</li>
        <li>For patients changing plans, request new authorizations as soon as the new plan is active.</li>
        <li>For therapy, check visit limits and the Medicare KX threshold for the new year. See <Link href="/blog/physical-therapy-denials">physical therapy denials</Link>.</li>
      </ul>

      <h2>6. Check credentialing and enrollment</h2>
      <ul>
        <li>Look up each provider’s Medicare revalidation due date (CMS requires revalidation every five years, sometimes sooner).</li>
        <li>Re-attest CAQH profiles, which payers expect at least every 120 days.</li>
        <li>Confirm new providers are enrolled with every payer before they see patients in January, including Medicare Advantage plans you expect patients to switch to.</li>
      </ul>

      <h2>7. Learn from 2026’s denials</h2>
      <p>Pull your denials for the year by reason code and payer. The top three reasons usually account for most of the lost revenue, and each one points to a process fix: eligibility checks, a missing modifier rule, or authorization tracking. See <Link href="/blog/office-visit-denials">office visit denials</Link> and <Link href="/blog/reduce-claim-denials">how to reduce claim denials</Link>.</p>

      <h2>8. Audit a sample of E/M visits</h2>
      <p>Year-end is a good time for a quick internal audit: 10 visits per provider, checked for MDM or time support. Our free <Link href="/em-audit-tool">E/M audit tool</Link> scores each visit and flags over- and undercoding, G2211 with modifier 25, and prolonged-service timing. Run the codes through the <Link href="/claim-scrubber">claim scrubber</Link> too.</p>

      <h2>9. Update patient estimates and notices</h2>
      <ul>
        <li>Update Good Faith Estimates for self-pay and uninsured patients with 2027 prices.</li>
        <li>Make sure staff use the current version of the Medicare ABN form.</li>
        <li>Update financial policy forms and payment-plan terms if they change for the new year.</li>
      </ul>

      <h2>Year-end checklist at a glance</h2>
      <ol>
        <li>Load 2027 CPT and HCPCS codes; update superbills and templates.</li>
        <li>Load 2027 fee schedules once CMS and your MAC publish them.</li>
        <li>Work 90+ day A/R before timely filing deadlines.</li>
        <li>Re-verify every patient’s coverage at the first 2027 visit.</li>
        <li>Renew prior authorizations that cross the new year.</li>
        <li>Check revalidation, CAQH, and new-provider enrollment.</li>
        <li>Fix the top three denial reasons from 2026.</li>
        <li>Audit a sample of E/M visits per provider.</li>
        <li>Update estimates, ABNs, and financial policies.</li>
      </ol>

      <h2>Frequently asked questions</h2>
      <h3>When does CMS publish the 2027 fee schedule?</h3>
      <p>CMS usually releases the final Physician Fee Schedule rule in early November, and the rates take effect January 1. MACs then post locality fee schedules.</p>
      <h3>Can I bill a new 2027 CPT code for a December 2026 visit?</h3>
      <p>No. Codes are effective by date of service. Use the 2026 code set for 2026 dates of service, even if you submit the claim in January.</p>
      <h3>Why do denials spike in January?</h3>
      <p>Mostly eligibility: patients change plans, the old plan gets billed, and authorizations don’t carry over. Re-verifying at the first visit of the year prevents most of them.</p>

      <p><em>This checklist is general guidance. Confirm effective dates and rules with CMS, your MAC, and each payer.</em></p>
    </ArticleLayout>
  );
}
