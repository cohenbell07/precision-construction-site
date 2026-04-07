"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Facebook, Instagram, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND_CONFIG } from "@/lib/utils";
import { Logo } from "@/components/Logo";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full border-b overflow-visible transition-all duration-300 ${scrolled ? 'border-silver/20 bg-black/98 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'border-silver/10 bg-black/95'}`}>
      <div className="header-accent-line"></div>
      {/* Mobile: flex with logo left, menu right. Desktop: grid with centered nav */}
      <nav className="container mx-auto flex md:grid h-16 sm:h-[4.5rem] md:h-20 md:grid-cols-[1fr_auto_1fr] items-center justify-between md:justify-normal px-4 sm:px-6 max-w-7xl overflow-visible gap-4">
        <Link
          href="/"
          data-header-logo
          className="relative z-10 flex items-center group overflow-visible shrink-0 md:justify-self-start bg-transparent border-0 outline-none"
          aria-label="Home"
        >
          <Logo className="h-10 sm:h-12 md:h-[56px] lg:h-[69px] w-auto shrink-0 group-hover:scale-105 transition-transform duration-300" />
        </Link>

        {/* Desktop Navigation - centered */}
        <div className="hidden md:flex md:items-center md:justify-center md:gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-black transition-colors relative group uppercase tracking-widest whitespace-nowrap ${isActive ? 'text-white' : 'text-white/55 hover:text-white'}`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-primary to-primary/30 transition-[width] duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  style={isActive ? { boxShadow: '0 0 8px rgba(232,232,232,0.3)' } : undefined}
                ></span>
              </Link>
            );
          })}
        </div>

        {/* Right: Desktop CTA + socials or Mobile menu button */}
        <div className="relative z-10 flex items-center shrink-0 md:justify-self-end gap-2 lg:gap-3">
          {/* Desktop socials */}
          {(BRAND_CONFIG.social?.facebook || BRAND_CONFIG.social?.instagram) && (
            <div className="hidden md:flex items-center gap-1.5">
              <div className="w-px h-4 bg-silver/15 mx-1"></div>
              {BRAND_CONFIG.social.facebook && (
                <a
                  href={BRAND_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Facebook page"
                  className="w-7 h-7 rounded-full border border-silver/15 hover:border-silver/40 flex items-center justify-center text-white/45 hover:text-silver transition-all"
                >
                  <Facebook className="h-3.5 w-3.5" />
                </a>
              )}
              {BRAND_CONFIG.social.instagram && (
                <a
                  href={BRAND_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Instagram profile"
                  className="w-7 h-7 rounded-full border border-silver/15 hover:border-silver/40 flex items-center justify-center text-white/45 hover:text-silver transition-all"
                >
                  <Instagram className="h-3.5 w-3.5" />
                </a>
              )}
              <div className="w-px h-4 bg-silver/15 mx-1"></div>
            </div>
          )}
          <div className="hidden md:block">
            <Button asChild className="bg-white text-black font-bold hover:bg-white/90 transition-colors rounded-full text-xs px-4 py-2 h-auto uppercase tracking-widest">
              <Link href="/get-quote">Request a Quote</Link>
            </Button>
          </div>
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors p-2.5 -mr-1 w-11 h-11 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mounted && mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-silver/10 bg-black/98 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isActive ? 'bg-white/[0.06] text-white border border-silver/15' : 'text-white/55 hover:text-white hover:bg-white/[0.03]'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${isActive ? 'bg-primary' : 'bg-silver/20'}`}></span>
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-2 pb-1">
              <Button asChild className="w-full bg-white text-black font-bold hover:bg-white/90 transition-colors rounded-full uppercase tracking-widest text-xs">
                <Link href="/get-quote" onClick={() => setMobileMenuOpen(false)}>
                  Request a Quote
                </Link>
              </Button>
            </div>

            <div className="pt-2 border-t border-silver/10 mt-1 px-1">
              <div className="flex items-center justify-between py-2">
                <a
                  href={`tel:${BRAND_CONFIG.contact.phone}`}
                  className="flex items-center gap-2 text-xs font-bold text-white/45 hover:text-silver transition-colors uppercase tracking-widest"
                >
                  <Phone className="h-3.5 w-3.5 text-primary/70" />
                  {BRAND_CONFIG.contact.phoneFormatted}
                </a>
                {(BRAND_CONFIG.social?.facebook || BRAND_CONFIG.social?.instagram) && (
                  <div className="flex items-center gap-2">
                    {BRAND_CONFIG.social.facebook && (
                      <a
                        href={BRAND_CONFIG.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit our Facebook page"
                        className="w-8 h-8 rounded-full border border-silver/15 hover:border-silver/40 flex items-center justify-center text-white/45 hover:text-silver transition-all"
                      >
                        <Facebook className="h-4 w-4" />
                      </a>
                    )}
                    {BRAND_CONFIG.social.instagram && (
                      <a
                        href={BRAND_CONFIG.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit our Instagram profile"
                        className="w-8 h-8 rounded-full border border-silver/15 hover:border-silver/40 flex items-center justify-center text-white/45 hover:text-silver transition-all"
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

