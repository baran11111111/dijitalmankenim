import { Check, X } from "lucide-react";

const rows = [
  { label: "Manken ve fotoğrafçı", classic: "Ayarlanması ve ücreti gerekir", ours: "Gerekmez" },
  { label: "Stüdyo ve ekipman", classic: "Kiralanır ya da kurulur", ours: "Gerekmez" },
  { label: "Hazırlık süresi", classic: "Günler, bazen haftalar", ours: "48 saat" },
  { label: "Farklı mekân / manken", classic: "Her biri ayrı çekim günü", ours: "Tek mesajla" },
  { label: "Başlangıç", classic: "Çekim günü bütçesi", ours: "1 fotoğraf, 200 TL" },
];

export function CompareSection() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <div>
          <p className="eyebrow text-wine">Neden Dijital Mankenim</p>
          <h2 className="font-display mt-4 text-5xl leading-[1] text-ink sm:text-6xl">
            Çekim gününü <em>atlayın.</em>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-stone">
            Her yeni sezonda onlarca ürün için manken, stüdyo ve fotoğrafçı ayarlamak
            küçük işletmeler için hem pahalı hem yavaş. Biz aynı sonucu ürün
            fotoğrafınızdan üretiyoruz.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-line">
          <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-paper-2 text-xs font-bold uppercase tracking-wider text-stone">
            <div className="p-4 sm:p-5" />
            <div className="p-4 sm:p-5">Klasik çekim</div>
            <div className="bg-ink p-4 text-cream sm:p-5">Dijital Mankenim</div>
          </div>
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-[1.1fr_1fr_1fr] border-t border-line text-sm">
              <div className="p-4 font-semibold text-ink sm:p-5">{row.label}</div>
              <div className="flex items-start gap-2 p-4 text-stone sm:p-5">
                <X className="mt-0.5 hidden h-4 w-4 flex-shrink-0 text-stone/60 sm:block" />
                {row.classic}
              </div>
              <div className="flex items-start gap-2 bg-ink p-4 font-semibold text-cream sm:p-5">
                <Check className="mt-0.5 hidden h-4 w-4 flex-shrink-0 text-[#e8b4ae] sm:block" />
                {row.ours}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
