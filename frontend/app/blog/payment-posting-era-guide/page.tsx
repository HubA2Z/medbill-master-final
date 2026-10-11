import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/payment-posting-era-guide';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout
      slug={SLUG}
      cta={{ title: 'Not sure your payments are posted right?', body: 'Our billing team posts and reconciles ERAs, EOBs, and deposits for practices every day. Start with a free 48-hour audit of your posting and adjustments.', label: 'Get a free posting audit', href: '/audit' }}
    >
      <p className="lead">
        Payment posting is where every claim’s outcome gets recorded: what was paid, what the contract reduced, what the patient owes, and what was denied. If posting is wrong, everything after it is wrong too, including A/R follow-up, secondary claims, patient statements, and your reports. This guide covers ERAs and EOBs, EFT reassociation, how to read a remit, posting adjustments correctly, takebacks, and daily reconciliation.
      </p>

      <h2>835 ERA vs paper EOB</h2>
      <p>An <strong>electronic remittance advice (ERA)</strong> is the HIPAA 835 transaction. It explains how the payer processed each claim and service line, and most practice management systems can auto-post it. A <strong>paper EOB</strong> (explanation of benefits, sometimes called a provider remittance) carries the same information in printed form and must be keyed by hand.</p>
      <p>Enroll for ERAs with every payer that offers them. ERA enrollment is usually done through the payer, your clearinghouse, or an enrollment portal, and it is separate from claim submission enrollment. Auto-posting is faster and avoids keying errors, but someone still needs to review exceptions the system can’t post.</p>

      <h2>EFT and reassociation</h2>
      <p>Payments usually arrive by electronic funds transfer (EFT), separately from the ERA. Matching the two is called <strong>reassociation</strong>. The link is the trace number in the ERA’s <strong>TRN segment</strong>, which should match the trace number sent with the EFT in your bank’s deposit detail. The ERA also shows the total payment amount and date in its financial information.</p>
      <ul>
        <li>If you have an EFT but no ERA, contact the payer or your clearinghouse for the remit before posting. Don’t guess how to apply the money.</li>
        <li>If you have an ERA but no matching deposit, confirm the payment method and bank account on file with the payer.</li>
        <li>Make sure your bank can pass the full trace number to you. Ask the bank for the deposit detail if it only shows a summary.</li>
      </ul>

      <h2>The key parts of a remit</h2>
      <p>Every remit, electronic or paper, reports results at two levels:</p>
      <ul>
        <li><strong>Claim level:</strong> patient, payer claim number, claim status (for example, processed as primary or secondary, or denied), total billed, total paid, and patient responsibility.</li>
        <li><strong>Line level:</strong> each service line with the procedure code and modifiers, billed amount, <strong>allowed amount</strong>, <strong>paid amount</strong>, and the adjustments that explain the difference.</li>
      </ul>
      <p>The math should always balance: billed amount minus all adjustments equals the paid amount. Adjustments are reported with a <strong>group code</strong>, a <strong>claim adjustment reason code (CARC)</strong>, and an amount. <strong>Remittance advice remark codes (RARCs)</strong> add detail. Our <Link href="/blog/claim-denial-codes-explained">claim denial codes guide</Link> explains CARCs and RARCs in depth.</p>
      <div className="not-prose overflow-x-auto my-6">
        <table className="table-clinical">
          <thead>
            <tr>
              <th>Group code</th>
              <th>Meaning</th>
              <th>Can you bill the patient?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CO</td>
              <td>Contractual obligation</td>
              <td>No. The provider absorbs it.</td>
            </tr>
            <tr>
              <td>PR</td>
              <td>Patient responsibility (deductible, coinsurance, copay, and similar)</td>
              <td>Yes, or bill a secondary payer first.</td>
            </tr>
            <tr>
              <td>OA</td>
              <td>Other adjustment, when neither CO nor PR applies</td>
              <td>Depends on the CARC. Read it before acting.</td>
            </tr>
            <tr>
              <td>PI</td>
              <td>Payer-initiated reduction</td>
              <td>Generally no. Review whether to dispute it.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Contractual adjustments vs denials</h2>
      <p>This is the most common and most costly posting mistake. A <strong>contractual adjustment</strong> is the expected difference between your charge and the payer’s allowed amount, commonly reported as CO-45. It is a normal part of every paid claim and should be written off.</p>
      <p>A <strong>denial</strong> is different, even when it is also reported with group code CO. CO-50 (medical necessity), CO-97 (bundled), CO-197 (no authorization), and CO-29 (timely filing) mean the payer didn’t pay for a reason you may be able to fix or appeal. Post the denial with a denial or pending code, leave the balance open, and route it to the denial or A/R team.</p>
      <Callout title="Don’t write off denials as contractual">
        If denials are posted to the contractual adjustment code, they disappear from A/R and nobody works them. Your reports will also understate denials. Set up separate adjustment codes for contractual write-offs, denial write-offs (after appeals are exhausted), and other adjustments, and only use contractual for true contract reductions.
      </Callout>

      <h2>Takebacks, recoupments, and PLB segments</h2>
      <p>Payers often recover overpayments by reducing a later payment instead of asking for a check. In the 835 this shows up in two ways:</p>
      <ul>
        <li><strong>Claim reversal and correction:</strong> the original claim appears with negative amounts (a reversal), often followed by the reprocessed claim. Post both so the original claim’s history is accurate.</li>
        <li><strong>PLB (provider-level adjustment):</strong> an adjustment that applies to the whole payment rather than one claim, such as an overpayment recovery or a forwarding balance. It usually includes a reference that points to the original claim.</li>
      </ul>
      <p>Post a PLB recoupment against the claim it relates to, not as an unexplained difference on the deposit. If the payer hasn’t told you which claim it relates to, call before posting. Review every recoupment: if you disagree, follow the payer’s overpayment dispute process within its deadline.</p>

      <h2>Interest</h2>
      <p>Payers sometimes add interest for late payment, often under state prompt-pay rules or Medicare’s payment rules. Interest may appear at the claim level or as a PLB entry. Post it to a separate interest code, not to the patient’s account or the service line, so it doesn’t create a credit balance or distort your collections by procedure.</p>

      <h2>Zero-pay ERAs</h2>
      <p>A remit with no payment still needs posting. It usually means the claim was denied, applied entirely to the deductible, or paid by a different payer. Post the adjustments so the claim status is accurate: deductible amounts move to patient responsibility, and denials go to the denial queue. Ignoring zero-pay remits leaves claims sitting in A/R looking unpaid.</p>

      <h2>Secondary billing after posting</h2>
      <p>Once the primary payment is posted, bill the secondary payer for the remaining patient responsibility if the patient has other coverage. Secondary claims need the primary payer’s paid amount and adjustments, either from the ERA data sent electronically or with a copy of the primary EOB. Some payer pairs crossover automatically, such as many Medicare to Medigap or Medicaid claims. Check for a crossover remark on the primary remit before billing so you don’t send a duplicate. Our <Link href="/blog/coordination-of-benefits-secondary-claims">coordination of benefits guide</Link> covers this in more detail.</p>

      <h2>Moving balances to the patient</h2>
      <p>Transfer a balance to the patient only for amounts the remit lists as patient responsibility (PR), and only after all insurance has processed. Never bill the patient for CO amounts. If the patient disputes a balance, the PR codes on the remit are your explanation. Our guide to <Link href="/blog/deductible-vs-out-of-pocket-maximum">deductibles and out-of-pocket maximums</Link> helps explain these amounts.</p>

      <h2>Daily reconciliation against bank deposits</h2>
      <ol>
        <li>Pull the day’s bank deposits, including EFT detail with trace numbers, checks, and patient card payments.</li>
        <li>Match each deposit to its ERA, EOB, or receipt.</li>
        <li>Confirm the total posted in your system equals the total deposited, by payer and in total.</li>
        <li>List anything unmatched: deposits without remits, remits without deposits, and unapplied cash. Assign each item an owner.</li>
        <li>Keep the reconciliation as a record so month-end close doesn’t require rebuilding it.</li>
      </ol>

      <h2>Common posting errors</h2>
      <ul>
        <li>Writing off denials as contractual adjustments.</li>
        <li>Posting to the wrong patient, date of service, or line, often on paper EOBs.</li>
        <li>Skipping zero-pay remits or PLB entries.</li>
        <li>Transferring balances to the patient before the secondary payer processes.</li>
        <li>Leaving payments unapplied, which creates false A/R and false credit balances.</li>
        <li>Not reviewing allowed amounts against your fee schedule. Underpayments look like normal contractual adjustments unless someone checks.</li>
      </ul>
      <p>Clean posting feeds clean <Link href="/blog/accounts-receivable-follow-up-guide">A/R follow-up</Link>. When you call a payer about a posting question, record the answer with our <Link href="/call-note-builder">call note builder</Link>.</p>

      <h2>Frequently asked questions</h2>
      <h3>What is the difference between an ERA and an EOB?</h3>
      <p>Both explain how a payer processed a claim. An ERA is the electronic 835 file that your system can auto-post. An EOB is a paper or PDF version that must be keyed by hand.</p>
      <h3>How do I match an EFT to its ERA?</h3>
      <p>Use the trace number. The TRN segment in the ERA should match the trace number in your bank’s EFT deposit detail.</p>
      <h3>Can I bill the patient for a CO adjustment?</h3>
      <p>No. CO amounts are the provider’s responsibility under the contract or payer rules. Only PR amounts, or services the patient agreed to pay for under a valid waiver, can be billed to the patient.</p>
      <h3>What should I do with a PLB recoupment?</h3>
      <p>Identify the original claim from the PLB reference or by calling the payer, post the recoupment to that claim, and dispute it within the payer’s deadline if you disagree.</p>

      <p><em>This guide is general information. Remittance formats, adjustment codes, and overpayment rules vary by payer and contract; always confirm with the payer’s provider manual and your practice management system’s posting guidance.</em></p>
    </ArticleLayout>
  );
}
