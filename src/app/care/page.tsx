import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Camera, Plus, Calendar } from "lucide-react";

const VITALS = [
  { chem: "pH", value: "7.4", unit: "", target: "7.2–7.6", state: "in-range", source: "imported" },
  { chem: "ORP", value: "720", unit: "mV", target: "650–750", state: "in-range", source: "live" },
  { chem: "Free Cl", value: "2.4", unit: "ppm", target: "1–3", state: "in-range", source: "imported" },
  { chem: "CYA", value: "42", unit: "ppm", target: "30–50", state: "climbing", source: "imported" },
];

const SOURCE_TONE: Record<string, string> = {
  live: "var(--color-source-live)",
  imported: "var(--color-source-imported)",
  human: "var(--color-source-human)",
  ai: "var(--color-source-ai)",
};

// Synthetic 30-day pH history with mild drift and partial-drain reset.
const CHART_DATA: { day: number; pH: number; tested: boolean }[] = [
  { day: 1, pH: 7.5, tested: true },
  { day: 2, pH: 7.5, tested: false },
  { day: 3, pH: 7.5, tested: false },
  { day: 4, pH: 7.6, tested: true },
  { day: 5, pH: 7.6, tested: false },
  { day: 6, pH: 7.7, tested: false },
  { day: 7, pH: 7.7, tested: true },
  { day: 8, pH: 7.7, tested: false },
  { day: 9, pH: 7.8, tested: false },
  { day: 10, pH: 7.8, tested: true },
  { day: 11, pH: 7.4, tested: true },
  { day: 12, pH: 7.4, tested: false },
  { day: 13, pH: 7.4, tested: false },
  { day: 14, pH: 7.5, tested: true },
  { day: 15, pH: 7.5, tested: false },
  { day: 16, pH: 7.5, tested: false },
  { day: 17, pH: 7.5, tested: true },
  { day: 18, pH: 7.6, tested: false },
  { day: 19, pH: 7.6, tested: true },
  { day: 20, pH: 7.6, tested: false },
  { day: 21, pH: 7.5, tested: false },
  { day: 22, pH: 7.5, tested: true },
  { day: 23, pH: 7.5, tested: false },
  { day: 24, pH: 7.4, tested: false },
  { day: 25, pH: 7.4, tested: true },
  { day: 26, pH: 7.4, tested: false },
  { day: 27, pH: 7.4, tested: true },
  { day: 28, pH: 7.4, tested: false },
  { day: 29, pH: 7.4, tested: false },
  { day: 30, pH: 7.4, tested: true },
];

type Test = {
  id: string;
  source: { name: string; logo: string | null; tone: string };
  when: string;
  summary: string;
  detail: string;
};

const TESTS: Test[] = [
  {
    id: "leslies-1",
    source: { name: "Leslie's", logo: "/assets/leslies.png", tone: "imported" },
    when: "2 days ago",
    summary: "Free water test · all in range",
    detail: "FC 2.4 · pH 7.4 · TA 90 · CYA 42 · CH 280. Carlos picked this up Tuesday on his way through.",
  },
  {
    id: "carlos-1",
    source: { name: "Carlos M.", logo: "/assets/folks/carlos-portrait.png", tone: "human" },
    when: "5 days ago",
    summary: "Weekly visit · pH balanced 7.8 → 7.4",
    detail: "Refilled tabs (3 lbs). Backwashed Hayward sand filter. Noted CYA climbing — flagged for partial drain Tue.",
  },
  {
    id: "live-1",
    source: { name: "IntelliFlo3 + ORP probe", logo: "/assets/intelliflo3.png", tone: "live" },
    when: "7 minutes ago",
    summary: "ORP 720 mV · stable",
    detail: "On-pad telemetry — readout from the Pentair salt-cell flow loop. Refreshes every 90 seconds.",
  },
];

type Observation = {
  id: string;
  who: string;
  when: string;
  caption: string;
  photo: string;
};

