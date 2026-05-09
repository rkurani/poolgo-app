"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Chip } from "@/components/Chip";
import { AIBand, AIMark } from "@/components/AIBand";
import { MapStrip } from "@/components/folks/MapStrip";
import { FeaturedPro } from "@/components/folks/FeaturedPro";
import { ProCard } from "@/components/folks/ProCard";
import { StoreCard } from "@/components/folks/StoreCard";
import { SpecRow } from "@/components/folks/SpecRow";
import {
  featured,
  pros as PROS,
  stores as STORES,
  specialists as SPECS,
} from "@/lib/data/folks";
import type { FilterKey } from "@/lib/types";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "service", label: "Service techs" },
  { key: "stores", label: "Pool stores" },
  { key: "builders", label: "Builders" },
  { key: "repair", label: "Equipment repair" },
  { key: "plaster", label: "Plaster & tile" },
];

export default function FolksPage() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [zip, setZip] = useState("Roseville, CA · 95661");
  const [service, setService] = useState("Any service");

  const showPros =
    filter === "all" || filter === "service" || filter === "repair";
  const showStores = filter === "all" || filter === "stores";
  const showSpecs =
    filter === "all" || filter === "builders" || filter === "plaster";

  const visiblePros = useMemo(() => {
    if (filter === "repair")
      return PROS.filter((p) => p.category === "service-repair");
    if (filter === "service")
      return PROS.filter((p) => p.category.startsWith("service-"));
    return PROS;
  }, [filter]);

  const visibleSpecs = useMemo(() => {
    if (filter === "builders")
      return SPECS.filter((s) => s.id === "westshore");
    if (filter === "plaster")
      return SPECS.filter((s) => s.id === "plaster");
    return SPECS;
  }, [filter]);

  const counts = {
    all: PROS.length + STORES.length + SPECS.length + 1,
    service: PROS.filter((p) => p.category.startsWith("service-")).length + 1,
    stores: STORES.length,
    builders: SPECS.filter((s) => s.id === "westshore").length,
    repair: PROS.filter((p) => p.category === "service-repair").length,
    plaster: SPECS.filter((s) => s.id === "plaster").length,
  };

  return (
    <>
      <PageHeader
        title="Folks on your pool."
        lede={
          <>
            Service techs, pool stores, builders, and repair specialists
            within 8 miles. Each is independent. PoolGo is the record.{" "}
            <strong>
              No paid placement, no kickbacks, no listing fees.
            </strong>
          </>
        }
        stats={[
          { num: String(PROS.length + STORES.length + SPECS.length + 1), label: "Within 8 mi" },
          { num: String(PROS.length + 1), label: "Service techs" },
          { num: String(STORES.length), label: "Pool stores" },
          { num: String(SPECS.length), label: "Specialists" },
        ]}
      />

      {/* search */}
      <div className="mx-auto mt-7 flex max-w-[1280px] gap-3 px-8">
        <div className="flex h-11 flex-1 items-center gap-2.5 rounded-[10px] border border-line bg-surface px-3.5 text-ink-mute">
          <Search size={18} strokeWidth={1.8} />
          <input
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="min-w-0 flex-1 border-none bg-transparent font-[inherit] text-ink outline-none"
          />
          <span className="h-5 w-px bg-line-2" />
          <input
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-[140px] min-w-0 border-none bg-transparent font-[inherit] text-ink outline-none"
          />
        </div>
        <button className="h-11 rounded-[10px] border-none bg-ink px-5 text-[14px] font-semibold tracking-[-0.005em] text-white">
          Search
        </button>
      </div>

      {/* filter chips */}
      <div className="mx-auto mt-4 flex max-w-[1280px] flex-wrap items-center gap-2 px-8">
        {FILTERS.map((f) => (
          <Chip
            key={f.key}
            active={filter === f.key}
            count={counts[f.key]}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </Chip>
        ))}
        <span className="ml-auto text-[12px] text-ink-mute">
          Sort ·{" "}
          <strong className="font-semibold text-ink">Nearest</strong> ·
          top-rated · most-vouched · open today
        </span>
      </div>

      {/* map */}
      <section className="mx-auto mt-14 max-w-[1280px] px-8">
        <MapStrip
          totalCount={14}
          breakdownLine="within 8 miles. 6 service · 3 retail · 2 builders · 3 specialists."
        />
      </section>

      {/* AI summary */}
      <section className="mx-auto mt-14 max-w-[1280px] px-8">
        <AIBand eyebrow="POOLGO CONCIERGE · YOUR NEIGHBORHOOD">
          Of the <strong>14 folks</strong> within 8 miles,{" "}
          <strong>4 of your neighbors</strong> already use Marina Pool
          Service. Sun Country is your primary water-test store and feeds
          your records automatically.{" "}
          <AIMark>
            Granite Bay Heater Co. is the closest gas-certified heater
            specialist
          </AIMark>{" "}
          if your Pentair MasterTemp ever needs work. None of these
          businesses pay PoolGo for placement.
        </AIBand>
      </section>

      {/* featured */}
      {(filter === "all" || filter === "service") && (
        <section className="mx-auto mt-14 max-w-[1280px] px-8">
          <SectionHead
            title="Top vouched-for in your area"
            meta={
              <>
                <strong className="font-semibold text-ink">
                  4 of your neighbors
                </strong>{" "}
                use this service
              </>
            }
          />
          <FeaturedPro pro={featured} />
        </section>
      )}

      {/* pros */}
      {showPros && visiblePros.length > 0 && (
        <section className="mx-auto mt-14 max-w-[1280px] px-8">
          <SectionHead
            title="Service techs nearby"
            meta={
              <>
                Sorted by{" "}
                <strong className="font-semibold text-ink">nearest</strong> ·
                color-coded by company
              </>
            }
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[...visiblePros]
              .sort((a, b) => a.distanceMi - b.distanceMi)
              .map((pro) => (
                <ProCard key={pro.id} pro={pro} />
              ))}
          </div>
        </section>
      )}

      {/* stores */}
      {showStores && (
        <section className="mx-auto mt-14 max-w-[1280px] px-8">
          <SectionHead
            title="Pool stores nearby"
            meta={
              <>
                <strong className="font-semibold text-ink">
                  3 retail stores
                </strong>{" "}
                · all import water tests to PoolGo automatically
              </>
            }
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[...STORES]
              .sort((a, b) => a.distanceMi - b.distanceMi)
              .map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
          </div>
        </section>
      )}

      {/* specialists */}
      {showSpecs && visibleSpecs.length > 0 && (
        <section className="mx-auto mt-14 max-w-[1280px] px-8">
          <SectionHead
            title="Builders & specialists"
            meta={
              <>
                For when something major needs work ·{" "}
                <strong className="font-semibold text-ink">
                  by appointment
                </strong>
              </>
            }
          />
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            {[...visibleSpecs]
              .sort((a, b) => a.distanceMi - b.distanceMi)
              .map((spec) => (
                <SpecRow key={spec.id} spec={spec} />
              ))}
          </div>
        </section>
      )}

      <div className="mx-auto mt-14 flex max-w-[1280px] flex-wrap items-center justify-between gap-4 border-t border-line px-8 py-[18px]">
        <div className="max-w-[60ch] text-[12px] text-ink-mute">
          <strong className="font-semibold text-ink">How Folks works.</strong>{" "}
          Each business is independent. PoolGo charges them nothing to be
          listed. Vouches come from neighbors who already use them, never
          from the business itself. Every store you see also feeds your
          water tests into your record automatically.
        </div>
      </div>

      <div className="h-20" />
    </>
  );
}

function SectionHead({
  title,
  meta,
}: {
  title: string;
  meta: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-baseline justify-between">
      <h2 className="m-0 text-[22px] font-bold tracking-[-0.03em]">
        {title}
      </h2>
      <span className="text-[13px] font-medium text-ink-mute">{meta}</span>
    </div>
  );
}
