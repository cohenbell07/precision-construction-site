"use client";

import { useState } from "react";
import { services } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Hammer, Wrench, ArrowRight, ChevronDown } from "lucide-react";

// Map service IDs to image paths
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

// Value badges for services - matching products page style
const getServiceValueBadges = (serviceId: string) => {
  const badges: { [key: string]: { icon: typeof CheckCircle; text: string }[] } = {
    flooring: [
      { icon: CheckCircle, text: "Expert Installation" },
      { icon: Hammer, text: "Supply + Install Available" },
      { icon: Wrench, text: "Professional Subfloor Prep" },
    ],
    showers: [
      { icon: CheckCircle, text: "Custom Design" },
      { icon: Wrench, text: "Complete Waterproofing" },
      { icon: Hammer, text: "Premium Materials" },
    ],
    countertops: [
      { icon: CheckCircle, text: "Expert Templating" },
      { icon: Wrench, text: "Custom Fit & Finishing" },
      { icon: Hammer, text: "Supply + Install Available" },
    ],
    cabinets: [
      { icon: CheckCircle, text: "Fully Custom Design" },
      { icon: Wrench, text: "Any Style or Color" },
      { icon: Hammer, text: "Better Pricing" },
    ],
    carpentry: [
      { icon: CheckCircle, text: "Precision Craftsmanship" },
      { icon: Wrench, text: "Custom Fit & Finishing" },
      { icon: Hammer, text: "Premium Materials" },
    ],
    framing: [
      { icon: CheckCircle, text: "Code Compliant" },
      { icon: Hammer, text: "Permits Handled" },
      { icon: Wrench, text: "Expert Structural Work" },
    ],
    drywall: [
      { icon: CheckCircle, text: "Flawless Finishes" },
      { icon: Wrench, text: "Multiple Texture Options" },
      { icon: Hammer, text: "Professional Techniques" },
    ],
    painting: [
      { icon: CheckCircle, text: "Expert Preparation" },
      { icon: Hammer, text: "Interior & Exterior" },
      { icon: Wrench, text: "Premium Products" },
    ],
    basements: [
      { icon: CheckCircle, text: "Turnkey Development" },
      { icon: Hammer, text: "Permits Handled" },
      { icon: Wrench, text: "Moisture Control" },
    ],
    garages: [
      { icon: CheckCircle, text: "Built to Last" },
      { icon: Hammer, text: "Permits Handled" },
      { icon: Wrench, text: "Expert Design" },
    ],
    stone: [
      { icon: CheckCircle, text: "Expert Selection" },
      { icon: Wrench, text: "Precision Fabrication" },
      { icon: Hammer, text: "Professional Installation" },
    ],
    renovations: [
      { icon: CheckCircle, text: "Complete Project Management" },
      { icon: Hammer, text: "Full Trade Coordination" },
      { icon: Wrench, text: "Quality Control" },
    ],
    commercial: [
      { icon: CheckCircle, text: "Commercial Expertise" },
      { icon: Hammer, text: "Code Compliance" },
      { icon: Wrench, text: "Minimal Disruption" },
    ],
  };
  return badges[serviceId] || [
    { icon: CheckCircle, text: "Expert Service" },
    { icon: Hammer, text: "Professional Installation" },
    { icon: Wrench, text: "Quality Guaranteed" },
  ];
};

