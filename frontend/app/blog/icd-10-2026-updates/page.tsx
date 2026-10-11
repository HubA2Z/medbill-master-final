import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/icd-10-2026-updates';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout slug={SLUG} cta={{ title: 'Ready to master the 2026 changes?', body: 'Get real-time access to updated codes and expert guidance from our billing team.', label: 'Start searching live codes', href: '/icd10-intelligence' }}>
      <p className="lead">
        Every October, the ICD-10-CM code set changes. Some codes are added, some are revised, some are deleted, and the official coding guidelines are updated alongside them. For billers and coders, the update isn’t optional reading: a diagnosis code that was valid on September 30 can be invalid on October 1, and claims that use it will reject or deny. Here’s how the update works, what typically changes, and how to prepare.
      </p>

      <h2>How the annual ICD-10-CM update works</h2>
      <p>ICD-10-CM is maintained in the United States by the National Center for Health Statistics (NCHS), part of the CDC, with CMS. Each year they publish a new code set tied to the federal fiscal year, which starts on October 1.</p>
      <ul>
        <li><strong>FY2026 code set:</strong> took effect October 1, 2025.</li>
        <li><strong>FY2027 code set:</strong> took effect October 1, 2026, and is the one in use now.</li>
        <li><strong>April 1 updates:</strong> mid-year changes are possible. When NCHS and CMS approve codes for an April 1 effective date, they’re announced in advance and published the same way as the October files.</li>
      </ul>
      <p>Files are usually released the summer before. The release includes the code tables, the tabular list and alphabetic index, the official guidelines for coding and reporting, and <strong>addenda</strong> that list exactly what changed from the prior year.</p>

      <h3>Codes follow the date of service, not the date you bill</h3>
      <p>The code set you use depends on the date of service for professional and outpatient claims, and the date of discharge for inpatient claims. It doesn’t matter when the claim is created or submitted.</p>
      <ul>
        <li>A visit on September 28, 2026 is coded with the FY2026 code set, even if you bill it in mid-October.</li>
        <li>A visit on October 2, 2026 must use the FY2027 code set.</li>
        <li>There is <strong>no grace period</strong> for deleted codes. If a code was deleted effective October 1, it can’t be reported for a date of service on or after that date.</li>
      </ul>
      <p>This matters most in early October, when your queue holds both September and October dates of service.</p>

      <Callout tone="warn" title="Watch the September and October overlap">
        Late charges, corrected claims, and appeals for older dates of service still use the code set that was valid on that date. Don’t “update” a deleted code on a September claim just because a newer code exists now.
      </Callout>

      <h2>What changes each year</h2>
      <p>The size of the update varies, but the types of changes are consistent.</p>

      <h3>New codes</h3>
      <p>New codes usually add specificity: a condition that used to fall into an “other” or “unspecified” code gets its own code, or an existing code is expanded with additional characters for laterality, severity, stage, or type. When a code is expanded, the old code often becomes a <strong>header</strong> (no longer billable), so the claim needs the new, longer code.</p>

      <h3>Revised code titles</h3>
      <p>Some codes keep the same number but get a new description. A revised title can change what the code includes, so a code you’ve used for years may no longer fit a particular diagnosis.</p>

      <h3>Deleted codes</h3>
      <p>Deleted codes are the main source of October denials. A code is typically deleted because it was split into more specific codes. Each deleted code needs a replacement in your system, and that replacement isn’t always one-to-one.</p>

      <h3>Tabular list and index changes</h3>
      <p>Instructional notes in the tabular list (Excludes1, Excludes2, code first, use additional code, code also) are added and changed each year. These notes control which codes can be reported together and in what order. A claim with valid codes can still be wrong if it ignores a new Excludes1 note or a sequencing instruction.</p>

      <h3>Guideline changes</h3>
      <p>The ICD-10-CM Official Guidelines for Coding and Reporting are updated with each release. Changes can affect how certain conditions are sequenced, when a combination code applies, or how specific scenarios should be reported. Read the marked guideline changes, not just the code tables.</p>

      <h2>Areas that frequently change</h2>
      <p>Rather than rely on a summary list, always check the official addenda for the year you’re coding. That said, some chapters tend to see regular updates, and practices that bill heavily in these areas should review them first:</p>
      <ul>
        <li><strong>Endocrine (diabetes and related complications):</strong> combination codes and complication detail are refined often.</li>
        <li><strong>Mental and behavioral health:</strong> conditions are periodically split or expanded to match current clinical terminology.</li>
        <li><strong>Neoplasms:</strong> additional site and type specificity is added over time.</li>
        <li><strong>Injuries and external causes:</strong> seventh characters and external cause detail continue to expand.</li>
        <li><strong>Social determinants of health (Z codes):</strong> codes describing social, economic, and environmental factors have grown in recent years.</li>
        <li><strong>Symptoms and signs:</strong> new symptom codes appear as clinical practice changes.</li>
      </ul>
      <p>To see what affects you, sort your practice’s top diagnosis codes by volume and check each one against the deleted and revised code lists. That short list is where your risk is.</p>

      <h2>Where to find the official files</h2>
      <ul>
        <li><strong>CMS:</strong> the ICD-10 section of the CMS website posts the code files, addenda, and guidelines for each fiscal year, plus any April update.</li>
        <li><strong>CDC/NCHS:</strong> the NCHS ICD-10-CM page publishes the same files, including the tabular list, index, and addenda.</li>
        <li><strong>Your MAC and payers:</strong> watch for transmittals and payer bulletins about new codes and any related coverage policy (LCD or medical policy) updates, since a new code may not be on a payer’s covered diagnosis list right away.</li>
      </ul>
      <p>For day-to-day lookups, our free <Link href="/icd10-intelligence">ICD-10 code search</Link> queries the National Library of Medicine’s clinical tables, which makes it quick to find a billable code and check its full description.</p>

      <h2>How to prepare your practice</h2>
      <ol>
        <li><strong>Confirm your PM and EHR updates.</strong> Ask your vendor when the new code set will be loaded and test it before October 1. Make sure the system applies codes by date of service so older claims still accept the prior year’s codes.</li>
        <li><strong>Update superbills, order forms, and favorites lists.</strong> Paper superbills, EHR pick lists, and provider favorites are where deleted codes hide. Replace them before the first October visit.</li>
        <li><strong>Crosswalk deleted codes.</strong> For each deleted code you use, list the replacement code or codes and what documentation is needed to choose between them. Share the crosswalk with providers and coders.</li>
        <li><strong>Review payer policies.</strong> Check LCDs, NCDs, and commercial medical policies tied to your high-volume services. If a policy lists covered diagnosis codes, confirm the new codes are included.</li>
        <li><strong>Train providers and coders.</strong> Short, specialty-specific training works better than a full list of changes. Focus on new documentation details the new codes require.</li>
        <li><strong>Watch denials closely in October.</strong> Run a denial report by diagnosis code in the first weeks of October. Invalid diagnosis code rejections and medical necessity denials on new codes are the early warning signs.</li>
      </ol>
      <p>If you already use a year-end checklist, add the October code update to it. Our <Link href="/blog/year-end-billing-checklist-2027">year-end billing checklist</Link> covers the January changes that follow.</p>

      <h2>Specificity tips that prevent denials</h2>
      <ul>
        <li><strong>Code to the highest level of detail documented.</strong> If the note supports laterality, type, stage, or a complication, use the code that captures it. Unspecified codes are valid, but some payers edit against them for certain services.</li>
        <li><strong>Always report a complete code.</strong> A three- or four-character header that has subcodes isn’t billable. Check for required seventh characters and placeholder X characters.</li>
        <li><strong>Use combination codes when they exist.</strong> When a single code describes both a condition and its complication, report that code instead of two separate codes.</li>
        <li><strong>Follow sequencing instructions.</strong> “Code first” and “use additional code” notes affect claim acceptance and medical necessity edits.</li>
        <li><strong>Query the provider when documentation is vague.</strong> Don’t pick a more specific code than the note supports. Ask for clarification instead.</li>
        <li><strong>Check diagnosis-to-procedure fit.</strong> A correct ICD-10 code paired with the wrong service still denies. Run claims through our <Link href="/claim-scrubber">claim scrubber</Link> before submission.</li>
      </ul>
      <p>For office visits, diagnosis specificity also supports the medical decision making behind the E/M level. See our <Link href="/blog/em-coding-2026">E/M coding guide</Link> for how diagnoses and problems factor into level selection.</p>

      <h2>Frequently asked questions</h2>
      <h3>When do new ICD-10-CM codes take effect?</h3>
      <p>The annual update takes effect October 1, the start of the federal fiscal year. The FY2027 code set took effect October 1, 2026. Occasional mid-year updates take effect April 1.</p>
      <h3>Can I use a deleted code for claims I submit after October 1?</h3>
      <p>Only if the date of service (or discharge, for inpatient) was before October 1. The code set is chosen by date of service, and there’s no grace period for deleted codes on dates of service after the effective date.</p>
      <h3>Do ICD-10-PCS codes change on the same schedule?</h3>
      <p>Yes. ICD-10-PCS, used for inpatient hospital procedures, is also updated for October 1. Physician offices report procedures with CPT and HCPCS codes, which follow a separate January update cycle.</p>
      <h3>What if a payer denies a new code as not covered?</h3>
      <p>Check whether the payer’s policy has been updated to include the new code. If the code is correct and the policy hasn’t caught up, contact the payer and appeal with the documentation. Our <Link href="/blog/medical-claim-appeal-guide">appeal guide</Link> explains the process.</p>

      <p><em>This article is general information about the ICD-10-CM update process. Always use the official CMS and CDC files and guidelines for the year you’re coding, and confirm coverage requirements with each payer.</em></p>
    </ArticleLayout>
  );
}
