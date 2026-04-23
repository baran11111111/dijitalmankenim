import Image from "next/image";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { SectionBadge } from "@/components/shared/section-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const posts = [
  {
    title: "E-ticaret urun cekimlerinde AI ile hiz kazanma rehberi",
    category: "MODA",
    date: "12 Nisan 2026",
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&auto=format&fit=crop",
  },
  {
    title: "Urunden modele akisinda en iyi gorsel sonuclari nasil alirsiniz?",
    category: "AI",
    date: "9 Nisan 2026",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&auto=format&fit=crop",
  },
  {
    title: "API ile toplu uretim otomasyonu: Teknik baslangic kilavuzu",
    category: "TEKNIK",
    date: "5 Nisan 2026",
    image:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1200&auto=format&fit=crop",
  },
];

export function BlogSection() {
  return (
    <section className="bg-[var(--background)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <SectionBadge
            icon={<BookOpen className="h-4 w-4 text-[var(--primary)]" />}
            text="Blogdan"
          />
          <h2 className="mt-5 text-3xl font-semibold text-[var(--text)] sm:text-5xl">
            Son <span className="text-accent-italic">Guncellemeler</span>
          </h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.title} hover className="overflow-hidden">
              <div className="relative h-52">
                <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
              </div>
              <CardContent>
                <Badge variant="outline">{post.category}</Badge>
                <h3 className="mt-3 text-lg font-semibold text-[var(--text)]">{post.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{post.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="#" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)]">
            Tum blog yazilarini gorun <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
