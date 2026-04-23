"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Shirt,
  Plus,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/yonetim",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Kütüphane",
    href: "/yonetim/kutuphane",
    icon: Shirt,
    exact: false,
    children: [
      { label: "Tüm Kıyafetler", href: "/yonetim/kutuphane" },
      { label: "Yeni Ekle", href: "/yonetim/kutuphane/yeni" },
    ],
  },
];

interface Props {
  adminEmail: string;
}

export function YonetimSidebar({ adminEmail }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/yonetim/giris");
    router.refresh();
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="border-b border-white/8 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f1629] border border-[#c9a84c]/30">
            <span className="text-sm font-black text-[#c9a84c]">DM</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Yönetim Paneli</p>
            <p className="text-xs text-white/35">Dijital Mankenim</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-[#c9a84c]/15 text-[#c9a84c]"
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4.5 w-4.5 flex-shrink-0" />
                {item.label}
                {active && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
              </Link>
              {/* Alt menü */}
              {item.children && active && (
                <div className="ml-4 mt-1 space-y-0.5 border-l border-white/8 pl-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                        pathname === child.href
                          ? "text-[#c9a84c]"
                          : "text-white/40 hover:text-white/70"
                      )}
                    >
                      {child.href.includes("yeni") && (
                        <Plus className="mr-1.5 inline-block h-3 w-3" />
                      )}
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Admin info + Çıkış */}
      <div className="border-t border-white/8 p-4">
        <div className="mb-3 rounded-xl bg-white/5 px-3 py-2.5">
          <p className="truncate text-xs font-medium text-white/70">{adminEmail}</p>
          <p className="text-xs text-white/30">Süper Admin</p>
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-400/70 transition-all hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          {loggingOut ? "Çıkılıyor…" : "Çıkış Yap"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-56 flex-shrink-0 border-r border-white/8 bg-[#0a0c14] lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a0c14] border border-white/10 text-white/60 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#0a0c14] border-r border-white/8">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3 p-1.5 text-white/40 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
