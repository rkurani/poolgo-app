export function AIConciergeBand({
  eyebrow = "POOLGO CONCIERGE · JUST NOW",
  body,
  primaryCta = "See the plan",
  secondaryCta = "Ask Carlos",
}: {
  eyebrow?: string;
  body: string;
  primaryCta?: string;
  secondaryCta?: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-ink p-6 sm:p-9"
      style={{
        background:
          "radial-gradient(ellipse 95% 120% at 90% 100%, color-mix(in srgb, var(--color-primary) 50%, transparent) 0%, transparent 70%), var(--color-ink)",
      }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-7">
        <div className="flex flex-col gap-3 max-w-[760px]">
          <div className="flex items-center gap-2.5">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-primary text-[13px] font-extrabold text-white tracking-[-0.02em]">
              P
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.04em] text-white/60">
              {eyebrow}
            </span>
          </div>
          <p className="text-[16px] sm:text-[22px] font-medium text-white leading-snug tracking-[-0.01em]">
            {body}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="rounded-full bg-white px-[18px] py-3 text-[13px] font-bold tracking-[-0.005em] text-ink hover:bg-white/90 transition-colors">
            {primaryCta}
          </button>
          <button className="px-[18px] py-3 text-[13px] font-bold tracking-[-0.005em] text-white hover:text-white/80 transition-colors">
            {secondaryCta}
          </button>
        </div>
      </div>
    </div>
  );
}
