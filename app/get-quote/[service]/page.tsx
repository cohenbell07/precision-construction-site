"use client";

/**
 * Per-service quote page (`/get-quote/[service]`) — Showroom + Studio canvas.
 * Pre-fills the service. Dark hero + cream form.
 */

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { getServiceById } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { getDealsForService, PRICE_BEAT_GUARANTEE } from "@/lib/deals";
import { Loader2, CheckCircle } from "lucide-react";
import { Section } from "@/components/Section";
import { validateLeadForm, type LeadFormErrors } from "@/lib/forms";

const FIELD_CLASS = "bg-bone-paper border-bone-hairline focus:border-sandstone-dark focus:ring-1 focus:ring-sandstone-dark/20 text-ink placeholder:text-ink-muted/60 rounded-md h-11 transition-colors";
const READONLY_CLASS = "bg-bone-soft border-bone-hairline text-ink cursor-default rounded-md h-11";
const TEXTAREA_CLASS = "bg-bone-paper border-bone-hairline focus:border-sandstone-dark focus:ring-1 focus:ring-sandstone-dark/20 text-ink placeholder:text-ink-muted/60 rounded-md transition-colors resize-none";
const SELECT_CLASS = "w-full px-3 h-11 rounded-md border bg-bone-paper border-bone-hairline focus:border-sandstone-dark focus:outline-none text-ink text-base sm:text-sm transition-colors appearance-none";

