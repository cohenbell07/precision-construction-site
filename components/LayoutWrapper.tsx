"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { ChunkErrorBoundary } from "./ChunkErrorBoundary";
import { Header } from "./Header";
import { Footer } from "./Footer";
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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sandstone"
      >
        Skip to content
      </a>
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
    </ChunkErrorBoundary>
  );
}

