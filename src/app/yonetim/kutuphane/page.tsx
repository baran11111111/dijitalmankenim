"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Item {
  id: string;
  name: string;
  category: string;
  gender: string;
  thumbnailUrl: string;
  active: boolean;
  sortOrder: number;
  createdAt: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  "ust-giyim": "Üst Giyim",
  "alt-giyim": "Alt Giyim",
  "elbise": "Elbise",
  "takim": "Takım",
  "aksesuar": "Aksesuar",
};

const GENDER_LABELS: Record<string, string> = {
  kadin: "Kadın",
  erkek: "Erkek",
  unisex: "Unisex",
};

export default function YonetimKutuphane() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState("");

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/clothing");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const toggleActive = async (id: string, current: boolean) => {
    await fetch(`/api/admin/clothing/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !current }),
    });
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, active: !current } : i)));
    showToast(!current ? "Kıyafet aktifleştirildi" : "Kıyafet pasife alındı");
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/clothing/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleteId(null);
    showToast("Kıyafet silindi");
  };

  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed right-4 top-4 z-50 rounded-xl border border-green-400/30 bg-green-400/15 px-5 py-3 text-sm font-medium text-green-400 shadow-lg">
          ✓ {toastMsg}
        </div>
      )}

      {/* Üst bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Kıyafet Kütüphanesi</h1>
          <p className="mt-1 text-sm text-white/40">{items.length} kıyafet</p>
        </div>
        <Link href="/yonetim/kutuphane/yeni">
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#e2c97e] px-5 py-2.5 text-sm font-bold text-[#0f1629] shadow-md transition-all hover:scale-105">
            <Plus className="h-4 w-4" />
            Yeni Kıyafet
          </button>
        </Link>
      </div>

      {/* Arama */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Kıyafet ara…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none focus:border-[#c9a84c]/40 focus:ring-1 focus:ring-[#c9a84c]/20"
        />
      </div>

      {/* Tablo */}
      <div className="overflow-hidden rounded-2xl border border-white/8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8 bg-white/3">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/40">Kıyafet</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/40">Kategori</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/40">Cinsiyet</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/40">Durum</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-white/40">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={5} className="px-4 py-4">
                      <div className="h-10 animate-pulse rounded-xl bg-white/5" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-sm text-white/30">
                    Kıyafet bulunamadı
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.thumbnailUrl}
                          alt={item.name}
                          className="h-10 w-10 rounded-xl object-cover border border-white/10"
                        />
                        <span className="text-sm font-medium text-white">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-white/60">
                      {CATEGORY_LABELS[item.category] || item.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-white/60">
                      {GENDER_LABELS[item.gender] || item.gender}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        item.active
                          ? "bg-green-400/15 text-green-400"
                          : "bg-white/10 text-white/40"
                      )}>
                        {item.active ? "Aktif" : "Pasif"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => toggleActive(item.id, item.active)}
                          title={item.active ? "Pasife al" : "Aktifleştir"}
                          className="rounded-lg p-1.5 text-white/30 transition-colors hover:bg-white/8 hover:text-white"
                        >
                          {item.active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        <Link href={`/yonetim/kutuphane/${item.id}`}>
                          <button className="rounded-lg p-1.5 text-white/30 transition-colors hover:bg-[#c9a84c]/15 hover:text-[#c9a84c]">
                            <Pencil className="h-4 w-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="rounded-lg p-1.5 text-white/30 transition-colors hover:bg-red-500/15 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Silme onay modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#0f1629] p-6 shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/15">
              <AlertCircle className="h-6 w-6 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Kıyafeti sil</h3>
            <p className="mt-2 text-sm text-white/50">Bu kıyafet kalıcı olarak silinecek. Geri alınamaz.</p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5"
              >
                İptal
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 rounded-xl bg-red-500/80 py-2.5 text-sm font-bold text-white hover:bg-red-500"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
