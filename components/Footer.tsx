import Link from "next/link";
import Image from "next/image";
import { BRAND_CONFIG } from "@/lib/utils";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const serviceLinks = [
    { href: "/services/cabinets", label: "Cabinets & Millwork" },
    { href: "/services/showers", label: "Custom Showers" },
    { href: "/services/countertops", label: "Countertops" },
    { href: "/services/flooring", label: "Flooring" },
    { href: "/services/carpentry", label: "Interior Carpentry" },
    { href: "/services/basements", label: "Basement Development" },
  ];

  const companyLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
    { href: "/get-quote", label: "Get a Quote" },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden border-t border-gold/30 premium-bg-pattern">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
      <div className="container mx-auto px-4 py-16 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <Link href="/" className="inline-block">
                <Image
                  src="/PCNDlogo.png"
                  alt="PCND"
                  width={200}
                  height={60}
                  className="h-12 md:h-14 w-auto"
                  priority
                />
              </Link>
            </div>
            <p className="premium-gold-text text-sm font-bold uppercase tracking-wide">{BRAND_CONFIG.motto}</p>
            <p className="text-white/80 text-sm">{BRAND_CONFIG.tagline}</p>
            <div className="space-y-3 text-sm text-white/80 pt-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="hover:text-gold transition-colors underline-offset-2 hover:underline">
                  {BRAND_CONFIG.contact.phoneFormatted}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="hover:text-gold transition-colors underline-offset-2 hover:underline">
                  {BRAND_CONFIG.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Services - Stacked Layout */}
          <div className="space-y-3">
            <h4 className="font-display font-black text-gold uppercase tracking-wide text-sm premium-gold-text">Services</h4>
            <ul className="space-y-2 text-sm text-white/80">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="hover:text-gold transition-colors inline-block underline-offset-2 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company - Stacked Layout */}
          <div className="space-y-3">
            <h4 className="font-display font-black text-gold uppercase tracking-wide text-sm premium-gold-text">Company</h4>
            <ul className="space-y-2 text-sm text-white/80">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="hover:text-gold transition-colors inline-block underline-offset-2 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-gold uppercase tracking-wide text-sm premium-gold-text">Get Started</h4>
            <p className="text-sm text-white/80 leading-relaxed">
              Ready to start your project? Get a free quote today.
            </p>
            <Link
              href="/get-quote"
              className="inline-block btn-premium px-6 py-3 rounded-sm font-bold uppercase tracking-wider text-sm"
            >
              Request a Quote
            </Link>
            <p className="text-xs text-white/60 mt-4">
              {BRAND_CONFIG.contact.cta}
            </p>
          </div>
        </div>

        <div className="border-t border-gold/20 mt-12 pt-8 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
