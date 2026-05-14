"use client";

/**
 * Deal quote flow — consolidates the previous three deal-specific routes
 * (/get-quote/basement, /bundle, /supplier-deals) into a single component
 * driven by a `deal` prop. The main /get-quote page renders this when it
 * detects `?deal=basement|bundle|supplier` in the URL.
 *
 * Posts to /api/leads/deal-quote (unchanged) so the backend, email
 * templates, and Supabase source values stay exactly as they were.
 */

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { BRAND_CONFIG } from "@/lib/utils";
import { Loader2, Check, CheckCircle, ArrowRight } from "lucide-react";
import { Section } from "@/components/Section";
import { validateLeadForm, type LeadFormErrors } from "@/lib/forms";

export type DealType = "basement" | "bundle" | "supplier";

interface DealConfig {
  heroBadge: string;
  heroHeadline: string;
  heroSupport: string;
  /** When the list has exactly one option, the picker is hidden and
      the option is locked in (used for the basement deal). */
  options: string[];
  pickerEyebrow?: string;
  pickerHeadline?: string;
  pickerHelper?: string;
  detailsEyebrow: string;
  detailsHeadline: string;
  projectDetailsLabel: string;
  projectDetailsPlaceholder: string;
  submitLabel: string;
  successMessage: string;
}

const CONFIGS: Record<DealType, DealConfig> = {
  basement: {
    heroBadge: "15% Off · Basement Development, Repair & Renovation",
    heroHeadline: "15% Off — Basement Projects",
    heroSupport: "Finishing, fixing, or fully developing a basement? Tell us about your project — we'll send a detailed quote with 15% off, for a limited time.",
    options: ["Full basement renovation"],
    detailsEyebrow: "Your Details",
    detailsHeadline: "Basement Project Info",
    projectDetailsLabel: "Basement Details",
    projectDetailsPlaceholder: "Describe your basement: size, rooms (e.g. rec room, bedroom, bathroom), any moisture or egress needs.",
    submitLabel: "Request 15% Basement Quote",
    successMessage: "Thanks for your 15% off basement project quote. We'll get back to you within 24 hours.",
  },
  bundle: {
    heroBadge: "Most Popular · 15% Off · Kitchen + Bath, Basement + Flooring, or Full Home",
    heroHeadline: "15% Off — Bundle & Save",
    heroSupport: "Combine two or more services and save. Select your bundle below and tell us about your project — we'll send you a quote with 15% off.",
    options: [
      "Kitchen + Bathroom renovation",
      "Basement development + Flooring installation",
      "Full home renovation (3+ services)",
    ],
    pickerEyebrow: "Step 01",
    pickerHeadline: "Select Service Bundle(s)",
    pickerHelper: "Click to add or remove a checkmark.",
    detailsEyebrow: "Step 02",
    detailsHeadline: "Your Details",
    projectDetailsLabel: "Project Details",
    projectDetailsPlaceholder: "Describe your project, rooms, scope, etc.",
    submitLabel: "Request 15% Bundle Quote",
    successMessage: "Thanks for your 15% Bundle Savings quote request. We'll get back to you within 24 hours.",
  },
  supplier: {
    heroBadge: "10% Off · Seasonal Specials",
    heroHeadline: "10% Off — Seasonal Services",
    heroSupport: "Limited-time pricing on select services. Choose what you need below and we'll send you a quote with the seasonal discount applied.",
    options: [
      "Painting & drywall",
      "Flooring installation",
      "Carpentry & trim work",
      "Custom showers & tile work",
      "Drywall & ceiling texture",
      "Countertop installation",
    ],
    pickerEyebrow: "Step 01",
    pickerHeadline: "Select Seasonal Services",
    pickerHelper: "Pick everything you'd like a quote on.",
    detailsEyebrow: "Step 02",
    detailsHeadline: "Your Details",
    projectDetailsLabel: "Project Details",
    projectDetailsPlaceholder: "Describe scope, rooms, square footage, etc.",
    submitLabel: "Request 10% Seasonal Quote",
    successMessage: "Thanks for your 10% Seasonal Special quote request. We'll get back to you within 24 hours with pricing.",
  },
};

