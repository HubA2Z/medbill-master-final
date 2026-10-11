import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import { pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Privacy Policy',
  description:
    'What information Enhancely collects, how it is used, how cookies and third-party advertising work on this site, and your choices. No Protected Health Information (PHI) is collected.',
  path: '/privacy',
});

const L = 'font-semibold text-brand-ink underline underline-offset-2';
const ext = { target: '_blank', rel: 'noopener noreferrer', className: L } as const;

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      updated="October 2026"
      intro={<>This policy explains what information Enhancely (“we”, “us”) collects when you use enhancely.in, how we use it, how cookies and advertising work on this site, and the choices you have.</>}
      sections={[
        {
          id: 'collect',
          title: '1. Information you give us',
          body: (
            <>
              <p>We collect information only when you choose to send it through a form:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li><strong>Contact form:</strong> your name, email address, optional practice or company name, topic, and message.</li>
                <li><strong>Revenue audit and resource forms:</strong> your name, email address, practice name, and approximate monthly claim volume.</li>
                <li><strong>Newsletter sign-up:</strong> your email address.</li>
              </ul>
              <p className="mt-3">We use this information only to reply to you, provide what you asked for, and keep a record of the request. We don’t sell or rent it. Form submissions are stored in our database and sent to the site owner’s email inbox.</p>
            </>
          ),
        },
        { id: 'phi', title: '2. No patient health information', body: <p>Enhancely is a reference site for billing professionals. Please don’t enter Protected Health Information (PHI), such as patient names, dates of birth, member IDs, or medical records, into any form or tool. Our tools work with codes only and don’t need patient details.</p> },
        {
          id: 'tools',
          title: '3. How the free tools handle data',
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li><strong>ICD-10 search:</strong> search terms are sent to the National Library of Medicine (NLM) Clinical Tables service to return results. Your recent searches and code list are saved in your browser’s local storage, on your device only.</li>
              <li><strong>Claim scrubber:</strong> the codes, modifiers, and units you enter are sent to our server to run the checks and are not stored.</li>
              <li><strong>E/M audit tool and call note builder:</strong> run entirely in your browser; nothing you enter is sent to us.</li>
            </ul>
          ),
        },
        {
          id: 'cookies',
          title: '4. Cookies and similar technologies',
          body: (
            <>
              <p>Cookies are small files stored by your browser. We and our partners use them, along with local storage, for:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li><strong>Essential functions:</strong> for example, keeping the site administrator signed in, and remembering your ICD-10 code list.</li>
                <li><strong>Advertising:</strong> ad networks use cookies to show ads, limit how often you see the same ad, measure performance, and, where allowed, show ads based on your interests. We also store small settings in your browser to limit how often some ads appear.</li>
              </ul>
              <p className="mt-3">You can block or delete cookies in your browser settings. Some features may not work as expected if you do.</p>
            </>
          ),
        },
        {
          id: 'ads',
          title: '5. Third-party advertising (including Google)',
          body: (
            <>
              <p>Enhancely is free and supported by advertising. Ads may be served by third-party advertising networks, which may include Google AdSense and Adsterra. These companies may use cookies, web beacons, and similar technologies to collect information about your visits to this and other websites in order to provide ads.</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to this website or other websites.</li>
                <li>Google’s use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.</li>
                <li>You may opt out of personalized advertising by visiting Google’s <a href="https://adssettings.google.com" {...ext}>Ads Settings</a>. You can also opt out of some third-party vendors’ use of cookies for personalized advertising at <a href="https://www.aboutads.info/choices" {...ext}>aboutads.info</a>.</li>
                <li>Learn more in <a href="https://policies.google.com/technologies/partner-sites" {...ext}>how Google uses information from sites that use its services</a>.</li>
              </ul>
              <p className="mt-3">We don’t control the cookies set by advertising partners, and their use of information is governed by their own privacy policies.</p>
            </>
          ),
        },
        { id: 'logs', title: '6. Hosting and server logs', body: <p>The site is hosted on Vercel. Like most websites, our hosting provider automatically records basic technical information such as IP address, browser type, pages requested, and the date and time, to keep the site running and secure. We use this only in aggregate or to investigate abuse.</p> },
        { id: 'sharing', title: '7. Service providers', body: <p>We share information only with services that help us run the site: hosting (Vercel), database storage (MongoDB Atlas), file storage (Vercel Blob), email delivery (Google Workspace/Gmail), code lookups (NLM), and the advertising partners described above. We may also disclose information if required by law.</p> },
        { id: 'security', title: '8. Security and retention', body: <p>Data is sent over encrypted HTTPS connections. We keep form submissions only as long as needed to respond and keep reasonable business records, and we delete them on request. No method of transmission or storage is completely secure, but we take reasonable steps to protect your information.</p> },
        { id: 'rights', title: '9. Your choices and rights', body: <p>You can ask to access, correct, or delete the personal information you’ve sent us, or unsubscribe from emails at any time. Depending on where you live (for example, California or the European Economic Area), you may have additional rights under local law. Send requests through our <Link href="/contact" className={L}>contact page</Link>; we respond within 30 days.</p> },
        { id: 'children', title: '10. Children’s privacy', body: <p>Enhancely is intended for adults working in healthcare administration. We don’t knowingly collect personal information from children under 13.</p> },
        { id: 'changes', title: '11. Changes to this policy', body: <p>We may update this policy from time to time. The “Last updated” date at the top shows when it last changed. Questions? Use the <Link href="/contact" className={L}>contact page</Link>.</p> },
      ]}
    />
  );
}
