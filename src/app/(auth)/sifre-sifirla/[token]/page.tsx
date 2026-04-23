"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function SifreSifirlaPage() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Sifre en az 6 karakter olmali.");
      return;
    }
    if (password !== confirm) {
      setError("Sifreler eslesmedi.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/sifre-sifirla", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Bir hata olustu. Link gecersiz veya suresi dolmus olabilir.");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/giris"), 3000);
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="w-full max-w-md text-center">
          <CheckCircle className="mx-auto mb-4 h-14 w-14 text-green-500" />
          <h1 className="text-2xl font-bold text-[var(--text)]">Sifre Guncellendi!</h1>
          <p className="mt-3 text-[var(--text-secondary)]">
            Yeni sifreniz basariyla kaydedildi. Giris sayfasina yonlendiriliyorsunuz...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <Logo />
        <h1 className="mt-8 text-3xl font-semibold text-[var(--text)]">Yeni Sifre Belirle</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Lutfen hesabiniz icin yeni bir sifre girin.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Yeni Sifre"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Yeni Sifre (Tekrar)"
            type="password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            error={error || undefined}
          />
          <Button className="w-full" loading={loading} type="submit">
            Sifremi Guncelle
          </Button>
        </form>

        <p className="mt-6 text-sm text-[var(--text-secondary)]">
          <Link href="/giris" className="font-medium text-[var(--primary)]">
            ← Girise Don
          </Link>
        </p>
      </div>
    </div>
  );
}
