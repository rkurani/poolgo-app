import type { ReactNode } from "react";

export function PrimaryCTA({
  children,
  href = "#",
}: {
  children: ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-[14px] font-bold text-white"
      style={{
        background: "var(--cc-green)",
        borderRadius: "var(--cc-radius-card)",
        boxShadow: "var(--cc-shadow-sm)",
      }}
    >
      {children}
    </a>
  );
}

export function SecondaryCTA({
  children,
  href = "#",
}: {
  children: ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-[14px] font-semibold"
      style={{
        background: "var(--cc-teal-soft)",
        color: "var(--cc-text)",
        border: "1px solid var(--cc-teal)",
        borderRadius: "var(--cc-radius-card)",
      }}
    >
      {children}
    </a>
  );
}

export function InfoBanner({ children }: { children: ReactNode }) {
  return (
    <div
      className="px-4 py-3"
      style={{
        background: "var(--cc-info-bg)",
        border: "1px solid var(--cc-info-border)",
        borderRadius: "var(--cc-radius-card)",
      }}
    >
      {children}
    </div>
  );
}
