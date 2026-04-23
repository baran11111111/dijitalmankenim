import Image from "next/image";
import { SectionBadge } from "@/components/shared/section-badge";
import { MessageCircle, Sparkles } from "lucide-react";

const INSTAGRAM_USERNAME = "dijitalmankenim";

const steps = [
  {
    step: "01",
    emoji: "📸",
    title: "Ürün Fotoğrafını Gönder",
    description:
      "Instagram DM üzerinden ürün fotoğrafınızı bize gönderin. Düz arka planlı, net çekilmiş fotoğraflar en iyi sonucu verir.",
    tip: "💡 Beyaz veya gri arka planlı fotoğraflar idealdir",
  },
  {
    step: "02",
    emoji: "💬",
    title: "Paket & Teklif Alın",
    description:
      "İhtiyacınıza uygun paketi birlikte belirleyelim. 1 fotoğraftan 50 fotoğrafa kadar, video seçeneği de dahil olmak üzere esnek paketlerimiz var.",
    tip: "💡 En popüler: 15 fotoğraf + 1 video paketi",
  },
  {
    step: "03",
    emoji: "✨",
    title: "48 Saatte Teslim Al",
    description:
      "Siparişiniz onaylandıktan sonra 48 saat içinde profesyonel AI manken görsellerinizi Instagram veya WhatsApp üzerinden teslim alırsınız.",
    tip: "💡 Premium pakette 24 saatte teslimat",
  },
];

const exampleModels = [
  "/images/examples/example-01.png",
  "/images/examples/example-02.png",
  "/images/examples/example-03.png",
  "/images/examples/example-04.png",
  "/images/examples/example-05.png",
  "/images/examples/example-06.png",
  "/images/examples/example-07.jpg",
  "/images/examples/example-08.png",
  "/images/examples/example-09.png",
  "/images/examples/example-10.png",
  "/images/examples/example-11.png",
  "/images/examples/example-12.png",
];

export function HowItWorks() {
  return (
    <section id="nasil-calisir" className="bg-[var(--background)] py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-16 text-center">
          <SectionBadge
            icon={<Sparkles className="h-4 w-4 text-[var(--gold)]" />}
            text="Süreç"
          />
          <h2 className="mt-5 text-3xl font-bold text-[var(--text)] sm:text-5xl">
            3 adımda profesyonel manken görseli
          </h2>
          <span className="gold-divider" />
          <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">
            Kayıt yok, form yok. Sadece Instagram DM — gerisi bizde.
          </p>
        </div>

        {/* Adımlar */}
        <div className="relative grid gap-8 lg:grid-cols-3 mb-20">
          {/* Bağlantı çizgisi */}
          <div className="absolute left-[16.67%] right-[16.67%] top-12 hidden h-0.5 bg-gradient-to-r from-[var(--gold)]/20 via-[var(--gold)]/60 to-[var(--gold)]/20 lg:block" />

          {steps.map((step, idx) => (
            <div key={step.step} className="relative flex flex-col items-center text-center">
              {/* Emoji dairesi */}
              <div className="relative z-10 mb-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[var(--gold)]/30 bg-white shadow-lg shadow-[var(--gold)]/10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]">
                    <span className="text-2xl">{step.emoji}</span>
                  </div>
                </div>
                <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--gold)] text-xs font-black text-[var(--primary)] shadow-md">
                  {idx + 1}
                </div>
              </div>

              <h3 className="text-xl font-bold text-[var(--text)]">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
                {step.description}
              </p>
              <p className="mt-4 rounded-xl bg-[var(--gold)]/8 px-4 py-2 text-xs font-medium text-[var(--gold-dark)]">
                {step.tip}
              </p>
            </div>
          ))}
        </div>

        {/* Galeri — örnek manken fotoğrafları */}
        <div className="mb-16">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-6">
            AI MANKEN
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {exampleModels.map((src, i) => (
              <div
                key={i}
                className="group relative aspect-[2/3] overflow-hidden rounded-2xl border border-[var(--border)] shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.03]"
              >
                <Image
                  src={src}
                  alt={`Örnek manken çekimi ${i + 1}`}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width:640px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-bold text-white bg-[var(--primary)]/70 px-2 py-0.5 rounded-full">
                    AI Manken
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alt CTA */}
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-[var(--primary)]/10 bg-[var(--primary)] p-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-xl font-bold text-white">Hemen denemek ister misiniz?</p>
            <p className="mt-1 text-white/60">
              Instagram DM&apos;den fotoğrafınızı gönderin, ücretsiz danışma alın.
            </p>
          </div>
          <a
            href={`https://www.instagram.com/${INSTAGRAM_USERNAME}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              boxShadow: "0 8px 24px rgba(220,39,67,0.3)"
            }}
          >
            <MessageCircle className="h-4 w-4" />
            Instagram&apos;dan Ulaş →
          </a>
        </div>
      </div>
    </section>
  );
}
