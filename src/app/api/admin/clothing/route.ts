import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function checkAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return false;
  const session = await prisma.adminSession.findFirst({
    where: { token, expiresAt: { gt: new Date() } },
  });
  return !!session;
}

export async function GET() {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }
  const items = await prisma.clothingItem.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }
  const body = await request.json();
  const item = await prisma.clothingItem.create({
    data: {
      name: body.name,
      description: body.description || null,
      category: body.category,
      gender: body.gender,
      thumbnailUrl: body.thumbnailUrl,
      fullImageUrl: body.fullImageUrl,
      tags: JSON.stringify(body.tags || []),
      active: body.active ?? true,
      sortOrder: body.sortOrder ?? 0,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
