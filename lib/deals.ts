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
  category: "service";
  /** Short keyword for AI to match (e.g. "basement", "bundle") */
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
    category: "service",
    keywords: ["bundle", "supply and install", "supply + install", "package"],
  },
  {
    id: "supplier",
    name: "10% Supplier Discount",
    discount: "10%",
    description: "10% off select materials when bundled with our services. Special pricing on quartz & porcelain, LVP & laminate, hardware & fixtures while inventory lasts.",
    ctaText: "Get 10% Off — Request Quote",
    url: "/get-quote/supplier-deals",
    category: "service",
    keywords: ["supplier", "10%", "materials discount", "select materials"],
  },
];

export const serviceDeals = deals;

/** Format deals for the AI chat system prompt. */
export function getDealsForChatPrompt(): string {
  return deals
    .map(
      (d) =>
        `- **${d.name}**: ${d.description} → Direct users to ${d.url} (${d.ctaText})`
    )
    .join("\n");
}
