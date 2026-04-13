import { BRAND_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

export const metadata = {
  title: `10% Off Select Materials Calgary | Supplier Discount | ${BRAND_CONFIG.shortName}`,
  description: `Save 10% on select construction materials in Calgary when bundled with our services. Quartz, porcelain, LVP, laminate, hardware & fixtures. Free quote from PCND.`,
  keywords: [
    "10% off construction materials Calgary",
    "supplier discount Calgary",
    "Calgary flooring materials deal",
    "quartz countertops discount Calgary",
    "LVP flooring deal Calgary",
    "Calgary material bundle",
    "PCND supplier discount",
  ],
  alternates: { canonical: `${SITE_URL}/get-quote/supplier-deals` },
  openGraph: {
    title: `10% Off Select Materials in Calgary | ${BRAND_CONFIG.shortName}`,
    description: `Save 10% on quartz, porcelain, LVP, laminate, hardware and fixtures when bundled with install. Free quote within 24 hours.`,
    url: `${SITE_URL}/get-quote/supplier-deals`,
    images: [{ url: `${SITE_URL}/servicehero.webp`, width: 1536, height: 838, alt: "Material supplier deals in Calgary by PCND" }],
  },
};

export default function SupplierDealLayout({ children }: { children: React.ReactNode }) {
  return children;
}
