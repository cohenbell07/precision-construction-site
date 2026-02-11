import { Metadata } from "next";
import { getProductCategoryBySlug } from "@/lib/productQuoteConfig";
import { BRAND_CONFIG } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

type Props = { params: { category: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = params;
  const config = getProductCategoryBySlug(category);
  if (!config) return { title: `Product Quote | ${BRAND_CONFIG.shortName}` };
  return {
    title: `Get Quote — ${config.title} | ${BRAND_CONFIG.shortName}`,
    description: `Request a ${config.title} quote from PCND. Calgary construction materials - expect only the best.`,
    alternates: { canonical: `${SITE_URL}/get-quote/product/${category}` },
  };
}

export default function ProductQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
