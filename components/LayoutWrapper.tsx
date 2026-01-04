"use client";

import { ChunkErrorBoundary } from "./ChunkErrorBoundary";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingChatbot } from "./FloatingChatbot";
import { Toaster } from "./ui/toaster";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ChunkErrorBoundary>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingChatbot />
      <Toaster />
    </ChunkErrorBoundary>
  );
}

