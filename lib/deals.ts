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

/** Which service IDs each deal applies to. Empty = applies to all (bundle). */
const dealServiceMap: Record<string, string[]> = {
  basement: ["basements"],
  bundle: [], // any 2+ services
  supplier: ["painting", "flooring", "carpentry", "showers", "drywall", "countertops"],
};

export const PRICE_BEAT_GUARANTEE =
  "5% Price Beat Guarantee — send us any competitor quote and we'll beat it by at least 5%.";

/** Get deals that apply to a specific service ID. */
export function getDealsForService(serviceId: string): Deal[] {
  return deals.filter((deal) => {
    const ids = dealServiceMap[deal.id] || [];
    return ids.length === 0 || ids.includes(serviceId);
  });
}

/** Generate HTML summary of active deals for admin emails. */
export function getActiveDealsSummaryForEmail(serviceId: string): string {
  const applicable = getDealsForService(serviceId);
  const dealLines = applicable
    .map((d) => `<li><strong>${d.discount} — ${d.name}</strong>: ${d.description.split(".")[0]}.</li>`)
    .join("");
  const pricebeat = `<li>${PRICE_BEAT_GUARANTEE}</li>`;
  return `<div style="margin-top:16px;padding:12px 16px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;">
    <p style="margin:0 0 4px;font-weight:bold;color:#166534;">${applicable.length > 0 ? "Active Deals for This Service" : "Active Promotions"}</p>
    <ul style="margin:0;padding-left:18px;color:#15803d;">${dealLines}${pricebeat}</ul>
  </div>`;
}

/** Format deals for the AI chat system prompt. */
export function getDealsForChatPrompt(): string {
  return deals
    .map(
      (d) =>
        `- **${d.name}**: ${d.description} → Direct users to ${d.url} (${d.ctaText})`
    )
    .join("\n");
}
