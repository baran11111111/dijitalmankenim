"use client";

import Image from "next/image";
import { ExternalLink, MessageCircle, Send } from "lucide-react";

const INSTAGRAM_USERNAME = "dijitalmankenim";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;

const referenceImages = [
  { src: "/images/examples/example-01.png", label: "Profesyonel Çekim" },
  { src: "/images/examples/example-03.png", label: "Ev Ortamı" },
  { src: "/images/examples/example-05.png", label: "Modern Katalog" },
  { src: "/images/examples/example-12.png", label: "Özel Tasarım" },
];

export function InstagramSection() {
  return (
    <section id="iletisim" className="bg-[var(--surface)] py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Başlık */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-1.5 text-sm font-semibold text-pink-600">
            <InstagramGradientIcon size={14} />
            Hemen Sipariş Ver
          </div>
          <h2 className="mt-5 text-3xl font-bold text-[var(--text)] sm:text-5xl">
            Instagram&apos;dan bize ulaşın
          </h2>
          <span className="gold-divider" />
          <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">
            Kayıt olmadan, form doldurmadan. Direkt Instagram DM&apos;den ürün fotoğrafınızı
            gönderin — sizinle hızlıca iletişime geçelim.
          </p>
        </div>

        {/* Ana kart */}
        <div className="relative mx-auto max-w-4xl">
          {/* Glow bg */}
          <div className="absolute -inset-2 rounded-[2.5rem] opacity-20 blur-2xl"
            style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }} />

          <div className="relative rounded-3xl border border-white/60 bg-white shadow-2xl overflow-hidden">
            {/* Gradient top bar */}
            <div className="h-1.5 w-full"
              style={{ background: "linear-gradient(90deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }} />

            <div className="grid gap-0 lg:grid-cols-2">
              {/* Sol — Adımlar */}
              <div className="p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                    style={{ background: "linear-gradient(135deg, #f09433, #dc2743, #bc1888)" }}>
                    <InstagramGradientIcon size={22} white />
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text)]">@{INSTAGRAM_USERNAME}</p>
                    <p className="text-xs text-[var(--text-muted)]">Resmi hesabımız</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      num: "1",
                      icon: <InstagramGradientIcon size={16} />,
                      title: "Hesabımızı Bulun",
                      desc: `Instagram'da @${INSTAGRAM_USERNAME} hesabını ziyaret edin.`,
                    },
                    {
                      num: "2",
                      icon: <Send className="h-4 w-4" style={{ color: "#dc2743" }} />,
                      title: "DM Gönderin",
                      desc: "Ürün fotoğrafınızı ve isteklerinizi mesaj olarak gönderin.",
                    },
                    {
                      num: "3",
                      icon: <MessageCircle className="h-4 w-4" style={{ color: "#cc2366" }} />,
                      title: "Teklif Alın",
                      desc: "Size özel fiyat teklifi ve paket seçeneklerini paylaşalım.",
                    },
                    {
                      num: "4",
                      icon: <span className="text-[var(--gold)] text-sm">✨</span>,
                      title: "48 Saatte Teslim",
                      desc: "Profesyonel AI manken görselleriniz hazır — DM ile teslim!",
                    },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4">
                      <div className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--border)] bg-white text-xs font-black text-[var(--text-muted)]">
                        {step.num}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          {step.icon}
                          <p className="font-semibold text-sm text-[var(--text)]">{step.title}</p>
                        </div>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="instagram-section-cta"
                  className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  style={{
                    background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                    boxShadow: "0 8px 24px rgba(220,39,67,0.3)"
                  }}
                >
                  <InstagramGradientIcon size={18} white />
                  Instagram&apos;da Mesaj Gönder
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </a>

                <p className="mt-3 text-center text-xs text-[var(--text-muted)]">
                  Ücretsiz danışma · Kayıt gerekmez · Hızlı yanıt
                </p>
              </div>

              <div className="relative bg-[var(--primary)] p-6 sm:p-8 flex flex-col justify-center gap-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]/70 mb-1">
                  AI MANKEN
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {referenceImages.map((ref, i) => (
                    <div key={i} className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10">
                      <Image 
                        src={ref.src} 
                        alt={ref.label} 
                        fill 
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-110" 
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-2 left-0 right-0 text-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-[9px] font-bold text-white bg-black/30 px-2 py-1 rounded-lg backdrop-blur-sm">
                          {ref.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Instagram takipçi göstergesi */}
                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                  <div className="flex -space-x-2">
                    {[modelImages[0], modelImages[1], modelImages[2]].map((src, i) => (
                      <div key={i} className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-[var(--primary-light)]">
                        <Image src={src} alt="Müşteri" fill className="object-cover object-top" sizes="32px" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">500+ mutlu müşteri</p>
                    <div className="flex mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-[var(--gold)] text-[10px]">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alt not */}
        <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
          Veya doğrudan şu adresi ziyaret edin:{" "}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2 hover:opacity-75 transition-opacity"
            style={{ color: "#dc2743" }}
          >
            instagram.com/{INSTAGRAM_USERNAME}
          </a>
        </p>
      </div>
    </section>
  );
}

const modelImages = [
  "/images/examples/example-02.png",
  "/images/examples/example-04.png",
  "/images/examples/example-06.png",
];

function InstagramGradientIcon({ size = 16, white = false }: { size?: number; white?: boolean }) {
  if (white) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <linearGradient id="ig-grad-section" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <path fill="url(#ig-grad-section)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}
