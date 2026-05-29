import { BRAND_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

const TITLE = "About Us | Calgary Family-Owned Construction";
const DESCRIPTION = `Meet the 3rd-generation family behind PCND. Serving Calgary with premium construction, renovations & finishing since 1968. Expect only the best.`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "About PCND",
    "Precision Construction & Decora",
    "Calgary construction company",
    "family-owned construction Calgary",
  ],
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about`,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: `${SITE_URL}/servicehero.webp`, width: 1536, height: 838, alt: "About PCND — Calgary family-owned construction since 1968" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/servicehero.webp`] },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
