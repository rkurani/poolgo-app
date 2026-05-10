import { Footprints } from "lucide-react";
import { SourceAvatar } from "@/components/SourceAvatar";
import { Pill } from "@/components/Pill";
import type { Pro } from "@/lib/types";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ProCard({ pro }: { pro: Pro }) {
  return (
    <div
      data-brand={pro.brand}
      className="flex flex-col rounded-3xl bg-cream overflow-hidden shadow-[0_4_18_rgba(15,17,21,0.06)]"
    >
      <div
        className="grid h-[140px] place-items-center"
        style={{ background: "var(--brand-soft)" }}
      >
        <SourceAvatar
          kind="initials"
          text={initials(pro.name)}
          brand={pro.brand}
          shape="circle"
          size={80}
        />
      </div>
      <div className="flex flex-col gap-2.5 p-[18px]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-0.5 min-w-0">
            <h3 className="text-[16px] font-bold tracking-[-0.02em] leading-tight text-ink truncate">
              {pro.name}
            </h3>
            <span className="text-[11px] font-medium text-ink-mute truncate">
              {pro.categoryLabel.split(" · ").slice(0, 2).join(" · ")}
            </span>
          </div>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.04em] shrink-0"
            style={{ color: "var(--brand-accent)" }}
          >
            Pro
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Footprints size={14} strokeWidth={1.7} className="text-ink-mute" />
          <span className="text-[15px] font-extrabold tracking-[-0.005em] text-ink tabular-nums">
            {pro.distanceMi} MI
          </span>
          <span className="text-[13px] font-medium text-ink-mute">
            · {pro.ratingStars.toFixed(1)} ★ {pro.reviewCount} · {pro.price}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Pill brand={pro.brand} size="sm">{pro.brand.toUpperCase()}</Pill>
          {pro.services.slice(0, 1).map((s) => (
            <Pill key={s} tone="muted" size="sm">{s}</Pill>
          ))}
        </div>
      </div>
    </div>
  );
}
