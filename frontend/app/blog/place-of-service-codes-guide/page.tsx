import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/place-of-service-codes-guide';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout
      slug={SLUG}
      cta={{ title: 'Are POS errors costing you?', body: 'Our billing team reviews place of service, modifiers, and payment rates on every claim we work. Start with a free 48-hour audit of your recent claims.', label: 'Get a free claim audit', href: '/audit' }}
    >
      <p className="lead">
        The place of service (POS) code is two digits in box 24B of the CMS-1500 (or the 837P), and it does more work than it looks. It tells the payer where the service happened, and for Medicare and many commercial payers it affects how much the professional service pays. A wrong POS can underpay a claim, overpay it and invite a recoupment, or get it denied. This guide covers the POS codes billers use most, how facility and non-facility pricing works, and how to avoid POS-related denials.
      </p>

      <h2>What a place of service code is</h2>
      <p>CMS maintains the POS code set for professional claims. Each code describes a setting: an office, a hospital, a patient’s home, a nursing facility. You report one POS per service line. The POS should describe where the patient received the service, which the documentation must support.</p>
      <p>POS codes are used on professional claims (CMS-1500 and 837P). Institutional claims from hospitals and facilities use the type of bill instead. For the rest of the claim form, see our <Link href="/blog/cms-1500-claim-form-guide">CMS-1500 claim form guide</Link>.</p>

      <h2>The POS codes billers use most</h2>
      <div className="not-prose overflow-x-auto my-6">
        <table className="table-clinical min-w-[560px]">
          <thead>
            <tr><th scope="col">POS</th><th scope="col">Setting</th><th scope="col">Typical use</th></tr>
          </thead>
          <tbody>
            <tr><td>11</td><td>Office</td><td>Physician or practitioner office visits and in-office procedures</td></tr>
            <tr><td>02</td><td>Telehealth provided other than in patient’s home</td><td>Patient is at a location other than home, such as a clinic</td></tr>
            <tr><td>10</td><td>Telehealth provided in patient’s home</td><td>Patient is at home (or another private location) during the telehealth visit</td></tr>
            <tr><td>12</td><td>Home</td><td>In-person visit at the patient’s private residence</td></tr>
            <tr><td>19</td><td>Off campus-outpatient hospital</td><td>Hospital outpatient department located off the main campus</td></tr>
            <tr><td>22</td><td>On campus-outpatient hospital</td><td>Hospital outpatient department on the main campus</td></tr>
            <tr><td>23</td><td>Emergency room–hospital</td><td>Services in a hospital emergency department</td></tr>
            <tr><td>21</td><td>Inpatient hospital</td><td>Services to a registered hospital inpatient</td></tr>
            <tr><td>20</td><td>Urgent care facility</td><td>Freestanding urgent care center</td></tr>
            <tr><td>31</td><td>Skilled nursing facility</td><td>Patient in a SNF receiving skilled care</td></tr>
            <tr><td>32</td><td>Nursing facility</td><td>Patient in a nursing facility (long-term care)</td></tr>
            <tr><td>81</td><td>Independent laboratory</td><td>Lab independent of a hospital and of a physician office</td></tr>
          </tbody>
        </table>
      </div>
      <p>A few distinctions cause most of the confusion:</p>
      <ul>
        <li><strong>11 vs 19/22:</strong> if the clinic is a provider-based hospital outpatient department, it is not POS 11, even if it looks like an office. Ask the practice or hospital how the location is enrolled.</li>
        <li><strong>19 vs 22:</strong> both are hospital outpatient. The difference is whether the department is on or off the hospital’s main campus.</li>
        <li><strong>20 vs 11 vs 23:</strong> an urgent care center uses 20. A practice that offers walk-in hours in its office still uses 11. A hospital ED uses 23.</li>
        <li><strong>31 vs 32:</strong> POS 31 is a skilled nursing facility. POS 32 is a nursing facility. Which applies depends on the facility and the patient’s status. Confirm with the facility.</li>
        <li><strong>12 vs 10:</strong> 12 is an in-person home visit. 10 is a telehealth visit with the patient at home.</li>
      </ul>

      <h2>Facility vs non-facility payment under the Medicare PFS</h2>
      <p>The Medicare Physician Fee Schedule (PFS) assigns relative value units (RVUs) to each service: work, practice expense, and malpractice. The practice expense part covers the cost of staff, space, equipment, and supplies. The PFS has two practice expense values for many services:</p>
      <ul>
        <li><strong>Non-facility rate:</strong> used when the practice bears those costs itself, for example in an office (POS 11). It is usually higher.</li>
        <li><strong>Facility rate:</strong> used when the service happens in a facility such as a hospital, ED, or SNF. The facility bills separately for its own costs, so the professional payment is usually lower.</li>
      </ul>
      <p>The POS on the claim decides which rate applies. CMS publishes which POS codes are paid at facility vs non-facility rates. Hospital settings such as 19, 21, 22, and 23, and SNF (31), are paid at the facility rate. Office (11), home (12), and urgent care (20) are paid at the non-facility rate. Many commercial contracts follow the same concept, but check your fee schedules.</p>
      <p>That is why billing POS 11 for a service in a hospital outpatient department is a compliance problem, not a small error: it pays the higher non-facility rate when the facility is also billing for its costs. Payers find these through audits and recoup the difference.</p>

      <h2>Telehealth POS: rules have changed, so confirm the current ones</h2>
      <p>POS 02 originally covered all telehealth. CMS later revised its description and added POS 10 for telehealth in the patient’s home. Since then, Medicare and other payers have changed several times how they want telehealth reported, including which POS to use, whether to add modifier 95, and whether a telehealth visit pays at the facility or non-facility rate.</p>
      <ul>
        <li>For Medicare, check the current year’s PFS final rule and MLN guidance on telehealth, and your MAC’s instructions.</li>
        <li>For commercial plans, Medicaid, and Medicare Advantage, follow each payer’s telehealth policy. Some want POS 02 or 10, and some want the POS where the visit would have happened in person, plus a modifier.</li>
        <li>Document where the patient and the provider were during the visit, so you can support whichever rule applies.</li>
      </ul>
      <p>See our <Link href="/blog/telehealth-billing-guide">telehealth billing guide</Link> for codes, modifiers, and documentation.</p>

      <h2>POS must match the claim and the documentation</h2>
      <p>The POS has to agree with everything else on the claim:</p>
      <ul>
        <li><strong>The procedure code.</strong> Some codes describe a setting. Inpatient E/M codes don’t belong on a POS 11 claim, and office visit codes don’t belong on a POS 21 claim. Nursing facility visits use their own E/M codes. See our <Link href="/blog/em-coding-2026">E/M coding guide</Link>.</li>
        <li><strong>The service facility.</strong> If the POS is a hospital or nursing facility, box 32 (or loop 2310C) usually needs that facility’s name, address, and often its NPI.</li>
        <li><strong>The note.</strong> The documentation should show where the service happened, and for telehealth, where the patient and the provider were and that the visit used audio-video (or audio-only where allowed).</li>
        <li><strong>The patient’s status.</strong> Medicare has specific rules for professional services to patients who are registered hospital inpatients or outpatients. For those patients, the POS generally reflects the hospital setting. Check the Medicare Claims Processing Manual (Pub. 100-04, Chapter 26) and your MAC’s guidance.</li>
      </ul>
      <p>Our <Link href="/claim-scrubber">claim scrubber</Link> can flag code and setting mismatches before the claim goes out.</p>

      <h2>Common POS-related denials</h2>
      <ul>
        <li><strong>CO-5:</strong> the procedure code or bill type is inconsistent with the place of service. Common when the E/M category doesn’t match the POS.</li>
        <li><strong>CO-58:</strong> treatment was deemed to have been rendered in an inappropriate or invalid place of service. Common with telehealth and with services a payer only covers in certain settings.</li>
        <li><strong>Remark code M77:</strong> missing, incomplete, or invalid place of service, often paired with a CARC like CO-16.</li>
        <li><strong>Underpayment with no denial:</strong> a facility POS on an office service pays the lower facility rate. It won’t show up as a denial, so compare payments against your fee schedule during posting.</li>
        <li><strong>Overpayment and recoupment:</strong> a non-facility POS on a facility service may pay at first, then get recouped in an audit.</li>
      </ul>
      <p>For other codes you will see alongside these, see <Link href="/blog/claim-denial-codes-explained">claim denial codes explained</Link>. To fix a claim with the wrong POS, send a corrected claim or follow your MAC’s reopening process. See our guide to <Link href="/blog/corrected-claims-frequency-codes">corrected claims</Link>.</p>

      <Callout title="Set POS at the location level">
        Most POS errors come from system setup. Set a default POS for each location in your practice management system, and require staff to change it for hospital, nursing facility, home, and telehealth visits. Review location defaults whenever a practice adds a site or a provider starts seeing patients somewhere new.
      </Callout>

      <h2>Frequently asked questions</h2>
      <h3>Does POS affect payment for commercial payers?</h3>
      <p>Often, yes. Many commercial fee schedules use facility and non-facility rates like Medicare, and some payers only cover certain services in certain settings. Check your contract and the payer’s policies.</p>
      <h3>What POS do I use for a hospital-owned clinic?</h3>
      <p>If the clinic is a provider-based hospital outpatient department, use 19 (off campus) or 22 (on campus), not 11. If it is a freestanding practice the hospital owns but does not bill as a hospital department, it may be 11. Confirm how the location is enrolled.</p>
      <h3>Can I use one POS for every line on a claim?</h3>
      <p>Most claims have one setting, so the POS is usually the same on every line. If services truly happened in different settings, each line must show its own POS, and some payers want separate claims.</p>
      <h3>Is POS 02 still used for telehealth?</h3>
      <p>Yes, for telehealth when the patient is not at home. POS 10 is for telehealth in the patient’s home. Payer rules on which to use have changed over time, so confirm current CMS and payer instructions.</p>

      <p><em>This guide is general information. POS definitions, telehealth rules, and payment policies change and vary by payer; always confirm with the current CMS POS code set, your MAC, or the payer’s provider manual.</em></p>
    </ArticleLayout>
  );
}
