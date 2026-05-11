import { NextResponse } from "next/server";
import path from "node:path";
import { PixelLabClient, Base64Image } from "@pixellab-code/pixellab";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SPRITES_DIR = path.join(process.cwd(), "public", "assets", "canvas", "sprites");

type Body = {
  description?: string;
  action?: string;
  referenceFileId?: string; // canonical id of the master sprite
  size?: number;
  nFrames?: number;
  view?: "side" | "low top-down" | "high top-down";
  direction?: "south" | "east" | "north" | "west";
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
    return NextResponse.json(
      { error: "referenceFileId is required (id of the master sprite on disk)" },
      { status: 400 }
    );
  }
  const size = Math.max(32, Math.min(400, Number(body.size) || 96));
  const nFrames = Math.max(2, Math.min(20, Number(body.nFrames) || 4));

  try {
    const refPath = path.join(SPRITES_DIR, `${refId}.png`);
    const referenceImage = await Base64Image.fromFile(refPath);

    const client = new PixelLabClient(key);
    const response = await client.animateWithText({
      imageSize: { width: size, height: size },
      description,
      action,
      referenceImage,
      view: body.view || "side",
      direction: body.direction || "east",
      nFrames,
    });

    const frames = response.images.map((img) => img.dataUrl);
    return NextResponse.json({
      frames,
      nFrames: frames.length,
      size,
      description,
      action,
      referenceFileId: refId,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
