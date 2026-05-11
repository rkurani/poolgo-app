/**
 * Redlands sprite library.
 *
 * Each entry is a curated asset we want for the PoolGo Redlands canvas. The
 * subject lines are tuned to keep characters consistent across regenerations;
 * the style prefix and suffix lock the pixel-art register so every sprite
 * shares palette, scale, and edge treatment.
 *
 * Workflow: open /lab/redlands → generate each → pick the keepers → save
 * (canonical name auto-applied) → the canvas picks them up.
 */

export const STYLE_PREFIX =
  "16-bit pixel art, single isolated subject, chunky visible pixels with crisp clean edges, flat-shaded with a strictly limited palette, no anti-aliasing, no gradients, no soft brushwork. Style anchors: Stardew Valley, Eastward, Sea of Stars. Warm Redlands California palette: terracotta sand (#D4B896), deep cyan pool water (#1FA0BF), navy (#1A4F8B), citrus orange (#E8A82C), mountain shadow brown (#5C5546), bougainvillea magenta (#C75240). Subject: ";

export const STYLE_SUFFIX =
  ". Background: solid pure magenta (#FF00FF) for chroma-key removal. No shadow on the ground, no ground line, no decoration around the subject, no signature, no text.";

export type LibraryCategory = "character" | "tree" | "plant" | "object";

export type LibraryEntry = {
  id: string; // canonical filename (without extension)
  name: string; // human label
  category: LibraryCategory;
  subject: string; // the variable piece of the prompt
  size: number; // square px
  intendedUse: string; // where this sprite lands once integrated
};

export const REDLANDS_LIBRARY: LibraryEntry[] = [
  // Characters
  {
    id: "lounger-guest-sitting",
    name: "Lounger guest, sitting",
    category: "character",
    size: 96,
    subject:
      "a relaxed casual man in his 30s sitting on a wooden pool lounger, side view 3/4 angle, wearing red board shorts and a tan straw sun hat, holding a glass of lemonade in his right hand, bare feet stretched out, easy posture leaning back, summer afternoon mood",
    intendedUse: "The guy already on the lounger in the macro. Separable version for waving / interactive moments.",
  },
  {
    id: "lounger-guest-walking",
    name: "Lounger guest, walking",
    category: "character",
    size: 96,
    subject:
      "the same casual man from the lounger sprite, now standing and walking right, side profile, red board shorts and tan straw sun hat, mid-stride with one leg forward, holding a glass of lemonade in his right hand, easy summer walk",
    intendedUse: "Walking variant for the get-up-and-fetch state machine. Pair with -sitting for swap-frame motion.",
  },
  {
    id: "carlos-walking",
    name: "Carlos Mendoza, walking",
    category: "character",
    size: 96,
    subject:
      "a friendly Hispanic male pool service technician in his mid-50s, full body side view 3/4, walking right mid-stride, wearing a navy work shirt with a small pool service patch on the chest, tan baseball cap, short salt-and-pepper beard, faded jeans, work boots, holding a long telescoping pool skimmer pole over his shoulder",
    intendedUse: "Carlos arriving at the property. Could walk in from the street to the pad on a state machine.",
  },
  {
    id: "maria-portrait",
    name: "Maria Velasquez, pool builder",
    category: "character",
    size: 96,
    subject:
      "a confident Latina pool builder in her mid-40s, full body side view 3/4, standing with arms slightly out, tan canvas work pants, faded denim shirt with sleeves rolled, blue hard hat, brown work gloves at her hip, holding rolled blueprints under her left arm, sharp focused expression",
    intendedUse: "Maria, lead of Velasquez Build. Used in /folks/maria-velasquez if we ever build that profile.",
  },

  // Trees and plants
  {
    id: "palm-mexican-fan",
    name: "Mexican fan palm",
    category: "tree",
    size: 128,
    subject:
      "a single tall Mexican fan palm tree, full vertical composition trunk to crown, side view, tall slender brown trunk with ringed bark texture, dense crown of 8 to 10 broad green fronds radiating outward and slightly drooping, a small cluster of coconuts at the base of the crown",
    intendedUse: "Left and right corner palms if we ever layer the canvas. Reuse one PNG flipped for the right side.",
  },
  {
    id: "lemon-tree",
    name: "Lemon tree, foreground",
    category: "tree",
    size: 128,
    subject:
      "a single mature lemon tree, full vertical composition trunk to canopy, side view, short stocky brown trunk with darker bark, dense round canopy of dark green leaves heavy with bright yellow lemons throughout, some lemons fallen at the base just above the (omitted) ground level",
    intendedUse: "Foreground left tree, the one heavy with fruit in the original macro.",
  },
  {
    id: "orange-tree-navel",
    name: "Navel orange tree",
    category: "tree",
    size: 128,
    subject:
      "a single mature navel orange tree, full vertical composition trunk to canopy, side view, short brown trunk with chunky branch structure, dense round canopy of medium-green leaves with dozens of bright ripe orange fruits visible throughout the canopy, slightly smaller and less dense than a lemon tree",
    intendedUse: "Mid-distance tree behind the pool. Honors Redlands' navel-orange-capital heritage.",
  },
  {
    id: "bougainvillea-vine",
    name: "Bougainvillea, vine only",
    category: "plant",
    size: 128,
    subject:
      "an isolated bougainvillea flowering vine, no fence or supporting structure, just a tangled woody stem with dense cascading clusters of vibrant magenta, hot-pink, and deep purple papery bract flowers, dark green leaves visible between the flower clusters, vine hangs from the top and drapes downward filling the lower two thirds of the frame",
    intendedUse: "Cascading vine layer for a future fence-side moment. Pair with petal particles in CSS.",
  },
  {
    id: "agave-blue",
    name: "Blue agave accent plant",
    category: "plant",
    size: 64,
    subject:
      "a single small blue agave plant, top-down side view, rosette of about 8 to 12 thick fleshy blue-grey pointed leaves radiating outward and slightly upward from a low center, each leaf tipped with a dark thorn, no flower stalk, just the dense rosette base, drought-tolerant Mediterranean ground accent",
    intendedUse: "Ground-level accent at the patio edge for the Redlands desert-adjacent feel.",
  },
];

export function fullPrompt(entry: LibraryEntry): string {
  return STYLE_PREFIX + entry.subject + STYLE_SUFFIX;
}
