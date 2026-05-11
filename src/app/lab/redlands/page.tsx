"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Download, Wand2, Loader2, RefreshCw, Check, ChevronLeft, Eye } from "lucide-react";
import { REDLANDS_LIBRARY, masterPrompt, variantPrompt, type LibraryEntry, type LibraryCategory } from "@/lib/lab/redlands-library";

type CardState = {
  status: "idle" | "generating" | "preview" | "saved" | "error";
  dataUrl?: string;
  savedPath?: string;
  savedAt?: number;
  error?: string;
};

const CATEGORY_LABELS: Record<LibraryCategory, string> = {
  character: "Characters",
  tree: "Trees",
  plant: "Plants",
  object: "Objects",
};

const CATEGORY_ORDER: LibraryCategory[] = ["character", "tree", "plant", "object"];

export default function RedlandsLibraryPage() {
  const [states, setStates] = useState<Record<string, CardState>>({});
  const [busyAll, setBusyAll] = useState(false);

  // On mount, check which sprites already exist on disk
  const checkExisting = useCallback(async () => {
    try {
      const res = await fetch("/api/lab/exists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: REDLANDS_LIBRARY.map((e) => e.id) }),
      });
      if (!res.ok) return;
      const data = await res.json();
      setStates((prev) => {
        const next = { ...prev };
        for (const [id, info] of Object.entries(data.result as Record<string, { exists: boolean; mtime?: number }>)) {
          if (info.exists && !next[id]) {
            next[id] = { status: "saved", savedPath: `/assets/canvas/sprites/${id}.png`, savedAt: info.mtime };
          }
        }
        return next;
      });
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    checkExisting();
  }, [checkExisting]);

  async function generateOne(entry: LibraryEntry) {
    // Variants need their master saved to disk first
    if (entry.kind === "variant" && entry.master) {
      const masterState = states[entry.master];
      if (masterState?.status !== "saved") {
        setStates((prev) => ({
          ...prev,
          [entry.id]: { status: "error", error: `Save the master "${entry.master}" first.` },
        }));
        return;
      }
    }

    setStates((prev) => ({ ...prev, [entry.id]: { status: "generating" } }));
    try {
      const payload =
        entry.kind === "variant" && entry.master
          ? {
              prompt: variantPrompt(entry),
              size: entry.size,
              mode: "bitforge" as const,
              styleFileId: entry.master,
              styleStrength: 70,
            }
          : {
              prompt: masterPrompt(entry),
              size: entry.size,
              mode: "pixflux" as const,
            };

      const res = await fetch("/api/lab/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setStates((prev) => ({ ...prev, [entry.id]: { status: "preview", dataUrl: data.dataUrl } }));
    } catch (e) {
      setStates((prev) => ({
        ...prev,
        [entry.id]: { status: "error", error: e instanceof Error ? e.message : "unknown" },
      }));
    }
  }

  async function saveOne(entry: LibraryEntry) {
    const cur = states[entry.id];
    if (!cur?.dataUrl) return;
    try {
      const res = await fetch("/api/lab/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataUrl: cur.dataUrl, name: entry.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setStates((prev) => ({
        ...prev,
        [entry.id]: { status: "saved", savedPath: `${data.path}?t=${Date.now()}`, savedAt: Date.now() },
      }));
    } catch (e) {
      setStates((prev) => ({
        ...prev,
        [entry.id]: { ...prev[entry.id], status: "error", error: e instanceof Error ? e.message : "save failed" },
      }));
    }
  }

  async function generateAllPending() {
    setBusyAll(true);
    for (const entry of REDLANDS_LIBRARY) {
      const cur = states[entry.id];
      if (cur?.status === "saved" || cur?.status === "preview") continue;
      await generateOne(entry);
    }
    setBusyAll(false);
  }

  const grouped = CATEGORY_ORDER.map((cat) => ({
    cat,
    entries: REDLANDS_LIBRARY.filter((e) => e.category === cat),
  })).filter((g) => g.entries.length > 0);

  const savedCount = Object.values(states).filter((s) => s.status === "saved").length;

  return (
    <div
      data-city="redlands"
      className="min-h-[calc(100dvh-96px)] md:min-h-[calc(100dvh-72px)]"
      style={{ backgroundColor: "var(--color-canvas-ground, #D4B896)" }}
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10 pt-6 pb-32 md:pb-16 flex flex-col gap-8">
        <Link
          href="/lab"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] w-fit hover:translate-x-[-2px] transition-transform"
          style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
        >
          <ChevronLeft size={14} strokeWidth={2.5} />
          back to lab
        </Link>

        <header className="flex flex-col gap-3">
          <span
            className="font-pixel text-[10px] sm:text-[11px] uppercase tracking-[0.2em]"
            style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
          >
            Redlands library · {savedCount} of {REDLANDS_LIBRARY.length} saved
          </span>
          <h1
            className="text-[44px] sm:text-[64px] leading-[0.95] font-extrabold tracking-[-0.03em]"
            style={{ color: "var(--color-data-ink, #3B342A)" }}
          >
            Sprite checklist.
          </h1>
          <p
            className="text-[15px] sm:text-[17px] font-medium leading-snug max-w-[720px]"
            style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
          >
            The curated Redlands sprite set. Each card has its prompt locked to the same tone (16-bit pixel
            art, Stardew/Eastward register, Redlands palette). Generate, look at the result, save the keepers
            (canonical filename auto-applied), or regenerate. Once saved, the canvas can pick them up.
          </p>
          <div className="pixel-bar mt-3" aria-hidden />
        </header>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={generateAllPending}
              disabled={busyAll}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-bold tracking-[-0.005em] shadow-[3px_3px_0_0_rgba(59,52,42,0.45)] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_rgba(59,52,42,0.45)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "var(--color-terracotta, #C75240)",
                color: "white",
              }}
            >
              {busyAll ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} strokeWidth={2.5} />}
              {busyAll ? "Generating all..." : "Generate all pending"}
            </button>
            <span
              className="font-pixel text-[10px] tracking-[0.08em]"
              style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
            >
              {busyAll ? "Sequential, free tier ok" : "Sequential, ~1 min per asset"}
            </span>
          </div>
          <span
            className="font-pixel text-[9px] tracking-[0.08em]"
            style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
          >
            Saved files land in /public/assets/canvas/sprites/
          </span>
        </div>

        {grouped.map(({ cat, entries }) => (
          <section key={cat} className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between">
              <h2
                className="text-[22px] font-extrabold tracking-[-0.02em]"
                style={{ color: "var(--color-data-ink, #3B342A)" }}
              >
                {CATEGORY_LABELS[cat]}
              </h2>
              <span
                className="font-pixel text-[10px] tracking-[0.08em]"
                style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
              >
                {entries.filter((e) => states[e.id]?.status === "saved").length} of {entries.length}
              </span>
            </div>
            <div className="pixel-bar-thin" aria-hidden />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {entries.map((entry) => (
                <SpriteCard
                  key={entry.id}
                  entry={entry}
                  state={states[entry.id] || { status: "idle" }}
                  masterReady={entry.kind === "variant" && entry.master
                    ? states[entry.master]?.status === "saved"
                    : true
                  }
                  onGenerate={() => generateOne(entry)}
                  onSave={() => saveOne(entry)}
                  onRegenerate={() => generateOne(entry)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function SpriteCard({
  entry,
  state,
  masterReady,
  onGenerate,
  onSave,
  onRegenerate,
}: {
  entry: LibraryEntry;
  state: CardState;
  masterReady: boolean;
  onGenerate: () => void;
  onSave: () => void;
  onRegenerate: () => void;
}) {
  const blocked = entry.kind === "variant" && !masterReady;
  return (
    <div
      className="relative rounded-2xl border-2 p-4 flex flex-col gap-3 overflow-hidden"
      style={{
        backgroundColor: "var(--color-data-cream, #F1E6D3)",
        borderColor: state.status === "saved" ? "var(--color-source-live)" : "var(--color-card-border, #B89B6A)",
        opacity: blocked ? 0.6 : 1,
      }}
    >
      <span
        className="absolute top-0 left-0 right-0 h-[5px]"
        style={{
          backgroundColor:
            state.status === "saved"
              ? "var(--color-source-live)"
              : state.status === "preview"
              ? "var(--color-citrus, #E8A82C)"
              : state.status === "error"
              ? "#B8252D"
              : "var(--color-mountain-shadow, #5C5546)",
        }}
        aria-hidden
      />

      <div className="flex items-start justify-between gap-2 mt-1">
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className="font-pixel text-[9px] uppercase tracking-[0.18em]"
              style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
            >
              {entry.id}
            </span>
            {entry.kind === "master" ? (
              <span
                className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em]"
                style={{ backgroundColor: "var(--color-citrus, #E8A82C)", color: "var(--color-mountain-shadow, #5C5546)" }}
                title="Master sprite, generated from text"
              >
                Master
              </span>
            ) : (
              <span
                className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em]"
                style={{ backgroundColor: "var(--color-pentair, #1A4F8B)", color: "white" }}
                title={`Variant of ${entry.master}, generated via Bitforge using the master as reference`}
              >
                Variant
              </span>
            )}
          </div>
          <span
            className="text-[15px] font-extrabold tracking-[-0.005em] leading-tight"
            style={{ color: "var(--color-data-ink, #3B342A)" }}
          >
            {entry.name}
          </span>
          {entry.kind === "variant" && entry.master && (
            <span
              className="text-[10px] font-semibold"
              style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
            >
              from {entry.master}
            </span>
          )}
        </div>
        {state.status === "saved" && (
          <div
            className="grid place-items-center h-7 w-7 rounded-full shrink-0"
            style={{ backgroundColor: "var(--color-source-live)", color: "white" }}
            aria-label="Saved"
          >
            <Check size={14} strokeWidth={3} />
          </div>
        )}
      </div>

      <div
        className="aspect-square w-full rounded-lg border bg-white grid place-items-center overflow-hidden relative"
        style={{ borderColor: "var(--color-mountain-shadow, #5C5546)" }}
      >
        {state.status === "generating" && (
          <div className="flex flex-col items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em]"
               style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
            <Loader2 size={22} strokeWidth={2.5} className="animate-spin" />
            generating
          </div>
        )}
        {state.status === "idle" && (
          <div className="flex flex-col items-center gap-2"
               style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
            <Sparkles size={22} strokeWidth={2.4} />
            <span className="text-[11px] font-bold uppercase tracking-[0.08em]">empty slot</span>
          </div>
        )}
        {state.status === "preview" && state.dataUrl && (
          <Image
            src={state.dataUrl}
            alt={entry.name}
            fill
            sizes="320px"
            className="object-contain"
            style={{ imageRendering: "pixelated" }}
            unoptimized
          />
        )}
        {state.status === "saved" && state.savedPath && (
          <Image
            src={state.savedPath}
            alt={entry.name}
            fill
            sizes="320px"
            className="object-contain"
            style={{ imageRendering: "pixelated" }}
            unoptimized
          />
        )}
        {state.status === "error" && (
          <div className="flex flex-col items-center gap-2 px-3 text-center"
               style={{ color: "#B8252D" }}>
            <span className="text-[11px] font-bold uppercase tracking-[0.08em]">error</span>
            <span className="text-[10px] font-medium leading-tight">{state.error}</span>
          </div>
        )}
      </div>

      <p
        className="text-[11px] leading-snug"
        style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
      >
        {entry.intendedUse}
      </p>

      <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t-2"
           style={{ borderColor: "var(--color-card-border, #B89B6A)" }}>
        <span
          className="font-pixel text-[9px] tracking-[0.08em]"
          style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
        >
          {entry.size}px · {entry.category}
        </span>
        <div className="flex items-center gap-1.5">
          {state.status === "idle" && (
            <button
              type="button"
              onClick={onGenerate}
              disabled={blocked}
              className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "var(--color-mountain-shadow, #5C5546)", color: "white" }}
              title={blocked ? `Save the master "${entry.master}" first` : ""}
            >
              <Wand2 size={12} strokeWidth={2.5} />
              {blocked ? "Master first" : "Generate"}
            </button>
          )}
          {state.status === "preview" && (
            <>
              <button
                type="button"
                onClick={onRegenerate}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] border-2"
                style={{ borderColor: "var(--color-mountain-shadow, #5C5546)", color: "var(--color-data-ink, #3B342A)" }}
              >
                <RefreshCw size={12} strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={onSave}
                className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em]"
                style={{ backgroundColor: "var(--color-terracotta, #C75240)", color: "white" }}
              >
                <Download size={12} strokeWidth={2.5} />
                Save
              </button>
            </>
          )}
          {state.status === "saved" && (
            <>
              <button
                type="button"
                onClick={onRegenerate}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] border-2"
                style={{ borderColor: "var(--color-mountain-shadow, #5C5546)", color: "var(--color-data-ink, #3B342A)" }}
                title="Regenerate"
              >
                <RefreshCw size={12} strokeWidth={2.5} />
              </button>
              <a
                href={state.savedPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] border-2"
                style={{ borderColor: "var(--color-mountain-shadow, #5C5546)", color: "var(--color-data-ink, #3B342A)" }}
                title="Open file"
              >
                <Eye size={12} strokeWidth={2.5} />
              </a>
            </>
          )}
          {state.status === "error" && (
            <button
              type="button"
              onClick={onGenerate}
              className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em]"
              style={{ backgroundColor: "#B8252D", color: "white" }}
            >
              <RefreshCw size={12} strokeWidth={2.5} />
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
