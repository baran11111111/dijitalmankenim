import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const templates = await prisma.mankenTemplate.findMany({
    where: { active: true },
    select: {
      id: true,
      name: true,
      category: true,
      gender: true,
      thumbnailUrl: true,
      fullImageUrl: true,
      isVideo: true,
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ templates });
}
