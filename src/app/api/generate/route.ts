import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { generateSchema } from "@/lib/validations";
import { checkAndDeductTokens } from "@/lib/tokens";
import { generatePhoto, generateVideo } from "@/lib/ai";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const payload = generateSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const { templateId, type, inputImageUrl } = payload.data;
  const template = await prisma.mankenTemplate.findUnique({ where: { id: templateId } });
  const templateImageUrl =
    template?.fullImageUrl ||
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&auto=format&fit=crop";
  const templateVideoUrl = template?.videoUrl || templateImageUrl;

  const photoCost = type === "PHOTO" ? 1 : 0;
  const videoCost = type === "VIDEO" ? 1 : 0;
  const deducted = await checkAndDeductTokens(session.user.id, photoCost, videoCost);
  if (!deducted) {
    return NextResponse.json({ error: "Yetersiz token" }, { status: 402 });
  }

  const generation = await prisma.generation.create({
    data: {
      userId: session.user.id,
      templateId,
      inputImageUrl,
      type: type,
      tokensUsed: type === "VIDEO" ? videoCost : photoCost,
      status: "PROCESSING",
    },
  });

  try {
    const result =
      type === "VIDEO"
        ? await generateVideo({
            templateVideoUrl,
            productImageUrl: inputImageUrl,
          })
        : await generatePhoto({
            templateImageUrl,
            productImageUrl: inputImageUrl,
            category: payload.data.category as "tops" | "bottoms" | "one-pieces",
          });

    await prisma.generation.update({
      where: { id: generation.id },
      data: {
        status: "COMPLETED",
        outputImageUrl: type === "PHOTO" ? result.outputUrl : null,
        outputVideoUrl: type === "VIDEO" ? result.outputUrl : null,
        processingTime: result.processingTime,
      },
    });
  } catch (error) {
    await prisma.generation.update({
      where: { id: generation.id },
      data: {
        status: "FAILED",
        errorMessage:
          error instanceof Error ? error.message : "Uretim sirasinda hata olustu",
      },
    });
  }

  return NextResponse.json({ generationId: generation.id });
}
