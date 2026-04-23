import Image from "next/image";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

const INSTAGRAM_USERNAME = "dijitalmankenim";

const silhouettes = [
  "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=700&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=700&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=700&auto=format&fit=crop",
];

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--primary)] py-28">
      {/* Silüet arka planı */}
      <div className="pointer-events-none absolute inset-0">
        <div className="grid h-full grid-cols-2 gap-0 opacity-[0.12] lg:grid-cols-4">
          {silhouettes.map((src) => (
            <div key={src} className="relative">
              <Image src={src} alt="Silüet" fill className="object-cover object-top" sizes="25vw" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/80 via-[var(--primary)]/60 to-[var(--primary)]/80" />
      </div>

      {/* Glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold)] opacity-10 blur-[80px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold)] opacity-8 blur-[80px]" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-1.5 text-sm font-medium text-[var(--gold)]">
          <Sparkles className="h-3.5 w-3.5" />
          500+ mutlu müşteri
        </div>

        <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl leading-[1.1]">
          Ürünlerinizi
          <br />
          <span className="text-gold-gradient">profesyonelce sergileyin</span>
        </h2>

        <span className="gold-divider mt-6 mb-0" />

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
          Ürün fotoğrafınızı Instagram&apos;dan gönderin, paketinizi seçin. 48 saat içinde
          profesyonel ürün görselleriniz hazır.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={`https://instagram.com/${INSTAGRAM_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              id="cta-section-primary"
              className="btn-gold group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold shadow-xl shadow-[var(--gold)]/25 transition-all duration-200 hover:scale-105"
            >
              Hemen Sipariş Ver
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </a>
          <a
            href={`https://instagram.com/${INSTAGRAM_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              id="cta-section-instagram"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/8 px-8 py-4 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white/15 hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Instagram'dan Sor
            </button>
          </a>
        </div>

        <p className="mt-5 text-xs text-white/30">Hızlı teslimat · Revizyon hakkı dahil</p>
      </div>
    </section>
  );
}
