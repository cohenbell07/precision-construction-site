import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Brand configuration - modular for easy future rebranding
// Update these constants to change brand name site-wide
export const COMPANY_NAME = "Precision Construction & Decora Inc.";
export const COMPANY_NAME_SHORT = "Precision Construction & Decora";

// Brand configuration - easy to rename
export const BRAND_CONFIG = {
  name: COMPANY_NAME,
  shortName: COMPANY_NAME_SHORT,
  motto: "Expect Only The Best",
  tagline: "Family-Owned Since 1968 | Serving Calgary Since 1997",
  description: "A 3rd generation, family-owned and operated Calgary construction company. We treat every client like family and deliver only the best in service, quality, and satisfaction.",
  owner: "John Olivito",
  established: 1968,
  servingSince: 1997,
  contact: {
    email: process.env.CONTACT_EMAIL || "johnpcnd@gmail.com",
    phone: "403-818-7767",
    phoneFormatted: "(403) 818-7767",
    address: "Calgary, AB and Surrounding Areas",
    cta: "Call or Email to Book a Consultation",
  },
};

