import Link from "next/link";

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
  { id: "lounger", x: 14, y: 46, label: "Maya is here",                detail: "On the lounger, 2:14pm", href: "/care",            status: "human" },
  { id: "truck",   x: 62, y: 11, label: "Carlos, 4 mins up the street",detail: "Routes nearby",       href: "/folks/carlos-redlands", status: "human" },
  { id: "shop",    x: 92, y: 14, label: "Leslie's, 2 mi",              detail: "In stock now",       href: "/folks",                 status: "info" },
];

const STATUS_COLOR: Record<Status, string> = {
  good: "var(--color-source-live)",
  warn: "var(--color-citrus, #E8A82C)",
  info: "var(--color-source-imported)",
  human: "var(--color-source-human)",
};

export default function CanvasPage() {
  return (
    <div
      data-city="redlands"
      className="relative w-full overflow-auto h-[calc(100dvh-96px)] md:h-[calc(100dvh-72px)]"
      style={{
        backgroundColor: "var(--color-canvas-ground, #D4B896)",
        scrollBehavior: "smooth",
      }}
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

        {/* Ambient layer — birds, walkers, duck, all positioned absolutely
            over the macro image. Each is its own pixel-art SVG sprite with
            its own keyframe animation. Subtle, lofi-girl style. */}
        <AmbientLayer />

        <div
          className="absolute z-20 pointer-events-none select-none animate-pixelFloat"
          style={{ top: 80, left: 96 }}
          aria-hidden
        >
          <div className="font-pixel text-[44px] sm:text-[64px] leading-none uppercase"
               style={{
                 color: "var(--color-mountain-shadow, #5C5546)",
                 textShadow: "4px 4px 0 rgba(255, 240, 200, 0.4)",
               }}>
            Redlands
          </div>
          <div className="font-pixel text-[10px] sm:text-[12px] mt-3 tracking-[0.3em]"
               style={{ color: "var(--color-mountain-shadow, #5C5546)", opacity: 0.7 }}>
            CA · 92373 · MAY
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
          Redlands · explore
        </span>
        <span
          className="md:hidden rounded-full bg-white/85 backdrop-blur-sm text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1.5"
          style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
        >
          ↕ scroll the world
        </span>
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
            <span className="text-[12px] font-extrabold tracking-[-0.005em]">
              {spot.label}
            </span>
          </div>
          <span className="block font-pixel text-[8px] tracking-[0.12em] mt-1 opacity-80">
            {spot.detail}
          </span>
        </div>
      </div>
    </Link>
  );
}

/**
 * AmbientLayer: pixel-art SVG sprites drifting across the macro canvas on
 * long loops. Birds in the sky, a walker on the street, a family with a
 * stroller, and a duck bobbing on the pool. Lofi-girl style — never all at
 * once, never aggressive.
 *
 * Sprites are inline SVG with shape-rendering: crispEdges so they read as
 * true pixel art at any scale.
 */
function AmbientLayer() {
  return (
    <div
      className="absolute inset-0 z-15 pointer-events-none overflow-hidden"
      aria-hidden
      style={{ contain: "layout paint" }}
    >
      {/* Birds, sky drift */}
      <div className="absolute animate-flyLR" style={{ top: "6%", left: "-8%" }}>
        <BirdSprite />
      </div>
      <div className="absolute animate-flyRL" style={{ top: "11%", left: "108%", animationDelay: "9s" }}>
        <BirdSprite />
      </div>
      <div className="absolute animate-flyLR" style={{ top: "18%", left: "-12%", animationDelay: "16s" }}>
        <BirdSprite small />
      </div>

      {/* Walkers, on the street */}
      <div className="absolute animate-walkRL" style={{ top: "9%", left: "104%" }}>
        <WalkerSprite />
      </div>
      <div className="absolute animate-walkLR" style={{ top: "14%", left: "-6%", animationDelay: "12s" }}>
        <FamilyStrollerSprite />
      </div>

      {/* Pool surface — duck bobbing on the water */}
      <div
        className="absolute animate-floatBob"
        style={{ left: "46%", top: "62%" }}
      >
        <DuckSprite />
      </div>

      {/* Pump chugging — a subtle stacked indicator that floats over the pad */}
      <div
        className="absolute"
        style={{ left: "76%", top: "75%" }}
      >
        <ChuggingIndicator />
      </div>
    </div>
  );
}

const INK = "#3B342A";
const SHIRT = "#C75240";
const PANTS = "#1A4F8B";
const SKIN = "#E8B989";
const STROLLER = "#2C5F4A";
const DUCK_BODY = "#E8A82C";
const DUCK_BEAK = "#C75240";

function BirdSprite({ small = false }: { small?: boolean }) {
  const w = small ? 18 : 26;
  const h = small ? 12 : 18;
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 26 18"
      shapeRendering="crispEdges"
      aria-hidden
    >
      {/* outstretched wings */}
      <rect x="2" y="8" width="4" height="2" fill={INK} />
      <rect x="20" y="8" width="4" height="2" fill={INK} />
      <rect x="6" y="6" width="4" height="3" fill={INK} />
      <rect x="16" y="6" width="4" height="3" fill={INK} />
      {/* body */}
      <rect x="10" y="6" width="6" height="5" fill={INK} />
      {/* beak */}
      <rect x="16" y="8" width="2" height="1" fill={DUCK_BEAK} />
      {/* eye dot */}
      <rect x="14" y="8" width="1" height="1" fill="#F1E6D3" />
    </svg>
  );
}

