import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/utils";
import { LogoFooter } from "@/components/LogoFooter";
import { Mail, MapPin, Phone, Facebook, Instagram, ArrowRight } from "lucide-react";

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

    { href: "/contact", label: "Contact" },
    { href: "/get-quote", label: "Get a Quote" },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden border-t border-silver/10 premium-bg-pattern">
      {/* Top orange accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent pointer-events-none"></div>

      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Meta strip */}
      <div className="border-b border-silver/[0.07] relative z-10">
        <div className="container mx-auto px-4 sm:px-6 py-3 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.25em]">{BRAND_CONFIG.motto}</p>
          <div className="flex items-center gap-3 text-[10px] text-white/30 font-bold uppercase tracking-widest">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0"></span>
              3rd Generation · Family Owned · Since 1968
            </span>
            <span className="hidden sm:inline">·</span>
            <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="hidden sm:inline hover:text-silver transition-colors">
              {BRAND_CONFIG.contact.phoneFormatted}
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">

          {/* Company Info */}
          <div className="space-y-5">
            <Link href="/" className="inline-block group">
              <LogoFooter className="h-12 md:h-14 w-auto group-hover:opacity-90 transition-opacity" />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">{BRAND_CONFIG.tagline}</p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-silver/[0.06] border border-silver/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-silver/60" />
                </div>
                <span className="text-white/50 leading-relaxed pt-1">{BRAND_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-primary/[0.08] border border-primary/15 flex items-center justify-center shrink-0">
                  <Phone className="h-3.5 w-3.5 text-primary/70" />
                </div>
                <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="text-white/70 hover:text-white transition-colors font-bold">
                  {BRAND_CONFIG.contact.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-silver/[0.06] border border-silver/10 flex items-center justify-center shrink-0">
                  <Mail className="h-3.5 w-3.5 text-silver/60" />
                </div>
                <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="text-white/50 hover:text-white transition-colors break-all text-xs sm:text-sm">
                  {BRAND_CONFIG.contact.email}
                </a>
              </div>
            </div>
            {(BRAND_CONFIG.social?.facebook || BRAND_CONFIG.social?.instagram) && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-bold">Follow</span>
                <div className="h-px w-5 bg-silver/10"></div>
                {BRAND_CONFIG.social.facebook && (
                  <a
                    href={BRAND_CONFIG.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-full border border-silver/10 hover:border-silver/35 flex items-center justify-center text-white/40 hover:text-silver transition-all"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                )}
                {BRAND_CONFIG.social.instagram && (
                  <a
                    href={BRAND_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-8 h-8 rounded-full border border-silver/10 hover:border-silver/35 flex items-center justify-center text-white/40 hover:text-silver transition-all"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Services */}
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-black text-white/25 uppercase tracking-[0.2em] mb-1">Explore</p>
              <h4 className="font-display font-black text-white uppercase tracking-wide text-sm">Services</h4>
              <div className="h-[2px] w-8 bg-gradient-to-r from-primary to-transparent mt-2 rounded-full" style={{ boxShadow: '0 0 8px hsla(22,100%,63%,0.35)' }}></div>
            </div>
            <ul className="space-y-1">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/45 hover:text-white transition-colors py-1"
                  >
                    <ArrowRight className="h-3 w-3 text-primary/0 group-hover:text-primary/70 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-black text-white/25 uppercase tracking-[0.2em] mb-1">Navigate</p>
              <h4 className="font-display font-black text-white uppercase tracking-wide text-sm">Company</h4>
              <div className="h-[2px] w-8 bg-gradient-to-r from-primary to-transparent mt-2 rounded-full" style={{ boxShadow: '0 0 8px hsla(22,100%,63%,0.35)' }}></div>
            </div>
            <ul className="space-y-1">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/45 hover:text-white transition-colors py-1"
                  >
                    <ArrowRight className="h-3 w-3 text-primary/0 group-hover:text-primary/70 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-black text-white/25 uppercase tracking-[0.2em] mb-1">Ready?</p>
              <h4 className="font-display font-black text-white uppercase tracking-wide text-sm">Get Started</h4>
              <div className="h-[2px] w-8 bg-gradient-to-r from-primary to-transparent mt-2 rounded-full" style={{ boxShadow: '0 0 8px hsla(22,100%,63%,0.35)' }}></div>
            </div>
            <div className="rounded-xl border border-silver/10 bg-white/[0.03] p-4 space-y-3">
              <p className="text-sm text-white/50 leading-relaxed">
                Free quote — no obligation. We beat competitor quotes by 5% guaranteed.
              </p>
              <ul className="space-y-1.5">
                {["5% Price Beat Guarantee", "Free consultation", "24-hour response"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-white/40">
                    <span className="w-3.5 h-3.5 rounded-full bg-primary/[0.12] border border-primary/25 flex items-center justify-center shrink-0">
                      <span className="w-1 h-1 rounded-full bg-primary block"></span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/get-quote"
                className="inline-flex w-full items-center justify-center gap-2 btn-premium px-4 py-2.5 rounded-md font-bold uppercase tracking-widest text-xs"
              >
                Request a Quote <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <p className="text-xs text-white/25 leading-relaxed">
              {BRAND_CONFIG.contact.cta}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-silver/[0.07] mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/25">
          <p>&copy; {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-primary/40"></span>
              Calgary, AB
            </span>
            <span>·</span>
            <span>Licensed &amp; Insured</span>
            <span>·</span>
            <span>3rd Generation Builder</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
