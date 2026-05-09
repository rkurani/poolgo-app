---
version: alpha
name: PoolGo · Pure
description: >
  PoolGo's consumer brand. Pure white surface, Inter Tight typography,
  OEM brand colors carried as first-class design tokens per card.
  PoolGo's own cyan is reserved for accent and concierge moments.

colors:
  # surface
  background: "#FFFFFF"
  surface: "#FAFAFA"
  surface-2: "#F5F5F4"
  line: "#ECECEC"
  line-2: "#D8D8D8"

  # ink
  ink: "#0F1115"
  ink-soft: "#45494F"
  ink-mute: "#6B7079"
  on-ink: "#FFFFFF"

  # primary (PoolGo accent)
  primary: "#1FA0BF"
  primary-soft: "#E2F3F8"
  on-primary: "#FFFFFF"

  # source legend (4-source provenance system)
  source-live: "#2A8540"
  source-imported: "#B07B00"
  source-human: "#C75240"
  source-ai: "{colors.primary}"

  # OEM brand palette (data colors — used per equipment / store / pro)
  pentair: "#1A4F8B"
  pentair-soft: "#E5ECF4"
  hayward: "#D8A700"
  hayward-soft: "#FBF1D0"
  polaris: "#00759C"
  polaris-soft: "#DCEDF4"
  jandy: "#CC0033"
  raypak: "#E94B3C"
  leslies: "#0046A8"
  leslies-soft: "#DEE8F7"
  suncountry: "#B07B00"
  suncountry-soft: "#F8EFD6"
  pinch: "#2C5F4A"
  marina: "#2C5F4A"
  marina-soft: "#DFE8E2"

  # semantic
  success: "{colors.source-live}"
  warn: "{colors.source-imported}"
  error: "{colors.source-human}"

typography:
  display:
    fontFamily: Inter Tight
    fontSize: 44px
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter Tight
    fontSize: 32px
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: -0.04em
  headline-md:
    fontFamily: Inter Tight
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.03em
  headline-sm:
    fontFamily: Inter Tight
    fontSize: 17px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.02em
  stat-lg:
    fontFamily: Inter Tight
    fontSize: 32px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: -0.04em
    fontFeature: '"tnum"'
  stat-md:
    fontFamily: Inter Tight
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.03em
    fontFeature: '"tnum"'
  body-lg:
    fontFamily: Inter Tight
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter Tight
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Inter Tight
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: -0.005em
  caption:
    fontFamily: Inter Tight
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
  label-caps:
    fontFamily: Inter Tight
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.04em

spacing:
  base: 16px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 28px
  xl: 56px
  page-margin: 32px
  max-width: 1280px
  gutter: 16px
  card-padding: 22px
  card-padding-lg: 28px
  section-gap: 56px

rounded:
  none: 0
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px

components:
  nav:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink-mute}"
    padding: 16px
  nav-tab:
    rounded: "{rounded.md}"
    padding: 8px 14px
  nav-tab-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"

  chip:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.full}"
    padding: 8px 14px
  chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"

  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.lg}"
    padding: 11px 18px
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: 10px 14px

  card:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-padding}"
  card-brand-stripe:
    height: 3px
  card-medium:
    backgroundColor: "{colors.background}"
    rounded: 14px

  ai-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.xl}"
    padding: 22px 28px

  source-pill:
    rounded: "{rounded.sm}"
    padding: 4px 9px
    typography: "{typography.label-caps}"
---

# PoolGo · Pure

## Overview

Also known as Brand & Style.

PoolGo is the home for everything about a homeowner's pool — water, equipment, service, and the people who help keep it running. The product surfaces are the homeowner's record. They are not a marketplace, not a forum, not a marketing site. They are a calm, factual living document.

The Pure direction is built on three pillars:

