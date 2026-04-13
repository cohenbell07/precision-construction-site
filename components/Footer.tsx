import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/utils";
import { LogoFooter } from "@/components/LogoFooter";
import { Mail, MapPin, Phone, Facebook, Instagram, ArrowRight, Star } from "lucide-react";

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
    { href: "/about#meet-john-olivito", label: "Meet the Owner" },
  ];

  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Sandstone accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-sandstone/25 to-transparent" />

      {/* Social proof strip */}
      <div className="border-b border-white/[0.04]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-3 py-6 sm:py-8">
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 fill-sandstone/50 text-sandstone/50" />
              <span className="text-xs text-sandstone/50 font-medium uppercase tracking-[0.1em]">Free Consultations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-heading font-black text-white/80">5,000+</span>
              <span className="text-[10px] uppercase tracking-[0.12em] text-white/30 font-medium">Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-heading font-black text-white/80">58+</span>
              <span className="text-[10px] uppercase tracking-[0.12em] text-white/30 font-medium">Years</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-heading font-black text-white/80">3rd</span>
              <span className="text-[10px] uppercase tracking-[0.12em] text-white/30 font-medium">Generation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 py-14 sm:py-18 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">

          {/* Company Info */}
          <div className="space-y-5">
            <Link href="/" className="inline-block group">
              <LogoFooter className="h-12 md:h-14 w-auto group-hover:opacity-80 transition-opacity" />
            </Link>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              Three generations of quality craftsmanship. We treat every client like family and deliver only the best.
            </p>
            <div className="space-y-3 text-sm">
              <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="flex items-center gap-3 text-white/50 hover:text-sandstone/70 transition-colors group">
                <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.06] group-hover:border-sandstone/20 flex items-center justify-center shrink-0 transition-colors">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <span className="font-semibold">{BRAND_CONFIG.contact.phoneFormatted}</span>
              </a>
              <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="flex items-center gap-3 text-white/35 hover:text-sandstone/70 transition-colors group">
                <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.06] group-hover:border-sandstone/20 flex items-center justify-center shrink-0 transition-colors">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs sm:text-sm break-all">{BRAND_CONFIG.contact.email}</span>
              </a>
              <div className="flex items-center gap-3 text-white/30">
                <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm">{BRAND_CONFIG.contact.address}</span>
              </div>
            </div>
            {(BRAND_CONFIG.social?.facebook || BRAND_CONFIG.social?.instagram) && (
              <div className="flex items-center gap-2 pt-1">
                {BRAND_CONFIG.social.facebook && (
                  <a href={BRAND_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full border border-white/[0.06] hover:border-sandstone/25 flex items-center justify-center text-white/25 hover:text-sandstone/60 transition-all duration-300">
                    <Facebook className="h-4 w-4" />
                  </a>
                )}
                {BRAND_CONFIG.social.instagram && (
                  <a href={BRAND_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/[0.06] hover:border-sandstone/25 flex items-center justify-center text-white/25 hover:text-sandstone/60 transition-all duration-300">
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Services */}
          <div className="space-y-5">
            <div>
              <h4 className="font-heading font-bold text-white/80 uppercase tracking-[0.15em] text-xs">Services</h4>
              <div className="h-px w-8 bg-sandstone/20 mt-3" />
            </div>
            <ul className="space-y-0.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 text-sm text-white/30 hover:text-white/70 transition-colors py-1.5">
                    <ArrowRight className="h-3 w-3 text-transparent group-hover:text-sandstone/40 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <div>
              <h4 className="font-heading font-bold text-white/80 uppercase tracking-[0.15em] text-xs">Company</h4>
              <div className="h-px w-8 bg-sandstone/20 mt-3" />
            </div>
            <ul className="space-y-0.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 text-sm text-white/30 hover:text-white/70 transition-colors py-1.5">
                    <ArrowRight className="h-3 w-3 text-transparent group-hover:text-sandstone/40 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div className="space-y-5">
            <div>
              <h4 className="font-heading font-bold text-white/80 uppercase tracking-[0.15em] text-xs">Get Started</h4>
              <div className="h-px w-8 bg-sandstone/20 mt-3" />
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-4">
              <p className="text-sm text-white/35 leading-relaxed">
                Free quote — no obligation. We beat competitor quotes by 5% guaranteed.
              </p>
              <ul className="space-y-2">
                {["5% Price Beat Guarantee", "Free consultation", "24-hour response"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-white/30">
                    <span className="w-1 h-1 rounded-full bg-sandstone/30 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/get-quote"
                className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-full font-bold uppercase tracking-[0.15em] text-xs border border-sandstone/25 text-sandstone/70 hover:border-sandstone/50 hover:text-sandstone hover:bg-sandstone/[0.04] transition-all duration-300"
              >
                Request a Quote <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="bg-black/60">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="py-6 sm:py-5 flex flex-col items-center gap-2.5 sm:flex-row sm:justify-between sm:gap-3 text-center sm:text-left text-[11px] sm:text-[10px] text-white/40 sm:text-white/30 uppercase tracking-[0.12em] sm:tracking-[0.1em] leading-relaxed">
            <p>&copy; {new Date().getFullYear()} {BRAND_CONFIG.name}</p>
            <p className="max-w-xs sm:max-w-none">
              Serving Calgary, Airdrie, Cochrane &amp; Okotoks
            </p>
            <p>Licensed &amp; Insured &middot; Since 1968</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
