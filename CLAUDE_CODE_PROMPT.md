
# CLAUDE CODE PROMPT - Dijital Mankenim Platform Gelistirme


Bu prompt, "Dijital Mankenim" adli AI destekli sanal manken platformunun tam olarak gelistirilmesi icindir. Asagidaki tum adimlari sirayla uygula. Her adimi tamamladiktan sonra bir sonrakine gec.

## TASARIM REFERANSI - FASHN.AI TARZI

Bu projenin tasarimi fashn.ai sitesinin bire bir Turkce uyarlamasidir. Asagidaki tasarim kurallarini MUTLAKA uygula:

### Renk Paleti
```css
:root {
  /* Ana renkler - fashn.ai'deki koyu teal/yesil-gri tonlar */
  --primary: #4a6670;          /* Koyu teal - butonlar, navbar CTA, badge */
  --primary-hover: #3d5660;
  --primary-light: #e8edef;    /* Cok acik teal - section arka planlari */
  --primary-50: #f0f4f5;       /* Neredeyse beyaz teal tonu */

  /* Accent - fashn.ai'deki pembe/kirmizi italic basliklar */
  --accent: #e8a0a0;           /* Soft pembe - italic basliklar, vurgular */
  --accent-dark: #d4726e;      /* Koyu pembe - hover state */

  /* Notr renkler */
  --background: #ffffff;
  --surface: #f8f9fa;
  --surface-elevated: #ffffff;
  --text: #1a1a1a;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  --border: #e5e7eb;
  --border-light: #f3f4f6;

  /* Durum renkleri */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
}
```

### Tipografi - CRITIS ONEMLI
fashn.ai'nin en belirgin ozelligi serif + sans-serif karisimi tipografidir:
- **Basliklar**: Serif font kullan (`Playfair Display` veya `DM Serif Display`). Buyuk, etkileyici.
- **Italic vurgular**: Baslik icindeki vurgulu kelimeler `italic` + `--accent` rengi ile. Ornek: "Urunlerinizi AI ile *hayata gecirin*" seklinde "hayata gecirin" kismi pembe italic serif.
- **Body text**: Sans-serif (`Inter` veya `DM Sans`). Temiz, okunakli.
- **UI elementleri**: Sans-serif, medium weight.
- **Kucuk etiketler**: Uppercase, letter-spacing: 0.1em, font-size: 12px, --primary rengi. Ornek: "URUN FOTOGRAFCILIGI", "YAPAY ZEKA ARACLARI"

```typescript
// next/font ile
import { Playfair_Display, Inter } from 'next/font/google'
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
```

### Layout Patternleri

1. **Section Badge**: Her section'in basinda kucuk pill-shape badge. Ikon + yazi. Ornek: `[sparkle icon] Guclu Ozellikler`. Border: 1px solid --border, border-radius: full, padding: 4px 16px.

2. **Zigzag Feature Layout**: Ozellikler bolumunde gorsel ve metin satirlari zigzag sirayla. Ilk satir: gorsel solda + metin sagda. Ikinci satir: metin solda + gorsel sagda. Her birinde:
   - Kucuk uppercase renkli etiket (orn: "URUN FOTOGRAFCILIGI")
   - Buyuk serif baslik (orn: "Urunden Modele")
   - Paragraf aciklama
   - 1-2 buton (outlined + text link seklinde)

3. **Testimonials Carousel**: Ortadaki kart buyuk ve tam gorunen, yanlardaki kartlar kisilmis ve yarim gorunen. Her kartta:
   - Marka logosu (daire)
   - Alinti metni (tirnak isaretli)
   - Sirket adi + lokasyon
   - "Hikayeyi Oku ->" linki
   - Altta ok butonlari + dot indicator

4. **Pricing Cards**: Yan yana 3 kart. Ortadaki "En Populer" badge'li ve hafif yukari cikik. Her kart:
   - Paket adi (bold)
   - Fiyat (buyuk yazi) + "/ay"
   - Ozellik listesi (check ikonu ile)
   - CTA buton (ortadaki filled, digerleri outlined)
   - Altta kucuk yazi ile ek bilgi

5. **CTA Section**: Arka planda yari saydam/blurlu manken siluetleri. Ustunde koyu gradient overlay. Beyaz baslik + buton.

6. **Mega Menu**: Navbar'daki dropdown'lar 2 kolonlu. Sol kolon: Platform (App, API), sag kolon: AI Araclari (listesi). Sol alt kosede buyuk bir gorsel.

