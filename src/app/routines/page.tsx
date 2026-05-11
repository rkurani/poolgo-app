import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Wand2,
  Sparkles,
  Clock,
  AlertTriangle,
  CloudRain,
  CalendarDays,
  Hand,
  Play,
  Pause,
  Plus,
  BookOpen,
  Brain,
  UserCheck,
  CheckCircle,
} from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import {
  ACTIVE_ROUTINES,
  SUGGESTED_ROUTINES,
  LIBRARY_ROUTINES,
  type Routine,
  type RoutineSource,
} from "@/lib/data/routines";

const TRIGGER_ICON = {
  schedule: Clock,
  threshold: AlertTriangle,
  weather: CloudRain,
  event: CalendarDays,
  manual: Hand,
} as const;

const SOURCE_META: Record<RoutineSource, { label: string; tone: string; Icon: typeof Brain }> = {
  homeowner: { label: "You wrote it", tone: "var(--color-source-human)", Icon: UserCheck },
  ai: { label: "AI suggested", tone: "var(--color-source-ai)", Icon: Brain },
  pro: { label: "Carlos suggested", tone: "var(--color-source-human)", Icon: UserCheck },
  library: { label: "Template", tone: "var(--color-source-imported)", Icon: BookOpen },
};

const SAMPLE_AI_PROMPTS = [
  "Heat the pool to 84° on Friday afternoon if we have guests Saturday",
  "When the kids come back from school, run the cleaner cycle so the pool is clean by dinner",
  "If the filter pressure climbs more than 5 PSI, schedule a backwash with Carlos automatically",
  "When I'm on vacation, run the pump minimum and turn off the heater",
  "If chlorine drops below 1.0, message me before it gets bad",
];

