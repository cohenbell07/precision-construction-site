"use client";

import { useRef, useEffect } from "react";
import Hls from "hls.js";

const CF_BASE = "https://customer-wlq98rw65iepfe8g.cloudflarestream.com";

interface VideoHeroProps {
  videoId: string;
  className?: string;
}

/**
 * Optimized Cloudflare Stream video player for hero sections.
 * - Shows poster thumbnail immediately (no black screen while loading)
 * - Starts at lowest quality rendition for fastest initial playback
 * - Adapts quality upward once playing
 */
export function VideoHero({ videoId, className = "w-full h-full object-cover" }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = `${CF_BASE}/${videoId}/manifest/video.m3u8`;

    try {
      if (typeof Hls !== "undefined" && Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
          // Start at lowest quality → fastest initial playback
          startLevel: 0,
          // Conservative bandwidth estimate → stays at lower quality initially, avoids stalls
          abrEwmaDefaultEstimate: 500000,
          // Smaller initial buffer → starts playing sooner
          maxBufferLength: 20,
          maxMaxBufferLength: 30,
        });
        hlsRef.current = hls;
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {});
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS (Safari / iOS)
        video.src = src;
        video.play().catch(() => {});
      }
    } catch (err) {
      console.error("VideoHero init error:", err);
    }

    return () => {
      if (hlsRef.current) {
        try { hlsRef.current.destroy(); } catch {}
        hlsRef.current = null;
      }
    };
  }, [videoId]);

  return (
    <video
      ref={videoRef}
      className={className}
      playsInline
      autoPlay
      loop
      muted
      // preload="none" — HLS.js handles loading; poster shows immediately
      preload="none"
      // Cloudflare thumbnail shown instantly while HLS loads
      poster={`${CF_BASE}/${videoId}/thumbnails/thumbnail.jpg?time=1s&height=720`}
    />
  );
}
