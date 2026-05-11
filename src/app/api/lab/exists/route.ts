import { NextResponse } from "next/server";
import { stat } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SPRITES_DIR = path.join(process.cwd(), "public", "assets", "canvas", "sprites");

export async function POST(req: Request) {
  let body: { ids?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const ids = Array.isArray(body.ids) ? body.ids : [];
  const result: Record<string, { exists: boolean; mtime?: number }> = {};
  for (const id of ids) {
    const safe = String(id).replace(/[^a-z0-9-_]/gi, "");
    if (!safe) {
      result[id] = { exists: false };
      continue;
    }
    try {
      const s = await stat(path.join(SPRITES_DIR, `${safe}.png`));
      result[id] = { exists: true, mtime: s.mtimeMs };
    } catch {
      result[id] = { exists: false };
    }
  }
  return NextResponse.json({ result });
}
