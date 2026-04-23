"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { Globe, CheckCircle } from "lucide-react";

const INSTAGRAM_USERNAME = "dijitalmankenim";

const footerLinks = {
  araclar: [
    { title: "Sanal Deneme", href: "#" },
    { title: "Üründen Modele", href: "#" },
    { title: "Model Değiştir", href: "#" },
    { title: "Model Oluştur", href: "#" },
    { title: "Video Oluştur", href: "#" },
    { title: "Görsel Düzenleme", href: "#" },
  ],
  cozumler: [
    { title: "E-Ticaret", href: "#" },
    { title: "Moda Markalar", href: "#" },
    { title: "Ajanslar", href: "#" },
    { title: "Fotoğrafçılar", href: "#" },
  ],
  kaynaklar: [
    { title: "API Dokümantasyonu", href: "#" },
    { title: "Yardım Merkezi", href: "#" },
    { title: "Değişiklik Günlüğü", href: "#" },
    { title: "Durum", href: "#" },
  ],
  sirket: [
    { title: "Hakkımızda", href: "/hakkimizda" },
    { title: "Blog", href: "#" },
    { title: "Kariyer", href: "#" },
    { title: "İletişim", href: "/iletisim" },
  ],
};



export function Footer() {
  const pathname = usePathname();
  const isDashboard =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/admin") ||
    pathname === "/giris" ||
    pathname === "/kayit";

  if (isDashboard) return null;

  return (
    <footer className="bg-[#07090f] border-t border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* Üst kısım */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-12 border-b border-white/8">
          {/* Brand — col-span-2 */}
          <div className="col-span-2">
            <Logo variant="light" />
            <p className="mt-4 text-sm text-white/50 max-w-xs leading-relaxed">
              AI destekli sanal manken platformu ile profesyonel ürün görselleri
              oluşturun. Stüdyo maliyeti olmadan.
            </p>
            {/* Sosyal bağlantılar */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href={`https://instagram.com/${INSTAGRAM_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-white/45 transition-all hover:border-[var(--gold)]/40 hover:text-[var(--gold)]"
              >
                Instagram
              </a>
              <a
                href="#"
                className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-white/45 transition-all hover:border-[var(--gold)]/40 hover:text-[var(--gold)]"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Bağlantılar */}
          {(
            [
              ["Araçlar", footerLinks.araclar],
              ["Çözümler", footerLinks.cozumler],
              ["Kaynaklar", footerLinks.kaynaklar],
              ["Şirket", footerLinks.sirket],
            ] as [string, { title: string; href: string }[]][]
          ).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]/80 mb-5">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/45 hover:text-white transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Alt kısım */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-white/35">
            <CheckCircle className="w-3.5 h-3.5 text-[var(--success)]" />
            Tüm sistemler çalışır durumda
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/35">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              TR Türkçe
            </div>
            <span>·</span>
            <Link href="#" className="hover:text-white/70 transition-colors">Gizlilik Politikası</Link>
            <span>·</span>
            <Link href="#" className="hover:text-white/70 transition-colors">Kullanım Şartları</Link>
            <span>·</span>
            <span>© 2026 Dijital Mankenim. Tüm hakları saklıdır.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
