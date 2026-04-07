import { BRAND_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

export const metadata = {
  title: `Free Quote | Calgary Construction | ${BRAND_CONFIG.shortName}`,
  description: `Get a free Calgary construction quote from PCND. Flooring, cabinets, countertops, basements, showers & more. Family-owned contractors since 1968.`,
  alternates: { canonical: `${SITE_URL}/get-quote` },
};

export default function GetQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
