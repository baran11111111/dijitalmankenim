import { BeforeAfterSlider } from "@/components/shared/before-after-slider";
import { ContactButtons } from "@/components/shared/contact-buttons";

const facts = [
  { value: "48 saat", label: "içinde teslim" },
  { value: "200 TL", label: "tek fotoğraftan başlayın" },
  { value: "Revizyon", label: "her pakete dahil" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-36">
        {/* Metin */}
        <div className="animate-[slide-up_0.8s_cubic-bezier(0.22,1,0.36,1)_both]">
          <p className="eyebrow text-wine">Butikler ve e-ticaret için AI manken</p>

          <h1 className="font-display mt-6 text-[3.4rem] leading-[0.95] text-ink sm:text-7xl xl:text-[6.5rem]">
            Askıdaki ürün,
            <br />
            <em className="text-wine">vitrindeki</em> manken.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-stone">
            Ürününüzün telefonla çektiğiniz fotoğrafını Instagram&apos;dan gönderin.
            Stüdyo, manken ve fotoğrafçı masrafı olmadan, 48 saat içinde satışa hazır
            manken görselleri teslim edelim.
          </p>

          <ContactButtons className="mt-10" />

          <dl className="mt-12 grid max-w-xl grid-cols-3 border-t border-line pt-6">
            {facts.map((fact, i) => (
              <div key={fact.value} className={i > 0 ? "border-l border-line pl-4 sm:pl-6" : "pr-4"}>
                <dt className="font-display text-2xl text-ink sm:text-3xl">{fact.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-stone sm:text-sm">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Önce / sonra */}
        <figure className="relative mx-auto w-full max-w-md animate-[fade-in_1s_ease-out_0.15s_both] lg:max-w-none">
          <div className="absolute -inset-3 -z-10 rotate-[2.5deg] rounded-[2rem] bg-paper-2" />
          <BeforeAfterSlider
            before="/images/once-sonra/tisort-once.jpg"
            after="/images/once-sonra/tisort-sonra.jpg"
            alt="Siyah tişört"
            priority
            className="aspect-[4/5] rounded-[1.75rem] shadow-[0_30px_80px_-30px_rgba(22,19,15,0.45)]"
          />
          <figcaption className="mt-4 flex items-center justify-between text-sm text-stone">
            <span className="font-display text-lg italic text-ink">Katlanmış tişörtten mankene</span>
            <span className="eyebrow text-stone/80">← Kaydırın →</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
