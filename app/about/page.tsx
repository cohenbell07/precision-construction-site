"use client";

import { useRef, useEffect } from "react";
import { BRAND_CONFIG } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Hls from "hls.js";
import { 
  Medal as PhosphorAward, 
  Users as PhosphorUsers, 
  Heart as PhosphorHeart, 
  CheckCircle as PhosphorCheckCircle,
  Wrench as PhosphorWrench,
  Buildings as PhosphorBuildings,
  Shield as PhosphorShield,
  GraduationCap as PhosphorCertificate,
  Handshake as PhosphorHandshake,
  Clock as PhosphorClock,
  MapPin as PhosphorMapPin,
  Star as PhosphorStar,
} from "phosphor-react";
import { Star, CheckCircle } from "lucide-react";

export default function AboutPage() {
  const yearsInCalgary = new Date().getFullYear() - BRAND_CONFIG.servingSince;
  const totalYears = new Date().getFullYear() - BRAND_CONFIG.established;
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  // Initialize video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoSrc = "https://customer-wlq98rw65iepfe8g.cloudflarestream.com/cfd853ff56a468be1c91e78ce77db01f/manifest/video.m3u8";

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

  const testimonials = [
    {
      name: "Emily Rodriguez",
      location: "Calgary",
      text: "The custom Murphy bed they built for our small space was perfect. Better quality and price than the big box stores, and John made sure we were completely satisfied.",
      rating: 5,
      projectType: "Custom Carpentry",
    },
    {
      name: "David Thompson",
      location: "SW Calgary",
      text: "Our basement development was completed on time and on budget. The team was professional, clean, and respectful of our home. We couldn't be happier with the results.",
      rating: 5,
      projectType: "Basement Development",
    },
    {
      name: "Lisa Anderson",
      location: "NE Calgary",
      text: "The steam shower installation was flawless. They handled all the permits, worked with our schedule, and the finished product is absolutely stunning. Highly recommend!",
      rating: 5,
      projectType: "Bathroom Renovation",
    },
  ];

  return (
    <div className="min-h-screen bg-black relative premium-bg-pattern">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
      {/* Hero Section with video */}
      <section className="relative w-full bg-black overflow-hidden min-h-[240px] sm:min-h-[300px] md:min-h-[400px] max-h-[90vh]">
        <div className="relative w-full min-h-[240px] aspect-video max-h-[600px]">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            autoPlay
            loop
            muted
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
          
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-3 sm:mb-4 md:mb-6 text-white uppercase tracking-tight premium-heading px-2">
                About {BRAND_CONFIG.shortName}
              </h1>
              <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-3 sm:mb-4 md:mb-6 shadow-[0_0_20px_rgba(232,232,232,0.5)]"></div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl premium-silver-text font-bold mb-2 sm:mb-3 md:mb-4 uppercase tracking-wide px-2">
                {BRAND_CONFIG.motto}
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-3xl mx-auto leading-relaxed premium-text px-2">
                {BRAND_CONFIG.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Statistics/Metrics Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#1F1F1F] relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-3 sm:mb-4 md:mb-6 text-white uppercase tracking-tight premium-heading">
              Our Track Record
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(232,232,232,0.5)]"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            <Card className="card-premium border-silver/30 bg-black/75  text-center">
              <CardContent className="pt-4 sm:pt-5 md:pt-6 px-3 sm:px-4">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black premium-silver-text mb-1 sm:mb-2">{totalYears}+</p>
                <p className="text-white font-black uppercase tracking-wide premium-heading-sm text-xs sm:text-sm md:text-base">Years in Business</p>
                <p className="text-white/70 text-xs sm:text-sm mt-1 sm:mt-2">Since {BRAND_CONFIG.established}</p>
              </CardContent>
            </Card>
            <Card className="card-premium border-silver/30 bg-black/75  text-center">
              <CardContent className="pt-4 sm:pt-5 md:pt-6 px-3 sm:px-4">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black premium-silver-text mb-1 sm:mb-2">3,500+</p>
                <p className="text-white font-black uppercase tracking-wide premium-heading-sm text-xs sm:text-sm md:text-base">Projects Completed</p>
                <p className="text-white/70 text-xs sm:text-sm mt-1 sm:mt-2">Residential & Commercial</p>
              </CardContent>
            </Card>
            <Card className="card-premium border-silver/30 bg-black/75  text-center">
              <CardContent className="pt-4 sm:pt-5 md:pt-6 px-3 sm:px-4">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black premium-silver-text mb-1 sm:mb-2">{yearsInCalgary}+</p>
                <p className="text-white font-black uppercase tracking-wide premium-heading-sm text-xs sm:text-sm md:text-base">Years in Calgary</p>
                <p className="text-white/70 text-xs sm:text-sm mt-1 sm:mt-2">Serving since {BRAND_CONFIG.servingSince}</p>
              </CardContent>
            </Card>
            <Card className="card-premium border-silver/30 bg-black/75  text-center">
              <CardContent className="pt-4 sm:pt-5 md:pt-6 px-3 sm:px-4">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black premium-silver-text mb-1 sm:mb-2">3rd</p>
                <p className="text-white font-black uppercase tracking-wide premium-heading-sm text-xs sm:text-sm md:text-base">Generation</p>
                <p className="text-white/70 text-xs sm:text-sm mt-1 sm:mt-2">Family-Owned Business</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-silver/50 to-transparent shadow-[0_0_30px_rgba(232,232,232,0.4)]"></div>

      {/* Company History Timeline */}
      <section className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-3 sm:mb-4 md:mb-6 text-white uppercase tracking-tight premium-heading">
              Our Journey
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(232,232,232,0.5)]"></div>
          </div>

          <Card className="card-premium border-silver/30 p-4 sm:p-6 md:p-8 lg:p-12 bg-black/75 ">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-silver/30 via-silver to-silver/30 hidden md:block shadow-[0_0_20px_rgba(232,232,232,0.4)]"></div>
              
              {/* Timeline Points */}
              <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16">
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/2 md:pr-8 text-center md:text-right mb-4 md:mb-0">
                    <p className="text-2xl sm:text-3xl md:text-4xl font-display font-black premium-silver-text mb-1 sm:mb-2">{BRAND_CONFIG.established}</p>
                    <p className="text-white font-black uppercase tracking-wide premium-heading-sm text-sm sm:text-base md:text-lg">Family Construction Begins</p>
                    <p className="text-white/70 text-xs sm:text-sm mt-1">3rd generation family business established</p>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-silver rounded-full border-4 border-black shadow-[0_0_20px_rgba(232,232,232,0.6)] hidden md:block"></div>
                  <div className="w-full md:w-1/2 md:pl-8"></div>
                </div>
                
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/2 md:pr-8"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-silver rounded-full border-4 border-black shadow-[0_0_20px_rgba(232,232,232,0.6)] hidden md:block"></div>
                  <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left mb-4 md:mb-0">
                    <p className="text-2xl sm:text-3xl md:text-4xl font-display font-black premium-silver-text mb-1 sm:mb-2">{BRAND_CONFIG.servingSince}</p>
                    <p className="text-white font-black uppercase tracking-wide premium-heading-sm text-sm sm:text-base md:text-lg">Calgary Operations Established</p>
                    <p className="text-white/70 text-xs sm:text-sm mt-1">Expanding to Calgary market</p>
                  </div>
                </div>
                
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/2 md:pr-8 text-center md:text-right mb-4 md:mb-0">
                    <p className="text-2xl sm:text-3xl md:text-4xl font-display font-black premium-silver-text mb-1 sm:mb-2">Today</p>
                    <p className="text-white font-black uppercase tracking-wide premium-heading-sm text-sm sm:text-base md:text-lg">Premium Commercial & Residential Service</p>
                    <p className="text-white/70 text-xs sm:text-sm mt-1">Continuing excellence in Calgary</p>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-silver rounded-full border-4 border-black shadow-[0_0_30px_rgba(232,232,232,0.8)] glow-silver hidden md:block"></div>
                  <div className="w-full md:w-1/2 md:pl-8"></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-silver/50 to-transparent shadow-[0_0_30px_rgba(232,232,232,0.4)]"></div>

      {/* Owner/Leadership Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#1F1F1F] relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-3 sm:mb-4 md:mb-6 text-white uppercase tracking-tight premium-heading">
              Meet Our Leadership
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(232,232,232,0.5)]"></div>
          </div>
          <div className="flex justify-center">
            <div className="max-w-2xl w-full">
              <Card className="card-premium border-silver/30 p-8 bg-black/75 ">
                <CardHeader>
                  <CardTitle className="text-3xl md:text-4xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading-sm">
                    {BRAND_CONFIG.owner}
                  </CardTitle>
                  <CardDescription className="text-lg premium-silver-text font-bold uppercase tracking-wide">
                    Owner & Lead Contractor
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white/90 leading-relaxed premium-text">
                    With decades of experience in the construction industry, {BRAND_CONFIG.owner} leads {BRAND_CONFIG.shortName} with a commitment to excellence and a personal touch that comes from family ownership.
                  </p>
                  <p className="text-white/90 leading-relaxed premium-text">
                    Growing up in a family construction business, {BRAND_CONFIG.owner} learned the trade from the ground up. He understands that every project is more than just a build—it&apos;s someone&apos;s home, someone&apos;s business, someone&apos;s dream.
                  </p>
                  <p className="text-white/90 leading-relaxed premium-text">
                    Every project receives his personal attention to ensure you get only the best — in service, quality, and satisfaction. His hands-on approach and commitment to treating every client like family has been the cornerstone of {BRAND_CONFIG.shortName}&apos;s success in Calgary.
                  </p>
                  <div className="pt-4 border-t border-silver/20">
                    <p className="text-sm text-white/80 premium-text">
                      <strong className="text-white">Direct Contact:</strong> {BRAND_CONFIG.contact.phoneFormatted} | {BRAND_CONFIG.contact.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-silver/50 to-transparent shadow-[0_0_30px_rgba(232,232,232,0.4)]"></div>

      {/* Pull Quote Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
          <Card className="card-premium border-silver/30 p-6 sm:p-8 md:p-10 lg:p-12 bg-black/75 ">
            <div className="text-center">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-black premium-silver-text mb-4 sm:mb-5 md:mb-6 italic leading-relaxed px-2">
                &quot;We treat every client like family — and every build like our own.&quot;
              </p>
              <p className="text-sm sm:text-base md:text-lg text-white/80 premium-text px-2">
                — {BRAND_CONFIG.owner}, Owner
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-silver/50 to-transparent shadow-[0_0_30px_rgba(232,232,232,0.4)]"></div>

      {/* Our Process/Workflow Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#1F1F1F] relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-3 sm:mb-4 md:mb-6 text-white uppercase tracking-tight premium-heading">
              How We Work
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(232,232,232,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg text-white max-w-3xl mx-auto premium-text px-2">
              Our proven process ensures your project runs smoothly from start to finish
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "We start with a free consultation to understand your vision, needs, and budget. This is where we get to know you and your project.",
              },
              {
                step: "02",
                title: "Planning & Design",
                description: "We create detailed plans, obtain necessary permits, and work with you to refine every detail before construction begins.",
              },
              {
                step: "03",
                title: "Execution",
                description: "Our skilled team brings your vision to life with precision craftsmanship, regular updates, and open communication throughout.",
              },
              {
                step: "04",
                title: "Follow-Up",
                description: "We conduct a final walkthrough, address any concerns, and stand behind our work with ongoing support and warranty.",
              },
            ].map((item) => (
              <Card key={item.step} className="card-premium border-silver/30 bg-black/75 ">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-silver/20 border-2 border-silver flex items-center justify-center">
                      <span className="text-silver font-black text-lg">{item.step}</span>
                    </div>
                    <CardTitle className="text-xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/90 leading-relaxed premium-text">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-silver/50 to-transparent shadow-[0_0_30px_rgba(232,232,232,0.4)]"></div>

      {/* Company Values/Mission Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-3 sm:mb-4 md:mb-6 text-white uppercase tracking-tight premium-heading">
              Our Values & Mission
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(232,232,232,0.5)]"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-10 md:mb-12">
            <Card className="card-premium border-silver/30 p-8 bg-black/75 ">
              <CardHeader>
                <CardTitle className="text-2xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading-sm">
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90 leading-relaxed premium-text mb-4">
                  To deliver exceptional construction and renovation services that exceed expectations, while building lasting relationships with every client we serve.
                </p>
                <p className="text-white/90 leading-relaxed premium-text">
                  We believe that construction is not just about building structures—it&apos;s about building trust, creating value, and making dreams come true. Every project is an opportunity to demonstrate our commitment to excellence and our family values.
                </p>
              </CardContent>
            </Card>
            <Card className="card-premium border-silver/30 p-8 bg-black/75 ">
              <CardHeader>
                <CardTitle className="text-2xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading-sm">
                  Our Core Values
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-silver mt-1 flex-shrink-0 drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                  <div>
                    <p className="font-black text-white premium-heading-sm">Integrity</p>
                    <p className="text-white/80 text-sm premium-text">Honest communication and transparent pricing in everything we do.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-silver mt-1 flex-shrink-0 drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                  <div>
                    <p className="font-black text-white premium-heading-sm">Quality</p>
                    <p className="text-white/80 text-sm premium-text">Only the best materials, craftsmanship, and attention to detail.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-silver mt-1 flex-shrink-0 drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                  <div>
                    <p className="font-black text-white premium-heading-sm">Family-First</p>
                    <p className="text-white/80 text-sm premium-text">Treating every client like family, not just a transaction.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-silver mt-1 flex-shrink-0 drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                  <div>
                    <p className="font-black text-white premium-heading-sm">Excellence</p>
                    <p className="text-white/80 text-sm premium-text">Continuous improvement and commitment to exceeding expectations.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-silver/50 to-transparent shadow-[0_0_30px_rgba(232,232,232,0.4)]"></div>

      {/* Quality Standards Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-3 sm:mb-4 md:mb-6 text-white uppercase tracking-tight premium-heading">
              Our Quality Standards
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(232,232,232,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg text-white max-w-3xl mx-auto premium-text px-2">
              We don&apos;t cut corners. Every project meets our exacting standards for materials, craftsmanship, and finish.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="card-premium border-silver/30 p-8 bg-black/75 ">
              <CardHeader>
                <CardTitle className="text-2xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading-sm">
                  Premium Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90 leading-relaxed premium-text mb-4">
                  We source only the finest materials from trusted suppliers. From premium hardwood and natural stone to high-grade fixtures and finishes, we never compromise on quality.
                </p>
                <ul className="space-y-2 text-white/90 premium-text">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-silver mt-0.5 flex-shrink-0 drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                    <span>Direct relationships with premium suppliers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-silver mt-0.5 flex-shrink-0 drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                    <span>Quality inspection before installation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-silver mt-0.5 flex-shrink-0 drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                    <span>Warranty-backed materials and workmanship</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="card-premium border-silver/30 p-8 bg-black/75 ">
              <CardHeader>
                <CardTitle className="text-2xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading-sm">
                  Quality Control Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90 leading-relaxed premium-text mb-4">
                  Every project undergoes rigorous quality checks at multiple stages. We conduct regular inspections, final walkthroughs, and follow-up visits to ensure everything meets our standards.
                </p>
                <ul className="space-y-2 text-white/90 premium-text">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-silver mt-0.5 flex-shrink-0 drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                    <span>Multi-stage quality inspections</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-silver mt-0.5 flex-shrink-0 drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                    <span>Owner review on every project</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-silver mt-0.5 flex-shrink-0 drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                    <span>Client approval at key milestones</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-silver/50 to-transparent shadow-[0_0_30px_rgba(232,232,232,0.4)]"></div>

      {/* Expanded Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-3 sm:mb-4 md:mb-6 text-white uppercase tracking-tight premium-heading">
              What Our Clients Say
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(232,232,232,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg text-white max-w-3xl mx-auto premium-text px-2">
              Real feedback from families and businesses we&apos;ve had the honor of serving across Calgary
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="card-premium border-silver/30 bg-black/75 ">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-silver text-silver drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                    ))}
                  </div>
                  <CardDescription className="text-base text-white/90 leading-relaxed premium-text">
                    {testimonial.text}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="font-black text-white uppercase tracking-wide premium-heading-sm mb-1">{testimonial.name}</p>
                  <p className="text-sm text-white/70 mb-2">{testimonial.location}</p>
                  <p className="text-xs text-silver uppercase tracking-wide font-bold">{testimonial.projectType}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-silver/50 to-transparent shadow-[0_0_30px_rgba(232,232,232,0.4)]"></div>

      {/* Calgary Community Focus Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#1F1F1F] relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-3 sm:mb-4 md:mb-6 text-white uppercase tracking-tight premium-heading">
              Built for Calgary
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(232,232,232,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg text-white max-w-3xl mx-auto premium-text px-2">
              As a Calgary-based family business, we&apos;re deeply invested in our community and committed to building relationships that last.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="card-premium border-silver/30 bg-black/75 ">
              <CardHeader>
                <div className="inline-flex items-center justify-center p-5 bg-silver/10 rounded-2xl border border-silver/30 mb-4 shadow-[0_0_20px_rgba(232,232,232,0.2)]">
                  <PhosphorMapPin className="h-12 w-12 text-silver drop-shadow-[0_0_15px_rgba(232,232,232,0.6)]" weight="duotone" />
                </div>
                <CardTitle className="text-2xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  Local Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/90 leading-relaxed premium-text">
                  We understand Calgary&apos;s unique building codes, climate considerations, and local market. Our experience with Calgary homes and businesses means we know what works best in our city.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="card-premium border-silver/30 bg-black/75 ">
              <CardHeader>
                <div className="inline-flex items-center justify-center p-5 bg-silver/10 rounded-2xl border border-silver/30 mb-4 shadow-[0_0_20px_rgba(232,232,232,0.2)]">
                  <PhosphorHandshake className="h-12 w-12 text-silver drop-shadow-[0_0_15px_rgba(232,232,232,0.6)]" weight="duotone" />
                </div>
                <CardTitle className="text-2xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  Community Commitment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/90 leading-relaxed premium-text">
                  We&apos;re not just building structures—we&apos;re building our community. Every project contributes to making Calgary a better place to live and work.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="card-premium border-silver/30 bg-black/75 ">
              <CardHeader>
                <div className="inline-flex items-center justify-center p-5 bg-silver/10 rounded-2xl border border-silver/30 mb-4 shadow-[0_0_20px_rgba(232,232,232,0.2)]">
                  <PhosphorUsers className="h-12 w-12 text-silver drop-shadow-[0_0_15px_rgba(232,232,232,0.6)]" weight="duotone" />
                </div>
                <CardTitle className="text-2xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  Lasting Relationships
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/90 leading-relaxed premium-text">
                  Many of our clients become repeat customers and friends. We&apos;ve built relationships that span decades, with families who trust us for multiple projects.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-silver/50 to-transparent shadow-[0_0_30px_rgba(232,232,232,0.4)]"></div>

      {/* Service Area Details Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-3 sm:mb-4 md:mb-6 text-white uppercase tracking-tight premium-heading">
              Service Areas
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(232,232,232,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg text-white max-w-3xl mx-auto premium-text px-2">
              We proudly serve Calgary and surrounding areas with the same quality and care
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { area: "Calgary (All Quadrants)", description: "NW, NE, SW, SE - Full service coverage" },
              { area: "Airdrie", description: "Residential and commercial projects" },
              { area: "Cochrane", description: "Custom builds and renovations" },
              { area: "Okotoks", description: "Home additions and developments" },
              { area: "Chestermere", description: "Waterfront and lake community projects" },
              { area: "Surrounding Areas", description: "Ask about service to your location" },
            ].map((item, idx) => (
              <Card key={idx} className="card-premium border-silver/30 bg-black/75 ">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <PhosphorMapPin className="h-6 w-6 text-silver mt-1 flex-shrink-0 drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                    <div>
                      <p className="font-black text-white premium-heading-sm mb-1">{item.area}</p>
                      <p className="text-sm text-white/70 premium-text">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-silver/50 to-transparent shadow-[0_0_30px_rgba(232,232,232,0.4)]"></div>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#1F1F1F] relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center relative z-10">
          <div className="card-premium border-silver/30 p-6 sm:p-8 md:p-12 lg:p-16 bg-black/75 ">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black mb-4 sm:mb-5 md:mb-6 text-white uppercase tracking-tight premium-heading px-2">
              Let&apos;s Build Something Together
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-4 sm:mb-5 md:mb-6 shadow-[0_0_20px_rgba(232,232,232,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-7 md:mb-8 max-w-2xl mx-auto leading-relaxed premium-text px-2">
              Experience the difference of working with a family-owned company that treats you like 
              family. Get a free consultation and see why Calgary trusts {BRAND_CONFIG.shortName}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center mb-4 sm:mb-5 md:mb-6">
              <Button asChild size="lg" className="btn-premium text-sm sm:text-base md:text-lg px-6 py-4 sm:px-8 sm:py-6 w-full sm:w-auto">
                <Link href="/get-quote">Request a Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-silver/50 bg-black/50 hover:bg-black/70 hover:border-silver text-silver  text-sm sm:text-base md:text-lg px-6 py-4 sm:px-8 sm:py-6 w-full sm:w-auto">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
            <p className="text-sm text-white/70">
              {BRAND_CONFIG.contact.cta}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
