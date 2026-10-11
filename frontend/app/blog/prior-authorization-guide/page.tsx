import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/prior-authorization-guide';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout
      slug={SLUG}
      cta={{ title: 'Authorization denials piling up?', body: 'Our billing team tracks authorizations and works CO-197 denials for practices every day. Start with a free 48-hour audit of your authorization workflow and open denials.', label: 'Get a free authorization audit', href: '/audit' }}
    >
      <p className="lead">
        Prior authorization is the payer’s approval, obtained before the service, that a procedure, test, drug, or admission meets its coverage rules. Missing or mismatched authorizations are one of the most preventable causes of denials, and one of the hardest to fix after the fact. This guide covers what usually needs authorization, how to check requirements, how to submit and track requests, what to do after a CO-197 denial, and how Medicare Advantage, commercial plans, and Original Medicare differ.
      </p>

      <h2>What usually needs prior authorization</h2>
      <p>Every payer keeps its own list, and the lists change during the year. Services that commonly require authorization include:</p>
      <ul>
        <li>Advanced imaging such as MRI, CT, PET, and nuclear cardiology.</li>
        <li>Elective inpatient admissions and many outpatient surgeries.</li>
        <li>Specialty drugs, injectables, and infusions, including many buy-and-bill drugs given in the office.</li>
        <li>Durable medical equipment, prosthetics, orthotics, and supplies.</li>
        <li>Physical, occupational, and speech therapy after a set number of visits, depending on the plan.</li>
        <li>Behavioral health services, sleep studies, genetic testing, and pain management procedures.</li>
        <li>Home health, skilled nursing, and post-acute care.</li>
      </ul>
      <p>Note the difference between <strong>prior authorization</strong> (approval required before payment), <strong>notification</strong> (you must tell the payer, often for admissions, but approval isn’t a medical review), and <strong>referrals</strong> (a PCP’s order for a specialist visit, common with HMO plans). A claim can deny for any of these, so know which one the plan requires.</p>

      <h2>How to check authorization requirements</h2>
      <ol>
        <li><strong>Verify eligibility first.</strong> The plan type and group determine which rules apply. Our <Link href="/blog/insurance-eligibility-verification-guide">eligibility verification guide</Link> covers what to confirm.</li>
        <li><strong>Check the payer’s prior authorization list</strong> on its provider website. Many lists are organized by CPT or HCPCS code and updated on a schedule, so check the current version, not a saved copy.</li>
        <li><strong>Check for a delegated vendor.</strong> Many plans hand off imaging, therapy, cardiology, or oncology reviews to a utilization management company. The member’s card or the payer’s list will say where to submit.</li>
        <li><strong>Use the portal’s authorization tool.</strong> Many payers, and multi-payer portals such as Availity, let you enter the codes and get a “required” or “not required” answer. Save a screenshot or reference number when the answer is “not required.”</li>
        <li><strong>Call when in doubt</strong> and document the representative’s name, date, and call reference number.</li>
      </ol>

      <h2>Submitting the request</h2>
      <p>Submission methods vary by payer and service:</p>
      <ul>
        <li><strong>Portal:</strong> the fastest option in most cases. You get a case number right away and can upload records.</li>
        <li><strong>Phone:</strong> still used for some urgent requests and smaller plans. Always ask for a reference number.</li>
        <li><strong>Fax:</strong> some payers and vendors still require a specific fax form. Use the current version from the payer’s site and keep the fax confirmation.</li>
        <li><strong>Electronic prior authorization (ePA) for drugs:</strong> pharmacy-benefit drugs are usually requested through ePA tools built into many EHRs or offered by ePA platforms. Medical-benefit drugs given in the office often go through the medical plan instead, so confirm which benefit covers the drug.</li>
      </ul>
      <p>Include the patient’s demographics and member ID, the ordering and rendering provider with NPIs, the facility, the CPT or HCPCS codes, ICD-10 diagnosis codes, number of units or visits, and the planned date of service. Use our <Link href="/icd10-intelligence">ICD-10 lookup</Link> to make sure the diagnosis codes are valid and specific.</p>

      <h3>Clinical documentation</h3>
      <p>Most authorization denials come down to records that don’t show the payer’s criteria. Before you submit, pull the payer’s clinical policy for the service and match it point by point:</p>
      <ul>
        <li>Symptoms, duration, and exam findings.</li>
        <li>Conservative treatment tried and how long, such as medication, therapy, or injections.</li>
        <li>Prior imaging or test results.</li>
        <li>The provider’s reasoning for why this service is needed now.</li>
      </ul>

      <h3>Urgent and expedited requests</h3>
      <p>When waiting for a standard decision could seriously harm the patient’s health, the provider can request an expedited review. Use the payer’s urgent option, and have the provider’s statement of urgency in the notes. Don’t mark routine requests as urgent; reviewers notice, and it can slow down true urgent cases. True emergencies generally don’t need prior authorization, though many plans require notification of an emergency admission within a set time.</p>

      <h2>Tracking authorizations</h2>
      <p>An approval only protects the claim if the claim matches it. Record these details in your practice management system or authorization log:</p>
      <ul>
        <li>Authorization number and the payer or vendor that issued it.</li>
        <li>Approved CPT or HCPCS codes and diagnosis codes.</li>
        <li>Approved units or visits, and how many have been used.</li>
        <li>Start and end dates.</li>
        <li>Approved rendering provider and facility, including place of service.</li>
      </ul>
      <p>Put the authorization number on the claim (box 23 on the CMS-1500, or the prior authorization reference in the 837P). Set a reminder before visits run out or the end date passes. If the surgeon adds a code during the procedure or the site of service changes, contact the payer as soon as possible, because many plans allow an update within a short window after the service.</p>

      <Callout title="The most common authorization mistake">
        Getting approval for one code and billing another. If the approved CPT, units, date range, provider, or facility doesn’t match the claim, expect a denial even though an authorization exists. Run claims through our <Link href="/claim-scrubber">claim scrubber</Link> and compare them against the approval before submitting.
      </Callout>

      <h2>Retro-authorization</h2>
      <p>Some payers will consider an authorization after the service, usually for limited reasons: the patient’s coverage wasn’t known at the time, the service was urgent, or the procedure changed during surgery. Retro-authorization policies and time limits are set in the provider manual and contract. Request it as soon as you find the gap, and don’t assume it will be granted.</p>

      <h2>Peer-to-peer reviews</h2>
      <p>When a request is denied for medical necessity, many payers offer a peer-to-peer discussion between the ordering provider and the payer’s medical director. These have short deadlines. Prepare the provider with the denial reason, the payer’s policy criteria, and the key facts from the chart. If the peer-to-peer doesn’t succeed, the denial can usually be appealed in writing.</p>

      <h2>What to do after a CO-197 denial</h2>
      <p>CO-197 means precertification, authorization, notification, or pre-treatment was absent. Related codes include CO-198 (authorization exceeded) and CO-15 (authorization number missing or invalid). Look up the full code and remark code in our <Link href="/blog/claim-denial-codes-explained">denial code guide</Link>, then work through these steps:</p>
      <ol>
        <li><strong>Check whether an authorization exists.</strong> Search your log, the portal, and the chart. If one exists but was left off the claim, send a corrected claim with the number.</li>
        <li><strong>Check for a mismatch</strong> in code, units, dates, provider, or facility. If the approval can be updated, request it, then correct the claim.</li>
        <li><strong>If no authorization exists,</strong> ask about retro-authorization or show the service was an emergency.</li>
        <li><strong>Appeal</strong> with the call reference or portal record if you were told authorization wasn’t required. Our <Link href="/blog/medical-claim-appeal-guide">appeal guide</Link> walks through the process.</li>
        <li><strong>Document every call</strong> with a reference number. The <Link href="/call-note-builder">call note builder</Link> creates a consistent note.</li>
      </ol>
      <p>For an in-network provider, a CO denial for a missing authorization generally can’t be billed to the patient. Check your contract.</p>

      <h2>Medicare Advantage vs commercial vs Original Medicare</h2>
      <ul>
        <li><strong>Original Medicare</strong> generally doesn’t require prior authorization for most services. Exceptions include certain DMEPOS items, repetitive scheduled non-emergent ambulance transport, and specific hospital outpatient department services, and CMS has also tested prior authorization models for selected services in some states. Check your MAC’s website for current programs.</li>
        <li><strong>Medicare Advantage</strong> plans use prior authorization widely, and their lists often look more like commercial plans than Original Medicare. Always verify whether a Medicare patient has Original Medicare or an Advantage plan.</li>
        <li><strong>Commercial plans</strong> set rules by plan and employer group. Self-funded plans may follow different rules than fully insured plans from the same carrier.</li>
        <li><strong>Medicaid and Medicaid managed care</strong> rules vary by state and by plan.</li>
      </ul>
      <p>CMS finalized an interoperability and prior authorization rule that requires impacted payers, including Medicare Advantage, Medicaid, CHIP, and certain marketplace plans, to make prior authorization decisions faster and give clearer denial reasons, with requirements starting in 2026. Many states also have their own prior authorization laws. Check the payer’s updates for how it is applying these rules.</p>

      <h2>Frequently asked questions</h2>
      <h3>Is an authorization a guarantee of payment?</h3>
      <p>No. Most approvals state they aren’t a guarantee. The claim can still deny for eligibility, benefit limits, coding, or a mismatch with the approval.</p>
      <h3>Who is responsible for getting the authorization?</h3>
      <p>Usually the ordering or rendering provider’s office. For facility services, the facility and the ordering provider should agree on who submits, and both should confirm an approval exists before the date of service.</p>
      <h3>How long is an authorization valid?</h3>
      <p>It depends on the payer and service. The approval lists the start and end dates; services outside that range need a new or extended authorization.</p>
      <h3>Does the patient need authorization for out-of-network care?</h3>
      <p>Often, yes, especially for HMO and EPO plans that don’t cover out-of-network care without approval. Check the plan’s rules during scheduling, not after the service.</p>

      <p><em>This guide is general information. Prior authorization lists, submission methods, and timelines vary by payer, plan, and state and change often; always confirm requirements with the payer before the date of service.</em></p>
    </ArticleLayout>
  );
}
