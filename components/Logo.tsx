import React from "react";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 110"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="silverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="20%" stopColor="#F0F0F0" stopOpacity="1" />
          <stop offset="50%" stopColor="#D8D8D8" stopOpacity="1" />
          <stop offset="80%" stopColor="#BEBEBE" stopOpacity="1" />
          <stop offset="100%" stopColor="#A8A8A8" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C4B5A0" stopOpacity="0" />
          <stop offset="15%" stopColor="#C4B5A0" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#C4B5A0" stopOpacity="0.45" />
          <stop offset="85%" stopColor="#C4B5A0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C4B5A0" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* PRECISION - Montserrat Bold: same weight family as bottom */}
      <text
        x="300"
        y="48"
        textAnchor="middle"
        fill="url(#silverGradient)"
        fontSize="48"
        fontWeight="700"
        fontFamily="'Montserrat', 'Helvetica Neue', Arial, sans-serif"
        letterSpacing="0.08em"
        strokeWidth="0.5"
        stroke="rgba(255,255,255,0.08)"
        style={{
          textShadow: "0 1px 3px rgba(0, 0, 0, 0.6)",
        }}
      >
        PRECISION
      </text>

      {/* Accent line */}
      <line x1="140" y1="58" x2="460" y2="58" stroke="url(#lineGradient)" strokeWidth="1" />

      {/* CONSTRUCTION & DECORA - Montserrat Bold: matched weight */}
      <text
        x="300"
        y="82"
        textAnchor="middle"
        fill="url(#silverGradient)"
        fontSize="21"
        fontWeight="700"
        fontFamily="'Montserrat', 'Helvetica Neue', Arial, sans-serif"
        letterSpacing="0.20em"
        strokeWidth="0.3"
        stroke="rgba(255,255,255,0.06)"
        style={{
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
        }}
      >
        CONSTRUCTION &amp; DECORA
      </text>
    </svg>
  );
}
