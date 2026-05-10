import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, MapPin, Star, Clock, Upload } from "lucide-react";

type Pro = {
  id: string;
  name: string;
  role: string;
  portrait: string | null; // path or null for placeholder
  portraitTone: string; // fallback color when portrait missing
  blurb: string;
  miles: string;
  rating: string;
  reviews: string;
  status: { tone: string; text: string };
  href: string;
};

const PROS: Pro[] = [
  {
    id: "carlos",
    name: "Carlos Mendoza",
    role: "Pool service · independent",
    portrait: "/assets/folks/carlos-portrait.png",
    portraitTone: "var(--color-source-human)",
    blurb: "Twelve years routing the Inland Empire. Tue/Wed/Thu in your block.",
    miles: "0.4 mi",
    rating: "4.9",
    reviews: "142",
    status: { tone: "live", text: "Routes Tue · Wed · Thu" },
    href: "/folks/carlos-redlands",
  },
  {
    id: "maria",
    name: "Maria Velasquez",
    role: "Pool builder · gunite & remodel",
    portrait: "/assets/folks/maria-portrait.png",
    portraitTone: "var(--color-citrus)",
    blurb: "Builds and remodels in San Bernardino County. Specializes in plaster + tile.",
    miles: "1.7 mi",
    rating: "4.8",
    reviews: "63",
    status: { tone: "imported", text: "Booking Q3 · 2 slots open" },
    href: "/folks",
  },
  {
    id: "devon",
    name: "Devon Park",
    role: "Pool cleaner · weekly only",
    portrait: null,
    portraitTone: "#8FB4D8",
    blurb: "Clean-and-go specialist. No dosing, no equipment work — just a spotless pool.",
    miles: "2.3 mi",
    rating: "4.7",
    reviews: "38",
    status: { tone: "live", text: "Mon · Fri routes" },
    href: "/folks",
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
};

const STORES: Store[] = [
  {
    id: "leslies",
    name: "Leslie's Pool Supplies",
    type: "Big-box · chain",
    miles: "2.1 mi",
    hours: "Open until 7pm",
    inventory: ["3-inch tabs · 50lb · in stock", "Salt 40lb · 3 bags", "Pentair filter cartridges"],
    badge: "Free water test",
    logo: "/assets/leslies.png",
    brandTone: "var(--color-leslies, #0046A8)",
  },
  {
    id: "pinch-redlands",
    name: "Pinch A Penny · Redlands",
    type: "Independent · Spanish-tile front on Orange Ave",
    miles: "3.4 mi",
    hours: "Open until 5pm",
    inventory: ["Liquid chlorine · 12 jugs", "Stabilizer · 1 bag", "Hayward filter sand"],
    badge: "Free water test · weekend booking",
    logo: null,
    brandTone: "var(--color-mountain-shadow, #5C5546)",
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
            Forty-seven independent pool people within eight miles — pros routing your block, stores
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
          <SectionHeader
            title="Pros routing your block."
            caption="three regulars · independents · all reachable today"
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            {PROS.map((pro) => (
              <ProCard key={pro.id} pro={pro} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <SectionHeader
            title="Stores you can drop into."
            caption="two within three miles · check stock before you drive"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {STORES.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <SectionHeader
            title="Specialists for when something breaks."
            caption="four within twelve miles · only call when something is genuinely off"
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

  return (
    <Link
      href={pro.href}
      className="group rounded-2xl border-[3px] p-5 flex flex-col gap-4 hover:translate-y-[-2px] transition-transform shadow-[4px_4px_0_0_rgba(59,52,42,0.15)]"
      style={{
        backgroundColor: "var(--color-data-cream, #F1E6D3)",
        borderColor: "var(--color-mountain-shadow, #5C5546)",
      }}
    >
      <div
        className="aspect-square rounded-xl border-2 overflow-hidden"
        style={{
          borderColor: "var(--color-mountain-shadow, #5C5546)",
          backgroundImage: pro.portrait ? `url(${pro.portrait})` : "none",
          backgroundColor: pro.portrait ? "transparent" : pro.portraitTone,
          backgroundSize: "cover",
          backgroundPosition: "center",
          imageRendering: "pixelated",
        }}
        aria-label={`Portrait of ${pro.name}`}
      >
        {!pro.portrait && (
          <div className="h-full w-full grid place-items-center font-pixel text-[36px]"
               style={{ color: "rgba(255,255,255,0.5)" }}>
            {pro.name.split(" ").map((s) => s[0]).join("")}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-[20px] font-extrabold tracking-[-0.01em] leading-tight"
              style={{ color: "var(--color-data-ink, #3B342A)" }}>
            {pro.name}
          </h3>
          <span className="font-pixel text-[10px] tracking-[0.08em] shrink-0"
                style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
            {pro.miles}
          </span>
        </div>
        <span className="text-[12px] font-semibold uppercase tracking-[0.05em]"
              style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
          {pro.role}
        </span>
        <p className="text-[13px] leading-snug mt-1"
           style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
          {pro.blurb}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 pt-3 border-t-2"
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
function StoreLogoFrame({ src, alt, tone }: { src: string | null; alt: string; tone: string }) {
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
            className="relative h-full w-full bg-white rounded-md border grid place-items-center"
            style={{ borderColor: "var(--color-mountain-shadow, #5C5546)" }}
          >
            <div className="relative h-3/5 w-3/4">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="80px"
                className="object-contain"
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

function SectionHeader({ title, caption }: { title: string; caption: string }) {
  return (
    <div className="flex flex-col gap-1">
      <h2
        className="text-[26px] sm:text-[32px] leading-tight font-extrabold tracking-[-0.02em]"
        style={{ color: "var(--color-data-ink, #3B342A)" }}
      >
        {title}
      </h2>
      <span
        className="text-[12px] font-semibold uppercase tracking-[0.1em]"
        style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
      >
        {caption}
      </span>
      <div className="pixel-bar-thin mt-2" aria-hidden />
    </div>
  );
}
