type Pin = {
  top: string;
  left: string;
  kind?: "you" | "gold" | "blue" | "green" | "coral";
};

const PINS: Pin[] = [
  { top: "50%", left: "50%", kind: "you" },
  { top: "28%", left: "22%", kind: "gold" },
  { top: "32%", left: "70%", kind: "blue" },
  { top: "65%", left: "28%", kind: "green" },
  { top: "45%", left: "78%", kind: "green" },
  { top: "62%", left: "65%", kind: "coral" },
  { top: "72%", left: "48%", kind: "gold" },
  { top: "22%", left: "50%" },
  { top: "78%", left: "80%" },
];

const KIND_COLORS: Record<NonNullable<Pin["kind"]>, string> = {
  you: "var(--color-primary)",
  gold: "var(--color-suncountry)",
  blue: "var(--color-leslies)",
  green: "var(--color-marina)",
  coral: "var(--color-error)",
};

export function MapStrip({
  totalCount,
  breakdownLine,
}: {
  totalCount: number | string;
  breakdownLine: string;
}) {
  return (
    <div className="relative min-h-[200px] overflow-hidden rounded-[14px] border border-line bg-surface px-8 py-7">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(31,160,191,0.06), transparent 30%),
            radial-gradient(circle at 70% 70%, rgba(176,123,0,0.05), transparent 30%),
            radial-gradient(circle at 80% 20%, rgba(0,70,168,0.05), transparent 30%)
          `,
        }}
      />
      {PINS.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full border-[2.5px] border-white shadow-sm"
          style={{
            top: p.top,
            left: p.left,
            width: p.kind === "you" ? 18 : 14,
            height: p.kind === "you" ? 18 : 14,
            transform:
              p.kind === "you" ? "translate(-50%, -50%)" : undefined,
            background: p.kind
              ? KIND_COLORS[p.kind]
              : "var(--color-ink-mute)",
            boxShadow:
              p.kind === "you"
                ? "0 0 0 6px rgba(31,160,191,0.18), 0 1px 3px rgba(15,17,21,0.2)"
                : "0 1px 3px rgba(15,17,21,0.15)",
          }}
        />
      ))}

      <div className="relative z-[2] flex items-end justify-between gap-5">
        <div>
          <div className="text-[48px] font-extrabold leading-none tracking-[-0.04em]">
            {totalCount}
          </div>
          <div className="mt-2 max-w-[36ch] text-[13px] text-ink-soft">
            <strong className="font-semibold text-ink">
              vouched-for businesses
            </strong>{" "}
            {breakdownLine}
          </div>
        </div>
        <div className="flex flex-wrap gap-3.5 text-[12px] text-ink-mute">
          <LegendDot color="var(--color-primary)">You</LegendDot>
          <LegendDot color="var(--color-suncountry)">Sun Country</LegendDot>
          <LegendDot color="var(--color-leslies)">Leslie&apos;s</LegendDot>
          <LegendDot color="var(--color-marina)">
            Marina &amp; Foothill
          </LegendDot>
          <LegendDot color="var(--color-error)">Ridgeline</LegendDot>
          <LegendDot>Other</LegendDot>
        </div>
      </div>
    </div>
  );
}

function LegendDot({
  color,
  children,
}: {
  color?: string;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ background: color ?? "var(--color-ink-mute)" }}
      />
      {children}
    </span>
  );
}
