# PoolGo consumer surface — developer handoff

This branch (`feature/tenant-theming`) is the mocked end-to-end demo of the
consumer side of the ClearCare + PoolGo flow. Everything is static, all data
is in-memory, no backend. The job for the developer picking this up is to
swap the mocks for a real API while keeping the data shapes unchanged so the
UI keeps working.

## What's in the demo

**Send side** (separate repo at `~/Projects/clearcare-marketing-center`) — the
ClearCare Marketing Center iframe. Laura at Royal Pools builds an audience,
drafts an SMS/email, hits send. Each recipient gets a unique tokenized link.

**Receive side** (this repo) — what the customer sees when they tap that link.
Four campaign-landing templates plus a pool-record aggregator, all
tenant-skinned in ClearCare DNA.

**Demo index** at `/demo` — click-through-ready list of every scenario.

## How to run

```bash
cd ~/Projects/poolgo-app
npm install      # one-time
npm run dev      # http://localhost:3000
```

Then open `http://localhost:3000/demo` to see all scenarios.

## URL structure

```
/r/[tenant]/[token]     → consumer landing (tenant-skinned)
/demo                   → internal demo index (handoff entry point)
```

Tokens for the demo:

| Token            | Intent                | Customer       |
|------------------|----------------------|----------------|
| `cya-glenn`      | CYA climbing          | Glenn Beck     |
| `lapsed-maria`   | Re-engagement         | Maria Vargas   |
| `vip-jordan`     | VIP early access      | Jordan Patel   |
| `phosphate-sue`  | Phosphate / algae     | Sue Hartman    |
| `record-{name}`  | Full pool record      | (per customer) |

In production these are signed JWTs that resolve to
`{ customerId, campaignId, intent }`. Replace the slug-based decoder in
`src/lib/data/campaigns.ts` (`resolveToken`) with a real JWT decode +
DB lookup. The shape that comes back must match the existing `Campaign` type
so the page route doesn't change.

## Architecture (three layers)

```
┌───────────────────────────────────────────────────────────────┐
│  CONSUMER SURFACE (this repo)                                 │
│  Tenant-skinned landings + aggregator. ClearCare DNA chrome.  │
└──────────────────────┬────────────────────────────────────────┘
                       │ reads from
┌──────────────────────┴────────────────────────────────────────┐
│  POOLGO PLATFORM API (Partin builds this)                     │
│  Customer · Test · Recommendation · Equipment · Visit         │
│  Token sign/verify · Campaign send · Inbound webhook router   │
└──────────────────────┬────────────────────────────────────────┘
                       │ ingests from
┌──────────────────────┴────────────────────────────────────────┐
│  INGESTION                                                    │
│  ClearCare (today) · Skimmer/Pool Brain (later) · OEM APIs   │
│  Camera scan / email forward (user-driven, for non-API)       │
└───────────────────────────────────────────────────────────────┘
```

This repo is the top layer only. Everything else is real-backend territory.

## Data shapes (the API contract for the developer)

All types in `src/lib/types.ts`, `src/lib/data/customers.ts`, etc. Match
these one-for-one when wiring the real API; don't reshape the JSON on the
client.

```ts
Customer       // pool homeowner — id, contact, pool spec, tests, recs, purchases
WaterTest      // ph, chlorine, alk, ch, cya, phosphate (ClearCare reading format)
Recommendation // { sku, quantity, note } — output of ClearCare's chemistry model
Equipment      // pool gear; data-brand carries the OEM cascade (see DESIGN.md)
Visit          // service / test / store / delivery — kind + date + summary
Chemical       // SKU catalog from the store's POS
Campaign       // intent + customer + channel — what the token resolves to
Tenant         // pool store — name, brand color, contact, footer copy
```

## ClearCare visual DNA

The chrome is sampled from `~/Projects/clearcare-marketing-center/css/tokens.css`.
The scope is `[data-tenant]` (see `src/app/globals.css`) — anything inside the
`/r/*` routes gets:

