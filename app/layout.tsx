import type { Metadata } from "next";
import { Inter, Inter_Tight, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { BRAND_CONFIG } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";

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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_CONFIG.name} | Calgary Construction | PCND`,
    template: `%s | ${BRAND_CONFIG.shortName}`,
  },
  description:
    `${BRAND_CONFIG.motto} - Family-owned Calgary construction company since 1968. PCND serves Calgary and area with premium residential and commercial construction, flooring, cabinets, countertops & more.`,
  keywords: [
    "PCND",
    "Precision Construction & Decora",
    "Precision Construction and Decora",
    "Calgary construction",
    "construction Calgary",
    "Calgary construction company",
    "construction company Calgary",
    "Calgary renovation",
    "renovation Calgary",
    "flooring Calgary",
    "custom showers Calgary",
    "cabinets Calgary",
    "countertops Calgary",
    "carpentry Calgary",
    "basement development Calgary",
    "family-owned construction Calgary",
  ],
  authors: [{ name: BRAND_CONFIG.name }],
  creator: BRAND_CONFIG.name,
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: BRAND_CONFIG.shortName,
    title: `${BRAND_CONFIG.name} | Calgary Construction | PCND`,
    description: `${BRAND_CONFIG.tagline} - Family-owned and operated. We treat every client like family and deliver only the best.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_CONFIG.name} | Calgary Construction`,
    description: BRAND_CONFIG.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: BRAND_CONFIG.name,
    alternateName: ["PCND", "Precision Construction and Decora"],
    description: BRAND_CONFIG.description,
    url: SITE_URL,
    telephone: BRAND_CONFIG.contact.phoneFormatted,
    email: BRAND_CONFIG.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Calgary",
      addressRegion: "AB",
      addressCountry: "CA",
    },
    areaServed: [
      { "@type": "City", name: "Calgary", containedInPlace: { "@type": "AdministrativeArea", name: "Alberta" } },
      { "@type": "AdministrativeArea", name: "Calgary and surrounding areas" },
    ],
    foundingDate: BRAND_CONFIG.established.toString(),
    slogan: BRAND_CONFIG.motto,
    priceRange: "$$",
    image: `${SITE_URL}/android-chrome-512x512.png`,
  };

  return (
    <html lang="en" className="bg-black">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Global chunk loading error handler
              (function() {
                if (typeof window === "undefined") return;
                
                // Listen for unhandled chunk loading errors
                window.addEventListener("error", function(event) {
                  var target = event.target;
                  if (target && target.tagName === "SCRIPT" && 
                      (event.message && (event.message.includes("Loading chunk") || 
                       event.message.includes("Failed to fetch dynamically imported module")) ||
                       target.src && target.src.includes("_next/static/chunks"))) {
                    console.warn("Chunk loading error detected, will retry...");
                    setTimeout(function() {
                      if (target.src) {
                        var script = document.createElement("script");
                        script.src = target.src;
                        script.async = true;
                        script.onerror = function() {
                          console.warn("Chunk retry failed, reloading page...");
                          window.location.reload();
                        };
                        document.head.appendChild(script);
                      } else {
                        window.location.reload();
                      }
                    }, 1000);
                  }
                }, true);

                // Handle unhandled promise rejections
                window.addEventListener("unhandledrejection", function(event) {
                  var error = event.reason;
                  if (error && error.message && 
                      (error.message.includes("Loading chunk") || 
                       error.message.includes("ChunkLoadError") || 
                       error.message.includes("Failed to fetch dynamically imported module"))) {
                    console.warn("Chunk loading promise rejection detected, will retry...");
                    event.preventDefault();
                    setTimeout(function() {
                      window.location.reload();
                    }, 1500);
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${interTight.variable} ${dmSerif.variable} font-sans antialiased bg-black`}>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Analytics />
      </body>
    </html>
  );
}

