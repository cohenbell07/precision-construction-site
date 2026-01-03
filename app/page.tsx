"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { services } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { AIChatAssistant } from "@/components/AIChatAssistant";
import { CheckCircle, Star, Hammer, Award, Users } from "lucide-react";

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

  return (
    <div className="flex flex-col">
      {/* Hero Section - Premium Construction Design */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Premium Construction Background */}
        <div className="absolute inset-0 z-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-industrial-black via-industrial-slate/20 to-industrial-black"></div>
          
          {/* Architectural grid pattern - refined blueprint style */}
          <div className="absolute inset-0 hero-grid-pattern"></div>
          
          {/* Premium gold accent lines - architectural framing */}
          <div className="absolute inset-0 hero-accent-lines"></div>
          
          {/* Precision measurement indicators - subtle construction elements */}
          <div className="absolute top-20 left-10 w-32 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-50"></div>
          <div className="absolute top-20 left-10 w-1 h-32 bg-gradient-to-b from-transparent via-gold/40 to-transparent opacity-50"></div>
          <div className="absolute bottom-20 right-10 w-32 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-50"></div>
          <div className="absolute bottom-20 right-10 w-1 h-32 bg-gradient-to-b from-transparent via-gold/40 to-transparent opacity-50"></div>
          
          {/* Sophisticated depth layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-industrial-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-industrial-black/30 via-transparent to-industrial-black/30"></div>
          
          {/* Premium gold ambient glow - subtle and refined */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/4 rounded-full blur-sm opacity-40"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/3 rounded-full blur-sm opacity-30"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center max-w-6xl">
          <div className="space-y-10">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2">
              <span className="text-gold text-sm font-bold uppercase tracking-wider">Since 1968</span>
              <span className="w-1 h-1 rounded-full bg-gold"></span>
              <span className="text-gold text-sm font-bold uppercase tracking-wider">3rd Generation</span>
            </div>
            
            {/* Premium Hero Headline with enhanced typography */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-2 hero-text leading-[0.95] tracking-tight uppercase">
                Heritage. Craft. Precision.
              </h1>
              
              {/* Decorative gold line */}
              <div className="flex items-center justify-center gap-4 my-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold"></div>
                <div className="w-2 h-2 rounded-full bg-gold"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold"></div>
              </div>
            </div>
            
            {/* Enhanced Tagline */}
            <p className="text-xl md:text-2xl lg:text-3xl mb-3 text-gold font-bold tracking-wide">
              {BRAND_CONFIG.tagline}
            </p>
            
            {/* Premium Description */}
            <p className="text-base md:text-lg lg:text-xl mb-14 max-w-3xl mx-auto text-text-secondary leading-relaxed font-light">
              Crafting Calgary&apos;s future — one build at a time. Three generations of excellence, 
              family values, and uncompromising quality.
            </p>
            
            {/* Premium Button Group */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button asChild size="lg" className="btn-premium px-14 py-9 text-lg uppercase tracking-wider btn-glow shadow-2xl">
                <Link href="/get-quote">Get a Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="btn-steel text-text-primary px-12 py-8 text-lg font-bold uppercase tracking-wide border-2 border-gold/40 hover:border-gold/60">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="section-spacing bg-industrial-slate relative overflow-hidden texture-concrete">
        {/* Industrial ambient background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-1/3 h-1/3 bg-gold/3 rounded-full blur-sm"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-6 text-text-primary uppercase tracking-tight">
              Why Work With Us
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold"></div>
            </div>
          </div>
          <p className="text-center text-text-secondary mb-20 text-lg max-w-2xl mx-auto">
            Three generations of excellence, family values, and uncompromising quality
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item) => (
              <div key={item.title}>
                <Card className="card-premium h-full text-center group">
                  <CardHeader className="pb-4">
                    <div className="relative inline-block mb-6">
                      <item.icon className="h-16 w-16 mx-auto text-gold relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gold/15 blur-xl rounded-full group-hover:bg-gold/25 transition-colors"></div>
                    </div>
                    <CardTitle className="text-xl font-display font-black text-text-primary mb-3 uppercase tracking-tight">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-text-secondary leading-relaxed">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className="section-divider"></div>
      </section>

      {/* Services Overview */}
      <section className="section-spacing bg-industrial-black relative overflow-hidden texture-concrete">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-center mb-6 text-text-primary uppercase tracking-tight">Our Services</h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold"></div>
            </div>
            <p className="text-center text-text-secondary mb-4 max-w-3xl mx-auto text-lg leading-relaxed">
              Comprehensive construction and renovation services for residential and commercial projects.
            </p>
            <p className="text-center text-gold font-bold mb-4 max-w-3xl mx-auto text-base uppercase tracking-wide">
              {BRAND_CONFIG.motto} — From flooring to full home renovations, we deliver quality you can trust.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service) => (
              <div key={service.id}>
                <Card className="card-premium h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-display font-bold text-text-primary mb-3 uppercase tracking-tight">{service.title}</CardTitle>
                    <CardDescription className="text-text-secondary leading-relaxed">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full btn-steel text-gold font-semibold">
                      <Link href={`/services#${service.id}`}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Button asChild size="lg" className="btn-premium uppercase tracking-wider">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
        <div className="section-divider"></div>
      </section>

      {/* Testimonials */}
      <section className="section-spacing bg-industrial-slate relative overflow-hidden texture-concrete">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/3 rounded-full blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-6 text-text-primary uppercase tracking-tight">
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold"></div>
            </div>
          </div>
          <p className="text-center text-text-secondary mb-20 text-lg max-w-2xl mx-auto">
            Real feedback from families we&apos;ve had the honor of serving
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name}>
                <Card className="card-premium h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-gold text-gold drop-shadow-lg" />
                      ))}
                    </div>
                    <CardDescription className="text-base text-text-secondary leading-relaxed">{testimonial.text}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="font-bold text-text-primary uppercase tracking-wide">{testimonial.name}</p>
                    <p className="text-sm text-text-secondary">{testimonial.location}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className="section-divider"></div>
      </section>

      {/* Project Gallery Teaser */}
      <section className="section-spacing bg-industrial-black relative overflow-hidden texture-concrete">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-6 text-text-primary uppercase tracking-tight">See Our Work</h2>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold"></div>
              </div>
              <p className="text-text-secondary mb-10 text-lg leading-relaxed">
                Browse our portfolio of completed projects. From custom kitchens to commercial
                renovations, we bring your vision to life.
              </p>
              <Button asChild size="lg" className="btn-premium uppercase tracking-wider">
                <Link href="/projects">View Gallery</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="relative h-56 rounded-xl overflow-hidden shadow-xl group">
                <Image
                  src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80"
                  alt="Kitchen renovation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ willChange: 'transform' }}
                />
              </div>
              <div className="relative h-56 rounded-xl overflow-hidden shadow-xl group mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Bathroom renovation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ willChange: 'transform' }}
                />
              </div>
              <div className="relative h-56 rounded-xl overflow-hidden shadow-xl group">
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80"
                  alt="Custom cabinets"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ willChange: 'transform' }}
                />
              </div>
              <div className="relative h-56 rounded-xl overflow-hidden shadow-xl group mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
                  alt="Flooring installation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ willChange: 'transform' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chat Assistant */}
      <section className="section-spacing bg-industrial-slate text-text-primary relative overflow-hidden texture-concrete">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/3 rounded-full blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-6 uppercase tracking-tight">
              Need Help Planning Your Project?
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold"></div>
            </div>
          </div>
          <p className="text-lg mb-12 text-text-secondary text-center">
            Ask our AI assistant about your construction project
          </p>
          <AIChatAssistant />
        </div>
      </section>
    </div>
  );
}

