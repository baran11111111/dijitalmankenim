"use client";

import { useState } from "react";
import Link from "next/link";
import { ImagePlus, Loader2, X, CheckCircle2 } from "lucide-react";
import { track } from "@vercel/analytics";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/categories";

const MAKS_FOTO = 3;
const MAKS_KENAR = 1800;

// Telefon fotoğraflarını sunucu sınırının altına indirmek için küçültür
async function kucult(dosya: File): Promise<File> {
  const bitmap = await createImageBitmap(dosya);
  const oran = Math.min(1, MAKS_KENAR / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * oran);
  canvas.height = Math.round(bitmap.height * oran);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Fotoğraf işlenemedi"))), "image/jpeg", 0.88)
  );
  return new File([blob], dosya.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface SampleFormProps {
  varsayilanKategori?: string;
  className?: string;
}

export function SampleForm({ varsayilanKategori = "", className }: SampleFormProps) {
  const [fotolar, setFotolar] = useState<{ dosya: File; onizleme: string }[]>([]);
  const [durum, setDurum] = useState<"bos" | "gonderiliyor" | "tamam">("bos");
  const [hata, setHata] = useState("");

  async function fotoEkle(e: React.ChangeEvent<HTMLInputElement>) {
    const secilen = Array.from(e.target.files ?? []).slice(0, MAKS_FOTO - fotolar.length);
    e.target.value = "";
    setHata("");
    try {
      const islenen = await Promise.all(secilen.map(kucult));
      setFotolar((onceki) => [
        ...onceki,
        ...islenen.map((dosya) => ({ dosya, onizleme: URL.createObjectURL(dosya) })),
      ]);
    } catch {
      setHata("Fotoğraf okunamadı. JPG veya PNG bir fotoğraf deneyin.");
    }
  }

  function fotoSil(i: number) {
    setFotolar((onceki) => {
      URL.revokeObjectURL(onceki[i].onizleme);
      return onceki.filter((_, j) => j !== i);
    });
  }

  async function gonder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setHata("");
    if (fotolar.length === 0) {
      setHata("En az bir ürün fotoğrafı ekleyin.");
      return;
    }

    const veri = new FormData(e.currentTarget);
    veri.delete("foto");
    fotolar.forEach((f) => veri.append("foto", f.dosya));

    setDurum("gonderiliyor");
    try {
      const yanit = await fetch("/api/ornek", { method: "POST", body: veri });
      const sonuc = await yanit.json().catch(() => ({}));
      if (!yanit.ok) throw new Error(sonuc.hata || "Gönderilemedi");
      setDurum("tamam");
      track("ornek_talebi", { kategori: String(veri.get("kategori") || "belirtilmedi") });
      window.fbq?.("track", "Lead");
    } catch (err) {
      setDurum("bos");
      setHata(err instanceof Error ? err.message : "Gönderilemedi, tekrar deneyin.");
    }
  }

  if (durum === "tamam") {
    return (
      <div className={cn("rounded-3xl border border-line bg-cream p-8 text-center sm:p-12", className)}>
        <CheckCircle2 className="mx-auto h-12 w-12 text-wine" strokeWidth={1.5} />
        <h3 className="font-display mt-4 text-4xl text-ink">Talebiniz alındı.</h3>
        <p className="mx-auto mt-3 max-w-md text-stone">
          Ürününüzle hazırladığımız örneği Instagram&apos;dan ya da telefonunuzdan size
          ileteceğiz.
        </p>
      </div>
    );
  }

  const alan =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition-colors placeholder:text-stone/60 focus:border-ink";

  return (
    <form onSubmit={gonder} className={cn("rounded-3xl border border-line bg-cream p-6 sm:p-8", className)}>
      {/* Fotoğraflar */}
      <p className="text-sm font-bold text-ink">Ürün fotoğrafları <span className="font-normal text-stone">(en fazla 3)</span></p>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {fotolar.map((f, i) => (
          <div key={f.onizleme} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-paper-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.onizleme} alt={`Seçilen fotoğraf ${i + 1}`} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => fotoSil(i)}
              aria-label="Fotoğrafı kaldır"
              className="absolute right-1.5 top-1.5 rounded-full bg-ink/70 p-1 text-cream"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        {fotolar.length < MAKS_FOTO && (
          <label className="flex aspect-[3/4] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink/20 text-center text-xs font-semibold text-stone transition-colors hover:border-wine hover:text-wine">
            <ImagePlus className="h-6 w-6" strokeWidth={1.5} />
            Fotoğraf ekle
            <input type="file" name="foto" accept="image/*" multiple className="sr-only" onChange={fotoEkle} />
          </label>
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-ink">Instagram kullanıcı adınız</span>
          <input name="instagram" placeholder="@butikadi" className={cn(alan, "mt-2")} autoComplete="off" />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-ink">Telefon <span className="font-normal text-stone">(isteğe bağlı)</span></span>
          <input name="telefon" type="tel" placeholder="05xx xxx xx xx" className={cn(alan, "mt-2")} autoComplete="tel" />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-bold text-ink">Ürün türü</span>
        <select name="kategori" defaultValue={varsayilanKategori} className={cn(alan, "mt-2")}>
          <option value="">Seçin</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.name}>{c.name}</option>
          ))}
          <option value="Diğer">Diğer</option>
        </select>
      </label>

      <label className="mt-4 block">
        <span className="text-sm font-bold text-ink">Nasıl bir görsel istersiniz? <span className="font-normal text-stone">(isteğe bağlı)</span></span>
        <textarea
          name="not"
          rows={3}
          placeholder="Örn. tesettürlü manken, beyaz stüdyo fonu"
          className={cn(alan, "mt-2 resize-none")}
        />
      </label>

      {/* Bot tuzağı */}
      <input name="web_sitesi" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <label className="mt-5 flex items-start gap-3 text-sm text-stone">
        <input type="checkbox" name="onay" value="evet" required className="mt-1 h-4 w-4 accent-[var(--color-wine)]" />
        <span>
          Fotoğraflarımın örnek hazırlamak için kullanılmasını kabul ediyorum.{" "}
          <Link href="/gizlilik" className="underline underline-offset-2 hover:text-ink">Aydınlatma metni</Link>
        </span>
      </label>

      {hata && <p className="mt-4 rounded-xl bg-wine/10 px-4 py-3 text-sm font-semibold text-wine">{hata}</p>}

      <button
        type="submit"
        disabled={durum === "gonderiliyor"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm font-bold text-cream transition-colors hover:bg-wine disabled:opacity-60"
      >
        {durum === "gonderiliyor" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Gönderiliyor
          </>
        ) : (
          "Ücretsiz Örneğimi İstiyorum"
        )}
      </button>
    </form>
  );
}
