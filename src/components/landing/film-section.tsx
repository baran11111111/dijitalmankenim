import { LoopVideo } from "@/components/shared/loop-video";
import { ContactButtons } from "@/components/shared/contact-buttons";

const films = [
  { src: "/videos/zumrut-yali.mp4", poster: "/videos/zumrut-yali.jpg", label: "Kadife gece elbisesi · Yalı" },
  { src: "/videos/kapadokya.mp4", poster: "/videos/kapadokya.jpg", label: "İpek abiye · Kapadokya" },
];

// Ürün videoları: arka planda dönen sinematik filmler
export function FilmSection() {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      {/* Arka plan filmi */}
      <div className="absolute inset-0">
        <LoopVideo src="/videos/gelin-dans.mp4" poster="/videos/gelin-dans.jpg" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-40 lg:px-8">
        <p className="eyebrow text-cream/60">Video prodüksiyon</p>
        <h2 className="font-display mt-4 max-w-3xl text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
          Fotoğrafla bitmiyor. <em className="text-[#e8b4ae]">Ürününüz filmde.</em>
        </h2>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/70">
          Gelinlikten abiyeye, ürününüzü saray balo salonunda, boğazda ya da Kapadokya&apos;da
          hareket halinde gösteren kısa videolar. Reels, hikâye ve ürün sayfaları için hazır.
        </p>
        <ContactButtons tone="light" className="mt-10" instagramLabel="Video İçin Yazın" />

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:ml-auto lg:max-w-3xl">
          {films.map((film) => (
            <figure key={film.src} className="overflow-hidden rounded-2xl border border-cream/15 bg-ink">
              <div className="aspect-video">
                <LoopVideo src={film.src} poster={film.poster} />
              </div>
              <figcaption className="px-4 py-3 text-xs font-semibold tracking-wide text-cream/70">
                {film.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
