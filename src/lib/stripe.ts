import Stripe from "stripe";
import prisma from "./prisma";
import { addTokens } from "./tokens";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
  apiVersion: "2026-03-25.dahlia",
});

export async function createCheckoutSession(
  userId: string,
  packageId: string,
  currency: "try" | "usd" = "try"
): Promise<string> {
  const pkg = await prisma.tokenPackage.findUnique({
    where: { id: packageId },
  });

  if (!pkg || !pkg.active) {
    throw new Error("Paket bulunamadi veya aktif degil");
  }

  const priceId =
    currency === "try" ? pkg.stripePriceIdTRY : pkg.stripePriceIdUSD;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      priceId
        ? { price: priceId, quantity: 1 }
        : {
            price_data: {
              currency,
              product_data: {
                name: `${pkg.name} - ${pkg.photoTokens} Fotoğraf, ${pkg.videoTokens} Video Token`,
                description: pkg.description || undefined,
              },
              unit_amount: Math.round(
                (currency === "try" ? pkg.priceTRY : pkg.priceUSD) * 100
              ),
            },
            quantity: 1,
          },
    ],
    metadata: {
      userId,
      packageId,
      photoTokens: pkg.photoTokens.toString(),
      videoTokens: pkg.videoTokens.toString(),
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/tokenler?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/tokenler?cancelled=true`,
  });

  return session.url!;
}

export async function handleWebhook(
  body: string,
  signature: string
): Promise<void> {
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { userId, packageId, photoTokens, videoTokens } = session.metadata!;

    await addTokens(
      userId,
      parseInt(photoTokens),
      parseInt(videoTokens),
      "PURCHASE",
      `${photoTokens} fotoğraf, ${videoTokens} video token satin alindi`
    );
  }
}
