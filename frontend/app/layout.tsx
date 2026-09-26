import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { JsonLd } from '@/components/ui';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Enhancely — ICD-10 Search, Call Note Builder & RCM Tools',
    template: '%s | Enhancely',
  },
  description: SITE.defaultDescription,
  applicationName: SITE.name,
  // NOTE: no global canonical here on purpose — each page sets its own via pageMeta().
  verification: { google: 'U5-_BabALTrXe-pVP1Jn3B21DAl614qbByTt7IkrHVw' },
  openGraph: { siteName: SITE.name, type: 'website', locale: 'en_US', url: SITE.url },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0d9488',
  width: 'device-width',
  initialScale: 1,
};

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  description: SITE.tagline,
};

const siteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE.url}/icd10-intelligence?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white">
        <JsonLd data={[orgLd, siteLd]} />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
