"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Download, Wand2, Loader2, AlertCircle, ChevronRight, Image as ImageIcon } from "lucide-react";

type Result = { dataUrl: string; size: number; prompt: string; ts: number };

const SAMPLE_PROMPTS = [
  "a friendly pool service technician in a navy work shirt and tan baseball cap, side view, ready for a walk cycle",
  "a smiling latina pool builder in tan canvas pants and a blue hard hat",
  "a coastal californian backyard pool sprite, top-down view",
  "a chunky pixel-art rubber duck floating, side view",
  "an isolated palm tree with crown of fronds, transparent background",
  "a small pixel-art lemon tree with bright yellow fruit",
  "a navy blue pentair intelliflo pump sprite, 3/4 view",
  "a 16-bit san gorgonio mountain silhouette",
];

export default function LabPage() {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState(96);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function generate() {
    if (!prompt.trim() || busy) return;
    setBusy(true);
    setError(null);
    setSaveMsg(null);
    try {
      const res = await fetch("/api/lab/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), size }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setResults((prev) => [
        { dataUrl: data.dataUrl, size, prompt: prompt.trim(), ts: Date.now() },
        ...prev.slice(0, 19),
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "unknown error");
    } finally {
      setBusy(false);
    }
  }

  async function save(r: Result) {
    const defaultName = r.prompt.toLowerCase().split(/\s+/).slice(0, 4).join("-").replace(/[^a-z0-9-]/g, "");
    const name = window.prompt("Name this sprite (lowercase, no spaces)", defaultName) || "";
    if (!name) return;
    setSaveMsg(null);
    try {
      const res = await fetch("/api/lab/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataUrl: r.dataUrl, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setSaveMsg(`Saved to ${data.path}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "save failed");
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      generate();
    }
  }

  return (
    <div
      data-city="redlands"
      className="min-h-[calc(100dvh-96px)] md:min-h-[calc(100dvh-72px)]"
      style={{ backgroundColor: "var(--color-canvas-ground, #D4B896)" }}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-10 pt-6 pb-32 md:pb-16 flex flex-col gap-8">
        <Link
          href="/canvas"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] w-fit hover:translate-x-[-2px] transition-transform"
          style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
        >
          <ChevronRight size={14} strokeWidth={2.5} className="rotate-180" />
          back to the canvas
        </Link>

        <header className="flex flex-col gap-3">
          <span
            className="font-pixel text-[10px] sm:text-[11px] uppercase tracking-[0.2em]"
            style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
          >
            Sprite Lab · PixelLab playground
          </span>
          <h1
            className="text-[44px] sm:text-[64px] leading-[0.95] font-extrabold tracking-[-0.03em]"
            style={{ color: "var(--color-data-ink, #3B342A)" }}
          >
            Jam on sprites.
          </h1>
          <p
            className="text-[15px] sm:text-[17px] font-medium leading-snug max-w-[640px]"
            style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
          >
            Prompt a character, item, or scene element. PixelLab generates it as real pixel art.
            Save the keepers into the project; they land in <code className="font-mono">public/assets/canvas/sprites/</code> and
            we wire them into the canvas from there.
          </p>
          <div className="pixel-bar mt-3" aria-hidden />
        </header>

        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-pixel text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
            >
              Prompt
            </span>
            <span
              className="font-pixel text-[9px] tracking-[0.08em]"
              style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
            >
              ⌘↵ to generate
            </span>
          </div>
          <textarea
            ref={inputRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={onKey}
            placeholder="A friendly pool service tech in a navy work shirt, side view, ready for a walk cycle"
            rows={3}
            className="rounded-2xl border-[3px] p-4 text-[15px] font-medium resize-y bg-white focus:outline-none"
            style={{
              borderColor: "var(--color-mountain-shadow, #5C5546)",
              color: "var(--color-data-ink, #3B342A)",
            }}
          />

          <div className="flex flex-wrap items-center gap-3">
            <div
              className="inline-flex items-center gap-2 rounded-full border-2 px-3 py-1.5"
              style={{
                borderColor: "var(--color-mountain-shadow, #5C5546)",
                backgroundColor: "var(--color-data-cream, #F1E6D3)",
              }}
            >
              <span
                className="font-pixel text-[10px] uppercase tracking-[0.12em]"
                style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
              >
                Size
              </span>
              {[64, 96, 128, 200].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className="rounded-md px-2 py-0.5 text-[12px] font-bold transition-colors"
                  style={{
                    backgroundColor: size === s ? "var(--color-mountain-shadow, #5C5546)" : "transparent",
                    color: size === s ? "white" : "var(--color-data-ink, #3B342A)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={generate}
              disabled={busy || !prompt.trim()}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[14px] font-bold tracking-[-0.005em] shadow-[3px_3px_0_0_rgba(59,52,42,0.45)] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_rgba(59,52,42,0.45)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "var(--color-terracotta, #C75240)",
                color: "white",
              }}
            >
              {busy ? <Loader2 size={16} strokeWidth={2.5} className="animate-spin" /> : <Wand2 size={16} strokeWidth={2.5} />}
              {busy ? "Generating..." : "Generate"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-1">
            {SAMPLE_PROMPTS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setPrompt(p);
                  inputRef.current?.focus();
                }}
                className="rounded-full border-2 px-3 py-1 text-[11px] font-semibold transition-colors"
                style={{
                  borderColor: "var(--color-card-border, #B89B6A)",
                  color: "var(--color-data-ink-mute, #6E6555)",
                  backgroundColor: "transparent",
                }}
              >
                {p.length > 60 ? p.slice(0, 58) + "…" : p}
              </button>
            ))}
          </div>
        </section>

        {error && (
          <div
            className="flex items-start gap-3 rounded-xl border-2 p-4"
            style={{
              backgroundColor: "#F4DCDF",
              borderColor: "#B8252D",
              color: "#3B342A",
            }}
          >
            <AlertCircle size={18} strokeWidth={2.5} className="shrink-0 mt-0.5" style={{ color: "#B8252D" }} />
            <div className="flex flex-col gap-1 text-[13px]">
              <span className="font-bold">Generation failed</span>
              <span>{error}</span>
              {error.includes("PIXELLAB_SECRET") && (
                <a
                  href="https://www.pixellab.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                >
                  Get an API token →
                </a>
              )}
            </div>
          </div>
        )}

        {saveMsg && (
          <div
            className="flex items-center gap-2 rounded-xl border-2 px-4 py-3 text-[13px] font-semibold"
            style={{
              backgroundColor: "#DCEDE0",
              borderColor: "var(--color-source-live)",
              color: "var(--color-data-ink, #3B342A)",
            }}
          >
            <Download size={14} strokeWidth={2.5} />
            {saveMsg}
          </div>
        )}

        {results.length > 0 && (
          <section className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between">
              <h2
                className="text-[22px] font-extrabold tracking-[-0.02em]"
                style={{ color: "var(--color-data-ink, #3B342A)" }}
              >
                Latest takes
              </h2>
              <span
                className="font-pixel text-[10px] tracking-[0.08em]"
                style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
              >
                {results.length} this session
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((r) => (
                <ResultCard key={r.ts} result={r} onSave={() => save(r)} onReuse={() => setPrompt(r.prompt)} />
              ))}
            </div>
          </section>
        )}

        {results.length === 0 && !busy && (
          <section
            className="rounded-2xl border-2 border-dashed p-12 flex flex-col items-center justify-center gap-3 text-center"
            style={{
              borderColor: "var(--color-mountain-shadow, #5C5546)",
              color: "var(--color-data-ink-mute, #6E6555)",
            }}
          >
            <div
              className="grid place-items-center h-14 w-14 rounded-xl"
              style={{
                backgroundColor: "var(--color-citrus, #E8A82C)",
                color: "var(--color-mountain-shadow, #5C5546)",
              }}
            >
              <Sparkles size={26} strokeWidth={2.4} />
            </div>
            <span
              className="font-pixel text-[10px] uppercase tracking-[0.18em] mt-1"
              style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
            >
              First sprite
            </span>
            <p className="text-[14px] max-w-[420px]">
              Type a prompt above. Try the sample chips if you want a starting point. ⌘↵ generates.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

function ResultCard({
  result,
  onSave,
  onReuse,
}: {
  result: Result;
  onSave: () => void;
  onReuse: () => void;
}) {
  return (
    <div
      className="group relative rounded-2xl border-2 overflow-hidden flex flex-col"
      style={{
        backgroundColor: "var(--color-data-cream, #F1E6D3)",
        borderColor: "var(--color-card-border, #B89B6A)",
      }}
    >
      <div
        className="aspect-square w-full bg-no-repeat bg-contain bg-center bg-white"
        style={{
          backgroundImage: `url(${result.dataUrl})`,
          imageRendering: "pixelated",
        }}
        aria-label={result.prompt}
      />
      <div className="p-3 flex flex-col gap-2 border-t-2" style={{ borderColor: "var(--color-card-border, #B89B6A)" }}>
        <p
          className="text-[11px] leading-snug font-medium line-clamp-2"
          style={{ color: "var(--color-data-ink, #3B342A)" }}
          title={result.prompt}
        >
          {result.prompt}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span
            className="font-pixel text-[9px] tracking-[0.08em]"
            style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
          >
            {result.size}px
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onReuse}
              className="rounded-md p-1.5 hover:bg-black/5 transition-colors"
              title="Reuse this prompt"
              style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
            >
              <ImageIcon size={14} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={onSave}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em]"
              style={{
                backgroundColor: "var(--color-mountain-shadow, #5C5546)",
                color: "white",
              }}
            >
              <Download size={12} strokeWidth={2.5} />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
