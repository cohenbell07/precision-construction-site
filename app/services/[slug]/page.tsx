"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { services, getServiceById, getRelatedServices } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { CheckCircle, Award, Users, Shield, ChevronDown, ChevronUp } from "lucide-react";

// Map service IDs to image paths - matches main Services page
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

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceById(params.slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  if (!service) {
    notFound();
  }

  const imagePath = serviceImageMap[service.id] || "/service-millwork.png";
  const relatedServices = service.relatedServices ? getRelatedServices(service.relatedServices) : [];

  return (
    <div className="min-h-screen bg-black relative premium-bg-pattern">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
      {/* Hero Banner */}
      <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
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
          <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mt-4 sm:mt-5 md:mt-6 max-w-3xl mx-auto premium-text px-2">
            Premium {service.title.toLowerCase()} services in Calgary. Family-owned since 1968, serving Calgary since 1997.
          </p>
        </div>
      </section>

      {/* Service Statistics */}
      {service.stats && service.stats.length > 0 && (
        <section className="py-12 sm:py-14 md:py-16 bg-[#1F1F1F] relative premium-bg-pattern">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {service.stats.map((stat, idx) => (
                <Card key={idx} className="card-premium border-gold/30 bg-black/60 backdrop-blur-sm text-center">
                  <CardContent className="pt-4 sm:pt-5 md:pt-6 px-3 sm:px-4">
                    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black premium-gold-text mb-1 sm:mb-2">{stat.value}</p>
                    <p className="text-white font-black uppercase tracking-wide premium-heading-sm text-xs sm:text-sm md:text-base">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Overview Section */}
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
              <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-gold to-transparent mb-4 sm:mb-5 md:mb-6 shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed premium-text mb-4 sm:mb-5 md:mb-6">
                {service.description}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-white/80 leading-relaxed premium-text">
                At {BRAND_CONFIG.shortName}, we bring over {new Date().getFullYear() - BRAND_CONFIG.established} years of construction expertise to every {service.title.toLowerCase()} project. As a 3rd generation, family-owned company, we treat every client like family and deliver only the best in quality, service, and satisfaction.
              </p>
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-gold/30 shadow-2xl">
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
              <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {service.benefits.map((benefit, idx) => (
                <Card key={idx} className="card-premium border-gold/30 bg-black/60 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
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
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
              <p className="text-lg text-white max-w-3xl mx-auto premium-text mt-4">
                A proven process that ensures your project runs smoothly from start to finish
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process.map((step) => (
                <Card key={step.step} className="card-premium border-gold/30 bg-black/60 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center">
                        <span className="text-gold font-black text-lg">{step.step}</span>
                      </div>
                      <CardTitle className="text-xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                        {step.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/90 leading-relaxed premium-text">
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
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
              <p className="text-lg text-white max-w-3xl mx-auto premium-text mt-4">
                We work with premium materials and offer a wide range of options to suit your style and budget
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {service.materials.map((material, idx) => (
                <Card key={idx} className="card-premium border-gold/20 bg-black/50 backdrop-blur-sm text-center hover:border-gold/40 transition-all">
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
              <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {service.details.map((detail, idx) => (
                <div key={idx} className="flex items-start space-x-4 p-6 bg-black/50 border border-gold/20 rounded-xl backdrop-blur-sm hover:border-gold/40 transition-all">
                  <CheckCircle className="h-6 w-6 text-gold mt-1 flex-shrink-0 drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
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
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
            </div>
            <div className="space-y-4">
              {service.faqs.map((faq, idx) => (
                <Card key={idx} className="card-premium border-gold/30 bg-black/60 backdrop-blur-sm overflow-hidden">
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
                          <ChevronUp className="h-5 w-5 text-gold flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gold flex-shrink-0" />
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

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
              backgroundSize: '100px 100px'
            }}></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-3 sm:mb-4 uppercase tracking-tight premium-heading">
                Related Services
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
              <p className="text-lg text-white max-w-3xl mx-auto premium-text mt-4">
                These services often work together to create complete solutions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((related) => {
                const relatedImagePath = serviceImageMap[related.id] || "/service-millwork.png";
                return (
                  <Link key={related.id} href={`/services/${related.id}`}>
                    <Card className="card-premium h-full overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 border-gold/30 bg-black/60 backdrop-blur-sm">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={relatedImagePath}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                      </div>
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-display font-black text-white mb-2 uppercase tracking-tight premium-heading-sm">
                          {related.title}
                        </CardTitle>
                        <CardDescription className="text-white/90 leading-relaxed premium-text text-sm">
                          {related.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <span className="premium-gold-text font-bold uppercase tracking-wide text-sm group-hover:underline inline-flex items-center gap-2">
                          Learn More <span className="transition-all duration-300">→</span>
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Block */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#1F1F1F] relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <Card className="card-premium border-gold/30 p-6 sm:p-8 md:p-10 lg:p-12 bg-black/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-3 sm:mb-4 uppercase tracking-tight premium-heading">
                Ready to Get Started?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-5 md:space-y-6">
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed premium-text px-2">
                Contact us today for a free consultation and quote on your {service.title.toLowerCase()} project. We treat every client like family and deliver only the best.
              </p>
              <p className="text-xs sm:text-sm md:text-base premium-gold-text font-bold uppercase tracking-wide px-2">
                {BRAND_CONFIG.motto}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button asChild size="lg" className="btn-premium px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base md:text-lg uppercase tracking-wider w-full sm:w-auto">
                  <Link href="/get-quote">Get a Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-gold/50 bg-black/50 hover:bg-black/70 hover:border-gold text-gold backdrop-blur-sm px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base md:text-lg w-full sm:w-auto">
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
