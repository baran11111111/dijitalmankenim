"use client";

import { UploadCloud } from "lucide-react";

interface UploadZoneProps {
  onSelect: (url: string) => void;
}

export function UploadZone({ onSelect }: UploadZoneProps) {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] bg-white p-8 text-center hover:border-[var(--primary)]">
      <UploadCloud className="h-8 w-8 text-[var(--primary)]" />
      <p className="mt-3 font-medium text-[var(--text)]">Urun fotografini yukle</p>
      <p className="mt-1 text-sm text-[var(--text-muted)]">JPG, PNG, WEBP / max 10MB</p>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;

          const reader = new FileReader();
          reader.onload = () => {
            const base64String = reader.result as string;
            onSelect(base64String);
          };
          reader.readAsDataURL(file);
        }}
      />
    </label>
  );
}
