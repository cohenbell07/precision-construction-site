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
      await fetch("/api/leads/create-from-estimate", {
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

      toast({
        title: "Thank you!",
        description: "We've sent your estimate to your email and will contact you soon.",
      });

      setStep("result");
    } catch (error) {
      console.error("Error submitting contact:", error);
      toast({
        title: "Thank you!",
        description: "We'll follow up soon.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl bg-industrial-black min-h-screen texture-concrete">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-sm bg-gold mb-6 glow-gold border-2 border-gold">
          <Calculator className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-6 text-text-primary uppercase tracking-tight">
          Instant Estimate
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
          Get a preliminary cost estimate for your project in seconds
        </p>
      </motion.div>

      {step === "form" && (
        <Card className="card-premium border-orange/30">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-text-primary uppercase">
              Project Details
            </CardTitle>
            <CardDescription className="text-text-secondary">
              Fill in the form below to get an instant estimate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEstimate} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2 uppercase">
                  Project Type *
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full h-11 rounded-sm border-2 border-gold/30 bg-industrial-slate/90 px-4 text-text-primary focus:border-gold focus:ring-gold/50"
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
                  className="w-full h-11 rounded-sm border-2 border-gold/30 bg-industrial-slate/90 px-4 text-text-primary focus:border-gold focus:ring-gold/50"
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
                className="w-full btn-premium font-black uppercase tracking-wider py-6"
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
          <Card className="card-premium border-gold/40">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-text-primary uppercase">
                Your Estimate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 card-premium border-gold/30">
                  <p className="text-sm text-text-secondary mb-2 uppercase tracking-wide">Cost Range</p>
                  <p className="text-3xl font-black text-gold">{estimate.costRange}</p>
                </div>
                <div className="p-6 card-premium border-gold/30">
                  <p className="text-sm text-text-secondary mb-2 uppercase tracking-wide">Timeline</p>
                  <p className="text-3xl font-black text-gold">{estimate.timeline}</p>
                </div>
              </div>

              <div className="p-6 card-premium border-gold/30">
                <p className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
                  Breakdown
                </p>
                <p className="text-text-secondary leading-relaxed">{estimate.breakdown}</p>
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
                  className="btn-steel border-gold/40"
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
          <Card className="card-premium border-gold/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-text-primary uppercase">
                Get Your Full Estimate
              </CardTitle>
              <CardDescription className="text-text-secondary">
                Enter your contact information to receive a detailed PDF estimate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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

