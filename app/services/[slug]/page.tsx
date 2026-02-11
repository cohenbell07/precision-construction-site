"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServiceById } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { CheckCircle, Award, Users, Shield, ChevronDown, ChevronUp } from "lucide-react";

// Map service IDs to image paths - matches main Services page
const serviceImageMap: { [key: string]: string } = {
  cabinets: "/service-millwork.png",
  showers: "/service-steam-shower.png",
  countertops: "/countertopsservice3.png",
  basements: "/basementdevservice5.png",
  carpentry: "/interiorfinishingservice1.png",
  flooring: "/flooringinstallservice2.png",
  framing: "/framingservice4.png",
  drywall: "/drywall-texture.png",
  painting: "/painting.png",
  garages: "/garage-deck-fence.png",
  stone: "/stone-setting.png",
  renovations: "/home-additions.png",
  commercial: "/commercial-construction.png",
};

function ServiceMaterialsForm({ serviceName }: { serviceName: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/leads/service-materials-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceName, name: name || undefined, email: email.trim(), message: message.trim() }),
      });
      if (res.ok) {
        setSent(true);
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#1F1F1F] relative premium-bg-pattern">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
          backgroundSize: "100px 100px"
        }} />
      </div>
      <div className="container mx-auto px-4 sm:px-6 max-w-2xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-3 uppercase tracking-tight premium-heading">
            Need something not listed?
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto shadow-[0_0_15px_rgba(232,232,232,0.4)]" />
          <p className="text-white/90 premium-text mt-4">
            Ask if we have the materials you need or any questions about this service. We&apos;ll get back to you soon.
          </p>
        </div>
        {sent ? (
          <Card className="card-premium border-silver/30 bg-black/75 text-center py-8">
            <p className="text-white font-semibold">Thanks! We&apos;ve received your message and will reply shortly.</p>
          </Card>
        ) : (
          <Card className="card-premium border-silver/30 bg-black/75">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="serviceName" value={serviceName} />
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-black/65 border-silver/30 text-white placeholder:text-white/50"
                />
                <Input
                  type="email"
                  placeholder="Email *"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/65 border-silver/30 text-white placeholder:text-white/50"
                />
                <textarea
                  placeholder="What materials or questions do you have for this service?"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="flex w-full rounded-xl border-2 border-silver/30 bg-black/65 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-silver/50 focus:border-silver min-h-[120px]"
                />
                <Button type="submit" disabled={loading} className="w-full btn-premium uppercase tracking-wider">
                  {loading ? "Sending…" : "Send inquiry"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceById(params.slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  if (!service) {
    notFound();
  }

  const imagePath = serviceImageMap[service.id] || "/service-millwork.png";

  return (
    <div className="min-h-screen bg-black relative premium-bg-pattern">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
      {/* Hero Banner */}
      <section className="relative min-h-[240px] sm:min-h-[350px] md:min-h-[450px] h-[50vh] sm:h-[55vh] md:h-[60vh] max-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/service-header-workers.png"
            alt={`${service.title} services by ${BRAND_CONFIG.shortName}`}
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center max-w-6xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black text-white mb-3 sm:mb-4 uppercase tracking-tight premium-heading px-2">
            {service.title}
          </h1>
          <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto shadow-[0_0_20px_rgba(232,232,232,0.5)]"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mt-4 sm:mt-5 md:mt-6 max-w-3xl mx-auto premium-text px-2">
            Premium {service.title.toLowerCase()} services in Calgary. Family-owned since 1968, serving Calgary since 1997.
          </p>
        </div>
      </section>

      {/* What We Do - directly under hero */}
      <section className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-4 sm:mb-5 md:mb-6 uppercase tracking-tight premium-heading">
                What We Do
              </h2>
              <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-silver to-transparent mb-4 sm:mb-5 md:mb-6 shadow-[0_0_15px_rgba(232,232,232,0.4)]"></div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed premium-text mb-4 sm:mb-5 md:mb-6">
                {service.description}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-white/80 leading-relaxed premium-text">
                At {BRAND_CONFIG.shortName}, we bring over {new Date().getFullYear() - BRAND_CONFIG.established} years of construction expertise to every {service.title.toLowerCase()} project. As a 3rd generation, family-owned company, we treat every client like family and deliver only the best in quality, service, and satisfaction.
              </p>
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-silver/30 shadow-2xl">
              <Image
                src={imagePath}
                alt={service.id === "flooring" ? "Premium flooring installation" : `${service.title} project example`}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Service-Specific Benefits */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-[#1F1F1F] relative premium-bg-pattern">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
              backgroundSize: '100px 100px'
            }}></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-3 sm:mb-4 uppercase tracking-tight premium-heading">
                Why Choose Us for {service.title}
              </h2>
              <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto shadow-[0_0_15px_rgba(232,232,232,0.4)]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {service.benefits.map((benefit, idx) => (
                <Card key={idx} className="card-premium border-silver/30 bg-black/75 ">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-silver/10 border-2 border-silver/30 flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-silver drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                        </div>
                      </div>
                      <p className="text-white text-base leading-relaxed premium-text flex-1">{benefit}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Process */}
      {service.process && service.process.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
              backgroundSize: '100px 100px'
            }}></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-3 sm:mb-4 uppercase tracking-tight premium-heading">
                Our Process
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto shadow-[0_0_15px_rgba(232,232,232,0.4)]"></div>
              <p className="text-lg text-white max-w-3xl mx-auto premium-text mt-4">
                A proven process that ensures your project runs smoothly from start to finish
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process.map((step) => (
                <Card key={step.step} className="card-premium border-silver/30 bg-black/75 flex flex-col h-full overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex flex-row lg:flex-col items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 min-w-[2.5rem] min-h-[2.5rem] sm:min-w-[3rem] sm:min-h-[3rem] shrink-0 rounded-full bg-silver/20 border-2 border-silver flex items-center justify-center">
                        <span className="text-silver font-black text-base sm:text-xl leading-none">{step.step}</span>
                      </div>
                      <div className="min-w-0 flex-1 lg:w-full">
                        <CardTitle className="text-base sm:text-lg font-display font-black text-white uppercase tracking-tight premium-heading-sm leading-snug hyphens-auto" lang="en">
                          {step.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 flex-1 min-h-0">
                    <CardDescription className="text-white/90 leading-relaxed premium-text text-sm">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Materials & Options */}
      {service.materials && service.materials.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-[#1F1F1F] relative premium-bg-pattern">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
              backgroundSize: '100px 100px'
            }}></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-3 sm:mb-4 uppercase tracking-tight premium-heading">
                Materials & Options
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto shadow-[0_0_15px_rgba(232,232,232,0.4)]"></div>
              <p className="text-lg text-white max-w-3xl mx-auto premium-text mt-4">
                We work with premium materials and offer a wide range of options to suit your style and budget
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {service.materials.map((material, idx) => (
                <Card key={idx} className="card-premium border-silver/20 bg-black/65  text-center hover:border-silver/40 transition-colors">
                  <CardContent className="pt-6 pb-4">
                    <p className="text-white font-semibold premium-text">{material}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Detailed Services List */}
      {service.details && service.details.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
              backgroundSize: '100px 100px'
            }}></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-3 sm:mb-4 uppercase tracking-tight premium-heading">
                Our {service.title} Services
              </h2>
              <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto shadow-[0_0_15px_rgba(232,232,232,0.4)]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {service.details.map((detail, idx) => (
                <div key={idx} className="flex items-start space-x-4 p-6 bg-black/65 border border-silver/20 rounded-xl  hover:border-silver/40 transition-colors">
                  <CheckCircle className="h-6 w-6 text-silver mt-1 flex-shrink-0 drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                  <p className="text-white text-base leading-relaxed premium-text">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-[#1F1F1F] relative premium-bg-pattern">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
              backgroundSize: '100px 100px'
            }}></div>
          </div>
          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading">
                Frequently Asked Questions
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto shadow-[0_0_15px_rgba(232,232,232,0.4)]"></div>
            </div>
            <div className="space-y-4">
              {service.faqs.map((faq, idx) => (
                <Card key={idx} className="card-premium border-silver/30 bg-black/75  overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-display font-black text-white uppercase tracking-tight premium-heading-sm pr-4">
                          {faq.question}
                        </CardTitle>
                        {openFaq === idx ? (
                          <ChevronUp className="h-5 w-5 text-silver flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-silver flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>
                  </button>
                  {openFaq === idx && (
                    <CardContent className="pt-0 pb-6">
                      <p className="text-white/90 leading-relaxed premium-text">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ask if we have the materials you need */}
      <ServiceMaterialsForm serviceName={service.title} />

      {/* CTA Block */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#1F1F1F] relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <Card className="card-premium border-silver/30 p-6 sm:p-8 md:p-10 lg:p-12 bg-black/75 ">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-3 sm:mb-4 uppercase tracking-tight premium-heading">
                Ready to Get Started?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-5 md:space-y-6">
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed premium-text px-2">
                Contact us today for a free consultation and quote on your {service.title.toLowerCase()} project. We treat every client like family and deliver only the best.
              </p>
              <p className="text-xs sm:text-sm md:text-base premium-silver-text font-bold uppercase tracking-wide px-2">
                {BRAND_CONFIG.motto}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button asChild size="lg" className="btn-premium px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base md:text-lg uppercase tracking-wider w-full sm:w-auto">
                  <Link href="/get-quote">Get a Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-silver/50 bg-black/65 hover:bg-black/70 hover:border-silver text-silver  px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base md:text-lg w-full sm:w-auto">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
