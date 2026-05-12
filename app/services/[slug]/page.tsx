"use client";

/**
 * Service detail template (`/services/[slug]`) — Showroom + Studio canvas.
 * Hero / Trust band / Mid-CTA / Related services (photo cards) / Final CTA stay dark.
 * Overview, Scope, Benefits, Process, Materials, Testimonial, FAQ, Inquiry form
 * all flip to cream — this is the long-form sell where studio voice belongs.
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Input } from "@/components/ui/input";
import { getServiceById, services as allServices, getServiceCtaLabel } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { CheckCircle, ChevronDown, ArrowRight, Phone, Star, Shield, Clock, Award, Sparkles, Quote } from "lucide-react";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";

const serviceImageMap: Record<string, string> = {
  cabinets: "/cabinetsland.webp",
  showers: "/customshowerland.webp",
  countertops: "/countertopslandscape.webp",
  basements: "/basementland02.webp",
  carpentry: "/interiorfinishingland.webp",
  flooring: "/flooringinstalllandscape.webp",
  framing: "/framingland.webp",
  drywall: "/drywallland.webp",
  painting: "/paintingland.webp",
  garages: "/garage-deck-fence.webp",
  renovations: "/home-additions.webp",
  commercial: "/commercialland.webp",
};

const serviceTestimonials: Record<string, { name: string; text: string; project: string }> = {
  flooring: { name: "Priya S.", text: "We needed new flooring throughout our main floor and the quote came in well under the other companies we called. The LVP they sourced looks amazing and the install was super clean. No corners cut. Really happy with how it turned out.", project: "Main Floor LVP Installation" },
  showers: { name: "Ayla T.", text: "We had them do a full custom shower with a bench and niche in our ensuite. The tile work looks great — grout lines are nice and straight and the waterproofing was done properly. Took about a week and they kept everything clean the whole time.", project: "Custom Ensuite Shower" },
  countertops: { name: "Jas & Raman D.", text: "Got quartz countertops installed in our kitchen and the seams are basically invisible. They templated everything on-site and the fit was perfect around the sink and cooktop. Turnaround was faster than we expected too.", project: "Kitchen Quartz Countertops" },
  cabinets: { name: "Rachel K.", text: "John's crew built custom cabinets for our laundry room and pantry. The soft-close hardware and the finish quality are on par with the high-end stuff we priced out but couldn't afford. Really solid work.", project: "Custom Cabinetry Install" },
  carpentry: { name: "Connor M.", text: "Had them do all the interior trim and built-ins in our new home — baseboards, casings, crown moulding, and a built-in bookshelf. Everything is tight and level. You can tell they actually care about the details.", project: "Interior Trim & Built-Ins" },
  framing: { name: "Lukas N.", text: "They framed our garage suite addition and everything was plumb and square when the inspector came through. Passed on the first go. The crew worked fast but didn't cut corners — exactly what you want on a structural job.", project: "Garage Suite Framing" },
  drywall: { name: "Natasha P.", text: "We had a full basement drywalled and textured after our renovation. The ceiling texture matches the rest of the house well and you really can’t spot the seams on the walls. They even patched a couple spots upstairs while they were here.", project: "Basement Drywall & Texture" },
  painting: { name: "Wes & Aliya M.", text: "They painted our entire main floor and stairwell — walls and trim. The prep work was thorough, all the edges are crisp, and they used quality Benjamin Moore paint. Took three days and the place looked brand new after.", project: "Main Floor Interior Painting" },
  basements: { name: "Ahmed R.", text: "Had them finish our basement — full development from bare concrete to a liveable space with a bathroom, bedroom, and rec room. They handled the permits, passed every inspection first try, and the final result was way better than we expected for the price.", project: "Full Basement Development" },
  garages: { name: "Kenji L.", text: "Built us a detached double garage with a concrete pad and man door. The framing and siding match the house perfectly. They dealt with the city permits and the whole thing was done in under three weeks. No complaints at all.", project: "Detached Garage Build" },
  renovations: { name: "Mark & Teresa W.", text: "John and his crew completely gutted and rebuilt our kitchen. Took about three weeks and they were here every single day. The tile work and cabinet install were as good as anything we’d seen — you can tell these guys have been doing this a long time. Would absolutely hire them again.", project: "Full Kitchen Renovation" },
  commercial: { name: "Hakeem A.", text: "We hired them for a tenant improvement on a retail unit — new walls, ceiling grid, flooring, and paint. They worked around our schedule, kept the neighbouring units undisturbed, and finished on time. Professional from start to finish.", project: "Commercial Tenant Improvement" },
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Inquiry Form — CREAM ─── */
function InquiryForm({ serviceName }: { serviceName: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/leads/service-materials-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceName, name: name || undefined, email: email.trim(), message: message.trim() }),
      });
      if (res.ok) { setSent(true); setName(""); setEmail(""); setMessage(""); }
    } catch { /* ignore */ } finally { setLoading(false); }
  };

  const fieldClass = "bg-bone-paper border-bone-hairline focus:border-sandstone-dark focus:ring-1 focus:ring-sandstone-dark/20 text-ink placeholder:text-ink-muted/60 rounded-md h-11 transition-colors";

  return (
    <Section variant="cream" padding="lg" containerClassName="container mx-auto px-6 max-w-2xl">
      <Reveal>
        <div className="text-center mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 cream-rule" />
            <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Have a Question?</p>
            <div className="h-px w-8 cream-rule-rtl" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-4 text-ink">Ask Us Anything</h2>
          <p className="font-serif italic text-ink-muted text-base sm:text-lg max-w-md mx-auto">
            Questions about materials, availability, or scope? We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        {sent ? (
          <div className="paper-card rounded-md p-8 text-center">
            <CheckCircle aria-hidden="true" className="h-10 w-10 text-sandstone-dark mx-auto mb-3" />
            <p className="text-ink font-bold uppercase tracking-wide">Message Received</p>
            <p className="text-ink-muted text-sm mt-1">We&apos;ll reply within 24 hours.</p>
          </div>
        ) : (
          <div className="paper-card rounded-md p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className={fieldClass} />
              <Input type="email" placeholder="Email *" required value={email} onChange={(e) => setEmail(e.target.value)} className={fieldClass} />
              <textarea
                placeholder="What would you like to know?"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="flex w-full rounded-md border border-bone-hairline bg-bone-paper px-4 py-3 text-base sm:text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-sandstone-dark min-h-[110px] resize-none transition-colors"
              />
              <button type="submit" disabled={loading} className="btn-ink w-full py-3 uppercase tracking-widest text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>
        )}
      </Reveal>
    </Section>
  );
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const service = getServiceById(params.slug);
  if (!service) return notFound();

  const image = serviceImageMap[service.id] || "/service-millwork.webp";
  const yearsExp = new Date().getFullYear() - BRAND_CONFIG.established;
  const testimonial = serviceTestimonials[service.id];
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
      <section className="relative w-full min-h-[620px] sm:min-h-[560px] md:min-h-[620px] md:h-[70vh] lg:h-[72vh] max-h-[780px] overflow-hidden bg-black">
        <Image src={image} alt={`${service.title} - professional Calgary construction services by PCND`} fill className="object-cover object-center" sizes="100vw" priority quality={85} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/95" />
        <div className="absolute inset-0 pointer-events-none opacity-50" style={{ background: "radial-gradient(ellipse at 30% 80%, rgba(196,181,160,0.18) 0%, rgba(0,0,0,0) 55%)" }} />
        <div className="absolute inset-0 flex items-end pb-10 sm:pb-14 md:pb-16 z-10">
          <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
            <Link href="/services" className="inline-flex items-center gap-2 text-[11px] sm:text-sm tracking-[0.15em] uppercase text-white/70 hover:text-sandstone transition-colors mb-4 sm:mb-5 font-medium">
              <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 rotate-180" /> All Services
            </Link>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-hero uppercase tracking-wide leading-[0.9] max-w-4xl mb-4 sm:mb-6">
              {service.title}
            </h1>
            <p className="text-white/70 text-[15px] sm:text-base md:text-lg max-w-2xl mb-6 sm:mb-8 leading-relaxed">
              {service.description}
            </p>
            <Link href={`/get-quote?service=${service.id}`} className="group inline-flex items-center justify-center gap-3 bg-white text-black px-9 py-4 rounded-full font-black text-base tracking-wide hover:bg-sandstone transition-colors shadow-[0_4px_24px_rgba(255,255,255,0.12)]">
              Get a Free Quote <ArrowRight aria-hidden="true" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━ TRUST BAND — DARK ━━━ */}
      <section className="bg-[#050505] border-y border-white/[0.04]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-8 sm:gap-x-10 gap-y-3 py-6 sm:py-7 text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white/65 font-medium">
            <span className="flex items-center gap-2">
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (<Star key={i} aria-hidden="true" className="w-3 h-3 fill-sandstone text-sandstone" />))}
              </span>
              <span>5.0 · Calgary&apos;s Trusted Builder</span>
            </span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/25" />
            <span className="flex items-center gap-1.5"><Shield aria-hidden="true" className="w-3.5 h-3.5 text-sandstone" /> Licensed &amp; Insured</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/25" />
            <span className="flex items-center gap-1.5"><Clock aria-hidden="true" className="w-3.5 h-3.5 text-sandstone" /> 24-Hour Response</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/25" />
            <span className="flex items-center gap-1.5"><Award aria-hidden="true" className="w-3.5 h-3.5 text-sandstone" /> 5% Price Beat</span>
          </div>
        </div>
      </section>

      {/* ━━━ OVERVIEW — CREAM ━━━ */}
      <Section variant="cream">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 sm:gap-12 lg:gap-20">
          <Reveal className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 cream-rule" />
              <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Overview</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.9] mb-4 text-ink">
              Built by Our Crews. <span className="text-sandstone-dark">Not Subcontracted.</span>
            </h2>
            <p className="font-serif italic text-ink text-[20px] sm:text-2xl leading-snug max-w-2xl mb-6">
              Every {service.title.toLowerCase()} project is handled by our own crews — not subcontracted.
            </p>
            <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl mb-10">
              One point of contact, fully accountable from quote to final walkthrough. Same standards, same handshake, every project.
            </p>

            {service.stats && service.stats.length > 0 && (
              <div className="grid grid-cols-3 gap-3 sm:gap-5 md:gap-6 mb-8 max-w-2xl">
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

              <div className="flex items-center gap-2 mb-5">
                <Sparkles aria-hidden="true" className="w-3.5 h-3.5 text-sandstone-dark" />
                <h3 className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-sandstone-dark">Free Estimate</h3>
              </div>

              <p className="text-ink text-lg font-heading font-bold uppercase tracking-tight leading-tight mb-5">
                Get a detailed quote within 24 hours.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center border-b border-bone-hairline pb-2.5">
                  <span className="text-ink-muted text-[13px]">Experience</span>
                  <span className="text-ink font-semibold text-sm">{yearsExp}+ years</span>
                </div>
                <div className="flex justify-between items-center border-b border-bone-hairline pb-2.5">
                  <span className="text-ink-muted text-[13px]">Service Area</span>
                  <span className="text-ink font-semibold text-sm">Calgary &amp; Area</span>
                </div>
                <div className="flex justify-between items-center border-b border-bone-hairline pb-2.5">
                  <span className="text-ink-muted text-[13px]">Response Time</span>
                  <span className="text-ink font-semibold text-sm">Within 24 hrs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-ink-muted text-[13px]">Price Match</span>
                  <span className="text-sandstone-dark font-semibold text-sm">5% Beat Guarantee</span>
                </div>
              </div>

              <Link href={`/get-quote?service=${service.id}`} className="btn-ink w-full mb-2.5">
                Get Free Quote <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="flex items-center justify-center gap-2 w-full text-ink-muted hover:text-sandstone-dark py-2.5 text-xs tracking-[0.15em] uppercase transition-colors">
                <Phone aria-hidden="true" className="w-3 h-3" /> Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ━━━ WHAT'S INCLUDED — CREAM ━━━ */}
      {service.details && service.details.length > 0 && (
        <Section variant="cream" topRule={false}>
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 cream-rule" />
              <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Scope</p>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-8 sm:mb-10 text-ink">What&apos;s Included</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
            {service.details.map((detail, idx) => (
              <Reveal key={detail} delay={idx * 0.03}>
                <div className="flex items-start gap-3 py-3 border-b border-bone-hairline">
                  <CheckCircle aria-hidden="true" className="w-4 h-4 text-sandstone-dark shrink-0 mt-0.5" />
                  <span className="text-ink-muted text-sm">{detail}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ━━━ BENEFITS — CREAM ━━━ */}
      {service.benefits && service.benefits.length > 0 && (
        <Section variant="cream" topRule={false}>
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 cream-rule" />
              <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Why Choose Us</p>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-3 text-ink">The PCND Advantage</h2>
            <div className="h-[1.5px] w-16 cream-rule mb-10" />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {service.benefits.map((benefit, idx) => (
              <Reveal key={benefit} delay={idx * 0.05}>
                <div className="group flex items-start gap-4 paper-card rounded-md p-5">
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

      {/* ━━━ PROCESS — CREAM ━━━ */}
      {service.process && service.process.length > 0 && (
        <Section variant="cream" topRule={false}>
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 cream-rule" />
              <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">How It Works</p>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-8 sm:mb-10 text-ink">Our Process</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <Reveal key={step.title} delay={idx * 0.1}>
                <div className="paper-card rounded-md p-6 sm:p-7 h-full">
                  <span className="font-serif text-5xl text-sandstone-dark block mb-3 sm:mb-4 leading-none">{String(step.step).padStart(2, "0")}</span>
                  <h3 className="text-base font-heading font-bold uppercase tracking-tight text-ink mb-2">{step.title}</h3>
                  <p className="text-ink-muted text-sm leading-relaxed">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ━━━ MID-PAGE CTA — DARK ━━━ */}
      <section className="py-14 sm:py-20 bg-[#0A0A0A] border-y border-sandstone/15 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: "radial-gradient(ellipse at center, rgba(196,181,160,0.12) 0%, rgba(0,0,0,0) 60%)" }} />
        <div className="container mx-auto px-6 max-w-5xl relative">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-sandstone/10 border border-sandstone/30 px-3 py-1 rounded-full mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-sandstone animate-pulse" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sandstone">Booking Now</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-white mb-2 leading-tight">Ready to Get Started?</h3>
                <p className="text-white/50 text-sm sm:text-base max-w-lg mx-auto md:mx-0">Free estimate in under 24 hours. No obligation, no pressure — just a detailed quote and a crew that shows up.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:shrink-0">
                <Link href={`/get-quote?service=${service.id}`} className="group inline-flex items-center justify-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-sandstone transition-colors">
                  Get a Free Quote <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-sandstone px-5 py-3.5 text-sm tracking-wide transition-colors border border-white/15 rounded-full hover:border-sandstone/50">
                  <Phone aria-hidden="true" className="w-3.5 h-3.5" /> Contact
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━ MATERIALS — CREAM ━━━ */}
      {service.materials && service.materials.length > 0 && (
        <Section variant="cream">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 cream-rule" />
              <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Options</p>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-8 sm:mb-10 text-ink">Materials &amp; Options</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {service.materials.map((mat) => (
                <span key={mat} className="bg-bone-paper border border-bone-hairline text-ink-muted text-sm px-4 py-2 rounded-full">{mat}</span>
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      {/* ━━━ TESTIMONIAL — CREAM ━━━ */}
      {testimonial && (
        <Section variant="cream" topRule={false} containerClassName="container mx-auto px-6 max-w-3xl">
          <Reveal>
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8 cream-rule" />
                <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Client Feedback</p>
                <div className="h-px w-8 cream-rule-rtl" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight leading-[0.95] mb-4 text-ink">What Our Clients Say</h2>
              <div className="flex items-center justify-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (<Star key={i} aria-hidden="true" className="w-3.5 h-3.5 fill-sandstone-dark text-sandstone-dark" />))}
                </div>
                <span className="text-[11px] text-sandstone-muted font-medium tracking-wide">5.0 · Verified Client</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative paper-card rounded-md p-6 sm:p-10 md:p-12 max-w-2xl mx-auto overflow-hidden">
              <Quote className="absolute top-5 right-5 w-10 h-10 text-sandstone/30" strokeWidth={1.5} aria-hidden />
              <span className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t border-l border-sandstone-dark/40" />
              <span className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t border-r border-sandstone-dark/40" />
              <span className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b border-l border-sandstone-dark/40" />
              <span className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b border-r border-sandstone-dark/40" />

              <div className="relative">
                <div className="flex gap-0.5 mb-6">
                  {[...Array(5)].map((_, i) => (<Star key={i} aria-hidden="true" className="w-4 h-4 fill-sandstone-dark text-sandstone-dark" />))}
                </div>
                <p className="font-serif italic text-ink text-base sm:text-lg leading-relaxed mb-7">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center justify-between gap-4 pt-5 border-t border-bone-hairline">
                  <div>
                    <p className="font-semibold text-ink text-sm tracking-wide">{testimonial.name} <span className="text-ink-muted font-normal">· Calgary</span></p>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-sandstone-muted mt-1 font-medium">{testimonial.project}</p>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1.5 bg-bone-soft border border-sandstone-dark/40 text-sandstone-dark text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full">
                    <CheckCircle aria-hidden="true" className="w-3 h-3" /> Verified
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </Section>
      )}

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
                  >
                    <span className="text-ink text-sm font-medium pr-4">{faq.question}</span>
                    <ChevronDown aria-hidden="true" className={`w-4 h-4 text-sandstone-dark shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-4">
                      <p className="text-ink-muted text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
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
                    ctaLabel={getServiceCtaLabel(related!.id)}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ━━━ TRUST STRIP — DARK ━━━ */}
      <section className="bg-[#0A0A0A] border-y border-white/[0.04]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-2 py-5 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-white/55 font-medium">
            <span>Licensed &amp; Insured</span>
            <span className="w-1 h-1 rounded-full bg-white/15" />
            <span>5,000+ Projects</span>
            <span className="w-1 h-1 rounded-full bg-white/15" />
            <span>{yearsExp}+ Years Experience</span>
            <span className="w-1 h-1 rounded-full bg-white/15" />
            <span>5% Price Beat Guarantee</span>
          </div>
        </div>
      </section>

      {/* ━━━ INQUIRY FORM — CREAM ━━━ */}
      <InquiryForm serviceName={service.title} />

      {/* ━━━ FINAL CTA — DARK ━━━ */}
      <section className="py-16 sm:py-24 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }} />
        </div>
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.9] mb-6">Get Started Today</h2>
            <p className="text-white/55 text-base leading-relaxed mb-10 max-w-md mx-auto">
              Free consultation. No obligation. {yearsExp}+ years of experience behind every project.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link href={`/get-quote?service=${service.id}`} className="group inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-white/90 transition-colors">
                Get a Free Quote <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-white/55 hover:text-white px-5 py-3.5 text-sm tracking-wide transition-colors border border-white/10 rounded-full hover:border-white/30">
                <Phone aria-hidden="true" className="w-3.5 h-3.5" /> Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━ STICKY MOBILE CTA ━━━ */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-black/90 backdrop-blur-md border-t border-sandstone/20 px-4 py-3 flex gap-2 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <Link href={`/get-quote?service=${service.id}`} className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-3 rounded-full font-bold text-[13px] tracking-wide">
          Free Quote <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
        </Link>
        <a href={`tel:${BRAND_CONFIG.contact.phone}`} aria-label={`Call ${BRAND_CONFIG.contact.phoneFormatted}`} className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sandstone/15 border border-sandstone/40 text-sandstone">
          <Phone aria-hidden="true" className="w-4 h-4" />
        </a>
      </div>
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
