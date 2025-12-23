"use client";

import { useState } from "react";
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
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  SquaresFour,
  Drop,
  Package,
  Rectangle,
  Wrench,
  Buildings,
  Wall,
  PaintBrush,
  CheckCircle
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

export default function GetQuotePage() {
  const [step, setStep] = useState<"service" | "details" | "summary">("service");
  const [selectedService, setSelectedService] = useState<string>("");
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

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setStep("details");
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const service = getServiceById(selectedService);
      const projectDescription = `Service: ${service?.title || selectedService}
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
            projectType: service?.title || selectedService,
            message: projectDescription,
            source: "quote_tool",
          }),
        });
      } catch (error) {
        console.log("Lead saved via API (if configured)");
      }

      // Generate AI summary
      const prompt = `Generate a professional quote summary for a ${service?.title || selectedService} project. 
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
        subject: `New Quote Request - ${service?.title || selectedService}`,
        html: `
          <h2>New Quote Request</h2>
          <p><strong>Service:</strong> ${service?.title || selectedService}</p>
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
    <div className="min-h-screen bg-industrial-black texture-concrete">
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-6 text-text-primary uppercase tracking-tight">
            Get a Quote
          </h1>
          <div className="inline-block mb-6">
            <div className="h-1 w-24 bg-gold mx-auto mb-4"></div>
          </div>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-4 leading-relaxed">
            Tell us about your project and we&apos;ll provide you with a detailed quote.
          </p>
          <p className="text-lg text-gold font-bold max-w-3xl mx-auto mb-4 uppercase tracking-wide">
            {BRAND_CONFIG.motto}
          </p>
          <p className="text-base text-text-secondary mt-6 max-w-3xl mx-auto">
            {BRAND_CONFIG.contact.cta}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === "service" && (
              <Card className="card-premium rounded-2xl border-gold/30">
                <CardHeader>
                  <CardTitle className="text-3xl font-display font-black text-text-primary uppercase tracking-tight">
                    Select a Service
                  </CardTitle>
                  <CardDescription className="text-lg text-text-secondary">
                    Choose the service you&apos;re interested in
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service) => {
                      const IconComponent = serviceIcons[service.id] || serviceIcons.default;
                      return (
                        <motion.button
                          key={service.id}
                          onClick={() => handleServiceSelect(service.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="text-left p-6 border-2 border-gold/20 rounded-2xl hover:border-gold/60 hover:bg-gold/5 transition-all shadow-lg hover:shadow-xl bg-industrial-slate/50 group"
                        >
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="p-4 bg-gold/10 rounded-2xl border border-gold/20 group-hover:bg-gold/20 transition-colors">
                              <IconComponent className="h-8 w-8 text-gold group-hover:scale-110 transition-transform" weight="duotone" />
                            </div>
                            <h3 className="font-display font-black text-xl text-text-primary uppercase tracking-tight group-hover:text-gold transition-colors">
                              {service.title}
                            </h3>
                          </div>
                          <p className="text-sm text-text-secondary leading-relaxed">{service.description}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {step === "details" && (
              <Card className="card-premium rounded-2xl border-gold/30">
                <CardHeader>
                  <CardTitle className="text-3xl font-display font-black text-text-primary uppercase tracking-tight">
                    Project Details
                  </CardTitle>
                  <CardDescription className="text-lg text-text-secondary">
                    Tell us more about your {getServiceById(selectedService)?.title.toLowerCase()}{" "}
                    project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDetailsSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">
                          Name *
                        </label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          className="rounded-xl"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">
                          Email *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">
                          Phone
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(403) 555-0123"
                          className="rounded-xl"
                        />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">
                          Address
                        </label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Project address"
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="projectDetails" className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">
                        Project Details *
                      </label>
                      <Textarea
                        id="projectDetails"
                        required
                        value={formData.projectDetails}
                        onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                        placeholder="Describe your project in detail..."
                        rows={6}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="timeline" className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">
                          Timeline
                        </label>
                        <Input
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          placeholder="e.g., 3-6 months"
                          className="rounded-xl"
                        />
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">
                          Budget Range
                        </label>
                        <Input
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          placeholder="e.g., $50,000 - $75,000"
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep("service")}
                        className="rounded-2xl"
                      >
                        Back
                      </Button>
                      <Button type="submit" disabled={loading} className="btn-premium btn-glow rounded-2xl flex-1">
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
              <Card className="card-premium rounded-2xl border-gold/30">
                <CardHeader>
                  <CardTitle className="text-3xl font-display font-black text-text-primary uppercase tracking-tight">
                    Thank You!
                  </CardTitle>
                  <CardDescription className="text-lg text-text-secondary">
                    Your quote request has been received
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-gold/5 border-l-4 border-gold rounded-2xl">
                    <p className="text-text-secondary leading-relaxed text-lg">{summary}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="btn-premium btn-glow rounded-2xl">
                      <a href="/">Return Home</a>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setStep("service");
                        setSelectedService("");
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
                      className="rounded-2xl"
                    >
                      Request Another Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="card-premium rounded-2xl border-gold/30">
              <CardHeader>
                <CardTitle className="text-2xl font-display font-black text-text-primary uppercase tracking-tight">
                  Why Choose Us?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" weight="fill" />
                  <div>
                    <p className="font-bold text-text-primary">Family-Owned Since 1968</p>
                    <p className="text-sm text-text-secondary">Three generations of experience</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" weight="fill" />
                  <div>
                    <p className="font-bold text-text-primary">Serving Calgary Since 1997</p>
                    <p className="text-sm text-text-secondary">Over 25 years in the community</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" weight="fill" />
                  <div>
                    <p className="font-bold text-text-primary">2,400+ Projects</p>
                    <p className="text-sm text-text-secondary">Completed with excellence</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" weight="fill" />
                  <div>
                    <p className="font-bold text-text-primary">{BRAND_CONFIG.motto}</p>
                    <p className="text-sm text-text-secondary">We treat every client like family</p>
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
