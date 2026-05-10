import type { Scene } from "@/lib/types";

export function SceneCard({ scene }: { scene: Scene }) {
  const gradientStops = scene.gradientMid
    ? `${scene.gradientFrom}, ${scene.gradientMid}, ${scene.gradientTo}`
    : `${scene.gradientFrom}, ${scene.gradientTo}`;
  return (
    <div className="flex flex-col gap-3.5 rounded-3xl bg-cream p-5 shadow-[0_4_18_rgba(15,17,21,0.06)]">
      <div
        className="h-16 w-full rounded-xl"
        style={{ background: `linear-gradient(90deg, ${gradientStops})` }}
      />
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-ink-mute">
          {scene.scheduleHint}
        </span>
        <span className="text-[17px] font-extrabold tracking-[-0.02em] leading-tight text-ink">
          {scene.name}
        </span>
      </div>
      <ul className="flex flex-col gap-1">
        {scene.settings.map((s) => (
          <li key={s} className="text-[12px] font-medium text-ink-soft leading-snug">
            {s}
          </li>
        ))}
      </ul>
      {scene.isActive ? (
        <span className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-[-0.005em] text-source-live">
          Active now ●
        </span>
      ) : (
        <button className="self-start text-[12px] font-bold tracking-[-0.005em] text-ink hover:text-ink-soft">
          Activate →
        </button>
      )}
    </div>
  );
}
