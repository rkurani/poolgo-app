import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { equipment } from "@/lib/data/equipment";
import type { EquipmentTile } from "@/lib/types";
import { SectionHeader } from "@/components/SectionHeader";

const STATE_TONE: Record<string, string> = {
  live: "var(--color-source-live)",
  imported: "var(--color-source-imported)",
  human: "var(--color-source-human)",
  ai: "var(--color-source-ai)",
  off: "var(--color-data-ink-mute, #6E6555)",
};

const UNIT_HREF: Record<string, string> = {
  pump: "/equipment/intelliflo3",
};

export default function EquipmentPage() {
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

        <section
          className="relative rounded-2xl overflow-hidden border-[3px] shadow-[6px_6px_0_0_rgba(59,52,42,0.18)]"
          style={{
            borderColor: "var(--color-mountain-shadow, #5C5546)",
          }}
        >
          <div
            className="aspect-[16/10] w-full bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: "url(/assets/canvas/pad-mid.png)",
              imageRendering: "pixelated",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 pointer-events-none"
               style={{
                 background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(59,52,42,0.5) 100%)",
               }}>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div className="flex flex-col gap-1.5">
                <span className="font-pixel text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white/85">
                  Big Blue · Redlands · Pad
                </span>
                <h1 className="text-[40px] sm:text-[64px] leading-[0.95] font-extrabold tracking-[-0.03em] text-white">
                  Your Pad.
                </h1>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] backdrop-blur-sm pointer-events-auto"
                    style={{ backgroundColor: "var(--color-source-live)", color: "white" }}>
                <span className="h-2 w-2 rounded-full bg-white" />
                5 systems · all live · synced 7s ago
              </span>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <SectionHeader title="The five systems." />
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {equipment.map((unit) => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
        </div>

        <section className="flex flex-col gap-5 mt-2">
          <SectionHeader title="Scenes." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {SCENES.map((s) => (
              <button
                key={s.id}
                className="rounded-xl border-2 p-5 flex flex-col gap-2 items-start text-left hover:translate-y-[-2px] transition-transform"
                style={{
                  backgroundColor: "var(--color-data-cream, #F1E6D3)",
                  borderColor: "var(--color-card-border, #B89B6A)",
                }}
              >
                <span className="font-pixel text-[10px] uppercase tracking-[0.18em]"
                      style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                  {s.label}
                </span>
                <span className="text-[20px] font-extrabold tracking-[-0.01em]"
                      style={{ color: "var(--color-data-ink, #3B342A)" }}>
                  {s.title}
                </span>
                <span className="text-[12px] font-medium leading-snug"
                      style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                  {s.body}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function UnitCard({ unit }: { unit: EquipmentTile }) {
  const tone = STATE_TONE[unit.state] || STATE_TONE.live;
  const href = UNIT_HREF[unit.id] || `/equipment`;
  const isClickable = unit.id === "pump";

  return (
    <Link
      href={href}
      data-brand={unit.brand}
      className="group relative rounded-2xl border-2 p-5 flex flex-col gap-3 hover:translate-y-[-2px] transition-transform overflow-hidden"
      style={{
        backgroundColor: "var(--color-data-cream, #F1E6D3)",
        borderColor: "var(--color-card-border, #B89B6A)",
      }}
    >
      <span
        className="absolute top-0 left-0 right-0 h-[6px]"
        style={{ backgroundColor: "var(--brand-accent)" }}
        aria-hidden
      />

      <div className="flex items-center justify-between gap-2 mt-2">
        <span
          className="font-pixel text-[9px] uppercase tracking-[0.2em] inline-flex items-center gap-1.5"
          style={{ color: "var(--brand-accent)" }}
        >
          {unit.oemLabel}
        </span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
          style={{
            backgroundColor: tone,
            color: "white",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          {unit.stateLabel}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-[20px] sm:text-[22px] font-extrabold tracking-[-0.01em] leading-tight"
            style={{ color: "var(--color-data-ink, #3B342A)" }}>
          {unit.primary}
        </h3>
        <span className="text-[13px] font-medium leading-snug"
              style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
          {unit.secondary}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 pt-3 border-t-2"
           style={{ borderColor: "var(--color-card-border, #B89B6A)" }}>
        <span className="font-pixel text-[10px] tracking-[0.08em]"
              style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
          {unit.technical}
        </span>
        {isClickable && (
          <ArrowRight size={16} strokeWidth={2.5} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                      style={{ color: "var(--brand-accent)" }} />
        )}
      </div>
    </Link>
  );
}


const SCENES = [
  {
    id: "morning",
    label: "01 · MORNING",
    title: "Slow circulate",
    body: "Pump 1,200 RPM. Salt cell 40%. Heater off.",
  },
  {
    id: "swim",
    label: "02 · SWIM",
    title: "Heated, clean, ready",
    body: "Pump 2,800 RPM. Heater 84°F. Cleaner runs 60 min.",
  },
  {
    id: "guests",
    label: "03 · GUESTS",
    title: "Spa side, lights on",
    body: "Spa 102°F. Blower on. Pool lights warm.",
  },
  {
    id: "vacation",
    label: "04 · VACATION",
    title: "Hold steady",
    body: "Pump min schedule. Salt cell 30%. Heater off.",
  },
];
