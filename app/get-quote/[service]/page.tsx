"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { getServiceById } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { getDealsForService, PRICE_BEAT_GUARANTEE } from "@/lib/deals";
import { Loader2, CheckCircle } from "lucide-react";

export default function ServiceQuotePage({ params }: { params: { service: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const serviceId = params.service;
  const service = getServiceById(serviceId);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    projectDetails: "",
    timeline: "",
    budgetMin: "",
    budgetMax: "",
    referralSource: "",
    referralOther: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!service) {
    router.replace("/get-quote");
    return null;
  }
  const serviceTitle = service.title;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    if (!formData.email.trim()) {
      toast({ title: "Email is required", variant: "destructive" });
      return;
    }
    if (!formData.projectDetails.trim()) {
      toast({ title: "Project details are required", variant: "destructive" });
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
      <div className="min-h-screen bg-black relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)`, backgroundSize: '100px 100px' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-2xl relative z-10">
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.12] bg-[#050505] shadow-[0_4px_40px_rgba(0,0,0,0.6)]" style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.6), 0 0 40px rgba(255,255,255,0.04)' }}>
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <div className="p-8 sm:p-10 md:p-12 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/[0.06] border border-white/[0.15] flex items-center justify-center mx-auto mb-6" style={{ boxShadow: '0 0 30px rgba(255,255,255,0.12)' }}>
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white/70" />
              </div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">Request Received</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight mb-3">
                Thank You!
              </h2>
              <div className="h-[2px] w-10 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-6 rounded-full"></div>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
                Thanks for your {serviceTitle} quote request. We&apos;ll get back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-white text-black font-bold hover:bg-white/90 transition-colors rounded-full uppercase tracking-widest text-xs sm:text-sm px-6 py-3 h-auto">
                  <Link href="/">Return Home</Link>
                </Button>
                <Button asChild variant="outline" className="text-xs font-black text-white/35 hover:text-white uppercase tracking-widest transition-colors px-6 py-3 rounded-full border border-white/[0.08] hover:border-white/[0.15] h-auto">
                  <Link href="/get-quote">Request Another Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)`, backgroundSize: '100px 100px' }}></div>
      </div>

      {/* Page header */}
      <div className="relative border-b border-white/[0.08] bg-[#030303] py-12 sm:py-16 md:py-20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/40 text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0 inline-block"></span>
              Free Quote · No Obligation · 24-Hour Response
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black mb-4 text-white uppercase tracking-tight">
            Get a Quote — {serviceTitle}
          </h1>
          <div className="h-[3px] w-14 bg-gradient-to-r from-white/50 to-transparent mx-auto mb-4 rounded-full" style={{ boxShadow: '0 0 10px rgba(255,255,255,0.5)' }}></div>
          <p className="text-sm sm:text-base text-white/45 max-w-lg mx-auto leading-relaxed">
            Tell us about your {serviceTitle.toLowerCase()} project. We&apos;ll send you a detailed quote within 24 hours.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16 max-w-2xl relative z-10">
        <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#050505] shadow-[0_4px_32px_rgba(0,0,0,0.6)]">
          <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-white/40 via-white/[0.15] to-transparent pointer-events-none"></div>
          <div className="p-6 sm:p-8 md:p-10">
            <div className="mb-6 sm:mb-8">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-1">Project Details</p>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                Your Details
              </h2>
              <div className="h-[3px] w-10 bg-gradient-to-r from-white/50 to-transparent mt-3 rounded-full" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.4)' }}></div>
            </div>

            {/* Deal Banner */}
            {(() => {
              const deals = getDealsForService(serviceId);
              if (deals.length === 0) return null;
              return (
                <div className="mb-6 rounded-xl border border-white/[0.12] bg-white/[0.04] p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">Deals Available</p>
                  {deals.map((deal) => (
                    <div key={deal.id} className="flex items-center gap-3 py-1.5">
                      <span className="text-xs font-black text-white bg-white/[0.12] px-2 py-0.5 rounded-full shrink-0">{deal.discount}</span>
                      <span className="text-sm text-white/60">{deal.name}</span>
                    </div>
                  ))}
                  <p className="text-[11px] text-white/35 mt-2">{PRICE_BEAT_GUARANTEE}</p>
                </div>
              );
            })()}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Project Type - pre-filled */}
              <div>
                <label className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                  <span className="w-1 h-1 rounded-full bg-white/50 shrink-0"></span>
                  Service Type
                </label>
                <Input
                  readOnly
                  value={serviceTitle}
                  className="bg-white/[0.04] border-white/[0.10] text-white cursor-default rounded-xl h-11"
                />
              </div>

              {/* Contact fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                    <span className="w-1 h-1 rounded-full bg-white/50 shrink-0"></span>
                    Name <span className="text-white/50">*</span>
                  </label>
                  <Input
                    id="name"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="bg-white/[0.04] border-white/[0.10] focus:border-white/30 focus:ring-1 focus:ring-white/[0.10] text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                    <span className="w-1 h-1 rounded-full bg-white/50 shrink-0"></span>
                    Email <span className="text-white/50">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="bg-white/[0.04] border-white/[0.10] focus:border-white/30 focus:ring-1 focus:ring-white/[0.10] text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                    <span className="w-1 h-1 rounded-full bg-white/20 shrink-0"></span>
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(403) 818-7767"
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    className="bg-white/[0.04] border-white/[0.10] focus:border-white/30 focus:ring-1 focus:ring-white/[0.10] text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                    <span className="w-1 h-1 rounded-full bg-white/20 shrink-0"></span>
                    Project Address
                  </label>
                  <Input
                    id="address"
                    placeholder="Calgary, AB (optional)"
                    value={formData.address}
                    onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
                    className="bg-white/[0.04] border-white/[0.10] focus:border-white/30 focus:ring-1 focus:ring-white/[0.10] text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="projectDetails" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                  <span className="w-1 h-1 rounded-full bg-white/50 shrink-0"></span>
                  Project Details <span className="text-white/50">*</span>
                </label>
                <Textarea
                  id="projectDetails"
                  required
                  placeholder="Describe your project in detail — scope, size, materials you have in mind, etc."
                  value={formData.projectDetails}
                  onChange={(e) => setFormData((p) => ({ ...p, projectDetails: e.target.value }))}
                  rows={5}
                  className="bg-white/[0.04] border-white/[0.10] focus:border-white/30 focus:ring-1 focus:ring-white/[0.10] text-white placeholder:text-white/25 rounded-xl transition-colors resize-none"
                />
              </div>

              {/* Timeline + Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="timeline" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                    <span className="w-1 h-1 rounded-full bg-white/20 shrink-0"></span>
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => setFormData((p) => ({ ...p, timeline: e.target.value }))}
                    className="w-full px-3 h-11 rounded-xl border bg-white/[0.04] border-white/[0.10] focus:border-white/30 focus:outline-none text-white text-sm transition-colors appearance-none"
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
                <div>
                  <label htmlFor="budgetMin" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                    <span className="w-1 h-1 rounded-full bg-white/20 shrink-0"></span>
                    Budget Min ($)
                  </label>
                  <Input
                    id="budgetMin"
                    type="number"
                    placeholder="e.g. 10,000"
                    value={formData.budgetMin}
                    onChange={(e) => setFormData((p) => ({ ...p, budgetMin: e.target.value }))}
                    className="bg-white/[0.04] border-white/[0.10] focus:border-white/30 focus:ring-1 focus:ring-white/[0.10] text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="budgetMax" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                    <span className="w-1 h-1 rounded-full bg-white/20 shrink-0"></span>
                    Budget Max ($)
                  </label>
                  <Input
                    id="budgetMax"
                    type="number"
                    placeholder="e.g. 50,000"
                    value={formData.budgetMax}
                    onChange={(e) => setFormData((p) => ({ ...p, budgetMax: e.target.value }))}
                    className="bg-white/[0.04] border-white/[0.10] focus:border-white/30 focus:ring-1 focus:ring-white/[0.10] text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                  />
                </div>
              </div>
              <p className="text-[11px] text-white/25">Timeline and budget are optional — they help us tailor your quote.</p>

              {/* How did you hear about us */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <label className="flex items-center gap-1.5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-3">
                  <span className="w-1 h-1 rounded-full bg-white/30 shrink-0"></span>
                  How did you hear about us?
                </label>
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
                          ? "border-white/30 bg-white/[0.10] text-white"
                          : "border-white/[0.08] bg-white/[0.02] text-white/40 hover:border-white/15 hover:text-white/60"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {formData.referralSource === "Other" && (
                  <Input
                    placeholder="Tell us how you found us…"
                    value={formData.referralOther}
                    onChange={(e) => setFormData((p) => ({ ...p, referralOther: e.target.value }))}
                    className="mt-3 bg-white/[0.04] border-white/[0.08] focus:border-white/25 focus:ring-1 focus:ring-white/10 text-white placeholder:text-white/25 rounded-xl h-10 text-sm transition-colors"
                  />
                )}
                <p className="text-[10px] text-white/20 mt-2">Optional — helps us improve our service.</p>
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-white text-black font-bold hover:bg-white/90 transition-colors rounded-full uppercase tracking-widest text-sm py-3 h-auto">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Quote Request"
                )}
              </Button>
            </form>
          </div>
        </div>

        <p className="text-center text-white/25 text-xs mt-6">
          {BRAND_CONFIG.motto}
        </p>
      </div>
    </div>
  );
}
