import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/ncci-edits-mue-explained';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout
      slug={SLUG}
      cta={{ title: 'Losing money to bundling and unit edits?', body: 'Our billing team reviews NCCI and MUE denials and fixes the coding patterns behind them. Start with a free 48-hour audit of your recent denials.', label: 'Get a free denial audit', href: '/audit' }}
    >
      <p className="lead">
        If you’ve seen CO-97, CO-236, or CO-151 on an ERA, you’ve met the National Correct Coding Initiative. NCCI edits decide which code pairs can be paid together and how many units of a code a payer will accept. This guide explains procedure-to-procedure edits, Medically Unlikely Edits, the indicators that control them, and what to do before and after a claim hits one.
      </p>

      <h2>What is the National Correct Coding Initiative?</h2>
      <p>CMS created NCCI to promote correct coding and prevent payment for code combinations that shouldn’t be billed together. It applies to Medicare Part B practitioner claims and to hospital outpatient claims, and it has two main parts:</p>
      <ul>
        <li><strong>Procedure-to-procedure (PTP) edits:</strong> pairs of codes that generally should not be reported together for the same patient, same provider, and same date of service.</li>
        <li><strong>Medically Unlikely Edits (MUEs):</strong> the maximum units of service for a code that a provider would report for one patient on one date of service under most circumstances.</li>
      </ul>
      <p>CMS also publishes the NCCI Policy Manual, which explains the coding principles behind the edits by CPT section. When an edit doesn’t make sense to you, the manual chapter for that code range is the place to start.</p>

      <h2>Procedure-to-procedure edits: column 1 and column 2</h2>
      <p>Each PTP edit lists a <strong>column 1</strong> code and a <strong>column 2</strong> code. When both are billed for the same patient on the same date by the same provider, the column 2 code is denied unless an allowed modifier is used and supported. The column 1 code is generally the one that gets paid.</p>
      <p>Common reasons a pair is edited include: one service is a component of the other, the codes are mutually exclusive, or one is a more extensive version of the other.</p>

      <h3>Modifier indicators 0, 1, and 9</h3>
      <p>Every PTP edit has a modifier indicator that tells you whether a modifier can bypass it:</p>
      <ul>
        <li><strong>0:</strong> no modifier is allowed. The pair cannot be paid together under any circumstances, and the column 2 code will be denied.</li>
        <li><strong>1:</strong> a modifier is allowed when the services were truly separate, for example a different anatomic site, a different session, or a separate lesion or incision. NCCI-associated modifiers include 59, XE, XS, XP, XU, anatomic modifiers (such as LT, RT, F1–F9, and TA–T9), 24, 25, 57, 58, 78, 79, 91, and others listed by CMS.</li>
        <li><strong>9:</strong> not applicable. This usually appears when an edit has been deleted, and the edit does not apply for dates of service after the deletion.</li>
      </ul>
      <p>A modifier only works when the documentation supports it. Adding 59 or an X modifier just to get past an edit is a compliance risk. See our <Link href="/blog/modifier-59-x-modifiers-guide">modifier 59 and X modifiers guide</Link> and <Link href="/blog/modifier-25-guide">modifier 25 guide</Link> for when each one fits.</p>

      <h2>Medically Unlikely Edits and the MAI</h2>
      <p>Each MUE has a unit value and an MUE Adjudication Indicator (MAI). The MAI tells you how the payer counts units against the limit, and how much room you have when the medical record supports more.</p>
      <div className="not-prose overflow-x-auto my-6">
        <table className="table-clinical">
          <thead>
            <tr>
              <th>MAI</th>
              <th>How units are counted</th>
              <th>What it means for you</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Per claim line</td>
              <td>Units on one line above the MUE are denied. Additional units may be reported on separate lines with appropriate modifiers when the services were truly separate.</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Per day, policy-based</td>
              <td>The limit comes from policy, regulation, or code definition. Units above it are generally not payable, and appeals rarely succeed.</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Per day, clinically based</td>
              <td>All lines for the code on the same date are added together. Units above the limit are denied, but can be appealed with documentation of medical necessity.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Two details trip people up. First, a per-line MAI 1 edit denies only the line that exceeds the limit, while MAI 2 and 3 edits look at the whole date of service. Second, how you report units matters: a bilateral procedure billed with modifier 50 is normally one unit, and timed or measured codes must follow the code’s unit definition. Most MUE values are published, but CMS keeps some confidential.</p>

      <h2>Practitioner vs hospital outpatient edits</h2>
      <p>CMS publishes separate edit files for different claim types:</p>
      <ul>
        <li><strong>Practitioner edits</strong> apply to professional claims (CMS-1500 or 837P) from physicians and other practitioners, including ambulatory surgical centers for PTP edits.</li>
        <li><strong>Hospital outpatient edits</strong> apply to facility claims (UB-04 or 837I) paid under the outpatient prospective payment system and certain other outpatient facility claims.</li>
        <li><strong>DME supplier MUEs</strong> apply to DME supplier claims.</li>
      </ul>
      <p>A pair edited in one file may not be edited, or may have a different value, in another. Always check the file that matches the claim type you’re billing.</p>

      <h2>Quarterly updates and where to find them</h2>
      <p>CMS updates the Medicare NCCI PTP and MUE files every quarter, effective January 1, April 1, July 1, and October 1. The files and the Policy Manual are on the NCCI pages of cms.gov. Edits can be added, deleted, or changed mid-year, so a pair that paid last quarter can deny this quarter. Build a quarterly review into your workflow, alongside the annual code updates in our <Link href="/blog/year-end-billing-checklist-2027">year-end billing checklist</Link>.</p>

      <h3>Medicaid and commercial payers</h3>
      <ul>
        <li><strong>Medicaid:</strong> state Medicaid programs are required to use NCCI methodologies, and CMS publishes separate Medicaid NCCI edit files, also updated quarterly, on Medicaid.gov. Medicaid edits and values can differ from Medicare’s, so don’t check a Medicaid claim against the Medicare file.</li>
        <li><strong>Commercial and Medicare Advantage plans:</strong> many use NCCI-like edits, often through claim-editing software, and add their own proprietary edits and modifier rules. Check the payer’s reimbursement policies, and expect some edits that don’t appear in the CMS files.</li>
      </ul>

      <h2>How to check a claim before submission</h2>
      <ol>
        <li>List every code on the claim for that patient, provider, and date of service, including codes on other claims for the same date.</li>
        <li>Check each pair against the PTP file for the right claim type and quarter. Note the column 1 and column 2 codes and the modifier indicator.</li>
        <li>For indicator 1 edits, confirm the documentation supports a separate site, session, or encounter before adding a modifier.</li>
        <li>Check units against the MUE value and MAI for each code.</li>
        <li>For non-Medicare payers, check the payer’s own edit and reimbursement policies.</li>
      </ol>
      <p>Our free <Link href="/claim-scrubber">claim scrubber</Link> flags common bundling, modifier, and unit problems before you submit, so you can fix them while the chart is still fresh.</p>

      <h2>Billing units above an MUE when medically necessary</h2>
      <p>Sometimes a patient really does need more units than the MUE allows. The right approach depends on the MAI:</p>
      <ul>
        <li><strong>MAI 1:</strong> if the extra units represent separate services, such as different anatomic sites or repeat procedures, they may be reported on separate lines with the appropriate modifier (for example an anatomic modifier, 76, 77, 91, or 59/X modifiers). Only do this when the record supports it and the payer’s rules allow it.</li>
        <li><strong>MAI 3:</strong> bill the units actually provided. If the excess units are denied, appeal with the medical record showing why the additional units were necessary.</li>
        <li><strong>MAI 2:</strong> the limit is based on policy or code definition, so excess units are generally not payable. Review the code selection and unit reporting first.</li>
      </ul>
      <p>An MUE denial is a claim denial, not a rejection, so it goes through the payer’s normal appeal process. Our <Link href="/blog/medical-claim-appeal-guide">claim appeal guide</Link> covers deadlines and documentation.</p>

      <Callout title="Don’t split units just to get paid">
        Breaking one service into several lines, or adding a modifier the record doesn’t support, to bypass an MUE or PTP edit can be treated as improper billing. Split lines only when the services were actually separate.
      </Callout>

      <h2>Related denial codes</h2>
      <ul>
        <li><strong>CO-97:</strong> the benefit for this service is included in the payment for another service or procedure already adjudicated. Common for PTP bundling.</li>
        <li><strong>CO-236:</strong> this procedure or procedure/modifier combination is not compatible with another procedure or modifier on the same date, according to NCCI or payer policy.</li>
        <li><strong>CO-151:</strong> the payer deems the information submitted does not support this many or this frequency of services. Common for MUE denials, often paired with a remark code about units exceeding the maximum.</li>
      </ul>
      <p>For a full walkthrough of reading CARCs and RARCs, see <Link href="/blog/claim-denial-codes-explained">claim denial codes explained</Link>.</p>

      <h2>Frequently asked questions</h2>
      <h3>Do NCCI edits apply to codes billed by different providers?</h3>
      <p>Medicare PTP edits apply to services by the same provider for the same patient on the same date. Providers in the same group and specialty billing under the same tax ID are generally treated as the same provider for these edits. Other payers may apply their own rules.</p>
      <h3>Is modifier 59 always the right modifier for an indicator 1 edit?</h3>
      <p>No. Use a more specific modifier when one fits, such as an anatomic modifier, 25, or an X modifier. Use 59 only when no more descriptive modifier applies and the record supports a distinct service.</p>
      <h3>Why did a commercial payer bundle codes that NCCI allows?</h3>
      <p>Commercial plans can use their own edits beyond NCCI. Check the payer’s reimbursement policy, then appeal with documentation if the policy supports separate payment.</p>
      <h3>Can I appeal an MAI 2 MUE denial?</h3>
      <p>You can, but MAI 2 limits are based on policy or code definition, so appeals are rarely successful. First confirm the units and code selection were correct.</p>

      <p><em>This guide is general information. NCCI edits, MUE values, and payer policies change quarterly and vary by payer and claim type; always confirm with the current CMS or Medicaid.gov files and the payer’s provider manual.</em></p>
    </ArticleLayout>
  );
}
