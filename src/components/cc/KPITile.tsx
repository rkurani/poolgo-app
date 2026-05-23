/**
 * The signature ClearCare KPI tile — bold saturated color, big white value.
 * Color choice signals status, not brand.
 */
export type KPIColor = "pink" | "cyan" | "orange" | "green";

export function KPITile({
  value,
  unit,
  color,
  label,
  size = "md",
}: {
  value: number | string;
  unit?: string;
  color: KPIColor;
  label: string;
  size?: "sm" | "md" | "lg";
}) {
  const bg = {
    pink: "var(--cc-kpi-pink)",
    cyan: "var(--cc-kpi-cyan)",
    orange: "var(--cc-kpi-orange)",
    green: "var(--cc-kpi-green)",
  }[color];

  const dims = {
    sm: { min: "84px",  value: "22px", label: "10.5px" },
    md: { min: "112px", value: "30px", label: "11px" },
    lg: { min: "140px", value: "40px", label: "11.5px" },
  }[size];

  return (
    <div
      className="flex flex-col justify-center px-4 py-3 text-white"
      style={{
        background: bg,
        borderRadius: "var(--cc-radius-card)",
        minWidth: dims.min,
      }}
    >
      <div
        className="font-bold uppercase tracking-wider opacity-90"
        style={{ fontSize: dims.label }}
      >
        {label}
      </div>
      <div className="mt-0.5 font-bold leading-[1.05]" style={{ fontSize: dims.value }}>
        {value}
      </div>
      {unit && (
        <div className="text-[11.5px] font-semibold opacity-90">{unit}</div>
      )}
    </div>
  );
}