export default function RoutinesPage() {
  return (
    <div
      data-city="redlands"
      className="min-h-[calc(100dvh-96px)] md:min-h-[calc(100dvh-72px)]"
      style={{ backgroundColor: "var(--color-canvas-ground, #D4B896)" }}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-10 pt-6 pb-32 md:pb-16 flex flex-col gap-10 sm:gap-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] w-fit hover:translate-x-[-2px] transition-transform"
          style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          back home
        </Link>

        <header className="flex flex-col gap-3">
          <span
            className="font-pixel text-[10px] sm:text-[11px] uppercase tracking-[0.2em]"
            style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
          >
            Routines · {ACTIVE_ROUTINES.length} running · {SUGGESTED_ROUTINES.length} suggested
          </span>
          <h1
            className="text-[44px] sm:text-[64px] leading-[0.95] font-extrabold tracking-[-0.03em]"
            style={{ color: "var(--color-data-ink, #3B342A)" }}
          >
            Your pool, on autopilot.
          </h1>
          <p
            className="text-[16px] sm:text-[19px] font-medium leading-snug max-w-[680px]"
            style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
          >
            Daily schedules, threshold watchdogs, weather-aware tweaks. Tell us in plain English what you want
            and we&rsquo;ll wire it. Or pick from the library.
          </p>
          <div className="pixel-bar mt-3" aria-hidden />
        </header>

        {/* AI builder hero */}
        <section
          className="rounded-2xl border-[3px] p-6 sm:p-8 flex flex-col gap-5 shadow-[6px_6px_0_0_rgba(59,52,42,0.18)]"
          style={{
            backgroundColor: "var(--color-data-cream, #F1E6D3)",
            borderColor: "var(--color-mountain-shadow, #5C5546)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="grid place-items-center h-14 w-14 rounded-xl shrink-0"
              style={{
                backgroundColor: "var(--color-source-ai)",
                color: "white",
              }}
            >
              <Wand2 size={28} strokeWidth={2.4} />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <span
                className="font-pixel text-[10px] uppercase tracking-[0.18em]"
                style={{ color: "var(--color-source-ai)" }}
              >
                AI builder
              </span>
              <h2
                className="text-[26px] sm:text-[32px] leading-tight font-extrabold tracking-[-0.02em]"
                style={{ color: "var(--color-data-ink, #3B342A)" }}
              >
                Tell us what you want.
              </h2>
            </div>
          </div>

          <textarea
            placeholder="Heat the pool to 84° on Friday afternoon if we have guests Saturday."
            rows={3}
            className="rounded-xl border-2 p-4 text-[15px] font-medium resize-y bg-white focus:outline-none"
            style={{
              borderColor: "var(--color-mountain-shadow, #5C5546)",
              color: "var(--color-data-ink, #3B342A)",
            }}
          />

          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex flex-wrap gap-2 flex-1">
              {SAMPLE_AI_PROMPTS.slice(0, 3).map((p) => (
                <button
                  key={p}
                  className="rounded-full border-2 px-3 py-1 text-[11px] font-semibold"
                  style={{
                    borderColor: "var(--color-card-border, #B89B6A)",
                    color: "var(--color-data-ink-mute, #6E6555)",
                    backgroundColor: "transparent",
                  }}
                >
                  {p.length > 50 ? p.slice(0, 48) + "…" : p}
                </button>
              ))}
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[14px] font-bold tracking-[-0.005em] shadow-[3px_3px_0_0_rgba(59,52,42,0.45)] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_rgba(59,52,42,0.45)] transition-all"
              style={{
                backgroundColor: "var(--color-terracotta, #C75240)",
                color: "white",
              }}
            >
              <Sparkles size={16} strokeWidth={2.5} />
              Propose a routine
            </button>
          </div>
        </section>

        {/* Running */}
        <section className="flex flex-col gap-5">
          <SectionHeader title="Running on your pad." caption="active routines, executing on the live equipment" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {ACTIVE_ROUTINES.map((r) => (
              <RoutineCard key={r.id} routine={r} />
            ))}
          </div>
        </section>

        {/* Suggested */}
        <section className="flex flex-col gap-5">
          <SectionHeader
            title="Suggested for your pool."
            caption="based on your equipment, recent chemistry, and what Carlos sees"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {SUGGESTED_ROUTINES.map((r) => (
              <RoutineCard key={r.id} routine={r} />
            ))}
          </div>
        </section>

        {/* Library */}
        <section className="flex flex-col gap-5">
          <SectionHeader title="Library." caption="templates other pools have on autopilot" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {LIBRARY_ROUTINES.map((r) => (
              <LibraryCard key={r.id} routine={r} />
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[6px_6px_0_0_rgba(59,52,42,0.25)]"
          style={{
            backgroundColor: "var(--color-mountain-shadow, #5C5546)",
            color: "white",
          }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] opacity-90">
              Want one custom?
            </span>
            <h3 className="text-[24px] sm:text-[28px] leading-tight font-extrabold tracking-[-0.02em]">
              Build a routine from scratch.
            </h3>
            <span className="text-[13px] opacity-90">
              When you need something the AI didn&rsquo;t propose. Trigger + action pairs, drag and drop.
            </span>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-xl px-6 py-4 text-[15px] font-bold bg-white shadow-[3px_3px_0_0_rgba(0,0,0,0.25)] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] transition-all"
            style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
          >
            <Plus size={16} strokeWidth={2.5} />
            New routine
          </button>
        </section>
      </div>
    </div>
  );
}

function RoutineCard({ routine }: { routine: Routine }) {
  const TriggerIcon = TRIGGER_ICON[routine.triggerKind];
  const src = SOURCE_META[routine.source];
  const SrcIcon = src.Icon;
  const isProposed = routine.status === "proposed";

  return (
    <div
      className="group relative rounded-2xl border-2 p-5 flex flex-col gap-4 hover:translate-y-[-2px] transition-transform overflow-hidden"
      style={{
        backgroundColor: "var(--color-data-cream, #F1E6D3)",
        borderColor: isProposed
          ? "var(--color-card-border, #B89B6A)"
          : "var(--color-mountain-shadow, #5C5546)",
        borderStyle: isProposed ? "dashed" : "solid",
      }}
    >
      <span
        className="absolute top-0 left-0 right-0 h-[5px]"
        style={{ backgroundColor: src.tone }}
        aria-hidden
      />

      <div className="flex items-start justify-between gap-2 mt-2">
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <SrcIcon size={11} strokeWidth={2.5} style={{ color: src.tone }} />
            <span
              className="font-pixel text-[9px] uppercase tracking-[0.18em]"
              style={{ color: src.tone }}
            >
              {src.label}
            </span>
          </div>
          <h3
            className="text-[20px] font-extrabold tracking-[-0.01em] leading-tight"
            style={{ color: "var(--color-data-ink, #3B342A)" }}
          >
            {routine.name}
          </h3>
        </div>
        {routine.status === "running" && (
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
            style={{ backgroundColor: "var(--color-source-live)", color: "white" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Live
          </span>
        )}
      </div>

      {routine.blurb && (
        <p className="text-[13px] leading-snug" style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
          {routine.blurb}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2.5">
          <div
            className="grid place-items-center h-8 w-8 rounded-md shrink-0"
            style={{
              backgroundColor: "var(--color-mountain-shadow, #5C5546)",
              color: "white",
            }}
          >
            <TriggerIcon size={14} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            <span
              className="font-pixel text-[9px] uppercase tracking-[0.14em]"
              style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
            >
              When
            </span>
            <span
              className="text-[13px] font-bold tracking-[-0.005em]"
              style={{ color: "var(--color-data-ink, #3B342A)" }}
            >
              {routine.trigger}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <div
            className="grid place-items-center h-8 w-8 rounded-md shrink-0"
            style={{
              backgroundColor: "var(--color-citrus, #E8A82C)",
              color: "var(--color-mountain-shadow, #5C5546)",
            }}
          >
            <Play size={14} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            <span
              className="font-pixel text-[9px] uppercase tracking-[0.14em]"
              style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
            >
              Do
            </span>
            <ul className="flex flex-col gap-0.5">
              {routine.actions.map((a, i) => (
                <li
                  key={i}
                  className="text-[13px] font-bold tracking-[-0.005em]"
                  style={{ color: "var(--color-data-ink, #3B342A)" }}
                >
                  {a.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-between gap-2 pt-3 border-t-2 mt-1"
        style={{ borderColor: "var(--color-card-border, #B89B6A)" }}
      >
        <span
          className="font-pixel text-[10px] tracking-[0.08em]"
          style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
        >
          {routine.status === "running"
            ? `Next: ${routine.nextRun}`
            : routine.status === "proposed"
            ? "Ready to enable"
            : ""}
        </span>
        {routine.status === "running" ? (
          <button
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] border-2"
            style={{
              borderColor: "var(--color-mountain-shadow, #5C5546)",
              color: "var(--color-data-ink, #3B342A)",
            }}
          >
            <Pause size={11} strokeWidth={2.5} />
            Pause
          </button>
        ) : (
          <button
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em]"
            style={{ backgroundColor: "var(--color-terracotta, #C75240)", color: "white" }}
          >
            <CheckCircle size={11} strokeWidth={2.5} />
            Enable
          </button>
        )}
      </div>
    </div>
  );
}

function LibraryCard({ routine }: { routine: Routine }) {
  const TriggerIcon = TRIGGER_ICON[routine.triggerKind];
  return (
    <button
      type="button"
      className="group rounded-xl border-2 p-4 flex flex-col gap-2 text-left hover:translate-y-[-2px] transition-transform"
      style={{
        backgroundColor: "var(--color-data-cream-2, #E5D7BE)",
        borderColor: "var(--color-card-border, #B89B6A)",
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <TriggerIcon
          size={14}
          strokeWidth={2.5}
          style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
        />
        <span
          className="font-pixel text-[9px] uppercase tracking-[0.14em]"
          style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
        >
          Template
        </span>
      </div>
      <h4
        className="text-[15px] font-extrabold tracking-[-0.005em] leading-tight"
        style={{ color: "var(--color-data-ink, #3B342A)" }}
      >
        {routine.name}
      </h4>
      {routine.blurb && (
        <p
          className="text-[11px] leading-snug"
          style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
        >
          {routine.blurb}
        </p>
      )}
      <span
        className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.08em] mt-1 opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ color: "var(--color-data-ink, #3B342A)" }}
      >
        Add to your pool
        <ArrowRight size={11} strokeWidth={2.5} />
      </span>
    </button>
  );
}
