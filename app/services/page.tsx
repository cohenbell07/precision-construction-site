"use client";

/**
 * Services index — Showroom + Studio canvas.
 * Hero + 3 service category showcases stay dark (photo cards need dark
 * backdrop). Mid-page CTA + Trust bar flip cream as a studio interlude
 * before the dark final close.
 */

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { services } from "@/lib/services";
import { getActivePromo } from "@/lib/promo";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Shield } from "lucide-react";
import { BlurReveal } from "@/components/BlurReveal";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { BookConsultationCTA } from "@/components/BookConsultationCTA";
import { PriceBeatBanner } from "@/components/PriceBeatBanner";

const serviceImageMap: Record<string, string> = {
  kitchens: "/kitchenshero.webp",
  bathrooms: "/bathroomshero.webp",
  basements: "/basementland02.webp",
  renovations: "/home-additions.webp",
  cabinets: "/service-millwork.webp",
  showers: "/customshowerland.webp",
  countertops: "/countertopsservice3.webp",
  carpentry: "/interiorfinishingservice1.webp",
  flooring: "/flooringinstalllandscape.webp",
  framing: "/framingservice4.webp",
  drywall: "/drywall-texture.webp",
  painting: "/painting.webp",
  garages: "/garage-deck-fence.webp",
  commercial: "/commercialland.webp",
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

type Tier = "primary" | "secondary" | "specialty";

interface Category {
  id: string;
  label: string;
  heading: string;
  desc: string;
  eyebrow: string;
  serviceIds: string[];
  tier: Tier;
  /** Per-card layout. Tier 1 reno cards stay large (2-col); tier 2/3 compress to 3-col. */
  gridCols: string;
}

/* Renovation-first hierarchy: full renovations are tier 1 (the headline offering),
   component services are tier 2 (sit inside every renovation, or hire standalone),
   exterior + framing + commercial are tier 3 (specialty trade work). */
const categories: Category[] = [
  {
    id: "renovations",
    label: "Renovations",
    heading: "Renovations",
    desc: "Our headline offering — kitchen, bathroom, basement, and whole-home transformations. One crew handles design, demo, trades, finishes, and the final walkthrough.",
    eyebrow: "Most Requested",
    serviceIds: ["kitchens", "bathrooms", "basements", "renovations"],
    tier: "primary",
    gridCols: "sm:grid-cols-2 lg:grid-cols-2",
  },
  {
    id: "components",
    label: "Components & Finishes",
    heading: "Components & Finishes",
    desc: "Cabinetry, countertops, tile, flooring, trim, drywall, and paint — included inside every renovation, or hire us for any one of them standalone.",
    eyebrow: "Part of Any Reno — Or Hire Standalone",
    serviceIds: ["cabinets", "countertops", "showers", "flooring", "carpentry", "drywall", "painting"],
    tier: "secondary",
    gridCols: "sm:grid-cols-2 lg:grid-cols-3",
  },
  {
    id: "specialty",
    label: "Specialty & Trade Work",
    heading: "Exterior, Framing & Commercial",
    desc: "Garages, decks, fences, structural framing, and commercial tenant improvements. Same crew, same standards — different scope.",
    eyebrow: "Specialty & Trade Work",
    serviceIds: ["garages", "framing", "commercial"],
    tier: "specialty",
    gridCols: "sm:grid-cols-2 lg:grid-cols-3",
  },
];

export default function ServicesPage() {
  const getService = (id: string) => services.find((s) => s.id === id);
  const activePromo = getActivePromo();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="flex flex-col">

      {/* ━━━ HERO — DARK ━━━ */}
      <section ref={heroRef} className="relative w-full h-[60vh] sm:h-[60vh] md:h-[65vh] min-h-[480px] sm:min-h-[380px] max-h-[700px] overflow-hidden bg-black">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="/servicehero.webp" alt="Professional residential and commercial construction services in Calgary by PCND" fill className="object-cover object-center" sizes="100vw" priority quality={85} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex items-end pb-10 sm:pb-14 md:pb-16 z-10">
          <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/75 font-medium mb-3 sm:mb-4">
              Residential &amp; Commercial
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-hero uppercase tracking-wide leading-[0.95] mb-5 sm:mb-6 max-w-5xl hero-heading-shimmer">
              Calgary Construction<br />&amp; Renovation Services
            </motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-start">
              <Link href="/get-quote" className="group inline-flex items-center justify-center gap-3 bg-white text-black px-9 py-4 rounded-full font-black text-base tracking-wide hover:bg-sandstone transition-colors shadow-[0_4px_24px_rgba(255,255,255,0.12)]">
                Get a Free Quote <ArrowRight aria-hidden="true" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors">
                <Phone aria-hidden="true" className="w-4 h-4" /> Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Signature — drafting rule along the hero baseline, mirroring the homepage. */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="absolute bottom-0 inset-x-0 z-10"
        >
          <div className="drafting-rule opacity-70" />
        </motion.div>
      </section>

      {/* ━━━ SERVICE CATEGORIES — DARK (photo cards need dark backdrop) ━━━
          Three-tier hierarchy: renovations lead the page (large 2-col cards),
          components sit second (compact 3-col, lighter eyebrow framing),
          specialty/exterior closes (compact 3-col). */}
      {categories.map((cat, catIdx) => {
        const isPrimary = cat.tier === "primary";
        return (
          <section
            key={cat.id}
            id={cat.id}
            className={`${isPrimary ? "py-16 sm:py-24 md:py-32" : "py-12 sm:py-16 md:py-20"} ${catIdx % 2 === 0 ? "bg-[#0A0A0A]" : "bg-black"}`}
          >
            <div className="container mx-auto px-6 max-w-7xl">
              <Reveal>
                <div className={`${isPrimary ? "mb-10 sm:mb-14 md:mb-16" : "mb-7 sm:mb-9 md:mb-11"}`}>
                  <div className="flex items-center gap-3 mb-4 sm:mb-5">
                    <span className="h-px w-8 bg-sandstone/40" />
                    <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-sandstone/70 font-medium">
                      {cat.eyebrow}
                    </p>
                  </div>
                  <h2
                    className={`${
                      isPrimary
                        ? "text-[32px] sm:text-5xl md:text-6xl lg:text-7xl"
                        : "text-[24px] sm:text-3xl md:text-4xl lg:text-[44px]"
                    } font-heading font-black uppercase tracking-tight leading-[0.95] sm:leading-[0.92] mb-3 sm:mb-4`}
                  >
                    {cat.heading}
                  </h2>
                  <div className="h-[1.5px] w-16 bg-gradient-to-r from-sandstone to-transparent mb-5" />
                  <p className={`${isPrimary ? "text-white/75" : "text-white/60"} text-base sm:text-lg max-w-xl leading-relaxed`}>
                    {cat.desc}
                  </p>
                </div>
              </Reveal>

              <div className={`grid grid-cols-1 ${cat.gridCols} gap-5 sm:gap-6 ${isPrimary ? "md:gap-8" : "md:gap-6"} ${isPrimary ? "max-w-6xl" : "max-w-7xl"} mx-auto`}>
                {cat.serviceIds.map((id, idx) => {
                  const s = getService(id);
                  if (!s) return null;
                  return (
                    <BlurReveal key={id} delay={0.1 + idx * 0.08} direction="bottom">
                      <ServiceCard
                        href={`/services/${s.id}`}
                        title={s.title}
                        image={serviceImageMap[s.id] || "/service-millwork.webp"}
                        alt={`${s.title} services in Calgary by PCND`}
                        eyebrow={cat.label}
                        featuredBadge={activePromo ? "15% Off" : undefined}
                      />
                    </BlurReveal>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* ━━━ MID-PAGE CTA — CREAM (studio interlude) ━━━ */}
      <Section variant="cream" padding="md" containerClassName="container mx-auto px-5 sm:px-6 max-w-4xl">
        <Reveal>
          <div className="paper-card rounded-md p-6 sm:p-10 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-6 text-center md:text-left">
            <div>
              <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                <div className="h-px w-8 cream-rule" />
                <p className="cream-eyebrow text-[10px] tracking-[0.3em] uppercase font-medium">Not Sure Where to Start?</p>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-black text-ink uppercase tracking-tight mb-3">Let&apos;s Talk it Through</h3>
              <p className="font-serif italic text-ink-muted text-base sm:text-lg max-w-md mx-auto md:mx-0">
                Tell us about your project and we&apos;ll recommend the right approach. Free consultation, no obligation.
              </p>
            </div>
            <Link href="/get-quote" className="btn-ink md:shrink-0 px-7 py-3.5">
              Get a Free Quote <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* ━━━ TRUST BAR — CREAM ━━━ */}
      <Section variant="cream" padding="none" containerClassName="container mx-auto px-6 max-w-6xl" topRule={false}>
        <div className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-3 py-8 sm:py-10 border-t border-bone-hairline">
          {[
            { icon: Shield, text: "Licensed & Insured" },
            { text: "Free On-Site Estimates" },
            { text: "5% Price Beat Guarantee", href: "/price-beat" },
          ].map((item) => {
            const inner = (
              <>
                {"icon" in item && item.icon && <item.icon aria-hidden="true" className="w-4 h-4 text-sandstone-dark" />}
                {!("icon" in item) && <div className="w-1 h-1 rounded-full bg-sandstone-dark shrink-0" />}
                <span className="text-xs uppercase tracking-[0.12em] font-medium">{item.text}</span>
              </>
            );
            return "href" in item && item.href ? (
              <Link key={item.text} href={item.href} className="flex items-center gap-2 text-ink hover:text-sandstone-dark transition-colors underline-offset-4 hover:underline">
                {inner}
              </Link>
            ) : (
              <div key={item.text} className="flex items-center gap-2 text-ink">
                {inner}
              </div>
            );
          })}
        </div>
      </Section>

      {/* ━━━ PRICE BEAT — DARK (shopping-context interlude) ━━━ */}
      <PriceBeatBanner />

      {/* ━━━ BOOK CONSULTATION — CREAM ━━━ */}
      <BookConsultationCTA
        eyebrow="Not Sure Which Service?"
        headline="Let's Walk Your Space"
      />

    </div>
  );
}
