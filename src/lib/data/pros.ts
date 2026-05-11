/**
 * Pro profile data for the /folks/[slug] dynamic route.
 *
 * Carlos has his own hand-tuned static page at /folks/carlos-redlands.
 * The businesses (Velasquez Build, RedHawk, Solcoast) flow through the
 * dynamic template since they share a business-profile shape.
 */

export type ProService = {
  title: string;
  body: string;
  price: string;
};

export type ProRoute = {
  area: string;
  cadence: string;
};

export type ProActivity = {
  customer: string;
  when: string;
  detail: string;
};

export type ProReview = {
  rating: number;
  body: string;
  author: string;
};

export type ProProfile = {
  slug: string;
  business: string;
  lead: string;
  leadRole: string;
  portrait: string | null;
  brandTone: string;
  brandSoft: string;
  tagline: string;
  status: {
    text: string;
    tone: "live" | "imported" | "human";
  };
  fleet: string;
  stats: { label: string; value: string }[];
  blurb: string;
  services: ProService[];
  routes: ProRoute[];
  partnerships: string[];
  activity: ProActivity[];
  reviews: ProReview[];
  ctaTitle: string;
  ctaDate: string;
  ctaTime: string;
};

export const PROS: ProProfile[] = [
  {
    slug: "velasquez-build",
    business: "Velasquez Build",
    lead: "Maria Velasquez",
    leadRole: "Master builder",
    portrait: "/assets/folks/maria-portrait.png",
    brandTone: "var(--color-citrus, #E8A82C)",
    brandSoft: "#F8EFD6",
    tagline: "Gunite shells, plaster, tile. Twelve-week build calendar, full crew.",
    status: { text: "Booking Q3, 2 slots open", tone: "imported" },
    fleet: "4 trucks · 12 crew",
    stats: [
      { label: "Years building", value: "18" },
      { label: "Pools built", value: "412" },
      { label: "On-time delivery", value: "94%" },
    ],
    blurb:
      "Maria has been building pools in San Bernardino County since 2008. Velasquez Build does ground-up gunite shells, plaster swaps, and tile remodels. The crew runs four-person teams that finish a typical new build in 10 to 12 weeks weather permitting. Maria personally walks every project at three checkpoints: rough plumbing, plaster cure, and final commissioning.",
    services: [
      {
        title: "New gunite pool build",
        body: "Excavation, steel, gunite shell, plumbing, decking, plaster, commissioning. 10 to 14 weeks.",
        price: "from $48k",
      },
      {
        title: "Plaster replacement",
        body: "Acid wash, chip out, new plaster cure. Marcite, Diamond Brite, or Pebble finish.",
        price: "from $7,200",
      },
      {
        title: "Tile and coping remodel",
        body: "New waterline tile, replacement coping stones. Done in a single 3-day visit.",
        price: "from $3,800",
      },
      {
        title: "Equipment pad rebuild",
        body: "Full pad rebuild with new plumbing, valves, control panel. Pentair or Hayward.",
        price: "from $12k",
      },
    ],
    routes: [
      { area: "Redlands, Mentone, Yucaipa", cadence: "Primary build zone" },
      { area: "Highland, San Bernardino", cadence: "Build zone, longer schedule" },
      { area: "Loma Linda, Grand Terrace", cadence: "Quarterly availability" },
      { area: "Banning, Beaumont", cadence: "Limited, 1-2 builds per year" },
    ],
    partnerships: ["Pentair certified", "Hayward authorized", "Diamond Brite installer", "CSLB licensed C-53"],
    activity: [
      {
        customer: "G. on Citrus Ave",
        when: "Last week",
        detail: "New build, plaster cure week 9. Commissioning scheduled.",
      },
      {
        customer: "K. on Oak Glen",
        when: "2 weeks ago",
        detail: "Plaster replacement complete. Final water balance done.",
      },
      {
        customer: "M. on Sunset Dr",
        when: "Last month",
        detail: "Equipment pad rebuild. Pentair IntelliCenter wired and commissioned.",
      },
    ],
    reviews: [
      {
        rating: 5,
        body:
          "Maria built our pool in 2022 and we still get compliments on the tile work. She runs a tight crew and we had zero punch-list items at commissioning. Worth every dollar.",
        author: "G. & R. on Citrus Ave · build delivered Sep 2024",
      },
      {
        rating: 5,
        body:
          "Did our plaster replacement in three days flat. Crew cleaned up every evening. The water clarity after the cure is what sold us on Diamond Brite.",
        author: "K. on Oak Glen · plaster delivered Mar 2026",
      },
    ],
    ctaTitle: "Free build consultation",
    ctaDate: "Tuesday, May 19",
    ctaTime: "Maria walks the property",
  },
  {
    slug: "redhawk-pool-services",
    business: "RedHawk Pool Services",
    lead: "Devon Park",
    leadRole: "Route lead",
    portrait: null,
    brandTone: "var(--color-terracotta, #C75240)",
    brandSoft: "#F4DCDF",
    tagline: "Weekly maintenance route covering Redlands, Yucaipa, and Calimesa. Clean-and-go.",
    status: { text: "Mon · Fri routes", tone: "live" },
    fleet: "3 trucks · 5 cleaners",
    stats: [
      { label: "Active routes", value: "127" },
      { label: "Years running", value: "8" },
      { label: "Same-week response", value: "98%" },
    ],
    blurb:
      "RedHawk runs the highest-density weekly route in Redlands and the surrounding I-10 corridor. Devon took over from the original owner in 2021 and grew the route from 60 to 127 weekly customers. They do clean-and-go only, no dosing, no equipment work. If something is off, they call you, not the cell.",
    services: [
      {
        title: "Weekly maintenance, basic",
        body: "Brush, vacuum, skim, empty baskets, leaf-net the surface. Once a week, same day.",
        price: "$145/mo",
      },
      {
        title: "Weekly maintenance, plus",
        body: "Basic plus filter cleaning every quarter, chemistry log on the door, photo update.",
        price: "$185/mo",
      },
      {
        title: "Vacation service",
        body: "Two visits per week while you're away. Daily skim, leak watch, equipment check.",
        price: "from $80/wk",
      },
      {
        title: "Storm response",
        body: "Post-storm full clean. Debris removal, surface skim, basket clear, photo report.",
        price: "$180/visit",
      },
    ],
    routes: [
      { area: "Redlands central, north, east", cadence: "Mon, Wed, Fri" },
      { area: "Yucaipa, Calimesa", cadence: "Tue, Thu" },
      { area: "Mentone, Forest Falls", cadence: "Fri afternoon" },
      { area: "Loma Linda", cadence: "Wed morning, limited slots" },
    ],
    partnerships: ["Leslie's authorized", "Pentair preferred", "Hayward certified"],
    activity: [
      {
        customer: "Route 14 (East Highland)",
        when: "Yesterday",
        detail: "12 stops complete. Two filters scheduled for backwash next visit.",
      },
      {
        customer: "S. on Citrus",
        when: "2 days ago",
        detail: "Storm response. Pulled 30+ palm fronds out of the pool, brushed plaster.",
      },
      {
        customer: "Route 8 (Calimesa)",
        when: "Last week",
        detail: "All-clean route. Heater run hours noted on door log for two customers.",
      },
    ],
    reviews: [
      {
        rating: 5,
        body:
          "Devon's team has been doing my pool every Friday for two years. I've never had to think about my pool. They take a photo, leave it on the gate, done. Worth it.",
        author: "T. on Cypress Ave · 2 years weekly",
      },
      {
        rating: 4,
        body:
          "Solid weekly route. They don't do chemistry adjustments which is fine because Carlos handles that for me. They communicate when something needs attention.",
        author: "B. on Garden St · 1 year weekly",
      },
    ],
    ctaTitle: "Get on the route",
    ctaDate: "Next Monday",
    ctaTime: "First visit scheduled within the week",
  },
  {
    slug: "solcoast-pool-care",
    business: "Solcoast Pool Care",
    lead: "Tony Reyes",
    leadRole: "Owner & lead tech",
    portrait: null,
    brandTone: "var(--color-marina, #2C5F4A)",
    brandSoft: "#DDE9E2",
    tagline: "Repair and equipment install. Heater rebuilds and salt-cell swaps a specialty.",
    status: { text: "On-call · 24h response", tone: "imported" },
    fleet: "2 trucks · 6 techs",
    stats: [
      { label: "Years repairing", value: "15" },
      { label: "Service calls/yr", value: "1,400" },
      { label: "Same-day rate", value: "73%" },
    ],
    blurb:
      "Solcoast is the call when something on the pad has stopped working. Tony cut his teeth on commercial pools in San Diego and brought that depth back to Redlands in 2018. They keep $40k of inventory on the trucks so most service calls are one-and-done, not two-trip diagnostics.",
    services: [
      {
        title: "Diagnostic visit",
        body: "Full pad walkthrough, equipment test, written diagnosis with parts list and quote.",
        price: "$165",
      },
      {
        title: "Heater rebuild",
        body: "Raypak and Hayward heater rebuilds. Heat exchanger, gas valve, ignition assembly.",
        price: "from $580",
      },
      {
        title: "Salt cell replacement",
        body: "IntelliChlor and AquaRite cell swaps. Includes flow switch test, salinity rebalance.",
        price: "from $410",
      },
      {
        title: "Pump replacement",
        body: "Variable-speed pump installs. Pentair IntelliFlo, Hayward TriStar VS, Jandy ePump.",
        price: "from $1,850",
      },
    ],
    routes: [
      { area: "Redlands, Yucaipa, Calimesa", cadence: "Primary, same-day capable" },
      { area: "San Bernardino, Loma Linda", cadence: "Next-day response" },
      { area: "Highland, Mentone", cadence: "2-day window" },
      { area: "Banning, Beaumont", cadence: "On-route days, schedule ahead" },
    ],
    partnerships: ["Pentair platinum service partner", "Hayward authorized", "Raypak certified", "Jandy authorized"],
    activity: [
      {
        customer: "D. on Olive Ave",
        when: "Yesterday",
        detail: "Raypak 406A heater rebuild. Heat exchanger replaced. 3.5 hours on-site.",
      },
      {
        customer: "L. on Cypress Ave",
        when: "3 days ago",
        detail: "IntelliFlo3 pump install. Replaced 4-year-old single-speed. Wired to IntelliCenter.",
      },
      {
        customer: "P. on Sunset Dr",
        when: "Last week",
        detail: "IntelliChlor IC40 cell swap. Salinity check, flow switch tested, output rebalanced.",
      },
    ],
    reviews: [
      {
        rating: 5,
        body:
          "Tony's crew diagnosed and fixed our heater on the same call. Brought the heat exchanger on the truck because the diagnostic photos I sent told him what to expect. Saved a whole second trip.",
        author: "D. on Olive Ave · heater rebuild, Mar 2026",
      },
      {
        rating: 5,
        body:
          "Got a quote for a pump swap from three companies. Tony was middle on price but had the install scheduled within four days where the others were 2-3 weeks out. Picked him for speed, would pick him again for quality.",
        author: "L. on Cypress Ave · pump install, Feb 2026",
      },
    ],
    ctaTitle: "Book a diagnostic",
    ctaDate: "Tomorrow, 9 AM window",
    ctaTime: "Same-day if before noon, parts pre-staged on truck",
  },
];

export function getPro(slug: string): ProProfile | undefined {
  return PROS.find((p) => p.slug === slug);
}
