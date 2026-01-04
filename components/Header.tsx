"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND_CONFIG } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/20 bg-black/95 backdrop-blur-sm overflow-visible">
      <nav className="container mx-auto flex h-20 items-center justify-between px-6 max-w-7xl overflow-visible">
      <Link href="/" className="flex items-center group overflow-visible">
        {/* Logo Image */}
        <Image
          src="/precisionlogo.png"
          alt={BRAND_CONFIG.shortName}
          width={600}
          height={150}
          className="h-24 md:h-30 w-auto group-hover:scale-105 transition-transform duration-300"
          priority
        />
      </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[#F5F5F5] transition-all hover:text-gold relative group uppercase tracking-wide"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full shadow-[0_0_4px_rgba(243,201,106,0.6)]"></span>
            </Link>
          ))}
          <Button asChild className="btn-premium">
            <Link href="/get-quote">Request a Quote</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-text-primary hover:text-gold transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gold/20 bg-black/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-semibold text-[#F5F5F5] transition-colors hover:text-gold py-2 uppercase tracking-wide"
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

