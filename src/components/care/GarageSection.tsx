"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, X, MapPin, Wrench, Truck } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

type Item = {
  id: string;
  name: string;
  fits: string;
  fitsLink?: string;
  vendor: string;
  vendorLogo: string | null;
  brandTone: string;
  brandSoft: string;
  price: string;
  stock: string;
  stockTone: "live" | "soon";
  productImage: string;
  longBlurb: string;
  details: { label: string; value: string }[];
  related: string[];
};

const ITEMS: Item[] = [
  {
    id: "pool-salt",
    name: "Pool Salt, 40 lb",
    fits: "Tops up your Pentair IntelliChlor cell",
    fitsLink: "/equipment/intelliflo3",
    vendor: "Leslie's",
    vendorLogo: "/assets/leslies.png",
    brandTone: "var(--color-leslies, #0046A8)",
    brandSoft: "var(--color-leslies-soft, #DEE8F7)",
    price: "$14",
    stock: "3 bags in stock at Leslie's, 2.1 mi",
    stockTone: "live",
    productImage: "/assets/care/products/pool-salt.png",
    longBlurb:
      "High-purity pool-grade sodium chloride. Pour it in slowly along the deep-end edge with the pump running. The IntelliChlor will pull the salinity back to target within one full circulation cycle, usually four to six hours.",
    details: [
      { label: "Pure NaCl", value: "99.8%" },
      { label: "Bag weight", value: "40 lb" },
      { label: "Pool capacity", value: "Treats up to 2,000 gal" },
      { label: "Dissolve time", value: "4 to 6 hrs" },
    ],
    related: ["muriatic", "strips"],
  },
  {
    id: "muriatic",
    name: "Muriatic Acid, 1 gal",
    fits: "Drops pH when CYA partial drain pushes it up",
    vendor: "Leslie's",
    vendorLogo: "/assets/leslies.png",
    brandTone: "var(--color-leslies, #0046A8)",
    brandSoft: "var(--color-leslies-soft, #DEE8F7)",
    price: "$11",
    stock: "12 jugs in stock at Leslie's",
    stockTone: "live",
    productImage: "/assets/care/products/muriatic.png",
    longBlurb:
      "Standard 31.45% hydrochloric acid. Add slowly in front of a running return jet, never directly above the salt cell. Carlos will handle this on Tuesday's partial-drain visit if you'd rather not.",
    details: [
      { label: "Strength", value: "31.45% HCl" },
      { label: "Volume", value: "1 gal" },
      { label: "Hazard class", value: "Corrosive 8" },
      { label: "Storage", value: "Shaded, sealed, away from chlorine" },
    ],
    related: ["pool-salt", "strips"],
  },
  {
    id: "capacitor",
    name: "IntelliFlo3 Run Capacitor",
    fits: "Genuine Pentair replacement, fits your pump",
    fitsLink: "/equipment/intelliflo3",
    vendor: "Pentair",
    vendorLogo: "/assets/pentair.jpg",
    brandTone: "var(--color-pentair, #1A4F8B)",
    brandSoft: "var(--color-pentair-soft, #E5ECF4)",
    price: "$42",
    stock: "Ships Mon, install Tue with Carlos",
    stockTone: "soon",
    productImage: "/assets/care/products/capacitor.png",
    longBlurb:
      "Genuine Pentair motor-run capacitor for the IntelliFlo3 VSF. Wears out around the four-year mark on coastal-heat installs. Carlos can swap it in about 25 minutes during a regular Tuesday visit, no extra trip needed.",
    details: [
      { label: "Capacitance", value: "30 µF" },
      { label: "Voltage", value: "370 VAC" },
      { label: "Pentair PN", value: "353129S" },
      { label: "Warranty", value: "1 year" },
    ],
    related: ["sand"],
  },
  {
    id: "sand",
    name: "Hayward Filter Sand, 50 lb",
    fits: "Rebed your Hayward sand filter every 4 to 5 years",
    vendor: "Hayward",
    vendorLogo: "/assets/hayward.png",
    brandTone: "var(--color-hayward, #D8A700)",
    brandSoft: "var(--color-hayward-soft, #FBF1D0)",
    price: "$28",
    stock: "In stock at Leslie's, 2.1 mi",
    stockTone: "live",
    productImage: "/assets/care/products/sand.png",
    longBlurb:
      "Grade 20 silica sand, the size and shape Hayward specs for the S244T family. Two bags do a full rebed. Last documented rebed on your filter was March 2022, so you're due in the next year regardless of pressure.",
    details: [
      { label: "Grade", value: "20 silica" },
      { label: "Bag weight", value: "50 lb" },
      { label: "Bags per rebed", value: "2 for your S244T" },
      { label: "Last rebed", value: "Mar 2022" },
    ],
    related: ["capacitor"],
  },
  {
    id: "strips",
    name: "AquaChek 7-Way Test Strips",
    fits: "Daily check between Leslie's tests",
    vendor: "AquaChek",
    vendorLogo: null,
    brandTone: "#0B5DA8",
    brandSoft: "#DCE7F4",
    price: "$18",
    stock: "In stock at Leslie's",
    stockTone: "live",
    productImage: "/assets/care/products/strips.png",
    longBlurb:
      "Seven-parameter strips. Free chlorine, total chlorine, pH, total alkalinity, total hardness, cyanuric acid, and a bonus bromine read. Less precise than the Spin Touch but the right tool for a daily 10-second check.",
    details: [
      { label: "Parameters", value: "7" },
      { label: "Count", value: "100 strips" },
      { label: "Read time", value: "15 sec" },
      { label: "Shelf life", value: "18 mo sealed" },
    ],
    related: ["reagents", "pool-salt"],
  },
  {
    id: "reagents",
    name: "LaMotte Spin Touch Reagent Kit",
    fits: "Refill for your handheld photometer",
    vendor: "LaMotte",
    vendorLogo: null,
    brandTone: "#B8252D",
    brandSoft: "#F4DCDF",
    price: "$48",
    stock: "Ships Mon",
    stockTone: "soon",
    productImage: "/assets/care/products/reagents.png",
    longBlurb:
      "Refill disks for the LaMotte Spin Touch photometer. 100 tests per kit across the standard pool panel. Disks are good for 12 months unopened, six months once you crack the seal.",
    details: [
      { label: "Tests per kit", value: "100" },
      { label: "Parameters", value: "FC, TC, pH, TA, CYA, CH" },
      { label: "Compatible with", value: "Spin Touch DW and pool models" },
      { label: "Shelf life", value: "12 mo sealed" },
    ],
    related: ["strips"],
  },
];

