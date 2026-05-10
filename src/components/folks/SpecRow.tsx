import type { Specialist } from "@/lib/types";

export function SpecRow({ spec }: { spec: Specialist }) {
  return (
    <div
      data-brand={spec.brand}
      className="flex items-center gap-5 py-5 not-first:[border-top:1px_solid_var(--color-line)]"
    >
      <div
        className="grid h-12 w-12 shrink-0 place-items-center rounded-xl"
        style={{
          background: "var(--brand-soft)",
          color: "var(--brand-accent)",
        }}
      >
        <span className="text-[12px] font-extrabold tracking-[0.04em]">
          {spec.name
            .split(/\s+/)
            .map((p) => p[0])
            .filter(Boolean)
            .slice(0, 2)
            .join("")
            .toUpperCase()}
        </span>
      </div>
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.04em]"
          style={{ color: "var(--brand-accent)" }}
        >
          {spec.category}
        </span>
        <span className="text-[15px] font-bold tracking-[-0.01em] text-ink leading-tight">
          {spec.name}
        </span>
        <span className="text-[12px] font-medium text-ink-mute">
          {spec.description}
        </span>
      </div>
      <button className="shrink-0 rounded-full bg-ink px-4 py-2.5 text-[12px] font-bold tracking-[-0.005em] text-white hover:bg-ink-soft transition-colors">
        {spec.ctaLabel}
      </button>
    </div>
  );
}
