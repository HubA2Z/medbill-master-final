import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/corrected-claims-frequency-codes';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout
      slug={SLUG}
      cta={{ title: 'Corrected claims piling up?', body: 'Our billing team fixes and resubmits claims for practices every day, with the right frequency code and original claim number the first time. Start with a free 48-hour audit of your open AR.', label: 'Get a free AR audit', href: '/audit' }}
    >
      <p className="lead">
        A corrected claim is one of the most common transactions in medical billing, and one of the easiest to get wrong. Send a brand-new claim when you should have sent a replacement, and you get a duplicate denial. Send a replacement without the original claim number, and it rejects. This guide explains when to use a corrected claim, a new claim, an appeal, or a reopening, how claim frequency codes 1, 7, and 8 work, and a checklist you can use on every resubmission.
      </p>

      <h2>Corrected claim, new claim, appeal, or reopening?</h2>
      <p>Before you touch the claim, find out what happened to it. Check the clearinghouse report, the payer portal, and the ERA or EOB. The right path depends on whether the payer ever accepted and processed the claim.</p>
      <ul>
        <li><strong>New claim (frequency code 1):</strong> the claim was <em>rejected</em> by the clearinghouse or payer front end and never entered the payer’s adjudication system. There is no payer claim number to correct, so you fix the error and send it again as an original claim. See our guide to <Link href="/blog/clearinghouse-rejections-guide">clearinghouse rejections</Link>.</li>
        <li><strong>Corrected (replacement) claim, frequency code 7:</strong> the payer accepted and processed the claim (paid, denied, or partly paid), and something on it was wrong on your side. Wrong CPT or HCPCS code, missing modifier, wrong diagnosis, wrong units, wrong date of service, wrong rendering provider.</li>
        <li><strong>Void or cancel, frequency code 8:</strong> the processed claim should never have existed for that payer. For example, it went to the wrong payer, was billed under the wrong patient, or the service didn’t happen.</li>
        <li><strong>Appeal:</strong> the claim was billed correctly, but the payer’s decision is wrong. Medical necessity, bundling disputes, authorization, timely filing. Use our <Link href="/blog/medical-claim-appeal-guide">medical claim appeal guide</Link> for this path.</li>
        <li><strong>Reopening (Medicare):</strong> a request to the Medicare Administrative Contractor (MAC) to fix a clerical error or minor omission on a processed claim. More on this below.</li>
      </ul>
      <p>A simple rule: if you would change the claim data, it’s a correction. If you would change only the payer’s mind, it’s an appeal.</p>

      <h2>Claim frequency codes explained</h2>
      <p>The claim frequency code tells the payer what kind of submission it is receiving. On the 837P it sits in the CLM segment (CLM05-3). On the paper CMS-1500 it goes in the left side of box 22, labeled “Resubmission Code.”</p>
      <ul>
        <li><strong>1 – Original:</strong> the first submission of the claim. Most practice management systems send this by default, and box 22 stays blank.</li>
        <li><strong>7 – Replacement of prior claim:</strong> replaces the entire earlier claim. The payer is expected to reverse the original and process the new one in its place.</li>
        <li><strong>8 – Void/cancel of prior claim:</strong> asks the payer to cancel the original claim completely. Any payment on it is usually recouped.</li>
      </ul>
      <p>Institutional claims (UB-04 and 837I) carry the frequency code as the last digit of the type of bill. This article focuses on professional claims.</p>

      <h2>The original claim number: box 22 and REF*F8</h2>
      <p>A replacement or void claim must point to the claim it is changing. That reference is the payer’s claim control number, sometimes called the ICN (internal control number), DCN, or simply the claim number. It is the payer’s number, not your patient account number or your internal claim ID.</p>
      <ul>
        <li><strong>CMS-1500:</strong> box 22, right side, “Original Ref. No.” Enter the payer claim number exactly as it appears on the ERA or EOB.</li>
        <li><strong>837P:</strong> loop 2300, segment REF with qualifier F8 (Payer Claim Control Number), for example <code>REF*F8*&lt;payer claim number&gt;</code>.</li>
      </ul>
      <p>Where to find it: the ERA (CLP07 holds the payer claim control number), the paper EOB, or the payer portal’s claim detail screen. If a claim was split or reprocessed, there may be more than one number. Use the one for the most recent processed version, and confirm in the portal when in doubt.</p>
      <p>For box-by-box help with the rest of the form, see our <Link href="/blog/cms-1500-claim-form-guide">CMS-1500 claim form guide</Link>.</p>

      <h2>What to change, and what not to change</h2>
      <p>A replacement claim replaces the whole claim, not just the line you fixed. Payers that follow the standard treat the frequency 7 claim as the complete new version.</p>
      <ul>
        <li><strong>Resend every line,</strong> including lines that paid correctly. If you send only the corrected line, many payers will reverse the original and pay only what you resent, which takes back money you were owed.</li>
        <li><strong>Change only what was wrong.</strong> Keep the date of service, patient, and provider data the same unless one of those is the error.</li>
        <li><strong>Watch the fields many payers won’t let you replace.</strong> Many payers do not accept a replacement that changes the patient, member ID, or billing provider (NPI or tax ID). For those errors they usually want a void (frequency 8) followed by a new original claim. Check the payer’s rules.</li>
        <li><strong>Don’t add a new date of service</strong> to a replacement claim. Bill a missed visit on its own original claim.</li>
        <li><strong>Make sure the record supports the change.</strong> A corrected code must match the documentation. If you are changing a code because of a denial, review the note first, not after.</li>
      </ul>
      <p>Run the corrected claim through a <Link href="/claim-scrubber">claim scrubber</Link> before it goes out. A correction that creates a new edit failure just restarts the clock.</p>

      <h2>Payer-specific rules and timelines</h2>
      <p>Corrected-claim rules are not uniform. The standard defines the codes, but each payer decides how it handles them. Before you resubmit, check the payer’s provider manual or portal for:</p>
      <ul>
        <li>Whether it accepts frequency 7 and 8 electronically, or wants corrections through its portal or a paper form.</li>
        <li>Whether it requires a specific note in the claim (some ask for a short explanation in box 19 or the 837P NTE segment).</li>
        <li>The deadline for corrected claims. Some payers apply the original timely filing limit, some allow a set window from the date of the original processing, and contracts can change this. See our <Link href="/blog/timely-filing-limits-guide">timely filing limits guide</Link>.</li>
        <li>Rules for Medicaid and Medicare Advantage plans, which often differ from the same company’s commercial products.</li>
      </ul>

      <h2>Medicare Part B: reopenings instead of replacements</h2>
      <p>Medicare Part B has historically handled many professional-claim corrections differently from commercial payers. Instead of accepting a frequency 7 replacement, MACs generally correct clerical errors on processed claims through a <strong>reopening</strong>. Depending on the MAC, you can request one through its provider portal, by phone (often through the interactive voice response or customer service line), or in writing.</p>
      <ul>
        <li>Reopenings are meant for clerical errors and minor omissions, such as a wrong date, a missing modifier, or wrong units.</li>
        <li>Some changes cannot be made through a reopening and require a redetermination (first-level appeal) instead.</li>
        <li>Reopenings have their own time limits, set out in CMS rules and your MAC’s guidance.</li>
        <li>A claim Medicare returned as unprocessable (often with remark code MA130) has no reopening or appeal rights. Fix it and send a new claim.</li>
      </ul>
      <Callout title="Follow your MAC’s instructions">
        What a reopening can fix, how to request it, and whether the MAC accepts any corrections electronically varies by MAC and changes over time. Before you correct a Medicare Part B claim, check your MAC’s website for its current reopening instructions.
      </Callout>

      <h2>Duplicate-claim denials (CO-18)</h2>
      <p>The most common sign of a mishandled correction is CARC 18, exact duplicate claim or service, usually as CO-18. It happens when a biller fixes a processed claim and sends it again with frequency code 1. The payer sees a second claim for the same patient, date, and service, and denies it as a duplicate. The original denial still stands.</p>
      <p>To fix it:</p>
      <ol>
        <li>Confirm the original claim was processed and get its payer claim number.</li>
        <li>Resubmit as a replacement (frequency 7) with that number in box 22 or REF*F8, or follow the payer’s or MAC’s correction process.</li>
        <li>Don’t appeal the CO-18 itself. The duplicate denial is correct. The original claim is the one that needs fixing.</li>
      </ol>
      <p>CO-18 also shows up when a practice rebills a claim that is still in process. Check status in the portal before you resend anything. Our guide to <Link href="/blog/claim-denial-codes-explained">claim denial codes</Link> covers other CARCs you will see on corrections.</p>

      <h2>Corrected claim workflow checklist</h2>
      <ol>
        <li>Check claim status: rejected, in process, or processed (paid or denied)?</li>
        <li>Read the CARC and RARC on the ERA to confirm the problem is a billing error, not a payer decision.</li>
        <li>Review the documentation and confirm the correct codes, modifiers, units, and dates.</li>
        <li>Choose the path: new claim, replacement (7), void (8), appeal, or Medicare reopening.</li>
        <li>Check the payer’s corrected-claim rules and deadline.</li>
        <li>Copy the payer claim number exactly into box 22 or loop 2300 REF*F8.</li>
        <li>Include all original lines, corrected as needed.</li>
        <li>Scrub the claim, submit, and save the clearinghouse acceptance report.</li>
        <li>Log the date, reason, and follow-up date. Note any call reference with our <Link href="/call-note-builder">call note builder</Link>.</li>
        <li>Track correction reasons by provider and payer, and fix the upstream cause. See <Link href="/blog/reduce-claim-denials">how to reduce claim denials</Link>.</li>
      </ol>

      <h2>Frequently asked questions</h2>
      <h3>Can I send a corrected claim for a claim that was rejected?</h3>
      <p>Usually no. A rejected claim never entered adjudication, so there is no payer claim number to replace. Fix the error and send it as a new original claim with frequency code 1.</p>
      <h3>Do I need to resend lines that already paid?</h3>
      <p>For most payers, yes. A frequency 7 claim replaces the whole original claim, so leaving off paid lines can cause the payer to take that payment back. Check the payer’s manual if it uses a different method.</p>
      <h3>What if I don’t know the original claim number?</h3>
      <p>Look on the ERA, the EOB, or the payer portal’s claim detail. If you still can’t find it, call the payer and note the reference number. Don’t use your own account number in its place.</p>
      <h3>Is a corrected claim the same as an appeal?</h3>
      <p>No. A corrected claim fixes an error in the claim data. An appeal asks the payer to reconsider a decision on a claim that was billed correctly.</p>

      <p><em>This guide is general information. Corrected-claim, void, and reopening rules and deadlines vary by payer, MAC, and contract; always confirm with the payer’s provider manual or your MAC’s current instructions before resubmitting.</em></p>
    </ArticleLayout>
  );
}
