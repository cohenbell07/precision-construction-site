"use client";

/**
 * Book Consultation — high-intent path for users who want an in-home visit
 * instead of a form-based quote. Shorter form than /get-quote (no budget /
 * timeline / referral fields) so it's quick to finish.
 *
 * Posts to /api/consultation/submit. On success swaps to a confirmation
 * panel rather than redirecting, so the user sees the same canvas finish.
 */

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { services, getServiceById } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { CheckCircle, Loader2, Phone, ArrowRight, Calendar, MapPin, Shield } from "lucide-react";
import { Section } from "@/components/Section";
import { validateLeadForm, type LeadFormErrors } from "@/lib/forms";

const FIELD_CLASS =
  "bg-bone-paper border-bone-hairline focus:border-sandstone-dark focus:ring-1 focus:ring-sandstone-dark/20 text-ink placeholder:text-ink-muted/60 rounded-md h-11 transition-colors";
const TEXTAREA_CLASS =
  "bg-bone-paper border-bone-hairline focus:border-sandstone-dark focus:ring-1 focus:ring-sandstone-dark/20 text-ink placeholder:text-ink-muted/60 rounded-md transition-colors resize-none";
const SELECT_CLASS =
  "w-full px-3 h-11 rounded-md border bg-bone-paper border-bone-hairline focus:border-sandstone-dark focus:outline-none text-ink text-base sm:text-sm transition-colors appearance-none";

const TIME_OPTIONS = [
  "Weekday mornings",
  "Weekday afternoons",
  "Weekday evenings",
  "Saturday",
  "Flexible — call me",
];

type ExtendedErrors = LeadFormErrors & { phone?: string; preferredTime?: string };

