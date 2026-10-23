import { createHash } from "crypto";
import { cookies } from "next/headers";
import { get, list } from "@vercel/blob";

export const TALEP_PREFIX = "talepler/";
export const OTURUM_COOKIE = "talep_oturum";

export type Talep = {
  id: string;
  olusturma: string;
  instagram: string;
  telefon: string;
  kategori: string;
  not: string;
  fotolar: string[];
};

export function oturumDegeri() {
  const sifre = process.env.TALEP_SIFRE;
  if (!sifre) return null;
  return createHash("sha256").update(`dm-talepler:${sifre}`).digest("hex");
}

export async function oturumAcikMi() {
  const beklenen = oturumDegeri();
  if (!beklenen) return false;
  const store = await cookies();
  return store.get(OTURUM_COOKIE)?.value === beklenen;
}

// Tüm talepleri en yeniden eskiye doğru getirir
export async function talepleriGetir(): Promise<Talep[]> {
  const bilgiler: string[] = [];
  let cursor: string | undefined;
  do {
    const sayfa = await list({ prefix: TALEP_PREFIX, cursor, limit: 1000 });
    bilgiler.push(
      ...sayfa.blobs.filter((b) => b.pathname.endsWith("/bilgi.json")).map((b) => b.pathname)
    );
    cursor = sayfa.hasMore ? sayfa.cursor : undefined;
  } while (cursor);

  const talepler = await Promise.all(
    bilgiler.map(async (pathname) => {
      const sonuc = await get(pathname, { access: "private" });
      if (!sonuc || sonuc.statusCode !== 200) return null;
      return JSON.parse(await new Response(sonuc.stream).text()) as Talep;
    })
  );

  return talepler
    .filter((t): t is Talep => t !== null)
    .sort((a, b) => b.olusturma.localeCompare(a.olusturma));
}
