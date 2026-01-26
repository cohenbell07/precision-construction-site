"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { services, getServiceById } from "@/lib/services";
import { AIChatAssistant } from "@/components/AIChatAssistant";
import { sendEmail } from "@/lib/email";
import { generateAIResponse } from "@/lib/ai";
import { BRAND_CONFIG } from "@/lib/utils";
import { Loader2, CheckCircle } from "lucide-react";
import {
  SquaresFour,
  Drop,
  Package,
  Rectangle,
  Wrench,
  Buildings,
  Wall,
  PaintBrush,
} from "phosphor-react";

// Icon mapping for services with phosphor-react
const serviceIcons: { [key: string]: any } = {
  flooring: SquaresFour,
  showers: Drop,
  cabinets: Package,
  countertops: Rectangle,
  carpentry: Wrench,
  framing: Buildings,
  drywall: Wall,
  painting: PaintBrush,
  default: Buildings,
};

function GetQuoteForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"service" | "details" | "summary">("service");
  const [selectedService, setSelectedService] = useState<string>("");
  const [customServiceName, setCustomServiceName] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    projectDetails: "",
    timeline: "",
    budget: "",
  });
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Handle product query parameter from products page
  useEffect(() => {
    const productParam = searchParams.get("product");
    if (productParam) {
      // Set as custom service name and skip to details step
      setCustomServiceName(productParam);
      setSelectedService("other");
      setStep("details");
    }
  }, [searchParams]);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setStep("details");
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const service = selectedService === "other" ? null : getServiceById(selectedService);
      const serviceTitle = selectedService === "other" 
        ? (customServiceName || "Other Project")
        : (service?.title || selectedService);
      const projectDescription = `Service: ${serviceTitle}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}
Project Details: ${formData.projectDetails}
Timeline: ${formData.timeline}
Budget: ${formData.budget}`;

      // Save to database via API route
      try {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            projectType: serviceTitle,
            message: projectDescription,
            source: "quote_tool",
          }),
        });
      } catch (error) {
        console.log("Lead saved via API (if configured)");
      }

      // Generate AI summary
      const prompt = `Generate a professional quote summary for a ${serviceTitle} project. 
      Project details: ${formData.projectDetails}
      Timeline: ${formData.timeline}
      Budget: ${formData.budget}
      Provide a brief, professional response.`;

      let response = "Thank you for your quote request! We&apos;ll review your project details and get back to you within 24 hours with a detailed quote.";
      
      try {
        const aiResponse = await generateAIResponse(prompt);
        if (aiResponse && aiResponse.response) {
          response = aiResponse.response;
        }
      } catch (error) {
        console.log("AI response generation failed, using default");
      }

      setSummary(response);

      // Send email to admin
      await sendEmail({
        to: BRAND_CONFIG.contact.email,
        subject: `New Quote Request - ${serviceTitle}`,
        html: `
          <h2>New Quote Request</h2>
          <p><strong>Service:</strong> ${serviceTitle}</p>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Address:</strong> ${formData.address}</p>
          <p><strong>Project Details:</strong> ${formData.projectDetails}</p>
          <p><strong>Timeline:</strong> ${formData.timeline}</p>
          <p><strong>Budget:</strong> ${formData.budget}</p>
        `,
      });

      // Send confirmation to user
      await sendEmail({
        to: formData.email,
        subject: `Thank you for your quote request - ${BRAND_CONFIG.shortName}`,
        html: `
          <h2>Thank you for your quote request!</h2>
          <p>Hi ${formData.name},</p>
          <p>${response}</p>
          <p>We&apos;ll review your request and get back to you within 24 hours.</p>
          <p><strong>${BRAND_CONFIG.motto}</strong></p>
          <p>We treat every client like family and deliver only the best.</p>
          <p>Best regards,<br>${BRAND_CONFIG.owner}<br>${BRAND_CONFIG.name}</p>
        `,
      });

      setStep("summary");
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast({
        title: "Quote request received",
        description:
          "Your request has been received. We&apos;ll contact you soon! (Note: Some services may not be configured)",
      });
      setStep("summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative premium-bg-pattern">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-7xl relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-4 sm:mb-6 text-white uppercase tracking-tight premium-heading">
            Get a Quote
          </h1>
          <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-3xl mx-auto mb-3 sm:mb-4 leading-relaxed premium-text px-2">
            Tell us about your project and we&apos;ll provide you with a detailed quote.
          </p>
          <p className="text-sm sm:text-base md:text-lg premium-gold-text font-bold max-w-3xl mx-auto mb-3 sm:mb-4 uppercase tracking-wide px-2">
            {BRAND_CONFIG.motto}
          </p>
          <p className="text-xs sm:text-sm md:text-base text-white/80 mt-4 sm:mt-6 max-w-3xl mx-auto premium-text px-2">
            {BRAND_CONFIG.contact.cta}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === "service" && (
              <Card className="card-premium rounded-xl sm:rounded-2xl border-gold/30 bg-black/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                    Select a Service
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base md:text-lg text-white/90 premium-text">
                    Choose the service you&apos;re interested in
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    {services.map((service) => {
                      const IconComponent = serviceIcons[service.id] || serviceIcons.default;
                      return (
                        <button
                          key={service.id}
                          onClick={() => handleServiceSelect(service.id)}
                          className="service-select-button text-left p-4 sm:p-5 md:p-6 border-2 border-gold/30 rounded-xl sm:rounded-2xl shadow-xl bg-black/50 backdrop-blur-sm cursor-pointer relative hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:border-gold/60 transition-all duration-300 hover:bg-black/70"
                        >
                          <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                            <div className="p-2 sm:p-3 md:p-4 bg-gold/10 rounded-xl sm:rounded-2xl border border-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                              <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" weight="duotone" />
                            </div>
                            <h3 className="font-display font-black text-base sm:text-lg md:text-xl text-white uppercase tracking-tight premium-heading-sm">
                              {service.title}
                            </h3>
                          </div>
                          <p className="text-xs sm:text-sm text-white/80 leading-relaxed premium-text">{service.description}</p>
                        </button>
                      );
                    })}
                    {/* Other Option */}
                    <button
                      onClick={() => handleServiceSelect("other")}
                      className="service-select-button text-left p-4 sm:p-5 md:p-6 border-2 border-gold/30 rounded-xl sm:rounded-2xl shadow-xl bg-black/50 backdrop-blur-sm cursor-pointer relative hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:border-gold/60 transition-all duration-300 hover:bg-black/70"
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                        <div className="p-2 sm:p-3 md:p-4 bg-gold/10 rounded-xl sm:rounded-2xl border border-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                          <Buildings className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" weight="duotone" />
                        </div>
                        <h3 className="font-display font-black text-base sm:text-lg md:text-xl text-white uppercase tracking-tight premium-heading-sm">
                          Other
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-white/80 leading-relaxed premium-text">Have a different project? Select this option and tell us about it.</p>
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === "details" && (
              <Card className="card-premium rounded-xl sm:rounded-2xl border-gold/30 bg-black/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                    Project Details
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base md:text-lg text-white/90 premium-text">
                    {selectedService === "other" 
                      ? "Tell us more about your project"
                      : `Tell us more about your ${getServiceById(selectedService)?.title.toLowerCase()} project`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDetailsSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                          Name *
                        </label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          className="focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white placeholder:text-white/40"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                          Email *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                          className="focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white placeholder:text-white/40"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                          Phone
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(403) 818-7767"
                          className="focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white placeholder:text-white/40"
                        />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                          Address
                        </label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Project address"
                          className="focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white placeholder:text-white/40"
                        />
                      </div>
                    </div>
                    {selectedService === "other" && (
                      <div>
                        <label htmlFor="customServiceName" className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                          Project Type *
                        </label>
                        <Input
                          id="customServiceName"
                          required
                          value={customServiceName}
                          onChange={(e) => setCustomServiceName(e.target.value)}
                          placeholder="e.g., Basement Development, Deck Construction, etc."
                          className="focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white placeholder:text-white/40"
                        />
                      </div>
                    )}
                    <div>
                      <label htmlFor="projectDetails" className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                        Project Details *
                      </label>
                      <Textarea
                        id="projectDetails"
                        required
                        value={formData.projectDetails}
                        onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                        placeholder={selectedService === "other" ? "Describe your project in detail, including what you need..." : "Describe your project in detail..."}
                        rows={6}
                        className="focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="timeline" className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                          Timeline
                        </label>
                        <Input
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          placeholder="e.g., 3-6 months"
                          className="focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white placeholder:text-white/40"
                        />
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                          Budget Range
                        </label>
                        <Input
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          placeholder="e.g., $50,000 - $75,000"
                          className="focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white placeholder:text-white/40"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep("service")}
                        className="border-2 border-gold/50 bg-black/50 hover:bg-black/70 hover:border-gold text-gold backdrop-blur-sm"
                      >
                        Back
                      </Button>
                      <Button type="submit" disabled={loading} className="btn-premium btn-glow flex-1">
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Submit Quote Request"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === "summary" && (
              <Card className="card-premium rounded-xl sm:rounded-2xl border-gold/30 bg-black/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                    Thank You!
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base md:text-lg text-white/90 premium-text">
                    Your quote request has been received
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="p-4 sm:p-5 md:p-6 bg-gold/10 border-l-4 border-gold rounded-xl sm:rounded-2xl">
                    <p className="text-white/90 leading-relaxed text-sm sm:text-base md:text-lg premium-text">{summary}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button asChild className="btn-premium btn-glow">
                      <a href="/">Return Home</a>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setStep("service");
                        setSelectedService("");
                        setCustomServiceName("");
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          address: "",
                          projectDetails: "",
                          timeline: "",
                          budget: "",
                        });
                      }}
                      className="border-2 border-gold/50 bg-black/50 hover:bg-black/70 hover:border-gold text-gold backdrop-blur-sm"
                    >
                      Request Another Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <Card className="card-premium rounded-xl sm:rounded-2xl border-gold/30 bg-black/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  Why Choose Us?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0 drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
                  <div>
                    <p className="font-black text-white premium-heading-sm">Family-Owned Since 1968</p>
                    <p className="text-sm text-white/70 premium-text">Three generations of experience</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0 drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
                  <div>
                    <p className="font-black text-white premium-heading-sm">Serving Calgary Since 1997</p>
                    <p className="text-sm text-white/70 premium-text">Over {new Date().getFullYear() - BRAND_CONFIG.servingSince} years in the community</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0 drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
                  <div>
                    <p className="font-black text-white premium-heading-sm">2,400+ Projects</p>
                    <p className="text-sm text-white/70 premium-text">Completed with excellence</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0 drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
                  <div>
                    <p className="font-black text-white premium-heading-sm">{BRAND_CONFIG.motto}</p>
                    <p className="text-sm text-white/70 premium-text">We treat every client like family</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <AIChatAssistant />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GetQuotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-gold animate-spin" />
      </div>
    }>
      <GetQuoteForm />
    </Suspense>
  );
}
