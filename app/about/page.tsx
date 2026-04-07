"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BRAND_CONFIG } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { VideoHero } from "@/components/VideoHero";
import { Star, ArrowRight, Phone } from "lucide-react";

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

  return (
    <div className="flex flex-col">

      {/* ━━━ HERO ━━━ */}
      <section className="relative w-full min-h-[300px] sm:min-h-[400px] max-h-[600px] overflow-hidden bg-black">
        <div className="relative w-full aspect-video max-h-[600px]">
          <VideoHero videoId="cfd853ff56a468be1c91e78ce77db01f" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
          <div className="absolute inset-0 flex items-end pb-12 sm:pb-16 z-10">
            <div className="container mx-auto px-6 max-w-7xl">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">About PCND</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight leading-[0.9]">
                Three Generations<br />of Excellence
              </h1>
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
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-1">{s.val}</div>
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
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[0.95] mb-6">Built on Family Values</h2>
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
                <Image src="/about-hero.webp" alt="Precision Construction team" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white/80 text-sm font-display font-bold uppercase tracking-wider">&ldquo;{BRAND_CONFIG.motto}&rdquo;</p>
                  <p className="text-[10px] text-white/35 uppercase tracking-wider mt-1">— {BRAND_CONFIG.owner}, Owner</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ━━━ TIMELINE ━━━ */}
      <section className="py-20 sm:py-28 md:py-36 bg-[#0A0A0A]">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">Our Journey</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[0.95]">Milestones</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-white/[0.06]" />

            {[
              { year: "1968", title: "Founded", desc: "The Olivito family begins their construction journey, establishing a reputation for quality craftsmanship and honest work." },
              { year: "1997", title: "Calgary Roots", desc: "Expansion into the Calgary market, bringing decades of expertise to residential and commercial projects across the city." },
              { year: "Today", title: "3rd Generation", desc: `${BRAND_CONFIG.owner} leads PCND into its third generation — same family values, modern techniques, premium materials.` },
            ].map((m, idx) => (
              <Reveal key={m.year} delay={idx * 0.15}>
                <div className="relative">
                  {/* Dot */}
                  <div className="w-4 h-4 rounded-full bg-white border-4 border-[#0A0A0A] mb-6 relative z-10" />
                  <p className="text-2xl sm:text-3xl font-display font-black text-white mb-2">{m.year}</p>
                  <p className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">{m.title}</p>
                  <p className="text-white/35 text-sm leading-relaxed">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ HOW WE WORK ━━━ */}
      <section className="py-20 sm:py-28 md:py-36 bg-black">
        <div className="container mx-auto px-6 max-w-7xl">
          <Reveal>
            <div className="mb-14 sm:mb-20">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">Our Process</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[0.95]">How We Work</h2>
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
                  <span className="text-3xl font-display font-black text-white/10 block mb-4">{s.step}</span>
                  <h3 className="text-lg font-display font-bold uppercase tracking-tight text-white mb-3">{s.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ VALUES ━━━ */}
      <section className="py-20 sm:py-28 md:py-36 bg-[#0A0A0A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <Reveal>
              <div>
                <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">Our Mission</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[0.95] mb-6">What We Stand For</h2>
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
                ].map((v, idx) => (
                  <div key={v.title} className="border-l border-white/[0.08] pl-6">
                    <h3 className="text-base font-display font-bold uppercase tracking-tight text-white mb-1">{v.title}</h3>
                    <p className="text-white/35 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ━━━ TESTIMONIALS ━━━ */}
      <section className="py-20 sm:py-28 md:py-36 bg-black">
        <div className="container mx-auto px-6 max-w-7xl">
          <Reveal>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">Client Stories</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[0.95]">What Our Clients Say</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {[
              { name: "Emily Rodriguez", location: "Calgary", text: "The custom Murphy bed they built for our small space was perfect. Better quality and price than the big box stores, and John made sure we were completely satisfied.", project: "Custom Carpentry" },
              { name: "David Thompson", location: "SW Calgary", text: "Our basement development was completed on time and on budget. The team was professional, clean, and respectful of our home.", project: "Basement Development" },
              { name: "Lisa Anderson", location: "NE Calgary", text: "The steam shower installation was flawless. They handled all the permits, worked with our schedule, and the finished product is absolutely stunning.", project: "Bathroom Renovation" },
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
                    <p className="text-[11px] text-white/25 mt-0.5">{t.project} &middot; {t.location}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section className="py-24 sm:py-32 md:py-40 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }} />
        </div>
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <Reveal>
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/25 font-medium mb-5">Let&apos;s Talk</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight leading-[0.9] mb-6">Ready to Build?</h2>
            <p className="text-white/30 text-base sm:text-lg leading-relaxed mb-10 max-w-md mx-auto">
              Tell us about your project. We&apos;ll get back to you within 24 hours with a plan.
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
