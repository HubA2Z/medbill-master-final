import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  // Fixes: "Title is too short" & "Canonical issues"
  metadataBase: new URL('https://www.enhancebilling.com'),
  title: "Free Medical Billing Call Note Builder & RCM Tools | Enhancebilling",
  description: "Boost RCM efficiency with our free Medical Billing Call Note Builder, ICD-10 search, and revenue audit tools. Standardize documentation and reduce denials.",
  
  // Fixes: "Canonical" & "Hreflang"
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  
  // Open Graph for better social media sharing
  openGraph: {
    title: 'Enhancebilling | Advanced RCM & Medical Billing Tools',
    description: 'Professional tools designed for medical billers and RCM managers.',
    url: 'https://www.enhancebilling.com',
    siteName: 'Enhancebilling',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-21RM0ZXDG5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-21RM0ZXDG5');
          `}
        </Script>

        {/* Google AdSense Auto Ads Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9762733555560266"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
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
