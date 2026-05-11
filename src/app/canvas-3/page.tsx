"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Canvas 3: the layered breathing world, now with a click-to-place editor.
 *
 * Visit /canvas-3?edit=1 to enter placement mode. Pick a layer from the panel,
 * click on the canvas where you want it. Width and height are tuned by the
 * arrow keys (← → for width, ↑ ↓ for height) while the layer is selected.
 * Positions persist in localStorage so a refresh keeps your work. The "Copy"
 * button on the panel emits a JSON snippet you can hand back to me to bake
 * into the defaults.
 *
 * Out of edit mode the canvas is the production view: orbs, ambient SVG,
 * layered animated PNGs.
 */

type Status = "good" | "warn" | "info" | "human";

type Hotspot = {
  id: string;
  label: string;
  detail: string;
  href: string;
  x: number;
  y: number;
  status: Status;
};

type LayerCfg = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type LayerId = "palmL" | "palmR" | "orange" | "bougain" | "smoke";

const STAGE_W = 2400;
const STAGE_H = 1500;

// Positions tuned by eye against the base screenshot:
// pickup truck on left of street, pool centered, equipment pad bottom-right,
// lounger on the wooden deck at left-center, storefront top-right.
const HOTSPOTS: Hotspot[] = [
  { id: "pool",    x: 55, y: 70, label: "Today's water",                detail: "pH 7.4, ORP 720",      href: "/care",                  status: "good" },
  { id: "pad",     x: 82, y: 90, label: "The pad",                     detail: "5 systems, all live",  href: "/equipment",             status: "good" },
  { id: "lounger", x: 21, y: 52, label: "On the lounger",              detail: "Guest, 2:14pm",        href: "/care",                  status: "human" },
  { id: "truck",   x: 14, y: 14, label: "Carlos, 4 mins up the street",detail: "Routes nearby",        href: "/folks/carlos-redlands", status: "human" },
  { id: "shop",    x: 88, y: 13, label: "Leslie's, 2 mi",              detail: "In stock now",        href: "/folks",                  status: "info" },
];

const STATUS_COLOR: Record<Status, string> = {
  good: "var(--color-source-live)",
  warn: "var(--color-citrus, #E8A82C)",
  info: "var(--color-source-imported)",
  human: "var(--color-source-human)",
};

// Defaults: my best guess after looking at the base. Fine-tune in edit mode.
const DEFAULTS: Record<LayerId, LayerCfg> = {
  palmL:   { x: -2, y: 38, w: 22, h: 58 },
  palmR:   { x: 82, y: 18, w: 20, h: 50 },
  orange:  { x: 78, y: 40, w: 14, h: 32 },
  bougain: { x: 50, y: 22, w: 22, h: 14 },
  smoke:   { x: 78, y: -8, w: 8,  h: 22 },
};

const LAYER_LABELS: Record<LayerId, string> = {
  palmL:   "Palm, left",
  palmR:   "Palm, right",
  orange:  "Orange tree",
  bougain: "Bougainvillea",
  smoke:   "Chimney smoke",
};

const LAYER_IMG: Record<LayerId, string> = {
  palmL:   "/assets/canvas/layers/palm.png",
  palmR:   "/assets/canvas/layers/palm.png",
  orange:  "/assets/canvas/layers/orange-tree.png",
  bougain: "/assets/canvas/layers/bougainvillea-vine.png",
  smoke:   "/assets/canvas/layers/smoke.png",
};

const STORAGE_KEY = "canvas3.layers.v1";

