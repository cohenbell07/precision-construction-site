import { BRAND_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

export const metadata = {
  title: `Contact Us | Calgary Construction | ${BRAND_CONFIG.shortName}`,
  description: `Contact PCND for Calgary construction quotes. Call ${BRAND_CONFIG.contact.phoneFormatted} or request a free quote online. Family-owned contractors since 1968.`,
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
