import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
  }

  const [users, generations, revenue] = await Promise.all([
    prisma.user.count(),
    prisma.generation.count(),
    prisma.tokenTransaction.aggregate({
      _sum: { photoAmount: true, videoAmount: true },
      where: { type: "PURCHASE" },
    }),
  ]);

  return NextResponse.json({
    users,
    generations,
    revenueTokens: (revenue._sum.photoAmount ?? 0) + (revenue._sum.videoAmount ?? 0),
  });
}