7. **Footer**: Koyu arka plan (#1a1a2e veya koyu gri). 5-6 kolon link grubu. Altta "Tum sistemler calisir" status + dil secici.

### Component Stilleri

**Butonlar**:
- Primary: bg --primary, text white, rounded-lg (8px), padding 12px 24px, hover'da --primary-hover
- Outlined: border 1px --primary, text --primary, rounded-lg, hover'da bg --primary-50
- Ghost: text --primary, hover'da bg --primary-50
- CTA buyuk: Ayni ama padding 16px 32px, font-size buyuk, sag tarafinda ok ikonu (->)

**Kartlar**:
- bg white, border: 1px solid --border-light, rounded-xl (16px), shadow-sm
- Hover'da: shadow-md, translateY(-2px) gecisi
- Iceride padding: 24px-32px

**Input'lar**:
- border: 1px solid --border, rounded-lg, padding: 12px 16px
- Focus: border --primary, ring-2 ring --primary/20
- Label: ustte, font-medium, text-sm

**Badge/Pill**:
- Kucuk: px-3 py-1, rounded-full, text-xs, uppercase
- Section badge: border 1px --border, bg white, flex items-center gap-2

### Gorsel Kullanimi
- Manken gorselleri rounded-2xl (16px) kesilmis
- Gorseller arasinda bosluk: gap-4 veya gap-6
- Hero'daki gorseller hafif egik (rotate-2, -rotate-1) ve farkli boyutlarda (collage gorunumu)
- Shadow: gorsel kartlarinda soft shadow (shadow-lg opacity dusuk)
- Placeholder olarak: `https://images.unsplash.com/photo-...` fashion/model gorselleri kullan

---

## PROJE TANIMI

"Dijital Mankenim", moda sektorune yonelik bir SaaS platformudur. Musteriler:
1. Platformdaki hazir manken fotograf/videolarindan birini secer
2. Kendi urun fotografini yukler (tisort, elbise, ceket vb.)
3. AI motoru, secilen mankene musterinin urununu giydirerek yeni bir fotograf/video uretir
4. Musteri sonucu indirir

Referans site: fashn.ai - Bizim sitemiz Turkce olacak, token bazli odeme sistemiyle calisacak.

---

## ADIM 1: PROJE KURULUMU

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Ek paketleri kur:

```bash
npm install prisma @prisma/client next-auth @auth/prisma-adapter
npm install stripe @stripe/stripe-js
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
npm install bullmq ioredis
npm install framer-motion lucide-react clsx tailwind-merge
npm install class-variance-authority
npm install react-dropzone react-image-crop
npm install recharts date-fns
npm install zod react-hook-form @hookform/resolvers
npm install sharp bcryptjs
npm install -D @types/bcryptjs @types/node
```

---

## ADIM 2: ENV DOSYASI

`.env.example` dosyasi olustur:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dijitalmankenim"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="super-secret-key-change-this"

# Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""

# S3 / Cloudflare R2
S3_ENDPOINT=""
S3_ACCESS_KEY=""
S3_SECRET_KEY=""
S3_BUCKET_NAME="dijitalmankenim"
S3_REGION="auto"
S3_PUBLIC_URL=""

# AI API (Replicate veya ozel endpoint)
AI_API_URL="https://api.replicate.com/v1"
AI_API_TOKEN=""
AI_MODEL_ID="cuuupid/idm-vton:906425dbca90663ff5427624839572cc56ea7d380343d13e2a4c4b09d3f0c30f"
AI_VIDEO_MODEL_ID=""
AI_MOCK_MODE="true"

# Redis (BullMQ icin)
REDIS_URL="redis://localhost:6379"

# Genel
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Dijital Mankenim"
```

---

## ADIM 3: PRISMA SCHEMA

`prisma/schema.prisma` dosyasini olustur:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
}

enum GenerationType {
  PHOTO
  VIDEO
}

enum GenerationStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
}

enum TransactionType {
  PURCHASE
  USAGE
  REFUND
  BONUS
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String             @id @default(cuid())
  name          String?
  email         String?            @unique
  emailVerified DateTime?
  image         String?
  password      String?
  role          Role               @default(USER)
  tokens        Int                @default(5)
  apiKey        String?            @unique
  createdAt     DateTime           @default(now())
  updatedAt     DateTime           @updatedAt
  accounts      Account[]
  sessions      Session[]
  transactions  TokenTransaction[]
  generations   Generation[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model TokenPackage {
  id               String   @id @default(cuid())
  name             String
  description      String?
  tokens           Int
  priceTRY         Float
  priceUSD         Float
  popular          Boolean  @default(false)
  active           Boolean  @default(true)
  stripePriceIdTRY String?
  stripePriceIdUSD String?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

model TokenTransaction {
  id              String          @id @default(cuid())
  userId          String
  amount          Int
  type            TransactionType
  description     String?
  stripePaymentId String?
  packageId       String?
  createdAt       DateTime        @default(now())
  user            User            @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model MankenTemplate {
  id           String       @id @default(cuid())
  name         String
  description  String?
  category     String
  gender       String
  pose         String?
  thumbnailUrl String
  fullImageUrl String
  videoUrl     String?
  isVideo      Boolean      @default(false)
  tags         String[]
  active       Boolean      @default(true)
  sortOrder    Int          @default(0)
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
  generations  Generation[]
}

model Generation {
  id             String           @id @default(cuid())
  userId         String
  templateId     String
  inputImageUrl  String
  outputImageUrl String?
  outputVideoUrl String?
  type           GenerationType
  status         GenerationStatus @default(PENDING)
  tokensUsed     Int
  errorMessage   String?
  processingTime Int?
  metadata       Json?
  isFavorite     Boolean          @default(false)
  createdAt      DateTime         @default(now())
  updatedAt      DateTime         @updatedAt
  user           User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  template       MankenTemplate   @relation(fields: [templateId], references: [id])
}
```

Ardindan: `npx prisma generate && npx prisma db push`

---

## ADIM 4: PROJE DOSYA YAPISI

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (Playfair Display + Inter font, providers)
│   ├── page.tsx                      # Landing page
│   ├── globals.css                   # Tailwind + CSS degiskenleri + ozel stiller
│   ├── (auth)/
│   │   ├── giris/page.tsx
│   │   └── kayit/page.tsx
│   ├── (marketing)/
│   │   ├── hakkimizda/page.tsx
│   │   ├── fiyatlandirma/page.tsx
│   │   └── iletisim/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── galeri/page.tsx
│   │   ├── uret/page.tsx
│   │   ├── sonuclarim/page.tsx
│   │   ├── tokenler/page.tsx
│   │   ├── profil/page.tsx
│   │   └── api-erisim/page.tsx
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── templates/page.tsx
│   │   ├── kullanicilar/page.tsx
│   │   ├── uretimler/page.tsx
│   │   └── paketler/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── upload/route.ts
│       ├── generate/route.ts
│       ├── generate/[id]/route.ts
│       ├── generate/callback/route.ts
│       ├── tokens/purchase/route.ts
│       ├── webhooks/stripe/route.ts
│       ├── templates/route.ts
│       ├── gallery/route.ts
│       ├── admin/stats/route.ts
│       └── v1/
│           ├── generate/route.ts
│           └── templates/route.ts
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   ├── badge.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   ├── skeleton.tsx
│   │   ├── avatar.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── progress.tsx
│   ├── landing/
│   │   ├── hero.tsx
│   │   ├── interactive-demo.tsx      # "Nasil Calisir" interaktif demo (fashn.ai tarzinda)
│   │   ├── features-zigzag.tsx       # Zigzag ozellikler bolumu
│   │   ├── examples-gallery.tsx
│   │   ├── pricing-section.tsx
│   │   ├── testimonials.tsx
│   │   ├── blog-section.tsx          # Blog/Guncellemeler section
│   │   ├── cta-section.tsx           # Final CTA (siluetli arka plan)
│   │   └── faq.tsx
│   ├── dashboard/
│   │   ├── sidebar.tsx
│   │   ├── topbar.tsx
│   │   ├── stats-cards.tsx
│   │   ├── recent-generations.tsx
│   │   └── token-balance.tsx
│   ├── gallery/
│   │   ├── template-grid.tsx
│   │   ├── template-card.tsx
│   │   ├── template-filters.tsx
│   │   └── template-preview.tsx
│   ├── generate/
│   │   ├── upload-zone.tsx
│   │   ├── template-selector.tsx
│   │   ├── generation-preview.tsx
│   │   ├── generation-progress.tsx
│   │   └── generation-result.tsx
│   ├── admin/
│   │   ├── admin-sidebar.tsx
│   │   ├── stats-charts.tsx
│   │   ├── template-form.tsx
│   │   ├── users-table.tsx
│   │   └── generations-table.tsx
│   └── shared/
│       ├── navbar.tsx                # Mega menu destekli navbar
│       ├── footer.tsx                # Koyu footer, fashn.ai tarzi
│       ├── logo.tsx
│       ├── section-badge.tsx         # Pill-shape section baslik badge
│       └── loading-spinner.tsx
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── stripe.ts
│   ├── s3.ts
│   ├── ai.ts
│   ├── queue.ts
│   ├── tokens.ts
│   ├── validations.ts
│   └── utils.ts
├── hooks/
│   ├── use-toast.ts
│   ├── use-generation.ts
│   └── use-tokens.ts
└── types/
    └── index.ts
```

---

## ADIM 5: TEMEL LIB DOSYALARI

### 5.1 - `src/lib/prisma.ts`
Prisma client singleton. Global degisken ile hot-reload'da tekrar olusmayi engelle.

### 5.2 - `src/lib/auth.ts`
NextAuth.js yapilandirmasi:
- PrismaAdapter kullan
- Google provider + CredentialsProvider (email/sifre)
- Session'da user.id, user.role, user.tokens bilgisi olsun
- Kayit olan her kullaniciya otomatik 5 token ver
- Sifreleri bcryptjs ile hashle

### 5.3 - `src/lib/s3.ts`
- `uploadFile(file, folder)`: Dosyayi S3'e yukler, public URL doner
- `getPresignedUploadUrl(key, contentType)`: Client-side upload icin presigned URL
- `deleteFile(key)`: Dosya silme
- Dosya boyutu limiti: 10MB
- Kabul edilen formatlar: jpg, jpeg, png, webp

### 5.4 - `src/lib/ai.ts`
AI API entegrasyonu:

```typescript
async function generatePhoto(input: {
  templateImageUrl: string;
  productImageUrl: string;
}): Promise<{ outputUrl: string; processingTime: number }>

async function generateVideo(input: {
  templateVideoUrl: string;
  productImageUrl: string;
}): Promise<{ outputUrl: string; processingTime: number }>
```

- Replicate API kullan (IDM-VTON modeli)
- `AI_MOCK_MODE=true` ise 3 saniye bekleyip ornek gorsel URL'i dondursun
- Hata durumlarini yonet, retry mekanizmasi (3 deneme)
- Timeout: 120 saniye

### 5.5 - `src/lib/tokens.ts`
```typescript
async function checkAndDeductTokens(userId: string, amount: number): Promise<boolean>
async function addTokens(userId: string, amount: number, type: TransactionType, description: string): Promise<void>
async function getTokenBalance(userId: string): Promise<number>
async function getTokenHistory(userId: string, page: number): Promise<TokenTransaction[]>
```
- Prisma transaction ile atomic islem (race condition onleme)

### 5.6 - `src/lib/stripe.ts`
```typescript
async function createCheckoutSession(userId: string, packageId: string, currency: 'try' | 'usd'): Promise<string>
async function handleWebhook(body: string, signature: string): Promise<void>
```

### 5.7 - `src/lib/validations.ts`
Zod ile tum form ve API validasyonlari: loginSchema, registerSchema, generateSchema, templateSchema, tokenPurchaseSchema

### 5.8 - `src/lib/utils.ts`
- `cn(...classes)`: clsx + tailwind-merge birlestirme
- Diger yardimci fonksiyonlar

---

## ADIM 6: GLOBALS.CSS VE TAILWIND CONFIG

### `src/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #4a6670;
  --primary-hover: #3d5660;
  --primary-light: #e8edef;
  --primary-50: #f0f4f5;
  --accent: #e8a0a0;
  --accent-dark: #d4726e;
  --background: #ffffff;
  --surface: #f8f9fa;
  --text: #1a1a1a;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  --border: #e5e7eb;
  --border-light: #f3f4f6;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
}

