// Better, more specific icons for services and products
import {
  // Lucide icons - more specific and better representation
  Grid3x3,
  Droplets,
  RectangleHorizontal,
  Boxes,
  Hammer,
  Layout,
  Square,
  Paintbrush,
  Home,
  Car,
  AppWindow,
  Building2,
  Bath,
  Wrench,
  Layers,
  Package,
  ArrowRight,
} from "lucide-react";

// Service icon mapping - better, more specific icons
export const serviceIcons: { [key: string]: any } = {
  flooring: Grid3x3, // Better representation of flooring/tiles
  showers: Droplets, // Better than generic Drop
  cabinets: Boxes, // Better representation of cabinets/storage
  countertops: RectangleHorizontal, // Better than Rectangle
  carpentry: Hammer, // Better than Wrench for carpentry
  framing: Layout, // Better than Buildings for framing
  drywall: Square, // Better than Wall
  painting: Paintbrush, // Good as is
  basements: Home, // Better than Buildings
  garages: Car, // Much better than Buildings
  stone: Layers, // Better for stone/countertops
  renovations: Building2, // Better for renovations
  commercial: Building2, // Good for commercial
  default: Package, // Default fallback
};

// Product category icon mapping
export const productIcons: { [key: string]: any } = {
  flooring: Grid3x3,
  countertops: RectangleHorizontal,
  cabinets: Boxes,
  "interior-finishing": Hammer,
  windows: AppWindow,
  exterior: Building2, // Better than Buildings
  bathroom: Bath, // Better than Drop
  hardware: Wrench, // Good as is
};

export { ArrowRight };

