"use client";

import Image from "next/image";
import { useState } from "react";

export function PumpHero() {
  const [stage, setStage] = useState<"A" | "B" | "C" | "D">("B");
  const stages: { id: "A" | "B" | "C" | "D"; rpm: string }[] = [
    { id: "A", rpm: "1,250" },
    { id: "B", rpm: "1,750" },
    { id: "C", rpm: "2,400" },
    { id: "D", rpm: "3,200" },
  ];
  const [on, setOn] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_580px] rounded-3xl overflow-hidden">
      {/* Left: pentair backdrop with treated photo */}
      <div
        className="relative h-[420px] lg:h-[540px] overflow-hidden"
        style={{ background: "var(--color-pentair)" }}
      >
        <span className="pointer-events-none absolute -left-8 bottom-12 text-[180px] sm:text-[220px] font-extrabold leading-none tracking-[-0.04em] text-white opacity-[0.07]">
          PENTAIR
        </span>
        <span className="absolute inset-0 m-auto h-[300px] w-[400px] rounded-full bg-white/15 blur-2xl" />
        <Image
          src="/assets/intelliflo3.png"
          alt="Pentair IntelliFlo3 VSF"
          width={400}
          height={400}
          className="absolute left-1/2 top-[40px] -translate-x-1/2 h-[280px] w-auto drop-shadow-[0_24px_40px_rgba(15,17,21,0.45)]"
          priority
        />
        <div className="absolute top-7 left-7 flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5">
          <span className="h-[7px] w-[7px] rounded-full bg-source-live" />
          <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-white">
            Focused · live 24/7
          </span>
        </div>
        <div className="absolute left-7 bottom-7 flex flex-col gap-2">
          <span className="text-[80px] sm:text-[108px] font-extrabold leading-none tracking-[-0.05em] text-white tabular-nums">
            1,750
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-white/70">
            RPM · Stage B · Steady 11 h 32 m
          </span>
        </div>
      </div>

      {/* Right: cream control surface */}
      <div className="flex flex-col justify-between gap-7 bg-cream p-7 sm:p-10">
        {/* Status row */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-pentair">
              Pentair IntelliFlo3 VSF
            </span>
            <span className="text-[15px] font-bold tracking-[-0.005em] text-ink">
              {on ? "Running · 5:30 AM → 11:30 AM" : "Off · paused for today"}
            </span>
          </div>
          <button
            onClick={() => setOn((v) => !v)}
            className="relative h-[34px] w-16 rounded-full transition-colors"
            style={{ background: on ? "var(--color-ink)" : "var(--color-surface-2)" }}
          >
            <span
              className="absolute top-1 h-[26px] w-[26px] rounded-full bg-white transition-all shadow-[0_1px_3px_rgba(15,17,21,0.15)]"
              style={{ left: on ? 32 : 4 }}
            />
          </button>
        </div>

        {/* Stage selector */}
        <div className="flex flex-col gap-3.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-ink-mute">
            Run stage
          </span>
          <div className="flex rounded-full bg-surface-2 p-1">
            {stages.map((s) => {
              const active = stage === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setStage(s.id)}
                  className={[
                    "flex-1 rounded-full py-2.5 text-[13px] tracking-[-0.005em] transition-colors",
                    active
                      ? "bg-ink text-white font-bold"
                      : "text-ink-mute font-medium hover:text-ink",
                  ].join(" ")}
                >
                  {s.id} · {s.rpm}
                </button>
              );
            })}
          </div>
        </div>

        {/* Slider */}
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-ink-mute">
              Manual override
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-ink tabular-nums">
              1,750 RPM · 380 W · 42 GPM
            </span>
          </div>
          <div className="relative h-8">
            <span className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 rounded-full bg-surface-2" />
            <span className="absolute top-1/2 left-0 -translate-y-1/2 h-1 w-[30%] rounded-full bg-ink" />
            <span className="absolute top-1/2 left-[28%] -translate-y-1/2 h-6 w-6 rounded-full bg-white shadow-[0_2px_6px_rgba(15,17,21,0.25)]" />
          </div>
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.04em] text-ink-faint">
            <span>1,000 RPM</span>
            <span>3,450 RPM</span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-full bg-ink px-4 py-2.5 text-[13px] font-bold text-white hover:bg-ink-soft transition-colors">
            Run 1 hour now
          </button>
          <button className="px-4 py-2.5 text-[13px] font-bold text-ink hover:text-ink-soft">
            Skip today
          </button>
          <button className="px-4 py-2.5 text-[13px] font-bold text-ink hover:text-ink-soft">
            Edit schedule
          </button>
        </div>
      </div>
    </div>
  );
}
