import { Camera, MessageCircle, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Ürünün fotoğrafını çekin",
    description:
      "Askıda, mankende ya da yere serili — telefonla çekilmiş net bir fotoğraf yeterli. Ürünün önü ve varsa detayları (yaka, düğme, desen) görünsün.",
  },
  {
    icon: MessageCircle,
    title: "DM'den gönderin",
    description:
      "Fotoğrafı Instagram'dan bize iletin; nasıl bir manken, mekân ve poz istediğinizi yazın. Paketi ve fiyatı birlikte netleştirelim.",
  },
  {
    icon: Sparkles,
    title: "48 saatte teslim alın",
    description:
      "Görselleriniz yüksek çözünürlükte hazırlanır, beğenmediğiniz kareleri revize ederiz. Instagram'da, pazaryerlerinde veya kendi sitenizde hemen kullanın.",
  },
];

export function HowItWorks() {
  return (
    <section id="nasil-calisir" className="scroll-mt-20 bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-wine">Nasıl çalışır</p>
          <h2 className="font-display mt-4 text-5xl leading-[1] text-ink sm:text-6xl">
            Kayıt yok, form yok. <em>Üç adım.</em>
          </h2>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col bg-cream p-8 sm:p-10">
              <div className="flex items-center justify-between">
                <span className="font-display text-7xl leading-none text-wine/90">{i + 1}</span>
                <step.icon className="h-6 w-6 text-stone" strokeWidth={1.5} />
              </div>
              <h3 className="mt-10 text-xl font-bold text-ink">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-stone">{step.description}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-sm text-stone">
          <span className="font-semibold text-ink">İpucu:</span> Düz, açık renkli bir zemin ve gün ışığı
          en iyi sonucu verir. Ürün kırışık değilse manken üzerinde de kırışık görünmez.
        </p>
      </div>
    </section>
  );
}
