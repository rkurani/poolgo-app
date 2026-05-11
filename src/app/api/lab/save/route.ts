import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SPRITES_DIR = path.join(process.cwd(), "public", "assets", "canvas", "sprites");

export async function POST(req: Request) {
  let body: { dataUrl?: string; name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const dataUrl = body.dataUrl || "";
  const rawName = (body.name || "").trim();

  const match = dataUrl.match(/^data:image\/(png|jpe?g|webp);base64,(.+)$/);
  if (!match) {
    return NextResponse.json({ error: "Invalid data URL" }, { status: 400 });
  }

  const ext = match[1] === "jpeg" ? "jpg" : match[1];
  const buf = Buffer.from(match[2], "base64");
  const safeName =
    (rawName || `sprite-${Date.now()}`)
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60) || `sprite-${Date.now()}`;

  const fileName = `${safeName}.${ext}`;
  await mkdir(SPRITES_DIR, { recursive: true });
  await writeFile(path.join(SPRITES_DIR, fileName), buf);
  return NextResponse.json({
    path: `/assets/canvas/sprites/${fileName}`,
    name: fileName,
    bytes: buf.length,
  });
}
