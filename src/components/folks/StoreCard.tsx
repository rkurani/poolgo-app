import { Sun, BookOpenText, CircleDollarSign } from "lucide-react";
import type { Store } from "@/lib/types";

const ICONS: Record<Store["brand"], typeof Sun> = {
  suncountry: Sun,
  leslies: BookOpenText,
  pinch: CircleDollarSign,
};

export function StoreCard({ store }: { store: Store }) {
  const Icon = ICONS[store.brand];
  return (
    <div
      data-brand={store.brand}
      className="relative flex flex-col overflow-hidden rounded-[14px] border border-line bg-background"
      style={{ boxShadow: "inset 0 3px 0 var(--brand-accent)" }}
    >
      <div
        className="relative flex h-[120px] items-center justify-center border-b border-line"
        style={{ background: "var(--brand-soft)" }}
      >
        <span className="absolute left-3 top-3 rounded-md border border-line bg-white/95 px-[9px] py-[5px] text-[10px] font-bold uppercase tracking-[0.05em] text-ink-soft">
          {store.distanceMi} MI · {store.city.toUpperCase()}
        </span>
        {store.isPrimary && (
          <span className="absolute right-3 top-3 rounded-md bg-ink px-[9px] py-[5px] text-[10px] font-bold uppercase tracking-[0.05em] text-white">
            Your primary
          </span>
        )}
        <div
          className="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl border border-line bg-white shadow-sm"
          style={{ color: "var(--brand-accent)" }}
        >
          <Icon size={42} strokeWidth={2} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-[18px]">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.06em]"
          style={{ color: "var(--brand-accent)" }}
        >
          RETAIL · {store.kind.toUpperCase()}
        </div>
        <h3 className="m-0 text-[17px] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
          {store.name}
        </h3>
        <div className="text-[13px] leading-[1.4] text-ink-soft">
          {store.services.join(" · ")}
        </div>

        <div className="mt-1 flex flex-wrap gap-1.5">
          {store.carries.map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1 text-[11px] font-semibold text-ink-soft"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: c.swatch }}
              />
              {c.label}
            </span>
          ))}
        </div>

        <div className="mt-2 flex items-end justify-between gap-3 border-t border-line pt-3 text-[12px]">
          <div>
            <strong className="font-semibold text-ink">{store.hours}</strong>
            <br />
            <span className="text-ink-mute">{store.staffNote}</span>
          </div>
          <a
            href="#"
            className="whitespace-nowrap font-semibold"
            style={{ color: "var(--brand-accent)" }}
          >
            Get directions →
          </a>
        </div>
      </div>
    </div>
  );
}
