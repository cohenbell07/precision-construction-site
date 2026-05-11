/**
 * Footer wordmark — renders the same upgraded "PRECISION / CONSTRUCTION & DECORA"
 * wordmark as the header Logo, just sized for the footer column. Kept as a
 * separate component so the Footer can ask for "the footer logo" semantically
 * and so per-usage tweaks (sizing, hover, etc.) stay isolated.
 */

import { Logo } from "@/components/Logo";

export function LogoFooter({ className }: { className?: string }) {
  return <Logo className={className} />;
}
