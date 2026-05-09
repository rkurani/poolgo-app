import type { ReactNode } from "react";

export type Stat = { num: string; label: string };

export function PageHeader({
  title,
  lede,
  stats,
}: {
  title: string;
  lede: ReactNode;
  stats?: Stat[];
}) {
  return (
    <header className="mx-auto mt-8 grid max-w-[1280px] grid-cols-[1fr_auto] items-end gap-7 px-8">
      <div>
        <h1 className="m-0 font-extrabold leading-[1.02] tracking-[-0.04em] text-[clamp(32px,4vw,44px)]">
          {title}
        </h1>
        <p className="mt-2.5 max-w-[60ch] text-[15px] text-ink-soft">
          {lede}
        </p>
      </div>
      {stats && stats.length > 0 && (
        <div className="flex gap-7">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-extrabold leading-none tracking-[-0.04em] text-[32px]">
                {s.num}
              </div>
              <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-mute">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
