import type { Metadata } from "next";
import Script from "next/script"; // ✅ Import the Script component
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MedBillMaster | ICD-10 Coding Intelligence",
  description: "Advanced medical billing search engine and revenue audit tool.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-21RM0ZXDG5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-21RM0ZXDG5');
</script>


        
        {/* ✅ Google AdSense Auto Ads Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9762733555560266"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased bg-slate-50 flex flex-col min-h-screen">
        <Header />
        <ul className="flex-grow">{children}</ul>
        <Footer />
      </body>
    </html>
  );
}
