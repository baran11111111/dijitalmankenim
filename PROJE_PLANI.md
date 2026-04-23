# Dijital Mankenim - Proje Plani

## Vizyon
AI destekli sanal manken platformu. Musteriler kendi urun fotograflarini yukleyerek, hazir manken fotograflari/videolari uzerinde urunlerinin nasil gorunecegini AI ile goruntuluyorlar. Token bazli odeme sistemi.

## Referans: fashn.ai
- Virtual try-on, product-to-model, AI model olusturma
- Kredi/token bazli fiyatlandirma
- REST API + Web App
- 5-17 saniye uretim suresi
- Next.js + Tailwind CSS

---

## Teknik Mimari

### Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes + Server Actions
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js (Google, Email/Sifre)
- **Odeme**: Stripe (token paketleri)
- **Storage**: AWS S3 / Cloudflare R2 (gorsel/video depolama)
- **AI**: Replicate API (virtual try-on modelleri) + ozel endpoint destegi
- **Deployment**: Vercel
- **Queue**: Bull + Redis (uzun islemler icin kuyruk sistemi)

### Veritabani Semasi (Prisma)
- User (id, email, name, avatar, role, tokens, createdAt)
- TokenTransaction (id, userId, amount, type, stripePaymentId, createdAt)
- TokenPackage (id, name, tokens, priceTRY, priceUSD, popular, active)
- MankenTemplate (id, name, category, gender, pose, thumbnailUrl, fullImageUrl, videoUrl, isVideo, tags, active)
- Generation (id, userId, templateId, inputImageUrl, outputImageUrl, outputVideoUrl, type, status, tokensUsed, createdAt)
- Gallery (id, userId, generationId, title, isFavorite, createdAt)

### Sayfa Yapisi
```
/ (Landing Page)
/giris (Login)
/kayit (Register)
/dashboard (Ana panel)
/dashboard/galeri (Hazir manken galerisi - foto + video)
/dashboard/uret (Uretim sayfasi - yukle + sec + uret)
/dashboard/sonuclarim (Gecmis uretimler)
/dashboard/tokenler (Token satin al)
/dashboard/profil (Profil ayarlari)
/dashboard/api (API erisimi - gelismis kullanicilar)
/admin (Admin paneli)
/admin/templates (Manken sablonlari yonetimi)
/admin/kullanicilar (Kullanici yonetimi)
/admin/uretimler (Tum uretimler)
/admin/tokenler (Token paketleri yonetimi)
/hakkimizda
/fiyatlandirma
/iletisim
/api/v1/* (REST API endpointleri)
```

---

## Kullanici Akisi

### Yeni Musteri
1. Siteye gelir → Landing page (ornekler, fiyatlar, CTA)
2. Kayit olur → 5 ucretsiz token verilir
3. Dashboard'a yonlendirilir
4. "Uret" sayfasina gider
5. Hazir manken galerinden bir sablon secer (foto veya video)
6. Kendi urun fotografini yukler
7. "Uret" butonuna basar → AI islemi baslar
8. Sonuc hazir oldugunda bildirim alir
9. Sonucu indirir veya galeriye kaydeder
10. Token bitince → Token satin alma sayfasi

### Mevcut Musteri (API)
1. Dashboard'dan API key olusturur
2. REST API ile programatik olarak uretim yapar
3. Webhook ile sonuc bildirimlerini alir

---

## Ozellikler Detayi

### Landing Page
- Hero section: Once/sonra ornekleri, animasyonlu slider
- Nasil calisir: 3 adimli gorsel akis
- Ornek uretimler galerisi
- Fiyatlandirma tablosu
- Musterilerden referanslar
- SSS (FAQ)
- CTA butonlari

### Manken Galerisi
- Kategoriler: Kadin, Erkek, Cocuk
- Alt kategoriler: Ust giyim, Alt giyim, Elbise, Dis giyim, Aksesuar
- Filtreler: Cinsiyet, Poz, Kategori, Tip (Foto/Video)
- Grid gorunum, hover'da preview
- Video sablonlari icin kisa onizleme

### Uretim Motoru
- Drag & drop gorsel yukleme
- Gorsel kirpma ve duzenleme
- Sablon secimi
- Onizleme
- AI uretim durumu (progress bar)
- Sonuc karsilastirma (once/sonra)
- Tek tikla indirme (HD)

### Token Sistemi
- Foto uretim: 1 token
- Video uretim: 3 token
- HD cikti: +1 token
- Paketler: 50 token (99 TL), 200 token (349 TL), 500 token (749 TL), 1000 token (1299 TL)
- Otomatik yenileme secenegi

### Admin Paneli
- Dashboard: Gunluk uretim, gelir, yeni kullanici grafikleri
- Manken sablonu CRUD (yukle, duzenle, sil)
- Kullanici yonetimi
- Token paketi yonetimi
- Uretim loglari
