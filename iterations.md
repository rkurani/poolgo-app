# PoolGo · Design Iterations

Timeline of the visual direction. We log here so context survives across sessions, and so when we change the foundation (`DESIGN.md`) we record *why*.

`DESIGN.md` is the contract. This file is the lab notebook.

---

## Iteration 0 — Pure (the locked direction)

What's in `DESIGN.md` today:
- Pure white surface (`#FFFFFF` background, `#FAFAFA` surface, `#F5F5F4` surface-2)
- Inter Tight throughout
- OEM brand colors as first-class tokens, applied via `data-brand` (3px top stripe + tinted meta + brand chips)
- 4-source provenance legend (Live / Imported / Human / AI)
- **Mandate: "Borders, not shadows. All cards get `border: 1px solid {colors.line}`."** — this rule is what produced the AI/shadcn look in iteration 1.

Repo state when we started: `rkurani/poolgo-app` had `/folks` shipped end-to-end. Everything else was unbuilt.

---

## Iteration 1 — Stress-testing Pure on the Pencil canvas

Built on `poolgo.pen` (project root, Pencil-variables wired):

| Frame | Surface | What we tested |
|---|---|---|
| `GpTwD` | My Pool · v1 (Pure) | Pure direction at full page scale |
| `dZexM` | My Pool · OEM Wall | "Turn up the volume" — full-saturation OEM color blocks as page architecture |
| `AOllt` | Folks · Yelp wireframe | First Folks rev — restaurant-style discovery |
| `sKYEy` | Folks · Local cold start (state A) | After Ravi's note: pool service ≠ restaurant; cold start should lean *local*, not equipment-matched |
| `EHSFU` | Folks · Personalized (state B) | The transition target — pinned regulars + live inventory + equipment-filtered discovery |

### What worked
- The state A ↔ state B model is real. Cold start = local (geography is the only signal). Curated = personal (equipment + relationships). Onboarding is the design event that flips them.
- Inventory-row + tech-booking combined into one CTA ("Order + book Carlos Tue") was the strongest conceptual moment — Yelp/restaurant analogues can't do it.
- Pencil variable plumbing (DESIGN.md tokens → Pencil variables → `$ink`, `$pentair`, etc.) made iteration cheap.

### What broke
- **Stroked pill / stroked card / cool-gray surface = generic AI / v0 / shadcn / Tailwind look.** Visible on every chip, every store card, every filter, every logo tile, every state pill. Ravi flagged it directly: "this sort of border around the tabs seems very AI."
- The OEM cascade ran *three* signals on every card (3px stripe + brand-soft tint + brand chips). Too loud. One signal would do.
- OEM Wall pushed full-saturation color blocks across a whole page — directly contradicts the "calm" pillar. Useful as a stress test, not a direction.

---

## Brand references pulled (2026-05-09)

Ravi pointed at four sites. Two fetched cleanly, two synthesized from prior knowledge.

### Bella Kitchenware (`bellakitchenware.com`)
- Surface: warm oatmilk ~`#F5F1ED`
- Photography placed asymmetrically against solid backgrounds, no rigid containers
- Ghost-style buttons (no border, type weight does the work)
- 60–80px section padding
- Raw publication logos (no badges, no frames)
- Staggered hero text-image blocks, not symmetric grids
- "Fits Here" callouts overlaid on photography rather than chrome

### Glossier (`glossier.com`)
- Cream `#FFFBF7` paired with blush `#F4EFEB`
- Borderless containers entirely; depth comes from soft shadow OR just whitespace
- Abundant section padding, generous interior padding even on mobile
- Asymmetric image crops (mix of square and portrait)
- Subtle pastel color-blocking marks sections — *tonal shifts, not lines*
- CTAs use soft fills or text-only, never aggressive contrast
- No gradients
- Custom iconography matched to the rest of the system

### Shop App (`shop.app`) — synthesized
- Warm-white surface, ink near-black not pure black
- Square product photos with ~12–16px radius float on the surface with zero border or shadow — separation is whitespace alone
- Full-pill ink-fill CTAs, never outlined
- Cards = "photo + 2 lines of type"
- Hierarchy via type size + weight, not container chrome

### OpenSea (`opensea.io`) — synthesized (post-2023 redesign)
- Light surface, ink-black text, NFT imagery as the color
- Cards: photo + radius + subtle hover-shadow, no border
- Tabular numerics on price/floor/supply data — worth stealing for our chemistry numbers
- Hairlines used only as table-row separators, never as container outlines

---

## Cross-brand pattern (the synthesis)

The seven things all four references share that contradict the current `DESIGN.md`:

