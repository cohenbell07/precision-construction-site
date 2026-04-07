"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { services } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { VideoHero } from "@/components/VideoHero";
import { ArrowRight, Star, Phone } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SpotlightCard } from "@/components/SpotlightCard";

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

  return (
    <div className="flex flex-col">

      {/* ━━━ HERO ━━━ */}
      <section ref={heroRef} className="relative w-full h-screen min-h-[550px] max-h-[1100px] overflow-hidden bg-black">
        <div className="absolute inset-0">
          <VideoHero videoId="9f32426787cbe2b26a14642463b7b817" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/85" />
        </div>

        <div className="hero-glow absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 z-[1]" />
        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="absolute inset-0 flex items-center z-10">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/70 font-medium mb-5"
            >
              3rd Generation &middot; Family Owned &middot; Since 1968
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-[clamp(2.5rem,8vw,7rem)] font-display font-black uppercase tracking-tight leading-[0.85] mb-8 max-w-5xl hero-heading-shimmer"
            >
              Calgary<br />Construction<br className="sm:hidden" /> &amp; Renovation
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3 items-start"
            >
              <Link href="/get-quote" className="group inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-white/90 transition-colors">
                Get a Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 text-white/50 hover:text-white px-5 py-3.5 text-sm tracking-wide transition-colors border border-white/15 rounded-full hover:border-white/40">
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

      {/* ━━━ STATS ━━━ */}
      <section className="bg-[#0A0A0A] border-b border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {[
              { val: "58+", label: "Years in Business" },
              { val: "5,000+", label: "Projects Completed" },
              { val: "3rd", label: "Generation Family" },
              { val: "5%", label: "Price Beat Guarantee" },
            ].map((s) => (
              <div key={s.label} className="text-center py-8 sm:py-10">
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-1"><AnimatedCounter value={s.val} /></div>
                <div className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-white/25 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ ABOUT ━━━ */}
      <section className="py-20 sm:py-28 md:py-36 bg-black">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-20 items-center">
            <Reveal className="lg:col-span-2">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                <Image src="/about-hero.webp" alt="Precision Construction and Decora - family-owned Calgary construction company since 1968" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white/80 text-sm font-display font-bold uppercase tracking-wider mb-0.5">&ldquo;Expect Only The Best&rdquo;</p>
                  <p className="text-[10px] text-white/35 uppercase tracking-wider">— {BRAND_CONFIG.owner}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="lg:col-span-3">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">About Our Legacy</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[0.95] mb-6">
                Three Generations<br />of Quality
              </h2>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                Since 1968, the Olivito family has built a reputation on one simple promise: treat every client like family and deliver only the best. Now in our third generation, that commitment hasn&apos;t wavered.
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-4 mb-10">
                {[
                  { val: "58+", label: "Years" },
                  { val: "5,000+", label: "Projects" },
                  { val: "3rd", label: "Generation" },
                ].map((s) => (
                  <div key={s.label}>
                    <span className="text-2xl sm:text-3xl font-display font-black text-white"><AnimatedCounter value={s.val} /></span>
                    <span className="text-xs text-white/25 uppercase tracking-wider ml-2">{s.label}</span>
                  </div>
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
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[0.95]">Our Services</h2>
              </div>
              <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-white transition-colors group shrink-0">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {featuredServices.map((service, idx) => (
              <Reveal key={service.id} delay={idx * 0.07}>
                <SpotlightCard className="rounded-xl">
                <Link href={`/services/${service.id}`} className="group block relative aspect-[4/3] rounded-xl overflow-hidden bg-[#111]">
                  <Image
                    src={serviceImages[service.id] || "/service-millwork.webp"}
                    alt={`${service.title} - Calgary construction services by PCND`}
                    fill
                    className={`${service.id === "showers" ? "object-contain" : "object-cover"} group-hover:scale-105 transition-transform duration-700`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <h3 className="text-base sm:text-lg font-display font-bold uppercase tracking-wide text-white leading-tight">{service.title}</h3>
                    <div className="shrink-0 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-3">
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </Link>
                </SpotlightCard>
              </Reveal>
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
              <div className="absolute top-4 left-4">
                <span className="inline-block bg-white/10 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/10">
                  15% Off — Limited Time
                </span>
              </div>
            </div>
          </Reveal>
          <div className="flex items-center px-8 sm:px-12 lg:px-16 xl:px-24 py-14 lg:py-20">
            <Reveal delay={0.15}>
              <div>
                <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">Featured</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[0.95] mb-6">Basement<br />Developments</h2>
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[0.95]">What Our Clients Say</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {[
              { name: "Mark & Teresa W.", text: "John and his crew completely gutted and rebuilt our kitchen. Took about three weeks and they were here every single day. The tile work and cabinet install were perfect — you can tell these guys have been doing this a long time. Would absolutely hire them again.", project: "Kitchen Renovation" },
              { name: "Dan R.", text: "Had them finish our basement — full development from bare concrete to a liveable space with a bathroom, bedroom, and rec room. They handled the permits, passed every inspection first try, and the final result was way better than we expected for the price.", project: "Basement Development" },
              { name: "Priya S.", text: "We needed new flooring throughout our main floor and the quote came in well under the other companies we called. The LVP they sourced looks amazing and the install was super clean. No corners cut. Really happy with how it turned out.", project: "Flooring Installation" },
            ].map((t, idx) => (
              <Reveal key={t.name} delay={idx * 0.1}>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-7 sm:p-8 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                    ))}
                  </div>
                  <p className="text-white/50 text-[15px] leading-relaxed flex-1 mb-6">&ldquo;{t.text}&rdquo;</p>
                  <div className="border-t border-white/[0.06] pt-5">
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-[11px] text-white/25 mt-0.5">{t.project}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ OFFERS ━━━ */}
      <section className="py-20 sm:py-28 md:py-36 bg-black">
        <div className="container mx-auto px-6 max-w-6xl">
          <Reveal>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">Current Offers</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[0.95]">Save on Your Next Build</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {[
              { tag: "Guarantee", title: "5% Price Beat", desc: "Send us any competitor's quote — we'll beat it by at least 5% on any service.", features: ["Any service we offer", "24-hour response", "No hidden fees"], cta: "Get a Quote", href: "/get-quote", featured: false },
              { tag: "Most Popular", title: "Bundle & Save", desc: "15% off when you combine two or more services.", features: ["Kitchen + bathroom reno", "Basement + flooring install", "Full home renovation"], cta: "Get 15% Off", href: "/get-quote/bundle", featured: true },
              { tag: "Limited Time", title: "Seasonal Specials", desc: "10% off select services — book now while availability lasts.", features: ["Painting & drywall", "Flooring installation", "Carpentry & trim work"], cta: "Get 10% Off", href: "/get-quote/supplier-deals", featured: false },
            ].map((offer, idx) => (
              <Reveal key={offer.title} delay={idx * 0.1}>
                <div className={`rounded-xl p-7 sm:p-8 h-full flex flex-col ${offer.featured ? "bg-white/[0.05] border border-white/[0.12]" : "bg-white/[0.02] border border-white/[0.06]"}`}>
                  <span className={`self-start text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-5 ${offer.featured ? "bg-white text-black" : "bg-white/[0.08] text-white/50"}`}>{offer.tag}</span>
                  <h3 className="text-xl font-display font-bold uppercase tracking-tight text-white mb-2">{offer.title}</h3>
                  <p className="text-sm text-white/35 leading-relaxed mb-6">{offer.desc}</p>
                  <ul className="space-y-2 mb-8 flex-1">
                    {offer.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-white/40">
                        <div className="w-1 h-1 rounded-full bg-white/30 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={offer.href}
                    className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold tracking-wide transition-colors duration-300 ${offer.featured ? "bg-white text-black hover:bg-white/90" : "border border-white/15 text-white/50 hover:border-white/40 hover:text-white"}`}
                  >
                    {offer.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ BRAND PARTNERS ━━━ */}
      <section className="py-12 sm:py-16 bg-[#0A0A0A] border-t border-white/[0.04]">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-center text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-white/70 font-medium mb-8">Trusted Brands We Work With</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 sm:gap-8 items-center">
            {[
              { name: "Olympia Tile", file: "olympiatile.webp" },
              { name: "Shaw Flooring", file: "shawfloors.webp" },
              { name: "Caesarstone", file: "ceasarstonenew.webp" },
              { name: "Benjamin Moore", file: "bejaminmoorenew.webp" },
              { name: "Silestone", file: "silestonenew.webp" },
              { name: "James Hardie", file: "jameshardie.webp" },
            ].map((brand) => (
              <div key={brand.name} className="relative h-9 sm:h-11 invert grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                <Image src={`/${brand.file}`} alt={brand.name} fill className="object-contain" sizes="(max-width: 640px) 33vw, 16vw" />
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
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/25 font-medium mb-5">Free Consultation</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight leading-[0.9] mb-6">Ready to Build?</h2>
            <p className="text-white/30 text-base sm:text-lg leading-relaxed mb-10 max-w-md mx-auto">
              No pressure, no obligation. Tell us about your project and we&apos;ll get back to you within 24 hours.
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
