import { NextResponse } from "next/server";
import { PixelLabClient } from "@pixellab-code/pixellab";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  let body: { prompt?: string; size?: number; mode?: "pixflux" | "bitforge" };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const prompt = (body.prompt || "").trim();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }
  const size = Math.max(32, Math.min(200, Number(body.size) || 96));

  try {
    const client = new PixelLabClient(key);
    const response = await client.generateImagePixflux({
      description: prompt,
      imageSize: { width: size, height: size },
    });
    const dataUrl = response.image.dataUrl;
    return NextResponse.json({ dataUrl, size, prompt });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
