"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { services } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { VideoHero } from "@/components/VideoHero";
import { ArrowRight, Star, Phone, Shield, CheckCircle2 } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SpotlightCard } from "@/components/SpotlightCard";
import { LightRays } from "@/components/LightRays";
import { BlurReveal } from "@/components/BlurReveal";

/* ─── Scroll reveal ─── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Initials avatar ─── */
function InitialsAvatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["bg-white/[0.12]", "bg-white/[0.10]", "bg-white/[0.08]"];
  const colorIdx = name.length % colors.length;
  return (
    <div className={`w-10 h-10 rounded-full ${colors[colorIdx]} border border-white/[0.12] flex items-center justify-center shrink-0`}>
      <span className="text-xs font-bold text-white/70 tracking-wider">{initials}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════ */

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.85], [0, 40]);

  const featuredServices = services.filter((s) =>
    ["cabinets", "showers", "countertops", "renovations", "carpentry", "garages"].includes(s.id)
  );

  const serviceImages: Record<string, string> = {
    cabinets: "/service-millwork.webp",
    showers: "/service-steam-shower.webp",
    countertops: "/countertopsservice3.webp",
    renovations: "/home-additions.webp",
    carpentry: "/interiorfinishingservice1.webp",
    garages: "/garage-deck-fence.webp",
  };

  const brands = [
    { name: "Olympia Tile", file: "olympiatile.webp" },
    { name: "Shaw Flooring", file: "shawfloors.webp" },
    { name: "Caesarstone", file: "ceasarstonenew.webp" },
    { name: "Benjamin Moore", file: "bejaminmoorenew.webp" },
    { name: "Silestone", file: "silestonenew.webp" },
    { name: "James Hardie", file: "jameshardie.webp" },
  ];

  const testimonials = [
    { name: "Mark & Teresa W.", text: "John and his crew completely gutted and rebuilt our kitchen. Took about three weeks and they were here every single day. The tile work and cabinet install were perfect — you can tell these guys have been doing this a long time. Would absolutely hire them again.", project: "Kitchen Renovation", year: "2024" },
    { name: "Dan R.", text: "Had them finish our basement — full development from bare concrete to a liveable space with a bathroom, bedroom, and rec room. They handled the permits, passed every inspection first try, and the final result was way better than we expected for the price.", project: "Basement Development", year: "2023" },
    { name: "Priya S.", text: "We needed new flooring throughout our main floor and the quote came in well under the other companies we called. The LVP they sourced looks amazing and the install was super clean. No corners cut. Really happy with how it turned out.", project: "Flooring Installation", year: "2024" },
  ];

  return (
    <div className="flex flex-col">

      {/* ━━━ HERO ━━━ */}
      <section ref={heroRef} className="relative w-full h-[85vh] sm:h-screen min-h-[560px] max-h-[1100px] overflow-hidden bg-black">
        <div className="absolute inset-0">
          <VideoHero videoId="9f32426787cbe2b26a14642463b7b817" className="w-full h-full object-cover" />
          {/* Readability overlays — layered for stronger legibility on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/90 sm:from-black/50 sm:via-black/25 sm:to-black/85" />
          <div
            className="absolute inset-0 sm:hidden"
            style={{ background: "radial-gradient(ellipse at 30% 65%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%)" }}
          />
        </div>

        <div className="hero-glow absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 z-[1]" />
        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="absolute inset-0 flex items-center z-10">
          <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 whitespace-nowrap"
            >
              {["3rd Generation", "Family Owned", "Since 1968"].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                  className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-xs tracking-[0.18em] sm:tracking-[0.3em] uppercase text-white/85 font-medium"
                >
                  {word}
                  {i < 2 && <span className="text-sandstone/60">&middot;</span>}
                </motion.span>
              ))}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-[clamp(2.8rem,9vw,8rem)] font-hero uppercase tracking-wide leading-[0.95] mb-4 max-w-5xl hero-heading-shimmer"
            >
              Your Home.<br />Our Legacy.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-white/75 sm:text-white/60 text-[15px] sm:text-lg max-w-xl mb-7 sm:mb-8 leading-relaxed"
            >
              Your home deserves a builder who&apos;s been here since 1968. Three generations of quality craftsmanship — one family, one standard.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-start"
            >
              <Link href="/get-quote" className="group inline-flex items-center justify-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-sandstone transition-colors">
                Get a Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 text-white hover:text-sandstone px-5 py-3.5 text-sm tracking-wide transition-colors border border-white/40 rounded-full hover:border-sandstone/60 backdrop-blur-sm">
                Our Services
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-medium">Scroll</span>
            <div className="w-px h-6 bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ━━━ TRUST BAR ━━━ */}
      <section className="bg-[#0A0A0A] border-b border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3 py-4 sm:py-5">
            {[
              { icon: Star, text: "Free Consultations", highlight: true },
              { icon: Shield, text: "Licensed & Insured" },
              { icon: null, text: "3rd Generation Builder" },
              { icon: null, text: "5% Price Beat Guarantee" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-white/40 font-medium">
                {item.icon && <item.icon className={`w-3.5 h-3.5 ${item.highlight ? "fill-white text-white" : "text-white/40"}`} />}
                {!item.icon && <div className="w-1 h-1 rounded-full bg-white/25 shrink-0" />}
                <span className={item.highlight ? "text-white/60" : ""}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ STATS ━━━ */}
      <section className="bg-[#0A0A0A] border-b border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {[
              { val: "58+", label: "Years in Business" },
              { val: "5,000+", label: "Projects Completed" },
              { val: "3rd", label: "Generation Family" },
              { val: "100%", label: "Satisfaction Promise" },
            ].map((s, idx) => (
              <Reveal key={s.label} delay={idx * 0.08}>
                <div className="text-center py-8 sm:py-10">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white mb-1"><AnimatedCounter value={s.val} /></div>
                  <div className="text-[10px] sm:text-[10px] tracking-[0.15em] uppercase text-white/25 font-medium">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ ABOUT LEGACY ━━━ */}
      <section className="py-20 sm:py-28 md:py-36 bg-black">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-20 items-center">
            <Reveal className="lg:col-span-2">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                <Image src="/hpimage0302.png" alt="John Olivito reviewing blueprints with his crew on a Calgary construction site" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="relative pl-5 border-l-2 border-sandstone/40">
                    <p className="text-white/90 text-lg sm:text-xl font-serif italic leading-snug">&ldquo;Expect Only The Best&rdquo;</p>
                    <p className="text-[11px] text-sandstone/50 uppercase tracking-wider mt-1">— {BRAND_CONFIG.owner}, Owner &amp; 3rd Generation Builder</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="lg:col-span-3">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">About Our Legacy</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-6">
                Three Generations<br />of Quality
              </h2>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                Since 1968, the Olivito family has built a reputation on one simple promise: treat every client like family and deliver only the best. Now in our third generation, that commitment hasn&apos;t wavered.
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-4 mb-10">
                {[
                  { val: "24hr", label: "Response" },
                  { val: "$0", label: "Hidden Fees" },
                  { val: "100%", label: "Satisfaction" },
                ].map((s, idx) => (
                  <BlurReveal key={s.label} delay={0.3 + idx * 0.25} direction="bottom">
                    <div>
                      <span className="text-2xl sm:text-3xl font-heading font-black text-white">{s.val}</span>
                      <span className="text-xs text-white/25 uppercase tracking-wider ml-2">{s.label}</span>
                    </div>
                  </BlurReveal>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white/60 hover:text-white transition-colors group">
                Our Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ━━━ SERVICES ━━━ */}
      <section className="py-20 sm:py-28 md:py-36 bg-[#0A0A0A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
              <div>
                <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">What We Do</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95]">Our Services</h2>
              </div>
              <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-white transition-colors group shrink-0">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {featuredServices.map((service, idx) => (
              <Reveal key={service.id} delay={idx * 0.07}>
                <Link
                  href={`/services/${service.id}`}
                  className="group block relative aspect-[5/4] rounded-xl overflow-hidden bg-[#0C0C0C] ring-1 ring-white/[0.06] hover:ring-sandstone/30 hover:shadow-[0_20px_50px_-20px_rgba(196,181,160,0.25)] transition-all duration-500"
                >
                  <Image
                    src={serviceImages[service.id] || "/service-millwork.webp"}
                    alt={`${service.title} - Calgary construction services by PCND`}
                    fill
                    className="object-cover group-hover:scale-[1.08] transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10 group-hover:from-black group-hover:via-black/40 transition-all duration-700" />
                  <div
                    className="absolute inset-0 mix-blend-soft-light opacity-40 pointer-events-none"
                    style={{ background: "linear-gradient(180deg, rgba(196,181,160,0.15) 0%, rgba(0,0,0,0) 50%, rgba(196,181,160,0.08) 100%)" }}
                  />

                  {/* Corner brackets */}
                  <span className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t border-l border-sandstone/40 group-hover:border-sandstone/80 transition-colors duration-500" />
                  <span className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t border-r border-sandstone/40 group-hover:border-sandstone/80 transition-colors duration-500" />
                  <span className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b border-l border-sandstone/40 group-hover:border-sandstone/80 transition-colors duration-500" />
                  <span className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b border-r border-sandstone/40 group-hover:border-sandstone/80 transition-colors duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <div className="h-[1.5px] w-8 bg-sandstone/60 mb-4 group-hover:w-16 transition-all duration-500" />
                    <h3 className="text-lg sm:text-xl font-heading font-bold uppercase tracking-tight text-white leading-[1.05] mb-2">{service.title}</h3>
                    <p className="text-white/50 group-hover:text-white/75 text-[13px] leading-relaxed line-clamp-2 transition-colors duration-500 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] group-hover:border-sandstone/30 transition-colors duration-500">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60 group-hover:text-sandstone transition-colors duration-300">View Service</span>
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/20 group-hover:border-sandstone group-hover:bg-sandstone transition-all duration-300">
                        <ArrowRight className="w-3 h-3 text-white group-hover:text-black transition-colors duration-300" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ BRAND PARTNERS (MARQUEE) ━━━ */}
      <section className="py-10 sm:py-12 bg-[#0A0A0A] border-y border-white/[0.04] overflow-hidden">
        <p className="text-center text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-white/40 font-medium mb-6">Trusted Brands We Work With</p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
          <div className="flex marquee-track">
            {[...brands, ...brands, ...brands, ...brands].map((brand, i) => (
              <div key={`${brand.name}-${i}`} className="relative h-8 sm:h-10 w-32 sm:w-40 shrink-0 mx-6 sm:mx-8 invert grayscale opacity-50 hover:opacity-80 hover:grayscale-0 transition-all duration-500">
                <Image src={`/${brand.file}`} alt={brand.name} fill className="object-contain" sizes="160px" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ BASEMENT PROMO ━━━ */}
      <section className="bg-black overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[550px]">
          <Reveal>
            <div className="relative h-[350px] sm:h-[400px] lg:h-full">
              <Image src="/basementland02.webp" alt="Finished basement development in Calgary with wet bar and living area by PCND" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 lg:block hidden" />
              <div className="absolute top-4 left-4">
                <span className="inline-block bg-white/10 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/10">
                  15% Off — Limited Time
                </span>
              </div>
            </div>
          </Reveal>
          <div className="flex items-center px-5 sm:px-12 lg:px-16 xl:px-24 py-10 sm:py-14 lg:py-20">
            <Reveal delay={0.15}>
              <div>
                <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">Featured</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-6">Basement<br />Developments</h2>
                <p className="text-white/40 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                  Turnkey development — framing, electrical, plumbing, drywall, flooring, and finishes. Permits handled. One team, start to finish.
                </p>
                <ul className="space-y-3 mb-10">
                  {["Full turnkey development", "Permits & inspections handled", "Moisture control included"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/45 text-sm">
                      <div className="w-1 h-1 rounded-full bg-white/40 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/get-quote/basement" className="group inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-white/90 transition-colors">
                  Get 15% Off <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ━━━ TESTIMONIALS ━━━ */}
      <section className="py-20 sm:py-28 md:py-36 bg-[#0A0A0A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <Reveal>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">Client Stories</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95]">What Our Clients Say</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((t, idx) => (
              <Reveal key={t.name} delay={idx * 0.1}>
                <SpotlightCard className="rounded-xl h-full" spotlightColor="rgba(196, 181, 160, 0.15)">
                  <div className="p-7 sm:p-8 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white/35 bg-white/[0.05] px-2 py-0.5 rounded-full border border-white/[0.08]">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                      </span>
                    </div>
                    <p className="text-white/50 text-[15px] leading-relaxed flex-1 mb-6">&ldquo;{t.text}&rdquo;</p>
                    <div className="border-t border-white/[0.06] pt-5 flex items-center gap-3">
                      <InitialsAvatar name={t.name} />
                      <div>
                        <p className="font-semibold text-white text-sm">{t.name}</p>
                        <p className="text-[11px] text-white/25 mt-0.5">{t.project} &middot; {t.year}</p>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ━━━ FINAL CTA ━━━ */}
      <section className="py-24 sm:py-32 md:py-40 bg-black relative overflow-hidden">
        <LightRays
          raysOrigin="top-center"
          raysColor="#C4B5A0"
          raysSpeed={0.4}
          lightSpread={1.2}
          rayLength={2.5}
          fadeDistance={1.2}
          saturation={0.6}
          followMouse={true}
          mouseInfluence={0.08}
          className="opacity-20"
        />
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <Reveal>
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/25 font-medium mb-5">Free Consultation</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tight leading-[0.9] mb-6">Ready to Build?</h2>
            <p className="text-white/30 text-base sm:text-lg leading-relaxed mb-10 max-w-md mx-auto">
              No pressure, no obligation. Tell us about your project and we&apos;ll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link href="/get-quote" className="group inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-white/90 transition-colors">
                Get a Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-white/30 hover:text-white px-5 py-3.5 text-sm tracking-wide transition-colors border border-white/10 rounded-full hover:border-white/30">
                <Phone className="w-3.5 h-3.5" /> Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
