import { BRAND_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

const TITLE = "Contact Us | Calgary Construction";
const DESCRIPTION = `Contact PCND for Calgary construction quotes. Call ${BRAND_CONFIG.contact.phoneFormatted} or request a free quote online. Family-owned contractors since 1968.`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "contact PCND",
    "Calgary construction quote",
    "construction contact Calgary",
  ],
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/contact`,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: `${SITE_URL}/servicehero.webp`, width: 1536, height: 838, alt: "Contact PCND — Calgary construction & renovation" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/servicehero.webp`] },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
