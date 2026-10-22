"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { InstagramIcon, WhatsAppIcon } from "./brand-icons";
import { INSTAGRAM_URL, INSTAGRAM_USERNAME, WHATSAPP_URL } from "@/lib/site";

const links = [
  { title: "İşlerimiz", href: "/#isler" },
  { title: "Nasıl Çalışır", href: "/#nasil-calisir" },
  { title: "Fiyatlar", href: "/#fiyatlar" },
  { title: "Sık Sorulan Sorular", href: "/#sss" },
  { title: "Hakkımızda", href: "/hakkimizda" },
  { title: "İletişim", href: "/iletisim" },
];

export function Footer() {
  const pathname = usePathname();
  const isDashboard =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/yonetim") ||
    pathname === "/giris" ||
    pathname === "/kayit";

  if (isDashboard) return null;

  return (
    <footer className="bg-ink pb-28 text-cream sm:pb-0">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 border-b border-cream/10 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/55">
              Askıdaki ürününüzü profesyonel AI manken görsellerine dönüştürüyoruz.
              Butikler, toptancılar ve e-ticaret satıcıları için.
            </p>
          </div>

          <div>
            <p className="eyebrow text-cream/40">Sayfalar</p>
            <ul className="mt-5 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream/70 transition-colors hover:text-cream">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-cream/40">Bize ulaşın</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  <InstagramIcon size={16} />@{INSTAGRAM_USERNAME}
                </a>
              </li>
              {WHATSAPP_URL && (
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    <WhatsAppIcon size={16} />
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-8 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dijital Mankenim</p>
          <Link href="/gizlilik" className="transition-colors hover:text-cream/70">
            Gizlilik ve KVKK Aydınlatma Metni
          </Link>
        </div>
      </div>
    </footer>
  );
}