const OBSERVATIONS: Observation[] = [
  {
    id: "lin-1",
    who: "Lin (you)",
    when: "Yesterday · 6:14 PM",
    caption: "Dust storm last night. Surface looks slightly cloudy at the deep end.",
    photo: "/assets/pool-hero.jpg",
  },
  {
    id: "lin-2",
    who: "Lin (you)",
    when: "Apr 18 · 8:02 AM",
    caption: "Tile line — small white film. Worth a look on Tuesday.",
    photo: "/assets/pool-hero.jpg",
  },
];

export default function CarePage() {
  return (
    <div
      data-city="redlands"
      className="min-h-[calc(100dvh-96px)] md:min-h-[calc(100dvh-72px)]"
      style={{ backgroundColor: "var(--color-canvas-ground, #D4B896)" }}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-10 pt-6 pb-32 md:pb-16 flex flex-col gap-10 sm:gap-14">
        <Link
          href="/canvas"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] w-fit hover:translate-x-[-2px] transition-transform"
          style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          back to your backyard
        </Link>

        {/* Hero verdict */}
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-pixel text-[10px] sm:text-[11px] uppercase tracking-[0.2em]"
                  style={{ color: "var(--color-mountain-shadow, #5C5546)" }}>
              Care · Redlands · last test 2 days ago
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
                  style={{ backgroundColor: "var(--color-source-live)", color: "white" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              all green
            </span>
          </div>
          <h1 className="text-[44px] sm:text-[64px] leading-[0.95] font-extrabold tracking-[-0.03em]"
              style={{ color: "var(--color-data-ink, #3B342A)" }}>
            Pool&rsquo;s healthy.
          </h1>
          <p className="text-[16px] sm:text-[19px] font-medium leading-snug max-w-[640px]"
             style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
            CYA crept up to 42 ppm — Carlos drops by Tuesday for the partial drain. Then we&rsquo;re caught
            up. Free chlorine, pH, and alkalinity all sitting in the middle of their bands.
          </p>
          <div className="pixel-bar mt-3" aria-hidden />
        </header>

        {/* Live vitals */}
        <section className="flex flex-col gap-5">
          <SectionHeader title="Right now." caption="four readings · sources mixed (live, imported, store-tested)" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {VITALS.map((v) => (
              <div
                key={v.chem}
                className="rounded-2xl border-2 p-4 sm:p-5 flex flex-col gap-1 relative overflow-hidden"
                style={{
                  backgroundColor: "var(--color-data-cream, #F1E6D3)",
                  borderColor: "var(--color-card-border, #B89B6A)",
                }}
              >
                <span
                  className="absolute top-0 left-0 right-0 h-[5px]"
                  style={{ backgroundColor: SOURCE_TONE[v.source] }}
                  aria-hidden
                />
                <div className="flex items-baseline justify-between gap-2 mt-2">
                  <span className="font-pixel text-[10px] uppercase tracking-[0.18em]"
                        style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                    {v.chem}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.08em]"
                        style={{ color: SOURCE_TONE[v.source] }}>
                    {v.source}
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[36px] sm:text-[44px] leading-none font-extrabold tracking-[-0.03em]"
                        style={{
                          color: "var(--color-data-ink, #3B342A)",
                          fontFeatureSettings: '"tnum"',
                        }}>
                    {v.value}
                  </span>
                  {v.unit && (
                    <span className="text-[14px] font-semibold pb-1"
                          style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                      {v.unit}
                    </span>
                  )}
                </div>
                <span className="text-[12px] font-semibold mt-1"
                      style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                  Target {v.target}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 30-day chart */}
        <section className="flex flex-col gap-5">
          <SectionHeader title="pH · last 30 days." caption="smooth line, pixel-stepped grid · ideal band 7.2–7.6" />
          <div
            className="rounded-2xl border-[3px] p-5 sm:p-6 shadow-[6px_6px_0_0_rgba(59,52,42,0.12)]"
            style={{
              backgroundColor: "var(--color-data-cream, #F1E6D3)",
              borderColor: "var(--color-mountain-shadow, #5C5546)",
            }}
          >
            <PHChart />
            <div className="flex items-center justify-between gap-3 mt-3 pt-4 border-t-2"
                 style={{ borderColor: "var(--color-card-border, #B89B6A)" }}>
              <div className="flex items-center gap-4 flex-wrap">
                <LegendDot color="var(--color-terracotta, #C75240)" label="pH curve" />
                <LegendDot color="var(--color-citrus, #E8A82C)" label="tested" />
                <LegendDot color="var(--color-source-live)" label="ideal band" filled />
              </div>
              <span className="font-pixel text-[10px] tracking-[0.08em] hidden sm:inline"
                    style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                day 1 → day 30
              </span>
            </div>
          </div>
        </section>

        {/* Recent water tests with real-logo frames */}
        <section className="flex flex-col gap-5">
          <SectionHeader title="Recent tests." caption="three sources · real logos in pixel frames" />
          <div className="flex flex-col gap-4">
            {TESTS.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border-2 p-5 flex flex-col sm:flex-row gap-5 items-start"
                style={{
                  backgroundColor: "var(--color-data-cream, #F1E6D3)",
                  borderColor: "var(--color-card-border, #B89B6A)",
                }}
              >
                <LogoFrame src={t.source.logo} alt={t.source.name} tone={SOURCE_TONE[t.source.tone]} />
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[16px] font-extrabold tracking-[-0.005em]"
                            style={{ color: "var(--color-data-ink, #3B342A)" }}>
                        {t.source.name}
                      </span>
                      <span className="font-pixel text-[9px] uppercase tracking-[0.12em] rounded px-2 py-0.5"
                            style={{
                              backgroundColor: SOURCE_TONE[t.source.tone],
                              color: "white",
                            }}>
                        {t.source.tone}
                      </span>
                    </div>
                    <span className="font-pixel text-[10px] tracking-[0.08em]"
                          style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                      {t.when}
                    </span>
                  </div>
                  <span className="text-[15px] font-bold tracking-[-0.005em]"
                        style={{ color: "var(--color-data-ink, #3B342A)" }}>
                    {t.summary}
                  </span>
                  <p className="text-[13px] leading-snug"
                     style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                    {t.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Photos / observations */}
        <section className="flex flex-col gap-5">
          <SectionHeader title="Your observations." caption="real photos in pixel frames · the world&rsquo;s visual register holds" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {OBSERVATIONS.map((o) => (
              <PhotoFrame key={o.id} obs={o} />
            ))}
            <button
              className="rounded-2xl border-2 border-dashed p-8 flex flex-col items-center justify-center gap-3 hover:bg-black/5 transition-colors min-h-[260px]"
              style={{
                borderColor: "var(--color-mountain-shadow, #5C5546)",
                color: "var(--color-mountain-shadow, #5C5546)",
              }}
            >
              <div className="grid place-items-center h-12 w-12 rounded-xl"
                   style={{
                     backgroundColor: "var(--color-citrus, #E8A82C)",
                     color: "var(--color-mountain-shadow, #5C5546)",
                   }}>
                <Camera size={24} strokeWidth={2.4} />
              </div>
              <span className="text-[15px] font-extrabold">Add an observation</span>
              <span className="text-[12px] text-center max-w-[200px]"
                    style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                Snap a photo of the water, the tile, an algae spot — it lands here in a pixel frame.
              </span>
            </button>
          </div>
        </section>

        {/* Next actions */}
        <section
          className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[6px_6px_0_0_rgba(59,52,42,0.25)]"
          style={{
            backgroundColor: "var(--color-terracotta, #C75240)",
            color: "white",
          }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] opacity-90">
              Next thing happening to your water
            </span>
            <h3 className="text-[26px] sm:text-[32px] leading-tight font-extrabold tracking-[-0.02em]">
              Tuesday April 14 · partial drain
            </h3>
            <span className="text-[13px] opacity-90">
              Carlos · 9:00 AM · ~3 hours · brings CYA back to ~30 ppm
            </span>
          </div>
          <Link
            href="/folks/carlos-redlands"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-4 text-[15px] font-bold bg-white shadow-[3px_3px_0_0_rgba(0,0,0,0.25)] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] transition-all"
            style={{ color: "var(--color-terracotta, #C75240)" }}
          >
            See Carlos
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </section>

        {/* Quick add row */}
        <section className="flex flex-wrap gap-3 justify-center">
          <button
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13px] font-bold border-2"
            style={{
              backgroundColor: "var(--color-data-cream, #F1E6D3)",
              borderColor: "var(--color-mountain-shadow, #5C5546)",
              color: "var(--color-data-ink, #3B342A)",
            }}
          >
            <Plus size={14} strokeWidth={2.5} />
            Log a test
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13px] font-bold border-2"
            style={{
              backgroundColor: "var(--color-data-cream, #F1E6D3)",
              borderColor: "var(--color-mountain-shadow, #5C5546)",
              color: "var(--color-data-ink, #3B342A)",
            }}
          >
            <Camera size={14} strokeWidth={2.5} />
            Add a photo
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13px] font-bold border-2"
            style={{
              backgroundColor: "var(--color-data-cream, #F1E6D3)",
              borderColor: "var(--color-mountain-shadow, #5C5546)",
              color: "var(--color-data-ink, #3B342A)",
            }}
          >
            <Calendar size={14} strokeWidth={2.5} />
            Schedule a test
          </button>
        </section>
      </div>
    </div>
  );
}

