"use client";

export const dynamic = "force-dynamic";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGeneration } from "@/hooks/use-generation";
import { TemplateSelector } from "@/components/generate/template-selector";
import { UploadZone } from "@/components/generate/upload-zone";
import { GenerationPreview } from "@/components/generate/generation-preview";
import { GenerationProgress } from "@/components/generate/generation-progress";
import { GenerationResult } from "@/components/generate/generation-result";
import { Zap, Film } from "lucide-react";

const templates = [
  {
    id: "tmp-1",
    name: "Kadin Studio",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1000&auto=format&fit=crop",
  },
  {
    id: "tmp-2",
    name: "Erkek Sokak",
    image:
      "https://images.unsplash.com/photo-1464863979621-258859e62245?w=1000&auto=format&fit=crop",
  },
  {
    id: "tmp-3",
    name: "Cocuk Casual",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop",
  },
  {
    id: "tmp-4",
    name: "Video Walk",
    image:
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=1000&auto=format&fit=crop",
  },
];

export default function UretPage() {
  const { data: session } = useSession();
  const [templateId, setTemplateId] = useState<string>(templates[0].id);
  const [inputImageUrl, setInputImageUrl] = useState<string>("");
  const [category, setCategory] = useState<"tops" | "bottoms" | "one-pieces">("tops");
  const [outputType, setOutputType] = useState<"PHOTO" | "VIDEO">("PHOTO");
  const generation = useGeneration();

  const photoTokens = (session?.user as { photoTokens?: number })?.photoTokens ?? 0;
  const videoTokens = (session?.user as { videoTokens?: number })?.videoTokens ?? 0;

  const selectedTemplate = useMemo(
    () => templates.find((template) => template.id === templateId),
    [templateId]
  );

  const canGenerate =
    outputType === "PHOTO" ? photoTokens > 0 : videoTokens > 0;

  return (
    <div className="space-y-6">
      {/* Üstteki Token Bakiyesi */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold text-[var(--text)]">Uretim</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5 text-sm">
            <Zap className="h-3.5 w-3.5 text-[var(--gold)]" />
            {photoTokens} Foto Token
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5 text-sm">
            <Film className="h-3.5 w-3.5 text-[var(--primary)]" />
            {videoTokens} Video Token
          </Badge>
        </div>
      </div>

      {photoTokens === 0 && videoTokens === 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Token bakiyeniz yok!</strong> Uretim yapabilmek icin once paket satin alin.{" "}
          <a href="/dashboard/tokenler" className="underline font-medium">
            Paket Satin Al →
          </a>
        </div>
      )}

      {/* Adım 1: Ürün Türü */}
      <section className="space-y-3">
        <p className="label-tag">Adim 1</p>
        <h2 className="text-xl font-semibold text-[var(--text)]">Cikti Turu</h2>
        <div className="flex gap-2">
          <Button
            variant={outputType === "PHOTO" ? "primary" : "outline"}
            onClick={() => setOutputType("PHOTO")}
            className="flex items-center gap-2"
          >
            <Zap className="h-4 w-4" /> Fotograf (1 Token)
          </Button>
          <Button
            variant={outputType === "VIDEO" ? "primary" : "outline"}
            onClick={() => setOutputType("VIDEO")}
            className="flex items-center gap-2"
          >
            <Film className="h-4 w-4" /> Video (1 Token)
          </Button>
        </div>
      </section>

      {/* Adım 2: Manken Seç */}
      <section className="space-y-3">
        <p className="label-tag">Adim 2</p>
        <h2 className="text-xl font-semibold text-[var(--text)]">Manken Sec</h2>
        <TemplateSelector templates={templates} selectedId={templateId} onSelect={setTemplateId} />
      </section>

      {/* Adım 3: Ürün Fotoğrafı Yükle + Kategori */}
      <section className="space-y-3">
        <p className="label-tag">Adim 3</p>
        <h2 className="text-xl font-semibold text-[var(--text)]">Urun Fotografini Yukle</h2>

        {/* Kıyafet kategorisi */}
        <div className="flex gap-2 flex-wrap">
          {(["tops", "bottoms", "one-pieces"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                category === cat
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                  : "border-[var(--border)] bg-white text-[var(--text)] hover:border-[var(--primary)]/40"
              }`}
            >
              {cat === "tops" ? "Ust Giyim" : cat === "bottoms" ? "Alt Giyim" : "Tek Parca (Elbise)"}
            </button>
          ))}
        </div>

        <UploadZone onSelect={setInputImageUrl} />
      </section>

      {/* Önizleme */}
      {inputImageUrl && (
        <section className="space-y-3">
          <p className="label-tag">Onizleme</p>
          <GenerationPreview
            templateImage={selectedTemplate?.image}
            productImage={inputImageUrl}
          />
        </section>
      )}

      {/* Üret Butonu */}
      <Button
        disabled={!templateId || !inputImageUrl || !canGenerate || generation.status === "processing"}
        loading={generation.status === "processing"}
        onClick={() =>
          generation.startGeneration(templateId, inputImageUrl, outputType, category)
        }
        className="w-full py-4 text-base font-bold"
      >
        {!canGenerate
          ? "Yetersiz Token — Paket Satin Al"
          : "Uretimi Baslat"}
      </Button>

      {generation.status === "processing" && (
        <GenerationProgress progress={generation.progress} />
      )}

      {generation.status === "failed" && generation.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {generation.error}
        </div>
      )}

      <GenerationResult outputUrl={generation.outputUrl} inputUrl={inputImageUrl} />
    </div>
  );
}
