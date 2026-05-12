"use client";

/**
 * BookConsultationCTA — drop-in replacement for the previous "Final CTA" dark
 * blocks at the bottom of marketing pages.
 *
 * Why the redesign: the dark "Get a Free Quote" CTA was visually identical to
 * the footer's "Let's Talk About Your Project" block below it, so the page
 * ended with the same message twice. This swaps the page-bottom moment to a
 * different conversion: a free in-home consultation. Cream canvas + paper
 * card framing gives it a distinct visual register from the footer's dark
 * quote CTA, so the two CTAs ladder rather than duplicate (form quote ↓
 * footer · in-home consultation ↓ page bottom).
 */

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BRAND_CONFIG } from "@/lib/utils";
import { ArrowRight, Phone, Calendar, MapPin, Shield } from "lucide-react";
import { Section } from "@/components/Section";

interface Props {
  /** Optional service slug — pre-selects the service in the consultation form. */
  serviceId?: string;
  /** Override eyebrow copy. Defaults to a generic page-bottom prompt. */
  eyebrow?: string;
  /** Override headline copy. */
  headline?: string;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function BookConsultationCTA({
  serviceId,
  eyebrow = "Prefer to Meet First?",
  headline = "Let's Walk Your Space",
}: Props) {
  const consultHref = serviceId ? `/book-consultation?service=${serviceId}` : "/book-consultation";

  return (
    <Section variant="cream" padding="lg">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-sandstone-dark/40" aria-hidden="true" />
            <p className="cream-eyebrow text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-medium">{eyebrow}</p>
            <span className="h-px w-8 bg-sandstone-dark/40" aria-hidden="true" />
          </div>
          <h2 className="text-[32px] sm:text-5xl md:text-6xl font-heading font-black uppercase tracking-tight leading-[0.92] text-ink mb-5">
            {headline}
          </h2>
          <p className="font-serif italic text-ink text-lg sm:text-2xl max-w-2xl mx-auto leading-snug mb-3">
            We&apos;ll come to you, talk it through, and put a real plan together.
          </p>
          <p className="text-ink-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-10">
            Free in-home consultation. 30–45 minutes. No pressure, no salespeople — just the builder who&apos;s going to do the work.
          </p>
        </Reveal>

        {/* Three quick assurance markers — give the CTA editorial weight
            without retreating to the dark "trust pill" aesthetic. */}
        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 max-w-2xl mx-auto">
            {[
              { Icon: MapPin,   label: "We come to you", sub: "Calgary & area" },
              { Icon: Calendar, label: "30–45 minutes",  sub: "On your schedule" },
              { Icon: Shield,   label: "No obligation",  sub: "Meet the builder" },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 text-left sm:text-center">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-sandstone-dark/30 bg-bone-soft text-sandstone-dark shrink-0">
                  <Icon aria-hidden="true" className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink leading-tight">{label}</p>
                  <p className="text-[11px] text-ink-muted leading-snug mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            <Link
              href={consultHref}
              className="group inline-flex items-center justify-center gap-3 bg-ink text-bone px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-ink/90 transition-colors shadow-[0_6px_24px_-8px_rgba(0,0,0,0.4)]"
            >
              Book a Consultation
              <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={`tel:${BRAND_CONFIG.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 text-ink-muted hover:text-ink px-5 py-3.5 text-sm tracking-wide transition-colors border border-bone-hairline rounded-full hover:border-sandstone-dark"
              aria-label={`Call ${BRAND_CONFIG.contact.phoneFormatted}`}
            >
              <Phone aria-hidden="true" className="w-3.5 h-3.5" /> Or call {BRAND_CONFIG.contact.phoneFormatted}
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
