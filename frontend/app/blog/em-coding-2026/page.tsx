import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/em-coding-2026';
export const metadata = articleMeta(SLUG);

// Updated September 2026 with CY 2026 Medicare PFS and MLN E/M booklet (May 2026) details.
export default function Page() {
  return (
    <ArticleLayout slug={SLUG} cta={{ title: 'Get your E/M coding audited', body: 'Our certified coders review recent E/M claims for under- and over-coding, modifier 25 use, and G2211 opportunities — free, in 48 hours.', label: 'Request free audit', href: '/audit' }}>
<p className="lead">The core rules for evaluation and management (E/M) coding haven’t been rewritten for 2026. Office visits still follow the 2021 framework, and hospital, nursing facility, home, and emergency visits still follow the 2023 update: you pick the level by <strong>medical decision making (MDM)</strong> or <strong>total time</strong> on the date of service, and history and exam only need to be “medically appropriate.”</p>
<p>What <em>did</em> change for 2026 is mostly Medicare payment policy — the conversion factor, a new efficiency adjustment that spares E/M codes, and a wider reach for the G2211 add-on. This guide covers both: the rules you apply on every visit, and the 2026 updates that affect what gets paid.</p>

<h2>What’s new for E/M in 2026</h2>
<ul>
<li><strong>Higher conversion factor.</strong> The 2026 Medicare Physician Fee Schedule sets the conversion factor at <strong>$33.40</strong> for most clinicians (up about 3.3% from $32.35) and <strong>$33.57</strong> for qualifying APM participants. Both include a one-year 2.5% increase required by law.</li>
<li><strong>E/M is exempt from the new “efficiency adjustment.”</strong> CMS finalized a −2.5% efficiency adjustment for non-time-based services. Time-based codes, including E/M visits, are exempt, so E/M work values aren’t cut by it.</li>
<li><strong>G2211 now applies to home and residence visits.</strong> Starting January 1, 2026, the visit-complexity add-on G2211 can be reported with home/residence E/M codes 99341–99342, 99344–99345, and 99347–99350, in addition to office/outpatient visits.</li>
<li><strong>Virtual direct supervision is here to stay for many incident-to services.</strong> Supervising practitioners can provide direct supervision through real-time audio and video (not audio-only) for applicable services.</li>
<li><strong>Teaching physicians</strong> may have a virtual presence in all teaching settings, permanently, but only when the service itself was furnished virtually.</li>
</ul>
<Callout tone="warn" title="Telehealth check">Medicare telehealth rules for E/M (patient location, audio-only, place of service and modifiers) have changed several times since 2020. Confirm the current status on the CMS telehealth page and in your payer’s policy before billing virtual visits.</Callout>

<h2>How to choose an E/M level: MDM or time</h2>
<p>For office/outpatient visits (99202–99205 new, 99212–99215 established), choose the level using <strong>either</strong> MDM <strong>or</strong> total time, whichever better supports the visit. You don’t need both.</p>
<h3>New patients</h3>
<ul>
<li><strong>99202</strong>: straightforward MDM, or 15+ minutes</li>
<li><strong>99203</strong>: low MDM, or 30+ minutes</li>
<li><strong>99204</strong>: moderate MDM, or 45+ minutes</li>
<li><strong>99205</strong>: high MDM, or 60+ minutes</li>
</ul>
<h3>Established patients</h3>
<ul>
<li><strong>99211</strong>: may not need a physician or QHP present (usually a nurse visit); no MDM or time threshold</li>
<li><strong>99212</strong>: straightforward MDM, or 10+ minutes</li>
<li><strong>99213</strong>: low MDM, or 20+ minutes</li>
<li><strong>99214</strong>: moderate MDM, or 30+ minutes</li>
<li><strong>99215</strong>: high MDM, or 40+ minutes</li>
</ul>
<p>The times are <strong>minimums that must be met or exceeded</strong>, not ranges or averages.</p>

<h2>Medical decision making, explained</h2>
<p>MDM has three elements. To reach a level, the visit must meet or exceed <strong>two of the three</strong>.</p>
<h3>1. Number and complexity of problems addressed</h3>
<p>Count only problems you actually <em>address</em>: evaluate, treat, or manage at this visit. A problem that’s only listed in the history doesn’t count. Examples: one self-limited problem (straightforward); one stable chronic illness or an acute uncomplicated illness (low); a chronic illness with worsening, two or more stable chronic illnesses, or an undiagnosed new problem with uncertain prognosis (moderate); a chronic illness with severe exacerbation, or an acute illness posing a threat to life or bodily function (high).</p>
<h3>2. Amount and complexity of data reviewed and analyzed</h3>
<p>This includes reviewing external notes, ordering or reviewing unique tests, getting history from an independent historian, independently interpreting a test performed by someone else, and discussing management with an external physician or QHP. Ordering a test at this visit also gives credit for reviewing its result, so don’t count the review again at the follow-up.</p>
<h3>3. Risk of complications from patient management</h3>
<p>Risk comes from the management options you considered or chose. Examples: OTC drugs or minor treatments (low); prescription drug management, decisions about minor surgery with risk factors, or diagnosis/treatment significantly limited by social determinants of health (moderate); drug therapy requiring intensive monitoring for toxicity, a decision about emergency major surgery, or a decision regarding hospitalization or escalation of care (high).</p>
<Callout tone="brand" title="Tip">Prescription drug management supports moderate risk, but only if the note shows you actually managed the medication (started, stopped, adjusted, or decided to continue it after assessment), not just that it appears on the med list.</Callout>

<h2>Coding by time: what counts</h2>
<p>Total time is the physician or QHP’s own time on the <strong>date of the encounter</strong>, face-to-face and non-face-to-face. It includes:</p>
<ul>
<li>Preparing for the visit (for example, reviewing tests and records)</li>
<li>Getting or reviewing a separately obtained history</li>
<li>Performing a medically appropriate exam</li>
<li>Counseling and educating the patient, family, or caregiver</li>
<li>Ordering medications, tests, or procedures</li>
<li>Referring to and communicating with other clinicians (when not separately reported)</li>
<li>Documenting in the medical record</li>
<li>Independently interpreting results and communicating them (when not separately reported)</li>
<li>Coordinating care (when not separately reported)</li>
</ul>
<p>It does <strong>not</strong> include clinical staff time, travel, teaching that isn’t specific to the patient, or time spent on separately reported services (for example, a procedure or an EKG interpretation billed on its own). Document the total time, ideally with a short summary of the activities.</p>

<h2>Prolonged services: CPT 99417 vs. Medicare G2212</h2>
<p>When time goes beyond the highest-level visit, commercial payers that follow CPT and Medicare use <strong>different codes and thresholds</strong>, a common source of denials.</p>
<ul>
<li><strong>CPT 99417</strong> (most commercial payers): each full 15 minutes beyond the <em>minimum</em> time of 99205 or 99215. The first unit is reportable at <strong>75 minutes</strong> with 99205 and <strong>55 minutes</strong> with 99215.</li>
<li><strong>HCPCS G2212</strong> (Medicare): each 15 minutes beyond the <em>maximum</em> of the old time range. The first unit starts at <strong>89 minutes</strong> with 99205 and <strong>69 minutes</strong> with 99215; a second unit at 104 and 84 minutes.</li>
</ul>
<p>Prolonged services are only reported when the visit level was chosen by <strong>time</strong>. Medicare also has its own prolonged codes for other settings: G0316 (hospital inpatient/observation), G0317 (nursing facility), and G0318 (home/residence).</p>

<h2>G2211: the visit complexity add-on</h2>
<p>G2211 is a Medicare add-on for E/M visits that are part of an ongoing relationship: you’re the continuing focal point for all of the patient’s needed services, or you’re providing ongoing care for a single serious or complex condition. It’s about the <strong>longitudinal relationship</strong>, not how complicated a single visit was.</p>
<ul>
<li><strong>Reportable with:</strong> office/outpatient E/M visits and, from 2026, home/residence visits 99341–99342, 99344–99345, 99347–99350.</li>
<li><strong>Modifier 25 rule:</strong> G2211 generally isn’t paid when the E/M carries modifier 25. Since 2025 there’s an exception when the same practitioner also furnishes an annual wellness visit, a vaccine administration, or a Medicare Part B preventive service that day.</li>
<li><strong>Documentation:</strong> the note should make the ongoing relationship clear (for example, “managing her diabetes and hypertension long-term; will follow up in 3 months”).</li>
</ul>

<h2>Split/shared visits and modifier FS</h2>
<p>In facility settings (hospital, observation, emergency department, and skilled nursing facility), a physician and an NPP in the same group can split a visit. The practitioner who performs the <strong>substantive portion</strong> bills it, and the claim needs modifier <strong>FS</strong>.</p>
<ul>
<li><strong>Substantive portion</strong> means more than half of the total time, <em>or</em> a substantive part of the MDM.</li>
<li>For critical care, only the time definition applies.</li>
<li>When both practitioners meet with the patient or discuss the case together, count that time for only one of them.</li>
<li>Split/shared billing doesn’t apply in the office, where “incident-to” rules apply instead.</li>
</ul>

<h2>Modifier 25 with same-day procedures</h2>
<p>An E/M on the same day as a minor procedure is only separately payable if it’s <strong>significant and separately identifiable</strong>: more than the usual pre-procedure evaluation and decision to do the procedure. Append modifier 25 to the E/M, and make sure the note would stand on its own without the procedure (for example, a separate problem addressed, or significant work beyond the procedure decision). For the decision to perform a <em>major</em> surgery (90-day global) the day before or day of surgery, use modifier 57 instead.</p>

<h2>Common E/M denials and how to avoid them</h2>
<ul>
<li><strong>Level not supported:</strong> MDM counted from problems that were listed but not addressed. Tie each problem to an assessment and plan.</li>
<li><strong>Time without detail:</strong> “Spent 40 minutes” with no date-of-service activities. Record the total and what it covered.</li>
<li><strong>Wrong prolonged code:</strong> 99417 billed to Medicare, or G2212 to a commercial payer. Check which set the payer follows.</li>
<li><strong>Modifier 25 overuse:</strong> 25 appended by default with every procedure. Use it only when the documentation supports a separate service.</li>
<li><strong>New vs. established mix-ups:</strong> a patient is established if they received professional services from the same physician, or one of the same specialty and subspecialty in the same group, within the past three years.</li>
<li><strong>G2211 on every visit:</strong> it belongs where there’s an ongoing longitudinal relationship, not on one-time or episodic care.</li>
</ul>

<h2>Quick E/M documentation checklist</h2>
<ol>
<li>Choose MDM or time, and document the one you’re using.</li>
<li>For MDM, make sure two of three elements meet the level.</li>
<li>For time, record the total minutes on the date of service and the activities.</li>
<li>Link every addressed problem to a specific diagnosis and a plan (look up codes in our <Link href="/icd10-intelligence">ICD-10 search</Link>).</li>
<li>Add G2211, FS, 25, or 57 only when the documentation supports it. Run the claim through our <Link href="/claim-scrubber">claim scrubber</Link> to catch modifier errors.</li>
<li>Use the payer’s prolonged service code (99417 or G2212) and threshold.</li>
</ol>

<h2>Frequently asked questions</h2>
<h3>Did E/M time thresholds change in 2026?</h3>
<p>No. Office/outpatient time thresholds are the same as in 2021 (for example, 99214 is 30 minutes or more). What changed in 2026 is mainly Medicare payment policy.</p>
<h3>Can I use both MDM and time?</h3>
<p>You select the level using one or the other. Use whichever better reflects the visit and is well documented.</p>
<h3>Does the history and exam still matter?</h3>
<p>They should be medically appropriate and documented, but they don’t determine the level for office visits or the other E/M families updated in 2023.</p>

<p className="text-sm text-ink-3"><em>This article is a general coding reference based on AMA CPT E/M guidelines and CMS’s CY 2026 Physician Fee Schedule and E/M Services booklet. Always confirm payer-specific policies before billing.</em></p>

    </ArticleLayout>
  );
}
