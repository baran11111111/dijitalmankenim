"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Images, Users, Sparkles, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/templates", label: "Sablonlar", icon: Images },
  { href: "/admin/kullanicilar", label: "Kullanicilar", icon: Users },
  { href: "/admin/uretimler", label: "Uretimler", icon: Sparkles },
  { href: "/admin/paketler", label: "Paketler", icon: Package },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-[var(--border-light)] bg-white p-5 lg:block">
      <Logo />
      <div className="mt-8 space-y-1">
        {items.map((item) => {
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
    </aside>
  );
}
