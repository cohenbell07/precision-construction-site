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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  const yFrom = direction === "top" ? -20 : 20;

  return (
    <motion.div
      ref={ref}
      className={`will-change-[transform,filter,opacity] ${className}`}
      initial={{ filter: "blur(10px)", opacity: 0, y: yFrom }}
      animate={
        inView
          ? {
              filter: ["blur(10px)", "blur(4px)", "blur(0px)"],
              opacity: [0, 0.5, 1],
              y: [yFrom, direction === "top" ? 4 : -4, 0],
            }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        times: [0, 0.4, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
