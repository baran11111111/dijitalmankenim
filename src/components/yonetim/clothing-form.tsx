"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Link as LinkIcon, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClothingItem {
  id?: string;
  name: string;
  description: string;
  category: string;
  gender: string;
  thumbnailUrl: string;
  fullImageUrl: string;
  tags: string;
  active: boolean;
  sortOrder: number;
}

const CATEGORIES = [
  { value: "ust-giyim", label: "Üst Giyim" },
  { value: "alt-giyim", label: "Alt Giyim" },
  { value: "elbise", label: "Elbise" },
  { value: "takim", label: "Takım" },
  { value: "aksesuar", label: "Aksesuar" },
];

const GENDERS = [
  { value: "kadin", label: "Kadın" },
  { value: "erkek", label: "Erkek" },
  { value: "unisex", label: "Unisex" },
];

const defaults: ClothingItem = {
  name: "",
  description: "",
  category: "ust-giyim",
  gender: "unisex",
  thumbnailUrl: "",
  fullImageUrl: "",
  tags: "",
  active: true,
  sortOrder: 0,
};

export function ClothingForm({ initial }: { initial?: Partial<ClothingItem> }) {
  const router = useRouter();
  const [form, setForm] = useState<ClothingItem>({ ...defaults, ...initial });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ClothingItem, string>>>({});

  const isEdit = !!initial?.id;

  const field = <K extends keyof ClothingItem>(key: K, value: ClothingItem[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "İsim gerekli";
    if (!form.thumbnailUrl.trim()) e.thumbnailUrl = "Thumbnail URL gerekli";
    if (!form.fullImageUrl.trim()) e.fullImageUrl = "Tam görsel URL gerekli";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const url = isEdit
      ? `/api/admin/clothing/${initial!.id}`
      : "/api/admin/clothing";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      }),
    });

    setLoading(false);
    if (res.ok) {
      router.push("/yonetim/kutuphane");
      router.refresh();
    }
  };

  const Input = ({
    label,
    field: f,
    placeholder,
    required,
    icon: Icon,
    hint,
  }: {
    label: string;
    field: keyof ClothingItem;
    placeholder?: string;
    required?: boolean;
    icon?: React.ElementType;
    hint?: string;
  }) => (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50">
        {label} {required && <span className="text-[#c9a84c]">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />}
        <input
          type="text"
          value={form[f] as string}
          onChange={(e) => field(f, e.target.value as ClothingItem[typeof f])}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl border bg-white/5 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-all",
            Icon ? "pl-10 pr-4" : "px-4",
            errors[f]
              ? "border-red-500/50 focus:ring-1 focus:ring-red-500/30"
              : "border-white/10 focus:border-[#c9a84c]/40 focus:ring-1 focus:ring-[#c9a84c]/20"
          )}
        />
      </div>
      {errors[f] && <p className="mt-1 text-xs text-red-400">{errors[f]}</p>}
      {hint && !errors[f] && <p className="mt-1 text-xs text-white/25">{hint}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-white/10 p-2.5 text-white/40 hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isEdit ? "Kıyafeti Düzenle" : "Yeni Kıyafet Ekle"}
          </h1>
          <p className="text-sm text-white/40">Kütüphane yönetimi</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sol — Form */}
        <div className="lg:col-span-2 space-y-5 rounded-2xl border border-white/8 bg-white/4 p-6">
          <Input label="Kıyafet Adı" field="name" placeholder="Örn: Beyaz Basic T-Shirt" required />

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50">
              Açıklama
            </label>
            <textarea
              value={form.description}
              onChange={(e) => field("description", e.target.value)}
              placeholder="Kıyafet hakkında kısa açıklama..."
              rows={3}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#c9a84c]/40 focus:ring-1 focus:ring-[#c9a84c]/20"
            />
          </div>

          {/* Kategori + Cinsiyet */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50">
                Kategori <span className="text-[#c9a84c]">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => field("category", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0f1629] px-4 py-2.5 text-sm text-white outline-none focus:border-[#c9a84c]/40"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50">
                Cinsiyet <span className="text-[#c9a84c]">*</span>
              </label>
              <select
                value={form.gender}
                onChange={(e) => field("gender", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0f1629] px-4 py-2.5 text-sm text-white outline-none focus:border-[#c9a84c]/40"
              >
                {GENDERS.map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Thumbnail URL (küçük görsel)"
            field="thumbnailUrl"
            placeholder="https://..."
            required
            icon={Image}
            hint="400×400 px önerilir. Unsplash, Cloudinary veya direkt link."
          />
          <Input
            label="Tam Görsel URL"
            field="fullImageUrl"
            placeholder="https://..."
            required
            icon={LinkIcon}
            hint="800×1000 px önerilir. Modal'da büyük görselde kullanılır."
          />
          <Input
            label="Etiketler"
            field="tags"
            placeholder="casual, beyaz, yazlık (virgülle ayırın)"
            hint="Virgülle ayrılmış etiketler. Arama için kullanılır."
          />

          {/* Sıralama + Durum */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50">
                Sıralama
              </label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => field("sortOrder", parseInt(e.target.value) || 0)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#c9a84c]/40"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50">
                Durum
              </label>
              <div className="flex gap-2 pt-1">
                {[true, false].map((val) => (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => field("active", val)}
                    className={cn(
                      "flex-1 rounded-xl border py-2 text-xs font-medium transition-all",
                      form.active === val
                        ? val
                          ? "border-green-400/40 bg-green-400/15 text-green-400"
                          : "border-red-400/40 bg-red-400/15 text-red-400"
                        : "border-white/10 text-white/30 hover:bg-white/5"
                    )}
                  >
                    {val ? "Aktif" : "Pasif"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sağ — Önizleme */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/8 bg-white/4 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">Önizleme</p>
            {form.thumbnailUrl ? (
              <div className="flex flex-col items-center gap-3">
                <img
                  src={form.thumbnailUrl}
                  alt="Önizleme"
                  className="w-full rounded-xl object-cover border border-white/10 max-h-48"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div className="text-center">
                  <p className="text-sm font-medium text-white">{form.name || "İsim girilmedi"}</p>
                  <p className="text-xs text-white/40">
                    {CATEGORIES.find((c) => c.value === form.category)?.label} ·{" "}
                    {GENDERS.find((g) => g.value === form.gender)?.label}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-white/10 text-sm text-white/20">
                Thumbnail URL girin
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#e2c97e] py-3 text-sm font-bold text-[#0f1629] shadow-lg shadow-[#c9a84c]/20 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:scale-100"
          >
            <Save className="h-4 w-4" />
            {loading ? "Kaydediliyor…" : isEdit ? "Güncelle" : "Kaydet"}
          </button>
        </div>
      </div>
    </form>
  );
}
