import Image from "next/image";
import { Footprints, Star } from "lucide-react";
import { Pill } from "@/components/Pill";
import type { Pro } from "@/lib/types";

export function FeaturedPro({ pro }: { pro: Pro }) {
  return (
    <div
      data-brand={pro.brand}
      className="grid grid-cols-1 md:grid-cols-[380px_1fr] rounded-3xl bg-cream overflow-hidden shadow-[0_6px_24px_rgba(15,17,21,0.06)]"
    >
      <div
        className="relative h-[200px] md:h-auto flex flex-col justify-between p-5"
        style={{ background: "var(--brand-soft)" }}
      >
        <Image
          src="/assets/storefront.jpg"
          alt=""
          width={400}
          height={400}
          className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-65"
        />
        <span className="relative inline-flex items-center gap-1.5 self-start rounded-full bg-cream/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.04em] text-ink">
          <span
            className="h-[7px] w-[7px] rounded-full"
            style={{ background: "var(--color-primary)" }}
          />
          Featured · local favorite
        </span>
        <span className="relative inline-flex items-center gap-1.5 self-start rounded-full bg-cream/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.04em] text-ink">
          <Star size={12} strokeWidth={2} className="text-source-imported" />
          {pro.ratingStars.toFixed(1)} · {pro.reviewCount} local reviews
        </span>
      </div>
      <div className="flex flex-col gap-3.5 p-7 md:p-9 justify-between">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-[22px] md:text-[28px] font-bold tracking-[-0.03em] leading-tight text-ink">
              {pro.name}
            </h2>
            <span
              className="text-[11px] font-bold uppercase tracking-[0.04em]"
              style={{ color: "var(--brand-accent)" }}
            >
              Store + pros
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Footprints size={15} strokeWidth={1.7} className="text-ink-mute" />
            <span className="text-[15px] font-extrabold tracking-[-0.01em] text-ink tabular-nums">
              {pro.distanceMi} MI
            </span>
            <span className="text-[14px] font-medium text-ink-mute">
              · open today until 7 PM · books service in 2 days
            </span>
          </div>
          <p className="text-[14px] font-medium text-ink-soft leading-snug">
            Three-generation family shop. Stocks Pentair, Hayward, and Polaris parts; walks salt
            cells and chemistry; books service techs from a roster they vouch for.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.04em] text-ink-mute">
            Carries
          </span>
          <div className="flex flex-wrap gap-1.5">
            <Pill brand="pentair" size="sm">Pentair</Pill>
            <Pill brand="hayward" size="sm">Hayward</Pill>
            <Pill brand="polaris" size="sm">Polaris</Pill>
            <Pill brand="leslies" size="sm">Leslie&apos;s</Pill>
            <Pill brand="suncountry" size="sm">Sun Country</Pill>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-full bg-ink px-5 py-3 text-[13px] font-bold tracking-[-0.005em] text-white hover:bg-ink-soft transition-colors">
            Visit · {pro.distanceMi} mi
          </button>
          <button className="px-5 py-3 text-[13px] font-bold tracking-[-0.005em] text-ink hover:text-ink-soft transition-colors">
            Browse inventory →
          </button>
          <button className="px-5 py-3 text-[13px] font-bold tracking-[-0.005em] text-ink hover:text-ink-soft transition-colors">
            Send a note
          </button>
        </div>
      </div>
    </div>
  );
}
