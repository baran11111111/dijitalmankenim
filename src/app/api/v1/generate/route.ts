import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { checkAndDeductTokens } from "@/lib/tokens";
import { generateSchema } from "@/lib/validations";
import { generatePhoto, generateVideo } from "@/lib/ai";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const apiKey = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!apiKey) {
    return NextResponse.json({ error: "API key gerekli" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { apiKey },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "Gecersiz API key" }, { status: 401 });
  }

  const payload = generateSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const template = await prisma.mankenTemplate.findUnique({
    where: { id: payload.data.templateId },
  });
  const templateImageUrl =
    template?.fullImageUrl ||
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&auto=format&fit=crop";
  const templateVideoUrl = template?.videoUrl || templateImageUrl;

  const photoCost = payload.data.type === "PHOTO" ? 1 : 0;
  const videoCost = payload.data.type === "VIDEO" ? 1 : 0;
  const deducted = await checkAndDeductTokens(user.id, photoCost, videoCost);
  if (!deducted) {
    return NextResponse.json({ error: "Yetersiz token" }, { status: 402 });
  }

  const generation = await prisma.generation.create({
    data: {
      userId: user.id,
      templateId: payload.data.templateId,
      inputImageUrl: payload.data.inputImageUrl,
      type: payload.data.type,
      tokensUsed: payload.data.type === "VIDEO" ? videoCost : photoCost,
      status: "PROCESSING",
    },
  });

  try {
    const result =
      payload.data.type === "VIDEO"
        ? await generateVideo({
            templateVideoUrl,
            productImageUrl: payload.data.inputImageUrl,
          })
        : await generatePhoto({
            templateImageUrl,
            productImageUrl: payload.data.inputImageUrl,
            category: payload.data.category as "tops" | "bottoms" | "one-pieces",
          });

    await prisma.generation.update({
      where: { id: generation.id },
      data: {
        status: "COMPLETED",
        outputImageUrl: payload.data.type === "PHOTO" ? result.outputUrl : null,
        outputVideoUrl: payload.data.type === "VIDEO" ? result.outputUrl : null,
        processingTime: result.processingTime,
      },
    });
  } catch (error) {
    await prisma.generation.update({
      where: { id: generation.id },
      data: {
        status: "FAILED",
        errorMessage: error instanceof Error ? error.message : "Uretim hatasi",
      },
    });
  }

  return NextResponse.json({ id: generation.id });
}
