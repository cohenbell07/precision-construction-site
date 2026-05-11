import React from "react";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 110"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Polished platinum gradient with subtle "horizon" dip around 55-60% —
            mimics the natural shadow band on brushed metal without going trophy/chrome. */}
        <linearGradient id="silverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="18%" stopColor="#EEEEEE" stopOpacity="1" />
          <stop offset="42%" stopColor="#C8C8C8" stopOpacity="1" />
          <stop offset="56%" stopColor="#929292" stopOpacity="1" />
          <stop offset="72%" stopColor="#B0B0B0" stopOpacity="1" />
          <stop offset="100%" stopColor="#7A7A7A" stopOpacity="1" />
        </linearGradient>

        {/* Real SVG drop shadow — replaces the CSS textShadow that was silently failing
            on SVG text elements. Adds quiet depth on the dark header background. */}
        <filter id="logoShadow" x="-5%" y="-15%" width="110%" height="135%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.6" />
        </filter>
      </defs>

      <g filter="url(#logoShadow)">
        {/* PRECISION — tighter letter-spacing (0.04em) for a more architectural, refined feel */}
        <text
          x="300"
          y="48"
          textAnchor="middle"
          fill="url(#silverGradient)"
          fontSize="48"
          fontWeight="700"
          fontFamily="'Montserrat', 'Helvetica Neue', Arial, sans-serif"
          letterSpacing="0.04em"
          strokeWidth="0.4"
          stroke="rgba(255,255,255,0.12)"
        >
          PRECISION
        </text>

        {/* Architectural accent — two short sandstone hairlines flanking a small diamond pip.
            Replaces the long faded gradient rule with something that reads as an intentional
            drafting reference mark. */}
        <line x1="232" y1="60" x2="285" y2="60" stroke="#C4B5A0" strokeOpacity="0.7" strokeWidth="0.8" />
        <rect x="298" y="58" width="4" height="4" transform="rotate(45 300 60)" fill="#C4B5A0" fillOpacity="0.85" />
        <line x1="315" y1="60" x2="368" y2="60" stroke="#C4B5A0" strokeOpacity="0.7" strokeWidth="0.8" />

        {/* CONSTRUCTION & DECORA — wider tracking (0.30em) for premium breathing room */}
        <text
          x="300"
          y="84"
          textAnchor="middle"
          fill="url(#silverGradient)"
          fontSize="20"
          fontWeight="700"
          fontFamily="'Montserrat', 'Helvetica Neue', Arial, sans-serif"
          letterSpacing="0.30em"
          strokeWidth="0.3"
          stroke="rgba(255,255,255,0.10)"
        >
          CONSTRUCTION &amp; DECORA
        </text>
      </g>
    </svg>
  );
}
