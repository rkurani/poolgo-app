import Link from "next/link";

/**
 * Canvas 3: the full layered world.
 *
 * The base scene has no plants baked in. Six independently-animatable layers
 * compose the breathing version: two palms swaying out of sync, an orange tree
 * with occasional fruit drop, bougainvillea cascading down the fence with
 * petals drifting in the breeze, pool water shimmer, distant chimney smoke,
 * pool floats bobbing.
 *
 * Plus inline SVG ambient: birds drifting, a duck bobbing on the pool, a green
 * chugging indicator above the pump.
 *
 * Lofi-girl tempo. Nothing demands attention, everything is alive.
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
  { id: "pool",    x: 48, y: 60, label: "Today's water",                detail: "pH 7.4, ORP 720",      href: "/care",                  status: "good" },
  { id: "pad",     x: 78, y: 76, label: "The pad",                     detail: "5 systems, all live",  href: "/equipment",             status: "good" },
  { id: "lounger", x: 13, y: 60, label: "On the lounger",              detail: "Guest, 2:14pm",        href: "/care",                  status: "human" },
  { id: "truck",   x: 62, y: 11, label: "Carlos, 4 mins up the street",detail: "Routes nearby",        href: "/folks/carlos-redlands", status: "human" },
  { id: "shop",    x: 92, y: 14, label: "Leslie's, 2 mi",              detail: "In stock now",        href: "/folks",                  status: "info" },
];

const STATUS_COLOR: Record<Status, string> = {
  good: "var(--color-source-live)",
  warn: "var(--color-citrus, #E8A82C)",
  info: "var(--color-source-imported)",
  human: "var(--color-source-human)",
};

export default function Canvas3Page() {
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
        {/* z-10 — base layer, scene with no plants baked in */}
        <div
          className="absolute inset-0 z-10 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: "url(/assets/canvas/layers/base-clean.png)",
            imageRendering: "pixelated",
          }}
          aria-hidden
        />

        {/* z-15 — pool water sparkles, inline SVG twinkles scattered on the pool */}
        <PoolSparkles />

        {/* z-18 — chimney smoke from a distant house */}
        <div
          className="absolute z-[18] pointer-events-none"
          style={{
            left: "78%",
            top: "0%",
            width: "8%",
            height: "22%",
            animation: "smokeRise 8s linear infinite",
            transformOrigin: "bottom center",
          }}
          aria-hidden
        >
          <div
            className="h-full w-full bg-no-repeat bg-contain bg-bottom"
            style={{
              backgroundImage: "url(/assets/canvas/layers/smoke.png)",
              imageRendering: "pixelated",
              opacity: 0.85,
            }}
          />
        </div>

        {/* z-20 — palm fronds, left side, swaying */}
        <div
          className="absolute z-20"
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

        {/* z-20 — palm fronds, right side */}
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

        {/* z-22 — orange tree, sits between pool and equipment pad (clear of lounger) */}
        <div
          className="absolute z-[22]"
          style={{
            left: "64%",
            top: "22%",
            width: "13%",
            height: "48%",
            animation: "treeSway 6s ease-in-out infinite",
            transformOrigin: "50% 95%",
            animationDelay: "0.7s",
          }}
          aria-hidden
        >
          <div
            className="h-full w-full bg-no-repeat bg-contain bg-bottom"
            style={{
              backgroundImage: "url(/assets/canvas/layers/orange-tree.png)",
              imageRendering: "pixelated",
            }}
          />
          {/* an occasional orange dropping */}
          <span
            className="absolute"
            style={{
              left: "55%",
              top: "30%",
              width: 10,
              height: 10,
              borderRadius: 2,
              backgroundColor: "#E8761A",
              animation: "fruitDrop 22s ease-in 8s infinite",
              opacity: 0,
            }}
            aria-hidden
          />
        </div>

        {/* z-21 — bougainvillea vine cascading over the back fence (anchored above
            the existing fence in the base, no second fence rendered) */}
        <div
          className="absolute z-[21]"
          style={{
            left: "42%",
            top: "8%",
            width: "22%",
            height: "18%",
            animation: "bougainSway 9s ease-in-out infinite",
            transformOrigin: "50% 100%",
          }}
          aria-hidden
        >
          <div
            className="h-full w-full bg-no-repeat bg-contain bg-top"
            style={{
              backgroundImage: "url(/assets/canvas/layers/bougainvillea-vine.png)",
              imageRendering: "pixelated",
            }}
          />
        </div>

        {/* z-23 — bougainvillea petals drifting on the breeze */}
        <PetalField />

        {/* z-25 — Redlands watermark */}
        <div
          className="absolute z-[25] pointer-events-none select-none animate-pixelFloat"
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
            CA · 92373 · GOLDEN HOUR
          </div>
        </div>

        {/* z-30 — hot-spot orbs */}
        {HOTSPOTS.map((spot) => (
          <HotspotOrb key={spot.id} spot={spot} />
        ))}
      </div>

      <div className="pointer-events-none fixed top-4 right-4 z-30 flex flex-col items-end gap-2">
        <span
          className="rounded-full backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1.5"
          style={{ backgroundColor: "var(--color-mountain-shadow, #5C5546)" }}
        >
          Canvas 3 · the breathing world
        </span>
        <Link
          href="/canvas"
          className="rounded-full bg-white/85 backdrop-blur-sm text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1.5 pointer-events-auto"
          style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
        >
          ← original canvas
        </Link>
      </div>
    </div>
  );
}

