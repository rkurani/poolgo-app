/**
 * Customer (homeowner) records. In production these are created by the
 * ClearCare counter intake or auto-provisioned when the homeowner first
 * follows a token link (lazy onboarding).
 *
 * Test chemistry follows ClearCare's reading format. Recommendations are
 * what ClearCare's chemistry model outputs for each test — chemical SKU +
 * suggested quantity + plain-English note.
 */
import type { Chemical } from "./chemicals";

export type WaterTest = {
  date: string;
  ph: number;
  chlorine: number;
  alk: number;
  ch: number;
  cya: number;
  phosphate: number;
};

export type Recommendation = {
  sku: string;
  quantity: number;
  note: string;
};

export type Purchase = {
  date: string;
  sku: string;
  quantity: number;
};

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  poolGallons: number;
  poolType: string;
  poolSurface: string;
  lifetimeSpend: number;
  totalVisits: number;
  tags: ("vip" | "weekly-tester" | "lapsed" | "new")[];
  tests: WaterTest[];
  lastRecommendations: Recommendation[];
  purchases: Purchase[];
};

export const CUSTOMERS: Record<string, Customer> = {
  "C-1001": {
    id: "C-1001",
    firstName: "Glenn",
    lastName: "Beck",
    email: "glenn.beck@example.com",
    phone: "+13215551042",
    city: "Cocoa Beach, FL",
    address: "412 Banyan Way",
    poolGallons: 18500,
    poolType: "Inground",
    poolSurface: "Plaster",
    lifetimeSpend: 4820,
    totalVisits: 38,
    tags: ["weekly-tester"],
    tests: [
      { date: "2026-04-28", ph: 7.2, chlorine: 1.8, alk: 90, ch: 230, cya: 95, phosphate: 180 },
      { date: "2026-04-14", ph: 7.4, chlorine: 2.1, alk: 95, ch: 235, cya: 92, phosphate: 150 },
      { date: "2026-03-30", ph: 7.3, chlorine: 2.0, alk: 92, ch: 230, cya: 88, phosphate: 130 },
      { date: "2026-03-16", ph: 7.5, chlorine: 2.2, alk: 95, ch: 230, cya: 80, phosphate: 110 },
      { date: "2026-03-02", ph: 7.4, chlorine: 2.0, alk: 90, ch: 225, cya: 72, phosphate: 95 },
      { date: "2026-02-16", ph: 7.6, chlorine: 1.9, alk: 92, ch: 230, cya: 68, phosphate: 80 },
    ],
    lastRecommendations: [
      { sku: "CYA-RED", quantity: 1, note: "Partial drain + refill, then dose. Re-test in 7 days." },
      { sku: "PHOS-RM", quantity: 1, note: "Knock the phosphates down before they fuel algae." },
    ],
    purchases: [
      { date: "2026-04-28", sku: "PHOS-RM",   quantity: 1 },
      { date: "2026-03-22", sku: "CHL-TAB-3", quantity: 1 },
      { date: "2026-02-08", sku: "CHL-TAB-3", quantity: 1 },
    ],
  },

  "C-1002": {
    id: "C-1002",
    firstName: "Maria",
    lastName: "Vargas",
    email: "mvargas@example.com",
    phone: "+13215552210",
    city: "Melbourne, FL",
    address: "88 Coral Reef Dr",
    poolGallons: 14000,
    poolType: "Inground",
    poolSurface: "Pebble",
    lifetimeSpend: 1240,
    totalVisits: 12,
    tags: ["lapsed"],
    tests: [
      { date: "2026-03-09", ph: 7.6, chlorine: 0.4, alk: 70, ch: 180, cya: 35, phosphate: 220 },
    ],
    lastRecommendations: [
      { sku: "CAL-HYP", quantity: 2, note: "Shock the pool to bring chlorine back up to 3+ ppm." },
      { sku: "ALK-UP",  quantity: 1, note: "Alkalinity slightly low — buffer it before the pH swings." },
    ],
    purchases: [
      { date: "2026-03-09", sku: "CAL-HYP", quantity: 2 },
    ],
  },

  "C-1003": {
    id: "C-1003",
    firstName: "Jordan",
    lastName: "Patel",
    email: "jpatel@example.com",
    phone: "+13215553301",
    city: "Vero Beach, FL",
    address: "210 Tradewinds Ln",
    poolGallons: 22000,
    poolType: "Inground",
    poolSurface: "Plaster",
    lifetimeSpend: 6210,
    totalVisits: 47,
    tags: ["vip", "weekly-tester"],
    tests: [
      { date: "2026-05-04", ph: 7.5, chlorine: 2.4, alk: 100, ch: 260, cya: 50, phosphate: 90 },
      { date: "2026-04-20", ph: 7.4, chlorine: 2.6, alk: 95, ch: 250, cya: 48, phosphate: 80 },
      { date: "2026-04-06", ph: 7.5, chlorine: 2.5, alk: 100, ch: 255, cya: 45, phosphate: 75 },
      { date: "2026-03-23", ph: 7.4, chlorine: 2.4, alk: 95, ch: 250, cya: 42, phosphate: 70 },
    ],
    lastRecommendations: [
      { sku: "CHL-TAB-3", quantity: 1, note: "Keep the tab feeder topped up — your chlorine is dialed in." },
    ],
    purchases: [
      { date: "2026-05-04", sku: "CHL-TAB-3", quantity: 1 },
      { date: "2026-04-20", sku: "ALG-30",    quantity: 1 },
      { date: "2026-03-23", sku: "CHL-TAB-3", quantity: 1 },
    ],
  },

  "C-1004": {
    id: "C-1004",
    firstName: "Sue",
    lastName: "Hartman",
    email: "hartman.pool@example.com",
    phone: "+13215554477",
    city: "Sebastian, FL",
    address: "55 Lighthouse Rd",
    poolGallons: 16500,
    poolType: "Inground",
    poolSurface: "Plaster",
    lifetimeSpend: 3380,
    totalVisits: 24,
    tags: ["lapsed"],
    tests: [
      { date: "2026-02-12", ph: 7.8, chlorine: 0.6, alk: 130, ch: 320, cya: 110, phosphate: 350 },
    ],
    lastRecommendations: [
      { sku: "PHOS-RM",  quantity: 2, note: "Phosphate is at algae-feeding levels — knock it down now." },
      { sku: "PH-DOWN",  quantity: 1, note: "pH is creeping high — drop it back toward 7.4." },
      { sku: "ALG-30",   quantity: 1, note: "Prophylactic algaecide while you correct the phosphate." },
    ],
    purchases: [
      { date: "2026-02-12", sku: "PH-DOWN",   quantity: 1 },
      { date: "2026-01-08", sku: "CHL-TAB-3", quantity: 1 },
    ],
  },
};

export function getCustomer(id: string): Customer | null {
  return CUSTOMERS[id] ?? null;
}

export function customersByTenant(): Customer[] {
  return Object.values(CUSTOMERS);
}
