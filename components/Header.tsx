"use client";

/**
 * Site header — Showroom canvas (always dark, architectural framing).
 *
 * Perf budget: previous version transitioned 4 properties (bg, blur, shadow,
 * border) on every scroll via `transition-all duration-500`, plus a
 * `scale-105` on the logo. This version only animates background-color and
 * border-color on a single 250ms transition. Logo hover is opacity-only.
 *
 * Design refresh: social icons moved out of desktop nav (they belong in the
 * footer); CTA upgraded from outline-ghost to a sandstone-fill button so it
 * reads as a real action; active-link indicator is a static sandstone dot
 * rather than an animated underline.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Facebook, Instagram, Phone, ArrowRight } from "lucide-react";
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

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`
        sticky top-0 z-50 w-full overflow-visible backdrop-blur-md
        transition-[background-color,border-color] duration-200 ease-out
        ${scrolled ? "bg-black/90 border-b border-sandstone/15" : "bg-black/60 border-b border-transparent"}
      `}
    >
      <nav className="container mx-auto flex md:grid h-16 sm:h-[4.5rem] md:h-20 md:grid-cols-[1fr_auto_1fr] items-center justify-between md:justify-normal px-4 sm:px-6 max-w-7xl overflow-visible gap-4">

        <Link
          href="/"
          data-header-logo
          className="relative z-10 flex items-center group overflow-visible shrink-0 md:justify-self-start bg-transparent border-0 outline-none transition-opacity duration-200 hover:opacity-85"
          aria-label="Home"
        >
          <Logo className="h-10 sm:h-12 md:h-[56px] lg:h-[64px] w-auto shrink-0" />
        </Link>

        {/* Desktop Navigation — centered */}
        <div className="hidden md:flex md:items-center md:justify-center md:gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  relative text-[11px] font-bold uppercase tracking-[0.2em] whitespace-nowrap
                  transition-colors duration-200
                  ${isActive ? "text-white" : "text-white/65 hover:text-white"}
                `}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-sandstone" aria-hidden />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Desktop CTA */}
        <div className="relative z-10 flex items-center shrink-0 md:justify-self-end gap-2">
          <div className="hidden md:block">
            <Link
              href="/get-quote"
              className="
                group inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                text-[11px] font-bold uppercase tracking-[0.2em]
                bg-sandstone text-black
                shadow-[0_2px_10px_-2px_rgba(196,181,160,0.4)]
                transition-[background-color,transform,box-shadow] duration-200 ease-out
                hover:bg-sandstone-light hover:-translate-y-[1px] hover:shadow-[0_6px_18px_-4px_rgba(196,181,160,0.55)]
              "
            >
              Free Quote
              <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <button
            className="md:hidden text-white/80 hover:text-white transition-colors p-2.5 -mr-1 w-11 h-11 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mounted && mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu — fullscreen overlay */}
      {mounted && mobileMenuOpen && createPortal(
        <div className="md:hidden fixed inset-0 top-16 sm:top-[4.5rem] bg-black z-[100] overflow-y-auto">
          {/* Sandstone hairline at top — architectural detail */}
          <div className="h-px bg-gradient-to-r from-transparent via-sandstone/40 to-transparent" />

          <div className="container mx-auto px-6 py-10 flex flex-col min-h-full">
            <p className="font-serif italic text-sandstone-muted text-base mb-8 max-w-xs">
              Three generations of quality, one family standard.
            </p>

            <div className="space-y-1 flex-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      flex items-center justify-between text-3xl font-hero uppercase tracking-wide py-4
                      border-b border-white/[0.06] transition-colors duration-150
                      ${isActive ? "text-sandstone" : "text-white hover:text-sandstone"}
                    `}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    {isActive ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-sandstone" />
                    ) : (
                      <ArrowRight className="w-5 h-5 text-white/30" />
                    )}
                  </Link>
                );
              })}

              <div className="pt-8">
                <Link
                  href="/get-quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 w-full px-7 py-4 rounded-full text-sm font-bold uppercase tracking-[0.18em] bg-sandstone text-black hover:bg-sandstone-light transition-colors"
                >
                  Get a Free Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="pb-8 pt-8 mt-4 border-t border-white/[0.08] space-y-4">
              <a
                href={`tel:${BRAND_CONFIG.contact.phone}`}
                className="flex items-center gap-2 text-base font-semibold text-white/80 hover:text-sandstone transition-colors"
              >
                <Phone className="h-4 w-4 text-sandstone" />
                {BRAND_CONFIG.contact.phoneFormatted}
              </a>
              {(BRAND_CONFIG.social?.facebook || BRAND_CONFIG.social?.instagram) && (
                <div className="flex items-center gap-3">
                  {BRAND_CONFIG.social.facebook && (
                    <a
                      href={BRAND_CONFIG.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-11 h-11 rounded-full border border-white/[0.08] hover:border-sandstone/40 flex items-center justify-center text-white/60 hover:text-sandstone transition-all"
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
                      className="w-11 h-11 rounded-full border border-white/[0.08] hover:border-sandstone/40 flex items-center justify-center text-white/60 hover:text-sandstone transition-all"
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
