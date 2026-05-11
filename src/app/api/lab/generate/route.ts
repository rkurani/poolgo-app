import { NextResponse } from "next/server";
import path from "node:path";
import { PixelLabClient, Base64Image } from "@pixellab-code/pixellab";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SPRITES_DIR = path.join(process.cwd(), "public", "assets", "canvas", "sprites");

type Body = {
  prompt?: string;
  size?: number;
  mode?: "pixflux" | "bitforge";
  styleFileId?: string; // canonical sprite id, e.g. "lounger-guest-sitting"
  styleStrength?: number; // 0-100, default 65 for variants
};

export async function POST(req: Request) {
  const key = process.env.PIXELLAB_SECRET;
  if (!key) {
    return NextResponse.json(
      {
        error:
          "PIXELLAB_SECRET not set. Add it to .env.local (get one at pixellab.ai → Account → API).",
      },
      { status: 500 }
    );
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const prompt = (body.prompt || "").trim();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }
  const size = Math.max(32, Math.min(400, Number(body.size) || 96));
  const mode = body.mode === "bitforge" ? "bitforge" : "pixflux";

  try {
    const client = new PixelLabClient(key);
    let response;
    if (mode === "bitforge") {
      const styleId = (body.styleFileId || "").replace(/[^a-z0-9-_]/gi, "");
      if (!styleId) {
        return NextResponse.json(
          { error: "Bitforge mode requires styleFileId (the master sprite id)" },
          { status: 400 }
        );
      }
      const stylePath = path.join(SPRITES_DIR, `${styleId}.png`);
      const styleImage = await Base64Image.fromFile(stylePath);
      response = await client.generateImageBitforge({
        description: prompt,
        imageSize: { width: size, height: size },
        styleImage,
        styleStrength: Math.max(0, Math.min(100, Number(body.styleStrength) || 65)),
        noBackground: true,
      });
    } else {
      response = await client.generateImagePixflux({
        description: prompt,
        imageSize: { width: size, height: size },
        noBackground: true,
      });
    }
    return NextResponse.json({ dataUrl: response.image.dataUrl, size, prompt, mode });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
