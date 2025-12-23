"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { services } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { AIChatAssistant } from "@/components/AIChatAssistant";
import { motion } from "framer-motion";
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
      description: "3rd generation Calgary company since 1968. We treat every client like family.",
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
      {/* Hero Section - Industrial Material Design */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden texture-concrete hero-parallax">
        {/* Industrial Background with Blueprint Grid and Depth */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-industrial-black"></div>
          <div className="absolute inset-0 texture-blueprint opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-industrial-black via-industrial-slate/30 to-industrial-black"></div>
          {/* Metallic framing effect */}
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(243, 201, 106, 0.07) 50%, transparent 100%),
                              linear-gradient(0deg, transparent 0%, rgba(243, 201, 106, 0.05) 50%, transparent 100%)`,
            backgroundSize: '200px 200px, 200px 200px'
          }}></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/3 rounded-full blur-3xl parallax-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/2 rounded-full blur-3xl parallax-fast"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Premium Hero Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-6 hero-text leading-tight tracking-tight uppercase">
              Heritage. Craft. Precision.
            </h1>
            
            {/* Tagline */}
            <p className="text-lg md:text-xl lg:text-2xl mb-4 text-gold font-bold tracking-wide">
              {BRAND_CONFIG.tagline}
            </p>
            
            <p className="text-base md:text-lg mb-12 max-w-2xl mx-auto text-text-secondary leading-relaxed">
              Crafting Calgary&apos;s future — one build at a time. Three generations of excellence, 
              family values, and uncompromising quality.
            </p>
            
            {/* Button Group */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button asChild size="lg" className="btn-premium px-12 py-8 text-lg uppercase tracking-wider btn-glow">
                <Link href="/get-quote">Get a Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="btn-steel text-text-primary px-10 py-7 text-lg font-bold uppercase tracking-wide">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="scroll-indicator mt-20"
          ></motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="section-spacing bg-industrial-slate relative overflow-hidden texture-concrete">
        {/* Industrial ambient background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-1/3 h-1/3 bg-gold/3 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-center mb-6 text-text-primary uppercase tracking-tight"
          >
            Why Work With Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-text-secondary mb-20 text-lg max-w-2xl mx-auto"
          >
            Three generations of excellence, family values, and uncompromising quality
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
              >
                <Card className="card-premium h-full text-center">
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
              </motion.div>
            ))}
          </div>
        </div>
        <div className="section-divider"></div>
      </section>

      {/* Services Overview */}
      <section className="section-spacing bg-industrial-black relative overflow-hidden texture-concrete">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-center mb-6 text-text-primary uppercase tracking-tight">Our Services</h2>
            <p className="text-center text-text-secondary mb-4 max-w-3xl mx-auto text-lg leading-relaxed">
              Comprehensive construction and renovation services for residential and commercial projects.
            </p>
            <p className="text-center text-gold font-bold mb-4 max-w-3xl mx-auto text-base uppercase tracking-wide">
              {BRAND_CONFIG.motto} — From flooring to full home renovations, we deliver quality you can trust.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
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
              </motion.div>
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
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/3 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-center mb-6 text-text-primary uppercase tracking-tight"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-text-secondary mb-20 text-lg max-w-2xl mx-auto"
          >
            Real feedback from families we&apos;ve had the honor of serving
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
              >
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
              </motion.div>
            ))}
          </div>
        </div>
        <div className="section-divider"></div>
      </section>

      {/* Project Gallery Teaser */}
      <section className="section-spacing bg-industrial-black relative overflow-hidden texture-concrete">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-8 text-text-primary uppercase tracking-tight">See Our Work</h2>
              <p className="text-text-secondary mb-10 text-lg leading-relaxed">
                Browse our portfolio of completed projects. From custom kitchens to commercial
                renovations, we bring your vision to life.
              </p>
              <Button asChild size="lg" className="btn-premium uppercase tracking-wider">
                <Link href="/projects">View Gallery</Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-5"
            >
              <div className="relative h-56 rounded-xl overflow-hidden shadow-xl group">
                <Image
                  src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80"
                  alt="Kitchen renovation"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="relative h-56 rounded-xl overflow-hidden shadow-xl group mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Bathroom renovation"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="relative h-56 rounded-xl overflow-hidden shadow-xl group">
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80"
                  alt="Custom cabinets"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="relative h-56 rounded-xl overflow-hidden shadow-xl group mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
                  alt="Flooring installation"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Chat Assistant */}
      <section className="section-spacing bg-industrial-slate text-text-primary relative overflow-hidden texture-concrete">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/3 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-6 uppercase tracking-tight"
          >
            Need Help Planning Your Project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg mb-12 text-text-secondary"
          >
            Ask our AI assistant about your construction project
          </motion.p>
          <AIChatAssistant />
        </div>
      </section>
    </div>
  );
}

