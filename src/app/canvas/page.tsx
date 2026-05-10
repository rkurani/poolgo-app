import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Tone = "live" | "human" | "imported" | "ai";

type Hotspot = {
  id: string;
  label: string;
  href: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone: Tone;
};

const STAGE_W = 2400;
const STAGE_H = 1500;

const HOTSPOTS: Hotspot[] = [
  {
    id: "pool",
    x: 38,
    y: 50,
    w: 22,
    h: 26,
    label: "Today's water · pH 7.4",
    href: "/care",
    tone: "ai",
  },
  {
    id: "pad",
    x: 66,
    y: 62,
    w: 22,
    h: 28,
    label: "The pad · 5 units live",
    href: "/equipment",
    tone: "live",
  },
  {
    id: "lounger",
    x: 7,
    y: 36,
    w: 16,
    h: 20,
    label: "Maya is here · tap to ping",
    href: "/care",
    tone: "human",
  },
  {
    id: "truck",
    x: 50,
    y: 8,
    w: 20,
    h: 16,
    label: "Carlos · 4 mins up the street",
    href: "/folks/carlos-redlands",
    tone: "human",
  },
  {
    id: "shop",
    x: 80,
    y: 4,
    w: 16,
    h: 22,
    label: "Leslie's · 2 mi · in stock",
    href: "/folks",
    tone: "imported",
  },
];

const TONE_COLOR: Record<Tone, string> = {
  live: "var(--color-source-live)",
  human: "var(--color-source-human)",
  imported: "var(--color-source-imported)",
  ai: "var(--color-source-ai)",
};

export default function CanvasPage() {
  return (
    <div
      data-city="redlands"
      className="relative w-full overflow-auto h-[calc(100dvh-96px)] md:h-[calc(100dvh-72px)]"
      style={{ backgroundColor: "var(--color-canvas-ground, #D4B896)" }}
    >
      <div
        className="relative shrink-0"
        style={{ width: STAGE_W, height: STAGE_H }}
      >
        <div
          className="absolute inset-0 z-10 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: "url(/assets/canvas/redlands-macro.png)",
            imageRendering: "pixelated",
          }}
          aria-hidden
        />

        {HOTSPOTS.map((spot) => (
          <HotspotChip key={spot.id} spot={spot} />
        ))}
      </div>

      <div className="pointer-events-none fixed top-4 right-4 z-30 flex flex-col items-end gap-2">
        <span
          className="rounded-full backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1.5"
          style={{ backgroundColor: "var(--color-mountain-shadow, #5C5546)" }}
        >
          Redlands · explore
        </span>
        <span className="md:hidden rounded-full bg-white/85 backdrop-blur-sm text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1.5"
          style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
        >
          ↕ scroll the world
        </span>
      </div>
    </div>
  );
}

function HotspotChip({ spot }: { spot: Hotspot }) {
  const color = TONE_COLOR[spot.tone];
  return (
    <Link
      href={spot.href}
      aria-label={spot.label}
      className="group absolute z-20 flex flex-col items-center justify-end p-2"
      style={{
        left: `${spot.x}%`,
        top: `${spot.y}%`,
        width: `${spot.w}%`,
        height: `${spot.h}%`,
      }}
    >
      <span
        className="absolute inset-2 rounded-3xl border-2 border-white/30 group-hover:border-white/90 group-hover:bg-white/[0.08] transition-all duration-200"
        aria-hidden
      />
      <span
        className="absolute inset-2 rounded-3xl pointer-events-none animate-canvasPulse"
        style={{ boxShadow: `0 0 0 0 ${color}` }}
        aria-hidden
      />

      <span
        className="relative z-10 inline-flex items-center gap-2 rounded-full backdrop-blur-sm border border-white/20 px-3 py-1.5 text-white text-[12px] font-semibold leading-none translate-y-1 group-hover:translate-y-0 transition-transform shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
        style={{ backgroundColor: "var(--color-mountain-shadow, #5C5546)" }}
      >
        <span
          className="h-2 w-2 rounded-full shrink-0"
          style={{ backgroundColor: color }}
          aria-hidden
        />
        <span className="whitespace-nowrap">{spot.label}</span>
        <ArrowRight size={12} strokeWidth={2.5} className="opacity-70" />
      </span>
    </Link>
  );
}