- **Warm.** The product feels like a friendly neighbor, not a utility. Plainspoken language, no jargon, no marketing hype.
- **Confident.** We know pools. We make recommendations rather than show endless tooltips. We use real numbers, not gauges with good-bad colors.
- **Calm.** Pool care is supposed to be relaxing. Generous whitespace. No urgency-coded reds and yellows unless something is genuinely wrong.

The visual signature is a deliberate move away from typical SaaS dashboards. The interface is **pure white**, structured by the equipment and the people who actually touched the pool. **OEM brand colors are first-class design tokens.** A Pentair pump card is tinted Pentair blue. A Hayward filter is tinted Hayward yellow. A Sun Country water test is tinted Sun Country gold. The system inherits authenticity from the real-world brands the homeowner already trusts, instead of inventing a synthetic palette.

PoolGo's own cyan (`primary`) is reserved for accent moments — the wordmark dot, the AI concierge glow, the You-pin on a map. It is never the main color of a card.

## Colors

The palette has three distinct layers.

**Surface layer.** Pure white background. Two shades of warm-neutral gray (`surface`, `surface-2`) for input fills, hover states, and secondary surfaces. Borders are a single soft gray (`line`).

**Ink layer.** A deep near-black (`ink`) for primary text and high-emphasis surfaces (the AI band, primary buttons). Two muted grays (`ink-soft`, `ink-mute`) for secondary and tertiary text.

**Brand layer.** PoolGo's own cyan (`primary`) is the accent — used sparingly. The OEM brand palette (Pentair, Hayward, Polaris, Leslie's, Sun Country, Marina, Pinch a Penny, Jandy, Raypak) is used per data origin. Every equipment card, store card, and service pro card carries the color of who owns or made it via a `data-brand` attribute that drives a 3px top stripe and tints meta tags, source pills, and CTA hovers.

**Source legend.** A separate four-color system flags the provenance of every record:

- **Live** (`source-live`, sage green) — telemetry from connected equipment
- **Imported** (`source-imported`, gold) — data from a pool store or POS system
- **Human** (`source-human`, coral) — entries from a service tech or homeowner
- **AI** (`source-ai`, primary cyan) — the concierge / Routines surface

This legend appears as small colored dots on charts, left stripes on timeline rows, and tags on records.

Semantic colors map onto this system: `success` is sage, `warn` is gold, `error` is coral. We do not use bright red or bright yellow — they break the calm pillar.

## Typography

The entire system uses **Inter Tight**. One family, varied across weight (400 / 500 / 700 / 800) and size, gives the surface a tight, contemporary feel without monotony. We rely on size and weight contrast — not on a serif/sans pairing — for hierarchy.

- **Display & headlines** use weights 700–800 with negative letter-spacing (`-0.03em` to `-0.04em`). They are tight and confident.
- **Body** sits at 15–16px, weight 400–500, with very light negative tracking on the larger size for optical balance.
- **Stats and numbers** use weight 800 with tabular figures (`font-feature-settings: "tnum"`) so columns of numbers align cleanly.
- **Labels** are 11px, weight 600, uppercase, with `0.04em` letter-spacing. Used for category eyebrows, source tags, and section meta.

We do not use a monospace face. Numeric data uses Inter Tight with `tnum`.

## Layout

The page model is a **fixed max-width grid** at 1280px, centered, with 32px page margins. Sections are separated by 56px of vertical space. Inside a section, cards use 14–16px gaps.

There is no rigid 12-column grid. Sections compose freely from typed tiles (see **Components**). The grid bends to the content — a hero stat block can be 2fr alongside a 1.5fr explanation, a `latest-grid` can be 2fr / 1.5fr / 1fr / 1fr, an equipment grid is auto-fill at min 280px.

The **8px scale** governs micro-spacing: 4 / 8 / 16 / 28 / 56. Card internal padding is 22px (medium cards) or 28px (hero cards). The page-margin is 32px so the inner content has room to breathe at the edges.

## Elevation & Depth

