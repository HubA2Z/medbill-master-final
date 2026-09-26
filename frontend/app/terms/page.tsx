import LegalPage from '@/components/LegalPage';
import { pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Terms of Service',
  description:
    'Terms governing use of Enhancely’s ICD-10 search and billing tools, including use license, accuracy disclaimer, no-PHI requirement, and limitation of liability.',
  path: '/terms',
});

export default function Page() {
  return (
    <LegalPage
      title="Terms of Service"
      path="/terms"
      updated="September 2026"
      notice={<><strong>Important:</strong> Enhancely is a reference tool. We do not guarantee the accuracy of ICD-10-CM codes returned by search queries. Final coding decisions must be verified by a Certified Professional Coder (CPC) or equivalent credentialed specialist.</>}
      sections={[
        { id: 'acceptance', title: 'A. Acceptance of terms', body: <p>By accessing Enhancely, you agree to be bound by these Terms and all applicable laws and regulations governing the United States healthcare sector. If you do not agree with any part of these terms, you may not access the service.</p> },
        { id: 'license', title: 'B. Use license', body: <p>Permission is granted to medical billing professionals and clinic administrators to use this platform for legitimate claim research. You may not scrape, reproduce, or redistribute this site’s content for commercial database resale or competing services.</p> },
        { id: 'accuracy', title: 'C. Accuracy disclaimer', body: <p>Enhancely is a reference tool powered by the NLM Clinical Tables API. We do not guarantee the accuracy or completeness of ICD-10-CM codes. All final coding decisions must be verified by a Certified Professional Coder (CPC) or equivalent credentialed specialist.</p> },
        { id: 'phi', title: 'D. No PHI submission', body: <p>You must not enter Protected Health Information (PHI) — including patient names, Social Security Numbers, or dates of birth — into any search field or form that submits data to Enhancely. Enhancely is a B2B reference utility, not a patient-facing application.</p> },
        { id: 'liability', title: 'E. Financial liability', body: <p>In no event shall Enhancely or its partners be liable for any damages arising out of the use or inability to use this platform, including but not limited to claim denials, audit findings, or loss of clinic revenue resulting from reliance on search results.</p> },
        { id: 'modifications', title: 'F. Modifications', body: <p>Enhancely reserves the right to revise these terms at any time without notice. By continuing to use the platform after changes are posted, you agree to be bound by the revised terms.</p> },
      ]}
    />
  );
}
