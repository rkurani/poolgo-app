/**
 * ClearCare card primitives. Sampled from clearcare-marketing-center CSS tokens:
 * 10px radius, 1px border, soft shadow, optional gradient or tenant-colored head.
 */
import type { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div
      className="overflow-hidden bg-white"
      style={{
        border: "1px solid var(--cc-border)",
        borderRadius: "var(--cc-radius-card)",
        boxShadow: "var(--cc-shadow-sm)",
      }}
    >
      {children}
    </div>
  );
}

export function CardHead({
  children,
  icon,
  variant = "gradient",
}: {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "gradient" | "tenant" | "pink" | "orange" | "cyan" | "green";
}) {
  const background = {
    gradient: "var(--cc-card-grad)",
    tenant: "var(--tenant-accent)",
    pink: "var(--cc-kpi-pink)",
    orange: "var(--cc-kpi-orange)",
    cyan: "var(--cc-kpi-cyan)",
    green: "var(--cc-kpi-green)",
  }[variant];
  return (
    <div
      className="flex min-h-[42px] items-center gap-2 px-4 py-2.5 text-[14px] font-bold text-white"
      style={{ background }}
    >
      {icon}
      {children}
    </div>
  );
}

export function CardBody({ children }: { children: ReactNode }) {
  return <div className="px-5 py-4">{children}</div>;
}

export function CardActionPill({ children }: { children: ReactNode }) {
  return (
    <span
      className="ml-auto rounded px-2 py-[3px] text-[11px] font-bold uppercase tracking-wider"
      style={{
        background: "rgba(255,255,255,0.22)",
        color: "#fff",
      }}
    >
      {children}
    </span>
  );
}