/* Serif italic vurgu class'i - fashn.ai'daki pembe italic basliklar icin */
.text-accent-italic {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--accent);
}

/* Section badge stili */
.section-badge {
  @apply inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700;
}

/* Uppercase kucuk etiket - "URUN FOTOGRAFCILIGI" gibi */
.label-tag {
  @apply text-xs font-semibold uppercase tracking-widest;
  color: var(--primary);
}
```

### `tailwind.config.ts`
- Renk paletini CSS degiskenlerinden extend et
- Font family'lere serif (Playfair Display) ve sans (Inter) ekle
- Container: center, padding, max-w-7xl
- Animation: fadeIn, slideUp, slideIn

---

## ADIM 7: UI COMPONENTLERI (`src/components/ui/`)

Tum UI componentlerini fashn.ai'nin temiz, minimal tasarim diline uygun yaz:

**button.tsx**: 
- Variants: `primary` (bg-[--primary] text-white), `outline` (border-[--primary] text-[--primary]), `ghost`, `accent` (bg-[--accent] text-white)
- Sizes: sm, md, lg
- Sag ok ikonu olan varyant (CTA butonlar icin): `<Button rightIcon={<ArrowRight />}>Baslayın</Button>`
- Loading state (spinner)

**card.tsx**: Rounded-xl, border-light, shadow-sm, hover transition

**input.tsx**: Label + input + error mesaji, focus ring primary renk

**modal.tsx**: Overlay fade + content slide-up, framer-motion animasyonlu

**badge.tsx**: Pill shape, variant'lar (default, success, warning, error, popular)

**section-badge.tsx**: fashn.ai'deki section baslik pill'i: `[icon] Metin` seklinde

**skeleton.tsx**: Animated pulse placeholder

**progress.tsx**: Gradient animasyonlu bar

---

## ADIM 8: NAVBAR (`src/components/shared/navbar.tsx`)

fashn.ai'daki navbar'in BIREBIR Turkce versiyonu:

### Desktop (1024px+)
```
[Logo: "DİJİTAL MANKENİM"]   [Hizmetler v]  [Cozumler v]  [Fiyatlandirma]  [Kaynaklar v]     [Uygulamaya Git ->]
```

- Logo: Sol tarafta. Bold sans-serif. "DIJITAL" normal, "MANKENIM" veya ikonlu.
- Nav linkleri: Ortada. Dropdown olan menulerde kucuk ok (chevron-down).
- CTA: Sag tarafta. bg-[--primary] text-white rounded-lg buton. "Uygulamaya Git ->" seklinde ok isareti ile.

### Mega Menu Dropdown (Hizmetler tiklandiginda)
fashn.ai'daki gibi 2 kolonlu buyuk dropdown:

```
+---------------------------------------------------+
| DIJITAL MANKENIM PLATFORM    |  AI ARACLARI       |
|                              |                     |
| [icon] Uygulama             | [icon] Sanal Deneme |
| Profesyonel gorseller       | AI try-on teknolojisi|
|   olusturun                 |                     |
|                              | [icon] Urunden Modele|
| [icon] API                  | Duz fotografi model  |
| Kendi uygulamaniza          |   uzerinde gosterim  |
|   entegre edin              |                     |
|                              | [icon] Model Degistir|
| +------------------+        | Modeli degistir,     |
| | [Buyuk gorsel]   |        |   urun ayni kalsin   |
| |  Moda modeli     |        |                     |
| |  fotografi       |        | [icon] Video Olustur |
| +------------------+        | Statik gorselden     |
|                              |   kisa video         |
+---------------------------------------------------+
```

- Hover'da acilir (150ms delay)
- Smooth fade-in animasyonu
- Disina tiklandiginda kapanir

### Kaynaklar Dropdown
```
[icon] Hakkimizda - FASHN AI'yi taniyin
[icon] Blog - Guncellemeler ve haberler
[icon] Musteri Hikayeleri - Basari hikayeleri
[icon] API Dokumantasyonu - Gelistirici rehberi
[icon] Yardim Merkezi - Destek ve SSS
[icon] Degisiklik Gunlugu - Son guncellemeler
```
Sag tarafta buyuk fashion gorsel.

### Mobil (< 1024px)
- Hamburger ikonu
- Slide-in menu (sagdan veya soldan)
- Accordion tarzinda alt menuer

### Scroll davranisi
- Sayfa basinda: Saydam arka plan (landing page icin)
- Scroll sonrasi (> 50px): Beyaz arka plan + alt golge (shadow-sm)
- Smooth gecis (transition-all duration-300)

---

## ADIM 9: LANDING PAGE (`src/app/page.tsx`)

fashn.ai'nin landing page yapisinin Turkce versiyonu. Her section'i ayri component olarak yaz.

### 9.1 Hero Section (`src/components/landing/hero.tsx`)

fashn.ai'daki hero'nun BIREBIR tasarimi:

```
Layout:
- Tam genislik, beyaz arka plan
- Ortada metin, sol ve sagda gorsel collage

