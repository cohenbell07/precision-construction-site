import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { services, getServiceById } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { CheckCircle, Award, Users, Shield } from "lucide-react";

// Map service IDs to image paths - matches main Services page
const serviceImageMap: { [key: string]: string } = {
  cabinets: "/service-millwork.png",
  showers: "/service-steam-shower.png",
  countertops: "/service-countertops.png",
  basements: "/basement-development.png",
  carpentry: "/service-trim.png",
  flooring: "/service-millwork.png", // Default fallback - update when flooring.png is available
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
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
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
        
        <div className="relative z-10 container mx-auto px-4 text-center max-w-6xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading">
            {service.title}
          </h1>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
          <p className="text-xl md:text-2xl text-white mt-6 max-w-3xl mx-auto premium-text">
            Premium {service.title.toLowerCase()} services in Calgary. Family-owned since 1968, serving Calgary since 1997.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-[#1F1F1F] relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-6 uppercase tracking-tight premium-heading">
                What We Do
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mb-6 shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
              <p className="text-lg md:text-xl text-white leading-relaxed premium-text mb-6">
                {service.description}
              </p>
              <p className="text-base text-white/80 leading-relaxed premium-text">
                At {BRAND_CONFIG.shortName}, we bring over {new Date().getFullYear() - BRAND_CONFIG.established} years of construction expertise to every {service.title.toLowerCase()} project. As a 3rd generation, family-owned company, we treat every client like family and deliver only the best in quality, service, and satisfaction.
              </p>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden border border-gold/30 shadow-2xl">
              <Image
                src={imagePath}
                alt={`${service.title} project example`}
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

      {/* Features Section */}
      {service.details && service.details.length > 0 && (
        <section className="py-20 bg-black relative premium-bg-pattern">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
              backgroundSize: '100px 100px'
            }}></div>
          </div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading">
                Our {service.title} Services
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Why Choose Us Section */}
      <section className="py-20 bg-[#1F1F1F] relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading">
              Why Choose Us for {service.title}
            </h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="card-premium border-gold/30 bg-black/50 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full"></div>
                  <Users className="h-12 w-12 mx-auto text-gold relative z-10 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
                </div>
                <CardTitle className="text-lg font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  Family-Owned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/90 premium-text">
                  3rd generation construction company. We treat every client like family.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="card-premium border-gold/30 bg-black/50 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full"></div>
                  <Award className="h-12 w-12 mx-auto text-gold relative z-10 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
                </div>
                <CardTitle className="text-lg font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  Premium Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/90 premium-text">
                  Only the best materials and craftsmanship. We stand behind our work.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="card-premium border-gold/30 bg-black/50 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full"></div>
                  <Shield className="h-12 w-12 mx-auto text-gold relative z-10 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
                </div>
                <CardTitle className="text-lg font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  Trusted & Reliable
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/90 premium-text">
                  Serving Calgary since 1997. Over {new Date().getFullYear() - BRAND_CONFIG.servingSince} years of trusted service.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="card-premium border-gold/30 bg-black/50 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full"></div>
                  <CheckCircle className="h-12 w-12 mx-auto text-gold relative z-10 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
                </div>
                <CardTitle className="text-lg font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  Complete Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/90 premium-text">
                  Your satisfaction is our priority. We build lasting relationships.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <section className="py-20 bg-black relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <Card className="card-premium border-gold/30 p-12 bg-black/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading">
                Ready to Get Started?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-white/90 leading-relaxed premium-text">
                Contact us today for a free consultation and quote on your {service.title.toLowerCase()} project. We treat every client like family and deliver only the best.
              </p>
              <p className="text-base premium-gold-text font-bold uppercase tracking-wide">
                {BRAND_CONFIG.motto}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="btn-premium px-8 py-6 text-lg uppercase tracking-wider">
                  <Link href="/get-quote">Get a Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-gold/50 bg-black/50 hover:bg-black/70 hover:border-gold text-gold backdrop-blur-sm">
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
