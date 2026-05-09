#!/usr/bin/env node
/**
 * Reads DESIGN.md, parses YAML frontmatter, and writes
 * src/app/design-tokens.css containing a Tailwind v4 @theme block.
 *
 * The DESIGN.md tokens are the source of truth. Every Tailwind class
 * (bg-pool, text-pentair, font-display, etc.) resolves through this
 * generated file. If DESIGN.md changes, run `npm run design:tokens`.
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import yaml from "yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DESIGN_PATH = resolve(__dirname, "../DESIGN.md");
const OUTPUT_PATH = resolve(__dirname, "../src/app/design-tokens.css");

const raw = await readFile(DESIGN_PATH, "utf8");
const fm = raw.match(/^---\n([\s\S]*?)\n---\n/);
if (!fm) {
  console.error("[design-tokens] no YAML frontmatter found in DESIGN.md");
  process.exit(1);
}

const tokens = yaml.parse(fm[1]);

const lines = [
  "/* AUTO-GENERATED from DESIGN.md — do not edit by hand. */",
  '/* Run: npm run design:tokens */',
  "",
  "@theme {",
];

// colors
if (tokens.colors) {
  lines.push("  /* colors */");
  for (const [name, value] of Object.entries(tokens.colors)) {
    const resolved = resolveRef(value, tokens);
    lines.push(`  --color-${name}: ${resolved};`);
  }
  lines.push("");
}

// typography
if (tokens.typography) {
  lines.push("  /* typography (font-size pairs and font-family) */");
  const families = new Set();
  for (const [name, t] of Object.entries(tokens.typography)) {
    if (t.fontFamily) families.add(t.fontFamily);
    const fs = t.fontSize ?? "inherit";
    const lh = t.lineHeight !== undefined ? `, ${t.lineHeight}` : "";
    const fw = t.fontWeight !== undefined ? `, ${t.fontWeight}` : "";
    const ls =
      t.letterSpacing !== undefined ? `, ${t.letterSpacing}` : "";
    lines.push(`  --text-${name}: ${fs}${lh}${fw}${ls};`);
  }
  let i = 0;
  for (const fam of families) {
    const safe = fam.toLowerCase().replace(/\s+/g, "-");
    lines.push(`  --font-${safe}: "${fam}", system-ui, sans-serif;`);
    if (i === 0) lines.push(`  --font-sans: "${fam}", system-ui, sans-serif;`);
    i++;
  }
  lines.push("");
}

// spacing
if (tokens.spacing) {
  lines.push("  /* spacing */");
  for (const [name, value] of Object.entries(tokens.spacing)) {
    if (name === "base") continue; // tailwind reserves --spacing
    const v = typeof value === "number" ? `${value}px` : value;
    lines.push(`  --spacing-${name}: ${v};`);
  }
  lines.push("");
}

// rounded
if (tokens.rounded) {
  lines.push("  /* rounded */");
  for (const [name, value] of Object.entries(tokens.rounded)) {
    const v = typeof value === "number" ? `${value}px` : value;
    lines.push(`  --radius-${name}: ${v};`);
  }
  lines.push("");
}

lines.push("}");
lines.push("");

await writeFile(OUTPUT_PATH, lines.join("\n"), "utf8");
console.log(
  `[design-tokens] wrote ${OUTPUT_PATH} (${tokens.colors ? Object.keys(tokens.colors).length : 0} colors, ${
    tokens.typography ? Object.keys(tokens.typography).length : 0
  } typography, ${tokens.spacing ? Object.keys(tokens.spacing).length : 0} spacing, ${
    tokens.rounded ? Object.keys(tokens.rounded).length : 0
  } radii)`,
);

function resolveRef(value, root) {
  if (typeof value !== "string") return String(value);
  const m = value.match(/^\{([^}]+)\}$/);
  if (!m) return value;
  const path = m[1].split(".");
  let cur = root;
  for (const part of path) {
    if (!cur || typeof cur !== "object") return value;
    cur = cur[part];
  }
  return resolveRef(cur, root);
}