Sol taraf goller (collage):
- 3 urun gorseli: ustuste, farkli boyutlarda, hafif egik
  - Ust: Mavi gomlek (manken uzerinde degil, duz fotograf)
  - Orta: Pembe canta
  - Alt: Kirmizi etek
- Gorseller rounded-2xl, soft shadow
- Hafif rotation (-3deg, 2deg, -1deg)

Orta metin:
- Ana baslik (2 satir, serif font, buyuk):
  "Kiyafetlerinizin gercekci"
  "gosellerini olusturun, *herkes uzerinde*"
  ("herkes uzerinde" kismi italic + pembe/accent renk)
- Alt aciklama (sans-serif, text-secondary, max-w-lg):
  "Dijital Mankenim, markalara ve ajanslara ozel AI modelleri ile
   premium urun gorselleri ve sanal deneme deneyimleri sunar."
- CTA buton: "Ucretsiz Baslayin ->" (primary, buyuk)
- Altta kucuk: "Kredi karti gerekmez" (text-muted, text-sm)

Sag taraf gorseller (collage):
- 2-3 model gorseli: Ayni urunleri giyen AI mankenlerin sonuclari
  - Ust: Mavi gomlek giyen model (sokak ortami)
  - Orta: Pembe canta tasiyan model (yesil arka plan)
  - Alt: Kirmizi etek giyen model
