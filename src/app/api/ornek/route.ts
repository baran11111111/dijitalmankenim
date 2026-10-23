import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { put } from "@vercel/blob";
import { TALEP_PREFIX, type Talep } from "@/lib/talepler";

const MAKS_FOTO = 3;
const MAKS_BOYUT = 4 * 1024 * 1024; // istemci fotoğrafları zaten küçültüp gönderiyor
const IZINLI_TURLER = ["image/jpeg", "image/png", "image/webp"];

function temiz(deger: FormDataEntryValue | null, uzunluk: number) {
  return typeof deger === "string" ? deger.trim().slice(0, uzunluk) : "";
}

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
    return NextResponse.json(
      { hata: "Form şu an çalışmıyor. Lütfen fotoğrafınızı Instagram'dan DM ile gönderin." },
      { status: 503 }
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ hata: "Gönderilen bilgiler okunamadı." }, { status: 400 });
  }

  // Bot tuzağı: gerçek kullanıcılar bu alanı görmez
  if (temiz(form.get("web_sitesi"), 200)) {
    return NextResponse.json({ tamam: true });
  }

  const instagram = temiz(form.get("instagram"), 60).replace(/^@+/, "");
  const telefon = temiz(form.get("telefon"), 30);
  const kategori = temiz(form.get("kategori"), 60);
  const not = temiz(form.get("not"), 1000);
  const onay = form.get("onay") === "evet";
  const fotolar = form.getAll("foto").filter((f): f is File => f instanceof File && f.size > 0);

  if (!instagram && !telefon) {
    return NextResponse.json({ hata: "Instagram kullanıcı adınızı ya da telefonunuzu yazın." }, { status: 400 });
  }
  if (fotolar.length === 0) {
    return NextResponse.json({ hata: "En az bir ürün fotoğrafı ekleyin." }, { status: 400 });
  }
  if (fotolar.length > MAKS_FOTO) {
    return NextResponse.json({ hata: `En fazla ${MAKS_FOTO} fotoğraf ekleyebilirsiniz.` }, { status: 400 });
  }
  if (fotolar.some((f) => !IZINLI_TURLER.includes(f.type) || f.size > MAKS_BOYUT)) {
    return NextResponse.json({ hata: "Fotoğraflar JPG, PNG veya WEBP olmalı." }, { status: 400 });
  }
  if (!onay) {
    return NextResponse.json({ hata: "Devam etmek için aydınlatma metnini onaylayın." }, { status: 400 });
  }

  const olusturma = new Date().toISOString();
  const id = `${olusturma.slice(0, 10)}-${randomUUID().slice(0, 8)}`;
  const klasor = `${TALEP_PREFIX}${id}`;

  try {
    const yuklenen = await Promise.all(
      fotolar.map((foto, i) =>
        put(`${klasor}/foto-${i + 1}.${foto.type.split("/")[1]}`, foto, {
          access: "private",
          contentType: foto.type,
        })
      )
    );

    const talep: Talep = {
      id,
      olusturma,
      instagram,
      telefon,
      kategori,
      not,
      fotolar: yuklenen.map((b) => b.pathname),
    };

    await put(`${klasor}/bilgi.json`, JSON.stringify(talep), {
      access: "private",
      contentType: "application/json",
    });
  } catch (error) {
    console.error("Örnek talebi kaydedilemedi", error);
    return NextResponse.json(
      { hata: "Bir sorun oluştu. Lütfen fotoğrafınızı Instagram'dan DM ile gönderin." },
      { status: 500 }
    );
  }

  return NextResponse.json({ tamam: true });
}
