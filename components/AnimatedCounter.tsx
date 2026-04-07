"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function parseValue(value: string): { num: number; prefix: string; suffix: string; hasComma: boolean } | null {
  // Handle non-numeric values
  if (value === "Free" || value === "Unlimited") return null;

  // Match patterns like "58+", "5,000+", "3rd", "5%", "$15M+"
  const match = value.match(/^(\$?)([\d,]+)([\w%+]*)/);
  if (!match) return null;

  const prefix = match[1];
  const numStr = match[2].replace(/,/g, "");
  const suffix = match[3];
  const num = parseInt(numStr, 10);
  if (isNaN(num)) return null;

  return { num, prefix, suffix, hasComma: match[2].includes(",") };
}

function formatNum(n: number, hasComma: boolean): string {
  if (!hasComma) return Math.round(n).toString();
  return Math.round(n).toLocaleString("en-US");
}

export function AnimatedCounter({ value, className }: { value: string; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(value);
  const parsed = useRef(parseValue(value));

  useEffect(() => {
    if (!inView || !parsed.current) return;

    const { num, prefix, suffix, hasComma } = parsed.current;
    const duration = 1500;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;
      setDisplay(`${prefix}${formatNum(current, hasComma)}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    }

    setDisplay(`${parsed.current.prefix}0${parsed.current.suffix}`);
    requestAnimationFrame(tick);
  }, [inView]);

  return <span ref={ref} className={className}>{display}</span>;
}
