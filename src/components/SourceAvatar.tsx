import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import type { Brand } from "@/lib/types";

export function SourceAvatar({
  kind,
  text,
  brand,
  logoSrc,
  shape = "circle",
  size = 36,
}: {
  kind: "initials" | "logo";
  text?: string;
  brand?: Brand;
  logoSrc?: string;
  shape?: "circle" | "square";
  size?: 28 | 32 | 36 | 48 | 64 | 80;
}) {
  const radius = shape === "circle" ? 9999 : 10;
  const style: CSSProperties = {
    width: size,
    height: size,
    borderRadius: radius,
    background: brand
      ? `color-mix(in srgb, var(--color-${brand}) 14%, var(--color-cream))`
      : "var(--color-cream)",
    color: brand ? `var(--color-${brand})` : "var(--color-ink)",
  };
  if (kind === "logo" && logoSrc) {
    return (
      <div
        data-brand={brand}
        style={{ ...style, padding: Math.max(4, size * 0.14) }}
        className="grid place-items-center shrink-0 ring-1 ring-line/60"
      >
        <Image
          src={logoSrc}
          alt=""
          width={size}
          height={size}
          className="object-contain"
          style={{ width: "100%", height: "auto", maxHeight: "100%" }}
        />
      </div>
    );
  }
  // initials
  return (
    <div
      data-brand={brand}
      style={style}
      className={cn(
        "grid place-items-center shrink-0 font-extrabold uppercase",
        size <= 32 ? "text-[11px]" : size <= 48 ? "text-[14px]" : "text-[24px]"
      )}
    >
      {text ?? "·"}
    </div>
  );
}
