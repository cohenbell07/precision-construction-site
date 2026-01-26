"use client";

import { useState, useRef, useEffect } from "react";
import { services } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Hls from "hls.js";

// Map service IDs to image paths
const serviceImageMap: { [key: string]: string } = {
  cabinets: "/service-millwork.png",
  showers: "/service-steam-shower.png",
  countertops: "/service-countertops.png",
  basements: "/basement-development.png",
  carpentry: "/service-trim.png",
  flooring: "/flooring-service.png",
  framing: "/framing.png",
  drywall: "/drywall-texture.png",
  painting: "/painting.png",
  garages: "/garage-deck-fence.png",
  stone: "/stone-setting.png",
  renovations: "/home-additions.png",
  commercial: "/commercial-construction.png",
};

// Map service IDs to video URLs for hover previews
const serviceVideoMap: { [key: string]: string } = {
  showers: "https://customer-wlq98rw65iepfe8g.cloudflarestream.com/c7ad20b13ad2325c2e78adec62e4f81f/manifest/video.m3u8",
  cabinets: "https://customer-wlq98rw65iepfe8g.cloudflarestream.com/100b6c723854a0a992f973b0e64f7614/manifest/video.m3u8",
  countertops: "https://customer-wlq98rw65iepfe8g.cloudflarestream.com/e78cf24b44a9ce21c0ecad06407a8b9d/manifest/video.m3u8",
};

