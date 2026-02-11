export interface ProductQuoteField {
  id: string;
  label: string;
  type: "text" | "select" | "textarea";
  optional?: boolean;
  placeholder?: string;
  options?: string[];
}

export interface ProductCategoryConfig {
  title: string;
  fields: ProductQuoteField[];
}

export const productQuoteConfig: Record<string, ProductCategoryConfig> = {
  flooring: {
    title: "Flooring",
    fields: [
      {
        id: "sqft",
        label: "Approximate square footage",
        type: "text",
        placeholder: "e.g. 500 sqft",
        optional: true,
      },
      {
        id: "rooms",
        label: "Room(s)",
        type: "text",
        placeholder: "e.g. basement, kitchen, main floor",
        optional: true,
      },
      {
        id: "material",
        label: "Material type of interest",
        type: "select",
        options: ["LVP", "Hardwood", "Tile", "Carpet", "Laminate", "Other"],
        optional: true,
      },
      {
        id: "subfloor",
        label: "Subfloor / space type",
        type: "select",
        options: ["New construction", "Existing floor", "Basement", "Over concrete", "Other"],
        optional: true,
      },
      {
        id: "need",
        label: "What do you need?",
        type: "select",
        options: ["Supply only", "Install only", "Supply + Install", "Other"],
        optional: true,
      },
    ],
  },
  countertops: {
    title: "Countertops",
    fields: [
      {
        id: "linearFt",
        label: "Approximate linear footage",
        type: "text",
        placeholder: "e.g. 25 linear ft",
        optional: true,
      },
      {
        id: "material",
        label: "Material type of interest",
        type: "select",
        options: ["Quartz", "Granite", "Porcelain slab", "Marble", "Laminate", "Stainless steel", "Butcher block", "Other"],
        optional: true,
      },
      {
        id: "cutouts",
        label: "Cutouts needed",
        type: "text",
        placeholder: "e.g. 1 sink, 1 cooktop",
        optional: true,
      },
      {
        id: "edge",
        label: "Edge profile preference",
        type: "select",
        options: ["Standard", "Beveled", "Bullnose", "Ogee", "Waterfall", "Other"],
        optional: true,
      },
      {
        id: "need",
        label: "What do you need?",
        type: "select",
        options: ["Supply only", "Supply + Install", "Other"],
        optional: true,
      },
    ],
  },
  cabinets: {
    title: "Cabinets",
    fields: [
      {
        id: "quantity",
        label: "Number of cabinets / linear feet",
        type: "text",
        placeholder: "e.g. 15 cabinets or 25 linear ft",
        optional: true,
      },
      {
        id: "style",
        label: "Cabinet style",
        type: "select",
        options: ["Shaker", "Flat panel", "Raised panel", "Beadboard", "Custom", "Other"],
        optional: true,
      },
      {
        id: "room",
        label: "Room",
        type: "select",
        options: ["Kitchen", "Bathroom", "Laundry", "Garage", "Other"],
        optional: true,
      },
      {
        id: "finish",
        label: "Finish preference",
        type: "select",
        options: ["Painted", "Stained", "Natural wood", "Two-tone", "Other"],
        optional: true,
      },
      {
        id: "need",
        label: "What do you need?",
        type: "select",
        options: ["Supply only", "Supply + Install", "Other"],
        optional: true,
      },
    ],
  },
  "interior-finishing": {
    title: "Interior Finishing",
    fields: [
      {
        id: "type",
        label: "Product type",
        type: "select",
        options: ["Interior doors", "Baseboards", "Crown molding", "Trim & casing", "Stair parts", "Other"],
        optional: true,
      },
      {
        id: "quantity",
        label: "Approximate quantity",
        type: "text",
        placeholder: "e.g. 8 doors, 200 ft of baseboard",
        optional: true,
      },
      {
        id: "style",
        label: "Style preference",
        type: "select",
        options: ["Shaker", "Panel", "Modern flat", "Traditional", "Other"],
        optional: true,
      },
      {
        id: "need",
        label: "What do you need?",
        type: "select",
        options: ["Supply only", "Supply + Install", "Other"],
        optional: true,
      },
    ],
  },
  windows: {
    title: "Windows",
    fields: [
      {
        id: "count",
        label: "Number of windows",
        type: "text",
        placeholder: "e.g. 6",
        optional: true,
      },
      {
        id: "projectType",
        label: "Project type",
        type: "select",
        options: ["Replacement windows", "New construction", "Both", "Other"],
        optional: true,
      },
      {
        id: "style",
        label: "Window style",
        type: "select",
        options: ["Double-hung", "Casement", "Sliding", "Picture", "Bay/Bow", "Other"],
        optional: true,
      },
      {
        id: "sizes",
        label: "Approximate sizes (if known)",
        type: "text",
        placeholder: "e.g. 36x48, 24x36",
        optional: true,
      },
      {
        id: "need",
        label: "What do you need?",
        type: "select",
        options: ["Supply only", "Supply + Install", "Other"],
        optional: true,
      },
    ],
  },
  exterior: {
    title: "Exterior Products",
    fields: [
      {
        id: "type",
        label: "Product type",
        type: "select",
        options: ["Siding", "Fascia & soffit", "Gutters", "Roofing materials", "Exterior trim", "Other"],
        optional: true,
      },
      {
        id: "area",
        label: "Approximate area or linear footage",
        type: "text",
        placeholder: "e.g. 1500 sqft siding, 100 ft fascia",
        optional: true,
      },
      {
        id: "material",
        label: "Material preference",
        type: "select",
        options: ["Vinyl", "Fiber cement", "Wood", "Metal", "Stone veneer", "Other"],
        optional: true,
      },
      {
        id: "need",
        label: "What do you need?",
        type: "select",
        options: ["Supply only", "Supply + Install", "Other"],
        optional: true,
      },
    ],
  },
  bathroom: {
    title: "Bathroom Fixtures",
    fields: [
      {
        id: "type",
        label: "Fixture type",
        type: "select",
        options: ["Bathtub", "Shower enclosure", "Vanity", "Toilet", "Faucets", "Tile", "Other"],
        optional: true,
      },
      {
        id: "configuration",
        label: "Size / configuration",
        type: "text",
        placeholder: "e.g. 60\" tub, double vanity",
        optional: true,
      },
      {
        id: "style",
        label: "Style preference",
        type: "select",
        options: ["Modern", "Traditional", "Transitional", "Other"],
        optional: true,
      },
      {
        id: "need",
        label: "What do you need?",
        type: "select",
        options: ["Supply only", "Supply + Install", "Other"],
        optional: true,
      },
    ],
  },
  hardware: {
    title: "Hardware",
    fields: [
      {
        id: "type",
        label: "Hardware type",
        type: "select",
        options: ["Cabinet hardware", "Door handles/locks", "Hinges & slides", "Rails & rods", "Organizers", "Other"],
        optional: true,
      },
      {
        id: "quantity",
        label: "Approximate quantity",
        type: "text",
        placeholder: "e.g. 25 pulls, 6 door handles",
        optional: true,
      },
      {
        id: "finish",
        label: "Finish preference",
        type: "select",
        options: ["Brushed nickel", "Chrome", "Matte black", "Bronze", "Brass", "Other"],
        optional: true,
      },
    ],
  },
  paint: {
    title: "Paint & Finishes",
    fields: [
      {
        id: "type",
        label: "Product type",
        type: "select",
        options: ["Interior paint", "Exterior paint", "Stain", "Primer/sealer", "Tools & supplies", "Other"],
        optional: true,
      },
      {
        id: "area",
        label: "Area / rooms",
        type: "text",
        placeholder: "e.g. whole house, 3 bedrooms, deck",
        optional: true,
      },
      {
        id: "brand",
        label: "Brand preference (if any)",
        type: "text",
        placeholder: "e.g. Benjamin Moore, Sherwin-Williams",
        optional: true,
      },
    ],
  },
  commercial: {
    title: "Commercial Materials",
    fields: [
      {
        id: "type",
        label: "Material type",
        type: "select",
        options: ["Ceiling tiles/grid", "Fire-rated panels", "Acoustic materials", "Commercial flooring", "Doors & hardware", "Other"],
        optional: true,
      },
      {
        id: "projectType",
        label: "Project type",
        type: "select",
        options: ["Office", "Retail", "Healthcare", "Education", "Industrial", "Other"],
        optional: true,
      },
      {
        id: "area",
        label: "Approximate area",
        type: "text",
        placeholder: "e.g. 5000 sqft",
        optional: true,
      },
    ],
  },
};

export function getProductCategoryBySlug(slug: string): ProductCategoryConfig | undefined {
  return productQuoteConfig[slug];
}

export function getProductSlugFromTitle(title: string): string {
  const mapping: Record<string, string> = {
    "Flooring": "flooring",
    "Countertops": "countertops",
    "Cabinets": "cabinets",
    "Interior Finishing": "interior-finishing",
    "Windows": "windows",
    "Exterior Products": "exterior",
    "Bathroom Fixtures": "bathroom",
    "Hardware": "hardware",
    "Paint & Finishes": "paint",
    "Commercial Materials": "commercial",
  };
  return mapping[title] ?? title.toLowerCase().replace(/\s+/g, "-");
}
