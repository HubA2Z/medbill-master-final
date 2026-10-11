import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/telehealth-billing-guide';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout
      slug={SLUG}
      cta={{ title: 'Telehealth claims coming back denied?', body: 'Our billing team reviews telehealth place of service, modifiers, and documentation every day. Start with a free 48-hour audit of your open telehealth denials.', label: 'Get a free telehealth audit', href: '/audit' }}
    >
      <p className="lead">
        Telehealth claims fail for small, fixable reasons: the wrong place of service, a missing or outdated modifier, or a note that never says how the visit happened. The rules also move. Medicare has extended its telehealth flexibilities several times, commercial plans write their own policies, and state laws differ. This guide covers what a billing team needs to get telehealth claims paid: POS 02 vs 10, modifiers 95, 93, FQ, and GT, documentation, virtual check-ins, and the denials you will see most.
      </p>

      <h2>Start with the date of service, not the current rules</h2>
      <p>Medicare’s telehealth rules have changed many times since 2020. Some flexibilities are now permanent. Others, such as relaxed geographic and originating site requirements for many non-behavioral services, have depended on temporary extensions passed by Congress, and some have briefly lapsed between extensions. That means the rule that applies is the rule in effect <strong>on the date of service</strong>, not the date you bill.</p>
      <ul>
        <li>Check your MAC’s website and the CMS telehealth pages for the current status before you set up claim rules for a new period.</li>
        <li>Read the Medicare Learning Network (MLN) telehealth booklet and the latest Physician Fee Schedule final rule for place of service and modifier instructions.</li>
        <li>When an extension is pending, hold or flag affected claims according to your MAC’s guidance instead of guessing.</li>
      </ul>
      <p>Medicare Advantage plans, Medicaid programs, and commercial payers can follow Medicare, go further, or be stricter. Treat each as its own policy.</p>

      <h2>POS 02 vs POS 10</h2>
      <p>Two place of service codes describe telehealth. The difference is where the patient is. For a full list of codes, see our <Link href="/blog/place-of-service-codes-guide">place of service codes guide</Link>.</p>
      <div className="not-prose overflow-x-auto my-6">
        <table className="table-clinical">
          <thead>
            <tr>
              <th>Code</th>
              <th>Patient location</th>
              <th>What to watch</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>POS 02</td>
              <td>Somewhere other than their home, such as a clinic or hospital acting as the originating site</td>
              <td>Medicare has generally paid POS 02 at the facility rate. Confirm the originating site rules for the date of service.</td>
            </tr>
            <tr>
              <td>POS 10</td>
              <td>In their home, or another private location such as a hotel or workplace</td>
              <td>Medicare has paid POS 10 at the non-facility rate. Some commercial payers still ask for the in-person POS instead.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Not every payer uses POS 02 and 10. Some commercial and Medicaid plans tell you to report the POS you would have used in person (for example, 11 for the office) and add modifier 95. During the public health emergency, Medicare asked for the same approach. Check each payer’s current telehealth policy and build the rule into your claim setup so billers don’t have to remember it.</p>

      <h2>Telehealth modifiers: 95, 93, FQ, and GT</h2>
      <ul>
        <li><strong>Modifier 95:</strong> synchronous telemedicine using real-time interactive audio and video. This is the most common telehealth modifier on professional claims for payers that require one.</li>
        <li><strong>Modifier 93:</strong> synchronous telemedicine using audio only. Use it when the visit was a phone call, the code allows audio-only delivery, and the payer accepts audio-only for that service.</li>
        <li><strong>Modifier FQ:</strong> audio-only service furnished by a rural health clinic (RHC) or federally qualified health center (FQHC). It follows Medicare’s RHC/FQHC billing instructions, which differ from professional claims.</li>
        <li><strong>Modifier GT:</strong> the older interactive audio and video modifier. Medicare largely replaced it with 95 on professional claims, and its remaining uses are mostly institutional (for example, certain critical access hospital billing). A few payers still ask for it. Use it only when the payer’s policy says to.</li>
      </ul>
      <p>Don’t add modifiers out of habit. A modifier the payer doesn’t expect can cause a denial just as easily as a missing one. Run claims through our <Link href="/claim-scrubber">claim scrubber</Link> to catch modifier and POS combinations that don’t fit.</p>

      <h2>Which services can be billed as telehealth</h2>
      <p>For Medicare, a service must be on the <strong>Medicare Telehealth Services List</strong>, which CMS updates through the annual fee schedule rule. The list marks some services as provisional and notes which may be furnished audio-only. If the code isn’t on the list for the date of service, Medicare won’t pay it as telehealth.</p>
      <p>Commercial payers publish their own lists or code sets. Many states have telehealth <strong>parity laws</strong> that require state-regulated plans to cover telehealth, and sometimes to pay at the same rate as in person. Parity laws vary widely and usually don’t apply to self-funded employer plans governed by ERISA. Verify coverage for the patient’s plan during <Link href="/blog/insurance-eligibility-verification-guide">eligibility verification</Link>, not after the denial.</p>
      <p>E/M levels for telehealth visits are chosen the same way as in person, by medical decision making or total time. See our <Link href="/blog/em-coding-2026">E/M coding guide</Link>. CPT also includes a newer family of telemedicine E/M codes (98000–98015). Payer recognition of these codes varies, and Medicare has not adopted most of them, so check payer policy before using them.</p>

      <h2>Virtual check-ins and e-visits are not telehealth visits</h2>
      <p>Communication technology-based services are a separate category. They are not on the telehealth list, they don’t use POS 02 or 10 the same way, and they have their own rules about established patients, timing, and consent. Common codes include:</p>
      <ul>
        <li><strong>Virtual check-in:</strong> G2012, which Medicare replaced with CPT 98016 beginning in 2025. Check which code each payer accepts for the date of service.</li>
        <li><strong>Remote evaluation of recorded images or video:</strong> G2010.</li>
        <li><strong>E-visits through a patient portal:</strong> 99421–99423 for physicians and other qualified health professionals, and G2061–G2063 for certain other practitioners under Medicare.</li>
      </ul>
      <p>These services usually can’t be billed if they lead to a visit soon after or relate to a recent visit, and the time frames are defined in the code rules. Read the CMS and CPT instructions before billing them.</p>

      <h2>Documentation every telehealth note needs</h2>
      <p>Payers audit telehealth visits. The note should show, on its face, that the visit happened the way the claim says it did.</p>
      <ul>
        <li><strong>Modality:</strong> audio and video, or audio only. If audio only, why video wasn’t used when the payer requires a reason.</li>
        <li><strong>Patient location:</strong> home or another site, and the state the patient was in. State licensure depends on where the patient is.</li>
        <li><strong>Provider location:</strong> where the practitioner was during the visit. Follow Medicare and payer instructions on which address to report for the rendering provider.</li>
        <li><strong>Consent:</strong> document patient consent where the payer, state, or service requires it. Virtual check-ins and some care management services have their own consent requirements.</li>
        <li><strong>Time:</strong> start and end time or total time when the code or level is selected by time.</li>
        <li><strong>Participants:</strong> anyone else on the call, such as a caregiver or interpreter.</li>
      </ul>

      <Callout title="Build telehealth into templates">
        Add required fields for modality, patient location, provider location, and consent to your telehealth visit template. It is much easier than chasing addenda after a payer requests records.
      </Callout>

      <h2>Common telehealth denials and how to fix them</h2>
      <ul>
        <li><strong>Wrong POS:</strong> POS 02 or 10 sent to a payer that wants the in-person POS with modifier 95, or the reverse. Correct the claim and resubmit as a replacement. See our guide to <Link href="/blog/corrected-claims-frequency-codes">corrected claims and frequency codes</Link>.</li>
        <li><strong>Missing or wrong modifier:</strong> 95 left off, 93 used for a service that isn’t allowed audio-only, or GT sent where 95 is required. Fix and resubmit.</li>
        <li><strong>Service not covered as telehealth:</strong> the code isn’t on the payer’s telehealth list for that date. Check the list and the plan’s benefits. If the service truly isn’t covered, follow the payer’s rules on patient liability before billing the patient.</li>
        <li><strong>Originating site or geographic requirements not met:</strong> this can happen for Medicare dates of service when a flexibility had lapsed. Confirm the rule on the date of service before appealing.</li>
        <li><strong>Provider not licensed or enrolled:</strong> the practitioner must be licensed in the patient’s state and enrolled with the payer. See <Link href="/blog/provider-credentialing-enrollment-guide">credentialing and enrollment</Link>.</li>
        <li><strong>Documentation doesn’t support telehealth:</strong> the note doesn’t state modality or locations. If the information is missing, an appeal is unlikely to succeed.</li>
      </ul>
      <p>Read the CARC and RARC on the remit first. Our <Link href="/blog/claim-denial-codes-explained">denial codes guide</Link> explains them, and the <Link href="/blog/medical-claim-appeal-guide">appeal guide</Link> covers when to correct versus appeal.</p>

      <h2>Frequently asked questions</h2>
      <h3>Should I use POS 02 or POS 10 for a patient at home?</h3>
      <p>POS 10 is the code for telehealth provided in the patient’s home. Some payers still want the in-person POS with modifier 95 instead, so check each payer’s telehealth policy.</p>
      <h3>Is modifier GT still used?</h3>
      <p>Rarely on professional claims. Medicare largely replaced it with modifier 95, and its remaining uses are mostly institutional. Use GT only when a payer’s policy specifically asks for it.</p>
      <h3>Can I bill an audio-only visit?</h3>
      <p>Sometimes. The code must allow audio-only delivery, the payer must accept it, and the note must document that the visit was audio only. Use modifier 93, or FQ for RHC and FQHC claims, when the payer requires it.</p>
      <h3>When do the Medicare telehealth flexibilities end?</h3>
      <p>It depends on the flexibility. Some are permanent, and others depend on extensions from Congress. Check the CMS telehealth pages and your MAC for the status on each date of service.</p>

      <p><em>This guide is general information. Telehealth coverage, place of service, and modifier rules vary by payer, state, plan type, and date of service; always confirm with the payer’s current telehealth policy, your MAC, and CMS guidance before billing.</em></p>
    </ArticleLayout>
  );
}
