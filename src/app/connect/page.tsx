import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  Plug,
  Activity,
  Bot,
  FlaskConical,
  Briefcase,
  Sparkles,
} from "lucide-react";
export type Status = "connected" | "available" | "coming-soon";
export type Category = "pad" | "cleaner" | "monitor" | "tester" | "platform" | "specialty";

export type Integration = {
  id: string;
  name: string;
  vendor: string;
  category: Category;
  blurb: string;
  logo: string | null;
  brandTone: string;
  brandSoft: string;
  status: Status;
  connection: string;
  capabilities: string[];
};

export const INTEGRATIONS: Integration[] = [
  {
    id: "pentair-intellicenter",
    name: "IntelliCenter",
    vendor: "Pentair",
    category: "pad",
    blurb: "Whole-pad automation hub. Pump, heater, salt cell, valves, lights on one schedule.",
    logo: "/assets/pentair.jpg",
    brandTone: "var(--color-pentair, #1A4F8B)",
    brandSoft: "var(--color-pentair-soft, #E5ECF4)",
    status: "connected",
    connection: "Cloud API + OAuth",
    capabilities: ["Live telemetry", "Control", "Schedule", "Diagnostics"],
  },
  {
    id: "pentair-intellichlor",
    name: "IntelliChlor IC40",
    vendor: "Pentair",
    category: "pad",
    blurb: "Salt-chlorine generator. Cell life, output level, low-salt warnings.",
    logo: "/assets/pentair.jpg",
    brandTone: "var(--color-pentair, #1A4F8B)",
    brandSoft: "var(--color-pentair-soft, #E5ECF4)",
    status: "connected",
    connection: "Read via IntelliCenter",
    capabilities: ["Live telemetry", "Cell life", "Output control"],
  },
  {
    id: "hayward-omni",
    name: "OmniLogic / OmniHub",
    vendor: "Hayward",
    category: "pad",
    blurb: "Hayward's pad automation. Pumps, heaters, valves, and chlorination on one app.",
    logo: "/assets/hayward.png",
    brandTone: "var(--color-hayward, #D8A700)",
    brandSoft: "var(--color-hayward-soft, #FBF1D0)",
    status: "available",
    connection: "Cloud API + OAuth",
    capabilities: ["Live telemetry", "Control", "Schedule"],
  },
  {
    id: "hayward-aquarite",
    name: "AquaRite",
    vendor: "Hayward",
    category: "pad",
    blurb: "Hayward's salt-chlorine generator. Daily output and cell diagnostics.",
    logo: "/assets/hayward.png",
    brandTone: "var(--color-hayward, #D8A700)",
    brandSoft: "var(--color-hayward-soft, #FBF1D0)",
    status: "available",
    connection: "Cloud API",
    capabilities: ["Live telemetry", "Cell life"],
  },
  {
    id: "jandy-iaqualink",
    name: "iAquaLink RS",
    vendor: "Jandy",
    category: "pad",
    blurb: "Jandy's automation. Pumps, heaters, lights, chemistry in the same app.",
    logo: null,
    brandTone: "var(--color-jandy, #CC0033)",
    brandSoft: "#FBE0E5",
    status: "available",
    connection: "Cloud API + OAuth",
    capabilities: ["Live telemetry", "Control", "Schedule"],
  },
  {
    id: "zodiac-pool",
    name: "Zodiac Pool Systems",
    vendor: "Zodiac (Fluidra)",
    category: "pad",
    blurb: "Heat pumps, salt systems, and the AquaLink family. Same parent as Jandy and Polaris.",
    logo: null,
    brandTone: "#003F87",
    brandSoft: "#DDE7F4",
    status: "available",
    connection: "Cloud API",
    capabilities: ["Live telemetry", "Control"],
  },
  {
    id: "raypak",
    name: "Raypak heaters",
    vendor: "Raypak",
    category: "pad",
    blurb: "Gas heaters with the Avia Wi-Fi module. Run hours, fault codes, ignition history.",
    logo: null,
    brandTone: "var(--color-raypak, #E94B3C)",
    brandSoft: "#FBE0DD",
    status: "available",
    connection: "Cloud API",
    capabilities: ["Live telemetry", "Diagnostics"],
  },
  {
    id: "aquacal",
    name: "AquaCal heat pumps",
    vendor: "AquaCal",
    category: "pad",
    blurb: "Heat pumps for milder climates. Inlet/outlet temps, defrost cycles, COP estimates.",
    logo: null,
    brandTone: "#1F6FA0",
    brandSoft: "#DCEAF4",
    status: "coming-soon",
    connection: "Cloud API",
    capabilities: ["Live telemetry"],
  },

  {
    id: "polaris-robotic",
    name: "Polaris 9650iQ",
    vendor: "Polaris",
    category: "cleaner",
    blurb: "Inground robotic. Cycle history, brush hours, and one-tap deep clean.",
    logo: "/assets/polaris.png",
    brandTone: "var(--color-polaris, #00759C)",
    brandSoft: "var(--color-polaris-soft, #DCEDF4)",
    status: "connected",
    connection: "Cloud API",
    capabilities: ["Cycle log", "Remote start", "Diagnostics"],
  },
  {
    id: "dolphin",
    name: "Dolphin Premier / Active",
    vendor: "Maytronics",
    category: "cleaner",
    blurb: "Robotic cleaner family. MyDolphin Plus app for scheduling and cycle history.",
    logo: null,
    brandTone: "#0B5DA8",
    brandSoft: "#DCE7F4",
    status: "available",
    connection: "Cloud API + Bluetooth",
    capabilities: ["Cycle log", "Remote start"],
  },
  {
    id: "hayward-tigershark",
    name: "TigerShark / AquaVac",
    vendor: "Hayward",
    category: "cleaner",
    blurb: "Hayward's robotic and suction cleaner range. Read-only telemetry.",
    logo: "/assets/hayward.png",
    brandTone: "var(--color-hayward, #D8A700)",
    brandSoft: "var(--color-hayward-soft, #FBF1D0)",
    status: "available",
    connection: "Cloud API",
    capabilities: ["Cycle log"],
  },
  {
    id: "aiper",
    name: "Aiper Seagull series",
    vendor: "Aiper",
    category: "cleaner",
    blurb: "Cordless battery cleaners. The most popular DTC robotic on the market.",
    logo: null,
    brandTone: "#E07A1A",
    brandSoft: "#FBE6CF",
    status: "coming-soon",
    connection: "Bluetooth + cloud",
    capabilities: ["Cycle log", "Battery"],
  },
  {
    id: "wybot",
    name: "WYBOT cordless",
    vendor: "WYBOT",
    category: "cleaner",
    blurb: "Cordless robotic line. Lightweight, designed for residential pools under 1,000 sq ft.",
    logo: null,
    brandTone: "#3B7DB5",
    brandSoft: "#DCE9F4",
    status: "coming-soon",
    connection: "Bluetooth + cloud",
    capabilities: ["Cycle log", "Battery"],
  },
  {
    id: "beatbot",
    name: "Beatbot AquaSense Pro",
    vendor: "Beatbot",
    category: "cleaner",
    blurb: "Premium cordless robotic. Surface skim, floor, and wall in a single cycle.",
    logo: null,
    brandTone: "#5C3CCC",
    brandSoft: "#E2DCF4",
    status: "coming-soon",
    connection: "Cloud API",
    capabilities: ["Cycle log", "Battery", "Surface skim"],
  },

  {
    id: "waterguru",
    name: "WaterGuru SENSE S2",
    vendor: "WaterGuru",
    category: "monitor",
    blurb: "Skimmer-mounted sensor. Reads pH, free chlorine, ORP, and temperature every 20 minutes.",
    logo: null,
    brandTone: "#1FA0BF",
    brandSoft: "#DCEFF4",
    status: "available",
    connection: "Cloud API + Wi-Fi",
    capabilities: ["pH", "Free Cl", "ORP", "Temp"],
  },
  {
    id: "sutro",
    name: "Sutro",
    vendor: "Sutro",
    category: "monitor",
    blurb: "In-pool sensor with reagent cartridges. Pulls FC, pH, alkalinity three times daily.",
    logo: null,
    brandTone: "#4F2D8F",
    brandSoft: "#E2DCF1",
    status: "available",
    connection: "Cloud API",
    capabilities: ["FC", "pH", "TA"],
  },
  {
    id: "phin",
    name: "pHin (Hayward Water Insights)",
    vendor: "Hayward",
    category: "monitor",
    blurb: "Floating disc sensor. Continuous pH and ORP, reagent strips for the rest.",
    logo: "/assets/hayward.png",
    brandTone: "var(--color-hayward, #D8A700)",
    brandSoft: "var(--color-hayward-soft, #FBF1D0)",
    status: "available",
    connection: "Cloud API + Bluetooth",
    capabilities: ["pH", "ORP"],
  },
  {
    id: "connectedpool",
    name: "ConnectedPool monitor",
    vendor: "ConnectedPool",
    category: "monitor",
    blurb: "DIY-friendly plumbing-line sensor. Inline FC, pH, ORP, flow, and temperature.",
    logo: null,
    brandTone: "#1B7A8F",
    brandSoft: "#DCEEF1",
    status: "coming-soon",
    connection: "Cloud API",
    capabilities: ["FC", "pH", "ORP", "Flow"],
  },

  {
    id: "lamotte-spintouch",
    name: "LaMotte Spin Touch",
    vendor: "LaMotte",
    category: "tester",
    blurb: "Handheld digital photometer. Multi-parameter water test in 60 seconds. Lab-grade accuracy.",
    logo: null,
    brandTone: "#B8252D",
    brandSoft: "#F4DCDF",
    status: "available",
    connection: "Bluetooth + manual sync",
    capabilities: ["FC", "TC", "pH", "TA", "CYA", "CH"],
  },
  {
    id: "lamotte-colorq",
    name: "LaMotte ColorQ Pro 11",
    vendor: "LaMotte",
    category: "tester",
    blurb: "Earlier-generation handheld. Eleven parameters, slightly slower than Spin Touch but cheaper.",
    logo: null,
    brandTone: "#B8252D",
    brandSoft: "#F4DCDF",
    status: "available",
    connection: "Manual entry",
    capabilities: ["FC", "TC", "pH", "TA", "CYA"],
  },
  {
    id: "taylor-k2006",
    name: "Taylor K-2006",
    vendor: "Taylor Technologies",
    category: "tester",
    blurb: "The reference-grade titration kit. What every pool service tech keeps in the truck.",
    logo: null,
    brandTone: "#2C5F4A",
    brandSoft: "#DDE9E2",
    status: "available",
    connection: "Manual entry",
    capabilities: ["FC", "TC", "pH", "TA", "CYA", "CH"],
  },
  {
    id: "aquachek",
    name: "AquaChek TruTest",
    vendor: "AquaChek",
    category: "tester",
    blurb: "Test-strip reader. Fast, less precise, fine for daily checks between real tests.",
    logo: null,
    brandTone: "#0B5DA8",
    brandSoft: "#DCE7F4",
    status: "available",
    connection: "Bluetooth + manual",
    capabilities: ["FC", "pH", "TA"],
  },

  {
    id: "clyr",
    name: "CLYR",
    vendor: "CLYR",
    category: "platform",
    blurb: "Pool service business CRM. Routes, billing, photo logs. Hands data to homeowners on request.",
    logo: null,
    brandTone: "#5C3CCC",
    brandSoft: "#E2DCF4",
    status: "available",
    connection: "Cloud API + OAuth",
    capabilities: ["Service log", "Photos", "Routes"],
  },
  {
    id: "the-attendant",
    name: "The Attendant",
    vendor: "The Attendant",
    category: "platform",
    blurb: "Concierge service. AI-assisted pool care planning, escalates to a human when something is off.",
    logo: null,
    brandTone: "#1FA0BF",
    brandSoft: "#DCEFF4",
    status: "coming-soon",
    connection: "Cloud API",
    capabilities: ["Concierge", "Recommendations"],
  },
  {
    id: "skimmer",
    name: "Skimmer",
    vendor: "Skimmer",
    category: "platform",
    blurb: "Field service software. The standard for one-truck-and-up pool service businesses.",
    logo: null,
    brandTone: "#1B7A8F",
    brandSoft: "#DCEEF1",
    status: "available",
    connection: "Cloud API",
    capabilities: ["Service log", "Routes"],
  },
  {
    id: "leslies-portal",
    name: "Leslie's customer portal",
    vendor: "Leslie's",
    category: "platform",
    blurb: "Free water test history, purchase log, account-linked treatment plan.",
    logo: "/assets/leslies.png",
    brandTone: "var(--color-leslies, #0046A8)",
    brandSoft: "var(--color-leslies-soft, #DEE8F7)",
    status: "available",
    connection: "Cloud API",
    capabilities: ["Test history", "Purchases", "Plan"],
  },

  {
    id: "clear-comfort",
    name: "Clear Comfort UV/AOP",
    vendor: "Clear Comfort",
    category: "specialty",
    blurb: "Hydroxyl-radical secondary sanitation. Reduces chlorine demand, runs alongside the salt cell.",
    logo: null,
    brandTone: "#1FA0BF",
    brandSoft: "#DCEFF4",
    status: "available",
    connection: "Cloud API",
    capabilities: ["Lamp life", "Run hours"],
  },
  {
    id: "crystal-pure",
    name: "Crystal Pure (Hayward)",
    vendor: "Hayward",
    category: "specialty",
    blurb: "UV plus ozone secondary sanitation. Telemetry through OmniLogic.",
    logo: "/assets/hayward.png",
    brandTone: "var(--color-hayward, #D8A700)",
    brandSoft: "var(--color-hayward-soft, #FBF1D0)",
    status: "available",
    connection: "Read via OmniLogic",
    capabilities: ["Lamp life", "Run hours"],
  },
  {
    id: "clearblue",
    name: "ClearBlue Ionizer",
    vendor: "ClearBlue",
    category: "specialty",
    blurb: "Mineral ionizer. Copper and silver ions reduce chlorine consumption.",
    logo: null,
    brandTone: "#1F5C8B",
    brandSoft: "#DCE5F1",
    status: "coming-soon",
    connection: "Cloud API",
    capabilities: ["Cell life"],
  },
  {
    id: "aquasol-uv",
    name: "Aquasol UV",
    vendor: "Aquasol",
    category: "specialty",
    blurb: "Inline UV sanitation. Lamp-life and run-hour reporting via Bluetooth dongle.",
    logo: null,
    brandTone: "#5BA01F",
    brandSoft: "#E0F0DC",
    status: "coming-soon",
    connection: "Bluetooth",
    capabilities: ["Lamp life"],
  },
];

