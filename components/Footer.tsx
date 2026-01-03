import Link from "next/link";
import Image from "next/image";
import { BRAND_CONFIG } from "@/lib/utils";
import { Mail, MapPin } from "lucide-react";

export function Footer() {
  const serviceLinks = [
    { href: "/services#flooring", label: "Flooring" },
    { href: "/services#showers", label: "Custom Showers" },
    { href: "/services#cabinets", label: "Cabinets & Millwork" },
    { href: "/services#countertops", label: "Countertops" },
    { href: "/services#carpentry", label: "Interior Carpentry" },
    { href: "/services#murphy-beds", label: "Murphy Beds" },
  ];

  const companyLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/get-quote", label: "Get a Quote" },
  ];

  return (
    <footer className="bg-industrial-black text-text-primary relative overflow-hidden border-t border-steel/30 texture-concrete">
        <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/3 rounded-full blur-xl"></div>
      </div>
      <div className="container mx-auto px-4 py-16 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="mb-4">
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
            <p className="text-gold mb-3 text-sm font-bold uppercase tracking-wide">{BRAND_CONFIG.motto}</p>
            <p className="text-text-secondary mb-6 text-xs">{BRAND_CONFIG.tagline}</p>
            <div className="space-y-3 text-sm text-text-secondary">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gold flex-shrink-0" />
                <span>{BRAND_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gold flex-shrink-0" />
                <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="hover:text-gold transition-colors">
                  {BRAND_CONFIG.contact.email}
                </a>
              </div>
              <p className="text-xs text-text-muted mt-4">
                {BRAND_CONFIG.contact.cta}
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold mb-6 text-gold uppercase tracking-wide">Services</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-gold transition-colors inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold mb-6 text-gold uppercase tracking-wide">Company</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-gold transition-colors inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h4 className="font-display font-bold mb-6 text-gold uppercase tracking-wide">Get Started</h4>
            <p className="text-sm text-text-secondary mb-6 leading-relaxed">
              Ready to start your project? Get a free quote today.
            </p>
            <Link
              href="/get-quote"
              className="inline-block btn-premium px-6 py-3 rounded-sm font-black uppercase tracking-wider"
            >
              Request a Quote
            </Link>
          </div>
        </div>

        <div className="border-t border-steel/30 mt-12 pt-8 text-center text-sm text-text-secondary">
          <p>&copy; {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

