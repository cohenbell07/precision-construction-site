"use client";

/**
 * Site header — Showroom canvas (always dark, architectural framing).
 *
 * a11y: hamburger toggle is wired with aria-expanded/aria-controls; mobile-menu
 * portal sets role="dialog" + aria-modal, traps Tab focus inside, restores focus
 * to the opener on close, and sets `inert` on <main> while open so the page
 * behind isn't tabbable.
 *
 * Perf: scroll transition is `transition-[background-color,border-color]
 * duration-200`, not the prior `transition-all duration-500` that animated bg +
 * blur + shadow + border simultaneously.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useId } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Facebook, Instagram, Phone, ArrowRight } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/utils";
import { Logo } from "@/components/Logo";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuTop, setMenuTop] = useState<number | null>(null);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTitleId = useId();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Body scroll lock + `inert` on the main content while the menu is open. */
  useEffect(() => {
    const main = document.querySelector("main");
    if (mobileMenuOpen) {
      document.body.classList.add("mobile-menu-open");
      document.body.style.overflow = "hidden";
      if (main) main.setAttribute("inert", "");
    } else {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.overflow = "";
      if (main) main.removeAttribute("inert");
    }
    return () => {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.overflow = "";
      if (main) main.removeAttribute("inert");
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const updateMenuTop = () => {
      const bottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;
      setMenuTop(Math.max(0, Math.round(bottom)));
    };

    updateMenuTop();
    window.addEventListener("resize", updateMenuTop);
    window.addEventListener("orientationchange", updateMenuTop);
    return () => {
      window.removeEventListener("resize", updateMenuTop);
      window.removeEventListener("orientationchange", updateMenuTop);
    };
  }, [mobileMenuOpen]);

  /* Escape to close + focus restore + Tab focus trap. */
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const opener = menuButtonRef.current;

    /* Move focus into the menu after open. */
    const firstLink = menuRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusables = menuRef.current.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      /* Restore focus to the toggle button on close. */
      opener?.focus();
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
    <header
      ref={headerRef}
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
          aria-label={`${BRAND_CONFIG.shortName} — Home`}
        >
          <Logo className="h-10 sm:h-12 md:h-[52px] lg:h-[60px] w-auto shrink-0" />
        </Link>

        {/* Desktop Navigation — centered */}
        <div className="hidden md:flex md:items-center md:justify-center md:gap-6 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`
                  relative inline-flex items-center text-[11px] font-bold uppercase tracking-[0.2em] whitespace-nowrap
                  min-h-[44px] px-1
                  transition-colors duration-200
                  ${isActive ? "text-white" : "text-white/65 hover:text-white"}
                `}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-sandstone" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Desktop CTAs (phone icon at md, Free Quote button at md, full phone at lg) */}
        <div className="relative z-10 flex items-center shrink-0 md:justify-self-end gap-2">

          {/* Phone — full text at lg, icon-only at md */}
          <a
            href={`tel:${BRAND_CONFIG.contact.phone}`}
            aria-label={`Call ${BRAND_CONFIG.contact.phoneFormatted}`}
            className="
              hidden md:inline-flex items-center gap-2 px-3 py-2.5
              text-[11px] font-bold uppercase tracking-[0.2em]
              text-white/70 hover:text-sandstone transition-colors
            "
          >
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden lg:inline">{BRAND_CONFIG.contact.phoneFormatted}</span>
          </a>

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
              <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            className="md:hidden text-white/80 hover:text-white transition-colors p-2.5 -mr-1 w-11 h-11 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
          >
            {mounted && mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu — fullscreen dialog overlay */}
      {mounted && mobileMenuOpen && createPortal(
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby={menuTitleId}
          className="md:hidden fixed inset-x-0 bottom-0 bg-black z-[100] overflow-y-auto"
          style={{ top: menuTop == null ? undefined : `${menuTop}px` }}
        >
          {/* Sandstone hairline at top */}
          <div className="h-px bg-gradient-to-r from-transparent via-sandstone/40 to-transparent" aria-hidden="true" />

          <h2 id={menuTitleId} className="sr-only">Site menu</h2>

          <div className="container mx-auto px-5 py-7 flex flex-col min-h-full">
            <p className="font-serif italic text-sandstone-muted text-[15px] mb-6 max-w-xs">
              Three generations of quality. Family-owned since 1968.
            </p>

            <div className="space-y-1 flex-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`
                      flex items-center justify-between text-[28px] font-hero uppercase tracking-wide py-3.5
                      border-b border-white/[0.06] transition-colors duration-150
                      ${isActive ? "text-sandstone" : "text-white hover:text-sandstone"}
                    `}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    {isActive ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-sandstone" aria-hidden="true" />
                    ) : (
                      <ArrowRight className="w-5 h-5 text-white/30" aria-hidden="true" />
                    )}
                  </Link>
                );
              })}

              <div className="pt-7">
                <Link
                  href="/get-quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 w-full px-7 py-4 rounded-full text-sm font-black uppercase tracking-[0.18em] bg-sandstone text-black hover:bg-sandstone-light transition-colors"
                >
                  Get a Free Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="pb-6 pt-6 mt-4 border-t border-white/[0.08] space-y-4">
              <a
                href={`tel:${BRAND_CONFIG.contact.phone}`}
                className="flex items-center gap-2 text-base font-semibold text-white/80 hover:text-sandstone transition-colors"
                aria-label={`Call ${BRAND_CONFIG.contact.phoneFormatted}`}
              >
                <Phone className="h-4 w-4 text-sandstone" aria-hidden="true" />
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
                      <Facebook className="h-4 w-4" aria-hidden="true" />
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
                      <Instagram className="h-4 w-4" aria-hidden="true" />
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
