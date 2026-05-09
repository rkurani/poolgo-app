import { Anchor } from "lucide-react";
import type { Pro } from "@/lib/types";

export function FeaturedPro({ pro }: { pro: Pro }) {
  return (
    <div
      data-brand={pro.brand}
      className="relative grid grid-cols-[1.1fr_1fr] overflow-hidden rounded-2xl border border-line bg-background brand-stripe-top"
      style={{ boxShadow: "inset 0 3px 0 var(--brand-accent)" }}
    >
      <div
        className="relative flex min-h-[320px] items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--brand-accent) 0%, #1A4332 100%)",
        }}
      >
        <span className="absolute left-[18px] top-[18px] z-[3] inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-[7px] text-[10px] font-bold uppercase tracking-[0.05em] text-ink">
          <span className="text-warn">★</span>VOUCHED {pro.vouchCount}× ·{" "}
          {pro.reviewCount} REVIEWS
        </span>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 80%, rgba(31,160,191,0.18), transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05), transparent 50%)",
          }}
        />
        <Truck brandLabel={pro.name.toUpperCase()} since="SINCE 2009" />
      </div>

      <div className="flex flex-col p-7">
        <div className="mb-[18px] flex items-center gap-3">
          <div
            className="grid h-11 w-11 place-items-center rounded-[10px] text-white"
            style={{ background: "var(--brand-accent)" }}
          >
            <Anchor size={22} strokeWidth={2.2} />
          </div>
          <div>
            <div className="font-bold leading-[1.05] tracking-[-0.025em] text-[22px] text-ink">
              {pro.name}
            </div>
            <div
              className="mt-1 text-[11px] font-bold uppercase tracking-[0.05em]"
              style={{ color: "var(--brand-accent)" }}
            >
              {pro.categoryLabel}
            </div>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {pro.services.map((s, i) => (
            <span
              key={s}
              className={
                i === 0
                  ? "rounded-full px-2.5 py-[5px] text-[11px] font-semibold"
                  : "rounded-full bg-surface px-2.5 py-[5px] text-[11px] font-semibold text-ink-soft"
              }
              style={
                i === 0
                  ? {
                      background: "var(--brand-soft)",
                      color: "var(--brand-accent)",
                    }
                  : undefined
              }
            >
              {s}
            </span>
          ))}
        </div>

        <p className="m-0 mb-2 text-[17px] font-medium leading-[1.4] tracking-[-0.015em] text-ink">
          &ldquo;I&apos;ve used Marina for six years. They show up the same
          morning every week, and they actually look at the pump. Carlos is
          wonderful with our dog.&rdquo;
        </p>
        <p className="m-0 mb-[18px] text-[12px] text-ink-mute">
          Susan K, Rocklin · vouched 2024
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-4">
          <div className="flex gap-[22px]">
            <Stat num={`${pro.ratingStars} ★`} label={`${pro.reviewCount} reviews`} colored />
            <Stat num={pro.price} label={pro.priceCadence ?? ""} />
            <Stat num="2 hr" label="avg response" />
          </div>
          <button
            className="rounded-[10px] border-none px-[18px] py-[11px] text-[13px] font-semibold tracking-[-0.005em] text-white"
            style={{ background: "var(--brand-accent)" }}
          >
            Send a note →
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({
  num,
  label,
  colored = false,
}: {
  num: string;
  label: string;
  colored?: boolean;
}) {
  return (
    <div>
      <div
        className="text-[22px] font-bold leading-none tracking-[-0.03em]"
        style={colored ? { color: "var(--brand-accent)" } : undefined}
      >
        {num}
      </div>
      <div className="mt-1 text-[11px] text-ink-mute">{label}</div>
    </div>
  );
}

function Truck({
  brandLabel,
  since,
}: {
  brandLabel: string;
  since: string;
}) {
  return (
    <svg
      viewBox="0 0 400 160"
      className="relative z-[2] h-auto w-[86%] max-w-[460px]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="200" cy="148" rx="180" ry="6" fill="black" opacity="0.2" />
      <rect x="40" y="40" width="240" height="80" rx="6" fill="#FAFAFA" />
      <rect x="40" y="40" width="240" height="80" rx="6" fill="url(#truckgrad)" />
      <defs>
        <linearGradient id="truckgrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.3" />
          <stop offset="1" stopColor="black" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path
        d="M 280 50 L 320 50 L 360 80 L 360 120 L 280 120 Z"
        fill="#F5F5F5"
      />
      <path
        d="M 280 50 L 320 50 L 360 80 L 360 120 L 280 120 Z"
        fill="url(#truckgrad)"
      />
      <path d="M 290 58 L 318 58 L 348 80 L 290 80 Z" fill="#3A5A6E" opacity="0.85" />
      <rect x="60" y="62" width="200" height="40" fill="#2C5F4A" />
      <text
        x="160"
        y="80"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter Tight, sans-serif"
        fontWeight={800}
        fontSize={14}
        letterSpacing="0.05em"
      >
        {brandLabel}
      </text>
      <text
        x="160"
        y="95"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter Tight, sans-serif"
        fontWeight={600}
        fontSize={9}
        letterSpacing="0.1em"
        opacity="0.85"
      >
        {since}
      </text>
      <circle cx="100" cy="120" r="22" fill="#1A1A1A" />
      <circle cx="100" cy="120" r="14" fill="#3A4248" />
      <circle cx="100" cy="120" r="6" fill="#1A1A1A" />
      <circle cx="320" cy="120" r="22" fill="#1A1A1A" />
      <circle cx="320" cy="120" r="14" fill="#3A4248" />
      <circle cx="320" cy="120" r="6" fill="#1A1A1A" />
      <rect x="60" y="44" width="220" height="2" fill="white" opacity="0.5" />
    </svg>
  );
}