/**
 * LogoFrame: a real logo image (Leslie's, Hayward, a pro's headshot) sits in a
 * chunky pixel-chrome frame. Real logos appear as themselves; the frame is the
 * connective tissue that anchors them in the pixel-art world.
 */
function LogoFrame({ src, alt, tone, size = 80 }: { src: string | null; alt: string; tone: string; size?: number }) {
  // Pixel portraits fill edge-to-edge inside the warm chip.
  // Real product/business logos sit on a clean white inner panel so their
  // baked-in white background reads as intentional plaque, not bleed.
  const isPortrait = src ? src.includes("portrait") : false;
  return (
    <div
      className="relative rounded-xl border-2 overflow-hidden shrink-0 shadow-[3px_3px_0_0_rgba(59,52,42,0.18)]"
      style={{
        width: size,
        height: size,
        borderColor: "var(--color-mountain-shadow, #5C5546)",
        backgroundColor: "var(--color-data-cream-2, #E5D7BE)",
      }}
    >
      <span
        className="absolute top-0 left-0 right-0 z-10 h-[4px]"
        style={{ backgroundColor: tone }}
        aria-hidden
      />
      {src ? (
        isPortrait ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="80px"
            className="object-cover"
            style={{ imageRendering: "pixelated" }}
          />
        ) : (
          <div className="absolute inset-0 p-2 pt-3">
            <div
              className="relative h-full w-full bg-white rounded-md border grid place-items-center"
              style={{ borderColor: "var(--color-mountain-shadow, #5C5546)" }}
            >
              <div className="relative h-3/5 w-4/5">
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
        )
      ) : (
        <div className="h-full w-full grid place-items-center font-pixel text-[12px]"
             style={{ color: "var(--color-mountain-shadow, #5C5546)" }}>
          {alt.split(" ").slice(0, 2).map((s) => s[0]).join("")}
        </div>
      )}
    </div>
  );
}

