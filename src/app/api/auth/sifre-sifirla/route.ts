import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const { token, password } = await request.json();

  if (!token || !password || password.length < 6) {
    return NextResponse.json({ error: "Gecersiz istek." }, { status: 400 });
  }

  const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });

  if (!resetToken || resetToken.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "Link gecersiz veya suresi dolmus. Lutfen tekrar talep edin." },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.update({
    where: { email: resetToken.email },
    data: { password: hashed },
  });

  await prisma.passwordResetToken.delete({ where: { token } });

  return NextResponse.json({ ok: true });
}
