export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  details?: string[];
  benefits?: string[];
  process?: { step: number; title: string; description: string }[];
  materials?: string[];
  faqs?: { question: string; answer: string }[];
  stats?: { label: string; value: string }[];
  relatedServices?: string[];
}

export const services: Service[] = [
  {
    id: "flooring",
    title: "Flooring Installation",
    description: "All types of flooring including LVP, carpet, tile, large format porcelain, and marmoleum. Professional installation with attention to detail.",
    icon: "floor",
    details: [
      "Luxury Vinyl Plank (LVP) installation",
      "Carpet installation and replacement",
      "Tile installation (ceramic, porcelain, natural stone)",
      "Wall tile installation",
      "Large format porcelain tile",
      "Marmoleum flooring",
      "Professional subfloor preparation",
    ],
    benefits: [
      "Expert subfloor preparation ensures longevity",
      "Warranty-backed installation on all materials",
      "Professional grade tools and techniques",
      "Moisture barrier installation for basements",
      "Seamless transitions between rooms",
    ],
    process: [
      {
        step: 1,
        title: "Consultation & Measurement",
        description: "We assess your space, discuss material options, and take precise measurements to ensure perfect fit.",
      },
      {
        step: 2,
        title: "Subfloor Preparation",
        description: "Professional subfloor inspection, leveling, and moisture barrier installation for optimal results.",
      },
      {
        step: 3,
        title: "Installation",
        description: "Expert installation using industry-leading techniques, ensuring proper spacing, alignment, and finishing.",
      },
      {
        step: 4,
        title: "Final Inspection & Cleanup",
        description: "Thorough quality check, cleanup, and walkthrough to ensure your complete satisfaction.",
      },
    ],
    materials: [
      "Luxury Vinyl Plank (LVP)",
      "Premium Carpet",
      "Ceramic & Porcelain Tile",
      "Natural Stone Tile",
      "Large Format Porcelain",
      "Marmoleum",
      "Hardwood Alternatives",
    ],
    faqs: [
      {
        question: "How long does flooring installation take?",
        answer: "Most flooring projects take 1-3 days depending on the size and material. Large format tile and complex patterns may take longer. We'll provide a detailed timeline during consultation.",
      },
      {
        question: "Do you handle subfloor preparation?",
        answer: "Yes, we thoroughly inspect and prepare subfloors, including leveling, moisture barrier installation, and addressing any structural issues before installation.",
      },
      {
        question: "What's the warranty on flooring installation?",
        answer: "We provide a comprehensive warranty on our installation workmanship. Material warranties vary by manufacturer and we'll explain all warranties during your consultation.",
      },
      {
        question: "Can you match existing flooring?",
        answer: "We work with you to find the best match for existing flooring, including color matching and creating seamless transitions between different materials.",
      },
    ],
    stats: [
      { label: "Flooring Projects", value: "850+" },
      { label: "Materials Available", value: "15+" },
      { label: "Satisfaction Rate", value: "98%" },
    ],
    relatedServices: ["carpentry", "basements", "renovations"],
  },
  {
    id: "showers",
    title: "Custom Showers & Steam Showers",
    description: "Custom-designed showers including luxury steam showers with premium finishes. We create your perfect bathroom retreat.",
    icon: "shower",
    details: [
      "Custom shower design and installation",
      "Steam shower systems",
      "Premium tile and stone finishes",
      "Accessibility features and grab bars",
      "Waterproofing and sealing",
      "Custom niches and storage",
    ],
    benefits: [
      "Complete waterproofing system for leak-free showers",
      "Custom design tailored to your space and style",
      "Premium materials and fixtures",
      "Accessibility features for aging in place",
      "Steam system installation and integration",
    ],
    process: [
      {
        step: 1,
        title: "Design Consultation",
        description: "We discuss your vision, measure your space, and create a custom design that maximizes functionality and style.",
      },
      {
        step: 2,
        title: "Material Selection",
        description: "Choose from premium tiles, stones, fixtures, and steam systems that match your budget and design goals.",
      },
      {
        step: 3,
        title: "Professional Installation",
        description: "Expert waterproofing, tile installation, and fixture mounting with attention to every detail.",
      },
      {
        step: 4,
        title: "Quality Assurance",
        description: "Thorough testing of all systems, final inspection, and walkthrough to ensure everything meets our standards.",
      },
    ],
    materials: [
      "Premium Ceramic & Porcelain Tile",
      "Natural Stone (Marble, Granite, Slate)",
      "Glass Tile & Mosaics",
      "Steam Shower Systems",
      "Premium Fixtures & Hardware",
      "Accessibility Features",
    ],
    faqs: [
      {
        question: "How long does a custom shower installation take?",
        answer: "A standard custom shower takes 5-7 days. Steam showers and complex designs may take 10-14 days. We provide detailed timelines during consultation.",
      },
      {
        question: "Do you handle plumbing and electrical?",
        answer: "We coordinate all trades including licensed plumbers and electricians for steam systems, ensuring proper permits and inspections.",
      },
      {
        question: "What's included in waterproofing?",
        answer: "Complete waterproofing system including membrane installation, proper slope, and sealed penetrations to prevent leaks for years to come.",
      },
      {
        question: "Can you convert an existing bathtub to a shower?",
        answer: "Yes, we specialize in tub-to-shower conversions, including proper drainage, waterproofing, and design to maximize your space.",
      },
    ],
    stats: [
      { label: "Showers Installed", value: "420+" },
      { label: "Steam Showers", value: "85+" },
      { label: "Warranty Coverage", value: "10 Years" },
    ],
    relatedServices: ["countertops", "cabinets", "renovations"],
  },
  {
    id: "countertops",
    title: "Countertops",
    description: "Premium countertop materials including granite, quartz, porcelain slab, arborite, stainless steel, and natural stone.",
    icon: "countertop",
    details: [
      "Granite countertops",
      "Quartz countertops",
      "Porcelain slab countertops",
      "Arborite surfaces",
      "Stainless steel countertops",
      "Natural stone (marble, slate)",
      "Concrete countertops",
    ],
    benefits: [
      "Direct relationships with premium suppliers",
      "Expert templating for perfect fit",
      "Professional installation with seamless joints",
      "Edge profile customization",
      "Sink and fixture cutout precision",
    ],
    process: [
      {
        step: 1,
        title: "Material Selection & Templating",
        description: "Choose your material, select edge profiles, and we create precise templates of your space for fabrication.",
      },
      {
        step: 2,
        title: "Fabrication",
        description: "Your countertops are fabricated off-site with precision cutting, edge work, and polishing to perfection.",
      },
      {
        step: 3,
        title: "Installation",
        description: "Professional installation with proper support, leveling, and seamless joint work for a flawless finish.",
      },
      {
        step: 4,
        title: "Final Sealing & Inspection",
        description: "Sealing (where required), final polish, and thorough inspection to ensure perfection.",
      },
    ],
    materials: [
      "Granite",
      "Quartz (All Major Brands)",
      "Porcelain Slab",
      "Arborite/Laminate",
      "Stainless Steel",
      "Natural Marble",
      "Concrete",
      "Butcher Block",
    ],
    faqs: [
      {
        question: "How long does countertop installation take?",
        answer: "From templating to installation typically takes 2-3 weeks. This includes fabrication time. We'll provide exact timelines based on material availability.",
      },
      {
        question: "Do you handle sink and faucet installation?",
        answer: "Yes, we coordinate sink installation and can work with your plumber for faucet installation, ensuring perfect fit and alignment.",
      },
      {
        question: "What's the difference between granite and quartz?",
        answer: "Granite is natural stone requiring periodic sealing, while quartz is engineered and non-porous. Both are excellent choices - we'll help you decide based on your needs.",
      },
      {
        question: "Can you match existing countertops?",
        answer: "We work to find the closest match possible. For exact matches, we recommend bringing a sample or photo during consultation.",
      },
    ],
    stats: [
      { label: "Countertops Installed", value: "680+" },
      { label: "Material Options", value: "50+" },
      { label: "Satisfaction Rate", value: "99%" },
    ],
    relatedServices: ["cabinets", "showers", "renovations"],
  },
  {
    id: "cabinets",
    title: "Cabinets & Millwork",
    description: "Custom cabinet designs in any style or color to match your vision. From kitchens to custom closets and Murphy beds.",
    icon: "cabinet",
    details: [
      "Custom cabinet design (any style or color)",
      "Kitchen cabinets",
      "Bathroom vanities",
      "Custom closets and organization systems",
      "Murphy bed construction",
      "Custom millwork and built-ins",
      "Better pricing than California Closets",
    ],
    benefits: [
      "Fully custom designs in any style or color",
      "Better pricing than big box stores",
      "Premium hardware and soft-close features",
      "Expert installation and alignment",
      "Built to last with quality materials",
    ],
    process: [
      {
        step: 1,
        title: "Design Consultation",
        description: "We discuss your needs, style preferences, and create custom designs that maximize your space and functionality.",
      },
      {
        step: 2,
        title: "Material & Finish Selection",
        description: "Choose from premium materials, finishes, and hardware that match your style and budget.",
      },
      {
        step: 3,
        title: "Fabrication",
        description: "Your custom cabinets are built to exact specifications with attention to detail and quality craftsmanship.",
      },
      {
        step: 4,
        title: "Professional Installation",
        description: "Expert installation with perfect alignment, leveling, and finishing touches for a seamless look.",
      },
    ],
    materials: [
      "Solid Wood",
      "Plywood Construction",
      "MDF with Premium Finishes",
      "Soft-Close Hardware",
      "Custom Organizers",
      "Premium Drawer Slides",
    ],
    faqs: [
      {
        question: "How long does custom cabinet installation take?",
        answer: "From design to installation typically takes 4-6 weeks. Complex projects may take longer. We provide detailed timelines during consultation.",
      },
      {
        question: "Do you offer design services?",
        answer: "Yes, we provide full design consultation to help you maximize space, functionality, and style within your budget.",
      },
      {
        question: "Can you match existing cabinets?",
        answer: "We work to match existing styles and can refinish or build new cabinets to complement your existing space.",
      },
      {
        question: "What's included in the price?",
        answer: "Design, materials, fabrication, installation, and hardware. We provide detailed quotes with no hidden costs.",
      },
    ],
    stats: [
      { label: "Kitchens Completed", value: "520+" },
      { label: "Custom Closets", value: "340+" },
      { label: "Design Options", value: "Unlimited" },
    ],
    relatedServices: ["countertops", "carpentry", "renovations"],
  },
  {
    id: "carpentry",
    title: "Interior Finishing & Carpentry",
    description: "Complete interior finishing including trim, baseboards, casing, doors (hollow and solid), and custom built-ins.",
    icon: "carpentry",
    details: [
      "Trim and baseboards",
      "Casing and door frames",
      "Hollow and solid core doors",
      "MDF built-ins",
      "Custom closets",
      "Interior finishing carpentry",
      "Custom storage solutions",
    ],
    benefits: [
      "Precision craftsmanship in every detail",
      "Premium materials and finishes",
      "Custom solutions for unique spaces",
      "Expert installation and finishing",
      "Seamless integration with existing work",
    ],
    process: [
      {
        step: 1,
        title: "Assessment & Planning",
        description: "We assess your space, discuss your vision, and plan the finishing work to complement your design.",
      },
      {
        step: 2,
        title: "Material Selection",
        description: "Choose from premium trim profiles, door styles, and finishes that match your aesthetic.",
      },
      {
        step: 3,
        title: "Precision Installation",
        description: "Expert installation with perfect miters, seamless joints, and professional finishing.",
      },
      {
        step: 4,
        title: "Final Finishing",
        description: "Caulking, sanding, and touch-up work to ensure a flawless, professional finish.",
      },
    ],
    materials: [
      "Premium MDF Trim",
      "Solid Wood Trim",
      "Hollow & Solid Core Doors",
      "Custom Millwork",
      "Premium Hardware",
      "Various Profiles & Styles",
    ],
    faqs: [
      {
        question: "What's the difference between MDF and solid wood trim?",
        answer: "MDF offers consistent quality and paintability, while solid wood provides natural grain. Both are excellent - we'll recommend based on your needs and budget.",
      },
      {
        question: "Do you paint or finish trim?",
        answer: "Yes, we can paint or stain trim on-site or recommend professional finishing services for the best results.",
      },
      {
        question: "Can you match existing trim styles?",
        answer: "We work to match existing profiles and can source or custom-mill trim to match your existing work.",
      },
      {
        question: "How long does trim installation take?",
        answer: "Most trim projects take 2-5 days depending on scope. We'll provide a detailed timeline during consultation.",
      },
    ],
    stats: [
      { label: "Projects Completed", value: "1,200+" },
      { label: "Trim Styles Available", value: "100+" },
      { label: "Satisfaction Rate", value: "98%" },
    ],
    relatedServices: ["cabinets", "renovations", "flooring"],
  },
  {
    id: "framing",
    title: "Framing",
    description: "Interior renovation framing, wood framing, and commercial steel stud framing. Expert structural work for your project.",
    icon: "framing",
    details: [
      "Interior renovation framing",
      "Wood framing",
      "Commercial steel stud framing",
      "Structural modifications",
      "T-bar ceiling installation",
      "Load-bearing wall modifications",
    ],
    benefits: [
      "Expert structural knowledge and experience",
      "Proper permits and inspections",
      "Code-compliant construction",
      "Precision measurements and layout",
      "Commercial and residential expertise",
    ],
    process: [
      {
        step: 1,
        title: "Structural Assessment",
        description: "We assess your space, review plans, and ensure all structural requirements are met before beginning work.",
      },
      {
        step: 2,
        title: "Permits & Planning",
        description: "We handle all necessary permits and coordinate with inspectors to ensure code compliance.",
      },
      {
        step: 3,
        title: "Precision Framing",
        description: "Expert framing with precise measurements, proper spacing, and structural integrity as the priority.",
      },
      {
        step: 4,
        title: "Inspection & Next Steps",
        description: "Coordinate inspections and prepare framing for the next phase of your project.",
      },
    ],
    materials: [
      "2x4 & 2x6 Lumber",
      "Steel Studs (Commercial)",
      "Engineered Lumber",
      "T-Bar Ceiling Systems",
      "Structural Hardware",
    ],
    faqs: [
      {
        question: "Do you handle permits for structural work?",
        answer: "Yes, we handle all necessary permits and coordinate inspections for structural modifications and new framing.",
      },
      {
        question: "What's the difference between wood and steel stud framing?",
        answer: "Wood framing is standard for residential, while steel studs are common in commercial. We're experts in both and will recommend based on your project.",
      },
      {
        question: "Can you modify load-bearing walls?",
        answer: "Yes, with proper engineering and permits. We assess structural requirements and ensure all modifications are safe and code-compliant.",
      },
      {
        question: "How long does framing take?",
        answer: "Most framing projects take 3-7 days depending on scope. Complex structural work may take longer. We provide detailed timelines.",
      },
    ],
    stats: [
      { label: "Framing Projects", value: "580+" },
      { label: "Commercial Projects", value: "120+" },
      { label: "Code Compliance", value: "100%" },
    ],
    relatedServices: ["drywall", "renovations", "commercial"],
  },
  {
    id: "drywall",
    title: "Drywall, Taping & Ceiling Texture",
    description: "Professional drywall installation, taping, mudding, and ceiling texture work. Smooth finishes that make your space shine.",
    icon: "drywall",
    details: [
      "Drywall installation",
      "Taping and mudding",
      "Ceiling texture (various styles)",
      "Smooth finish options",
      "Repair and patching",
      "Soundproofing options",
    ],
    benefits: [
      "Flawless finish with professional techniques",
      "Multiple texture options available",
      "Expert patching that disappears",
      "Soundproofing solutions",
      "Smooth Level 5 finishes available",
    ],
    process: [
      {
        step: 1,
        title: "Installation",
        description: "Professional drywall hanging with proper spacing, screw placement, and attention to detail.",
      },
      {
        step: 2,
        title: "Taping & Mudding",
        description: "Expert taping and multiple coats of mud with proper sanding between coats for seamless joints.",
      },
      {
        step: 3,
        title: "Texture Application",
        description: "Apply your chosen texture style (knockdown, orange peel, smooth, etc.) with professional techniques.",
      },
      {
        step: 4,
        title: "Final Sanding & Inspection",
        description: "Final sanding, touch-ups, and inspection to ensure a perfect finish ready for paint.",
      },
    ],
    materials: [
      "Standard & Moisture-Resistant Drywall",
      "Fire-Rated Drywall",
      "Soundproofing Drywall",
      "Various Texture Materials",
      "Premium Joint Compound",
    ],
    faqs: [
      {
        question: "What texture options do you offer?",
        answer: "We offer smooth, orange peel, knockdown, skip trowel, and custom textures. We'll show you samples during consultation.",
      },
      {
        question: "How long does drywall work take?",
        answer: "Most drywall projects take 3-5 days including installation, taping, and texture. Larger projects may take longer.",
      },
      {
        question: "Can you patch existing drywall?",
        answer: "Yes, we specialize in seamless patching that blends perfectly with existing walls, making repairs invisible.",
      },
      {
        question: "What's a Level 5 finish?",
        answer: "A Level 5 finish is the smoothest possible drywall finish, perfect for high-end projects. We'll discuss if it's right for your project.",
      },
    ],
    stats: [
      { label: "Drywall Projects", value: "950+" },
      { label: "Texture Styles", value: "8+" },
      { label: "Satisfaction Rate", value: "97%" },
    ],
    relatedServices: ["framing", "painting", "renovations"],
  },
  {
    id: "painting",
    title: "Interior & Exterior Painting",
    description: "Professional painting services including all types of painting, specialty coatings, and waterproofing solutions.",
    icon: "paint",
    details: [
      "Interior painting",
      "Exterior painting",
      "Specialty coatings",
      "Waterproofing and sealants",
      "Color consultation",
      "Surface preparation and priming",
    ],
    benefits: [
      "Expert surface preparation for lasting results",
      "Premium paint products and application",
      "Color consultation services",
      "Interior and exterior expertise",
      "Specialty coatings for unique needs",
    ],
    process: [
      {
        step: 1,
        title: "Surface Preparation",
        description: "Thorough cleaning, sanding, patching, and priming to ensure the perfect foundation for paint.",
      },
      {
        step: 2,
        title: "Color Selection",
        description: "Color consultation to help you choose the perfect shades that complement your space and style.",
      },
      {
        step: 3,
        title: "Professional Application",
        description: "Expert application using premium techniques and tools for smooth, even coverage.",
      },
      {
        step: 4,
        title: "Final Inspection & Cleanup",
        description: "Thorough inspection, touch-ups, and complete cleanup leaving your space ready to enjoy.",
      },
    ],
    materials: [
      "Premium Interior Paints",
      "Exterior Weather-Resistant Paints",
      "Specialty Coatings",
      "Primers & Sealers",
      "Waterproofing Solutions",
    ],
    faqs: [
      {
        question: "Do you provide color consultation?",
        answer: "Yes, we offer color consultation to help you choose colors that work with your space, lighting, and style preferences.",
      },
      {
        question: "How long does a painting project take?",
        answer: "Most interior projects take 2-5 days depending on size. Exterior projects vary based on weather and surface area.",
      },
      {
        question: "What paint brands do you use?",
        answer: "We use premium paint brands and can work with your preferred brand. We'll recommend the best products for your project.",
      },
      {
        question: "Do you handle wallpaper removal?",
        answer: "Yes, we provide wallpaper removal and surface preparation services as part of our painting services.",
      },
    ],
    stats: [
      { label: "Projects Painted", value: "1,100+" },
      { label: "Color Consultations", value: "650+" },
      { label: "Satisfaction Rate", value: "98%" },
    ],
    relatedServices: ["drywall", "renovations", "carpentry"],
  },
  {
    id: "basements",
    title: "Basement Developments",
    description: "Complete basement finishing and development services. Transform your basement into usable living space.",
    icon: "basement",
    details: [
      "Basement finishing",
      "Moisture control and waterproofing",
      "Egress windows",
      "Full basement development",
      "Permits and inspections",
      "Electrical and plumbing rough-ins",
    ],
    benefits: [
      "Complete turnkey basement development",
      "Expert moisture control and waterproofing",
      "Permit handling and code compliance",
      "Full trade coordination",
      "Maximize your home's value",
    ],
    process: [
      {
        step: 1,
        title: "Design & Planning",
        description: "We assess your basement, discuss your vision, and create a plan that maximizes space and functionality.",
      },
      {
        step: 2,
        title: "Permits & Moisture Control",
        description: "Handle all permits, install proper moisture barriers, and ensure your basement is ready for finishing.",
      },
      {
        step: 3,
        title: "Framing & Rough-Ins",
        description: "Framing, electrical, and plumbing rough-ins coordinated with licensed trades.",
      },
      {
        step: 4,
        title: "Finishing & Completion",
        description: "Drywall, flooring, paint, and all finishing work to complete your new living space.",
      },
    ],
    materials: [
      "Moisture-Resistant Materials",
      "Egress Windows",
      "Insulation & Vapor Barriers",
      "Premium Flooring Options",
      "Custom Lighting Solutions",
    ],
    faqs: [
      {
        question: "How long does basement development take?",
        answer: "Complete basement developments typically take 6-12 weeks depending on size and complexity. We provide detailed timelines during consultation.",
      },
      {
        question: "Do you handle permits?",
        answer: "Yes, we handle all necessary permits and coordinate inspections throughout the development process.",
      },
      {
        question: "What about moisture issues?",
        answer: "We thoroughly assess and address moisture issues before finishing, including proper waterproofing and drainage solutions.",
      },
      {
        question: "Can you add a bathroom or kitchenette?",
        answer: "Yes, we coordinate all trades for adding bathrooms, kitchenettes, or other features to your basement development.",
      },
    ],
    stats: [
      { label: "Basements Developed", value: "280+" },
      { label: "Square Feet Finished", value: "150,000+" },
      { label: "Value Added", value: "$15M+" },
    ],
    relatedServices: ["framing", "drywall", "flooring", "carpentry"],
  },
  {
    id: "garages",
    title: "Garages, Decks & Fences",
    description: "Garage construction, deck building, and fence installation. Quality outdoor structures built to last.",
    icon: "garage",
    details: [
      "Garage construction",
      "Deck building and design",
      "Fence installation",
      "Outdoor structures",
      "Permits and planning",
      "Material selection and consultation",
    ],
    benefits: [
      "Built to last with quality materials",
      "Permit handling and code compliance",
      "Expert design for functionality",
      "Weather-resistant construction",
      "Increase property value",
    ],
    process: [
      {
        step: 1,
        title: "Design & Permits",
        description: "We design your structure, handle permits, and ensure all plans meet local building codes.",
      },
      {
        step: 2,
        title: "Site Preparation",
        description: "Proper site preparation including grading, foundation work, and material delivery.",
      },
      {
        step: 3,
        title: "Construction",
        description: "Expert construction with attention to structural integrity, weather resistance, and finishing details.",
      },
      {
        step: 4,
        title: "Final Inspection & Completion",
        description: "Coordinate final inspections and ensure your structure is ready for years of enjoyment.",
      },
    ],
    materials: [
      "Pressure-Treated Lumber",
      "Composite Decking",
      "Cedar & Premium Woods",
      "Vinyl & Aluminum Fencing",
      "Metal & Chain Link Options",
    ],
    faqs: [
      {
        question: "Do you handle permits for garages and decks?",
        answer: "Yes, we handle all necessary permits and ensure all structures meet local building codes and regulations.",
      },
      {
        question: "What materials do you recommend for decks?",
        answer: "We recommend pressure-treated lumber for budget-friendly options, or composite decking for low-maintenance luxury. We'll discuss all options.",
      },
      {
        question: "How long does deck construction take?",
        answer: "Most deck projects take 5-10 days depending on size and complexity. We provide detailed timelines during consultation.",
      },
      {
        question: "Can you match existing structures?",
        answer: "Yes, we work to match existing garages, decks, or fences to maintain consistency with your property.",
      },
    ],
    stats: [
      { label: "Structures Built", value: "320+" },
      { label: "Decks Constructed", value: "180+" },
      { label: "Satisfaction Rate", value: "97%" },
    ],
    relatedServices: ["framing", "renovations", "stone"],
  },
  {
    id: "stone",
    title: "Natural Stone & Stone Setting",
    description: "Expert natural stone installation including marble, granite, slate, and custom stone setting for countertops and surfaces.",
    icon: "stone",
    details: [
      "Marble installation",
      "Granite installation",
      "Slate installation",
      "Natural stone countertops",
      "Stone setting and fabrication",
      "Custom stone work",
    ],
    benefits: [
      "Expert stone selection and sourcing",
      "Precision cutting and fabrication",
      "Professional installation techniques",
      "Sealing and maintenance guidance",
      "Custom stone work available",
    ],
    process: [
      {
        step: 1,
        title: "Stone Selection",
        description: "We help you select the perfect stone from our premium suppliers, considering durability, maintenance, and aesthetics.",
      },
      {
        step: 2,
        title: "Templating & Fabrication",
        description: "Precise templating and expert fabrication including cutting, edge work, and polishing.",
      },
      {
        step: 3,
        title: "Installation",
        description: "Professional installation with proper support, leveling, and seamless joint work.",
      },
      {
        step: 4,
        title: "Sealing & Care Instructions",
        description: "Proper sealing (where required) and detailed care instructions to maintain your stone's beauty.",
      },
    ],
    materials: [
      "Marble",
      "Granite",
      "Slate",
      "Quartzite",
      "Limestone",
      "Travertine",
    ],
    faqs: [
      {
        question: "How do I maintain natural stone?",
        answer: "We provide detailed care instructions. Most natural stone requires periodic sealing. We'll explain maintenance based on your specific stone.",
      },
      {
        question: "What's the difference between marble and granite?",
        answer: "Marble is softer and more porous, requiring more care. Granite is harder and more durable. We'll help you choose based on your needs.",
      },
      {
        question: "Can you repair damaged stone?",
        answer: "Yes, we provide stone repair services including polishing, filling, and restoration to bring damaged stone back to life.",
      },
      {
        question: "How long does stone installation take?",
        answer: "From selection to installation typically takes 3-4 weeks including fabrication time. We provide detailed timelines.",
      },
    ],
    stats: [
      { label: "Stone Projects", value: "240+" },
      { label: "Stone Types Available", value: "20+" },
      { label: "Satisfaction Rate", value: "99%" },
    ],
    relatedServices: ["countertops", "showers", "renovations"],
  },
  {
    id: "renovations",
    title: "Home Additions & Full Home Renovations",
    description: "Complete home renovations and additions. From single rooms to full home transformations, we handle it all.",
    icon: "renovation",
    details: [
      "Home additions",
      "Full home renovations",
      "Kitchen renovations",
      "Bathroom renovations",
      "Multi-room renovations",
      "Project management",
    ],
    benefits: [
      "Complete project management",
      "Full trade coordination",
      "Permit handling and inspections",
      "Quality control throughout",
      "Minimize disruption to your life",
    ],
    process: [
      {
        step: 1,
        title: "Planning & Design",
        description: "Comprehensive planning, design consultation, and detailed project scope to ensure your vision becomes reality.",
      },
      {
        step: 2,
        title: "Permits & Preparation",
        description: "Handle all permits, coordinate trades, and prepare your home for renovation work.",
      },
      {
        step: 3,
        title: "Construction & Coordination",
        description: "Expert project management coordinating all trades, maintaining quality, and keeping you informed throughout.",
      },
      {
        step: 4,
        title: "Final Walkthrough & Completion",
        description: "Comprehensive final walkthrough, addressing any concerns, and ensuring your complete satisfaction.",
      },
    ],
    materials: [
      "All Construction Materials",
      "Premium Finishes",
      "Custom Solutions",
      "Energy-Efficient Options",
    ],
    faqs: [
      {
        question: "How long does a full home renovation take?",
        answer: "Renovation timelines vary significantly based on scope. A kitchen might take 6-8 weeks, while a full home renovation could take 3-6 months. We provide detailed timelines.",
      },
      {
        question: "Do you handle all trades?",
        answer: "Yes, we coordinate all trades including plumbing, electrical, HVAC, and more, ensuring seamless project execution.",
      },
      {
        question: "Can I live in my home during renovation?",
        answer: "In most cases, yes. We work to minimize disruption and can discuss temporary solutions for major renovations.",
      },
      {
        question: "What's included in project management?",
        answer: "Complete coordination of all trades, scheduling, quality control, permit handling, and regular communication throughout your project.",
      },
    ],
    stats: [
      { label: "Renovations Completed", value: "450+" },
      { label: "Home Additions", value: "85+" },
      { label: "Satisfaction Rate", value: "98%" },
    ],
    relatedServices: ["cabinets", "countertops", "flooring", "showers"],
  },
  {
    id: "commercial",
    title: "Commercial & Multi-Unit Construction",
    description: "Extensive experience in commercial construction and multi-unit building projects. We bring the same quality to commercial work.",
    icon: "commercial",
    details: [
      "Commercial construction",
      "Multi-unit building projects",
      "Commercial renovations",
      "Office build-outs",
      "Retail space construction",
      "Steel stud framing for commercial",
    ],
    benefits: [
      "Commercial construction expertise",
      "Code compliance and permit handling",
      "Minimal business disruption",
      "Quality work on schedule",
      "Multi-unit project experience",
    ],
    process: [
      {
        step: 1,
        title: "Project Planning",
        description: "Comprehensive planning, code review, and coordination with stakeholders to ensure project success.",
      },
      {
        step: 2,
        title: "Permits & Approvals",
        description: "Handle all commercial permits, inspections, and approvals required for your project.",
      },
      {
        step: 3,
        title: "Construction & Coordination",
        description: "Expert project management coordinating all trades while minimizing disruption to your business operations.",
      },
      {
        step: 4,
        title: "Final Inspection & Handover",
        description: "Coordinate final inspections and ensure smooth handover with all documentation and warranties.",
      },
    ],
    materials: [
      "Commercial-Grade Materials",
      "Steel Stud Framing",
      "Fire-Rated Materials",
      "Code-Compliant Systems",
    ],
    faqs: [
      {
        question: "Do you work during business hours?",
        answer: "We can work around your business schedule, including after-hours and weekend work to minimize disruption.",
      },
      {
        question: "What commercial projects have you completed?",
        answer: "We've completed office build-outs, retail spaces, multi-unit buildings, and various commercial renovations. We can provide references.",
      },
      {
        question: "How do you handle code compliance?",
        answer: "We ensure all work meets commercial building codes, handle all permits, and coordinate with inspectors throughout the project.",
      },
      {
        question: "Can you work on occupied buildings?",
        answer: "Yes, we're experienced in working in occupied commercial spaces, taking measures to minimize disruption and maintain safety.",
      },
    ],
    stats: [
      { label: "Commercial Projects", value: "120+" },
      { label: "Multi-Unit Buildings", value: "35+" },
      { label: "On-Time Completion", value: "95%" },
    ],
    relatedServices: ["framing", "drywall", "renovations"],
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getRelatedServices(serviceIds: string[]): Service[] {
  return services.filter((s) => serviceIds.includes(s.id));
}
