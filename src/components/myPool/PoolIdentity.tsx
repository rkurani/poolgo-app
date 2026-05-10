import Image from "next/image";
import { Pill } from "@/components/Pill";
import type { Pool } from "@/lib/types";

export function PoolIdentity({ pool }: { pool: Pool }) {
  return (
    <div className="flex items-center gap-5">
      <Image
        src={pool.thumbSrc}
        alt={pool.name}
        width={80}
        height={80}
        className="rounded-2xl object-cover h-16 w-16 sm:h-20 sm:w-20 shrink-0"
      />
      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
        <h1 className="text-[28px] sm:text-[44px] font-extrabold tracking-[-0.04em] leading-none text-ink">
          {pool.name}. {pool.statusLabel}.
        </h1>
        <p className="text-[13px] sm:text-[15px] font-medium text-ink-mute leading-snug">
          {pool.gallons.toLocaleString()} gal · {pool.sanitizer} · {pool.finish} · {pool.currentTempF}°F · {pool.city}
        </p>
      </div>
      <div className="hidden md:flex flex-col items-end gap-1.5 shrink-0">
        <Pill source="live">All readings in range</Pill>
        <Pill source="imported">CYA climbing · Carlos Tue</Pill>
      </div>
    </div>
  );
}
