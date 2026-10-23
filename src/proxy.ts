import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Eski platformdan kalan, sitenin kullanmadığı sayfa ve API'ler.
// Herkese açık olmamaları için tamamen kapatıldı (404).
// Not: prisma/seed.ts içindeki varsayılan yönetici şifresi repoda açık olduğundan
// bu bölümleri yeniden açmadan önce o hesabı silin / şifresini değiştirin.
const KAPALI_YOLLAR = [
  "/dashboard",
  "/admin",
  "/yonetim",
  "/giris",
  "/kayit",
  "/sifremi-unuttum",
  "/sifre-sifirla",
  "/fiyatlandirma",
  "/api/admin",
  "/api/auth",
  "/api/clothing",
  "/api/gallery",
  "/api/generate",
  "/api/reference-media",
  "/api/templates",
  "/api/tokens",
  "/api/upload",
  "/api/v1",
  "/api/webhooks",
];

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const kapali = KAPALI_YOLLAR.some((yol) => path === yol || path.startsWith(`${yol}/`));

  if (kapali) {
    return new NextResponse("Bulunamadı", {
      status: 404,
      headers: { "X-Robots-Tag": "noindex" },
    });
  }

  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}

export const config = {
  // Statik dosyalar ve görseller hariç tüm istekler
  matcher: ["/((?!_next/static|_next/image|images/|videos/|favicon|icon|opengraph-image|.*\\.(?:png|jpg|jpeg|svg|webp|mp4)$).*)"],
};