const STATUS_TONE: Record<Status, { bg: string; label: string; text: string }> = {
  connected: { bg: "var(--color-source-live)", label: "Connected", text: "white" },
  available: { bg: "var(--color-citrus, #E8A82C)", label: "Available", text: "var(--color-mountain-shadow, #5C5546)" },
  "coming-soon": { bg: "var(--color-data-cream-2, #E5D7BE)", label: "Coming soon", text: "var(--color-mountain-shadow, #5C5546)" },
};

const CATEGORY_META: Record<Category, { title: string; lede: string; Icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }> = {
  pad: {
    title: "Pad equipment & automation.",
    lede: "Pumps, heaters, salt cells, valves. Whatever Pentair, Hayward, Jandy, or Zodiac put on the slab.",
    Icon: Plug,
  },
  cleaner: {
    title: "Robotic & automatic cleaners.",
    lede: "From plug-in inground robots to cordless surface skimmers.",
    Icon: Bot,
  },
  monitor: {
    title: "In-pool sensors.",
    lede: "Skimmer-mounted, floating, or inline. Continuous chemistry without lifting a finger.",
    Icon: Activity,
  },
  tester: {
    title: "Water testers, hardware.",
    lede: "Photometers, titration kits, strip readers. Accurate baselines on demand.",
    Icon: FlaskConical,
  },
  platform: {
    title: "Service platforms & concierges.",
    lede: "How your pro, your store, and your AI helper feed the same record.",
    Icon: Briefcase,
  },
  specialty: {
    title: "Specialty sanitation.",
    lede: "UV, ozone, ionizers. Anything riding alongside your primary chlorine.",
    Icon: Sparkles,
  },
};

