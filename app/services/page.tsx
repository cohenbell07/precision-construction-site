"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { services } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Shield } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { BlurReveal } from "@/components/BlurReveal";

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

const imageStyle: Record<string, string> = {
  showers: "object-cover",
  countertops: "object-cover",
  cabinets: "object-cover",
  commercial: "object-cover",
};

/* ─── Service card — editorial premium with brackets, index, persistent copy ─── */
function ServiceCard({ service, featured = false }: { service: typeof services[0]; featured?: boolean }) {
  const image = serviceImageMap[service.id] || "/service-millwork.webp";
  const imgClass = imageStyle[service.id] || "object-cover";

  return (
    <Link
      href={`/services/${service.id}`}
      className="group block relative aspect-[5/4] overflow-hidden bg-[#0C0C0C] rounded-xl ring-1 ring-white/[0.06] hover:ring-sandstone/30 hover:shadow-[0_20px_50px_-20px_rgba(196,181,160,0.25)] transition-all duration-500"
    >
        {/* Image */}
        <Image
          src={image}
          alt={`${service.title} services in Calgary by PCND`}
          fill
          className={`${imgClass} group-hover:scale-[1.08] transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Duotone warm-dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10 group-hover:from-black group-hover:via-black/40 transition-all duration-700" />
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-40 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(196,181,160,0.15) 0%, rgba(0,0,0,0) 50%, rgba(196,181,160,0.08) 100%)" }}
        />

        {/* Corner brackets — industrial blueprint marks */}
        <span className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t border-l border-sandstone/40 group-hover:border-sandstone/80 transition-colors duration-500" />
        <span className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t border-r border-sandstone/40 group-hover:border-sandstone/80 transition-colors duration-500" />
        <span className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b border-l border-sandstone/40 group-hover:border-sandstone/80 transition-colors duration-500" />
        <span className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b border-r border-sandstone/40 group-hover:border-sandstone/80 transition-colors duration-500" />

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-5 right-5 z-10">
            <span className="inline-flex items-center gap-1.5 bg-sandstone/10 backdrop-blur-md text-sandstone text-[9px] font-bold uppercase tracking-[0.22em] px-2.5 py-1 rounded-full border border-sandstone/30">
              <span className="w-1 h-1 rounded-full bg-sandstone animate-pulse" />
              15% Off
            </span>
          </div>
        )}

        {/* Bottom content — always visible, refines on hover */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6">
          {/* Accent line */}
          <div className="h-[1.5px] w-8 bg-sandstone/60 mb-4 group-hover:w-16 transition-all duration-500" />

          <h3 className="text-lg sm:text-xl font-heading font-bold uppercase tracking-tight text-white leading-[1.05] mb-2">
            {service.title}
          </h3>

          <p className="text-white/50 group-hover:text-white/75 text-[13px] leading-relaxed line-clamp-2 transition-colors duration-500 mb-4">
            {service.description}
          </p>

          {/* View service CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] group-hover:border-sandstone/30 transition-colors duration-500">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60 group-hover:text-sandstone transition-colors duration-300">
              View Service
            </span>
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/20 group-hover:border-sandstone group-hover:bg-sandstone transition-all duration-300">
              <ArrowRight className="w-3 h-3 text-white group-hover:text-black transition-colors duration-300 group-hover:translate-x-[1px]" />
            </span>
          </div>
        </div>

        {/* Sandstone glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: "inset 0 0 60px rgba(196,181,160,0.08)" }}
        />
    </Link>
  );
}

/* ─── Service category definitions ─── */
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

      {/* ━━━ HERO ━━━ */}
      <section ref={heroRef} className="relative w-full h-[60vh] sm:h-[60vh] md:h-[65vh] min-h-[480px] sm:min-h-[380px] max-h-[700px] overflow-hidden bg-black">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="/servicehero.webp" alt="Professional residential and commercial construction services in Calgary by PCND" fill className="object-cover object-center" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
        </motion.div>
        <div className="hero-glow absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 z-[1]" />
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex items-end pb-10 sm:pb-14 md:pb-16 z-10">
          <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/75 font-medium mb-3 sm:mb-4">
              Residential &amp; Commercial
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-hero uppercase tracking-wide leading-[0.95] mb-5 sm:mb-6 max-w-4xl hero-heading-shimmer">
              Our Services
            </motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-start">
              <Link href="/get-quote" className="group inline-flex items-center justify-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-sandstone transition-colors">
                Get a Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white px-5 py-3.5 text-sm tracking-wide transition-colors border border-white/25 rounded-full hover:border-sandstone/60 backdrop-blur-sm">
                <Phone className="w-3.5 h-3.5" /> Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ━━━ SERVICE CATEGORIES ━━━ */}
      {categories.map((cat, catIdx) => (
        <section
          key={cat.id}
          id={cat.id}
          className={`py-14 sm:py-20 md:py-28 ${catIdx % 2 === 0 ? "bg-[#0A0A0A]" : "bg-black"}`}
        >
          <div className="container mx-auto px-6 max-w-7xl">
            <Reveal>
              <div className="mb-8 sm:mb-12 md:mb-16">
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <span className="h-px w-8 bg-sandstone/40" />
                  <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-sandstone/70 font-medium">
                    {catIdx === 0 ? "Most Requested" : catIdx === 1 ? "Full-Scope Build" : "Detail Work"}
                  </p>
                </div>
                <h2 className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight leading-[0.95] sm:leading-[0.92] mb-3 sm:mb-4">
                  {cat.heading}
                </h2>
                <div className="h-[1.5px] w-16 bg-gradient-to-r from-sandstone to-transparent mb-5" />
                <p className="text-white/45 text-base sm:text-lg max-w-xl leading-relaxed">{cat.desc}</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
              {cat.serviceIds.map((id, idx) => {
                const s = getService(id);
                if (!s) return null;
                return (
                  <BlurReveal key={id} delay={0.1 + idx * 0.12} direction="bottom">
                    <ServiceCard service={s} featured={id === "basements"} />
                  </BlurReveal>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* ━━━ MID-PAGE CTA (Moving Border) ━━━ */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#0A0A0A]">
        <div className="container mx-auto px-5 sm:px-6 max-w-4xl">
          <Reveal>
            <div className="moving-border-container bg-white/[0.02] p-6 sm:p-10 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-6 text-center md:text-left">
              <div>
                <h3 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight mb-2">Not Sure Where to Start?</h3>
                <p className="text-white/50 text-sm sm:text-base max-w-md mx-auto md:mx-0">Tell us about your project and we&apos;ll recommend the right approach. Free consultation, no obligation.</p>
              </div>
              <Link href="/get-quote" className="group inline-flex items-center justify-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-sandstone transition-colors md:shrink-0">
                Get a Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━ TRUST BAR ━━━ */}
      <section className="bg-black border-y border-white/[0.04]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-3 py-8 sm:py-10">
            {[
              { icon: Shield, text: "Licensed & Insured" },
              { val: "5,000+", text: "Projects Completed" },
              { val: "58+", text: "Years Experience" },
              { text: "5% Price Beat Guarantee" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-white/35">
                {"icon" in item && item.icon && <item.icon className="w-4 h-4 text-white/40" />}
                {"val" in item && <span className="text-lg font-heading font-black text-white"><AnimatedCounter value={item.val!} /></span>}
                {!("icon" in item) && !("val" in item) && <div className="w-1 h-1 rounded-full bg-white/25 shrink-0" />}
                <span className="text-xs uppercase tracking-[0.12em] font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FINAL CTA ━━━ */}
      <section className="py-16 sm:py-24 md:py-32 lg:py-40 bg-black relative overflow-hidden">
        {/* Subtle CSS radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(196, 181, 160, 0.06) 0%, transparent 70%)" }} />
        </div>
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <Reveal>
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-sandstone/30 font-medium mb-5">Ready to Start?</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black uppercase tracking-tight leading-[0.9] mb-6">Let&apos;s Build Together</h2>
            <p className="text-white/30 text-base sm:text-lg leading-relaxed mb-10 max-w-md mx-auto">
              Free quote within 24 hours. 5% price beat guarantee on any competitor estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
              <Link href="/get-quote" className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 text-black bg-gradient-to-b from-[#F0F0F0] via-[#D8D8D8] to-[#B8B8B8] border border-white/40 shadow-[0_2px_10px_rgba(200,200,200,0.15),inset_0_1px_0_rgba(255,255,255,0.5)] hover:shadow-[0_4px_20px_rgba(200,200,200,0.25),inset_0_1px_0_rgba(255,255,255,0.6)] hover:translate-y-[-1px]">
                Get a Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 text-white/60 hover:text-white px-5 py-3.5 text-sm tracking-wide transition-colors border border-sandstone/20 rounded-full hover:border-sandstone/50 hover:text-sandstone">
                <Phone className="w-3.5 h-3.5" /> Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
