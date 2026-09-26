import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/em-coding-2026';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout slug={SLUG} cta={{ title: 'Master E/M coding in 2026', body: 'Get expert guidance on your E/M billing with a free 48-hour audit of recent claims.', label: 'Request free audit', href: '/audit' }}>
      <p className="lead">
        The American Medical Association (AMA) and CMS have introduced significant updates to Evaluation and Management (E/M) coding guidelines for 2026. These changes aim to reduce administrative burden while improving payment accuracy.
      </p>

      <h2>Major changes in 2026 E/M coding</h2>

      <h3>1. Revised time thresholds</h3>
      <p>Time-based billing thresholds have been adjusted, and many codes now require slightly more total time to qualify for higher levels. Documenting total time — both face-to-face and non-face-to-face activities — is more important than ever.</p>

      <h3>2. Enhanced medical decision making (MDM) guidelines</h3>
      <p>The MDM table has been refined with clearer definitions for:</p>
      <ul>
        <li>Number and complexity of problems addressed</li>
        <li>Amount and/or complexity of data to be reviewed and analyzed</li>
        <li>Risk of complications, morbidity, or mortality</li>
      </ul>

      <h3>3. New documentation standards</h3>
      <p>Providers must clearly document the medical necessity of the visit level. Vague notes like “patient doing well” are no longer sufficient for higher-level E/M codes.</p>

      <h2>Practical billing strategies for 2026</h2>
      <h3>For providers</h3>
      <ul>
        <li>Use the new MDM grid during patient encounters</li>
        <li>Document all time spent on the date of service (chart review, ordering tests, care coordination)</li>
        <li>Be specific about the severity and number of problems addressed</li>
      </ul>

      <h3>For billers &amp; coders</h3>
      <ul>
        <li>Double-check time documentation before submitting claims</li>
        <li>Watch for upcoding risk — payers are increasing audits</li>
        <li>Confirm diagnosis specificity with our <Link href="/icd10-intelligence">ICD-10 search</Link></li>
      </ul>

      <h2>Common pitfalls to avoid</h2>
      <ul>
        <li>Relying solely on time without supporting MDM elements</li>
        <li>Using outdated 2021 templates without updates</li>
        <li>Inconsistent documentation across providers</li>
      </ul>

      <Callout title="Pro tip">
        When in doubt between two levels, choose the lower one and strengthen your documentation. Clean claims get paid faster.
      </Callout>

      <h2>How Enhancely supports E/M coding</h2>
      <p>Our team audits recent E/M claims for under- and over-coding, and our <Link href="/tools">E/M level advisor</Link> — currently in development — will offer guideline-based level suggestions.</p>

      <h2>Next steps for your practice</h2>
      <ol>
        <li>Update your EHR templates to reflect 2026 guidelines</li>
        <li>Train all providers and billing staff</li>
        <li>Schedule an internal audit of recent E/M claims</li>
        <li><Link href="/audit">Book a free consultation</Link> with our revenue optimization team</li>
      </ol>

      <blockquote>“Accurate E/M coding isn’t just about compliance — it’s about fairly compensating the complex cognitive work our providers do every day.”</blockquote>
    </ArticleLayout>
  );
}
