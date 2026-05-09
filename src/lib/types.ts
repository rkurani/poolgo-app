/**
 * Brand identifiers map to OEM color tokens via [data-brand]. See
 * globals.css for the per-brand --brand-accent / --brand-soft variables.
 */
export type Brand =
  | "pentair"
  | "hayward"
  | "polaris"
  | "jandy"
  | "raypak"
  | "leslies"
  | "suncountry"
  | "pinch"
  | "marina"
  // independent businesses (each carries their own color)
  | "foothill"
  | "bluedrop"
  | "ridgeline"
  | "westshore"
  | "plaster"
  | "heater"
  | "capleak";

export type SourceKind = "live" | "imported" | "human" | "ai";

export type ProCategory =
  | "service-weekly"
  | "service-repair"
  | "builder"
  | "specialist-plaster"
  | "specialist-heater"
  | "specialist-leak";

export type Pro = {
  id: string;
  brand: Brand;
  name: string;
  city: string;
  distanceMi: number;
  category: ProCategory;
  categoryLabel: string;
  services: string[];
  ratingStars: number;
  reviewCount: number;
  vouchCount: number;
  neighborsUsing: number;
  price: string;
  priceCadence?: string;
  ctaLabel?: string;
};

export type Store = {
  id: string;
  brand: "suncountry" | "leslies" | "pinch";
  name: string;
  city: string;
  distanceMi: number;
  kind: "Independent" | "Big-box chain" | "Franchise";
  isPrimary?: boolean;
  services: string[];
  carries: { brand: Brand; label: string; swatch: string }[];
  hours: string;
  staffNote: string;
};

export type Specialist = {
  id: string;
  brand: Brand;
  name: string;
  category: string;
  distanceMi: number;
  description: string;
  ctaLabel: string;
};

export type FilterKey =
  | "all"
  | "service"
  | "stores"
  | "builders"
  | "repair"
  | "plaster";