The Pure direction is **deliberately flat**. Hierarchy is conveyed by:

- **Tonal layers** — pure white cards on pure white background, separated by a 1px `line` border.
- **Borders, not shadows.** All cards get `border: 1px solid {colors.line}`. Shadow is reserved for elevated tiles like store-logo tiles (a tight `0 1px 3px rgba(15,17,21,0.06)`) and never used for body cards.
- **The brand stripe.** A 3px top stripe in the card's brand color is the primary visual differentiator between cards. It does the work that elevation does in a Material design system.
- **The AI band** is the one true dark surface — `ink` background with a faint cyan radial glow in the bottom right. It is the only place white-on-dark text appears.

Cards do not have hover-elevation animations. Buttons get a color shift on hover (a softer ink for primary, a brand-accent fill for brand-aware secondary CTAs). Nothing lifts.

## Shapes

The shape language is **softly rounded**, never pill-y in body content.

- **xl (16px)** — large cards: the AI band, the page header card, the latest-of-each-kind cards.
- **lg (12px)** — small cards, large buttons, search input.
- **md (8px)** — nav tabs, primary buttons, store logo tiles.
- **sm (6px)** — chips that aren't pill-shaped, source tags, distance badges.
- **full (9999px)** — filter chips and pills only. Avatars are circles.

Equipment logo tiles are 14px radius with a 1px `line` border and a hint of shadow — they are the one place rounded corners differ slightly to evoke a real-world product display.

## Components

### Top nav (`nav`)

Sticky, white, 16px padding, bottom 1px line. Three regions:

1. **Wordmark** — `PoolGo` in `headline-md`, the trailing `.` in `primary` cyan at weight 800.
2. **Tab row** — six links (`My Pool`, `Care`, `Equipment`, `Routines`, `Folks`, `Inbox`). Tabs are 8px-radius pills, `body-sm`, `ink-mute` color. Active tab is `ink` background with white text.
3. **Right rail** — bell with a coral notification dot, then a 36px circular avatar.

### Filter chip (`chip`)

`body-sm`, 999px radius, 1px `line` border on white. Active chip is `ink` background with white text. Counts are inset to the right at weight 700.

### Buttons (`button-primary`, `button-secondary`)

- **Primary** — `ink` fill, white text, 12px radius, 11px × 18px padding. Used for hero CTAs and global "Send" / "Submit" actions.
- **Secondary** — white fill, `ink` text, 1px `line` border, 8px radius, 10px × 14px padding. Used for `Send a note →` and tertiary actions.
- **Brand-aware secondary** — same shape as Secondary, but `:hover` flips the fill to the card's `--brand-accent`. Used for per-card CTAs inside an equipment / store / pro card.

### Card (`card`)

The atomic unit. White fill, 1px `line` border, 16px radius. Sets `position: relative` so the brand stripe can pseudo-element overlay.

A **branded card** carries `data-brand` (e.g. `pentair`, `marina`, `suncountry`). The CSS reads:

```css
.card[data-brand="pentair"]   { --brand-accent: var(--pentair); --brand-soft: var(--pentair-soft); }
.card[data-brand="marina"]    { --brand-accent: var(--marina);  --brand-soft: var(--marina-soft); }
/* ...etc */
.card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0;
  height: 3px; background: var(--brand-accent, var(--ink-mute));
}
```

The card's eyebrow label (`label-caps`), meta tags, and CTA hover all reference `var(--brand-accent)` so the whole card reads as belonging to that brand without ever overpowering the white surface.

### Brand logo tile

Equipment cards and store cards render a tile holding the OEM's actual logo (real photography or actual SVG). The tile is 64–80px square, white, 1px `line` border, 14px radius, with a tight box-shadow for slight depth. **Never invent OEM logos** — use real assets in `/mocks/assets/`.

### AI band (`ai-band`)

