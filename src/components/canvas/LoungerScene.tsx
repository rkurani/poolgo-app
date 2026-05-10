"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/**
 * The lounger scene is the canvas's first "real interactive" character moment.
 *
 * Maya sits on the lounger by default. On a random interval (or when the user
 * clicks her), she stands up, walks across the deck to fetch a drink, pauses,
 * then walks back to her lounger and sits again. State machine drives the
 * sprite swap and the translateX position; CSS transitions handle the motion.
 *
 * Pixel-art sprites are hand-authored inline SVG so they're transparent at the
 * edges, share an anchor point, and stay sharp at any zoom level.
 */

type State = "sitting" | "standing" | "walking-out" | "fetching" | "walking-back" | "settling";

const STATE_DURATIONS: Record<State, [number, number]> = {
  sitting: [45000, 90000],        // sits for 45 to 90 sec
  standing: [800, 1400],          // brief "she stood up" beat
  "walking-out": [4500, 5500],    // walks across the deck
  fetching: [2500, 3500],         // pauses, sips, waves
  "walking-back": [4500, 5500],   // walks back
  settling: [800, 1200],          // tiny pause before she sits again
};

function randDuration(state: State): number {
  const [min, max] = STATE_DURATIONS[state];
  return min + Math.random() * (max - min);
}

function nextState(s: State): State {
  switch (s) {
    case "sitting": return "standing";
    case "standing": return "walking-out";
    case "walking-out": return "fetching";
    case "fetching": return "walking-back";
    case "walking-back": return "settling";
    case "settling": return "sitting";
  }
}

export function LoungerScene({ x, y }: { x: number; y: number }) {
  const [state, setState] = useState<State>("sitting");
  const [waving, setWaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback((s: State) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const dur = randDuration(s);
    timerRef.current = setTimeout(() => {
      const next = nextState(s);
      setState(next);
      advance(next);
    }, dur);
  }, []);

  useEffect(() => {
    advance("sitting");
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [advance]);

  const onClick = () => {
    if (state === "sitting") {
      setWaving(true);
      window.setTimeout(() => setWaving(false), 1500);
      if (timerRef.current) clearTimeout(timerRef.current);
      setState("standing");
      advance("standing");
    } else if (state === "walking-out" || state === "walking-back") {
      setWaving(true);
      window.setTimeout(() => setWaving(false), 1200);
    }
  };

  // translate offset by state
  const offset =
    state === "walking-out" ? 12
    : state === "fetching"   ? 14
    : state === "walking-back" ? 6
    : state === "settling"   ? 0
    : 0;

  const isOnLounger = state === "sitting" || state === "settling" || state === "standing";
  const isMoving = state === "walking-out" || state === "walking-back";
  const isFetching = state === "fetching";

  return (
    <div
      className="absolute z-[40] pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%) scale(2)",
        transformOrigin: "center",
      }}
    >
      {/* Empty lounger always present so the bg figure stays covered when Maya wanders */}
      <div className="relative">
        <EmptyLoungerSVG />

        {/* Maya — translates by state, swaps sprite. Whole wrapper is clickable
            so users have a generous target on top of the small pixel sprite. */}
        <button
          type="button"
          onClick={onClick}
          aria-label={
            isOnLounger ? "Maya on the lounger, click to wave"
            : "Maya, currently up. Click to greet."
          }
          className="absolute pointer-events-auto cursor-pointer"
          style={{
            // anchor her to the seat of the lounger, padded for a bigger hit area
            left: 12,
            top: -10,
            padding: 6,
            transform: `translateX(${offset * 8}px) scaleX(${state === "walking-back" ? -1 : 1})`,
            transition: "transform 4.5s cubic-bezier(0.6, 0.05, 0.4, 0.95)",
            background: "transparent",
            border: "none",
          }}
        >
          {isOnLounger ? <MayaSittingSVG /> : <MayaWalkingSVG bobbing={isMoving} fetching={isFetching} />}
        </button>

        {/* Wave bubble */}
        {waving && (
          <div
            className="absolute -top-8 left-2 pointer-events-none"
            style={{ animation: "pixelFloat 1.2s ease-in-out infinite" }}
          >
            <WaveBubbleSVG />
          </div>
        )}

        {/* Drink table glimmers at the fetch destination when she arrives */}
        {isFetching && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: 18 + 14 * 8 + 14,
              top: 0,
            }}
          >
            <DrinkGlassSVG />
          </div>
        )}
      </div>
    </div>
  );
}

// === SVG sprites ===

