import Link from "next/link";
import { StatusDot } from "@/components/StatusDot";
import { SectionHeader } from "@/components/SectionHeader";
import { AIConciergeBand } from "@/components/AIConciergeBand";
import { ScheduleGantt } from "@/components/ScheduleGantt";
import { PoolIdentity } from "@/components/myPool/PoolIdentity";
import { EquipmentRow } from "@/components/myPool/EquipmentRow";
import { ChemistryStrip } from "@/components/myPool/ChemistryStrip";
import { ActivityFeed } from "@/components/myPool/ActivityFeed";
import { pool } from "@/lib/data/pool";
import { equipment } from "@/lib/data/equipment";
import { vitals } from "@/lib/data/chemistry";
import { schedule } from "@/lib/data/schedule";
import { activity } from "@/lib/data/activity";

export default function MyPoolPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-10 pt-6 sm:pt-10 pb-10 flex flex-col gap-10 sm:gap-14">
      {/* crumb */}
      <div className="flex items-center gap-2 -mt-2 sm:mt-0">
        <StatusDot variant="live" size={7} />
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.04em] text-ink-mute truncate">
          Tuesday · May 9 · 7:42 AM · {pool.city} · {pool.weatherToday}
        </span>
      </div>

      <PoolIdentity pool={pool} />

      <AIConciergeBand
        body="Pool's healthy this morning. CYA crept up to 42 ppm — Carlos drops by Tuesday for the partial drain. Then we're caught up."
      />

      {/* equipment */}
      <section className="flex flex-col gap-4 sm:gap-6">
        <SectionHeader
          title="Pad."
          caption="5 systems · last sync 7 seconds ago · all healthy"
          trailing={
            <Link href="/equipment" className="text-ink hover:text-ink-soft">
              Open controls →
            </Link>
          }
        />
        <EquipmentRow tiles={equipment} />
      </section>

      {/* today's water */}
      <section className="flex flex-col gap-5 sm:gap-7">
        <SectionHeader
          title={<>Today&apos;s water.</>}
          caption="All in range. CYA climbing — Carlos partial-drain Tuesday."
          trailing={
            <Link href="/care" className="text-ink hover:text-ink-soft">
              See chemistry →
            </Link>
          }
        />
        <ChemistryStrip readings={vitals} />
      </section>

      {/* schedule */}
      <section className="flex flex-col gap-5 sm:gap-7">
        <SectionHeader
          title={<>Today&apos;s schedule.</>}
          caption="Sun rises 5:42 · sets 8:14 · pump runs while sun's up."
          trailing={
            <span className="text-ink hover:text-ink-soft cursor-pointer">
              Edit schedule →
            </span>
          }
        />
        <ScheduleGantt rows={schedule} />
      </section>

      {/* recent */}
      <section className="flex flex-col gap-5 sm:gap-7">
        <SectionHeader
          title="Recent."
          caption="Last 24 hours · view all →"
        />
        <ActivityFeed entries={activity} />
      </section>
    </div>
  );
}
