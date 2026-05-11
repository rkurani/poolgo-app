import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, MapPin, Star, Clock, Upload, Truck } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

// A "Pro" can be a solo independent (just a person) or a business (named
// company with a lead operator). The card shape adjusts based on `kind`.
type SoloPro = {
  id: string;
  kind: "solo";
  person: string;
  role: string;
  portrait: string | null;
  portraitTone: string;
  blurb: string;
  miles: string;
  rating: string;
  reviews: string;
  status: { tone: string; text: string };
  href: string;
};

type BusinessPro = {
  id: string;
  kind: "business";
  business: string;
  lead: string;
  leadRole: string;
  portrait: string | null;
  portraitTone: string;
  logo: string | null;
  brandTone: string;
  blurb: string;
  miles: string;
  rating: string;
  reviews: string;
  status: { tone: string; text: string };
  fleet?: string;
  href: string;
};

type Pro = SoloPro | BusinessPro;

const PROS: Pro[] = [
  {
    id: "carlos",
    kind: "solo",
    person: "Carlos Mendoza",
    role: "Pool service, independent",
    portrait: "/assets/folks/carlos-portrait.png",
    portraitTone: "var(--color-source-human)",
    blurb: "Twelve years routing the Inland Empire. Tue, Wed, Thu in your block.",
    miles: "0.4 mi",
    rating: "4.9",
    reviews: "142",
    status: { tone: "live", text: "Routes Tue · Wed · Thu" },
    href: "/folks/carlos-redlands",
  },
  {
    id: "velasquez-build",
    kind: "business",
    business: "Velasquez Build",
    lead: "Maria Velasquez",
    leadRole: "Master builder",
    portrait: "/assets/folks/maria-portrait.png",
    portraitTone: "var(--color-citrus)",
    logo: null,
    brandTone: "var(--color-citrus, #E8A82C)",
    blurb: "Gunite shells, plaster, tile. Twelve-week build calendar, full crew.",
    miles: "1.7 mi",
    rating: "4.8",
    reviews: "63",
    status: { tone: "imported", text: "Booking Q3 · 2 slots open" },
    fleet: "4 trucks · 12 crew",
    href: "/folks/velasquez-build",
  },
  {
    id: "redhawk",
    kind: "business",
    business: "RedHawk Pool Services",
    lead: "Devon Park",
    leadRole: "Route lead",
    portrait: null,
    portraitTone: "#8FB4D8",
    logo: null,
    brandTone: "var(--color-terracotta, #C75240)",
    blurb: "Weekly maintenance route covering Redlands, Yucaipa, and Calimesa. Clean-and-go.",
    miles: "2.3 mi",
    rating: "4.7",
    reviews: "38",
    status: { tone: "live", text: "Mon · Fri routes" },
    fleet: "3 trucks · 5 cleaners",
    href: "/folks/redhawk-pool-services",
  },
  {
    id: "solcoast",
    kind: "business",
    business: "Solcoast Pool Care",
    lead: "Tony Reyes",
    leadRole: "Owner & lead tech",
    portrait: null,
    portraitTone: "#5C8B6E",
    logo: null,
    brandTone: "var(--color-marina, #2C5F4A)",
    blurb: "Repair and equipment install. Heater rebuilds and salt-cell swaps a specialty.",
    miles: "4.1 mi",
    rating: "4.9",
    reviews: "91",
    status: { tone: "imported", text: "On-call · 24h response" },
    fleet: "2 trucks · 6 techs",
    href: "/folks/solcoast-pool-care",
  },
];

type Store = {
  id: string;
  name: string;
  type: string;
  miles: string;
  hours: string;
  inventory: string[];
  badge: string;
  logo: string | null;
  brandTone: string;
  brandSoft: string;
};

const STORES: Store[] = [
  {
    id: "leslies",
    name: "Leslie's Pool Supplies",
    type: "Big-box, chain",
    miles: "2.1 mi",
    hours: "Open until 7pm",
    inventory: ["3-inch tabs · 50lb · in stock", "Salt 40lb · 3 bags", "Pentair filter cartridges"],
    badge: "Free water test",
    logo: "/assets/leslies.png",
    brandTone: "var(--color-leslies, #0046A8)",
    brandSoft: "var(--color-leslies-soft, #DEE8F7)",
  },
  {
    id: "pinch-redlands",
    name: "Pinch A Penny · Redlands",
    type: "Independent, Spanish-tile front on Orange Ave",
    miles: "3.4 mi",
    hours: "Open until 5pm",
    inventory: ["Liquid chlorine · 12 jugs", "Stabilizer · 1 bag", "Hayward filter sand"],
    badge: "Free water test, weekend booking",
    logo: null,
    brandTone: "var(--color-mountain-shadow, #5C5546)",
    brandSoft: "var(--color-data-cream-2, #E5D7BE)",
  },
];

