"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { services, getServiceById } from "@/lib/services";
import {
  getProductCategoryBySlug,
  getProductSlugFromTitle,
} from "@/lib/productQuoteConfig";
import { AIChatAssistant } from "@/components/AIChatAssistant";
import { BRAND_CONFIG } from "@/lib/utils";
import { Loader2, CheckCircle, Wrench, Hammer } from "lucide-react";
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
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Page header */}
      <div className="relative border-b border-silver/10 bg-[#030303] py-12 sm:py-16 md:py-20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center">
          <div className="flex justify-center mb-4">
            <span className="section-label">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
              Free Quote · No Obligation · 24-Hour Response
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black mb-4 text-white uppercase tracking-tight premium-heading">
            Request a Quote
          </h1>
          <div className="h-[3px] w-14 bg-gradient-to-r from-primary to-transparent mx-auto mb-4 rounded-full" style={{ boxShadow: '0 0 10px hsla(22,100%,63%,0.5)' }}></div>
          <p className="text-sm sm:text-base text-white/45 max-w-lg mx-auto leading-relaxed">
            Tell us about your project — we beat all competitor quotes by 5% guaranteed.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16 max-w-7xl relative z-10">

        {/* Progress Indicator */}
        {step !== "summary" && (
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center justify-center gap-0">
              {[
                { num: "01", label: "Type", key: "type" },
                { num: "02", label: "Category", key: "selection" },
                { num: "03", label: "Details", key: "details" },
              ].map((s, i, arr) => {
                const stepOrder = ["type", "selection", "details", "summary"];
                const currentIdx = stepOrder.indexOf(step);
                const stepIdx = stepOrder.indexOf(s.key);
                const isCompleted = currentIdx > stepIdx;
                const isActive = currentIdx === stepIdx;
                return (
                  <div key={s.key} className="flex items-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 border-2 ${isCompleted ? 'bg-primary border-primary text-black shadow-[0_0_12px_hsla(22,100%,63%,0.4)]' : isActive ? 'border-primary/70 bg-primary/[0.12] text-white' : 'border-silver/15 bg-white/[0.03] text-white/30'}`}>
                        {isCompleted ? <CheckCircle className="h-4 w-4" /> : s.num}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-white' : isCompleted ? 'text-primary/70' : 'text-white/25'}`}>{s.label}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className={`w-14 sm:w-20 h-[2px] mx-2 mb-5 rounded-full transition-all duration-500 ${isCompleted ? 'bg-primary/50' : 'bg-silver/10'}`}></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Quote Type Selection */}
            {step === "type" && (
              <div className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#050505] shadow-[0_4px_32px_rgba(0,0,0,0.6)]">
                <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent pointer-events-none"></div>
                <div className="p-6 sm:p-8 md:p-10">
                  <div className="mb-6 sm:mb-8">
                    <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em] mb-1">Step 01</p>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight premium-heading">
                      What are you looking for?
                    </h2>
                    <div className="h-[3px] w-10 bg-gradient-to-r from-primary to-transparent mt-3 rounded-full" style={{ boxShadow: '0 0 8px hsla(22,100%,63%,0.4)' }}></div>
                    <p className="text-sm text-white/40 mt-3">Choose whether you need a service quote or a materials/product quote.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleQuoteTypeSelect("service")}
                      className="group text-left p-6 sm:p-8 rounded-xl border border-silver/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/35 transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/0 to-primary/0 group-hover:from-primary/60 group-hover:via-primary/30 group-hover:to-transparent transition-all duration-300"></div>
                      <div className="w-12 h-12 rounded-xl bg-primary/[0.08] border border-primary/15 group-hover:border-primary/35 flex items-center justify-center mb-5 transition-colors">
                        <Hammer className="h-6 w-6 text-primary/60 group-hover:text-primary/90 transition-colors" />
                      </div>
                      <h3 className="font-display font-black text-xl text-white uppercase tracking-tight mb-2">Service Quote</h3>
                      <p className="text-xs sm:text-sm text-white/40 leading-relaxed">
                        Flooring, showers, basements, cabinets, painting, and more — get a quote on our installation services.
                      </p>
                    </button>
                    <button
                      onClick={() => handleQuoteTypeSelect("product")}
                      className="group text-left p-6 sm:p-8 rounded-xl border border-silver/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-silver/30 transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-silver/0 to-silver/0 group-hover:from-silver/40 group-hover:via-silver/15 group-hover:to-transparent transition-all duration-300"></div>
                      <div className="w-12 h-12 rounded-xl bg-silver/[0.06] border border-silver/10 group-hover:border-silver/25 flex items-center justify-center mb-5 transition-colors">
                        <Package className="h-6 w-6 text-silver/50 group-hover:text-silver/80 transition-colors" weight="duotone" />
                      </div>
                      <h3 className="font-display font-black text-xl text-white uppercase tracking-tight mb-2">Product Quote</h3>
                      <p className="text-xs sm:text-sm text-white/40 leading-relaxed">
                        Flooring, countertops, cabinets, windows, and more — with our 5% price-beat guarantee on all materials.
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Service/Product Selection */}
            {step === "selection" && (
              <div className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#050505] shadow-[0_4px_32px_rgba(0,0,0,0.6)]">
                <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent pointer-events-none"></div>
                <div className="p-6 sm:p-8 md:p-10">
                  <div className="mb-6 sm:mb-8">
                    <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em] mb-1">Step 02</p>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight premium-heading">
                      {quoteType === "service" ? "Select a Service" : "Select a Category"}
                    </h2>
                    <div className="h-[3px] w-10 bg-gradient-to-r from-primary to-transparent mt-3 rounded-full" style={{ boxShadow: '0 0 8px hsla(22,100%,63%,0.4)' }}></div>
                    <p className="text-sm text-white/40 mt-3">
                      {quoteType === "service" ? "Which service are you interested in?" : "Which product category do you need?"}
                    </p>
                  </div>
                  {quoteType === "service" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {services.map((service) => {
                        const IconComponent = serviceIcons[service.id] || serviceIcons.default;
                        return (
                          <button
                            key={service.id}
                            onClick={() => handleServiceSelect(service.id)}
                            className="group text-left p-4 sm:p-5 rounded-xl border border-silver/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/35 transition-all duration-200 flex items-center gap-3 sm:gap-4"
                          >
                            <div className="w-10 h-10 rounded-lg bg-silver/[0.06] border border-silver/10 group-hover:border-primary/25 flex items-center justify-center shrink-0 transition-colors">
                              <IconComponent className="h-5 w-5 text-silver/50 group-hover:text-primary/70 transition-colors" weight="duotone" />
                            </div>
                            <div>
                              <p className="font-display font-black text-sm text-white uppercase tracking-tight">{service.title}</p>
                              <p className="text-[11px] text-white/30 leading-tight mt-0.5 line-clamp-1">{service.description}</p>
                            </div>
                          </button>
                        );
                      })}
                      <button
                        onClick={() => handleServiceSelect("other")}
                        className="group text-left p-4 sm:p-5 rounded-xl border border-silver/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/35 transition-all duration-200 flex items-center gap-3 sm:gap-4"
                      >
                        <div className="w-10 h-10 rounded-lg bg-silver/[0.06] border border-silver/10 group-hover:border-primary/25 flex items-center justify-center shrink-0 transition-colors">
                          <Buildings className="h-5 w-5 text-silver/50 group-hover:text-primary/70 transition-colors" weight="duotone" />
                        </div>
                        <div>
                          <p className="font-display font-black text-sm text-white uppercase tracking-tight">Other</p>
                          <p className="text-[11px] text-white/30 leading-tight mt-0.5">Have a different project? Select this.</p>
                        </div>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {productCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <button
                            key={category.id}
                            onClick={() => handleProductSelect(category.id)}
                            className="group text-left p-4 sm:p-5 rounded-xl border border-silver/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/35 transition-all duration-200 flex items-center gap-3 sm:gap-4"
                          >
                            <div className="w-10 h-10 rounded-lg bg-silver/[0.06] border border-silver/10 group-hover:border-primary/25 flex items-center justify-center shrink-0 transition-colors">
                              <IconComponent className="h-5 w-5 text-silver/50 group-hover:text-primary/70 transition-colors" weight="duotone" />
                            </div>
                            <p className="font-display font-black text-sm text-white uppercase tracking-tight">{category.title}</p>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  <div className="mt-6 pt-5 border-t border-silver/[0.07]">
                    <button
                      type="button"
                      onClick={() => setStep("type")}
                      className="text-xs font-black text-white/35 hover:text-white uppercase tracking-widest transition-colors"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Project Details */}
            {step === "details" && (
              <div className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#050505] shadow-[0_4px_32px_rgba(0,0,0,0.6)]">
                <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent pointer-events-none"></div>
                <div className="p-6 sm:p-8 md:p-10">
                  <div className="mb-6 sm:mb-8">
                    <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em] mb-1">Step 03</p>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight premium-heading">
                      Project Details
                    </h2>
                    <div className="h-[3px] w-10 bg-gradient-to-r from-primary to-transparent mt-3 rounded-full" style={{ boxShadow: '0 0 8px hsla(22,100%,63%,0.4)' }}></div>
                    <p className="text-sm text-white/40 mt-3">
                      {quoteType === "service"
                        ? selectedService === "other"
                          ? "Tell us about your project"
                          : `Tell us about your ${getServiceById(selectedService)?.title.toLowerCase()} project`
                        : `Tell us about your ${productConfig?.title.toLowerCase() || productCategories.find(p => p.id === selectedProduct)?.title.toLowerCase() || "product"} needs`}
                    </p>
                  </div>

                  <form onSubmit={handleDetailsSubmit} className="space-y-5">
                    {/* Product-specific fields */}
                    {quoteType === "product" && productConfig ? (
                      <>
                        <div>
                          <label className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                            <span className="w-1 h-1 rounded-full bg-silver/40 shrink-0"></span>
                            Product Category
                          </label>
                          <Input readOnly value={productConfig.title} className="bg-white/[0.06] border-silver/10 text-white/60 cursor-default rounded-xl h-11" />
                        </div>
                        {productConfig.fields.map((field) => {
                          const inputCls = "bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors";
                          const labelEl = (
                            <label htmlFor={field.id} className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                              <span className="w-1 h-1 rounded-full bg-primary shrink-0"></span>
                              {field.label}
                              {field.optional && <span className="text-white/25 normal-case font-normal ml-1">(optional)</span>}
                            </label>
                          );
                          const val = categoryFields[field.id];
                          const showCustomInput = field.options && val && isOtherOption(val);
                          if (field.type === "select") {
                            return (
                              <div key={field.id}>
                                {labelEl}
                                <select
                                  id={field.id}
                                  value={val || ""}
                                  onChange={(e) => handleCategoryFieldChange(field.id, e.target.value)}
                                  className={`w-full px-3 py-2 ${inputCls} appearance-none`}
                                >
                                  <option value="">Select…</option>
                                  {field.options?.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                                {showCustomInput && (
                                  <Input
                                    placeholder="Please specify…"
                                    value={customValues[field.id] || ""}
                                    onChange={(e) => setCustomValues((p) => ({ ...p, [field.id]: e.target.value }))}
                                    className={`mt-2 ${inputCls}`}
                                  />
                                )}
                              </div>
                            );
                          }
                          if (field.type === "textarea") {
                            return (
                              <div key={field.id}>
                                {labelEl}
                                <Textarea
                                  id={field.id}
                                  placeholder={field.placeholder}
                                  value={categoryFields[field.id] || ""}
                                  onChange={(e) => setCategoryFields((p) => ({ ...p, [field.id]: e.target.value }))}
                                  rows={3}
                                  className="bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-white/25 rounded-xl transition-colors resize-none"
                                />
                              </div>
                            );
                          }
                          return (
                            <div key={field.id}>
                              {labelEl}
                              <Input
                                id={field.id}
                                type="text"
                                placeholder={field.placeholder}
                                value={categoryFields[field.id] || ""}
                                onChange={(e) => setCategoryFields((p) => ({ ...p, [field.id]: e.target.value }))}
                                className={inputCls}
                              />
                            </div>
                          );
                        })}
                        <div className="border-t border-silver/[0.07] pt-5">
                          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Your Contact Info</p>
                        </div>
                      </>
                    ) : (
                      selectedService === "other" && (
                        <div>
                          <label htmlFor="customServiceName" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                            <span className="w-1 h-1 rounded-full bg-primary shrink-0"></span>
                            Project Type <span className="text-primary/70">*</span>
                          </label>
                          <Input
                            id="customServiceName"
                            required
                            value={customServiceName}
                            onChange={(e) => setCustomServiceName(e.target.value)}
                            placeholder="e.g., Basement Development, Deck Construction…"
                            className="bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                          />
                        </div>
                      )
                    )}

                    {/* Contact fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                          <span className="w-1 h-1 rounded-full bg-primary shrink-0"></span>
                          Name <span className="text-primary/70">*</span>
                        </label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your name"
                          className="bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                          <span className="w-1 h-1 rounded-full bg-primary shrink-0"></span>
                          Email <span className="text-primary/70">*</span>
                        </label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your@email.com"
                          className="bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                          <span className="w-1 h-1 rounded-full bg-silver/30 shrink-0"></span>
                          Phone
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="(403) 818-7767"
                          className="bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="address" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                          <span className="w-1 h-1 rounded-full bg-silver/30 shrink-0"></span>
                          Project Address
                        </label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          placeholder="Calgary, AB (optional)"
                          className="bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="projectDetails" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                        <span className="w-1 h-1 rounded-full bg-primary shrink-0"></span>
                        Project Details {(quoteType !== "product" || !productConfig) && <span className="text-primary/70">*</span>}
                      </label>
                      <Textarea
                        id="projectDetails"
                        required={quoteType !== "product" || !productConfig}
                        value={formData.projectDetails}
                        onChange={(e) => handleInputChange("projectDetails", e.target.value)}
                        placeholder={quoteType === "product" && productConfig
                          ? "Describe your project, any specific products, brands, or questions…"
                          : selectedService === "other"
                            ? "Describe your project in detail — what you need, scope, any special requirements…"
                            : "Describe your project in detail — scope, size, materials you have in mind, etc…"}
                        rows={5}
                        className="bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-white/25 rounded-xl transition-colors resize-none"
                      />
                    </div>

                    {/* Timeline + Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label htmlFor="timeline" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                          <span className="w-1 h-1 rounded-full bg-silver/30 shrink-0"></span>
                          Timeline
                        </label>
                        <select
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) => handleInputChange("timeline", e.target.value)}
                          className="w-full px-3 h-11 rounded-xl border bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:outline-none text-white text-sm transition-colors appearance-none"
                        >
                          <option value="">Select…</option>
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
                          <span className="w-1 h-1 rounded-full bg-silver/30 shrink-0"></span>
                          Budget Min ($)
                        </label>
                        <Input
                          id="budgetMin"
                          type="number"
                          placeholder="e.g., 10,000"
                          value={formData.budgetMin}
                          onChange={(e) => handleInputChange("budgetMin", e.target.value)}
                          className="bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="budgetMax" className="flex items-center gap-1.5 text-[10px] font-black mb-2 text-white/40 uppercase tracking-[0.2em]">
                          <span className="w-1 h-1 rounded-full bg-silver/30 shrink-0"></span>
                          Budget Max ($)
                        </label>
                        <Input
                          id="budgetMax"
                          type="number"
                          placeholder="e.g., 50,000"
                          value={formData.budgetMax}
                          onChange={(e) => handleInputChange("budgetMax", e.target.value)}
                          className="bg-white/[0.04] border-silver/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-white/25 rounded-xl h-11 transition-colors"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-white/25">Timeline and budget are optional — they help us tailor your quote.</p>

                    <div className="flex gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep("selection")}
                        className="text-xs font-black text-white/35 hover:text-white uppercase tracking-widest transition-colors px-4 py-2.5 rounded-xl border border-silver/10 hover:border-silver/25"
                      >
                        ← Back
                      </button>
                      <Button type="submit" disabled={loading} className="btn-premium uppercase tracking-widest text-xs sm:text-sm flex-1 py-3 h-auto">
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting…
                          </>
                        ) : (
                          "Submit Quote Request"
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Step 4: Summary */}
            {step === "summary" && (
              <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-[#050505] shadow-[0_4px_40px_rgba(0,0,0,0.6)]" style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.6), 0 0 40px hsla(22,100%,63%,0.04)' }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                <div className="p-8 sm:p-10 md:p-12 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/[0.10] border border-primary/25 flex items-center justify-center mx-auto mb-6" style={{ boxShadow: '0 0 30px hsla(22,100%,63%,0.12)' }}>
                    <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                  </div>
                  <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em] mb-2">Request Received</p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight premium-heading mb-3">
                    Thank You!
                  </h2>
                  <div className="h-[2px] w-10 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mb-6 rounded-full"></div>
                  <div className="max-w-lg mx-auto rounded-xl border border-silver/10 bg-white/[0.03] p-5 sm:p-6 mb-8 text-left">
                    <p className="text-white/65 leading-relaxed text-sm sm:text-base">{summary}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild className="btn-premium uppercase tracking-widest text-xs sm:text-sm px-6 py-3 h-auto">
                      <a href="/">Return Home</a>
                    </Button>
                    <button
                      onClick={() => {
                        setStep("type");
                        setQuoteType("service");
                        setSelectedService("");
                        setSelectedProduct("");
                        setCustomServiceName("");
                        setCategoryFields({});
                        setCustomValues({});
                        setFormData({ name: "", email: "", phone: "", address: "", projectDetails: "", timeline: "", budgetMin: "", budgetMax: "" });
                      }}
                      className="text-xs font-black text-white/35 hover:text-white uppercase tracking-widest transition-colors px-6 py-3 rounded-md border border-silver/10 hover:border-silver/25"
                    >
                      Request Another Quote
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="relative rounded-2xl overflow-hidden border border-silver/10 bg-[#080808] shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-silver/30 via-silver/10 to-transparent pointer-events-none"></div>
              <div className="p-5 sm:p-6">
                <div className="mb-5">
                  <p className="text-[10px] font-black text-white/25 uppercase tracking-[0.2em] mb-1">Why us</p>
                  <h3 className="text-lg font-display font-black text-white uppercase tracking-tight premium-heading">Why Choose Us?</h3>
                  <div className="h-[2px] w-8 bg-gradient-to-r from-silver/40 to-transparent mt-2 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Family-Owned Since 1968", sub: "3rd generation of construction expertise" },
                    { title: "Serving Calgary Since 1997", sub: `Over ${new Date().getFullYear() - BRAND_CONFIG.servingSince} years in the community` },
                    { title: "2,400+ Projects Completed", sub: "Delivered with excellence and care" },
                    { title: "5% Price Beat Guarantee", sub: "We beat any legitimate competitor quote" },
                    { title: BRAND_CONFIG.motto, sub: "We treat every client like family" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <span className="mt-[3px] shrink-0 w-4 h-4 rounded-full bg-primary/[0.12] border border-primary/30 flex items-center justify-center">
                        <span className="w-1 h-1 rounded-full bg-primary block"></span>
                      </span>
                      <div>
                        <p className="text-sm font-black text-white leading-tight">{item.title}</p>
                        <p className="text-xs text-white/35 mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

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
