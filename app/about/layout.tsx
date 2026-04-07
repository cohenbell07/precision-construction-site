import { BRAND_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

export const metadata = {
  title: `About Us | Calgary Family-Owned Construction | ${BRAND_CONFIG.shortName}`,
  description: `Meet the 3rd-generation family behind PCND. Serving Calgary with premium construction, renovations & finishing since 1968. Expect only the best.`,
  keywords: [
    "About PCND",
    "Precision Construction & Decora",
    "Calgary construction company",
    "family-owned construction Calgary",
  ],
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
