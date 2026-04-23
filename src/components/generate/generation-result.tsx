"use client";

import { Download } from "lucide-react";

export function GenerationResult({
  outputUrl,
  inputUrl,
}: {
  outputUrl?: string | null;
  inputUrl?: string | null;
}) {
  if (!outputUrl) return null;

  const handleDownload = async () => {
    try {
      const res = await fetch(outputUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dijitalmankenim-${Date.now()}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(outputUrl, "_blank");
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-[var(--text)]">Sonuc</h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Sol - Ürün Fotoğrafı */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
            Yuklenen Urun
          </p>
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[var(--surface)]">
            {inputUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={inputUrl}
                alt="Yuklenen urun"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[var(--text-muted)]">
                —
              </div>
            )}
          </div>
        </div>

        {/* Sağ - Üretilen Fotoğraf */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-[var(--primary)] uppercase tracking-wide">
            AI Cikti
          </p>
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[var(--surface)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={outputUrl}
              alt="AI urunu"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="btn-gold mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold shadow-md transition-all hover:scale-[1.02]"
      >
        <Download className="h-4 w-4" />
        Fotografi Indir
      </button>
    </div>
  );
}
