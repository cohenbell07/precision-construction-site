/**
 * Central config for all currently-active offers and promotions.
 *
 * Two surfaces consume this: the AI chat system prompt and the quote-tool
 * email (owner notification + customer confirmation). The Spring Build
 * promo UI (strip, scroll modal, homepage feature) reads from
 * `lib/promo.ts` directly and is unrelated to this file.
 *
 * The previous basement / bundle / supplier-deals entries were retired
 * alongside the per-deal quote forms — every service is 15% off site-wide
 * via the Spring Build event, and the Price Beat Guarantee is the only
 * other live offer.
 */

import { getActivePromo } from "./promo";

export interface ActiveOffer {
  /** Display name. Already contains any leading discount text, so renderers
   *  should not prepend the percentage again. */
  name: string;
  /** One-sentence blurb suitable for both emails and chat. */
  description: string;
  /** True for limited-time offers; false for always-on guarantees. */
  limitedTime: boolean;
  /** Human-friendly end date for limited-time offers ("June 30"). */
  endsAtDisplay?: string;
}

/** Always-on guarantee — independent of any sale. */
export const PRICE_BEAT_OFFER: ActiveOffer = {
  name: "5% Price Beat Guarantee",
  description:
    "Send us any comparable competitor quote and we'll beat it by at least 5%.",
  limitedTime: false,
};

/** Backwards-compat string export — a few callers still reference this name. */
export const PRICE_BEAT_GUARANTEE = PRICE_BEAT_OFFER.description;

/** All currently active offers: limited-time first, then always-on. */
export function getActiveOffers(): ActiveOffer[] {
  const offers: ActiveOffer[] = [];
  const promo = getActivePromo();
  if (promo) {
    offers.push({
      name: `${promo.label} — ${promo.shortHeadline}`,
      description: promo.italicLine,
      limitedTime: true,
      endsAtDisplay: promo.endsAtDisplay,
    });
  }
  offers.push(PRICE_BEAT_OFFER);
  return offers;
}

/**
 * Offers that apply to the given service. The Spring Build event applies
 * to every service site-wide, and Price Beat is always available, so both
 * are returned regardless. The serviceId parameter is preserved for future
 * per-service offers.
 */
export function getOffersForService(_serviceId?: string): ActiveOffer[] {
  return getActiveOffers();
}

/** HTML block for owner notification emails — lists every active offer. */
export function getActiveOffersEmailHtml(): string {
  const offers = getActiveOffers();
  if (offers.length === 0) return "";
  const items = offers
    .map((o) => {
      const endNote =
        o.limitedTime && o.endsAtDisplay ? ` <em>(through ${o.endsAtDisplay})</em>` : "";
      return `<li><strong>${o.name}</strong>${endNote}: ${o.description}</li>`;
    })
    .join("");
  return `
    <div style="margin-top:16px;padding:12px 16px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;">
      <p style="margin:0 0 6px;font-weight:bold;color:#166534;">Active Offers</p>
      <ul style="margin:0;padding-left:18px;color:#15803d;">${items}</ul>
    </div>
  `;
}

/** Plain-text bullets for the AI chat system prompt. */
export function getActiveOffersForChatPrompt(): string {
  return getActiveOffers()
    .map((o) => {
      const endNote =
        o.limitedTime && o.endsAtDisplay ? ` (through ${o.endsAtDisplay})` : "";
      return `- **${o.name}**${endNote}: ${o.description}`;
    })
    .join("\n");
}

// ─── Backwards-compat shims ────────────────────────────────────────────────
// Existing callers in app/api/quote/submit/route.ts and lib/chatPrompt.ts
// import these older names; the new helpers above are preferred for new code.

/** @deprecated use getActiveOffersEmailHtml. */
export function getActiveDealsSummaryForEmail(_serviceId?: string): string {
  return getActiveOffersEmailHtml();
}

/** @deprecated use getOffersForService. */
export function getDealsForService(_serviceId?: string): ActiveOffer[] {
  return getActiveOffers();
}

/** @deprecated use getActiveOffersForChatPrompt. */
export function getDealsForChatPrompt(): string {
  return getActiveOffersForChatPrompt();
}
