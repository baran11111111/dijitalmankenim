import { SampleForm } from "@/components/forms/sample-form";

const maddeler = [
  "Ürününüzün fotoğrafını yükleyin",
  "Kendi ürününüzle hazırlanmış bir örnek görsel alın",
  "Beğenirseniz paketinizi seçin — ödeme yok, taahhüt yok",
];

export function SampleSection({ varsayilanKategori }: { varsayilanKategori?: string }) {
  return (
    <section id="ornek" data-konum="ornek-formu" className="scroll-mt-20 bg-paper py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <div>
          <p className="eyebrow text-wine">Ücretsiz örnek</p>
          <h2 className="font-display mt-4 text-5xl leading-[1] text-ink sm:text-6xl">
            Önce görün, <em>sonra karar verin.</em>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-stone">
            Bir ürününüzün fotoğrafını bırakın; kendi ürününüzle hazırladığımız örnek görseli
            size ücretsiz gönderelim.
          </p>
          <ol className="mt-10 space-y-5">
            {maddeler.map((madde, i) => (
              <li key={madde} className="flex items-baseline gap-4">
                <span className="font-display text-3xl text-wine">{i + 1}</span>
                <span className="text-ink">{madde}</span>
              </li>
            ))}
          </ol>
        </div>

        <SampleForm varsayilanKategori={varsayilanKategori} />
      </div>
    </section>
  );
}
