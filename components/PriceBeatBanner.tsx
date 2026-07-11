"use client";

/**
 * PriceBeatBanner — compact dark Showroom band that promotes the price-beat
 * guarantee and links to the full /price-beat page. Designed to drop into a
 * "shopping" context (the services index) without competing with that page's
 * bottom BookConsultationCTA — different offer, different visual register
 * (this one's dark, the consultation CTA is cream).
 */

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BadgePercent, ArrowRight } from "lucide-react";

export function PriceBeatBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-black py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Quiet blueprint-grid backdrop, masked to a centered vignette. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(169,178,191,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(169,178,191,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 90%)",
        }}
      />
      <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-sandstone/60" aria-hidden="true" />
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase text-sandstone/90 font-medium">
              <BadgePercent aria-hidden="true" className="w-3.5 h-3.5" />
              5% Price Beat Guarantee
            </span>
            <span className="h-px w-8 bg-sandstone/60" aria-hidden="true" />
          </div>

          <h2 className="text-[30px] sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95] text-white mb-5">
            Got a Quote Already?
          </h2>
          <p className="font-serif italic text-white/85 text-lg sm:text-2xl leading-snug max-w-xl mx-auto mb-3">
            Bring it to us — we&apos;ll beat it by 5%.
          </p>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-9">
            Send us a written quote from a licensed competitor, dated within 60 days. We come back at least 5% under it — in writing — so you get the builder you trust at the better price.
          </p>

          <Link
            href="/price-beat"
            className="group inline-flex items-center justify-center gap-3 bg-sandstone text-black px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-sandstone-light transition-colors shadow-[0_8px_30px_-8px_rgba(169,178,191,0.5)]"
          >
            See How the Price Beat Works
            <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