1. **Warm tone surface, not gray-white.** Cream/oatmilk/blush. Cool-gray surface (`#FAFAFA`) is the AI tell.
2. **Borderless containers as the default.** Edges are absent or rare — never on every container.
3. **Photography carries the color.** Chrome recedes; imagery is the visual character.
4. **Pure pills.** Solid fills or text-only. No outlined pills anywhere.
5. **Generous whitespace as the structural device.** 60–80px section gaps, not 56.
6. **Asymmetric layouts in hero/feature areas.** Uniform 3-up grids everywhere is part of the AI tell.
7. **Tabular numerics for data-heavy moments** (chemistry / sensor / equipment metrics).

---

## Iteration 2 — Equipment detail page (this iteration)

**Surface picked:** Pentair IntelliFlo3 detail page (the destination of clicking through from My Pool's equipment grid).

**Why this surface:**
- Single product → one OEM color at full intensity (testbed for "be bold with colors" without spreading 5 brands across a feed)
- Treated product photography is load-bearing here — best test of Ravi's image-treatment thinking ("more bold with colors, run some treatment on the images")
- Hero asymmetric layout (bold pentair half + cream half) is the dialogue between the warm surface and the bold OEM
- Tabular live stats (RPM / W / GPM / hours) demonstrates the OpenSea-style numerics treatment
- Smaller scope than a feed — manageable as a single-mock testbed

**Direction (NOT YET in DESIGN.md):**
- Surface: warm cream `#F8F4EE` (oatmilk, Bella-leaning)
- No 1px line borders on any container
- Hairlines `#EDE7DC` only at section transitions (horizontal rules), never as container outlines
- Pills/chips: solid soft fills (e.g. brand-soft fill + brand text) or text-only — no outlines
- Hero product photo on **full-saturation Pentair** backdrop, treated with: large faded ghost wordmark behind, soft white spotlight, drop shadow on the product
- One OEM signal per card max (we currently run three)
- Tabular numerics for RPM/W/GPM/Hours, big and editorial
- Section gaps 80px (was 56)
- Ink slightly warmed: `#1B1814` instead of `#0F1115`

**Frame on the canvas:** TBD — placed at `y=8800` below state B.

---

## Open questions before promoting iteration 2 to `DESIGN.md`

1. **Which warm tone is primary?** Bella oatmilk (`#F8F4EE`), Glossier cream (`#FFFBF7`), or blush (`#F4EFEB`)? The Bella oatmilk reads warmer/earthier; Glossier cream reads cleaner/luxe.
2. **Are `cream` and `blush` core palette tokens, or a `surface-cream` / `surface-blush` sub-system?** Adding to core makes them load-bearing; sub-system makes them optional emphasis layers.
3. **Bold pentair-backdrop hero — does it work, or does it still drift loud?** OEM Wall went too far. This sits somewhere between Pure (whisper) and OEM Wall (shout). The middle is what we're testing.
4. **Multi-brand surfaces** (My Pool home, Folks state A): the bold treatment works on a single-brand page (Equipment detail). What's the rule when 4 brands need to coexist on one screen? Do they all get bold zones, or does only ONE get the bold treatment per page (the active/primary)?
5. **Product photography.** The bold-color-block + treated-photo direction needs a real photo library — not stock white-bg shots. We're proxying with what's in `public/assets/` for now. Need to flag this as a real production dependency.

---

## Iteration 3 — Spatial Canvas (interaction architecture)

**Different kind of iteration.** Iter 0–2 explored *visual* direction. This one explores *navigation*. The visual system (Pure → warm-cream lean from Iter 2) is orthogonal — whichever surface treatment lands, the canvas direction can sit on top of it.

### Iter-6 is the frozen baseline

The `demo/iter-6` branch has My Pool, Care, Equipment, Connect, and Folks built out as conventional tab-based surfaces (TopNav + 6 routes). **That's the baseline this iteration explores in parallel against, not on top of.** When we prototype the canvas, it lives on a fresh branch off `demo/iter-6` so the existing build is preserved.

> Note for Ravi: working tree on `demo/iter-6` was dirty when we entered this iteration. If you want a true git-level freeze (tag), commit the WIP to the branch first — I haven't touched it.

### The seed

`flipbook.page` (demo'd in `youtube.com/watch?v=wVWdKkq6SVo`) as a navigation reference. FlipBook is an "infinite visual browser" — a continuous zoomable canvas. PoolGo's data is organized around a *place* (your pool, your pad, the pump on the pad). Tabs are an abstraction inherited from the web; spatial zoom is closer to the homeowner's actual mental model.

### Proposal — canvas as the My Pool surface, not the whole app

1. `/` (My Pool) becomes a top-down isometric of the pool + pad. Pixelated/iconographic at the macro zoom.
2. As you zoom into the equipment pad, the pixel art crossfades to a high-res photo of the unit (IntelliFlo3, IntellipH, etc.) and the chrome saturates with that OEM's brand color. **The zoom IS the OEM cascade** — proximity to the product is proximity to the brand identity.
3. Crossing a zoom threshold commits to the existing equipment detail page. Pinch-out / back returns to the canvas at the prior zoom.
4. Care doesn't appear as a tab from the canvas — it's spatial too. "A guy in a truck up the street" appears as a pin on the outer ring; tapping him routes into the Folks/tech profile we've already built. "Leslie's two miles away" same pattern. **The canvas is an interface *into* the existing tabs, not a replacement for them.**
5. TopNav stays. Anyone who prefers list/dashboard navigation never touches the canvas. The canvas is the *signature* surface, not the only one.

### Information density on the canvas (Ravi's call)

- Source-color pins on equipment, same legend as everywhere else: Live, Imported, Human, AI.
- **Orbiting / pulsing indicator** when something needs attention (pH low → pH-meter pin pulses red-soft and orbits the pool node). One signal per problem, not a sea of warnings.
- Recent-activity dots fade over 24–48h.

### Interaction model

- **Desktop:** click-to-zoom (camera dollies to the clicked node, never instant). Trackpad pinch-zoom supported as a power-user gesture.
- **Mobile:** pinch-zoom primary. Tap on a leaf node accelerates the zoom-to-detail transition.
- **Threshold-based commit:** at zoom level X, the canvas commits to the equipment detail page. Below X, you can fly back out smoothly.
- **Back gesture** (swipe-down or escape) always returns to the canvas at the prior zoom.

### What stays from iter-6

All of it. Every detail page, every list, every tab. Components we've already built (`PumpHero`, `EquipmentTile`, `ChemistryStrip`, `ActivityFeed`, `ProCard`, `FeaturedPro`, etc.) are the leaf views the canvas zooms into. The canvas should never re-implement a leaf — it should route to it.

### Risks we're explicitly testing

- **Performance.** A real pinch-zoom canvas with crossfading sprites is heavy. FlipBook is built around it; we'd be retrofitting on Next.js + Tailwind. Mobile especially. May need a `<canvas>` or WebGL layer for the zoom physics, with React rendering the leaf detail surfaces normally.
- **Discoverability.** Tabs are obvious. A canvas needs a 1-shot tutorial or an obvious affordance ("click your pump"). First-run experience matters disproportionately.
- **Dual-architecture cost.** Maintaining a canvas-driven `/` *and* conventional `/equipment`, `/care` routes doubles the surface area. The leaf detail pages must be the *same components* whether reached via tab click or via canvas zoom — otherwise we're shipping two products.
- **Multi-pool households.** Canvas is "a place." When a homeowner has a pool *and* a spa *and* a pond, does the canvas widen? Pan? Switch via a top-level toggle?

### Open questions — must resolve before prototyping

1. **What zoom levels are stops?** Pool-overview → pad-overview → single-unit detail is 3 stops. Is there a 4th (sub-component, e.g. impeller / o-ring) or does the leaf detail page handle that?
2. **Continuous zoom vs. staged transitions?** True continuous (magical, heavy) vs. 3-state crossfade that *feels* zoomy (cheap, ships faster). The cheap version is probably the right MVP — saves the WebGL-grade engineering for after we've validated the concept.
3. **What's at the outer ring?** Care/Folks pins (truck up the street, Leslie's down the road) vs. ambient (weather, season) vs. nothing (canvas ends at the property line). Ravi's instinct points at the truck/Leslie's direction.
4. **Macro-zoom visual treatment.** Pixelated icons (Ravi's instinct — playful, distinctive) vs. flat illustration vs. real top-down satellite of the property. Pixelated needs a commissioned icon set; satellite needs Mapbox + per-property art direction.
5. **Visual system parity.** The canvas's background, line treatment, and pin colors must play with the Pure / warm-cream language Iter 2 is heading toward. They aren't independent decisions.

### Status

Concept only. No code on the canvas direction yet. Next move: pick (a) outer-ring content, (b) macro-zoom visual treatment, then (c) sketch in Pencil before any TSX.

---

## How this file evolves

- Each iteration appends a new section ("Iteration 3 — …", "Iteration 4 — …")
- When an iteration's direction lands, `DESIGN.md` gets updated and the relevant Pencil variables get migrated
- `DESIGN.md` always reflects the *currently locked* direction. This file holds *everything* — locked, abandoned, in-progress — so we can trace decisions backward.
