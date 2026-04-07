"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { services } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Star } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SpotlightCard } from "@/components/SpotlightCard";

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
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Images that need special positioning (square/portrait sources in landscape containers) ─── */
const imageStyle: Record<string, string> = {
  showers: "object-contain bg-[#111]",
  countertops: "object-contain bg-[#111]",
  cabinets: "object-contain bg-[#111]",
  commercial: "object-contain bg-[#111]",
};

/* ─── Service card with image, used in grids ─── */
function ServiceCard({ service, size = "normal" }: { service: typeof services[0]; size?: "normal" | "large" }) {
  const image = serviceImageMap[service.id] || "/service-millwork.webp";
  const isLarge = size === "large";
  const imgClass = imageStyle[service.id] || "object-cover";

  return (
    <SpotlightCard className="rounded-xl">
    <Link href={`/services/${service.id}`} className="group block">
      <div className={`relative ${isLarge ? "aspect-[3/2]" : "aspect-[4/3]"} rounded-xl overflow-hidden mb-4 bg-[#111]`}>
        <Image src={image} alt={`${service.title} services in Calgary by PCND`} fill className={`${imgClass} group-hover:scale-105 transition-transform duration-700`} sizes={isLarge ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
          <h3 className={`${isLarge ? "text-xl sm:text-2xl" : "text-lg"} font-display font-bold uppercase tracking-wide text-white leading-tight`}>{service.title}</h3>
          <div className="shrink-0 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-3">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
      <p className="text-white/30 text-sm leading-relaxed line-clamp-2 px-1">{service.description}</p>
    </Link>
    </SpotlightCard>
  );
}

/* ─── Inline testimonial for social proof between sections ─── */
function InlineTestimonial({ text, name, project }: { text: string; name: string; project: string }) {
  return (
    <Reveal>
      <div className="max-w-3xl mx-auto text-center py-16 sm:py-20 px-6">
        <div className="flex gap-0.5 justify-center mb-5">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />)}
        </div>
        <p className="text-white/45 text-base sm:text-lg leading-relaxed mb-5 italic">&ldquo;{text}&rdquo;</p>
        <p className="text-white/25 text-sm">{name} &mdash; {project}</p>
      </div>
    </Reveal>
  );
}

