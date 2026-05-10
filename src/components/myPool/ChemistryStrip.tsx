import { StatusDot } from "@/components/StatusDot";
import { cn } from "@/lib/utils";
import type { ChemistryReading } from "@/lib/types";

const sourceForStatus = (s: ChemistryReading["status"]) =>
  s === "in-range" ? ("live" as const) : s === "climbing" || s === "high" ? ("imported" as const) : ("human" as const);

const tone = (s: ChemistryReading["status"]) =>
  s === "in-range"
    ? "text-source-live"
    : s === "climbing" || s === "high"
    ? "text-source-imported"
    : "text-source-human";

export function ChemistryStrip({
  readings,
  variant = "compact",
}: {
  readings: ChemistryReading[];
  variant?: "compact" | "spacious";
}) {
  const numberSize =
    variant === "spacious" ? "text-[44px] md:text-[56px]" : "text-[24px] md:text-[30px]";
  return (
    <>
      {/* Desktop: 4-up row */}
      <div className="hidden md:flex justify-between gap-6 flex-wrap">
        {readings.map((r) => {
          const flagged = r.status !== "in-range";
          return (
            <div key={r.chemical} className="flex flex-col gap-2 min-w-0">
              <span
                className={cn(
                  "text-[14px] md:text-[17px] font-bold tracking-[-0.02em] leading-tight",
                  flagged ? "text-source-imported" : "text-ink"
                )}
              >
                {r.chemical}
              </span>
              <span
                className={cn(
                  "font-extrabold tracking-[-0.04em] leading-none tabular-nums",
                  numberSize,
                  flagged ? "text-source-imported" : "text-ink"
                )}
              >
                {r.value}
                {r.unit ? <span className="text-ink-faint"> {r.unit}</span> : null}
                {r.trend === "up" ? <span className="text-source-imported"> ↑</span> : null}
              </span>
              <span className="flex items-center gap-1.5">
                <StatusDot variant={sourceForStatus(r.status)} size={7} />
                <span
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-[0.04em]",
                    tone(r.status)
                  )}
                >
                  {r.statusLabel}
                </span>
              </span>
            </div>
          );
        })}
      </div>
      {/* Mobile: 2x2 grid */}
      <div className="md:hidden grid grid-cols-2 gap-2.5">
        {readings.map((r) => {
          const flagged = r.status !== "in-range";
          return (
            <div
              key={r.chemical}
              className="flex flex-col gap-1 rounded-2xl bg-cream p-3.5"
            >
              <span
                className={cn(
                  "text-[13px] font-bold tracking-[-0.005em]",
                  flagged ? "text-source-imported" : "text-ink"
                )}
              >
                {r.chemical}
              </span>
              <span
                className={cn(
                  "text-[22px] font-extrabold tabular-nums tracking-[-0.04em] leading-none",
                  flagged ? "text-source-imported" : "text-ink"
                )}
              >
                {r.value}
                {r.unit ? <span className="text-ink-faint text-[13px]"> {r.unit}</span> : null}
                {r.trend === "up" ? <span className="text-source-imported"> ↑</span> : null}
              </span>
              <span className="flex items-center gap-1.5 mt-0.5">
                <StatusDot variant={sourceForStatus(r.status)} size={6} />
                <span className={cn("text-[10px] font-bold uppercase tracking-[0.04em]", tone(r.status))}>
                  {r.status === "in-range" ? "In range" : r.status === "climbing" ? "Climbing" : "Out of range"}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
