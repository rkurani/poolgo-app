"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Chip({
  active = false,
  count,
  onClick,
  children,
}: {
  active?: boolean;
  count?: number | string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-[14px] py-2 text-[13px] font-medium tracking-[-0.005em] transition-colors",
        active
          ? "border-ink bg-ink text-white"
          : "border-line bg-background text-ink-soft hover:bg-surface",
      )}
    >
      {children}
      {count !== undefined && (
        <span
          className={cn(
            "ml-1.5 text-[12px] font-bold",
            active ? "text-white/60" : "text-ink-mute",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
