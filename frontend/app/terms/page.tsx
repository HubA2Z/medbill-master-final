import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import { pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Terms of Service',
  description:
    'The terms for using Enhancely’s free medical billing tools, articles, and forms: acceptable use, no PHI, accuracy, intellectual property, advertising, liability, and changes.',
  path: '/terms',
});

const L = 'font-semibold text-brand-ink underline underline-offset-2';

export default function Page() {
  return (
    <LegalPage
      title="Terms of Service"
      path="/terms"
      updated="October 2026"
      notice={<><strong>In short:</strong> Enhancely is a free reference site for billing professionals. Use it for legitimate work, don’t enter patient information, and always confirm codes and payer rules before you bill. Tool results and articles are guidance, not a guarantee of payment.</>}
      intro={<>These Terms of Service (“Terms”) govern your use of enhancely.in, including its articles, guides, and free tools (together, the “Site”). The Site is operated by Enhancely (“we”, “us”). By using the Site, you agree to these Terms. If you don’t agree, please don’t use the Site.</>}
      sections={[
        {
          id: 'service',
          title: '1. What Enhancely provides',
          body: (
            <>
              <p>Enhancely offers free educational content and reference tools for people who work in medical billing, coding, and revenue cycle management, including:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Articles and guides on billing, coding, denials, appeals, and careers.</li>
                <li>An ICD-10-CM code search powered by the National Library of Medicine (NLM) Clinical Tables service.</li>
                <li>A claim scrubber, an E/M audit tool, and a call note builder.</li>
                <li>Forms to contact us or request a free revenue audit.</li>
              </ul>
              <p className="mt-3">We may add, change, suspend, or remove any part of the Site at any time, without notice.</p>
            </>
          ),
        },
        {
          id: 'eligibility',
          title: '2. Who may use the Site',
          body: <p>The Site is intended for adults, especially healthcare billing and administrative professionals, students, and practice staff. You must be at least 18 years old, or the age of majority where you live, to submit a form on the Site.</p>,
        },
        {
          id: 'acceptable-use',
          title: '3. Acceptable use',
          body: (
            <>
              <p>You agree to use the Site only for lawful purposes. You must not:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Scrape, crawl, or copy the Site or its tools in bulk, or use automated scripts to send large numbers of requests.</li>
                <li>Try to break, overload, probe, or bypass the security of the Site, its forms, or its admin area.</li>
                <li>Submit false, misleading, or spam messages through any form.</li>
                <li>Upload or send anything that contains malware or that infringes someone else’s rights.</li>
                <li>Use the Site or its content to commit fraud, including billing for services not provided or not supported by documentation.</li>
              </ul>
            </>
          ),
        },
        {
          id: 'phi',
          title: '4. No patient health information (PHI)',
          body: <p>Our tools work with codes only. You must not enter Protected Health Information, such as patient names, dates of birth, Social Security numbers, member IDs, addresses, or medical records, into any tool or form on the Site. Enhancely is not a covered entity or business associate for information you choose to enter, and we don’t want to receive PHI. If PHI is sent to us by mistake, we will delete it. See our <Link href="/hipaa" className={L}>HIPAA &amp; data security</Link> page.</p>,
        },
        {
          id: 'accuracy',
          title: '5. Accuracy and no professional advice',
          body: (
            <>
              <p>We work to keep the Site accurate and up to date, but coding rules, payer policies, and government regulations change often and differ by payer, state, and contract. The Site may contain errors or out-of-date information.</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Content on the Site is general information. It is not legal, medical, compliance, tax, or financial advice.</li>
                <li>Tool results, such as a “pass”, a warning, or a suggested E/M level, are reference aids. They don’t guarantee that a claim will be paid or that it complies with any payer’s rules.</li>
                <li>Final coding and billing decisions are the responsibility of the provider and billing staff, based on the medical record and the payer’s current policies.</li>
              </ul>
              <p className="mt-3">Please read our <Link href="/disclaimer" className={L}>Disclaimer</Link> for more detail.</p>
            </>
          ),
        },
        {
          id: 'ip',
          title: '6. Intellectual property',
          body: (
            <>
              <p>The Site’s design, text, graphics, and tools are owned by Enhancely or used with permission. You may read the Site, use the tools in your own work, print or save individual articles for personal or internal team use, and share links to any page.</p>
              <p className="mt-3">You may not republish, sell, or redistribute our articles or tools, or present them as your own, without written permission. Short quotes with a link back to the original page are fine.</p>
              <p className="mt-3">CPT® is a registered trademark of the American Medical Association; Enhancely does not reproduce CPT descriptions. ICD-10-CM data comes from the NLM. Payer, software, and other product names are trademarks of their owners and are used only for identification.</p>
            </>
          ),
        },
        {
          id: 'submissions',
          title: '7. Information you send us',
          body: <p>When you use a form, you agree that the information you provide is accurate and that we may use it to respond to you, as described in our <Link href="/privacy" className={L}>Privacy Policy</Link>. If you send us feedback or suggestions about the Site, we may use them to improve the Site without any obligation to you.</p>,
        },
        {
          id: 'audits',
          title: '8. Free revenue audits and services',
          body: <p>Requesting a free audit or consultation doesn’t create a contract or a professional relationship. Any billing services would be provided only under a separate written agreement, which would include appropriate data-protection terms, such as a Business Associate Agreement where HIPAA requires one.</p>,
        },
        {
          id: 'ads-links',
          title: '9. Advertising and third-party links',
          body: <p>The Site may display advertising from third parties, such as Google AdSense, and may link to other websites, including official sources like CMS and payer websites. We don’t control and aren’t responsible for third-party ads, websites, products, or services, and a link or ad is not an endorsement.</p>,
        },
        {
          id: 'warranty',
          title: '10. No warranty',
          body: <p>The Site and all content and tools are provided “as is” and “as available”, without warranties of any kind, whether express or implied, including warranties of accuracy, fitness for a particular purpose, and uninterrupted or error-free operation.</p>,
        },
        {
          id: 'liability',
          title: '11. Limitation of liability',
          body: <p>To the fullest extent permitted by law, Enhancely and its owner will not be liable for any indirect, incidental, or consequential damages, or for any lost revenue, claim denials, recoupments, penalties, or data loss, arising from your use of, or inability to use, the Site or its content. Because the Site is provided free of charge, our total liability for any claim relating to the Site is limited to US $100.</p>,
        },
        {
          id: 'indemnity',
          title: '12. Your responsibility',
          body: <p>You agree to be responsible for, and to hold Enhancely harmless from, claims arising from your misuse of the Site, your violation of these Terms, or billing and coding decisions you make.</p>,
        },
        {
          id: 'changes',
          title: '13. Changes to these Terms',
          body: <p>We may update these Terms from time to time. The “Last updated” date at the top shows when they last changed. If you keep using the Site after changes are posted, you accept the updated Terms.</p>,
        },
        {
          id: 'contact',
          title: '14. Contact',
          body: <p>Questions about these Terms? Send us a message through our <Link href="/contact" className={L}>contact page</Link>.</p>,
        },
      ]}
    />
  );
}
