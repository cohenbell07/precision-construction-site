"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { BRAND_CONFIG } from "@/lib/utils";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          message: formData.message,
          source: "contact_page",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          message: "",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: data.error || "Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative premium-bg-pattern">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
      {/* Hero Section */}
      <section className="relative h-[38vh] sm:h-[48vh] md:h-[55vh] min-h-[280px] sm:min-h-[360px] md:min-h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/6d86ce69-0210-48e9-ab64-8f0745d631d4.png"
            alt="Contact Precision Construction & Decora"
            fill
            priority
            className="object-cover scale-105"
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/95"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
          {/* Corner accent marks */}
          <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 rounded-tl pointer-events-none" style={{ borderColor: 'hsla(22,100%,63%,0.5)' }}></div>
          <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-silver/20 rounded-br pointer-events-none"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-4 sm:mb-5">
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
                Calgary&apos;s Trusted Family Builder · Since 1968
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-4 sm:mb-5 text-white uppercase tracking-tight premium-heading px-2">
              Contact Us
            </h1>
            <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mx-auto mb-4 sm:mb-5 rounded-full" style={{ boxShadow: '0 0 12px hsla(22,100%,63%,0.5)' }}></div>
            <p className="text-sm sm:text-base md:text-lg text-white/75 max-w-xl mx-auto leading-relaxed px-2">
              We treat every client like family. Tell us about your project and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Contact Form */}
          <div className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#050505] shadow-[0_4px_32px_rgba(0,0,0,0.6)]">
            {/* Left orange accent bar */}
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent pointer-events-none"></div>
            <div className="p-6 sm:p-8 md:p-10">
              {/* Header */}
              <div className="mb-6 sm:mb-8">
                <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em] mb-1">Get in touch</p>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight premium-heading">
                  Send a Message
                </h2>
                <div className="h-[3px] w-10 bg-gradient-to-r from-primary to-transparent mt-3 rounded-full" style={{ boxShadow: '0 0 8px hsla(22,100%,63%,0.4)' }}></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/50 uppercase tracking-[0.2em]">
                      <span className="w-1 h-1 rounded-full bg-primary shrink-0"></span>
                      Name <span className="text-primary/70">*</span>
                    </label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/50 uppercase tracking-[0.2em]">
                      <span className="w-1 h-1 rounded-full bg-primary shrink-0"></span>
                      Email <span className="text-primary/70">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/50 uppercase tracking-[0.2em]">
                      <span className="w-1 h-1 rounded-full bg-silver/30 shrink-0"></span>
                      Phone
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(403) 818-7767"
                      className="bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="projectType" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/50 uppercase tracking-[0.2em]">
                      <span className="w-1 h-1 rounded-full bg-silver/30 shrink-0"></span>
                      Project Type
                    </label>
                    <Input
                      id="projectType"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      placeholder="e.g., Flooring, Cabinets…"
                      className="bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/50 uppercase tracking-[0.2em]">
                    <span className="w-1 h-1 rounded-full bg-primary shrink-0"></span>
                    Message <span className="text-primary/70">*</span>
                  </label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project — scope, timeline, budget, anything relevant…"
                    rows={6}
                    className="bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-white/25 rounded-xl transition-colors resize-none"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full btn-premium uppercase tracking-widest text-sm py-3 h-auto">
                  {loading ? "Sending…" : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-white/25">We respond within 24 hours — usually much sooner.</p>
              </form>
            </div>
          </div>

          {/* Contact Info + Service Areas */}
          <div className="space-y-5">

            {/* Contact Information Card */}
            <div className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#080808] shadow-[0_4px_32px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-silver/40 via-silver/15 to-transparent pointer-events-none"></div>
              <div className="p-6 sm:p-8">
                <div className="mb-5 sm:mb-6">
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.25em] mb-1">Reach us</p>
                  <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight premium-heading">
                    Contact Information
                  </h2>
                  <div className="h-[2px] w-8 bg-gradient-to-r from-silver/50 to-transparent mt-2.5 rounded-full"></div>
                </div>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-silver/[0.06] border border-silver/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-silver/60" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/35 uppercase tracking-[0.2em] mb-0.5">Address</p>
                      <p className="text-white/80 text-sm font-medium">{BRAND_CONFIG.contact.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/[0.08] border border-primary/15 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary/70" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/35 uppercase tracking-[0.2em] mb-0.5">Phone</p>
                      <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="text-white font-black text-base hover:text-primary transition-colors">
                        {BRAND_CONFIG.contact.phoneFormatted}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-silver/[0.06] border border-silver/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-silver/60" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/35 uppercase tracking-[0.2em] mb-0.5">Email</p>
                      <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="text-white/70 hover:text-white transition-colors text-sm font-medium break-all">
                        {BRAND_CONFIG.contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-silver/[0.08]">
                    <p className="text-xs text-white/40 leading-relaxed">
                      <span className="text-white/60 font-black">Owner:</span> {BRAND_CONFIG.owner} · {BRAND_CONFIG.contact.cta}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Areas Card */}
            <div className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#050505] shadow-[0_4px_32px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent pointer-events-none"></div>
              <div className="p-6 sm:p-8">
                <div className="mb-5">
                  <p className="text-[10px] font-black text-primary/50 uppercase tracking-[0.25em] mb-1">Where we work</p>
                  <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight premium-heading">
                    Service Areas
                  </h2>
                  <div className="h-[3px] w-8 bg-gradient-to-r from-primary to-transparent mt-2.5 rounded-full" style={{ boxShadow: '0 0 8px hsla(22,100%,63%,0.4)' }}></div>
                </div>
                <p className="text-white/55 text-sm mb-5 leading-relaxed">
                  We proudly serve Calgary and surrounding communities:
                </p>
                <ul className="grid grid-cols-2 gap-2">
                  {["Calgary (All Quadrants)", "Airdrie", "Cochrane", "Okotoks", "Chestermere", "And more!"].map((area) => (
                    <li key={area} className="flex items-center gap-2.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-primary/[0.12] border border-primary/30 flex items-center justify-center shrink-0">
                        <span className="w-1 h-1 rounded-full bg-primary block"></span>
                      </span>
                      <span className="text-white/70 text-sm">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 cta-warm-bg relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center relative z-10">
          <span className="section-label mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
            Free Quote · No Obligation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black mb-4 sm:mb-5 uppercase tracking-tight premium-heading mt-5">
            Ready to Get Started?
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-silver/30 to-transparent mx-auto mb-5 sm:mb-6"></div>
          <p className="text-sm sm:text-base md:text-lg text-white/55 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed px-2">
            Experience the difference of working with a 3rd generation family-owned company. We beat any competitor quote by 5%.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button asChild size="lg" className="btn-premium px-8 py-4 text-sm sm:text-base uppercase tracking-wider w-full sm:w-auto">
              <Link href="/get-quote">Request a Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-outline-silver px-8 py-4 text-sm sm:text-base w-full sm:w-auto rounded-md">
              <Link href="/services">View Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
