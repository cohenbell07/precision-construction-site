/**
 * Product categories and structure for the Products page.
 * Shared with AI chat for context when user is on /products.
 */

export interface ProductCategory {
  id: string;
  title: string;
  productTypes: string[];
  subtitle: string;
}

export const productCategories: ProductCategory[] = [
  {
    id: "flooring",
    title: "Flooring",
    productTypes: [
      "Luxury Vinyl Plank (LVP)",
      "Carpet",
      "Tile",
      "Porcelain",
      "Hardwood",
      "Laminate",
      "Marmoleum",
      "Natural Stone",
    ],
    subtitle: "Brand-name vinyl, hardwood, laminate, carpet, and more.",
  },
  {
    id: "countertops",
    title: "Countertops",
    productTypes: [
      "Quartz",
      "Granite",
      "Porcelain Slab",
      "Marble",
      "Laminate",
      "Stainless Steel",
    ],
    subtitle: "Quartz, granite, porcelain slab, stainless steel, and beyond.",
  },
  {
    id: "cabinets",
    title: "Cabinets",
    productTypes: [
      "Kitchen Cabinets",
      "Bathroom Vanities",
      "Custom Built-ins",
      "Cabinet Hardware",
    ],
    subtitle: "Custom cabinetry in all wood species, styles, and finishes.",
  },
  {
    id: "interior-finishing",
    title: "Interior Finishing",
    productTypes: [
      "Doors",
      "Trim",
      "Baseboards",
      "Crown Molding",
      "Window Trim",
    ],
    subtitle: "Door kits, baseboards, trims, and full finish packages.",
  },
  {
    id: "windows",
    title: "Windows",
    productTypes: ["Sliding", "Double-Hung", "Casement", "Energy Star"],
    subtitle: "Energy-efficient windows in all styles.",
  },
  {
    id: "exterior",
    title: "Exterior Products",
    productTypes: ["Siding", "Fascia", "Soffits", "Roofing Materials"],
    subtitle: "Siding, fascia, soffit, and cladding.",
  },
  {
    id: "bathroom",
    title: "Bathroom Fixtures",
    productTypes: [
      "Bathtubs",
      "Steam Showers",
      "Vanities",
      "Faucets",
      "Tile",
    ],
    subtitle: "Tubs, vanities, shower kits, large-format tile.",
  },
  {
    id: "hardware",
    title: "Hardware",
    productTypes: [
      "Cabinet Hinges",
      "Drawer Slides",
      "Cabinet Handles",
      "Door Hardware",
    ],
    subtitle: "Hinges, drawer slides, rails, and custom handles.",
  },
  {
    id: "paint",
    title: "Paint & Finishes",
    productTypes: ["Interior Paint", "Exterior Paint", "Stain", "Specialty Coatings"],
    subtitle: "Interior and exterior paint from top brands.",
  },
  {
    id: "commercial",
    title: "Commercial Materials",
    productTypes: [
      "Fire-Rated Board",
      "T-bar Ceilings",
      "Acoustic Materials",
      "Commercial Flooring",
    ],
    subtitle: "T-bar ceilings, fire-rated panels, acoustic materials.",
  },
];

/** Format product categories for the AI chat system prompt. */
export function getProductCategoriesForChatPrompt(): string {
  return productCategories
    .map(
      (c) =>
        `- ${c.title}: ${c.productTypes.slice(0, 5).join(", ")}${c.productTypes.length > 5 ? ", ..." : ""}`
    )
    .join("\n");
}
