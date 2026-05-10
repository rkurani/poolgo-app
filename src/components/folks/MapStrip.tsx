import { MapPin } from "lucide-react";

const PINS = [
  { x: "12%", y: "30%", brand: "polaris" },
  { x: "28%", y: "22%", brand: "suncountry" },
  { x: "62%", y: "32%", brand: "leslies" },
  { x: "76%", y: "66%", brand: "marina" },
  { x: "16%", y: "68%", brand: "pentair" },
  { x: "86%", y: "22%", brand: "hayward" },
  { x: "92%", y: "70%", brand: "ridgeline" },
];

export function MapStrip({
  totalCount,
  breakdownLine,
}: {
  totalCount: number | string;
  breakdownLine: string;
}) {
  return (
    <div
      className="relative h-[200px] sm:h-[240px] rounded-3xl overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 30%, color-mix(in srgb, var(--color-polaris-soft) 90%, transparent), var(--color-cream))",
      }}
    >
      {PINS.map((p, i) => (
        <span
          key={i}
          className="absolute h-3.5 w-3.5 rounded-full"
          style={{
            left: p.x,
            top: p.y,
            background: `var(--color-${p.brand})`,
          }}
        />
      ))}
      {/* You-pin (bigger, primary, ringed) */}
      <span
        className="absolute h-[18px] w-[18px] rounded-full ring-[3px] ring-white"
        style={{ left: "46%", top: "44%", background: "var(--color-primary)" }}
      />
      {/* Map label */}
      <div className="absolute top-4 left-4 flex items-center gap-2 rounded-xl bg-cream/95 px-3 py-2 backdrop-blur-sm">
        <MapPin size={14} strokeWidth={1.7} className="text-primary" />
        <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-ink">
          Roseville · 5 mi · {totalCount} locals
        </span>
      </div>
      {/* Hover-style preview floating */}
      <div className="hidden sm:flex absolute right-6 bottom-6 flex-col gap-0.5 rounded-xl bg-white px-3.5 py-2.5 shadow-[0_6px_24px_rgba(15,17,21,0.15)]">
        <span className="text-[12px] font-bold tracking-[-0.005em] text-ink">
          Sun Country Pool Supply
        </span>
        <span className="text-[10px] font-medium text-ink-mute">
          {breakdownLine}
        </span>
      </div>
    </div>
  );
}
