"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { InstagramIcon } from "./brand-icons";
import { cn } from "@/lib/utils";
import { INSTAGRAM_DM_URL } from "@/lib/site";

const navLinks = [
  { label: "İşlerimiz", href: "/#isler" },
  { label: "Nasıl Çalışır", href: "/#nasil-calisir" },
  { label: "Fiyatlar", href: "/#fiyatlar" },
  { label: "Ücretsiz Örnek", href: "/#ornek" },
  { label: "SSS", href: "/#sss" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isDashboard =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/yonetim") ||
    pathname === "/giris" ||
    pathname === "/kayit";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDashboard) return null;

  return (
    <header
      data-konum="menu"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || mobileOpen || pathname !== "/"
          ? "border-b border-line bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Ana menü">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={INSTAGRAM_DM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-wine sm:inline-flex"
          >
            <InstagramIcon size={16} />
            DM ile Sipariş
          </a>
          <button
            type="button"
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileOpen}
            className="rounded-full p-2.5 text-ink transition-colors hover:bg-ink/5 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-line bg-paper px-4 pb-6 pt-2 lg:hidden" aria-label="Mobil menü">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block border-b border-line py-4 font-display text-3xl text-ink"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={INSTAGRAM_DM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm font-bold text-cream"
          >
            <InstagramIcon size={18} />
            Instagram&apos;dan DM At
          </a>
        </nav>
      )}
    </header>
  );
}
