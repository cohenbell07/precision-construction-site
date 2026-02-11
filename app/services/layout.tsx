import { BRAND_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

export const metadata = {
  title: `Our Services | ${BRAND_CONFIG.shortName}`,
  description: `Professional construction services in Calgary: flooring, custom showers, cabinets, countertops, basements, carpentry & more. PCND - family-owned since 1968.`,
  keywords: [
    "Calgary construction services",
    "PCND services",
    "flooring installation Calgary",
    "custom showers Calgary",
    "cabinets Calgary",
    "countertops Calgary",
  ],
  alternates: { canonical: `${SITE_URL}/services` },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
