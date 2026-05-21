"use client";

/**
 * PromoStrip — thin editorial announcement above the sticky header.
 *
 * Pulls config from `lib/promo.ts`. Renders nothing when the active promo is
 * past its end date. Dismissable per session via sessionStorage so the user
 * can hide it and not be re-prompted on every page nav within the same tab.
 *
 * Visual: a quiet warm-dark strip with sandstone hairlines top + bottom,
 * italic serif copy, small arrow link. Reads like a museum plaque, not a
 * Black Friday banner. Not sticky — it scrolls away with the page so the
 * header takes over once you're past it.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { getActivePromo } from "@/lib/promo";

const STORAGE_KEY = "pcnd-promo-dismissed";

export function PromoStrip() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setDismissed(true);
    } catch {
      /* sessionStorage unavailable — leave strip visible */
    }
  }, []);

  const promo = getActivePromo();
  if (!promo) return null;
  /* Avoid a hydration flash: render the strip on the server, then let the
     useEffect hide it if dismissed in this session. */
  if (mounted && dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      role="region"
      aria-label={`${promo.label} announcement`}
      className="relative z-[60] w-full bg-[#0F0C09] border-y border-sandstone/20"
    >
      <div className="container mx-auto px-10 sm:px-6 max-w-7xl flex items-center justify-center gap-3 sm:gap-4 py-2.5 sm:py-3 text-center">
        <Link
          href={promo.cta.href}
          className="group inline-flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs leading-snug whitespace-nowrap"
        >
          {/* Eyebrow with pulsing dot — full label on sm+, just the dot on mobile. */}
          <span className="inline-flex items-center gap-2 text-sandstone/85 font-medium uppercase tracking-[0.25em] text-[10px]">
            <span className="inline-block h-1 w-1 rounded-full bg-sandstone animate-pulse" aria-hidden="true" />
            <span className="hidden sm:inline">{promo.label}</span>
          </span>
          <span className="hidden sm:inline text-sandstone/40" aria-hidden="true">
            ·
          </span>
          {/* Headline — short variant on mobile, full italic on sm+. */}
          <span className="sm:hidden font-serif italic text-white/90 text-[12px]">
            15% off · ends {promo.endsAtDisplay}
          </span>
          <span className="hidden sm:inline font-serif italic text-white/90 text-[13px]">
            {promo.shortHeadline} — through {promo.endsAtDisplay}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-sandstone font-semibold uppercase tracking-[0.2em] text-[11px] ml-2 underline-offset-4 group-hover:underline">
            {promo.cta.label}
            <ArrowRight aria-hidden="true" className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </span>
          <ArrowRight aria-hidden="true" className="sm:hidden w-3 h-3 text-sandstone transition-transform group-hover:translate-x-0.5" />
        </Link>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors p-1.5"
        >
          <X aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
