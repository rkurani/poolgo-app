import { Mountain, Grid3x3, Flame, Droplets } from "lucide-react";
import type { Specialist } from "@/lib/types";

const ICONS: Record<string, typeof Mountain> = {
  westshore: Mountain,
  plaster: Grid3x3,
  heater: Flame,
  capleak: Droplets,
};

export function SpecRow({ spec }: { spec: Specialist }) {
  const Icon = ICONS[spec.id] ?? Mountain;
  return (
    <div
      data-brand={spec.brand}
      className="relative grid grid-cols-[auto_1fr_auto] items-center gap-[18px] overflow-hidden rounded-xl border border-line bg-background px-5 py-[18px]"
    >
      <span
        aria-hidden
        className="absolute left-0 top-4 bottom-4 w-[3px]"
        style={{ background: "var(--brand-accent)" }}
      />
      <div
        className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-[10px] text-white"
        style={{ background: "var(--brand-accent)" }}
      >
        <Icon size={22} strokeWidth={2.2} />
      </div>
      <div className="min-w-0">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.06em]"
          style={{ color: "var(--brand-accent)" }}
        >
          {spec.category}
        </div>
        <div className="mt-0.5 text-[16px] font-bold tracking-[-0.015em] text-ink">
          {spec.name}
        </div>
        <div className="mt-1 text-[12px] text-ink-mute">
          {spec.description}
        </div>
      </div>
      <button className="whitespace-nowrap rounded-lg border border-line bg-background px-3 py-2 text-[12px] font-semibold text-ink hover:bg-surface">
        {spec.ctaLabel}
      </button>
    </div>
  );
}
