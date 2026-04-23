import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Shirt, Plus, TrendingUp, Eye } from "lucide-react";

export default async function YonetimDashboard() {
  const totalItems = await prisma.clothingItem.count();
  const activeItems = await prisma.clothingItem.count({ where: { active: true } });
  const recentItems = await prisma.clothingItem.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    { label: "Toplam Kıyafet", value: totalItems, icon: Shirt, color: "text-[#c9a84c]", bg: "bg-[#c9a84c]/10" },
    { label: "Aktif Kıyafet", value: activeItems, icon: Eye, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Kütüphane Ziyaretçi", value: "—", icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-400/10" },
  ];

  return (
    <div className="space-y-8">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-white/40">Dijital Mankenim yönetim paneli</p>
        </div>
        <Link href="/yonetim/kutuphane/yeni">
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#e2c97e] px-5 py-2.5 text-sm font-bold text-[#0f1629] shadow-md shadow-[#c9a84c]/20 transition-all hover:scale-105">
            <Plus className="h-4 w-4" />
            Kıyafet Ekle
          </button>
        </Link>
      </div>

      {/* İstatistikler */}
      <div className="grid gap-5 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/4 p-5">
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <p className="mt-4 text-3xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-white/40">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Son eklenen kıyafetler */}
      <div className="rounded-2xl border border-white/8 bg-white/4">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
          <h2 className="text-sm font-semibold text-white">Son Eklenen Kıyafetler</h2>
          <Link href="/yonetim/kutuphane" className="text-xs text-[#c9a84c] hover:underline">
            Tümünü görüntüle →
          </Link>
        </div>
        <div className="divide-y divide-white/5">
          {recentItems.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-white/30">Henüz kıyafet eklenmedi</p>
          ) : (
            recentItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-5 py-3">
                <img
                  src={item.thumbnailUrl}
                  alt={item.name}
                  className="h-10 w-10 rounded-lg object-cover border border-white/10"
                />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-white">{item.name}</p>
                  <p className="text-xs text-white/40">{item.category} · {item.gender}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${item.active ? "bg-green-400/15 text-green-400" : "bg-red-400/15 text-red-400"}`}>
                  {item.active ? "Aktif" : "Pasif"}
                </span>
                <Link href={`/yonetim/kutuphane/${item.id}`} className="text-xs text-white/30 hover:text-white">
                  Düzenle →
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Hızlı bağlantılar */}
      <div className="rounded-2xl border border-[#c9a84c]/20 bg-[#c9a84c]/5 p-5">
        <p className="text-sm font-semibold text-[#c9a84c] mb-3">Hızlı İşlemler</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/yonetim/kutuphane/yeni">
            <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
              + Yeni Kıyafet
            </button>
          </Link>
          <Link href="/kutuphane" target="_blank">
            <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
              🔗 Kütüphaneyi Görüntüle
            </button>
          </Link>
          <Link href="/" target="_blank">
            <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
              🌐 Ana Siteye Git
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