const SELECT_CLASS =
  "w-full px-3 h-11 rounded-md border bg-bone-paper border-bone-hairline focus:border-sandstone-dark focus:outline-none text-ink text-base sm:text-sm transition-colors appearance-none";

export function DealQuoteFlow({ deal }: { deal: DealType }) {
  const cfg = CONFIGS[deal];
  const isSingleOption = cfg.options.length === 1;

  const [selected, setSelected] = useState<Set<string>>(
    () => (isSingleOption ? new Set(cfg.options) : new Set()),
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    projectDetails: "",
    timeline: "",
    budgetMin: "",
    budgetMax: "",
  });
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const clearError = (field: keyof LeadFormErrors) => {
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const toggleOption = (option: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(option)) next.delete(option);
      else next.add(option);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSingleOption && selected.size === 0) {
      toast({ title: "Select at least one option", variant: "destructive" });
      return;
    }
    const errs = validateLeadForm(formData);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(first)?.focus();
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/leads/deal-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dealType: deal,
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
    const firstName = formData.name.split(" ")[0];
    return (
      <Section
        variant="cream"
        padding="lg"
        containerClassName="container mx-auto px-4 sm:px-6 max-w-2xl"
      >
        <div className="paper-card rounded-md">
          <div className="p-8 sm:p-10 md:p-12 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-bone-soft border-2 border-sandstone-dark flex items-center justify-center mx-auto mb-6">
              <CheckCircle aria-hidden="true" className="h-8 w-8 sm:h-10 sm:w-10 text-sandstone-dark" />
            </div>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 cream-rule" />
              <p className="cream-eyebrow text-[10px] tracking-[0.3em] uppercase font-medium">Request Received</p>
              <div className="h-px w-8 cream-rule-rtl" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-ink uppercase tracking-tight mb-3">
              {firstName ? `${firstName}, we've got it.` : "We've got it."}
            </h2>
            <p className="font-serif italic text-ink text-lg sm:text-xl leading-snug max-w-md mx-auto mb-6">
              A confirmation is on its way to {formData.email}.
            </p>

            <div className="max-w-md mx-auto text-left mb-7 sm:mb-8 space-y-3">
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-sandstone-dark text-bone shrink-0 text-[10px] font-bold">1</span>
                <p className="text-sm text-ink-muted leading-relaxed">
                  <span className="text-ink font-semibold">{BRAND_CONFIG.owner} or someone on the team will be in touch within 24 hours</span> with your quote.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-sandstone-dark text-bone shrink-0 text-[10px] font-bold">2</span>
                <p className="text-sm text-ink-muted leading-relaxed">
                  <span className="text-ink font-semibold">Don&apos;t want to wait?</span> Book a 30-minute in-home consultation now and we&apos;ll walk through your project together.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
              <Link
                href="/book-consultation"
                className="btn-ink px-7 py-3.5 uppercase tracking-widest text-xs sm:text-sm inline-flex items-center justify-center gap-2"
              >
                Book a Consultation <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/"
                className="btn-ink-ghost uppercase tracking-widest text-xs sm:text-sm px-6 py-3.5 inline-flex items-center justify-center"
              >
                Return Home
              </Link>
            </div>
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
              {cfg.heroBadge}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-4 text-white uppercase tracking-tight">
            {cfg.heroHeadline}
          </h1>
          <div className="h-[1.5px] w-16 bg-gradient-to-r from-sandstone via-sandstone/60 to-transparent mx-auto mb-4 rounded-full" />
          <p className="text-sm sm:text-base text-white/70 max-w-lg mx-auto leading-relaxed">
            {cfg.heroSupport}
          </p>
        </div>
      </div>

      {/* ━━━ FORM — CREAM ━━━ */}
      <Section
        variant="cream"
        padding="lg"
        containerClassName="container mx-auto px-4 sm:px-6 max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Step 01 — option selector (skipped for single-option deals). */}
          {!isSingleOption && (
            <div className="paper-card rounded-md">
              <div className="p-6 sm:p-8 md:p-10">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px w-8 cream-rule" />
                    <p className="cream-eyebrow text-[10px] tracking-[0.3em] uppercase font-medium">
                      {cfg.pickerEyebrow}
                    </p>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-heading font-black text-ink uppercase tracking-tight">
                    {cfg.pickerHeadline}
                  </h2>
                  {cfg.pickerHelper && (
                    <p className="font-serif italic text-ink-muted mt-3 text-base">
                      {cfg.pickerHelper}
                    </p>
                  )}
                </div>
                <div
                  className={
                    cfg.options.length > 3
                      ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
                      : "space-y-3"
                  }
                >
                  {cfg.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleOption(option)}
                      aria-pressed={selected.has(option)}
                      className={`w-full flex items-center justify-between text-left p-4 rounded-md border-2 transition-all ${
                        selected.has(option)
                          ? "border-sandstone-dark bg-bone-soft text-ink"
                          : "border-bone-hairline bg-bone-paper text-ink-muted hover:border-sandstone-dark hover:text-ink"
                      }`}
                    >
                      <span className="font-semibold text-sm">{option}</span>
                      {selected.has(option) && (
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sandstone-dark text-bone">
                          <Check aria-hidden="true" className="h-4 w-4" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 02 — details. */}
          <div className="paper-card rounded-md">
            <div className="p-6 sm:p-8 md:p-10">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 cream-rule" />
                  <p className="cream-eyebrow text-[10px] tracking-[0.3em] uppercase font-medium">
                    {cfg.detailsEyebrow}
                  </p>
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-black text-ink uppercase tracking-tight">
                  {cfg.detailsHeadline}
                </h2>
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                      Name <span aria-hidden="true" className="text-ink">*</span>
                    </label>
                    <Input
                      id="name"
                      required
                      aria-required="true"
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, name: e.target.value }));
                        clearError("name");
                      }}
                    />
                    {errors.name && <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-700">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                      Email <span aria-hidden="true" className="text-ink">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, email: e.target.value }));
                        clearError("email");
                      }}
                    />
                    {errors.email && <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-700">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Phone</label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Project Address</label>
                  <Input
                    id="address"
                    placeholder="Calgary, AB (optional)"
                    value={formData.address}
                    onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
                  />
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">When do you want to start?</label>
                  <select
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => setFormData((p) => ({ ...p, timeline: e.target.value }))}
                    className={SELECT_CLASS}
                  >
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
                    <Input
                      id="budgetMin"
                      type="number"
                      placeholder="e.g. 10,000"
                      value={formData.budgetMin}
                      onChange={(e) => setFormData((p) => ({ ...p, budgetMin: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label htmlFor="budgetMax" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Max Budget ($)</label>
                    <Input
                      id="budgetMax"
                      type="number"
                      placeholder="e.g. 50,000"
                      value={formData.budgetMax}
                      onChange={(e) => setFormData((p) => ({ ...p, budgetMax: e.target.value }))}
                    />
                  </div>
                </div>
                <p className="text-[11px] text-ink-muted">Budget is optional — it helps us tailor your quote.</p>

                <div>
                  <label htmlFor="projectDetails" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                    {cfg.projectDetailsLabel} <span aria-hidden="true" className="text-ink">*</span>
                  </label>
                  <Textarea
                    id="projectDetails"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.projectDetails}
                    aria-describedby={errors.projectDetails ? "projectDetails-error" : undefined}
                    placeholder={cfg.projectDetailsPlaceholder}
                    value={formData.projectDetails}
                    onChange={(e) => {
                      setFormData((p) => ({ ...p, projectDetails: e.target.value }));
                      clearError("projectDetails");
                    }}
                    rows={4}
                  />
                  {errors.projectDetails && <p id="projectDetails-error" role="alert" className="mt-1.5 text-xs text-red-700">{errors.projectDetails}</p>}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || (!isSingleOption && selected.size === 0)}
            className="btn-ink w-full py-3 uppercase tracking-widest text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
                <span className="sr-only">Submitting</span>
              </>
            ) : (
              cfg.submitLabel
            )}
          </button>
        </form>

        <p className="text-center text-ink-muted text-xs mt-6 font-serif italic">{BRAND_CONFIG.motto}</p>
      </Section>
    </div>
  );
}
