"use client";

/**
 * Homepage — "Showroom + Studio" two-canvas direction.
 *
 * Dark canvases carry the showroom drama (hero, spec sheet, services,
 * basement promo, final CTA). Cream canvases carry the studio voice (about,
 * material partners, testimonials). See memory
 * `project_showroom_studio_design.md`.
 */

import Link from "next/link";
import Image from "next/image";
import { DARK_BLUR, CREAM_BLUR } from "@/lib/blur";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { services } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { VideoHero } from "@/components/VideoHero";
import { ArrowRight, Phone, Hammer, Users, Clock, BadgePercent, MapPin, Star, Shield } from "lucide-react";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { BlurReveal } from "@/components/BlurReveal";
import { BookConsultationCTA } from "@/components/BookConsultationCTA";
import { getActivePromo } from "@/lib/promo";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Small reusable section label — sandstone hairline + uppercase tracking. */
function SectionLabel({ label, theme = "dark" }: { label: string; theme?: "dark" | "cream" }) {
  const isDark = theme === "dark";
  return (
    <div className="flex items-center gap-3 mb-4 sm:mb-5">
      <span className={`h-px w-6 ${isDark ? "bg-sandstone/60" : "bg-sandstone-dark/50"}`} aria-hidden="true" />
      <span className={`text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase font-medium ${isDark ? "text-white/55" : ""} ${!isDark ? "cream-eyebrow" : ""}`}>
        {label}
      </span>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.85], [0, 40]);
  const activePromo = getActivePromo();

  /* Renovation-first lead: top four are renos (kitchen, bathroom, basement,
     whole-home), then two top component services for visual variety. Order
     matters — defines the visible left-to-right reading order of the grid. */
  const FEATURED_ORDER = ["kitchens", "bathrooms", "basements", "renovations", "countertops", "cabinets"];
  const featuredServices = FEATURED_ORDER
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const serviceImages: Record<string, string> = {
    kitchens: "/kitchenshero.webp",
    bathrooms: "/bathroomshero.webp",
    basements: "/basementland02.webp",
    renovations: "/home-additions.webp",
    countertops: "/countertopsservice3.webp",
    cabinets: "/service-millwork.webp",
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
    { name: "Mark & Teresa W.", text: "John and his crew completely gutted and rebuilt our kitchen. Took about three weeks and they were here every single day. The tile work and cabinet install were as good as anything we’d seen — you can tell these guys have been doing this a long time. Would absolutely hire them again.", project: "Full Kitchen Renovation", year: "2024" },
    { name: "Ahmed R.", text: "Had them finish our basement — full development from bare concrete to a liveable space with a bathroom, bedroom, and rec room. They handled the permits, passed every inspection first try, and the final result was way better than we expected for the price.", project: "Full Basement Development", year: "2023" },
    { name: "Priya S.", text: "We needed new flooring throughout our main floor and the quote came in well under the other companies we called. The LVP they sourced looks amazing and the install was super clean. No corners cut. Really happy with how it turned out.", project: "Main Floor LVP Installation", year: "2024" },
  ];

  /* Spec stats — paired with refined lucide icons + a sandstone leader prefix.
     Service area lives as a footer line below the grid so the four cards stay
     visually balanced. */
  const stats = [
    { Icon: Hammer,       label: "Projects Delivered", value: "5,000+" },
    { Icon: Users,        label: "Generation",         value: "Third" },
    { Icon: Clock,        label: "Response Time",      value: "24 Hours" },
    { Icon: BadgePercent, label: "Price Guarantee",    value: "Beats by 5%" },
  ];

  const quotePaths = [
    {
      title: "Basement Development",
      desc: "Bare concrete to finished living space, including permits and inspections.",
      href: "/get-quote?service=basements",
    },
    {
      title: "Kitchen or Bathroom",
      desc: "Cabinets, counters, showers, tile, flooring, and full room renovations.",
      href: "/get-quote?service=kitchens",
    },
    {
      title: "Flooring & Finishes",
      desc: "Fast quotes for flooring, millwork, drywall, paint, countertops, and trim.",
      href: "/get-quote?service=flooring",
    },
    {
      title: "Not Sure Yet",
      desc: "Send the rough idea. We'll help you shape the scope before we quote it.",
      href: "/get-quote",
    },
  ];

  return (
    <div className="flex flex-col">

      {/* ━━━ HERO — DARK ━━━ */}
      <section ref={heroRef} className="relative w-full h-[85vh] sm:h-screen min-h-[560px] max-h-[1100px] overflow-hidden bg-black">
        <div className="absolute inset-0">
          <VideoHero videoId="9f32426787cbe2b26a14642463b7b817" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/90 sm:from-black/50 sm:via-black/25 sm:to-black/85" />
          <div className="absolute inset-0 sm:hidden" style={{ background: "radial-gradient(ellipse at 30% 65%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%)" }} />
        </div>

        {/* Architect's stamp — top-right, restrained, gives the hero a printed-page feel. */}
        <div className="hidden sm:flex absolute top-6 right-6 z-10 items-center gap-3 text-[10px] font-mono tracking-[0.22em] uppercase text-white/55 font-medium">
          <span>Est. 1968</span>
          <span className="h-px w-5 bg-sandstone/50" aria-hidden="true" />
          <span>Calgary · Alberta</span>
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="absolute inset-0 flex items-center z-10">
          <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="flex items-center gap-3 mb-5 sm:mb-6">
              <span className="h-px w-6 bg-sandstone/60" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.22em] uppercase text-white/75 font-medium">A Family of Builders</span>
            </motion.div>
            {/* Masked line-rise — each line lifts out of its own clip, 140ms apart.
                The gradient class lives on the inner span so the metallic clip
                renders per line while the outer span acts as the mask. */}
            <h1 className="text-[clamp(2.5rem,7.5vw,8rem)] font-hero uppercase tracking-wide leading-[0.95] mb-4 max-w-5xl">
              {["Your Calgary Home,", "Built to Last."].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                  <motion.span
                    className="block hero-heading-shimmer"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, delay: 0.4 + i * 0.14, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }} className="font-mono italic text-sandstone/95 text-[13px] sm:text-[15px] max-w-2xl mb-3 tracking-tight">
              — Three generations of quality craftsmanship.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }} className="text-white/65 text-[15px] sm:text-base max-w-xl mb-8 sm:mb-10 leading-relaxed">
              Calgary renovations, basements, kitchens, bathrooms, flooring, cabinets, and custom finishes — all handled by one accountable team.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1 }} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <Link href="/get-quote" className="group inline-flex items-center justify-center gap-3 bg-white text-black px-9 py-4 rounded-full font-black text-base tracking-wide hover:bg-sandstone transition-colors shadow-[0_4px_24px_rgba(255,255,255,0.12)]">
                Get a Free Quote <ArrowRight aria-hidden="true" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`tel:${BRAND_CONFIG.contact.phoneHref}`} className="inline-flex items-center justify-center gap-2 text-white/90 hover:text-white px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors border border-white/25 rounded-full hover:border-sandstone/60">
                <Phone aria-hidden="true" className="w-4 h-4" /> {BRAND_CONFIG.contact.phoneFormatted}
              </a>
              <Link href="/services" className="inline-flex items-center justify-center gap-1.5 text-white/65 hover:text-white px-2 py-3.5 text-sm font-medium tracking-wide transition-colors">
                Our Services <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Above-the-fold trust micro-row — mirrors the service-hero pattern. */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.15 }} className="mt-7 flex flex-wrap items-center gap-x-4 sm:gap-x-7 gap-y-2 text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.14em] text-white/65 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="flex gap-0.5">{[...Array(5)].map((_, i) => (<Star key={i} aria-hidden="true" className="w-3 h-3 fill-sandstone text-sandstone" />))}</span>
                5.0 Rated
              </span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/25" />
              <span className="flex items-center gap-1.5"><Shield aria-hidden="true" className="w-3.5 h-3.5 text-sandstone" /> Licensed &amp; Insured</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/25" />
              <span className="flex items-center gap-1.5"><Clock aria-hidden="true" className="w-3.5 h-3.5 text-sandstone" /> 24-Hr Response</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/25" />
              <Link href="/price-beat" className="flex items-center gap-1.5 hover:text-white transition-colors"><BadgePercent aria-hidden="true" className="w-3.5 h-3.5 text-sandstone" /> 5% Price Beat</Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Measured-rule scroll indicator — drafting reference, not the standard arrow-bounce */}
        <div className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-sandstone/60">
          <span className="text-[9px] font-mono tracking-[0.22em] uppercase font-medium">Scroll</span>
          <span className="h-12 w-px bg-gradient-to-b from-sandstone/60 to-transparent" aria-hidden="true" />
        </div>

        {/* Signature — the architect's drafting rule along the hero baseline.
            "Precision" rendered literally: a measure taken across the page. */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="absolute bottom-0 inset-x-0 z-10"
        >
          <div className="drafting-rule opacity-70" />
        </motion.div>
      </section>

      {/* ━━━ FEATURE PROMO — DARK ━━━
          Sits directly under the hero so the active site promo is the
          first thing visitors see after the headline — and so it doesn't
          collide with the scroll-triggered PromoModal which fires further
          down the page (~60% scroll).
          During an active promo, this slot is a full-bleed editorial
          tableau: the marketing image fills the section as background,
          with all typography centered on top of the workbench's empty
          zone. When the promo expires the same slot reverts to the
          basement-developments feature. */}
      {activePromo ? (
        <section className="relative isolate overflow-hidden">
          {/* Image fills the entire section. Composition is top-and-bottom
              loaded (cherry branch top, materials bottom) so object-cover
              keeps the framing intact when cropped at narrow viewports. */}
          <div aria-hidden="true" className="absolute inset-0">
            <Image
              src={activePromo.image.src}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              quality={88}
              priority={false}
            />
            {/* Soft radial vignette + horizontal dim — keeps the center calm
                and dark enough for white typography while leaving the bright
                perimeter elements (cherry blossom, materials, brass) visible. */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/45" />
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 70%)",
            }} />
            {/* Sandstone hairline at the section edges for editorial closure. */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sandstone/35 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sandstone/35 to-transparent" />
          </div>

          {/* Centered editorial content — sits on the workbench's empty zone. */}
          <div className="relative z-10 min-h-[600px] sm:min-h-[680px] lg:min-h-[760px] flex items-center justify-center">
            <div className="container mx-auto px-6 max-w-3xl text-center py-20 sm:py-24 lg:py-28">
              <Reveal>
                <div className="flex items-center justify-center gap-3 mb-7 sm:mb-9">
                  <span className="h-px w-8 sm:w-10 bg-sandstone/70" aria-hidden="true" />
                  <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-sandstone/90 font-medium flex items-center gap-2">
                    <span className="inline-block h-1 w-1 rounded-full bg-sandstone animate-pulse" aria-hidden="true" />
                    {activePromo.label}
                  </p>
                  <span className="h-px w-8 sm:w-10 bg-sandstone/70" aria-hidden="true" />
                </div>

                <h2 className="font-hero uppercase text-white text-[64px] sm:text-[88px] md:text-[108px] lg:text-[124px] leading-[0.85] tracking-tight mb-1 sm:mb-2 [text-shadow:0_2px_30px_rgba(0,0,0,0.5)]">
                  15% Off
                </h2>
                <h2 className="font-hero uppercase text-sandstone text-[40px] sm:text-[56px] md:text-[68px] lg:text-[80px] leading-[0.9] tracking-tight mb-7 sm:mb-9 [text-shadow:0_2px_30px_rgba(0,0,0,0.6)]">
                  Every Service
                </h2>

                <div className="h-px w-20 sm:w-28 bg-gradient-to-r from-transparent via-sandstone/80 to-transparent mx-auto mb-7 sm:mb-8" />

                <p className="font-serif italic text-white/95 text-xl sm:text-2xl md:text-[28px] leading-[1.25] max-w-2xl mx-auto mb-5 [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
                  Now through {activePromo.endsAtDisplay} — our spring rate applies to every quote we send.
                </p>

                <p className="text-white/75 text-[13px] sm:text-sm tracking-[0.15em] uppercase font-medium max-w-2xl mx-auto mb-10 sm:mb-12 [text-shadow:0_2px_14px_rgba(0,0,0,0.5)]">
                  All services · No minimums · Stacks with our 5% price-beat guarantee
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
                  <Link
                    href={activePromo.cta.href}
                    className="group inline-flex items-center justify-center gap-3 bg-sandstone text-black px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-sandstone-light transition-colors shadow-[0_12px_36px_-8px_rgba(169,178,191,0.55)]"
                  >
                    {activePromo.cta.label}
                    <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 text-white/85 hover:text-white px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors border border-white/20 rounded-full hover:border-sandstone/60 backdrop-blur-sm bg-white/[0.03]"
                  >
                    Browse all services →
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Registration-mark stamp — quiet editorial closure, matches the
              architectural register established elsewhere on the page. */}
          <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] font-mono tracking-[0.22em] uppercase text-white/55 font-medium [text-shadow:0_2px_10px_rgba(0,0,0,0.7)]">
            <span className="h-px w-8 sm:w-10 bg-white/30" aria-hidden="true" />
            <span>PCND · Calgary · Est. 1968</span>
            <span className="h-px w-8 sm:w-10 bg-white/30" aria-hidden="true" />
          </div>
        </section>
      ) : (
        <Section variant="dark" padding="none" withContainer={false} className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[550px]">
            <Reveal>
              <div className="relative h-[350px] sm:h-[400px] lg:h-full">
                <Image src="/basementland02.webp" alt="Finished basement development in Calgary with wet bar and living area by PCND" fill placeholder="blur" blurDataURL={DARK_BLUR} className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" quality={80} />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 lg:block hidden" />
              </div>
            </Reveal>
            <div className="flex items-center px-5 sm:px-12 lg:px-16 xl:px-24 py-10 sm:py-14 lg:py-20">
              <Reveal delay={0.15}>
                <div>
                  <SectionLabel label="Featured Service" theme="dark" />
                  <h2 className="text-[28px] sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-5 sm:mb-6">
                    Basement<br />Developments
                  </h2>
                  <p className="font-serif italic text-white/85 text-lg sm:text-xl leading-snug mb-3 max-w-md">
                    A turnkey transformation — concrete to finished space.
                  </p>
                  <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                    Framing, electrical, plumbing, drywall, flooring, finishes. Permits handled. One team, start to finish.
                  </p>
                  <ul className="space-y-3 mb-10">
                    {["Full turnkey development", "Permits & inspections handled", "Moisture control included"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                        <div className="w-1 h-1 rounded-full bg-sandstone shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/services/basements" className="group inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-white/90 transition-colors">
                    See Basement Services <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </Section>
      )}

      {/* ━━━ BY THE NUMBERS — DARK ━━━
          Editorial spec-sheet, upgrade pass: keeps the EST. 1968 typographic
          anchor, then breaks the linear row list into a four-card stat grid
          with lucide icons and a sandstone hover-rise — each card reads as a
          standalone spec tile while the row beneath ties the service area
          back to the brand's geography. */}
      <Section variant="dark" bg="bg-[#0A0A0A]" padding="md" containerClassName="container mx-auto px-6 max-w-6xl">
        {/* Masthead — quiet eyebrow + place stamp */}
        <Reveal>
          <div className="flex items-baseline justify-between pb-7 mb-8 sm:mb-10 border-b border-sandstone/20">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-sandstone/60" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase text-white/55 font-medium">By the Numbers</span>
            </div>
            <span className="hidden sm:inline text-[10px] font-mono tracking-[0.22em] uppercase text-white/35 font-medium">Calgary · Alberta</span>
          </div>
        </Reveal>

        {/* Heritage anchor — Est. 1968 + editorial italic line. */}
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-end gap-6 md:gap-12 pb-10 sm:pb-12 mb-10 sm:mb-12 border-b border-sandstone/15">
            <div className="flex items-end gap-3 sm:gap-5">
              <span className="font-heading font-black text-sandstone/85 text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase pb-3 sm:pb-4">Est.</span>
              <span className="font-hero text-white text-[88px] sm:text-[128px] md:text-[160px] leading-[0.8] tracking-tight tabular-nums">
                1968
              </span>
            </div>
            <p className="font-serif italic text-white/75 text-lg sm:text-xl md:text-[22px] leading-snug max-w-md md:pb-3 md:text-right md:ml-auto">
              Six decades on the same Calgary streets — three generations of the same standard.
            </p>
          </div>
        </Reveal>

        {/* Stat-card grid — 2x2 on mobile, four-across on desktop. Each card
            carries an icon, a tabular leader number, the value (heading
            display) and the label (tracked small caps). Hover lifts the
            sandstone hairline + brightens the icon. */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <div className="group relative h-full bg-white/[0.02] border border-white/[0.08] hover:border-sandstone/45 transition-colors duration-300 rounded-sm p-5 sm:p-6 md:p-7 flex flex-col">
                <div className="mb-5 sm:mb-6">
                  <stat.Icon aria-hidden="true" className="w-7 h-7 sm:w-8 sm:h-8 text-sandstone/80 group-hover:text-sandstone transition-colors" strokeWidth={1.5} />
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <p className="font-heading font-black text-white text-2xl sm:text-3xl md:text-[34px] leading-none tracking-tight uppercase tabular-nums mb-2.5">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-white/55 font-medium leading-snug">
                    {stat.label}
                  </p>
                </div>
                {/* Sandstone hairline accent that grows on hover — a quiet kinetic flourish */}
                <span aria-hidden="true" className="absolute left-5 sm:left-6 md:left-7 bottom-5 sm:bottom-6 md:bottom-7 h-px w-6 bg-sandstone/40 group-hover:w-10 group-hover:bg-sandstone/80 transition-[width,background-color] duration-300" style={{ marginBottom: -2 }} />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Service area — ties the four stats back to the brand's geography.
            Renders as a quiet hairline-flanked tagline below the grid. */}
        <Reveal delay={0.3}>
          <div className="mt-10 sm:mt-12 pt-7 sm:pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center">
            <MapPin aria-hidden="true" className="w-3.5 h-3.5 text-sandstone/70" />
            <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase text-white/55 font-medium">
              Serving Calgary · Airdrie · Cochrane · Okotoks
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.36}>
          <div className="mt-10 sm:mt-12 pt-10 sm:pt-12 border-t border-white/[0.06] grid grid-cols-1 lg:grid-cols-[0.9fr_1.35fr] gap-8 lg:gap-12 items-start">
            <div>
              <SectionLabel label="Fast Quote Paths" theme="dark" />
              <h2 className="text-[28px] sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-4">
                Start With the<br className="hidden sm:block" /> Right Quote.
              </h2>
              <p className="font-serif italic text-white/72 text-lg sm:text-xl leading-snug max-w-md mb-6">
                Pick the closest project type and we&apos;ll route the details to the right estimate.
              </p>
              <a
                href={`tel:${BRAND_CONFIG.contact.phone}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-white/75 hover:text-sandstone transition-colors"
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                Prefer to talk? {BRAND_CONFIG.contact.phoneFormatted}
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {quotePaths.map((path) => (
                <Link
                  key={path.title}
                  href={path.href}
                  className="group rounded-sm border border-white/[0.08] bg-white/[0.025] p-5 transition-colors hover:border-sandstone/45 hover:bg-white/[0.045]"
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h3 className="font-heading text-base font-black uppercase tracking-tight text-white">
                      {path.title}
                    </h3>
                    <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-sandstone/70 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm leading-relaxed text-white/58">{path.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ━━━ ABOUT LEGACY — CREAM ━━━ */}
      <Section variant="cream">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-20 items-center">
          <Reveal className="lg:col-span-2">
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden ring-1 ring-bone-hairline">
              <Image src="/hpimage0302.webp" alt="John Olivito reviewing blueprints with his crew on a Calgary construction site" fill placeholder="blur" blurDataURL={CREAM_BLUR} className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" quality={85} />
            </div>
            <div className="mt-6 pl-5 border-l-2 border-sandstone-dark">
              <p className="font-serif italic text-[22px] sm:text-[26px] leading-tight text-ink">&ldquo;Expect Only The Best.&rdquo;</p>
              <p className="mt-2 text-[10px] font-mono tracking-[0.2em] uppercase font-medium text-sandstone-muted">
                — {BRAND_CONFIG.owner}, Owner &amp; 3rd Generation Builder
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-3">
            <SectionLabel label="The Family" theme="cream" />
            <h2 className="text-[28px] sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-6 sm:mb-7">
              Three Generations<br />of Quality
            </h2>
            <p className="font-serif italic text-[20px] sm:text-2xl leading-snug text-ink mb-6 max-w-2xl">
              Since 1968, the Olivito family has built a reputation on one simple promise.
            </p>
            <p className="text-ink-muted text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
              Treat every client like family and deliver only the best. Now in our third generation, that commitment hasn&apos;t wavered — same ownership, same standard, same handshake.
            </p>
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-10 pb-10 border-b border-bone-hairline">
              {[
                { val: "24hr", label: "Response" },
                { val: "$0",   label: "Hidden Fees" },
                { val: "100%", label: "Satisfaction" },
              ].map((s, idx) => (
                <BlurReveal key={s.label} delay={0.3 + idx * 0.2} direction="bottom">
                  <div>
                    <div className="text-3xl sm:text-4xl font-heading font-black text-ink leading-none">{s.val}</div>
                    <div className="mt-2 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium text-sandstone-muted">{s.label}</div>
                  </div>
                </BlurReveal>
              ))}
            </div>
            <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-ink hover:text-sandstone-dark transition-colors group">
              Our Story <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ━━━ SERVICES — DARK ━━━ */}
      <Section variant="dark" bg="bg-[#0A0A0A]">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <SectionLabel label="Selected Capabilities" theme="dark" />
              <h2 className="text-[28px] sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95]">
                What We Build
              </h2>
              <p className="font-serif italic text-white/65 text-lg sm:text-xl mt-3 max-w-md">
                A short index of the work we&apos;re known for.
              </p>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors group shrink-0">
              View All <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        {/* Drafting-rule echo — ties the index back to the hero's signature measure. */}
        <Reveal>
          <div className="drafting-rule opacity-50 mb-8 sm:mb-10" aria-hidden="true" />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featuredServices.map((service, idx) => (
            <Reveal key={service.id} delay={idx * 0.07}>
              <ServiceCard
                href={`/services/${service.id}`}
                title={service.title}
                image={serviceImages[service.id] || "/service-millwork.webp"}
                alt={`${service.title} - Calgary construction services by PCND`}
                featuredBadge={activePromo ? "15% Off" : undefined}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ━━━ MATERIAL PARTNERS — CREAM ━━━ */}
      <Section variant="cream" padding="md" withContainer={false} className="overflow-hidden">
        <div className="flex items-center justify-center gap-3 mb-7 px-6">
          <span className="h-px w-6 bg-sandstone-dark/50" aria-hidden="true" />
          <p className="cream-eyebrow text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase font-medium">Material Partners</p>
          <span className="h-px w-6 bg-sandstone-dark/50" aria-hidden="true" />
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bone to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bone to-transparent z-10" />
          <div className="flex marquee-track">
            {/* Two copies — first is the lineup, second provides the seamless CSS-keyframe wrap. */}
            {/* Ink-silhouette treatment: brightness(0) flattens every logo —
                colored, grey, or white-on-transparent — to a uniform dark mark
                that actually reads on the bone canvas (several of these logos
                were near-invisible with the old saturate filter). */}
            {[...brands, ...brands].map((brand, i) => (
              <div key={`${brand.name}-${i}`} className="relative h-9 sm:h-11 w-32 sm:w-40 shrink-0 mx-6 sm:mx-8 opacity-55 hover:opacity-80 transition-opacity duration-500" style={{ filter: "brightness(0)" }}>
                <Image src={`/${brand.file}`} alt={brand.name} fill className="object-contain" sizes="160px" quality={70} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━ TESTIMONIALS — CREAM ━━━ */}
      <Section variant="cream">
        <Reveal>
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-px w-6 bg-sandstone-dark/50" aria-hidden="true" />
              <p className="cream-eyebrow text-[10px] sm:text-xs font-mono tracking-[0.22em] uppercase font-medium">Testimonials</p>
              <span className="h-px w-6 bg-sandstone-dark/50" aria-hidden="true" />
            </div>
            <h2 className="text-[30px] sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-5">
              In Their Own Words
            </h2>
            <p className="font-serif italic text-lg sm:text-xl text-ink-muted max-w-xl mx-auto">
              Three generations of word-of-mouth.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {testimonials.map((t, idx) => (
            <Reveal key={t.name} delay={idx * 0.1}>
              <TestimonialCard {...t} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ━━━ BOOK CONSULTATION — CREAM ━━━
          Replaces the previous dark "Ready to Build / Get a Free Quote" block
          that visually duplicated the footer's quote CTA. Shifts the page
          ending toward a higher-intent path (in-home consultation) on a
          cream canvas, so the page ↓ footer pair now ladders rather than
          repeats. */}
      <BookConsultationCTA
        eyebrow="Prefer to Meet First?"
        headline="Let's Walk Your Space"
      />
    </div>
  );
}
