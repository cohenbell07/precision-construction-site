import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Phone, MapPin, Check } from "lucide-react";
import { locations, getLocation } from "@/lib/locations";
import { services } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { Section } from "@/components/Section";
import { BookConsultationCTA } from "@/components/BookConsultationCTA";

type Props = { params: Promise<{ city: string }> };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

export async function generateStaticParams() {
  return locations.map((loc) => ({ city: loc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const loc = getLocation(city);
  if (!loc) return {};
  const url = `${SITE_URL}/areas/${loc.slug}`;
  return {
    title: `${loc.headline} | PCND`,
    description: loc.metaDescription,
    keywords: [
      `construction ${loc.name}`,
      `renovation contractor ${loc.name}`,
      `basement development ${loc.name}`,
      `kitchen renovation ${loc.name}`,
      `bathroom renovation ${loc.name}`,
      `general contractor ${loc.name}`,
      `${loc.name} construction company`,
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${loc.headline} | PCND`,
      description: loc.metaDescription,
      images: [{ url: `${SITE_URL}/servicehero.webp`, width: 1536, height: 838, alt: `${loc.headline} — PCND` }],
    },
    twitter: { card: "summary_large_image", title: `${loc.headline} | PCND`, description: loc.metaDescription, images: [`${SITE_URL}/servicehero.webp`] },
  };
}

export default async function AreaPage({ params }: Props) {
  const { city } = await params;
  const loc = getLocation(city);
  if (!loc) notFound();

  const url = `${SITE_URL}/areas/${loc.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${SITE_URL}/areas-we-serve` },
          { "@type": "ListItem", position: 3, name: loc.name, item: url },
        ],
      },
      {
        "@type": ["GeneralContractor", "HomeAndConstructionBusiness"],
        name: `${BRAND_CONFIG.shortName} — ${loc.name}`,
        description: loc.metaDescription,
        url,
        telephone: BRAND_CONFIG.contact.phoneFormatted,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "City", name: loc.name, containedInPlace: { "@type": "AdministrativeArea", name: "Alberta" } },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ━━━ HERO — DARK ━━━ */}
      <section className="pt-32 pb-14 bg-black relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/areas-we-serve" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-[11px] font-bold uppercase tracking-[0.18em] transition-colors mb-7">
            <MapPin aria-hidden="true" size={13} /> Areas We Serve
          </Link>
          <h1 className="font-hero uppercase tracking-wide text-4xl sm:text-6xl lg:text-7xl leading-[0.95] mb-6 hero-heading-shimmer">
            {loc.headline}
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
            {loc.metaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <Link href={`/get-quote?location=${loc.slug}`} className="group inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black text-base tracking-wide hover:bg-sandstone transition-colors">
              Get a Free Quote <ArrowRight aria-hidden="true" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href={`tel:${BRAND_CONFIG.contact.phoneHref}`} className="inline-flex items-center justify-center gap-2 text-white/85 hover:text-white px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors">
              <Phone aria-hidden="true" className="w-4 h-4" /> {BRAND_CONFIG.contact.phoneFormatted}
            </a>
          </div>
        </div>
      </section>

      {/* ━━━ LOCAL INTRO — CREAM ━━━ */}
      <Section variant="cream" padding="md" containerClassName="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: loc.intro }} />

        {loc.neighbourhoods.length > 0 && (
          <div className="mt-10">
            <p className="cream-eyebrow text-[10px] sm:text-xs font-mono tracking-[0.22em] uppercase font-medium mb-4">Communities We Serve in {loc.name}</p>
            <div className="flex flex-wrap gap-2">
              {loc.neighbourhoods.map((n) => (
                <span key={n} className="inline-flex items-center gap-1.5 text-sm text-ink bg-bone-soft border border-bone-hairline rounded-full px-3.5 py-1.5">
                  <Check aria-hidden="true" className="w-3.5 h-3.5 text-sandstone-dark" /> {n}
                </span>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* ━━━ SERVICES IN THIS AREA — CREAM ━━━ */}
      <Section variant="cream" padding="md" topRule={false} containerClassName="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10 cream-rule" />
          <p className="cream-eyebrow text-[10px] sm:text-xs font-mono tracking-[0.22em] uppercase font-medium">Our Services in {loc.name}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((s) => (
            <Link key={s.id} href={`/services/${s.id}`} className="group flex items-center justify-between gap-3 paper-card rounded-md px-4 py-3.5 hover:border-sandstone-dark transition-colors">
              <span className="font-heading font-bold text-sm uppercase tracking-tight text-ink group-hover:text-sandstone-dark transition-colors leading-snug">{s.title}</span>
              <ArrowRight aria-hidden="true" className="w-4 h-4 text-sandstone-muted group-hover:text-sandstone-dark shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </Section>

      {/* ━━━ BOOK CONSULTATION — CREAM ━━━ */}
      <BookConsultationCTA
        eyebrow={`Serving ${loc.name}`}
        headline="Let's Walk Your Space"
      />
    </>
  );
}
