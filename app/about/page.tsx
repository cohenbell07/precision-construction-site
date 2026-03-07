"use client";

import { BRAND_CONFIG } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VideoHero } from "@/components/VideoHero";
import {
  MapPin as PhosphorMapPin,
  Handshake as PhosphorHandshake,
  Users as PhosphorUsers,
} from "phosphor-react";
import { Star, CheckCircle, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const yearsInCalgary = new Date().getFullYear() - BRAND_CONFIG.servingSince;
  const totalYears = new Date().getFullYear() - BRAND_CONFIG.established;

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
    <div className="flex flex-col bg-black">

      {/* Hero */}
      <section className="relative w-full bg-black overflow-hidden min-h-[240px] sm:min-h-[300px] md:min-h-[400px] max-h-[90vh]">
        <div className="relative w-full min-h-[240px] aspect-video max-h-[600px]">
          <VideoHero videoId="cfd853ff56a468be1c91e78ce77db01f" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center">
              <div className="flex justify-center mb-3 sm:mb-4">
                <span className="section-label">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
                  Calgary&apos;s Trusted Family Builder
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-3 sm:mb-4 md:mb-5 text-white uppercase tracking-tight premium-heading px-2">
                About {BRAND_CONFIG.shortName}
              </h1>
              <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mx-auto mb-4 rounded-full" style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }}></div>
              <p className="text-base sm:text-lg md:text-xl font-black text-primary/90 mb-2 sm:mb-3 uppercase tracking-wide px-2">
                {BRAND_CONFIG.motto}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-white/55 max-w-3xl mx-auto leading-relaxed px-2">
                {BRAND_CONFIG.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Track Record Stats */}
      <section className="bg-[#0A0A0A] border-b border-silver/[0.07] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/35 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-silver/[0.07]">
            {[
              { number: `${totalYears}+`, label: "Years in Business", sub: `Since ${BRAND_CONFIG.established}` },
              { number: "3,500+", label: "Projects Completed", sub: "Residential & Commercial" },
              { number: `${yearsInCalgary}+`, label: "Years in Calgary", sub: `Serving since ${BRAND_CONFIG.servingSince}` },
              { number: "3rd", label: "Generation", sub: "Family-Owned Business" },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-1" style={{ textShadow: '0 0 20px hsla(22,100%,63%,0.25)' }}>{stat.number}</div>
                <div className="text-[10px] sm:text-xs text-white/35 uppercase tracking-[0.2em] font-bold">{stat.label}</div>
                <div className="text-[10px] text-white/20 mt-0.5 hidden sm:block">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-14 sm:py-20 md:py-24 bg-black relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212,175,55,0.1) 2px, rgba(212,175,55,0.1) 4px)`, backgroundSize: '100px 100px' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex justify-center mb-4">
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
                Our Story
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-4 text-white uppercase tracking-tight premium-heading">
              Our Journey
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mx-auto mb-5 rounded-full" style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }}></div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#080808] shadow-[0_4px_32px_rgba(0,0,0,0.5)] p-8 sm:p-10 md:p-14">
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent pointer-events-none"></div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden md:block"></div>

              <div className="space-y-10 sm:space-y-12 md:space-y-16">
                {/* 1968 */}
                <div className="relative flex flex-col md:flex-row items-center gap-4 md:gap-0">
                  <div className="w-full md:w-1/2 md:pr-12 text-center md:text-right">
                    <p className="text-3xl sm:text-4xl font-display font-black text-white mb-1" style={{ textShadow: '0 0 20px hsla(22,100%,63%,0.25)' }}>{BRAND_CONFIG.established}</p>
                    <p className="font-display font-black text-white text-base sm:text-lg uppercase tracking-tight">Family Construction Begins</p>
                    <p className="text-sm text-white/35 mt-1">3rd generation family business established</p>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-black hidden md:flex items-center justify-center" style={{ boxShadow: '0 0 16px hsla(22,100%,63%,0.5)' }}></div>
                  <div className="w-full md:w-1/2 md:pl-12"></div>
                </div>

                {/* 1997 */}
                <div className="relative flex flex-col md:flex-row items-center gap-4 md:gap-0">
                  <div className="w-full md:w-1/2 md:pr-12"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary/60 border-4 border-black hidden md:flex items-center justify-center" style={{ boxShadow: '0 0 12px hsla(22,100%,63%,0.3)' }}></div>
                  <div className="w-full md:w-1/2 md:pl-12 text-center md:text-left">
                    <p className="text-3xl sm:text-4xl font-display font-black text-white mb-1" style={{ textShadow: '0 0 20px hsla(22,100%,63%,0.25)' }}>{BRAND_CONFIG.servingSince}</p>
                    <p className="font-display font-black text-white text-base sm:text-lg uppercase tracking-tight">Calgary Operations Established</p>
                    <p className="text-sm text-white/35 mt-1">Expanding to the Calgary market</p>
                  </div>
                </div>

                {/* Today */}
                <div className="relative flex flex-col md:flex-row items-center gap-4 md:gap-0">
                  <div className="w-full md:w-1/2 md:pr-12 text-center md:text-right">
                    <p className="text-3xl sm:text-4xl font-display font-black text-white mb-1" style={{ textShadow: '0 0 20px hsla(22,100%,63%,0.25)' }}>Today</p>
                    <p className="font-display font-black text-white text-base sm:text-lg uppercase tracking-tight">Premium Commercial &amp; Residential</p>
                    <p className="text-sm text-white/35 mt-1">Continuing excellence across Calgary</p>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-black hidden md:flex items-center justify-center" style={{ boxShadow: '0 0 20px hsla(22,100%,63%,0.6)' }}></div>
                  <div className="w-full md:w-1/2 md:pl-12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Leadership */}
      <section className="py-14 sm:py-20 md:py-24 bg-[#080808] relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212,175,55,0.1) 2px, rgba(212,175,55,0.1) 4px)`, backgroundSize: '100px 100px' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex justify-center mb-4">
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
                Family Leadership
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-4 text-white uppercase tracking-tight premium-heading">
              Meet Our Leadership
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mx-auto mb-5 rounded-full" style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }}></div>
          </div>

          <div className="flex justify-center">
            <div className="max-w-2xl w-full relative rounded-2xl overflow-hidden border border-silver/10 bg-[#050505] shadow-[0_4px_32px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent pointer-events-none"></div>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/40 via-primary/10 to-transparent pointer-events-none"></div>
              <div className="p-8 sm:p-10">
                <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em] mb-1">Owner &amp; Lead Contractor</p>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-2 uppercase tracking-tight premium-heading">
                  {BRAND_CONFIG.owner}
                </h3>
                <div className="h-[3px] w-10 bg-gradient-to-r from-primary to-transparent mb-6 rounded-full" style={{ boxShadow: '0 0 8px hsla(22,100%,63%,0.4)' }}></div>
                <div className="space-y-4 text-sm sm:text-base text-white/55 leading-relaxed">
                  <p>
                    With decades of experience in the construction industry, {BRAND_CONFIG.owner} leads {BRAND_CONFIG.shortName} with a commitment to excellence and a personal touch that comes from family ownership.
                  </p>
                  <p>
                    Growing up in a family construction business, {BRAND_CONFIG.owner} learned the trade from the ground up. He understands that every project is more than just a build — it&apos;s someone&apos;s home, someone&apos;s business, someone&apos;s dream.
                  </p>
                  <p>
                    Every project receives his personal attention to ensure you get only the best — in service, quality, and satisfaction. His hands-on approach and commitment to treating every client like family has been the cornerstone of {BRAND_CONFIG.shortName}&apos;s success in Calgary.
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-silver/[0.07] flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
                  <span className="text-[10px] font-black text-white/25 uppercase tracking-[0.2em]">Direct Contact</span>
                  <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="text-sm font-black text-white/60 hover:text-white transition-colors">{BRAND_CONFIG.contact.phoneFormatted}</a>
                  <span className="hidden sm:inline text-white/15">·</span>
                  <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="text-sm text-white/40 hover:text-white transition-colors break-all">{BRAND_CONFIG.contact.email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="py-14 sm:py-20 md:py-24 cta-warm-bg relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver/20 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl relative z-10 text-center">
          <div className="text-6xl font-display font-black text-primary/30 leading-none mb-2 select-none">&ldquo;</div>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-black text-white mb-5 sm:mb-6 italic leading-relaxed px-2">
            We treat every client like family — and every build like our own.
          </p>
          <div className="h-[2px] w-10 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mb-4 rounded-full"></div>
          <p className="text-xs sm:text-sm text-white/45 uppercase tracking-[0.25em] font-black">
            — {BRAND_CONFIG.owner}, Owner &amp; Lead Contractor
          </p>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-14 sm:py-20 md:py-24 bg-black relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212,175,55,0.1) 2px, rgba(212,175,55,0.1) 4px)`, backgroundSize: '100px 100px' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex justify-center mb-4">
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
                Simple, Proven Process
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-4 text-white uppercase tracking-tight premium-heading">
              How We Work
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mx-auto mb-5 rounded-full" style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }}></div>
            <p className="text-sm sm:text-base text-white/45 max-w-2xl mx-auto leading-relaxed px-2">
              Our proven process ensures your project runs smoothly from first call to final walkthrough.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              { step: "01", title: "Consultation", description: "We start with a free consultation to understand your vision, needs, and budget. This is where we get to know you and your project." },
              { step: "02", title: "Planning & Design", description: "We create detailed plans, obtain necessary permits, and work with you to refine every detail before construction begins." },
              { step: "03", title: "Execution", description: "Our skilled team brings your vision to life with precision craftsmanship, regular updates, and open communication throughout." },
              { step: "04", title: "Follow-Up", description: "We conduct a final walkthrough, address any concerns, and stand behind our work with ongoing support and warranty." },
            ].map((item, index) => (
              <div key={item.step} className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#080808] shadow-[0_4px_24px_rgba(0,0,0,0.4)] p-6 sm:p-7">
                <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/60 via-primary/20 to-transparent pointer-events-none"></div>
                <span className="absolute top-4 right-5 text-6xl font-black text-white/[0.04] select-none pointer-events-none leading-none">{item.step}</span>
                <div className="w-11 h-11 rounded-full bg-primary/[0.10] border-2 border-primary/30 flex items-center justify-center mb-5" style={{ boxShadow: '0 0 12px hsla(22,100%,63%,0.15)' }}>
                  <span className="font-black text-sm text-primary">{item.step}</span>
                </div>
                <div className="h-[2px] w-8 bg-gradient-to-r from-primary/50 to-transparent mb-4 rounded-full"></div>
                <h3 className="font-display font-black text-white text-base uppercase tracking-tight mb-2 premium-heading">{item.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{item.description}</p>
                {index < 3 && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:flex w-6 h-6 rounded-full bg-primary/[0.08] border border-primary/20 items-center justify-center z-10">
                    <ArrowRight className="h-3 w-3 text-primary/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values & Mission */}
      <section className="py-14 sm:py-20 md:py-24 bg-[#080808] relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212,175,55,0.1) 2px, rgba(212,175,55,0.1) 4px)`, backgroundSize: '100px 100px' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex justify-center mb-4">
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
                What Drives Us
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-4 text-white uppercase tracking-tight premium-heading">
              Our Values &amp; Mission
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mx-auto mb-5 rounded-full" style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }}></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            {/* Mission */}
            <div className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#050505] shadow-[0_4px_24px_rgba(0,0,0,0.5)] p-7 sm:p-9">
              <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent pointer-events-none"></div>
              <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em] mb-1">Who We Are</p>
              <h3 className="font-display font-black text-white text-2xl uppercase tracking-tight mb-3 premium-heading">Our Mission</h3>
              <div className="h-[3px] w-10 bg-gradient-to-r from-primary to-transparent mb-5 rounded-full" style={{ boxShadow: '0 0 8px hsla(22,100%,63%,0.4)' }}></div>
              <div className="space-y-4 text-sm sm:text-base text-white/55 leading-relaxed">
                <p>
                  To deliver exceptional construction and renovation services that exceed expectations, while building lasting relationships with every client we serve.
                </p>
                <p>
                  We believe that construction is not just about building structures — it&apos;s about building trust, creating value, and making dreams come true. Every project is an opportunity to demonstrate our commitment to excellence and our family values.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#050505] shadow-[0_4px_24px_rgba(0,0,0,0.5)] p-7 sm:p-9">
              <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-silver/35 via-silver/10 to-transparent pointer-events-none"></div>
              <p className="text-[10px] font-black text-white/25 uppercase tracking-[0.3em] mb-1">How We Operate</p>
              <h3 className="font-display font-black text-white text-2xl uppercase tracking-tight mb-3 premium-heading">Core Values</h3>
              <div className="h-[3px] w-10 bg-gradient-to-r from-silver/40 to-transparent mb-5 rounded-full"></div>
              <div className="space-y-4">
                {[
                  { title: "Integrity", desc: "Honest communication and transparent pricing in everything we do." },
                  { title: "Quality", desc: "Only the best materials, craftsmanship, and attention to detail." },
                  { title: "Family-First", desc: "Treating every client like family, not just a transaction." },
                  { title: "Excellence", desc: "Continuous improvement and commitment to exceeding expectations." },
                ].map((v) => (
                  <div key={v.title} className="flex items-start gap-3">
                    <span className="mt-[3px] shrink-0 w-5 h-5 rounded-full bg-primary/[0.12] border border-primary/30 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary block"></span>
                    </span>
                    <div>
                      <p className="font-black text-white text-sm uppercase tracking-tight">{v.title}</p>
                      <p className="text-sm text-white/40 mt-0.5">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-14 sm:py-20 md:py-24 bg-black relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212,175,55,0.1) 2px, rgba(212,175,55,0.1) 4px)`, backgroundSize: '100px 100px' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex justify-center mb-4">
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
                No Corners Cut
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-4 text-white uppercase tracking-tight premium-heading">
              Our Quality Standards
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mx-auto mb-5 rounded-full" style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }}></div>
            <p className="text-sm sm:text-base text-white/45 max-w-2xl mx-auto leading-relaxed px-2">
              Every project meets our exacting standards for materials, craftsmanship, and finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#080808] shadow-[0_4px_24px_rgba(0,0,0,0.4)] p-7 sm:p-9">
              <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/60 via-primary/20 to-transparent pointer-events-none"></div>
              <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em] mb-1">Sourcing</p>
              <h3 className="font-display font-black text-white text-xl uppercase tracking-tight mb-3 premium-heading">Premium Materials</h3>
              <div className="h-[2px] w-8 bg-gradient-to-r from-primary/50 to-transparent mb-5 rounded-full"></div>
              <p className="text-sm text-white/45 leading-relaxed mb-6">
                We source only the finest materials from trusted suppliers. From premium hardwood and natural stone to high-grade fixtures and finishes, we never compromise on quality.
              </p>
              <ul className="space-y-3">
                {["Direct relationships with premium suppliers", "Quality inspection before installation", "Warranty-backed materials and workmanship"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-primary/[0.12] border border-primary/30 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary block"></span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#080808] shadow-[0_4px_24px_rgba(0,0,0,0.4)] p-7 sm:p-9">
              <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/60 via-primary/20 to-transparent pointer-events-none"></div>
              <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em] mb-1">Process</p>
              <h3 className="font-display font-black text-white text-xl uppercase tracking-tight mb-3 premium-heading">Quality Control</h3>
              <div className="h-[2px] w-8 bg-gradient-to-r from-primary/50 to-transparent mb-5 rounded-full"></div>
              <p className="text-sm text-white/45 leading-relaxed mb-6">
                Every project undergoes rigorous quality checks at multiple stages. We conduct regular inspections, final walkthroughs, and follow-up visits to ensure everything meets our standards.
              </p>
              <ul className="space-y-3">
                {["Multi-stage quality inspections", "Owner review on every project", "Client approval at key milestones"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-primary/[0.12] border border-primary/30 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary block"></span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-4 text-white uppercase tracking-tight premium-heading">
              What Our Clients Say
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mx-auto mb-5 rounded-full" style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }}></div>
            <p className="text-sm sm:text-base text-white/45 max-w-2xl mx-auto leading-relaxed px-2">
              Real feedback from families and businesses we&apos;ve had the honor of serving across Calgary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#050505] shadow-[0_4px_24px_rgba(0,0,0,0.5)] p-6 sm:p-7 flex flex-col">
                <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/50 via-primary/15 to-transparent pointer-events-none"></div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" style={{ filter: 'drop-shadow(0 0 4px hsla(22,100%,63%,0.5))' }} />
                  ))}
                </div>
                <div className="text-5xl font-display font-black text-primary/20 leading-none mb-3 select-none">&ldquo;</div>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed flex-1 mb-5">{testimonial.text}</p>
                <div className="pt-4 border-t border-silver/[0.07]">
                  <p className="font-black text-white text-sm uppercase tracking-wide">{testimonial.name}</p>
                  <p className="text-xs text-white/35 mt-0.5">{testimonial.location}</p>
                  <span className="inline-block mt-2 text-[10px] font-black uppercase tracking-widest text-primary/60 border border-primary/20 px-2 py-0.5 rounded-full">{testimonial.projectType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Calgary */}
      <section className="py-14 sm:py-20 md:py-24 bg-black relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212,175,55,0.1) 2px, rgba(212,175,55,0.1) 4px)`, backgroundSize: '100px 100px' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex justify-center mb-4">
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
                Rooted in the Community
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-4 text-white uppercase tracking-tight premium-heading">
              Built for Calgary
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mx-auto mb-5 rounded-full" style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }}></div>
            <p className="text-sm sm:text-base text-white/45 max-w-2xl mx-auto leading-relaxed px-2">
              As a Calgary-based family business, we&apos;re deeply invested in our community and committed to building relationships that last.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                Icon: PhosphorMapPin,
                title: "Local Expertise",
                desc: "We understand Calgary's unique building codes, climate considerations, and local market. Our experience with Calgary homes and businesses means we know what works best in our city.",
              },
              {
                Icon: PhosphorHandshake,
                title: "Community Commitment",
                desc: "We're not just building structures — we're building our community. Every project contributes to making Calgary a better place to live and work.",
              },
              {
                Icon: PhosphorUsers,
                title: "Lasting Relationships",
                desc: "Many of our clients become repeat customers and friends. We've built relationships that span decades, with families who trust us for multiple projects.",
              },
            ].map((card, idx) => (
              <div key={card.title} className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#080808] shadow-[0_4px_24px_rgba(0,0,0,0.4)] p-6 sm:p-8">
                <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/60 via-primary/20 to-transparent pointer-events-none"></div>
                <span className="absolute top-4 right-5 text-6xl font-black text-white/[0.04] select-none pointer-events-none leading-none">{String(idx + 1).padStart(2, '0')}</span>
                <div className="w-12 h-12 rounded-xl bg-primary/[0.08] border border-primary/15 flex items-center justify-center mb-5">
                  <card.Icon className="h-6 w-6 text-primary/70" weight="duotone" />
                </div>
                <div className="h-[2px] w-8 bg-gradient-to-r from-primary/50 to-transparent mb-4 rounded-full"></div>
                <h3 className="font-display font-black text-white text-base uppercase tracking-tight mb-2 premium-heading">{card.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-14 sm:py-20 md:py-24 bg-[#080808] relative overflow-hidden premium-bg-pattern">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212,175,55,0.1) 2px, rgba(212,175,55,0.1) 4px)`, backgroundSize: '100px 100px' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex justify-center mb-4">
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
                Where We Build
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-4 text-white uppercase tracking-tight premium-heading">
              Service Areas
            </h2>
            <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mx-auto mb-5 rounded-full" style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }}></div>
            <p className="text-sm sm:text-base text-white/45 max-w-xl mx-auto leading-relaxed px-2">
              We proudly serve Calgary and surrounding areas with the same quality and care.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden border border-silver/10 bg-[#050505] shadow-[0_4px_32px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent pointer-events-none"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y divide-silver/[0.07] sm:divide-y-0 sm:[&>*:nth-child(odd)]:border-r sm:[&>*:nth-child(odd)]:border-silver/[0.07]">
              {[
                { area: "Calgary (All Quadrants)", description: "NW, NE, SW, SE — Full service coverage" },
                { area: "Airdrie", description: "Residential and commercial projects" },
                { area: "Cochrane", description: "Custom builds and renovations" },
                { area: "Okotoks", description: "Home additions and developments" },
                { area: "Chestermere", description: "Waterfront and lake community projects" },
                { area: "Surrounding Areas", description: "Ask about service to your location" },
              ].map((item) => (
                <div key={item.area} className="flex items-start gap-4 p-5 sm:p-6 hover:bg-white/[0.02] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-primary/[0.08] border border-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                    <PhosphorMapPin className="h-4 w-4 text-primary/70" weight="duotone" />
                  </div>
                  <div>
                    <p className="font-black text-white text-sm uppercase tracking-tight">{item.area}</p>
                    <p className="text-xs text-white/40 mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 md:py-24 cta-warm-bg relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver/20 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center relative z-10">
          <span className="section-label mb-5 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
            Free Consultation · No Obligation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black mb-4 sm:mb-5 uppercase tracking-tight premium-heading mt-4 sm:mt-5">
            Let&apos;s Build Something Together
          </h2>
          <div className="h-[2px] w-10 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mb-5 rounded-full"></div>
          <p className="text-sm sm:text-base md:text-lg text-white/55 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed px-2">
            Experience the difference of working with a family-owned company that treats you like family. See why Calgary has trusted {BRAND_CONFIG.shortName} for generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-5">
            <Button asChild size="lg" className="btn-premium px-8 py-4 text-sm sm:text-base uppercase tracking-wider w-full sm:w-auto">
              <Link href="/get-quote">Request a Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-silver/40 bg-transparent hover:bg-black/50 hover:border-silver text-silver px-8 py-4 text-sm sm:text-base uppercase tracking-wider w-full sm:w-auto">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
          <p className="text-xs text-white/30 uppercase tracking-widest">{BRAND_CONFIG.contact.cta}</p>
        </div>
      </section>

    </div>
  );
}
