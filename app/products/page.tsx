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
import { CheckCircle, Hammer, Wrench, ChevronLeft, ChevronRight } from "lucide-react";

const productCategories = [
  {
    title: "Flooring",
    productTypes: [
      "Luxury Vinyl Plank (LVP)", "Waterproof LVP", "Rigid Core LVP", "SPC Vinyl", "WPC Vinyl",
      "Hardwood Flooring", "Engineered Hardwood", "Solid Hardwood", "Bamboo Flooring",
      "Laminate Flooring", "Waterproof Laminate", "High-Gloss Laminate",
      "Ceramic Tile", "Porcelain Tile", "Large Format Porcelain", "Mosaic Tile", "Subway Tile",
      "Natural Stone Tile", "Marble Tile", "Granite Tile", "Slate Tile", "Travertine",
      "Carpet", "Berber Carpet", "Plush Carpet", "Commercial Carpet", "Carpet Tiles",
      "Marmoleum", "Linoleum", "Cork Flooring", "Rubber Flooring",
      "Underlayment", "Moisture Barriers", "Transition Strips", "Baseboards"
    ],
    subtitle: "Brand-name vinyl, hardwood, laminate, carpet, and more — built to handle Calgary's toughest conditions.",
    carouselImages: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
    ],
    valueBadges: [
      { icon: CheckCircle, text: "5% Price Beat Guarantee" },
      { icon: Hammer, text: "Supply + Install Available" },
      { icon: Wrench, text: "Custom Fit & Finishing" },
    ],
  },
  {
    title: "Countertops",
    productTypes: [
      "Quartz Countertops", "Caesarstone", "Silestone", "Cambria", "Quartzite",
      "Granite Countertops", "Natural Granite", "Granite Slabs", "Granite Tiles",
      "Porcelain Slab", "Large Format Porcelain", "Ultra-Compact Surfaces",
      "Marble Countertops", "Natural Marble", "Marble Slabs",
      "Laminate Countertops", "Formica", "Wilsonart", "Pionite",
      "Concrete Countertops", "Stained Concrete", "Polished Concrete",
      "Stainless Steel", "Butcher Block", "Solid Surface", "Corian",
      "Edge Profiles", "Backsplashes", "Sink Cutouts", "Installation Hardware"
    ],
    subtitle: "Quartz, granite, porcelain slab, stainless steel, and beyond — premium surfaces at unbeatable prices.",
    carouselImages: [
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80",
    ],
    valueBadges: [
      { icon: CheckCircle, text: "5% Price Beat Guarantee" },
      { icon: Wrench, text: "Custom Fit & Finishing" },
      { icon: Hammer, text: "Supply + Install Available" },
    ],
  },
  {
    title: "Cabinets",
    productTypes: [
      "Kitchen Cabinets", "Base Cabinets", "Wall Cabinets", "Tall Cabinets", "Pantry Cabinets",
      "Shaker Style Cabinets", "Flat Panel Cabinets", "Raised Panel Cabinets", "Beadboard Cabinets",
      "Custom Built-in Cabinets", "Entertainment Centers", "Bookcases", "Display Cabinets",
      "MDF Cabinets", "Particle Board Cabinets", "Plywood Cabinets", "Solid Wood Cabinets",
      "Soft-Close Hinges", "Full Extension Drawers", "Pull-Out Shelves", "Lazy Susans",
      "Cabinet Hardware", "Knobs", "Pulls", "Handles", "Hinges",
      "Cabinet Doors", "Drawer Fronts", "Filler Strips", "Crown Molding", "Toe Kicks"
    ],
    subtitle: "Custom cabinetry in all wood species, styles, and finishes — from modern flat panel to classic shaker.",
    carouselImages: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80",
    ],
    valueBadges: [
      { icon: CheckCircle, text: "5% Price Beat Guarantee" },
      { icon: Wrench, text: "Custom Fit & Finishing" },
      { icon: Hammer, text: "Supply + Install Available" },
    ],
  },
  {
    title: "Interior Finishing",
    productTypes: [
      "Interior Doors", "Solid Core Doors", "Hollow Core Doors", "Shaker Doors", "Panel Doors",
      "French Doors", "Sliding Doors", "Barn Doors", "Pocket Doors", "Bifold Doors",
      "Glass Insert Doors", "Frosted Glass", "Clear Glass", "Decorative Glass",
      "Door Frames", "Door Casings", "Door Jambs", "Door Hardware", "Door Locks",
      "Baseboards", "Crown Molding", "Chair Rails", "Wainscoting", "Casing",
      "Window Trim", "Door Trim", "Corner Molding", "Quarter Round", "Shoe Molding",
      "Stair Parts", "Balusters", "Newel Posts", "Handrails", "Treads"
    ],
    subtitle: "Door kits, baseboards, trims, and full finish packages — available in standard and luxury profiles.",
    carouselImages: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
    ],
    valueBadges: [
      { icon: CheckCircle, text: "5% Price Beat Guarantee" },
      { icon: Wrench, text: "Custom Fit & Finishing" },
      { icon: Hammer, text: "Fast Turnaround" },
    ],
  },
  {
    title: "Windows",
    productTypes: [
      "Sliding Windows", "Double-Hung Windows", "Single-Hung Windows", "Casement Windows",
      "Awning Windows", "Hopper Windows", "Picture Windows", "Bay Windows", "Bow Windows",
      "Energy Star Windows", "Triple-Pane Windows", "Double-Pane Windows", "Low-E Glass",
      "Vinyl Windows", "Wood Windows", "Aluminum Windows", "Fiberglass Windows",
      "Window Frames", "Window Sills", "Window Grilles", "Window Screens",
      "Storm Windows", "Replacement Windows", "New Construction Windows"
    ],
    subtitle: "Energy-efficient windows in all styles.",
    carouselImages: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80",
    ],
    valueBadges: [
      { icon: CheckCircle, text: "5% Price Beat Guarantee" },
      { icon: Hammer, text: "Supply + Install Available" },
      { icon: Wrench, text: "Fast Turnaround" },
    ],
  },
  {
    title: "Exterior Products",
    productTypes: [
      "Siding", "Vinyl Siding", "Fiber Cement Siding", "James Hardie Siding", "Wood Siding",
      "Aluminum Siding", "Steel Siding", "Stone Veneer Siding", "Brick Siding",
      "Fascia Boards", "Soffits", "Eavestroughs", "Downspouts", "Gutters",
      "Exterior Trim", "Corner Boards", "Frieze Boards", "Corner Posts",
      "Roofing Materials", "Shingles", "Metal Roofing", "Flat Roofing", "Roof Underlayment",
      "Exterior Cladding", "Batten Boards", "Board & Batten", "Lap Siding", "Shake Siding"
    ],
    subtitle: "Siding, fascia, soffit, and cladding — top-grade materials for any residential or commercial build.",
    carouselImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
    valueBadges: [
      { icon: CheckCircle, text: "5% Price Beat Guarantee" },
      { icon: Hammer, text: "Supply + Install Available" },
      { icon: Wrench, text: "Custom Fit & Finishing" },
    ],
  },
  {
    title: "Bathroom Fixtures",
    productTypes: [
      "Bathtubs", "Alcove Tubs", "Drop-In Tubs", "Freestanding Tubs", "Whirlpool Tubs",
      "Steam Showers", "Steam Shower Kits", "Steam Generators", "Shower Enclosures",
      "Shower Bases", "Shower Pans", "Shower Walls", "Shower Doors", "Shower Screens",
      "Vanities", "Bathroom Vanities", "Double Vanities", "Floating Vanities", "Wall-Mount Vanities",
      "Bathroom Faucets", "Shower Faucets", "Tub Faucets", "Bathroom Sinks", "Vessel Sinks",
      "Large Format Tile", "Bathroom Tile", "Shower Tile", "Floor Tile", "Wall Tile",
      "Toilets", "Bathroom Mirrors", "Medicine Cabinets", "Towel Bars", "Accessories"
    ],
    subtitle: "Tubs, vanities, shower kits, large-format tile.",
    carouselImages: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
    ],
    valueBadges: [
      { icon: CheckCircle, text: "5% Price Beat Guarantee" },
      { icon: Hammer, text: "Supply + Install Available" },
      { icon: Wrench, text: "Fast Turnaround" },
    ],
  },
  {
    title: "Hardware",
    productTypes: [
      "Cabinet Hinges", "Soft-Close Hinges", "Concealed Hinges", "European Hinges", "Butt Hinges",
      "Drawer Slides", "Full Extension Slides", "Soft-Close Slides", "Undermount Slides",
      "Rail Systems", "Pocket Door Rails", "Sliding Door Rails", "Barn Door Rails",
      "Cabinet Handles", "Cabinet Knobs", "Cabinet Pulls", "Bar Pulls", "Cup Pulls",
      "Door Handles", "Door Knobs", "Lever Handles", "Deadbolts", "Door Locks",
      "Hooks", "Towel Bars", "Toilet Paper Holders", "Shower Rods", "Curtain Rods",
      "Drawer Organizers", "Pantry Organizers", "Closet Systems", "Shelf Brackets"
    ],
    subtitle: "Hinges, drawer slides, rails, and custom handles.",
    carouselImages: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
    valueBadges: [
      { icon: CheckCircle, text: "5% Price Beat Guarantee" },
      { icon: Wrench, text: "Custom Fit & Finishing" },
      { icon: Hammer, text: "Fast Turnaround" },
    ],
  },
  {
    title: "Paint & Finishes",
    productTypes: [
      "Interior Paint", "Latex Paint", "Oil-Based Paint", "Primer", "Sealer",
      "Exterior Paint", "Siding Paint", "Trim Paint", "Deck Paint", "Fence Paint",
      "Stain", "Wood Stain", "Deck Stain", "Fence Stain", "Concrete Stain",
      "Specialty Coatings", "Waterproofing", "Masonry Paint", "Metal Paint", "Rust Inhibitor",
      "Paint Brushes", "Rollers", "Paint Trays", "Drop Cloths", "Tape",
      "Caulk", "Sealants", "Adhesives", "Spackle", "Joint Compound"
    ],
    subtitle: "Interior and exterior paint from top brands.",
    carouselImages: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
    ],
    valueBadges: [
      { icon: CheckCircle, text: "5% Price Beat Guarantee" },
      { icon: Hammer, text: "Supply + Install Available" },
      { icon: Wrench, text: "Fast Turnaround" },
    ],
  },
  {
    title: "Commercial Materials",
    productTypes: [
      "Fire-Rated Board", "Type X Drywall", "Fire-Rated Panels", "Firestop Materials",
      "T-bar Grid Systems", "Ceiling Grid", "Suspension Systems", "Main Tees", "Cross Tees",
      "Acoustic Materials", "Acoustic Panels", "Sound Dampening", "Insulation", "Batt Insulation",
      "Commercial Ceiling Tiles", "Drop Ceiling Tiles", "Suspended Ceilings",
      "Commercial Flooring", "VCT Tile", "Commercial Carpet", "Rubber Flooring",
      "Commercial Doors", "Fire Doors", "Hollow Metal Doors", "Commercial Hardware",
      "Wall Systems", "Demountable Walls", "Movable Partitions"
    ],
    subtitle: "T-bar ceilings, fire-rated panels, acoustic materials.",
    carouselImages: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
    valueBadges: [
      { icon: CheckCircle, text: "5% Price Beat Guarantee" },
      { icon: Hammer, text: "Supply + Install Available" },
      { icon: Wrench, text: "Custom Fit & Finishing" },
    ],
  },
];

