import { NextRequest, NextResponse } from "next/server";
import { handleWebhook } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Eksik imza" }, { status: 400 });
  }

  const body = await request.text();
  await handleWebhook(body, signature);
  return NextResponse.json({ received: true });
}
