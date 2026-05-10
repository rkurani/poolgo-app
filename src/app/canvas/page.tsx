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

const HOTSPOTS: Hotspot[] = [
  {
    id: "pool",
    x: 36,
    y: 48,
    w: 26,
    h: 28,
    label: "Today's water · pH 7.4",
    href: "/care",
    tone: "ai",
  },
  {
    id: "pad",
    x: 68,
    y: 64,
    w: 28,
    h: 32,
    label: "The pad · 5 units live",
    href: "/equipment",
    tone: "live",
  },
  {
    id: "lounger",
    x: 5,
    y: 34,
    w: 18,
    h: 22,
    label: "Maya is here · tap to ping",
    href: "/care",
    tone: "human",
  },
  {
    id: "truck",
    x: 52,
    y: 2,
    w: 22,
    h: 20,
    label: "Carlos · 4 mins up the street",
    href: "/folks",
    tone: "human",
  },
  {
    id: "shop",
    x: 84,
    y: 0,
    w: 16,
    h: 30,
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
    <div className="relative w-full bg-ink overflow-x-auto overflow-y-hidden h-[calc(100dvh-96px)] md:h-[calc(100dvh-72px)]">
      <div className="relative h-full w-[1400px] md:w-full md:max-w-[1920px] mx-auto">
        <div
          className="absolute inset-0 z-10 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: "url(/assets/canvas/backyard-macro.png)",
            imageRendering: "pixelated",
          }}
          aria-hidden
        />

        {HOTSPOTS.map((spot) => (
          <HotspotChip key={spot.id} spot={spot} />
        ))}
      </div>

      <div className="md:hidden pointer-events-none fixed top-4 right-4 z-30">
        <span className="rounded-full bg-ink/85 backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1.5">
          Scroll the world →
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

      <span className="relative z-10 inline-flex items-center gap-2 rounded-full bg-ink/90 backdrop-blur-sm border border-white/15 px-3 py-1.5 text-white text-[12px] font-semibold leading-none translate-y-1 group-hover:translate-y-0 transition-transform shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
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
