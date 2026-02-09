import React from "react";

export function LogoFooter({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 48"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Metallic silver gradient - matches header Logo */}
        <linearGradient id="silverGradientFooter" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5F5F5" stopOpacity="1" />
          <stop offset="20%" stopColor="#E8E8E8" stopOpacity="1" />
          <stop offset="50%" stopColor="#C0C0C0" stopOpacity="1" />
          <stop offset="80%" stopColor="#A0A0A0" stopOpacity="1" />
          <stop offset="100%" stopColor="#808080" stopOpacity="1" />
        </linearGradient>
      </defs>
      <text
        x="60"
        y="34"
        textAnchor="middle"
        fill="url(#silverGradientFooter)"
        fontSize="28"
        fontWeight="900"
        fontFamily="system-ui, -apple-system, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif"
        letterSpacing="-0.02em"
        style={{
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
        }}
      >
        PCND
      </text>
    </svg>
  );
}
