import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import GrainDotGrid from "@/components/GrainDotGrid";

import MeshGradientBackground from "@/components/MeshGradientBackground";

import ExitIntentModal from "@/components/ExitIntentModal";
import { Analytics } from "@vercel/analytics/react";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0d0800',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://hyperion.theutilitycompany.co'),
  title: "Hyperion Realty | Premium Tokenized Real Estate",
  description: "Own a piece of the world's most sought-after properties. Hyperion Realty tokenizes high-yield real estate, allowing for fractional investment and transparent dividend distribution via blockchain.",
  keywords: ["Hyperion Realty", "Tokenized Real Estate", "Property NFT", "Asset Backed NFT", "Fractional Ownership", "Real Estate Investing", "Real World Assets", "RWA", "Blockchain Real Estate", "Digital Deeds", "Property Investment", "Commercial Real Estate"],
  openGraph: {
    title: "Hyperion Realty | Liquid Architecture",
    description: "Own a piece of the world's most sought-after properties. Invest in high-yield real estate through secure fractional ownership.",
    url: "https://hyperion.theutilitycompany.co",
    siteName: "Hyperion Realty",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyperion Realty | The Future of Property",
    description: "Tokenizing global real estate. Own shares of premium physical properties through secure digital deeds.",
    creator: "@hyperionrealty",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white min-h-screen relative`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Hyperion Realty",
              "url": "https://hyperion.theutilitycompany.co",
              "logo": "https://hyperion.theutilitycompany.co/HRLogoDarkSymbol.png",
              "description": "Premium tokenized real estate enabling fractional investment via blockchain.",
              "parentOrganization": {
                "@type": "Organization",
                "name": "The Utility Company LLC"
              },
              "sameAs": ["https://twitter.com/hyperionrealty"]
            })
          }}
        />
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wcpuqqn21r");
          `}
        </Script>
        <MeshGradientBackground />
        <div className="relative z-10 w-full flex flex-col">
          {children}
        </div>
        <GrainDotGrid />
        <ExitIntentModal />
        <Analytics />
      </body>
    </html>
  );
}