// Service Video Component
function ServiceVideoPreview({ 
  serviceId, 
  imagePath, 
  altText, 
  isHovered 
}: { 
  serviceId: string; 
  imagePath: string; 
  altText: string; 
  isHovered: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const videoSrc = serviceVideoMap[serviceId];

  useEffect(() => {
    if (!videoSrc || !videoRef.current) return;

    const video = videoRef.current;

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
            video.muted = true;
            video.playsInline = true;
          });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = videoSrc;
          video.muted = true;
          video.playsInline = true;
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
  }, [videoSrc]);

  useEffect(() => {
    if (!videoRef.current || !videoSrc) return;

    const video = videoRef.current;

    if (isHovered && !hasPlayed) {
      setShowVideo(true);
      video.currentTime = 0;
      video.play().catch((err) => {
        console.log("Video play prevented:", err);
        setShowVideo(false);
      });
    } else if (!isHovered && showVideo) {
      video.pause();
      setShowVideo(false);
      setHasPlayed(false);
    }
  }, [isHovered, hasPlayed, showVideo, videoSrc]);

  const handleVideoEnd = () => {
    setShowVideo(false);
    setHasPlayed(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  if (!videoSrc) {
    return (
      <Image
        src={imagePath}
        alt={altText}
        fill
        className="object-cover"
        loading="lazy"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    );
  }

  return (
    <>
      <Image
        src={imagePath}
        alt={altText}
        fill
        className={`object-cover transition-opacity duration-500 ${
          showVideo ? "opacity-0" : "opacity-100"
        }`}
        loading="lazy"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          showVideo ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        muted
        playsInline
        onEnded={handleVideoEnd}
        style={{ aspectRatio: "1/1" }}
      />
    </>
  );
}

export default function ServicesPage() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  // Generate descriptive alt text based on service
  const altTextMap: { [key: string]: string } = {
    framing: "Framing project in progress",
    drywall: "Drywall, taping and ceiling texture work",
    painting: "Interior and exterior painting services",
    basements: "Basement development and finishing",
    garages: "Garage, deck and fence construction",
    stone: "Natural stone and stone setting installation",
    renovations: "Home additions and full home renovations",
    commercial: "Commercial and multi-unit construction project",
    cabinets: "Custom cabinets and millwork",
    showers: "Custom showers and steam showers",
    countertops: "Premium countertop installation",
    carpentry: "Interior finishing and carpentry work",
    flooring: "Premium flooring installation",
  };

  // Reorder services: move flooring after cabinets
  const reorderedServices = [...services];
  const flooringIndex = reorderedServices.findIndex(s => s.id === "flooring");
  const cabinetsIndex = reorderedServices.findIndex(s => s.id === "cabinets");
  
  if (flooringIndex !== -1 && cabinetsIndex !== -1) {
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
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-7xl relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-4 sm:mb-6 text-white uppercase tracking-tight premium-heading">
            Our Services
          </h1>
          <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white max-w-3xl mx-auto mb-3 sm:mb-4 leading-relaxed premium-text px-2">
            From flooring to full home renovations, we provide comprehensive construction services for
            residential and commercial projects in Calgary and surrounding areas.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl premium-gold-text font-bold max-w-3xl mx-auto uppercase tracking-wide px-2">
            {BRAND_CONFIG.motto}
          </p>
        </div>

        {/* Full-Width Alternating Showcase */}
        <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-32 mb-12 sm:mb-16 md:mb-20">
          {reorderedServices.map((service, index) => {
            const imagePath = serviceImageMap[service.id] || "/service-millwork.png";
            const altText = altTextMap[service.id] || service.title;
            const isEven = index % 2 === 0;

            return (
              <div key={service.id} className="relative">
                {/* Service Showcase Section */}
                <Link 
                  href={`/services/${service.id}`} 
                  className="block group"
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[400px] sm:min-h-[500px] lg:min-h-[650px]">
                    {/* Image Section */}
                    <div className={`relative w-full h-[300px] sm:h-[400px] lg:h-auto lg:min-h-[650px] ${isEven ? 'lg:order-1' : 'lg:order-2'} overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-transparent z-10"></div>
                      <ServiceVideoPreview
                        serviceId={service.id}
                        imagePath={imagePath}
                        altText={altText}
                        isHovered={hoveredService === service.id}
                      />
                      {/* Subtle vignette */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 z-10"></div>
                    </div>

                    {/* Content Section */}
                    <div className={`relative w-full ${isEven ? 'lg:order-2' : 'lg:order-1'} bg-black flex items-center p-6 sm:p-8 md:p-10 lg:p-14 xl:p-20 min-h-[300px] sm:min-h-[400px] lg:min-h-[650px]`}>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.03),transparent_70%)] pointer-events-none"></div>
                      <div className="w-full relative z-10">
                        <div className="mb-6 sm:mb-8">
                          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white mb-4 sm:mb-6 uppercase tracking-tight premium-heading group-hover:text-gold transition-colors duration-500">
                            {service.title}
                          </h2>
                          <div className="h-[2px] w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold to-transparent mb-4 sm:mb-6 md:mb-8 shadow-[0_0_20px_rgba(212,175,55,0.6)]"></div>
                        </div>
                        
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 leading-relaxed premium-text mb-6 sm:mb-8 font-medium">
                          {service.description}
                        </p>

                        {/* Key Points */}
                        {service.details && service.details.length > 0 && (
                          <div className="mb-6 sm:mb-8 md:mb-10">
                            <ul className="space-y-3 sm:space-y-4">
                              {service.details.slice(0, 4).map((detail, idx) => (
                                <li key={idx} className="flex items-start space-x-3 sm:space-x-4">
                                  <span className="text-gold mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                                  <span className="text-white/90 premium-text text-sm sm:text-base md:text-lg leading-relaxed">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* CTA */}
                        <div className="flex items-center gap-4 sm:gap-6 pt-3 sm:pt-4 border-t border-gold/20">
                          <span className="premium-gold-text font-bold uppercase tracking-wider text-xs sm:text-sm md:text-base inline-flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-110 cursor-pointer">
                            Learn More <span className="text-lg sm:text-xl">→</span>
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-gold/40 via-gold/60 to-transparent"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 md:mt-24 lg:mt-32 text-center">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-gold/30 p-6 sm:p-8 md:p-12 lg:p-20 bg-gradient-to-br from-black/80 via-[#1A1A1A]/90 to-black/80 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_60px_rgba(212,175,55,0.15)]">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black mb-4 sm:mb-6 md:mb-8 text-white uppercase tracking-tight premium-heading">
                Ready to Start Your Project?
              </h2>
              <div className="h-[2px] w-32 sm:w-40 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4 sm:mb-6 md:mb-8 shadow-[0_0_25px_rgba(212,175,55,0.7)]"></div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed premium-text font-medium px-2">
                We treat every client like family. Contact us today for a free consultation and quote.
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl premium-gold-text font-bold mb-6 sm:mb-8 md:mb-10 uppercase tracking-wide px-2">
                {BRAND_CONFIG.motto}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <Button asChild size="lg" className="gold-3d-button btn-glow px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider w-full sm:w-auto sm:min-w-[200px]">
                  <Link href="/get-quote">Request a Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-gold/50 bg-black/60 hover:bg-black/80 hover:border-gold text-gold backdrop-blur-sm px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wide w-full sm:w-auto sm:min-w-[200px] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-white/70 mt-6 sm:mt-8 font-medium px-2">
                {BRAND_CONFIG.contact.cta}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
