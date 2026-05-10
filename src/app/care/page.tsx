import { Plus } from "lucide-react";
import { StatusDot } from "@/components/StatusDot";
import { SectionHeader } from "@/components/SectionHeader";
import { Chart30Day } from "@/components/Chart30Day";
import { ChemistryStrip } from "@/components/myPool/ChemistryStrip";
import { ActivityFeed } from "@/components/myPool/ActivityFeed";
import { vitals, cyaHistory } from "@/lib/data/chemistry";
import { activity } from "@/lib/data/activity";

export default function CarePage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-10 pt-6 sm:pt-10 pb-10 flex flex-col gap-10 sm:gap-14">
      <div className="flex items-center gap-2">
        <StatusDot variant="imported" size={7} />
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.04em] text-ink-mute">
          7:42 AM · Sun Country test imported · Roseville 95661
        </span>
      </div>

      {/* Header */}
      <header className="flex flex-col gap-3">
        <h1 className="text-[36px] sm:text-[64px] font-extrabold tracking-[-0.04em] leading-[1.0] text-ink">
          Today&apos;s water.
        </h1>
        <p className="text-[14px] sm:text-[18px] font-medium text-ink-mute leading-snug max-w-[700px]">
          All in range. CYA climbing — Carlos partial-drain Tuesday brings it back to 30 ppm.
        </p>
      </header>

      {/* Vitals */}
      <ChemistryStrip readings={vitals} variant="spacious" />

      {/* CTA */}
      <div className="flex items-center gap-3 -mt-4 sm:-mt-6">
        <button className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[13px] font-bold tracking-[-0.005em] text-white hover:bg-ink-soft transition-colors">
          <Plus size={16} strokeWidth={2} />
          Add a water test
        </button>
        <button className="text-[13px] font-bold tracking-[-0.005em] text-ink hover:text-ink-soft px-3">
          Pickup a kit at Sun Country →
        </button>
      </div>

      {/* 30-day chart */}
      <section className="flex flex-col gap-5 sm:gap-7">
        <SectionHeader
          title="CYA · last 14 days."
          caption="Climbing about 1 ppm/day. Drain on Tue brings it back to ~30 ppm."
          trailing="Imported · Sun Country tests"
        />
        <Chart30Day data={cyaHistory} highlightDays={["MAY 8"]} />
      </section>

      {/* Recent chemistry events */}
      <section className="flex flex-col gap-5 sm:gap-7">
        <SectionHeader
          title="Recent water events."
          caption="Tests, refills, and chemistry changes — sorted by recency."
        />
        <ActivityFeed
          entries={activity.filter((e) => e.source === "imported" || e.id.includes("schedule") || e.id.includes("tabs"))}
        />
      </section>
    </div>
  );
}