- Gorseller rounded-2xl, soft shadow
- Farkli boyutlarda, collage tarzinda dizilim
```

Placeholder gorseller icin unsplash fashion gorselleri kullan (next/image ile).

### 9.2 Interaktif Demo Section (`src/components/landing/interactive-demo.tsx`)

fashn.ai'daki "See it in action" boluumunun Turkce versiyonu:

```
- Section badge: [sparkle] Interaktif Demo
- Baslik: "Canli *olarak* gorun" (serif, "olarak" italic pembe)
- Alt yazi: "Dijital Mankenim ile neler yapabileceginizi kesfdin."

- Sol taraf: Model fotografi (buyuk, rounded-2xl)
  - Altta "Sifirla" butonu

- Sag taraf: Ozellik listesi (secim kartlari)
  - Her biri bir kart: ikon + baslik
  - Aktif olan: bg-[--primary] text-white
  - Diger: bg-white border hover efekti
  
  Secenekler:
  1. [tshirt icon] Urunden Modele (varsayilan aktif)
  2. [move icon] Poz Degistir
  3. [image icon] Arka Plan Degistir
  4. [edit icon] Duzenle
  5. [video icon] Video Olustur
  6. [users icon] Model Degistir

Aktif secenege gore sol taraftaki gorsel degisir (animasyonlu gecis).
Gercekte statik gorseller arasinda gecis yap, AI calistirma.
```

### 9.3 Ozellikler Zigzag Section (`src/components/landing/features-zigzag.tsx`)

fashn.ai'daki "Everything you need for your fashion brand" boluumunun Turkce versiyonu:

```
- Section badge: [sparkle] Guclu Ozellikler
- Baslik: "Moda markaniz icin"
         "*gereken her sey*" (serif, italic pembe ikinci satir)
- Alt yazi: "Yuksek standartlarinizdan odun vermeyin. Tutarli, studyo kalitesinde
            AI moda fotografciligi ile taninmayiniz."

Zigzag satirlari:

