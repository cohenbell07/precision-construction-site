"use client";

/**
 * Get-quote root page — Showroom + Studio canvas.
 * Hero stays dark (LightRays drama). Multi-step form body + trust sidebar
 * flip to cream — this is a friction-reducer zone where bone paper reads as
 * "let's talk," not "fill out my dark sales form."
 */

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { services, getServiceById } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import dynamic from "next/dynamic";
import {
  Loader2, CheckCircle, Star, Shield, Phone, Home, LayoutGrid, Droplets,
  DoorOpen, SquareStack, Building2, Square, Paintbrush2, Ruler,
  ArrowDownSquare, Trees, HomeIcon, Frame,
} from "lucide-react";
import { Section } from "@/components/Section";
import { validateLeadForm, type LeadFormErrors } from "@/lib/forms";
import { getActivePromo } from "@/lib/promo";
import { ServiceQuestions, type AnswersState } from "@/components/ServiceQuestions";
import { PhotoUpload } from "@/components/PhotoUpload";
import {
  getQuestionSet,
  formatAnswersForSubmit,
  validateAnswers,
} from "@/lib/quote-questions";

const LightRays = dynamic(() => import("@/components/LightRays").then((m) => ({ default: m.LightRays })), { ssr: false });

const POPULAR_SERVICES = new Set(["basements", "renovations", "flooring", "showers"]);

const serviceIcons: { [key: string]: any } = {
  flooring: LayoutGrid, showers: Droplets, cabinets: DoorOpen, countertops: SquareStack,
  carpentry: Ruler, framing: Frame, drywall: Square, painting: Paintbrush2,
  basements: ArrowDownSquare, garages: Trees, renovations: HomeIcon, commercial: Building2,
  default: Building2,
};

const FIELD_CLASS = "bg-bone-paper border-bone-hairline focus:border-sandstone-dark focus:ring-1 focus:ring-sandstone-dark/20 text-ink placeholder:text-ink-muted/60 rounded-md h-11 transition-colors";
const TEXTAREA_CLASS = "bg-bone-paper border-bone-hairline focus:border-sandstone-dark focus:ring-1 focus:ring-sandstone-dark/20 text-ink placeholder:text-ink-muted/60 rounded-md transition-colors resize-none";
const SELECT_CLASS = "w-full px-3 h-11 rounded-md border bg-bone-paper border-bone-hairline focus:border-sandstone-dark focus:outline-none text-ink text-base sm:text-sm transition-colors appearance-none";