The concierge surface. `ink` background, white text, 16px radius, 22px × 28px padding. A radial gradient using `primary` at 45% opacity bleeds in from the bottom-right corner — the only place cyan dominates.

Structure: 32px square cyan mark with the letter `P`, label-caps eyebrow `POOLGO CONCIERGE · …`, then 60-character `body-lg` body. `<strong>` is weight 700; `<mark>` is a `rgba(255,255,255,0.15)` pill on the same line.

### Stat block

Used in page headers and chart cards. `stat-lg` number on top, `label-caps` underneath. Always tabular figures.

### Timeline row

A row in a Care timeline. `data-src` on the row drives a **left stripe** (3px wide, `--row-accent`) using one of the source-legend colors or an OEM brand color. The row composition: source mark (rounded square, brand-colored), bold time, label-caps record type, brand-tinted meta tag, then prose.

### Source pill / source dot

Small inline element flagging provenance. Pill: 4px × 9px padding, `sm` radius, soft brand background, brand text. Dot: 8–10px circle in the source color. Used on charts (each datapoint is the color of who reported it), on photo grids, and at the bottom of cards.

## Do's and Don'ts

**Do** carry the OEM brand color on every card that has a clear owner — equipment, store, service tech, water test. The `data-brand` attribute is non-optional once the source is known.

**Do** reserve `primary` cyan for the wordmark accent dot, the AI band, the You-pin on the map, and source-AI moments. If cyan appears on a non-AI card, the system is wrong.

**Do** use real OEM logos and product photography. Real Pentair JPG, real Hayward PNG, real Pentair IntelliFlo3 product shot. Stock illustrations of pool equipment cheapen the brand.

**Do** show numbers in their natural form. `2.4 ppm`, not "Free Cl: GOOD".

**Do** use `tnum` for any column of numbers.

**Don't** introduce shadows on body cards. The 3px brand stripe and the 1px line border do all the elevation work. A card with a drop shadow reads as 2018 SaaS.

**Don't** use bright red or bright yellow for warnings. The source-legend coral and gold are warm and intentional. A pure red breaks the calm pillar instantly.

**Don't** mix font families. The whole system is Inter Tight. No serif display face, no monospace for numbers.

**Don't** introduce gradients on hero areas. The product photo and the brand stripe are the visual flourish; a gradient hero reads as marketing-template.

**Don't** use emoji in product UI. The OEM logos and 4-source legend are doing the visual work.

**Don't** auto-color critical states (red exclamation marks, yellow caution triangles). If a value is out of range, use a discrete `warn` source pill with the gold token, not a flashing icon.

**Don't** invent a sub-brand for an OEM you haven't licensed visual assets from. If we don't have a real Jandy logo file on hand, fall back to `data-brand="jandy"` driving the stripe color, and a typographic treatment of the company name — not a guessed-at vector.

## Notes on token usage

The OEM brand colors (`pentair`, `hayward`, `polaris`, `leslies`, `suncountry`, `marina`, `pinch`, `jandy`, `raypak` and their `-soft` variants) and the source-legend colors (`source-live`, `source-imported`, `source-human`, `source-ai`) are applied **dynamically** via CSS custom properties keyed off a `data-brand` or `data-src` attribute on the card or row. They are not bound to a fixed component variant.

The official DESIGN.md linter will flag these tokens as "defined but never referenced by any component" because the linter only inspects the YAML `components` map. This is expected. The tokens are wired in CSS like:

```css
.card[data-brand="pentair"] { --brand-accent: var(--pentair); --brand-soft: var(--pentair-soft); }
.card::before { background: var(--brand-accent, var(--ink-mute)); }
.timeline-row[data-src="suncountry"] { --row-accent: var(--suncountry); }
```

This pattern is intentional and load-bearing: the page composition reflects the *real* equipment / store / pro that produced each piece of data, and the tokens are the design-system contract that keeps that color logic consistent across surfaces.
