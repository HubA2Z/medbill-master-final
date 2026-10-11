import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/insurance-eligibility-verification-guide';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout
      slug={SLUG}
      cta={{ title: 'Eligibility denials eating into collections?', body: 'Our billing team verifies benefits and works eligibility denials for practices every day. Start with a free 48-hour audit of your front-end workflow and open denials.', label: 'Get a free eligibility audit', href: '/audit' }}
    >
      <p className="lead">
        Eligibility and benefits verification is the front-end check that confirms a patient’s insurance is active and tells you how the plan will treat the visit before it happens. A claim that denies for inactive coverage, the wrong payer, or a missing referral costs far more to fix than the few minutes it takes to verify. This guide covers what to verify, how to use 270/271 transactions and payer portals, when to verify, a call script, how to document the check, and the mistakes that cause eligibility denials.
      </p>

      <h2>Why verification prevents denials</h2>
      <p>Many of the denials billers work every day start at the front desk: coverage terminated, patient not found, wrong member ID, another payer primary, referral absent, or authorization missing. These show up as codes such as CO-27 (expenses incurred after coverage terminated), CO-22 (care may be covered by another payer), CO-109 (claim not covered by this payer), and CO-197 (authorization absent). See <Link href="/blog/claim-denial-codes-explained">claim denial codes explained</Link> for the full list. Each one is cheaper to catch before the visit than to work after the denial.</p>
      <p>Verification also helps patients. When the front desk knows the copay, remaining deductible, and coinsurance, it can collect the right amount at check-in and set expectations.</p>

      <h2>What to verify</h2>
      <ul>
        <li><strong>Active coverage</strong> on the date of service, with the effective date and any termination date.</li>
        <li><strong>Patient and subscriber details:</strong> name spelled as on the card, date of birth, member ID, group number, and relationship to the subscriber.</li>
        <li><strong>Plan type:</strong> HMO, PPO, EPO, POS, high-deductible plan, or a narrow-network product. Plan type drives referral and network rules.</li>
        <li><strong>PCP and referral requirements:</strong> whether the plan assigns a PCP, whether your provider is that PCP, and whether specialist visits need a referral on file.</li>
        <li><strong>Network status</strong> for the specific rendering provider and location. A practice can be in network with a carrier but out of network for a particular product.</li>
        <li><strong>Deductible and out-of-pocket accumulators:</strong> the annual amounts and how much has been met so far, for individual and family. Our guide to <Link href="/blog/deductible-vs-out-of-pocket-maximum">deductibles vs out-of-pocket maximums</Link> explains the difference.</li>
        <li><strong>Copay and coinsurance</strong> for the visit type, such as office visit, specialist, preventive, telehealth, or outpatient procedure.</li>
        <li><strong>Authorization requirements</strong> for any planned procedure, imaging, drug, or therapy. See our <Link href="/blog/prior-authorization-guide">prior authorization guide</Link>.</li>
        <li><strong>Coordination of benefits:</strong> whether another plan is primary. Ask the patient about other coverage at every visit, and check whether the payer shows a COB update is needed.</li>
        <li><strong>Benefit limits</strong> such as visit caps for therapy or chiropractic care, and frequency limits on preventive services.</li>
              </ul>

      <h3>Medicare Advantage vs Original Medicare</h3>
      <p>Patients often show a red, white, and blue Medicare card even when they’ve enrolled in a Medicare Advantage plan. Check the Medicare eligibility response for an Advantage plan enrollment on the date of service. If one is listed, bill the Advantage plan, not your MAC, and follow that plan’s network, referral, and authorization rules. Also check for Medicare Secondary Payer information, such as employer group coverage that should be primary.</p>

      <h3>Medicaid and Medicaid managed care</h3>
      <p>Medicaid eligibility can change month to month, so verify close to each visit. Many states enroll members in managed care organizations, so the state eligibility system may show active Medicaid but assign the patient to a specific plan that must be billed instead. Check the state Medicaid portal for the managed care assignment, and remember that Medicaid is generally the payer of last resort.</p>

      <h3>Primary vs secondary</h3>
      <p>Common COB rules include: an employer plan where the patient is the employee is usually primary over a plan where they’re a dependent, and for children covered by both parents, many plans use the <strong>birthday rule</strong> (the parent whose birthday falls earlier in the calendar year is primary). Medicare’s position depends on factors such as employer size and the reason for entitlement. When in doubt, confirm with both payers before billing.</p>

      <h2>270/271 transactions and payer portals</h2>
      <p>The HIPAA standard for electronic eligibility is the X12 <strong>270</strong> (eligibility inquiry) and <strong>271</strong> (eligibility response). Your practice management system or clearinghouse sends a 270, and the payer returns a 271 with coverage status and benefit details organized by service type codes. Many systems can run batch eligibility for the next day’s schedule automatically.</p>
      <p>A 271 is fast, but the detail varies by payer. Some return full accumulators and copays by service type; others return little more than active or inactive. When the 271 is thin or confusing, use the payer’s portal, or a multi-payer portal such as Availity, for the full benefit summary. Call the payer when the portal doesn’t answer the question, such as benefits for a specific CPT code, or when the information seems to conflict.</p>

      <Callout title="Electronic response is not the final word">
        A 271 or portal screen reflects what the payer has on file that day. Retroactive terminations, late COB updates, and employer changes happen. Verification lowers the risk of an eligibility denial; it doesn’t remove it. Keep a record of what you saw and when.
      </Callout>

      <h2>When to verify</h2>
      <ul>
        <li><strong>Before every visit,</strong> ideally two or three business days ahead, so there’s time to fix problems or contact the patient.</li>
        <li><strong>Again at check-in</strong> for anything that changed: ask for the current card and photo ID, and ask whether the patient has new coverage.</li>
        <li><strong>In January,</strong> re-verify every patient. Deductibles reset for most plans, employers change carriers, and plan designs change. Our <Link href="/blog/year-end-billing-checklist-2027">year-end billing checklist</Link> covers this and other new-year tasks.</li>
        <li><strong>Before scheduled procedures,</strong> along with authorization status.</li>
        <li><strong>After any denial</strong> for eligibility, before you resubmit.</li>
      </ul>

      <h2>Verification checklist and call script</h2>
      <p>When you call a payer, work from a consistent script so nothing is missed:</p>
      <ol>
        <li>Give your provider NPI and Tax ID, then the patient’s member ID, name, and date of birth.</li>
        <li>“Is the coverage active for date of service [date]? What is the effective date, and is there a termination date?”</li>
        <li>“What is the plan type? Is the provider in network for this plan at this location?”</li>
        <li>“Is a PCP assigned? Is a referral required for this specialist visit?”</li>
        <li>“What is the deductible, and how much is met? What is the out-of-pocket maximum, and how much is met?”</li>
        <li>“What is the copay or coinsurance for [visit type or CPT code]? Does the deductible apply?”</li>
        <li>“Does [CPT code] require prior authorization? Who handles it?”</li>
        <li>“Is there other insurance on file? Is a COB update needed?”</li>
        <li>“Can I have your name and a call reference number?”</li>
      </ol>

      <h2>How to document the verification</h2>
      <p>Write the same note every time, in the patient’s account or appointment, so anyone on the team can read it. A simple format works:</p>
      <div className="not-prose my-8 rounded-2xl border border-line bg-bg-soft p-6 font-mono text-[13px] leading-relaxed text-ink-2 whitespace-pre-wrap">{`[MM/DD]- ELIG VERIFIED [PAYER] [PLAN TYPE] ACTIVE EFF [MM/DD/YY]
IN-NET: [Y/N]  PCP: [name / N/A]  REF REQ: [Y/N]
DED [amount] MET [amount]  OOP [amount] MET [amount]
COPAY [amount] / COINS [%]  AUTH REQ: [Y/N]  COB: [primary/secondary]
SOURCE: [271 / portal / call]  REF# [number]  REP: [name]  -[initials]`}</div>
      <p>For calls, our <Link href="/call-note-builder">call note builder</Link> produces a consistent note with the reference number in seconds.</p>

      <h2>Common pitfalls</h2>
      <ul>
        <li><strong>Verifying the carrier, not the plan.</strong> Network and benefits depend on the specific product, not just the insurance company name.</li>
        <li><strong>Skipping verification for established patients.</strong> Coverage changes without warning, especially at the start of the year or after a job change.</li>
        <li><strong>Name or ID mismatches.</strong> A name that doesn’t match the payer’s record exactly is a common cause of “patient not found” rejections.</li>
        <li><strong>Missing a Medicare Advantage enrollment.</strong> Billing Original Medicare for an Advantage member leads to a denial and a delay.</li>
        <li><strong>Not documenting the source.</strong> Without a date, source, and reference number, you have nothing to appeal with if the payer was wrong.</li>
        <li><strong>Ignoring the referral.</strong> For HMO and some POS plans, a missing referral can deny an otherwise clean claim.</li>
      </ul>
      <p>Clean front-end data also makes coding work easier downstream. See <Link href="/blog/medical-billing-vs-medical-coding">medical billing vs medical coding</Link> for how the handoffs work across the revenue cycle.</p>

      <h2>Frequently asked questions</h2>
      <h3>What is the difference between eligibility and benefits verification?</h3>
      <p>Eligibility confirms the patient has active coverage with that payer on the date of service. Benefits verification goes further and confirms what the plan covers and what the patient will owe, such as deductible, copay, coinsurance, limits, and authorization rules.</p>
      <h3>How far in advance should we verify?</h3>
      <p>Two to three business days before the visit is a common practice, with a quick re-check at check-in. Procedures and high-cost services may need verification earlier, along with authorization.</p>
      <h3>Can we bill the patient if coverage was terminated?</h3>
      <p>Usually, yes, if the patient had no active coverage on the date of service, but check whether other coverage exists and follow your financial policy. If the payer terminated coverage retroactively after paying, it may request a refund, and the patient’s new coverage may need to be billed.</p>
      <h3>Is a payer’s eligibility response a guarantee of payment?</h3>
      <p>No. Payers state that eligibility and benefit information isn’t a guarantee. Keep the record of what you verified, and appeal if the claim denies against information the payer gave you.</p>

      <p><em>This guide is general information. Eligibility rules, coordination of benefits, and benefit details vary by payer, plan, and state; always confirm with the payer for each patient and date of service.</em></p>
    </ArticleLayout>
  );
}