SATIR 1 (gorsel solda, metin sagda):
- Gorsel: 5 fotograf yan yana (duz urun -> model uzerinde gecis gorseli)
- Label: "URUN FOTOGRAFCILIGI"
- Baslik: "Urunden Modele" (serif, buyuk)
- Metin: "Duz yatan veya manken uzerindeki urun fotograflarinizdan, profesyonel model uzerinde cekimler olusturun. Tek bir gorsel ile saniyeler icinde, fotografci maliyetini ortadan kaldirin."
- Butonlar: [Urunden Modele] (outlined) + "Daha fazla ->" (text link)

SATIR 2 (metin solda, gorsel sagda):
- Label: "GORSEL DUZENLEME"
- Baslik: "Model Degistirme" (serif)
- Metin: "Fotograftaki modeli degistirin, urun, poz, isiklandirma ve arka plan ayni kalsin. Kisiyi degistirin, urununuz kusursuz korunsun."
- Butonlar: [Model Degistir] (outlined) + "Daha fazla ->"
- Gorsel: 3 farkli model ayni kiyafet ile yan yana

SATIR 3 (gorsel solda, metin sagda):
- Label: "VIDEO URETIMI"
- Baslik: "Kisa Video Olusturma" (serif)
- Metin: "Statik gorsellerinizi kisa hareket videolarina donusturun. Sosyal medya ve e-ticaret icin dikkat cekici icerikler uretin."
- Butonlar: [Video Olustur] (outlined) + "Daha fazla ->"
- Gorsel: Video onizleme kareleri

SATIR 4 (metin solda, gorsel sagda):
- Label: "TUTARLI MODELLER"
- Baslik: "Tutarli AI Modeller" (serif)
- Metin: "Tum fotograflariniizda ayni yuz ve vucut oranlarini kullanin. Marka kimliginiz icin taninan bir yuz olusturun ve tum urun gorsellerinizde tekrar kullanin."
- Butonlar: [Model Olustur] (outlined) + "Daha fazla ->"
```

### 9.4 Ornek Galeri (`src/components/landing/examples-gallery.tsx`)
- Baslik: "Gercek *Sonuclar*"
- 3x2 veya 4x2 grid gorsel galerisi
- Her gorsel: Once (urun) -> Sonra (model uzerinde) onizleme
- Hover'da buyume + overlay bilgi

### 9.5 Referanslar Section (`src/components/landing/testimonials.tsx`)

fashn.ai'daki carousel'in birebir kopyasi:

```
- Section badge: [quote] Referanslar
- Baslik: "Dunyanin dort bir yanindaki" (serif, pembe)
         "*markalar tarafindan seviliyor*" (italic pembe)
- Alt metin: "Markalarin, tasarimcilarin ve icerik ureticilerin Dijital Mankenim'in
             AI destekli teknolojisini nasil kullandigini kesfdin."

Carousel:
- 3 kart gorunur: ortadaki tam boyut, yanlardakiler kuculmus + opacity dusuk
- Her kartta:
  - Marka logosu (daire, 60px)
  - Tirnak isareti icinde yorum metni (italic)
  - Marka adi (bold)
  - Lokasyon (ikon + sehir, ulke)
  - "Hikayeyi Oku ->" link
- Altta: Sol/sag ok butonlari + dot indicator (aktif dot uzun bar)
- Altinda: "Tum musteri hikayelerini gorun ->" link
- Otomatik kayma (5 saniyede bir) + manual kontrol
```

### 9.6 Fiyatlandirma Section (`src/components/landing/pricing-section.tsx`)

fashn.ai'daki pricing'in birebir Turkce versiyonu:

```
- Ust: 3 guven ikonu satiri:
  [shield] Guvenli Odeme | [bolt] Aninda Erisim | [x] Istediginiz Zaman Iptal
  (Powered by Stripe)     (Hemen uretmeye baslayin) (Uzun donem taahhut yok)

- Tab secim: [Uygulama] [Gelistirici API]  (toggle butonlar)
- Periyot: Aylik / Yillik (toggle, yillikta "2 ay hediye" badge)

3 Fiyat Karti yan yana:

BASLANGIC                  PROFESYONEL (EN POPULER)     KURUMSAL
99 TL/ay                   349 TL/ay                    749 TL/ay

- 50 aylik kredi           - 200 aylik kredi            - 500 aylik kredi
- Tum AI araclar           + Pro'daki her sey           + Pro'daki her sey
  (Urunden Modele,         - En gercekci AI gorsel      - 1500 aylik + 100 
   Model Degistir,           kalitesi                     gunluk kredi
   Sanal Deneme,           - AI videolar (720p)         - Ozel yuz referansi
   AI Gorsel Duzenleme)    - 5 takim uyesi              - AI videolar (1080p)
- 4x gorsel uretimi        - 6 esanli uretim           - 10 takim uyesi
  ve yukseltme             - Oncelikli destek           - 15 esanli uretim
- AI videolar (480p)                                    - Oncelikli ozellik
- 2 takim uyesi                                           istekleri
- 3 esanli uretim
- Chat destek

[Baslangic ->] (outlined)  [Pro Basla ->] (filled,      [Kurumsal ->] (outlined)
                            primary bg)

