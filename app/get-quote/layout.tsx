import { BRAND_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

const TITLE = "Free Quote | Calgary Construction";
const DESCRIPTION = `Get a free Calgary construction quote from PCND. Flooring, cabinets, countertops, basements, showers & more. Family-owned contractors since 1968.`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/get-quote` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/get-quote`,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: `${SITE_URL}/servicehero.webp`, width: 1536, height: 838, alt: "PCND — Calgary construction & renovation" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/servicehero.webp`] },
};

export default function GetQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
