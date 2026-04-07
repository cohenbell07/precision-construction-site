"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChunkErrorBoundary } from "./ChunkErrorBoundary";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingChatbot } from "./FloatingChatbot";
import { Toaster } from "./ui/toaster";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);

  return (
    <ChunkErrorBoundary>
      <Header />
      <main className="min-h-screen">
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
      <div className="noise-overlay" aria-hidden="true" />
    </ChunkErrorBoundary>
  );
}

