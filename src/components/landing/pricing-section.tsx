"use client";

import Link from "next/link";
import { Check, Shield, Zap, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "deneme",
    name: "Deneme Çekimi",
    subtitle: "İlk kez denemek isteyenler için",
    price: 200,
    unit: "1 Fotoğraf",
    icon: "📸",
    popular: false,
    features: [
      "1 adet ürün görseli",
      "Beyaz/gri arka plan seçeneği",
      "JPG + PNG çıktı",
    ],
  },
  {
    id: "standart",
    name: "Stüdyo Standart",
    subtitle: "Düzenli içerik üretenler için",
    price: 1000,
    unit: "10 Fotoğraf",
    icon: "🏷️",
    popular: false,
    features: [
      "10 adet ürün görseli",
      "Birden fazla arka plan seçeneği",
      "JPG + PNG çıktı",
    ],
  },
  {
    id: "dinamik",
    name: "Dinamik Stüdyo",
    subtitle: "Sosyal medya ve e-ticaret için ideal",
    price: 2250,
    unit: "15 Fotoğraf + 1 Video",
    icon: "🎬",
    popular: true,
    features: [
      "15 adet ürün görseli",
      "1 adet kısa tanıtım videosu",
      "JPG + PNG + MP4 çıktı",
    ],
  },
  {
    id: "premium",
    name: "Premium Prodüksiyon",
    subtitle: "Büyük koleksiyonlar ve markalar için",
    price: 6000,
    unit: "50 Fotoğraf + 3 Video",
    icon: "👑",
    popular: false,
    features: [
      "50 adet ürün görseli",
      "3 adet kısa tanıtım videosu",
    ],
  },
];

const INSTAGRAM_USERNAME = "dijitalmankenim";

export function PricingSection() {
  return (
    <section id="fiyatlandirma" className="bg-[var(--background)] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/8 px-4 py-1.5 text-sm font-semibold text-[var(--gold-dark)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
            Şeffaf Fiyatlandırma
          </div>
          <h2 className="mt-5 text-3xl font-bold text-[var(--text)] sm:text-5xl">
            İhtiyacınıza uygun paketi seçin
          </h2>
          <span className="gold-divider" />
          <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">
            Tüm paketler tek seferlik ödeme. Sipariş sonrası ürün fotoğraflarınızı Instagram üzerinden gönderin.
          </p>
        </div>

        {/* Güvenceler */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-secondary)]">
          <span className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[var(--success)]" /> Güvenli Ödeme
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[var(--gold)]" /> 48 Saat Teslimat
          </span>
          <span className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[var(--primary)]" /> Anında Onay
          </span>
        </div>

        {/* Planlar */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-3xl border p-6 transition-all duration-300",
                plan.popular
                  ? "border-[var(--gold)]/40 bg-[var(--primary)] text-white shadow-2xl shadow-[var(--primary)]/30 lg:-translate-y-3"
                  : "border-[var(--border)] bg-white hover:border-[var(--gold)]/25 hover:shadow-lg"
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="btn-gold rounded-full px-5 py-1.5 text-xs font-bold shadow-lg whitespace-nowrap">
                    ✦ En Popüler
                  </div>
                </div>
              )}

              {/* İkon + Plan adı */}
              <div className="mb-1">
                <span className="text-3xl">{plan.icon}</span>
              </div>
              <h3
                className={cn(
                  "mt-2 text-base font-bold leading-tight",
                  plan.popular ? "text-white" : "text-[var(--text)]"
                )}
              >
                {plan.name}
              </h3>
              <p
                className={cn(
                  "mt-1 text-xs leading-snug",
                  plan.popular ? "text-white/55" : "text-[var(--text-muted)]"
                )}
              >
                {plan.subtitle}
              </p>

              {/* Fiyat */}
              <div className="mt-5">
                <span
                  className={cn(
                    "text-3xl font-extrabold",
                    plan.popular ? "text-[var(--gold-light)]" : "text-[var(--text)]"
                  )}
                >
                  {plan.price.toLocaleString("tr-TR")}
                  <span className="text-base font-normal"> TL</span>
                </span>
                <div
                  className={cn(
                    "mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    plan.popular
                      ? "bg-[var(--gold)]/20 text-[var(--gold-light)]"
                      : "bg-[var(--primary)]/8 text-[var(--primary)]"
                  )}
                >
                  {plan.unit}
                </div>
              </div>

              {/* Divider */}
              <div
                className={cn(
                  "my-5 h-px",
                  plan.popular ? "bg-white/10" : "bg-[var(--border-light)]"
                )}
              />

              {/* Özellikler */}
              <ul className="flex-1 space-y-2.5 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <div
                      className={cn(
                        "mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full",
                        plan.popular
                          ? "bg-[var(--gold)]/25 text-[var(--gold)]"
                          : "bg-[var(--primary)]/10 text-[var(--primary)]"
                      )}
                    >
                      <Check className="h-2.5 w-2.5" />
                    </div>
                    <span
                      className={
                        plan.popular ? "text-white/75" : "text-[var(--text-secondary)]"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`https://instagram.com/${INSTAGRAM_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "mt-6 block w-full rounded-xl py-3 text-center text-sm font-bold transition-all duration-200",
                  plan.popular
                    ? "btn-gold hover:scale-105"
                    : "border border-[var(--primary)] bg-transparent text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
                )}
              >
                Sipariş Ver
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
          Daha fazla görsele mi ihtiyacınız var?{" "}
          <a
            href={`https://instagram.com/${INSTAGRAM_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--gold-dark)] underline underline-offset-2 hover:text-[var(--gold)]"
          >
            Özel teklif için Instagram'dan yazın →
          </a>
        </p>
      </div>
    </section>
  );
}
