const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

const TITLE = "5% Price Beat Guarantee | Calgary Construction";
const DESCRIPTION =
  "Bring PCND a written quote from a licensed competitor and we'll beat it by at least 5% — in writing. The builder Calgary has trusted since 1968, at a price that beats the lowballer.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/price-beat` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/price-beat`,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: `${SITE_URL}/servicehero.webp`, width: 1536, height: 838, alt: "PCND 5% Price Beat Guarantee — Calgary" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/servicehero.webp`] },
};

export default function PriceBeatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
