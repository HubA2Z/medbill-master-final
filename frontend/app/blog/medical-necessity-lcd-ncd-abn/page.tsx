import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/medical-necessity-lcd-ncd-abn';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout
      slug={SLUG}
      cta={{ title: 'Losing claims to medical necessity denials?', body: 'Our billing team reviews diagnosis-to-procedure links, LCD criteria, and ABN use for practices every day. Start with a free 48-hour audit of your open denials.', label: 'Get a free denial audit', href: '/audit' }}
    >
      <p className="lead">
        Medicare pays only for services that are “reasonable and necessary” for the patient’s condition. In practice, that rule lives in coverage policies: National Coverage Determinations (NCDs), Local Coverage Determinations (LCDs), and the billing and coding articles that list which diagnoses support a service. This guide explains how those policies work, how to look them up, what happens when a diagnosis doesn’t match, and how to use the Advance Beneficiary Notice (ABN) and the GA, GZ, GY, and GX modifiers correctly.
      </p>

      <h2>What “reasonable and necessary” means</h2>
      <p>Under the Social Security Act, Medicare generally won’t pay for items or services that aren’t reasonable and necessary to diagnose or treat an illness or injury, or to improve the function of a malformed body part. A covered benefit can still be denied for a specific patient if the record doesn’t show why it was needed.</p>
      <p>For billing, medical necessity comes down to three questions:</p>
      <ul>
        <li>Does a coverage policy apply to this CPT or HCPCS code?</li>
        <li>Does the diagnosis on the claim appear on the policy’s covered list, coded to the right level of specificity?</li>
        <li>Does the medical record meet the policy’s other conditions, such as prior treatment, test results, or frequency?</li>
      </ul>
      <p>If any answer is no, expect a denial. The diagnosis must also be supported by the note. Coding a covered diagnosis the provider didn’t document is a compliance problem, not a fix.</p>

      <h2>NCDs vs LCDs</h2>
      <ul>
        <li><strong>National Coverage Determinations (NCDs)</strong> are issued by CMS and apply everywhere in the country. They’re published in the Medicare National Coverage Determinations Manual (Pub. 100-03). Many clinical lab tests have national policies with specific covered diagnosis lists.</li>
        <li><strong>Local Coverage Determinations (LCDs)</strong> are written by each Medicare Administrative Contractor (MAC) and apply only in that MAC’s jurisdiction. Two MACs can have different LCDs for the same service, so a test covered for a diagnosis in one state may not be covered in another.</li>
        <li><strong>Billing and coding articles</strong> sit next to most LCDs (and some NCDs). The LCD states the clinical coverage criteria. The article gives the coding detail: which CPT/HCPCS codes the policy covers, the ICD-10-CM codes that support medical necessity, required modifiers, and documentation notes.</li>
      </ul>
      <p>When no NCD or LCD exists for a service, the MAC still decides medical necessity claim by claim. No policy doesn’t mean automatic coverage.</p>

      <h2>How to look up a policy in the Medicare Coverage Database</h2>
      <p>The Medicare Coverage Database (MCD) on the CMS website holds NCDs, LCDs, and billing and coding articles. A simple routine:</p>
      <ol>
        <li>Search by the CPT or HCPCS code, or by a keyword such as the test or procedure name.</li>
        <li>Filter by your state or MAC jurisdiction so you only see policies that apply to you.</li>
        <li>Open the LCD (its number starts with L) and read the coverage indications, limitations, and documentation requirements.</li>
        <li>Open the related billing and coding article (its number starts with A) and check the covered ICD-10-CM list. Note any codes that must be billed together, or diagnoses listed as not supporting medical necessity.</li>
        <li>Check the effective date and revision history. Policies change, and the version in effect on the date of service is the one that counts.</li>
      </ol>
      <p>For diagnosis specificity questions, our <Link href="/icd10-intelligence">ICD-10 intelligence tool</Link> helps you find the most specific code the note supports, and the <Link href="/blog/icd-10-2026-updates">ICD-10 2026 updates</Link> article covers recent code changes that can affect covered lists.</p>

      <h2>When the diagnosis isn’t on the covered list</h2>
      <p>If the diagnosis on the claim doesn’t meet the policy, Medicare and other payers usually deny with a medical necessity group of reason codes. You will commonly see <strong>CO-50</strong> (the payer doesn’t consider the service medically necessary) or <strong>CO-167</strong> (the diagnosis isn’t covered), often with a remark code that points to the policy. Read the exact codes on the ERA; our guide to <Link href="/blog/claim-denial-codes-explained">claim denial codes</Link> explains how CARC and RARC codes fit together.</p>
      <p>The “CO” group code means the provider is liable; you generally can’t bill the patient without a valid ABN. Work the denial in this order:</p>
      <ul>
        <li><strong>Coding error:</strong> the note supports a covered diagnosis, but it wasn’t coded, or it was coded in the wrong position or without enough specificity. Send a corrected claim (see <Link href="/blog/corrected-claims-frequency-codes">corrected claims and frequency codes</Link>).</li>
        <li><strong>Documentation supports coverage but the claim was denied:</strong> appeal with the record and the LCD criteria highlighted. Our <Link href="/blog/medical-claim-appeal-guide">medical claim appeal guide</Link> covers the Medicare appeal levels.</li>
        <li><strong>The record doesn’t meet the policy:</strong> the denial stands. Without an ABN, it’s usually a write-off. Use it as a reason to fix the front-end process.</li>
      </ul>

      <h2>The Advance Beneficiary Notice (ABN)</h2>
      <p>The ABN (form CMS-R-131) tells an Original Medicare patient, before the service, that Medicare may not pay and why. It lets the patient decide whether to receive the service and accept financial responsibility. A valid ABN shifts liability to the patient if Medicare denies the service as not reasonable and necessary.</p>
      <h3>When an ABN is required</h3>
      <p>You need an ABN if you expect Medicare to deny a usually covered service as not reasonable and necessary (for example, it fails LCD criteria or exceeds a frequency limit) and you want to be able to bill the patient. Without one, the provider is generally liable for the denied amount.</p>
      <h3>When an ABN is optional</h3>
      <p>For services Medicare never covers by law (statutory exclusions such as routine physicals or cosmetic procedures), an ABN isn’t required. Many practices give one voluntarily so the patient knows the cost in advance.</p>
      <h3>What makes an ABN valid</h3>
      <ul>
        <li>It’s given <strong>before</strong> the service, with enough time for the patient to decide. An ABN signed after the service doesn’t protect the practice.</li>
        <li>It names the specific item or service and gives a specific reason Medicare may not pay, such as “Medicare does not pay for this test for your condition” or “Medicare pays for this only once every [frequency].” “Medicare may not pay” alone is not enough.</li>
        <li>It includes a good-faith cost estimate.</li>
        <li>The patient chooses one option and signs it. Keep a copy and give one to the patient.</li>
        <li>It’s not given routinely to every patient (a “blanket” ABN), and not given to a patient in a medical emergency or under duress.</li>
        <li>It’s the current version of the form from the CMS website.</li>
      </ul>
      <p>The ABN applies to Original Medicare. Medicare Advantage plans don’t use it; they have their own pre-service determination process. See our <Link href="/blog/medicare-advantage-billing-guide">Medicare Advantage billing guide</Link>.</p>

      <h2>Modifiers GA, GZ, GY, and GX</h2>
      <p>These modifiers tell Medicare whether you expect a denial and whether the patient was notified. In plain terms:</p>
      <div className="not-prose overflow-x-auto my-6">
        <table className="table-clinical">
          <thead>
            <tr>
              <th>Modifier</th>
              <th>Use it when</th>
              <th>Usual result if denied</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GA</td>
              <td>You expect a medical necessity denial and a required ABN is on file.</td>
              <td>Patient responsibility (PR)</td>
            </tr>
            <tr>
              <td>GZ</td>
              <td>You expect a medical necessity denial and no ABN was given.</td>
              <td>Provider liable (CO); can’t bill the patient</td>
            </tr>
            <tr>
              <td>GY</td>
              <td>The service is statutorily excluded or isn’t a Medicare benefit.</td>
              <td>Patient responsibility (PR)</td>
            </tr>
            <tr>
              <td>GX</td>
              <td>You gave a voluntary ABN for a statutorily excluded service.</td>
              <td>Patient responsibility (PR)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>GA and GZ are for services you expect to fail medical necessity. GY and GX are for services Medicare doesn’t cover at all. GX is often billed together with GY. Claims with GZ are typically denied automatically. Check your MAC’s instructions on combining these modifiers.</p>

      <Callout title="The ABN doesn’t replace good coding">
        An ABN protects the practice when coverage is truly in doubt. It’s not a way to avoid checking LCDs, and it won’t help if the claim was denied because the wrong diagnosis was coded. Check the policy first, then decide whether an ABN is needed.
      </Callout>

      <h2>Frequency limits</h2>
      <p>Many policies cover a service only a certain number of times in a set period, especially screenings, some lab tests, and some therapies. A claim over the limit is denied even with a covered diagnosis. Before scheduling, check the last date of service; many MAC portals show it for preventive services. If the patient is over the limit, or you can’t tell, an ABN with a frequency reason protects the practice.</p>

      <h2>Commercial payer medical policies</h2>
      <p>Commercial plans don’t use LCDs or NCDs. They publish their own medical or clinical policies, which list covered indications, required documentation, and often covered diagnosis codes. Search the payer’s website for its medical policy on the service, and check whether prior authorization is needed (see our <Link href="/blog/prior-authorization-guide">prior authorization guide</Link>).</p>
      <p>The ABN is a Medicare form. Whether you can bill a commercial patient for a non-covered service depends on the payer contract and state law. Some contracts require a specific signed waiver before the service; others don’t allow billing the patient at all for denied services. Read the contract and the provider manual before relying on any waiver.</p>

      <h2>Frequently asked questions</h2>
      <h3>Can I bill the patient for a CO-50 denial if there’s no ABN?</h3>
      <p>Generally no, for Original Medicare. Without a valid ABN given before the service, the provider is usually liable for a medical necessity denial, and the patient can’t be billed.</p>
      <h3>Can I use an ABN for a Medicare Advantage patient?</h3>
      <p>No. The ABN is for Original Medicare. Medicare Advantage plans have their own process for deciding coverage before a service, so check the plan’s provider manual.</p>
      <h3>Does every LCD have a list of covered diagnosis codes?</h3>
      <p>Not always. Many LCDs have a billing and coding article with a covered ICD-10-CM list, but some policies rely on clinical criteria in the record instead. Read both the LCD and the article.</p>
      <h3>What if the LCD changes after the service?</h3>
      <p>The policy in effect on the date of service applies. Check the policy’s revision history in the Medicare Coverage Database to confirm which version applied.</p>

      <p><em>This guide is general information. Coverage policies, ABN instructions, and modifier rules change; always confirm with your MAC, the current CMS manuals and Medicare Coverage Database, or the payer’s medical policy before billing.</em></p>
    </ArticleLayout>
  );
}
