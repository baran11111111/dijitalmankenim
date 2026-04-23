"use client";

import { useEffect, useMemo, useState } from "react";
import { Quote, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { SectionBadge } from "@/components/shared/section-badge";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    brand: "ModaNova",
    location: "İstanbul, Türkiye",
    initial: "MN",
    color: "from-[#1a2540] to-[#0f1629]",
    quote:
      "Dijital Mankenim ile ürün çekim süremizi %70 kısalttık. Kampanya çıkış hızımız ciddi şekilde arttı ve ajans maliyetlerimiz yarıya indi.",
  },
  {
    brand: "Atelier North",
    location: "Berlin, Almanya",
    initial: "AN",
    color: "from-[#1e2d4d] to-[#0f1629]",
    quote:
      "Tek ürün fotoğrafıyla birden fazla modelde tutarlı sonuç almak, içerik ekiplerimiz için büyük fark yarattı. Artık sezon gecişlerini saniyeler içinde hallediyoruz.",
  },
  {
    brand: "LunaWear",
    location: "Paris, Fransa",
    initial: "LW",
    color: "from-[#2a1a40] to-[#0f1629]",
    quote:
      "Sanal deneme ve video çıktıları sayesinde sosyal medya performansımız belirgin şekilde iyileşti. Müşteri dönüşüm oranı 2 haftada %47 arttı.",
  },
  {
    brand: "HypeStreet",
    location: "Londra, Birleşik Krallık",
    initial: "HS",
    color: "from-[#1a2a1a] to-[#0f1629]",
    quote:
      "Ajans maliyetlerini azaltırken kaliteyi yukarı çektik. Özellikle koleksiyon tanıtımlarında inanılmaz zaman tasarrufu sağladık.",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[active];

  return (
    <section id="referanslar" className="bg-[var(--background)] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center">
          <SectionBadge
            icon={<Quote className="h-4 w-4 text-[var(--gold)]" />}
            text="Referanslar"
          />
          <h2 className="mt-5 text-3xl font-bold text-[var(--text)] sm:text-5xl">
            Dünyanın dört bir yanından{" "}
            <br />
            <span className="text-accent-italic">markalar tarafından seviliyor</span>
          </h2>
          <span className="gold-divider mt-4" />
        </div>

        {/* Ana testimonyal kartı */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.8fr]">
          {/* Sol — Marka listesi */}
          <div className="flex flex-row gap-3 lg:flex-col">
            {testimonials.map((t, i) => (
              <button
                key={t.brand}
                onClick={() => setActive(i)}
                className={cn(
                  "group flex-1 lg:flex-none relative overflow-hidden rounded-2xl border p-4 lg:p-5 text-left transition-all duration-300",
                  i === active
                    ? "border-[var(--gold)]/40 bg-[var(--primary)] shadow-lg shadow-[var(--primary)]/20"
                    : "border-[var(--border)] bg-white hover:border-[var(--gold)]/20 hover:shadow-sm"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white",
                      t.color
                    )}
                  >
                    {t.initial}
                  </div>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "truncate text-sm font-semibold transition-colors",
                        i === active ? "text-white" : "text-[var(--text)]"
                      )}
                    >
                      {t.brand}
                    </p>
                    <p
                      className={cn(
                        "truncate flex items-center gap-1 text-xs mt-0.5",
                        i === active ? "text-white/50" : "text-[var(--text-muted)]"
                      )}
                    >
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="hidden lg:inline">{t.location}</span>
                    </p>
                  </div>
                </div>
                {/* Aktif göstergesi */}
                {i === active && (
                  <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-[var(--gold)]" />
                )}
              </button>
            ))}
          </div>

          {/* Sağ — Alıntı */}
          <div
            key={active}
            className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--primary)]/10 bg-[var(--primary)] p-8 shadow-2xl lg:p-12 animate-[fade-in_0.4s_ease-out]"
          >
            {/* Dekoratif arka plan */}
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[var(--gold)] opacity-5 blur-3xl translate-x-1/2 -translate-y-1/2" />

            <div>
              {/* Tırnak işareti */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold)]/15 text-[var(--gold)]">
                <Quote className="h-6 w-6" />
              </div>

              <blockquote className="text-xl font-light leading-relaxed text-white/85 lg:text-2xl">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <div>
                <p className="font-semibold text-white">{current.brand}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-white/50">
                  <MapPin className="h-3.5 w-3.5" />
                  {current.location}
                </p>
              </div>

              {/* Navigasyon */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 text-white/60 transition-all hover:border-[var(--gold)]/40 hover:text-[var(--gold)]"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActive((active + 1) % testimonials.length)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 text-white/60 transition-all hover:border-[var(--gold)]/40 hover:text-[var(--gold)]"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Nokta göstergesi */}
            <div className="mt-4 flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === active ? "w-8 bg-[var(--gold)]" : "w-1.5 bg-white/20"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
