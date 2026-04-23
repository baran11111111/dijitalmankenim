import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const gender = searchParams.get("gender");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = { active: true };
  if (category && category !== "tumu") where.category = category;
  if (gender && gender !== "tumu") where.gender = gender;

  const items = await prisma.clothingItem.findMany({
    where,
    orderBy: { sortOrder: "asc" },
  });

  // Arama filtresi
  const filtered = search
    ? items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.includes(search.toLowerCase())
      )
    : items;

  return NextResponse.json(filtered);
}
