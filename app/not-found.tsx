import Link from "next/link";
import { Section } from "@/components/Section";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <Section variant="cream" padding="lg" containerClassName="container mx-auto px-4 max-w-2xl">
      <div className="text-center">
        <p className="font-hero text-7xl sm:text-8xl md:text-9xl uppercase tracking-wide text-ink mb-2">404</p>
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-8 cream-rule" />
          <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Page Not Found</p>
          <div className="h-px w-8 cream-rule-rtl" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-ink mb-4">
          We Can&apos;t Find That Page
        </h2>
        <p className="font-serif italic text-ink-muted text-lg max-w-md mx-auto mb-8">
          Maybe it moved. Maybe it never existed. Either way, let&apos;s get you back on track.
        </p>
        <Link href="/" className="btn-ink px-7 py-3.5">
          Go Home <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Section>
  );
}
