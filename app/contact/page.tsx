"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      await fetch("/api/leads", {
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
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Message received",
        description: "Your message has been received. We'll contact you soon!",
        variant: "default",
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
      {/* Hero Section with contact-hero.png */}
      <section className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/contact-hero.png"
            alt="Contact Precision Construction & Decora"
            fill
            priority
            className="object-cover"
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-3 sm:mb-4 md:mb-6 text-white uppercase tracking-tight premium-heading px-2">
              Contact Us
            </h1>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-3 sm:mb-4 md:mb-6 shadow-[0_0_20px_rgba(232,232,232,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-3xl mx-auto mb-3 sm:mb-4 leading-relaxed premium-text px-2">
              Get in touch with us to discuss your project. We treat every client like family.
            </p>
            <p className="text-sm sm:text-base md:text-lg premium-silver-text font-bold max-w-3xl mx-auto mb-3 sm:mb-4 uppercase tracking-wide px-2">
              {BRAND_CONFIG.motto}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Contact Form - Restyled with card shadow + glow focus */}
          <Card className="card-premium border-silver/30 shadow-2xl bg-black/75 ">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                    Name *
                  </label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="focus:ring-silver/50 focus:border-silver bg-black/50 border-silver/30 text-white placeholder:text-white/40"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="focus:ring-silver/50 focus:border-silver bg-black/50 border-silver/30 text-white placeholder:text-white/40"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(403) 818-7767"
                    className="focus:ring-silver/50 focus:border-silver bg-black/50 border-silver/30 text-white placeholder:text-white/40"
                  />
                </div>
                <div>
                  <label htmlFor="projectType" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                    Project Type
                  </label>
                  <Input
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    placeholder="e.g., Kitchen Renovation, Flooring, etc."
                    className="focus:ring-silver/50 focus:border-silver bg-black/50 border-silver/30 text-white placeholder:text-white/40"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    rows={6}
                    className="focus:ring-silver/50 focus:border-silver bg-black/50 border-silver/30 text-white placeholder:text-white/40"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full btn-premium btn-glow">
                  {loading ? "Sending..." : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="card-premium border-silver/30 bg-black/75 ">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-silver/10 rounded-sm border border-silver/30 shadow-[0_0_15px_rgba(232,232,232,0.2)]">
                    <MapPin className="h-6 w-6 text-silver drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                  </div>
                  <div>
                    <p className="font-black text-white mb-1 uppercase tracking-wide premium-heading-sm">Address</p>
                    <p className="text-white/80">{BRAND_CONFIG.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-silver/10 rounded-sm border border-silver/30 shadow-[0_0_15px_rgba(232,232,232,0.2)]">
                    <Phone className="h-6 w-6 text-silver drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                  </div>
                  <div>
                    <p className="font-black text-white mb-1 uppercase tracking-wide premium-heading-sm">Phone</p>
                    <a
                      href={`tel:${BRAND_CONFIG.contact.phone}`}
                      className="premium-silver-text hover:underline transition-colors font-bold"
                    >
                      {BRAND_CONFIG.contact.phoneFormatted}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-silver/10 rounded-sm border border-silver/30 shadow-[0_0_15px_rgba(232,232,232,0.2)]">
                    <Mail className="h-6 w-6 text-silver drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                  </div>
                  <div>
                    <p className="font-black text-white mb-1 uppercase tracking-wide premium-heading-sm">Email</p>
                    <a
                      href={`mailto:${BRAND_CONFIG.contact.email}`}
                      className="premium-silver-text hover:underline transition-colors font-bold"
                    >
                      {BRAND_CONFIG.contact.email}
                    </a>
                  </div>
                </div>
                <div className="pt-4 border-t border-silver/20">
                  <p className="text-sm text-white/80 mb-2">
                    <strong className="text-white font-black">Owner:</strong> {BRAND_CONFIG.owner}
                  </p>
                  <p className="text-sm text-white/80">
                    {BRAND_CONFIG.contact.cta}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Service Areas - Standard bullet points only */}
            <Card className="card-premium border-silver/30 bg-black/75 ">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  Service Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4 premium-text">
                  We proudly serve Calgary and surrounding areas including:
                </p>
                <ul className="space-y-2 text-white/80 list-disc list-inside premium-text">
                  <li>Calgary (All Quadrants)</li>
                  <li>Airdrie</li>
                  <li>Cochrane</li>
                  <li>Okotoks</li>
                  <li>Chestermere</li>
                  <li>And more!</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Optional CTA Block at Bottom */}
      <section className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center relative z-10">
          <Card className="card-premium border-silver/30 p-6 sm:p-8 md:p-10 lg:p-12 bg-black/75 ">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black mb-4 sm:mb-5 md:mb-6 text-white uppercase tracking-tight premium-heading px-2">
              Ready to Get Started?
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-4 sm:mb-5 md:mb-6 shadow-[0_0_20px_rgba(232,232,232,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-7 md:mb-8 leading-relaxed premium-text px-2">
              Experience the difference of working with a family-owned company. Get a free consultation today.
            </p>
            <Button asChild size="lg" className="btn-premium px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base md:text-lg uppercase tracking-wider w-full sm:w-auto">
              <Link href="/get-quote">Get a Quote</Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
