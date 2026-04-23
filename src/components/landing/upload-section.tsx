"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, ImageIcon, ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
}

export function UploadSection() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const accepted = Array.from(incoming).filter((f) =>
      ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(f.type)
    );
    const mapped: UploadedFile[] = accepted.map((f) => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      preview: URL.createObjectURL(f),
    }));
    setFiles((prev) => [...prev, ...mapped].slice(0, 50)); // max 50
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const f = prev.find((x) => x.id === id);
      if (f) URL.revokeObjectURL(f.preview);
      return prev.filter((x) => x.id !== id);
    });
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  // Dosya adlarını sessionStorage'a kaydet ve sipariş sayfasına geç
  const proceed = () => {
    const names = files.map((f) => f.file.name);
    sessionStorage.setItem("dm_files", JSON.stringify(names));
    sessionStorage.setItem("dm_file_count", String(files.length));
  };

  return (
    <section id="yukle" className="bg-[var(--surface)] py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/8 px-4 py-1.5 text-sm font-semibold text-[var(--gold-dark)]">
            <Upload className="h-3.5 w-3.5 text-[var(--gold)]" />
            Hemen Başlayın
          </div>
          <h2 className="mt-5 text-3xl font-bold text-[var(--text)] sm:text-4xl">
            Ürün fotoğrafınızı yükleyin
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[var(--text-secondary)]">
            PNG, JPG veya WebP formatında fotoğraflarınızı yükleyin. Paketinizi seçin, 48 saat içinde profesyonel çekimler hazır.
          </p>
        </div>

        {/* Drop Zone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "relative cursor-pointer rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-300",
            dragging
              ? "border-[var(--gold)] bg-[var(--gold)]/5 scale-[1.01]"
              : files.length > 0
                ? "border-[var(--success)]/40 bg-[var(--success)]/5"
                : "border-[var(--border)] bg-white hover:border-[var(--gold)]/40 hover:bg-[var(--gold)]/3"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />

          {files.length === 0 ? (
            <div className="flex flex-col items-center gap-4">
              <div className={cn(
                "flex h-20 w-20 items-center justify-center rounded-2xl transition-colors duration-300",
                dragging ? "bg-[var(--gold)]/20 text-[var(--gold)]" : "bg-[var(--primary)]/8 text-[var(--primary)]"
              )}>
                <Upload className="h-9 w-9" />
              </div>
              <div>
                <p className="text-lg font-semibold text-[var(--text)]">
                  {dragging ? "Bırakın, yükleniyor…" : "Fotoğrafları buraya sürükleyin"}
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  veya tıklayarak dosya seçin · PNG, JPG, WebP
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-[var(--success)]" /> Maks 50 fotoğraf</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-[var(--success)]" /> 100 MB'a kadar</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-[var(--success)]" /> Güvenli yükleme</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--success)]/15 text-[var(--success)]">
                <CheckCircle className="h-7 w-7" />
              </div>
              <p className="font-semibold text-[var(--text)]">
                {files.length} fotoğraf seçildi
              </p>
              <p className="text-sm text-[var(--text-muted)]">Daha fazla eklemek için tıklayın</p>
            </div>
          )}
        </div>

        {/* Önizleme grid */}
        {files.length > 0 && (
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--text)]">
                Seçilen Fotoğraflar ({files.length})
              </p>
              <button
                onClick={() => setFiles([])}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--error)] transition-colors"
              >
                Tümünü temizle
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
              {files.map((f) => (
                <div key={f.id} className="group relative aspect-square">
                  <img
                    src={f.preview}
                    alt={f.file.name}
                    className="h-full w-full rounded-xl object-cover border border-[var(--border)]"
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFile(f.id); }}
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--error)] text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {/* Daha fazla ekle butonu */}
              <button
                onClick={() => inputRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--gold)]/40 hover:text-[var(--gold)] transition-colors"
              >
                <ImageIcon className="h-5 w-5" />
              </button>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/siparis" onClick={proceed}>
                <button className="btn-gold group inline-flex items-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-bold shadow-lg shadow-[var(--gold)]/25 transition-all duration-200 hover:scale-105">
                  Paketi Seç ve Sipariş Ver
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </Link>
              <p className="text-xs text-[var(--text-muted)]">48 saat içinde teslim</p>
            </div>
          </div>
        )}

        {/* Hızlı yönlendirme — dosya seçmeden de sipariş */}
        {files.length === 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--text-muted)]">
              Önce paketi mi görmek istiyorsunuz?{" "}
              <a href="#fiyatlandirma" className="font-medium text-[var(--gold-dark)] hover:text-[var(--gold)] underline underline-offset-2">
                Fiyatları inceleyin →
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
