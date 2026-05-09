@AGENTS.md

# PoolGo (the consumer app)

> Handoff doc for Cursor / Claude Code / any agent picking this up. The Folks surface is built end-to-end. Care, Equipment, Routines, Inbox, and My Pool are next. The brand system is locked and machine-readable.

## Where we're at

- 2026-05-09: scaffold + `/folks` shipped end-to-end. DESIGN.md drives Tailwind tokens. 6-tab nav across all surfaces, but only `/folks` and `/` (landing index) are populated.
- Repo lives at [rkurani/poolgo-app](https://github.com/rkurani/poolgo-app), `main` branch, public.
- Mock-only data — no backend, no auth, no DB, no API routes yet.
- Static brand mocks (the design source of truth) live at [rkurani/poolgo-mocks](https://github.com/rkurani/poolgo-mocks) on the `brand-mocks` branch with GitHub Pages preview at https://rkurani.github.io/poolgo-mocks/.

## What we're building

PoolGo is the consumer app for pool owners. Six surfaces, all colored by the OEM equipment / store / service tech that produced each piece of data:

1. **My Pool** — daily landing. Today's chemistry verdict, equipment glance, "anything I should do?"
2. **Care** — every test, visit, photo, message. MyChart-for-pools, day-grouped timeline.
3. **Equipment** — every device by Space (Pad / In-pool / Cleaners / Connected). OEM-color cards.
4. **Routines** — Alexa-style automations, plus an AI builder ("Heat the pool to 84° on Friday afternoon if guests are coming").
5. **Folks** ✅ — find independent stores, service techs, builders, specialists nearby.
6. **Inbox** — unified messages from techs, stores, equipment, and the concierge. Each thread tinted by sender.

The wedge: this is a *homeowner's record*. Not a marketplace, not a forum. PoolGo charges nothing for placement. Stores and techs flow data into the homeowner's own timeline.

## M.O.

- **Stack**: Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 5 · Tailwind v4 (CSS-first `@theme`) · `lucide-react` icons · `next/font/google` for Inter Tight.
- **Style**: Tailwind utility classes. Use `cn()` from `@/lib/utils` for conditional classes. Inline `style={{}}` is OK for `var(--brand-accent)` cascades since Tailwind v4 doesn't have a clean way to express dynamic CSS variables.
- **Components**: per-surface folder under `src/components/{surface}/` for surface-specific UI; reusable primitives at `src/components/`. No external component library — we hand-roll to match DESIGN.md exactly. shadcn/ui dilutes the OEM-color cascade pattern.
- **Data**: typed mocks under `src/lib/data/{surface}.ts`. Types under `src/lib/types.ts`. No fetch, no SWR. Just `import { stores } from '@/lib/data/folks'`.
- **Routing**: App Router. Each surface is its own route folder under `src/app/{surface}/page.tsx`. Mark `"use client"` only when the page actually needs state (filter chips, toggles).
- **Icons**: `lucide-react` only. No emoji in product UI per DESIGN.md.
- **Naming**: kebab-case for files (`folks/page.tsx`, `folks-card.tsx`), PascalCase for components (`ProCard`, `StoreCard`), `data-` attributes for the OEM cascade (`data-brand="pentair"`, `data-src="ai"`).

### Conventions

- **Never set OEM colors directly in JSX.** Use `data-brand` and let `globals.css` cascade `--brand-accent` / `--brand-soft`. The whole point of the system is that the data origin colors the UI.
- **Stripe a card** with `style={{ boxShadow: 'inset 0 3px 0 var(--brand-accent)' }}` — not a `::before` pseudo. We tried both; inset shadow is the cleanest in Tailwind v4 and survives `overflow: hidden`.
- **Run numbers through tabular figures.** `font-feature-settings: "tnum"` is on at the body level; don't fight it.
- **Don't add shadows to body cards.** The 3px brand stripe + 1px line border is the elevation. See DESIGN.md "Don'ts."
- **Don't introduce a new color token in CSS.** Add it to DESIGN.md's YAML frontmatter, run `npm run design:tokens`, then use the generated Tailwind class.

### Priorities (in order)

1. Brand fidelity to the locked Pure direction.
2. Working interactivity — chips actually filter, toggles actually toggle, threads actually open.
3. Type safety end-to-end. Every Pro / Store / Specialist / Equipment is typed.
4. Performance. We're not chasing it — Next.js + Tailwind + static data is fast enough by default — but no big deps, no React-Bricks layers.

### Out of scope (for now)

- Backend. No API routes, no DB, no auth. Mock data fixtures only.
- Mobile. Desktop-first responsive (md / xl breakpoints), but not optimized for sub-720px.
- Real maps. The MapStrip is decorative pins on a tinted box — no Mapbox, no Google Maps yet.
- Real product photos beyond what's already in `public/assets/`. (Pentair JPG, Hayward PNG, Polaris PNG, Leslie's PNG, IntelliFlo3 product shot, pool hero, storefront.)
- Tests. Manual verification via `npm run dev` is the loop for now.

## Outcome

A clickable prototype Ravi can demo to the engineering team and to a few early pool-owner users. Six surfaces, all navigable, each demonstrating the OEM-color system and the source-legend (Live / Imported / Human / AI). Done means: from the home page you can click into Care, see a 30-day chart with brand-color source dots, click into Folks, filter to stores, click a store, see a stub detail page. That's the bar.

## DESIGN.md is the contract

`DESIGN.md` at the repo root is in [Google Labs's open DESIGN.md format](https://github.com/google-labs-code/design.md). YAML frontmatter at the top is the machine-readable token system. The 8 prose sections below explain the *why*.

```
DESIGN.md  →  scripts/build-tokens.mjs  →  src/app/design-tokens.css  →  Tailwind v4 @theme  →  utility classes (bg-pool, text-pentair, etc.)
```

**Editing the design system:**

1. Open `DESIGN.md`.
2. Edit a value in the YAML at the top, or add a new color / typography token.
3. Run `npm run design:tokens` (or just `npm run dev` — it runs first).
4. The new token is now available as a Tailwind class (e.g. `bg-newcolor`).
5. If you added a new OEM brand, also add a `[data-brand="newbrand"] { --brand-accent: var(--color-newbrand); --brand-soft: var(--color-newbrand-soft); }` line in `src/app/globals.css`.

**Validating against the spec:**

```bash
npm run design:lint   # runs @google/design.md lint DESIGN.md
```

Currently 0 errors. The 30 "unused token" warnings are expected — see the "Notes on token usage" section at the bottom of DESIGN.md for why (OEM tokens are CSS-applied via `data-brand`, not declared as YAML component variants).

## File layout

```
DESIGN.md                      # canonical design system (YAML + 8 prose sections)
scripts/
  build-tokens.mjs             # parses DESIGN.md → design-tokens.css
public/
  assets/                      # OEM logos + product photos (real files, not invented)
src/
  app/
    layout.tsx                 # root + TopNav, Inter Tight font, h-full body
    page.tsx                   # / — landing index linking to all 6 surfaces
    globals.css                # imports tokens, defines [data-brand] / [data-src] cascade
    design-tokens.css          # AUTO-GENERATED — do not edit
    folks/page.tsx             # /folks — interactive (built)
    care/page.tsx              # to build
    equipment/page.tsx         # to build
    routines/page.tsx          # to build
    inbox/page.tsx             # to build
  components/
    TopNav.tsx                 # 6-tab sticky nav
    PageHeader.tsx             # h1 + lede + 4-stat row
    Chip.tsx                   # filter chip
    AIBand.tsx                 # dark concierge band w/ cyan glow
    folks/                     # surface-specific components
      MapStrip.tsx
      FeaturedPro.tsx
      ProCard.tsx
      StoreCard.tsx
      SpecRow.tsx
  lib/
    types.ts                   # Pro, Store, Specialist, Brand, SourceKind types
    utils.ts                   # cn() class concatenator
    data/folks.ts              # mock fixture data
```

## Build order for remaining surfaces

The locked HTML mocks at `~/Projects/poolgo-brand/mocks/` (or https://rkurani.github.io/poolgo-mocks/) are the visual spec. Each TSX page is a port of the corresponding HTML.

Suggested order:

1. **Care** (`/care`) — easiest port after Folks. New types: `WaterTest`, `ServiceVisit`, `Photo`, `TimelineEntry`. New components: `LatestCard`, `Chart` (simple SVG line chart, no library), `TimelineRow`, `PhotoTile`. Filter chips by record type.
2. **Equipment** (`/equipment`) — grid by Space. New types: `Equipment`, `Space`. New components: `EqCard`, `SpaceBar`, `HubCard`. Most-OEM-color-heavy surface.
3. **Routines** (`/routines`) — Alexa-style. New types: `Routine`, `RoutineStep`, `LibrarySuggestion`. New components: `BuilderHero` (the dark cyan-glow card with the chat preview), `RoutineCard`, `LibraryCard`. Toggle state for active/paused.
4. **Inbox** (`/inbox`) — threaded. New types: `Thread`, `Sender`. New components: `ThreadRow`, `DayBar`, `ComposeBar`. Read/unread state.
5. **My Pool** (`/`) — replaces the landing index. The Command Center. Pool header card, today's chemistry, 30-day chart, equipment glance, routines glance. Reuses components from all four other surfaces.

Each new surface should:

- Add `data-brand` and `data-src` attributes on every card / row that has a clear data origin.
- Use the same `PageHeader`, `Chip`, `AIBand`, and `cn()` primitives.
- Add a typed mock-data file under `src/lib/data/{surface}.ts`.
- Pull values from Tailwind classes (`bg-surface`, `text-ink`, `border-line`, `text-source-live`, etc.) — never hex codes inline.

## Run / verify

```bash
npm install                  # one-time
npm run dev                  # http://localhost:3000 (port 3010 in launch.json)
npm run design:tokens        # regenerate design-tokens.css from DESIGN.md
npm run design:lint          # validate DESIGN.md against the official spec
npm run build                # production build
```

The `dev` and `build` scripts both run `design:tokens` first, so the tokens are always fresh.

### Verification protocol

There is no test suite. Verify manually:

1. `npm run dev` → open http://localhost:3000.
2. Click each tab — does each route render without errors?
3. On Folks: click each filter chip — does the visible content change correctly?
4. Inspect a card → does the brand stripe and meta-tag color match the `data-brand` attribute?
5. Check the browser console — should be clean.
6. Check WCAG contrast on `text-ink-mute` against `bg-background` — must hit AA 4.5:1.

## Pencil

Pencil.dev is installed globally as `pencil` under Node 22 (`/Users/ravikurani/.nvm/versions/node/v22.22.2/bin/pencil`). It needs auth before first use:

```bash
nvm use 22                   # required — Pencil's deps need Node 22+
pencil login                 # opens browser for OAuth
```

Once logged in, Pencil can read this repo's `DESIGN.md` and SKILL.md (when we add one) and design new components on canvas that emit code matching the system. The Cursor extension is the smoothest editor integration; install from the Cursor extensions tab.

**To pair Pencil with this repo:** point it at the project root. It auto-discovers DESIGN.md and uses it as the design system contract for any generated components.

## Recent shifts (rolling, last 3)

- 2026-05-09: scaffolded Next.js 16 + Tailwind v4, ported Folks surface end-to-end with interactive filtering, wired DESIGN.md → Tailwind via `scripts/build-tokens.mjs`, repo published at rkurani/poolgo-app.
- 2026-05-08: locked Pure brand direction across 6 HTML mocks (My Pool, Care, Equipment, Routines, Folks, Inbox) at rkurani/poolgo-mocks. DESIGN.md authored in Google Labs format, validator-clean.
- 2026-05-07: Pure direction emerged from Showroom → Pool Club → typography iterations. Locked: pure white surface, Inter Tight, OEM color inheritance per card via `data-brand`, 4-source legend (Live / Imported / Human / AI).

## History (compressed)

- 2026-05-05 → 05-08: brand exploration in `~/Projects/poolgo-brand/` — multiple directions (Field Notebook, Pool Club, Showroom dark, Iter 1/2/3) before landing on Pure. See [BRAND.md](https://github.com/rkurani/poolgo-mocks/blob/brand-mocks/BRAND.md) for prose-only brand voice and positioning that DESIGN.md doesn't cover.
- The eventual production target is `Poolify-us/poolgo` (private). This `rkurani/poolgo-app` repo is the prototype — once Ravi approves the surfaces, the implementation gets ported into the prod repo's Next.js app.
