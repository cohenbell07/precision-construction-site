"use client";

/**
 * Supplier-deals (seasonal) quote variant — Showroom + Studio canvas.
 * Dark hero, cream form with seasonal service multi-select.
 */

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { BRAND_CONFIG } from "@/lib/utils";
import { Loader2, Check, CheckCircle } from "lucide-react";
import { Section } from "@/components/Section";

const SEASONAL_OPTIONS = [
  "Painting & drywall",
  "Flooring installation",
  "Carpentry & trim work",
  "Custom showers & tile work",
  "Drywall & ceiling texture",
  "Countertop installation",
];

const FIELD_CLASS = "bg-bone-paper border-bone-hairline focus:border-sandstone-dark focus:ring-1 focus:ring-sandstone-dark/20 text-ink placeholder:text-ink-muted/60 rounded-md h-11 transition-colors";
const TEXTAREA_CLASS = "bg-bone-paper border-bone-hairline focus:border-sandstone-dark focus:ring-1 focus:ring-sandstone-dark/20 text-ink placeholder:text-ink-muted/60 rounded-md transition-colors resize-none";
const SELECT_CLASS = "w-full px-3 h-11 rounded-md border bg-bone-paper border-bone-hairline focus:border-sandstone-dark focus:outline-none text-ink text-base sm:text-sm transition-colors appearance-none";

