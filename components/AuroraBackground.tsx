"use client";

interface AuroraBackgroundProps {
  className?: string;
}

export function AuroraBackground({ className = "" }: AuroraBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Large warm blob - top left */}
      <div
        className="absolute rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(196, 181, 160, 0.25), transparent 60%)",
          width: "60%",
          height: "70%",
          top: "-10%",
          left: "-15%",
          animation: "aurora-float-0 14s ease-in-out infinite",
        }}
      />
      {/* Purple/blue blob - right */}
      <div
        className="absolute rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(120, 100, 180, 0.18), transparent 60%)",
          width: "55%",
          height: "65%",
          top: "10%",
          right: "-20%",
          animation: "aurora-float-1 18s ease-in-out infinite",
        }}
      />
      {/* Cool blue blob - bottom center */}
      <div
        className="absolute rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(80, 120, 160, 0.15), transparent 60%)",
          width: "50%",
          height: "60%",
          bottom: "-15%",
          left: "25%",
          animation: "aurora-float-2 16s ease-in-out infinite",
        }}
      />
      {/* Sandstone accent - center */}
      <div
        className="absolute rounded-full blur-[80px]"
        style={{
          background: "radial-gradient(circle, rgba(196, 181, 160, 0.20), transparent 55%)",
          width: "40%",
          height: "50%",
          top: "25%",
          left: "30%",
          animation: "aurora-float-3 20s ease-in-out infinite",
        }}
      />
    </div>
  );
}
