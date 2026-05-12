"use client";

/**
 * Services index — Showroom + Studio canvas.
 * Hero + 3 service category showcases stay dark (photo cards need dark
 * backdrop). Mid-page CTA + Trust bar flip cream as a studio interlude
 * before the dark final close.
 */

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { services, getServiceCtaLabel } from "@/lib/services";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Shield } from "lucide-react";
import { BlurReveal } from "@/components/BlurReveal";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";

const serviceImageMap: Record<string, string> = {
  cabinets: "/service-millwork.webp",
  showers: "/service-steam-shower.webp",
  countertops: "/countertopsservice3.webp",
  basements: "/basementland02.webp",
  carpentry: "/interiorfinishingservice1.webp",
  flooring: "/flooringinstalllandscape.webp",
  framing: "/framingservice4.webp",
  drywall: "/drywall-texture.webp",
  painting: "/painting.webp",
  garages: "/garage-deck-fence.webp",
  renovations: "/home-additions.webp",
  commercial: "/commercial-construction.webp",
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

const categories = [
  {
    id: "custom-interiors",
    label: "Custom Interiors",
    heading: "Custom Interiors & Cabinetry",
    desc: "Countertops, cabinetry, flooring, and custom showers — premium surfaces and built-ins for every room in the home. Supply and install available.",
    serviceIds: ["countertops", "cabinets", "showers", "flooring"],
  },
  {
    id: "builds-renovations",
    label: "Full Builds & Renovations",
    heading: "Full Builds & Renovations",
    desc: "From basement developments to home additions and commercial builds — full-scope construction by one team.",
    serviceIds: ["basements", "renovations", "framing", "commercial"],
  },
  {
    id: "finishing-exterior",
    label: "Finishing & Exterior",
    heading: "Finishing & Exterior",
    desc: "Interior carpentry, drywall, painting, garages, decks, and fences. The details that make a house a home.",
    serviceIds: ["carpentry", "drywall", "painting", "garages"],
  },
];

export default function ServicesPage() {
  const getService = (id: string) => services.find((s) => s.id === id);

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
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-hero uppercase tracking-wide leading-[0.95] mb-5 sm:mb-6 max-w-4xl hero-heading-shimmer">
              Our Services
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
      </section>

      {/* ━━━ SERVICE CATEGORIES — DARK (photo cards need dark backdrop) ━━━ */}
      {categories.map((cat, catIdx) => (
        <section key={cat.id} id={cat.id} className={`py-14 sm:py-20 md:py-28 ${catIdx % 2 === 0 ? "bg-[#0A0A0A]" : "bg-black"}`}>
          <div className="container mx-auto px-6 max-w-7xl">
            <Reveal>
              <div className="mb-8 sm:mb-12 md:mb-16">
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <span className="h-px w-8 bg-sandstone/40" />
                  <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-sandstone/70 font-medium">
                    {catIdx === 0 ? "Most Requested" : catIdx === 1 ? "Full-Scope Build" : "Detail Work"}
                  </p>
                </div>
                <h2 className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight leading-[0.95] sm:leading-[0.92] mb-3 sm:mb-4">{cat.heading}</h2>
                <div className="h-[1.5px] w-16 bg-gradient-to-r from-sandstone to-transparent mb-5" />
                <p className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed">{cat.desc}</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
              {cat.serviceIds.map((id, idx) => {
                const s = getService(id);
                if (!s) return null;
                return (
                  <BlurReveal key={id} delay={0.1 + idx * 0.12} direction="bottom">
                    <ServiceCard
                      href={`/services/${s.id}`}
                      title={s.title}
                      image={serviceImageMap[s.id] || "/service-millwork.webp"}
                      alt={`${s.title} services in Calgary by PCND`}
                      eyebrow={cat.label}
                      featuredBadge={id === "basements" ? "15% Off" : undefined}
                      ctaLabel={getServiceCtaLabel(s.id)}
                    />
                  </BlurReveal>
                );
              })}
            </div>
          </div>
        </section>
      ))}

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
            { text: "5% Price Beat Guarantee" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-ink">
              {"icon" in item && item.icon && <item.icon aria-hidden="true" className="w-4 h-4 text-sandstone-dark" />}
              {!("icon" in item) && <div className="w-1 h-1 rounded-full bg-sandstone-dark shrink-0" />}
              <span className="text-xs uppercase tracking-[0.12em] font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ━━━ FINAL CTA — DARK ━━━ */}
      <section className="py-16 sm:py-24 md:py-32 lg:py-40 bg-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(196, 181, 160, 0.06) 0%, transparent 70%)" }} />
        </div>
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <Reveal>
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-sandstone/40 font-medium mb-5">Ready to Start?</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black uppercase tracking-tight leading-[0.9] mb-6">Let&apos;s Build Together</h2>
            <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-10 max-w-md mx-auto">
              Free quote within 24 hours. 5% price beat guarantee on any competitor estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
              <Link href="/get-quote" className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 text-black bg-gradient-to-b from-[#F0F0F0] via-[#D8D8D8] to-[#B8B8B8] border border-white/40 shadow-[0_2px_10px_rgba(200,200,200,0.15),inset_0_1px_0_rgba(255,255,255,0.5)] hover:shadow-[0_4px_20px_rgba(200,200,200,0.25),inset_0_1px_0_rgba(255,255,255,0.6)] hover:translate-y-[-1px]">
                Get a Free Quote <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 text-white/60 hover:text-white px-5 py-3.5 text-sm tracking-wide transition-colors border border-sandstone/20 rounded-full hover:border-sandstone/50 hover:text-sandstone">
                <Phone aria-hidden="true" className="w-3.5 h-3.5" /> Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
