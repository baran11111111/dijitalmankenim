"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Images,
  Sparkles,
  History,
  Coins,
  User,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";

const sections = [
  {
    title: "ANA",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/dashboard/galeri", label: "Galeri", icon: Images },
      { href: "/dashboard/uret", label: "Uret", icon: Sparkles },
    ],
  },
  {
    title: "HESAP",
    items: [
      { href: "/dashboard/sonuclarim", label: "Sonuclarim", icon: History },
      { href: "/dashboard/tokenler", label: "Tokenler", icon: Coins },
      { href: "/dashboard/profil", label: "Profil", icon: User },
    ],
  },
  {
    title: "GELISTIRICI",
    items: [{ href: "/dashboard/api-erisim", label: "API Erisimi", icon: Code2 }],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-[var(--border-light)] bg-white p-5 lg:block">
      <Logo />
      <div className="mt-8 space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="label-tag mb-3">{section.title}</p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-[var(--primary-50)] text-[var(--primary)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--surface)]"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <p className="text-sm text-[var(--text-secondary)]">Token Bakiyesi</p>
        <p className="mt-1 text-2xl font-semibold text-[var(--text)]">124</p>
      </div>
    </aside>
  );
}
