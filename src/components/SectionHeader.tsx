import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  caption,
  trailing,
  className,
}: {
  title: ReactNode;
  caption?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-4 flex-wrap",
        className
      )}
    >
      <div className="flex flex-col gap-1.5 min-w-0">
        <h2 className="text-[28px] sm:text-[36px] font-extrabold tracking-[-0.04em] leading-[1.05] text-ink">
          {title}
        </h2>
        {caption ? (
          <p className="text-[13px] sm:text-[15px] font-medium text-ink-mute leading-snug">
            {caption}
          </p>
        ) : null}
      </div>
      {trailing ? (
        <div className="text-[11px] font-bold uppercase tracking-[0.04em] text-ink-mute shrink-0">
          {trailing}
        </div>
      ) : null}
    </div>
  );
}