Altta kucuk yazi: *Krediler 30 gunde bir yenilenir
```

Ortadaki "Profesyonel" karti:
- "En Populer" badge (ust ortada, primary bg, beyaz text, rounded-full)
- Hafif yukari kaymis (translateY -8px)
- Border: 2px solid --primary
- Shadow daha belirgin

### 9.7 Blog Section (`src/components/landing/blog-section.tsx`)

```
- Section badge: [book] Blogdan
- Baslik: "Son *Guncellemeler*" (serif, italic pembe)
- Alt metin: "Dijital Mankenim'den ipuclari, rehberler ve haberler."

3 kart yan yana:
- Her kart: Buyuk gorsel (ust), kategori badge'leri (MODA, AI, TEKNIK), baslik, kisa ozet, yazar + tarih
- Hover: gorsel zoom + shadow artisi
- Altinda: "Tum blog yazilarini gorun ->" link
```

### 9.8 CTA Section (`src/components/landing/cta-section.tsx`)

fashn.ai'daki final CTA boluumunun birebir kopyasi:

```
- Arka plan: Acik gri/bej + yari saydam manken siluetleri (opacity: 0.15)
  - 4-5 farkli pozda manken gorseli, arka planda buyuk ve soluk
- Ust overlay: Hafif gradient (beyazdan saydama)

Metin (ortali):
- Baslik: "Moda iceriklerinizin kontrolunu" (serif, buyuk)
         "*elinize alin*" (italic, pembe)
- Alt metin: "Binlerce marka ve icerik uretici, saniyeler icinde profesyonel
             gorseller olusturmak icin Dijital Mankenim kullaniyor."
- CTA buton: "Ucretsiz Baslayin ->" (primary, buyuk)
- Altinda: "Kredi karti gerekmez" kucuk yazi
```

### 9.9 Footer (`src/components/shared/footer.tsx`)

fashn.ai'daki footer'in birebir kopyasi:

```
Arka plan: Beyaz/acik gri, ust border

5-6 kolon:

DIJITAL      ARACLAR         COZUMLER        KAYNAKLAR       SIRKET
MANKENIM
             Sanal Deneme    E-Ticaret       API Dok.        Hakkimizda
             Urunden Modele  Moda Markalar   Yardim          Blog
             Model Degistir  Ajanslar        Degisiklik      Kariyer
             Model Olustur   Fotografcilar   Gunlugu
             Video Olustur                   Durum
             Arka Plan Sil
             Gorsel Duzenleme

