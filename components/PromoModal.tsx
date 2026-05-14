"use client";

/**
 * PromoModal — single, tasteful event modal for the active site promo.
 *
 * Behaviour (the "not annoying" contract):
 * - Triggers on scroll-depth only — fires once the visitor passes ~60% of a
 *   page (a real engagement signal, works identically on desktop + mobile).
 * - Eligible pages: homepage + service pages only. Never on the conversion
 *   pages (/get-quote, /book-consultation, /contact) — pointless to interrupt
 *   someone already converting.
 * - Once per session: dismiss it and it never returns this visit. Also
 *   suppressed if the visitor already dismissed the PromoStrip — that's a
 *   clear "not interested in the promo" signal, so we respect it.
 * - Auto-expires: pulls from lib/promo.ts via getActivePromo(); when the
 *   Spring Build event ends, this renders nothing with zero code changes —
 *   same pattern as the strip and the homepage feature section.
 *
 * a11y: role="dialog" + aria-modal, focus moves into the panel on open, Tab
 * is trapped, Esc closes, backdrop click closes, body scroll locked while
 * open. Motion respects prefers-reduced-motion via the app-level MotionConfig.
 */

import { useState, useEffect, useRef, useId } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { getActivePromo } from "@/lib/promo";

const SEEN_KEY = "pcnd-promo-modal-seen";
const STRIP_DISMISSED_KEY = "pcnd-promo-dismissed"; // set by PromoStrip
const SCROLL_THRESHOLD = 0.6;

export function PromoModal() {
  const pathname = usePathname();
  const promo = getActivePromo();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  /* Homepage + service pages only. Naturally excludes /get-quote,
     /book-consultation, /contact, /about, /blog. */
  const onEligiblePage = pathname === "/" || (pathname?.startsWith("/services") ?? false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Scroll-depth trigger — arm only on eligible pages with an active promo
     the visitor hasn't already opted out of. */
  useEffect(() => {
    if (!promo || !onEligiblePage) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
      if (sessionStorage.getItem(STRIP_DISMISSED_KEY)) return;
    } catch {
      /* sessionStorage unavailable (private mode) — fall through, show once */
    }

    let fired = false;
    const onScroll = () => {
      if (fired) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      if (window.scrollY / docHeight >= SCROLL_THRESHOLD) {
        fired = true;
        setOpen(true);
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
          /* ignore */
        }
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [promo, onEligiblePage, pathname]);

  /* Esc + Tab-trap + body scroll lock while open. */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])',
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
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!promo || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 w-full max-w-md bg-[#0F0C09] border border-sandstone/20 rounded-md overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]"
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white/70 hover:text-white flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <X aria-hidden="true" className="w-4 h-4" />
            </button>

            {/* Image banner — the Spring Build editorial tableau, cropped to a
                modal-friendly band, fading into the dark panel below. */}
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={promo.image.src}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 480px) 100vw, 448px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C09] via-[#0F0C09]/20 to-transparent" />
            </div>

            {/* Content — pulled up over the image's fade for a clean overlap. */}
            <div className="relative -mt-7 px-6 sm:px-8 pb-7 sm:pb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-6 bg-sandstone/60" aria-hidden="true" />
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-sandstone/90 font-medium">
                  <span className="inline-block h-1 w-1 rounded-full bg-sandstone animate-pulse" aria-hidden="true" />
                  {promo.label}
                </span>
              </div>

              <h2
                id={titleId}
                className="font-hero uppercase text-white text-3xl sm:text-4xl leading-[0.95] tracking-tight mb-3"
              >
                15% Off<br />
                <span className="text-sandstone">Every Service</span>
              </h2>

              <p className="font-serif italic text-white/85 text-base sm:text-lg leading-snug mb-6">
                {promo.italicLine}
              </p>

              <div className="flex flex-col gap-2.5">
                <Link
                  href={promo.cta.href}
                  onClick={() => setOpen(false)}
                  className="group inline-flex items-center justify-center gap-2 bg-sandstone text-black px-6 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-sandstone-light transition-colors shadow-[0_8px_28px_-8px_rgba(196,181,160,0.5)]"
                >
                  {promo.cta.label}
                  <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/book-consultation"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 text-white/75 hover:text-white px-6 py-3 text-sm font-semibold tracking-wide transition-colors border border-white/15 rounded-full hover:border-sandstone/50"
                >
                  Or book a consultation
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
