import { BeforeAfterSlider } from "@/components/shared/before-after-slider";
import { beforeAfterWorks } from "@/lib/site";

// Müşteri ürünlerinden gerçek önce / sonra örnekleri
export function WorksSection() {
  return (
    <section id="isler" className="scroll-mt-20 bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow text-wine">Gerçek müşteri işleri</p>
            <h2 className="font-display mt-4 text-5xl leading-[1] text-ink sm:text-6xl">
              Önce askıda.
              <br />
              <em>Sonra vitrinde.</em>
            </h2>
          </div>
          <p className="max-w-md text-stone lg:justify-self-end">
            Butiklerin bize gönderdiği sıradan ürün fotoğrafları ve teslim ettiğimiz
            görseller. Çizgiyi kaydırarak karşılaştırın — kumaşın, desenin ve
            düğmelerin aslına uygun kalmasına özen gösteriyoruz.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-4 sm:gap-x-5">
          {beforeAfterWorks.map((work, i) => (
            <figure key={work.title}>
              <BeforeAfterSlider
                before={work.before}
                after={work.after}
                alt={work.title}
                unoptimized
                className="aspect-[3/4] rounded-2xl bg-paper-2"
              />
              <figcaption className="mt-3 flex items-baseline gap-2 border-t border-line pt-3 text-sm sm:gap-3 sm:text-base">
                <span className="font-display text-lg text-stone">0{i + 1}</span>
                <span className="font-semibold text-ink">{work.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
