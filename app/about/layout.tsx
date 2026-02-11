import { BRAND_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

export const metadata = {
  title: `About Us | ${BRAND_CONFIG.shortName}`,
  description: `${BRAND_CONFIG.tagline}. Meet the 3rd generation family behind PCND. Serving Calgary since 1997 with premium construction services.`,
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
