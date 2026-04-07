"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { BRAND_CONFIG } from "@/lib/utils";
import { Loader2, Check, CheckCircle } from "lucide-react";

const SEASONAL_OPTIONS = [
  "Painting & drywall",
  "Flooring installation",
  "Carpentry & trim work",
  "Custom showers & tile work",
  "Drywall & ceiling texture",
  "Countertop installation",
];

export default function SupplierDealsQuotePage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
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
    if (selected.size === 0) {
      toast({ title: "Select at least one service", variant: "destructive" });
      return;
    }
    if (!formData.name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    if (!formData.email.trim()) {
      toast({ title: "Email is required", variant: "destructive" });
      return;
    }
    if (!formData.projectDetails.trim()) {
      toast({ title: "Please provide project details", variant: "destructive" });
      return;
    }
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
      <div className="min-h-screen bg-black relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)`, backgroundSize: '100px 100px' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-2xl relative z-10">
          <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-[#050505] shadow-[0_4px_40px_rgba(0,0,0,0.6)]" style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.6), 0 0 40px rgba(255,255,255,0.04)' }}>
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            <div className="p-8 sm:p-10 md:p-12 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/[0.10] border border-white/25 flex items-center justify-center mx-auto mb-6" style={{ boxShadow: '0 0 30px rgba(255,255,255,0.12)' }}>
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] mb-2">Request Received</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight mb-3">
                Thank You!
              </h2>
              <div className="h-[2px] w-10 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-6 rounded-full"></div>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
                Thanks for your 10% Seasonal Special quote request. We&apos;ll get back to you within 24 hours with pricing.
              </p>
              <Button asChild className="bg-white text-black font-bold hover:bg-white/90 transition-colors rounded-full uppercase tracking-widest text-xs sm:text-sm px-6 py-3 h-auto">
                <Link href="/">Return Home</Link>
              </Button>
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
      <div className="relative border-b border-white/10 bg-[#030303] py-12 sm:py-16 md:py-20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/40 text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 inline-block"></span>
              Limited Time · 10% Off · Select Services
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black mb-4 text-white uppercase tracking-tight">
            10% Off — Seasonal Specials
          </h1>
          <div className="h-[3px] w-14 bg-gradient-to-r from-white to-transparent mx-auto mb-4 rounded-full" style={{ boxShadow: '0 0 10px rgba(255,255,255,0.5)' }}></div>
          <p className="text-sm sm:text-base text-white/45 max-w-lg mx-auto leading-relaxed">
            Select one or more services below and tell us about your project. We&apos;ll send you a quote with 10% off — limited availability.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16 max-w-2xl relative z-10">
        <form onSubmit={handleSubmit}>
          {/* Service Selection */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#050505] shadow-[0_4px_32px_rgba(0,0,0,0.6)] mb-6">
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-white/70 via-white/30 to-transparent pointer-events-none"></div>
            <div className="p-6 sm:p-8 md:p-10">
              <div className="mb-6">
                <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] mb-1">Step 01</p>
                <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">Select Service(s)</h2>
                <div className="h-[3px] w-10 bg-gradient-to-r from-white to-transparent mt-3 rounded-full" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.4)' }}></div>
                <p className="text-sm text-white/40 mt-3">Click to add or remove a checkmark.</p>
              </div>
              <div className="space-y-3">
                {SEASONAL_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggle(option)}
                    className={`w-full flex items-center justify-between text-left p-4 rounded-xl border-2 transition-all ${
                      selected.has(option)
                        ? "border-white/50 bg-white/[0.06] text-white"
                        : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/25"
                    }`}
                  >
                    <span className="font-semibold text-sm">{option}</span>
                    {selected.has(option) && (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 border border-white/40 text-white">
                        <Check className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#050505] shadow-[0_4px_32px_rgba(0,0,0,0.6)] mb-6">
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none"></div>
            <div className="p-6 sm:p-8 md:p-10">
              <div className="mb-6">
                <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] mb-1">Step 02</p>
                <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">Project Details & Contact</h2>
                <div className="h-[3px] w-10 bg-gradient-to-r from-white to-transparent mt-3 rounded-full" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.4)' }}></div>
              </div>
              <div className="space-y-5">
                <div>
                  <label htmlFor="projectDetails" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                    <span className="w-1 h-1 rounded-full bg-white shrink-0"></span>
                    Describe Your Project <span className="text-white/70">*</span>
                  </label>
                  <Textarea
                    id="projectDetails"
                    required
                    placeholder="e.g. Full basement development ~800 sq ft, main floor painting, bathroom flooring"
                    value={formData.projectDetails}
                    onChange={(e) => setFormData((p) => ({ ...p, projectDetails: e.target.value }))}
                    rows={4}
                    className="bg-white/[0.04] border-white/[0.08] focus:border-white/25 focus:ring-1 focus:ring-white/10 text-white placeholder:text-white/25 rounded-xl transition-colors resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                      <span className="w-1 h-1 rounded-full bg-white shrink-0"></span>
                      Name <span className="text-white/70">*</span>
                    </label>
                    <Input
                      id="name"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className="bg-white/[0.04] border-white/[0.08] focus:border-white/25 focus:ring-1 focus:ring-white/10 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                      <span className="w-1 h-1 rounded-full bg-white shrink-0"></span>
                      Email <span className="text-white/70">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className="bg-white/[0.04] border-white/[0.08] focus:border-white/25 focus:ring-1 focus:ring-white/10 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                    <span className="w-1 h-1 rounded-full bg-white/30 shrink-0"></span>
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(403) 818-7767"
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    className="bg-white/[0.04] border-white/[0.08] focus:border-white/25 focus:ring-1 focus:ring-white/10 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                    <span className="w-1 h-1 rounded-full bg-white/30 shrink-0"></span>
                    Project Address
                  </label>
                  <Input
                    id="address"
                    placeholder="Calgary, AB (optional)"
                    value={formData.address}
                    onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
                    className="bg-white/[0.04] border-white/[0.08] focus:border-white/25 focus:ring-1 focus:ring-white/10 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label htmlFor="timeline" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                      <span className="w-1 h-1 rounded-full bg-white/30 shrink-0"></span>
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData((p) => ({ ...p, timeline: e.target.value }))}
                      className="w-full px-3 h-11 rounded-xl border bg-white/[0.04] border-white/[0.08] focus:border-white/25 focus:outline-none text-white text-sm transition-colors appearance-none"
                    >
                      <option value="">Select…</option>
                      <option value="ASAP">ASAP</option>
                      <option value="Within 1 month">Within 1 month</option>
                      <option value="1–3 months">1–3 months</option>
                      <option value="3–6 months">3–6 months</option>
                      <option value="Flexible / No rush">Flexible / No rush</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budgetMin" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                      <span className="w-1 h-1 rounded-full bg-white/30 shrink-0"></span>
                      Budget Min ($)
                    </label>
                    <Input
                      id="budgetMin"
                      type="number"
                      placeholder="e.g., 5,000"
                      value={formData.budgetMin}
                      onChange={(e) => setFormData((p) => ({ ...p, budgetMin: e.target.value }))}
                      className="bg-white/[0.04] border-white/[0.08] focus:border-white/25 focus:ring-1 focus:ring-white/10 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="budgetMax" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                      <span className="w-1 h-1 rounded-full bg-white/30 shrink-0"></span>
                      Budget Max ($)
                    </label>
                    <Input
                      id="budgetMax"
                      type="number"
                      placeholder="e.g., 25,000"
                      value={formData.budgetMax}
                      onChange={(e) => setFormData((p) => ({ ...p, budgetMax: e.target.value }))}
                      className="bg-white/[0.04] border-white/[0.08] focus:border-white/25 focus:ring-1 focus:ring-white/10 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-white/25">Timeline and budget are optional — they help us tailor your quote.</p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || selected.size === 0}
            className="w-full bg-white text-black font-bold hover:bg-white/90 transition-colors rounded-full uppercase tracking-widest text-sm py-3 h-auto"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Request 10% Seasonal Quote"}
          </Button>
        </form>

        <p className="text-center text-white/25 text-xs mt-6">
          {BRAND_CONFIG.motto}
        </p>
      </div>
    </div>
  );
}
