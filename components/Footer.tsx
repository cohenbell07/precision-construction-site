/**
 * Site footer — Showroom canvas (always dark, architectural framing).
 *
 * Refresh:
 * - Replaces the old 4-stat social-proof strip with a confident CTA banner —
 *   one clear "let's talk" moment at the top instead of redundant numbers
 *   already shown elsewhere on the site.
 * - Drops the cluttered 4th "Get Started" card from the column grid; goes to
 *   a cleaner 3-column layout (Brand + Services + Company).
 * - Removes the circle-wrapper icons in the contact list; inline icons
 *   read cleaner against the dark canvas.
 * - Sub-footer typography goes from 10px tracking-out caps to readable
 *   regular small text.
 */

import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/utils";
import { services } from "@/lib/services";
import { LogoFooter } from "@/components/LogoFooter";
import { Mail, MapPin, Phone, Facebook, Instagram, ArrowRight } from "lucide-react";

export function Footer() {
  // Map every service so none are footer orphans — gives all 14 service pages
  // a sitewide internal link with keyword-rich anchor text.
  const serviceLinks = services.map((s) => ({ href: `/services/${s.id}`, label: s.title }));

  const companyLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/areas-we-serve", label: "Areas We Serve" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/get-quote", label: "Get a Quote" },
    { href: "/price-beat", label: "Price Beat Guarantee" },
  ];

  const servingLine = `Serving ${BRAND_CONFIG.areasServed.slice(0, -1).join(", ")} & ${BRAND_CONFIG.areasServed.slice(-1)}`;

  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Top sandstone hairline — architectural transition from the page above. */}
      <div className="h-px bg-gradient-to-r from-transparent via-sandstone/30 to-transparent" />

      {/* ━━━ CTA BANNER ━━━ */}
      <div className="border-b border-white/[0.04] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(196,181,160,0.08) 0%, rgba(0,0,0,0) 65%)" }}
        />
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative">
          <div className="py-10 sm:py-14 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-8 bg-sandstone/60" />
                <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-sandstone/80 font-medium">Ready to Build?</p>
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight leading-[0.95] text-white mb-3">
                Let&apos;s Talk About<br className="hidden sm:block" /> Your Project.
              </h3>
              <p className="font-serif italic text-white/55 text-base sm:text-lg max-w-md">
                Free consultation.{" "}
                <Link href="/price-beat" className="text-white/75 underline underline-offset-4 decoration-white/25 hover:text-sandstone hover:decoration-sandstone/60 transition-colors">
                  5% price beat guarantee
                </Link>
                . We respond within 24 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 shrink-0">
              <Link
                href="/get-quote"
                className="
                  group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full
                  text-sm font-bold uppercase tracking-[0.18em]
                  bg-sandstone text-black
                  shadow-[0_4px_16px_-4px_rgba(196,181,160,0.4)]
                  transition-[transform,box-shadow,background-color] duration-200 ease-out
                  hover:bg-sandstone-light hover:-translate-y-[1px] hover:shadow-[0_8px_24px_-4px_rgba(196,181,160,0.55)]
                "
              >
                Get a Free Quote <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <div className="flex items-center gap-3 text-white/70">
                <span className="hidden sm:inline text-xs uppercase tracking-[0.2em] text-white/40">or call</span>
                <a
                  href={`tel:${BRAND_CONFIG.contact.phone}`}
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-white hover:text-sandstone transition-colors"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 text-sandstone" />
                  {BRAND_CONFIG.contact.phoneFormatted}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━ MAIN COLUMNS ━━━ */}
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 lg:gap-20">

          {/* Brand + Contact */}
          <div className="space-y-6 md:col-span-1">
            <Link href="/" className="inline-block transition-opacity duration-200 hover:opacity-85">
              <LogoFooter className="h-12 md:h-14 w-auto" />
            </Link>
            <p className="font-serif italic text-white/65 text-base leading-snug max-w-xs">
              Three generations of quality. Family-owned since 1968.
            </p>
            <div className="space-y-3 text-sm">
              <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="flex items-center gap-3 text-white/65 hover:text-sandstone transition-colors">
                <Phone aria-hidden="true" className="h-4 w-4 text-sandstone/70" />
                <span className="font-semibold">{BRAND_CONFIG.contact.phoneFormatted}</span>
              </a>
              <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="flex items-center gap-3 text-white/65 hover:text-sandstone transition-colors">
                <Mail aria-hidden="true" className="h-4 w-4 text-sandstone/70 shrink-0" />
                <span className="break-all">{BRAND_CONFIG.contact.email}</span>
              </a>
              <div className="flex items-center gap-3 text-white/65">
                <MapPin aria-hidden="true" className="h-4 w-4 text-sandstone/70 shrink-0" />
                <span>{BRAND_CONFIG.contact.address}</span>
              </div>
            </div>
            {(BRAND_CONFIG.social?.facebook || BRAND_CONFIG.social?.instagram) && (
              <div className="flex items-center gap-2 pt-1">
                {BRAND_CONFIG.social.facebook && (
                  <a href={BRAND_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-11 h-11 rounded-full border border-white/10 hover:border-sandstone/40 flex items-center justify-center text-white/55 hover:text-sandstone transition-colors duration-200">
                    <Facebook aria-hidden="true" className="h-4 w-4" />
                  </a>
                )}
                {BRAND_CONFIG.social.instagram && (
                  <a href={BRAND_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-full border border-white/10 hover:border-sandstone/40 flex items-center justify-center text-white/55 hover:text-sandstone transition-colors duration-200">
                    <Instagram aria-hidden="true" className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Services */}
          <div className="space-y-5">
            <div>
              <h4 className="font-heading font-bold text-white uppercase tracking-[0.2em] text-xs">Services</h4>
              <div className="h-px w-10 bg-sandstone/40 mt-3" />
            </div>
            <details className="md:hidden rounded-md border border-white/[0.08] bg-white/[0.02] px-4 py-3">
              <summary className="cursor-pointer list-none text-sm font-semibold text-white/75">
                View service links
              </summary>
              <ul className="mt-4 space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/62 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
            <ul className="hidden md:block space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-150">
                    <ArrowRight aria-hidden="true" className="h-3 w-3 text-sandstone/0 group-hover:text-sandstone/70 -translate-x-2 group-hover:translate-x-0 transition-[transform,color] duration-200 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <div>
              <h4 className="font-heading font-bold text-white uppercase tracking-[0.2em] text-xs">Company</h4>
              <div className="h-px w-10 bg-sandstone/40 mt-3" />
            </div>
            <details className="md:hidden rounded-md border border-white/[0.08] bg-white/[0.02] px-4 py-3">
              <summary className="cursor-pointer list-none text-sm font-semibold text-white/75">
                View company links
              </summary>
              <ul className="mt-4 space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/62 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
            <ul className="hidden md:block space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-150">
                    <ArrowRight aria-hidden="true" className="h-3 w-3 text-sandstone/0 group-hover:text-sandstone/70 -translate-x-2 group-hover:translate-x-0 transition-[transform,color] duration-200 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ━━━ SUB-FOOTER ━━━ */}
      <div className="bg-black/60 border-t border-white/[0.04]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="py-6 pb-48 md:pb-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-between sm:gap-4 text-xs sm:text-[13px] text-white/50">
            <p>&copy; {new Date().getFullYear()} {BRAND_CONFIG.name}</p>
            <p>{servingLine}</p>
            <p>Licensed &amp; Insured &middot; Family Owned Since 1968</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
