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
    default: `Calgary Construction & Renovation Company | Basements, Additions & More | PCND`,
    template: `%s | ${BRAND_CONFIG.shortName}`,
  },
  description:
    `Calgary's trusted construction & renovation company since 1968. Basement developments, home additions, full renovations, commercial builds, flooring, cabinets & more. Free estimates. 5% price beat guarantee.`,
  keywords: [
    "Calgary construction company",
    "Calgary renovation company",
    "basement development Calgary",
    "basement finishing Calgary",
    "home renovation Calgary",
    "home additions Calgary",
    "Calgary general contractor",
    "commercial construction Calgary",
    "kitchen renovation Calgary",
    "bathroom renovation Calgary",
    "flooring installation Calgary",
    "custom showers Calgary",
    "cabinets Calgary",
    "countertops Calgary",
    "construction company near me",
    "PCND",
    "Precision Construction & Decora",
    "Precision Construction and Decora",
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
    title: `Calgary Construction & Renovation Company | PCND`,
    description: `Calgary's trusted construction company since 1968. Basement developments, home renovations, additions & commercial builds. Free estimates.`,
    images: [
      {
        url: `${SITE_URL}/servicehero.webp`,
        width: 1536,
        height: 838,
        alt: `${BRAND_CONFIG.name} - Calgary Construction Company`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Calgary Construction & Renovation | PCND`,
    description: `Calgary's trusted construction company since 1968. Basements, renovations, additions & more. Free estimates.`,
    images: [`${SITE_URL}/servicehero.webp`],
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
    image: `${SITE_URL}/servicehero.webp`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Basement Developments" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Additions & Full Home Renovations" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial & Multi-Unit Construction" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Flooring Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Showers & Steam Showers" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cabinets & Millwork" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Countertops" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior Finishing & Carpentry" } },
      ],
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "16:00" },
    ],
    sameAs: [
      "https://www.facebook.com/profile.php?id=61588370031463",
    ],
  };

  return (
    <html lang="en" className="bg-black">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `html:not(.hydrated){visibility:hidden;background:#000}html.hydrated{visibility:visible}`}} />
        <script dangerouslySetInnerHTML={{ __html: `setTimeout(function(){document.documentElement.classList.add("hydrated")},2500)`}} />
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