export default function ServicesPage() {
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});
  const [priceBeatForm, setPriceBeatForm] = useState({ name: "", email: "", category: "" });
  const [priceBeatFile, setPriceBeatFile] = useState<File | null>(null);
  const [priceBeatLoading, setPriceBeatLoading] = useState(false);
  const { toast } = useToast();

  const handlePriceBeatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPriceBeatLoading(true);
    try {
      const projectDetails = `5% Price Beat Request\nService/Project Type: ${priceBeatForm.category}\n${priceBeatFile ? `Competitor quote file attached: ${priceBeatFile.name}` : "No competitor quote file attached"}`;
      const res = await fetch("/api/quote/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: priceBeatForm.name,
          email: priceBeatForm.email,
          serviceTitle: `Price Beat — ${priceBeatForm.category}`,
          projectDetails,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast({
          title: "Request sent!",
          description: "We'll review your competitor quote and get back to you within 24 hours with our best price.",
        });
        setPriceBeatForm({ name: "", email: "", category: "" });
        setPriceBeatFile(null);
      } else {
        toast({
          title: "Something went wrong",
          description: data.error || "Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Price beat submit error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setPriceBeatLoading(false);
    }
  };

  const toggleServiceExpansion = (serviceId: string) => {
    setExpandedServices((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  // Reorder services: basements first, then flooring after cabinets
  const reorderedServices = [...services];
  const basementsIndex = reorderedServices.findIndex(s => s.id === "basements");
  if (basementsIndex !== -1) {
    const basements = reorderedServices.splice(basementsIndex, 1)[0];
    reorderedServices.unshift(basements);
  }
  const flooringIndex = reorderedServices.findIndex(s => s.id === "flooring");
  const cabinetsIndex = reorderedServices.findIndex(s => s.id === "cabinets");
  if (flooringIndex !== -1 && cabinetsIndex !== -1 && reorderedServices[0]?.id !== "flooring") {
    const flooring = reorderedServices.splice(flooringIndex, 1)[0];
    const insertIndex = reorderedServices.findIndex(s => s.id === "cabinets") + 1;
    reorderedServices.splice(insertIndex, 0, flooring);
  }

  return (
    <div className="min-h-screen bg-black relative premium-bg-pattern">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full bg-black overflow-hidden py-14 sm:py-18 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex justify-center mb-4 sm:mb-5">
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
                Residential &amp; Commercial · Calgary
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-4 sm:mb-6 text-white uppercase tracking-tight premium-heading px-2">
              Our Services
            </h1>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(232,232,232,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-3 sm:mb-4 leading-relaxed premium-text px-2">
              From flooring to full home renovations, we provide comprehensive construction services for
              residential and commercial projects in Calgary and surrounding areas.
            </p>
            <p className="text-sm sm:text-base md:text-lg premium-silver-text font-bold max-w-3xl mx-auto uppercase tracking-widest px-2">
              {BRAND_CONFIG.motto}
            </p>
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-silver/50 to-transparent shadow-[0_0_30px_rgba(232,232,232,0.4)]"></div>

      {/* Service Categories - Matching Products Page Layout */}
      <section className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="space-y-5 sm:space-y-6">
            {reorderedServices.map((service, index) => {
              const isEven = index % 2 === 0;
              const imagePath = serviceImageMap[service.id] || "/service-millwork.png";
              const valueBadges = getServiceValueBadges(service.id);
              const categoryNum = String(index + 1).padStart(2, "0");

              return (
                <div key={service.id} className={`relative rounded-2xl overflow-hidden border border-silver/10 shadow-[0_4px_32px_rgba(0,0,0,0.6)] ${isEven ? 'bg-[#050505]' : 'bg-[#080808]'}`}>
                  {/* Left orange accent bar */}
                  <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent pointer-events-none"></div>

                  <div className="p-4 sm:p-7 md:p-10 lg:p-12">
                    {service.id === "basements" && (
                      <div className="mb-6 sm:mb-8">
                        <span className="inline-block text-sm font-black uppercase tracking-wider bg-silver text-black px-4 py-2.5 rounded-full border-2 border-silver shadow-[0_0_20px_rgba(232,232,232,0.5)]">
                          15% off full basement renovations — limited time
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                      {/* Content Column */}
                      <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>

                        {/* Index + Category badge row */}
                        <div className="flex items-center gap-3 mb-4 sm:mb-5">
                          <span className="text-xs font-black text-primary/70 uppercase tracking-[0.3em]">{categoryNum}</span>
                          <div className="h-px w-10 bg-gradient-to-r from-primary/40 to-transparent"></div>
                          <span className="section-label">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
                            {service.id === "commercial" ? "Commercial Service" : "Residential & Commercial"}
                          </span>
                        </div>

                        {/* Heading with ghost watermark number */}
                        <div className="relative mb-4 sm:mb-5">
                          <span className="hidden sm:block absolute -left-1 top-1/2 -translate-y-1/2 text-[5rem] sm:text-[7rem] font-black text-white/[0.03] leading-none select-none pointer-events-none">
                            {categoryNum}
                          </span>
                          <h2 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight premium-heading">
                            {service.title}
                          </h2>
                        </div>

                        {/* Orange accent bar */}
                        <div
                          className="h-[3px] w-14 rounded-full bg-gradient-to-r from-primary to-transparent mb-6 sm:mb-8"
                          style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }}
                        ></div>

                        {/* Description */}
                        <p className="text-base sm:text-lg text-white/90 leading-relaxed premium-text mb-6 sm:mb-8 font-medium">
                          {service.description}
                        </p>

                        {/* Value Badges */}
                        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                          {valueBadges.map((badge, idx) => {
                            const IconComponent = badge.icon;
                            return (
                              <div key={idx} className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/[0.04] border border-silver/25 hover:border-silver/50 transition-colors">
                                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-silver/[0.08] flex items-center justify-center shrink-0">
                                  <IconComponent className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-silver" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wide text-silver/90">{badge.text}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Service List */}
                        <div className="mb-6 sm:mb-8">
                          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.25em] mb-3 sm:mb-4">What&apos;s Included</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-5">
                            {(expandedServices[service.id] ? (service.details ?? []) : (service.details?.slice(0, 9) ?? [])).map((detail, idx) => (
                              <div key={idx} className="flex items-start gap-2.5">
                                <span className="mt-[5px] shrink-0 w-3.5 h-3.5 rounded-full bg-primary/[0.12] border border-primary/35 flex items-center justify-center">
                                  <span className="w-1 h-1 rounded-full bg-primary block"></span>
                                </span>
                                <span className="text-white/75 text-xs sm:text-sm leading-relaxed">{detail}</span>
                              </div>
                            ))}
                          </div>
                          {service.details && service.details.length > 9 && (
                            <button
                              onClick={() => toggleServiceExpansion(service.id)}
                              className="mt-4 sm:mt-5 inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wide text-silver/70 hover:text-silver bg-silver/[0.04] hover:bg-silver/[0.08] border border-silver/15 hover:border-silver/35 px-4 py-2 rounded-full transition-all"
                            >
                              {expandedServices[service.id] ? "Show less" : "View full list"}
                              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${expandedServices[service.id] ? 'rotate-180' : ''}`} />
                            </button>
                          )}
                        </div>

                        {/* CTA Row */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-5 sm:pt-6 border-t border-silver/10">
                          <Button asChild className="btn-premium uppercase tracking-wider text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 w-full sm:w-auto">
                            <Link href={service.id === "basements" ? "/get-quote/basement" : `/get-quote/${service.id}`}>
                              {service.id === "basements" ? "Get 15% Off — Request Quote" : "Get a Free Quote"}
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="btn-outline-silver uppercase tracking-wider text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 w-full sm:w-auto rounded-md">
                            <Link href={`/services/${service.id}`}>
                              Learn More <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>

                      {/* Image Column */}
                      <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        <div className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-silver/15 shadow-[0_8px_40px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-silver/35 hover:shadow-[0_16px_60px_rgba(0,0,0,0.7)]">
                          <Image
                            src={imagePath}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>
                          {/* Bottom label overlay */}
                          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 py-4 sm:py-5 flex items-end justify-between pointer-events-none">
                            <div>
                              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-0.5">Calgary · Est. 1968</p>
                              <p className="text-white font-display font-black text-base sm:text-lg uppercase tracking-tight leading-tight">{service.title}</p>
                            </div>
                            <span className="text-white/[0.06] font-black leading-none" style={{ fontSize: '4rem' }}>{categoryNum}</span>
                          </div>
                          {/* Corner accents */}
                          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 rounded-tr pointer-events-none" style={{ borderColor: 'hsla(22,100%,63%,0.5)' }}></div>
                          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-silver/20 rounded-bl pointer-events-none"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-silver/50 to-transparent shadow-[0_0_30px_rgba(232,232,232,0.4)]"></div>

      {/* Price Beat Section - Services */}
      <section id="quote-form" className="py-14 sm:py-18 md:py-24 bg-[#030303] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(22,100%,63%,0.04)_0%,transparent_65%)] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl relative z-10">

          <div className="text-center mb-10 sm:mb-12">
            <div className="flex justify-center mb-4">
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block" />
                5% Price Beat Guarantee
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-3 uppercase tracking-tight premium-heading px-2">
              Get My Price Beat
            </h2>
            <div className="h-[3px] w-12 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full mb-4" style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }} />
            <p className="text-sm sm:text-base text-white/45 max-w-lg mx-auto px-2">
              Have a competitor quote for a service? Send it to us — we&apos;ll beat it by 5% or more, guaranteed.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-primary/15 bg-[#060606]" style={{ boxShadow: '0 0 50px hsla(22,100%,63%,0.05)' }}>
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/60 via-primary/20 to-transparent pointer-events-none" />
            <div className="p-6 sm:p-8 md:p-10">
              <form onSubmit={handlePriceBeatSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="price-beat-name" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                      <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                      Name <span className="text-primary/70">*</span>
                    </label>
                    <Input
                      id="price-beat-name"
                      required
                      value={priceBeatForm.name}
                      onChange={(e) => setPriceBeatForm({ ...priceBeatForm, name: e.target.value })}
                      placeholder="Your name"
                      className="bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="price-beat-email" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                      <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                      Email <span className="text-primary/70">*</span>
                    </label>
                    <Input
                      id="price-beat-email"
                      type="email"
                      required
                      value={priceBeatForm.email}
                      onChange={(e) => setPriceBeatForm({ ...priceBeatForm, email: e.target.value })}
                      placeholder="your@email.com"
                      className="bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="price-beat-category" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                    <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                    Service or Project Type <span className="text-primary/70">*</span>
                  </label>
                  <Input
                    id="price-beat-category"
                    required
                    value={priceBeatForm.category}
                    onChange={(e) => setPriceBeatForm({ ...priceBeatForm, category: e.target.value })}
                    placeholder="e.g., Basement Development, Flooring, Custom Showers…"
                    className="bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="price-beat-file" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                    <span className="w-1 h-1 rounded-full bg-silver/40 shrink-0" />
                    Competitor Quote <span className="text-white/25 normal-case font-normal ml-1">(optional — PDF, image, or doc)</span>
                  </label>
                  <Input
                    id="price-beat-file"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => setPriceBeatFile(e.target.files?.[0] || null)}
                    className="bg-white/[0.04] border-silver/15 text-white/60 rounded-xl h-11 cursor-pointer file:mr-3 file:h-full file:border-0 file:bg-white/[0.06] file:text-white/50 file:text-xs file:font-bold file:uppercase file:tracking-wide file:px-3 hover:file:bg-white/[0.10] file:cursor-pointer transition-colors"
                  />
                  {priceBeatFile && (
                    <p className="mt-2 text-xs text-primary/70 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                      {priceBeatFile.name}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={priceBeatLoading} className="w-full btn-premium uppercase tracking-wider py-3 h-auto text-sm mt-2">
                  {priceBeatLoading ? "Sending…" : "Get My Price Beat"}
                </Button>
                <p className="text-center text-[11px] text-white/25 pt-1">We respond within 24 hours with your guaranteed beat price.</p>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-silver/50 to-transparent shadow-[0_0_30px_rgba(232,232,232,0.4)]"></div>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 cta-warm-bg relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center relative z-10">
          <span className="section-label mb-5 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
            Free Quote · No Obligation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black mb-4 sm:mb-5 uppercase tracking-tight premium-heading mt-4 sm:mt-5">
            Ready to Start?
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-silver/40 to-transparent mx-auto mb-5 sm:mb-6"></div>
          <p className="text-sm sm:text-base md:text-lg text-white/60 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed px-2">
            We treat every client like family. Get a free consultation and quote — and see why Calgary has trusted {BRAND_CONFIG.shortName} for generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-5">
            <Button asChild size="lg" className="btn-premium px-8 py-4 text-sm sm:text-base uppercase tracking-wider w-full sm:w-auto">
              <Link href="/get-quote">Request a Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-outline-silver px-8 py-4 text-sm sm:text-base w-full sm:w-auto rounded-md">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
          <p className="text-xs text-white/40 uppercase tracking-widest">{BRAND_CONFIG.contact.cta}</p>
        </div>
      </section>
    </div>
  );
}