type Specialist = {
  id: string;
  name: string;
  speciality: string;
  miles: string;
};

const SPECIALISTS: Specialist[] = [
  { id: "leak", name: "InfraScan Leak Detection", speciality: "Acoustic & pressure leak detection", miles: "5.6 mi" },
  { id: "plaster", name: "Plaster Pros IE", speciality: "Plaster, tile, and coping", miles: "8.1 mi" },
  { id: "heater", name: "Heater Doctor", speciality: "Raypak / Hayward heater repair", miles: "6.3 mi" },
  { id: "leakcap", name: "Capleak Repair", speciality: "Skimmer-line crack injection", miles: "11.4 mi" },
];

const CHIPS = [
  { label: "All · 47", active: true },
  { label: "Pros · 12", active: false },
  { label: "Stores · 6", active: false },
  { label: "Specialists · 14", active: false },
  { label: "Open now · 18", active: false },
];

export default function FolksPage() {
  return (
    <div
      data-city="redlands"
      className="min-h-[calc(100dvh-96px)] md:min-h-[calc(100dvh-72px)]"
      style={{ backgroundColor: "var(--color-canvas-ground, #D4B896)" }}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-10 pt-6 pb-32 md:pb-16 flex flex-col gap-8 sm:gap-12">
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
            Redlands · 92373 · in your area
          </span>
          <h1 className="text-[44px] sm:text-[64px] leading-[0.95] font-extrabold tracking-[-0.03em]"
              style={{ color: "var(--color-data-ink, #3B342A)" }}>
            Folks.
          </h1>
          <p className="text-[15px] sm:text-[17px] font-medium leading-snug max-w-[640px]"
             style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
            Forty-seven independent pool people within eight miles. Pros routing your block, stores
            you can drop into today, specialists for when something is genuinely broken.
          </p>
          <div className="pixel-bar mt-3" aria-hidden />
        </header>

        <div className="flex flex-wrap gap-2">
          {CHIPS.map((chip) => (
            <button
              key={chip.label}
              className="inline-flex items-center rounded-full px-4 py-2 text-[12px] font-bold tracking-[-0.005em] border-2 transition-colors"
              style={
                chip.active
                  ? {
                      backgroundColor: "var(--color-mountain-shadow, #5C5546)",
                      color: "white",
                      borderColor: "var(--color-mountain-shadow, #5C5546)",
                    }
                  : {
                      backgroundColor: "transparent",
                      color: "var(--color-mountain-shadow, #5C5546)",
                      borderColor: "var(--color-mountain-shadow, #5C5546)",
                    }
              }
            >
              {chip.label}
            </button>
          ))}
        </div>

        <section className="flex flex-col gap-5">
          <SectionHeader title="Pros routing your block." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {PROS.map((pro) => (
              <ProCard key={pro.id} pro={pro} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <SectionHeader title="Stores you can drop into." caption="two within three miles" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {STORES.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <SectionHeader
            title="Specialists for when something breaks."
            caption="four within twelve miles"
          />
          <div
            className="rounded-2xl border-2 overflow-hidden"
            style={{
              backgroundColor: "var(--color-data-cream, #F1E6D3)",
              borderColor: "var(--color-card-border, #B89B6A)",
            }}
          >
            {SPECIALISTS.map((spec, i) => (
              <div
                key={spec.id}
                className="flex items-center gap-4 px-5 py-4 border-b-2 last:border-b-0"
                style={{ borderColor: "var(--color-card-border, #B89B6A)" }}
              >
                <div
                  className="grid place-items-center h-10 w-10 rounded-lg shrink-0 font-pixel text-[10px]"
                  style={{
                    backgroundColor: "var(--color-mountain-shadow, #5C5546)",
                    color: "white",
                  }}
                >
                  0{i + 1}
                </div>
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span
                    className="text-[15px] font-bold tracking-[-0.005em] truncate"
                    style={{ color: "var(--color-data-ink, #3B342A)" }}
                  >
                    {spec.name}
                  </span>
                  <span
                    className="text-[12px]"
                    style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                  >
                    {spec.speciality}
                  </span>
                </div>
                <span
                  className="font-pixel text-[10px] tracking-[0.08em] shrink-0"
                  style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                >
                  {spec.miles}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ProCard({ pro }: { pro: Pro }) {
  const statusToneMap: Record<string, string> = {
    live: "var(--color-source-live)",
    imported: "var(--color-source-imported)",
    human: "var(--color-source-human)",
  };
  const statusBg = statusToneMap[pro.status.tone] || "var(--color-source-live)";
  const stripeTone =
    pro.kind === "business" ? pro.brandTone : "var(--color-source-human)";
  const headline = pro.kind === "business" ? pro.business : pro.person;
  const secondary =
    pro.kind === "business"
      ? `${pro.lead} · ${pro.leadRole}${pro.fleet ? ` · ${pro.fleet}` : ""}`
      : pro.role;

  return (
    <Link
      href={pro.href}
      className="group relative rounded-2xl border-[3px] p-5 flex flex-col gap-4 hover:translate-y-[-2px] transition-transform shadow-[4px_4px_0_0_rgba(59,52,42,0.15)] overflow-hidden"
      style={{
        backgroundColor: "var(--color-data-cream, #F1E6D3)",
        borderColor: "var(--color-mountain-shadow, #5C5546)",
      }}
    >
      <span
        className="absolute top-0 left-0 right-0 h-[6px]"
        style={{ backgroundColor: stripeTone }}
        aria-hidden
      />

      <div className="flex items-start gap-4 mt-2">
        <ProAvatar pro={pro} />
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            {pro.kind === "business" ? (
              <span className="font-pixel text-[9px] uppercase tracking-[0.2em]"
                    style={{ color: pro.brandTone }}>
                Business
              </span>
            ) : (
              <span className="font-pixel text-[9px] uppercase tracking-[0.2em]"
                    style={{ color: "var(--color-source-human)" }}>
                Solo
              </span>
            )}
            <span className="font-pixel text-[10px] tracking-[0.08em] shrink-0"
                  style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
              {pro.miles}
            </span>
          </div>
          <h3 className="text-[22px] font-extrabold tracking-[-0.01em] leading-[1.05]"
              style={{ color: "var(--color-data-ink, #3B342A)" }}>
            {headline}
          </h3>
          <span className="text-[12px] font-semibold tracking-[-0.005em]"
                style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
            {secondary}
          </span>
        </div>
      </div>

      <p className="text-[13px] leading-snug"
         style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
        {pro.blurb}
      </p>

      <div className="flex items-center justify-between gap-2 pt-3 border-t-2 mt-auto"
           style={{ borderColor: "var(--color-card-border, #B89B6A)" }}>
        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
              style={{ backgroundColor: statusBg, color: "white" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          {pro.status.text}
        </span>
        <span className="inline-flex items-center gap-1 text-[12px] font-bold"
              style={{ color: "var(--color-data-ink, #3B342A)" }}>
          <Star size={12} strokeWidth={0} fill="var(--color-citrus, #E8A82C)" />
          {pro.rating} · {pro.reviews}
        </span>
      </div>

      <span className="inline-flex items-center justify-end gap-1.5 text-[12px] font-bold uppercase tracking-[0.08em] opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ color: "var(--color-data-ink, #3B342A)" }}>
        Open profile
        <ArrowRight size={12} strokeWidth={2.5} />
      </span>
    </Link>
  );
}

/**
 * ProAvatar: portrait of the lead person if available, business-logo plaque
 * if uploaded, otherwise a Truck-iconed empty state for businesses without a
 * logo yet (the upload affordance lives on their own admin, not here).
 */
function ProAvatar({ pro }: { pro: Pro }) {
  const portrait = pro.portrait;
  const portraitTone = pro.portraitTone;
  const isBusinessNoPortrait = pro.kind === "business" && !portrait;

  if (portrait) {
    return (
      <div
        className="h-[88px] w-[88px] shrink-0 rounded-xl border-2 overflow-hidden bg-no-repeat bg-cover bg-center"
        style={{
          borderColor: "var(--color-mountain-shadow, #5C5546)",
          backgroundImage: `url(${portrait})`,
          imageRendering: "pixelated",
        }}
        aria-label={pro.kind === "business" ? `${pro.lead}` : pro.person}
      />
    );
  }

  if (isBusinessNoPortrait) {
    return (
      <div
        className="h-[88px] w-[88px] shrink-0 rounded-xl border-2 grid place-items-center"
        style={{
          borderColor: "var(--color-mountain-shadow, #5C5546)",
          backgroundColor: pro.brandTone,
          color: "white",
        }}
      >
        <Truck size={32} strokeWidth={2.4} />
      </div>
    );
  }

  return (
    <div
      className="h-[88px] w-[88px] shrink-0 rounded-xl border-2 grid place-items-center font-pixel text-[24px]"
      style={{
        borderColor: "var(--color-mountain-shadow, #5C5546)",
        backgroundColor: portraitTone,
        color: "rgba(255,255,255,0.6)",
      }}
    >
      {pro.kind === "solo"
        ? pro.person.split(" ").map((s) => s[0]).join("")
        : pro.business.split(" ").map((s) => s[0]).slice(0, 2).join("")}
    </div>
  );
}

function StoreCard({ store }: { store: Store }) {
  return (
    <div
      className="rounded-2xl border-[3px] p-5 flex flex-col gap-3"
      style={{
        backgroundColor: "var(--color-data-cream, #F1E6D3)",
        borderColor: "var(--color-mountain-shadow, #5C5546)",
      }}
    >
      <div className="flex items-start gap-4">
        <StoreLogoFrame
          src={store.logo}
          alt={store.name}
          tone={store.brandTone}
          softTone={store.brandSoft}
        />
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[20px] font-extrabold tracking-[-0.01em] truncate"
                style={{ color: "var(--color-data-ink, #3B342A)" }}>
              {store.name}
            </h3>
            <span className="font-pixel text-[10px] tracking-[0.08em] shrink-0"
                  style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
              {store.miles}
            </span>
          </div>
          <span className="text-[12px] font-semibold uppercase tracking-[0.05em]"
                style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
            {store.type}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[12px] font-bold"
           style={{ color: "var(--color-source-live)" }}>
        <Clock size={12} strokeWidth={2.5} />
        {store.hours}
      </div>

      <div className="flex flex-col gap-1.5 pt-3 border-t-2"
           style={{ borderColor: "var(--color-card-border, #B89B6A)" }}>
        <span className="font-pixel text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
          live inventory
        </span>
        {store.inventory.map((item) => (
          <div key={item} className="flex items-center gap-2.5">
            <span
              className="h-1.5 w-1.5 rounded-full shrink-0"
              style={{ backgroundColor: "var(--color-source-live)" }}
              aria-hidden
            />
            <span className="text-[13px] font-medium"
                  style={{ color: "var(--color-data-ink, #3B342A)" }}>
              {item}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 pt-3 mt-1">
        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
              style={{
                backgroundColor: "var(--color-citrus, #E8A82C)",
                color: "var(--color-mountain-shadow, #5C5546)",
              }}>
          {store.badge}
        </span>
        <button className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.08em]"
                style={{ color: "var(--color-data-ink, #3B342A)" }}>
          Get directions
          <MapPin size={12} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

/**
 * StoreLogoFrame: real logo on a clean white plaque inside a chunky pixel frame.
 * Empty state (logo: null) shows an upload-prompt placeholder so onboarding
 * without a logo has a visual home.
 */
function StoreLogoFrame({
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
      className="relative h-[88px] w-[88px] shrink-0 rounded-xl border-2 overflow-hidden shadow-[3px_3px_0_0_rgba(59,52,42,0.18)]"
      style={{
        backgroundColor: "var(--color-data-cream-2, #E5D7BE)",
        borderColor: "var(--color-mountain-shadow, #5C5546)",
      }}
    >
      <span
        className="absolute top-0 left-0 right-0 z-10 h-[5px]"
        style={{ backgroundColor: tone }}
        aria-hidden
      />
      {src ? (
        <div className="absolute inset-0 p-2 pt-3">
          <div
            className="relative h-full w-full rounded-md border grid place-items-center"
            style={{
              borderColor: "var(--color-mountain-shadow, #5C5546)",
              backgroundColor: softTone,
              isolation: "isolate",
            }}
          >
            <div className="relative h-3/5 w-3/4">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="80px"
                className="object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 p-2 pt-3">
          <div
            className="relative h-full w-full rounded-md border-2 border-dashed grid place-items-center text-center"
            style={{
              borderColor: "var(--color-mountain-shadow, #5C5546)",
              backgroundColor: "rgba(255,255,255,0.5)",
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <Upload size={14} strokeWidth={2.5}
                      style={{ color: "var(--color-mountain-shadow, #5C5546)" }} />
              <span className="font-pixel text-[7px] uppercase tracking-[0.1em] leading-tight px-1"
                    style={{ color: "var(--color-mountain-shadow, #5C5546)" }}>
                add logo
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

