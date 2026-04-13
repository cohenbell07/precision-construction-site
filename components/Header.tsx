"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Facebook, Instagram, Phone } from "lucide-react";
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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("mobile-menu-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.overflow = "";
    }
    return () => {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full overflow-visible transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-sandstone/10' : 'bg-black/80 backdrop-blur-sm border-b border-transparent'}`}>
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
        <div className="hidden md:flex md:items-center md:justify-center md:gap-7 lg:gap-9">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-bold transition-colors relative group uppercase tracking-[0.18em] whitespace-nowrap ${isActive ? 'text-white' : 'text-white/45 hover:text-white'}`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[1.5px] rounded-full transition-[width] duration-300 ${isActive ? 'w-full bg-sandstone/60' : 'w-0 group-hover:w-full bg-white/30'}`}
                ></span>
              </Link>
            );
          })}
        </div>

        {/* Right: Desktop CTA + socials */}
        <div className="relative z-10 flex items-center shrink-0 md:justify-self-end gap-2 lg:gap-3">
          {(BRAND_CONFIG.social?.facebook || BRAND_CONFIG.social?.instagram) && (
            <div className="hidden md:flex items-center gap-1.5">
              <div className="w-px h-4 bg-white/10 mx-1"></div>
              {BRAND_CONFIG.social.facebook && (
                <a
                  href={BRAND_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Facebook page"
                  className="w-7 h-7 rounded-full border border-white/10 hover:border-sandstone/30 flex items-center justify-center text-white/35 hover:text-sandstone/70 transition-all duration-300"
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
                  className="w-7 h-7 rounded-full border border-white/10 hover:border-sandstone/30 flex items-center justify-center text-white/35 hover:text-sandstone/70 transition-all duration-300"
                >
                  <Instagram className="h-3.5 w-3.5" />
                </a>
              )}
              <div className="w-px h-4 bg-white/10 mx-1"></div>
            </div>
          )}
          <div className="hidden md:block">
            <Link
              href="/get-quote"
              className="inline-flex items-center px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] border border-sandstone/30 text-sandstone/80 hover:border-sandstone/60 hover:text-sandstone hover:bg-sandstone/[0.04] transition-all duration-400"
            >
              Request a Quote
            </Link>
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

      {/* Mobile Menu - fullscreen overlay (rendered via portal to escape header stacking context) */}
      {mounted && mobileMenuOpen && createPortal(
        <div className="md:hidden fixed inset-0 top-16 sm:top-[4.5rem] bg-black z-[100] overflow-y-auto">
          <div className="container mx-auto px-6 py-10 flex flex-col h-full">
            <div className="space-y-1 flex-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between text-3xl font-hero uppercase tracking-wide py-4 border-b border-white/[0.06] transition-colors ${isActive ? 'text-sandstone' : 'text-white hover:text-sandstone'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-sandstone" />}
                  </Link>
                );
              })}

              <div className="pt-8">
                <Link
                  href="/get-quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 w-full px-7 py-4 rounded-full text-sm font-bold uppercase tracking-[0.18em] bg-white text-black hover:bg-sandstone transition-colors"
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>

            <div className="pb-8 pt-8 mt-4 border-t border-white/[0.08] space-y-4">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-base font-semibold text-white/80 hover:text-sandstone transition-colors"
              >
                <Phone className="h-4 w-4" />
                Contact Us
              </Link>
              {(BRAND_CONFIG.social?.facebook || BRAND_CONFIG.social?.instagram) && (
                <div className="flex items-center gap-3">
                  {BRAND_CONFIG.social.facebook && (
                    <a
                      href={BRAND_CONFIG.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-10 h-10 rounded-full border border-white/[0.08] hover:border-sandstone/30 flex items-center justify-center text-white/35 hover:text-sandstone/60 transition-all"
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
                      className="w-10 h-10 rounded-full border border-white/[0.08] hover:border-sandstone/30 flex items-center justify-center text-white/35 hover:text-sandstone/60 transition-all"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
