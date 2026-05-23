import type { Brand } from "@/lib/types";

/**
 * Pool equipment per homeowner. In production, each entry comes from a
 * separate OEM integration (Pentair Connect, Hayward OmniLogic, Polaris iAquaLink)
 * or is manually entered by the store at install/service time. The `data-brand`
 * attribute carries the OEM color cascade on render — see DESIGN.md.
 */
export type EquipmentKind =
  | "pump"
  | "filter"
  | "heater"
  | "salt-cell"
  | "cleaner"
  | "automation";

export type Equipment = {
  id: string;
  customerId: string;
  brand: Brand;
  kind: EquipmentKind;
  model: string;
  installedAt: string;
  ageYears: number;
  status: "running" | "needs-attention" | "offline";
  detail: string;
};

export const EQUIPMENT: Equipment[] = [
  // Glenn
  { id: "EQ-001", customerId: "C-1001", brand: "pentair",   kind: "pump",       model: "IntelliFlo3 VSF",     installedAt: "2023-04-12", ageYears: 3, status: "running",         detail: "Running schedule 8a–4p · 2,400 RPM" },
  { id: "EQ-002", customerId: "C-1001", brand: "hayward",   kind: "salt-cell",  model: "AquaRite T-Cell-15",  installedAt: "2021-05-22", ageYears: 5, status: "needs-attention", detail: "80% cell life remaining · cleaning due" },
  { id: "EQ-003", customerId: "C-1001", brand: "pentair",   kind: "filter",     model: "Quad DE 60",          installedAt: "2023-04-12", ageYears: 3, status: "running",         detail: "Pressure 12 psi · clean 90 days ago" },
  { id: "EQ-004", customerId: "C-1001", brand: "polaris",   kind: "cleaner",    model: "9550 Sport",          installedAt: "2024-06-03", ageYears: 2, status: "running",         detail: "Runs Mon/Wed/Fri 9–11a" },
  // Maria
  { id: "EQ-005", customerId: "C-1002", brand: "hayward",   kind: "pump",       model: "Super Pump VS",       installedAt: "2018-08-09", ageYears: 8, status: "running",         detail: "Single-speed · consider VS upgrade" },
  { id: "EQ-006", customerId: "C-1002", brand: "raypak",    kind: "heater",     model: "Digital 406A",        installedAt: "2019-03-15", ageYears: 7, status: "running",         detail: "Set to 84°F" },
  // Jordan
  { id: "EQ-007", customerId: "C-1003", brand: "pentair",   kind: "pump",       model: "IntelliFlo3 VSF",     installedAt: "2024-04-01", ageYears: 2, status: "running",         detail: "Variable speed · daytime priority" },
  { id: "EQ-008", customerId: "C-1003", brand: "pentair",   kind: "automation", model: "IntelliCenter i10P",  installedAt: "2024-04-01", ageYears: 2, status: "running",         detail: "Connected · iOS push enabled" },
  { id: "EQ-009", customerId: "C-1003", brand: "jandy",     kind: "heater",     model: "Pro Series JXi",      installedAt: "2023-05-19", ageYears: 3, status: "running",         detail: "Heating to 86°F on schedule" },
  // Sue
  { id: "EQ-010", customerId: "C-1004", brand: "hayward",   kind: "pump",       model: "TriStar 950",         installedAt: "2017-06-21", ageYears: 9, status: "running",         detail: "Single-speed · pre-2021 install" },
  { id: "EQ-011", customerId: "C-1004", brand: "hayward",   kind: "filter",     model: "Pro-Grid DE 4820",    installedAt: "2017-06-21", ageYears: 9, status: "needs-attention", detail: "Pressure 22 psi · backwash recommended" },
];

export function equipmentFor(customerId: string): Equipment[] {
  return EQUIPMENT.filter((e) => e.customerId === customerId);
}
