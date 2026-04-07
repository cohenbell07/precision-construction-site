"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Input } from "@/components/ui/input";
import { getServiceById, services as allServices } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { CheckCircle, ChevronDown, ArrowRight, Phone, Star } from "lucide-react";

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
  flooring: {
    name: "Priya S.",
    text: "We needed new flooring throughout our main floor and the quote came in well under the other companies we called. The LVP they sourced looks amazing and the install was super clean. No corners cut. Really happy with how it turned out.",
    project: "Main Floor LVP Installation",
  },
  showers: {
    name: "Angela T.",
    text: "We had them do a full custom shower with a bench and niche in our ensuite. The tile work is flawless — grout lines are perfectly straight and the waterproofing was done right. Took about a week and they kept everything clean the whole time.",
    project: "Custom Ensuite Shower",
  },
  countertops: {
    name: "Mike & Laura D.",
    text: "Got quartz countertops installed in our kitchen and the seams are basically invisible. They templated everything on-site and the fit was perfect around the sink and cooktop. Turnaround was faster than we expected too.",
    project: "Kitchen Quartz Countertops",
  },
  cabinets: {
    name: "Rachel K.",
    text: "John's crew built custom cabinets for our laundry room and pantry. The soft-close hardware and the finish quality are on par with the high-end stuff we priced out but couldn't afford. Really solid work.",
    project: "Custom Cabinetry Install",
  },
  carpentry: {
    name: "Tyler B.",
    text: "Had them do all the interior trim and built-ins in our new home — baseboards, casings, crown moulding, and a built-in bookshelf. Everything is tight and level. You can tell they actually care about the details.",
    project: "Interior Trim & Built-Ins",
  },
  framing: {
    name: "Greg H.",
    text: "They framed our garage suite addition and everything was plumb and square when the inspector came through. Passed on the first go. The crew worked fast but didn't cut corners — exactly what you want on a structural job.",
    project: "Garage Suite Framing",
  },
  drywall: {
    name: "Natasha P.",
    text: "We had a full basement drywalled and textured after our renovation. The ceiling texture matches the rest of the house perfectly and there are zero visible seams on the walls. They even patched a couple spots upstairs while they were here.",
    project: "Basement Drywall & Texture",
  },
  painting: {
    name: "Chris & Jen M.",
    text: "They painted our entire main floor and stairwell — walls and trim. The prep work was thorough, all the edges are crisp, and they used quality Benjamin Moore paint. Took three days and the place looked brand new after.",
    project: "Main Floor Interior Painting",
  },
  basements: {
    name: "Dan R.",
    text: "Had them finish our basement — full development from bare concrete to a liveable space with a bathroom, bedroom, and rec room. They handled the permits, passed every inspection first try, and the final result was way better than we expected for the price.",
    project: "Full Basement Development",
  },
  garages: {
    name: "Steve L.",
    text: "Built us a detached double garage with a concrete pad and man door. The framing and siding match the house perfectly. They dealt with the city permits and the whole thing was done in under three weeks. No complaints at all.",
    project: "Detached Garage Build",
  },
  renovations: {
    name: "Mark & Teresa W.",
    text: "John and his crew completely gutted and rebuilt our kitchen. Took about three weeks and they were here every single day. The tile work and cabinet install were perfect — you can tell these guys have been doing this a long time. Would absolutely hire them again.",
    project: "Full Kitchen Renovation",
  },
  commercial: {
    name: "David A.",
    text: "We hired them for a tenant improvement on a retail unit — new walls, ceiling grid, flooring, and paint. They worked around our schedule, kept the neighbouring units undisturbed, and finished on time. Professional from start to finish.",
    project: "Commercial Tenant Improvement",
  },
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

