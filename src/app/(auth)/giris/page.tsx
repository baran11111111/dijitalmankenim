"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function GirisPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Giris basarisiz. Bilgilerinizi kontrol edin.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Logo />
          <h1 className="mt-8 text-3xl font-semibold text-[var(--text)]">Hosgeldiniz</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Hesabiniza giris yapip uretime devam edin.
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleLogin}>
            <Input
              label="E-posta"
              type="email"
              placeholder="ornek@mail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              label="Sifre"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={error || undefined}
            />
            <div className="text-right">
              <Link href="/sifremi-unuttum" className="text-sm text-[var(--primary)]">
                Sifremi unuttum
              </Link>
            </div>
            <Button className="w-full" loading={loading} type="submit">
              Giris Yap
            </Button>
            <div className="relative py-2 text-center text-sm text-[var(--text-muted)]">
              <span className="bg-white px-2">veya</span>
            </div>
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              Google ile Devam Et
            </Button>
          </form>

          <p className="mt-6 text-sm text-[var(--text-secondary)]">
            Hesabiniz yok mu?{" "}
            <Link href="/kayit" className="font-medium text-[var(--primary)]">
              Kayit Olun
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] lg:block">
        <div className="absolute inset-0 bg-black/10" />
        <Image
          src="https://images.unsplash.com/photo-1495385794356-15371f348c31?w=1600&auto=format&fit=crop"
          alt="AI model ornegi"
          fill
          className="object-cover mix-blend-soft-light"
          sizes="50vw"
        />
        <div className="relative z-10 flex h-full items-end p-12">
          <p className="max-w-md text-3xl font-semibold leading-tight text-white">
            AI ile urunlerinizi saniyeler icinde profesyonel modele giydirin.
          </p>
        </div>
      </div>
    </div>
  );
}
