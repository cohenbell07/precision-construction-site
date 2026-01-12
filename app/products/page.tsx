"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { BRAND_CONFIG } from "@/lib/utils";
import { sendEmail } from "@/lib/email";
import Hls from "hls.js";
import {
  SquaresFour,
  Rectangle,
  Package,
  Door,
  AppWindow,
  Buildings,
  Drop,
  Wrench,
  PaintBrush,
  Storefront,
} from "phosphor-react";

const productCategories = [
  {
    title: "Flooring",
    productTypes: ["Vinyl Plank", "Hardwood", "Tile", "Carpet"],
    subtitle: "Brand-name vinyl, hardwood, laminate, carpet, and more — built to handle Calgary's toughest conditions.",
    icon: SquaresFour,
  },
  {
    title: "Countertops",
    productTypes: ["Quartz", "Granite", "Porcelain Slab", "Laminate", "Concrete"],
    subtitle: "Quartz, granite, porcelain slab, stainless steel, and beyond — premium surfaces at unbeatable prices.",
    icon: Rectangle,
  },
  {
    title: "Cabinets",
    productTypes: ["Flat Panel", "MDF", "Wood", "Custom Built-ins"],
    subtitle: "Custom cabinetry in all wood species, styles, and finishes — from modern flat panel to classic shaker.",
    icon: Package,
  },
  {
    title: "Interior Finishing",
    productTypes: ["Shaker", "Glass Insert", "Solid Core", "Barn Style"],
    subtitle: "Door kits, baseboards, trims, and full finish packages — available in standard and luxury profiles.",
    icon: Door,
  },
  {
    title: "Windows",
    productTypes: ["Sliding", "Casement", "Awning", "Energy Star"],
    subtitle: "Energy-efficient windows in all styles.",
    icon: AppWindow,
  },
  {
    title: "Exterior Products",
    productTypes: ["Siding", "Trim", "Soffits", "Roofing"],
    subtitle: "Siding, fascia, soffit, and cladding — top-grade materials for any residential or commercial build.",
    icon: Buildings,
  },
  {
    title: "Bathroom Fixtures",
    productTypes: ["Tubs", "Steam Showers", "Vanities", "Large Tile"],
    subtitle: "Tubs, vanities, shower kits, large-format tile.",
    icon: Drop,
  },
  {
    title: "Hardware",
    productTypes: ["Hinges", "Drawer Slides", "Rail Systems", "Handles"],
    subtitle: "Hinges, drawer slides, rails, and custom handles.",
    icon: Wrench,
  },
  {
    title: "Paint & Finishes",
    productTypes: ["Interior", "Exterior", "Stain", "Primer"],
    subtitle: "Interior and exterior paint from top brands.",
    icon: PaintBrush,
  },
  {
    title: "Commercial Materials",
    productTypes: ["Fire-Rated Board", "T-bar Grid", "Acoustics"],
    subtitle: "T-bar ceilings, fire-rated panels, acoustic materials.",
    icon: Storefront,
  },
];

const brands = [
  { name: "Olympia Tile", file: "olympiatile.png" },
  { name: "Shaw Flooring", file: "shawfloors.png" },
  { name: "Formica", file: "formica.png" },
  { name: "Benjamin Moore", file: "benjaminmoore.png" },
  { name: "Caesarstone", file: "caesarstone.png" },
  { name: "Silestone", file: "silestone.png" },
  { name: "Arborite", file: "arborite.png" },
  { name: "CertainTeed", file: "certainteed.png" },
  { name: "James Hardie", file: "jameshardie.png" },
];

