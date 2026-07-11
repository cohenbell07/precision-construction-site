/**
 * Service card — used on the homepage services grid and on the services index.
 *
 * Perf budget: animates only `transform` and `box-shadow` on the card and
 * `transform` on the image — all GPU-accelerated properties.
 *
 * Design: image-dominant magazine card. The photography leads — the overlay is
 * a bottom-anchored scrim only (the old full-height wash dimmed every image to
 * near-black). Title + "View Service →" sit on the scrim; architectural
 * registration marks surface on hover.
 *
 * `size="compact"` is the dense variant for two-up mobile grids and tier-2/3
 * service categories: tighter aspect, smaller type, same interaction grammar.
 */

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { DARK_BLUR } from "@/lib/blur";

export interface ServiceCardProps {
  href: string;
  title: string;
  image: string;
  alt: string;
  /** Show a small "15% Off" sandstone badge in the top-right corner. */
  featuredBadge?: string;
  /** CTA label shown at the bottom of the card. Defaults to "View Service". */
  ctaLabel?: string;
  /** "feature" (default) for hero grids, "compact" for dense category grids. */
  size?: "feature" | "compact";
}

export function ServiceCard({ href, title, image, alt, featuredBadge, ctaLabel = "View Service", size = "feature" }: ServiceCardProps) {
  const compact = size === "compact";
  return (
    <Link
      href={href}
      className={`
        group relative block overflow-hidden rounded-xl bg-[#0C0C0C]
        ${compact ? "aspect-[4/3]" : "aspect-[5/4]"}
        ring-1 ring-white/[0.06]
        shadow-[0_4px_16px_-8px_rgba(0,0,0,0.5)]
        transition-[transform,box-shadow] duration-300 ease-out
        hover:-translate-y-[3px]
        hover:shadow-[0_20px_40px_-16px_rgba(169,178,191,0.20),0_8px_20px_-10px_rgba(0,0,0,0.6)]
        active:scale-[0.985] active:translate-y-0
        focus:outline-none focus-visible:ring-2 focus-visible:ring-sandstone focus-visible:ring-offset-2 focus-visible:ring-offset-black
      `}
    >
      {/* Registration marks — architectural crop corners that surface on hover.
          Pure border-color transition; costs nothing at rest. */}
      <span aria-hidden="true" className="pointer-events-none absolute top-2.5 left-2.5 z-10 h-4 w-4 border-t border-l border-sandstone/0 transition-colors duration-300 group-hover:border-sandstone/80" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-2.5 right-2.5 z-10 h-4 w-4 border-b border-r border-sandstone/0 transition-colors duration-300 group-hover:border-sandstone/80" />
      <Image
        src={image}
        alt={alt}
        fill
        sizes={compact ? "(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        placeholder="blur"
        blurDataURL={DARK_BLUR}
        className="
          object-cover
          transition-transform duration-[700ms] ease-out
          group-hover:scale-[1.04]
        "
      />

      {/* Bottom-anchored scrim — deep enough for AAA text contrast at the
          baseline, gone by mid-card so the photography keeps its light. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 via-45% to-transparent pointer-events-none" />

      {featuredBadge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1.5 bg-sandstone text-black text-[9px] font-bold uppercase tracking-[0.22em] px-2.5 py-1 rounded-full shadow-[0_2px_8px_rgba(169,178,191,0.4)]">
            {featuredBadge}
          </span>
        </div>
      )}

      <div className={`absolute inset-x-0 bottom-0 z-10 ${compact ? "p-4" : "p-5 sm:p-6"}`}>
        {/* Accent rule grows on hover — single transform-friendly width change. */}
        <div className={`h-[1.5px] bg-sandstone transition-[width] duration-300 ease-out ${compact ? "w-5 mb-2.5 group-hover:w-10" : "w-6 mb-4 group-hover:w-14"}`} />
        <h3 className={`font-heading font-bold uppercase tracking-tight text-white leading-[1.05] ${compact ? "text-[15px] sm:text-lg mb-2" : "text-xl sm:text-2xl mb-3"}`}>
          {title}
        </h3>
        <span className={`inline-flex items-center gap-2 font-mono font-medium uppercase tracking-[0.2em] text-white/70 group-hover:text-sandstone transition-colors duration-200 ${compact ? "text-[9px]" : "text-[10px]"}`}>
          {ctaLabel}
          <ArrowRight aria-hidden="true" className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
