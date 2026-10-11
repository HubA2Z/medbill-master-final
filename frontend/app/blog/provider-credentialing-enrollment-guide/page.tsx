import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/provider-credentialing-enrollment-guide';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout
      slug={SLUG}
      cta={{ title: 'New provider claims piling up?', body: 'Our billing team tracks enrollment, holds and releases claims, and works enrollment-related denials for practices every day. Start with a free 48-hour audit of your open AR.', label: 'Get a free AR audit', href: '/audit' }}
    >
      <p className="lead">
        A new provider can see patients on day one, but the practice can’t get paid until that provider is enrolled with each payer and linked to the group. When enrollment lags, claims deny, timely filing clocks keep running, and AR grows. This guide explains credentialing, enrollment, and contracting, the NPI and CAQH basics, Medicare enrollment through PECOS, and what the billing team should do while a provider is pending.
      </p>

      <h2>Credentialing vs enrollment vs contracting</h2>
      <p>These terms get used as if they mean the same thing. They don’t, and mixing them up leads to missed steps.</p>
      <ul>
        <li><strong>Credentialing</strong> is the payer’s (or hospital’s) review of the provider’s qualifications: education, training, license, board certification, malpractice coverage and history, work history, and sanctions. It answers “is this provider qualified?”</li>
        <li><strong>Enrollment</strong> is getting the provider set up in the payer’s system so claims with that provider’s NPI can be processed and paid. For Medicare and Medicaid, enrollment is the main process.</li>
        <li><strong>Contracting</strong> is the agreement that sets the provider or group as in-network, with a fee schedule and terms. A group may already have a contract, with each new provider added to it after credentialing.</li>
      </ul>
      <p>For commercial plans, a provider usually needs all three to be paid at in-network rates. Ask the payer which steps apply and get each approval in writing, with an effective date.</p>

      <h2>NPI basics: Type 1 vs Type 2</h2>
      <p>Every provider and organization that bills needs a National Provider Identifier, issued through the National Plan and Provider Enumeration System (NPPES).</p>
      <ul>
        <li><strong>Type 1 NPI</strong> belongs to an individual, such as a physician, nurse practitioner, or therapist. It stays with the person for life, across every job.</li>
        <li><strong>Type 2 NPI</strong> belongs to an organization, such as a group practice, clinic, or hospital.</li>
      </ul>
      <p>On a group claim, the rendering provider’s Type 1 NPI and the billing group’s Type 2 NPI usually both appear (see our <Link href="/blog/cms-1500-claim-form-guide">CMS-1500 claim form guide</Link>). Keep NPPES data current: address, taxonomy, and practice location. Payers compare claim data to enrollment records, and mismatches cause rejections.</p>

      <h2>CAQH ProView</h2>
      <p>Most commercial payers pull credentialing data from the provider’s CAQH ProView profile instead of collecting paper applications. The profile holds licenses, DEA and board certifications, malpractice insurance, work history, practice locations, and supporting documents.</p>
      <ul>
        <li>Complete every section and upload current documents.</li>
        <li>Authorize each payer you’re applying to so it can see the profile.</li>
        <li><strong>Re-attest regularly.</strong> CAQH requires periodic re-attestation (currently every 120 days). A lapsed attestation can stall a new application or affect recredentialing.</li>
        <li>Update the profile when a license, malpractice policy, or certificate is renewed.</li>
      </ul>

      <h2>Medicare enrollment through PECOS</h2>
      <p>Medicare enrollment runs through PECOS (Provider Enrollment, Chain, and Ownership System), the online system for CMS-855 applications. At a high level:</p>
      <ul>
        <li><strong>CMS-855I</strong> enrolls an individual physician or non-physician practitioner.</li>
        <li><strong>CMS-855B</strong> enrolls a clinic, group practice, or certain other suppliers.</li>
        <li><strong>CMS-855R</strong> reassigns the individual’s Medicare benefits to the group, so the group can bill under its own number for that provider’s services. CMS has been updating its forms, and reassignment may now be handled within the 855I, so check the current version in PECOS.</li>
        <li><strong>CMS-855O</strong> is for providers who only order or refer and don’t bill Medicare.</li>
      </ul>
      <p>The application is processed by the MAC for your jurisdiction. Respond quickly to any development request, because unanswered requests can lead to rejection. After approval, keep enrollment current: report changes such as a new practice location or ownership within CMS deadlines.</p>
      <h3>Revalidation</h3>
      <p>Medicare requires providers and suppliers to revalidate enrollment, generally every five years (DMEPOS suppliers revalidate more often). CMS posts due dates on its revalidation lookup tool. If revalidation is missed, billing privileges can be deactivated, and claims will deny until the problem is fixed. Put each provider’s due date on your tracker.</p>

      <h2>Medicaid and commercial enrollment</h2>
      <ul>
        <li><strong>Medicaid:</strong> each state runs its own enrollment, usually through a state portal. Some states require Medicare enrollment first for certain provider types. Medicaid managed care plans often require a separate credentialing step on top of state enrollment. Ordering and referring providers on Medicaid claims generally must be enrolled too.</li>
        <li><strong>Commercial payers:</strong> each plan has its own application, often starting with a request to join the network, followed by credentialing through CAQH and a contract or roster addition. Some networks are closed to new providers in certain specialties or areas.</li>
        <li><strong>Medicare Advantage:</strong> plans credential providers separately from Original Medicare. Being enrolled in Medicare doesn’t make a provider in-network with an MA plan.</li>
      </ul>

      <h2>Effective dates and retroactive billing</h2>
      <p>The effective date decides which claims can be paid. Rules vary widely:</p>
      <ul>
        <li><strong>Medicare</strong> sets an effective date based on when the application was filed and when the provider began seeing patients at that location. It generally allows limited retrospective billing for services before the approval, but the window is short. Check the current rules in the Medicare Program Integrity Manual or on your MAC’s website.</li>
        <li><strong>Medicaid</strong> retroactive rules are set by each state.</li>
        <li><strong>Commercial payers</strong> often make the effective date the date credentialing or contracting is complete, with no retroactive coverage. Some allow a retro date by contract. Ask, and get the answer in writing.</li>
      </ul>
      <p>Never assume the start date of employment is the enrollment effective date.</p>

      <Callout title="Don’t bill under another provider’s NPI">
        Billing a pending provider’s services under a different, enrolled provider’s NPI misrepresents who performed the service. Only use an alternative when a specific payer rule allows it, such as Medicare’s rules for substitute (locum tenens) physicians, and follow those rules exactly.
      </Callout>

      <h2>What billing should do while a provider is pending</h2>
      <ol>
        <li><strong>Get the real status.</strong> Ask the credentialing team for each payer: application submitted, in process, approved, effective date, and provider ID if one is assigned.</li>
        <li><strong>Hold claims in a dedicated queue.</strong> Create a hold reason in your practice management system (for example, “Credentialing pending – [payer]”) so held claims are visible and reportable.</li>
        <li><strong>Track timely filing for every held claim.</strong> The filing clock usually runs from the date of service, not the approval date. See our <Link href="/blog/timely-filing-limits-guide">timely filing limits guide</Link> and set alerts well before each deadline.</li>
        <li><strong>Decide what to do near a deadline.</strong> Some practices submit before approval to get a dated denial as proof of timely filing, then resubmit or appeal once enrolled. Ask the payer whether it accepts this approach.</li>
        <li><strong>Release claims as soon as approval arrives.</strong> Confirm the effective date covers the dates of service, then submit in batches and watch the first ERAs closely.</li>
        <li><strong>Tell the front desk.</strong> If a provider is out-of-network with a plan, patients may need to be told before the visit, or scheduled with an enrolled provider. Our <Link href="/blog/insurance-eligibility-verification-guide">eligibility verification guide</Link> covers network checks.</li>
      </ol>

      <h2>Common denials when a provider isn’t enrolled</h2>
      <ul>
        <li><strong>Provider not eligible on the date of service</strong> (often CARC B7): the rendering provider wasn’t enrolled or active on that date. Check the effective date before appealing.</li>
        <li><strong>Rendering provider not linked to the group:</strong> the provider is enrolled, but not reassigned or added to the group’s roster. Fix the linkage with the payer, then resubmit.</li>
        <li><strong>Invalid or missing rendering provider identifier:</strong> often a rejection at the clearinghouse or payer front end because the NPI doesn’t match enrollment records. See <Link href="/blog/clearinghouse-rejections-guide">clearinghouse rejections</Link>.</li>
        <li><strong>Out-of-network processing:</strong> the claim pays at out-of-network rates, or denies under an HMO plan, because the provider hasn’t been added to the contract yet.</li>
        <li><strong>Deactivated billing privileges:</strong> a missed Medicare revalidation or an unreported change.</li>
      </ul>
      <p>For code meanings, see <Link href="/blog/claim-denial-codes-explained">claim denial codes explained</Link>. When you call the payer, document who you spoke with and the reference number; our <Link href="/call-note-builder">call note builder</Link> keeps notes consistent across the team.</p>

      <h2>Credentialing tracker checklist</h2>
      <p>Keep one tracker per provider, with a row for each payer. Useful columns:</p>
      <ul>
        <li>Provider name, Type 1 NPI, taxonomy, license number and expiration</li>
        <li>Group name, Type 2 NPI, and Tax ID the provider bills under</li>
        <li>CAQH ID and last attestation date</li>
        <li>Payer, plan type, and application method</li>
        <li>Date submitted, contact name, and reference number</li>
        <li>Follow-up dates and notes from each status check</li>
        <li>Approval date, effective date, and payer provider ID</li>
        <li>Linked to group or roster (yes/no) and contract status</li>
        <li>Medicare revalidation due date and recredentialing due dates</li>
        <li>Number and value of claims on hold, plus the earliest timely filing deadline</li>
      </ul>

      <h2>Frequently asked questions</h2>
      <h3>Can a pending provider see patients?</h3>
      <p>Yes, but the practice may not be paid for those visits, or may be paid out-of-network. Hold the claims, track timely filing, and tell patients when network status affects them.</p>
      <h3>Does Medicare enrollment make a provider in-network with commercial plans?</h3>
      <p>No. Each commercial plan, Medicaid program, and Medicare Advantage plan has its own enrollment or credentialing process.</p>
      <h3>What happens if a provider misses CAQH re-attestation?</h3>
      <p>Payers may not be able to use the profile, which can stall new applications or recredentialing. Re-attest on schedule and update documents as they renew.</p>
      <h3>Can we bill retroactively once a provider is approved?</h3>
      <p>Sometimes. It depends on the payer’s effective date and its retroactive billing rules. Medicare allows a limited window; many commercial plans allow none unless the contract says otherwise.</p>

      <p><em>This guide is general information. Enrollment forms, effective date rules, and revalidation requirements change and vary by payer and state; always confirm with CMS, your MAC, the state Medicaid agency, or the payer before billing.</em></p>
    </ArticleLayout>
  );
}
