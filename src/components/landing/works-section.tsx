import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BeforeAfterSlider } from "@/components/shared/before-after-slider";
import { INSTAGRAM_URL, productVariants } from "@/lib/site";

// Tek ürün fotoğrafından üretilen önce / sonra ve farklı varyasyonlar
export function WorksSection() {
  return (
    <section id="isler" className="scroll-mt-20 bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow text-wine">Tek fotoğraf, sınırsız sonuç</p>
            <h2 className="font-display mt-4 text-5xl leading-[1] text-ink sm:text-6xl">
              Önce masada.
              <br />
              <em>Sonra vitrinde.</em>
            </h2>
          </div>
          <p className="max-w-md text-stone lg:justify-self-end">
            Katlanmış bir tişörtün tek fotoğrafından; farklı manken, poz ve fonlarla
            istediğiniz kadar görsel. Çizgiyi kaydırarak karşılaştırın.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <BeforeAfterSlider
            before="/images/once-sonra/tisort-once.jpg"
            after="/images/once-sonra/tisort-sonra.jpg"
            alt="Siyah tişört"
            sizes="(max-width: 1024px) 92vw, 600px"
            className="aspect-[4/5] rounded-3xl"
          />

          <div className="grid grid-cols-2 gap-4">
            {productVariants.map((variant) => (
              <figure key={variant.src} className="group relative aspect-[4/5] overflow-hidden rounded-3xl">
                <Image
                  src={variant.src}
                  alt={`Aynı tişört — ${variant.label}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 46vw, 300px"
                />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur-sm">
                  {variant.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-ink underline decoration-wine decoration-2 underline-offset-4 hover:text-wine"
        >
          Müşteri işlerimizi Instagram öne çıkanlarda görün
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
