import type { ReactNode } from "react";

export function AIBand({
  eyebrow = "POOLGO CONCIERGE",
  children,
}: {
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-ink px-7 py-[22px] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[50px] -right-[50px] h-[220px] w-[220px]"
        style={{
          background:
            "radial-gradient(circle, rgba(31,160,191,0.45) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-[2] mb-3 flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-[14px] font-extrabold tracking-[-0.04em] text-white">
          P
        </div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.04em] text-white/60">
          {eyebrow}
        </div>
      </div>
      <div className="relative z-[2] max-w-[70ch] text-[16px] font-medium leading-[1.5] tracking-[-0.005em]">
        {children}
      </div>
    </div>
  );
}

export function AIMark({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-[3px] bg-white/15 px-1 py-0">{children}</span>
  );
}
