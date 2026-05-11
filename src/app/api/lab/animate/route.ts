import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SPRITES_DIR = path.join(process.cwd(), "public", "assets", "canvas", "sprites");
const PIXELLAB_BASE = "https://api.pixellab.ai/v1";

type Body = {
  description?: string;
  action?: string;
  referenceFileId?: string;
  size?: number;
  nFrames?: number;
  view?: string;
  direction?: string;
};

export async function POST(req: Request) {
  const key = process.env.PIXELLAB_SECRET;
  if (!key) {
    return NextResponse.json(
      { error: "PIXELLAB_SECRET not set. Add it to .env.local." },
      { status: 500 }
    );
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const description = (body.description || "").trim();
  const action = (body.action || "walking").trim();
  if (!description) {
    return NextResponse.json({ error: "description is required" }, { status: 400 });
  }
  const refId = (body.referenceFileId || "").replace(/[^a-z0-9-_]/gi, "");
  if (!refId) {
    return NextResponse.json({ error: "referenceFileId required" }, { status: 400 });
  }
  // animateWithText caps frame size at 64x64 (server limit), regardless of
  // master sprite size. Force this regardless of caller intent.
  const size = 64;
  const nFrames = Math.max(2, Math.min(20, Number(body.nFrames) || 4));

  try {
    const refPath = path.join(SPRITES_DIR, `${refId}.png`);
    const buf = await readFile(refPath);
    // PixelLab's animate-with-text requires reference == frame size (64x64).
    // Downscale the master sprite to 64 via sharp with nearest-neighbor so
    // we keep the chunky pixel edges sharp instead of blurring.
    const resized = await sharp(buf)
      .resize(size, size, { kernel: "nearest", fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    const referenceBase64 = resized.toString("base64");

    // Direct API call so we see the raw response body on validation errors
    const requestData = {
      image_size: { width: size, height: size },
      description,
      action,
      view: body.view || "side",
      direction: body.direction || "east",
      n_frames: nFrames,
      reference_image: { type: "base64", base64: referenceBase64, format: "png" },
    };

    const resp = await fetch(`${PIXELLAB_BASE}/animate-with-text`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!resp.ok) {
      let detail: unknown;
      try {
        detail = await resp.json();
      } catch {
        detail = await resp.text();
      }
      // Show the real PixelLab API error in the response
      return NextResponse.json(
        {
          error: `PixelLab ${resp.status} ${resp.statusText}`,
          detail,
        },
        { status: resp.status }
      );
    }

    const data = await resp.json();
    const frames: string[] = (data.images || []).map(
      (img: { base64: string; format?: string }) =>
        `data:image/${img.format || "png"};base64,${img.base64}`
    );

    return NextResponse.json({
      frames,
      nFrames: frames.length,
      size,
      description,
      action,
      referenceFileId: refId,
      usage: data.usage,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
