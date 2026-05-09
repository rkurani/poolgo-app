"use client";

import { Mountain, Droplet, TriangleAlert } from "lucide-react";
import type { Pro } from "@/lib/types";

const ICONS = {
  foothill: Mountain,
  bluedrop: Droplet,
  ridgeline: TriangleAlert,
} as const;

export function ProCard({ pro }: { pro: Pro }) {
  const Icon = (ICONS as Record<string, typeof Mountain>)[pro.brand] ?? Mountain;
  return (
    <div
      data-brand={pro.brand}
      className="relative flex flex-col overflow-hidden rounded-[14px] border border-line bg-background"
      style={{ boxShadow: "inset 0 3px 0 var(--brand-accent)" }}
    >
      <div className="relative flex h-[140px] items-center justify-center overflow-hidden border-b border-line bg-surface">
        <span className="absolute left-3 top-3 z-[3] rounded-md border border-line bg-white/95 px-[9px] py-[5px] text-[10px] font-bold uppercase tracking-[0.05em] text-ink-soft">
          {pro.distanceMi} MI · {pro.city.toUpperCase()}
        </span>
        <span className="absolute right-3 top-3 z-[3] inline-flex items-center gap-1 rounded-md bg-ink px-[9px] py-[5px] text-[11px] font-bold text-white">
          <span className="text-warn">★</span>
          {pro.ratingStars}
        </span>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 70%, var(--brand-soft), transparent 55%), linear-gradient(180deg, transparent 50%, rgba(15,17,21,0.04) 100%)`,
          }}
        />
        <div
          className="relative z-[2] grid h-16 w-16 place-items-center rounded-[14px] border border-line bg-white shadow-sm"
          style={{ color: "var(--brand-accent)" }}
        >
          <Icon size={34} strokeWidth={2.2} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-[18px]">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.06em]"
          style={{ color: "var(--brand-accent)" }}
        >
          {pro.categoryLabel}
        </div>
        <h3 className="m-0 text-[17px] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
          {pro.name}
        </h3>
        <div className="text-[13px] leading-[1.4] text-ink-soft">
          {pro.services.join(" · ")}
        </div>

        <div
          className="mt-1 flex items-center gap-2 rounded-lg px-2.5 py-2"
          style={{ background: "var(--brand-soft)" }}
        >
          {Array.from({ length: Math.min(pro.neighborsUsing, 3) }).map((_, i) => (
            <span
              key={i}
              className="-ml-1 h-[18px] w-[18px] flex-shrink-0 rounded-full border-[1.5px] border-white first:ml-0"
              style={{
                background: ["#B07B00", "#1F5C8B", "#B85541"][i] ?? "#888",
              }}
            />
          ))}
          <span className="ml-1 text-[12px] text-ink-soft">
            <strong className="font-bold text-ink">
              {pro.neighborsUsing} neighbor{pro.neighborsUsing === 1 ? "" : "s"}
            </strong>{" "}
            use{pro.neighborsUsing === 1 ? "s" : ""} them
          </span>
        </div>

        <div className="mt-1.5 flex items-baseline justify-between border-t border-line pt-3">
          <span className="text-[16px] font-bold tracking-[-0.02em] text-ink">
            {pro.price}
          </span>
          <span className="text-[11px] text-ink-mute">
            {pro.reviewCount} reviews · {pro.vouchCount} vouches
          </span>
        </div>

        <button className="mt-2.5 rounded-lg border border-line bg-background px-3.5 py-2.5 text-[13px] font-semibold tracking-[-0.005em] text-ink transition-all hover:border-[var(--brand-accent)] hover:bg-[var(--brand-accent)] hover:text-white">
          Send a note →
        </button>
      </div>
    </div>
  );
}
