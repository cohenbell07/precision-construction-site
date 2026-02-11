"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { services, getServiceById } from "@/lib/services";
import {
  getProductCategoryBySlug,
  getProductSlugFromTitle,
} from "@/lib/productQuoteConfig";
import { AIChatAssistant } from "@/components/AIChatAssistant";
import { BRAND_CONFIG } from "@/lib/utils";
import { Loader2, CheckCircle, Wrench, Hammer, DollarSign } from "lucide-react";
import {
  SquaresFour,
  Drop,
  Package,
  Rectangle,
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

// Product categories (simplified list for selection - ids match productQuoteConfig slugs)
const productCategories = [
  { id: "flooring", title: "Flooring", icon: SquaresFour },
  { id: "countertops", title: "Countertops", icon: Rectangle },
  { id: "cabinets", title: "Cabinets", icon: Package },
  { id: "interior-finishing", title: "Interior Finishing", icon: Wrench },
  { id: "windows", title: "Windows", icon: Buildings },
  { id: "exterior", title: "Exterior Products", icon: Buildings },
  { id: "bathroom", title: "Bathroom Fixtures", icon: Drop },
  { id: "hardware", title: "Hardware", icon: Wrench },
  { id: "paint", title: "Paint & Finishes", icon: PaintBrush },
  { id: "commercial", title: "Commercial Materials", icon: Buildings },
];

const OTHER_OPTIONS = ["Other", "Custom"];
function isOtherOption(val: string): boolean {
  return OTHER_OPTIONS.some((o) => val?.toLowerCase() === o.toLowerCase());
}

function GetQuoteForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"type" | "selection" | "details" | "summary">("type");
  const [quoteType, setQuoteType] = useState<"service" | "product">("service");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [customServiceName, setCustomServiceName] = useState<string>("");
  const [categoryFields, setCategoryFields] = useState<Record<string, string>>({});
  const [customValues, setCustomValues] = useState<Record<string, string>>({});
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
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Handle product and service query parameters
  useEffect(() => {
    const productParam = searchParams.get("product");
    const serviceParam = searchParams.get("service");
    
    if (productParam) {
      setQuoteType("product");
      setSelectedProduct(getProductSlugFromTitle(productParam));
      setStep("details");
    } else if (serviceParam) {
      setQuoteType("service");
      setSelectedService(serviceParam);
      setStep("details");
    }
  }, [searchParams]);

  const handleQuoteTypeSelect = (type: "service" | "product") => {
    setQuoteType(type);
    setStep("selection");
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setStep("details");
  };

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
    setStep("details");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCategoryFieldChange = (fieldId: string, value: string) => {
    setCategoryFields((p) => ({ ...p, [fieldId]: value }));
    if (isOtherOption(value)) {
      setCustomValues((p) => ({ ...p, [fieldId]: p[fieldId] || "" }));
    } else {
      setCustomValues((p) => {
        const next = { ...p };
        delete next[fieldId];
        return next;
      });
    }
  };

  const productConfig = quoteType === "product" ? getProductCategoryBySlug(selectedProduct) : undefined;
  const buildProductProjectDetails = (): string => {
    if (!productConfig) return formData.projectDetails;
    const parts: string[] = [];
    if (productConfig.fields.length > 0) {
      parts.push(`Product category: ${productConfig.title}`);
      productConfig.fields.forEach((field) => {
        const val = categoryFields[field.id];
        const custom = customValues[field.id];
        if (val) {
          if (isOtherOption(val) && custom) {
            parts.push(`${field.label}: ${val} — ${custom}`);
          } else {
            parts.push(`${field.label}: ${val}`);
          }
        }
      });
    }
    if (formData.projectDetails.trim()) {
      parts.push("\nAdditional details:\n" + formData.projectDetails.trim());
    }
    return parts.join("\n") || formData.projectDetails.trim();
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      toast({ title: "Email is required", variant: "destructive" });
      return;
    }
    const projectDetailsToSend =
      quoteType === "product" && productConfig
        ? buildProductProjectDetails()
        : formData.projectDetails;
    if (!projectDetailsToSend.trim()) {
      toast({ title: "Please provide project details or fill in the category fields above.", variant: "destructive" });
      return;
    }
    setLoading(true);

    try {
      const service = selectedService === "other" ? null : getServiceById(selectedService);
      const serviceTitle = selectedService === "other" 
        ? (customServiceName || "Other Project")
        : (service?.title || selectedService);
      
      const productTitle = productConfig?.title || selectedProduct || "General Product";

      const res = await fetch("/api/quote/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          projectDetails: projectDetailsToSend,
          timeline: formData.timeline,
          budgetMin: formData.budgetMin,
          budgetMax: formData.budgetMax,
          quoteType,
          serviceTitle,
          productTitle,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSummary(data.summary || "Thank you for your quote request! We'll review your project details and get back to you within 24 hours with a detailed quote.");
        setStep("summary");
      } else {
        toast({
          title: "Something went wrong",
          description: data.error || "Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting quote:", error);
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
          <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(232,232,232,0.5)]"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-3xl mx-auto mb-3 sm:mb-4 leading-relaxed premium-text px-2">
            Tell us about your project and we&apos;ll provide you with a detailed quote.
          </p>
          <p className="text-sm sm:text-base md:text-lg premium-silver-text font-bold max-w-3xl mx-auto mb-3 sm:mb-4 uppercase tracking-wide px-2">
            {BRAND_CONFIG.motto}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            <div className={`flex items-center ${step === "type" ? "text-silver" : step === "selection" || step === "details" || step === "summary" ? "text-silver" : "text-white/40"}`}>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center ${step === "type" ? "border-silver bg-silver/20" : "border-silver/40"}`}>
                1
              </div>
              <span className="ml-2 text-xs sm:text-sm font-bold uppercase">Type</span>
            </div>
            <div className={`h-px w-12 sm:w-16 ${step === "selection" || step === "details" || step === "summary" ? "bg-silver" : "bg-silver/30"}`}></div>
            <div className={`flex items-center ${step === "selection" || step === "details" || step === "summary" ? "text-silver" : "text-white/40"}`}>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center ${step === "selection" || step === "details" || step === "summary" ? "border-silver bg-silver/20" : "border-silver/40"}`}>
                2
              </div>
              <span className="ml-2 text-xs sm:text-sm font-bold uppercase">Selection</span>
            </div>
            <div className={`h-px w-12 sm:w-16 ${step === "details" || step === "summary" ? "bg-silver" : "bg-silver/30"}`}></div>
            <div className={`flex items-center ${step === "details" || step === "summary" ? "text-silver" : "text-white/40"}`}>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center ${step === "details" || step === "summary" ? "border-silver bg-silver/20" : "border-silver/40"}`}>
                3
              </div>
              <span className="ml-2 text-xs sm:text-sm font-bold uppercase">Details</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Quote Type Selection */}
            {step === "type" && (
              <Card className="card-premium rounded-xl sm:rounded-2xl border-silver/30 bg-black/75 ">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                    What are you looking for?
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base md:text-lg text-white/90 premium-text">
                    Choose whether you need a service or a product quote
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <button
                      onClick={() => handleQuoteTypeSelect("service")}
                      className="text-left p-6 sm:p-8 border-2 border-silver/30 rounded-xl sm:rounded-2xl shadow-xl bg-black/65  cursor-pointer relative hover:shadow-[0_0_25px_rgba(232,232,232,0.4)] hover:border-silver/60 transition-[transform,box-shadow,border-color] duration-300 hover:bg-black/70"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 sm:p-4 bg-silver/10 rounded-xl sm:rounded-2xl border border-silver/30 shadow-[0_0_15px_rgba(232,232,232,0.2)]">
                          <Hammer className="h-8 w-8 sm:h-10 sm:w-10 text-silver drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                        </div>
                        <h3 className="font-display font-black text-lg sm:text-xl md:text-2xl text-white uppercase tracking-tight premium-heading-sm">
                          Service
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-white/80 leading-relaxed premium-text">
                        Get a quote for our construction and installation services
                      </p>
                    </button>
                    <button
                      onClick={() => handleQuoteTypeSelect("product")}
                      className="text-left p-6 sm:p-8 border-2 border-silver/30 rounded-xl sm:rounded-2xl shadow-xl bg-black/65  cursor-pointer relative hover:shadow-[0_0_25px_rgba(232,232,232,0.4)] hover:border-silver/60 transition-[transform,box-shadow,border-color] duration-300 hover:bg-black/70"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 sm:p-4 bg-silver/10 rounded-xl sm:rounded-2xl border border-silver/30 shadow-[0_0_15px_rgba(232,232,232,0.2)]">
                          <Package className="h-8 w-8 sm:h-10 sm:w-10 text-silver drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" weight="duotone" />
                        </div>
                        <h3 className="font-display font-black text-lg sm:text-xl md:text-2xl text-white uppercase tracking-tight premium-heading-sm">
                          Product
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-white/80 leading-relaxed premium-text">
                        Get a quote for construction materials and products
                      </p>
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Service/Product Selection */}
            {step === "selection" && (
              <Card className="card-premium rounded-xl sm:rounded-2xl border-silver/30 bg-black/75 ">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                    {quoteType === "service" ? "Select a Service" : "Select a Product Category"}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base md:text-lg text-white/90 premium-text">
                    {quoteType === "service" 
                      ? "Choose the service you're interested in"
                      : "Choose the product category you need"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {quoteType === "service" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                      {services.map((service) => {
                        const IconComponent = serviceIcons[service.id] || serviceIcons.default;
                        return (
                          <button
                            key={service.id}
                            onClick={() => handleServiceSelect(service.id)}
                            className="service-select-button text-left p-4 sm:p-5 md:p-6 border-2 border-silver/30 rounded-xl sm:rounded-2xl shadow-xl bg-black/65  cursor-pointer relative hover:shadow-[0_0_25px_rgba(232,232,232,0.4)] hover:border-silver/60 transition-[transform,box-shadow,border-color] duration-300 hover:bg-black/70"
                          >
                            <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                              <div className="p-2 sm:p-3 md:p-4 bg-silver/10 rounded-xl sm:rounded-2xl border border-silver/30 shadow-[0_0_15px_rgba(232,232,232,0.2)]">
                                <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-silver drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" weight="duotone" />
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
                        className="service-select-button text-left p-4 sm:p-5 md:p-6 border-2 border-silver/30 rounded-xl sm:rounded-2xl shadow-xl bg-black/65  cursor-pointer relative hover:shadow-[0_0_25px_rgba(232,232,232,0.4)] hover:border-silver/60 transition-[transform,box-shadow,border-color] duration-300 hover:bg-black/70"
                      >
                        <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                          <div className="p-2 sm:p-3 md:p-4 bg-silver/10 rounded-xl sm:rounded-2xl border border-silver/30 shadow-[0_0_15px_rgba(232,232,232,0.2)]">
                            <Buildings className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-silver drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" weight="duotone" />
                          </div>
                          <h3 className="font-display font-black text-base sm:text-lg md:text-xl text-white uppercase tracking-tight premium-heading-sm">
                            Other
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-white/80 leading-relaxed premium-text">Have a different service? Select this option and tell us about it.</p>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                      {productCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <button
                            key={category.id}
                            onClick={() => handleProductSelect(category.id)}
                            className="service-select-button text-left p-4 sm:p-5 md:p-6 border-2 border-silver/30 rounded-xl sm:rounded-2xl shadow-xl bg-black/65  cursor-pointer relative hover:shadow-[0_0_25px_rgba(232,232,232,0.4)] hover:border-silver/60 transition-[transform,box-shadow,border-color] duration-300 hover:bg-black/70"
                          >
                            <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                              <div className="p-2 sm:p-3 md:p-4 bg-silver/10 rounded-xl sm:rounded-2xl border border-silver/30 shadow-[0_0_15px_rgba(232,232,232,0.2)]">
                                <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-silver drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" weight="duotone" />
                              </div>
                              <h3 className="font-display font-black text-base sm:text-lg md:text-xl text-white uppercase tracking-tight premium-heading-sm">
                                {category.title}
                              </h3>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  <div className="mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep("type")}
                      className="border-2 border-silver/50 bg-black/65 hover:bg-black/70 hover:border-silver text-silver "
                    >
                      Back
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Project Details */}
            {step === "details" && (
              <Card className="card-premium rounded-xl sm:rounded-2xl border-silver/30 bg-black/75 ">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                    Project Details
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base md:text-lg text-white/90 premium-text">
                    {quoteType === "service" 
                      ? (selectedService === "other" 
                          ? "Tell us more about your project"
                          : `Tell us more about your ${getServiceById(selectedService)?.title.toLowerCase()} project`)
                      : `Tell us more about your ${productConfig?.title.toLowerCase() || productCategories.find(p => p.id === selectedProduct)?.title.toLowerCase() || "product"} needs`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDetailsSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                    {quoteType === "product" && productConfig ? (
                      <>
                        {/* Product category - pre-filled */}
                        <div>
                          <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">Product category</label>
                          <Input readOnly value={productConfig.title} className="bg-silver/10 border-silver/30 text-white cursor-default" />
                        </div>
                        {/* Category-specific fields */}
                        {productConfig.fields.map((field) => {
                          const inputClass = "focus:ring-silver/50 focus:border-silver bg-black/65 border-silver/30 text-white placeholder:text-white/40";
                          const labelClass = "block text-sm font-bold text-white mb-2 uppercase tracking-wide";
                          const val = categoryFields[field.id];
                          const showCustomInput = field.options && val && isOtherOption(val);
                          if (field.type === "select") {
                            return (
                              <div key={field.id}>
                                <label htmlFor={field.id} className={labelClass}>
                                  {field.label}
                                  {field.optional && <span className="text-white/60 font-normal ml-1">(optional)</span>}
                                </label>
                                <select
                                  id={field.id}
                                  value={val || ""}
                                  onChange={(e) => handleCategoryFieldChange(field.id, e.target.value)}
                                  className={`w-full px-3 py-2 rounded-md border ${inputClass}`}
                                >
                                  <option value="">Select...</option>
                                  {field.options?.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                                {showCustomInput && (
                                  <Input
                                    placeholder="Please specify the type or style you're looking for..."
                                    value={customValues[field.id] || ""}
                                    onChange={(e) => setCustomValues((p) => ({ ...p, [field.id]: e.target.value }))}
                                    className={`mt-2 ${inputClass}`}
                                  />
                                )}
                              </div>
                            );
                          }
                          if (field.type === "textarea") {
                            return (
                              <div key={field.id}>
                                <label htmlFor={field.id} className={labelClass}>
                                  {field.label}
                                  {field.optional && <span className="text-white/60 font-normal ml-1">(optional)</span>}
                                </label>
                                <Textarea
                                  id={field.id}
                                  placeholder={field.placeholder}
                                  value={categoryFields[field.id] || ""}
                                  onChange={(e) => setCategoryFields((p) => ({ ...p, [field.id]: e.target.value }))}
                                  rows={3}
                                  className={inputClass}
                                />
                              </div>
                            );
                          }
                          return (
                            <div key={field.id}>
                              <label htmlFor={field.id} className={labelClass}>
                                {field.label}
                                {field.optional && <span className="text-white/60 font-normal ml-1">(optional)</span>}
                              </label>
                              <Input
                                id={field.id}
                                type="text"
                                placeholder={field.placeholder}
                                value={categoryFields[field.id] || ""}
                                onChange={(e) => setCategoryFields((p) => ({ ...p, [field.id]: e.target.value }))}
                                className={inputClass}
                              />
                            </div>
                          );
                        })}
                        <div className="border-t border-silver/20 pt-4">
                          <h3 className="text-base font-black text-white uppercase tracking-wide mb-3">Contact & project info</h3>
                        </div>
                      </>
                    ) : (
                      selectedService === "other" && (
                        <div>
                          <label htmlFor="customServiceName" className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">Project Type *</label>
                          <Input
                            id="customServiceName"
                            required
                            value={customServiceName}
                            onChange={(e) => setCustomServiceName(e.target.value)}
                            placeholder="e.g., Basement Development, Deck Construction, etc."
                            className="focus:ring-silver/50 focus:border-silver bg-black/65 border-silver/30 text-white placeholder:text-white/40"
                          />
                        </div>
                      )
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">Name *</label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your name"
                          className="focus:ring-silver/50 focus:border-silver bg-black/65 border-silver/30 text-white placeholder:text-white/40"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">Email *</label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                          className="focus:ring-silver/50 focus:border-silver bg-black/65 border-silver/30 text-white placeholder:text-white/40"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">Phone</label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="(403) 818-7767"
                          className="focus:ring-silver/50 focus:border-silver bg-black/65 border-silver/30 text-white placeholder:text-white/40"
                        />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">Project Address (Optional)</label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          placeholder="Project address"
                          className="focus:ring-silver/50 focus:border-silver bg-black/65 border-silver/30 text-white placeholder:text-white/40"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="projectDetails" className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                        Project Details {quoteType === "product" && productConfig ? "" : "*"}
                      </label>
                      <Textarea
                        id="projectDetails"
                        required={quoteType !== "product" || !productConfig}
                        value={formData.projectDetails}
                        onChange={(e) => handleInputChange("projectDetails", e.target.value)}
                        placeholder={quoteType === "product" && productConfig 
                          ? "Describe your project, any specific products or brands you're interested in, or questions for us..."
                          : selectedService === "other" ? "Describe your project in detail, including what you need..." : "Describe your project in detail..."}
                        rows={6}
                        className="focus:ring-silver/50 focus:border-silver bg-black/65 border-silver/30 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">Timeline</label>
                      <Input
                        id="timeline"
                        value={formData.timeline}
                        onChange={(e) => handleInputChange("timeline", e.target.value)}
                        placeholder="e.g., 3-6 months"
                        className="focus:ring-silver/50 focus:border-silver bg-black/65 border-silver/30 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="budgetMin" className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                          <DollarSign className="inline h-4 w-4 mr-2" />
                          Minimum Budget (optional)
                        </label>
                        <Input
                          id="budgetMin"
                          type="number"
                          placeholder="e.g., 10000"
                          value={formData.budgetMin}
                          onChange={(e) => handleInputChange("budgetMin", e.target.value)}
                          className="focus:ring-silver/50 focus:border-silver bg-black/65 border-silver/30 text-white placeholder:text-white/40"
                        />
                      </div>
                      <div>
                        <label htmlFor="budgetMax" className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                          <DollarSign className="inline h-4 w-4 mr-2" />
                          Maximum Budget (optional)
                        </label>
                        <Input
                          id="budgetMax"
                          type="number"
                          placeholder="e.g., 50000"
                          value={formData.budgetMax}
                          onChange={(e) => handleInputChange("budgetMax", e.target.value)}
                          className="focus:ring-silver/50 focus:border-silver bg-black/65 border-silver/30 text-white placeholder:text-white/40"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-white/60 mt-2">Enter your budget range (both fields optional)</p>
                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep("selection")}
                        className="border-2 border-silver/50 bg-black/65 hover:bg-black/70 hover:border-silver text-silver "
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

            {/* Step 4: Summary */}
            {step === "summary" && (
              <Card className="card-premium rounded-xl sm:rounded-2xl border-silver/30 bg-black/75 ">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                    Thank You!
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base md:text-lg text-white/90 premium-text">
                    Your quote request has been received
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="p-4 sm:p-5 md:p-6 bg-silver/10 border-l-4 border-silver rounded-xl sm:rounded-2xl">
                    <p className="text-white/90 leading-relaxed text-sm sm:text-base md:text-lg premium-text">{summary}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button asChild className="btn-premium btn-glow">
                      <a href="/">Return Home</a>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setStep("type");
                        setQuoteType("service");
                        setSelectedService("");
                        setSelectedProduct("");
                        setCustomServiceName("");
                        setCategoryFields({});
                        setCustomValues({});
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          address: "",
                          projectDetails: "",
                          timeline: "",
                          budgetMin: "",
                          budgetMax: "",
                        });
                      }}
                      className="border-2 border-silver/50 bg-black/65 hover:bg-black/70 hover:border-silver text-silver "
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
            <Card className="card-premium rounded-xl sm:rounded-2xl border-silver/30 bg-black/75 ">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  Why Choose Us?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-silver mt-0.5 flex-shrink-0 drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                  <div>
                    <p className="font-black text-white premium-heading-sm">Family-Owned Since 1968</p>
                    <p className="text-sm text-white/70 premium-text">Three generations of experience</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-silver mt-0.5 flex-shrink-0 drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                  <div>
                    <p className="font-black text-white premium-heading-sm">Serving Calgary Since 1997</p>
                    <p className="text-sm text-white/70 premium-text">Over {new Date().getFullYear() - BRAND_CONFIG.servingSince} years in the community</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-silver mt-0.5 flex-shrink-0 drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
                  <div>
                    <p className="font-black text-white premium-heading-sm">2,400+ Projects</p>
                    <p className="text-sm text-white/70 premium-text">Completed with excellence</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-silver mt-0.5 flex-shrink-0 drop-shadow-[0_0_10px_rgba(232,232,232,0.6)]" />
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
        <Loader2 className="h-8 w-8 text-silver animate-spin" />
      </div>
    }>
      <GetQuoteForm />
    </Suspense>
  );
}
