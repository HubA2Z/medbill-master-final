import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/medicare-advantage-billing-guide';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout
      slug={SLUG}
      cta={{ title: 'Medicare Advantage claims stuck in AR?', body: 'Our billing team works MA denials, authorizations, and plan follow-up for practices every day. Start with a free 48-hour audit of your open claims.', label: 'Get a free AR audit', href: '/audit' }}
    >
      <p className="lead">
        A patient who says “I have Medicare” may not have Original Medicare at all. Medicare Advantage (Part C) plans are run by private insurers under contract with CMS, and they have their own claims addresses, payer IDs, networks, authorization rules, and deadlines. Bill an MA patient to your MAC and the claim comes back denied. This guide covers how to spot an MA patient, where to send the claim, and the rules that differ from Original Medicare.
      </p>

      <h2>Original Medicare vs Medicare Advantage at a glance</h2>
      <p>Original Medicare (Parts A and B) is administered by CMS through Medicare Administrative Contractors (MACs). With Medicare Advantage, CMS pays a private plan a monthly amount per member, and the plan pays your claims. The member still has Medicare, but for most services the MA plan is the payer.</p>
      <div className="not-prose overflow-x-auto my-6">
        <table className="table-clinical">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Original Medicare</th>
              <th>Medicare Advantage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Who pays claims</td>
              <td>Your MAC</td>
              <td>The MA plan (private insurer)</td>
            </tr>
            <tr>
              <td>Network</td>
              <td>Any enrolled provider</td>
              <td>Depends on plan type (HMO, PPO, PFFS, SNP)</td>
            </tr>
            <tr>
              <td>Referrals and prior authorization</td>
              <td>Limited</td>
              <td>More common; set by the plan</td>
            </tr>
            <tr>
              <td>Timely filing</td>
              <td>12 months from date of service</td>
              <td>Set by contract and plan manual</td>
            </tr>
            <tr>
              <td>Coverage policies</td>
              <td>NCDs and LCDs</td>
              <td>Medicare coverage rules plus plan policies and payment rules</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>How to identify a Medicare Advantage patient</h2>
      <p>Most MA billing problems start at registration. Check every Medicare patient at every visit, because members can change plans.</p>
      <ul>
        <li><strong>Ask for every card.</strong> An MA member usually carries a card from the plan, not just (or instead of) the red, white, and blue Medicare card. The MA card shows the plan name, a plan member ID, and the claims address or payer ID. Scan both sides.</li>
        <li><strong>Run eligibility through Medicare.</strong> An eligibility response from Medicare (through your MAC portal, a HETS-based clearinghouse check, or your PM system) shows when a patient is enrolled in a Medicare Advantage plan, usually with the plan name and contract information. If it shows an MA plan, Original Medicare is not the payer for most services.</li>
        <li><strong>Then verify with the plan.</strong> Check eligibility with the MA plan itself (its portal or a clearinghouse check) for the plan type, PCP assignment, copays, and authorization requirements. Our <Link href="/blog/insurance-eligibility-verification-guide">eligibility verification guide</Link> covers what to capture.</li>
        <li><strong>Watch the plan name.</strong> Many insurers sell both MA plans and commercial plans under the same brand. The MA product often has a different payer ID and claims address. Use the one on the card or in the plan’s provider manual.</li>
      </ul>

      <h2>Bill the MA plan, not the MAC</h2>
      <p>When a patient is enrolled in MA, send the claim to the MA plan. A claim sent to the MAC for an MA enrollee is generally denied, often with CARC 24 (charges covered under a managed care plan). Fix the payer and submit a new claim to the plan; there is nothing to appeal at the MAC.</p>
      <p>There are a few exceptions where Original Medicare still pays for an MA member, such as hospice care after the patient elects hospice and certain clinical trial costs. When one of these applies, follow the MAC’s instructions for that service.</p>

      <h2>Network types and what they mean for billing</h2>
      <ul>
        <li><strong>HMO:</strong> members generally must use in-network providers and often need a PCP referral for specialists. Out-of-network care is usually not covered except for emergencies, urgent care, and certain other situations.</li>
        <li><strong>PPO:</strong> members can see out-of-network providers, usually with higher cost sharing. Authorization rules can still apply.</li>
        <li><strong>PFFS (Private Fee-for-Service):</strong> the plan sets its own terms and payment rates. A provider who is not contracted can choose, visit by visit, whether to accept the plan’s terms. Read the plan’s terms and conditions before you treat.</li>
        <li><strong>SNPs (Special Needs Plans):</strong> D-SNPs for people with both Medicare and Medicaid, C-SNPs for certain chronic conditions, and I-SNPs for people living in institutions. SNPs are usually HMO or PPO style, with their own care coordination rules.</li>
      </ul>

      <h2>Referrals and prior authorization</h2>
      <p>Referrals and prior authorization are much more common in MA than in Original Medicare. Each plan publishes its own authorization list, and the list can change during the year. Before scheduling imaging, procedures, therapy, DME, or specialist visits, check the plan’s current list and get the authorization or referral on file. See our <Link href="/blog/prior-authorization-guide">prior authorization guide</Link> for a workflow.</p>
      <p>CMS rules require MA plans to cover the services Original Medicare covers and to follow Medicare coverage criteria in NCDs and LCDs, with internal criteria allowed only in limited cases. Plans can still require authorization, so don’t assume a service is approved just because Medicare would cover it.</p>

      <h2>Contracted vs non-contracted providers</h2>
      <ul>
        <li><strong>Contracted (in-network):</strong> your payment rates, timely filing limit, appeal process, and billing rules come from your contract and the plan’s provider manual.</li>
        <li><strong>Non-contracted:</strong> at a high level, non-contracted providers are generally paid what they would receive under Original Medicare, and the patient pays the plan’s cost sharing. Balance billing limits apply. Non-contracted providers usually have a separate dispute and appeal process; appeals often require a signed waiver of liability.</li>
      </ul>
      <p>Confirm your status with each plan before the visit. Being enrolled in Medicare does not make you in network with every MA plan. Our <Link href="/blog/provider-credentialing-enrollment-guide">credentialing and enrollment guide</Link> explains how to join plan networks.</p>

      <h2>Timely filing, medical policies, and payment rules</h2>
      <p>Don’t apply Original Medicare’s 12-month limit to MA claims. Each plan sets its own timely filing limit in the contract or provider manual, and it can be much shorter. Track the limit by plan, and keep clearinghouse acceptance reports as proof of filing. Our <Link href="/blog/timely-filing-limits-guide">timely filing limits guide</Link> has a tracking method.</p>
      <p>MA plans also publish their own medical and reimbursement policies. These can include different bundling edits, modifier rules, frequency limits, and site-of-service rules than your MAC uses. When an MA plan denies a claim that Medicare would have paid, read the plan’s policy before you call.</p>

      <h2>Risk adjustment and HCC coding</h2>
      <p>CMS adjusts what it pays MA plans based on each member’s health status, using Hierarchical Condition Category (HCC) models built from reported diagnosis codes. That’s why MA plans care about complete and accurate documentation of chronic conditions.</p>
      <ul>
        <li>Chronic conditions generally need to be documented and coded from a qualifying face-to-face encounter at least once each calendar year to be counted for that year.</li>
        <li>The note should show the condition was addressed, for example monitored, evaluated, assessed, or treated (often called MEAT). A diagnosis that only appears in a problem list is weak support.</li>
        <li>Code to the highest specificity the documentation supports. Check codes in our <Link href="/icd10-intelligence">ICD-10 lookup</Link>.</li>
        <li>Never add or keep a diagnosis that the record doesn’t support. Risk adjustment coding is an active area of audits and enforcement.</li>
      </ul>

      <h2>Dual-eligible members and Medicaid secondary</h2>
      <p>Many MA members also have Medicaid. Bill the MA plan first, then bill Medicaid as secondary for the remaining cost sharing, following your state’s rules. Crossover from an MA plan to Medicaid does not always happen automatically the way it often does with Original Medicare, so check whether you need to submit the secondary claim yourself. Some D-SNPs pay both sides in one process. Members in the Qualified Medicare Beneficiary (QMB) program generally cannot be billed for Medicare cost sharing, and that protection applies in MA too. See <Link href="/blog/coordination-of-benefits-secondary-claims">coordination of benefits and secondary claims</Link>.</p>

      <h2>Common Medicare Advantage denials</h2>
      <ul>
        <li><strong>Billed to Medicare instead of the plan:</strong> resubmit to the MA plan as a new claim. Watch the plan’s timely filing clock.</li>
        <li><strong>No authorization or referral:</strong> check whether the plan allows retro-authorization. If an authorization existed, appeal with the number and approval date.</li>
        <li><strong>Out of network:</strong> confirm the plan type and your contract status. HMO out-of-network denials are often patient-liability questions governed by the plan’s rules, so read the notice carefully before billing the patient.</li>
        <li><strong>Wrong payer ID:</strong> the claim went to the insurer’s commercial line. Correct the payer ID and resubmit.</li>
        <li><strong>Plan policy denials:</strong> bundling, frequency, or medical necessity under the plan’s own policy. Start with our <Link href="/blog/claim-denial-codes-explained">denial codes guide</Link>, then appeal through the plan’s process if the claim was correct.</li>
      </ul>

      <Callout title="January 1 is the busiest day for plan changes">
        Medicare’s Annual Enrollment Period runs October 15 to December 7, with changes effective January 1. MA members can also make a change during the Medicare Advantage Open Enrollment Period from January 1 to March 31. Re-verify every Medicare patient in January, and again at each visit early in the year.
      </Callout>

      <h2>Frequently asked questions</h2>
      <h3>Can I bill Original Medicare if the MA plan denies the claim?</h3>
      <p>No. If the patient was enrolled in MA on the date of service, the MA plan is responsible for covered services, except for specific carve-outs such as hospice. Work the denial with the plan through its reconsideration or appeal process.</p>
      <h3>How do I know if a patient switched from MA back to Original Medicare?</h3>
      <p>Run a Medicare eligibility check for the date of service. The response shows MA enrollment periods. If no MA plan is listed for that date, bill the MAC.</p>
      <h3>Do I need a contract to see an MA patient?</h3>
      <p>Not always. PPO and PFFS members may see non-contracted providers, and emergency care is covered regardless. HMO members generally need in-network care. Check the plan type and the plan’s rules for non-contracted providers before the visit.</p>
      <h3>Does Medigap pay secondary to an MA plan?</h3>
      <p>No. Medigap policies work with Original Medicare, not Medicare Advantage. If an MA member presents a Medigap card, verify coverage with both carriers.</p>

      <p><em>This guide is general information. Medicare Advantage rules, authorization lists, payment terms, and deadlines vary by plan and contract; always confirm with the plan’s provider manual, your contract, and current CMS guidance.</em></p>
    </ArticleLayout>
  );
}
