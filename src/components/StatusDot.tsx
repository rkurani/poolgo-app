import { cn } from "@/lib/utils";
import type { SourceKind } from "@/lib/types";

type Variant = SourceKind | "off";

const variantClass: Record<Variant, string> = {
  live: "bg-source-live",
  imported: "bg-source-imported",
  human: "bg-source-human",
  ai: "bg-source-ai",
  off: "bg-ink-faint",
};

export function StatusDot({
  variant = "live",
  size = 8,
  className,
}: {
  variant?: Variant;
  size?: 6 | 7 | 8 | 9;
  className?: string;
}) {
  const sizeClass: Record<6 | 7 | 8 | 9, string> = {
    6: "h-[6px] w-[6px]",
    7: "h-[7px] w-[7px]",
    8: "h-[8px] w-[8px]",
    9: "h-[9px] w-[9px]",
  };
  return (
    <span
      className={cn(
        "inline-block rounded-full",
        sizeClass[size],
        variantClass[variant],
        className
      )}
    />
  );
}
