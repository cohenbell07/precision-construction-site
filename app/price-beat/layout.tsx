const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

export const metadata = {
  title: "5% Price Beat Guarantee | Calgary Construction",
  description:
    "Bring PCND a written quote from a licensed competitor and we'll beat it by at least 5% — in writing. The builder Calgary has trusted since 1968, at a price that beats the lowballer.",
  alternates: { canonical: `${SITE_URL}/price-beat` },
};

export default function PriceBeatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
