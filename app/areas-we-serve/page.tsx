import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { locations } from "@/lib/locations";
import { BRAND_CONFIG } from "@/lib/utils";
import { Section } from "@/components/Section";
import { BookConsultationCTA } from "@/components/BookConsultationCTA";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";
const TITLE = "Areas We Serve | Calgary & Surrounding Area | PCND";
const DESCRIPTION =
  "PCND serves Calgary and the surrounding area — every quadrant of Calgary plus Airdrie, Cochrane, Okotoks & Chestermere. Construction, renovations & finishing since 1968.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Calgary construction service area",
    "renovation contractor Calgary area",
    "construction company near me Calgary",
    "Airdrie renovation contractor",
    "Cochrane construction",
    "Okotoks renovation",
    "Chestermere contractor",
  ],
  alternates: { canonical: `${SITE_URL}/areas-we-serve` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/areas-we-serve`,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: `${SITE_URL}/servicehero.webp`, width: 1536, height: 838, alt: "PCND service area — Calgary & surrounding communities" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/servicehero.webp`] },
};

export default function AreasWeServePage() {
  const groups = [
    { region: "Calgary" as const, label: "Calgary", blurb: "Every quadrant of the city we've called home for three generations." },
    { region: "Surrounding Area" as const, label: "Surrounding Communities", blurb: "The towns and cities just beyond Calgary — served as part of our home territory." },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${SITE_URL}/areas-we-serve` },
        ],
      },
      {
        "@type": "ItemList",
        name: "Areas Served by PCND",
        itemListElement: locations.map((loc, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: loc.name,
          item: `${SITE_URL}/areas/${loc.slug}`,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ━━━ HERO — DARK ━━━ */}
      <section className="pt-32 pb-16 bg-black relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/55 font-medium mb-5">
            Calgary &amp; Surrounding Area
          </p>
          <h1 className="font-hero uppercase tracking-wide text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mb-5 hero-heading-shimmer">
            Areas We Serve
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            From the inner city to the newest communities on the edge of town — and the towns just beyond —
            we bring the same crew and the same standards to every corner of the Calgary area. Family-owned since 1968.
          </p>
        </div>
      </section>

      {/* ━━━ LOCATION GROUPS — CREAM ━━━ */}
      <Section variant="cream" containerClassName="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {groups.map((group) => {
            const groupLocations = locations.filter((l) => l.region === group.region);
            if (groupLocations.length === 0) return null;
            return (
              <div key={group.region}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-px w-10 cream-rule" />
                  <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">{group.label}</p>
                </div>
                <p className="text-ink-muted text-sm mb-6 max-w-xl">{group.blurb}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {groupLocations.map((loc) => (
                    <Link key={loc.slug} href={`/areas/${loc.slug}`} className="group block paper-card rounded-md p-5 hover:border-sandstone-dark transition-all duration-300">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h2 className="font-heading font-black text-lg uppercase tracking-tight text-ink group-hover:text-sandstone-dark transition-colors flex items-center gap-2">
                          <MapPin aria-hidden="true" className="w-4 h-4 text-sandstone-dark shrink-0" /> {loc.name}
                        </h2>
                        <ArrowRight aria-hidden="true" className="w-4 h-4 text-sandstone-muted group-hover:text-sandstone-dark shrink-0 mt-1 transition-colors" />
                      </div>
                      <p className="text-ink-muted text-sm leading-relaxed">{loc.blurb}</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ━━━ BOOK CONSULTATION — CREAM ━━━ */}
      <BookConsultationCTA
        eyebrow={`Serving ${BRAND_CONFIG.areasServed.slice(0, -1).join(", ")} & ${BRAND_CONFIG.areasServed.slice(-1)}`}
        headline="Let's Build Where You Are"
      />
    </>
  );
}
