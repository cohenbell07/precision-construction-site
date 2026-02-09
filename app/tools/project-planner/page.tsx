"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Lightbulb, Download } from "lucide-react";
import { motion } from "framer-motion";
import { BRAND_CONFIG } from "@/lib/utils";

export default function ProjectPlannerPage() {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState("");
  const [plan, setPlan] = useState<any>(null);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
  });
  const { toast } = useToast();

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      toast({
        title: "Please describe your project",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/ai/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          projectType: projectType || undefined,
        }),
      });

      const data = await response.json();
      if (data.plan) {
        setPlan(data.plan);
      } else {
        toast({
          title: "Error generating plan",
          description: "Please try again or contact us directly",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Plan generation error:", error);
      toast({
        title: "Error",
        description: "Please contact us directly for assistance",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestPlan = async () => {
    if (!contactInfo.email) {
      toast({
        title: "Email is required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await fetch("/api/leads/create-from-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactInfo.name,
          email: contactInfo.email,
          description,
          projectType,
          plan,
        }),
      });

      toast({
        title: "Thank you!",
        description: "We&apos;ve sent your project plan to your email.",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Thank you!",
        description: "We&apos;ll follow up soon.",
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
          <Lightbulb className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-4 sm:mb-5 md:mb-6 text-text-primary uppercase tracking-tight px-2">
          Project Planning Assistant
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-2">
          Describe your ideal project and get AI-powered planning recommendations
        </p>
      </motion.div>

      {!plan ? (
        <Card className="card-premium border-silver/30">
          <CardHeader className="px-4 sm:px-6 pt-6 sm:pt-8">
            <CardTitle className="text-xl sm:text-2xl font-bold text-text-primary uppercase">
              Describe Your Project
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-text-secondary">
              Tell us about your vision, and we&apos;ll provide layout suggestions, material recommendations, and cost considerations
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-6 sm:pb-8">
            <form onSubmit={handleGeneratePlan} className="space-y-4 sm:space-y-5 md:space-y-6">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2 uppercase">
                  Project Type (optional)
                </label>
                <Input
                  placeholder="e.g., Kitchen renovation, Basement finish"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2 uppercase">
                  Project Description *
                </label>
                <Textarea
                  placeholder="Describe your ideal project: what you want to achieve, your style preferences, any specific requirements, budget considerations, timeline..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[200px]"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading || !description.trim()}
                className="w-full btn-premium font-black uppercase tracking-wider py-4 sm:py-5 md:py-6 text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-5 w-5" />
                    Generate Project Plan
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="card-premium border-silver/40">
            <CardHeader className="px-4 sm:px-6 pt-6 sm:pt-8">
              <CardTitle className="text-xl sm:text-2xl font-bold text-text-primary uppercase">
                Your Project Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-5 md:space-y-6 px-4 sm:px-6 pb-6 sm:pb-8">
              {plan.suggestions && plan.suggestions.length > 0 && (
                <div className="p-4 sm:p-5 md:p-6 card-premium border-silver/30">
                  <h3 className="text-base sm:text-lg font-bold text-text-primary mb-3 sm:mb-4 uppercase tracking-wide">
                    Design Suggestions
                  </h3>
                  <ul className="space-y-2">
                    {plan.suggestions.map((suggestion: string, idx: number) => (
                      <li key={idx} className="text-sm sm:text-base text-text-secondary flex items-start">
                        <span className="text-silver mr-2">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {plan.materials && plan.materials.length > 0 && (
                <div className="p-4 sm:p-5 md:p-6 card-premium border-silver/30">
                  <h3 className="text-base sm:text-lg font-bold text-text-primary mb-3 sm:mb-4 uppercase tracking-wide">
                    Recommended Materials
                  </h3>
                  <ul className="space-y-2">
                    {plan.materials.map((material: string, idx: number) => (
                      <li key={idx} className="text-sm sm:text-base text-text-secondary flex items-start">
                        <span className="text-silver mr-2">•</span>
                        <span>{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {plan.considerations && plan.considerations.length > 0 && (
                <div className="p-4 sm:p-5 md:p-6 card-premium border-silver/30">
                  <h3 className="text-base sm:text-lg font-bold text-text-primary mb-3 sm:mb-4 uppercase tracking-wide">
                    Important Considerations
                  </h3>
                  <ul className="space-y-2">
                    {plan.considerations.map((consideration: string, idx: number) => (
                      <li key={idx} className="text-sm sm:text-base text-text-secondary flex items-start">
                        <span className="text-silver mr-2">•</span>
                        <span>{consideration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {plan.estimatedCost && (
                <div className="p-4 sm:p-5 md:p-6 card-premium border-silver/30">
                  <h3 className="text-base sm:text-lg font-bold text-text-primary mb-2 uppercase tracking-wide">
                    Estimated Cost
                  </h3>
                  <p className="text-xl sm:text-2xl font-black text-silver">{plan.estimatedCost}</p>
                </div>
              )}

              <div className="p-4 sm:p-5 md:p-6 card-premium border-silver/30">
                <h3 className="text-base sm:text-lg font-bold text-text-primary mb-3 sm:mb-4 uppercase tracking-wide">
                  Get Your Full Plan
                </h3>
                <p className="text-sm sm:text-base text-text-secondary mb-3 sm:mb-4">
                  Enter your email to receive a detailed PDF of your project plan
                </p>
                <div className="space-y-3 sm:space-y-4">
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
                  <Button
                    onClick={handleRequestPlan}
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
                        Send Project Plan
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setPlan(null);
                  setDescription("");
                  setProjectType("");
                }}
                className="w-full btn-steel border-silver/40"
              >
                Start Over
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

