import { BRAND_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

export const metadata = {
  title: `Basement Development & Home Renovations Calgary | Construction Services | ${BRAND_CONFIG.shortName}`,
  description: `Calgary's trusted construction company: basement developments, home renovations, additions & commercial builds. Cabinets, flooring, showers & more. Since 1968.`,
  keywords: [
    "basement development Calgary",
    "home renovation Calgary",
    "home additions Calgary",
    "Calgary construction company",
    "commercial construction Calgary",
    "full home renovation Calgary",
    "basement finishing Calgary",
    "kitchen renovation Calgary",
    "Calgary general contractor",
    "construction company near me",
    "flooring installation Calgary",
    "custom showers Calgary",
    "cabinets Calgary",
    "PCND",
  ],
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: `Calgary Construction Services | ${BRAND_CONFIG.shortName}`,
    description: `Professional residential & commercial construction in Calgary. Flooring, showers, cabinets, basements & more. Free estimates.`,
    url: `${SITE_URL}/services`,
    images: [{ url: `${SITE_URL}/servicehero.webp`, width: 1536, height: 838, alt: "Calgary construction services by PCND" }],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
