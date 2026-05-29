import type { Metadata } from "next";
import { Inter, DM_Serif_Display, Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { BRAND_CONFIG } from "@/lib/utils";
import { services } from "@/lib/services";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
  preload: false,
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
  preload: true,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
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
    // Contractor-specific types make us eligible for the home-services
    // knowledge panel; GeneralContractor is a subtype of HomeAndConstructionBusiness → LocalBusiness.
    "@type": ["GeneralContractor", "HomeAndConstructionBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: BRAND_CONFIG.name,
    alternateName: ["PCND", "Precision Construction and Decora"],
    description: BRAND_CONFIG.description,
    url: SITE_URL,
    telephone: BRAND_CONFIG.contact.phoneFormatted,
    email: BRAND_CONFIG.contact.email,
    logo: `${SITE_URL}/android-chrome-512x512.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: BRAND_CONFIG.address.locality,
      addressRegion: BRAND_CONFIG.address.region,
      addressCountry: BRAND_CONFIG.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BRAND_CONFIG.geo.latitude,
      longitude: BRAND_CONFIG.geo.longitude,
    },
    // Explicit City nodes for every served area — matches the on-page
    // claims and the /areas-we-serve location pages.
    areaServed: BRAND_CONFIG.areasServed.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: { "@type": "AdministrativeArea", name: "Alberta" },
    })),
    foundingDate: BRAND_CONFIG.established.toString(),
    slogan: BRAND_CONFIG.motto,
    priceRange: "$$",
    image: `${SITE_URL}/servicehero.webp`,
    // Full service catalogue, mapped from the canonical services list so it
    // can never drift from what the site actually offers.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction & Renovation Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title },
      })),
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "16:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "00:00", closes: "00:00", description: "Closed" },
    ],
    // aggregateRating is emitted ONLY when the owner has supplied a real
    // Google review count (BRAND_CONFIG.reviews.reviewCount). We never invent
    // a rating count — an unverified one risks a manual action from Google.
    ...(BRAND_CONFIG.reviews.reviewCount && BRAND_CONFIG.reviews.reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: BRAND_CONFIG.reviews.ratingValue,
            reviewCount: BRAND_CONFIG.reviews.reviewCount,
            bestRating: "5",
            worstRating: "1",
          },
        }
      : {}),
    sameAs: [BRAND_CONFIG.social.facebook, BRAND_CONFIG.social.instagram],
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
      <body className={`${inter.variable} ${dmSerif.variable} ${bebasNeue.variable} ${montserrat.variable} font-sans antialiased bg-black`}>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Analytics />
      </body>
    </html>
  );
}

