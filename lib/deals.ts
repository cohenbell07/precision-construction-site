/**
 * Central config for all deals and promotions.
 * Used by the AI chat, email templates, and site pages.
 */

export interface Deal {
  id: string;
  name: string;
  discount: string;
  description: string;
  ctaText: string;
  url: string;
  category: "service" | "product";
  /** Short keyword for AI to match (e.g. "basement", "bundle", "price beat") */
  keywords: string[];
}

export const deals: Deal[] = [
  {
    id: "basement",
    name: "15% Off Basement Renovation",
    discount: "15%",
    description: "15% off full basement renovations — limited time. Turn your basement into livable space with turnkey development: framing, electrical, plumbing rough-ins, drywall, flooring, and finishes. Permits handled.",
    ctaText: "Get 15% Off — Request Quote",
    url: "/get-quote/basement",
    category: "service",
    keywords: ["basement", "basement renovation", "basement development"],
  },
  {
    id: "bundle",
    name: "15% Off Bundle (Supply + Install)",
    discount: "15%",
    description: "15% off when you bundle supply + install. Combine materials and installation for package pricing. Examples: Flooring + install, Cabinets + countertops + install, Full bathroom renovation.",
    ctaText: "Get 15% Off — Request Quote",
    url: "/get-quote/bundle",
    category: "product",
    keywords: ["bundle", "supply and install", "supply + install", "package"],
  },
  {
    id: "supplier",
    name: "10% Supplier Discount",
    discount: "10%",
    description: "10% off select materials. Special pricing on quartz & porcelain, LVP & laminate, hardware & fixtures while inventory lasts.",
    ctaText: "Get 10% Off — Request Quote",
    url: "/get-quote/supplier-deals",
    category: "product",
    keywords: ["supplier", "10%", "materials discount", "select materials"],
  },
  {
    id: "price-beat",
    name: "5% Price Beat Guarantee",
    discount: "5%",
    description: "We guarantee to beat any reputable competitor's quote by at least 5%. Applies to products from major suppliers. Customers can upload their competitor quote on our Products page using the 'Submit a Quote' / price beat form. 24-hour response, no hidden fees.",
    ctaText: "Submit a Quote (on Products page)",
    url: "/products#quote-form",
    category: "product",
    keywords: ["price beat", "5%", "competitor", "competitor quote", "beat quote", "lower price"],
  },
];

export const serviceDeals = deals.filter((d) => d.category === "service");
export const productDeals = deals.filter((d) => d.category === "product");

/** Format deals for the AI chat system prompt. */
export function getDealsForChatPrompt(): string {
  return deals
    .map(
      (d) =>
        `- **${d.name}**: ${d.description} → Direct users to ${d.url} (${d.ctaText})`
    )
    .join("\n");
}
