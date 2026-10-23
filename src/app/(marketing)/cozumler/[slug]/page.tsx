import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { categories, getCategory } from "@/lib/categories";
import { LoopVideo } from "@/components/shared/loop-video";
import { ContactButtons } from "@/components/shared/contact-buttons";
import { SampleSection } from "@/components/landing/sample-section";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.title} — Dijital Mankenim`,
    description: category.metaDescription,
    alternates: { canonical: `/cozumler/${category.slug}` },
    openGraph: {
      title: category.title,
      description: category.metaDescription,
      images: [category.heroVideo.poster],
      locale: "tr_TR",
      type: "website",
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const others = categories.filter((c) => c.slug !== category.slug);

  return (
    <>
      {/* Hero — arka planda dönen video */}
      <section data-konum={`kategori-${category.slug}`} className="relative overflow-hidden bg-ink text-cream">
        <div className="absolute inset-0">
          <LoopVideo src={category.heroVideo.src} poster={category.heroVideo.poster} />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-36 sm:px-6 sm:pb-28 sm:pt-44 lg:px-8">
          <nav className="text-xs font-semibold text-cream/50" aria-label="Sayfa yolu">
            <Link href="/" className="hover:text-cream">Ana sayfa</Link>
            <span className="mx-2">/</span>
            <span className="text-cream/80">{category.name}</span>
          </nav>
          <p className="eyebrow mt-8 text-cream/60">{category.eyebrow}</p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[0.95] sm:text-7xl">
            {category.headline} <em className="text-[#e8b4ae]">{category.headlineEm}</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75">{category.intro}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ContactButtons tone="light" />
            <a href="#ornek" className="inline-flex items-center gap-2 text-sm font-bold text-cream underline decoration-[#e8b4ae] decoration-2 underline-offset-4">
              Ücretsiz örnek isteyin <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Öne çıkanlar */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
            {category.points.map((point) => (
              <div key={point.title} className="bg-cream p-8">
                <Check className="h-5 w-5 text-wine" />
                <h2 className="mt-5 text-lg font-bold text-ink">{point.title}</h2>
                <p className="mt-2 leading-relaxed text-stone">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Örnek işler */}
      <section className="bg-paper py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-wine">Örnek işler</p>
          <h2 className="font-display mt-4 text-5xl leading-[1] text-ink sm:text-6xl">
            {category.name} <em>için ürettiklerimiz.</em>
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.media.map((item) => (
              <figure key={item.src} className="overflow-hidden rounded-3xl bg-ink">
                <div className={item.type === "video" ? "aspect-video" : "relative aspect-[4/5]"}>
                  {item.type === "video" ? (
                    <LoopVideo src={item.src} poster={item.poster} />
                  ) : (
                    <Image src={item.src} alt={item.label} fill className="object-cover" sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 400px" />
                  )}
                </div>
                <figcaption className="px-4 py-3 text-xs font-semibold tracking-wide text-cream/75">{item.label}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-10 text-stone">
            Fiyatlar 1 fotoğraf için 200 TL&apos;den başlıyor.{" "}
            <Link href="/#fiyatlar" className="font-bold text-ink underline decoration-wine decoration-2 underline-offset-4">
              Tüm paketleri görün
            </Link>
          </p>
        </div>
      </section>

      {/* Kategoriye özel sorular */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-wine">Sık sorulanlar</p>
          <div className="mt-6 border-t border-line">
            {category.faq.map((item) => (
              <div key={item.q} className="border-b border-line py-6">
                <h3 className="text-lg font-semibold text-ink">{item.q}</h3>
                <p className="mt-2 leading-relaxed text-stone">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SampleSection varsayilanKategori={category.name} />

      {/* Diğer kategoriler */}
      <section className="bg-ink py-16 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-cream/50">Diğer alanlar</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {others.map((c) => (
              <Link
                key={c.slug}
                href={`/cozumler/${c.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-cream/15 px-5 py-4 transition-colors hover:border-cream/50"
              >
                <span className="font-display text-2xl">{c.name}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
