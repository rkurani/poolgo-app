import Link from "next/link";

/**
 * Canvas 2: layered-world MVP.
 *
 * Tests the layered-PNG composition approach. The base image is the Redlands
 * macro with NO palm trees baked in. Transparent PNG overlays of palm fronds
 * are positioned at the corners and animated independently for breeze sway.
 *
 * If this lands, the same pattern works for: citrus tree leaves, pool surface
 * shimmer, lounger figure (separable for walk cycles later), truck headlights,
 * storefront sign glow, etc.
 */

type Status = "good" | "warn" | "info" | "human";

type Hotspot = {
  id: string;
  label: string;
  detail: string;
  href: string;
  x: number;
  y: number;
  status: Status;
};

const STAGE_W = 2400;
const STAGE_H = 1500;

const HOTSPOTS: Hotspot[] = [
  { id: "pool",    x: 48, y: 60, label: "Today's water",                detail: "pH 7.4, ORP 720", href: "/care",                  status: "good" },
  { id: "pad",     x: 78, y: 76, label: "The pad",                     detail: "5 systems, all live", href: "/equipment",         status: "good" },
  { id: "lounger", x: 13, y: 60, label: "On the lounger",              detail: "Guest, 2:14pm",       href: "/care",                  status: "human" },
  { id: "truck",   x: 62, y: 11, label: "Carlos, 4 mins up the street",detail: "Routes nearby",       href: "/folks/carlos-redlands", status: "human" },
  { id: "shop",    x: 92, y: 14, label: "Leslie's, 2 mi",              detail: "In stock now",       href: "/folks",                 status: "info" },
];

const STATUS_COLOR: Record<Status, string> = {
  good: "var(--color-source-live)",
  warn: "var(--color-citrus, #E8A82C)",
  info: "var(--color-source-imported)",
  human: "var(--color-source-human)",
};

export default function Canvas2Page() {
  return (
    <div
      data-city="redlands"
      className="relative w-full overflow-auto h-[calc(100dvh-96px)] md:h-[calc(100dvh-72px)]"
      style={{
        backgroundColor: "var(--color-canvas-ground, #D4B896)",
        scrollBehavior: "smooth",
      }}
    >
      <div className="relative shrink-0" style={{ width: STAGE_W, height: STAGE_H }}>
        {/* Layer 0 — base macro without palm trees */}
        <div
          className="absolute inset-0 z-10 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: "url(/assets/canvas/layers/base-no-palms.png)",
            imageRendering: "pixelated",
          }}
          aria-hidden
        />

        {/* Layer 1 — palm fronds, left side, swaying */}
        <div
          className="absolute z-20 origin-bottom"
          style={{
            left: "-2%",
            top: "0%",
            width: "22%",
            height: "70%",
            animation: "palmSwayL 7s ease-in-out infinite",
            transformOrigin: "50% 95%",
          }}
          aria-hidden
        >
          <div
            className="h-full w-full bg-no-repeat bg-contain bg-bottom"
            style={{
              backgroundImage: "url(/assets/canvas/layers/palm.png)",
              imageRendering: "pixelated",
            }}
          />
        </div>

        {/* Layer 2 — palm fronds, right side, swaying with offset start */}
        <div
          className="absolute z-20"
          style={{
            right: "-1%",
            top: "20%",
            width: "20%",
            height: "60%",
            animation: "palmSwayR 8.5s ease-in-out infinite",
            transformOrigin: "50% 95%",
            animationDelay: "1.4s",
          }}
          aria-hidden
        >
          <div
            className="h-full w-full bg-no-repeat bg-contain bg-bottom"
            style={{
              backgroundImage: "url(/assets/canvas/layers/palm.png)",
              imageRendering: "pixelated",
              transform: "scaleX(-1)",
            }}
          />
        </div>

        <div
          className="absolute z-25 pointer-events-none select-none animate-pixelFloat"
          style={{ top: 80, left: 96 }}
          aria-hidden
        >
          <div
            className="font-pixel text-[44px] sm:text-[64px] leading-none uppercase"
            style={{
              color: "var(--color-mountain-shadow, #5C5546)",
              textShadow: "4px 4px 0 rgba(255, 240, 200, 0.4)",
            }}
          >
            Redlands
          </div>
          <div
            className="font-pixel text-[10px] sm:text-[12px] mt-3 tracking-[0.3em]"
            style={{ color: "var(--color-mountain-shadow, #5C5546)", opacity: 0.7 }}
          >
            CA · 92373 · MAY · LAYERED
          </div>
        </div>

        {HOTSPOTS.map((spot) => (
          <HotspotOrb key={spot.id} spot={spot} />
        ))}
      </div>

      <div className="pointer-events-none fixed top-4 right-4 z-30 flex flex-col items-end gap-2">
        <span
          className="rounded-full backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1.5"
          style={{ backgroundColor: "var(--color-mountain-shadow, #5C5546)" }}
        >
          Canvas 2 · layered test
        </span>
        <Link
          href="/canvas"
          className="rounded-full bg-white/85 backdrop-blur-sm text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1.5"
          style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
        >
          ← original canvas
        </Link>
      </div>
    </div>
  );
}

function HotspotOrb({ spot }: { spot: Hotspot }) {
  const color = STATUS_COLOR[spot.status];
  return (
    <Link
      href={spot.href}
      aria-label={spot.label}
      className="group absolute z-30"
      style={{
        left: `${spot.x}%`,
        top: `${spot.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative grid place-items-center w-[36px] h-[36px] sm:w-[44px] sm:h-[44px]">
        <span
          className="absolute inset-0 rounded-full animate-orbPulse"
          style={{ color }}
          aria-hidden
        />
        <span
          className="relative grid place-items-center rounded-full border-[3px] border-white w-[26px] h-[26px] sm:w-[32px] sm:h-[32px] shadow-[0_3px_8px_rgba(0,0,0,0.35)] group-hover:scale-110 transition-transform"
          style={{ backgroundColor: color }}
          aria-hidden
        >
          <span className="h-[6px] w-[6px] sm:h-[8px] sm:w-[8px] rounded-full bg-white/85" />
        </span>
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
        aria-hidden
      >
        <div
          className="rounded-xl border backdrop-blur-sm px-3 py-2 text-white shadow-[0_6px_16px_rgba(0,0,0,0.35)]"
          style={{
            backgroundColor: "var(--color-mountain-shadow, #5C5546)",
            borderColor: "rgba(255,255,255,0.15)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="h-[8px] w-[8px] rounded-full shrink-0"
              style={{ backgroundColor: color }}
              aria-hidden
            />
            <span className="text-[12px] font-extrabold tracking-[-0.005em]">{spot.label}</span>
          </div>
          <span className="block font-pixel text-[8px] tracking-[0.12em] mt-1 opacity-80">{spot.detail}</span>
        </div>
      </div>
    </Link>
  );
}