export default function ServiceQuotePage({ params }: { params: { service: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const serviceId = params.service;
  const service = getServiceById(serviceId);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "",
    projectDetails: "", timeline: "", budgetMin: "", budgetMax: "",
    referralSource: "", referralOther: "",
  });
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const clearError = (field: keyof LeadFormErrors) => {
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  if (!service) {
    router.replace("/get-quote");
    return null;
  }
  const serviceTitle = service.title;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateLeadForm(formData);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(first)?.focus();
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/quote/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name || undefined,
          email: formData.email,
          phone: formData.phone || undefined,
          address: formData.address || undefined,
          projectDetails: formData.projectDetails,
          timeline: formData.timeline || undefined,
          budgetMin: formData.budgetMin || undefined,
          budgetMax: formData.budgetMax || undefined,
          quoteType: "service",
          serviceTitle,
          serviceId,
          referralSource: formData.referralSource === "Other"
            ? (formData.referralOther || "Other")
            : (formData.referralSource || undefined),
          productTitle: undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        throw new Error(data.error || "Submit failed");
      }
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
              <CheckCircle aria-hidden="true" className="h-8 w-8 sm:h-10 sm:w-10 text-sandstone-dark" />
            </div>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 cream-rule" />
              <p className="cream-eyebrow text-[10px] tracking-[0.3em] uppercase font-medium">Request Received</p>
              <div className="h-px w-8 cream-rule-rtl" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-ink uppercase tracking-tight mb-3">Thank You!</h2>
            <p className="text-ink-muted text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
              Thanks for your {serviceTitle} quote request. We&apos;ll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="btn-ink px-6 py-3 uppercase tracking-widest text-xs sm:text-sm">Return Home</Link>
              <Link href="/get-quote" className="btn-ink-ghost px-6 py-3 uppercase tracking-widest text-xs sm:text-sm">Request Another Quote</Link>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  const deals = getDealsForService(serviceId);

  return (
    <div className="flex flex-col">

      {/* ━━━ HERO — DARK ━━━ */}
      <div className="relative border-b border-white/[0.08] bg-[#030303] py-12 sm:py-16 md:py-20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sandstone/30 bg-sandstone/10 text-sandstone text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-sandstone animate-pulse shrink-0 inline-block" />
              Free Quote · No Obligation · 24-Hour Response
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-4 text-white uppercase tracking-tight">
            Get a Quote — {serviceTitle}
          </h1>
          <div className="h-[1.5px] w-16 bg-gradient-to-r from-sandstone via-sandstone/60 to-transparent mx-auto mb-4 rounded-full" />
          <p className="text-sm sm:text-base text-white/70 max-w-lg mx-auto leading-relaxed">
            Tell us about your {serviceTitle} project. We&apos;ll send you a detailed quote within 24 hours.
          </p>
        </div>
      </div>

      {/* ━━━ FORM — CREAM ━━━ */}
      <Section variant="cream" padding="lg" containerClassName="container mx-auto px-4 sm:px-6 max-w-2xl">
        <div className="paper-card rounded-md">
          <div className="p-6 sm:p-8 md:p-10">
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 cream-rule" />
                <p className="cream-eyebrow text-[10px] tracking-[0.3em] uppercase font-medium">Project Details</p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-ink uppercase tracking-tight">Your Details</h2>
              <p className="font-serif italic text-ink-muted mt-3 text-base">A few details and we&apos;ll send your quote within 24 hours.</p>
            </div>

            {/* Deal Banner */}
            {deals.length > 0 && (
              <div className="mb-6 rounded-md border border-sandstone-dark/40 bg-bone-soft p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sandstone-muted mb-2">Deals Available</p>
                {deals.map((deal) => (
                  <div key={deal.id} className="flex items-center gap-3 py-1.5">
                    <span className="text-xs font-black text-bone bg-sandstone-dark px-2 py-0.5 rounded-full shrink-0">{deal.discount}</span>
                    <span className="text-sm text-ink">{deal.name}</span>
                  </div>
                ))}
                <p className="text-[11px] text-ink-muted mt-2">{PRICE_BEAT_GUARANTEE}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Service Type</label>
                <Input readOnly value={serviceTitle} className={READONLY_CLASS} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                    Name <span aria-hidden="true" className="text-ink">*</span>
                  </label>
                  <Input id="name" required aria-required="true" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} placeholder="Your name" value={formData.name} onChange={(e) => { setFormData((p) => ({ ...p, name: e.target.value })); clearError("name"); }} className={FIELD_CLASS} />
                  {errors.name && <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-700">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                    Email <span aria-hidden="true" className="text-ink">*</span>
                  </label>
                  <Input id="email" type="email" inputMode="email" autoComplete="email" required aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} placeholder="your@email.com" value={formData.email} onChange={(e) => { setFormData((p) => ({ ...p, email: e.target.value })); clearError("email"); }} className={FIELD_CLASS} />
                  {errors.email && <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-700">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Phone</label>
                  <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Your phone number" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} className={FIELD_CLASS} />
                </div>
                <div>
                  <label htmlFor="address" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Project Address</label>
                  <Input id="address" placeholder="Calgary, AB (optional)" value={formData.address} onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))} className={FIELD_CLASS} />
                </div>
              </div>

              <div>
                <label htmlFor="projectDetails" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                  Project Details <span aria-hidden="true" className="text-ink">*</span>
                </label>
                <Textarea id="projectDetails" required aria-required="true" aria-invalid={!!errors.projectDetails} aria-describedby={errors.projectDetails ? "projectDetails-error" : undefined} placeholder="Describe your project in detail — scope, size, materials you have in mind, etc." value={formData.projectDetails} onChange={(e) => { setFormData((p) => ({ ...p, projectDetails: e.target.value })); clearError("projectDetails"); }} rows={5} className={TEXTAREA_CLASS} />
                {errors.projectDetails && <p id="projectDetails-error" role="alert" className="mt-1.5 text-xs text-red-700">{errors.projectDetails}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="timeline" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Timeline</label>
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
                <div>
                  <label htmlFor="budgetMin" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Budget Min ($)</label>
                  <Input id="budgetMin" type="number" placeholder="e.g. 10,000" value={formData.budgetMin} onChange={(e) => setFormData((p) => ({ ...p, budgetMin: e.target.value }))} className={FIELD_CLASS} />
                </div>
                <div>
                  <label htmlFor="budgetMax" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Budget Max ($)</label>
                  <Input id="budgetMax" type="number" placeholder="e.g. 50,000" value={formData.budgetMax} onChange={(e) => setFormData((p) => ({ ...p, budgetMax: e.target.value }))} className={FIELD_CLASS} />
                </div>
              </div>
              <p className="text-[11px] text-ink-muted">Timeline and budget are optional — they help us tailor your quote.</p>

              <div className="rounded-md border border-bone-hairline bg-bone-soft/40 p-4">
                <label className="block text-[10px] font-bold mb-3 text-sandstone-muted uppercase tracking-[0.2em]">How did you hear about us?</label>
                <div className="flex flex-wrap gap-2">
                  {["Google Search", "Facebook", "Instagram", "Returning Customer", "Other"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setFormData((p) => ({
                          ...p,
                          referralSource: p.referralSource === option ? "" : option,
                          referralOther: option !== "Other" ? "" : p.referralOther,
                        }));
                      }}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                        formData.referralSource === option
                          ? "border-sandstone-dark bg-bone-paper text-ink"
                          : "border-bone-hairline bg-bone-paper text-ink-muted hover:border-sandstone-dark hover:text-ink"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {formData.referralSource === "Other" && (
                  <Input placeholder="Tell us how you found us…" value={formData.referralOther} onChange={(e) => setFormData((p) => ({ ...p, referralOther: e.target.value }))} className={`mt-3 ${FIELD_CLASS} h-10`} />
                )}
                <p className="text-[10px] text-ink-muted/70 mt-2">Optional — helps us improve our service.</p>
              </div>

              <button type="submit" disabled={loading} className="btn-ink w-full py-3 uppercase tracking-widest text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? (<><Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> Submitting...</>) : "Submit Quote Request"}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-ink-muted text-xs mt-6 font-serif italic">{BRAND_CONFIG.motto}</p>
      </Section>
    </div>
  );
}