const INK = "#3B342A";
const SKIN = "#E8B989";
const HAIR = "#3B342A";
const HAT = "#E8A82C";
const SHIRT = "#C75240";
const SHORTS = "#1A4F8B";
const LOUNGE_LIGHT = "#A98654";
const LOUNGE_DARK = "#7A5C3F";
const LOUNGE_LEG = "#5C3F26";
const DRINK_GLASS = "#1FA0BF";
const DRINK_LIQUID = "#E8A82C";

function EmptyLoungerSVG() {
  return (
    <svg
      width="56"
      height="32"
      viewBox="0 0 56 32"
      shapeRendering="crispEdges"
      aria-hidden
    >
      {/* deck shadow */}
      <rect x="4" y="28" width="50" height="2" fill={INK} opacity="0.18" />
      {/* lounger seat slats */}
      <rect x="2" y="12" width="52" height="2" fill={LOUNGE_LIGHT} />
      <rect x="2" y="14" width="52" height="2" fill={LOUNGE_DARK} />
      <rect x="2" y="16" width="52" height="2" fill={LOUNGE_LIGHT} />
      <rect x="2" y="18" width="52" height="2" fill={LOUNGE_DARK} />
      {/* backrest at left */}
      <rect x="2" y="2" width="2" height="12" fill={LOUNGE_DARK} />
      <rect x="4" y="4" width="2" height="10" fill={LOUNGE_LIGHT} />
      <rect x="6" y="6" width="2" height="8" fill={LOUNGE_DARK} />
      {/* legs */}
      <rect x="6" y="20" width="2" height="6" fill={LOUNGE_LEG} />
      <rect x="48" y="20" width="2" height="6" fill={LOUNGE_LEG} />
    </svg>
  );
}

function MayaSittingSVG() {
  return (
    <svg
      width="24"
      height="22"
      viewBox="0 0 24 22"
      shapeRendering="crispEdges"
      aria-hidden
    >
      {/* sun hat brim */}
      <rect x="0" y="4" width="14" height="1" fill={HAT} />
      <rect x="1" y="3" width="12" height="1" fill={HAT} />
      {/* hat crown */}
      <rect x="3" y="0" width="8" height="3" fill={HAT} />
      <rect x="4" y="0" width="6" height="1" fill="#C68A1A" />
      {/* hair tucked back */}
      <rect x="3" y="5" width="2" height="3" fill={HAIR} />
      <rect x="9" y="5" width="2" height="3" fill={HAIR} />
      {/* face */}
      <rect x="4" y="5" width="6" height="4" fill={SKIN} />
      <rect x="5" y="6" width="1" height="1" fill={INK} />
      <rect x="8" y="6" width="1" height="1" fill={INK} />
      {/* smile */}
      <rect x="6" y="8" width="2" height="1" fill={INK} />
      {/* neck */}
      <rect x="6" y="9" width="2" height="1" fill={SKIN} />
      {/* beach shirt — reclined torso */}
      <rect x="2" y="10" width="8" height="4" fill={SHIRT} />
      <rect x="2" y="11" width="8" height="1" fill="#A03A2A" />
      <rect x="3" y="13" width="6" height="1" fill="#A03A2A" />
      {/* arm resting */}
      <rect x="10" y="11" width="3" height="2" fill={SHIRT} />
      <rect x="13" y="12" width="2" height="1" fill={SKIN} />
      {/* legs stretched out along the lounger */}
      <rect x="9" y="14" width="12" height="3" fill={SHORTS} />
      <rect x="9" y="15" width="12" height="1" fill="#15406F" />
      {/* feet */}
      <rect x="20" y="14" width="3" height="2" fill={SKIN} />
      <rect x="20" y="16" width="3" height="1" fill={INK} />
    </svg>
  );
}

