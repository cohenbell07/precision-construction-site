/**
 * Cream-canvas testimonial card. Anatomy:
 *  - paper card surface with warm hairline + soft warm shadow
 *  - 5 sandstone stars + decorative quote glyph
 *  - DM Serif Display italic body
 *  - hairline divider, initials avatar, verified badge
 *
 * Lives inside a <Section variant="cream"> — assumes cream context.
 */

import { CheckCircle2, Quote, Star } from "lucide-react";

export interface TestimonialCardProps {
  name: string;
  text: string;
  project: string;
  year: string;
  /** Defaults to 5 stars. */
  rating?: number;
}

function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="w-11 h-11 rounded-full bg-bone-soft border border-bone-hairline flex items-center justify-center shrink-0">
      <span className="text-[11px] font-bold text-ink-muted tracking-wider">{initials}</span>
    </div>
  );
}

export function TestimonialCard({ name, text, project, year, rating = 5 }: TestimonialCardProps) {
  return (
    <div className="paper-card rounded-md p-7 sm:p-8 h-full flex flex-col relative">
      <Quote
        className="absolute top-5 right-5 w-8 h-8 text-sandstone/40"
        strokeWidth={1.5}
        aria-hidden
      />
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} aria-hidden="true" className="w-3.5 h-3.5 fill-sandstone-dark text-sandstone-dark" />
        ))}
      </div>
      <p className="font-serif italic text-[17px] sm:text-[18px] leading-snug text-ink flex-1 mb-7">
        &ldquo;{text}&rdquo;
      </p>
      <div className="border-t border-bone-hairline pt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <InitialsAvatar name={name} />
          <div>
            <p className="font-semibold text-ink text-sm">{name}</p>
            <p className="text-[11px] mt-0.5 text-sandstone-muted">
              {project} &middot; {year}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full text-ink-muted bg-bone-soft border border-bone-hairline">
          <CheckCircle2 aria-hidden="true" className="w-2.5 h-2.5" /> Verified
        </span>
      </div>
    </div>
  );
}
