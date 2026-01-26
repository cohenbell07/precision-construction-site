"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { services } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { AIChatAssistant } from "@/components/AIChatAssistant";
import { CheckCircle, Star, Hammer, Award, Users } from "lucide-react";
import Hls from "hls.js";

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

  // Map service IDs to image paths
  const serviceImageMap: { [key: string]: string } = {
    cabinets: "/service-millwork.png",
    showers: "/service-steam-shower.png",
    countertops: "/service-countertops.png",
    basements: "/basement-development.png",
    carpentry: "/service-trim.png",
    garages: "/garage-deck-fence.png",
  };

  // Get featured services for "What We Do" section
  const featuredServices = services.filter((s) => 
    ["cabinets", "showers", "countertops", "basements", "carpentry", "garages"].includes(s.id)
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  // Initialize video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoSrc = "https://customer-wlq98rw65iepfe8g.cloudflarestream.com/9f32426787cbe2b26a14642463b7b817/manifest/video.m3u8";

    // Set video properties
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto";
    video.muted = true;

    const initVideo = () => {
      try {
        if (typeof Hls !== "undefined" && Hls.isSupported()) {
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: false,
          });
          hlsRef.current = hls;
          hls.loadSource(videoSrc);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch((err) => {
              console.log("Autoplay prevented:", err);
            });
          });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          // Native HLS support (Safari)
          video.src = videoSrc;
          video.play().catch((err) => {
            console.log("Autoplay prevented:", err);
          });
        }
      } catch (err) {
        console.error("Video initialization error:", err);
      }
    };

    initVideo();

    return () => {
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch (e) {
          // Ignore destroy errors
        }
        hlsRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Full-width video with overlay */}
      <section className="relative w-full bg-black overflow-hidden" style={{ maxHeight: "600px", minHeight: "300px" }}>
        <div className="relative w-full h-full" style={{ aspectRatio: "16/9", maxHeight: "600px" }}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            autoPlay
            loop
            muted
            preload="auto"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="container mx-auto px-4 sm:px-6 text-center max-w-6xl">
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {/* Headline with premium gold gradient effect */}
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black text-white mb-2 sm:mb-4 leading-tight premium-heading drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] px-2">
                Crafting Calgary&apos;s Future — One Build at a Time
              </h1>
              
              {/* Subheading with gold accent */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl premium-gold-text font-bold mb-4 sm:mb-6 md:mb-8 drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] px-2">
                Family-owned since 1968 • Serving Calgary since 1997
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2">
                <Button asChild size="lg" className="btn-premium px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base md:text-lg uppercase tracking-wider w-full sm:w-auto">
                  <Link href="/get-quote">Get a Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-gold/50 bg-black/50 hover:bg-black/70 hover:border-gold text-gold backdrop-blur-sm px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base md:text-lg uppercase tracking-wider w-full sm:w-auto">
                  <Link href="/services">View Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section - Service Categories */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-black relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black text-white mb-3 sm:mb-4 uppercase tracking-tight premium-heading">
              Our Services
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg text-white max-w-3xl mx-auto premium-text mb-3 sm:mb-4 px-2">
              Comprehensive construction and renovation services for residential and commercial projects in Calgary.
            </p>
            <p className="text-sm sm:text-base md:text-lg premium-gold-text font-bold max-w-3xl mx-auto uppercase tracking-wide px-2">
              {BRAND_CONFIG.motto} — From flooring to full home renovations, we deliver quality you can trust.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {featuredServices.map((service) => {
              const imagePath = serviceImageMap[service.id] || "/service-millwork.png";
              return (
                <Link key={service.id} href={`/services/${service.id}`}>
                  <Card className="card-premium h-full overflow-hidden group cursor-pointer transition-all duration-300 border-gold/30 bg-black/50 backdrop-blur-sm">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={imagePath}
                        alt={service.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    </div>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-2xl font-display font-black text-white mb-2 uppercase tracking-tight premium-heading-sm">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-white/90 leading-relaxed premium-text">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="premium-gold-text font-bold uppercase tracking-wide text-sm group-hover:underline inline-flex items-center gap-2">
                        Learn More <span className="transition-all duration-300">→</span>
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="border-2 border-gold/50 bg-black/50 hover:bg-black/70 hover:border-gold text-gold backdrop-blur-sm">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent shadow-[0_0_30px_rgba(212,175,55,0.4)]"></div>

      {/* Why Work With Us */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#1F1F1F] relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black text-white mb-3 sm:mb-4 uppercase tracking-tight premium-heading">
              Why Work With Us
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg text-white max-w-2xl mx-auto premium-text px-2">
              Three generations of excellence, family values, and uncompromising quality
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {whyUs.map((item) => (
              <div key={item.title}>
                <Card className="card-premium h-full text-center border-gold/30 bg-black/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full"></div>
                      <item.icon className="h-16 w-16 mx-auto text-gold relative z-10 drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
                    </div>
                    <CardTitle className="text-xl font-display font-black text-white mb-3 uppercase tracking-tight premium-heading-sm">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/90 leading-relaxed premium-text">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent shadow-[0_0_30px_rgba(212,175,55,0.4)]"></div>

      {/* Exclusive Offers Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-black relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white mb-3 sm:mb-4 uppercase tracking-tight premium-heading">
              Exclusive Offers & Guarantees
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg text-white max-w-3xl mx-auto premium-text px-2">
              Limited-time pricing and guarantees to help you save on your build.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {/* Deal A - Trust Builder */}
            <Card className="card-premium border-gold/30 bg-black/60 backdrop-blur-sm hover:border-gold/50 hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wide bg-gold/20 text-gold px-3 py-1 rounded-full border border-gold/40">
                    Guarantee
                  </span>
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  5% Price Beat Guarantee
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/90 premium-text mb-4">
                  Send us any estimate from a reputable supplier — we&apos;ll beat it by at least 5%.
                </CardDescription>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-gold mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                    <span className="text-white/90 premium-text text-sm">Applies to major suppliers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                    <span className="text-white/90 premium-text text-sm">24-hour response</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                    <span className="text-white/90 premium-text text-sm">No hidden fees</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full btn-premium uppercase tracking-wider"
                >
                  <Link href="/products#quote-form">Submit a Quote</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Deal B - Best Value / Highlighted */}
            <Card className="card-premium border-gold/50 bg-black/70 backdrop-blur-sm hover:border-gold/70 hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] transition-all duration-300 scale-105 md:scale-105 lg:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wide bg-gold text-black px-3 py-1 rounded-full border border-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                    Most Popular
                  </span>
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  Bundle & Save (Supply + Install)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/90 premium-text mb-4">
                  Bundle materials and installation for package pricing that can save thousands.
                </CardDescription>
                <p className="text-sm text-white/70 mb-4">From $X (ask for today&apos;s rate)</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-gold mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                    <span className="text-white/90 premium-text text-sm">Flooring + install</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                    <span className="text-white/90 premium-text text-sm">Cabinets + countertops</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                    <span className="text-white/90 premium-text text-sm">Bathroom packages</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full btn-premium uppercase tracking-wider"
                >
                  <Link href={`/get-quote?product=${encodeURIComponent("Bundle Savings")}`}>
                    View Bundle Savings
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Deal C - Urgency */}
            <Card className="card-premium border-gold/30 bg-black/60 backdrop-blur-sm hover:border-gold/50 hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wide bg-gold/20 text-gold px-3 py-1 rounded-full border border-gold/40">
                    Limited Time
                  </span>
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  Limited-Time Supplier Discounts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/90 premium-text mb-4">
                  Special pricing on select materials while inventory lasts.
                </CardDescription>
                <p className="text-sm text-white/70 mb-4">From $X (ask for today&apos;s rate)</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-gold mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                    <span className="text-white/90 premium-text text-sm">Quartz & porcelain</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                    <span className="text-white/90 premium-text text-sm">LVP & laminate</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                    <span className="text-white/90 premium-text text-sm">Hardware & fixtures</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full btn-premium uppercase tracking-wider"
                >
                  <Link href={`/get-quote?product=${encodeURIComponent("Current Deals")}`}>
                    See Current Deals
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent shadow-[0_0_30px_rgba(212,175,55,0.4)]"></div>

      {/* Trusted Brands Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#1F1F1F] relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white mb-3 sm:mb-4 uppercase tracking-tight premium-heading">
              Trusted Brands We Supply & Work With
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg text-white max-w-3xl mx-auto premium-text px-2">
              We carry all major construction product lines and install with expert precision.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
            {[
              { name: "Olympia Tile", file: "olympiatile.png" },
              { name: "Shaw Flooring", file: "shawfloors.png" },
              { name: "Caesarstone", file: "ceasarstonenew.png" },
              { name: "CertainTeed", file: "certainteed.png" },
              { name: "Formica", file: "formica.png" },
              { name: "Benjamin Moore", file: "bejaminmoorenew.png" },
              { name: "Silestone", file: "silestonenew.png" },
              { name: "Arborite", file: "arborite.png" },
              { name: "James Hardie", file: "jameshardie.png" },
            ].map((brand) => (
              <div
                key={brand.name}
                className="relative h-24 sm:h-28 md:h-32 bg-white/95 border border-gold/30 rounded-xl backdrop-blur-sm hover:border-gold/60 hover:bg-white transition-all duration-300 flex items-center justify-center group overflow-hidden shadow-lg hover:shadow-xl"
              >
                <Image
                  src={`/${brand.file}`}
                  alt={brand.name}
                  fill
                  className="object-contain p-4 transition-all duration-300 opacity-80 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent shadow-[0_0_30px_rgba(212,175,55,0.4)]"></div>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#1F1F1F] relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black text-white mb-3 sm:mb-4 uppercase tracking-tight premium-heading">
              What Our Customers Say
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg text-white max-w-2xl mx-auto premium-text px-2">
              Real feedback from families we&apos;ve had the honor of serving
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name}>
                <Card className="card-premium h-full border-gold/30 bg-black/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-gold text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
                      ))}
                    </div>
                    <CardDescription className="text-base text-white/90 leading-relaxed premium-text">
                      {testimonial.text}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="font-black text-white uppercase tracking-wide premium-heading-sm">{testimonial.name}</p>
                    <p className="text-sm text-white/70">{testimonial.location}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent shadow-[0_0_30px_rgba(212,175,55,0.4)]"></div>

      {/* Project Gallery Teaser - Restored Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-black relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-4 sm:mb-6 text-white uppercase tracking-tight premium-heading">
                See Our Work
              </h2>
              <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold to-transparent mb-4 sm:mb-6 md:mb-8 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
              <p className="text-white mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base md:text-lg leading-relaxed premium-text">
                Browse our portfolio of completed projects. From custom kitchens to commercial
                renovations, we bring your vision to life.
              </p>
              <Button asChild size="lg" className="btn-premium uppercase tracking-wider text-sm sm:text-base px-6 py-4 sm:px-8 sm:py-6">
                <Link href="/projects">View Gallery</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              <div className="relative h-40 sm:h-48 md:h-56 rounded-xl overflow-hidden shadow-2xl group border border-gold/20">
                <Image
                  src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80"
                  alt="Kitchen renovation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="relative h-40 sm:h-48 md:h-56 rounded-xl overflow-hidden shadow-2xl group mt-6 sm:mt-8 border border-gold/20">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Bathroom renovation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="relative h-40 sm:h-48 md:h-56 rounded-xl overflow-hidden shadow-2xl group border border-gold/20">
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80"
                  alt="Custom cabinets"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="relative h-40 sm:h-48 md:h-56 rounded-xl overflow-hidden shadow-2xl group mt-6 sm:mt-8 border border-gold/20">
                <Image
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
                  alt="Flooring installation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent shadow-[0_0_30px_rgba(212,175,55,0.4)]"></div>

      {/* AI Chat Assistant */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#1F1F1F] text-white relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-4xl relative z-10">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-3 sm:mb-4 uppercase tracking-tight premium-heading">
              Need Help Planning Your Project?
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
          </div>
          <p className="text-sm sm:text-base md:text-lg mb-8 sm:mb-10 md:mb-12 text-white premium-text text-center px-2">
            Ask our AI assistant about your construction project
          </p>
          <AIChatAssistant />
        </div>
      </section>
    </div>
  );
}
