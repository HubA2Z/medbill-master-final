import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import { pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Disclaimer',
  description: 'Enhancely’s articles and tools are general reference information for medical billing professionals, not legal, medical, or financial advice.',
  path: '/disclaimer',
});

const L = 'font-semibold text-brand-ink underline underline-offset-2';

export default function Page() {
  return (
    <LegalPage
      title="Disclaimer"
      path="/disclaimer"
      updated="October 2026"
      intro={<>Enhancely publishes free tools and articles to help medical billing and coding professionals do their work. Please read this disclaimer before relying on anything on this site.</>}
      sections={[
        { id: 'general', title: '1. General information only', body: <p>Everything on Enhancely, including articles, guides, checklists, templates, and tool results, is general educational information. It is not legal, medical, compliance, tax, or financial advice, and it doesn’t create a professional relationship. For decisions about a specific claim, contract, or compliance question, consult the payer, your compliance officer, or a qualified professional.</p> },
        { id: 'coding', title: '2. Coding and billing rules change', body: <p>Code sets, payer policies, and government rules (including CMS, Medicare Administrative Contractor, and commercial payer policies) change often and vary by payer, state, and contract. We work to keep content accurate and dated, but we can’t guarantee it is complete or current. Always confirm codes, modifiers, coverage, and deadlines with the official source and the payer before you bill or appeal.</p> },
        { id: 'tools', title: '3. Tool results are a reference, not a guarantee', body: <p>The ICD-10 search, claim scrubber, E/M audit tool, and call note builder are reference aids. A “pass” or “supported” result does not guarantee that a claim will be paid, and a warning doesn’t mean a claim is wrong. Final code selection and billing decisions are the responsibility of the provider and billing staff based on the medical record.</p> },
        { id: 'cpt', title: '4. Trademarks and code sets', body: <p>CPT® is a registered trademark of the American Medical Association. Enhancely does not reproduce CPT code descriptions. ICD-10-CM data comes from the National Library of Medicine Clinical Tables service. Payer and software names are trademarks of their owners and are used only to identify them; no endorsement is implied.</p> },
        { id: 'ads', title: '5. Advertising and external links', body: <p>Enhancely is free to use and is supported by advertising. Ads are provided by third-party networks and are labeled “Advertisement” or “Sponsored”. We don’t endorse advertised products, and ads don’t influence what we write. Links to other websites are provided for convenience; we aren’t responsible for their content. See our <Link href="/privacy" className={L}>Privacy Policy</Link> for how ad cookies work.</p> },
        { id: 'liability', title: '6. Limitation of liability', body: <p>Enhancely and its author are not liable for any loss, denial, recoupment, penalty, or damage arising from the use of this site or reliance on its content. See our <Link href="/terms" className={L}>Terms of Service</Link> for details.</p> },
        { id: 'contact', title: '7. Corrections', body: <p>Found an error or an outdated rule? Please tell us through the <Link href="/contact" className={L}>contact page</Link> and we’ll review and correct it.</p> },
      ]}
    />
  );
}