- Open Sans typography
- Soft surface `#f6f8fa` background
- White cards with 10px radius and soft shadow
- Cyan→green gradient on hero card heads (the signature ClearCare move)
- KPI tiles (pink, cyan, orange, green) for status-bearing numbers
- Soft blue pill style for callouts

The tenant accent color (per-store, set in `src/lib/data/tenants.ts`) appears
on the logo mark and on the second card head of each landing. Everything
else stays platform-consistent. This is the partner-controls-chrome,
tenant-controls-identity model.

## Adding a new tenant

1. Add an entry to `TENANTS` in `src/lib/data/tenants.ts`:

```ts
"newstore": {
  slug: "newstore",
  name: "Cocoa Beach Pools",
  brandColor: "#1F5C8B",
  brandSoft: "#DDE8F4",
  logoMark: "C",
  city: "Cocoa Beach, FL",
  phone: "321-555-0188",
  contact: "hello@newstore.poolgo.co",
  footer: "Cocoa Beach Pools · 321-555-0188 · Reply STOP to opt out.",
}
```

2. That's it — `/r/newstore/[token]` will resolve. No new components needed.

## Adding a new campaign intent

1. Add the intent value to the `Intent` union in `src/lib/data/campaigns.ts`.
2. Create a `<NewIntent>Landing.tsx` in `src/components/landings/` following
   the pattern in `CYAHighLanding.tsx`. Reuse `Intro`, `RecordSeed`,
   `Spacer`, `SpacerLg` from that file.
3. Add a case to the switch in `src/app/r/[tenant]/[token]/page.tsx`.
4. Add a demo token to `CAMPAIGNS` and `TOKEN_INDEX` so it shows on `/demo`.

## What to swap when going to production

| Demo behavior                            | Production behavior                          |
|------------------------------------------|----------------------------------------------|
| Slug tokens (`cya-glenn`)                | Signed JWTs, decoded server-side             |
| `getCustomer(id)` from `Record`          | DB / API fetch                               |
| `equipmentFor()`, `visitsFor()`          | DB / API fetch                               |
| Static `CHEMICALS` map                   | Per-tenant product catalog from POS sync     |
| Hardcoded "demo today" (2026-05-22)      | `new Date()`                                 |
| Action buttons that go nowhere (`href="#"`) | Real booking / shop / pay-link URLs       |
| Recipient pill in header                 | Real session / opt-in confirmation           |

## What's deliberately not built yet

- Account claim / persistent identity beyond the token (no login flow)
- Push notifications / PWA install ("add to home screen")
- Camera-scan ingestion for non-API partners (Leslie's receipts, etc.)
- The poolgo.co marketing landing page (copy is in `MARKETING_PAGE.md`)
- Non-ClearCare platform DNA (Skimmer skin, etc.) — single-platform demo
- The full PoolGo internal prototype surfaces (Care, Equipment, Routines, Folks, Inbox) — those live under `/folks` etc. on `main` and are unrelated to this branch

## Files of interest

- `src/app/r/[tenant]/[token]/page.tsx` — dispatch by intent
- `src/app/r/[tenant]/[token]/layout.tsx` — tenant chrome wrapper, CSS-var cascade
- `src/components/landings/*` — one file per campaign intent + the aggregator
- `src/components/cc/*` — shared ClearCare-DNA primitives (Card, KPITile, Pill, CTA)
- `src/components/TenantHeader.tsx`, `TenantFooter.tsx` — tenant chrome
- `src/lib/data/*` — every mock fixture, types live in same files
- `src/app/globals.css` — `[data-tenant]` scope with ClearCare tokens
- `src/app/demo/page.tsx` — internal demo index

## Branding cross-references

- Visual DNA source: `~/Projects/clearcare-marketing-center/css/tokens.css`
- PoolGo design system: `DESIGN.md` at repo root (token YAML + 8 prose sections)
- Marketing page copy: `MARKETING_PAGE.md` at repo root
- Project history: `CLAUDE.md` at repo root
