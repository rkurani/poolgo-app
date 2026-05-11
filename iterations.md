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

`flipbook.page` (demo'd in `youtube.com/watch?v=wVWdKkq6SVo`; local copy at `inspo/ParisExampleVideo.mp4`) as the navigation reference. FlipBook is an "infinite visual browser" — a continuous zoomable canvas where the environment *is* the navigation.

**The Paris demo as analogy.** The video opens on an illustrated Paris. The Eiffel Tower, the Louvre, the river are not menu items — they're objects in a world, and clicking any of them goes deeper rather than switching a tab. The video frames the contrast explicitly: a MacBook shown as a "static webapp" against the alternative of "an infinite internet of pixels in latent space." Discrete pages → continuous world.

**Direct mapping to PoolGo.** Your house and pool *are* a place. Tabs are an abstraction inherited from the web. The Paris equivalent for a homeowner:

- **Click the water** → today's chemistry (pH, ORP, the verdict)
- **Click a lounger** with someone in it → that person or the notification attached to them
- **Click the pad / pump** → equipment status & detail
- **Click out beyond the property line** → the Folks layer (truck up the street, Leslie's two miles away)

You're not "going to the Chemistry tab." You're looking at the pool and noticing something looks off, then going there.

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
- **Discoverability *and speed*.** Tabs are obvious. A canvas needs a 1-shot tutorial or an obvious affordance ("click your pump"). First-run experience matters disproportionately. Equally important: the canvas can be the delight layer + entry point, but if a user just wants to check pH before adding chemicals, that's still 1–2 taps. Power-nav (TopNav, keyboard shortcuts on desktop, a swipe-gesture shortcut on mobile) has to coexist with the canvas — it can't replace utility with browsing.
- **Dual-architecture cost.** Maintaining a canvas-driven `/` *and* conventional `/equipment`, `/care` routes doubles the surface area. The leaf detail pages must be the *same components* whether reached via tab click or via canvas zoom — otherwise we're shipping two products.
- **Multi-pool households.** Canvas is "a place." When a homeowner has a pool *and* a spa *and* a pond, does the canvas widen? Pan? Switch via a top-level toggle?

### Open questions — must resolve before prototyping

1. **What zoom levels are stops?** Pool-overview → pad-overview → single-unit detail is 3 stops. Is there a 4th (sub-component, e.g. impeller / o-ring) or does the leaf detail page handle that?
2. **Continuous zoom vs. staged transitions?** True continuous (magical, heavy) vs. 3-state crossfade that *feels* zoomy (cheap, ships faster). The cheap version is probably the right MVP — saves the WebGL-grade engineering for after we've validated the concept.
3. **What's at the outer ring?** Care/Folks pins (truck up the street, Leslie's down the road) vs. ambient (weather, season) vs. nothing (canvas ends at the property line). Ravi's instinct points at the truck/Leslie's direction.
4. **Macro-zoom visual treatment.** Pixelated icons (Ravi's instinct — playful, distinctive) vs. flat illustration vs. real top-down satellite of the property. Pixelated needs a commissioned icon set; satellite needs Mapbox + per-property art direction.
5. **Visual system parity.** The canvas's background, line treatment, and pin colors must play with the Pure / warm-cream language Iter 2 is heading toward. They aren't independent decisions.

### Evolution — 2026-05-10 (afternoon)

After generating a first macro view via AI image gen inside Pencil, three new directional ideas emerged that we want to lock in:

1. **Photo-to-world as the onboarding feature.** The homeowner takes a photo (or several) of their actual property — pool, pad, deck, surroundings. The app uses image understanding to detect equipment, layout, and surroundings, then *generates the Sims-style canvas of their specific home* as the My Pool surface. This becomes a first-run feature with real wow factor: "your pool, but as a living world." It's also a defensible product wedge — no other pool app has reason to build this.

2. **Sims-meets-app as the conceptual frame.** Not "an app with a fancy background" — an actual living world that happens to be functional. The leaf detail pages (chemistry, equipment, schedule) are the utility layer; the canvas is where you live the rest of the time. This reframes the canvas from "navigation gimmick" to "ambient companion."

3. **Lofi-girl ambient animation.** The canvas isn't static. Subtle animation loops give the world life: the figure on the lounger takes a sip, a bird flies across, palm fronds shift, the pool surface ripples. Reference: the lofi-girl YouTube channel (`lofi-girl`) — a single illustrated scene that loops indefinitely with quiet motion, designed to be left on. The PoolGo canvas should feel like that. You'd leave it open on a kitchen iPad.

### Visual treatment — two distinct references, do not conflate

- **Visual fidelity = FlipBook pixel art.** Low-fidelity, distinctly pixelated, 16-bit RPG-map energy (Stardew Valley, Owlboy, Hyper Light Drifter). Visible pixels are a feature. Not painterly, not photoreal, not Ghibli-illustrated. The Paris demo video in `inspo/ParisExampleVideo.mp4` is the reference for *how it should look*.
- **Ambient motion = lofi girl.** The lofi-girl YouTube channel is the reference for *how it should move* — quiet looped ambient animation that makes a static scene feel alive (figure takes a sip, bird crosses, water ripples, palm fronds shift). It is **not** a visual-style reference.

Conflating these two produces a polished cartoon (which the first regen drifted toward). The right destination is pixelated visuals + lofi-style ambient motion.

### Status

Concept exploring. First macro AI image rendered in Pencil (frame `m3DaR` in `poolgo.pen`); regenerating with the lofi-girl direction. Photo-to-world onboarding still vapor — needs an image-understanding spike to validate feasibility (probably Claude Vision or Gemini for the detection pass; the world-build is the same image-gen pipeline). Animation layer is straight CSS / Lottie / Rive once the still frame lands.

### Real-logo pattern (resolved 2026-05-10)

**Question:** real OEM logos and partner brand marks (Pentair, Hayward, Leslie's, a pro's business logo) need to appear somewhere — they're real assets brand owners control and care about. How do they coexist with a pixel-art world?

**Answer:** *Real logos appear as themselves, but always inside a chunky pixel-chrome frame.* The frame is the connective tissue.

Three concrete patterns now in production on `demo/canvas`:

1. **`<RealLogoChip>`** (`/equipment/intelliflo3`) — small horizontal card with: a 4px brand-color stripe at top, a real PNG/SVG logo on the left, and "Authentic OEM" / "Parts in stock locally" tagline on the right. Used in a "Trust strip" alongside warranty/cert chips.
2. **`<LogoFrame>`** (`/care`) — square pixel-bordered tile that wraps a real logo or a person's pixel portrait. Used in test-result cards (Leslie's logo on a free-water-test entry, Carlos's pixel portrait on a weekly-visit entry).
3. **`<PhotoFrame>`** (`/care` observations) — full-bleed user-uploaded photo inside a chunky `border-[3px]` frame with caption beneath. The pixel chrome holds. Real logos within those photos (a brand on a salt bag, a Pentair sticker on the unit) appear naturally.

**Brand TEXT vs brand LOGO MARK:**
- Pixel layer / chrome → uppercase brand text in Press Start 2P (`PENTAIR · Variable Speed`). Always present.
- Leaf / detail / trust strips / user photos → real logo marks. The frame absorbs them into the world.

This means a homeowner uploading their pro's actual business logo at signup gets a logo card that visually plays with the rest of the world, no design retraining needed.

---

## Iteration 4 — Visual system pivot (Sims/Pokemon spectrum, anti-AI moat)

**This iteration replaces Iteration 2's "warm cream" direction.** The cream foundation was fighting the pixel-art world layer that emerged in Iteration 3. More fundamentally, cream + Inter + line charts + ghost buttons IS the AI-app default of 2026 — Notion, Linear, Cursor, every YC AI-tools startup. Building there means looking like the herd. The pivot is to a visual identity that lives in a different lineage entirely: 16-bit RPG / Pokemon-era domestic pixel art, with photoreal product detail at the leaf level.

### Audience anchor — Gen X / Older Millennial, not Boomer

- The pool-tech early adopter market is 38–58. Boomers either pay a service tech or won't adopt a sophisticated app at all. Pokemon/SNES/Sims/Animal Crossing/Stardew Valley are the *visual ancestors of warm pixel art that depicts a domestic life worth caring for* — perfectly tuned to this cohort.
- Atari/boomer (vector-on-black, Pong/Asteroids) is the wrong reference. That's harsh-arcade-alien, not warm-domestic.
- Going millennial/Gen X with the Pokemon register positions PoolGo against a generation of poolside decision-makers who are sick of ChatGPT-clone design. Anti-AI-app aesthetic = the moat.

### Foundation — drop cream, go warm sandy/dusty

- `#D9C9A6` to `#C9B894` range — weathered concrete, sun-bleached pool deck after three summers. Already the tonality your macro pixel-art image uses (look at the patio tones). Harmonizes with pixel art instead of fighting it.
- Cream becomes an *accent* for data-layer cards, not the underlying canvas. Form sheets fill with cream on the sandy-warm body.
- Higher saturation overall on accent colors — Pokemon Gen 2 palette as the reference (warm reds, deep blues, ochre, mossy greens). The OEM colors (Pentair navy, Hayward gold) slot directly into this register because they were designed by mid-century industrial brands; they belong here.

### Pixel as a spectrum, not a binary

- Earlier framing was "macro = pixel, leaf = photoreal" — a binary. The cleaner model is *every surface carries some pixel character, with increasing detail as you zoom in*. Pixel is connective tissue, not a macro-only state.
- **Macro canvas (`/`)** — full pixel art, whole world.
- **Mid-zoom (`/equipment` overview)** — HD pixel art (Sea of Stars register). Each unit is a chunky-pixel portrait, but readable at desktop sizes.
- **Leaf detail (`/equipment/[unit]`)** — pixel-art portrait of the unit at the top + photoreal/3D rotatable product shot of the actual hardware below + editorial spec data. Octopath HD-2D applied to product UI.
- **Data-only surfaces (`/care`'s 30-day chart)** — chart lines stay smooth/readable, BUT the chart *frame* is bordered with 4px pixel-stepped chrome, section dividers are 8-bit, axis labels use sans paired with a small pixel-art accent icon.
- **Chrome (TopNav, MobileTabBar)** — subtle pixel-art trim. Tab icons get an 8-bit active state. Navigation feels world-adjacent without becoming a costume.

### Case studies (UI references — pixel + readable data hybrid)

- **Octopath Traveler "HD-2D"** — canonical hybrid, 2D pixel sprites on 3D photoreal environments in the same frame. The "accurate HD-2D" framing from the dev team is basically our brief. https://www.unrealengine.com/en-US/spotlights/octopath-traveler-s-hd-2d-art-style-and-story-make-for-a-jrpg-dream-come-true
- **Eastward (Pixpil)** — domestic, warm, painterly pixel art with legibly modern UI. Dialog boxes, item modals, inventory all cataloged on Game UI Database — almost a perfect match for the warm-domestic register we want. https://www.gameuidatabase.com/gameData.php?id=2131
- **Sea of Stars (Sabotage Studio)** — modern HD pixel art with character portraits beside readable battle UI. The portraits-next-to-data-panels pattern is exactly the equipment-detail pattern we want. https://sabotagestudio.com/presskits/sea-of-stars/
- **Pokemon GO** — real geo + game overlay at scale via S2 cells (Google's geometric abstraction for translating 3D Earth into 2D game-friendly geometry). Architecture template if we ever want a "pool map" feature. https://digitalcxo.com/article/pokemon-go-data-is-mapping-out-this-geospatial-system/

### Local-page pixel-art generation as SEO moat

The core idea: each city/market page (`/folks/palm-springs`, `/folks/scottsdale`, `/folks/san-diego`) gets its OWN AI-generated pixel-art landscape, with a city-specific palette extracted from real local imagery and applied as CSS variable overrides for that route.

**Why this is a triple win:**
- **Local SEO** — Google sees genuinely unique imagery + copy per city page. Combined with city-specific service language ("pool service in Palm Springs, where pH drifts up faster in 110°F summers..."), each page can rank organically in its market.
- **Brand identity at scale** — pipeline generates 200+ unique city pages without per-page hand design.
- **Onboarding flywheel** — when a homeowner signs up in Palm Springs, the city page is already styled like Palm Springs. The personal photo-to-world step then generates *their* pool inside the city's palette.

**Pipeline (v2/v3 feature, but capture architecture now):**
1. Curated reference set from Wikimedia Commons + Unsplash (permissive licensing — DO NOT scrape Google Images, legal/TOS risk) for ~50–100 markets.
2. Image-gen prompt with lofi-pixel constraints + extracted dominant colors of the reference imagery.
3. K-means cluster the result to extract 5–7 city-specific palette tokens.
4. Tokens override `--color-surface`, `--color-cream`, etc. per route via `<html data-city="palm-springs">` on the relevant page.

This pipeline is the same as the personal photo-to-world feature, just at city-scope instead of property-scope.

### Path to dev handoff — Pencil is source of truth

The visual moat thesis only pays off if every surface is designed at production fidelity in one consistent place. From here:

- **`poolgo.pen` is the design spec.** All surfaces, all states. Production fidelity.
- **`iterations.md` is the lab notebook.** Decisions, why's, abandoned directions, references.
- **`DESIGN.md` is the locked direction.** Updated only when an iteration lands.
- **TSX prototypes (`/canvas`, etc.) are research vehicles.** They validate interaction models. They get replaced when the design is locked and re-implemented from the Pencil spec.

Implication for cadence: more time in Pencil designing the new register across all surfaces (backyard canvas, equipment portraits, chemistry data layer with pixel chrome, folks city pages) BEFORE writing more TSX. The canvas TSX is the proof-of-concept for the interaction; it's not the production artifact.

### Open questions before promoting Iteration 4 to DESIGN.md

1. **Sandy-warm tone — which exact value?** Stardew sun-bleached deck (`#D9C9A6`-ish, slight green shift), Spanish-tile terracotta (more saturated, more polarizing), or sandy yellow (warmer, risks toy)? Should mock all three on the same component as a comparison.
2. **Chrome treatment.** Subtle pixel trim on TopNav/MobileTabBar (my instinct), or keep them clean? This is the call that decides whether the whole app feels world-adjacent or whether the world is contained on `/canvas`.
3. **Typography pairing for data layer.** Inter Tight stays, OR pair Inter with a chunky pixel display face (like ChevyRay's pixel fonts) for headings/numerics? The latter is more committed but reads "game-y" in a way that may go too far.
4. **Chart treatment.** Smooth lines + pixel chrome around the chart frame — but should the data POINTS be pixel-stepped (like Pokemon stat bars) or smooth dots? Stepped is more committed, smooth keeps clinical legibility.
5. **3D product shots — fidelity bar at MVP.** Real interactive WebGL is non-trivial. The cheap-but-distinctive version is photoreal product photography with a hover-pan parallax (Apple-product-page energy). Real WebGL 3D comes later. Either way, the *contrast between pixel-macro and photoreal-detail* is what we're investing in.

---

## Iteration 5 — Layered canvas, breathing world

The macro canvas was always a single flat PNG. Lovely image, but every animation we tried bled around the edges because there were no parts to move. Maya as a hand-coded SVG looked nothing like the world. Birds and walkers floated through the sky because we had no foreground/background separation. Time to layer it.

### Storyline anchor — Redlands, late afternoon, working

The canvas is the porch you sit on while everything quietly works. Golden-hour Redlands. The IntelliFlo3 is on stage B, you can almost hear it. Carlos was here Tuesday, his truck is parked one lot away hitting the next house. A breeze is up — palms catch, orange-tree leaves shift, a single bougainvillea petal drifts down the cedar fence. The figure on the lounger is enjoying it. Tomorrow's Leslie's test already imported. Everything is fine.

Lofi-girl tempo. The canvas doesn't demand attention. Status orbs sit quietly; the world hums around them.

### Plant set — accurate to Redlands

The historic navel-orange capital of the world (16 city-owned groves on 184 acres still standing). The canonical SoCal/Redlands backyard plant kit is:

- **Navel orange tree** (not just lemon, oranges are the heritage)
- **Mexican fan palms** (left and right of property)
- **San Diego Red bougainvillea** climbing the cedar fence (vibrant magenta, drought-tolerant, drops petals)
- Distant **San Gorgonio mountains** with snow caps on the eastern skyline (already in bg)

We're keeping the rest of the world as-is (deck, pool, equipment pad, truck, storefront), but pulling these plants out as separable PNG layers so each can move independently.

### Six moving layers

1. **Palms left + right** (existing pipeline) — sway breeze, independent loops
2. **Navel orange tree** — leaf sway, occasional fruit-drop on a 20–40s timer
3. **Bougainvillea on the fence** — base image plus particle layer of petals drifting down on the breeze
4. **Pool water shimmer** — cyan ripple overlay, gentle horizontal pulse, low-opacity
5. **Distant chimney smoke** — wispy gray column rising over a house in the distance, dissipates
6. **Pool floats** — separable so they bob on the water surface independently

Plus already-working SVG ambient: birds drifting across sky, duck bobbing, pump-chug indicator.

### Asset pipeline (proven by Canvas 2)

- Pencil generates each layer on a solid magenta (#FF00FF) background
- PIL chroma-key in Bash replaces magenta with transparent, preserves full pixel saturation (better than rembg for AI-generated subjects)
- Layers composited as absolutely-positioned PNGs over the base
- CSS keyframes drive per-layer motion: rotate for sway, scale + opacity for shimmer, translateY + fade for smoke
- Particles (bougainvillea petals) are inline SVG with CSS keyframe drift animations

### Promotion path

Build first as `/canvas-3`. When the storyline lands, promote `/canvas-3` → `/canvas` and retire `/canvas-2` (the layer-test scaffold).

## How this file evolves

- Each iteration appends a new section ("Iteration 3 — …", "Iteration 4 — …")
- When an iteration's direction lands, `DESIGN.md` gets updated and the relevant Pencil variables get migrated
- `DESIGN.md` always reflects the *currently locked* direction. This file holds *everything* — locked, abandoned, in-progress — so we can trace decisions backward.