/**
 * PhotoFrame: a user-uploaded photo (real photo, real logos visible if present)
 * inside a pixel-chrome card. Polaroid-meets-game-card energy.
 */
function PhotoFrame({ obs }: { obs: Observation }) {
  return (
    <div
      className="rounded-2xl border-[3px] overflow-hidden shadow-[4px_4px_0_0_rgba(59,52,42,0.18)]"
      style={{
        backgroundColor: "var(--color-data-cream, #F1E6D3)",
        borderColor: "var(--color-mountain-shadow, #5C5546)",
      }}
    >
      <div
        className="aspect-[4/3] w-full bg-no-repeat bg-cover bg-center border-b-[3px]"
        style={{
          backgroundImage: `url(${obs.photo})`,
          borderColor: "var(--color-mountain-shadow, #5C5546)",
        }}
        aria-label={obs.caption}
      />
      <div className="p-4 flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[13px] font-bold tracking-[-0.005em]"
                style={{ color: "var(--color-data-ink, #3B342A)" }}>
            {obs.who}
          </span>
          <span className="font-pixel text-[10px] tracking-[0.08em]"
                style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
            {obs.when}
          </span>
        </div>
        <p className="text-[13px] leading-snug"
           style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
          {obs.caption}
        </p>
      </div>
    </div>
  );
}

