"use client";

import { services } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { 
  SquaresFour,
  Drop,
  Package,
  Rectangle,
  Wrench,
  Buildings,
  Wall,
  PaintBrush,
  CheckCircle
} from "phosphor-react";

// Icon mapping for services with phosphor-react
const serviceIcons: { [key: string]: any } = {
  flooring: SquaresFour,
  showers: Drop,
  cabinets: Package,
  countertops: Rectangle,
  carpentry: Wrench,
  framing: Buildings,
  drywall: Wall,
  painting: PaintBrush,
  default: Buildings,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-industrial-black relative">
      {/* Premium Construction Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-industrial-black via-industrial-slate/12 to-industrial-black"></div>
        <div className="absolute inset-0 services-grid-pattern"></div>
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-gold/3 rounded-full blur-sm opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 py-20 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gold/30 bg-gold/10 mb-8">
            <span className="text-gold text-sm font-bold uppercase tracking-wider">Comprehensive Services</span>
            <span className="w-1 h-1 rounded-full bg-gold"></span>
            <span className="text-gold text-sm font-bold uppercase tracking-wider">Since {BRAND_CONFIG.established}</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-6 text-text-primary uppercase tracking-tight">
            Our Services
          </h1>
          {/* Decorative gold line */}
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold"></div>
            <div className="w-2 h-2 rounded-full bg-gold"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold"></div>
          </div>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-4 leading-relaxed">
            From flooring to full home renovations, we provide comprehensive construction services for
            residential and commercial projects in Calgary and surrounding areas.
          </p>
          <p className="text-lg md:text-xl text-gold font-bold max-w-3xl mx-auto uppercase tracking-wide">
            {BRAND_CONFIG.motto}
          </p>
        </div>

        {/* Services with side-by-side layout */}
        <div className="space-y-24 mb-20">
          {services.map((service, index) => {
            const IconComponent = serviceIcons[service.id] || serviceIcons.default;
            const isEven = index % 2 === 0;
            
            return (
              <section
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  !isEven ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Text Content - Left side for even, right side for odd */}
                <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                  <Card className="card-premium rounded-2xl border-gold/20 p-8 h-full">
                    <CardHeader className="pb-6">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="p-5 bg-gold/10 rounded-2xl border-2 border-gold/30 shadow-lg">
                          <IconComponent className="h-12 w-12 text-gold" weight="duotone" />
                        </div>
                        <CardTitle className="text-3xl md:text-4xl font-display font-black text-text-primary uppercase tracking-tight">
                          {service.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-text-secondary leading-relaxed text-lg">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {service.details && service.details.length > 0 && (
                        <ul className="space-y-3">
                          {service.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" weight="fill" />
                              <span className="text-text-secondary leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <Button asChild className="btn-premium btn-glow w-full rounded-2xl py-6 text-lg">
                        <Link href={`/get-quote?service=${service.id}`}>Get a Quote</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Image/Video Container - Right side for even, left side for odd */}
                <div className={isEven ? "lg:order-2" : "lg:order-1"}>
                  <div className="relative h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden group">
                    {/* Placeholder for image/video */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-industrial-slate to-industrial-black">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <IconComponent className="h-32 w-32 text-gold/20" weight="duotone" />
                      </div>
                    </div>
                    {/* Overlay for hover effect */}
                    {/* Placeholder text */}
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <p className="text-text-secondary text-sm font-semibold uppercase tracking-wide">
                        Image/Video Placeholder
                      </p>
                      <p className="text-text-muted text-xs mt-1">
                        Add your {service.title.toLowerCase()} project image or video here
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="card-premium card-beveled border-gold/30 p-12 md:p-16 rounded-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6 text-text-primary uppercase tracking-tight">
              Ready to Start Your Project?
            </h2>
            {/* Decorative gold line */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold"></div>
            </div>
            <p className="text-lg text-text-secondary mb-4 max-w-2xl mx-auto leading-relaxed">
              We treat every client like family. Contact us today for a free consultation and quote.
            </p>
            <p className="text-lg text-gold font-bold mb-8 uppercase tracking-wide">
              {BRAND_CONFIG.motto}
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button asChild size="lg" className="btn-premium btn-glow rounded-2xl">
                <Link href="/get-quote">Request a Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="btn-steel rounded-2xl">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
            <p className="text-sm text-text-secondary mt-6">
              {BRAND_CONFIG.contact.cta}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
