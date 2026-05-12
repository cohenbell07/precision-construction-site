"use client";

import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  retriesExhausted: boolean;
}

export class ChunkErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, retriesExhausted: false };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log error for debugging
    console.error("Chunk loading error:", error, errorInfo);

    if (
      error.name === "ChunkLoadError" ||
      error.message?.includes("Loading chunk") ||
      error.message?.includes("Failed to fetch dynamically imported module")
    ) {
      // Bounded retry — only auto-reload up to MAX_RETRIES per session. After
      // that we leave the user on the error UI so a broken chunk in production
      // can't trap them in an infinite reload loop. (Audit follow-up.)
      const MAX_RETRIES = 2;
      let retries = 0;
      if (typeof window !== "undefined") {
        try {
          retries = parseInt(sessionStorage.getItem("pcnd-chunk-retry") || "0", 10);
        } catch {
          /* sessionStorage unavailable (private mode, etc.) — fall through */
        }
      }

      if (retries < MAX_RETRIES) {
        try {
          sessionStorage.setItem("pcnd-chunk-retry", String(retries + 1));
        } catch {
          /* ignore */
        }
        setTimeout(() => {
          this.setState({ hasError: false, error: null });
          if (typeof window !== "undefined") window.location.reload();
        }, 2000);
      } else {
        /* Retries exhausted — surface the manual-refresh UI instead of looping. */
        this.setState({ retriesExhausted: true });
      }
    }
  }

  render() {
    if (this.state.hasError) {
      // Check if it's a chunk loading error
      const isChunkError =
        this.state.error?.name === "ChunkLoadError" ||
        this.state.error?.message?.includes("Loading chunk") ||
        this.state.error?.message?.includes("Failed to fetch dynamically imported module");

      if (isChunkError && !this.state.retriesExhausted) {
        // Auto-retry in progress — show a brief loading state.
        return (
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-silver mx-auto mb-4"></div>
              <p className="text-white premium-text mb-4">Loading...</p>
              <p className="text-white/70 text-sm">If this persists, please refresh the page.</p>
            </div>
          </div>
        );
      }

      // For other errors, show a retry button
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <h2 className="text-2xl font-heading font-black text-white mb-4">
              Something went wrong
            </h2>
            <p className="text-white/80 premium-text mb-6">
              An error occurred while loading the page. Please try refreshing.
            </p>
            <Button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                if (typeof window !== "undefined") {
                  window.location.reload();
                }
              }}
              className="bg-white text-black font-bold hover:bg-white/90 transition-colors rounded-full"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

