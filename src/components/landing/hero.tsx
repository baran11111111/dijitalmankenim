import Image from "next/image";
import { Sparkles, Star, Instagram } from "lucide-react";

const modelImages = [
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&auto=format&fit=crop&q=80",
];

const INSTAGRAM_USERNAME = "dijitalmankenim";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--primary)] flex items-center">
      {/* Grain doku */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Instagram gradient glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full opacity-10 blur-[120px]"
        style={{ background: "radial-gradient(circle, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }} />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-[var(--gold)] opacity-10 blur-[100px]" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 py-24 lg:py-0">

        {/* Sol — Metin */}
        <div className="z-10 animate-[slide-up_0.7s_cubic-bezier(0.22,1,0.36,1)_both]">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
            Yapay Zeka Destekli Manken Fotoğrafçılığı
          </div>

          <h1 className="text-5xl font-bold leading-[1.08] text-white sm:text-6xl xl:text-7xl">
            Ürününüzü
            <br />
            <span className="text-gold-gradient">gerçek mankende</span>
            <br />
            <span className="text-white">gösterin</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/55 sm:text-lg">
            Yapay zeka destekli dijital manken hizmeti. Ürün fotoğrafınızı
            Instagram'dan bize gönderin — 48 saat içinde profesyonel
            model çekimleriniz hazır.
          </p>

          {/* Instagram CTA */}
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href={`https://www.instagram.com/${INSTAGRAM_USERNAME}/`}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-cta-instagram"
            >
              <button className="group inline-flex items-center gap-3 rounded-2xl px-7 py-3.5 text-sm font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-pink-500/30"
                style={{
                  background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                  boxShadow: "0 8px 32px rgba(220,39,67,0.35)"
                }}>
                <InstagramIcon />
                Instagram'dan Ulaş
              </button>
            </a>
            <a href="#nasil-calisir">
              <button
                id="hero-cta-secondary"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:text-white"
              >
                Nasıl Çalışır?
              </button>
            </a>
          </div>

          <p className="mt-4 text-xs text-white/30">
            Kayıt gerekmez · Hızlı yanıt · 500+ mutlu müşteri
          </p>

          {/* İstatistikler */}
          <div className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-8">
            {[
              { label: "Mutlu Müşteri", value: "500+" },
              { label: "Teslimat Süresi", value: "48s" },
              { label: "Memnuniyet", value: "4.9★" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-[var(--gold)]">{stat.value}</p>
                <p className="mt-0.5 text-xs text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ — Görsel Kolaj */}
        <div className="relative hidden animate-[fade-in_0.9s_ease-out_0.2s_both] lg:block">
          <div className="relative h-[600px] w-full max-w-md mx-auto">

            {/* Arka kart sol */}
            <div className="absolute -left-6 top-16 h-80 w-52 overflow-hidden rounded-3xl border border-white/10 shadow-2xl opacity-60 rotate-[-5deg]">
              <Image src={modelImages[1]} alt="AI Model" fill className="object-cover object-top" sizes="208px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/70 to-transparent" />
            </div>

            {/* Ana kart — ortada büyük */}
            <div className="absolute left-[18%] top-4 h-[420px] w-64 overflow-hidden rounded-3xl border border-[var(--gold)]/25 shadow-2xl shadow-[var(--gold)]/10"
              style={{ boxShadow: "0 25px 60px rgba(220,39,67,0.15), 0 0 0 1px rgba(201,168,76,0.2)" }}>
              <Image src={modelImages[0]} alt="Profesyonel AI manken çekimi" fill className="object-cover object-top" sizes="256px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/80 via-transparent to-transparent" />
              {/* Instagram badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #f09433, #dc2743, #bc1888)" }}>
                <InstagramIcon size={10} />
                DM ile Sipariş
              </div>
              <div className="absolute bottom-5 left-4 right-4">
                <p className="text-xs font-medium text-white/60">Ürün fotoğrafından →</p>
                <p className="text-sm font-bold text-white">Profesyonel manken</p>
              </div>
            </div>

            {/* Sağ alt kart */}
            <div className="absolute right-0 bottom-12 h-72 w-52 overflow-hidden rounded-3xl border border-white/10 shadow-2xl rotate-[4deg] opacity-75">
              <Image src={modelImages[2]} alt="Model görseli" fill className="object-cover object-top" sizes="208px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/60 to-transparent" />
            </div>

            {/* Floating chip — süre */}
            <div className="absolute -bottom-2 left-[10%] z-10 flex items-center gap-3 rounded-2xl border border-[var(--gold)]/25 bg-[var(--primary-light)]/90 px-4 py-3 shadow-xl backdrop-blur-md">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--gold)]/15">
                <span className="text-base">⚡</span>
              </div>
              <div>
                <p className="text-xs text-white/55">Ortalama teslimat</p>
                <p className="text-sm font-bold text-white">48 saat</p>
              </div>
            </div>

            {/* Floating chip — rating */}
            <div className="absolute -top-4 right-4 z-10 flex items-center gap-2 rounded-2xl border border-white/10 bg-[var(--primary-light)]/90 px-3 py-2.5 shadow-xl backdrop-blur-md">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-[var(--gold)] text-[var(--gold)]" />
                ))}
              </div>
              <p className="text-xs font-bold text-white">4.9/5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dalga */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 40C1200 0 900 80 720 60C540 40 240 0 0 40L0 80Z" fill="#f2f4f8" />
        </svg>
      </div>
    </section>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}
