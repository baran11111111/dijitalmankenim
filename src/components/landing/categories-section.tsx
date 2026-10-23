import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/categories";

// Sektöre özel sayfalara giden kartlar
export function CategoriesSection() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow text-wine">Sektörünüze özel</p>
        <h2 className="font-display mt-4 text-5xl leading-[1] text-ink sm:text-6xl">
          Ne satıyorsanız, <em>ona göre manken.</em>
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/cozumler/${category.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl"
            >
              <Image
                src={category.cardImage}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-cream">
                <span className="font-display text-3xl leading-none">{category.name}</span>
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cream text-ink transition-transform group-hover:-translate-y-1">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
