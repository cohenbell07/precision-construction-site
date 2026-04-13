"use client";

import { useRef, useCallback } from "react";

export function SpotlightCard({
  children,
  className = "",
  spotlightColor,
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    if (spotlightColor) {
      ref.current.style.setProperty("--spotlight-color", spotlightColor);
    }
  }, [spotlightColor]);

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className={`spotlight-card ${className}`}>
      {children}
    </div>
  );
}
