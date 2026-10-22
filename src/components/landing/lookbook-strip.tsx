import Image from "next/image";

const looks = [
  { src: "/images/examples/example-02.png", label: "Çiçek pazarı" },
  { src: "/images/examples/example-10.png", label: "Stüdyo" },
  { src: "/images/examples/example-08.png", label: "Kapalıçarşı" },
  { src: "/images/examples/example-03.png", label: "Loft" },
  { src: "/images/examples/example-12.png", label: "Saray merdiveni" },
  { src: "/images/examples/example-01.png", label: "Gece şehir" },
  { src: "/images/examples/example-07.jpg", label: "Kumul" },
  { src: "/images/examples/example-05.png", label: "Sahil yolu" },
  { src: "/images/examples/example-09.png", label: "Havuz başı" },
  { src: "/images/examples/example-06.png", label: "Aile çekimi" },
];

// Mekân ve tarz çeşitliliğini gösteren kayan şerit
export function LookbookStrip() {
  return (
    <section className="overflow-hidden bg-ink py-16 text-cream sm:py-20">
      <div className="mx-auto mb-10 flex max-w-7xl flex-col gap-3 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:px-8">
        <h2 className="font-display text-4xl leading-tight sm:text-5xl">
          Ürününüz için <em className="text-[#e8b4ae]">istediğiniz sahne.</em>
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-cream/55">
          Beyaz stüdyodan sokak çekimine, tesettürden gece elbisesine. Mekânı, mankeni ve pozu siz seçin.
        </p>
      </div>

      <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
        {[...looks, ...looks].map((look, i) => (
          <figure
            key={i}
            aria-hidden={i >= looks.length}
            className="relative h-80 w-56 flex-shrink-0 overflow-hidden rounded-2xl sm:h-96 sm:w-64"
          >
            <Image
              src={look.src}
              alt={i < looks.length ? `AI manken örneği — ${look.label}` : ""}
              fill
              className="object-cover"
              sizes="256px"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-3 pt-10 text-xs font-semibold tracking-wide text-cream/90">
              {look.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
