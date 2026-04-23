"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";

export default function YonetimGiris() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Giriş başarısız");
      } else {
        router.push("/yonetim");
        router.refresh();
      }
    } catch {
      setError("Bağlantı hatası. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07090f]">
      {/* Arka plan gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[#c9a84c] opacity-[0.07] blur-[80px]" />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-blue-500 opacity-[0.05] blur-[80px]" />
      </div>

      <div className="relative w-full max-w-sm px-4">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f1629] border border-[#c9a84c]/30 shadow-lg shadow-[#c9a84c]/10">
            <span className="text-xl font-black text-[#c9a84c]">DM</span>
          </div>
          <h1 className="text-xl font-bold text-white">Yönetim Paneli</h1>
          <p className="mt-1 text-sm text-white/40">Sadece yetkili erişim</p>
        </div>

        {/* Form kartı */}
        <div className="rounded-3xl border border-white/8 bg-white/5 p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Hata mesajı */}
            {error && (
              <div className="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* E-posta */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50">
                E-posta
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dijitalmankenim.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-[#c9a84c]/50 focus:ring-1 focus:ring-[#c9a84c]/30"
                />
              </div>
            </div>

            {/* Şifre */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-10 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-[#c9a84c]/50 focus:ring-1 focus:ring-[#c9a84c]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Giriş butonu */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#e2c97e] py-3.5 text-sm font-bold text-[#0f1629] shadow-lg shadow-[#c9a84c]/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-[#c9a84c]/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            >
              {loading ? "Giriş yapılıyor…" : "Giriş Yap"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-white/20">
          Bu sayfa yalnızca yetkili yöneticiler içindir.
        </p>
      </div>
    </div>
  );
}
