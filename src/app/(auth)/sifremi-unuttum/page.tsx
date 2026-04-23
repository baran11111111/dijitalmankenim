"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function SifremiUnuttumPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/sifremi-unuttum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Bir hata olustu.");
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="w-full max-w-md text-center">
          <CheckCircle className="mx-auto mb-4 h-14 w-14 text-green-500" />
          <h1 className="text-2xl font-bold text-[var(--text)]">E-posta Gonderildi!</h1>
          <p className="mt-3 text-[var(--text-secondary)]">
            Eger bu e-postaya kayitli bir hesap varsa, sifre sifirlama linki gonderildi.
            Lutfen gelen kutunuzu ve spam klasorunu kontrol edin.
          </p>
          <Link
            href="/giris"
            className="mt-6 inline-block text-sm font-medium text-[var(--primary)] hover:underline"
          >
            Giris sayfasina don
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <Logo />
        <h1 className="mt-8 text-3xl font-semibold text-[var(--text)]">Sifremi Unuttum</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          E-posta adresinizi girin, size sifre sifirlama linki gonderelim.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <Input
            label="E-posta"
            type="email"
            placeholder="ornek@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error || undefined}
          />
          <Button className="w-full" loading={loading} type="submit">
            Sifirlama Linki Gonder
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
