import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { tokenPurchaseSchema } from "@/lib/validations";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const payload = tokenPurchaseSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const url = await createCheckoutSession(
    session.user.id,
    payload.data.packageId,
    payload.data.currency
  );
  return NextResponse.json({ checkoutUrl: url });
}
