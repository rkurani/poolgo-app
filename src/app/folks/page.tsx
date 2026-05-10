"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { MapStrip } from "@/components/folks/MapStrip";
import { FeaturedPro } from "@/components/folks/FeaturedPro";
import { ProCard } from "@/components/folks/ProCard";
import { StoreCard } from "@/components/folks/StoreCard";
import { SpecRow } from "@/components/folks/SpecRow";
import { cn } from "@/lib/utils";
import { featured, pros, stores, specialists } from "@/lib/data/folks";

const CHIPS = [
  { id: "open", label: "Open now · 14" },
  { id: "near", label: "Within 3 mi · 8" },
  { id: "water", label: "Free water test · 9" },
  { id: "sat", label: "Saturday booking · 7" },
  { id: "indep", label: "Independent only · 12" },
] as const;

type ChipId = (typeof CHIPS)[number]["id"];

export default function FolksPage() {
  const [active, setActive] = useState<Set<ChipId>>(new Set(["open"]));
  function toggle(id: ChipId) {
    const next = new Set(active);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setActive(next);
  }

  // local-leaning sort: distance ascending
  const sortedStores = useMemo(
    () => [...stores].sort((a, b) => a.distanceMi - b.distanceMi),
    []
  );
  const sortedPros = useMemo(
    () => [...pros].sort((a, b) => a.distanceMi - b.distanceMi),
    []
  );

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-10 pt-6 sm:pt-10 pb-10 flex flex-col gap-10 sm:gap-14">
      {/* crumb */}
      <div className="flex flex-wrap items-center gap-2">
        <MapPin size={14} strokeWidth={1.7} className="text-primary" />
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.04em] text-ink-mute">
          Roseville, CA · 95661 · 5 mi radius · 26 locals
        </span>
        <span className="text-ink-faint">·</span>
        <button className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.04em] text-primary inline-flex items-center gap-1">
          Change location <ChevronDown size={12} strokeWidth={1.8} />
        </button>
      </div>

      {/* Hero header */}
      <header className="flex flex-col gap-2.5">
        <h1 className="text-[36px] sm:text-[56px] font-extrabold tracking-[-0.04em] leading-[1.02] text-ink">
          Find your people.
        </h1>
        <p className="text-[14px] sm:text-[16px] font-medium text-ink-mute leading-relaxed max-w-[780px]">
          Independent stores, service techs, builders, and specialists in {""}
          <span className="text-ink">Roseville</span>. Each one tinted by the OEM brands they
          carry or service.
        </p>
      </header>

      {/* Filter chips */}
      <div className="-mt-4 sm:-mt-6 flex flex-wrap gap-2">
        {CHIPS.map((c) => {
          const selected = active.has(c.id);
          return (
            <button
              key={c.id}
              onClick={() => toggle(c.id)}
              className={cn(
                "rounded-full px-3.5 py-2 text-[13px] tracking-[-0.005em] transition-colors",
                selected
                  ? "bg-ink text-white font-semibold"
                  : "bg-cream text-ink-soft font-medium hover:bg-cream/70"
              )}
            >
              {c.id === "open" && selected ? (
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-[7px] w-[7px] rounded-full bg-source-live" />
                  {c.label}
                </span>
              ) : (
                c.label
              )}
            </button>
          );
        })}
      </div>

      <MapStrip totalCount={26} breakdownLine="0.8 mi · open until 7 PM · 4.7 ★" />

      <FeaturedPro pro={featured} />

      {/* Pool stores */}
      <section className="flex flex-col gap-5 sm:gap-7">
        <SectionHeader
          title="Pool stores nearby."
          trailing="12 within 15 mi · sorted by local reviews"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedStores.map((s) => (
            <StoreCard key={s.id} store={s} />
          ))}
        </div>
      </section>

      {/* Service pros */}
      <section className="flex flex-col gap-5 sm:gap-7">
        <SectionHeader
          title="Service pros nearby."
          trailing="8 active this week · book from PoolGo"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedPros.map((p) => (
            <ProCard key={p.id} pro={p} />
          ))}
        </div>
      </section>

      {/* Specialists */}
      <section className="flex flex-col gap-3 sm:gap-5">
        <SectionHeader
          title="Specialists."
          trailing="Builders · plaster · heater · leak — by appointment"
        />
        <div className="flex flex-col rounded-3xl bg-cream px-5 sm:px-7">
          {specialists.map((s) => (
            <SpecRow key={s.id} spec={s} />
          ))}
        </div>
      </section>

      <div className="flex justify-center pt-4">
        <Link
          href="/connect"
          className="rounded-full bg-ink px-6 py-3.5 text-[14px] font-bold tracking-[-0.005em] text-white hover:bg-ink-soft transition-colors"
        >
          Connect your equipment to personalize this →
        </Link>
      </div>
    </div>
  );
}
