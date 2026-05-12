"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import dynamic from "next/dynamic";
import { ChunkErrorBoundary } from "./ChunkErrorBoundary";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PromoStrip } from "./PromoStrip";
import { Toaster } from "./ui/toaster";

const FloatingChatbot = dynamic(() => import("./FloatingChatbot").then((m) => ({ default: m.FloatingChatbot })), {
  ssr: false,
});

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);

  return (
    <ChunkErrorBoundary>
      {/* `reducedMotion="user"` makes every framer-motion animation in the tree
          respect the visitor's prefers-reduced-motion OS setting. Replaces the
          per-component useReducedMotion() hooks we'd otherwise need on every
          page's local Reveal/BlurReveal. The CSS kill-switch in globals.css
          still handles CSS transitions; this covers JS-driven motion. */}
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sandstone"
        >
          Skip to content
        </a>
        <PromoStrip />
        <Header />
        <main id="main" className="min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <FloatingChatbot />
        <Toaster />
      </MotionConfig>
    </ChunkErrorBoundary>
  );
}

