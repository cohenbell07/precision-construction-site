"use client";

import { services } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Map service IDs to image paths
const serviceImageMap: { [key: string]: string } = {
  cabinets: "/service-millwork.png",
  showers: "/service-steam-shower.png",
  countertops: "/service-countertops.png",
  basements: "/basement-development.png",
  carpentry: "/service-trim.png",
  framing: "/framing.png",
  drywall: "/drywall-texture.png",
  painting: "/painting.png",
  garages: "/garage-deck-fence.png",
  stone: "/stone-setting.png",
  renovations: "/home-additions.png",
  commercial: "/commercial-construction.png",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black relative premium-bg-pattern">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
      <div className="container mx-auto px-4 py-20 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6 text-white uppercase tracking-tight premium-heading">
            Our Services
          </h1>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-4 leading-relaxed premium-text">
            From flooring to full home renovations, we provide comprehensive construction services for
            residential and commercial projects in Calgary and surrounding areas.
          </p>
          <p className="text-lg md:text-xl premium-gold-text font-bold max-w-3xl mx-auto uppercase tracking-wide">
            {BRAND_CONFIG.motto}
          </p>
        </div>

        {/* Services Grid - Large Square Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service) => {
            const imagePath = serviceImageMap[service.id] || "/service-millwork.png";
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
              flooring: "Professional flooring installation",
            };
            const altText = altTextMap[service.id] || service.title;
            
            return (
              <Link key={service.id} href={`/services/${service.id}`}>
                <Card className="card-premium h-full overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 border-gold/30 bg-black/60 backdrop-blur-sm">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={imagePath}
                      alt={altText}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-display font-black text-white mb-3 uppercase tracking-tight premium-heading-sm">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-white/90 leading-relaxed premium-text">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="premium-gold-text font-bold uppercase tracking-wide text-sm group-hover:underline inline-flex items-center gap-2">
                      Learn More <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="card-premium border-gold/30 p-12 md:p-16 bg-black/60 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-display font-black mb-6 text-white uppercase tracking-tight premium-heading">
              Ready to Start Your Project?
            </h2>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
            <p className="text-lg text-white/90 mb-4 max-w-2xl mx-auto leading-relaxed premium-text">
              We treat every client like family. Contact us today for a free consultation and quote.
            </p>
            <p className="text-lg premium-gold-text font-bold mb-8 uppercase tracking-wide">
              {BRAND_CONFIG.motto}
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button asChild size="lg" className="btn-premium btn-glow">
                <Link href="/get-quote">Request a Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-gold/50 bg-black/50 hover:bg-black/70 hover:border-gold text-gold backdrop-blur-sm">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
            <p className="text-sm text-white/70 mt-6">
              {BRAND_CONFIG.contact.cta}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