/* ─── Inquiry Form ─── */
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

  return (
    <section className="py-20 sm:py-28 bg-[#0A0A0A]">
      <div className="container mx-auto px-6 max-w-2xl">
        <Reveal>
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">Have a Question?</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight leading-[0.95] mb-4">Ask Us Anything</h2>
            <p className="text-sm text-white/35 max-w-md mx-auto">Questions about materials, availability, or scope? We&apos;ll get back to you within 24 hours.</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {sent ? (
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8 text-center">
              <CheckCircle className="h-10 w-10 text-white mx-auto mb-3" />
              <p className="text-white font-bold uppercase tracking-wide">Message Received</p>
              <p className="text-white/35 text-sm mt-1">We&apos;ll reply within 24 hours.</p>
            </div>
          ) : (
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="bg-white/[0.03] border-white/[0.08] focus:border-white/30 text-white placeholder:text-white/25 rounded-lg h-11" />
                <Input type="email" placeholder="Email *" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/[0.03] border-white/[0.08] focus:border-white/30 text-white placeholder:text-white/25 rounded-lg h-11" />
                <textarea
                  placeholder="What would you like to know?"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="flex w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 min-h-[110px] resize-none transition-colors"
                />
                <button type="submit" disabled={loading} className="w-full bg-white text-black py-3 rounded-full font-bold text-sm tracking-wide hover:bg-white/90 transition-colors disabled:opacity-50">
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════ */

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceById(params.slug);
  if (!service) return notFound();

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const image = serviceImageMap[service.id] || "/service-millwork.webp";
  const heroPosition: Record<string, string> = {};
  const imgPosition = heroPosition[service.id] || "object-center";
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
        ? [
            {
              "@type": "FAQPage",
              "mainEntity": service.faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
              })),
            },
          ]
        : []),
      {
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": { "@type": "LocalBusiness", "name": BRAND_CONFIG.shortName },
        "areaServed": {
          "@type": "City",
          "name": "Calgary",
          "containedInPlace": { "@type": "AdministrativeArea", "name": "Alberta" },
        },
        "serviceType": service.title,
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ━━━ HERO ━━━ */}
      <section className="relative w-full aspect-[3/2] sm:aspect-[2/1] md:aspect-auto md:h-[55vh] lg:h-[60vh] max-h-[600px] overflow-hidden bg-black">
        <Image src={image} alt={`${service.title} - professional Calgary construction services by PCND`} fill className={`object-cover ${imgPosition}`} sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/90" />
        <div className="absolute inset-0 flex items-end pb-10 sm:pb-14 z-10">
          <div className="container mx-auto px-6 max-w-7xl">
            <Link href="/services" className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-[0.15em] uppercase text-white/80 hover:text-white transition-colors mb-4 font-medium">
              <ArrowRight className="w-3.5 h-3.5 rotate-180" /> All Services
            </Link>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight leading-[0.9] max-w-3xl">
              {service.title}
            </h1>
          </div>
        </div>
      </section>

      {/* ━━━ OVERVIEW ━━━ */}
      <section className="py-20 sm:py-28 bg-black">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            <Reveal className="lg:col-span-3">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">Overview</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight leading-[0.95] mb-6">{service.title}</h2>
              <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl">{service.description}</p>
            </Reveal>
            <Reveal delay={0.15} className="lg:col-span-2">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-7">
                <h3 className="text-sm font-display font-bold uppercase tracking-wide text-white mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/[0.04] pb-3">
                    <span className="text-white/35 text-sm">Experience</span>
                    <span className="text-white font-semibold text-sm">{yearsExp}+ years</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/[0.04] pb-3">
                    <span className="text-white/35 text-sm">Service Area</span>
                    <span className="text-white font-semibold text-sm">Calgary & Area</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/[0.04] pb-3">
                    <span className="text-white/35 text-sm">Estimates</span>
                    <span className="text-white font-semibold text-sm">Free</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/35 text-sm">Price Match</span>
                    <span className="text-white font-semibold text-sm">5% Beat Guarantee</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ━━━ WHAT'S INCLUDED ━━━ */}
      {service.details && service.details.length > 0 && (
        <section className="py-20 sm:py-28 bg-[#0A0A0A]">
          <div className="container mx-auto px-6 max-w-7xl">
            <Reveal>
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">Scope</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight leading-[0.95] mb-10">What&apos;s Included</h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
              {service.details.map((detail, idx) => (
                <Reveal key={detail} delay={idx * 0.03}>
                  <div className="flex items-start gap-3 py-3 border-b border-white/[0.04]">
                    <div className="w-1 h-1 rounded-full bg-white/30 shrink-0 mt-2" />
                    <span className="text-white/45 text-sm">{detail}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ━━━ PROCESS ━━━ */}
      {service.process && service.process.length > 0 && (
        <section className="py-20 sm:py-28 bg-black">
          <div className="container mx-auto px-6 max-w-7xl">
            <Reveal>
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">How It Works</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight leading-[0.95] mb-10">Our Process</h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step, idx) => (
                <Reveal key={step.title} delay={idx * 0.1}>
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-7 h-full">
                    <span className="text-3xl font-display font-black text-white/10 block mb-4">{String(step.step).padStart(2, "0")}</span>
                    <h3 className="text-base font-display font-bold uppercase tracking-tight text-white mb-2">{step.title}</h3>
                    <p className="text-white/35 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ━━━ MID-PAGE CTA ━━━ */}
      <section className="py-12 sm:py-16 bg-[#0A0A0A] border-y border-white/[0.04]">
        <div className="container mx-auto px-6 max-w-4xl">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight text-white mb-1">Ready to Get Started?</h3>
                <p className="text-white/30 text-sm">Free estimate — no obligation. We&apos;ll get back to you within 24 hours.</p>
              </div>
              <Link
                href={`/get-quote?service=${service.id}`}
                className="group inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-white/90 transition-colors shrink-0"
              >
                Get a Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━ MATERIALS ━━━ */}
      {service.materials && service.materials.length > 0 && (
        <section className="py-20 sm:py-28 bg-black">
          <div className="container mx-auto px-6 max-w-7xl">
            <Reveal>
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">Options</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight leading-[0.95] mb-10">Materials & Options</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-3">
                {service.materials.map((mat) => (
                  <span key={mat} className="bg-white/[0.04] border border-white/[0.06] text-white/50 text-sm px-4 py-2 rounded-full">{mat}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ━━━ TESTIMONIAL ━━━ */}
      {testimonial && (
        <section className="py-20 sm:py-28 bg-[#0A0A0A]">
          <div className="container mx-auto px-6 max-w-3xl">
            <Reveal>
              <div className="text-center mb-10">
                <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">Client Feedback</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight leading-[0.95]">What Our Clients Say</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-7 sm:p-10 max-w-2xl mx-auto">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-white text-white" />
                  ))}
                </div>
                <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-6">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="border-t border-white/[0.06] pt-5">
                  <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                  <p className="text-[11px] text-white/25 mt-0.5">{testimonial.project}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ━━━ FAQS ━━━ */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-20 sm:py-28 bg-black">
          <div className="container mx-auto px-6 max-w-3xl">
            <Reveal>
              <div className="text-center mb-10">
                <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">FAQ</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight leading-[0.95]">Common Questions</h2>
              </div>
            </Reveal>
            <div className="space-y-2">
              {service.faqs.map((faq, idx) => (
                <Reveal key={faq.question} delay={idx * 0.05}>
                  <div className="border border-white/[0.06] rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="text-white/70 text-sm font-medium pr-4">{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-white/30 shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === idx && (
                      <div className="px-6 pb-4">
                        <p className="text-white/35 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ━━━ RELATED SERVICES ━━━ */}
      {relatedServiceData.length > 0 && (
        <section className="py-20 sm:py-28 bg-[#0A0A0A]">
          <div className="container mx-auto px-6 max-w-7xl">
            <Reveal>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <div>
                  <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">Explore More</p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight leading-[0.95]">Related Services</h2>
                </div>
                <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-white transition-colors group shrink-0">
                  View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {relatedServiceData.map((related, idx) => (
                <Reveal key={related!.id} delay={idx * 0.07}>
                  <Link href={`/services/${related!.id}`} className="group block relative aspect-[4/3] rounded-xl overflow-hidden bg-[#111]">
                    <Image
                      src={serviceImageMap[related!.id] || "/service-millwork.webp"}
                      alt={`${related!.title} services in Calgary by PCND`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <h3 className="text-base sm:text-lg font-display font-bold uppercase tracking-wide text-white leading-tight">{related!.title}</h3>
                      <div className="shrink-0 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-3">
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ━━━ INQUIRY FORM ━━━ */}
      <InquiryForm serviceName={service.title} />

      {/* ━━━ CTA ━━━ */}
      <section className="py-24 sm:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }} />
        </div>
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[0.9] mb-6">Get Started Today</h2>
            <p className="text-white/30 text-base leading-relaxed mb-10 max-w-md mx-auto">
              Free consultation. No obligation. {yearsExp}+ years of experience behind every project.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link href={`/get-quote?service=${service.id}`} className="group inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-white/90 transition-colors">
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
