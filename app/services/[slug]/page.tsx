"use client";

/**
 * Service detail template (`/services/[slug]`) — Showroom + Studio canvas.
 *
 * Conversion-first layout with a deliberate dark/cream rhythm (no long beige
 * runs): Hero(dark) → Overview + sticky quote rail(cream) → Scope & Materials
 * (cream) → Process timeline(dark) → PCND Advantage(cream) → Testimonial(cream)
 * → Mid-CTA(dark) → FAQ(cream) → Related(dark) → Consultation(cream).
 *
 * The active Spring Build promo (15% off, auto-expires June 30 via lib/promo)
 * is surfaced in the hero ribbon, the sticky quote rail, and the mid-page CTA —
 * the campaign now lives where buying intent is highest.
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getServiceById, services as allServices } from "@/lib/services";
import { getActivePromo } from "@/lib/promo";
import { getServiceTestimonial } from "@/lib/serviceTestimonials";
import { BRAND_CONFIG } from "@/lib/utils";
import { CheckCircle, ChevronDown, ArrowRight, Phone, Star, Shield, Clock, Award, Sparkles, Layers } from "lucide-react";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { BookConsultationCTA } from "@/components/BookConsultationCTA";

const serviceImageMap: Record<string, string> = {
  kitchens: "/kitchenshero.webp",
  bathrooms: "/bathroomshero.webp",
  basements: "/basementland02.webp",
  renovations: "/home-additions.webp",
  cabinets: "/cabinetsland.webp",
  showers: "/customshowerland.webp",
  countertops: "/countertopslandscape.webp",
  carpentry: "/interiorfinishingland.webp",
  flooring: "/flooringinstalllandscape.webp",
  framing: "/framingland.webp",
  drywall: "/drywallland.webp",
  painting: "/paintingland.webp",
  garages: "/garage-deck-fence.webp",
  commercial: "/commercialland.webp",
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

/* Small cream-canvas eyebrow: hairline + label. */
function CreamEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px w-10 cream-rule" />
      <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">{label}</p>
    </div>
  );
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const service = getServiceById(params.slug);
  if (!service) return notFound();

  const image = serviceImageMap[service.id] || "/service-millwork.webp";
  const yearsExp = new Date().getFullYear() - BRAND_CONFIG.established;
  const activePromo = getActivePromo();
  const testimonial = getServiceTestimonial(service.id);
  const serviceLower = service.title.toLowerCase();
  const relatedServiceData = (service.relatedServices || [])
    .map((id) => allServices.find((s) => s.id === id))
    .filter(Boolean)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pcnd.ca/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.pcnd.ca/services" },
          { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://www.pcnd.ca/services/${service.id}` },
        ],
      },
      ...(service.faqs && service.faqs.length > 0
        ? [{ "@type": "FAQPage", "mainEntity": service.faqs.map((faq) => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) }]
        : []),
      {
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": { "@type": "LocalBusiness", "name": BRAND_CONFIG.shortName },
        "areaServed": { "@type": "City", "name": "Calgary", "containedInPlace": { "@type": "AdministrativeArea", "name": "Alberta" } },
        "serviceType": service.title,
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ━━━ HERO — DARK ━━━ */}
      <section className="relative w-full min-h-[640px] sm:min-h-[580px] md:min-h-[640px] md:h-[74vh] lg:h-[78vh] max-h-[820px] overflow-hidden bg-black">
        <Image src={image} alt={`${service.title} - professional Calgary construction services by PCND`} fill className="object-cover object-center" sizes="100vw" priority quality={85} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/95" />
        <div className="absolute inset-0 pointer-events-none opacity-50" style={{ background: "radial-gradient(ellipse at 25% 85%, rgba(196,181,160,0.20) 0%, rgba(0,0,0,0) 55%)" }} />
        {/* sandstone hairline top + bottom for editorial closure */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sandstone/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end pb-9 sm:pb-12 md:pb-14 z-10">
          <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
            <div className="mb-6 sm:mb-8 inline-flex max-w-full flex-row flex-wrap items-center gap-x-3 gap-y-2 rounded-md border border-white/15 bg-black/45 px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-md sm:gap-6 sm:bg-black/35 sm:px-3.5 sm:py-2.5">
              <Link href="/services" className="inline-flex shrink-0 items-center gap-2 text-[11px] sm:text-sm tracking-[0.15em] uppercase text-white/85 hover:text-sandstone transition-colors font-medium">
                <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 rotate-180" /> All Services
              </Link>

              {activePromo && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                  className="inline-flex max-w-full shrink-0 items-center gap-2 text-sandstone sm:gap-2.5 sm:bg-sandstone/15 sm:border sm:border-sandstone/40 sm:backdrop-blur-sm sm:px-3.5 sm:py-1.5 sm:rounded-full"
                >
                  <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-sandstone animate-pulse" aria-hidden="true" />
                  <span className="sm:hidden text-[10px] font-semibold uppercase tracking-[0.14em] leading-none whitespace-nowrap">
                    15% Off · Jun 30
                  </span>
                  <span className="hidden sm:inline text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] leading-relaxed text-sandstone">
                    {activePromo.label} · 15% Off through {activePromo.endsAtDisplay}
                  </span>
                </motion.div>
              )}
            </div>

            <h1 className="text-[42px] leading-[0.9] sm:text-5xl md:text-7xl lg:text-8xl font-hero uppercase tracking-wide max-w-4xl mb-4 sm:mb-5 hero-heading-shimmer">
              {service.title}
            </h1>
            <p className="text-white/70 text-[15px] sm:text-base md:text-lg max-w-2xl mb-7 sm:mb-8 leading-relaxed">
              {service.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-8">
              <Link href={`/get-quote?service=${service.id}`} className="group inline-flex items-center justify-center gap-3 bg-white text-black px-8 sm:px-9 py-4 rounded-full font-black text-base tracking-wide hover:bg-sandstone transition-colors shadow-[0_4px_24px_rgba(255,255,255,0.12)]">
                Get a Free Quote <ArrowRight aria-hidden="true" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="inline-flex items-center justify-center gap-2 text-white/85 hover:text-white px-5 py-3.5 text-sm font-semibold tracking-wide transition-colors border border-white/20 rounded-full hover:border-sandstone/60">
                <Phone aria-hidden="true" className="w-4 h-4" /> {BRAND_CONFIG.contact.phoneFormatted}
              </a>
            </div>

            {/* Inline trust micro-row — replaces the standalone trust band */}
            <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-2 text-[11px] sm:text-xs uppercase tracking-[0.14em] text-white/65 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="flex gap-0.5">{[...Array(5)].map((_, i) => (<Star key={i} aria-hidden="true" className="w-3 h-3 fill-sandstone text-sandstone" />))}</span>
                5.0 Rated
              </span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/25" />
              <span className="flex items-center gap-1.5"><Shield aria-hidden="true" className="w-3.5 h-3.5 text-sandstone" /> Licensed &amp; Insured</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/25" />
              <span className="flex items-center gap-1.5"><Clock aria-hidden="true" className="w-3.5 h-3.5 text-sandstone" /> 24-Hour Response</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/25" />
              <span className="flex items-center gap-1.5"><Award aria-hidden="true" className="w-3.5 h-3.5 text-sandstone" /> 5% Price Beat</span>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ OVERVIEW + STICKY QUOTE RAIL — CREAM ━━━ */}
      <Section variant="cream">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 sm:gap-12 lg:gap-20">
          <Reveal className="lg:col-span-3">
            <CreamEyebrow label="Overview" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.9] mb-5 text-ink">
              Your {service.title}, <span className="text-sandstone-dark">Done Once. Done Right.</span>
            </h2>
            <p className="font-serif italic text-ink text-[20px] sm:text-2xl leading-snug max-w-2xl mb-6">
              {service.description}
            </p>
            <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl mb-9">
              Every {serviceLower} project is handled by our own crews — never subcontracted. One point of contact, fully accountable from the first quote to the final walkthrough. Same standards, same handshake, every time.
            </p>

            {service.stats && service.stats.length > 0 && (
              <div className="grid grid-cols-3 gap-3 sm:gap-5 md:gap-6 mb-9 max-w-2xl">
                {service.stats.map((stat) => (
                  <div key={stat.label} className="relative border-l-2 border-sandstone-dark pl-3 sm:pl-4 md:pl-5">
                    <p className="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-ink leading-none tracking-wide mb-1.5">{stat.value}</p>
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.15em] text-sandstone-muted font-medium leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 max-w-2xl">
              {[
                { icon: CheckCircle, label: "Free On-Site Consult" },
                { icon: Shield, label: "Supply & Install" },
                { icon: Award, label: "Workmanship Warranty" },
              ].map((chip) => (
                <span key={chip.label} className="inline-flex items-center gap-2 bg-bone-paper border border-bone-hairline hover:border-sandstone-dark text-ink text-xs font-medium tracking-wide px-3.5 py-2 rounded-full transition-colors">
                  <chip.icon aria-hidden="true" className="w-3.5 h-3.5 text-sandstone-dark" /> {chip.label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="paper-card rounded-md p-6 sm:p-7 lg:sticky lg:top-24 relative overflow-hidden">
              <span className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t border-l border-sandstone-dark/50" />
              <span className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t border-r border-sandstone-dark/50" />
              <span className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b border-l border-sandstone-dark/50" />
              <span className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b border-r border-sandstone-dark/50" />

              <div className="flex items-center gap-2 mb-4">
                <Sparkles aria-hidden="true" className="w-3.5 h-3.5 text-sandstone-dark" />
                <h3 className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-sandstone-dark">Free Estimate</h3>
              </div>

              {activePromo ? (
                <div className="mb-5">
                  <p className="font-hero text-ink text-5xl sm:text-6xl leading-[0.85] tracking-wide mb-1">15% OFF</p>
                  <p className="text-ink-muted text-sm leading-snug">
                    {activePromo.label} pricing on your {serviceLower} quote — through {activePromo.endsAtDisplay}.
                  </p>
                </div>
              ) : (
                <p className="text-ink text-lg font-heading font-bold uppercase tracking-tight leading-tight mb-5">
                  Get a detailed quote within 24 hours.
                </p>
              )}

              <div className="space-y-3 mb-6">
                {[
                  { label: "Experience", value: `${yearsExp}+ years` },
                  { label: "Service Area", value: "Calgary & Area" },
                  { label: "Response Time", value: "Within 24 hrs" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center border-b border-bone-hairline pb-2.5">
                    <span className="text-ink-muted text-[13px]">{row.label}</span>
                    <span className="text-ink font-semibold text-sm">{row.value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <span className="text-ink-muted text-[13px]">Price Match</span>
                  <span className="text-sandstone-dark font-semibold text-sm">5% Beat Guarantee</span>
                </div>
              </div>

              <Link href={`/get-quote?service=${service.id}`} className="btn-ink w-full mb-2.5">
                {activePromo ? "Claim 15% Off" : "Get Free Quote"} <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
              <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="flex items-center justify-center gap-2 w-full text-ink-muted hover:text-sandstone-dark py-2.5 text-xs tracking-[0.15em] uppercase transition-colors">
                <Phone aria-hidden="true" className="w-3 h-3" /> {BRAND_CONFIG.contact.phoneFormatted}
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ━━━ SCOPE & MATERIALS — CREAM ━━━ */}
      {((service.details && service.details.length > 0) || (service.materials && service.materials.length > 0)) && (
        <Section variant="cream" topRule={false}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {service.details && service.details.length > 0 && (
              <div>
                <Reveal>
                  <CreamEyebrow label="Scope" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-7 sm:mb-9 text-ink">What&apos;s Included</h2>
                </Reveal>
                <div className="grid grid-cols-1 gap-y-1">
                  {service.details.map((detail, idx) => (
                    <Reveal key={detail} delay={idx * 0.03}>
                      <div className="flex items-start gap-3 py-3 border-b border-bone-hairline">
                        <CheckCircle aria-hidden="true" className="w-4 h-4 text-sandstone-dark shrink-0 mt-0.5" />
                        <span className="text-ink-muted text-sm">{detail}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {service.materials && service.materials.length > 0 && (
              <div>
                <Reveal>
                  <CreamEyebrow label="Materials" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-7 sm:mb-9 text-ink">Materials &amp; Finishes</h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="flex flex-wrap gap-2.5">
                    {service.materials.map((mat) => (
                      <span key={mat} className="inline-flex items-center gap-1.5 bg-bone-paper border border-bone-hairline text-ink-muted text-sm px-4 py-2 rounded-full">
                        <Layers aria-hidden="true" className="w-3 h-3 text-sandstone-dark/70" /> {mat}
                      </span>
                    ))}
                  </div>
                  <p className="text-ink-muted/80 text-[13px] italic mt-5 max-w-md">
                    Direct supplier relationships mean premium materials at fair pricing — and we&apos;ll happily install anything you&apos;ve already sourced.
                  </p>
                </Reveal>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ━━━ PROCESS — DARK (rhythm break: connected timeline) ━━━ */}
      {service.process && service.process.length > 0 && (
        <section className="py-16 sm:py-20 md:py-28 bg-[#0A0A0A] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: "radial-gradient(ellipse at 70% 0%, rgba(196,181,160,0.10) 0%, rgba(0,0,0,0) 55%)" }} />
          <div className="container mx-auto px-6 max-w-7xl relative">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-sandstone/50" />
                <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-sandstone/80 font-medium">How It Works</p>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-10 sm:mb-14 text-white">From Quote to Walkthrough</h2>
            </Reveal>
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {/* connecting line on desktop */}
              <div className="hidden lg:block absolute top-[26px] left-[12%] right-[12%] h-px bg-gradient-to-r from-sandstone/0 via-sandstone/40 to-sandstone/0" aria-hidden="true" />
              {service.process.map((step, idx) => (
                <Reveal key={step.title} delay={idx * 0.1}>
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-5">
                      <span className="relative z-10 flex items-center justify-center w-12 h-12 shrink-0 rounded-full bg-[#0A0A0A] border border-sandstone/40 font-hero text-2xl text-sandstone tracking-wide">
                        {String(step.step).padStart(2, "0")}
                      </span>
                      <div className="h-px flex-1 bg-white/10 lg:hidden" />
                    </div>
                    <h3 className="text-base font-heading font-bold uppercase tracking-tight text-white mb-2">{step.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ━━━ THE PCND ADVANTAGE — CREAM ━━━ */}
      {service.benefits && service.benefits.length > 0 && (
        <Section variant="cream">
          <Reveal>
            <CreamEyebrow label="Why Choose Us" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-3 text-ink">The PCND Advantage</h2>
            <div className="h-[1.5px] w-16 cream-rule mb-10" />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {service.benefits.map((benefit, idx) => (
              <Reveal key={benefit} delay={idx * 0.05}>
                <div className="group flex items-start gap-4 paper-card rounded-md p-5 h-full">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-bone-soft border border-sandstone-dark flex items-center justify-center">
                    <CheckCircle aria-hidden="true" className="w-4 h-4 text-sandstone-dark" />
                  </div>
                  <span className="text-ink text-[15px] leading-relaxed pt-1">{benefit}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ━━━ TESTIMONIAL — CREAM (social proof) ━━━ */}
      <Section variant="cream" topRule={false} containerClassName="container mx-auto px-6 max-w-3xl">
        <Reveal>
          <div className="text-center mb-9">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 cream-rule" />
              <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Client Feedback</p>
              <div className="h-px w-8 cream-rule-rtl" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight leading-[0.95] text-ink">What Our Clients Say</h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <TestimonialCard name={testimonial.name} text={testimonial.text} project={testimonial.project} year={testimonial.year} />
        </Reveal>
      </Section>

      {/* ━━━ MID-PAGE CTA — DARK ━━━ */}
      <section className="py-14 sm:py-20 bg-black border-y border-sandstone/15 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: "radial-gradient(ellipse at center, rgba(196,181,160,0.12) 0%, rgba(0,0,0,0) 60%)" }} />
        <div className="container mx-auto px-6 max-w-5xl relative">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-sandstone/10 border border-sandstone/30 px-3 py-1 rounded-full mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-sandstone animate-pulse" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sandstone">
                    {activePromo ? `15% Off · Ends ${activePromo.endsAtDisplay}` : "Booking Now"}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-white mb-2 leading-tight">Ready to Start Your {service.title}?</h3>
                <p className="text-white/50 text-sm sm:text-base max-w-lg mx-auto md:mx-0">Free estimate in under 24 hours. No obligation, no pressure — just a detailed quote and a crew that shows up.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:shrink-0">
                <Link href={`/get-quote?service=${service.id}`} className="group inline-flex items-center justify-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-sandstone transition-colors">
                  Get a Free Quote <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-sandstone px-5 py-3.5 text-sm tracking-wide transition-colors border border-white/15 rounded-full hover:border-sandstone/50">
                  <Phone aria-hidden="true" className="w-3.5 h-3.5" /> Call Now
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━ FAQS — CREAM ━━━ */}
      {service.faqs && service.faqs.length > 0 && (
        <Section variant="cream" topRule={false} containerClassName="container mx-auto px-6 max-w-3xl">
          <Reveal>
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8 cream-rule" />
                <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">FAQ</p>
                <div className="h-px w-8 cream-rule-rtl" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight leading-[0.95] text-ink">Common Questions</h2>
            </div>
          </Reveal>
          <div className="space-y-2">
            {service.faqs.map((faq, idx) => (
              <Reveal key={faq.question} delay={idx * 0.05}>
                <div className="border border-bone-hairline rounded-md overflow-hidden bg-bone-paper">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-bone-soft/50 transition-colors"
                    aria-expanded={openFaq === idx}
                  >
                    <span className="text-ink text-sm font-medium pr-4">{faq.question}</span>
                    <ChevronDown aria-hidden="true" className={`w-4 h-4 text-sandstone-dark shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ease-out ${openFaq === idx ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-4 text-ink-muted text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ━━━ RELATED SERVICES — DARK ━━━ */}
      {relatedServiceData.length > 0 && (
        <section className="py-14 sm:py-20 md:py-28 bg-[#0A0A0A]">
          <div className="container mx-auto px-6 max-w-7xl">
            <Reveal>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <div>
                  <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/55 font-medium mb-4">Explore More</p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight leading-[0.95]">Related Services</h2>
                </div>
                <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors group shrink-0">
                  View All <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {relatedServiceData.map((related, idx) => (
                <Reveal key={related!.id} delay={idx * 0.07}>
                  <ServiceCard
                    href={`/services/${related!.id}`}
                    title={related!.title}
                    image={serviceImageMap[related!.id] || "/service-millwork.webp"}
                    alt={`${related!.title} services in Calgary by PCND`}
                    featuredBadge={activePromo ? "15% Off" : undefined}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ━━━ BOOK CONSULTATION — CREAM (final close) ━━━ */}
      <BookConsultationCTA
        serviceId={service.id}
        eyebrow={`Considering ${service.title}?`}
        headline="Let's Walk Your Space"
      />

      {/* ━━━ STICKY MOBILE CTA ━━━ */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-black/90 backdrop-blur-md border-t border-sandstone/20 px-4 py-3 flex gap-2 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <Link href={`/get-quote?service=${service.id}`} className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-3 rounded-full font-bold text-[13px] tracking-wide">
          {activePromo ? "Claim 15% Off" : "Free Quote"} <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
        </Link>
        <a href={`tel:${BRAND_CONFIG.contact.phone}`} aria-label={`Call ${BRAND_CONFIG.contact.phoneFormatted}`} className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sandstone/15 border border-sandstone/40 text-sandstone">
          <Phone aria-hidden="true" className="w-4 h-4" />
        </a>
      </div>
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
