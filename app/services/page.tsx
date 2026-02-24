"use client";

import { useState } from "react";
import { services } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Hammer, Wrench, ArrowRight } from "lucide-react";

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
      const body = new FormData();
      body.append("inquiryType", "service");
      body.append("name", priceBeatForm.name);
      body.append("email", priceBeatForm.email);
      body.append("productType", priceBeatForm.category || "");
      if (priceBeatFile) body.append("quoteFile", priceBeatFile);
      const res = await fetch("/api/products/price-beat", { method: "POST", body });
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
      <section className="relative w-full bg-black overflow-hidden py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-4 sm:mb-6 text-white uppercase tracking-tight premium-heading px-2">
              Our Services
            </h1>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(232,232,232,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white max-w-3xl mx-auto mb-3 sm:mb-4 leading-relaxed premium-text px-2">
              From flooring to full home renovations, we provide comprehensive construction services for
              residential and commercial projects in Calgary and surrounding areas.
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl premium-silver-text font-bold max-w-3xl mx-auto uppercase tracking-wide px-2">
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
          <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
            {reorderedServices.map((service, index) => {
              const isEven = index % 2 === 0;
              const imagePath = serviceImageMap[service.id] || "/service-millwork.png";
              const valueBadges = getServiceValueBadges(service.id);
              
              return (
                <div key={service.id} className="relative">
                  {service.id === "basements" && (
                    <div className="mb-6 sm:mb-8 flex justify-start">
                      <span className="inline-block text-sm font-black uppercase tracking-wider bg-silver text-black px-4 py-2.5 rounded-full border-2 border-silver shadow-[0_0_20px_rgba(232,232,232,0.5)]">
                        15% off full basement renovations — limited time
                      </span>
                    </div>
                  )}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-8 lg:gap-12 items-start">
                    {/* Content Section - Text and Services */}
                    <div className={`${isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
                      <div className="mb-6 sm:mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight premium-heading">
                            {service.title}
                          </h2>
                        </div>
                        <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-silver to-transparent mb-6 shadow-[0_0_20px_rgba(232,232,232,0.6)]"></div>
                      </div>
                      
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 leading-relaxed premium-text mb-6 sm:mb-8 font-medium">
                        {service.description}
                      </p>

                      {/* Value Badges with Icons */}
                      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10">
                        {valueBadges.map((badge, idx) => {
                          const IconComponent = badge.icon;
                          return (
                            <div
                              key={idx}
                              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-full bg-silver/15 border border-silver/40 text-silver/90 "
                            >
                              <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-silver drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wide">{badge.text}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Service Details List */}
                      <div className="mb-6 sm:mb-8 md:mb-10">
                        <h3 className="text-base sm:text-lg font-black text-white mb-3 sm:mb-4 md:mb-6 uppercase tracking-wide premium-heading-sm">
                          Our Services:
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                          {(expandedServices[service.id] ? (service.details ?? []) : (service.details?.slice(0, 9) ?? [])).map((detail, idx) => (
                            <div key={idx} className="flex items-start space-x-2 sm:space-x-3">
                              <span className="text-silver mt-1.5 flex-shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-silver shadow-[0_0_8px_rgba(232,232,232,0.6)]"></span>
                              <span className="text-white/90 premium-text text-xs sm:text-sm md:text-base leading-relaxed">{detail}</span>
                            </div>
                          ))}
                        </div>
                        {service.details && service.details.length > 9 && (
                          <button
                            onClick={() => toggleServiceExpansion(service.id)}
                            className="mt-4 text-silver/90 hover:text-silver text-sm font-bold uppercase tracking-wide underline transition-colors"
                          >
                            {expandedServices[service.id] ? "Show less" : "View full list"}
                          </button>
                        )}
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-5 md:pt-6 border-t border-silver/20">
                        <Button
                          asChild
                          className="btn-premium uppercase tracking-wider text-xs sm:text-sm md:text-base px-4 py-2.5 sm:px-6 sm:py-3 w-full sm:w-auto"
                        >
                          <Link href={service.id === "basements" ? "/get-quote/basement" : `/get-quote/${service.id}`}>
                            {service.id === "basements" ? "Get 15% Off — Request Quote" : "Get Quote"}
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="border-2 border-silver/40 bg-transparent hover:bg-silver/10 hover:border-silver text-silver uppercase tracking-wider text-xs sm:text-sm md:text-base px-4 py-2.5 sm:px-6 sm:py-3 w-full sm:w-auto transition-[transform,box-shadow,border-color] duration-300"
                        >
                          <Link href={`/services/${service.id}`}>
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {/* Image Section - Premium framed image */}
                    <div className={`${isEven ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}>
                      <div className="group relative w-full aspect-square min-h-[180px] sm:min-h-[220px] rounded-2xl overflow-hidden border-2 border-silver/30 shadow-[0_8px_30px_rgba(0,0,0,0.4),0_0_24px_rgba(232,232,232,0.12)] ring-1 ring-inset ring-white/10 transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_32px_rgba(232,232,232,0.18)] hover:border-silver/50">
                        <Image
                          src={imagePath}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-300"
                          loading="lazy"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"></div>
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
      <section id="quote-form" className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-black text-white mb-3 sm:mb-4 uppercase tracking-tight premium-heading px-2">
              We Beat All Legitimate Competitor Quotes by 5% or More
            </h2>
            <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_15px_rgba(232,232,232,0.4)]"></div>
            <p className="text-sm sm:text-base md:text-lg text-white max-w-3xl mx-auto premium-text px-2">
              Have a competitor quote for a service? Send it to us — we&apos;ll beat it by at least 5%.
            </p>
          </div>

          <Card className="card-premium border-silver/30 bg-black/75">
            <CardHeader>
              <CardTitle className="text-2xl font-display font-black text-white uppercase tracking-tight premium-heading-sm text-center">
                Get My Price Beat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePriceBeatSubmit} className="space-y-6">
                <div>
                  <label htmlFor="price-beat-name" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                    Name *
                  </label>
                  <Input
                    id="price-beat-name"
                    required
                    value={priceBeatForm.name}
                    onChange={(e) => setPriceBeatForm({ ...priceBeatForm, name: e.target.value })}
                    placeholder="Your name"
                    className="focus:ring-silver/50 focus:border-silver bg-black/50 border-silver/30 text-white placeholder:text-white/40"
                  />
                </div>
                <div>
                  <label htmlFor="price-beat-email" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                    Email *
                  </label>
                  <Input
                    id="price-beat-email"
                    type="email"
                    required
                    value={priceBeatForm.email}
                    onChange={(e) => setPriceBeatForm({ ...priceBeatForm, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="focus:ring-silver/50 focus:border-silver bg-black/50 border-silver/30 text-white placeholder:text-white/40"
                  />
                </div>
                <div>
                  <label htmlFor="price-beat-category" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                    Service or project type *
                  </label>
                  <Input
                    id="price-beat-category"
                    required
                    value={priceBeatForm.category}
                    onChange={(e) => setPriceBeatForm({ ...priceBeatForm, category: e.target.value })}
                    placeholder="e.g., Basement Development, Flooring, Custom Showers, Cabinets, etc."
                    className="focus:ring-silver/50 focus:border-silver bg-black/50 border-silver/30 text-white placeholder:text-white/40"
                  />
                </div>
                <div>
                  <label htmlFor="price-beat-file" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                    Competitor Quote (Optional)
                  </label>
                  <Input
                    id="price-beat-file"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => setPriceBeatFile(e.target.files?.[0] || null)}
                    className="focus:ring-silver/50 focus:border-silver bg-black/50 border-silver/30 text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-silver/20 file:text-silver hover:file:bg-silver/30 file:cursor-pointer cursor-pointer"
                  />
                  {priceBeatFile && (
                    <p className="mt-2 text-sm text-white/70">
                      Selected: {priceBeatFile.name}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={priceBeatLoading} className="w-full btn-premium uppercase tracking-wider">
                  {priceBeatLoading ? "Sending..." : "Get My Price Beat"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-silver/50 to-transparent shadow-[0_0_30px_rgba(232,232,232,0.4)]"></div>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black mb-4 sm:mb-6 md:mb-8 text-white uppercase tracking-tight premium-heading">
            Ready to Start Your Project?
          </h2>
          <div className="h-[2px] w-32 sm:w-40 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-4 sm:mb-6 md:mb-8 shadow-[0_0_25px_rgba(232,232,232,0.7)]"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed premium-text font-medium px-2">
            We treat every client like family. Contact us today for a free consultation and quote.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl premium-silver-text font-bold mb-6 sm:mb-8 md:mb-10 uppercase tracking-wide px-2">
            {BRAND_CONFIG.motto}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Button asChild size="lg" className="btn-premium px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider w-full sm:w-auto sm:min-w-[200px]">
              <Link href="/get-quote">Request a Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-silver/50 bg-black/65 hover:bg-black/80 hover:border-silver text-silver  px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wide w-full sm:w-auto sm:min-w-[200px] transition-[transform,box-shadow,border-color] duration-300 hover:shadow-[0_0_20px_rgba(232,232,232,0.3)]">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-white/70 mt-6 sm:mt-8 font-medium px-2">
            {BRAND_CONFIG.contact.cta}
          </p>
        </div>
      </section>
    </div>
  );
}
