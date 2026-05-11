/**
 * Per-unit data for /equipment/[slug] dynamic detail pages.
 * IntelliFlo3 has its own hand-tuned page at /equipment/intelliflo3.
 * The other four units flow through the dynamic template.
 */

export type EquipmentUnit = {
  slug: string;
  unit: string;
  vendor: string;
  brand: "pentair" | "hayward" | "polaris" | "jandy" | "raypak" | "suncountry";
  brandTone: string;
  brandSoft: string;
  category: "filtration" | "sanitation" | "heating" | "circulation" | "spa";
  status: "live" | "imported" | "human" | "off";
  statusLabel: string;
  blurb: string;
  liveStats: { label: string; value: string; caption: string }[];
  scheduleNotes: string[];
  history: { date: string; actor: string; note: string }[];
  partsLink: string; // canonical garage item id
};

export const EQUIPMENT_UNITS: EquipmentUnit[] = [
  {
    slug: "hayward-sand-filter",
    unit: "Hayward sand filter",
    vendor: "Hayward",
    brand: "hayward",
    brandTone: "var(--color-hayward, #D8A700)",
    brandSoft: "var(--color-hayward-soft, #FBF1D0)",
    category: "filtration",
    status: "imported",
    statusLabel: "Backwash soon",
    blurb:
      "Hayward Pro Series S244T sand filter. The workhorse downstream of the pump. Pressure has climbed +4 PSI since the last backwash, which means another week or two before it needs servicing. Last rebed was March 2022, due for a fresh sand load within the year.",
    liveStats: [
      { label: "Pressure", value: "18 PSI", caption: "Baseline 14, threshold 19" },
      { label: "Flow", value: "62 GPM", caption: "Pool loop, post-filter" },
      { label: "Days since backwash", value: "27", caption: "Typical cycle 30-40" },
      { label: "Years since rebed", value: "3.1", caption: "Rebed every 4-5 yrs" },
    ],
    scheduleNotes: [
      "Tied to the pump's run window. Filter is active whenever the pump is on.",
      "Backwash performed manually during pro visits. Carlos handles on Tuesdays.",
    ],
    history: [
      { date: "May 3", actor: "Carlos M.", note: "Backwash + rinse. Pressure 14 → 18 over 27 days." },
      { date: "Apr 5", actor: "Carlos M.", note: "Backwash. Sand still grading well." },
      { date: "Mar 1", actor: "Live", note: "Pressure sensor calibrated, baseline locked at 14 PSI." },
    ],
    partsLink: "sand",
  },
  {
    slug: "hayward-heater",
    unit: "Hayward heater",
    vendor: "Hayward",
    brand: "hayward",
    brandTone: "var(--color-hayward, #D8A700)",
    brandSoft: "var(--color-hayward-soft, #FBF1D0)",
    category: "heating",
    status: "live",
    statusLabel: "Heating",
    blurb:
      "Hayward H400FDN natural gas heater, 400k BTU. Pool mode target 84°F. Warming the pool right now in preparation for the evening swim window. 4° to go, ETA around 24 minutes at current ramp rate.",
    liveStats: [
      { label: "Mode", value: "Pool", caption: "Pool body, not spa" },
      { label: "Target", value: "84°F", caption: "From the schedule" },
      { label: "Current", value: "80°F", caption: "Reading from the IntelliCenter probe" },
      { label: "ETA to target", value: "~24 min", caption: "At 0.17°F per minute" },
    ],
    scheduleNotes: [
      "Pool mode at 5:00 PM target, set in the daily schedule.",
      "Spa mode triggered on demand by the 'Spa at sunset' library routine.",
    ],
    history: [
      { date: "Today", actor: "Live", note: "Ignition cycle 9, started warm-up at 4:32 PM." },
      { date: "May 8", actor: "Carlos M.", note: "Annual inspection. Burner, igniter, thermistor all healthy." },
      { date: "Apr 1", actor: "Solcoast", note: "Pressure switch replacement. Original part age-related fail." },
    ],
    partsLink: "intelliflo-capacitor",
  },
  {
    slug: "intellichlor-ic40",
    unit: "IntelliChlor IC40",
    vendor: "Pentair",
    brand: "pentair",
    brandTone: "var(--color-pentair, #1A4F8B)",
    brandSoft: "var(--color-pentair-soft, #E5ECF4)",
    category: "sanitation",
    status: "live",
    statusLabel: "Generating",
    blurb:
      "Pentair IntelliChlor IC40 salt-chlorine generator inline with the pump. Generating chlorine at 60% output, salinity sitting at 3,200 ppm which is right in the middle of the band. Cell life at 78%, replacement due in roughly 14 months at current usage.",
    liveStats: [
      { label: "Output", value: "60%", caption: "Schedule-driven, daylight hours" },
      { label: "Cell life", value: "78%", caption: "Replace at ~10% remaining" },
      { label: "Salinity", value: "3,200 ppm", caption: "Target band 2,800-3,400" },
      { label: "Flow switch", value: "OK", caption: "Last self-test 4 days ago" },
    ],
    scheduleNotes: [
      "Output controlled by the IntelliCenter. Pegged at 60% during the pump's run window.",
      "Low-salt alert wired through the 'Low-salt alert' library routine, threshold 2,800 ppm.",
    ],
    history: [
      { date: "Today", actor: "Live", note: "Cell health check passed. 60% output sustained." },
      { date: "May 8", actor: "Carlos M.", note: "Visual cell inspection. Plates clean, no scaling visible." },
      { date: "Feb 14", actor: "Solcoast", note: "Flow switch replacement. Original part 4yr lifespan." },
    ],
    partsLink: "intellichlor-flowswitch",
  },
  {
    slug: "blower",
    unit: "Blower",
    vendor: "Pentair",
    brand: "pentair",
    brandTone: "var(--color-pentair, #1A4F8B)",
    brandSoft: "var(--color-pentair-soft, #E5ECF4)",
    category: "spa",
    status: "off",
    statusLabel: "Standby",
    blurb:
      "Pentair EQK500 silent air blower for the spa side. Currently off and standing by. Last run was the weekend social on May 4. Runs ~3 hours per week on average when the spa is used.",
    liveStats: [
      { label: "Status", value: "Off", caption: "Spa not requested" },
      { label: "Last run", value: "May 4", caption: "2.5 hours" },
      { label: "Lifetime hours", value: "421", caption: "Rated for 5,000+ hours" },
      { label: "Air flow check", value: "OK", caption: "Last test on Apr 28 service" },
    ],
    scheduleNotes: [
      "Blower wakes when 'Spa at sunset' or 'Saturday social' routines fire.",
      "Manual on/off from the IntelliCenter app or the wall switch on the deck.",
    ],
    history: [
      { date: "May 4", actor: "Live", note: "2.5hr run for Saturday social. Auto-shutoff at 9:30 PM." },
      { date: "Apr 28", actor: "Carlos M.", note: "Intake filter cleaning. Lubricated motor bearings." },
      { date: "Mar 12", actor: "Live", note: "Auto-test passed. No air-flow anomalies detected." },
    ],
    partsLink: "intelliflo-capacitor",
  },
];

export function getUnit(slug: string): EquipmentUnit | undefined {
  return EQUIPMENT_UNITS.find((u) => u.slug === slug);
}
