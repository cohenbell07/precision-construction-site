/**
 * Service card — used on the homepage services grid and on the services index.
 * Replaces the inline implementations that lived in app/page.tsx and
 * app/services/page.tsx.
 *
 * Perf budget: the previous card animated 4+ properties simultaneously with
 * `transition-all duration-500/700`, plus a mix-blend-soft-light overlay and an
 * inset box-shadow change on hover. That paint workload made hover laggy on
 * grids of 6+ cards. This version animates only `transform` and `box-shadow`
 * on the card, and `transform` on the image — all GPU-accelerated. Total: 3
 * properties, all on the cheap layer.
 *
 * Design: image-dominant magazine card. Tiny sandstone accent rule + category
 * eyebrow up top, title + "View Service →" at the bottom. The image and
 * gradient overlay are static; hover only adjusts position, shadow, image
 * zoom, and accent-line length.
 */

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export interface ServiceCardProps {
  href: string;
  title: string;
  image: string;
  alt: string;
  eyebrow?: string;
  /** Show a small "15% Off" sandstone badge in the top-right corner. */
  featuredBadge?: string;
  /** CTA label shown at the bottom of the card. Defaults to "View Service". */
  ctaLabel?: string;
}

export function ServiceCard({ href, title, image, alt, eyebrow, featuredBadge, ctaLabel = "View Service" }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="
        group relative block aspect-[5/4] overflow-hidden rounded-xl bg-[#0C0C0C]
        ring-1 ring-white/[0.06]
        shadow-[0_4px_16px_-8px_rgba(0,0,0,0.5)]
        transition-[transform,box-shadow] duration-300 ease-out
        hover:-translate-y-[3px]
        hover:shadow-[0_20px_40px_-16px_rgba(169,178,191,0.20),0_8px_20px_-10px_rgba(0,0,0,0.6)]
        active:scale-[0.985] active:translate-y-0
        focus:outline-none focus-visible:ring-2 focus-visible:ring-sandstone focus-visible:ring-offset-2 focus-visible:ring-offset-black
      "
    >
      {/* Registration marks — architectural crop corners that surface on hover.
          Pure border-color transition; costs nothing at rest. */}
      <span aria-hidden="true" className="pointer-events-none absolute top-2.5 left-2.5 z-10 h-4 w-4 border-t border-l border-sandstone/0 transition-colors duration-300 group-hover:border-sandstone/80" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-2.5 right-2.5 z-10 h-4 w-4 border-b border-r border-sandstone/0 transition-colors duration-300 group-hover:border-sandstone/80" />
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="
          object-cover
          transition-transform duration-[700ms] ease-out
          group-hover:scale-[1.04]
        "
      />

      {/* Single static gradient overlay — no animation, no mix-blend. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 pointer-events-none" />

      {featuredBadge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1.5 bg-sandstone text-black text-[9px] font-bold uppercase tracking-[0.22em] px-2.5 py-1 rounded-full shadow-[0_2px_8px_rgba(169,178,191,0.4)]">
            {featuredBadge}
          </span>
        </div>
      )}

      {eyebrow && (
        <div className="absolute top-5 left-5 z-10 flex items-center gap-2.5">
          <span className="h-px w-5 bg-sandstone/70 transition-[width] duration-300 ease-out group-hover:w-8" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-medium text-sandstone/90 tabular-nums">{eyebrow}</span>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
        {/* Accent rule grows from 24px to 56px on hover — single transform-friendly width change. */}
        <div className="h-[1.5px] w-6 bg-sandstone mb-4 transition-[width] duration-300 ease-out group-hover:w-14" />
        <h3 className="text-xl sm:text-2xl font-heading font-bold uppercase tracking-tight text-white leading-[1.05] mb-3">
          {title}
        </h3>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/70 group-hover:text-sandstone transition-colors duration-200">
          {ctaLabel}
          <ArrowRight aria-hidden="true" className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
