import { get } from "@vercel/blob";
import { TALEP_PREFIX, oturumAcikMi } from "@/lib/talepler";

// Gizli depodaki talep fotoğrafını yalnızca oturum açmış yöneticiye gösterir
export async function GET(request: Request) {
  if (!(await oturumAcikMi())) {
    return new Response("Yetkisiz", { status: 401 });
  }

  const pathname = new URL(request.url).searchParams.get("p") ?? "";
  if (!pathname.startsWith(TALEP_PREFIX) || pathname.includes("..")) {
    return new Response("Bulunamadı", { status: 404 });
  }

  const sonuc = await get(pathname, { access: "private" });
  if (!sonuc || sonuc.statusCode !== 200) {
    return new Response("Bulunamadı", { status: 404 });
  }

  return new Response(sonuc.stream, {
    headers: {
      "Content-Type": sonuc.blob.contentType,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
