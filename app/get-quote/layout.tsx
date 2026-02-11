import { BRAND_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

export const metadata = {
  title: `Get a Quote | ${BRAND_CONFIG.shortName}`,
  description: `Request a free construction quote from PCND. Calgary flooring, cabinets, countertops, basements & more. Family-owned, expect only the best.`,
  alternates: { canonical: `${SITE_URL}/get-quote` },
};

export default function GetQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
