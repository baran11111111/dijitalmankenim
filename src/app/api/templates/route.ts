import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { templateSchema } from "@/lib/validations";

export async function GET() {
  const templates = await prisma.mankenTemplate.findMany({
    where: { active: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ templates });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
  }

  const payload = templateSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const template = await prisma.mankenTemplate.create({ 
    data: {
      ...payload.data,
      tags: payload.data.tags.join(","),
    } 
  });
  return NextResponse.json({ template }, { status: 201 });
}
