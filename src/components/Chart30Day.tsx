type ChartPoint = {
  day: string;
  value: number;
  source: "imported" | "human" | "live";
};

const sourceColor: Record<ChartPoint["source"], string> = {
  imported: "var(--color-source-imported)",
  human: "var(--color-source-human)",
  live: "var(--color-source-live)",
};

export function Chart30Day({
  data,
  highlightDays,
}: {
  data: ChartPoint[];
  /** day labels to render bold under chart */
  highlightDays?: string[];
}) {
  if (data.length === 0) return null;
  const max = Math.max(...data.map((p) => p.value));
  const labelEvery = Math.max(1, Math.ceil(data.length / 4));
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end gap-[6px] h-[140px]">
        {data.map((p) => {
          const heightPct = (p.value / max) * 100;
          return (
            <div
              key={p.day}
              className="flex-1 rounded-[3px]"
              style={{
                height: `${heightPct}%`,
                minHeight: 16,
                background: sourceColor[p.source],
              }}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.04em] text-ink-faint">
        {data.map((p, i) => {
          if (i % labelEvery !== 0 && i !== data.length - 1) return <span key={p.day} />;
          const highlighted = highlightDays?.includes(p.day);
          return (
            <span
              key={p.day}
              style={{ color: highlighted ? "var(--color-source-human)" : undefined }}
              className={highlighted ? "text-source-human" : ""}
            >
              {p.day}
            </span>
          );
        })}
      </div>
    </div>
  );
}
