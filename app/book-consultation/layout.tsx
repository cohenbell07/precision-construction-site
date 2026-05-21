const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

export const metadata = {
  title: "Book a Free Consultation | Calgary Construction",
  description:
    "Book a free in-home consultation with PCND. We'll walk your space, talk through your renovation or build, and put a real plan together. No pressure, no obligation. Calgary's family-owned builder since 1968.",
  alternates: { canonical: `${SITE_URL}/book-consultation` },
};

export default function BookConsultationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
