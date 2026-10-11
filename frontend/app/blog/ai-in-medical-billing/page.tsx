import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/ai-in-medical-billing';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout slug={SLUG} cta={{ title: 'Experience intelligent medical billing', body: 'Combine live regulatory data with human expertise. Try our free tools or get a 48-hour audit.', label: 'Try Enhancely free', href: '/tools' }}>
      <p className="lead">
        Artificial intelligence is showing up in almost every part of the revenue cycle, from eligibility checks to coding suggestions to denial work queues. Some of it saves real time. Some of it is ordinary automation with a new label. And some of it creates compliance risk if no one is checking the output. This guide looks at where AI fits in medical billing today, where it falls short, how to evaluate a vendor, and what it means for people who work in billing and coding.
      </p>

      <h2>What “AI” means in a billing context</h2>
      <p>The term covers several different technologies, and it helps to separate them:</p>
      <ul>
        <li><strong>Rules-based automation:</strong> fixed if-then logic, such as a claim edit that flags a missing modifier. Predictable and easy to audit, but it only knows the rules someone wrote.</li>
        <li><strong>Robotic process automation (RPA):</strong> software “bots” that log into portals, copy data, and click through screens the way a person would.</li>
        <li><strong>Machine learning:</strong> models trained on historical data to make predictions, such as which claims are likely to deny.</li>
        <li><strong>Natural language processing and large language models:</strong> tools that read clinical notes, payer letters, or call transcripts and extract or generate text, including code suggestions.</li>
      </ul>
      <p>Most billing products combine these. When a vendor says “AI,” ask which of these it actually is, because each one fails in a different way.</p>

      <h2>Where AI is being used in the revenue cycle</h2>

      <h3>Eligibility and benefits verification</h3>
      <p>Automated eligibility checks run electronic 270/271 inquiries before appointments and flag inactive coverage, coordination of benefits issues, or plan changes. Newer tools also read the benefit details and estimate patient responsibility. This is one of the most mature uses, and it reduces front-end denials when someone follows up on the flags.</p>

      <h3>Claim scrubbing</h3>
      <p>Scrubbers check claims against NCCI edits, MUEs, payer-specific rules, and formatting requirements before submission. Machine learning can add payer-specific patterns learned from your own remittances. The core value still comes from current rule sets. Our free <Link href="/claim-scrubber">claim scrubber</Link> shows the rules-based side of this: NCCI pair and unit checks you can run before a claim goes out.</p>

      <h3>Coding suggestions and computer-assisted coding</h3>
      <p>Computer-assisted coding (CAC) reads documentation and suggests ICD-10-CM, CPT, and HCPCS codes, and some tools suggest an E/M level. Used well, it speeds up coders on routine encounters and points out documented conditions that might be missed. Used carelessly, it can suggest codes the documentation doesn’t support. Suggestions should be reviewed by a coder, especially for E/M levels, where the rules depend on medical decision making or time. Our <Link href="/em-audit-tool">E/M audit tool</Link> lets you check a level against the documentation yourself.</p>

      <h3>Denial prediction and work queue prioritization</h3>
      <p>Predictive models score claims for denial risk before submission or rank open denials by likely recovery. This helps a small team decide what to work first. The prediction is only as good as the data behind it, and it doesn’t fix the root cause on its own.</p>

      <h3>Prior authorization</h3>
      <p>Tools can check whether a service requires authorization, pre-fill payer forms from the chart, and track status. Payers are also moving toward electronic prior authorization, which makes automation more practical. Clinical judgment and payer criteria still decide the outcome.</p>

      <h3>Payment posting and reconciliation</h3>
      <p>Auto-posting from 835 ERAs is standard in most PM systems. AI adds help with paper EOBs, lockbox images, and matching deposits to remittances. Exceptions such as recoupments, takebacks, and unusual adjustment codes still need a person.</p>

      <h3>Patient statements and payment outreach</h3>
      <p>Automated statements, text reminders, and payment plan offers are common. Some tools adjust timing and channel based on how a patient has responded before. Clear statements also reduce calls about deductibles and coinsurance, a topic we cover in <Link href="/blog/deductible-vs-out-of-pocket-maximum">deductible vs out-of-pocket maximum</Link>.</p>

      <h3>Claim status bots and call automation</h3>
      <p>Bots can check claim status through payer portals or 276/277 transactions, and voice bots can sit on hold and navigate payer phone menus. They’re useful for high-volume status checks. Complex calls, such as disputing a denial or requesting a reprocess, still go better with an experienced biller. Whoever makes the call, the note should be consistent; our <Link href="/call-note-builder">call note builder</Link> formats one quickly.</p>

      <h2>Limits and risks</h2>
      <ul>
        <li><strong>Accuracy:</strong> language models can produce confident, wrong answers, including codes that don’t exist or don’t match the note. Rules-based tools can be outdated if the vendor doesn’t load updates on time.</li>
        <li><strong>Compliance exposure:</strong> the provider and practice are responsible for what is billed, not the software. Systematic upcoding or unsupported codes from a tool are still the practice’s problem in an audit.</li>
        <li><strong>HIPAA and data handling:</strong> any vendor that receives protected health information must sign a business associate agreement (BAA). Don’t paste PHI into public AI chat tools that aren’t covered by a BAA.</li>
        <li><strong>Payer policies:</strong> each payer has its own rules, medical policies, and portal terms of use. Some portals restrict automated access, so confirm a bot is permitted before relying on it.</li>
        <li><strong>Bias and bad training data:</strong> a model trained on past claims learns past mistakes, including old coding habits and inconsistent documentation.</li>
        <li><strong>Hidden errors at scale:</strong> a person makes one mistake at a time. An automated process can repeat the same mistake on every claim until someone notices.</li>
      </ul>

      <Callout title="Keep a human in the loop">
        Let automation handle repetitive, rule-based work, and keep people on the decisions that carry risk: code selection, appeals, write-offs, and anything a payer could audit. Spot-check automated output regularly, even when it seems to be working.
      </Callout>

      <h2>How to evaluate an AI billing vendor</h2>
      <ol>
        <li><strong>Ask what it actually does.</strong> Is it rules, RPA, machine learning, or a language model? Which tasks are fully automated and which produce suggestions?</li>
        <li><strong>Ask for explanations.</strong> A coding or denial tool should show why it made a recommendation, such as the documentation text or the edit it matched.</li>
        <li><strong>Confirm update practices.</strong> How quickly are code set changes, NCCI quarterly updates, and payer rule changes loaded?</li>
        <li><strong>Review security and the BAA.</strong> Where is data stored, who can access it, is it used to train models, and what happens when the contract ends?</li>
        <li><strong>Test on your own claims.</strong> Run a pilot on a sample of real encounters and have your coders compare results. Vendor demos use clean data.</li>
        <li><strong>Check integration.</strong> Does it work with your PM system, EHR, and clearinghouse, or will staff re-key data?</li>
        <li><strong>Define how you’ll measure it.</strong> Agree on before-and-after measures, such as first-pass acceptance and denial rates, before you sign.</li>
      </ol>
      <p>If you’re not sure where automation would help, start by finding where your claims fail. A <Link href="/audit">free denial audit</Link> can show whether the problems are front-end, coding, or follow-up.</p>

      <h2>What AI means for billing and coding careers</h2>
      <p>Automation is most likely to take over the most repetitive tasks: routine status checks, simple eligibility lookups, clean payment posting. The work that remains needs judgment: reading payer policies, writing appeals, auditing documentation, handling exceptions, and explaining bills to patients.</p>
      <ul>
        <li>Learn how your tools reach their results so you can catch errors.</li>
        <li>Build skills in denial management, auditing, and payer contracts.</li>
        <li>Keep coding knowledge current; reviewing a suggestion requires knowing the right answer.</li>
        <li>Get comfortable with reports and data, since automated workflows produce a lot of both.</li>
      </ul>
      <p>For a broader look at the skills employers expect, see our <Link href="/billing-specialist-guide">billing specialist guide</Link>.</p>

      <h2>Frequently asked questions</h2>
      <h3>Will AI replace medical billers and coders?</h3>
      <p>It’s changing the work more than removing it. Repetitive tasks are being automated, while review, appeals, auditing, and exception handling still need trained people.</p>
      <h3>Is it safe to use ChatGPT or similar tools for billing work?</h3>
      <p>Not with patient information unless the tool is covered by a BAA and approved by your organization. General questions without PHI are lower risk, but verify any coding answer against official sources.</p>
      <h3>Who is responsible if an AI tool suggests the wrong code?</h3>
      <p>The provider and the billing organization. Payers and auditors hold the practice responsible for what’s submitted, regardless of the software used.</p>

      <p><em>This article is general information, not legal or compliance advice. Review vendor contracts and HIPAA obligations with your compliance team, and confirm billing rules with each payer.</em></p>
    </ArticleLayout>
  );
}
