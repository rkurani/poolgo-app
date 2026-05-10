import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { StatusDot } from "@/components/StatusDot";
import { cn } from "@/lib/utils";
import type { EquipmentTile as TileType } from "@/lib/types";

export function EquipmentTile({
  tile,
  href = "/equipment",
  variant = "desktop",
}: {
  tile: TileType;
  href?: string;
  variant?: "desktop" | "mobile";
}) {
  const dotVariant: Parameters<typeof StatusDot>[0]["variant"] =
    tile.state === "off"
      ? "off"
      : tile.state === "warn"
      ? "imported"
      : (tile.state as "live" | "imported" | "human" | "ai");

  if (variant === "mobile") {
    return (
      <Link
        href={href}
        data-brand={tile.brand}
        className="flex items-center gap-3 rounded-2xl bg-cream p-3.5 transition-colors hover:bg-cream/80"
      >
        <StatusDot variant={dotVariant} size={8} />
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <span
            className="text-[9px] font-bold uppercase tracking-[0.04em]"
            style={{ color: `var(--brand-accent)` }}
          >
            {tile.oemLabel} · {tile.stateLabel}
          </span>
          <span
            className={cn(
              "text-[15px] font-bold tracking-[-0.005em] leading-tight truncate",
              tile.state === "off" ? "text-ink-faint" : "text-ink"
            )}
          >
            {tile.primary}
          </span>
          <span className="text-[12px] font-medium text-ink-mute truncate">
            {tile.secondary}
          </span>
        </div>
        <ChevronRight size={16} strokeWidth={1.7} className="text-ink-faint shrink-0" />
      </Link>
    );
  }

  // desktop tile
  if (tile.selected) {
    return (
      <Link
        href={href}
        data-brand={tile.brand}
        className="flex flex-col justify-between rounded-2xl p-[18px] h-[140px] overflow-hidden transition-transform hover:translate-y-[-1px]"
        style={{ background: `var(--brand-accent)` }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-white/70">
            {tile.oemLabel}
          </span>
          <div className="flex items-center gap-1.5">
            <StatusDot variant={dotVariant} size={7} />
            <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-white">
              {tile.stateLabel}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[20px] font-bold tracking-[-0.03em] leading-tight text-white">
            {tile.primary}
          </span>
          <span className="text-[13px] font-medium text-white/80">
            {tile.secondary}
          </span>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-white/55">
          {tile.technical}
        </span>
      </Link>
    );
  }
  return (
    <Link
      href={href}
      data-brand={tile.brand}
      className="flex flex-col justify-between rounded-2xl bg-cream p-[18px] h-[140px] overflow-hidden transition-transform hover:translate-y-[-1px]"
    >
      <div className="flex items-center justify-between">
        <span
          className="text-[11px] font-bold uppercase tracking-[0.04em]"
          style={{ color: `var(--brand-accent)` }}
        >
          {tile.oemLabel}
        </span>
        <div className="flex items-center gap-1.5">
          <StatusDot variant={dotVariant} size={7} />
          <span
            className={cn(
              "text-[11px] font-bold uppercase tracking-[0.04em]",
              tile.state === "imported"
                ? "text-source-imported"
                : tile.state === "live"
                ? "text-source-live"
                : tile.state === "off"
                ? "text-ink-faint"
                : "text-ink-mute"
            )}
          >
            {tile.stateLabel}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <span
          className={cn(
            "text-[20px] font-bold tracking-[-0.03em] leading-tight",
            tile.state === "off" ? "text-ink-faint" : "text-ink"
          )}
        >
          {tile.primary}
        </span>
        <span className="text-[13px] font-medium text-ink-mute">
          {tile.secondary}
        </span>
      </div>
      <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-ink-faint">
        {tile.technical}
      </span>
    </Link>
  );
}
