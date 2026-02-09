"use client";

import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ChunkErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log error for debugging
    console.error("Chunk loading error:", error, errorInfo);
    
    // Check if it's a chunk loading error
    if (
      error.name === "ChunkLoadError" ||
      error.message?.includes("Loading chunk") ||
      error.message?.includes("Failed to fetch dynamically imported module")
    ) {
      // Clear the error state after a short delay and retry
      setTimeout(() => {
        this.setState({ hasError: false, error: null });
        // Force a page reload to retry loading chunks
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      }, 2000);
    }
  }

  render() {
    if (this.state.hasError) {
      // Check if it's a chunk loading error
      const isChunkError =
        this.state.error?.name === "ChunkLoadError" ||
        this.state.error?.message?.includes("Loading chunk") ||
        this.state.error?.message?.includes("Failed to fetch dynamically imported module");

      if (isChunkError) {
        // Show a minimal loading state while retrying
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
            <h2 className="text-2xl font-display font-black text-white mb-4 premium-heading">
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
              className="btn-premium"
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

