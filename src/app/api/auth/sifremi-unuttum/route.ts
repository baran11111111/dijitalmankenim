import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendResetPasswordEmail } from "@/lib/mail";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ error: "Gecerli bir e-posta girin." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Kullanıcı yoksa bile basari donuyoruz (Email enumeration onleme)
  if (!user) {
    return NextResponse.json({ ok: true });
  }

  // Eski token'lari sil, yeni olustur
  await prisma.passwordResetToken.deleteMany({ where: { email } });

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 saat

  await prisma.passwordResetToken.create({
    data: { email, token, expiresAt },
  });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const resetLink = `${appUrl}/sifre-sifirla/${token}`;

  await sendResetPasswordEmail(email, resetLink);

  return NextResponse.json({ ok: true });
}
