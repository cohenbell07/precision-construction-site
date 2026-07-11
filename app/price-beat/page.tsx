"use client";

/**
 * /price-beat — the dedicated home for the "5% Price Beat Guarantee" promise.
 *
 * Until now the guarantee was named ~10 times across the site (footer,
 * get-quote sidebar, every service page, homepage stat card, SEO metadata)
 * but was actionable nowhere — and the /api/products/price-beat endpoint
 * sat fully built with no UI calling it. This page is that UI: pain-point
 * hook → how it works → the upload form → the terms.
 *
 * Showroom + Studio: dark hero, cream studio body.
 */

import { BRAND_CONFIG } from "@/lib/utils";
import { BadgePercent, Upload, FileSearch, ShieldCheck, Check } from "lucide-react";
import { Section } from "@/components/Section";
import { PriceBeatForm } from "@/components/PriceBeatForm";

const STEPS = [
  {
    Icon: Upload,
    title: "Upload your quote",
    body: "A written quote from a licensed competitor, dated within the last 60 days. PDF or a clear photo both work.",
  },
  {
    Icon: FileSearch,
    title: "We review it",
    body: "We confirm it's apples-to-apples — same scope, comparable materials — usually the same day you send it.",
  },
  {
    Icon: BadgePercent,
    title: "We beat it by 5%",
    body: "You get our price in writing, at least 5% under — and the third-generation builder you actually want.",
  },
];

const TERMS = [
  "A written quote from a licensed, insured competitor",
  "Dated within the last 60 days",
  "For comparable scope and materials — apples to apples",
  "Excludes liquidation, clearance, or “going out of business” pricing",
  "Final comparability is confirmed by PCND before the beat is locked in",
];

export default function PriceBeatPage() {
  return (
    <div className="flex flex-col">
      {/* ━━━ HERO — DARK ━━━ */}
      <div className="relative bg-[#030303] py-12 sm:py-16 md:py-20 overflow-hidden border-b border-white/[0.08]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sandstone/30 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center relative z-10">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sandstone/25 bg-sandstone/[0.05] text-sandstone/85 text-xs font-semibold uppercase tracking-wider">
              <BadgePercent aria-hidden="true" className="w-3 h-3" />
              5% Price Beat Guarantee
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-hero uppercase tracking-wide mb-4 text-white leading-[0.95]">
            We Beat Any Written<br className="sm:hidden" /> Quote by 5%
          </h1>
          <div className="h-[1.5px] w-16 bg-gradient-to-r from-sandstone via-sandstone/60 to-transparent mx-auto mb-5 rounded-full" />
          <p className="font-serif italic text-white/85 text-lg sm:text-xl max-w-2xl mx-auto leading-snug mb-2">
            Bring us a real quote from a licensed competitor — we&apos;ll come back at least 5% under it, in writing.
          </p>
          <p className="text-sm sm:text-base text-white/60 max-w-md mx-auto leading-relaxed">
            Since 1968. The builder you trust, at a price that beats the lowballer.
          </p>
        </div>
      </div>

      {/* ━━━ STUDIO BODY — CREAM ━━━ */}
      <Section variant="cream" padding="lg">
        {/* The pain-point hook — the honest dilemma the guarantee dissolves. */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-8 bg-sandstone-dark/40" aria-hidden="true" />
            <p className="cream-eyebrow text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase font-medium">Why This Exists</p>
            <span className="h-px w-8 bg-sandstone-dark/40" aria-hidden="true" />
          </div>
          <h2 className="text-[30px] sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight leading-[0.95] text-ink mb-6">
            You Shouldn&apos;t Have to Choose
          </h2>
          <p className="font-serif italic text-ink text-xl sm:text-2xl leading-snug max-w-2xl mx-auto mb-5">
            Between the builder you trust and the price you want.
          </p>
          <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Getting quotes is exhausting — and the cheapest one is usually the scariest. Corner-cutting, no-shows, unlicensed crews. Meanwhile the builder you&apos;d actually trust always seems to cost more. The price beat dissolves that: bring us the number that&apos;s tempting you, and we&apos;ll beat it. You get the third-generation, licensed, since-1968 builder <em>and</em> the better price — no more weighing peace of mind against your budget.
          </p>
        </div>

        {/* How it works — three steps. */}
        <div className="mb-14 sm:mb-18">
          <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10">
            <span className="h-px w-8 bg-sandstone-dark/40" aria-hidden="true" />
            <p className="cream-eyebrow text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase font-medium">How It Works</p>
            <span className="h-px w-8 bg-sandstone-dark/40" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {STEPS.map((step) => (
              <div key={step.title} className="paper-card rounded-md p-6 sm:p-7 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-sandstone-dark/30 bg-bone-soft text-sandstone-dark shrink-0">
                    <step.Icon aria-hidden="true" className="w-4 h-4" />
                  </span>
                  <span className="h-px flex-1 cream-rule" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-black text-ink text-lg uppercase tracking-tight mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form + terms. */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2">
            <PriceBeatForm />
          </div>

          <aside className="lg:col-span-1 space-y-5">
            {/* The terms. */}
            <div className="paper-card rounded-md p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck aria-hidden="true" className="w-4 h-4 text-sandstone-dark" />
                <p className="cream-eyebrow text-[10px] font-mono tracking-[0.22em] uppercase font-medium">The Terms</p>
              </div>
              <p className="text-sm text-ink-muted leading-relaxed mb-4">
                Straightforward — so the guarantee means something. To qualify, the quote needs to be:
              </p>
              <ul className="space-y-3">
                {TERMS.map((term) => (
                  <li key={term} className="flex items-start gap-2.5 text-sm text-ink leading-snug">
                    <Check aria-hidden="true" className="w-3.5 h-3.5 text-sandstone-dark shrink-0 mt-0.5" />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reassurance. */}
            <div className="paper-card rounded-md p-6 sm:p-7">
              <p className="font-serif italic text-[17px] sm:text-lg leading-snug text-ink mb-3">
                &ldquo;Expect Only The Best.&rdquo;
              </p>
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase font-medium text-sandstone-muted">
                — {BRAND_CONFIG.owner}, Owner &amp; 3rd Generation Builder
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </div>
  );
}
