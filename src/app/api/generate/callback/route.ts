import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-callback-secret");
  if (secret !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const body = await request.json();
  const { generationId, outputUrl, errorMessage, processingTime, type } = body as {
    generationId?: string;
    outputUrl?: string;
    errorMessage?: string;
    processingTime?: number;
    type?: "PHOTO" | "VIDEO";
  };

  if (!generationId) {
    return NextResponse.json({ error: "generationId gerekli" }, { status: 400 });
  }

  await prisma.generation.update({
    where: { id: generationId },
    data: {
      status: errorMessage ? "FAILED" : "COMPLETED",
      outputImageUrl: !errorMessage && type !== "VIDEO" ? outputUrl : null,
      outputVideoUrl: !errorMessage && type === "VIDEO" ? outputUrl : null,
      errorMessage: errorMessage || null,
      processingTime: processingTime || null,
    },
  });

  return NextResponse.json({ ok: true });
}
