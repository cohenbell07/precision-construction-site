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
  return {
    title: `${service.title} | Calgary | ${BRAND_CONFIG.shortName}`,
    description: service.description,
    keywords: [
      `${service.title} Calgary`,
      `PCND ${service.title}`,
      `Calgary construction ${service.title.toLowerCase()}`,
    ],
    alternates: { canonical: `${SITE_URL}/services/${slug}` },
  };
}

export default function ServiceSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
