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

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  const { id } = await params;
  const item = await prisma.clothingItem.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  const item = await prisma.clothingItem.update({
    where: { id },
    data: {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.gender !== undefined && { gender: body.gender }),
      ...(body.thumbnailUrl !== undefined && { thumbnailUrl: body.thumbnailUrl }),
      ...(body.fullImageUrl !== undefined && { fullImageUrl: body.fullImageUrl }),
      ...(body.tags !== undefined && { tags: JSON.stringify(body.tags) }),
      ...(body.active !== undefined && { active: body.active }),
      ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder }),
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  const { id } = await params;
  await prisma.clothingItem.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
