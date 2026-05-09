# PoolGo

The consumer app. Next.js 16 + Tailwind v4 + TypeScript prototype implementing the six surfaces of the Pure brand: **My Pool, Care, Equipment, Routines, Folks, Inbox**.

The static brand mocks live at [rkurani/poolgo-mocks](https://github.com/rkurani/poolgo-mocks). This repo is the workable prototype of those screens.

## Quickstart

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

The `dev` script runs `npm run design:tokens` first, which regenerates `src/app/design-tokens.css` from `DESIGN.md`. So Tailwind classes always reflect the canonical token values.

## What's built so far

- ✅ **Folks** (`/folks`) — find independent stores, service techs, builders, and specialists nearby. Filter chips wired (All / Service techs / Pool stores / Builders / Equipment repair / Plaster). Sort by nearest. Each card carries the OEM brand color via `data-brand`.
- ✅ **Home** (`/`) — landing index linking to all surfaces.
- ⏳ **Care, Equipment, Routines, Inbox** — to be built.
- ⏳ **My Pool** — the homeowner's command center, will replace `/`.

## DESIGN.md as source of truth

The Pure brand system is captured in [DESIGN.md](DESIGN.md), in the [Google Labs DESIGN.md format](https://github.com/google-labs-code/design.md). The YAML frontmatter at the top of that file is parsed by `scripts/build-tokens.mjs` into `src/app/design-tokens.css`, which Tailwind v4 reads via `@theme`. That means:

- **Want to change a color?** Edit `DESIGN.md`. Run `npm run design:tokens`. Done. All Tailwind classes (`bg-pool`, `text-pentair`, etc.) update.
- **Want an agent (Cursor, Claude Code, Stitch) to build a new component consistent with the system?** Point it at `DESIGN.md`. The 8 prose sections explain *why*; the YAML provides the values.

Validate the file against the official spec:

```bash
npm run design:lint
```

## OEM color inheritance

Every card with a clear data origin carries `data-brand` matching the source. CSS custom properties (`--brand-accent`, `--brand-soft`) cascade from `globals.css`:

```tsx
<div data-brand="pentair" className="rounded-2xl border border-line">
  {/* gets a Pentair-blue stripe and tinted accents automatically */}
</div>
```

See `src/app/globals.css` for the full mapping (Pentair, Hayward, Polaris, Jandy, Raypak, Leslie's, Sun Country, Marina, Pinch a Penny, plus per-business pro colors).

## File layout

```
src/
  app/
    layout.tsx               # root + TopNav
    page.tsx                 # / — landing index
    globals.css              # imports tokens, defines [data-brand] cascade
    design-tokens.css        # AUTO-GENERATED from DESIGN.md
    folks/page.tsx           # /folks — interactive filtering
  components/
    TopNav.tsx               # 6-tab nav
    PageHeader.tsx           # h1 + lede + 4-stat row
    Chip.tsx                 # filter chip
    AIBand.tsx               # dark concierge band w/ cyan glow
    folks/                   # surface-specific
      MapStrip.tsx
      FeaturedPro.tsx
      ProCard.tsx
      StoreCard.tsx
      SpecRow.tsx
  lib/
    types.ts                 # Pro, Store, Specialist, Brand, SourceKind
    utils.ts                 # cn() helper
    data/folks.ts            # mock fixture data
scripts/
  build-tokens.mjs           # parses DESIGN.md → design-tokens.css
DESIGN.md                    # canonical design system
```

## Tech

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4** (CSS-first `@theme` config)
- **lucide-react** for icons
- **Inter Tight** loaded via `next/font/google`

## Routes

- `/` — landing
- `/folks` — find stores + service pros (built)
- `/care` — water history + records (planned)
- `/equipment` — devices by Space (planned)
- `/routines` — automations + AI builder (planned)
- `/inbox` — unified messages (planned)
