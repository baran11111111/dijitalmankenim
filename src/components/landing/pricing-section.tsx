import { Check, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { INSTAGRAM_DM_URL } from "@/lib/site";

const plans = [
  {
    id: "deneme",
    name: "Deneme",
    subtitle: "Sonucu kendi ürününüzde görün",
    price: 200,
    unit: "1 fotoğraf",
    popular: false,
    features: ["1 manken görseli", "Beyaz veya gri stüdyo zemini", "JPG + PNG çıktı", "48 saatte teslim"],
  },
  {
    id: "standart",
    name: "Stüdyo",
    subtitle: "Düzenli ürün yükleyen butikler",
    price: 1000,
    unit: "10 fotoğraf",
    popular: false,
    features: ["10 manken görseli", "Birden fazla zemin seçeneği", "JPG + PNG çıktı", "48 saatte teslim"],
  },
  {
    id: "dinamik",
    name: "Dinamik",
    subtitle: "Instagram ve e-ticaret için ideal",
    price: 2250,
    unit: "15 fotoğraf + 1 video",
    popular: true,
    features: ["15 manken görseli", "1 kısa tanıtım videosu", "JPG + PNG + MP4 çıktı", "48 saatte teslim"],
  },
  {
    id: "premium",
    name: "Prodüksiyon",
    subtitle: "Koleksiyonlar ve toptancılar",
    price: 6000,
    unit: "50 fotoğraf + 3 video",
    popular: false,
    features: ["50 manken görseli", "3 kısa tanıtım videosu", "JPG + PNG + MP4 çıktı", "24 saatte teslim"],
  },
];

export function PricingSection() {
  return (
    <section id="fiyatlar" className="scroll-mt-20 bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow text-wine">Fiyatlar</p>
            <h2 className="font-display mt-4 text-5xl leading-[1] text-ink sm:text-6xl">
              Net fiyat, <em>sürpriz yok.</em>
            </h2>
          </div>
          <p className="max-w-md text-stone lg:justify-self-end">
            Tüm paketler tek seferlik ödemedir ve revizyon hakkı içerir. Hangisinin size
            uygun olduğundan emin değilseniz DM&apos;den sorun, ücretsiz yönlendirelim.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-3xl p-7",
                plan.popular ? "bg-ink text-cream" : "border border-line bg-cream text-ink"
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-7 rounded-full bg-wine px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cream">
                  En çok tercih edilen
                </span>
              )}

              <h3 className="font-display text-3xl">{plan.name}</h3>
              <p className={cn("mt-1 text-sm", plan.popular ? "text-cream/60" : "text-stone")}>
                {plan.subtitle}
              </p>

              <div className="mt-8 flex items-baseline gap-1.5">
                <span className="font-display text-6xl leading-none">
                  {plan.price.toLocaleString("tr-TR")}
                </span>
                <span className={cn("text-lg", plan.popular ? "text-cream/60" : "text-stone")}>TL</span>
              </div>
              <p className={cn("mt-2 text-sm font-semibold", plan.popular ? "text-[#e8b4ae]" : "text-wine")}>
                {plan.unit}
              </p>

              <ul className={cn("mt-7 flex-1 space-y-3 border-t pt-6 text-sm", plan.popular ? "border-cream/15" : "border-line")}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className={cn("mt-0.5 h-4 w-4 flex-shrink-0", plan.popular ? "text-[#e8b4ae]" : "text-wine")} />
                    <span className={plan.popular ? "text-cream/80" : "text-ink/80"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={INSTAGRAM_DM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "mt-8 inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition-colors",
                  plan.popular
                    ? "bg-cream text-ink hover:bg-white"
                    : "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-cream"
                )}
              >
                Bu paketi iste
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-dashed border-ink/25 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-2xl text-ink">Toptancı mısınız ya da her ay yeni ürün mü çıkarıyorsunuz?</p>
            <p className="mt-1 text-sm text-stone">Yüksek adet ve düzenli çalışma için size özel fiyat çıkaralım.</p>
          </div>
          <a
            href={INSTAGRAM_DM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-cream transition-colors hover:bg-wine"
          >
            Özel teklif al
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