export default function SupplierDealsQuotePage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "",
    projectDetails: "", timeline: "", budgetMin: "", budgetMax: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const toggle = (option: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(option)) next.delete(option);
      else next.add(option);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selected.size === 0) { toast({ title: "Select at least one service", variant: "destructive" }); return; }
    if (!formData.name.trim()) { toast({ title: "Name is required", variant: "destructive" }); return; }
    if (!formData.email.trim()) { toast({ title: "Email is required", variant: "destructive" }); return; }
    if (!formData.projectDetails.trim()) { toast({ title: "Please provide project details", variant: "destructive" }); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/leads/deal-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dealType: "supplier",
          name: formData.name || undefined,
          email: formData.email,
          phone: formData.phone || undefined,
          address: formData.address || undefined,
          selectedOptions: Array.from(selected),
          projectDetails: formData.projectDetails || undefined,
          timeline: formData.timeline || undefined,
          budgetMin: formData.budgetMin || undefined,
          budgetMax: formData.budgetMax || undefined,
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setSubmitted(true);
    } catch {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Section variant="cream" padding="lg" containerClassName="container mx-auto px-4 sm:px-6 max-w-2xl">
        <div className="paper-card rounded-md">
          <div className="p-8 sm:p-10 md:p-12 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-bone-soft border-2 border-sandstone-dark flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-sandstone-dark" />
            </div>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 cream-rule" />
              <p className="cream-eyebrow text-[10px] tracking-[0.3em] uppercase font-medium">Request Received</p>
              <div className="h-px w-8 cream-rule-rtl" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-ink uppercase tracking-tight mb-3">Thank You!</h2>
            <p className="text-ink-muted text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
              Thanks for your 10% Seasonal Special quote request. We&apos;ll get back to you within 24 hours with pricing.
            </p>
            <Link href="/" className="btn-ink px-6 py-3 uppercase tracking-widest text-xs sm:text-sm">Return Home</Link>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <div className="flex flex-col">

      {/* ━━━ HERO — DARK ━━━ */}
      <div className="relative border-b border-white/[0.08] bg-[#030303] py-12 sm:py-16 md:py-20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sandstone/30 bg-sandstone/10 text-sandstone text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-sandstone animate-pulse shrink-0 inline-block" />
              10% Off · Seasonal Specials
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-4 text-white uppercase tracking-tight">
            10% Off — Seasonal Services
          </h1>
          <div className="h-[1.5px] w-16 bg-gradient-to-r from-sandstone via-sandstone/60 to-transparent mx-auto mb-4 rounded-full" />
          <p className="text-sm sm:text-base text-white/70 max-w-lg mx-auto leading-relaxed">
            Limited-time pricing on select services. Choose what you need below and we&apos;ll send you a quote with the seasonal discount applied.
          </p>
        </div>
      </div>

      {/* ━━━ FORM — CREAM ━━━ */}
      <Section variant="cream" padding="lg" containerClassName="container mx-auto px-4 sm:px-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Service Selection */}
          <div className="paper-card rounded-md">
            <div className="p-6 sm:p-8 md:p-10">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 cream-rule" />
                  <p className="cream-eyebrow text-[10px] tracking-[0.3em] uppercase font-medium">Step 01</p>
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-black text-ink uppercase tracking-tight">Select Seasonal Services</h2>
                <p className="font-serif italic text-ink-muted mt-3 text-base">Pick any that apply.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SEASONAL_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggle(option)}
                    className={`flex items-center justify-between text-left p-4 rounded-md border-2 transition-all ${
                      selected.has(option)
                        ? "border-sandstone-dark bg-bone-soft text-ink"
                        : "border-bone-hairline bg-bone-paper text-ink-muted hover:border-sandstone-dark hover:text-ink"
                    }`}
                  >
                    <span className="font-semibold text-sm">{option}</span>
                    {selected.has(option) && (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sandstone-dark text-bone shrink-0 ml-2">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="paper-card rounded-md">
            <div className="p-6 sm:p-8 md:p-10">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 cream-rule" />
                  <p className="cream-eyebrow text-[10px] tracking-[0.3em] uppercase font-medium">Step 02</p>
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-black text-ink uppercase tracking-tight">Your Details</h2>
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                      Name <span className="text-ink">*</span>
                    </label>
                    <Input id="name" required autoComplete="name" placeholder="Your name" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} className={FIELD_CLASS} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                      Email <span className="text-ink">*</span>
                    </label>
                    <Input id="email" type="email" inputMode="email" autoComplete="email" required placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} className={FIELD_CLASS} />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Phone</label>
                  <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Your phone number" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} className={FIELD_CLASS} />
                </div>
                <div>
                  <label htmlFor="address" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Project Address</label>
                  <Input id="address" placeholder="Calgary, AB (optional)" value={formData.address} onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))} className={FIELD_CLASS} />
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">When do you want to start?</label>
                  <select id="timeline" value={formData.timeline} onChange={(e) => setFormData((p) => ({ ...p, timeline: e.target.value }))} className={SELECT_CLASS}>
                    <option value="">Select...</option>
                    <option value="ASAP">ASAP</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="1–3 months">1–3 months</option>
                    <option value="3–6 months">3–6 months</option>
                    <option value="6–12 months">6–12 months</option>
                    <option value="Flexible / No rush">Flexible / No rush</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="budgetMin" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Min Budget ($)</label>
                    <Input id="budgetMin" type="number" placeholder="e.g. 5,000" value={formData.budgetMin} onChange={(e) => setFormData((p) => ({ ...p, budgetMin: e.target.value }))} className={FIELD_CLASS} />
                  </div>
                  <div>
                    <label htmlFor="budgetMax" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Max Budget ($)</label>
                    <Input id="budgetMax" type="number" placeholder="e.g. 25,000" value={formData.budgetMax} onChange={(e) => setFormData((p) => ({ ...p, budgetMax: e.target.value }))} className={FIELD_CLASS} />
                  </div>
                </div>
                <div>
                  <label htmlFor="projectDetails" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                    Project Details <span className="text-ink">*</span>
                  </label>
                  <Textarea id="projectDetails" required placeholder="Describe your project — scope, materials, any preferences." value={formData.projectDetails} onChange={(e) => setFormData((p) => ({ ...p, projectDetails: e.target.value }))} rows={4} className={TEXTAREA_CLASS} />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading || selected.size === 0} className="btn-ink w-full py-3 uppercase tracking-widest text-sm disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Request 10% Seasonal Quote"}
          </button>
        </form>

        <p className="text-center text-ink-muted text-xs mt-6 font-serif italic">{BRAND_CONFIG.motto}</p>
      </Section>
    </div>
  );
}