export function GarageSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = openId ? ITEMS.find((i) => i.id === openId) ?? null : null;

  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, close]);

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        title="Your garage at Leslie's."
        caption="stocked for your pad, ready to add to Carlos's Tuesday visit"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenId(item.id)}
            className="group relative rounded-2xl border-2 p-5 flex flex-col gap-4 text-left hover:translate-y-[-2px] transition-transform overflow-hidden"
            style={{
              backgroundColor: "var(--color-data-cream, #F1E6D3)",
              borderColor: "var(--color-card-border, #B89B6A)",
            }}
          >
            <span
              className="absolute top-0 left-0 right-0 h-[5px]"
              style={{ backgroundColor: item.brandTone }}
              aria-hidden
            />
            <div
              className="aspect-square rounded-xl border overflow-hidden"
              style={{
                borderColor: "var(--color-mountain-shadow, #5C5546)",
                backgroundColor: "white",
              }}
            >
              <div className="relative h-full w-full">
                <Image
                  src={item.productImage}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 360px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 mt-1">
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <span
                  className="font-pixel text-[8px] uppercase tracking-[0.18em] truncate"
                  style={{ color: item.brandTone }}
                >
                  {item.vendor}
                </span>
                <span
                  className="text-[16px] font-extrabold tracking-[-0.005em] leading-tight"
                  style={{ color: "var(--color-data-ink, #3B342A)" }}
                >
                  {item.name}
                </span>
                <span
                  className="text-[11px] font-medium leading-tight mt-0.5"
                  style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                >
                  {item.fits}
                </span>
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-2 mt-auto">
              <span
                className="text-[26px] font-extrabold tracking-[-0.02em]"
                style={{
                  color: "var(--color-data-ink, #3B342A)",
                  fontFeatureSettings: '"tnum"',
                }}
              >
                {item.price}
              </span>
              <StockPill stock={item.stock} tone={item.stockTone} />
            </div>
          </button>
        ))}
      </div>

      {open ? <ProductModal item={open} onClose={close} all={ITEMS} /> : null}
    </section>
  );
}

function StockPill({ stock, tone }: { stock: string; tone: "live" | "soon" }) {
  const bg = tone === "live" ? "var(--color-source-live)" : "var(--color-citrus, #E8A82C)";
  const text = tone === "live" ? "white" : "var(--color-mountain-shadow, #5C5546)";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em]"
      style={{ backgroundColor: bg, color: text }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: text }} />
      {stock}
    </span>
  );
}

