import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/coordination-of-benefits-secondary-claims';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout
      slug={SLUG}
      cta={{ title: 'Secondary claims slipping through the cracks?', body: 'Our billing team works COB denials and secondary claims for practices every day. Start with a free 48-hour audit of your open AR.', label: 'Get a free AR audit', href: '/audit' }}
    >
      <p className="lead">
        Coordination of benefits (COB) is how payers decide who pays first when a patient has more than one source of coverage. Bill the wrong payer first and you get a CO-22 denial, a delayed payment, or a refund request months later. This guide covers how primary is determined, Medicare Secondary Payer basics, how to verify COB, how to bill the secondary, how crossovers work, and what to do when COB changes after payment.
      </p>

      <h2>Who is primary: the common rules</h2>
      <p>Most commercial plans follow COB rules based on the model rules from the National Association of Insurance Commissioners (NAIC), adopted in some form by most states. Self-funded employer plans may set their own rules, so always check the plan. The common order is:</p>
      <ul>
        <li><strong>Employee vs dependent:</strong> the plan that covers the patient as the employee or subscriber is primary over a plan that covers them as a dependent.</li>
        <li><strong>Birthday rule for dependent children:</strong> when both parents cover a child, the plan of the parent whose birthday (month and day, not year) falls earlier in the calendar year is primary. If both parents have the same birthday, the plan that has covered a parent longer is usually primary.</li>
        <li><strong>Divorced or separated parents:</strong> a court order assigning health coverage controls. Without one, plans generally look to the custodial parent first, then the custodial parent’s spouse, then the non-custodial parent. Get a copy of the decree when it matters.</li>
        <li><strong>Active employment vs COBRA or retiree coverage:</strong> a plan covering the patient as an active employee (or dependent of one) is primary over COBRA continuation or retiree coverage.</li>
        <li><strong>Longer vs shorter coverage:</strong> if no other rule decides, the plan that has covered the person longer is often primary.</li>
      </ul>

      <h2>Medicare Secondary Payer basics</h2>
      <p>Medicare Secondary Payer (MSP) rules decide when Medicare pays second. At a high level:</p>
      <ul>
        <li><strong>Age 65 or older and working:</strong> if the patient or spouse has group health coverage through current employment and the employer meets the size threshold (20 or more employees), the group plan is primary. With a smaller employer, Medicare is usually primary.</li>
        <li><strong>Disability:</strong> for patients under 65 on Medicare due to disability, a large group health plan (generally 100 or more employees) based on current employment is primary.</li>
        <li><strong>ESRD:</strong> for patients entitled to Medicare due to end-stage renal disease, an employer group health plan is primary during a <strong>30-month coordination period</strong>. Medicare becomes primary after that period ends.</li>
        <li><strong>Workers’ compensation, no-fault, and liability:</strong> these are primary for services related to the injury or illness they cover. See our <Link href="/blog/workers-compensation-billing-guide">workers’ compensation billing guide</Link>.</li>
        <li><strong>COBRA and retiree coverage:</strong> for most beneficiaries, Medicare is primary over retiree coverage. COBRA has special rules, including during the ESRD coordination period.</li>
      </ul>
      <p>MSP rules have more detail than this, including how employer size is counted and multi-employer plans. Use the CMS MSP manual and your MAC’s MSP pages when a case is unclear.</p>

      <h2>Medicaid as payer of last resort</h2>
      <p>Medicaid pays after every other source of coverage, including Medicare, commercial plans, and liability coverage. When a patient has Medicaid and other insurance, bill the other coverage first and send Medicaid the claim with the primary payment information. Medicaid secondary rules, including how much it pays toward patient cost sharing, vary by state, so check the state Medicaid provider manual or managed Medicaid plan rules.</p>

      <h2>How to verify COB before the visit</h2>
      <ul>
        <li><strong>Run a 271 eligibility response</strong> for each payer on file. Look for other-payer information, Medicare indicators, and messages that the plan is secondary.</li>
        <li><strong>Check the payer portal.</strong> Many portals show the COB status the plan has on record, and when it was last updated.</li>
        <li><strong>Ask the patient.</strong> Use an intake questionnaire that asks about other coverage, spouse or parent coverage, employment status, and whether the visit relates to an accident or work injury. For Medicare patients, an MSP questionnaire captures the answers Medicare needs.</li>
        <li><strong>Prompt patients to update COB with their plan.</strong> Many plans pend or deny claims until the member confirms other coverage, often once a year.</li>
      </ul>
      <p>See our <Link href="/blog/insurance-eligibility-verification-guide">insurance eligibility verification guide</Link> for a full checklist.</p>

      <h2>Billing the secondary with primary EOB or ERA data</h2>
      <p>The secondary payer needs to see exactly what the primary did. On an electronic 837P claim, that means reporting the primary payer’s adjudication:</p>
      <ul>
        <li>The primary payer’s identification in the other subscriber and other payer loops.</li>
        <li>The amount the primary paid, at the claim level and at the line level.</li>
        <li><strong>Claim adjustment (CAS) segments</strong> copied from the primary ERA, with the same group code (CO, PR, OA, PI), CARC, and amount for each adjustment.</li>
        <li>The primary adjudication date for each line.</li>
      </ul>
      <p>The amounts on each line must balance: billed charge minus the primary payment and all adjustments should net to zero. Out-of-balance secondary claims are a common clearinghouse rejection. For paper CMS-1500 claims, complete the other insurance fields and attach the primary EOB. See our <Link href="/blog/cms-1500-claim-form-guide">CMS-1500 claim form guide</Link> and <Link href="/blog/payment-posting-era-guide">payment posting and ERA guide</Link>.</p>

      <Callout title="Post the primary before you bill the secondary">
        Secondary claims built from a partly posted or hand-keyed EOB often go out with wrong CAS data. Post the primary ERA in full, then let the system build the secondary from the posted adjustments.
      </Callout>

      <h2>Crossovers from Medicare</h2>
      <p>Medicare can automatically forward processed claims to many supplemental payers through its Coordination of Benefits Agreement (COBA) crossover process. That includes many Medigap plans, Medicaid programs, and some retiree plans.</p>
      <ul>
        <li>Look for remark code <strong>MA18</strong> on the Medicare remittance, which indicates the claim was forwarded to the supplemental insurer. Do not send a separate claim to that payer unless it has not processed within its normal time.</li>
        <li>If the remittance has no crossover remark, bill the secondary yourself with the Medicare ERA data.</li>
        <li>For Medigap plans not set up for automatic crossover, participating providers may need to enter the Medigap information on the claim to trigger a claim-based crossover. Check your MAC’s instructions.</li>
      </ul>

      <h2>CO-22 denials and how to fix them</h2>
      <p>CO-22 means the payer believes another payer should pay first. To work it:</p>
      <ol>
        <li><strong>Check the payer’s COB record</strong> through the portal or a call. Note what other coverage they have on file and the effective dates.</li>
        <li><strong>Confirm with the patient.</strong> If the other coverage ended or never existed, ask the patient to update COB with the plan. Many plans need the member to do this directly.</li>
        <li><strong>If the payer is right</strong>, bill the true primary, then send the secondary with the primary’s payment data.</li>
        <li><strong>If the payer is wrong</strong>, once COB is updated, ask the payer to reprocess or submit a corrected claim, depending on its policy. Document the call with our <Link href="/call-note-builder">call note builder</Link>.</li>
      </ol>
      <p>Watch the timely filing limit for both payers while COB is sorted out. See our <Link href="/blog/timely-filing-limits-guide">timely filing limits guide</Link>.</p>

      <h2>Refunds when COB changes</h2>
      <p>COB often changes after payment. A plan learns of other coverage, or a patient reports a new job. When a payer that paid as primary should have been secondary, expect a refund request or an offset against future payments.</p>
      <ul>
        <li>Review each request against the payer’s COB record and the patient’s coverage dates before paying.</li>
        <li>Bill the correct primary as soon as possible, since its timely filing clock may already be running.</li>
        <li>For Medicare, overpayments you identify must generally be reported and returned within 60 days of identifying them. Follow your MAC’s voluntary refund process.</li>
        <li>For commercial payers, refund and recoupment timelines are set by contract and state law.</li>
        <li>Keep a log of refunds and offsets so payment posting reflects the change and patient balances stay accurate.</li>
      </ul>

      <h2>Frequently asked questions</h2>
      <h3>Does the birthday rule use the parent’s birth year?</h3>
      <p>No. Only the month and day count. The parent whose birthday comes first in the calendar year has the primary plan for the child, unless a court order or plan rule says otherwise.</p>
      <h3>Is Medicare primary if a patient has COBRA?</h3>
      <p>In most cases Medicare is primary over COBRA. ESRD is an exception during the 30-month coordination period. Confirm with the MSP rules and the patient’s Medicare record.</p>
      <h3>Do I need to bill the secondary if Medicare crossed the claim over?</h3>
      <p>Usually not. If the Medicare remittance shows MA18, the claim was forwarded. Follow up with the secondary only if it has not processed in a reasonable time.</p>
      <h3>What does CO-22 mean?</h3>
      <p>The payer believes another payer is primary. Verify COB with the payer and patient, then bill the correct primary or have the record updated.</p>

      <p><em>This guide is general information. COB rules, MSP requirements, and secondary billing instructions vary by payer, plan type, and state; always confirm with the payer’s provider manual, your MAC, or the CMS MSP manual.</em></p>
    </ArticleLayout>
  );
}
