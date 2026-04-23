import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const { id } = await Promise.resolve(params);
  const generation = await prisma.generation.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!generation) {
    return NextResponse.json({ error: "Uretim bulunamadi" }, { status: 404 });
  }

  return NextResponse.json(generation);
}