export default function ConnectPage() {
  const byCategory = INTEGRATIONS.reduce<Record<Category, Integration[]>>((acc, i) => {
    if (!acc[i.category]) acc[i.category] = [];
    acc[i.category].push(i);
    return acc;
  }, {} as Record<Category, Integration[]>);

  const counts = {
    connected: INTEGRATIONS.filter((i) => i.status === "connected").length,
    available: INTEGRATIONS.filter((i) => i.status === "available").length,
    coming: INTEGRATIONS.filter((i) => i.status === "coming-soon").length,
  };

  return (
    <div
      data-city="redlands"
      className="min-h-[calc(100dvh-96px)] md:min-h-[calc(100dvh-72px)]"
      style={{ backgroundColor: "var(--color-canvas-ground, #D4B896)" }}
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10 pt-6 pb-32 md:pb-16 flex flex-col gap-10 sm:gap-14">
        <Link
          href="/canvas"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] w-fit hover:translate-x-[-2px] transition-transform"
          style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          back to your backyard
        </Link>

        <header className="flex flex-col gap-3">
          <span className="font-pixel text-[10px] sm:text-[11px] uppercase tracking-[0.2em]"
                style={{ color: "var(--color-mountain-shadow, #5C5546)" }}>
            Connect · {INTEGRATIONS.length} integrations
          </span>
          <h1 className="text-[44px] sm:text-[64px] leading-[0.95] font-extrabold tracking-[-0.03em]"
              style={{ color: "var(--color-data-ink, #3B342A)" }}>
            Plug it all in.
          </h1>
          <p className="text-[16px] sm:text-[19px] font-medium leading-snug max-w-[680px]"
             style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
            Every brand on your pad, every sensor in your water, every test you run, every pro who routes you. They flow into your record.
          </p>
          <div className="pixel-bar mt-3" aria-hidden />
        </header>

        <div
          className="rounded-2xl overflow-hidden border-[3px] aspect-[16/9] sm:aspect-[16/7] w-full bg-no-repeat bg-cover bg-center shadow-[6px_6px_0_0_rgba(59,52,42,0.18)]"
          style={{
            borderColor: "var(--color-mountain-shadow, #5C5546)",
            backgroundImage: "url(/assets/connect/connect-hero.png)",
            imageRendering: "pixelated",
          }}
          aria-hidden
        />

        <section className="grid grid-cols-3 gap-3 sm:gap-4">
          <CounterCard label="Connected" value={counts.connected} tone="var(--color-source-live)" />
          <CounterCard label="Available" value={counts.available} tone="var(--color-citrus, #E8A82C)" />
          <CounterCard label="Coming soon" value={counts.coming} tone="var(--color-mountain-shadow, #5C5546)" />
        </section>

        {(["pad", "cleaner", "monitor", "tester", "platform", "specialty"] as Category[]).map((cat) => {
          const items = byCategory[cat] || [];
          const meta = CATEGORY_META[cat];
          if (items.length === 0) return null;
          return (
            <section key={cat} className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="grid place-items-center h-12 w-12 rounded-xl shrink-0"
                     style={{
                       backgroundColor: "var(--color-mountain-shadow, #5C5546)",
                       color: "var(--color-canvas-ground, #D4B896)",
                     }}>
                  <meta.Icon size={22} strokeWidth={2.4} />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <h2 className="text-[26px] sm:text-[32px] leading-tight font-extrabold tracking-[-0.02em]"
                      style={{ color: "var(--color-data-ink, #3B342A)" }}>
                    {meta.title}
                  </h2>
                  <p className="text-[13px] sm:text-[14px] font-medium leading-snug max-w-[680px]"
                     style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                    {meta.lede}
                  </p>
                  <div className="pixel-bar-thin mt-1" aria-hidden />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {items.map((i) => (
                  <IntegrationCard key={i.id} integration={i} />
                ))}
              </div>
            </section>
          );
        })}

        <section
          className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[6px_6px_0_0_rgba(59,52,42,0.25)]"
          style={{
            backgroundColor: "var(--color-terracotta, #C75240)",
            color: "white",
          }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] opacity-90">
              Don&rsquo;t see your gear?
            </span>
            <h3 className="text-[26px] sm:text-[32px] leading-tight font-extrabold tracking-[-0.02em]">
              Tell us what to build next.
            </h3>
            <span className="text-[13px] opacity-90">
              We add integrations based on what real pools have. Your suggestion gets a vote.
            </span>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-xl px-6 py-4 text-[15px] font-bold bg-white shadow-[3px_3px_0_0_rgba(0,0,0,0.25)] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] transition-all"
            style={{ color: "var(--color-terracotta, #C75240)" }}
          >
            Request a brand
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </section>
      </div>
    </div>
  );
}

