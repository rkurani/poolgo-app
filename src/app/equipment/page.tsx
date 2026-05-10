import { ChevronRight } from "lucide-react";
import { StatusDot } from "@/components/StatusDot";
import { SectionHeader } from "@/components/SectionHeader";
import { EquipmentRow } from "@/components/myPool/EquipmentRow";
import { PumpHero } from "@/components/equipment/PumpHero";
import { SceneCard } from "@/components/equipment/SceneCard";
import { equipment } from "@/lib/data/equipment";
import { scenes } from "@/lib/data/scenes";

export default function EquipmentPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-10 pt-6 sm:pt-10 pb-10 flex flex-col gap-10 sm:gap-14">
      {/* crumb */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.04em] text-ink-mute">
          Big Blue
        </span>
        <ChevronRight size={12} strokeWidth={2} className="text-ink-faint" />
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.04em] text-ink-mute">
          Pad
        </span>
        <ChevronRight size={12} strokeWidth={2} className="text-ink-faint" />
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.04em] text-ink">
          Controls
        </span>
      </div>

      {/* Header */}
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <h1 className="text-[36px] sm:text-[64px] font-extrabold tracking-[-0.04em] leading-[1.0] text-ink">
          Pad.
        </h1>
        <div className="flex items-center gap-2">
          <StatusDot variant="live" size={7} />
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.04em] text-ink-mute">
            5 systems · last sync 7 seconds ago · all healthy
          </span>
        </div>
      </header>

      {/* Equipment selector row */}
      <EquipmentRow tiles={equipment} />

      {/* Bold pump hero */}
      <PumpHero />

      {/* Scenes */}
      <section className="flex flex-col gap-5 sm:gap-7">
        <SectionHeader
          title="Scenes."
          trailing="4 presets · coordinate all 5 systems"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {scenes.map((s) => (
            <SceneCard key={s.id} scene={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
