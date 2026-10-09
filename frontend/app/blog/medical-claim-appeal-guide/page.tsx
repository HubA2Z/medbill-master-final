import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/medical-claim-appeal-guide';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout
      slug={SLUG}
      coverImage="/images/blog/cover-claim-appeal.webp"
      cta={{ title: 'Too many denials to appeal?', body: 'Our billing team works denied claims and appeals for practices every day. Start with a free 48-hour audit of your open denials.', label: 'Get a free denial audit', href: '/audit' }}
    >
      <p className="lead">
        A denied claim isn’t lost revenue until you stop working it. Many denials can be overturned, but only if you choose the right path (corrected claim, reopening, or appeal), file before the deadline, and send the documentation the payer actually needs. This guide walks through the process step by step, with Medicare appeal levels, commercial payer appeals, and a letter template you can copy.
      </p>

      <h2>Step 1: Decide whether it’s really an appeal</h2>
      <p>Appealing a claim that should have been corrected wastes weeks. Start with the denial code and remark code on the ERA or EOB (see our guide to <Link href="/blog/claim-denial-codes-explained">claim denial codes</Link>):</p>
      <ul>
        <li><strong>Corrected claim:</strong> the claim itself was wrong, for example a wrong modifier, diagnosis, date, or missing NPI. Fix it and resubmit with the right frequency code (7 = replacement), not as an appeal.</li>
        <li><strong>Rejected or “unprocessable”:</strong> if Medicare returns a claim as unprocessable (often with remark code MA130), there are no appeal rights. Fix the error and submit a new claim.</li>
        <li><strong>Reopening (Medicare):</strong> for simple clerical errors on a processed claim, request a reopening through your MAC instead of an appeal. It’s usually faster.</li>
        <li><strong>Appeal:</strong> the claim was right, but the payer disagrees, for example on medical necessity, bundling, authorization, or timely filing. This is where you write an appeal.</li>
      </ul>

      <h2>Step 2: Find the deadline, and calendar it</h2>
      <p>Appeal deadlines are strict. Missing one usually ends the appeal, so note the deadline on the day the denial arrives.</p>
      <ul>
        <li><strong>Medicare first-level appeal:</strong> 120 days from the date you receive the initial determination.</li>
        <li><strong>Commercial payers:</strong> set by your contract and the payer’s provider manual, commonly 60 to 180 days. Check the manual, not memory.</li>
        <li><strong>Medicare Advantage:</strong> follow the plan’s provider manual and your contract. Non-contracted providers have their own appeal process and usually must sign a waiver of liability (you agree not to bill the patient if the appeal is lost).</li>
      </ul>

      <h2>The 5 levels of Medicare Part A and B appeals</h2>
      <img src="/images/blog/claim-appeal-medicare-levels.webp" alt="The five levels of Medicare appeals: redetermination by the MAC within 120 days, reconsideration by a QIC within 180 days, ALJ hearing within 60 days, Medicare Appeals Council within 60 days, and federal district court within 60 days" />
      <ol>
        <li><strong>Redetermination</strong> by your Medicare Administrative Contractor (MAC). File within 120 days of receiving the initial determination. The MAC generally decides within 60 days.</li>
        <li><strong>Reconsideration</strong> by a Qualified Independent Contractor (QIC). File within 180 days of the redetermination decision. Send all your evidence now: new documents introduced later may not be accepted without good cause.</li>
        <li><strong>Administrative Law Judge (ALJ) hearing</strong> through the Office of Medicare Hearings and Appeals. File within 60 days of the reconsideration decision. A minimum amount in controversy applies, and it’s adjusted every year.</li>
        <li><strong>Medicare Appeals Council</strong> review. File within 60 days of the ALJ decision.</li>
        <li><strong>Federal district court.</strong> File within 60 days of the Council decision, with a higher minimum amount in controversy.</li>
      </ol>
      <p>Most practices win or lose at the first two levels, so put your best documentation into the redetermination.</p>

      <h2>Commercial payer appeals</h2>
      <p>Commercial plans usually have one or two internal appeal levels for providers, defined in the provider manual. Some also offer a “reconsideration” or “claim dispute” step before a formal appeal, often through the payer’s portal (for example, through Availity for many plans).</p>
      <ul>
        <li>Use the payer’s appeal form if it has one. Appeals sent on the wrong form or to the wrong address are often returned unworked.</li>
        <li>Submit through the portal when possible, so you get a confirmation and a tracking number.</li>
        <li>Patients also have their own appeal rights, including an <strong>external review</strong> by an independent reviewer for many plans. For medical necessity denials, a patient appeal alongside yours can help.</li>
      </ul>

      <h2>Step 3: Gather the right documentation</h2>
      <p>An appeal is only as strong as its attachments. Send what proves your point, and nothing that buries it.</p>
      <ul>
        <li>The denial (EOB/ERA page or denial letter) and a copy of the claim.</li>
        <li>The relevant medical records for the date of service: the visit note, procedure note, orders, and test results.</li>
        <li>For authorization denials: the authorization number, reference number from the call, or proof of an emergency.</li>
        <li>For medical necessity denials: the payer’s policy or the Medicare LCD/NCD, with the criteria the record meets highlighted.</li>
        <li>For timely filing denials: clearinghouse acceptance reports or the payer’s acknowledgment showing the original submission date.</li>
        <li>For bundling denials: documentation showing the services were distinct (separate site, session, or encounter).</li>
      </ul>

      <h2>Step 4: Write a clear appeal letter</h2>
      <p>Reviewers read many appeals a day. Keep yours to one page, put the claim details at the top, and state exactly what you want: reprocess and pay the claim.</p>
      <div className="not-prose my-8 rounded-2xl border border-line bg-bg-soft p-6 font-mono text-[13px] leading-relaxed text-ink-2 whitespace-pre-wrap">{`[Practice name, address, phone, NPI, Tax ID]
[Date]

[Payer name] – Appeals Department
[Address / fax / portal]

RE: Request for appeal (Level 1 / Redetermination)
Patient: [Name]   Member ID: [ID]   DOB: [MM/DD/YYYY]
Claim #: [Number]   Date of service: [MM/DD/YYYY]
Billed: [CPT/HCPCS + modifiers]   Diagnosis: [ICD-10]
Denial: [CARC/RARC, e.g. CO-50 / N115]   Denial date: [MM/DD/YYYY]

We are requesting reconsideration of the above claim, which was denied as [reason in the payer's words].

The service was [medically necessary / correctly billed / authorized] because:
1. [Fact from the record, e.g. "Patient failed 6 weeks of conservative therapy (see note dated MM/DD)."]
2. [Policy criterion met, e.g. "This meets criterion B of LCD L#####."]
3. [Any other key fact, e.g. "Authorization #12345 was obtained on MM/DD (attached)."]

Enclosed: denial notice, claim copy, [visit note], [authorization], [policy excerpt].

Please reprocess and pay the claim. Contact [name] at [phone/email] with any questions.

Sincerely,
[Name, title]`}</div>

      <h2>How to approach the most common denials</h2>
      <ul>
        <li><strong>CO-50 (not medically necessary):</strong> quote the payer’s policy or the LCD and show, point by point, how the record meets it. Ask the provider for an addendum only if it’s accurate and dated as an addendum.</li>
        <li><strong>CO-97 / CO-236 (bundled or NCCI edit):</strong> if the services were truly distinct, show why (different site, session, or problem) and that the right modifier (59, XS, XU, 25) applies. Check pairs first in our <Link href="/claim-scrubber">claim scrubber</Link>.</li>
        <li><strong>CO-197 (no authorization):</strong> attach the authorization or call reference. If none exists, ask about retro-authorization, or show the service was an emergency.</li>
        <li><strong>CO-29 (timely filing):</strong> attach proof the claim was filed on time. Without proof, this denial is usually final.</li>
        <li><strong>E/M level downcoded:</strong> show how MDM or total time supports the billed level. Score the visit first with our <Link href="/em-audit-tool">E/M audit tool</Link>, and don’t appeal a level the note doesn’t support.</li>
      </ul>

      <Callout title="Don’t appeal what you can’t support">
        If the record doesn’t support the service as billed, the right fix is a corrected claim or a write-off, not an appeal. Weak appeals waste time and can draw payer attention to your billing.
      </Callout>

      <h2>Step 5: Track every appeal until it’s paid</h2>
      <ul>
        <li>Log the submission date, level, method, confirmation number, and follow-up date (usually 30 to 45 days later).</li>
        <li>When you call for status, write a consistent note with the reference number. Our <Link href="/call-note-builder">call note builder</Link> creates one in seconds.</li>
        <li>If the appeal is denied, check the decision letter for the next level and its deadline right away.</li>
        <li>Track appeals by payer and denial reason. If the same denial keeps coming back, fix the process that causes it. See <Link href="/blog/reduce-claim-denials">how to reduce claim denials</Link>.</li>
      </ul>

      <h2>Frequently asked questions</h2>
      <h3>What’s the difference between a corrected claim and an appeal?</h3>
      <p>A corrected claim fixes an error on your side, such as a wrong code or modifier. An appeal asks the payer to change its decision on a claim that was billed correctly.</p>
      <h3>How long do I have to appeal a Medicare denial?</h3>
      <p>120 days from the date you receive the initial determination for the first level (redetermination). Each later level has its own deadline, shown on the decision letter.</p>
      <h3>Can I bill the patient while an appeal is pending?</h3>
      <p>Not for amounts the payer denied as the provider’s responsibility (CO). Only patient-responsibility amounts (PR), or services covered by a valid waiver such as a Medicare ABN, can be billed to the patient.</p>
      <h3>How many times can I appeal?</h3>
      <p>It depends on the payer. Medicare has five levels. Most commercial plans have one or two internal levels, and some cases qualify for external review.</p>

      <p><em>This guide is general information. Appeal rules, forms, and deadlines vary by payer and contract; always check the payer’s provider manual and the instructions on the denial notice.</em></p>
    </ArticleLayout>
  );
}
