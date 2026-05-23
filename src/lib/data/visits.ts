/**
 * Service visits and store touchpoints. In production these come from the
 * service-tech app (Skimmer, Pool Brain, Pool Route Ops) or are logged at the
 * pool store counter when the customer brings in a sample.
 */
export type VisitKind = "water-test" | "service-visit" | "delivery" | "in-store";

export type Visit = {
  id: string;
  customerId: string;
  kind: VisitKind;
  date: string;
  by: string;
  summary: string;
};

export const VISITS: Visit[] = [
  // Glenn
  { id: "V-001", customerId: "C-1001", kind: "water-test",    date: "2026-04-28", by: "Royal Pools",         summary: "Counter water test — CYA flagged high" },
  { id: "V-002", customerId: "C-1001", kind: "delivery",      date: "2026-04-28", by: "Royal Pools",         summary: "Bought Phosphate Remover (1)" },
  { id: "V-003", customerId: "C-1001", kind: "water-test",    date: "2026-04-14", by: "Royal Pools",         summary: "Counter water test — balanced" },
  { id: "V-004", customerId: "C-1001", kind: "water-test",    date: "2026-03-30", by: "Royal Pools",         summary: "Counter water test — CYA climbing" },
  { id: "V-005", customerId: "C-1001", kind: "water-test",    date: "2026-03-16", by: "Royal Pools",         summary: "Counter water test — balanced" },
  { id: "V-006", customerId: "C-1001", kind: "in-store",      date: "2026-03-22", by: "Royal Pools",         summary: "Bought 3\" Chlorine Tablets" },
  // Maria
  { id: "V-007", customerId: "C-1002", kind: "water-test",    date: "2026-03-09", by: "Royal Pools",         summary: "Counter water test — chlorine low" },
  { id: "V-008", customerId: "C-1002", kind: "in-store",      date: "2026-03-09", by: "Royal Pools",         summary: "Bought Cal Hypo Shock (2)" },
  // Jordan
  { id: "V-009", customerId: "C-1003", kind: "water-test",    date: "2026-05-04", by: "Royal Pools",         summary: "Counter water test — balanced" },
  { id: "V-010", customerId: "C-1003", kind: "service-visit", date: "2026-04-25", by: "Mike's Pool Service", summary: "Salt cell cleaning · IntelliCenter firmware update" },
  { id: "V-011", customerId: "C-1003", kind: "water-test",    date: "2026-04-20", by: "Royal Pools",         summary: "Counter water test — balanced" },
  // Sue
  { id: "V-012", customerId: "C-1004", kind: "water-test",    date: "2026-02-12", by: "Royal Pools",         summary: "Counter water test — phosphate high, pH elevated" },
  { id: "V-013", customerId: "C-1004", kind: "in-store",      date: "2026-02-12", by: "Royal Pools",         summary: "Bought pH Down (1)" },
  { id: "V-014", customerId: "C-1004", kind: "in-store",      date: "2026-01-08", by: "Royal Pools",         summary: "Bought 3\" Chlorine Tablets" },
];

export function visitsFor(customerId: string): Visit[] {
  return VISITS.filter((v) => v.customerId === customerId).sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
}
