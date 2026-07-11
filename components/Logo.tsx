import React from "react";

/**
 * PCND wordmark — "drawn in steel" identity (2026-07 redesign).
 *
 * Anatomy:
 *  - PRECISION: Archivo (variable) pushed to 118% width, weight 900 — machined,
 *    architectural. Chrome fill via a cooled steel gradient with a horizon dip.
 *  - Drafting rule: the brand's signature motif — a measured baseline with
 *    minor/major ticks, sitting between wordmark and subline like a title-block
 *    rule on a technical drawing.
 *  - CONSTRUCTION & DECORA: IBM Plex Mono, wide-tracked — the annotation voice.
 *
 * Rendered as inline SVG so it scales crisply at every header/footer size and
 * inherits the app's loaded fonts via CSS variables.
 */

const RULE_START = 116;
const RULE_END = 484;
const MINOR_STEP = 23;

export function Logo({ className }: { className?: string }) {
  const ticks: React.ReactNode[] = [];
  for (let x = RULE_START, i = 0; x <= RULE_END; x += MINOR_STEP, i++) {
    const isMajor = i % 5 === 0;
    ticks.push(
      <line
        key={x}
        x1={x}
        y1={isMajor ? 57 : 61}
        x2={x}
        y2={66}
        stroke="#A9B2BF"
        strokeOpacity={isMajor ? 0.85 : 0.45}
        strokeWidth={isMajor ? 1.1 : 0.8}
      />
    );
  }

  return (
    <svg viewBox="0 0 600 112" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="false" role="img" aria-label="Precision Construction & Decora">
      <defs>
        {/* Cooled steel chrome — bright crown, horizon dip, burnished base. */}
        <linearGradient id="steelChrome" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#E9EBEE" />
          <stop offset="50%" stopColor="#C3C8CF" />
          <stop offset="62%" stopColor="#9BA3AE" />
          <stop offset="78%" stopColor="#C9CED5" />
          <stop offset="100%" stopColor="#8E96A2" />
        </linearGradient>
      </defs>

      {/* PRECISION — expanded Archivo, machined chrome */}
      <text
        x="300"
        y="46"
        textAnchor="middle"
        fill="url(#steelChrome)"
        fontSize="50"
        fontWeight="900"
        fontFamily="var(--font-archivo), system-ui, sans-serif"
        letterSpacing="0.06em"
        style={{ fontStretch: "118%" }}
      >
        PRECISION
      </text>

      {/* Drafting rule — measured baseline with ticks */}
      <line x1={RULE_START} y1="66" x2={RULE_END} y2="66" stroke="#A9B2BF" strokeOpacity="0.55" strokeWidth="1" />
      {ticks}

      {/* CONSTRUCTION & DECORA — mono annotation voice. Weighted up so the
          subline holds its own against the chrome PRECISION instead of
          reading as a footnote: larger cut, semibold, brighter steel fill. */}
      <text
        x="302"
        y="95"
        textAnchor="middle"
        fill="#C6CBD2"
        fontSize="19"
        fontWeight="600"
        fontFamily="var(--font-mono), ui-monospace, monospace"
        letterSpacing="0.3em"
      >
        CONSTRUCTION &amp; DECORA
      </text>
    </svg>
  );
}
