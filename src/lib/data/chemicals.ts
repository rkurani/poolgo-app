/**
 * Chemical SKU catalog — the products a ClearCare-using pool store carries.
 * In production this is sourced from the store's POS / ClearCare product table.
 */
export type Chemical = {
  sku: string;
  name: string;
  category: "chlorine" | "balancers" | "shock" | "algae" | "metals" | "specialty";
  unit: string;
  price: number;
  swatch: string;
};

export const CHEMICALS: Record<string, Chemical> = {
  "CHL-TAB-3": { sku: "CHL-TAB-3", name: "3\" Chlorine Tablets, 25 lb", category: "chlorine", unit: "bucket", price: 119.99, swatch: "#3ad0d6" },
  "CAL-HYP":   { sku: "CAL-HYP",   name: "Cal Hypo Shock, 1 lb",        category: "shock",    unit: "bag",    price: 7.99,   swatch: "#1ab8d3" },
  "PHOS-RM":   { sku: "PHOS-RM",   name: "Phosphate Remover, 32 oz",    category: "specialty", unit: "bottle", price: 24.99, swatch: "#f0883a" },
  "CYA-RED":   { sku: "CYA-RED",   name: "CYA Reducer, 2 lb",           category: "specialty", unit: "bag",    price: 39.99, swatch: "#d6178d" },
  "PH-DOWN":   { sku: "PH-DOWN",   name: "pH Down (Dry Acid), 8 lb",    category: "balancers", unit: "bag",    price: 18.99, swatch: "#26b574" },
  "PH-UP":     { sku: "PH-UP",     name: "pH Up (Soda Ash), 5 lb",      category: "balancers", unit: "bag",    price: 14.99, swatch: "#26b574" },
  "ALK-UP":    { sku: "ALK-UP",    name: "Total Alkalinity Up, 5 lb",   category: "balancers", unit: "bag",    price: 16.99, swatch: "#26b574" },
  "CH-UP":     { sku: "CH-UP",     name: "Calcium Hardness Up, 4 lb",   category: "balancers", unit: "bag",    price: 17.99, swatch: "#26b574" },
  "ALG-30":    { sku: "ALG-30",    name: "Algaecide 30, 32 oz",         category: "algae",     unit: "bottle", price: 22.99, swatch: "#f0883a" },
  "MET-OUT":   { sku: "MET-OUT",   name: "Metal Out, 1 quart",          category: "metals",    unit: "bottle", price: 19.99, swatch: "#d6178d" },
};

export function getChemical(sku: string): Chemical | null {
  return CHEMICALS[sku] ?? null;
}
