import type { Metadata } from "next";
import { Inter, Inter_Tight, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { FloatingChatbot } from "@/components/FloatingChatbot";
import { BRAND_CONFIG } from "@/lib/utils";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND_CONFIG.name} | Premium Construction Services in Calgary`,
    template: `%s | ${BRAND_CONFIG.shortName}`,
  },
  description:
    `${BRAND_CONFIG.motto} - Family-owned Calgary construction company since 1968. Serving Calgary since 1997 with premium residential and commercial construction services. We treat every client like family.`,
  keywords: [
    "construction",
    "renovation",
    "Calgary",
    "flooring",
    "custom showers",
    "cabinets",
    "countertops",
    "carpentry",
    "basement development",
  ],
  authors: [{ name: BRAND_CONFIG.name }],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://precisionconstruction.com",
    siteName: BRAND_CONFIG.shortName,
    title: `${BRAND_CONFIG.name} | ${BRAND_CONFIG.motto}`,
    description: `${BRAND_CONFIG.tagline} - Family-owned and operated. We treat every client like family and deliver only the best.`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${interTight.variable} ${dmSerif.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingChatbot />
        <Toaster />
      </body>
    </html>
  );
}

