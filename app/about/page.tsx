"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BRAND_CONFIG } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { VideoHero } from "@/components/VideoHero";
import { Star, ArrowRight, Phone, Mail, CheckCircle2, Shield, Award } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SpotlightCard } from "@/components/SpotlightCard";

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

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const yearsInCalgary = new Date().getFullYear() - BRAND_CONFIG.servingSince;
  const totalYears = new Date().getFullYear() - BRAND_CONFIG.established;

  const milestones = [
    { year: "1968", title: "Founded", desc: "The Olivito family begins their construction journey, establishing a reputation for quality craftsmanship and honest work.", side: "left" as const },
    { year: "1997", title: "Calgary Roots", desc: "Expansion into the Calgary market, bringing decades of expertise to residential and commercial projects across the city.", side: "right" as const },
    { year: "2010", title: "Growing Legacy", desc: "The next generation begins working alongside the family, learning the craft and continuing the tradition of excellence.", side: "left" as const },
    { year: "Today", title: "3rd Generation", desc: `${BRAND_CONFIG.owner} leads PCND into its third generation — same family values, modern techniques, premium materials.`, side: "right" as const },
  ];

  return (
    <div className="flex flex-col">

      {/* ━━━ HERO ━━━ */}
      <section className="relative w-full min-h-[560px] h-[70vh] max-h-[780px] overflow-hidden bg-black">
        <div className="absolute inset-0">
          <VideoHero videoId="cfd853ff56a468be1c91e78ce77db01f" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/95" />
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{ background: "radial-gradient(ellipse at 25% 80%, rgba(196,181,160,0.18) 0%, rgba(0,0,0,0) 55%)" }}
          />
        </div>
        <div className="absolute inset-0 flex items-end pb-12 sm:pb-16 z-10">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-sandstone/60" />
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-sandstone/80 font-medium">About PCND</p>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-hero uppercase tracking-wide leading-[0.9] mb-6 max-w-4xl">
              Three Generations<br />of Excellence
            </h1>

            <p className="text-white/70 text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
              One family, one standard — {totalYears}+ years of building homes across Calgary the way we&apos;d build our own.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-start mb-6">
              <Link
                href="/services"
                className="group inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-sandstone transition-colors"
              >
                Explore Our Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white px-5 py-3.5 text-sm tracking-wide transition-colors border border-white/20 rounded-full hover:border-sandstone/60 backdrop-blur-sm"
              >
                <Phone className="w-3.5 h-3.5" /> Contact Us
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-white/60 font-medium">
              <span className="flex items-center gap-1.5"><Award className="w-3 h-3 text-sandstone" /> Family Owned Since 1968</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/25" />
              <span className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-sandstone" /> Licensed &amp; Insured</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/25" />
              <span className="flex items-center gap-1.5"><Star className="w-3 h-3 fill-sandstone text-sandstone" /> Calgary Based</span>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ STATS BAR ━━━ */}
      <section className="bg-[#0A0A0A] border-b border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {[
              { val: `${totalYears}+`, label: "Years in Business" },
              { val: `${yearsInCalgary}+`, label: "Years in Calgary" },
              { val: "5,000+", label: "Projects Completed" },
              { val: "3rd", label: "Generation" },
            ].map((s) => (
              <div key={s.label} className="text-center py-8 sm:py-10">
                <div className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white mb-1"><AnimatedCounter value={s.val} /></div>
                <div className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-white/25 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ OUR STORY ━━━ */}
      <section className="py-20 sm:py-28 md:py-36 bg-black">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <div>
                <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">Our Story</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-6">Built on Family Values</h2>
                <div className="space-y-5 text-white/50 text-base sm:text-lg leading-relaxed max-w-xl">
                  <p>
                    What began in 1968 as a small family operation has grown into one of Calgary&apos;s most trusted construction companies. Three generations of the Olivito family have upheld one unwavering standard: treat every client like family and deliver only the best.
                  </p>
                  <p>
                    Today, {BRAND_CONFIG.owner} carries forward that legacy — combining decades of hands-on experience with modern techniques and premium materials. We don&apos;t cut corners, we don&apos;t rush, and we don&apos;t leave until you&apos;re completely satisfied.
                  </p>
                  <p>
                    From kitchen renovations to full commercial builds, our reputation is built on the same foundation as our projects: quality that stands the test of time.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                <Image src="/img060802.png" alt="John Olivito overseeing a finished kitchen renovation with his crew" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white/80 text-base font-serif italic">&ldquo;{BRAND_CONFIG.motto}&rdquo;</p>
                  <p className="text-[10px] text-sandstone/40 uppercase tracking-wider mt-1">— {BRAND_CONFIG.owner}, Owner</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ━━━ MEET JOHN OLIVITO ━━━ */}
      <section className="py-20 sm:py-28 md:py-36 bg-[#0A0A0A]">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">The Owner</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95]">Meet {BRAND_CONFIG.owner}</h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <div>
                <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-2">Owner &amp; 3rd Generation Builder</p>
                <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-white mb-5">{BRAND_CONFIG.owner}</h3>
                <div className="space-y-4 text-white/45 text-base leading-relaxed max-w-lg mb-8">
                  <p>
                    John grew up on job sites, learning the craft from his father and grandfather. That hands-on upbringing shaped his approach to every project: show up, do it right, and don&apos;t leave until the client is happy.
                  </p>
                  <p>
                    As the third generation to lead the family business, John combines old-school craftsmanship with modern building science — delivering results that stand the test of time.
                  </p>
                </div>

                {/* Contact */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" /> {BRAND_CONFIG.contact.phoneFormatted}
                  </a>
                  <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" /> {BRAND_CONFIG.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Prominent quote */}
          <Reveal delay={0.2}>
            <div className="mt-16 sm:mt-20 text-center relative">
              <div className="text-6xl sm:text-8xl font-serif text-sandstone/[0.08] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 select-none">&ldquo;</div>
              <blockquote className="relative z-10 max-w-2xl mx-auto">
                <p className="text-xl sm:text-2xl md:text-3xl font-serif text-white/70 leading-snug italic">
                  &ldquo;We treat every client like family and deliver only the best. That&apos;s not a slogan — it&apos;s how we were raised.&rdquo;
                </p>
                <footer className="mt-5">
                  <p className="text-sm text-sandstone/40 font-medium">— {BRAND_CONFIG.owner}, Owner &amp; 3rd Generation Builder</p>
                </footer>
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━ TIMELINE ━━━ */}
      <section className="py-20 sm:py-28 md:py-36 bg-black">
        <div className="container mx-auto px-6 max-w-4xl">
          <Reveal>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">Our Journey</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95]">Milestones</h2>
            </div>
          </Reveal>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-sandstone/[0.12] md:-translate-x-px" />

            <div className="space-y-12 md:space-y-16">
              {milestones.map((m, idx) => (
                <Reveal key={m.year} delay={idx * 0.12}>
                  <div className={`relative flex items-start gap-6 md:gap-0 ${m.side === "right" ? "md:flex-row-reverse" : ""}`}>
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 top-1 w-3 h-3 rounded-full bg-sandstone border-4 border-black z-10 -translate-x-1.5 md:-translate-x-1.5" />

                    {/* Content */}
                    <div className={`pl-10 md:pl-0 md:w-1/2 ${m.side === "right" ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                      <p className="text-2xl sm:text-3xl font-heading font-black text-white mb-1">{m.year}</p>
                      <p className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">{m.title}</p>
                      <p className="text-white/35 text-sm leading-relaxed">{m.desc}</p>
                    </div>

                    {/* Spacer for other side */}
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ HOW WE WORK ━━━ */}
      <section className="py-20 sm:py-28 md:py-36 bg-[#0A0A0A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <Reveal>
            <div className="mb-14 sm:mb-20">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">Our Process</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95]">How We Work</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Consultation", desc: "We visit your space, listen to your vision, take measurements, and discuss your budget and timeline." },
              { step: "02", title: "Planning", desc: "Detailed project plan with material selections, scheduling, permits, and a transparent quote — no hidden costs." },
              { step: "03", title: "Construction", desc: "Our team executes with precision, keeping your space clean and communicating progress throughout." },
              { step: "04", title: "Completion", desc: "Final walkthrough with you. We don't leave until everything meets our standard — and yours." },
            ].map((s, idx) => (
              <Reveal key={s.step} delay={idx * 0.1}>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-7 h-full">
                  <span className="text-3xl font-heading font-black text-white/10 block mb-4">{s.step}</span>
                  <h3 className="text-lg font-heading font-bold uppercase tracking-tight text-white mb-3">{s.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ VALUES ━━━ */}
      <section className="py-20 sm:py-28 md:py-36 bg-black">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <Reveal>
              <div>
                <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">Our Mission</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-6">What We Stand For</h2>
                <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-lg">
                  We believe construction is about more than structures — it&apos;s about building trust, creating spaces where families thrive, and standing behind every nail, every joint, every finish.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="space-y-6">
                {[
                  { title: "Quality Without Compromise", desc: "Premium materials, expert craftsmanship, and attention to every detail — no shortcuts." },
                  { title: "Family Values", desc: "We treat every client the way we'd treat our own family. Your home matters to us." },
                  { title: "Honest Communication", desc: "Transparent pricing, realistic timelines, and proactive updates throughout your project." },
                  { title: "Complete Satisfaction", desc: "We don't consider a project done until you're completely happy with the result." },
                ].map((v) => (
                  <div key={v.title} className="border-l border-white/[0.08] pl-6">
                    <h3 className="text-base font-heading font-bold uppercase tracking-tight text-white mb-1">{v.title}</h3>
                    <p className="text-white/35 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                ))}
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
            {[
              { name: "Sarah & Micah K.", text: "John built a custom Murphy bed and shelving unit for our guest room. The quality blew us away — solid wood, soft-close hardware, and it fits the space like it was always meant to be there. Way better than anything we found at stores.", project: "Custom Carpentry", year: "2024" },
              { name: "Kaveh T.", text: "Had our entire basement done — bedroom, bathroom, rec room, the works. Crew showed up on time every day, kept the site clean, and the final walkthrough had zero punch list items. That never happens.", project: "Basement Development", year: "2023" },
              { name: "Nina P.", text: "We wanted a frameless glass steam shower and most companies wouldn't even quote it. John's team handled the whole thing — waterproofing, tile, glass, steam unit. Turned out incredible.", project: "Bathroom Renovation", year: "2024" },
            ].map((t, idx) => (
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

      {/* ━━━ CTA ━━━ */}
      <section className="py-24 sm:py-32 md:py-40 bg-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }} />
        </div>
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <Reveal>
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/25 font-medium mb-5">Let&apos;s Talk</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black uppercase tracking-tight leading-[0.9] mb-6">Ready to Build?</h2>
            <p className="text-white/30 text-base sm:text-lg leading-relaxed mb-10 max-w-md mx-auto">
              Tell us about your project. We&apos;ll get back to you within 24 hours with a plan.
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
