import type { ChemistryReading } from "@/lib/types";

export const vitals: ChemistryReading[] = [
  {
    chemical: "Free chlorine",
    value: "2.4",
    unit: "ppm",
    status: "in-range",
    statusLabel: "In range · target 1–3",
    source: "imported",
  },
  {
    chemical: "pH",
    value: "7.4",
    status: "in-range",
    statusLabel: "In range · target 7.2–7.6",
    source: "imported",
  },
  {
    chemical: "Alkalinity",
    value: "90",
    unit: "ppm",
    status: "in-range",
    statusLabel: "In range · target 80–120",
    source: "imported",
  },
  {
    chemical: "Cyanuric acid",
    value: "42",
    unit: "ppm",
    trend: "up",
    status: "climbing",
    statusLabel: "Climbing · partial drain Tue",
    source: "imported",
  },
];

// 14 days of CYA readings (most imported, one human service event)
export const cyaHistory: { day: string; value: number; source: "imported" | "human" | "live" }[] = [
  { day: "APR 25", value: 78, source: "imported" },
  { day: "APR 26", value: 92, source: "imported" },
  { day: "APR 27", value: 88, source: "imported" },
  { day: "APR 28", value: 102, source: "imported" },
  { day: "APR 29", value: 60, source: "human" },
  { day: "APR 30", value: 84, source: "imported" },
  { day: "MAY 1", value: 90, source: "imported" },
  { day: "MAY 2", value: 88, source: "imported" },
  { day: "MAY 3", value: 96, source: "imported" },
  { day: "MAY 4", value: 102, source: "imported" },
  { day: "MAY 5", value: 96, source: "imported" },
  { day: "MAY 6", value: 82, source: "imported" },
  { day: "MAY 7", value: 92, source: "imported" },
  { day: "MAY 8", value: 122, source: "imported" },
];
