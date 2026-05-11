import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SPRITES_DIR = path.join(process.cwd(), "public", "assets", "canvas", "sprites");

/**
 * Save a walk-cycle as a single horizontal sprite sheet.
 * Input: array of data URLs (one per frame), all same size.
 * Output: one PNG with frames laid out left to right.
 * Plus a small JSON sidecar so the canvas knows frame count + size.
 */
export async function POST(req: Request) {
  let body: { frames?: string[]; name?: string; frameSize?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const frames = Array.isArray(body.frames) ? body.frames : [];
  if (frames.length < 2) {
    return NextResponse.json({ error: "At least 2 frames required" }, { status: 400 });
  }
  const rawName = (body.name || "").trim();
  if (!rawName) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }
  const safeName =
    rawName
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60) || `walkcycle-${Date.now()}`;

  try {
    // Decode each frame
    const buffers: Buffer[] = [];
    for (const dataUrl of frames) {
      const match = dataUrl.match(/^data:image\/(png|jpe?g|webp);base64,(.+)$/);
      if (!match) {
        return NextResponse.json({ error: "Invalid data URL in frames" }, { status: 400 });
      }
      buffers.push(Buffer.from(match[2], "base64"));
    }

    // Read metadata of the first frame to know size
    const meta = await sharp(buffers[0]).metadata();
    const frameW = meta.width || body.frameSize || 96;
    const frameH = meta.height || frameW;

    // Combine into one horizontal sheet: frames * frameW wide, frameH tall
    const sheetW = frameW * frames.length;
    const composite = await sharp({
      create: {
        width: sheetW,
        height: frameH,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite(
        buffers.map((buf, i) => ({
          input: buf,
          left: i * frameW,
          top: 0,
        }))
      )
      .png()
      .toBuffer();

    await mkdir(SPRITES_DIR, { recursive: true });
    const sheetPath = path.join(SPRITES_DIR, `${safeName}.png`);
    await writeFile(sheetPath, composite);

    // Sidecar so consumers know frame metadata
    const meta_out = {
      name: safeName,
      frames: frames.length,
      frameWidth: frameW,
      frameHeight: frameH,
      sheetWidth: sheetW,
      sheetHeight: frameH,
    };
    await writeFile(path.join(SPRITES_DIR, `${safeName}.json`), JSON.stringify(meta_out, null, 2));

    return NextResponse.json({
      path: `/assets/canvas/sprites/${safeName}.png`,
      meta: meta_out,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
