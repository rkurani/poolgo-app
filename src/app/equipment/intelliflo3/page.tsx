import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Activity, Wrench, Calendar, FileText, Zap, ShieldCheck, BadgeCheck } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const STATS = [
  { label: "RPM", value: "1,750", caption: "Stage B" },
  { label: "Power", value: "742W", caption: "78% of max" },
  { label: "Flow", value: "62 GPM", caption: "Pool loop" },
  { label: "Hours", value: "1,287", caption: "Lifetime" },
];

const SCHEDULE = [
  { window: "06:00–08:30", stage: "Stage A · 1,100 RPM", note: "Slow morning circulate" },
  { window: "08:30–11:30", stage: "Stage B · 1,750 RPM", note: "Filtration · current" },
  { window: "11:30–14:00", stage: "Stage C · 2,400 RPM", note: "Cleaner runs piggyback" },
  { window: "14:00–18:00", stage: "Idle", note: "Off, solar shoulder" },
  { window: "18:00–22:00", stage: "Stage A · 1,100 RPM", note: "Evening circulate" },
];

const HISTORY = [
  { date: "May 9", actor: "Carlos M.", note: "Quarterly inspection · cleaned shaft seal" },
  { date: "Apr 12", actor: "Carlos M.", note: "Capacitor swap · 4yr maintenance" },
  { date: "Mar 1", actor: "Live", note: "Firmware updated to v3.4.1" },
  { date: "Jan 18", actor: "Carlos M.", note: "Weekly · noise check, clean" },
];