/**
 * Inline SVG pH chart — smooth line, pixel-stepped grid, citrus dots on tested
 * days. Data integrity stays editorial; chrome stays pixelated.
 */
function PHChart() {
  const W = 800;
  const H = 240;
  const padX = 32;
  const padY = 24;
  const innerW = W - padX * 2;
  const innerH = H - padY * 2;
  const phMin = 6.8;
  const phMax = 8.2;

  const xFor = (day: number) => padX + ((day - 1) / 29) * innerW;
  const yFor = (ph: number) => padY + (1 - (ph - phMin) / (phMax - phMin)) * innerH;

  // Build smooth path with cubic curves
  const pts = CHART_DATA.map((d) => [xFor(d.day), yFor(d.pH)] as const);
  let pathD = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    pathD += ` C ${cx.toFixed(1)} ${y0.toFixed(1)}, ${cx.toFixed(1)} ${y1.toFixed(1)}, ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }

  // Ideal band 7.2-7.6
  const bandTop = yFor(7.6);
  const bandBottom = yFor(7.2);

  // pixel-stepped horizontal gridlines at 7.0, 7.4, 7.8
  const gridLines = [7.0, 7.4, 7.8];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <rect
        x={padX}
        y={bandTop}
        width={innerW}
        height={bandBottom - bandTop}
        fill="var(--color-source-live)"
        opacity="0.14"
      />

      {gridLines.map((g) => (
        <g key={g}>
          {Array.from({ length: 50 }).map((_, i) => (
            <rect
              key={i}
              x={padX + (i * innerW) / 50}
              y={yFor(g)}
              width={innerW / 50 / 2}
              height="1"
              fill="var(--color-card-border, #B89B6A)"
            />
          ))}
          <text
            x={padX - 8}
            y={yFor(g) + 3}
            textAnchor="end"
            fontSize="10"
            fontFamily="var(--font-press-start)"
            fill="var(--color-data-ink-mute, #6E6555)"
          >
            {g.toFixed(1)}
          </text>
        </g>
      ))}

      {/* Smooth pH curve */}
      <path d={pathD} fill="none" stroke="var(--color-terracotta, #C75240)" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />

      {/* Test points as citrus dots */}
      {CHART_DATA.filter((d) => d.tested).map((d) => (
        <g key={d.day}>
          <circle cx={xFor(d.day)} cy={yFor(d.pH)} r="6" fill="var(--color-citrus, #E8A82C)" stroke="var(--color-mountain-shadow, #5C5546)" strokeWidth="2" />
        </g>
      ))}

      {/* Today marker */}
      <line
        x1={xFor(30)}
        y1={padY}
        x2={xFor(30)}
        y2={H - padY}
        stroke="var(--color-mountain-shadow, #5C5546)"
        strokeWidth="1"
        strokeDasharray="3 4"
        opacity="0.5"
      />
      <text
        x={xFor(30) - 4}
        y={padY + 12}
        textAnchor="end"
        fontSize="10"
        fontFamily="var(--font-press-start)"
        fill="var(--color-mountain-shadow, #5C5546)"
        opacity="0.8"
      >
        TODAY
      </text>
    </svg>
  );
}

function LegendDot({ color, label, filled = false }: { color: string; label: string; filled?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 text-[12px] font-semibold"
          style={{ color: "var(--color-data-ink, #3B342A)" }}>
      <span
        className="h-2 w-2 rounded-full"
        style={{
          backgroundColor: filled ? color : "transparent",
          border: `2px solid ${color}`,
          opacity: filled ? 0.5 : 1,
        }}
        aria-hidden
      />
      {label}
    </span>
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
