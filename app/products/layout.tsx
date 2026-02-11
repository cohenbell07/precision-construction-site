import { BRAND_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

export const metadata = {
  title: `Products & Materials | ${BRAND_CONFIG.shortName}`,
  description: `Construction materials in Calgary: flooring, countertops, cabinets, windows, paint & more. 5% price beat guarantee. PCND - expect only the best.`,
  keywords: [
    "construction materials Calgary",
    "PCND products",
    "flooring Calgary",
    "countertops Calgary",
    "cabinets Calgary",
    "Calgary building supplies",
  ],
  alternates: { canonical: `${SITE_URL}/products` },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
