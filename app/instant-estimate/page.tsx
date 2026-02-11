"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Calculator, Download } from "lucide-react";
import { motion } from "framer-motion";
import { BRAND_CONFIG } from "@/lib/utils";
import type { EstimateResult } from "@/lib/aiTools";

const projectTypes = [
  "Kitchen Renovation",
  "Bathroom Renovation",
  "Basement Development",
  "Flooring Installation",
  "Custom Cabinets",
  "Countertops",
  "Home Addition",
  "Full Home Renovation",
  "Commercial Project",
  "Other",
];

const materialOptions = [
  "Standard/Budget",
  "Mid-Range",
  "Premium",
  "Luxury",
];

export default function InstantEstimatePage() {
  const [step, setStep] = useState<"form" | "result" | "contact">("form");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectType: "",
    squareFootage: "",
    materials: "",
    timeline: "",
  });
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { toast } = useToast();

  const handleEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.projectType || !formData.squareFootage || !formData.materials) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/ai/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType: formData.projectType,
          squareFootage: formData.squareFootage,
          materials: formData.materials,
          timeline: formData.timeline,
        }),
      });

      const data = await response.json();
      if (data.estimate) {
        setEstimate(data.estimate);
        setStep("result");
      } else {
        // Fallback estimate
        setEstimate({
          costRange: "$20K-$40K",
          timeline: "6-10 weeks",
          breakdown: "Based on average project costs for this type of work in Calgary",
          confidence: "medium",
        });
        setStep("result");
      }
    } catch (error) {
      console.error("Estimate error:", error);
      // Show fallback estimate
      setEstimate({
        costRange: "$20K-$40K",
        timeline: "6-10 weeks",
        breakdown: "Based on average project costs. Contact us for a detailed quote.",
        confidence: "medium",
      });
      setStep("result");
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async () => {
    if (!contactInfo.email) {
      toast({
        title: "Email is required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/leads/create-from-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactInfo.name,
          email: contactInfo.email,
          phone: contactInfo.phone,
          projectType: formData.projectType,
          squareFootage: formData.squareFootage,
          materials: formData.materials,
          estimate,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast({
          title: "Thank you!",
          description: "We've sent your estimate to your email and will contact you soon.",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: data.error || "Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting contact:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-4xl bg-industrial-black min-h-screen texture-concrete">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-12 md:mb-16"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-sm bg-silver mb-4 sm:mb-5 md:mb-6 glow-silver border-2 border-silver">
          <Calculator className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-4 sm:mb-5 md:mb-6 text-text-primary uppercase tracking-tight px-2">
          Instant Estimate
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-2">
          Get a preliminary cost estimate for your project in seconds
        </p>
      </motion.div>

      {step === "form" && (
        <Card className="card-premium border-orange/30">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold text-text-primary uppercase">
              Project Details
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-text-secondary">
              Fill in the form below to get an instant estimate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEstimate} className="space-y-4 sm:space-y-5 md:space-y-6">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2 uppercase">
                  Project Type *
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full h-11 rounded-sm border-2 border-silver/30 bg-industrial-slate/90 px-4 text-text-primary focus:border-silver focus:ring-silver/50"
                  required
                >
                  <option value="">Select project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2 uppercase">
                  Square Footage *
                </label>
                <Input
                  type="text"
                  placeholder="e.g., 500, 1000-1500"
                  value={formData.squareFootage}
                  onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2 uppercase">
                  Material Quality *
                </label>
                <select
                  value={formData.materials}
                  onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                  className="w-full h-11 rounded-sm border-2 border-silver/30 bg-industrial-slate/90 px-4 text-text-primary focus:border-silver focus:ring-silver/50"
                  required
                >
                  <option value="">Select material quality</option>
                  {materialOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2 uppercase">
                  Timeline (optional)
                </label>
                <Input
                  type="text"
                  placeholder="e.g., 3 months, ASAP"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full btn-premium font-black uppercase tracking-wider py-4 sm:py-5 md:py-6 text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-5 w-5" />
                    Get Instant Estimate
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {step === "result" && estimate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="card-premium border-silver/40">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-bold text-text-primary uppercase">
                Your Estimate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                <div className="p-4 sm:p-5 md:p-6 card-premium border-silver/30">
                  <p className="text-xs sm:text-sm text-text-secondary mb-1 sm:mb-2 uppercase tracking-wide">Cost Range</p>
                  <p className="text-2xl sm:text-3xl font-black text-silver">{estimate.costRange}</p>
                </div>
                <div className="p-4 sm:p-5 md:p-6 card-premium border-silver/30">
                  <p className="text-xs sm:text-sm text-text-secondary mb-1 sm:mb-2 uppercase tracking-wide">Timeline</p>
                  <p className="text-2xl sm:text-3xl font-black text-silver">{estimate.timeline}</p>
                </div>
              </div>

              <div className="p-4 sm:p-5 md:p-6 card-premium border-silver/30">
                <p className="text-xs sm:text-sm font-semibold text-text-primary mb-2 sm:mb-3 uppercase tracking-wide">
                  Breakdown
                </p>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">{estimate.breakdown}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setStep("contact")}
                  className="flex-1 btn-premium font-bold uppercase"
                >
                  Get Full PDF Estimate
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep("form");
                    setEstimate(null);
                  }}
                  className="btn-steel border-silver/40"
                >
                  Start Over
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {step === "contact" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="card-premium border-silver/30">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-bold text-text-primary uppercase">
                Get Your Full Estimate
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-text-secondary">
                Enter your contact information to receive a detailed PDF estimate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <Input
                placeholder="Your name"
                value={contactInfo.name}
                onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
              />
              <Input
                type="email"
                placeholder="Email *"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                required
              />
              <Input
                type="tel"
                placeholder="Phone (optional)"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              />
              <Button
                onClick={handleContactSubmit}
                disabled={loading || !contactInfo.email}
                className="w-full btn-premium font-bold uppercase"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Send Estimate
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

