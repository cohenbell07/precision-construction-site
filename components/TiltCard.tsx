"use client";

import { useRef, useState, useCallback } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  shineColor?: string;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 6,
  perspective = 800,
  shineColor = "rgba(255, 255, 255, 0.12)",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - y) * maxTilt * 2;

      setTransform(`perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
      setShinePos({ x: x * 100, y: y * 100 });
    },
    [maxTilt, perspective]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
    setIsHovered(false);
  }, [perspective]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl transition-shadow duration-300 ${isHovered ? "shadow-[0_20px_40px_rgba(0,0,0,0.4)]" : ""} ${className}`}
      style={{
        transform,
        transition: isHovered
          ? "transform 0.1s ease-out, box-shadow 0.3s ease"
          : "transform 0.4s ease-out, box-shadow 0.3s ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
      {/* Shine overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 400px at ${shinePos.x}% ${shinePos.y}%, ${shineColor}, transparent 70%)`,
        }}
      />
    </div>
  );
}
