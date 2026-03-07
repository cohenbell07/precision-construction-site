"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getServiceById } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { CheckCircle, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

const serviceImageMap: { [key: string]: string } = {
  cabinets: "/service-millwork.png",
  showers: "/service-steam-shower.png",
  countertops: "/countertopsservice3.png",
  basements: "/basementdevservice5.png",
  carpentry: "/interiorfinishingservice1.png",
  flooring: "/flooringinstallservice2.png",
  framing: "/framingservice4.png",
  drywall: "/drywall-texture.png",
  painting: "/painting.png",
  garages: "/garage-deck-fence.png",
  stone: "/stone-setting.png",
  renovations: "/home-additions.png",
  commercial: "/commercial-construction.png",
};

function ServiceInquiryForm({ serviceName }: { serviceName: string }) {
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
      if (res.ok) {
        setSent(true);
        setName(""); setEmail(""); setMessage("");
      }
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#040404] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver/20 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 max-w-2xl relative z-10">
        <div className="text-center mb-8 sm:mb-10">
          <span className="section-label mb-4 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-silver/60 shrink-0 inline-block" />
            Have a Question?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mt-4 mb-3 uppercase tracking-tight premium-heading">
            Ask Us Anything
          </h2>
          <div className="h-[3px] w-12 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full mb-4" style={{ boxShadow: "0 0 10px hsla(22,100%,63%,0.5)" }} />
          <p className="text-sm sm:text-base text-white/55 max-w-lg mx-auto">
            Questions about materials, availability, or scope? Send us a message and we&apos;ll get back to you promptly.
          </p>
        </div>

        {sent ? (
          <div className="rounded-2xl border border-silver/20 bg-white/[0.03] p-8 text-center">
            <CheckCircle className="h-10 w-10 text-primary mx-auto mb-3" />
            <p className="text-white font-black uppercase tracking-wide">Message received!</p>
            <p className="text-white/50 text-sm mt-1">We&apos;ll reply within 24 hours.</p>
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#080808] shadow-[0_4px_32px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/60 via-primary/20 to-transparent pointer-events-none" />
            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="serviceName" value={serviceName} />
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/[0.04] border-silver/15 focus:border-primary/50 text-white placeholder:text-white/30 rounded-xl h-11"
                />
                <Input
                  type="email"
                  placeholder="Email *"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/[0.04] border-silver/15 focus:border-primary/50 text-white placeholder:text-white/30 rounded-xl h-11"
                />
                <textarea
                  placeholder="What materials or questions do you have?"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="flex w-full rounded-xl border border-silver/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 min-h-[110px] resize-none transition-colors"
                />
                <Button type="submit" disabled={loading} className="w-full btn-premium uppercase tracking-wider py-3 h-auto">
                  {loading ? "Sending…" : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceById(params.slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!service) notFound();

  const imagePath = serviceImageMap[service.id] || "/service-millwork.png";
  const yearsExp = new Date().getFullYear() - BRAND_CONFIG.established;

  return (
    <div className="min-h-screen bg-black">

      {/* ── Hero ── */}
      <section className="relative min-h-[300px] sm:min-h-[420px] md:min-h-[520px] h-[55vh] md:h-[65vh] max-h-[680px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/service-header-workers.png"
            alt={`${service.title} by ${BRAND_CONFIG.shortName}`}
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center max-w-5xl">
          <div className="flex justify-center mb-4 sm:mb-5">
            <span className="section-label">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block" />
              Calgary&apos;s Premium Builder · Since {BRAND_CONFIG.established}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black text-white mb-4 sm:mb-5 uppercase tracking-tight premium-heading px-2">
            {service.title}
          </h1>
          <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full mb-4 sm:mb-6" style={{ boxShadow: "0 0 12px hsla(22,100%,63%,0.5)" }} />
          <p className="hidden sm:block text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed px-2">
            Premium {service.title.toLowerCase()} services in Calgary — family-owned since {BRAND_CONFIG.established}, serving Calgary since {BRAND_CONFIG.servingSince}.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-6 sm:mt-8">
            {[`${yearsExp}+ Yrs Experience`, "Family Owned", "Free Quotes", "5% Price Beat"].map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-widest text-white/50">
                <span className="w-1 h-1 rounded-full bg-primary/70 shrink-0" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section className="py-14 sm:py-18 md:py-24 bg-[#030303] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver/10 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em] mb-2">What We Do</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading">
                Expert {service.title}
              </h2>
              <div className="h-[3px] w-10 bg-gradient-to-r from-primary to-transparent rounded-full mb-5 sm:mb-6" style={{ boxShadow: "0 0 8px hsla(22,100%,63%,0.4)" }} />
              <p className="text-base sm:text-lg text-white/75 leading-relaxed mb-5 sm:mb-6">
                {service.description}
              </p>
              <p className="text-sm sm:text-base text-white/45 leading-relaxed mb-7 sm:mb-8">
                At {BRAND_CONFIG.shortName}, we bring over {yearsExp} years of construction expertise to every {service.title.toLowerCase()} project. As a 3rd generation, family-owned company, we treat every client like family.
              </p>
              <div className="flex flex-col min-[400px]:flex-row gap-3">
                <Button asChild className="btn-premium uppercase tracking-wider px-6 py-3 h-auto w-full min-[400px]:w-auto">
                  <Link href={`/get-quote?service=${service.id}`}>Get a Free Quote</Link>
                </Button>
                <Button asChild variant="outline" className="border border-silver/20 bg-white/[0.03] hover:bg-white/[0.06] hover:border-silver/40 text-white/70 hover:text-white px-6 py-3 h-auto w-full min-[400px]:w-auto rounded-xl transition-all">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            {/* Image */}
            <div className="relative h-56 sm:h-72 md:h-80 lg:h-96 rounded-2xl overflow-hidden border border-silver/10 shadow-2xl">
              <Image
                src={imagePath}
                alt={`${service.title} project`}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-silver/20 rounded-xl px-3 py-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
                  <span className="text-xs font-black text-white uppercase tracking-widest">Premium Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="py-14 sm:py-18 md:py-24 bg-[#060606] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center mb-10 sm:mb-12 md:mb-14">
              <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em] mb-2">Why Choose Us</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-3 uppercase tracking-tight premium-heading">
                Why Choose {BRAND_CONFIG.shortName} for {service.title}
              </h2>
              <div className="h-[3px] w-12 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" style={{ boxShadow: "0 0 8px hsla(22,100%,63%,0.4)" }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="relative rounded-xl border border-silver/10 bg-white/[0.02] p-5 sm:p-6 hover:border-primary/25 hover:bg-white/[0.03] transition-all duration-300 overflow-hidden group">
                  <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-primary/[0.10] border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary/80" />
                    </div>
                    <p className="text-sm sm:text-base text-white/75 leading-relaxed">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Our Process ── */}
      {service.process && service.process.length > 0 && (
        <section className="py-14 sm:py-18 md:py-24 bg-[#030303] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver/10 to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center mb-10 sm:mb-12 md:mb-14">
              <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em] mb-2">How It Works</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-3 uppercase tracking-tight premium-heading">
                Our Process
              </h2>
              <div className="h-[3px] w-12 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" style={{ boxShadow: "0 0 8px hsla(22,100%,63%,0.4)" }} />
              <p className="text-sm sm:text-base text-white/40 max-w-xl mx-auto mt-4">
                A proven process that keeps your project on time, on budget, and stress-free.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {service.process.map((step, idx) => (
                <div key={step.step} className="relative rounded-2xl border border-silver/10 bg-white/[0.02] p-5 sm:p-6 overflow-hidden group hover:border-primary/20 transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {/* Step number */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/[0.10] border border-primary/25 flex items-center justify-center shrink-0">
                      <span className="text-primary font-black text-sm leading-none">{String(step.step).padStart(2, "0")}</span>
                    </div>
                    {idx < service.process!.length - 1 && (
                      <div className="hidden lg:block flex-1 h-px bg-gradient-to-r from-silver/15 to-transparent" />
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-black text-white uppercase tracking-tight mb-2 premium-heading-sm">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Details (Services List) ── */}
      {service.details && service.details.length > 0 && (
        <section className="py-14 sm:py-18 md:py-24 bg-[#060606] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver/10 to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center mb-10 sm:mb-12 md:mb-14">
              <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em] mb-2">Full Scope</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-3 uppercase tracking-tight premium-heading">
                What&apos;s Included
              </h2>
              <div className="h-[3px] w-12 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" style={{ boxShadow: "0 0 8px hsla(22,100%,63%,0.4)" }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {service.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 sm:p-5 rounded-xl border border-silver/10 bg-white/[0.02] hover:border-primary/20 hover:bg-white/[0.03] transition-all duration-200">
                  <span className="mt-[2px] shrink-0 w-5 h-5 rounded-full bg-primary/[0.10] border border-primary/25 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary block" />
                  </span>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Materials & Options ── */}
      {service.materials && service.materials.length > 0 && (
        <section className="py-14 sm:py-18 md:py-24 bg-[#030303] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver/10 to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center mb-10 sm:mb-12 md:mb-14">
              <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em] mb-2">Materials</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-3 uppercase tracking-tight premium-heading">
                Materials & Options
              </h2>
              <div className="h-[3px] w-12 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" style={{ boxShadow: "0 0 8px hsla(22,100%,63%,0.4)" }} />
              <p className="text-sm sm:text-base text-white/40 max-w-xl mx-auto mt-4">
                We source premium materials and offer a wide range of options to suit every style and budget.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {service.materials.map((material, idx) => (
                <div key={idx} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-silver/15 bg-white/[0.03] hover:border-silver/30 hover:bg-white/[0.05] transition-all duration-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-silver/40 shrink-0" />
                  <span className="text-sm font-semibold text-white/70">{material}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQs ── */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-14 sm:py-18 md:py-24 bg-[#060606] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver/10 to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
            <div className="text-center mb-10 sm:mb-12">
              <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em] mb-2">FAQs</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-3 uppercase tracking-tight premium-heading">
                Common Questions
              </h2>
              <div className="h-[3px] w-12 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" style={{ boxShadow: "0 0 8px hsla(22,100%,63%,0.4)" }} />
            </div>
            <div className="space-y-3">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="relative rounded-xl border border-silver/10 bg-white/[0.02] overflow-hidden transition-all duration-200 hover:border-silver/20">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4"
                  >
                    <span className="text-sm sm:text-base font-black text-white uppercase tracking-tight leading-snug pr-2">
                      {faq.question}
                    </span>
                    <span className="shrink-0 w-7 h-7 rounded-full border border-silver/20 bg-white/[0.04] flex items-center justify-center">
                      {openFaq === idx
                        ? <ChevronUp className="h-3.5 w-3.5 text-silver/70" />
                        : <ChevronDown className="h-3.5 w-3.5 text-silver/70" />}
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-silver/[0.07]">
                      <p className="text-sm sm:text-base text-white/55 leading-relaxed pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Ask Us Anything (inquiry form) ── */}
      <ServiceInquiryForm serviceName={service.title} />

      {/* ── CTA ── */}
      <section className="py-14 sm:py-18 md:py-24 bg-[#030303] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(22,100%,63%,0.04)_0%,transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl relative z-10">
          <div className="relative rounded-2xl border border-primary/15 bg-white/[0.02] overflow-hidden p-7 sm:p-10 md:p-14 text-center" style={{ boxShadow: "0 0 60px hsla(22,100%,63%,0.05)" }}>
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em] mb-3">Get Started</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-3 uppercase tracking-tight premium-heading">
              Ready to Begin?
            </h2>
            <div className="h-[2px] w-10 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto rounded-full mb-5" />
            <p className="text-sm sm:text-base text-white/50 max-w-lg mx-auto mb-2 leading-relaxed">
              Contact us today for a free consultation and quote on your {service.title.toLowerCase()} project.
            </p>
            <p className="text-xs sm:text-sm font-black text-primary/70 uppercase tracking-widest mb-7 sm:mb-8">
              {BRAND_CONFIG.motto}
            </p>
            <div className="flex flex-col min-[400px]:flex-row gap-3 justify-center">
              <Button asChild className="btn-premium uppercase tracking-wider px-7 py-3 h-auto text-sm w-full min-[400px]:w-auto">
                <Link href={`/get-quote?service=${service.id}`}>
                  Get a Free Quote
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border border-silver/20 bg-white/[0.03] hover:bg-white/[0.06] hover:border-silver/40 text-white/65 hover:text-white px-7 py-3 h-auto text-sm w-full min-[400px]:w-auto rounded-xl transition-all">
                <Link href="/services">All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