function BookConsultationForm() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ExtendedErrors>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceId: "",
    preferredTime: "",
    projectDetails: "",
  });

  /* Pre-select service from ?service=<id> query param (used by per-service
     consultation CTAs to carry context across the click). */
  useEffect(() => {
    const param = searchParams.get("service");
    if (param) {
      setFormData((prev) => ({ ...prev, serviceId: param }));
    }
  }, [searchParams]);

  const clearError = (field: keyof ExtendedErrors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const baseErrs = validateLeadForm(formData);
    const errs: ExtendedErrors = { ...baseErrs };
    if (!formData.phone.trim()) errs.phone = "Please enter a phone number — we'll call to schedule.";
    if (!formData.preferredTime.trim()) errs.preferredTime = "Pick a time window that works for you.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(first)?.focus();
      return;
    }

    setLoading(true);
    try {
      const service = formData.serviceId ? getServiceById(formData.serviceId) : null;
      const res = await fetch("/api/consultation/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          serviceId: formData.serviceId || undefined,
          serviceTitle: service?.title || "General Consultation",
          preferredTime: formData.preferredTime,
          projectDetails: formData.projectDetails,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        toast({
          title: "Something went wrong",
          description: data.error || "Please try again or call us directly.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Consultation submit error:", err);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* ━━━ HERO — DARK ━━━ */}
      <div className="relative bg-[#030303] py-12 sm:py-16 md:py-20 overflow-hidden border-b border-white/[0.08]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sandstone/30 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center relative z-10">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sandstone/25 bg-sandstone/[0.05] text-sandstone/85 text-xs font-semibold uppercase tracking-wider">
              <Calendar aria-hidden="true" className="w-3 h-3" />
              In-Home · Free · No Obligation
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-hero uppercase tracking-wide mb-4 text-white leading-[0.95]">
            Book a Free<br className="sm:hidden" /> Consultation
          </h1>
          <div className="h-[1.5px] w-16 bg-gradient-to-r from-sandstone via-sandstone/60 to-transparent mx-auto mb-5 rounded-full" />
          <p className="font-serif italic text-white/85 text-lg sm:text-xl max-w-xl mx-auto leading-snug mb-2">
            We&apos;ll come to you, walk your space, and put a real plan together.
          </p>
          <p className="text-sm sm:text-base text-white/60 max-w-md mx-auto leading-relaxed">
            30–45 minutes. No pressure, no salespeople — just the builder who&apos;s going to do the work.
          </p>
        </div>
      </div>

      {/* ━━━ FORM BODY — CREAM ━━━ */}
      <Section variant="cream" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* ── MAIN FORM COLUMN ── */}
          <div className="lg:col-span-2">
            {submitted ? (
              /* Confirmation panel */
              <div className="paper-card rounded-md p-8 sm:p-10 md:p-12 text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-sandstone/15 border border-sandstone-dark/30 flex items-center justify-center mb-6">
                  <CheckCircle aria-hidden="true" className="w-7 h-7 text-sandstone-dark" />
                </div>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="h-px w-8 bg-sandstone-dark/40" aria-hidden="true" />
                  <p className="cream-eyebrow text-[10px] tracking-[0.3em] uppercase font-medium">Request received</p>
                  <span className="h-px w-8 bg-sandstone-dark/40" aria-hidden="true" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-ink mb-4 leading-tight">
                  Thanks, {formData.name.split(" ")[0]}.
                </h2>
                <p className="font-serif italic text-ink text-lg sm:text-xl leading-snug mb-3 max-w-md mx-auto">
                  We&apos;ll call you within 24 hours to schedule.
                </p>
                <p className="text-ink-muted text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8">
                  In the meantime, a confirmation is on its way to <strong>{formData.email}</strong>. If you&apos;d rather not wait, you can call us directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
                  <a
                    href={`tel:${BRAND_CONFIG.contact.phone}`}
                    className="inline-flex items-center justify-center gap-2 bg-ink text-bone px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-ink/90 transition-colors"
                  >
                    <Phone aria-hidden="true" className="w-4 h-4" /> Call {BRAND_CONFIG.contact.phoneFormatted}
                  </a>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 text-ink-muted hover:text-ink px-5 py-3.5 text-sm tracking-wide transition-colors border border-bone-hairline rounded-full hover:border-sandstone-dark"
                  >
                    Back to home →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="paper-card rounded-md">
                <div className="p-6 sm:p-8 md:p-10">
                  <div className="mb-7 sm:mb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-px w-8 cream-rule" />
                      <p className="cream-eyebrow text-[10px] tracking-[0.3em] uppercase font-medium">The Visit</p>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-black text-ink uppercase tracking-tight">
                      Tell us about your project
                    </h2>
                    <p className="font-serif italic text-ink-muted mt-3 text-base">
                      A few details so we know what to bring.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label htmlFor="name" className="block text-[11px] tracking-[0.2em] uppercase font-medium text-ink-muted mb-1.5">
                          Name <span className="text-sandstone-dark" aria-hidden="true">*</span>
                        </label>
                        <Input
                          id="name"
                          required
                          aria-required="true"
                          autoComplete="name"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          value={formData.name}
                          onChange={(e) => { handleInputChange("name", e.target.value); clearError("name"); }}
                          placeholder="Your name"
                          className={FIELD_CLASS}
                        />
                        {errors.name && <p id="name-error" role="alert" className="text-xs text-red-600 mt-1.5">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[11px] tracking-[0.2em] uppercase font-medium text-ink-muted mb-1.5">
                          Email <span className="text-sandstone-dark" aria-hidden="true">*</span>
                        </label>
                        <Input
                          id="email"
                          type="email"
                          inputMode="email"
                          required
                          aria-required="true"
                          autoComplete="email"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          value={formData.email}
                          onChange={(e) => { handleInputChange("email", e.target.value); clearError("email"); }}
                          placeholder="your@email.com"
                          className={FIELD_CLASS}
                        />
                        {errors.email && <p id="email-error" role="alert" className="text-xs text-red-600 mt-1.5">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-[11px] tracking-[0.2em] uppercase font-medium text-ink-muted mb-1.5">
                          Phone <span className="text-sandstone-dark" aria-hidden="true">*</span>
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          inputMode="tel"
                          required
                          aria-required="true"
                          autoComplete="tel"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                          value={formData.phone}
                          onChange={(e) => { handleInputChange("phone", e.target.value); clearError("phone"); }}
                          placeholder="(403) 555-0123"
                          className={FIELD_CLASS}
                        />
                        {errors.phone && <p id="phone-error" role="alert" className="text-xs text-red-600 mt-1.5">{errors.phone}</p>}
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-[11px] tracking-[0.2em] uppercase font-medium text-ink-muted mb-1.5">
                          Neighbourhood
                        </label>
                        <Input
                          id="address"
                          autoComplete="address-line1"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          placeholder="e.g. Bridgeland, NW Calgary"
                          className={FIELD_CLASS}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="serviceId" className="block text-[11px] tracking-[0.2em] uppercase font-medium text-ink-muted mb-1.5">
                        What are you thinking about?
                      </label>
                      <select
                        id="serviceId"
                        value={formData.serviceId}
                        onChange={(e) => handleInputChange("serviceId", e.target.value)}
                        className={SELECT_CLASS}
                      >
                        <option value="">Select a service (optional)</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <fieldset>
                        <legend className="block text-[11px] tracking-[0.2em] uppercase font-medium text-ink-muted mb-2.5">
                          When works for you? <span className="text-sandstone-dark" aria-hidden="true">*</span>
                        </legend>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {TIME_OPTIONS.map((opt) => {
                            const isSelected = formData.preferredTime === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => { handleInputChange("preferredTime", opt); clearError("preferredTime"); }}
                                aria-pressed={isSelected}
                                className={`text-left px-4 py-3 rounded-md border text-sm transition-colors ${
                                  isSelected
                                    ? "border-sandstone-dark bg-bone-soft text-ink"
                                    : "border-bone-hairline bg-bone-paper text-ink-muted hover:border-sandstone-dark/40 hover:text-ink"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {errors.preferredTime && <p id="preferredTime-error" role="alert" className="text-xs text-red-600 mt-2">{errors.preferredTime}</p>}
                      </fieldset>
                    </div>

                    <div>
                      <label htmlFor="projectDetails" className="block text-[11px] tracking-[0.2em] uppercase font-medium text-ink-muted mb-1.5">
                        Project notes <span className="text-sandstone-dark" aria-hidden="true">*</span>
                      </label>
                      <Textarea
                        id="projectDetails"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.projectDetails}
                        aria-describedby={errors.projectDetails ? "projectDetails-error" : undefined}
                        value={formData.projectDetails}
                        onChange={(e) => { handleInputChange("projectDetails", e.target.value); clearError("projectDetails"); }}
                        placeholder="Briefly — what are you hoping to do? Scope, rough size, anything we should know before we come out."
                        rows={4}
                        className={TEXTAREA_CLASS}
                      />
                      {errors.projectDetails && <p id="projectDetails-error" role="alert" className="text-xs text-red-600 mt-1.5">{errors.projectDetails}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full inline-flex items-center justify-center gap-3 bg-ink text-bone px-7 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-ink/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 aria-hidden="true" className="w-4 h-4 animate-spin" />
                          <span className="sr-only">Submitting</span>
                          Sending…
                        </>
                      ) : (
                        <>
                          Request My Consultation
                          <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-ink-muted/80 mt-3">
                      Or call us directly at{" "}
                      <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="font-semibold text-ink underline underline-offset-2 hover:text-sandstone-dark">
                        {BRAND_CONFIG.contact.phoneFormatted}
                      </a>
                      .
                    </p>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* ── TRUST SIDEBAR ── */}
          <aside className="lg:col-span-1 space-y-5">
            <div className="paper-card rounded-md p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6 cream-rule" />
                <p className="cream-eyebrow text-[10px] tracking-[0.3em] uppercase font-medium">What to expect</p>
              </div>
              <ul className="space-y-4 text-sm text-ink-muted">
                <li className="flex items-start gap-3">
                  <MapPin aria-hidden="true" className="w-4 h-4 text-sandstone-dark shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-ink leading-snug">We come to you.</p>
                    <p className="leading-relaxed text-ink-muted/90 mt-0.5">Anywhere in Calgary, Airdrie, Cochrane, or Okotoks.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar aria-hidden="true" className="w-4 h-4 text-sandstone-dark shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-ink leading-snug">30–45 minutes.</p>
                    <p className="leading-relaxed text-ink-muted/90 mt-0.5">Walk the space, talk through ideas, answer questions.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield aria-hidden="true" className="w-4 h-4 text-sandstone-dark shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-ink leading-snug">No pressure, no salesperson.</p>
                    <p className="leading-relaxed text-ink-muted/90 mt-0.5">You meet the builder, not a closer.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="paper-card rounded-md p-6 sm:p-7">
              <p className="font-serif italic text-[17px] sm:text-lg leading-snug text-ink mb-3">
                &ldquo;Expect Only The Best.&rdquo;
              </p>
              <p className="text-[10px] tracking-[0.25em] uppercase font-medium text-sandstone-muted">
                — {BRAND_CONFIG.owner}, Owner &amp; 3rd Generation Builder
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </div>
  );
}

export default function BookConsultationPage() {
  return (
    <Suspense fallback={null}>
      <BookConsultationForm />
    </Suspense>
  );
}
