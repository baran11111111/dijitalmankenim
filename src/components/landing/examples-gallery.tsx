import Image from "next/image";
import { SectionBadge } from "@/components/shared/section-badge";
import { Sparkles } from "lucide-react";

const items = [
  {
    before:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1464863979621-258859e62245?w=800&auto=format&fit=crop",
  },
  {
    before:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop",
  },
  {
    before:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop",
  },
  {
    before:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop",
  },
];

export function ExamplesGallery() {
  return (
    <section className="bg-[var(--surface)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <SectionBadge
            icon={<Sparkles className="h-4 w-4 text-[var(--primary)]" />}
            text="Ornek Uretimler"
          />
          <h2 className="mt-5 text-3xl font-semibold text-[var(--text)] sm:text-5xl">
            Gercek <span className="text-accent-italic">Sonuclar</span>
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <div key={`${item.before}-${index}`} className="group relative overflow-hidden rounded-2xl bg-white p-3 shadow-sm">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="relative h-52 overflow-hidden rounded-xl">
                  <Image src={item.before} alt="Once" fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
                  <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
                    Once
                  </span>
                </div>
                <div className="relative h-52 overflow-hidden rounded-xl">
                  <Image src={item.after} alt="Sonra" fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
                  <span className="absolute left-2 top-2 rounded-full bg-[var(--primary)] px-2 py-1 text-xs text-white">
                    Sonra
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
