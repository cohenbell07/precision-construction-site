"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { BRAND_CONFIG } from "@/lib/utils";
import { Loader2, Check } from "lucide-react";

const SUPPLIER_OPTIONS = [
  "Quartz & porcelain",
  "LVP & laminate",
  "Hardware & fixtures",
];

export default function SupplierDealsQuotePage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectDetails: "", // quantity / how much they need
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
      toast({ title: "Select at least one product", variant: "destructive" });
      return;
    }
    if (!formData.email.trim()) {
      toast({ title: "Email is required", variant: "destructive" });
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
          selectedOptions: Array.from(selected),
          projectDetails: formData.projectDetails || undefined,
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
      <div className="min-h-screen bg-black relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)", backgroundSize: "100px 100px" }} />
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-2xl relative z-10 text-center">
          <Card className="card-premium border-silver/30 bg-black/75">
            <CardContent className="pt-8 pb-8">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-silver/20 border-2 border-silver p-4">
                  <Check className="h-12 w-12 text-silver" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight mb-2">Request received</h2>
              <p className="text-white/90 premium-text mb-6">
                Thanks for your 10% Supplier Discount quote request. We&apos;ll get back to you within 24 hours with pricing.
              </p>
              <Button asChild className="btn-premium">
                <Link href="/">Back to Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative premium-bg-pattern">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)", backgroundSize: "100px 100px" }} />
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-2xl relative z-10">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight premium-heading mb-2">
            10% Off — Limited-Time Supplier Discounts
          </h1>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-4" />
          <p className="text-sm sm:text-base text-white/90 premium-text">
            Select one or more product categories and tell us how much you need. We&apos;ll send you a quote with 10% off.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="card-premium rounded-xl sm:rounded-2xl border-silver/30 bg-black/75 mb-6">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight">
                Select product(s) — choose 1 to 3
              </CardTitle>
              <CardDescription className="text-white/80">
                Click to add or remove a checkmark.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {SUPPLIER_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggle(option)}
                  className={`w-full flex items-center justify-between text-left p-4 rounded-xl border-2 transition-all ${
                    selected.has(option)
                      ? "border-silver bg-silver/10 text-white"
                      : "border-silver/30 bg-black/50 text-white/90 hover:border-silver/50"
                  }`}
                >
                  <span className="font-semibold">{option}</span>
                  {selected.has(option) && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-silver text-black">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="card-premium rounded-xl sm:rounded-2xl border-silver/30 bg-black/75 mb-6">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight">
                Quantity & contact info
              </CardTitle>
              <CardDescription className="text-white/80">
                Tell us how much you need and how to reach you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">How much do you need? (sq ft, pieces, rooms, etc.)</label>
                <Textarea
                  placeholder="e.g. 800 sq ft LVP, kitchen countertops, 3 bathrooms of hardware"
                  value={formData.projectDetails}
                  onChange={(e) => setFormData((p) => ({ ...p, projectDetails: e.target.value }))}
                  className="bg-black/65 border-silver/30 text-white placeholder:text-white/50 min-h-[100px]"
                />
              </div>
              <Input
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                className="bg-black/65 border-silver/30 text-white placeholder:text-white/50"
              />
              <Input
                type="email"
                placeholder="Email *"
                required
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                className="bg-black/65 border-silver/30 text-white placeholder:text-white/50"
              />
              <Input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                className="bg-black/65 border-silver/30 text-white placeholder:text-white/50"
              />
            </CardContent>
          </Card>

          <Button
            type="submit"
            disabled={loading || selected.size === 0}
            className="w-full btn-premium uppercase tracking-wider py-6"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Request 10% supplier quote"}
          </Button>
        </form>

        <p className="text-center text-white/60 text-sm mt-6">
          {BRAND_CONFIG.motto}
        </p>
      </div>
    </div>
  );
}
