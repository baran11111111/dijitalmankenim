import { createReadStream } from "fs";
import { access, readFile, stat } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { Readable } from "stream";

const mediaDir = join(process.cwd(), "gorseller");
const geminiImagePath = join(
  process.cwd(),
  "Gemini_Generated_Image_d7gw2pd7gw2pd7gw.png"
);
const geminiPoseImagePath = join(
  process.cwd(),
  "Gemini_Generated_Image_fqopj7fqopj7fqop.png"
);
const geminiBackgroundImagePath = join(
  process.cwd(),
  "Gemini_Generated_Image_548v5u548v5u548v.png"
);
const geminiEditImagePath = join(
  process.cwd(),
  "Gemini_Generated_Image_z11h4pz11h4pz11h.png"
);
const geminiModelSwapImagePath = join(
  process.cwd(),
  "Gemini_Generated_Image_fzoqbvfzoqbvfzoq.png"
);
const geminiStartImagePath = join(
  process.cwd(),
  "Gemini_Generated_Image_xvomvxvomvxvomvx.png"
);
const brandLogoPath = join(process.cwd(), "image copy 5.png");
const imageMap: Record<string, string> = {
  "image-copy": "image copy.png",
  "brand-logo": "__brand_logo__",
  "demo-product-model": "__gemini__",
  "demo-product-model-start": "__gemini_start__",
  "demo-change-pose": "__gemini_pose__",
  "demo-change-background": "__gemini_background__",
  "demo-edit": "__gemini_edit__",
  "demo-model-swap": "__gemini_model_swap__",
  "demo-extra": "image copy 7.png",
  "demo-base": "image.png",
};
const whatsappVideoPath = join(
  process.cwd(),
  "WhatsApp Video 2026-04-13 at 22.58.35.mp4"
);
const demoVideoPath = join(
  process.cwd(),
  "Video_Üretme_İstemi_ve_Sonuç.mp4"
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;

  if (type in imageMap) {
    try {
      const imagePath =
        imageMap[type] === "__gemini__"
          ? geminiImagePath
          : imageMap[type] === "__gemini_pose__"
            ? geminiPoseImagePath
            : imageMap[type] === "__gemini_background__"
              ? geminiBackgroundImagePath
              : imageMap[type] === "__gemini_edit__"
                ? geminiEditImagePath
                : imageMap[type] === "__gemini_model_swap__"
                  ? geminiModelSwapImagePath
                  : imageMap[type] === "__gemini_start__"
                    ? geminiStartImagePath
                  : imageMap[type] === "__brand_logo__"
                    ? brandLogoPath
                  : join(mediaDir, imageMap[type]);
      await access(imagePath);
      const file = await readFile(imagePath);
      return new NextResponse(file, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "no-store",
        },
      });
    } catch {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
  }

  if (type === "whatsapp-demo" || type === "demo-make-video") {
    try {
      const selectedVideoPath =
        type === "demo-make-video" ? demoVideoPath : whatsappVideoPath;
      await access(selectedVideoPath);
      const fileStat = await stat(selectedVideoPath);
      const range = request.headers.get("range");

      if (!range) {
        const stream = createReadStream(selectedVideoPath);
        return new NextResponse(Readable.toWeb(stream) as ReadableStream, {
          status: 200,
          headers: {
            "Content-Type": "video/mp4",
            "Content-Length": fileStat.size.toString(),
            "Cache-Control": "no-store",
          },
        });
      }

      const [startText, endText] = range.replace("bytes=", "").split("-");
      const start = Number(startText);
      const end = endText ? Number(endText) : fileStat.size - 1;
      const chunkSize = end - start + 1;
      const stream = createReadStream(selectedVideoPath, { start, end });

      return new NextResponse(Readable.toWeb(stream) as ReadableStream, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize.toString(),
          "Content-Type": "video/mp4",
          "Cache-Control": "no-store",
        },
      });
    } catch {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }
  }

  return NextResponse.json({ error: "Unknown media type" }, { status: 400 });
}
