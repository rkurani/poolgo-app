import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Activity, Wrench, Calendar, FileText } from "lucide-react";
import { EQUIPMENT_UNITS, getUnit } from "@/lib/data/equipment-units";
import { SectionHeader } from "@/components/SectionHeader";

const STATE_TONE: Record<string, string> = {
  live: "var(--color-source-live)",
  imported: "var(--color-source-imported)",
  human: "var(--color-source-human)",
  off: "var(--color-data-ink-mute, #6E6555)",
};

export function generateStaticParams() {
  return EQUIPMENT_UNITS.map((u) => ({ unit: u.slug }));
}

export default async function EquipmentUnitPage({ params }: { params: Promise<{ unit: string }> }) {
  const { unit } = await params;
  const u = getUnit(unit);
  if (!u) notFound();

  return (
    <div
      data-city="redlands"
      data-brand={u.brand}
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
          <span
            className="text-[12px] font-bold uppercase tracking-[0.08em]"
            style={{ color: "var(--color-data-ink, #3B342A)" }}
          >
            {u.unit}
          </span>
        </div>

        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-pixel text-[10px] uppercase tracking-[0.2em]"
              style={{ color: u.brandTone }}
            >
              {u.vendor} · {u.category}
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
              style={{ backgroundColor: STATE_TONE[u.status], color: "white" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              {u.statusLabel}
            </span>
          </div>
          <h1
            className="text-[44px] sm:text-[64px] leading-[0.95] font-extrabold tracking-[-0.03em]"
            style={{ color: "var(--color-data-ink, #3B342A)" }}
          >
            {u.unit}.
          </h1>
          <p
            className="text-[15px] sm:text-[17px] font-medium leading-snug max-w-[640px]"
            style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
          >
            {u.blurb}
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <SectionHeader title="Live, right now." caption="polled this minute" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {u.liveStats.map((s) => (
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
                  style={{ backgroundColor: u.brandTone }}
                  aria-hidden
                />
                <span
                  className="font-pixel text-[10px] uppercase tracking-[0.18em] mt-1"
                  style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                >
                  {s.label}
                </span>
                <span
                  className="text-[30px] sm:text-[38px] leading-none font-extrabold tracking-[-0.03em]"
                  style={{
                    color: "var(--color-data-ink, #3B342A)",
                    fontFeatureSettings: '"tnum"',
                  }}
                >
                  {s.value}
                </span>
                <span
                  className="text-[12px] font-semibold mt-1"
                  style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                >
                  {s.caption}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <SectionHeader title="Schedule notes." />
          <div
            className="rounded-xl border-2 p-5 flex flex-col gap-3"
            style={{
              backgroundColor: "var(--color-data-cream, #F1E6D3)",
              borderColor: "var(--color-card-border, #B89B6A)",
            }}
          >
            {u.scheduleNotes.map((note, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="h-2 w-2 rounded-full shrink-0 mt-2"
                  style={{ backgroundColor: u.brandTone }}
                  aria-hidden
                />
                <span
                  className="text-[14px] font-medium leading-snug"
                  style={{ color: "var(--color-data-ink, #3B342A)" }}
                >
                  {note}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <SectionHeader title="Recent history." />
          <div className="flex flex-col">
            {u.history.map((row, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-4 border-b-2 last:border-b-0"
                style={{ borderColor: "var(--color-card-border, #B89B6A)" }}
              >
                <span
                  className="font-pixel text-[10px] tracking-[0.08em] w-[64px] shrink-0 pt-1"
                  style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                >
                  {row.date}
                </span>
                <div
                  className="grid place-items-center h-9 w-9 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      row.actor === "Live"
                        ? "var(--color-source-live)"
                        : "var(--color-source-human)",
                    color: "white",
                  }}
                >
                  {row.actor === "Live" ? (
                    <Activity size={16} strokeWidth={2.5} />
                  ) : (
                    <Wrench size={16} strokeWidth={2.5} />
                  )}
                </div>
                <div className="flex flex-col gap-0.5 flex-1">
                  <span
                    className="text-[14px] font-bold tracking-[-0.005em]"
                    style={{ color: "var(--color-data-ink, #3B342A)" }}
                  >
                    {row.actor}
                  </span>
                  <span
                    className="text-[13px]"
                    style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                  >
                    {row.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <SectionHeader title="What you can do." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Link
              href="/folks/carlos-redlands"
              className="rounded-xl border-2 p-5 flex flex-col gap-2 hover:translate-y-[-2px] transition-transform"
              style={{
                backgroundColor: "var(--color-data-cream, #F1E6D3)",
                borderColor: "var(--color-card-border, #B89B6A)",
              }}
            >
              <div
                className="grid place-items-center h-10 w-10 rounded-lg"
                style={{ backgroundColor: u.brandTone, color: "white" }}
              >
                <Calendar size={20} strokeWidth={2.4} />
              </div>
              <span
                className="text-[16px] font-bold tracking-[-0.005em] mt-1"
                style={{ color: "var(--color-data-ink, #3B342A)" }}
              >
                Book service
              </span>
              <span
                className="text-[13px] leading-snug"
                style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
              >
                Carlos handles maintenance and minor service. Tuesday route.
              </span>
              <ArrowRight
                size={16}
                strokeWidth={2.5}
                className="mt-2 opacity-60"
                style={{ color: u.brandTone }}
              />
            </Link>
            <Link
              href={`/care`}
              className="rounded-xl border-2 p-5 flex flex-col gap-2 hover:translate-y-[-2px] transition-transform"
              style={{
                backgroundColor: "var(--color-data-cream, #F1E6D3)",
                borderColor: "var(--color-card-border, #B89B6A)",
              }}
            >
              <div
                className="grid place-items-center h-10 w-10 rounded-lg"
                style={{ backgroundColor: u.brandTone, color: "white" }}
              >
                <FileText size={20} strokeWidth={2.4} />
              </div>
              <span
                className="text-[16px] font-bold tracking-[-0.005em] mt-1"
                style={{ color: "var(--color-data-ink, #3B342A)" }}
              >
                Order parts
              </span>
              <span
                className="text-[13px] leading-snug"
                style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
              >
                Replacement parts and consumables stocked at Leslie's.
              </span>
              <ArrowRight
                size={16}
                strokeWidth={2.5}
                className="mt-2 opacity-60"
                style={{ color: u.brandTone }}
              />
            </Link>
            <Link
              href="/routines"
              className="rounded-xl border-2 p-5 flex flex-col gap-2 hover:translate-y-[-2px] transition-transform"
              style={{
                backgroundColor: "var(--color-data-cream, #F1E6D3)",
                borderColor: "var(--color-card-border, #B89B6A)",
              }}
            >
              <div
                className="grid place-items-center h-10 w-10 rounded-lg"
                style={{ backgroundColor: u.brandTone, color: "white" }}
              >
                <Wrench size={20} strokeWidth={2.4} />
              </div>
              <span
                className="text-[16px] font-bold tracking-[-0.005em] mt-1"
                style={{ color: "var(--color-data-ink, #3B342A)" }}
              >
                Set a routine
              </span>
              <span
                className="text-[13px] leading-snug"
                style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
              >
                Schedule auto-actions on this unit. Threshold alerts.
              </span>
              <ArrowRight
                size={16}
                strokeWidth={2.5}
                className="mt-2 opacity-60"
                style={{ color: u.brandTone }}
              />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
