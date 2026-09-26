import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import { pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Privacy Policy',
  description:
    'What information Enhancely collects, how it is used and protected, and your rights. Business-level data only — no Protected Health Information (PHI) is collected or stored.',
  path: '/privacy',
});

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      updated="September 2026"
      intro={<>Enhancely (“we”, “us”, or “our”) is committed to protecting the privacy of healthcare billing professionals who use our platform. This policy describes what information we collect, how we use it, and how we protect it.</>}
      sections={[
        { id: 'collect', title: '1. Information we collect', body: <p>We collect business-level information only: practice name, professional email address, and monthly claim volume. This data is submitted voluntarily through our revenue audit and resource request forms. We do not collect, process, or store any Protected Health Information (PHI) or personal patient data.</p> },
        { id: 'hipaa', title: '2. HIPAA compliance statement', body: <p>Enhancely operates in compliance with HIPAA’s Administrative Simplification provisions. Our platform is designed as a non-PHI B2B reference utility. We strictly prohibit the entry of patient names, Social Security Numbers, or dates of birth through any interface on this platform.</p> },
        { id: 'use', title: '3. How we use your data', body: <p>Your submitted information is used exclusively by our certified billing team to contact you regarding your requested revenue audit, consultation, or resource. We do not sell, trade, or transfer your information to third parties without your explicit consent.</p> },
        { id: 'security', title: '4. Data security', body: <p>All data submitted through Enhancely is transmitted over SSL/TLS encrypted connections. Lead data stored in our systems is encrypted at rest using AES-256. Access to this data is restricted to authorized personnel protected by multi-factor authentication.</p> },
        { id: 'search', title: '5. Search data', body: <p>ICD-10 code searches are routed through our backend to the National Library of Medicine (NLM) Clinical Tables API. Search terms (e.g., “diabetes”) may be used in aggregate to improve our synonym mapping and user experience. No personally identifiable information is associated with search terms.</p> },
        { id: 'local', title: '6. Data stored in your browser', body: <p>The ICD-10 search saves your recent searches and code list in your browser’s local storage so they are there when you return. This data never leaves your device and you can clear it at any time from the tool or your browser settings. The Call Note Builder keeps everything in memory for the current tab only and does not save or transmit what you enter.</p> },
        { id: 'rights', title: '7. Your rights', body: <p>You may request deletion of any personal information we hold about you at any time. To submit a data deletion request, use the contact form on our <Link href="/audit" className="font-semibold text-brand-ink underline underline-offset-2">audit page</Link>. We will process your request within 30 business days.</p> },
      ]}
    />
  );
}
