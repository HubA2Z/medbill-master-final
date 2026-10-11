import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/cms-1500-claim-form-guide';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout
      slug={SLUG}
      cta={{ title: 'Claims rejecting for form errors?', body: 'Our billing team catches CMS-1500 and 837P errors before they reach the payer. Start with a free 48-hour audit of your recent rejections and denials.', label: 'Get a free claim audit', href: '/audit' }}
    >
      <p className="lead">
        The CMS-1500 (02/12) is the standard claim form for professional services. Even if you never print one, it is worth knowing box by box: most claims go out electronically as the 837P, and the 837P carries the same data. When your billing software shows a rejection for a “billing provider” or “referring provider” field, it is pointing at one of these boxes. This guide covers the boxes billers get wrong most often, and the rejections and denials each error tends to cause.
      </p>

      <h2>Paper form vs 837P</h2>
      <p>The National Uniform Claim Committee (NUCC) maintains the CMS-1500 and publishes a detailed instruction manual for it. Medicare publishes its own box-by-box instructions in the Medicare Claims Processing Manual (Pub. 100-04, Chapter 26). Commercial payers and Medicaid programs may add their own rules.</p>
      <p>Each box maps to a loop and segment in the 837P. For example, box 21 maps to the HI segment, box 33 to the billing provider loop (2010AA), and box 32 to the service facility loop (2310C). If you understand what a box means, you can read an 837P rejection report much faster. See our guide to <Link href="/blog/clearinghouse-rejections-guide">clearinghouse rejections</Link>.</p>

      <h2>Patient and insured information (boxes 1–11d)</h2>
      <h3>Box 1 and 1a: insurance type and insured’s ID</h3>
      <p>Box 1 marks the type of coverage (Medicare, Medicaid, group health plan, and so on). Box 1a is the insured’s ID number exactly as it appears on the card, including any prefix. A wrong or incomplete ID is one of the top causes of front-end rejections and “patient cannot be identified” denials. Verify it at check-in with our <Link href="/blog/insurance-eligibility-verification-guide">eligibility verification guide</Link>.</p>
      <h3>Box 2: patient’s name</h3>
      <p>Last name, first name, middle initial, as shown on the insurance card. Nicknames, missing hyphens, and maiden names cause eligibility mismatches.</p>
      <h3>Box 3: patient’s birth date and sex</h3>
      <p>Date of birth in MM/DD/YY or MM/DD/YYYY format, plus sex. A DOB that doesn’t match the payer’s file is a common rejection.</p>
      <h3>Box 4 and box 7: insured’s name and address</h3>
      <p>The subscriber, who may not be the patient. A child on a parent’s plan is the patient in box 2, and the parent is the insured in box 4. Box 7 is the insured’s address. Mixing up patient and subscriber is a frequent cause of eligibility denials.</p>
      <h3>Boxes 9, 9a, 9d: other insured (secondary coverage)</h3>
      <p>Complete these when the patient has another health plan. Box 9 is the other insured’s name, 9a is that policy or group number, and 9d is the other plan’s name. Boxes 9b and 9c are reserved for NUCC use. Payers use this to coordinate benefits. Leaving it blank when coverage exists can lead to coordination of benefits denials. See our guide to <Link href="/blog/coordination-of-benefits-secondary-claims">coordination of benefits and secondary claims</Link>.</p>
      <h3>Boxes 10a–10c: is the condition related to employment or an accident?</h3>
      <p>Yes or No for employment (10a), auto accident with the state (10b), and other accident (10c). A Yes answer can make the payer pend the claim or send an accident questionnaire, and may point the claim to workers’ comp or auto coverage. Answer from the documentation, not by default. See our <Link href="/blog/workers-compensation-billing-guide">workers’ compensation billing guide</Link>.</p>
      <h3>Box 11 and 11a–11c: insured’s policy group and plan</h3>
      <p>Box 11 is the insured’s group number (or FECA number). 11a is the insured’s DOB and sex, 11b is another claim ID with its qualifier when a payer requires one, and 11c is the insurance plan or program name.</p>
      <h3>Box 11d: is there another health benefit plan?</h3>
      <p>Yes or No. If you check Yes, you must complete boxes 9, 9a, and 9d. Checking Yes with box 9 blank is a classic rejection.</p>

      <h2>Dates, providers, and claim details (boxes 14–23)</h2>
      <h3>Box 14: date of current illness, injury, or pregnancy</h3>
      <p>The date plus a qualifier: 431 for onset of current symptoms or illness, or 484 for last menstrual period. Some payers require it for chiropractic, injury, or pregnancy-related claims. A date without a qualifier can reject.</p>
      <h3>Box 17 and 17b: referring, ordering, or supervising provider</h3>
      <p>Enter the provider’s name in box 17 with a qualifier to the left: <strong>DN</strong> for referring provider, <strong>DK</strong> for ordering provider, or <strong>DQ</strong> for supervising provider. Box 17b is that provider’s NPI. This is required for services that need a referral or order, such as consults for some payers, diagnostic tests, labs, imaging, and DME. For Medicare, the ordering or referring provider generally must be enrolled in Medicare (PECOS). A missing or unenrolled provider here is a common denial.</p>
      <h3>Box 19: additional claim information</h3>
      <p>Free text used differently by each payer. Common uses include a short note about a corrected claim, a NOC (not otherwise classified) code description, or other payer-required details. Check the payer’s instructions before putting anything here.</p>
      <h3>Box 21: diagnosis codes and ICD indicator</h3>
      <p>Enter the ICD indicator <strong>0</strong> for ICD-10-CM. You can list up to 12 diagnoses, lettered A through L. Enter codes to the highest level of specificity, with no decimal point on the paper form. A missing indicator, truncated codes, or invalid codes cause rejections. Our <Link href="/icd10-intelligence">ICD-10 lookup tool</Link> helps confirm codes are complete.</p>
      <h3>Box 22: resubmission code and original reference number</h3>
      <p>Left side: the claim frequency code, 7 for a replacement or 8 for a void. Right side: the payer’s original claim number. Leave blank for original claims. Medicare does not use box 22 for Part B corrections in the same way, so follow your MAC’s instructions. Full details are in our guide to <Link href="/blog/corrected-claims-frequency-codes">corrected claims and frequency codes</Link>.</p>
      <h3>Box 23: prior authorization number</h3>
      <p>The authorization or referral number when one applies. Medicare also uses box 23 for certain other numbers, such as the CLIA number for lab services. A missing authorization number can trigger an authorization denial even when the auth exists. See our <Link href="/blog/prior-authorization-guide">prior authorization guide</Link>.</p>

      <h2>Service lines (box 24A–24J)</h2>
      <p>Each claim has up to six service lines on paper (the 837P allows more). Each line has an unshaded area for the main data and a shaded area for supplemental information, such as an NDC for drugs.</p>
      <ul>
        <li><strong>24A – dates of service:</strong> from and to dates. Use a single date for most office services. Spanning dates are allowed only where the payer permits.</li>
        <li><strong>24B – place of service:</strong> the two-digit POS code. A POS that doesn’t match the documentation or the procedure is a common denial. See our <Link href="/blog/place-of-service-codes-guide">place of service codes guide</Link>.</li>
        <li><strong>24C – EMG:</strong> emergency indicator (Y or blank) when the payer requires it.</li>
        <li><strong>24D – procedure code and modifiers:</strong> CPT or HCPCS code and up to four modifiers. Missing or wrong modifiers cause bundling and payment errors.</li>
        <li><strong>24E – diagnosis pointer:</strong> letters (A–L) pointing to box 21, primary first, up to four per line. Enter letters, not the ICD-10 codes. A pointer to the wrong diagnosis can cause a medical necessity denial.</li>
        <li><strong>24F – charges:</strong> your full charge for the line.</li>
        <li><strong>24G – days or units:</strong> units must match the code definition and payer limits. Unit errors trigger MUE denials. See <Link href="/blog/ncci-edits-mue-explained">NCCI edits and MUEs explained</Link>.</li>
        <li><strong>24J – rendering provider ID:</strong> the rendering provider’s NPI in the unshaded area. Leave it blank only if the rendering and billing provider are the same individual and the payer allows it. A rendering provider who is not credentialed with the payer is a frequent denial.</li>
      </ul>

      <h2>Provider and billing information (boxes 25–33)</h2>
      <h3>Box 25: federal tax ID</h3>
      <p>The EIN (or SSN) of the billing provider, with the matching checkbox. It must match the tax ID the payer has on file for the billing NPI.</p>
      <h3>Box 26: patient’s account number</h3>
      <p>Your internal account number. Payers return it on the ERA, which makes posting much easier. See our <Link href="/blog/payment-posting-era-guide">payment posting guide</Link>.</p>
      <h3>Box 28: total charge</h3>
      <p>The total of all lines in 24F on that claim. If a claim runs past six lines on paper, each page is its own claim with its own total.</p>
      <h3>Box 31: signature of physician or supplier</h3>
      <p>A signature, or “Signature on File,” and the date. Electronic claims handle this through your enrollment and trading partner agreements.</p>
      <h3>Box 32 and 32a: service facility location</h3>
      <p>The name and address where services were provided, and that facility’s NPI in 32a when required. It is needed when the service location differs from the billing address, for example a hospital, nursing facility, or second office. Some payers require it on every claim.</p>
      <h3>Box 33 and 33a: billing provider</h3>
      <p>The billing provider’s name, address, and phone number, and its NPI in 33a. Payers and the 837P generally require a physical street address for the billing provider, not a P.O. box. Payment can go to a separate pay-to address. An NPI that doesn’t match the payer’s enrollment, or a group NPI vs individual NPI mix-up, causes rejections and credentialing denials. See our <Link href="/blog/provider-credentialing-enrollment-guide">credentialing and enrollment guide</Link>.</p>

      <Callout title="Fix the template, not just the claim">
        Most box errors repeat because the data is wrong in the practice management system: a provider set up with the wrong NPI, a location missing its facility NPI, an insurance plan set to send the wrong ID. When the same rejection keeps coming back, correct the setup once.
      </Callout>

      <h2>Frequently asked questions</h2>
      <h3>Do I still need to know the CMS-1500 if we bill electronically?</h3>
      <p>Yes. The 837P carries the same data, and payer instructions, portal screens, and rejection reports often refer to box numbers. Some payers, such as certain workers’ comp and auto carriers, may still accept or require paper.</p>
      <h3>How many diagnosis codes can I report?</h3>
      <p>Up to 12 on the CMS-1500 (A–L), and up to four diagnosis pointers per service line in box 24E.</p>
      <h3>What goes in box 24J vs box 33a?</h3>
      <p>24J is the individual who performed the service (rendering provider). 33a is the entity billing for it, often the group practice NPI.</p>
      <h3>Which form version should I use?</h3>
      <p>The CMS-1500 (02/12) is the current version. Use the official red-ink form for paper claims, since payers scan them and may reject copies.</p>

      <p><em>This guide is general information. Box requirements vary by payer; always confirm with the NUCC instruction manual, the CMS Medicare Claims Processing Manual, or the payer’s provider manual.</em></p>
    </ArticleLayout>
  );
}