function MayaWalkingSVG({ bobbing, fetching }: { bobbing: boolean; fetching: boolean }) {
  return (
    <div
      style={{
        animation: bobbing ? "pixelFloat 0.45s ease-in-out infinite" : undefined,
      }}
    >
      <svg
        width="14"
        height="24"
        viewBox="0 0 14 24"
        shapeRendering="crispEdges"
        aria-hidden
      >
        {/* hat brim */}
        <rect x="1" y="3" width="12" height="1" fill={HAT} />
        <rect x="2" y="2" width="10" height="1" fill={HAT} />
        {/* hat crown */}
        <rect x="4" y="0" width="6" height="2" fill={HAT} />
        {/* hair sides */}
        <rect x="3" y="4" width="1" height="3" fill={HAIR} />
        <rect x="10" y="4" width="1" height="3" fill={HAIR} />
        {/* face */}
        <rect x="4" y="4" width="6" height="4" fill={SKIN} />
        <rect x="5" y="5" width="1" height="1" fill={INK} />
        <rect x="8" y="5" width="1" height="1" fill={INK} />
        <rect x="6" y="7" width="2" height="1" fill={INK} />
        {/* neck */}
        <rect x="6" y="8" width="2" height="1" fill={SKIN} />
        {/* shirt */}
        <rect x="3" y="9" width="8" height="6" fill={SHIRT} />
        <rect x="3" y="11" width="8" height="1" fill="#A03A2A" />
        {/* arms — one out if fetching (holding a drink) */}
        {fetching ? (
          <>
            <rect x="1" y="10" width="2" height="4" fill={SHIRT} />
            <rect x="0" y="13" width="2" height="2" fill={SKIN} />
            <rect x="11" y="9" width="2" height="3" fill={SHIRT} />
            <rect x="11" y="8" width="2" height="2" fill={SKIN} />
          </>
        ) : (
          <>
            <rect x="1" y="10" width="2" height="5" fill={SHIRT} />
            <rect x="1" y="14" width="2" height="1" fill={SKIN} />
            <rect x="11" y="10" width="2" height="5" fill={SHIRT} />
            <rect x="11" y="14" width="2" height="1" fill={SKIN} />
          </>
        )}
        {/* shorts */}
        <rect x="3" y="15" width="8" height="4" fill={SHORTS} />
        <rect x="3" y="17" width="8" height="1" fill="#15406F" />
        {/* legs — split mid-stride */}
        <rect x="3" y="19" width="3" height="3" fill={SKIN} />
        <rect x="8" y="19" width="3" height="3" fill={SKIN} />
        {/* feet */}
        <rect x="2" y="22" width="4" height="1" fill={INK} />
        <rect x="8" y="22" width="4" height="1" fill={INK} />
      </svg>
    </div>
  );
}

function WaveBubbleSVG() {
  return (
    <svg
      width="30"
      height="20"
      viewBox="0 0 30 20"
      shapeRendering="crispEdges"
      aria-hidden
    >
      {/* bubble border */}
      <rect x="2" y="2" width="26" height="12" fill="#FFFFFF" />
      <rect x="2" y="2" width="26" height="1" fill={INK} />
      <rect x="2" y="13" width="26" height="1" fill={INK} />
      <rect x="2" y="2" width="1" height="12" fill={INK} />
      <rect x="27" y="2" width="1" height="12" fill={INK} />
      {/* tail */}
      <rect x="6" y="14" width="3" height="1" fill={INK} />
      <rect x="6" y="14" width="2" height="2" fill="#FFFFFF" />
      <rect x="7" y="15" width="2" height="1" fill={INK} />
      <rect x="7" y="15" width="1" height="2" fill="#FFFFFF" />
      <rect x="8" y="16" width="1" height="1" fill={INK} />
      {/* waving hand pixel */}
      <rect x="8" y="5" width="2" height="2" fill={SKIN} />
      <rect x="12" y="5" width="2" height="2" fill={SKIN} />
      <rect x="16" y="5" width="2" height="2" fill={SKIN} />
      <rect x="20" y="5" width="2" height="2" fill={SKIN} />
      <rect x="8" y="8" width="14" height="2" fill={SKIN} />
      <rect x="10" y="10" width="10" height="2" fill={SKIN} />
    </svg>
  );
}

function DrinkGlassSVG() {
  return (
    <svg
      width="14"
      height="22"
      viewBox="0 0 14 22"
      shapeRendering="crispEdges"
      aria-hidden
      style={{ animation: "pixelFloat 2.2s ease-in-out infinite" }}
    >
      {/* table surface */}
      <rect x="0" y="18" width="14" height="2" fill={LOUNGE_DARK} />
      <rect x="0" y="20" width="14" height="2" fill={LOUNGE_LEG} />
      {/* glass */}
      <rect x="4" y="6" width="6" height="1" fill={INK} />
      <rect x="3" y="7" width="8" height="1" fill={INK} />
      <rect x="3" y="8" width="8" height="9" fill={DRINK_GLASS} opacity="0.4" />
      <rect x="3" y="8" width="1" height="9" fill={INK} />
      <rect x="10" y="8" width="1" height="9" fill={INK} />
      <rect x="3" y="17" width="8" height="1" fill={INK} />
      {/* liquid */}
      <rect x="4" y="10" width="6" height="7" fill={DRINK_LIQUID} />
      <rect x="4" y="10" width="6" height="1" fill="#C68A1A" />
      {/* straw */}
      <rect x="8" y="3" width="1" height="6" fill={SHIRT} />
      <rect x="9" y="3" width="1" height="6" fill="#A03A2A" />
      {/* lemon wedge */}
      <rect x="5" y="9" width="2" height="2" fill="#F4C952" />
    </svg>
  );
}