function WalkerSprite() {
  return (
    <svg
      width="14"
      height="26"
      viewBox="0 0 14 26"
      shapeRendering="crispEdges"
      aria-hidden
    >
      {/* hat */}
      <rect x="3" y="0" width="8" height="2" fill={INK} />
      <rect x="2" y="2" width="10" height="1" fill={INK} />
      {/* head */}
      <rect x="4" y="3" width="6" height="5" fill={SKIN} />
      <rect x="5" y="5" width="1" height="1" fill={INK} />
      <rect x="8" y="5" width="1" height="1" fill={INK} />
      {/* torso */}
      <rect x="3" y="8" width="8" height="8" fill={SHIRT} />
      <rect x="3" y="11" width="8" height="1" fill="#A03A2A" />
      {/* arms */}
      <rect x="1" y="8" width="2" height="6" fill={SHIRT} />
      <rect x="11" y="9" width="2" height="6" fill={SHIRT} />
      {/* legs */}
      <rect x="3" y="16" width="3" height="7" fill={PANTS} />
      <rect x="8" y="16" width="3" height="7" fill={PANTS} />
      {/* feet */}
      <rect x="2" y="23" width="4" height="2" fill={INK} />
      <rect x="8" y="23" width="4" height="2" fill={INK} />
    </svg>
  );
}

function FamilyStrollerSprite() {
  return (
    <svg
      width="44"
      height="28"
      viewBox="0 0 44 28"
      shapeRendering="crispEdges"
      aria-hidden
    >
      {/* adult 1 */}
      <rect x="3" y="2" width="6" height="5" fill={SKIN} />
      <rect x="4" y="4" width="1" height="1" fill={INK} />
      <rect x="7" y="4" width="1" height="1" fill={INK} />
      <rect x="2" y="7" width="8" height="8" fill={STROLLER} />
      <rect x="2" y="15" width="3" height="7" fill={INK} />
      <rect x="7" y="15" width="3" height="7" fill={INK} />
      <rect x="1" y="22" width="4" height="2" fill={INK} />
      <rect x="6" y="22" width="4" height="2" fill={INK} />

      {/* adult 2 */}
      <rect x="13" y="2" width="6" height="5" fill={SKIN} />
      <rect x="14" y="4" width="1" height="1" fill={INK} />
      <rect x="17" y="4" width="1" height="1" fill={INK} />
      <rect x="12" y="7" width="8" height="8" fill={SHIRT} />
      <rect x="12" y="15" width="3" height="7" fill={PANTS} />
      <rect x="17" y="15" width="3" height="7" fill={PANTS} />
      <rect x="11" y="22" width="4" height="2" fill={INK} />
      <rect x="16" y="22" width="4" height="2" fill={INK} />

      {/* stroller canopy */}
      <rect x="23" y="8" width="10" height="2" fill={DUCK_BODY} />
      <rect x="22" y="10" width="12" height="6" fill={DUCK_BODY} />
      <rect x="23" y="11" width="2" height="4" fill={SKIN} />
      <rect x="24" y="13" width="1" height="1" fill={INK} />
      {/* handle */}
      <rect x="33" y="9" width="3" height="2" fill={INK} />
      <rect x="32" y="11" width="2" height="5" fill={INK} />
      {/* frame */}
      <rect x="22" y="16" width="14" height="1" fill={INK} />
      <rect x="22" y="17" width="2" height="5" fill={INK} />
      <rect x="34" y="17" width="2" height="5" fill={INK} />
      {/* wheels */}
      <rect x="20" y="22" width="6" height="4" fill={INK} />
      <rect x="32" y="22" width="6" height="4" fill={INK} />
      <rect x="22" y="23" width="2" height="2" fill="#6E6555" />
      <rect x="34" y="23" width="2" height="2" fill="#6E6555" />
    </svg>
  );
}

function DuckSprite() {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      shapeRendering="crispEdges"
      aria-hidden
    >
      {/* body */}
      <rect x="4" y="8" width="14" height="8" fill={DUCK_BODY} />
      <rect x="6" y="6" width="10" height="2" fill={DUCK_BODY} />
      <rect x="2" y="10" width="2" height="4" fill={DUCK_BODY} />
      {/* head */}
      <rect x="16" y="4" width="6" height="6" fill={DUCK_BODY} />
      <rect x="18" y="2" width="4" height="2" fill={DUCK_BODY} />
      {/* eye */}
      <rect x="20" y="6" width="1" height="1" fill={INK} />
      {/* beak */}
      <rect x="22" y="7" width="3" height="2" fill={DUCK_BEAK} />
      {/* shadow on water */}
      <rect x="2" y="16" width="22" height="1" fill="#1FA0BF" opacity="0.45" />
      <rect x="4" y="17" width="18" height="1" fill="#1FA0BF" opacity="0.3" />
    </svg>
  );
}

function ChuggingIndicator() {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="animate-pixelFloat" style={{ animationDuration: "1.4s" }}>
        <svg width="10" height="14" viewBox="0 0 10 14" shapeRendering="crispEdges" aria-hidden>
          <rect x="2" y="0" width="6" height="2" fill="var(--color-source-live)" />
          <rect x="0" y="2" width="10" height="2" fill="var(--color-source-live)" opacity="0.7" />
          <rect x="2" y="4" width="6" height="2" fill="var(--color-source-live)" opacity="0.45" />
        </svg>
      </div>
    </div>
  );
}
