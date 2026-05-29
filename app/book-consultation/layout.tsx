const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

const TITLE = "Book a Free Consultation | Calgary Construction";
const DESCRIPTION =
  "Book a free in-home consultation with PCND. We'll walk your space, talk through your renovation or build, and put a real plan together. No pressure, no obligation. Calgary's family-owned builder since 1968.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/book-consultation` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/book-consultation`,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: `${SITE_URL}/servicehero.webp`, width: 1536, height: 838, alt: "Book a free consultation with PCND in Calgary" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/servicehero.webp`] },
};

export default function BookConsultationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
