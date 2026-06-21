import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  // Fixes: "Title is too short" & "Canonical issues"
  metadataBase: new URL('https://www.enhancely.in'),
  title: "Standardized RCM Call Note Builder Tool | Enhancely",
  description: "Generate professional, standardized medical billing call notes instantly. Improve RCM efficiency and audit trails for free.",
  
  // Fixes: "Canonical" & "Hreflang"
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  
  // Open Graph for better social media sharing
  openGraph: {
    title: 'Enhancely | Advanced RCM & Medical Billing Tools',
    description: 'Professional tools designed for medical billers and RCM managers.',
    url: 'https://www.enhancely.in',
    siteName: 'Enhancely',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="U5-_BabALTrXe-pVP1Jn3B21DAl614qbByTt7IkrHVw" />
      </head>
      <body className="antialiased bg-slate-50 flex flex-col min-h-screen">
        <Header />
        {/* Changed <ul> to <main> for better semantic HTML/SEO */}
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
