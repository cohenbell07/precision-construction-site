import { BRAND_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

export const metadata = {
  title: `15% Off Bundle (Supply + Install) Calgary | ${BRAND_CONFIG.shortName}`,
  description: `Bundle supply and installation for 15% off in Calgary. Flooring + install, cabinets + countertops + install, full bathroom renos & more. Free quote from PCND, Calgary's family-owned contractor since 1968.`,
  keywords: [
    "supply and install Calgary",
    "bundle construction Calgary",
    "Calgary renovation package deal",
    "cabinets and countertops Calgary",
    "flooring supply install Calgary",
    "full bathroom renovation Calgary",
    "PCND bundle deal",
  ],
  alternates: { canonical: `${SITE_URL}/get-quote/bundle` },
  openGraph: {
    title: `15% Off Bundle — Supply + Install in Calgary | ${BRAND_CONFIG.shortName}`,
    description: `Combine materials and installation for 15% off. Flooring, cabinets, countertops and full renos. Free quote within 24 hours.`,
    url: `${SITE_URL}/get-quote/bundle`,
    images: [{ url: `${SITE_URL}/servicehero.webp`, width: 1536, height: 838, alt: "Bundle supply and install services in Calgary by PCND" }],
  },
};

export default function BundleDealLayout({ children }: { children: React.ReactNode }) {
  return children;
}
