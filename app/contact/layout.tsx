import { BRAND_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

export const metadata = {
  title: `Contact | ${BRAND_CONFIG.shortName}`,
  description: `Contact PCND for construction quotes in Calgary. Call ${BRAND_CONFIG.contact.phoneFormatted} or request a quote online. Family-owned, expect only the best.`,
  keywords: [
    "contact PCND",
    "Calgary construction quote",
    "construction contact Calgary",
  ],
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
