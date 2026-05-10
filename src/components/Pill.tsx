import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Brand, SourceKind } from "@/lib/types";

type Tone = "live" | "warn" | "human" | "ai" | "ink" | "muted";

const toneClass: Record<Tone, string> = {
  live: "bg-source-live/10 text-source-live",
  warn: "bg-source-imported/10 text-source-imported",
  human: "bg-source-human/15 text-source-human",
  ai: "bg-primary/10 text-primary",
  ink: "bg-ink text-white",
  muted: "bg-surface-2 text-ink-soft",
};

const sourceToTone: Record<SourceKind, Tone> = {
  live: "live",
  imported: "warn",
  human: "human",
  ai: "ai",
};

export function Pill({
  children,
  tone = "muted",
  source,
  brand,
  size = "md",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  source?: SourceKind;
  brand?: Brand;
  size?: "sm" | "md";
  className?: string;
}) {
  const resolvedTone = source ? sourceToTone[source] : tone;
  const style: CSSProperties | undefined = brand
    ? {
        background: `color-mix(in srgb, var(--color-${brand}) 12%, transparent)`,
        color: `var(--color-${brand})`,
      }
    : undefined;
  return (
    <span
      data-brand={brand}
      style={style}
      className={cn(
        "inline-flex items-center gap-[6px] rounded-full font-bold tracking-[0.04em] uppercase whitespace-nowrap",
        size === "sm" ? "px-[8px] py-[3px] text-[10px]" : "px-[12px] py-[5px] text-[11px]",
        !brand && toneClass[resolvedTone],
        className
      )}
    >
      {children}
    </span>
  );
}
