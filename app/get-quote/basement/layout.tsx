import { BRAND_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

export const metadata = {
  title: `15% Off Basement Development Calgary | Free Quote | ${BRAND_CONFIG.shortName}`,
  description: `Save 15% on full basement renovations in Calgary. Turnkey development — framing, electrical, plumbing, drywall, flooring & finishes. Permits handled. Free quote within 24 hours.`,
  keywords: [
    "15% off basement renovation Calgary",
    "basement development Calgary deal",
    "basement finishing Calgary discount",
    "basement renovation Calgary cost",
    "Calgary basement contractor",
    "basement suite Calgary",
    "legal basement suite Calgary",
    "PCND basement deal",
  ],
  alternates: { canonical: `${SITE_URL}/get-quote/basement` },
  openGraph: {
    title: `15% Off Basement Development in Calgary | ${BRAND_CONFIG.shortName}`,
    description: `Turn your basement into livable space — 15% off full basement renovations. Family-owned Calgary contractors since 1968.`,
    url: `${SITE_URL}/get-quote/basement`,
    images: [{ url: `${SITE_URL}/basementland02.webp`, width: 1248, height: 838, alt: "Basement development in Calgary by PCND" }],
  },
};

export default function BasementDealLayout({ children }: { children: React.ReactNode }) {
  return children;
}