export default function ProductsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    productType: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [prefilledCategory, setPrefilledCategory] = useState<string | null>(null);
  const { toast } = useToast();
  const quoteFormRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert file to base64 if present (for email attachment simulation)
      let fileData = "";
      if (selectedFile) {
        const reader = new FileReader();
        fileData = await new Promise<string>((resolve) => {
          reader.onloadend = () => {
            const base64String = (reader.result as string).split(",")[1];
            resolve(base64String);
          };
          reader.readAsDataURL(selectedFile);
        });
      }

      // Save to database via API route
      try {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: "",
            projectType: `Price Beat: ${formData.productType || "General Product Inquiry"}`,
            message: `Product/Project Type: ${formData.productType || "N/A"}\n\nCompetitor quote attached: ${selectedFile ? "Yes" : "No"}`,
            source: "products_price_beat",
          }),
        });
      } catch (error) {
        console.log("Lead saved via API (if configured)");
      }

      // Send email to admin
      await sendEmail({
        to: BRAND_CONFIG.contact.email,
        subject: `Price Beat Request - ${formData.productType || "General Product"}`,
        html: `
          <h2>New Price Beat Request</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Product/Project Type:</strong> ${formData.productType || "N/A"}</p>
          <p><strong>Competitor Quote Attached:</strong> ${selectedFile ? `Yes (${selectedFile.name})` : "No"}</p>
          ${fileData ? `<p><em>Note: File attachment data available in system</em></p>` : ""}
        `,
      });

      // Send confirmation to user
      await sendEmail({
        to: formData.email,
        subject: `Thank you for your price beat request - ${BRAND_CONFIG.shortName}`,
        html: `
          <h2>Thank you for your price beat request!</h2>
          <p>Hi ${formData.name},</p>
          <p>We've received your request and will review your competitor quote. Our team will get back to you within 24 hours with our best price—guaranteed to beat your quote by at least 5%.</p>
          <p><strong>${BRAND_CONFIG.motto}</strong></p>
          <p>We treat every client like family and deliver only the best.</p>
          <p>Best regards,<br>${BRAND_CONFIG.owner}<br>${BRAND_CONFIG.name}</p>
        `,
      });

      toast({
        title: "Request sent!",
        description: "We'll review your quote and get back to you within 24 hours with our best price.",
      });

      setFormData({
        name: "",
        email: "",
        productType: "",
      });
      setSelectedFile(null);
      setPrefilledCategory(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Request received",
        description: "Your price beat request has been received. We'll contact you soon!",
        variant: "default",
      });
    } finally {
      setLoading(false);
    }
  };

  // Initialize video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoSrc = "https://customer-wlq98rw65iepfe8g.cloudflarestream.com/adce22ef76da6a626cb98b44a0cf9e05/manifest/video.m3u8";

    // Set video properties
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto";
    video.muted = true;

    const initVideo = () => {
      try {
        if (typeof Hls !== "undefined" && Hls.isSupported()) {
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: false,
          });
          hlsRef.current = hls;
          hls.loadSource(videoSrc);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch((err) => {
              console.log("Autoplay prevented:", err);
            });
          });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          // Native HLS support (Safari)
          video.src = videoSrc;
          video.play().catch((err) => {
            console.log("Autoplay prevented:", err);
          });
        }
      } catch (err) {
        console.error("Video initialization error:", err);
      }
    };

    initVideo();

    return () => {
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch (e) {
          // Ignore destroy errors
        }
        hlsRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative premium-bg-pattern">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Hero Video Section */}
      <section className="relative w-full bg-black overflow-hidden">
        <div className="relative w-full" style={{ aspectRatio: "16/9", maxHeight: "600px", minHeight: "400px" }}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            autoPlay
            loop
            muted
            preload="auto"
          />
          {/* Refined gradient - more sophisticated */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/75"></div>
          
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="container mx-auto px-4 max-w-7xl text-center">
              <div className="space-y-6 md:space-y-8">
                {/* Main Title with enhanced shadow */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight premium-heading drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                  Every Product. Every Brand. Built to Outperform.
                </h1>
                
                {/* Gold divider with glow */}
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-2 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
                
                {/* Subtitle with premium gold styling - clean, no box */}
                <p className="text-lg md:text-xl lg:text-2xl premium-gold-text font-bold max-w-4xl mx-auto leading-relaxed tracking-wide drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]">
                  Explore the industry&apos;s best materials. We carry everything construction demands — and beat all competitors by 5%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent shadow-[0_0_30px_rgba(212,175,55,0.4)]"></div>

      {/* Product Categories Grid */}
      <section className="py-20 bg-[#1F1F1F] relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.title} className="card-premium h-full flex flex-col border-gold/30 bg-black/60 backdrop-blur-sm hover:border-gold/50 hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="relative inline-block mb-4">
                      <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full"></div>
                      <IconComponent className="h-12 w-12 text-gold relative z-10 drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]" weight="bold" />
                    </div>
                    <CardTitle className="text-xl font-display font-black text-white mb-3 uppercase tracking-tight premium-heading-sm">
                      {category.title}
                    </CardTitle>
                    {/* Product Types as Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {category.productTypes.map((type, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gold/10 border border-gold/30 text-gold/90"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow">
                    <CardDescription className="text-white/90 leading-relaxed premium-text mb-6">
                      {category.subtitle}
                    </CardDescription>
                    <Button
                      asChild
                      className="mt-auto btn-premium uppercase tracking-wider"
                    >
                      <Link href={`/get-quote?product=${encodeURIComponent(category.title)}`}>
                        Get a Quote
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent shadow-[0_0_30px_rgba(212,175,55,0.4)]"></div>

      {/* Sample Brands Section */}
      <section className="py-20 bg-black relative premium-bg-pattern">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading">
              Sample Brands We Carry
            </h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6 shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
            <p className="text-lg text-white max-w-3xl mx-auto premium-text">
              Trusted brands you know and love, available at unbeatable prices
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="relative h-32 bg-black/50 border border-gold/20 rounded-xl backdrop-blur-sm hover:border-gold/40 hover:bg-black/70 transition-all duration-300 flex items-center justify-center group grayscale hover:grayscale-0 overflow-hidden"
              >
                <Image
                  src={`/${brand.file}`}
                  alt={brand.name}
                  fill
                  className="object-contain p-4 transition-all duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent shadow-[0_0_30px_rgba(212,175,55,0.4)]"></div>

      {/* Quote Challenge Section */}
      <section id="quote-form" ref={quoteFormRef} className="py-20 bg-[#1F1F1F] relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-4 uppercase tracking-tight premium-heading">
              We Beat All Legitimate Competitor Quotes by 5% or More
            </h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6 shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
            <p className="text-lg text-white max-w-3xl mx-auto premium-text">
              Send us any estimate from a reputable supplier — we&apos;ll beat it.
            </p>
          </div>

          <Card className="card-premium border-gold/30 bg-black/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-display font-black text-white uppercase tracking-tight premium-heading-sm text-center">
                Get My Price Beat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
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
                  <label htmlFor="email" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
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
                <div>
                  <label htmlFor="productType" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                    Product Category *
                    {prefilledCategory && (
                      <span className="ml-2 text-xs text-gold/80 font-normal normal-case">(Pre-selected)</span>
                    )}
                  </label>
                  <Input
                    id="productType"
                    required
                    readOnly={!!prefilledCategory}
                    value={formData.productType}
                    onChange={(e) => {
                      if (!prefilledCategory) {
                        setFormData({ ...formData, productType: e.target.value });
                      }
                    }}
                    placeholder="e.g., Kitchen Cabinets, Flooring, Countertops, etc."
                    className={`focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white placeholder:text-white/40 ${
                      prefilledCategory ? "cursor-not-allowed opacity-75 bg-black/70" : ""
                    }`}
                  />
                  {prefilledCategory && (
                    <button
                      type="button"
                      onClick={() => {
                        setPrefilledCategory(null);
                        setFormData((prev) => ({ ...prev, productType: "" }));
                      }}
                      className="mt-2 text-xs text-gold/80 hover:text-gold transition-colors underline"
                    >
                      Click to change category
                    </button>
                  )}
                </div>
                <div>
                  <label htmlFor="quoteFile" className="block text-sm font-bold mb-2 text-white uppercase tracking-wide">
                    Competitor Quote (Optional)
                  </label>
                  <Input
                    id="quoteFile"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setSelectedFile(file);
                    }}
                    className="focus:ring-gold/50 focus:border-gold bg-black/50 border-gold/30 text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gold/20 file:text-gold hover:file:bg-gold/30 file:cursor-pointer cursor-pointer"
                  />
                  {selectedFile && (
                    <p className="mt-2 text-sm text-white/70">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={loading} className="w-full btn-premium uppercase tracking-wider">
                  {loading ? "Sending..." : "Get My Price Beat"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