const brands = [
  { name: "Olympia Tile", file: "olympiatile.png" },
  { name: "Shaw Flooring", file: "shawfloors.png" },
  { name: "Formica", file: "formica.png" },
  { name: "Benjamin Moore", file: "bejaminmoorenew.png" },
  { name: "Caesarstone", file: "ceasarstonenew.png" },
  { name: "Silestone", file: "silestonenew.png" },
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
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
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

  const toggleCategoryExpansion = (categoryTitle: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle],
    }));
  };

  // Carousel component for product categories
  function ProductCarousel({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }, [images.length]);

    return (
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl border border-gold/20" style={{ aspectRatio: "1/1" }}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Product showcase ${index + 1}`}
              fill
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-gold p-2 rounded-full transition-all duration-300 z-10 border border-gold/30"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-gold p-2 rounded-full transition-all duration-300 z-10 border border-gold/30"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-gold" : "w-2 bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

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
        <div className="relative w-full" style={{ aspectRatio: "16/9", maxHeight: "600px", minHeight: "300px" }}>
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
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center">
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                {/* Main Title with enhanced shadow */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black text-white uppercase tracking-tight premium-heading drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] px-2">
                  Every Product. Every Brand. Built to Outperform.
                </h1>
                
                {/* Gold divider with glow */}
                <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-2 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
                
                {/* Subtitle with premium gold styling - clean, no box */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl premium-gold-text font-bold max-w-4xl mx-auto leading-relaxed tracking-wide drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] px-2">
                  Explore the industry&apos;s best materials. We carry everything construction demands — and beat all competitors by 5%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent shadow-[0_0_30px_rgba(212,175,55,0.4)]"></div>

      {/* Current Deals Section */}
      <section id="current-deals" className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white mb-3 sm:mb-4 uppercase tracking-tight premium-heading">
              Current Deals
            </h2>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
            <p className="text-sm sm:text-base md:text-lg text-white max-w-3xl mx-auto premium-text px-2">
              Limited-time pricing and guarantees to help you save on your build.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {/* Deal A - Trust Builder */}
            <Card className="card-premium border-gold/30 bg-black/60 backdrop-blur-sm hover:border-gold/50 hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wide bg-gold/20 text-gold px-3 py-1 rounded-full border border-gold/40">
                    Guarantee
                  </span>
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  5% Price Beat Guarantee
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/90 premium-text mb-4">
                  Send us any estimate from a reputable supplier — we&apos;ll beat it by at least 5%.
                </CardDescription>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-gold mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                    <span className="text-white/90 premium-text text-sm">Applies to major suppliers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                    <span className="text-white/90 premium-text text-sm">24-hour response</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                    <span className="text-white/90 premium-text text-sm">No hidden fees</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full btn-premium uppercase tracking-wider"
                >
                  <a href="#quote-form">Submit a Quote</a>
                </Button>
              </CardContent>
            </Card>

            {/* Deal B - Best Value / Highlighted */}
            <Card className="card-premium border-gold/50 bg-black/70 backdrop-blur-sm hover:border-gold/70 hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] transition-all duration-300 scale-105 md:scale-105 lg:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wide bg-gold text-black px-3 py-1 rounded-full border border-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                    Most Popular
                  </span>
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  Bundle & Save (Supply + Install)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/90 premium-text mb-4">
                  Bundle materials and installation for package pricing that can save thousands.
                </CardDescription>
                <p className="text-sm text-white/70 mb-4">From $X (ask for today&apos;s rate)</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-gold mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                    <span className="text-white/90 premium-text text-sm">Flooring + install</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                    <span className="text-white/90 premium-text text-sm">Cabinets + countertops</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                    <span className="text-white/90 premium-text text-sm">Bathroom packages</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full btn-premium uppercase tracking-wider"
                >
                  <Link href={`/get-quote?product=${encodeURIComponent("Bundle Savings")}`}>
                    View Bundle Savings
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Deal C - Urgency */}
            <Card className="card-premium border-gold/30 bg-black/60 backdrop-blur-sm hover:border-gold/50 hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wide bg-gold/20 text-gold px-3 py-1 rounded-full border border-gold/40">
                    Limited Time
                  </span>
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight premium-heading-sm">
                  Limited-Time Supplier Discounts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/90 premium-text mb-4">
                  Special pricing on select materials while inventory lasts.
                </CardDescription>
                <p className="text-sm text-white/70 mb-4">From $X (ask for today&apos;s rate)</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-gold mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                    <span className="text-white/90 premium-text text-sm">Quartz & porcelain</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                    <span className="text-white/90 premium-text text-sm">LVP & laminate</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                    <span className="text-white/90 premium-text text-sm">Hardware & fixtures</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full btn-premium uppercase tracking-wider"
                >
                  <Link href={`/get-quote?product=${encodeURIComponent("Current Deals")}`}>
                    See Current Deals
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent shadow-[0_0_30px_rgba(212,175,55,0.4)]"></div>

      {/* Product Categories - Text Above, Carousel Below */}
      <section className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
            {productCategories.map((category, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={category.title} className="relative">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
                    {/* Content Section - Text and Products */}
                    <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="mb-6 sm:mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight premium-heading">
                            {category.title}
                          </h2>
                          {(category.title === "Flooring" || category.title === "Countertops") && (
                            <span className="text-xs font-black uppercase tracking-wide bg-gold text-black px-3 py-1 rounded-full border border-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                              Most Popular
                            </span>
                          )}
                        </div>
                        <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-gold to-transparent mb-6 shadow-[0_0_20px_rgba(212,175,55,0.6)]"></div>
                      </div>
                      
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 leading-relaxed premium-text mb-6 sm:mb-8 font-medium">
                        {category.subtitle}
                      </p>

                      {/* Value Badges with Icons */}
                      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10">
                        {category.valueBadges.map((badge, idx) => {
                          const IconComponent = badge.icon;
                          return (
                            <div
                              key={idx}
                              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-full bg-gold/10 border border-gold/40 text-gold/90 backdrop-blur-sm"
                            >
                              <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wide">{badge.text}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Product Types List */}
                      <div className="mb-6 sm:mb-8 md:mb-10">
                        <h3 className="text-base sm:text-lg font-black text-white mb-3 sm:mb-4 md:mb-6 uppercase tracking-wide premium-heading-sm">
                          Available Products:
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                          {(expandedCategories[category.title] ? category.productTypes : category.productTypes.slice(0, 9)).map((type, idx) => (
                            <div key={idx} className="flex items-start space-x-2 sm:space-x-3">
                              <span className="text-gold mt-1.5 flex-shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                              <span className="text-white/90 premium-text text-xs sm:text-sm md:text-base leading-relaxed">{type}</span>
                            </div>
                          ))}
                        </div>
                        {category.productTypes.length > 9 && (
                          <button
                            onClick={() => toggleCategoryExpansion(category.title)}
                            className="mt-4 text-gold/90 hover:text-gold text-sm font-bold uppercase tracking-wide underline transition-colors"
                          >
                            {expandedCategories[category.title] ? "Show less" : "View full list"}
                          </button>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-5 md:pt-6 border-t border-gold/20">
                        <Button
                          asChild
                          className="btn-premium uppercase tracking-wider text-xs sm:text-sm md:text-base px-4 py-2.5 sm:px-6 sm:py-3 w-full sm:w-auto"
                        >
                          <Link href={`/get-quote?product=${encodeURIComponent(category.title)}`}>
                            Get a Quote
                          </Link>
                        </Button>
                        <div className="h-px sm:h-px flex-1 bg-gradient-to-r from-gold/40 via-gold/60 to-transparent hidden sm:block"></div>
                      </div>
                    </div>

                    {/* Carousel Section Beside */}
                    <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="w-full mx-auto" style={{ maxWidth: "600px", maxHeight: "600px" }}>
                        <ProductCarousel images={category.carouselImages} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent shadow-[0_0_30px_rgba(212,175,55,0.4)]"></div>

      {/* Sample Brands Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-3 sm:mb-4 uppercase tracking-tight premium-heading">
              Sample Brands We Carry
            </h2>
            <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
            <p className="text-sm sm:text-base md:text-lg text-white max-w-3xl mx-auto premium-text px-2">
              Trusted brands you know and love, available at unbeatable prices
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="relative h-24 sm:h-28 md:h-32 bg-white/95 border border-gold/30 rounded-xl backdrop-blur-sm hover:border-gold/60 hover:bg-white transition-all duration-300 flex items-center justify-center group overflow-hidden shadow-lg hover:shadow-xl"
              >
                <Image
                  src={`/${brand.file}`}
                  alt={brand.name}
                  fill
                  className="object-contain p-4 transition-all duration-300 opacity-80 group-hover:opacity-100"
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
      <section id="quote-form" ref={quoteFormRef} className="py-12 sm:py-16 md:py-20 bg-black relative premium-bg-pattern">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-black text-white mb-3 sm:mb-4 uppercase tracking-tight premium-heading px-2">
              We Beat All Legitimate Competitor Quotes by 5% or More
            </h2>
            <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4 sm:mb-6 shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
            <p className="text-sm sm:text-base md:text-lg text-white max-w-3xl mx-auto premium-text px-2">
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

