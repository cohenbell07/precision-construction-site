import { Metadata } from "next";
import { getServiceById } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

type Props = { params: { service: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = params;
  const svc = getServiceById(service);
  if (!svc) return { title: `Quote | ${BRAND_CONFIG.shortName}` };
  return {
    title: `Get Quote — ${svc.title} | ${BRAND_CONFIG.shortName}`,
    description: `Request a ${svc.title} quote from PCND. Calgary construction - expect only the best.`,
    alternates: { canonical: `${SITE_URL}/get-quote/${service}` },
  };
}

export default function ServiceQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
