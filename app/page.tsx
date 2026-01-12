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

    const videoSrc = "https://customer-wlq98rw65iepfe8g.cloudflarestream.com/b9b4746e21a5e892f558d197f91dc068/manifest/video.m3u8";

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
      <section className="relative w-full bg-black overflow-hidden" style={{ maxHeight: "600px", minHeight: "400px" }}>
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
          <div className="container mx-auto px-4 text-center max-w-6xl">
            <div className="space-y-8">
              {/* Headline with premium gold gradient effect */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white mb-4 leading-tight premium-heading drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                Crafting Calgary&apos;s Future — One Build at a Time
              </h1>
              
              {/* Subheading with gold accent */}
              <p className="text-lg md:text-xl lg:text-2xl premium-gold-text font-bold mb-8 drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]">
                Family-owned since 1968 • Serving Calgary since 1997
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="btn-premium px-8 py-6 text-lg uppercase tracking-wider">
                  <Link href="/get-quote">Get a Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-gold/50 bg-black/50 hover:bg-black/70 hover:border-gold text-gold backdrop-blur-sm px-8 py-6 text-lg uppercase tracking-wider">
                  <Link href="/services">View Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section - Service Categories */}
      <section className="py-24 bg-black relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading">
              What We Do
            </h2>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
            <p className="text-lg text-white max-w-3xl mx-auto premium-text mb-4">
              Comprehensive construction and renovation services for residential and commercial projects in Calgary.
            </p>
            <p className="text-lg premium-gold-text font-bold max-w-3xl mx-auto uppercase tracking-wide">
              {BRAND_CONFIG.motto} — From flooring to full home renovations, we deliver quality you can trust.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => {
              const imagePath = serviceImageMap[service.id] || "/service-millwork.png";
              return (
                <Link key={service.id} href={`/services/${service.id}`}>
                  <Card className="card-premium h-full overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 border-gold/30 bg-black/50 backdrop-blur-sm">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={imagePath}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
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
      <section className="py-24 bg-[#1F1F1F] relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading">
              Why Work With Us
            </h2>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
            <p className="text-lg text-white max-w-2xl mx-auto premium-text">
              Three generations of excellence, family values, and uncompromising quality
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Trusted Brands Section */}
      <section className="py-24 bg-[#1F1F1F] relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading">
              Trusted Brands We Supply & Work With
            </h2>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
            <p className="text-lg text-white max-w-3xl mx-auto premium-text">
              We carry all major construction product lines and install with expert precision.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Olympia Tile", file: "olympiatile.png" },
              { name: "Shaw Flooring", file: "shawfloors.png" },
              { name: "Caesarstone", file: "caesarstone.png" },
              { name: "CertainTeed", file: "certainteed.png" },
              { name: "Formica", file: "formica.png" },
              { name: "Benjamin Moore", file: "benjaminmoore.png" },
              { name: "Silestone", file: "silestone.png" },
              { name: "Arborite", file: "arborite.png" },
              { name: "James Hardie", file: "jameshardie.png" },
            ].map((brand) => (
              <div
                key={brand.name}
                className="relative h-32 bg-black/50 border border-gold/20 rounded-xl backdrop-blur-sm hover:border-gold/40 hover:bg-black/70 transition-all duration-300 flex items-center justify-center group grayscale hover:grayscale-0 overflow-hidden"
              >
                <Image
                  src={`/${brand.file}`}
                  alt={brand.name}
                  fill
                  className="object-contain p-4 transition-all duration-300"
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
      <section className="py-24 bg-[#1F1F1F] relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading">
              What Our Customers Say
            </h2>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
            <p className="text-lg text-white max-w-2xl mx-auto premium-text">
              Real feedback from families we&apos;ve had the honor of serving
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section className="py-24 bg-black relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6 text-white uppercase tracking-tight premium-heading">
                See Our Work
              </h2>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent mb-8 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
              <p className="text-white mb-10 text-lg leading-relaxed premium-text">
                Browse our portfolio of completed projects. From custom kitchens to commercial
                renovations, we bring your vision to life.
              </p>
              <Button asChild size="lg" className="btn-premium uppercase tracking-wider">
                <Link href="/projects">View Gallery</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="relative h-56 rounded-xl overflow-hidden shadow-2xl group border border-gold/20">
                <Image
                  src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80"
                  alt="Kitchen renovation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="relative h-56 rounded-xl overflow-hidden shadow-2xl group mt-8 border border-gold/20">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Bathroom renovation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="relative h-56 rounded-xl overflow-hidden shadow-2xl group border border-gold/20">
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80"
                  alt="Custom cabinets"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="relative h-56 rounded-xl overflow-hidden shadow-2xl group mt-8 border border-gold/20">
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
      <section className="py-24 bg-[#1F1F1F] text-white relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-4 uppercase tracking-tight premium-heading">
              Need Help Planning Your Project?
            </h2>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
          </div>
          <p className="text-lg mb-12 text-white premium-text text-center">
            Ask our AI assistant about your construction project
          </p>
          <AIChatAssistant />
        </div>
      </section>
    </div>
  );
}
