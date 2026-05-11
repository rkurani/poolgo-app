/**
 * Routines for /routines page. Two flavors:
 *  - Active: triggered + currently running on Lin's pool
 *  - Suggested: proposed based on her equipment + recent chemistry
 *  - Library: generic templates anyone might use
 *
 * A routine has a trigger ("when"), one or more actions ("do"), and a
 * source-of-control (homeowner-defined, AI-suggested, pro-suggested).
 */

export type RoutineSource = "homeowner" | "ai" | "pro" | "library";

export type RoutineAction = {
  system: "pump" | "heater" | "salt" | "blower" | "lights" | "cleaner" | "message";
  label: string; // human-readable: "Pump → Stage A · 1100 RPM"
};

export type Routine = {
  id: string;
  name: string;
  trigger: string; // "Every weekday at 6:00 AM"
  triggerKind: "schedule" | "threshold" | "weather" | "event" | "manual";
  actions: RoutineAction[];
  source: RoutineSource;
  status?: "running" | "paused" | "proposed" | "template";
  category: "daily" | "social" | "away" | "weather" | "health" | "service";
  lastRun?: string;
  nextRun?: string;
  blurb?: string;
};

export const ACTIVE_ROUTINES: Routine[] = [
  {
    id: "morning-circulate",
    name: "Morning circulate",
    trigger: "Every day, 6:00 AM",
    triggerKind: "schedule",
    actions: [
      { system: "pump", label: "Pump → Stage A, 1100 RPM" },
      { system: "salt", label: "Salt cell → 40% output" },
    ],
    source: "homeowner",
    status: "running",
    category: "daily",
    lastRun: "Today 6:00 AM",
    nextRun: "Tomorrow 6:00 AM",
    blurb: "Wakes the pool gently. Light circulation + low salt output to start the day clean.",
  },
  {
    id: "afternoon-filter",
    name: "Midday filter",
    trigger: "Every day, 11:30 AM to 2:00 PM",
    triggerKind: "schedule",
    actions: [
      { system: "pump", label: "Pump → Stage C, 2400 RPM" },
      { system: "cleaner", label: "Polaris 9650iQ → run cycle" },
    ],
    source: "homeowner",
    status: "running",
    category: "daily",
    lastRun: "Today 11:30 AM",
    nextRun: "Tomorrow 11:30 AM",
    blurb: "High-flow filter pass with the cleaner piggybacking on the same circulation.",
  },
  {
    id: "evening-low",
    name: "Evening wind-down",
    trigger: "Every day, 6:00 PM to 10:00 PM",
    triggerKind: "schedule",
    actions: [
      { system: "pump", label: "Pump → Stage A, 1100 RPM" },
      { system: "lights", label: "Pool lights → warm white, 40%" },
    ],
    source: "homeowner",
    status: "running",
    category: "daily",
    lastRun: "Yesterday 6:00 PM",
    nextRun: "Today 6:00 PM",
    blurb: "Soft circulation, warm pool lights so the deck is usable after sunset.",
  },
  {
    id: "cya-watchdog",
    name: "CYA threshold watchdog",
    trigger: "When CYA reading climbs past 50 ppm",
    triggerKind: "threshold",
    actions: [
      { system: "message", label: "Message Carlos: 'schedule partial drain'" },
    ],
    source: "ai",
    status: "running",
    category: "health",
    lastRun: "Triggered May 8 (current CYA 42 ppm)",
    blurb: "AI watches CYA drift. When it climbs past 50, it pings Carlos with a partial drain ask before the next visit.",
  },
];

