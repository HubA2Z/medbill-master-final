import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/workers-compensation-billing-guide';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout
      slug={SLUG}
      cta={{ title: 'Workers’ comp claims stuck with adjusters?', body: 'Our billing team bills and follows up on workers’ compensation claims for practices every day. Start with a free 48-hour audit of your open AR.', label: 'Get a free AR audit', href: '/audit' }}
    >
      <p className="lead">
        Workers’ compensation claims don’t follow the same rules as health insurance. A different party pays, the fee schedule comes from the state, and the claim can stall for weeks if one detail is missing, such as the claim number or the adjuster’s name. This guide covers the information to collect at intake, state rules, authorizations, documentation, CMS-1500 fields, when health insurance can be billed instead, and how to follow up on denials.
      </p>

      <h2>How workers’ comp differs from health insurance</h2>
      <ul>
        <li><strong>Who pays:</strong> the employer’s workers’ compensation carrier (or a self-insured employer or its third-party administrator) pays for treatment of a work-related injury or illness, not the patient’s health plan.</li>
        <li><strong>Patient cost-sharing:</strong> in most cases, there’s no deductible, copay, or coinsurance for an accepted work injury.</li>
        <li><strong>Balance billing:</strong> in many states, the patient can’t be billed for covered treatment of a compensable work injury, and the provider must accept the fee schedule amount. Rules vary by state, so check yours before billing a patient for anything.</li>
        <li><strong>Fee schedules:</strong> most states set a workers’ comp fee schedule that limits what the carrier pays. Some states also use managed care networks.</li>
        <li><strong>Federal workers:</strong> federal employees are covered by a federal program run by the U.S. Department of Labor, with its own enrollment and billing rules.</li>
      </ul>
      <p>The claim isn’t a health plan claim, so the usual eligibility check doesn’t apply. You verify the case with the carrier, not the member’s insurance card.</p>

      <h2>What to collect at intake</h2>
      <p>Most workers’ comp delays start at the front desk. Before or at the first visit, collect:</p>
      <ul>
        <li><strong>Date of injury</strong> and a short description of how it happened.</li>
        <li><strong>Employer name, address, and phone</strong>, plus a contact person if possible.</li>
        <li><strong>Carrier name and claims mailing address</strong> (or electronic billing details).</li>
        <li><strong>Claim number</strong> assigned by the carrier. If the injury was just reported, the claim number may not exist yet. Note that and follow up.</li>
        <li><strong>Adjuster name, phone, fax, and email.</strong> The adjuster approves treatment and answers payment questions.</li>
        <li><strong>Nurse case manager</strong>, if one is assigned.</li>
        <li><strong>Body part(s) accepted</strong> on the claim. Carriers often accept some body parts and dispute others.</li>
        <li><strong>Attorney information</strong>, if the patient has one.</li>
      </ul>
      <p>Then call the adjuster to confirm the claim is open, the body parts accepted, and whether authorization is needed. Document the call with the reference number and the person you spoke with. Our <Link href="/call-note-builder">call note builder</Link> helps keep these notes consistent.</p>
      <p>Set up workers’ comp as a separate case in your practice management system, tied to the date of injury, so work-injury visits don’t mix with the patient’s regular health insurance visits.</p>

      <h2>State rules, fee schedules, and forms</h2>
      <p>Workers’ compensation is mostly governed by state law, so the details change from state to state:</p>
      <ul>
        <li>Fee schedules, and how often they’re updated.</li>
        <li>Required billing forms and attachments. Many states accept the CMS-1500, while some require specific state forms or reports.</li>
        <li>Whether electronic billing is required or accepted, and in what format.</li>
        <li>Deadlines for submitting bills, and for carriers to pay or dispute them.</li>
        <li>Dispute and appeal processes, often through the state workers’ comp agency.</li>
      </ul>
      <p>Some states have detailed rules of their own. Texas, for example, has a Division of Workers’ Compensation with its own rules, forms, and dispute process. Look up the workers’ comp agency for each state where you treat patients, and save its billing rules and fee schedule where the team can find them.</p>

      <h2>Authorization</h2>
      <p>Many carriers and states require authorization for some services: imaging such as MRI, surgery, physical therapy beyond an initial number of visits, injections, and specialist referrals. The rules depend on the state and the carrier. Ask the adjuster what needs approval, get the approval in writing when you can, and record the authorization number, dates, and approved visit count. Our <Link href="/blog/prior-authorization-guide">prior authorization guide</Link> covers tracking habits that apply here too.</p>

      <h2>Documentation and work status reports</h2>
      <p>Workers’ comp carriers often want more than a visit note. Expect to send:</p>
      <ul>
        <li><strong>The visit note</strong>, including how the injury relates to work, the exam, the diagnosis, and the treatment plan.</li>
        <li><strong>Work status report:</strong> whether the patient can work, with or without restrictions (for example, lifting limits), and the expected return-to-work date. Some states require a specific form.</li>
        <li><strong>Progress reports</strong> at set intervals for ongoing care.</li>
        <li><strong>Reports for maximum medical improvement or impairment ratings</strong>, when requested. These may be billed separately under state rules.</li>
      </ul>
      <p>Send notes with the bill unless the carrier says otherwise. A bill without records is a common reason for delay.</p>

      <h2>CMS-1500 fields for workers’ comp</h2>
      <p>Most fields are the same as on any claim (see our <Link href="/blog/cms-1500-claim-form-guide">CMS-1500 claim form guide</Link>). The ones that matter most for workers’ comp:</p>
      <ul>
        <li><strong>Box 10a (condition related to employment):</strong> mark “Yes.”</li>
        <li><strong>Box 14 (date of current illness, injury, or pregnancy):</strong> enter the date of injury, with the qualifier your payer requires.</li>
        <li><strong>Claim number:</strong> placement varies. Many carriers want it in box 1a or box 11, and some states specify the field. Follow the carrier’s or state’s instructions.</li>
        <li><strong>Employer information:</strong> some carriers want the employer named as the insured or in the employer fields.</li>
        <li><strong>Carrier name and address</strong> in the payer area at the top of the form.</li>
      </ul>
      <p>For electronic claims, the same information goes in the matching 837P loops. Check that your clearinghouse has the carrier set up correctly; many workers’ comp carriers use different payer IDs from their health plan side.</p>

      <h2>Superbill-based claims</h2>
      <p>Some workers’ comp visits arrive in billing as a superbill or paper encounter form, especially from occupational health clinics or providers who don’t enter charges themselves. Before building the claim:</p>
      <ul>
        <li>Confirm the superbill has the date of service, CPT/HCPCS codes, modifiers, units, and ICD-10-CM codes that match the note. Our <Link href="/icd10-intelligence">ICD-10 intelligence tool</Link> helps with injury code specificity, including the 7th character.</li>
        <li>Attach the encounter to the workers’ comp case, not the patient’s health insurance.</li>
        <li>Make sure the claim number, date of injury, and adjuster details are in the case before submitting.</li>
        <li>Check the codes against NCCI-type edits with our <Link href="/claim-scrubber">claim scrubber</Link>; many state fee schedules adopt similar rules.</li>
        <li>Keep a copy of the superbill and note with the claim, since carriers often ask for records.</li>
      </ul>

      <Callout title="Keep work and non-work care separate">
        If a patient comes in for both the work injury and an unrelated problem, document them separately and bill them to different payers. Mixing them on one claim leads to denials from both sides.
      </Callout>

      <h2>When you can bill health insurance instead</h2>
      <ul>
        <li><strong>Unrelated care:</strong> services for conditions that aren’t part of the work injury go to the patient’s health plan as usual.</li>
        <li><strong>Denied workers’ comp claims:</strong> if the carrier denies the claim as not work-related or not compensable, the health plan may pay. Most health plans want a copy of the carrier’s denial letter. The patient’s health plan may also deny first with a reason code saying the claim is the workers’ comp carrier’s responsibility (CARC 19); send the denial letter to resolve it.</li>
        <li><strong>Disputed or pending claims:</strong> rules vary. Some health plans won’t pay while the workers’ comp case is open. Medicare has specific Medicare Secondary Payer rules for work injuries, including conditional payments in some situations. Check the payer’s rules before billing.</li>
      </ul>
      <p>For the general rules on which payer goes first, see our <Link href="/blog/coordination-of-benefits-secondary-claims">coordination of benefits guide</Link>.</p>

      <h2>Common denials and follow-up with adjusters</h2>
      <ul>
        <li><strong>Claim denied or not compensable:</strong> get the denial in writing. Then bill the health plan, or the patient if state rules and the situation allow.</li>
        <li><strong>Body part not accepted:</strong> the service treated a body part the carrier hasn’t accepted. Ask the adjuster whether it’s under review.</li>
        <li><strong>No authorization:</strong> send proof of authorization, or ask about retro authorization.</li>
        <li><strong>Reduced to fee schedule:</strong> compare the payment to the state fee schedule. If the carrier paid less, request reconsideration under the state process.</li>
        <li><strong>Missing records or reports:</strong> send the note and work status report, and confirm receipt.</li>
        <li><strong>Wrong or missing claim number:</strong> correct it and resubmit as a corrected claim with the right frequency code.</li>
      </ul>
      <p>Follow up on a set schedule. When you call, confirm the bill was received, ask whether it’s under review or denied, and request a written explanation of review if payment was reduced. If the adjuster has changed, update the case. Track workers’ comp separately in your AR reports, because payment timelines and rules differ from health plans. Our <Link href="/blog/accounts-receivable-follow-up-guide">accounts receivable follow-up guide</Link> covers building a follow-up routine.</p>

      <h2>Frequently asked questions</h2>
      <h3>Can I collect a copay from a workers’ comp patient?</h3>
      <p>Usually not for an accepted work injury. Most states don’t allow patient cost-sharing for compensable workers’ comp treatment. Check your state’s rules.</p>
      <h3>What if the patient doesn’t have a claim number yet?</h3>
      <p>Collect the employer and carrier information, contact the carrier to report the visit, and hold the claim until a claim number is assigned. Track filing deadlines while you wait.</p>
      <h3>Where does the claim number go on the CMS-1500?</h3>
      <p>It varies by carrier and state. Box 1a and box 11 are common, but follow the carrier’s or state’s instructions.</p>
      <h3>Can I bill the patient’s health insurance if workers’ comp denies?</h3>
      <p>Often yes, with a copy of the workers’ comp denial letter. Check the health plan’s rules first.</p>

      <p><em>This guide is general information. Workers’ compensation rules, fee schedules, and forms vary by state and carrier; always confirm with the carrier, the adjuster, and your state’s workers’ compensation agency before billing.</em></p>
    </ArticleLayout>
  );
}
