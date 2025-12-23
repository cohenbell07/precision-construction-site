export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  details?: string[];
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
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

