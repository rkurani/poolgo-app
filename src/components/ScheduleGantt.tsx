import type { ScheduleEvent } from "@/lib/types";

export function ScheduleGantt({ rows }: { rows: ScheduleEvent[] }) {
  return (
    <div className="flex flex-col gap-2">
      {rows.map((row) => (
        <div
          key={row.system}
          className="flex items-center gap-3 sm:gap-4"
        >
          <div className="flex flex-col w-[88px] sm:w-[120px] shrink-0">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.04em] text-ink">
              {row.systemLabel}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.04em] text-ink-faint">
              {row.caption}
            </span>
          </div>
          <div className="relative flex-1 h-[18px] sm:h-[24px] rounded-full bg-surface-2 overflow-hidden">
            {row.startMinute != null && row.durationMinutes != null ? (
              <span
                className="absolute top-0 bottom-0 rounded-full"
                style={{
                  left: `${(row.startMinute / 1440) * 100}%`,
                  width: `${(row.durationMinutes / 1440) * 100}%`,
                  background: `var(--color-${row.brand})`,
                  opacity: row.opacity ?? 1,
                }}
              />
            ) : null}
          </div>
        </div>
      ))}
      <div className="flex justify-between pt-1.5 pl-[100px] sm:pl-[136px] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.04em] text-ink-faint">
        <span>12 AM</span>
        <span>6 AM</span>
        <span>12 PM</span>
        <span>6 PM</span>
        <span>12 AM</span>
      </div>
    </div>
  );
}
