import type { Metadata } from "next";
import Script from "next/script"; // Required for AdSense
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "EnhanceBilling | ICD-10 Coding Intelligence & RCM Tools",
  description: "Advanced medical billing search engine, revenue audit tools, and call note builders for healthcare professionals.",
  // Add your Google Search Console verification code here once you have it
  verification: {
    google: "YOUR_VERIFICATION_CODE_HERE", 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google AdSense Activation */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9762733555560266"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased bg-slate-50 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