export default function Canvas3Page() {
  const [layers, setLayers] = useState<Record<LayerId, LayerCfg>>(DEFAULTS);
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState<LayerId | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("edit") === "1") setEditing(true);
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setLayers({ ...DEFAULTS, ...parsed });
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(layers));
    } catch {}
  }, [layers]);

  useEffect(() => {
    if (!editing || !selected) return;
    function onKey(e: KeyboardEvent) {
      const step = e.shiftKey ? 0.5 : 2;
      let dW = 0, dH = 0;
      if (e.key === "ArrowRight") dW = step;
      else if (e.key === "ArrowLeft") dW = -step;
      else if (e.key === "ArrowUp") dH = -step;
      else if (e.key === "ArrowDown") dH = step;
      else return;
      e.preventDefault();
      setLayers((prev) => {
        if (!selected) return prev;
        const cur = prev[selected];
        return {
          ...prev,
          [selected]: {
            ...cur,
            w: Math.max(2, cur.w + dW),
            h: Math.max(2, cur.h + dH),
          },
        };
      });
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editing, selected]);

  function onStageClick(e: React.MouseEvent) {
    if (!editing || !selected || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    setLayers((prev) => {
      const cur = prev[selected];
      // place the center of the layer at the click point
      return {
        ...prev,
        [selected]: {
          ...cur,
          x: xPct - cur.w / 2,
          y: yPct - cur.h / 2,
        },
      };
    });
  }

  function copyJSON() {
    const out = JSON.stringify(layers, null, 2);
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(out);
    }
  }

  function reset() {
    setLayers(DEFAULTS);
    setSelected(null);
  }

  return (
    <div
      data-city="redlands"
      className="relative w-full overflow-auto h-[calc(100dvh-96px)] md:h-[calc(100dvh-72px)]"
      style={{
        backgroundColor: "var(--color-canvas-ground, #D4B896)",
        scrollBehavior: "smooth",
      }}
    >
      <div
        ref={stageRef}
        onClick={onStageClick}
        className="relative shrink-0"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          cursor: editing && selected ? "crosshair" : "default",
        }}
      >
        {/* z-10 — base layer, clean of any plants */}
        <div
          className="absolute inset-0 z-10 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: "url(/assets/canvas/layers/base-clean.png)",
            imageRendering: "pixelated",
          }}
          aria-hidden
        />

        {/* z-15 — pool water sparkles */}
        <PoolSparkles />

        {/* z-18 — chimney smoke */}
        <PlacedLayer
          id="smoke"
          cfg={layers.smoke}
          editing={editing}
          selected={selected === "smoke"}
          onSelect={() => setSelected("smoke")}
          animation={editing ? "none" : "smokeRise 8s linear infinite"}
          imgSrc={LAYER_IMG.smoke}
          imgOpacity={0.85}
          imgPosition="bottom"
        />

        {/* z-20 — palm fronds, left */}
        <PlacedLayer
          id="palmL"
          cfg={layers.palmL}
          editing={editing}
          selected={selected === "palmL"}
          onSelect={() => setSelected("palmL")}
          animation={editing ? "none" : "palmSwayL 7s ease-in-out infinite"}
          transformOrigin="50% 95%"
          imgSrc={LAYER_IMG.palmL}
          imgPosition="bottom"
        />

        {/* z-20 — palm fronds, right (flipped) */}
        <PlacedLayer
          id="palmR"
          cfg={layers.palmR}
          editing={editing}
          selected={selected === "palmR"}
          onSelect={() => setSelected("palmR")}
          animation={editing ? "none" : "palmSwayR 8.5s ease-in-out infinite"}
          animationDelay="1.4s"
          transformOrigin="50% 95%"
          imgSrc={LAYER_IMG.palmR}
          imgPosition="bottom"
          imgScaleX={-1}
        />

        {/* z-22 — orange tree */}
        <PlacedLayer
          id="orange"
          cfg={layers.orange}
          editing={editing}
          selected={selected === "orange"}
          onSelect={() => setSelected("orange")}
          animation={editing ? "none" : "treeSway 6s ease-in-out infinite"}
          animationDelay="0.7s"
          transformOrigin="50% 95%"
          imgSrc={LAYER_IMG.orange}
          imgPosition="bottom"
          zIndex={22}
        >
          <span
            className="absolute"
            style={{
              left: "55%",
              top: "30%",
              width: 10,
              height: 10,
              borderRadius: 2,
              backgroundColor: "#E8761A",
              animation: editing ? "none" : "fruitDrop 22s ease-in 8s infinite",
              opacity: 0,
            }}
            aria-hidden
          />
        </PlacedLayer>

        {/* z-21 — bougainvillea vine */}
        <PlacedLayer
          id="bougain"
          cfg={layers.bougain}
          editing={editing}
          selected={selected === "bougain"}
          onSelect={() => setSelected("bougain")}
          animation={editing ? "none" : "bougainSway 9s ease-in-out infinite"}
          transformOrigin="50% 100%"
          imgSrc={LAYER_IMG.bougain}
          imgPosition="top"
          zIndex={21}
        />

        {/* z-23 — bougainvillea petals */}
        {!editing && <PetalField left={layers.bougain.x} width={layers.bougain.w} top={layers.bougain.y + layers.bougain.h} />}

        {/* z-25 — Redlands watermark */}
        <div
          className="absolute z-[25] pointer-events-none select-none animate-pixelFloat"
          style={{ top: 80, left: 96 }}
          aria-hidden
        >
          <div
            className="font-pixel text-[44px] sm:text-[64px] leading-none uppercase"
            style={{
              color: "var(--color-mountain-shadow, #5C5546)",
              textShadow: "4px 4px 0 rgba(255, 240, 200, 0.4)",
            }}
          >
            Redlands
          </div>
          <div
            className="font-pixel text-[10px] sm:text-[12px] mt-3 tracking-[0.3em]"
            style={{ color: "var(--color-mountain-shadow, #5C5546)", opacity: 0.7 }}
          >
            CA · 92373 · GOLDEN HOUR
          </div>
        </div>

        {/* z-30 — hot-spot orbs (disabled in edit mode so they don't intercept clicks) */}
        {!editing && HOTSPOTS.map((spot) => <HotspotOrb key={spot.id} spot={spot} />)}
      </div>

      {/* Header chrome */}
      <div className="pointer-events-none fixed top-4 right-4 z-40 flex flex-col items-end gap-2">
        <span
          className="rounded-full backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1.5"
          style={{ backgroundColor: "var(--color-mountain-shadow, #5C5546)" }}
        >
          {editing ? "Canvas 3 · placement mode" : "Canvas 3 · the breathing world"}
        </span>
        <button
          type="button"
          onClick={() => setEditing((e) => !e)}
          className="rounded-full bg-white/85 backdrop-blur-sm text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1.5 pointer-events-auto cursor-pointer"
          style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
        >
          {editing ? "Done placing →" : "Place layers ⊕"}
        </button>
        {!editing && (
          <Link
            href="/canvas"
            className="rounded-full bg-white/85 backdrop-blur-sm text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1.5 pointer-events-auto"
            style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
          >
            ← original canvas
          </Link>
        )}
      </div>

      {/* Placement panel */}
      {editing && (
        <div
          className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-[360px] z-40 rounded-2xl border-[3px] p-4 shadow-[6px_6px_0_0_rgba(59,52,42,0.35)]"
          style={{
            backgroundColor: "var(--color-data-cream, #F1E6D3)",
            borderColor: "var(--color-mountain-shadow, #5C5546)",
          }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between">
              <span
                className="font-pixel text-[10px] uppercase tracking-[0.18em]"
                style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
              >
                Placement panel
              </span>
              <span
                className="text-[10px] font-bold uppercase tracking-[0.08em]"
                style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
              >
                Click stage to place, arrows resize
              </span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {(Object.keys(layers) as LayerId[]).map((id) => {
                const cfg = layers[id];
                const isSel = selected === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelected(isSel ? null : id)}
                    className="flex items-center justify-between gap-2 rounded-md border-2 px-3 py-2 text-left transition-transform"
                    style={{
                      backgroundColor: isSel ? "var(--color-mountain-shadow, #5C5546)" : "transparent",
                      borderColor: "var(--color-mountain-shadow, #5C5546)",
                      color: isSel ? "white" : "var(--color-data-ink, #3B342A)",
                    }}
                  >
                    <span className="text-[12px] font-bold">{LAYER_LABELS[id]}</span>
                    <span
                      className="font-pixel text-[9px] tracking-[0.06em]"
                      style={{ opacity: 0.75 }}
                    >
                      x{cfg.x.toFixed(1)} y{cfg.y.toFixed(1)} {cfg.w.toFixed(0)}×{cfg.h.toFixed(0)}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyJSON}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em]"
                style={{
                  backgroundColor: "var(--color-terracotta, #C75240)",
                  color: "white",
                }}
              >
                Copy JSON
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center rounded-md px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] border-2"
                style={{
                  borderColor: "var(--color-mountain-shadow, #5C5546)",
                  color: "var(--color-data-ink, #3B342A)",
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PlacedLayer({
  id,
  cfg,
  editing,
  selected,
  onSelect,
  animation,
  animationDelay,
  transformOrigin,
  imgSrc,
  imgOpacity,
  imgPosition,
  imgScaleX,
  zIndex,
  children,
}: {
  id: LayerId;
  cfg: LayerCfg;
  editing: boolean;
  selected: boolean;
  onSelect: () => void;
  animation: string;
  animationDelay?: string;
  transformOrigin?: string;
  imgSrc: string;
  imgOpacity?: number;
  imgPosition?: "top" | "bottom" | "center";
  imgScaleX?: number;
  zIndex?: number;
  children?: React.ReactNode;
}) {
  const bgPos = imgPosition === "top" ? "top" : imgPosition === "center" ? "center" : "bottom";
  return (
    <div
      className="absolute"
      style={{
        left: `${cfg.x}%`,
        top: `${cfg.y}%`,
        width: `${cfg.w}%`,
        height: `${cfg.h}%`,
        zIndex: zIndex || 20,
        animation,
        animationDelay,
        transformOrigin,
        outline: editing ? (selected ? "3px dashed #C75240" : "1px dashed rgba(60,40,30,0.5)") : "none",
        boxShadow: selected ? "0 0 0 3px rgba(199,82,64,0.3)" : "none",
        cursor: editing ? "pointer" : "default",
      }}
      onClick={(e) => {
        if (editing) {
          e.stopPropagation();
          onSelect();
        }
      }}
      aria-hidden
    >
      <div
        className="h-full w-full bg-no-repeat bg-contain pointer-events-none"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundPosition: bgPos,
          imageRendering: "pixelated",
          opacity: imgOpacity ?? 1,
          transform: imgScaleX ? `scaleX(${imgScaleX})` : undefined,
        }}
      />
      {children}
      {editing && (
        <span
          className="absolute -top-7 left-0 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-[0.08em] pointer-events-none"
          style={{
            backgroundColor: selected ? "var(--color-terracotta, #C75240)" : "var(--color-mountain-shadow, #5C5546)",
            color: "white",
          }}
        >
          {LAYER_LABELS[id]}
        </span>
      )}
    </div>
  );
}

function PoolSparkles() {
  // Pool zone approx x: 35-78%, y: 56-86% (centered on the visible pool).
  const sparkles = [
    { x: 40, y: 64, delay: 0.0, dur: 3.6 },
    { x: 45, y: 70, delay: 1.4, dur: 4.2 },
    { x: 50, y: 60, delay: 0.7, dur: 3.0 },
    { x: 55, y: 72, delay: 2.1, dur: 4.5 },
    { x: 60, y: 67, delay: 1.0, dur: 3.4 },
    { x: 65, y: 75, delay: 2.8, dur: 4.0 },
    { x: 48, y: 78, delay: 0.4, dur: 3.8 },
    { x: 53, y: 63, delay: 1.7, dur: 3.2 },
    { x: 42, y: 73, delay: 2.4, dur: 4.4 },
    { x: 62, y: 62, delay: 0.9, dur: 3.7 },
    { x: 58, y: 67, delay: 1.6, dur: 4.1 },
    { x: 46, y: 75, delay: 2.3, dur: 3.5 },
  ];
  return (
    <div className="absolute inset-0 z-[15] pointer-events-none" aria-hidden>
      {sparkles.map((s, i) => (
        <span
          key={i}
          className="absolute block"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: 6,
            height: 6,
            backgroundColor: "white",
            opacity: 0,
            boxShadow: "0 0 6px rgba(255,255,255,0.85)",
            animation: `sparkleTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function PetalField({ left, width, top }: { left: number; width: number; top: number }) {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    left: left + (i * (width / 12)),
    delay: (i * 1.7) % 18,
    duration: 14 + ((i * 1.3) % 8),
    color: i % 3 === 0 ? "#C75240" : i % 3 === 1 ? "#D4248A" : "#E8528A",
  }));

  return (
    <div className="absolute inset-0 z-[23] pointer-events-none overflow-hidden" aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: `${top}%`,
            width: 6,
            height: 4,
            backgroundColor: p.color,
            animation: `petalDrift ${p.duration}s linear ${p.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

function HotspotOrb({ spot }: { spot: Hotspot }) {
  const color = STATUS_COLOR[spot.status];
  return (
    <Link
      href={spot.href}
      aria-label={spot.label}
      className="group absolute z-30"
      style={{
        left: `${spot.x}%`,
        top: `${spot.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative grid place-items-center w-[36px] h-[36px] sm:w-[44px] sm:h-[44px]">
        <span
          className="absolute inset-0 rounded-full animate-orbPulse"
          style={{ color }}
          aria-hidden
        />
        <span
          className="relative grid place-items-center rounded-full border-[3px] border-white w-[26px] h-[26px] sm:w-[32px] sm:h-[32px] shadow-[0_3px_8px_rgba(0,0,0,0.35)] group-hover:scale-110 transition-transform"
          style={{ backgroundColor: color }}
          aria-hidden
        >
          <span className="h-[6px] w-[6px] sm:h-[8px] sm:w-[8px] rounded-full bg-white/85" />
        </span>
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
        aria-hidden
      >
        <div
          className="rounded-xl border backdrop-blur-sm px-3 py-2 text-white shadow-[0_6px_16px_rgba(0,0,0,0.35)]"
          style={{
            backgroundColor: "var(--color-mountain-shadow, #5C5546)",
            borderColor: "rgba(255,255,255,0.15)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="h-[8px] w-[8px] rounded-full shrink-0"
              style={{ backgroundColor: color }}
              aria-hidden
            />
            <span className="text-[12px] font-extrabold tracking-[-0.005em]">{spot.label}</span>
          </div>
          <span className="block font-pixel text-[8px] tracking-[0.12em] mt-1 opacity-80">{spot.detail}</span>
        </div>
      </div>
    </Link>
  );
}