export default function ServicesPage() {
  // Conversion-optimized grouping:
  // 1. HIGHEST DEMAND (what Calgary homeowners search for most)
  const highDemand = ["basements", "renovations", "flooring", "showers"];
  // 2. PREMIUM FINISHES (high-value upsell services)
  const premiumFinishes = ["cabinets", "countertops", "carpentry"];
  // 3. STRUCTURAL & SPECIALTY (supporting services)
  const structural = ["framing", "drywall", "painting", "garages", "commercial"];

  const getService = (id: string) => services.find((s) => s.id === id);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="flex flex-col">

      {/* ━━━ HERO ━━━ */}
      <section ref={heroRef} className="relative w-full h-[50vh] sm:h-[60vh] md:h-[65vh] min-h-[300px] max-h-[650px] overflow-hidden bg-black">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="/servicehero.webp" alt="Professional residential and commercial construction services in Calgary by PCND" fill className="object-cover object-center" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/90" />
        </motion.div>
        <div className="hero-glow absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 z-[1]" />
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex items-end pb-12 sm:pb-16 z-10">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/70 font-medium mb-4">
              Residential &amp; Commercial
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight leading-[0.85] mb-6 max-w-4xl hero-heading-shimmer">
              Our Services
            </motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-3 items-start">
              <Link href="/get-quote" className="group inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-white/90 transition-colors">
                Get a Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-white/40 hover:text-white px-5 py-3.5 text-sm tracking-wide transition-colors border border-white/15 rounded-full hover:border-white/30">
                <Phone className="w-3.5 h-3.5" /> {BRAND_CONFIG.contact.phoneFormatted}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ━━━ MOST POPULAR SERVICES ━━━ */}
      <section className="py-20 sm:py-28 bg-[#0A0A0A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <Reveal>
            <div className="mb-12 sm:mb-16">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/25 font-medium mb-4">Most Requested</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[0.95] mb-4">Popular Services</h2>
              <p className="text-white/30 text-base max-w-xl">The services Calgary homeowners request most. Each includes a free consultation and detailed quote.</p>
            </div>
          </Reveal>

          {/* Top 2 large, bottom 2 normal — creates visual hierarchy */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
            {highDemand.slice(0, 2).map((id, idx) => {
              const s = getService(id);
              if (!s) return null;
              return (
                <Reveal key={id} delay={idx * 0.1}>
                  <ServiceCard service={s} size="large" />
                </Reveal>
              );
            })}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {highDemand.slice(2).map((id, idx) => {
              const s = getService(id);
              if (!s) return null;
              return (
                <Reveal key={id} delay={idx * 0.1}>
                  <ServiceCard service={s} size="large" />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━ SOCIAL PROOF BREAK ━━━ */}
      <div className="bg-black border-y border-white/[0.04]">
        <InlineTestimonial
          text="Had them finish our basement — full development from bare concrete to a liveable space. They handled the permits, passed every inspection first try, and the final result was way better than we expected."
          name="Dan R."
          project="Basement Development"
        />
      </div>

      {/* ━━━ PREMIUM FINISHES ━━━ */}
      <section className="py-20 sm:py-28 bg-[#0A0A0A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <Reveal>
            <div className="mb-12 sm:mb-16">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/25 font-medium mb-4">Premium Finishes</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[0.95] mb-4">Custom Millwork &amp; Surfaces</h2>
              <p className="text-white/30 text-base max-w-xl">Custom-built cabinetry, precision countertop fabrication, and fine interior carpentry. Supply and install available.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {premiumFinishes.map((id, idx) => {
              const s = getService(id);
              if (!s) return null;
              return (
                <Reveal key={id} delay={idx * 0.08}>
                  <ServiceCard service={s} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━ MID-PAGE CTA ━━━ */}
      <section className="py-16 sm:py-20 bg-black">
        <div className="container mx-auto px-6 max-w-4xl">
          <Reveal>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight mb-2">Not Sure Where to Start?</h3>
                <p className="text-white/35 text-sm sm:text-base max-w-md">Tell us about your project and we&apos;ll recommend the right approach. Free consultation, no obligation.</p>
              </div>
              <Link href="/get-quote" className="group inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-white/90 transition-colors shrink-0">
                Get a Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━ SOCIAL PROOF BREAK ━━━ */}
      <div className="bg-[#0A0A0A] border-y border-white/[0.04]">
        <InlineTestimonial
          text="We needed new flooring throughout our main floor and the quote came in well under the other companies we called. The LVP they sourced looks amazing and the install was super clean."
          name="Priya S."
          project="Flooring Installation"
        />
      </div>

      {/* ━━━ STRUCTURAL & SPECIALTY ━━━ */}
      <section className="py-20 sm:py-28 bg-black">
        <div className="container mx-auto px-6 max-w-7xl">
          <Reveal>
            <div className="mb-12 sm:mb-16">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/25 font-medium mb-4">Full-Scope Build</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[0.95] mb-4">Structural &amp; Specialty</h2>
              <p className="text-white/30 text-base max-w-xl">From framing to finishing — every stage of construction covered by one team. Residential and commercial.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {structural.map((id, idx) => {
              const s = getService(id);
              if (!s) return null;
              return (
                <Reveal key={id} delay={idx * 0.07}>
                  <ServiceCard service={s} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━ TRUST BAR ━━━ */}
      <section className="bg-[#0A0A0A] border-y border-white/[0.04]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.04]">
            {[
              { val: "58+", label: "Years Experience" },
              { val: "5,000+", label: "Projects Done" },
              { val: "5%", label: "Price Beat" },
              { val: "Free", label: "Consultations" },
            ].map((s) => (
              <div key={s.label} className="text-center py-8 sm:py-10">
                <div className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white mb-1"><AnimatedCounter value={s.val} /></div>
                <div className="text-[10px] sm:text-[10px] tracking-[0.15em] uppercase text-white/20 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FINAL CTA ━━━ */}
      <section className="py-24 sm:py-32 md:py-40 bg-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }} />
        </div>
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <Reveal>
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/25 font-medium mb-5">Ready to Start?</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight leading-[0.9] mb-6">Let&apos;s Build Together</h2>
            <p className="text-white/30 text-base sm:text-lg leading-relaxed mb-10 max-w-md mx-auto">
              Free quote within 24 hours. 5% price beat guarantee on any competitor estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link href="/get-quote" className="group inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-white/90 transition-colors">
                Get a Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-white/30 hover:text-white px-5 py-3.5 text-sm tracking-wide transition-colors border border-white/10 rounded-full hover:border-white/30">
                <Phone className="w-3.5 h-3.5" /> {BRAND_CONFIG.contact.phoneFormatted}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
