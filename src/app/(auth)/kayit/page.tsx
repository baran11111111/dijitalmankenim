"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function KayitPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      setError("Kayit tamamlanamadi. Bilgilerinizi kontrol edin.");
      setLoading(false);
      return;
    }

    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    router.push("/dashboard");
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Logo />
          <h1 className="mt-8 text-3xl font-semibold text-[var(--text)]">Kayit Ol</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Ilk kayitta 5 ucretsiz kredi hediyesi.
          </p>

          <form className="mt-8 space-y-4" onSubmit={submit}>
            <Input
              label="Ad Soyad"
              placeholder="Adiniz Soyadiniz"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            />
            <Input
              label="E-posta"
              type="email"
              placeholder="ornek@mail.com"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            />
            <Input
              label="Sifre"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, password: event.target.value }))
              }
            />
            <Input
              label="Sifre Tekrar"
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, confirmPassword: event.target.value }))
              }
              error={error || undefined}
            />
            <label className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
              <input
                type="checkbox"
                className="mt-0.5"
                checked={form.terms}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, terms: event.target.checked }))
                }
              />
              Kullanim sartlarini ve gizlilik politikasini kabul ediyorum.
            </label>
            <Button className="w-full" type="submit" loading={loading}>
              Hesap Olustur
            </Button>
          </form>

          <p className="mt-6 text-sm text-[var(--text-secondary)]">
            Zaten hesabiniz var mi?{" "}
            <Link href="/giris" className="font-medium text-[var(--primary)]">
              Giris Yapin
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[var(--accent-dark)] lg:block">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&auto=format&fit=crop"
          alt="Moda cekimi"
          fill
          className="object-cover opacity-70"
          sizes="50vw"
        />
        <div className="relative z-10 flex h-full items-end p-12">
          <p className="max-w-md text-3xl font-semibold leading-tight text-white">
            5 ucretsiz kredi ile hemen baslayin ve ilk urunlerinizi canlandirin.
          </p>
        </div>
      </div>
    </div>
  );
}