Alt kisim:
Sol: [Logo: DIJITAL MANKENIM] + "Tum sistemler calisir" (yesil dot + yazi)
Sag: Dil secici [TR Turkce v]
Alt: Gizlilik Politikasi | Kullanim Sartlari
```

---

## ADIM 10: AUTH SAYFALARI

### Giris (`src/app/(auth)/giris/page.tsx`)
- Tam ekran, 2 kolon (mobilde tek kolon)
- Sol: Form alani
  - Logo
  - "Hosgeldiniz" basligi
  - Email input
  - Sifre input
  - "Sifremi unuttum" linki
  - "Giris Yap" butonu (primary, full-width)
  - Cizgi ayirici: "veya"
  - "Google ile Devam Et" butonu (outlined, Google ikonu)
  - "Hesabiniz yok mu? Kayit Olun" linki
- Sag: Marka alani
  - Gradient arka plan (--primary tonlari)
  - Buyuk gorsel (AI manken ornegi)
  - Slogan metni

### Kayit (`src/app/(auth)/kayit/page.tsx`)
- Ayni layout
- Form: Ad Soyad + Email + Sifre + Sifre Tekrar + Kullanim sartlari checkbox
- Sag tarafta: "5 ucretsiz kredi hediye!" vurgusu

---

## ADIM 11: DASHBOARD

### Layout (`src/app/dashboard/layout.tsx`)
Auth kontrolu + sidebar + topbar. fashn.ai uygulamasinin temiz layoutu.

### Sidebar (`src/components/dashboard/sidebar.tsx`)
- Ust: Logo
- Nav gruplari:
  - ANA: Dashboard, Galeri, Uret
  - HESAP: Sonuclarim, Tokenler, Profil
  - GELISTIRICI: API Erisimi
- Her item: ikon + yazi, aktif olana bg highlight
- Alt: Token bakiyesi gosterimi (ikon + rakam + "Token" yazisi)
- Alt: Kullanici mini profil (avatar + isim + cikis)

### Dashboard Ana (`src/app/dashboard/page.tsx`)
- 4 stat karti: Token Bakiyesi, Toplam Uretim, Bu Ay Uretim, Favoriler
- Son 5 uretim (kucuk thumbnail listesi)
- Hizli erisim: "Yeni Uretim" + "Token Al" butonlari

---

## ADIM 12: GALERI, URETIM, SONUCLARIM, TOKENLER, PROFIL, API ERISIM

(Bu sayfalarin detaylari PROJE_PLANI.md dosyasindaki gibi uygula. Tasarim dili her yerde ayni: fashn.ai tarzi, serif basliklar, temiz kartlar, --primary renk paleti.)

### Galeri (`/dashboard/galeri`)
- Filtre paneli + grid gorunum
- Kategoriler: Kadin, Erkek, Cocuk / Ust Giyim, Alt Giyim, Elbise, Dis Giyim
- Kart: Thumbnail + isim + badge + hover efekti

### Uretim (`/dashboard/uret`) - EN KRITIK SAYFA
- Adim 1: Sablon sec (mini galeri)
- Adim 2: Urun fotografi yukle (drag & drop)
- Adim 3: Onizleme + ayarlar (foto/video, HD toggle, token maliyeti)
- Adim 4: Uretim sureci (progress bar, polling)
- Adim 5: Sonuc (once/sonra karsilastirma slider, indirme)

### Sonuclarim (`/dashboard/sonuclarim`)
- Grid gorunum, filtreler, sayfalama
- Her kart: cikti thumbnail, tarih, sablon adi, token, durum badge
- Tikla -> detay modal

### Tokenler (`/dashboard/tokenler`)
- Bakiye + son 30 gun grafik
- 3 fiyat paketi (ayni pricing section tasarimi)
- Stripe checkout akisi
- Islem gecmisi tablosu

### Profil (`/dashboard/profil`)
- Foto, isim, email, sifre degistirme
- Bildirim tercihleri

### API Erisim (`/dashboard/api-erisim`)
- API key olustur/yenile
- Inline dokumantasyon (curl + JS + Python ornekleri)

---

## ADIM 13: ADMIN PANELI

Admin role kontrolu ile korunan ayrı layout.

### Admin Dashboard
- Stat kartlari + grafikler (recharts: line + bar)
- Son aktiviteler

### Sablon Yonetimi
- CRUD tablo + modal form (gorsel upload dahil)

### Kullanici Yonetimi
- Tablo + arama + islemler (token ekle, rol degistir)

### Uretim Kayitlari
- Filtrelenebilir tablo

### Token Paketleri
- CRUD islemleri

---

## ADIM 14: API ROUTES

Tum API route'lari ADIM 5'teki lib fonksiyonlarini kullansın. Detaylar:

- `POST /api/generate` - Token kontrol + S3 upload + AI istek + Generation kayit
- `GET /api/generate/[id]` - Durum sorgulama
- `POST /api/generate/callback` - AI webhook sonuc
- `POST /api/tokens/purchase` - Stripe checkout session
- `POST /api/webhooks/stripe` - Stripe webhook -> token ekleme
- `POST /api/upload` - Presigned URL
- `GET/POST /api/templates` - Sablon CRUD (admin)
- `/api/v1/*` - Public API (API key auth + rate limit)

---

## ADIM 15: SEED DATA

`prisma/seed.ts`:
- 3 token paketi (fiyatlarla)
- 1 admin (admin@dijitalmankenim.com / admin123)
- 1 test kullanici (test@test.com / test123, 100 token)
- 12 ornek MankenTemplate (unsplash placeholder gorselleri ile)
- package.json'a seed scripti ekle

---

## ADIM 16: MIDDLEWARE

`src/middleware.ts`:
- /dashboard/* icin auth kontrolu -> giris'e yonlendir
- /admin/* icin admin role kontrolu -> 404
- Security header'lari

---

## UYGULAMA SIRASI

1. Proje kurulumu + paket yukleme
2. Env + Prisma schema + generate
3. globals.css + tailwind.config.ts (renkler, fontlar)
4. Lib dosyalari (prisma, auth, utils, validations, tokens, s3, ai, stripe)
5. UI componentleri (button, card, input, modal, badge, section-badge, skeleton, progress)
6. Shared componentler (navbar MEGA MENU dahil, footer, logo)
7. Landing page (TUM section componentleri: hero, interactive-demo, features-zigzag, examples-gallery, testimonials, pricing, blog, cta)
8. Auth sayfalari (giris + kayit)
9. Dashboard layout + sidebar + topbar
10. Dashboard ana sayfa
11. API routes: auth, upload, templates
12. Galeri sayfasi
13. Uretim sayfasi + generate API (mock mode dahil)
14. Sonuclarim sayfasi
15. Token sayfasi + Stripe entegrasyonu
16. Profil + API erisim sayfalari
17. Admin layout + tum admin sayfalari
18. Seed data
19. Middleware
20. Responsive duzeltmeler + animasyonlar + SEO metadata
21. Son test

## ONEMLI NOTLAR

1. **TASARIM**: fashn.ai'nin tasarim dili %100 uygulanmali. Serif + sans-serif karisimi, pembe italic vurgular, section badge'ler, zigzag layout, mega menu, testimonial carousel - bunlar ZORUNLU.
2. **Turkce**: Tum UI metinleri Turkce. Kod Ingilizce.
3. **Mock AI**: `AI_MOCK_MODE=true` ile AI olmadan calisabilmeli.
4. **Placeholder**: Unsplash fashion gorselleri kullan.
5. **Fontlar**: Playfair Display (serif basliklar) + Inter (body). Google Fonts, next/font ile.
6. **Performans**: next/image, lazy loading.
7. **Animasyon**: Framer Motion ile sayfa gecisleri, hover efektleri, modal animasyonlari.
