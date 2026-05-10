import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Connector } from "@/lib/types";

export function ConnectorButton({ connector }: { connector: Connector }) {
  const isBold = connector.variant === "bold";
  const useDarkText = connector.brand === "hayward"; // gold needs dark text
  return (
    <Link
      href={connector.href}
      data-brand={connector.brand}
      className={cn(
        "flex items-center gap-3.5 rounded-2xl px-5 py-[18px] transition-transform hover:translate-y-[-1px]",
        isBold ? "" : "bg-cream"
      )}
      style={
        isBold
          ? { background: `var(--brand-accent)` }
          : undefined
      }
    >
      <div
        className={cn(
          "grid h-9 w-11 place-items-center rounded-md p-1.5 shrink-0",
          isBold ? "bg-white" : "bg-white"
        )}
        style={!isBold ? { boxShadow: "0 1px 2px rgba(15,17,21,0.05)" } : undefined}
      >
        <Image
          src={connector.logoSrc}
          alt=""
          width={36}
          height={24}
          className="object-contain max-h-6"
        />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span
          className={cn(
            "text-[16px] font-bold tracking-[-0.005em] leading-tight",
            isBold
              ? useDarkText
                ? "text-ink"
                : "text-white"
              : "text-ink"
          )}
        >
          {connector.label}
        </span>
        <span
          className={cn(
            "text-[12px] font-medium leading-snug",
            isBold
              ? useDarkText
                ? "text-ink/70"
                : "text-white/70"
              : "text-ink-mute"
          )}
        >
          {connector.description}
        </span>
      </div>
      <ChevronRight
        size={18}
        strokeWidth={1.8}
        className={cn(
          "shrink-0",
          isBold
            ? useDarkText
              ? "text-ink/70"
              : "text-white/70"
            : "text-ink-faint"
        )}
      />
    </Link>
  );
}
