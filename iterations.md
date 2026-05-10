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

## How this file evolves

- Each iteration appends a new section ("Iteration 3 — …", "Iteration 4 — …")
- When an iteration's direction lands, `DESIGN.md` gets updated and the relevant Pencil variables get migrated
- `DESIGN.md` always reflects the *currently locked* direction. This file holds *everything* — locked, abandoned, in-progress — so we can trace decisions backward.