function GetQuoteForm() {
  const searchParams = useSearchParams();
  const activePromo = getActivePromo();
  const [step, setStep] = useState<"selection" | "details" | "summary">("selection");
  const [selectedService, setSelectedService] = useState<string>("");
  const [customServiceName, setCustomServiceName] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "",
    projectDetails: "", timeline: "", budgetMin: "", budgetMax: "",
    referralSource: "", referralOther: "",
  });
  /* Service-specific structured answers (replaces the generic project-details
     textarea). Flattened into projectDetails on submit so the API contract
     doesn't change. */
  const [answers, setAnswers] = useState<AnswersState>({});
  const [answerErrors, setAnswerErrors] = useState<Record<string, string>>({});
  /* Optional project photos — uploaded as the user picks them via the
     PhotoUpload component; the resulting public URLs are sent with the
     submission and rendered in the admin email. */
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const clearError = (field: keyof LeadFormErrors) => {
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      setSelectedService(serviceParam);
      setStep("details");
    }
  }, [searchParams]);

  const handleServiceSelect = (serviceId: string) => {
    /* Reset structured answers if the service changed — the question set
       below depends on this. Keep photos: they apply across services. */
    if (serviceId !== selectedService) {
      setAnswers({});
      setAnswerErrors({});
    }
    setSelectedService(serviceId);
    setStep("details");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService === "other" && !customServiceName.trim()) {
      toast({ title: "Please enter your project type.", variant: "destructive" });
      document.getElementById("customServiceName")?.focus();
      return;
    }

    /* Validate structured answers first — they replace the old generic
       projectDetails textarea. The required fields per service live in
       lib/quote-questions.ts. */
    const questions = getQuestionSet(selectedService);
    const aErrs = validateAnswers(questions, answers);
    setAnswerErrors(aErrs);

    /* Flatten the structured answers into the projectDetails string the
       backend already expects — zero API changes needed. */
    const formattedDetails = formatAnswersForSubmit(questions, answers);
    const mergedFormData = { ...formData, projectDetails: formattedDetails };

    const errs = validateLeadForm(mergedFormData);
    setErrors(errs);

    if (Object.keys(aErrs).length) {
      /* Scroll to the first unanswered question. */
      const firstQ = Object.keys(aErrs)[0];
      document.getElementById(`q-${firstQ}`)?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(first)?.focus();
      return;
    }

    setLoading(true);
    try {
      const service = selectedService === "other" ? null : getServiceById(selectedService);
      const serviceTitle = selectedService === "other"
        ? (customServiceName || "Other Project")
        : (service?.title || selectedService);
      const res = await fetch("/api/quote/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name, email: formData.email, phone: formData.phone, address: formData.address,
          projectDetails: formattedDetails, timeline: formData.timeline,
          budgetMin: formData.budgetMin, budgetMax: formData.budgetMax,
          serviceTitle, serviceId: selectedService,
          referralSource: formData.referralSource === "Other"
            ? (formData.referralOther || "Other")
            : (formData.referralSource || undefined),
          photos: photoUrls.length > 0 ? photoUrls : undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSummary(data.summary || "Thank you for your quote request! We'll review your project details and get back to you within 24 hours with a detailed quote.");
        setStep("summary");
      } else {
        toast({ title: "Something went wrong", description: data.error || "Please try again or contact us directly.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast({ title: "Something went wrong", description: "Please try again or contact us directly.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const testimonials = [
    { name: "Mark & Teresa W.", text: "The tile work and cabinet install were perfect — you can tell these guys have been doing this a long time.", project: "Kitchen Renovation" },
    { name: "Dan R.", text: "They handled the permits, passed every inspection first try, and the final result was way better than we expected.", project: "Basement Development" },
    { name: "Priya S.", text: "The quote came in well under the other companies we called. No corners cut. Really happy.", project: "Flooring Installation" },
  ];
  /* SSR-safe random testimonial: deterministic 0 on first render, randomize after mount. */
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  useEffect(() => {
    setTestimonialIdx(Math.floor(Math.random() * testimonials.length));
  }, [testimonials.length]);
  const testimonial = testimonials[testimonialIdx];

  return (
    <div className="flex flex-col">

      {/* ━━━ HERO — DARK ━━━ */}
      <div className="relative border-b border-white/[0.08] bg-[#030303] py-12 sm:py-16 md:py-20 overflow-hidden">
        <LightRays raysOrigin="top-center" raysColor="#C4B5A0" raysSpeed={0.3} lightSpread={1.5} rayLength={2} fadeDistance={1.0} saturation={0.5} followMouse={true} mouseInfluence={0.06} className="opacity-15" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center relative z-10">
          <div className="flex justify-center mb-4">
            {activePromo ? (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sandstone/40 bg-sandstone/[0.08] text-sandstone text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-sandstone shrink-0 inline-block animate-pulse" />
                {activePromo.label} &middot; 15% Off &middot; Ends {activePromo.endsAtDisplay}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/60 text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 inline-block" />
                Free &middot; No Obligation &middot; 24-Hour Response
              </span>
            )}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-hero uppercase tracking-wide mb-4 text-white leading-[0.95]">
            Let&apos;s Talk About<br className="sm:hidden" /> Your Project
          </h1>
          <div className="h-[1.5px] w-16 bg-gradient-to-r from-sandstone via-sandstone/60 to-transparent mx-auto mb-4 rounded-full" />
          <p className="text-sm sm:text-base text-white/70 max-w-lg mx-auto leading-relaxed">
            {activePromo
              ? <>Tell us what you have in mind — your 15% spring rate is applied to every quote we send back within 24 hours.</>
              : <>Tell us what you have in mind — we&apos;ll get back to you with a free, detailed quote within 24 hours.</>}
          </p>
        </div>
      </div>

      {/* ━━━ FORM BODY — CREAM ━━━ */}
      <Section variant="cream" padding="lg">

        {/* Progress Indicator */}
        {step !== "summary" && (
          <div
            className="mb-8 sm:mb-10"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={2}
            aria-valuenow={step === "selection" ? 1 : 2}
            aria-valuetext={step === "selection" ? "Step 1 of 2: Service" : "Step 2 of 2: Details"}
          >
            <p className="text-center text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-medium text-sandstone-muted mb-4">
              Step {step === "selection" ? "1" : "2"} of 2 — {step === "selection" ? "Choose your service" : "Tell us about your project"}
            </p>
            <div className="flex items-center justify-center gap-0">
              {[
                { num: "01", label: "Service", key: "selection" },
                { num: "02", label: "Details", key: "details" },
              ].map((s, i, arr) => {
                const stepOrder = ["selection", "details", "summary"];
                const currentIdx = stepOrder.indexOf(step);
                const stepIdx = stepOrder.indexOf(s.key);
                const isCompleted = currentIdx > stepIdx;
                const isActive = currentIdx === stepIdx;
                return (
                  <div key={s.key} className="flex items-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 border-2 ${isCompleted ? 'bg-ink border-ink text-bone' : isActive ? 'border-sandstone-dark bg-bone-soft text-ink' : 'border-bone-hairline bg-bone-paper text-ink-muted'}`}>
                        {isCompleted ? <CheckCircle aria-hidden="true" className="h-4 w-4" /> : s.num}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-ink' : isCompleted ? 'text-sandstone-dark' : 'text-ink-muted'}`}>{s.label}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className={`w-14 sm:w-20 h-[2px] mx-2 mb-5 rounded-full transition-all duration-500 ${isCompleted ? 'bg-sandstone-dark' : 'bg-bone-hairline'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Main Form Column */}
          <div className="lg:col-span-2">

            {/* Step 1: Service Selection */}
            {step === "selection" && (
              <div className="paper-card rounded-md">
                <div className="p-6 sm:p-8 md:p-10">
                  <div className="mb-7 sm:mb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-px w-8 cream-rule" />
                      <p className="cream-eyebrow text-[10px] tracking-[0.3em] uppercase font-medium">Step 01</p>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-black text-ink uppercase tracking-tight">Select a Service</h2>
                    <p className="font-serif italic text-ink-muted mt-3 text-base">Which service are you interested in?</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((service) => {
                      const IconComponent = serviceIcons[service.id] || serviceIcons.default;
                      return (
                        <button key={service.id} type="button" onClick={() => handleServiceSelect(service.id)} className="group text-left p-4 sm:p-5 rounded-md border border-bone-hairline bg-bone-paper hover:bg-bone-soft hover:border-sandstone-dark transition-all duration-200 flex items-center gap-3 sm:gap-4">
                          <div className="w-10 h-10 rounded-md bg-bone-soft border border-bone-hairline group-hover:border-sandstone-dark flex items-center justify-center shrink-0 transition-colors">
                            <IconComponent aria-hidden="true" className="h-5 w-5 text-sandstone-dark" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-heading font-black text-sm text-ink uppercase tracking-tight">{service.title}</p>
                              {POPULAR_SERVICES.has(service.id) && (
                                <span className="text-[8px] font-black uppercase tracking-widest text-sandstone-muted bg-bone-soft border border-bone-hairline px-1.5 py-0.5 rounded-full">Popular</span>
                              )}
                            </div>
                            <p className="text-xs text-ink-muted leading-snug mt-1 line-clamp-2">{service.description}</p>
                          </div>
                        </button>
                      );
                    })}
                    <button type="button" onClick={() => handleServiceSelect("other")} className="group text-left p-4 sm:p-5 rounded-md border border-bone-hairline bg-bone-paper hover:bg-bone-soft hover:border-sandstone-dark transition-all duration-200 flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 rounded-md bg-bone-soft border border-bone-hairline group-hover:border-sandstone-dark flex items-center justify-center shrink-0 transition-colors">
                        <Building2 aria-hidden="true" className="h-5 w-5 text-sandstone-dark" />
                      </div>
                      <div>
                        <p className="font-heading font-black text-sm text-ink uppercase tracking-tight">Other</p>
                        <p className="text-[11px] text-ink-muted leading-tight mt-0.5">Have a different project? Select this.</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Project Details */}
            {step === "details" && (
              <div className="paper-card rounded-md">
                <div className="p-6 sm:p-8 md:p-10">
                  <form onSubmit={handleDetailsSubmit} className="space-y-5" noValidate>
                    {selectedService === "other" && (
                      <div>
                        <label htmlFor="customServiceName" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                          Project Type <span className="text-ink">*</span>
                        </label>
                        <Input id="customServiceName" required value={customServiceName} onChange={(e) => setCustomServiceName(e.target.value)} placeholder="e.g., Basement Development, Deck Construction..." className={FIELD_CLASS} />
                      </div>
                    )}

                    {/* Service-specific structured questions — replaces the
                        old generic 'Project Details' textarea. Question set
                        is pulled from lib/quote-questions.ts based on the
                        service the user picked in Step 1. */}
                    <ServiceQuestions
                      eyebrow="Step 02"
                      heading={`About Your ${selectedService === "other" ? "Project" : (getServiceById(selectedService)?.title ?? "Project")}`}
                      questions={getQuestionSet(selectedService)}
                      answers={answers}
                      errors={answerErrors}
                      onChange={(next) => {
                        setAnswers(next);
                        /* Clear any error for a question that's now answered. */
                        if (Object.keys(answerErrors).length) {
                          const cleared: Record<string, string> = {};
                          for (const key of Object.keys(answerErrors)) {
                            const v = next[key];
                            const isAnswered = Array.isArray(v) ? v.length > 0 : (typeof v === "string" && v.trim().length > 0);
                            if (!isAnswered) cleared[key] = answerErrors[key];
                          }
                          setAnswerErrors(cleared);
                        }
                      }}
                    />

                    {/* Optional photos — uploaded as files are picked. Fully
                        optional, but boosts quote accuracy substantially. */}
                    <div className="pt-2">
                      <PhotoUpload urls={photoUrls} onChange={setPhotoUrls} max={3} />
                    </div>

                    {/* Divider + contact info subhead — visually separates
                        'about the project' from 'how we reach you'. */}
                    <div className="pt-7 sm:pt-8 mt-2 border-t border-bone-hairline">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-px w-8 cream-rule" />
                        <p className="cream-eyebrow text-[10px] tracking-[0.3em] uppercase font-medium">Your Contact</p>
                      </div>
                      <p className="font-serif italic text-ink-muted text-base mb-2">
                        How we get back to you with the quote.
                      </p>
                      <p className="text-[11px] text-ink-muted mb-5">
                        Only <span className="text-ink font-semibold">name</span> and <span className="text-ink font-semibold">email</span> are required — everything else just helps us tailor the quote.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                          Name <span aria-hidden="true" className="text-ink">*</span>
                        </label>
                        <Input id="name" required aria-required="true" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} value={formData.name} onChange={(e) => { handleInputChange("name", e.target.value); clearError("name"); }} placeholder="Your name" className={FIELD_CLASS} />
                        {errors.name && <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-700">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                          Email <span aria-hidden="true" className="text-ink">*</span>
                        </label>
                        <Input id="email" type="email" inputMode="email" autoComplete="email" required aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} value={formData.email} onChange={(e) => { handleInputChange("email", e.target.value); clearError("email"); }} placeholder="your@email.com" className={FIELD_CLASS} />
                        {errors.email && <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-700">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Phone</label>
                        <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} placeholder="Your phone number" className={FIELD_CLASS} />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Project Address</label>
                        <Input id="address" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} placeholder="Calgary, AB (optional)" className={FIELD_CLASS} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label htmlFor="timeline" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Timeline</label>
                        <select id="timeline" value={formData.timeline} onChange={(e) => handleInputChange("timeline", e.target.value)} className={SELECT_CLASS}>
                          <option value="">Select...</option>
                          <option value="ASAP">ASAP</option>
                          <option value="Within 1 month">Within 1 month</option>
                          <option value="1-3 months">1-3 months</option>
                          <option value="3-6 months">3-6 months</option>
                          <option value="6-12 months">6-12 months</option>
                          <option value="Flexible / No rush">Flexible / No rush</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budgetMin" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Budget Min ($)</label>
                        <Input id="budgetMin" type="text" inputMode="numeric" pattern="[0-9,]*" placeholder="e.g., 10,000" value={formData.budgetMin} onChange={(e) => handleInputChange("budgetMin", e.target.value.replace(/[^0-9,]/g, ""))} className={FIELD_CLASS} />
                      </div>
                      <div>
                        <label htmlFor="budgetMax" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Budget Max ($)</label>
                        <Input id="budgetMax" type="text" inputMode="numeric" pattern="[0-9,]*" placeholder="e.g., 50,000" value={formData.budgetMax} onChange={(e) => handleInputChange("budgetMax", e.target.value.replace(/[^0-9,]/g, ""))} className={FIELD_CLASS} />
                      </div>
                    </div>
                    <p className="text-[11px] text-ink-muted">Timeline and budget are optional — they help us tailor your quote.</p>

                    {/* How did you hear about us */}
                    <div className="rounded-md border border-bone-hairline bg-bone-soft/40 p-4">
                      <label className="block text-[10px] font-bold mb-3 text-sandstone-muted uppercase tracking-[0.2em]">How did you hear about us?</label>
                      <div className="flex flex-wrap gap-2">
                        {["Google Search", "Facebook", "Instagram", "Returning Customer", "Other"].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              handleInputChange("referralSource", formData.referralSource === option ? "" : option);
                              if (option !== "Other") handleInputChange("referralOther", "");
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
                        <Input placeholder="Tell us how you found us..." value={formData.referralOther} onChange={(e) => handleInputChange("referralOther", e.target.value)} className={`mt-3 ${FIELD_CLASS} h-10`} />
                      )}
                      <p className="text-[10px] text-ink-muted/70 mt-2">Optional — helps us improve our service.</p>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button type="button" onClick={() => setStep("selection")} className="text-xs font-black text-ink-muted hover:text-ink uppercase tracking-widest transition-colors px-4 py-2.5 rounded-md border border-bone-hairline hover:border-sandstone-dark">
                        &larr; Back
                      </button>
                      <button type="submit" disabled={loading} className="btn-ink flex-1 py-3 uppercase tracking-widest text-xs sm:text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                        {loading ? (<><Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> Submitting...</>) : "Submit Quote Request"}
                      </button>
                    </div>
                    <p className="text-[11px] text-ink-muted/70 text-center pt-1">We respond within 24 hours. No spam, no pressure.</p>
                  </form>
                </div>
              </div>
            )}

            {/* Summary */}
            {step === "summary" && (
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
                    {formData.name ? `${formData.name.split(" ")[0]}, we've got it.` : "We've got it."}
                  </h2>
                  <p className="font-serif italic text-ink text-lg sm:text-xl leading-snug max-w-md mx-auto mb-6">
                    A confirmation is on its way to {formData.email}.
                  </p>

                  {/* What happens next — concrete commitment, then an
                      escape hatch to the higher-intent path. */}
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

                  {summary && (
                    <details className="max-w-md mx-auto mb-7 text-left">
                      <summary className="cursor-pointer text-[11px] tracking-[0.25em] uppercase font-medium text-sandstone-muted hover:text-ink-muted transition-colors">
                        What we sent you
                      </summary>
                      <div className="mt-3 rounded-md border border-bone-hairline bg-bone-soft/50 p-4 text-sm text-ink-muted leading-relaxed">
                        {summary}
                      </div>
                    </details>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
                    <Link
                      href={selectedService && selectedService !== "other" ? `/book-consultation?service=${selectedService}` : "/book-consultation"}
                      className="btn-ink px-7 py-3.5 uppercase tracking-widest text-xs sm:text-sm inline-flex items-center justify-center gap-2"
                    >
                      Book a Consultation →
                    </Link>
                    <Link
                      href="/"
                      className="btn-ink-ghost uppercase tracking-widest text-xs sm:text-sm px-6 py-3.5 inline-flex items-center justify-center"
                    >
                      Return Home
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setStep("selection");
                      setSelectedService("");
                      setCustomServiceName("");
                      setAnswers({});
                      setAnswerErrors({});
                      setFormData({ name: "", email: "", phone: "", address: "", projectDetails: "", timeline: "", budgetMin: "", budgetMax: "", referralSource: "", referralOther: "" });
                    }}
                    className="mt-6 text-[11px] text-sandstone-muted hover:text-ink-muted tracking-[0.25em] uppercase underline-offset-4 hover:underline transition-colors"
                  >
                    Request another quote
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ━━━ TRUST SIDEBAR ━━━ */}
          <div className="space-y-5 lg:block">

            <div className="paper-card rounded-md">
              <div className="p-5 sm:p-6">
                <div className="mb-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px w-8 cream-rule" />
                    <p className="cream-eyebrow text-[10px] tracking-[0.25em] uppercase font-medium">Why Request a Quote?</p>
                  </div>
                  <h3 className="text-lg font-heading font-black text-ink uppercase tracking-tight">It&apos;s Simple</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "100% Free", desc: "No cost, no hidden fees to get a quote" },
                    { title: "No Obligation", desc: "Take your time — zero pressure to commit" },
                    { title: "24-Hour Response", desc: "We get back to you within one business day" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <span className="mt-[3px] shrink-0 w-4 h-4 rounded-full bg-bone-soft border border-sandstone-dark flex items-center justify-center">
                        <span className="w-1 h-1 rounded-full bg-sandstone-dark block" />
                      </span>
                      <div>
                        <p className="text-sm font-black text-ink leading-tight">{item.title}</p>
                        <p className="text-xs text-ink-muted mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="paper-card rounded-md">
              <div className="p-5 sm:p-6">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} aria-hidden="true" className="w-3 h-3 fill-sandstone-dark text-sandstone-dark" />
                  ))}
                </div>
                <p className="text-ink text-sm leading-relaxed italic font-serif mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="border-t border-bone-hairline pt-3">
                  <p className="text-xs font-semibold text-ink">{testimonial.name}</p>
                  <p className="text-[10px] text-sandstone-muted">{testimonial.project}</p>
                </div>
              </div>
            </div>

            <div className="paper-card rounded-md">
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-bone-soft border border-bone-hairline flex items-center justify-center shrink-0">
                    <Shield aria-hidden="true" className="w-4 h-4 text-sandstone-dark" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ink">5% Price Beat Guarantee</p>
                    <p className="text-[10px] text-ink-muted">We beat any legitimate quote</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-bone-soft border border-bone-hairline flex items-center justify-center shrink-0">
                    <Home aria-hidden="true" className="w-4 h-4 text-sandstone-dark" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ink">Family-Owned Since 1968</p>
                    <p className="text-[10px] text-ink-muted">3rd generation builder</p>
                  </div>
                </div>
                <div className="border-t border-bone-hairline pt-4">
                  <p className="text-[10px] font-bold text-sandstone-muted uppercase tracking-[0.2em] mb-2">Prefer to Talk?</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-sandstone-dark transition-colors">
                    <Phone aria-hidden="true" className="w-3.5 h-3.5" /> Contact Us
                  </Link>
                  <p className="text-[10px] text-ink-muted mt-1">Ask for {BRAND_CONFIG.owner}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <noscript>
        <div className="bg-black text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Request a Quote</h2>
          <p className="mb-4">JavaScript is required for our quote form. Please call us directly:</p>
          <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="text-xl font-bold underline">{BRAND_CONFIG.contact.phoneFormatted}</a>
          <p className="mt-2">or email <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="underline">{BRAND_CONFIG.contact.email}</a></p>
        </div>
      </noscript>
    </div>
  );
}

export default function GetQuotePage() {
  return (
    <Suspense fallback={
      <div role="status" aria-label="Loading quote form" className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 aria-hidden="true" className="h-8 w-8 text-white/50 animate-spin" />
      </div>
    }>
      <GetQuoteForm />
    </Suspense>
  );
}
