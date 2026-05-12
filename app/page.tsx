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
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { services, getServiceCtaLabel } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { VideoHero } from "@/components/VideoHero";
import { ArrowRight, Phone } from "lucide-react";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { BlurReveal } from "@/components/BlurReveal";

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
      <span className={`text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-medium ${isDark ? "text-white/55" : ""} ${!isDark ? "cream-eyebrow" : ""}`}>
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

  const featuredServices = services.filter((s) =>
    ["basements", "cabinets", "showers", "countertops", "renovations", "carpentry"].includes(s.id)
  );

  const serviceImages: Record<string, string> = {
    basements: "/basementland02.webp",
    cabinets: "/service-millwork.webp",
    showers: "/service-steam-shower.webp",
    countertops: "/countertopsservice3.webp",
    renovations: "/home-additions.webp",
    carpentry: "/interiorfinishingservice1.webp",
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

  /* Dossier rows — the editorial spec-sheet that replaces the prior trust-pill
     row + stats-tile grid. Reads like a project brief from an architect's studio. */
  const dossier = [
    { label: "Working Since",   value: "1968" },
    { label: "Projects Delivered", value: "5,000+" },
    { label: "Generation",      value: "Third" },
    { label: "Response Time",   value: "Within 24 Hours" },
    { label: "Price Guarantee", value: "Beats Competitors by 5%" },
    { label: "Service Area",    value: "Calgary · Airdrie · Cochrane · Okotoks" },
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
        <div className="hidden sm:flex absolute top-6 right-6 z-10 items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-white/55 font-medium">
          <span>Est. 1968</span>
          <span className="h-px w-5 bg-sandstone/50" aria-hidden="true" />
          <span>Calgary · Alberta</span>
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="absolute inset-0 flex items-center z-10">
          <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="flex items-center gap-3 mb-5 sm:mb-6">
              <span className="h-px w-6 bg-sandstone/60" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/75 font-medium">A Family of Builders</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="text-[clamp(2.5rem,7.5vw,8rem)] font-hero uppercase tracking-wide leading-[0.95] mb-4 max-w-5xl hero-heading-shimmer">
              Your Home.<br />Our Legacy.
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }} className="font-serif italic text-white/85 text-lg sm:text-2xl max-w-2xl mb-3 leading-snug">
              Three generations of quality craftsmanship.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }} className="text-white/65 text-[15px] sm:text-base max-w-xl mb-8 sm:mb-10 leading-relaxed">
              One family, one standard, one handshake — since 1968.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1 }} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-start">
              <Link href="/get-quote" className="group inline-flex items-center justify-center gap-3 bg-white text-black px-9 py-4 rounded-full font-black text-base tracking-wide hover:bg-sandstone transition-colors shadow-[0_4px_24px_rgba(255,255,255,0.12)]">
                Get a Free Quote <ArrowRight aria-hidden="true" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors">
                Our Services →
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Measured-rule scroll indicator — drafting reference, not the standard arrow-bounce */}
        <div className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-sandstone/60">
          <span className="text-[9px] tracking-[0.3em] uppercase font-medium">Scroll</span>
          <span className="h-12 w-px bg-gradient-to-b from-sandstone/60 to-transparent" aria-hidden="true" />
        </div>
      </section>

      {/* ━━━ BY THE NUMBERS — DARK (spec-sheet replaces prior trust-bar + stats) ━━━ */}
      <Section variant="dark" bg="bg-[#0A0A0A]" padding="md" containerClassName="container mx-auto px-6 max-w-5xl">
        {/* Section header — a quiet masthead */}
        <Reveal>
          <div className="flex items-baseline justify-between pb-5 sm:pb-6 mb-2 border-b border-sandstone/20">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-sandstone/60" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-white/55 font-medium">By the Numbers</span>
            </div>
            <span className="hidden sm:inline text-[10px] tracking-[0.25em] uppercase text-white/35 font-medium">Precision Construction &amp; Decora · Calgary, AB</span>
          </div>
        </Reveal>

        {/* Spec-sheet rows — label left, value right, hairlines between */}
        <dl className="divide-y divide-white/[0.06]">
          {dossier.map((row, i) => (
            <Reveal key={row.label} delay={i * 0.05}>
              <div className="flex items-baseline justify-between gap-6 py-5 sm:py-6">
                <dt className="flex items-baseline gap-3 sm:gap-4 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-white/55 font-medium shrink-0">
                  <span className="text-sandstone tabular-nums font-mono text-[10px]">{String(i + 1).padStart(2, "0")}</span>
                  <span>{row.label}</span>
                </dt>
                <dd className="font-heading font-black text-right text-[18px] sm:text-2xl md:text-3xl text-white tracking-tight leading-none uppercase tabular-nums">
                  {row.value}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* ━━━ ABOUT LEGACY — CREAM ━━━ */}
      <Section variant="cream">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-20 items-center">
          <Reveal className="lg:col-span-2">
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden ring-1 ring-bone-hairline">
              <Image src="/hpimage0302.webp" alt="John Olivito reviewing blueprints with his crew on a Calgary construction site" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" quality={85} />
            </div>
            <div className="mt-6 pl-5 border-l-2 border-sandstone-dark">
              <p className="font-serif italic text-[22px] sm:text-[26px] leading-tight text-ink">&ldquo;Expect Only The Best.&rdquo;</p>
              <p className="mt-2 text-[10px] tracking-[0.25em] uppercase font-medium text-sandstone-muted">
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
              Treat every client like family and deliver only the best. Now in our third generation, that commitment hasn&apos;t wavered — same family, same standard, same handshake.
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
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12 md:mb-16">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featuredServices.map((service, idx) => (
            <Reveal key={service.id} delay={idx * 0.07}>
              <ServiceCard
                href={`/services/${service.id}`}
                title={service.title}
                image={serviceImages[service.id] || "/service-millwork.webp"}
                alt={`${service.title} - Calgary construction services by PCND`}
                eyebrow={`No. ${String(idx + 1).padStart(2, "0")}`}
                ctaLabel={getServiceCtaLabel(service.id)}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ━━━ MATERIAL PARTNERS — CREAM ━━━ */}
      <Section variant="cream" padding="md" withContainer={false} className="overflow-hidden">
        <div className="flex items-center justify-center gap-3 mb-7 px-6">
          <span className="h-px w-6 bg-sandstone-dark/50" aria-hidden="true" />
          <p className="cream-eyebrow text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-medium">Material Partners</p>
          <span className="h-px w-6 bg-sandstone-dark/50" aria-hidden="true" />
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bone to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bone to-transparent z-10" />
          <div className="flex marquee-track">
            {/* Two copies — first is the lineup, second provides the seamless CSS-keyframe wrap. */}
            {[...brands, ...brands].map((brand, i) => (
              <div key={`${brand.name}-${i}`} className="relative h-9 sm:h-11 w-32 sm:w-40 shrink-0 mx-6 sm:mx-8 opacity-70 hover:opacity-100 transition-opacity duration-500" style={{ filter: "saturate(0.7)" }}>
                <Image src={`/${brand.file}`} alt={brand.name} fill className="object-contain" sizes="160px" quality={70} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━ BASEMENT PROMO — DARK ━━━ */}
      <Section variant="dark" padding="none" withContainer={false} className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[550px]">
          <Reveal>
            <div className="relative h-[350px] sm:h-[400px] lg:h-full">
              <Image src="/basementland02.webp" alt="Finished basement development in Calgary with wet bar and living area by PCND" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" quality={80} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 lg:block hidden" />

              {/* Architect's price stamp — replaces the prior pill badge. Two-block tag
                  that reads like something stamped on a project sheet. */}
              <div className="absolute top-6 left-6 flex items-stretch shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]">
                <div className="bg-sandstone text-black font-heading font-black text-3xl sm:text-4xl tracking-tight px-4 sm:px-5 py-3 leading-none flex items-center">
                  &minus;15%
                </div>
                <div className="ml-px bg-black/80 backdrop-blur-sm flex flex-col justify-center px-3 sm:px-4 py-3 border-l border-sandstone/20">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-sandstone/90 leading-none mb-1.5 font-medium">Client Rate</p>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-white/85 leading-none font-semibold">Basement Work</p>
                </div>
              </div>
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
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                  <Link href="/services/basements" className="group inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-white/90 transition-colors">
                    See Basement Services <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/get-quote/basement" className="text-sm font-semibold text-white/75 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-sandstone transition-colors">
                    Or claim 15% off →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ━━━ TESTIMONIALS — CREAM ━━━ */}
      <Section variant="cream">
        <Reveal>
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-px w-6 bg-sandstone-dark/50" aria-hidden="true" />
              <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Testimonials</p>
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

      {/* ━━━ FINAL CTA — DARK ━━━ */}
      <section className="py-16 sm:py-24 md:py-32 lg:py-40 bg-black relative overflow-hidden">
        {/* Blueprint-grid backdrop — quieter and more architectural than the
            prior LightRays glow. Soft sandstone lines, masked to a centered
            vignette so it reads as drafting paper, not pattern wallpaper. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(196,181,160,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(196,181,160,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse 65% 55% at 50% 50%, black 25%, transparent 95%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 65% 55% at 50% 50%, black 25%, transparent 95%)",
          }}
        />

        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-6 bg-sandstone/60" aria-hidden="true" />
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/55 font-medium">Start the Conversation</p>
              <span className="h-px w-6 bg-sandstone/60" aria-hidden="true" />
            </div>
            <h2 className="text-[32px] sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tight leading-[0.9] mb-5 sm:mb-6">Ready to Build?</h2>
            <p className="font-serif italic text-white/85 text-lg sm:text-2xl max-w-xl mx-auto mb-3">
              No pressure. No obligation. Honest answers.
            </p>
            <p className="text-white/55 text-base leading-relaxed mb-10 max-w-md mx-auto">
              Tell us about your project and we&apos;ll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
              <Link href="/get-quote" className="group inline-flex items-center justify-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-sandstone transition-colors">
                Get a Free Quote <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 text-white/60 hover:text-white px-5 py-3.5 text-sm tracking-wide transition-colors border border-white/15 rounded-full hover:border-sandstone/50">
                <Phone aria-hidden="true" className="w-3.5 h-3.5" /> Contact Us
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Registration-mark footer stamp — a quiet print-shop signature.
            Architectural punctuation that closes the page. */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-sandstone/50 font-medium">
          <span className="h-px w-10 bg-sandstone/30" aria-hidden="true" />
          <span>PCND · Calgary · Est. 1968</span>
          <span className="h-px w-10 bg-sandstone/30" aria-hidden="true" />
        </div>
      </section>
    </div>
  );
}