/**
 * PoolSparkles: scattered chunky white pixels on the pool surface that
 * twinkle in and out on their own timers. Replaces the rectangular shimmer
 * overlay which read as a tiled box rather than ambient sparkle.
 */
function PoolSparkles() {
  // Pool zone approx x: 32-66%, y: 56-78%
  const sparkles = [
    { x: 36, y: 62, delay: 0.0, dur: 3.6 },
    { x: 41, y: 68, delay: 1.4, dur: 4.2 },
    { x: 47, y: 60, delay: 0.7, dur: 3.0 },
    { x: 52, y: 71, delay: 2.1, dur: 4.5 },
    { x: 56, y: 65, delay: 1.0, dur: 3.4 },
    { x: 60, y: 73, delay: 2.8, dur: 4.0 },
    { x: 44, y: 75, delay: 0.4, dur: 3.8 },
    { x: 50, y: 58, delay: 1.7, dur: 3.2 },
    { x: 38, y: 70, delay: 2.4, dur: 4.4 },
    { x: 58, y: 60, delay: 0.9, dur: 3.7 },
    { x: 54, y: 64, delay: 1.6, dur: 4.1 },
    { x: 42, y: 72, delay: 2.3, dur: 3.5 },
  ];
  return (
    <div className="absolute inset-0 z-[15] pointer-events-none" aria-hidden>
      {sparkles.map((s, i) => (
        <span
          key={i}
          className="absolute block"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: 6,
            height: 6,
            backgroundColor: "white",
            opacity: 0,
            boxShadow: "0 0 6px rgba(255,255,255,0.85)",
            animation: `sparkleTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function PetalField() {
  // 12 bougainvillea petals drifting down on slightly different paths/timings.
  // Each petal is an inline SVG rect cluster (~6x4px chunky pixel petal), CSS
  // animates translateY + translateX wobble + rotation + opacity fade.
  const petals = Array.from({ length: 12 }, (_, i) => ({
    left: 45 + (i * 2.4) % 28, // spread along the fence width
    delay: (i * 1.7) % 18,
    duration: 14 + ((i * 1.3) % 8),
    color: i % 3 === 0 ? "#C75240" : i % 3 === 1 ? "#D4248A" : "#E8528A",
  }));

  return (
    <div className="absolute inset-0 z-[23] pointer-events-none overflow-hidden" aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: "20%",
            width: 6,
            height: 4,
            backgroundColor: p.color,
            animation: `petalDrift ${p.duration}s linear ${p.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
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
