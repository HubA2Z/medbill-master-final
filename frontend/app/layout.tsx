import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  // Fixes: "Title is too short" & "Canonical issues"
  metadataBase: new URL('https://www.enhancebilling.com'),
  title: "Standardized RCM Call Note Builder Tool | Enhancebilling",
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
        <meta name="google-site-verification" content="U5-_BabALTrXe-pVP1Jn3B21DAl614qbByTt7IkrHVw" />
       

        {/* Google AdSense Auto Ads Script */}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2477127741276998"
     crossorigin="anonymous">
      </script>
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
