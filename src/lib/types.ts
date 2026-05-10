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

// ---------- iter 6+ types (My Pool, Care, Equipment) ----------

export type Pool = {
  id: string;
  name: string;
  gallons: number;
  finish: string; // "plaster", "pebble"
  sanitizer: string; // "salt", "chlorine"
  city: string;
  zip: string;
  currentTempF: number;
  targetTempF?: number;
  weatherToday: string;
  status: "healthy" | "watch" | "alert";
  statusLabel: string;
  thumbSrc: string;
};

export type EquipmentSystem =
  | "pump"
  | "filter"
  | "heater"
  | "salt"
  | "blower";

export type EquipmentTile = {
  id: string;
  system: EquipmentSystem;
  brand: Brand;
  oemLabel: string;       // "PENTAIR" caps
  state: SourceKind | "off" | "warn"; // status dot + caps
  stateLabel: string;     // "LIVE" / "WARN" / "OFF" / "HEATING"
  // big middle line — comma-pattern
  primary: string;        // "Pump, circulating"
  secondary: string;      // "until 11:30 AM"
  // tertiary technical
  technical: string;      // "STAGE B · 1,750 RPM"
  selected?: boolean;     // true = bold OEM-color fill
};

export type ChemistryReading = {
  chemical: string;       // "Free chlorine"
  value: string;          // "2.4"
  unit?: string;          // "ppm"
  trend?: "up" | "down";
  status: "in-range" | "climbing" | "low" | "high";
  statusLabel: string;    // "In range · target 1–3"
  source: SourceKind;
};

export type ScheduleEvent = {
  system: EquipmentSystem;
  systemLabel: string;    // "PUMP"
  caption: string;        // "5:30 → 11:30 · 6h"
  brand: Brand;
  // 0..1440 minutes from midnight
  startMinute?: number;
  durationMinutes?: number;
  opacity?: number;
};

export type ActivityEntry = {
  id: string;
  date: string;           // "7:42 AM" or "YESTERDAY" or "WED APR 26"
  source: SourceKind;
  // avatar — either initials text + brand-soft fill, or image logo
  avatarKind: "initials" | "logo";
  avatarText?: string;    // "S·C" / "CV" / "RK"
  avatarBrand?: Brand;
  avatarLogoSrc?: string; // "/assets/pentair.jpg"
  shape: "circle" | "square"; // people = circle, business = square
  title: string;
  sub: string;
};

export type Scene = {
  id: string;
  name: string;
  scheduleHint: string;   // "EVENING · 6:00 PM"
  gradientFrom: string;   // hex
  gradientTo: string;
  gradientMid?: string;
  settings: string[];     // 3 lines of "Pump · Stage B · Filter on"
  isActive?: boolean;
};

// connector flow
export type Connector = {
  id: "pentair" | "hayward" | "polaris" | "leslies";
  brand: Brand;
  label: string;          // "Sign in with Pentair Home"
  description: string;    // "IntelliFlo3 pump · IntelliChlor salt cell · MasterTemp heater"
  logoSrc: string;
  href: string;           // "/connect/pentair"
  variant: "bold" | "soft"; // bold = full OEM color, soft = cream
};
