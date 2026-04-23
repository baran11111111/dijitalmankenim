import { access, readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

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

const imageMap: Record<string, string> = {
  "image-copy": "image copy.png",
  "demo-product-model": "__gemini__",
  "demo-product-model-start": "__gemini_start__",
  "demo-change-pose": "__gemini_pose__",
  "demo-change-background": "__gemini_background__",
  "demo-edit": "__gemini_edit__",
  "demo-model-swap": "__gemini_model_swap__",
  "demo-extra": "image copy 7.png",
  "demo-base": "image.png",
  "demo-product-model-gemini": "__gemini__",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  if (!(type in imageMap)) {
    return NextResponse.json({ error: "Unknown media type" }, { status: 400 });
  }

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
                : join(mediaDir, imageMap[type]);

    await access(imagePath);
    const file = await readFile(imagePath);
    const base64 = file.toString("base64");
    return NextResponse.json({
      mimeType: "image/png",
      src: `data:image/png;base64,${base64}`,
    }, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
}
