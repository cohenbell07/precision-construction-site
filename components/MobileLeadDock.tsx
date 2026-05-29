"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/utils";

export function MobileLeadDock() {
  const pathname = usePathname();
  const hidden =
    pathname?.startsWith("/get-quote") ||
    pathname?.startsWith("/book-consultation") ||
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/feedback") ||
    // Service-detail pages render their own promo-aware sticky bar — don't
    // stack two bottom bars. (Note: "/services/" excludes the "/services" index.)
    pathname?.startsWith("/services/");

  if (hidden) return null;

  const serviceMatch = pathname?.match(/^\/services\/([^/]+)/);
  const quoteHref = serviceMatch ? `/get-quote?service=${serviceMatch[1]}` : "/get-quote";

  return (
    <div className="md:hidden fixed inset-x-3 bottom-3 z-40 pointer-events-none">
      <div className="pointer-events-auto grid grid-cols-[0.85fr_1.15fr] gap-2 rounded-full border border-white/12 bg-[#050505]/95 p-1.5 shadow-[0_14px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <a
          href={`tel:${BRAND_CONFIG.contact.phone}`}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-black/70 text-sm font-bold text-white transition-colors hover:border-sandstone/45 hover:text-sandstone"
          aria-label={`Call ${BRAND_CONFIG.contact.phoneFormatted}`}
        >
          <Phone aria-hidden="true" className="h-4 w-4" />
          Call
        </a>
        <Link
          href={quoteHref}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-sandstone px-4 text-sm font-black text-black transition-colors hover:bg-sandstone-light"
        >
          Free Quote
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
