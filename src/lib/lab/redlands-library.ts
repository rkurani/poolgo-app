/**
 * Redlands sprite library.
 *
 * Two tiers:
 *   - Master: one-shot Pixflux generation, defines a character or element
 *     from scratch. The result is the canonical look.
 *   - Variant: depends on a master sprite. Generated via Bitforge using the
 *     master file as the styleImage reference, so identity transfers but the
 *     pose / scene changes. Variants can't be generated until their master is
 *     saved on disk.
 *
 * Style consistency is locked at the prefix/suffix level for masters. For
 * variants, style + identity come from the reference image; the subject
 * line describes only what changes (new pose, new action).
 */

export const STYLE_PREFIX =
  "16-bit pixel art, single isolated subject, chunky visible pixels with crisp clean edges, flat-shaded with a strictly limited palette, no anti-aliasing, no gradients, no soft brushwork. Style anchors: Stardew Valley, Eastward, Sea of Stars. Warm Redlands California palette: terracotta sand (#D4B896), deep cyan pool water (#1FA0BF), navy (#1A4F8B), citrus orange (#E8A82C), mountain shadow brown (#5C5546), bougainvillea magenta (#C75240). Subject: ";

export const STYLE_SUFFIX =
  ". No shadow on the ground, no ground line, no decoration around the subject, no signature, no text. Transparent or solid background, the subject is the only thing that matters.";

export type LibraryCategory = "character" | "tree" | "plant" | "object";

export type LibraryEntry = {
  id: string; // canonical filename (without extension)
  name: string;
  category: LibraryCategory;
  subject: string;
  size: number;
  intendedUse: string;
  kind: "master" | "variant";
  master?: string; // for variants: the id of the master sprite to reference
};

export const REDLANDS_LIBRARY: LibraryEntry[] = [
  // Characters
  {
    id: "lounger-guest-sitting",
    name: "Lounger guest, sitting",
    category: "character",
    kind: "master",
    size: 96,
    subject:
      "a relaxed casual man in his 30s sitting on a wooden pool lounger, side view 3/4 angle, wearing red board shorts and a tan straw sun hat, holding a glass of lemonade in his right hand, bare feet stretched out, easy posture leaning back, summer afternoon mood",
    intendedUse: "Master character. The guy already on the lounger in the macro.",
  },
  {
    id: "lounger-guest-walking",
    name: "Lounger guest, walking",
    category: "character",
    kind: "variant",
    master: "lounger-guest-sitting",
    size: 96,
    subject:
      "the same character standing and walking right, side profile, mid-stride with one leg forward, still in red board shorts and tan straw sun hat, still holding a glass of lemonade in his right hand, easy summer walk",
    intendedUse: "Walking variant. Pairs with -sitting in a 2-pose state machine.",
  },
  {
    id: "carlos-walking",
    name: "Carlos Mendoza, walking",
    category: "character",
    kind: "master",
    size: 96,
    subject:
      "a friendly Hispanic male pool service technician in his mid-50s, full body side view 3/4, walking right mid-stride, wearing a navy work shirt with a small pool service patch on the chest, tan baseball cap, short salt-and-pepper beard, faded jeans, work boots, holding a long telescoping pool skimmer pole over his shoulder",
    intendedUse: "Master character. Carlos arriving on foot from his truck.",
  },
  {
    id: "maria-portrait",
    name: "Maria Velasquez, pool builder",
    category: "character",
    kind: "master",
    size: 96,
    subject:
      "a confident Latina pool builder in her mid-40s, full body side view 3/4, standing with arms slightly out, tan canvas work pants, faded denim shirt with sleeves rolled, blue hard hat, brown work gloves at her hip, holding rolled blueprints under her left arm, sharp focused expression",
    intendedUse: "Master character. Maria, lead of Velasquez Build.",
  },

  // Trees and plants — all masters, single-shot
  {
    id: "palm-mexican-fan",
    name: "Mexican fan palm",
    category: "tree",
    kind: "master",
    size: 128,
    subject:
      "a single tall Mexican fan palm tree, full vertical composition trunk to crown, side view, tall slender brown trunk with ringed bark texture, dense crown of 8 to 10 broad green fronds radiating outward and slightly drooping, a small cluster of coconuts at the base of the crown",
    intendedUse: "Corner palms, reusable flipped for both sides.",
  },
  {
    id: "lemon-tree",
    name: "Lemon tree, foreground",
    category: "tree",
    kind: "master",
    size: 128,
    subject:
      "a single mature lemon tree, full vertical composition trunk to canopy, side view, short stocky brown trunk with darker bark, dense round canopy of dark green leaves heavy with bright yellow lemons throughout, some lemons fallen at the base",
    intendedUse: "Foreground left tree from the macro, isolated.",
  },
  {
    id: "orange-tree-navel",
    name: "Navel orange tree",
    category: "tree",
    kind: "master",
    size: 128,
    subject:
      "a single mature navel orange tree, full vertical composition trunk to canopy, side view, short brown trunk with chunky branch structure, dense round canopy of medium-green leaves with dozens of bright ripe orange fruits visible throughout the canopy",
    intendedUse: "Mid-distance tree behind the pool. Redlands' navel-orange heritage.",
  },
  {
    id: "bougainvillea-vine",
    name: "Bougainvillea, vine only",
    category: "plant",
    kind: "master",
    size: 128,
    subject:
      "an isolated bougainvillea flowering vine, no fence or supporting structure, just a tangled woody stem with dense cascading clusters of vibrant magenta, hot-pink, and deep purple papery bract flowers, dark green leaves visible between the flower clusters, vine hangs from the top and drapes downward",
    intendedUse: "Cascading vine layer for fence-side moments.",
  },
  {
    id: "agave-blue",
    name: "Blue agave accent plant",
    category: "plant",
    kind: "master",
    size: 64,
    subject:
      "a single small blue agave plant, top-down side view, rosette of about 8 to 12 thick fleshy blue-grey pointed leaves radiating outward and slightly upward, each leaf tipped with a dark thorn, no flower stalk",
    intendedUse: "Drought-tolerant ground accent at the patio edge.",
  },
];

/**
 * Full prompt for a master sprite (Pixflux): style prefix + subject + suffix.
 * Used when generating from text alone.
 */
export function masterPrompt(entry: LibraryEntry): string {
  return STYLE_PREFIX + entry.subject + STYLE_SUFFIX;
}

/**
 * Prompt for a variant sprite (Bitforge): just the subject (what's different
 * about this pose). The reference image carries the style and the character's
 * identity, so we don't need to re-describe what the character looks like.
 */
export function variantPrompt(entry: LibraryEntry): string {
  return entry.subject;
}
