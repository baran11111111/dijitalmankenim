import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { timingSafeEqual } from "crypto";
import {
  OTURUM_COOKIE,
  oturumAcikMi,
  oturumDegeri,
  talepleriGetir,
} from "@/lib/talepler";

export const metadata: Metadata = {
  title: "Örnek talepleri — Dijital Mankenim",
  robots: { index: false, follow: false },
};

async function girisYap(formData: FormData) {
  "use server";
  const girilen = String(formData.get("sifre") ?? "");
  const sifre = process.env.TALEP_SIFRE ?? "";
  const a = Buffer.from(girilen);
  const b = Buffer.from(sifre);
  const dogru = sifre.length > 0 && a.length === b.length && timingSafeEqual(a, b);

  if (!dogru) redirect("/talepler?hata=1");

  const store = await cookies();
  store.set(OTURUM_COOKIE, oturumDegeri()!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/talepler");
}

async function cikisYap() {
  "use server";
  const store = await cookies();
  store.delete(OTURUM_COOKIE);
  redirect("/talepler");
}

export default async function TaleplerPage({
  searchParams,
}: {
  searchParams: Promise<{ hata?: string }>;
}) {
  const { hata } = await searchParams;

  if (!(await oturumAcikMi())) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-paper px-4 pt-24">
        <form action={girisYap} className="w-full max-w-sm rounded-3xl border border-line bg-cream p-8">
          <h1 className="font-display text-4xl text-ink">Örnek talepleri</h1>
          <p className="mt-2 text-sm text-stone">Görmek için yönetici şifresini girin.</p>
          <input
            type="password"
            name="sifre"
            required
            autoComplete="current-password"
            className="mt-6 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-ink"
          />
          {hata && <p className="mt-2 text-sm text-wine">Şifre hatalı.</p>}
          <button className="mt-4 w-full rounded-full bg-ink py-3 text-sm font-bold text-cream hover:bg-wine">
            Giriş
          </button>
        </form>
      </div>
    );
  }

  let talepler: Awaited<ReturnType<typeof talepleriGetir>> = [];
  let yuklemeHatasi = false;
  try {
    talepler = await talepleriGetir();
  } catch (error) {
    console.error("Talepler okunamadı", error);
    yuklemeHatasi = true;
  }

  return (
    <div className="bg-paper px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-wine">Yönetim</p>
            <h1 className="font-display mt-2 text-5xl text-ink">Örnek talepleri</h1>
            <p className="mt-2 text-stone">{talepler.length} talep</p>
          </div>
          <form action={cikisYap}>
            <button className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink">
              Çıkış
            </button>
          </form>
        </div>

        {yuklemeHatasi && (
          <p className="mt-8 rounded-2xl bg-wine/10 p-4 text-wine">Talepler yüklenemedi, sayfayı yenileyin.</p>
        )}

        <div className="mt-10 space-y-4">
          {talepler.map((talep) => (
            <article key={talep.id} className="rounded-3xl border border-line bg-cream p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  {talep.instagram && (
                    <a
                      href={`https://ig.me/m/${talep.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-ink underline decoration-wine underline-offset-4"
                    >
                      @{talep.instagram}
                    </a>
                  )}
                  {talep.telefon && <span className="text-ink">{talep.telefon}</span>}
                  {talep.kategori && (
                    <span className="rounded-full bg-paper-2 px-3 py-0.5 text-xs font-semibold text-stone">
                      {talep.kategori}
                    </span>
                  )}
                </div>
                <time className="text-sm text-stone">
                  {new Date(talep.olusturma).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })}
                </time>
              </div>
              {talep.not && <p className="mt-3 whitespace-pre-line text-stone">{talep.not}</p>}
              <div className="mt-4 flex flex-wrap gap-3">
                {talep.fotolar.map((p) => (
                  <a key={p} href={`/api/talepler/foto?p=${encodeURIComponent(p)}`} target="_blank" rel="noopener noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/api/talepler/foto?p=${encodeURIComponent(p)}`}
                      alt="Ürün fotoğrafı"
                      className="h-40 w-32 rounded-xl object-cover"
                    />
                  </a>
                ))}
              </div>
            </article>
          ))}
          {!yuklemeHatasi && talepler.length === 0 && (
            <p className="rounded-3xl border border-dashed border-line p-10 text-center text-stone">
              Henüz talep yok.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
