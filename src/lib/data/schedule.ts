import type { ScheduleEvent } from "@/lib/types";

// 24h schedule rows with bands positioned by start/duration in minutes
// Track is fluid; bands use percent positions computed at render time.
// startMinute = minutes from midnight, durationMinutes = duration.
export const schedule: ScheduleEvent[] = [
  {
    system: "pump",
    systemLabel: "PUMP",
    caption: "5:30 → 11:30 · 6h",
    brand: "pentair",
    startMinute: 330,
    durationMinutes: 360,
  },
  {
    system: "filter",
    systemLabel: "FILTER",
    caption: "runs with pump",
    brand: "hayward",
    startMinute: 330,
    durationMinutes: 360,
    opacity: 0.55,
  },
  {
    system: "heater",
    systemLabel: "HEATER",
    caption: "5:00 PM warm-up",
    brand: "hayward",
    startMinute: 1020,
    durationMinutes: 30,
  },
  {
    system: "salt",
    systemLabel: "SALT CELL",
    caption: "60% during pump",
    brand: "pentair",
    startMinute: 330,
    durationMinutes: 360,
    opacity: 0.5,
  },
  {
    system: "blower",
    systemLabel: "BLOWER",
    caption: "no run today",
    brand: "pentair",
    // no band today
  },
];
