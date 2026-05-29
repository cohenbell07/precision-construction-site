"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface BlurRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "top" | "bottom";
  className?: string;
  duration?: number;
}

export function BlurReveal({
  children,
  delay = 0,
  direction = "bottom",
  className = "",
  duration = 0.6,
}: BlurRevealProps) {
  const [inView, setInView] = useState(false);
  // `mounted` gates the hidden state to the client. With `initial={false}`,
  // framer renders the `animate` target on the server — so SSR/crawlers,
  // no-JS visitors, and reduced-motion users all get fully-visible content
  // instead of a stranded opacity:0. Off-screen elements then animate in on
  // scroll; the brief hide→reveal happens below the fold, so it's unseen.
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setReduceMotion(
      typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const yFrom = direction === "top" ? -16 : 16;
  const shown = { filter: "blur(0px)", opacity: 1, y: 0 };
  const hiddenState = { filter: "blur(6px)", opacity: 0, y: yFrom };
  const motionOn = mounted && !reduceMotion;
  const target = !motionOn ? shown : inView ? shown : hiddenState;

  return (
    <motion.div
      ref={ref}
      className={`will-change-[transform,filter,opacity] ${className}`}
      initial={false}
      animate={target}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
