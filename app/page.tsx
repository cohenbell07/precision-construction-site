"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { AIChatAssistant } from "@/components/AIChatAssistant";
import { VideoHero } from "@/components/VideoHero";
import { CheckCircle, Star, Hammer, Award, Users, ArrowRight } from "lucide-react";

export default function Home() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "NW Calgary",
      text: "Precision Construction and Decora transformed our kitchen. They treated us like family from day one. The custom cabinets and countertops exceeded our expectations, and we got only the best quality and service.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      location: "SE Calgary",
      text: "As a 3rd generation company, they know what they're doing. Their attention to detail on our commercial project was outstanding, and the relationship we built felt genuine.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      location: "Calgary",
      text: "The custom Murphy bed they built for our small space was perfect. Better quality and price than the big box stores, and John made sure we were completely satisfied.",
      rating: 5,
    },
  ];

  const whyUs = [
    {
      icon: Users,
      title: "Family-Owned & Operated",
      description: "3rd generation construction company since 1968. We treat every client like family.",
    },
    {
      icon: Award,
      title: "Expect Only The Best",
      description: "You'll get only the best — in service, quality, and satisfaction. That's our promise.",
    },
    {
      icon: Hammer,
      title: "Proven Experience",
      description: "Serving Calgary since 1997 with extensive residential and commercial experience.",
    },
    {
      icon: CheckCircle,
      title: "Complete Satisfaction",
      description: "Your satisfaction is our priority. We stand behind our work and build lasting relationships.",
    },
  ];

  const serviceImageMap: { [key: string]: string } = {
    cabinets: "/service-millwork.png",
    showers: "/service-steam-shower.png",
    countertops: "/countertopsservice3.png",
    renovations: "/home-additions.png",
    carpentry: "/interiorfinishingservice1.png",
    garages: "/garage-deck-fence.png",
  };

  const featuredServices = services.filter((s) =>
    ["cabinets", "showers", "countertops", "renovations", "carpentry", "garages"].includes(s.id)
  );

  return (
    <div className="flex flex-col">

      {/* Hero Section */}
      <section className="relative w-full bg-black overflow-hidden aspect-video min-h-[220px] max-h-[62vh] sm:min-h-[280px] sm:max-h-[70vh] md:aspect-video md:min-h-[400px] md:max-h-[90vh]">
        <div className="absolute inset-0">
          <VideoHero videoId="9f32426787cbe2b26a14642463b7b817" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="container mx-auto px-4 sm:px-6 text-center max-w-6xl">
            <div className="space-y-2 sm:space-y-4 md:space-y-8">
              <div className="flex justify-center">
                <span className="section-label">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
                  3rd Generation · Family Owned · Since 1968
                </span>
              </div>
              <h1 className="text-xl min-[380px]:text-2xl min-[480px]:text-3xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-1 sm:mb-2 md:mb-4 leading-tight premium-heading px-2">
                Crafting Calgary&apos;s Future — One Build at a Time
              </h1>
              <p className="text-[11px] min-[380px]:text-xs min-[480px]:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl premium-silver-text font-bold mb-2 sm:mb-4 md:mb-6 lg:mb-8 px-2">
                Family-owned since 1968 • Serving Calgary since 1997
              </p>
              <div className="flex flex-col min-[400px]:flex-row gap-2 sm:gap-4 justify-center items-center px-2">
                <Button asChild size="lg" className="btn-premium px-4 py-2.5 min-[480px]:px-6 sm:px-8 sm:py-6 text-xs min-[480px]:text-sm sm:text-base md:text-lg uppercase tracking-wider w-full min-[400px]:w-auto">
                  <Link href="/get-quote">Get a Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-silver/50 bg-black/65 hover:bg-black/75 hover:border-silver text-silver px-4 py-2.5 min-[480px]:px-6 sm:px-8 sm:py-6 text-xs min-[480px]:text-sm sm:text-base md:text-lg uppercase tracking-wider w-full min-[400px]:w-auto">
                  <Link href="/services">View Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="bg-[#0A0A0A] border-b border-silver/[0.07] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/35 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { number: "55+", label: "Years in Business" },
              { number: "1997", label: "Serving Calgary" },
              { number: "2,400+", label: "Projects Done" },
              { number: "3rd", label: "Generation" },
            ].map((stat, i) => (
              <div key={stat.label} className={`text-center px-2 sm:px-4 md:px-6 lg:px-10 py-5 sm:py-7 md:py-8 border-silver/[0.07] ${
                i === 1 ? 'border-l' :
                i === 2 ? 'border-t border-t-silver/[0.07] sm:border-t-0 sm:border-l' :
                i === 3 ? 'border-t border-t-silver/[0.07] border-l sm:border-t-0' :
                ''
              }`}>
                <div className="text-xl sm:text-3xl md:text-4xl font-display font-black text-white mb-1" style={{ textShadow: '0 0 20px hsla(22,100%,63%,0.25)' }}>{stat.number}</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-white/35 uppercase tracking-[0.12em] sm:tracking-[0.2em] font-bold leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-14 sm:py-20 md:py-24 bg-black relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212,175,55,0.1) 2px, rgba(212,175,55,0.1) 4px)`, backgroundSize: '100px 100px' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex justify-center mb-4">
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
                Residential &amp; Commercial
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading">
              Our Services
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mx-auto mb-5 rounded-full" style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }}></div>
            <p className="text-sm sm:text-base text-white/45 max-w-2xl mx-auto leading-relaxed px-2">
              Comprehensive construction and renovation services for residential and commercial projects in Calgary — {BRAND_CONFIG.motto}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {featuredServices.map((service, idx) => {
              const imagePath = serviceImageMap[service.id] || "/service-millwork.png";
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="group relative rounded-2xl overflow-hidden border border-silver/10 bg-[#080808] shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:border-primary/30 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-40 sm:h-48 md:h-52 w-full overflow-hidden shrink-0">
                    <Image
                      src={imagePath}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    {/* Ghost number */}
                    <span className="absolute top-3 right-4 text-5xl font-black text-white/[0.07] select-none pointer-events-none leading-none">{String(idx + 1).padStart(2, '0')}</span>
                    {/* Bottom label */}
                    <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-end justify-between">
                      <h3 className="font-display font-black text-white text-lg uppercase tracking-tight leading-tight">{service.title}</h3>
                      <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 group-hover:bg-primary/35 transition-colors">
                        <ArrowRight className="h-3.5 w-3.5 text-primary" />
                      </div>
                    </div>
                    {/* Top-right corner accent */}
                    <div className="absolute top-0 right-0 w-8 h-[2px] bg-primary/40 group-hover:bg-primary/70 transition-colors"></div>
                    <div className="absolute top-0 right-0 w-[2px] h-8 bg-primary/40 group-hover:bg-primary/70 transition-colors"></div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col gap-3">
                    <p className="text-sm text-white/45 leading-relaxed flex-1">{service.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-primary/60 group-hover:text-primary uppercase tracking-widest transition-colors">
                      Learn More <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <Button asChild variant="outline" className="border border-silver/20 bg-transparent hover:bg-white/[0.03] hover:border-silver/40 text-white/60 hover:text-white uppercase tracking-widest text-xs px-8 py-3 h-auto transition-all">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Basement Promo */}
      <section className="py-14 sm:py-20 md:py-24 bg-[#080808] relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212,175,55,0.1) 2px, rgba(212,175,55,0.1) 4px)`, backgroundSize: '100px 100px' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative w-full aspect-[4/3] max-w-lg mx-auto rounded-2xl overflow-hidden border border-silver/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
                <Image
                  src="/basementdevservice5.png"
                  alt="Full basement renovation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-primary text-black px-3 py-1.5 rounded-full" style={{ boxShadow: '0 0 20px hsla(22,100%,63%,0.4)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-black/30 shrink-0"></span>
                    Limited Time
                  </span>
                </div>
                {/* Corner accents */}
                <div className="absolute bottom-0 left-0 w-10 h-[2px] bg-silver/25"></div>
                <div className="absolute bottom-0 left-0 w-[2px] h-10 bg-silver/25"></div>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2 relative">
              <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent rounded-full hidden lg:block pointer-events-none"></div>
              <div className="lg:pl-8">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <span className="section-label">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
                    Special Offer
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white mb-3 uppercase tracking-tight premium-heading">
                  Basement Developments
                </h2>
                <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mb-5 rounded-full" style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }}></div>
                <p className="text-base sm:text-lg font-black text-primary/90 mb-4">
                  15% off full basement renovations — for a limited time.
                </p>
                <p className="text-white/50 text-sm sm:text-base mb-7 leading-relaxed max-w-lg">
                  Turn your basement into livable space with turnkey development: framing, electrical, plumbing rough-ins, drywall, flooring, and finishes. Permits handled. Get a quote and lock in 15% off.
                </p>
                <ul className="space-y-3 mb-8 max-w-md">
                  {["Turnkey development", "Permits & inspections handled", "Moisture control & waterproofing"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-white/65">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-primary/[0.12] border border-primary/30 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary block"></span>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild className="btn-premium uppercase tracking-widest text-xs sm:text-sm px-8 py-3 h-auto">
                  <Link href="/get-quote/basement">Get 15% Off — Request Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-14 sm:py-20 md:py-24 bg-black relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212,175,55,0.1) 2px, rgba(212,175,55,0.1) 4px)`, backgroundSize: '100px 100px' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex justify-center mb-4">
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
                Three Generations of Excellence
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading">
              Why Work With Us
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mx-auto mb-5 rounded-full" style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }}></div>
            <p className="text-sm sm:text-base text-white/45 max-w-xl mx-auto leading-relaxed px-2">
              Family values and uncompromising quality have defined us since 1968.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {whyUs.map((item, index) => (
              <div key={item.title} className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#080808] shadow-[0_4px_24px_rgba(0,0,0,0.4)] p-5 sm:p-6 lg:p-7">
                {/* Left orange accent */}
                <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/60 via-primary/20 to-transparent pointer-events-none"></div>
                {/* Ghost number */}
                <span className="absolute top-4 right-5 text-6xl font-black text-white/[0.04] select-none pointer-events-none leading-none">{String(index + 1).padStart(2, '0')}</span>
                {/* Icon circle */}
                <div className="w-12 h-12 rounded-xl bg-primary/[0.08] border border-primary/15 flex items-center justify-center mb-5">
                  <item.icon className="h-6 w-6 text-primary/70" />
                </div>
                <div className="h-[2px] w-8 bg-gradient-to-r from-primary/50 to-transparent mb-4 rounded-full"></div>
                <h3 className="font-display font-black text-white text-base uppercase tracking-tight mb-2 premium-heading">{item.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Offers */}
      <section className="py-14 sm:py-20 md:py-24 bg-[#080808] relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212,175,55,0.1) 2px, rgba(212,175,55,0.1) 4px)`, backgroundSize: '100px 100px' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex justify-center mb-4">
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
                Save More, Build More
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading">
              Exclusive Offers &amp; Guarantees
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mx-auto mb-5 rounded-full" style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }}></div>
            <p className="text-sm sm:text-base text-white/45 max-w-2xl mx-auto leading-relaxed px-2">
              Limited-time pricing and guarantees to help you save on your build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-start">

            {/* Card A — Guarantee */}
            <div className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#050505] shadow-[0_4px_24px_rgba(0,0,0,0.5)] p-6 sm:p-7">
              <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-silver/35 via-silver/10 to-transparent pointer-events-none"></div>
              <div className="mb-5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest border border-silver/20 text-silver/60 px-3 py-1 rounded-full">Guarantee</span>
              </div>
              <h3 className="font-display font-black text-white text-xl uppercase tracking-tight mb-3 premium-heading">5% Price Beat Guarantee</h3>
              <div className="h-[2px] w-8 bg-gradient-to-r from-silver/40 to-transparent mb-4 rounded-full"></div>
              <p className="text-sm text-white/45 leading-relaxed mb-5">
                Send us any estimate from a reputable supplier — we&apos;ll beat it by at least 5%.
              </p>
              <ul className="space-y-2.5 mb-7">
                {["Applies to major suppliers", "24-hour response", "No hidden fees"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-white/55">
                    <span className="shrink-0 w-4 h-4 rounded-full bg-silver/[0.08] border border-silver/20 flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-silver/60 block"></span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="w-full border border-silver/20 bg-transparent hover:bg-white/[0.03] hover:border-silver/40 text-white/60 hover:text-white uppercase tracking-widest text-xs h-auto py-2.5 transition-all">
                <Link href="/get-quote">Get a Quote</Link>
              </Button>
            </div>

            {/* Card B — Most Popular (orange) */}
            <div className="relative rounded-2xl overflow-hidden border border-primary/25 bg-[#050505] p-6 sm:p-8 md:-mt-3 md:mb-[-12px]" style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.6), 0 0 40px hsla(22,100%,63%,0.06)' }}>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none"></div>
              <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent pointer-events-none"></div>
              <div className="mb-5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-primary text-black px-3 py-1 rounded-full" style={{ boxShadow: '0 0 12px hsla(22,100%,63%,0.3)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-black/30 shrink-0"></span>
                  Most Popular
                </span>
              </div>
              <h3 className="font-display font-black text-white text-xl uppercase tracking-tight mb-3 premium-heading">Bundle &amp; Save (Supply + Install)</h3>
              <div className="h-[2px] w-8 bg-gradient-to-r from-primary to-transparent mb-4 rounded-full" style={{ boxShadow: '0 0 8px hsla(22,100%,63%,0.35)' }}></div>
              <p className="text-sm text-white/45 leading-relaxed mb-2">
                Bundle materials and installation for package pricing that can save thousands.
              </p>
              <p className="text-sm font-black text-primary/90 mb-5">15% off when you bundle supply + install</p>
              <ul className="space-y-2.5 mb-7">
                {["Flooring + install", "Cabinets + countertops + install", "Full Bathroom renovation"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-white/55">
                    <span className="shrink-0 w-4 h-4 rounded-full bg-primary/[0.12] border border-primary/30 flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-primary block"></span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full btn-premium uppercase tracking-widest text-xs h-auto py-2.5">
                <Link href="/get-quote/bundle">Get 15% Off — Request Quote</Link>
              </Button>
            </div>

            {/* Card C — Limited Time */}
            <div className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#050505] shadow-[0_4px_24px_rgba(0,0,0,0.5)] p-6 sm:p-7">
              <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-silver/35 via-silver/10 to-transparent pointer-events-none"></div>
              <div className="mb-5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest border border-silver/20 text-silver/60 px-3 py-1 rounded-full">Limited Time</span>
              </div>
              <h3 className="font-display font-black text-white text-xl uppercase tracking-tight mb-3 premium-heading">Limited-Time Supplier Discounts</h3>
              <div className="h-[2px] w-8 bg-gradient-to-r from-silver/40 to-transparent mb-4 rounded-full"></div>
              <p className="text-sm text-white/45 leading-relaxed mb-2">
                Special pricing on select materials while inventory lasts.
              </p>
              <p className="text-sm font-black text-silver/65 mb-5">10% off select materials — request a quote</p>
              <ul className="space-y-2.5 mb-7">
                {["Quartz & porcelain", "LVP & laminate", "Hardware & fixtures"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-white/55">
                    <span className="shrink-0 w-4 h-4 rounded-full bg-silver/[0.08] border border-silver/20 flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-silver/60 block"></span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="w-full border border-silver/20 bg-transparent hover:bg-white/[0.03] hover:border-silver/40 text-white/60 hover:text-white uppercase tracking-widest text-xs h-auto py-2.5 transition-all">
                <Link href="/get-quote/supplier-deals">Get 10% Off — Request Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="py-14 sm:py-20 md:py-24 bg-black relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212,175,55,0.1) 2px, rgba(212,175,55,0.1) 4px)`, backgroundSize: '100px 100px' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex justify-center mb-4">
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
                Premium Materials Only
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading">
              Trusted Brands We Supply &amp; Work With
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mx-auto mb-5 rounded-full" style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }}></div>
            <p className="text-sm sm:text-base text-white/45 max-w-2xl mx-auto leading-relaxed px-2">
              We use premium materials from the industry's most trusted brands.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
            {[
              { name: "Olympia Tile", file: "olympiatile.png" },
              { name: "Shaw Flooring", file: "shawfloors.png" },
              { name: "Caesarstone", file: "ceasarstonenew.png" },
              { name: "Benjamin Moore", file: "bejaminmoorenew.png" },
              { name: "Silestone", file: "silestonenew.png" },
              { name: "James Hardie", file: "jameshardie.png" },
            ].map((brand) => (
              <div
                key={brand.name}
                className="relative h-24 sm:h-28 bg-white rounded-xl border border-silver/15 hover:border-primary/20 hover:shadow-[0_0_20px_hsla(22,100%,63%,0.08)] transition-all duration-300 flex items-center justify-center overflow-hidden group"
              >
                <Image
                  src={`/${brand.file}`}
                  alt={brand.name}
                  fill
                  className="object-contain p-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 sm:py-20 md:py-24 bg-[#080808] relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212,175,55,0.1) 2px, rgba(212,175,55,0.1) 4px)`, backgroundSize: '100px 100px' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex justify-center mb-4">
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
                Client Stories
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading">
              What Our Customers Say
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mx-auto mb-5 rounded-full" style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }}></div>
            <p className="text-sm sm:text-base text-white/45 max-w-xl mx-auto leading-relaxed px-2">
              Real feedback from families we&apos;ve had the honor of serving.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#050505] shadow-[0_4px_24px_rgba(0,0,0,0.5)] p-5 sm:p-6 md:p-7 flex flex-col">
                <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/50 via-primary/15 to-transparent pointer-events-none"></div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" style={{ filter: 'drop-shadow(0 0 4px hsla(22,100%,63%,0.5))' }} />
                  ))}
                </div>
                {/* Large quote mark */}
                <div className="text-5xl font-display font-black text-primary/20 leading-none mb-3 select-none">&ldquo;</div>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed flex-1 mb-5">{testimonial.text}</p>
                <div className="pt-4 border-t border-silver/[0.07]">
                  <p className="font-black text-white text-sm uppercase tracking-wide">{testimonial.name}</p>
                  <p className="text-xs text-white/35 mt-0.5">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bold CTA Strip */}
      <section className="py-16 sm:py-20 md:py-24 cta-warm-bg relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver/20 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center relative z-10">
          <span className="section-label mb-5 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
            Free Quote · No Obligation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black mb-4 sm:mb-5 uppercase tracking-tight premium-heading mt-4 sm:mt-5">
            Ready to Build?
          </h2>
          <p className="text-white/60 text-sm sm:text-base md:text-lg mb-8 sm:mb-10 max-w-xl mx-auto px-2">
            No pressure, no obligation. Tell us about your project and we&apos;ll get back to you within 24 hours.
          </p>
          <div className="flex flex-col min-[400px]:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button asChild size="lg" className="btn-premium px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base uppercase tracking-wider w-full min-[400px]:w-auto">
              <Link href="/get-quote">Get a Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-silver/40 bg-transparent hover:bg-black/50 hover:border-silver text-silver px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base uppercase tracking-wider w-full min-[400px]:w-auto">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AI Chat */}
      <section className="py-14 sm:py-20 md:py-24 bg-black text-white relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(212,175,55,0.1) 2px, rgba(212,175,55,0.1) 4px)`, backgroundSize: '100px 100px' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-4xl relative z-10">
          <div className="flex justify-center mb-4">
            <span className="section-label">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
              Powered by AI · Available 24/7
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-4 uppercase tracking-tight premium-heading">
            Need Help Planning Your Project?
          </h2>
          <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mx-auto mb-5 rounded-full" style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }}></div>
          <p className="text-sm sm:text-base mb-10 text-white/45 leading-relaxed px-2">
            Ask our AI assistant about your construction project — get instant answers any time.
          </p>
          <AIChatAssistant />
        </div>
      </section>

    </div>
  );
}
