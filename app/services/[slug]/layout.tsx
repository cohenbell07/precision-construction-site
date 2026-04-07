import { Metadata } from "next";
import { getServiceById } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const service = getServiceById(slug);
  if (!service) {
    return { title: `Service | ${BRAND_CONFIG.shortName}` };
  }
  const serviceImageMap: Record<string, string> = {
    cabinets: "/cabinetsland.webp",
    showers: "/customshowerland.webp",
    countertops: "/countertopslandscape.webp",
    basements: "/basementland02.webp",
    carpentry: "/interiorfinishingland.webp",
    flooring: "/flooringinstalllandscape.webp",
    framing: "/framingland.webp",
    drywall: "/drywallland.webp",
    painting: "/paintingland.webp",
    garages: "/garage-deck-fence.webp",
    renovations: "/home-additions.webp",
    commercial: "/commercialland.webp",
  };
  const ogImage = serviceImageMap[slug] || "/servicehero.webp";
  return {
    title: `${service.title} | Calgary | ${BRAND_CONFIG.shortName}`,
    description: `Professional ${service.title.toLowerCase()} services in Calgary and surrounding areas. ${BRAND_CONFIG.shortName} — family-owned since 1968. Free estimates, 5% price beat guarantee.`,
    keywords: [
      `${service.title} Calgary`,
      `${service.title.toLowerCase()} Calgary Alberta`,
      `PCND ${service.title}`,
      `Calgary ${service.title.toLowerCase()} contractor`,
      `${service.title.toLowerCase()} services near me`,
      "Calgary construction company",
      "PCND",
    ],
    alternates: { canonical: `${SITE_URL}/services/${slug}` },
    openGraph: {
      title: `${service.title} | Calgary Construction | PCND`,
      description: `Professional ${service.title.toLowerCase()} services in Calgary. Family-owned since 1968. Free estimates.`,
      url: `${SITE_URL}/services/${slug}`,
      images: [{ url: `${SITE_URL}${ogImage}`, width: 1248, height: 838, alt: `${service.title} services in Calgary by PCND` }],
    },
  };
}

export default function ServiceSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
