"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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
      <nav className="container mx-auto grid h-16 sm:h-[4.5rem] md:h-20 grid-cols-[1fr_auto_1fr] md:grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 max-w-7xl overflow-visible gap-4">
      <Link href="/" className="flex items-center group overflow-visible justify-self-start">
        {/* Logo SVG */}
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

        {/* Right: Desktop CTA or Mobile menu button */}
        <div className="flex items-center justify-self-end gap-2">
          <div className="hidden md:block">
            <Button asChild className="btn-premium">
              <Link href="/get-quote">Request a Quote</Link>
            </Button>
          </div>
          <button
            className="md:hidden text-text-primary hover:text-silver transition-colors p-2"
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
          </div>
        </div>
      )}
    </header>
  );
}

