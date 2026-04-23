import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionBadge } from "@/components/shared/section-badge";

const rows = [
  {
    label: "ÜRÜN FOTOĞRAFÇILIĞI",
    title: "Üründen Modele",
    description:
      "Düz yatan veya askı üzerindeki ürün fotoğraflarınızdan, profesyonel model üzerinde gerçekçi çekimler oluşturun. Tek görsel, sonsuz kombinasyon.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&auto=format&fit=crop",
    reverse: false,
    href: "/dashboard/uret",
  },
  {
    label: "GÖRSEL DÜZENLEME",
    title: "Model Değiştirme",
    description:
      "Fotoğraftaki modeli değiştirin, ürün, poz, ışıklandırma ve arka plan aynı kalsın. Farklı pazarlar için farklı modeller, sıfır çekim maliyeti.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop",
    reverse: true,
    href: "/dashboard/uret",
  },
  {
    label: "VİDEO ÜRETİMİ",
    title: "Kısa Video Oluşturma",
    description:
      "Statik görsellerinizi kısa hareket videolarına dönüştürün. Sosyal medya ve e-ticaret için dikkat çekici içerikler üretin.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&auto=format&fit=crop",
    reverse: false,
    href: "/dashboard/uret",
  },
  {
    label: "TUTARLI MODELLER",
    title: "Tutarlı AI Modeller",
    description:
      "Marka kimliğiniz için tanınan bir yüz oluşturun ve tüm ürün görsellerinizde tekrar kullanın. Koleksiyonlar arasında mükemmel devamlılık.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&auto=format&fit=crop",
    reverse: true,
    href: "/dashboard/galeri",
  },
];

export function FeaturesZigzag() {
  return (
    <section className="bg-[var(--surface)] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <SectionBadge
            icon={<Sparkles className="h-4 w-4 text-[var(--gold)]" />}
            text="Güçlü Özellikler"
          />
          <h2 className="mt-5 text-3xl font-bold text-[var(--text)] sm:text-5xl">
            Moda markanız için
            <br />
            <span className="text-accent-italic">gereken her şey</span>
          </h2>
          <span className="gold-divider" />
          <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
            Yüksek standartlarınızdan ödün vermeyin. Tutarlı, stüdyo kalitesinde
            AI moda fotoğrafçılığı ile tanının.
          </p>
        </div>

        <div className="space-y-20">
          {rows.map((row, idx) => (
            <div
              key={row.title}
              className={`grid items-center gap-10 lg:grid-cols-2 ${
                row.reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Görsel */}
              <div className="group relative h-80 overflow-hidden rounded-3xl shadow-xl sm:h-[420px]">
                <Image
                  src={row.image}
                  alt={row.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-transparent" />
                {/* Numara rozeti */}
                <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--gold)] text-sm font-bold text-[var(--primary)] shadow-lg">
                  {idx + 1}
                </div>
              </div>

              {/* Metin */}
              <div className={row.reverse ? "" : "lg:pl-6"}>
                <p className="label-tag">{row.label}</p>
                <h3 className="mt-3 text-3xl font-bold text-[var(--text)] sm:text-4xl">
                  {row.title}
                </h3>
                {/* Altın çizgi */}
                <div className="mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)]" />
                <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
                  {row.description}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href={row.href}
                    className="group inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[var(--primary-hover)] hover:shadow-lg"
                  >
                    {row.title}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href={row.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--gold)] transition-opacity hover:opacity-70"
                  >
                    Daha fazla →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
