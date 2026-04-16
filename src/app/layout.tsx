import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0d0800',
};

export const metadata: Metadata = {
  title: "Hyperion Realty | Premium Tokenized Real Estate",
  description: "Own a piece of the world's most sought-after properties. Hyperion Realty tokenizes high-yield real estate, allowing for fractional investment and transparent dividend distribution via blockchain.",
  keywords: ["Hyperion Realty", "Tokenized Real Estate", "Property NFT", "Asset Backed NFT", "Fractional Ownership", "Real Estate Investing", "Real World Assets", "RWA", "Blockchain Real Estate", "Digital Deeds", "Property Investment", "Commercial Real Estate"],
  openGraph: {
    title: "Hyperion Realty | Liquid Architecture",
    description: "Own a piece of the world's most sought-after properties. Invest in high-yield real estate through secure fractional ownership.",
    url: "https://hyperionrealty.io",
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
        <MeshGradientBackground />
        <div className="relative z-10 w-full flex flex-col">
          {children}
        </div>
        <GrainDotGrid />
        <ExitIntentModal />
      </body>
    </html>
  );
}