function ProductModal({
  item,
  onClose,
  all,
}: {
  item: Item;
  onClose: () => void;
  all: Item[];
}) {
  const related = item.related
    .map((id) => all.find((i) => i.id === id))
    .filter((i): i is Item => !!i);

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-end sm:place-items-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute inset-0 bg-black/55 backdrop-blur-sm cursor-default"
      />

      <div
        className="relative w-full sm:max-w-[900px] max-h-[92dvh] sm:max-h-[88dvh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border-[3px] shadow-[10px_10px_0_0_rgba(59,52,42,0.35)]"
        style={{
          backgroundColor: "var(--color-data-cream, #F1E6D3)",
          borderColor: "var(--color-mountain-shadow, #5C5546)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 grid place-items-center h-10 w-10 rounded-full border-2 backdrop-blur-sm hover:scale-105 transition-transform"
          style={{
            backgroundColor: "var(--color-data-cream, #F1E6D3)",
            borderColor: "var(--color-mountain-shadow, #5C5546)",
            color: "var(--color-mountain-shadow, #5C5546)",
          }}
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        <div
          className="absolute top-0 left-0 right-0 h-[6px] z-[1]"
          style={{ backgroundColor: item.brandTone }}
          aria-hidden
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div
            className="relative aspect-square md:aspect-auto md:h-full bg-white border-b-[3px] md:border-b-0 md:border-r-[3px]"
            style={{ borderColor: "var(--color-mountain-shadow, #5C5546)" }}
          >
            <div className="absolute inset-0">
              <Image
                src={item.productImage}
                alt={item.name}
                fill
                sizes="(min-width: 768px) 450px, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] border-2 backdrop-blur-sm"
                 style={{
                   backgroundColor: item.brandSoft,
                   borderColor: "var(--color-mountain-shadow, #5C5546)",
                   color: item.brandTone,
                 }}>
              {item.vendor}
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <span
                className="font-pixel text-[10px] uppercase tracking-[0.2em]"
                style={{ color: item.brandTone }}
              >
                {item.vendor}
              </span>
              <h2
                className="text-[28px] sm:text-[36px] leading-[1.0] font-extrabold tracking-[-0.025em]"
                style={{ color: "var(--color-data-ink, #3B342A)" }}
              >
                {item.name}
              </h2>
              {item.fitsLink ? (
                <a
                  href={item.fitsLink}
                  className="text-[12px] font-semibold underline-offset-2 hover:underline w-fit"
                  style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                >
                  {item.fits}
                </a>
              ) : (
                <span
                  className="text-[12px] font-medium"
                  style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                >
                  {item.fits}
                </span>
              )}
              <div className="pixel-bar-thin mt-2" aria-hidden />
            </div>

            <p
              className="text-[14px] leading-relaxed"
              style={{ color: "var(--color-data-ink, #3B342A)" }}
            >
              {item.longBlurb}
            </p>

            <div
              className="rounded-xl border-2 p-4 grid grid-cols-2 gap-y-3 gap-x-4"
              style={{
                backgroundColor: "var(--color-data-cream-2, #E5D7BE)",
                borderColor: "var(--color-card-border, #B89B6A)",
              }}
            >
              {item.details.map((d) => (
                <div key={d.label} className="flex flex-col gap-0.5">
                  <span
                    className="font-pixel text-[8px] uppercase tracking-[0.14em]"
                    style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                  >
                    {d.label}
                  </span>
                  <span
                    className="text-[13px] font-bold tracking-[-0.005em]"
                    style={{
                      color: "var(--color-data-ink, #3B342A)",
                      fontFeatureSettings: '"tnum"',
                    }}
                  >
                    {d.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <span
                className="text-[40px] sm:text-[48px] leading-none font-extrabold tracking-[-0.03em]"
                style={{
                  color: "var(--color-data-ink, #3B342A)",
                  fontFeatureSettings: '"tnum"',
                }}
              >
                {item.price}
              </span>
              <StockPill stock={item.stock} tone={item.stockTone} />
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="inline-flex items-center justify-between gap-2 rounded-xl px-5 py-4 text-[15px] font-bold tracking-[-0.005em] shadow-[3px_3px_0_0_rgba(59,52,42,0.45)] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_rgba(59,52,42,0.45)] transition-all"
                style={{
                  backgroundColor: "var(--color-terracotta, #C75240)",
                  color: "white",
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <Wrench size={16} strokeWidth={2.5} />
                  Add to Tuesday with Carlos
                </span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-[12px] font-bold tracking-[-0.005em] border-2"
                  style={{
                    borderColor: "var(--color-mountain-shadow, #5C5546)",
                    color: "var(--color-data-ink, #3B342A)",
                    backgroundColor: "transparent",
                  }}
                >
                  <Truck size={14} strokeWidth={2.5} />
                  Ship to me
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-[12px] font-bold tracking-[-0.005em] border-2"
                  style={{
                    borderColor: "var(--color-mountain-shadow, #5C5546)",
                    color: "var(--color-data-ink, #3B342A)",
                    backgroundColor: "transparent",
                  }}
                >
                  <MapPin size={14} strokeWidth={2.5} />
                  Pick up Tue
                </button>
              </div>
            </div>

            {related.length > 0 && (
              <div className="flex flex-col gap-3 pt-3 border-t-2"
                   style={{ borderColor: "var(--color-card-border, #B89B6A)" }}>
                <span
                  className="font-pixel text-[9px] uppercase tracking-[0.2em]"
                  style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                >
                  Often added with
                </span>
                <div className="flex flex-wrap gap-2">
                  {related.map((r) => (
                    <span
                      key={r.id}
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-semibold border-2"
                      style={{
                        backgroundColor: r.brandSoft,
                        borderColor: "var(--color-mountain-shadow, #5C5546)",
                        color: "var(--color-data-ink, #3B342A)",
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: r.brandTone }}
                      />
                      {r.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