export default function IntelliFlo3Page() {
  return (
    <div
      data-city="redlands"
      data-brand="pentair"
      className="min-h-[calc(100dvh-96px)] md:min-h-[calc(100dvh-72px)]"
      style={{ backgroundColor: "var(--color-canvas-ground, #D4B896)" }}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-10 pt-6 pb-32 md:pb-16 flex flex-col gap-10 sm:gap-14">
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/canvas"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] hover:translate-x-[-2px] transition-transform"
            style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            backyard
          </Link>
          <span style={{ color: "var(--color-mountain-shadow, #5C5546)", opacity: 0.4 }}>/</span>
          <Link
            href="/equipment"
            className="text-[12px] font-semibold uppercase tracking-[0.08em] hover:underline"
            style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
          >
            pad
          </Link>
          <span style={{ color: "var(--color-mountain-shadow, #5C5546)", opacity: 0.4 }}>/</span>
          <span className="text-[12px] font-bold uppercase tracking-[0.08em]"
                style={{ color: "var(--color-data-ink, #3B342A)" }}>
            IntelliFlo3
          </span>
        </div>

        {/* Zoom hero. Pixel portrait, then photoreal product. */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
          <div
            className="relative aspect-square rounded-2xl overflow-hidden border-[3px] shadow-[6px_6px_0_0_rgba(59,52,42,0.18)]"
            style={{
              borderColor: "var(--color-mountain-shadow, #5C5546)",
              backgroundImage: "url(/assets/canvas/pump-portrait.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              imageRendering: "pixelated",
              backgroundColor: "var(--color-data-cream, #F1E6D3)",
            }}
            aria-label="Pixel-art portrait of IntelliFlo3"
          >
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              <span className="font-pixel text-[9px] uppercase tracking-[0.18em] px-2 py-1 rounded"
                    style={{ backgroundColor: "var(--brand-accent)", color: "white" }}>
                Zoom 1 · Pixel
              </span>
            </div>
          </div>
          <div
            className="relative aspect-square rounded-2xl overflow-hidden border-[3px] shadow-[6px_6px_0_0_rgba(59,52,42,0.18)] bg-no-repeat bg-cover bg-center"
            style={{
              borderColor: "var(--color-mountain-shadow, #5C5546)",
              backgroundColor: "var(--color-data-cream, #F1E6D3)",
              backgroundImage: "url(/assets/intelliflo3.jpg)",
            }}
            aria-label="Photoreal IntelliFlo3 product shot"
          >
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              <span className="font-pixel text-[9px] uppercase tracking-[0.18em] px-2 py-1 rounded"
                    style={{ backgroundColor: "var(--color-mountain-shadow, #5C5546)", color: "white" }}>
                Zoom 2 · Photoreal
              </span>
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] bg-white/80 backdrop-blur-sm rounded px-2 py-1"
                    style={{ color: "var(--color-mountain-shadow, #5C5546)" }}>
                3D coming soon
              </span>
            </div>
          </div>
        </section>

{/* Real-logo trust strip: real OEM logo + warranty + certifications, framed in pixel chrome */}
        <section className="flex flex-col gap-3">
          <span className="font-pixel text-[10px] uppercase tracking-[0.2em]"
                style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
            Certified, branded, on warranty
          </span>
          <div className="flex flex-wrap gap-3 sm:gap-4 items-stretch">
            <RealLogoChip
              src="/assets/pentair.jpg"
              alt="Pentair"
              tone="var(--brand-accent)"
              softTone="var(--color-pentair-soft, #E5ECF4)"
              tagline="Authentic OEM"
            />
            <WordChip Icon={ShieldCheck} title="4-yr warranty" body="Active until Sep 2026" tone="var(--color-source-live)" />
            <WordChip Icon={BadgeCheck} title="Carlos certified" body="Authorized service" tone="var(--color-source-human)" />
            <RealLogoChip
              src="/assets/leslies.png"
              alt="Leslie's"
              tone="var(--color-leslies, #0046A8)"
              softTone="var(--color-leslies-soft, #DEE8F7)"
              tagline="Parts in stock locally"
            />
          </div>
        </section>

        {/* Identity */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-pixel text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: "var(--brand-accent)" }}>
              PENTAIR · Variable Speed
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
                  style={{ backgroundColor: "var(--color-source-live)", color: "white" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              LIVE · STAGE B
            </span>
          </div>
          <h1 className="text-[44px] sm:text-[64px] leading-[0.95] font-extrabold tracking-[-0.03em]"
              style={{ color: "var(--color-data-ink, #3B342A)" }}>
            IntelliFlo3 VSF.
          </h1>
          <p className="text-[15px] sm:text-[17px] font-medium leading-snug max-w-[640px]"
             style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
            Your circulation pump. Variable-speed, programmable in 8 stages, paired with the SunCountry salt
            cell on the same line. Installed 2022 · 4-year warranty active.
          </p>
        </section>

        {/* Live stats */}
        <section className="flex flex-col gap-5">
          <SectionHeader title="Live, right now." caption="last sync 7 seconds ago" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border-2 p-5 flex flex-col gap-1 relative overflow-hidden"
                style={{
                  backgroundColor: "var(--color-data-cream, #F1E6D3)",
                  borderColor: "var(--color-card-border, #B89B6A)",
                }}
              >
                <span
                  className="absolute top-0 left-0 right-0 h-[4px]"
                  style={{ backgroundColor: "var(--brand-accent)" }}
                  aria-hidden
                />
                <span className="font-pixel text-[10px] uppercase tracking-[0.18em] mt-1"
                      style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                  {s.label}
                </span>
                <span className="text-[36px] sm:text-[44px] leading-none font-extrabold tracking-[-0.03em]"
                      style={{
                        color: "var(--color-data-ink, #3B342A)",
                        fontFeatureSettings: '"tnum"',
                      }}>
                  {s.value}
                </span>
                <span className="text-[12px] font-semibold mt-1"
                      style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                  {s.caption}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Schedule */}
        <section className="flex flex-col gap-5">
          <SectionHeader title="Today's schedule." />
          <div
            className="rounded-2xl border-2 overflow-hidden"
            style={{
              backgroundColor: "var(--color-data-cream, #F1E6D3)",
              borderColor: "var(--color-card-border, #B89B6A)",
            }}
          >
            {SCHEDULE.map((slot, i) => (
              <div
                key={slot.window}
                className="flex items-center gap-4 px-5 py-4 border-b-2 last:border-b-0"
                style={{ borderColor: "var(--color-card-border, #B89B6A)" }}
              >
                <span className="font-pixel text-[10px] tracking-[0.1em] w-[100px] sm:w-[140px] shrink-0"
                      style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                  {slot.window}
                </span>
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{
                    backgroundColor: i === 1 ? "var(--color-source-live)" : "var(--color-card-border, #B89B6A)",
                  }}
                />
                <div className="flex flex-col gap-0.5 flex-1">
                  <span className="text-[14px] font-bold tracking-[-0.005em]"
                        style={{ color: "var(--color-data-ink, #3B342A)" }}>
                    {slot.stage}
                  </span>
                  <span className="text-[12px]"
                        style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                    {slot.note}
                  </span>
                </div>
                {i === 1 && (
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] rounded-full px-2 py-1"
                        style={{
                          backgroundColor: "var(--color-source-live)",
                          color: "white",
                        }}>
                    NOW
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Service history */}
        <section className="flex flex-col gap-5">
          <SectionHeader title="Service history." />
          <div className="flex flex-col">
            {HISTORY.map((row, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-4 border-b-2 last:border-b-0"
                style={{ borderColor: "var(--color-card-border, #B89B6A)" }}
              >
                <span className="font-pixel text-[10px] tracking-[0.08em] w-[64px] shrink-0 pt-1"
                      style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                  {row.date}
                </span>
                <div
                  className="grid place-items-center h-9 w-9 rounded-full shrink-0"
                  style={{
                    backgroundColor: row.actor === "Live"
                      ? "var(--color-source-live)"
                      : "var(--color-source-human)",
                    color: "white",
                  }}
                >
                  {row.actor === "Live" ? <Activity size={16} strokeWidth={2.5} /> : <Wrench size={16} strokeWidth={2.5} />}
                </div>
                <div className="flex flex-col gap-0.5 flex-1">
                  <span className="text-[14px] font-bold tracking-[-0.005em]"
                        style={{ color: "var(--color-data-ink, #3B342A)" }}>
                    {row.actor}
                  </span>
                  <span className="text-[13px]"
                        style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                    {row.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick actions */}
        <section className="flex flex-col gap-5">
          <SectionHeader title="What you can do." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { Icon: Calendar, title: "Book service", body: "Carlos · Tuesday route", href: "/folks/carlos-redlands" },
              { Icon: Zap, title: "Adjust schedule", body: "Five stages, drag and drop", href: "/equipment" },
              { Icon: FileText, title: "Manual & warranty", body: "PDF · firmware notes · spare parts", href: "/equipment" },
            ].map((a) => (
              <Link
                key={a.title}
                href={a.href}
                className="rounded-xl border-2 p-5 flex flex-col gap-2 hover:translate-y-[-2px] transition-transform"
                style={{
                  backgroundColor: "var(--color-data-cream, #F1E6D3)",
                  borderColor: "var(--color-card-border, #B89B6A)",
                }}
              >
                <div className="grid place-items-center h-10 w-10 rounded-lg"
                     style={{ backgroundColor: "var(--brand-accent)", color: "white" }}>
                  <a.Icon size={20} strokeWidth={2.4} />
                </div>
                <span className="text-[16px] font-bold tracking-[-0.005em] mt-1"
                      style={{ color: "var(--color-data-ink, #3B342A)" }}>
                  {a.title}
                </span>
                <span className="text-[13px] leading-snug"
                      style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                  {a.body}
                </span>
                <ArrowRight size={16} strokeWidth={2.5} className="mt-2 opacity-60"
                            style={{ color: "var(--brand-accent)" }} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/**
 * RealLogoChip: a real brand logo (Pentair, Leslie's) sits inside a chunky
 * pixel-chrome card. The frame is what anchors the real mark in the world.
 */
function RealLogoChip({
  src,
  alt,
  tone,
  softTone,
  tagline,
}: {
  src: string;
  alt: string;
  tone: string;
  softTone: string;
  tagline: string;
}) {
  return (
    <div
      className="relative rounded-xl border-2 pl-2 pr-4 py-2 flex items-center gap-3 shadow-[3px_3px_0_0_rgba(59,52,42,0.18)]"
      style={{
        backgroundColor: "var(--color-data-cream-2, #E5D7BE)",
        borderColor: "var(--color-mountain-shadow, #5C5546)",
      }}
    >
      <span
        className="absolute top-0 left-0 right-0 h-[4px]"
        style={{ backgroundColor: tone }}
        aria-hidden
      />
      <div
        className="relative h-12 w-16 shrink-0 rounded-md border grid place-items-center mt-1 overflow-hidden"
        style={{
          borderColor: "var(--color-mountain-shadow, #5C5546)",
          backgroundColor: softTone,
          isolation: "isolate",
        }}
      >
        <div className="relative h-9 w-12">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="48px"
            className="object-contain"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-0">
        <span className="text-[13px] font-extrabold tracking-[-0.005em]"
              style={{ color: "var(--color-data-ink, #3B342A)" }}>
          {alt}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.08em]"
              style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
          {tagline}
        </span>
      </div>
    </div>
  );
}

function WordChip({ Icon, title, body, tone }: { Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>; title: string; body: string; tone: string }) {
  return (
    <div
      className="relative rounded-xl border-2 px-4 py-3 flex items-center gap-3 shadow-[3px_3px_0_0_rgba(59,52,42,0.18)]"
      style={{
        backgroundColor: "var(--color-data-cream-2, #E5D7BE)",
        borderColor: "var(--color-mountain-shadow, #5C5546)",
      }}
    >
      <span
        className="absolute top-0 left-0 right-0 h-[4px]"
        style={{ backgroundColor: tone }}
        aria-hidden
      />
      <div className="grid place-items-center h-9 w-9 rounded-lg shrink-0"
           style={{ backgroundColor: tone, color: "white" }}>
        <Icon size={18} strokeWidth={2.4} />
      </div>
      <div className="flex flex-col gap-0">
        <span className="text-[13px] font-extrabold tracking-[-0.005em]"
              style={{ color: "var(--color-data-ink, #3B342A)" }}>
          {title}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.08em]"
              style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
          {body}
        </span>
      </div>
    </div>
  );
}

