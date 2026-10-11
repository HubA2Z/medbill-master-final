import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/modifier-25-guide';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout
      slug={SLUG}
      cta={{ title: 'Losing E/M visits to modifier 25 denials?', body: 'Our coders review same-day E/M and procedure claims for practices every week. Start with a free 48-hour audit of your modifier 25 claims and denials.', label: 'Get a free modifier 25 audit', href: '/audit' }}
    >
      <p className="lead">
        Modifier 25 is one of the most used modifiers in outpatient billing, and one of the most audited. It tells the payer that an evaluation and management (E/M) service on the same day as a procedure or other service was significant and separately identifiable, so it deserves its own payment. Used as a habit, it draws denials, refund requests, and audits. This guide explains when modifier 25 applies, how to document it, how it differs from modifier 57, and how to handle the denials that follow it.
      </p>

      <h2>What modifier 25 means</h2>
      <p>Every procedure with a global period already includes a basic evaluation. When a provider decides to perform a minor procedure, the work of examining the area, explaining the procedure, getting consent, and deciding to proceed is built into the procedure’s payment. Modifier 25 is appended to the E/M code (never the procedure code) to say that the provider did more than that built-in evaluation: they addressed a problem or performed an evaluation that stands on its own.</p>
      <p>A useful test: <strong>if the procedure had not been done, would the visit still support an E/M level on its own?</strong> If you can take the note, set aside everything related to the procedure, and still find a documented history or exam, medical decision making, or time that supports a billable E/M, modifier 25 is likely appropriate. If removing the procedure work leaves nothing, the E/M is part of the procedure.</p>

      <h3>Same diagnosis is allowed</h3>
      <p>A common myth is that the E/M and the procedure must have different diagnoses. CPT guidance and CMS both state that a different diagnosis is not required. When the diagnosis is the same, though, the note has to show evaluation and management beyond the usual pre-procedure work.</p>

      <h2>Minor procedures and global days</h2>
      <p>Modifier 25 matters most with procedures that have a <strong>0-day or 10-day global period</strong>. For these minor procedures, the E/M on the day of the procedure is bundled unless it is significant and separately identifiable. You can check a code’s global indicator in the Medicare Physician Fee Schedule lookup:</p>
      <ul>
        <li><strong>000:</strong> minor procedure, no post-op days. Same-day E/M is included unless modifier 25 is supported.</li>
        <li><strong>010:</strong> minor procedure with 10 post-op days. Same-day E/M needs modifier 25; related follow-up visits in the next 10 days are included.</li>
        <li><strong>090:</strong> major procedure. A decision-for-surgery E/M the day before or day of surgery uses modifier 57, not 25.</li>
        <li><strong>XXX:</strong> the global concept doesn’t apply, which covers many diagnostic tests and some injections. Payers differ on whether they want modifier 25 on an E/M billed with these services, so check the payer policy.</li>
      </ul>
      <p>Run the code pair through our <Link href="/claim-scrubber">claim scrubber</Link> to see whether an NCCI edit applies and whether a modifier is allowed.</p>

      <h2>Documentation that supports modifier 25</h2>
      <p>Coders can only code what the provider documented. Ask providers to make the separate service visible in the note:</p>
      <ul>
        <li><strong>Separate the problems.</strong> List each problem addressed in the assessment and plan, with its own status and plan. A heading such as “separately addressed today” helps reviewers.</li>
        <li><strong>Show the decision making.</strong> Medications started or adjusted, tests ordered or reviewed, and risk discussed for the separate problem all support MDM.</li>
        <li><strong>Keep the procedure note distinct.</strong> Indication, consent, technique, findings, and post-procedure instructions belong in the procedure note, not mixed into the E/M.</li>
        <li><strong>Level the E/M on the separate work only.</strong> Under 2021+ office visit rules, choose the level by MDM or total time, excluding the time and decision making that belong to the procedure. Score it with our <Link href="/em-audit-tool">E/M audit tool</Link> and review the <Link href="/blog/em-coding-2026">2026 E/M coding rules</Link>.</li>
      </ul>

      <Callout title="Don’t append 25 by default">
        Some practices set their EHR or charge rules to add modifier 25 any time an E/M and a procedure appear together. This is risky. Payers track modifier 25 rates by provider, and a pattern of 25 on nearly every procedure visit is a common audit trigger. Decide visit by visit.
      </Callout>

      <h2>Preventive visits plus a problem visit</h2>
      <p>When a patient comes in for a preventive visit and the provider also addresses a significant problem, you can often bill both the preventive service and a problem-oriented office visit, with modifier 25 on the problem E/M. The problem must need additional work beyond what the preventive visit includes. A minor problem handled with no extra work, or a quick refill of a stable chronic medication, is usually part of the preventive service.</p>
      <ul>
        <li>For commercial plans, the preventive visit is usually covered with no cost sharing, while the problem visit may apply copay, deductible, or coinsurance. Tell patients this may happen; front-desk scripts help avoid billing complaints.</li>
        <li>For Medicare, the annual wellness visit (G0438 or G0439) can be billed with a problem-oriented E/M with modifier 25 when the problem work is significant and documented separately.</li>
              </ul>
      <p>Plan type matters, so confirm preventive benefits first. See our <Link href="/blog/insurance-eligibility-verification-guide">insurance eligibility verification guide</Link>.</p>

      <h2>Modifier 57 vs modifier 25</h2>
      <p>Both modifiers attach to an E/M, but they cover different procedures:</p>
      <ul>
        <li><strong>Modifier 25</strong> applies to a separate E/M on the same day as a minor procedure (0 or 10 global days) or another service.</li>
        <li><strong>Modifier 57</strong> applies to the E/M where the provider made the initial decision to perform a major surgery (90 global days), on the day before or the day of surgery.</li>
      </ul>
      <p>Using 25 on a decision-for-surgery visit before a major procedure, or 57 on a minor procedure, is a common coding error.</p>

      <h2>Examples in words</h2>
      <ol>
        <li><strong>Supported:</strong> an established patient is seen for a scheduled knee joint injection (20610). During the visit, the provider also evaluates poorly controlled blood pressure, reviews home readings, and adjusts medication. Bill the injection and an office visit with modifier 25, leveled on the hypertension work.</li>
        <li><strong>Not supported:</strong> a patient returns for planned wart destruction. The provider examines the lesions, confirms the plan, and performs the procedure. The evaluation is part of the procedure; bill the procedure only.</li>
        <li><strong>Supported, same diagnosis:</strong> a patient with chronic low back pain comes in for a planned trigger point injection. The provider also evaluates new radiating leg symptoms, performs a neurologic exam, orders imaging, and starts a new medication. The diagnoses overlap, but the evaluation of the new symptoms goes well beyond the pre-injection check, so an E/M with modifier 25 may be supported if the note shows that work separately.</li>
        <li><strong>Modifier 57:</strong> a surgeon evaluates a patient in the emergency department, decides on an urgent major procedure, and operates the same day. The consult or E/M takes modifier 57.</li>
      </ol>

      <h2>Common denials and payer audits</h2>
      <p>Modifier 25 claims often come back with bundling denials such as CO-97 or NCCI-related remarks. Look up the exact code in our guide to <Link href="/blog/claim-denial-codes-explained">claim denial codes</Link>, then sort the denial:</p>
      <ul>
        <li><strong>Modifier missing:</strong> the E/M was billed without 25 and bundled. If the note supports it, send a corrected claim with the modifier.</li>
        <li><strong>Modifier on the wrong line:</strong> 25 was placed on the procedure. Correct the claim.</li>
        <li><strong>Payer disagrees:</strong> the claim was right, but the payer bundled it anyway or requested records. Appeal with the note, highlighting the separate problem. Our <Link href="/blog/medical-claim-appeal-guide">appeal guide</Link> includes a letter template.</li>
        <li><strong>Reduced payment:</strong> some commercial payers have policies that reduce payment for E/M services billed with modifier 25 or require records with every claim. Check the payer’s reimbursement policy before you assume an underpayment.</li>
      </ul>
      <p>Government reviewers and commercial payers have both examined modifier 25 use over the years. The best defense is a short internal audit: pull a sample of your modifier 25 claims each quarter and confirm each one would stand on its own. Office visit denial patterns are covered in more depth in our <Link href="/blog/office-visit-denials">office visit denials guide</Link>.</p>

      <h2>Frequently asked questions</h2>
      <h3>Does modifier 25 go on the E/M code or the procedure code?</h3>
      <p>Always on the E/M code. Placing it on the procedure code is an error that usually leads to a denial or bundling of the E/M.</p>
      <h3>Do I need a different diagnosis to use modifier 25?</h3>
      <p>No. CPT and CMS guidance say a different diagnosis is not required, but the note must clearly show work beyond the usual pre-procedure evaluation. Some payers look harder at claims where the diagnoses match.</p>
      <h3>Can modifier 25 be used with a new patient visit?</h3>
      <p>Yes. New or established status doesn’t change the rule. Medicare treats the decision to perform a minor procedure as included in the procedure for new and established patients alike, so a new patient E/M still needs a significant, separately identifiable service, and modifier 25, to be paid.</p>
      <h3>Is modifier 25 needed for an E/M on the same day as a lab test or EKG?</h3>
      <p>Usually not under NCCI, because those tests are not procedures with global periods, but some payers have their own edits. Check the payer’s policy or use a claim scrubber before submitting.</p>

      <p><em>This guide is general information, not legal or coding advice for a specific claim. Modifier rules and reimbursement policies vary by payer and change over time; always confirm with the payer’s current policy, CPT guidelines, and NCCI edits.</em></p>
    </ArticleLayout>
  );
}
