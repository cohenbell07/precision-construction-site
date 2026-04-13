import React from "react";

export function LogoFooter({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 48"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="silverGradientFooter" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="25%" stopColor="#F0F0F0" stopOpacity="1" />
          <stop offset="55%" stopColor="#D8D8D8" stopOpacity="1" />
          <stop offset="85%" stopColor="#B8B8B8" stopOpacity="1" />
          <stop offset="100%" stopColor="#A0A0A0" stopOpacity="1" />
        </linearGradient>
      </defs>
      <text
        x="60"
        y="32"
        textAnchor="middle"
        fill="url(#silverGradientFooter)"
        fontSize="30"
        fontWeight="400"
        fontFamily="'Bebas Neue', 'Arial Narrow', sans-serif"
        letterSpacing="0.12em"
        style={{
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
        }}
      >
        PCND
      </text>
    </svg>
  );
}
