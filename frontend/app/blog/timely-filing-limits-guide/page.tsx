import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/timely-filing-limits-guide';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout
      slug={SLUG}
      cta={{ title: 'Old claims piling up in AR?', body: 'Our billing team works aging AR and timely filing risks for practices every day. Start with a free 48-hour audit of your open claims.', label: 'Get a free AR audit', href: '/audit' }}
    >
      <p className="lead">
        A timely filing limit is the deadline a payer sets for receiving a clean claim. Miss it and the claim is usually denied with CO-29, and in most cases the practice cannot bill the patient for it. This guide covers how the Medicare limit works, why Medicaid and commercial limits vary, how secondary and corrected claims fit in, what counts as proof of timely filing, and how to keep claims from ever getting close to the deadline.
      </p>

      <h2>What a timely filing limit is</h2>
      <p>Every payer sets a window, counted from a starting point, during which it must <strong>receive</strong> the claim. The starting point is usually the date of service. For some claim types it is the discharge date, the “through” date on an institutional claim, or the date of the primary payer’s remittance. The key word is <em>receive</em>. Claims you created but never transmitted, and claims that were rejected before the payer accepted them, do not count.</p>
      <p>Timely filing is separate from appeal deadlines. Appeals have their own clocks, which start when you receive a denial. See our <Link href="/blog/medical-claim-appeal-guide">medical claim appeal guide</Link> for those.</p>

      <h2>Medicare’s timely filing limit</h2>
      <p>For Medicare Part A and Part B fee-for-service claims, the limit is <strong>one calendar year (12 months) from the date of service</strong>. For institutional claims that span several dates, Medicare uses the “through” date on the claim. Claims received after the limit are denied, and a timely filing denial is generally not something you can appeal through the normal Medicare appeal levels.</p>
      <p>Medicare does allow exceptions in limited situations. The main ones are:</p>
      <ul>
        <li><strong>Administrative error:</strong> the delay was caused by an error or misrepresentation by Medicare or its contractor.</li>
        <li><strong>Retroactive Medicare entitlement:</strong> the patient became entitled to Medicare after the service, back to a date that covers it.</li>
        <li><strong>Retroactive Medicaid entitlement:</strong> for patients who were later found eligible for both programs.</li>
        <li><strong>Retroactive disenrollment</strong> from a Medicare Advantage plan back to a date that covers the service.</li>
      </ul>
      <p>Each exception has its own documentation and its own deadline for submitting the claim after the qualifying event. Check your MAC’s website and the CMS Claims Processing Manual before relying on one.</p>
      <p>Medicare Advantage plans are not bound by the fee-for-service rule. Their limit comes from your contract or the plan’s provider manual, and non-contracted rules can differ. See our <Link href="/blog/medicare-advantage-billing-guide">Medicare Advantage billing guide</Link>.</p>

      <h2>Medicaid and commercial limits vary</h2>
      <p>There is no single number for Medicaid or commercial payers. Medicaid limits are set by each state, and managed Medicaid plans may have their own. Commercial limits are set by your contract and the payer’s provider manual, and they can differ for in-network and out-of-network claims, by product line, and by state law. Lists of “standard” limits you find online go out of date and often ignore your contract terms.</p>
      <p>The safe approach:</p>
      <ul>
        <li>Pull the timely filing clause from each payer contract and the current provider manual.</li>
        <li>Record the limit, the starting point (date of service, discharge, or primary EOB), and the rules for corrected and secondary claims in one payer grid.</li>
        <li>Review the grid when contracts renew and when payers publish manual updates.</li>
        <li>For out-of-network claims with no contract, check the payer’s published policy and any state prompt-pay or filing laws.</li>
      </ul>

      <h2>Secondary claims and corrected claims</h2>
      <h3>Secondary claims</h3>
      <p>Many payers measure a secondary claim from the date of the primary payer’s EOB or ERA, not from the date of service. Others still use the date of service. Some apply whichever date is later. Medicare as secondary generally still expects the claim within its one-year limit from the date of service. Delays in getting the primary to pay can push a secondary claim past its limit, so work primary denials quickly. Our guide to <Link href="/blog/coordination-of-benefits-secondary-claims">coordination of benefits and secondary claims</Link> covers billing the secondary.</p>
      <h3>Corrected claims</h3>
      <p>Corrected claims (frequency code 7 for replacement, 8 for void) have their own rules. Some payers require them within the original timely filing window. Others allow a set period from the date of the original remittance. A corrected claim sent after the window can be denied as untimely even though the original was on time. Check the payer manual, and see our guide to <Link href="/blog/corrected-claims-frequency-codes">corrected claims and frequency codes</Link>.</p>

      <h2>Rejections vs denials: why rejections don’t stop the clock</h2>
      <p>This is the most common way claims miss timely filing.</p>
      <ul>
        <li><strong>A rejection</strong> happens before the payer accepts the claim into its processing system. The clearinghouse or payer front end returns it for errors like an invalid member ID, missing NPI, or bad format. A rejected claim was never received, so the timely filing clock keeps running.</li>
        <li><strong>A denial</strong> happens after the payer accepts and adjudicates the claim. It appears on the ERA or EOB with a CARC. A denied claim was received, and that receipt date can support timely filing.</li>
      </ul>
      <p>Medicare claims returned as unprocessable (often with remark code MA130) are treated like rejections. They do not count as filed. Work rejection reports every day, not once a week. Our <Link href="/blog/clearinghouse-rejections-guide">clearinghouse rejections guide</Link> explains how to read and fix them.</p>

      <Callout title="Rejected claims are invisible to AR reports">
        Many practice management systems mark a claim as “billed” once it leaves the system. If it is rejected later, it can sit in that status for months with no payer record. Reconcile clearinghouse rejection reports against your billed claims so these do not age out unnoticed.
      </Callout>

      <h2>What counts as proof of timely filing</h2>
      <p>If a payer denies for timely filing and you believe the claim was received on time, the outcome depends on your proof. Useful documents include:</p>
      <ul>
        <li><strong>277CA claim acknowledgment</strong> showing the payer accepted the claim, with the date and the payer claim or tracking number. This is usually the strongest electronic proof.</li>
        <li><strong>999 implementation acknowledgment</strong> showing the file was accepted. On its own it shows the file passed format checks, not that the payer accepted each claim, so pair it with the 277CA where possible.</li>
        <li><strong>Clearinghouse acceptance reports</strong> that show the claim, the payer, and the date the payer accepted it.</li>
        <li><strong>Payer acknowledgments</strong>, such as a portal claim history, an earlier EOB or ERA for the same claim, or a letter requesting more information.</li>
        <li><strong>Call reference numbers</strong> where a payer representative confirmed receipt of the claim.</li>
      </ul>
      <p>A PM system screenshot showing a “billed” date is weak proof, because it does not show the payer received anything. Many payers will not accept it. Keep clearinghouse reports for as long as your record retention policy requires, and know where to find them for older dates.</p>

      <h2>How to prevent CO-29 denials</h2>
      <ul>
        <li><strong>Verify insurance before the visit.</strong> Wrong payer or wrong member ID is a leading cause of late claims. See our <Link href="/blog/insurance-eligibility-verification-guide">eligibility verification guide</Link>.</li>
        <li><strong>Scrub claims before submission</strong> so they are not rejected for preventable errors. Run claims through our <Link href="/claim-scrubber">claim scrubber</Link>.</li>
        <li><strong>Work rejections daily</strong> and track them until accepted.</li>
        <li><strong>Run aging reports by date of service</strong>, not just by billed date, so claims approaching a payer’s limit stand out.</li>
        <li><strong>Build work queues by deadline.</strong> Flag claims with no payer response after a set number of days, and prioritize by how close they are to the payer’s limit.</li>
        <li><strong>Follow up on claims with no response.</strong> A claim the payer says it never received must be resubmitted while there is still time. Document every call with a reference number; our <Link href="/call-note-builder">call note builder</Link> helps keep notes consistent.</li>
        <li><strong>Track charge lag.</strong> Late charge entry from the provider or facility eats into the window before billing even starts.</li>
      </ul>
      <p>For a full follow-up workflow, see our <Link href="/blog/accounts-receivable-follow-up-guide">accounts receivable follow-up guide</Link>.</p>

      <h2>How to appeal a timely filing denial</h2>
      <ol>
        <li><strong>Confirm the dates.</strong> Compare the date of service, the original submission date, the payer acceptance date, and the payer’s limit and starting point.</li>
        <li><strong>Find your proof.</strong> Pull the 277CA, clearinghouse acceptance report, or payer acknowledgment for the original claim. If the claim was resubmitted, show the chain back to the first accepted submission.</li>
        <li><strong>Check for an exception.</strong> Retroactive eligibility, a payer error, or a primary payer’s late processing may qualify under the payer’s policy.</li>
        <li><strong>Submit through the right channel.</strong> Use the payer’s reconsideration or appeal process, with a short letter stating the claim was received timely and attaching proof. For Medicare, ask your MAC how it handles proof of timely filing or exception requests, since these are generally not handled as standard appeals.</li>
        <li><strong>Write off if there is no proof.</strong> A CO-29 denial without proof is usually final, and the amount generally cannot be billed to the patient. Track these write-offs by cause so you can fix the process.</li>
      </ol>
      <p>For denial code basics, see <Link href="/blog/claim-denial-codes-explained">claim denial codes explained</Link>.</p>

      <h2>Frequently asked questions</h2>
      <h3>When does the Medicare timely filing clock start?</h3>
      <p>On the date of service. For institutional claims that span several dates, Medicare uses the “through” date. The claim must be received within one calendar year of that date.</p>
      <h3>Does a rejected claim count as filed?</h3>
      <p>No. A rejection means the payer never accepted the claim, so the clock keeps running. Only claims the payer accepts into processing count as received.</p>
      <h3>Can I bill the patient for a claim denied for timely filing?</h3>
      <p>Generally no. CO-29 is a contractual obligation adjustment, so the amount is the provider’s responsibility. Check your contract and any state rules.</p>
      <h3>Is a 999 enough proof of timely filing?</h3>
      <p>Often not by itself. A 999 shows the file passed format checks. A 277CA or payer acknowledgment showing the claim was accepted is stronger proof.</p>

      <p><em>This guide is general information. Timely filing limits, exceptions, and proof requirements vary by payer, state, and contract; always confirm with the payer’s provider manual, your contract, or your MAC.</em></p>
    </ArticleLayout>
  );
}
