"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND_CONFIG } from "@/lib/utils";
import { Logo } from "@/components/Logo";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-silver/20 bg-black/98 overflow-visible">
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[#F5F5F5] transition-colors hover:text-silver relative group uppercase tracking-wide whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-silver transition-[width,box-shadow] duration-300 group-hover:w-full shadow-[0_0_4px_rgba(232,232,232,0.5)]"></span>
            </Link>
          ))}
        </div>

        {/* Right: Desktop CTA + socials or Mobile menu button */}
        <div className="relative z-10 flex items-center shrink-0 md:justify-self-end gap-3">
          {/* Desktop socials */}
          {(BRAND_CONFIG.social?.facebook || BRAND_CONFIG.social?.instagram) && (
            <div className="hidden md:flex items-center gap-2 pr-1">
              {BRAND_CONFIG.social.facebook && (
                <a
                  href={BRAND_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Facebook page"
                  className="text-white/70 hover:text-silver transition-colors"
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
                  className="text-white/70 hover:text-silver transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
          <div className="hidden md:block">
            <Button asChild className="btn-premium">
              <Link href="/get-quote">Request a Quote</Link>
            </Button>
          </div>
          <button
            className="md:hidden text-text-primary hover:text-silver transition-colors p-2 -mr-1"
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
        <div className="md:hidden border-t border-silver/20 bg-black/98">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-semibold text-[#F5F5F5] transition-colors hover:text-silver py-2 uppercase tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="w-full btn-premium">
              <Link href="/get-quote" onClick={() => setMobileMenuOpen(false)}>
                Request a Quote
              </Link>
            </Button>
            {(BRAND_CONFIG.social?.facebook || BRAND_CONFIG.social?.instagram) && (
              <div className="pt-2 border-t border-silver/20 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wide text-white/60">
                    Follow us
                  </span>
                  <div className="flex items-center gap-3">
                    {BRAND_CONFIG.social.facebook && (
                      <a
                        href={BRAND_CONFIG.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit our Facebook page"
                        className="text-white/70 hover:text-silver transition-colors"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                    )}
                    {BRAND_CONFIG.social.instagram && (
                      <a
                        href={BRAND_CONFIG.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit our Instagram profile"
                        className="text-white/70 hover:text-silver transition-colors"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