function CounterCard({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div
      className="rounded-2xl border-2 p-4 sm:p-5 flex flex-col gap-1 relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-data-cream, #F1E6D3)",
        borderColor: "var(--color-card-border, #B89B6A)",
      }}
    >
      <span
        className="absolute top-0 left-0 right-0 h-[5px]"
        style={{ backgroundColor: tone }}
        aria-hidden
      />
      <span className="font-pixel text-[10px] uppercase tracking-[0.18em] mt-2"
            style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
        {label}
      </span>
      <span className="text-[36px] sm:text-[44px] leading-none font-extrabold tracking-[-0.03em]"
            style={{
              color: "var(--color-data-ink, #3B342A)",
              fontFeatureSettings: '"tnum"',
            }}>
        {value}
      </span>
    </div>
  );
}

function IntegrationCard({ integration }: { integration: Integration }) {
  const status = STATUS_TONE[integration.status];
  return (
    <Link
      href={`/connect/${integration.id}`}
      className="group relative rounded-2xl border-2 p-5 flex flex-col gap-4 hover:translate-y-[-2px] transition-transform overflow-hidden"
      style={{
        backgroundColor: "var(--color-data-cream, #F1E6D3)",
        borderColor: "var(--color-card-border, #B89B6A)",
      }}
    >
      <span
        className="absolute top-0 left-0 right-0 h-[6px]"
        style={{ backgroundColor: integration.brandTone }}
        aria-hidden
      />

      <div className="flex items-start gap-4 mt-2">
        <BrandLogoTile
          src={integration.logo}
          alt={integration.vendor}
          tone={integration.brandTone}
          softTone={integration.brandSoft}
        />
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <span className="font-pixel text-[9px] uppercase tracking-[0.2em] truncate"
                style={{ color: integration.brandTone }}>
            {integration.vendor}
          </span>
          <h3 className="text-[18px] font-extrabold tracking-[-0.01em] leading-tight"
              style={{ color: "var(--color-data-ink, #3B342A)" }}>
            {integration.name}
          </h3>
          <span className="font-pixel text-[9px] tracking-[0.08em] mt-0.5"
                style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
            {integration.connection}
          </span>
        </div>
      </div>

      <p className="text-[13px] leading-snug"
         style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
        {integration.blurb}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {integration.capabilities.map((cap) => (
          <span
            key={cap}
            className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em] border"
            style={{
              borderColor: "var(--color-card-border, #B89B6A)",
              color: "var(--color-data-ink, #3B342A)",
              backgroundColor: "var(--color-data-cream-2, #E5D7BE)",
            }}
          >
            {cap}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 pt-3 mt-auto border-t-2"
           style={{ borderColor: "var(--color-card-border, #B89B6A)" }}>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
          style={{ backgroundColor: status.bg, color: status.text }}
        >
          {integration.status !== "coming-soon" && (
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: status.text }} />
          )}
          {status.label}
        </span>
        <span className="inline-flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.08em] opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ color: "var(--color-data-ink, #3B342A)" }}>
          {integration.status === "connected" ? "Configure" : "Connect"}
          <ArrowRight size={12} strokeWidth={2.5} />
        </span>
      </div>
    </Link>
  );
}

/**
 * BrandLogoTile reuses the multiply-blend pattern from /care and /folks. Real
 * logo on brand-soft plaque, white-bg dissolves into the brand tint. No-logo
 * state shows an upload affordance so onboarding without a brand asset has a
 * visual home.
 */
function BrandLogoTile({
  src,
  alt,
  tone,
  softTone,
}: {
  src: string | null;
  alt: string;
  tone: string;
  softTone: string;
}) {
  return (
    <div
      className="relative h-[64px] w-[64px] shrink-0 rounded-xl border-2 overflow-hidden shadow-[2px_2px_0_0_rgba(59,52,42,0.18)]"
      style={{
        backgroundColor: "var(--color-data-cream-2, #E5D7BE)",
        borderColor: "var(--color-mountain-shadow, #5C5546)",
      }}
    >
      <span
        className="absolute top-0 left-0 right-0 z-10 h-[4px]"
        style={{ backgroundColor: tone }}
        aria-hidden
      />
      {src ? (
        <div className="absolute inset-0 p-1.5 pt-2.5">
          <div
            className="relative h-full w-full rounded-md border grid place-items-center"
            style={{
              borderColor: "var(--color-mountain-shadow, #5C5546)",
              backgroundColor: softTone,
              isolation: "isolate",
            }}
          >
            <div className="relative h-3/5 w-4/5">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="64px"
                className="object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 p-1.5 pt-2.5">
          <div
            className="relative h-full w-full rounded-md border-2 border-dashed grid place-items-center"
            style={{
              borderColor: "var(--color-mountain-shadow, #5C5546)",
              backgroundColor: softTone,
            }}
          >
            <div className="flex flex-col items-center gap-0.5">
              <Upload size={12} strokeWidth={2.5}
                      style={{ color: "var(--color-mountain-shadow, #5C5546)" }} />
              <span className="font-pixel text-[6px] uppercase tracking-[0.1em] leading-tight"
                    style={{ color: "var(--color-mountain-shadow, #5C5546)" }}>
                logo
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
