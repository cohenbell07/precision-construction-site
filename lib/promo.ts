/**
 * Site-wide promotional event config.
 *
 * One flag drives the announcement strip, the homepage Spring Build section
 * (replaces the basement promo while active), and the quote-form callout.
 * When `endsAt` passes, every surface auto-reverts — no code edit needed.
 */

export type Promo = {
  id: string;
  label: string;
  shortHeadline: string;
  italicLine: string;
  endsAtISO: string;
  endsAtDisplay: string;
  cta: { href: string; label: string };
  image: { src: string; alt: string; width: number; height: number };
};

export const SPRING_BUILD: Promo = {
  id: "spring-build-2026",
  label: "Spring Build Event",
  shortHeadline: "Save 15% on every service",
  italicLine: "Three generations of craft, on a spring rate — through June 30.",
  endsAtISO: "2026-06-30T23:59:59-06:00", // 11:59 PM Mountain Time, June 30
  endsAtDisplay: "June 30",
  cta: { href: "/get-quote", label: "Claim 15% Off" },
  image: {
    src: "/spring-build-event.webp",
    alt: "Overhead view of a dark walnut workbench in soft spring window light, with a cherry blossom branch, architect's blueprint, finished kitchen photograph, brass cabinet hardware, stone material samples, and a brass tap arranged around a central empty surface",
    width: 1659,
    height: 948,
  },
};

export function isPromoActive(promo: Promo, now: Date = new Date()): boolean {
  return now.getTime() <= new Date(promo.endsAtISO).getTime();
}

/* Convenience — the currently active promo, or null. */
export function getActivePromo(now: Date = new Date()): Promo | null {
  return isPromoActive(SPRING_BUILD, now) ? SPRING_BUILD : null;
}
