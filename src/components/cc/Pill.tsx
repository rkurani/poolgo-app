import type { ReactNode } from "react";

export function Pill({
  children,
  tone = "info",
}: {
  children: ReactNode;
  tone?: "info" | "warn" | "success";
}) {
  const style =
    tone === "info"
      ? {
          background: "var(--cc-pill-bg)",
          borderColor: "var(--cc-pill-border)",
          color: "var(--cc-pill-text)",
        }
      : tone === "warn"
      ? {
          background: "var(--cc-warn-bg)",
          borderColor: "var(--cc-warn-accent)",
          color: "#7a5a00",
        }
      : {
          background: "#d8f5e3",
          borderColor: "#9ddcb4",
          color: "var(--cc-green)",
        };

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2.5 py-[3px] text-[12px] font-semibold"
      style={style}
    >
      {children}
    </span>
  );
}
