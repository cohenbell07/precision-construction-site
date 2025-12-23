"use client";

import { BRAND_CONFIG } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Medal as PhosphorAward, 
  Users as PhosphorUsers, 
  Heart as PhosphorHeart, 
  CheckCircle as PhosphorCheckCircle,
  Wrench as PhosphorWrench,
  Wrench as PhosphorHammer,
  Buildings as PhosphorBuildings,
  Shield as PhosphorShield,
  Calendar as PhosphorCalendar
} from "phosphor-react";

export default function AboutPage() {
  const yearsInCalgary = new Date().getFullYear() - BRAND_CONFIG.servingSince;
  const totalYears = new Date().getFullYear() - BRAND_CONFIG.established;

  return (
    <div className="min-h-screen bg-industrial-black texture-concrete">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 texture-blueprint opacity-20"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-black mb-6 text-text-primary uppercase tracking-tighter hero-text">
              About {BRAND_CONFIG.shortName}
            </h1>
            <p className="text-2xl md:text-3xl text-gold font-bold mb-4 uppercase tracking-wide">
              {BRAND_CONFIG.motto}
            </p>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
              {BRAND_CONFIG.description}
            </p>
          </motion.div>
        </div>
        <div className="section-divider"></div>
      </section>

      {/* Our Legacy Section */}
      <section className="py-20 bg-industrial-slate texture-concrete relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-display font-black mb-12 text-text-primary uppercase tracking-tight text-center"
          >
            Our Legacy
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="card-premium">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-gold/10 rounded-2xl border border-gold/20">
                      <PhosphorBuildings className="h-8 w-8 text-gold" weight="duotone" />
                    </div>
                    <CardTitle className="text-3xl font-display font-black text-text-primary uppercase tracking-tight">
                      Family-Owned Since {BRAND_CONFIG.established}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-text-secondary leading-relaxed text-lg">
                    <strong className="text-text-primary">{BRAND_CONFIG.name}</strong> is a 3rd generation, 
                    family-owned and operated construction company with deep roots in Calgary and surrounding areas.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <PhosphorCheckCircle className="h-6 w-6 text-gold mt-0.5 flex-shrink-0" weight="fill" />
                      <div>
                        <p className="text-text-primary font-bold">Established in {BRAND_CONFIG.established}</p>
                        <p className="text-text-secondary">Three generations of construction excellence and craftsmanship</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <PhosphorCheckCircle className="h-6 w-6 text-gold mt-0.5 flex-shrink-0" weight="fill" />
                      <div>
                        <p className="text-text-primary font-bold">Serving Calgary since {BRAND_CONFIG.servingSince}</p>
                        <p className="text-text-secondary">Over {yearsInCalgary} years of dedicated service to our community</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <PhosphorCheckCircle className="h-6 w-6 text-gold mt-0.5 flex-shrink-0" weight="fill" />
                      <div>
                        <p className="text-text-primary font-bold">2,400+ Projects Completed</p>
                        <p className="text-text-secondary">From small renovations to full home builds and commercial projects</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <PhosphorCheckCircle className="h-6 w-6 text-gold mt-0.5 flex-shrink-0" weight="fill" />
                      <div>
                        <p className="text-text-primary font-bold">Family-Owned and Operated</p>
                        <p className="text-text-secondary">Personal attention and care that comes from a family business</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="card-premium">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-4 bg-gold/10 rounded-2xl border border-gold/20 shadow-lg">
                      <PhosphorHeart className="h-8 w-8 text-gold" weight="duotone" />
                    </div>
                    <CardTitle className="text-3xl font-display font-black text-text-primary uppercase tracking-tight">
                      Our Approach
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-text-secondary leading-relaxed text-lg">
                    At {BRAND_CONFIG.shortName}, we believe in building more than just structures — we build 
                    <strong className="text-text-primary"> lasting relationships</strong>.
                  </p>
                  <div className="p-6 bg-gold/5 border-l-4 border-gold rounded-sm">
                    <p className="text-text-primary font-bold text-lg italic mb-2">
                      &quot;We treat every client like family.&quot;
                    </p>
                    <p className="text-text-secondary">
                      From the initial consultation to the final walkthrough, you&apos;ll experience the personal 
                      attention and care that comes from a family business.
                    </p>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    <strong className="text-text-primary">You&apos;ll get Only The Best</strong> — in service, quality, 
                    and satisfaction. We stand behind our work and build lasting relationships with our clients 
                    that extend far beyond project completion.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
        <div className="section-divider"></div>
      </section>

      {/* Why Clients Trust Us */}
      <section className="py-20 bg-industrial-black texture-concrete relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-display font-black mb-12 text-text-primary uppercase tracking-tight text-center"
          >
            Why Clients Trust Us
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: PhosphorAward,
                title: "Quality Craftsmanship",
                description: "Every project is executed with precision and attention to detail. We use only the finest materials and proven techniques.",
              },
              {
                icon: PhosphorShield,
                title: "Trusted & Reliable",
                description: "Three generations of experience means you can trust us to deliver on time, on budget, and to the highest standards.",
              },
              {
                icon: PhosphorHeart,
                title: "Family Values",
                description: "We treat every client like family. Your satisfaction and trust are our top priorities, not just profit margins.",
              },
              {
                icon: PhosphorWrench,
                title: "Comprehensive Service",
                description: "From flooring to full home renovations, we handle every aspect of your project with expertise and care.",
              },
            ].map((value, index) => {
              const IconComponent = value.icon;
              return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="card-premium h-full text-center hover:scale-[1.02] transition-transform duration-300 rounded-2xl">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center p-5 bg-gold/10 rounded-2xl border border-gold/20 mb-4 shadow-lg">
                      <IconComponent className="h-12 w-12 text-gold" weight="duotone" />
                    </div>
                    <CardTitle className="text-xl font-display font-black text-text-primary uppercase tracking-tight">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-text-secondary leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
              );
            })}
          </div>
        </div>
        <div className="section-divider"></div>
      </section>

      {/* Built for Calgary */}
      <section className="py-20 bg-industrial-slate texture-concrete relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-display font-black mb-12 text-text-primary uppercase tracking-tight text-center"
          >
            Built for Calgary
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="card-premium">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-gold/10 rounded-xl border border-gold/20">
                      <PhosphorHammer className="h-8 w-8 text-gold" weight="duotone" />
                    </div>
                    <CardTitle className="text-2xl font-display font-black text-text-primary uppercase tracking-tight">
                      Residential Expertise
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary leading-relaxed">
                    From kitchen renovations to basement developments, we understand Calgary homes and 
                    the unique needs of our local homeowners.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Card className="card-premium rounded-2xl">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-gold/10 rounded-xl border border-gold/20">
                      <PhosphorBuildings className="h-8 w-8 text-gold" weight="duotone" />
                    </div>
                    <CardTitle className="text-2xl font-display font-black text-text-primary uppercase tracking-tight">
                      Commercial Projects
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary leading-relaxed">
                    We&apos;ve completed numerous commercial and multi-unit projects across Calgary, 
                    bringing the same quality and care to every build.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="card-premium rounded-2xl">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-gold/10 rounded-xl border border-gold/20">
                      <PhosphorUsers className="h-8 w-8 text-gold" weight="duotone" />
                    </div>
                    <CardTitle className="text-2xl font-display font-black text-text-primary uppercase tracking-tight">
                      Community Focused
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary leading-relaxed">
                    As a Calgary-based family business, we&apos;re invested in our community and committed 
                    to building relationships that last.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Owner Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16"
          >
            <Card className="card-premium card-beveled border-gold/30 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-3xl font-display font-black text-center text-text-primary uppercase tracking-tight mb-4">
                  Meet the Owner
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-2xl font-display font-black text-gold uppercase tracking-wide">
                  {BRAND_CONFIG.owner}
                </p>
                <p className="text-text-secondary leading-relaxed text-lg max-w-3xl mx-auto">
                  With decades of experience in the construction industry, {BRAND_CONFIG.owner} leads 
                  {BRAND_CONFIG.shortName} with a commitment to excellence and a personal touch that 
                  comes from family ownership.
                </p>
                <p className="text-text-secondary leading-relaxed text-lg max-w-3xl mx-auto">
                  Every project receives his personal attention to ensure you get only the best — 
                  in service, quality, and satisfaction.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16"
          >
            <Card className="card-premium card-beveled border-gold/30 p-8 rounded-2xl">
              <h3 className="text-2xl font-display font-black text-text-primary uppercase tracking-tight mb-8 text-center">
                Our Journey
              </h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gold/30"></div>
                
                {/* Timeline Points */}
                <div className="space-y-12">
                  <div className="relative flex items-center">
                    <div className="w-1/2 pr-8 text-right">
                      <p className="text-3xl font-display font-black text-gold mb-2">{BRAND_CONFIG.established}</p>
                      <p className="text-text-primary font-bold uppercase tracking-wide">Established</p>
                      <p className="text-text-secondary text-sm mt-1">Family business begins</p>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-4 border-industrial-black shadow-lg"></div>
                    <div className="w-1/2 pl-8"></div>
                  </div>
                  
                  <div className="relative flex items-center">
                    <div className="w-1/2 pr-8"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-4 border-industrial-black shadow-lg"></div>
                    <div className="w-1/2 pl-8">
                      <p className="text-3xl font-display font-black text-gold mb-2">{BRAND_CONFIG.servingSince}</p>
                      <p className="text-text-primary font-bold uppercase tracking-wide">Calgary Service Begins</p>
                      <p className="text-text-secondary text-sm mt-1">Expanding to Calgary market</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-center">
                    <div className="w-1/2 pr-8 text-right">
                      <p className="text-3xl font-display font-black text-gold mb-2">Today</p>
                      <p className="text-text-primary font-bold uppercase tracking-wide">2,400+ Projects</p>
                      <p className="text-text-secondary text-sm mt-1">Continuing excellence</p>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-4 border-industrial-black shadow-lg glow-gold"></div>
                    <div className="w-1/2 pl-8"></div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
        <div className="section-divider"></div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-industrial-black texture-concrete relative">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card-premium border-gold/30 p-12 md:p-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6 text-text-primary uppercase tracking-tight">
              Let&apos;s Build Something Together
            </h2>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the difference of working with a family-owned company that treats you like 
              family. Get a free consultation and see why Calgary trusts {BRAND_CONFIG.shortName}.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center mb-6">
              <Button asChild size="lg" className="btn-premium text-lg px-8 py-6">
                <Link href="/get-quote">Request a Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="btn-steel text-lg px-8 py-6">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
            <p className="text-sm text-text-secondary">
              {BRAND_CONFIG.contact.cta}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
