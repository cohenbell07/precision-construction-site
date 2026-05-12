"use client";

/**
 * Homepage — "Showroom + Studio" two-canvas direction.
 * Dark sections (hero, trust bar, stats, services, basement promo, final CTA)
 * carry the showroom drama. Cream sections (about, brand partners marquee,
 * testimonials) carry the studio voice. See memory file
 * `project_showroom_studio_design.md` for the why.
 */

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { services } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { VideoHero } from "@/components/VideoHero";
import { ArrowRight, Star, Phone, Shield, CheckCircle2 } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import dynamic from "next/dynamic";

const LightRays = dynamic(() => import("@/components/LightRays").then((m) => ({ default: m.LightRays })), { ssr: false });
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

  return (
    <div className="flex flex-col">
      {/* ━━━ HERO — DARK ━━━ */}
      <section ref={heroRef} className="relative w-full h-[85vh] sm:h-screen min-h-[560px] max-h-[1100px] overflow-hidden bg-black">
        <div className="absolute inset-0">
          <VideoHero videoId="9f32426787cbe2b26a14642463b7b817" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/90 sm:from-black/50 sm:via-black/25 sm:to-black/85" />
          <div className="absolute inset-0 sm:hidden" style={{ background: "radial-gradient(ellipse at 30% 65%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%)" }} />
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="absolute inset-0 flex items-center z-10">
          <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 whitespace-nowrap">
              {["3rd Generation", "Family Owned", "Since 1968"].map((word, i) => (
                <motion.span key={word} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }} className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-xs tracking-[0.18em] sm:tracking-[0.3em] uppercase text-white/85 font-medium">
                  {word}
                  {i < 2 && <span className="text-sandstone/60">&middot;</span>}
                </motion.span>
              ))}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="text-[clamp(2.5rem,7.5vw,8rem)] font-hero uppercase tracking-wide leading-[0.95] mb-4 max-w-5xl hero-heading-shimmer">
              Your Home.<br />Our Legacy.
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }} className="text-white/75 sm:text-white/60 text-[15px] sm:text-lg max-w-xl mb-7 sm:mb-8 leading-relaxed">
              Your home deserves a builder who&apos;s been here since 1968. Three generations of quality craftsmanship — one family, one standard.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-start">
              <Link href="/get-quote" className="group inline-flex items-center justify-center gap-3 bg-white text-black px-9 py-4 rounded-full font-black text-base tracking-wide hover:bg-sandstone transition-colors shadow-[0_4px_24px_rgba(255,255,255,0.12)]">
                Get a Free Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors">
                Our Services →
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ━━━ TRUST BAR — DARK ━━━ */}
      <Section variant="dark" bg="bg-[#0A0A0A]" padding="none" containerClassName="container mx-auto px-6 max-w-6xl" className="border-b border-white/[0.06]">
        <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3 py-4 sm:py-5">
          {[
            { icon: Star, text: "Free Consultations", highlight: true },
            { icon: Shield, text: "Licensed & Insured" },
            { icon: null, text: "3rd Generation Builder" },
            { icon: null, text: "5% Price Beat Guarantee" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-white/60 font-medium">
              {item.icon && <item.icon className={`w-3.5 h-3.5 ${item.highlight ? "fill-white text-white" : "text-white/60"}`} />}
              {!item.icon && <div className="w-1 h-1 rounded-full bg-white/25 shrink-0" />}
              <span className={item.highlight ? "text-white/60" : ""}>{item.text}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ━━━ STATS — DARK ━━━ */}
      <Section variant="dark" bg="bg-[#0A0A0A]" padding="none" containerClassName="container mx-auto px-6 max-w-6xl" className="border-b border-white/[0.06]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
          {[
            { val: "58+", label: "Years in Business" },
            { val: "5,000+", label: "Projects Completed" },
            { val: "3rd", label: "Generation Family" },
            { val: "100%", label: "Satisfaction Promise" },
          ].map((s, idx) => (
            <Reveal key={s.label} delay={idx * 0.08}>
              <div className="text-center py-8 sm:py-10">
                <div className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white mb-1">
                  <AnimatedCounter value={s.val} />
                </div>
                <div className="text-[10px] sm:text-[10px] tracking-[0.15em] uppercase text-white/55 font-medium">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
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
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 cream-rule" />
              <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">About Our Legacy</p>
            </div>
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
                { val: "$0", label: "Hidden Fees" },
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
              Our Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ━━━ SERVICES — DARK ━━━ */}
      <Section variant="dark" bg="bg-[#0A0A0A]">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12 md:mb-16">
            <div>
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/55 font-medium mb-4">What We Do</p>
              <h2 className="text-[28px] sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95]">Our Services</h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors group shrink-0">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ━━━ BRAND PARTNERS MARQUEE — CREAM ━━━ */}
      <Section variant="cream" padding="md" withContainer={false} className="overflow-hidden">
        <div className="flex items-center justify-center gap-3 mb-7 px-6">
          <div className="h-px w-8 cream-rule" />
          <p className="cream-eyebrow text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-medium">Trusted Brands We Work With</p>
          <div className="h-px w-8 cream-rule-rtl" />
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bone to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bone to-transparent z-10" />
          <div className="flex marquee-track">
            {[...brands, ...brands, ...brands, ...brands].map((brand, i) => (
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
              <div className="absolute top-4 left-4">
                <span className="inline-block bg-white/10 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/10">
                  15% Off Basement Quotes
                </span>
              </div>
            </div>
          </Reveal>
          <div className="flex items-center px-5 sm:px-12 lg:px-16 xl:px-24 py-10 sm:py-14 lg:py-20">
            <Reveal delay={0.15}>
              <div>
                <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/55 font-medium mb-4">Featured</p>
                <h2 className="text-[28px] sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-5 sm:mb-6">Basement<br />Developments</h2>
                <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                  Turnkey development — framing, electrical, plumbing, drywall, flooring, and finishes. Permits handled. One team, start to finish.
                </p>
                <ul className="space-y-3 mb-10">
                  {["Full turnkey development", "Permits & inspections handled", "Moisture control included"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                      <div className="w-1 h-1 rounded-full bg-white/40 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                  <Link href="/services/basements" className="group inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-white/90 transition-colors">
                    See Basement Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
              <div className="h-px w-8 cream-rule" />
              <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Client Stories</p>
              <div className="h-px w-8 cream-rule-rtl" />
            </div>
            <h2 className="text-[30px] sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-5">
              What Our Clients Say
            </h2>
            <p className="font-serif italic text-lg sm:text-xl text-ink-muted max-w-xl mx-auto">
              Three generations of word-of-mouth, in their own words.
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
        <LightRays raysOrigin="top-center" raysColor="#C4B5A0" raysSpeed={0.4} lightSpread={1.2} rayLength={2.5} fadeDistance={1.2} saturation={0.6} followMouse={true} mouseInfluence={0.08} className="opacity-20" />
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <Reveal>
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/55 font-medium mb-5">Free Consultation</p>
            <h2 className="text-[32px] sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tight leading-[0.9] mb-5 sm:mb-6">Ready to Build?</h2>
            <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-10 max-w-md mx-auto">
              No pressure, no obligation. Tell us about your project and we&apos;ll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
              <Link href="/get-quote" className="group inline-flex items-center justify-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-sandstone transition-colors">
                Get a Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 text-white/60 hover:text-white px-5 py-3.5 text-sm tracking-wide transition-colors border border-white/15 rounded-full hover:border-sandstone/50">
                <Phone className="w-3.5 h-3.5" /> Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
