"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { getServiceById } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { Loader2, DollarSign } from "lucide-react";

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
      <div className="min-h-screen bg-black relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)", backgroundSize: "100px 100px" }} />
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-2xl relative z-10 text-center">
          <Card className="card-premium border-silver/30 bg-black/75">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight mb-2">Request received</h2>
              <p className="text-white/90 premium-text mb-6">
                Thanks for your {serviceTitle} quote request. We&apos;ll get back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="btn-premium">
                  <Link href="/">Back to Home</Link>
                </Button>
                <Button asChild variant="outline" className="border-2 border-silver/50 bg-black/65 hover:bg-black/70 hover:border-silver text-silver">
                  <Link href="/get-quote">Request Another Quote</Link>
                </Button>
              </div>
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
            Get a Quote — {serviceTitle}
          </h1>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-4" />
          <p className="text-sm sm:text-base text-white/90 premium-text">
            Tell us about your {serviceTitle.toLowerCase()} project. We&apos;ll send you a detailed quote within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="card-premium rounded-xl sm:rounded-2xl border-silver/30 bg-black/75 mb-6">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight">
                Your details
              </CardTitle>
              <CardDescription className="text-white/80">
                How to reach you and a bit about your project.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-5">
              {/* Project Type - pre-filled, visible to user */}
              <div>
                <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                  Project type
                </label>
                <Input
                  readOnly
                  value={serviceTitle}
                  className="bg-silver/10 border-silver/30 text-white cursor-default"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                    Name *
                  </label>
                  <Input
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="bg-black/65 border-silver/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                    Email *
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="bg-black/65 border-silver/30 text-white placeholder:text-white/50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    placeholder="(403) 818-7767"
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    className="bg-black/65 border-silver/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                    Project address (optional)
                  </label>
                  <Input
                    placeholder="Project address"
                    value={formData.address}
                    onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
                    className="bg-black/65 border-silver/30 text-white placeholder:text-white/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                  Project details *
                </label>
                <Textarea
                  required
                  placeholder="Describe your project in detail..."
                  value={formData.projectDetails}
                  onChange={(e) => setFormData((p) => ({ ...p, projectDetails: e.target.value }))}
                  rows={6}
                  className="bg-black/65 border-silver/30 text-white placeholder:text-white/50 min-h-[120px]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                  Timeline
                </label>
                <Input
                  placeholder="e.g. Next month, Spring 2026"
                  value={formData.timeline}
                  onChange={(e) => setFormData((p) => ({ ...p, timeline: e.target.value }))}
                  className="bg-black/65 border-silver/30 text-white placeholder:text-white/50"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                    <DollarSign className="inline h-4 w-4 mr-2" />
                    Minimum budget (optional)
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g. 10000"
                    value={formData.budgetMin}
                    onChange={(e) => setFormData((p) => ({ ...p, budgetMin: e.target.value }))}
                    className="bg-black/65 border-silver/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                    <DollarSign className="inline h-4 w-4 mr-2" />
                    Maximum budget (optional)
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g. 50000"
                    value={formData.budgetMax}
                    onChange={(e) => setFormData((p) => ({ ...p, budgetMax: e.target.value }))}
                    className="bg-black/65 border-silver/30 text-white placeholder:text-white/50"
                  />
                </div>
              </div>
              <p className="text-xs text-white/60">Enter your budget range (both fields optional)</p>
            </CardContent>
          </Card>

          <Button
            type="submit"
            disabled={loading}
            className="w-full btn-premium uppercase tracking-wider py-6"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin inline" />
                Processing...
              </>
            ) : (
              "Submit quote request"
            )}
          </Button>
        </form>

        <p className="text-center text-white/60 text-sm mt-6">
          {BRAND_CONFIG.motto}
        </p>
      </div>
    </div>
  );
}
