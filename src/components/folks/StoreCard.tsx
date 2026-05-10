import Image from "next/image";
import { Footprints } from "lucide-react";
import { Pill } from "@/components/Pill";
import type { Store } from "@/lib/types";

const LOGO_SRC: Partial<Record<Store["brand"], string>> = {
  leslies: "/assets/leslies.png",
};

const TEXT_MARK: Partial<Record<Store["brand"], string>> = {
  suncountry: "S·C",
  pinch: "P·P",
};

export function StoreCard({ store }: { store: Store }) {
  const logo = LOGO_SRC[store.brand];
  const mark = TEXT_MARK[store.brand];
  return (
    <div
      data-brand={store.brand}
      className="flex flex-col rounded-3xl bg-cream overflow-hidden shadow-[0_4_18_rgba(15,17,21,0.06)]"
    >
      <div
        className="relative h-[140px] flex items-start justify-end p-3.5 overflow-hidden"
        style={{
          background:
            "color-mix(in srgb, var(--brand-soft) 70%, var(--color-cream))",
        }}
      >
        <Image
          src="/assets/storefront.jpg"
          alt=""
          width={400}
          height={140}
          className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-60"
        />
        {logo ? (
          <div
            className="relative grid h-10 w-16 place-items-center rounded-lg bg-white p-1.5"
            style={{ boxShadow: "0 1px 2px rgba(15,17,21,0.08)" }}
          >
            <Image src={logo} alt="" width={50} height={28} className="object-contain max-h-7" />
          </div>
        ) : mark ? (
          <div
            className="relative grid h-8 w-12 place-items-center rounded-lg"
            style={{
              background: "var(--brand-accent)",
              color: "white",
            }}
          >
            <span className="text-[11px] font-extrabold tracking-[0.04em]">{mark}</span>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-2.5 p-[18px]">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[16px] font-bold tracking-[-0.02em] leading-tight text-ink">
            {store.name}
          </h3>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.04em]"
            style={{ color: "var(--brand-accent)" }}
          >
            {store.kind === "Big-box chain" ? "Chain" : "Store"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Footprints size={14} strokeWidth={1.7} className="text-ink-mute" />
          <span className="text-[15px] font-extrabold tracking-[-0.005em] text-ink tabular-nums">
            {store.distanceMi} MI
          </span>
          <span className="text-[13px] font-medium text-ink-mute truncate">
            · {store.hours}
          </span>
        </div>
        <p className="text-[13px] font-medium text-ink-soft leading-snug">
          {store.staffNote ? `${store.staffNote}.` : ""} {store.services.slice(0, 2).join(" · ")}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {store.carries.slice(0, 3).map((c) => (
            <Pill key={c.brand} brand={c.brand} size="sm">
              {c.label}
            </Pill>
          ))}
        </div>
      </div>
    </div>
  );
}