export const SUGGESTED_ROUTINES: Routine[] = [
  {
    id: "guest-warmup",
    name: "Heat for guests",
    trigger: "Friday at 2:00 PM, if 'guests' tag on Saturday",
    triggerKind: "event",
    actions: [
      { system: "heater", label: "Heater → pool mode, target 84°F" },
      { system: "pump", label: "Pump → Stage B until heater shuts off" },
    ],
    source: "ai",
    status: "proposed",
    category: "social",
    blurb: "When Saturday has a 'guests' calendar tag, the pool warms up Friday afternoon so it hits 84°F by Saturday morning. Tagged via your Calendar or by typing 'guests Sat' here.",
  },
  {
    id: "storm-prep",
    name: "Post-storm clean",
    trigger: "After any rain >0.5 inch in the forecast",
    triggerKind: "weather",
    actions: [
      { system: "pump", label: "Pump → Stage C for 60 minutes" },
      { system: "cleaner", label: "Polaris 9650iQ → run full cycle" },
      { system: "message", label: "Photo prompt: 'send a pic of the deck'" },
    ],
    source: "ai",
    status: "proposed",
    category: "weather",
    blurb: "Pulls the National Weather Service feed for 92373. When rain >0.5 inch is forecast, a high-flow clean runs the morning after.",
  },
  {
    id: "filter-pressure-watch",
    name: "Filter pressure watchdog",
    trigger: "When sand filter pressure climbs >+5 PSI over baseline",
    triggerKind: "threshold",
    actions: [
      { system: "message", label: "Message Carlos: 'schedule backwash this visit'" },
    ],
    source: "pro",
    status: "proposed",
    category: "service",
    blurb: "Carlos suggested this one. Sand filter baseline is 14 PSI clean. Past 19 PSI means backwash is due. Auto-flags on his next visit ticket.",
  },
  {
    id: "vacation-hold",
    name: "Vacation hold",
    trigger: "Manual toggle, runs until 'home'",
    triggerKind: "manual",
    actions: [
      { system: "pump", label: "Pump → Stage A minimum, 30%" },
      { system: "salt", label: "Salt cell → 30% output" },
      { system: "heater", label: "Heater → off" },
      { system: "lights", label: "Lights → off" },
    ],
    source: "library",
    status: "proposed",
    category: "away",
    blurb: "Hold pattern for vacations. Carlos still visits Tuesdays. Toggle 'home' on return to resume normal schedules.",
  },
];

export const LIBRARY_ROUTINES: Routine[] = [
  {
    id: "lib-spa-warmup",
    name: "Spa at sunset",
    trigger: "Every day, 30 minutes before sunset",
    triggerKind: "schedule",
    actions: [
      { system: "heater", label: "Heater → spa mode, 102°F" },
      { system: "blower", label: "Blower → on, 80% when target met" },
    ],
    source: "library",
    status: "template",
    category: "social",
    blurb: "Spa is hot and bubbling when the sun goes down.",
  },
  {
    id: "lib-saturday-social",
    name: "Saturday social",
    trigger: "Saturday, 4:00 PM to 10:00 PM",
    triggerKind: "schedule",
    actions: [
      { system: "heater", label: "Heater → pool mode, 86°F" },
      { system: "pump", label: "Pump → Stage B" },
      { system: "lights", label: "Lights → cycle, 80%" },
      { system: "blower", label: "Blower → ready, on request" },
    ],
    source: "library",
    status: "template",
    category: "social",
    blurb: "Standing Saturday afternoon plan. Skip the manual setup.",
  },
  {
    id: "lib-frost-protect",
    name: "Frost protect",
    trigger: "When overnight low forecast <38°F",
    triggerKind: "weather",
    actions: [
      { system: "pump", label: "Pump → Stage C through the cold hours" },
    ],
    source: "library",
    status: "template",
    category: "weather",
    blurb: "Keeps water moving so plumbing doesn't freeze on rare cold snaps.",
  },
  {
    id: "lib-low-salt-alert",
    name: "Low-salt alert",
    trigger: "When salinity drops below 2,800 ppm",
    triggerKind: "threshold",
    actions: [
      { system: "message", label: "Add salt to Tuesday's pickup list at Leslie's" },
    ],
    source: "library",
    status: "template",
    category: "health",
    blurb: "Salt drift is normal. This catches it before the cell warns.",
  },
];
