import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "E-posta ve şifre gerekli" }, { status: 400 });
  }

  // Kullanıcı bul
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.role !== "ADMIN" || !user.password) {
    return NextResponse.json({ error: "Yetersiz yetki veya kullanıcı bulunamadı" }, { status: 401 });
  }

  // Şifre kontrol
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "E-posta veya şifre hatalı" }, { status: 401 });
  }

  // Oturum token oluştur
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 gün

  await prisma.adminSession.create({
    data: { token, email: user.email!, expiresAt },
  });

  // Cookie set
  const cookieStore = await cookies();
  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return NextResponse.json({ success: true, name: user.name });
}

export async function DELETE() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (token) {
    await prisma.adminSession.deleteMany({ where: { token } }).catch(() => {});
    cookieStore.delete("admin_token");
  }
  return NextResponse.json({ success: true });
}
