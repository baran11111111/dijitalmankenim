"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Shirt,
  PersonStanding,
  Mountain,
  WandSparkles,
  Video,
  Replace,
  Sparkles,
  Check,
  ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    id: "product-model",
    title: "Üründen Modele",
    icon: Shirt,
    image: "/api/reference-media/demo-product-model?v=4",
    resultLabel: "Üründen modele sonuç",
  },
  {
    id: "change-pose",
    title: "Poz Değiştir",
    icon: PersonStanding,
    image: "/api/reference-media/demo-change-pose?v=2",
    resultLabel: "Poz değiştirme sonucu",
  },
  {
    id: "change-background",
    title: "Arkaplan Değiştir",
    icon: Mountain,
    image: "/api/reference-media/demo-change-background?v=2",
    resultLabel: "Arkaplan değiştirme sonucu",
  },
  {
    id: "edit",
    title: "Düzenle",
    icon: WandSparkles,
    image: "/api/reference-media/demo-edit?v=2",
    resultLabel: "Düzenleme sonucu",
  },
  {
    id: "make-video",
    title: "Video Oluştur",
    icon: Video,
    image: "/api/reference-media/demo-make-video?v=2",
    resultLabel: "Video oluşturma sonucu",
  },
  {
    id: "model-swap",
    title: "Model Değiştir",
    icon: Replace,
    image: "/api/reference-media/demo-model-swap?v=2",
    resultLabel: "Model değiştirme sonucu",
  },
] as const;

export function InteractiveDemo() {
  const [activeId, setActiveId] = useState<(typeof features)[number]["id"]>(
    "product-model"
  );
  const [isDemoUnlocked, setIsDemoUnlocked] = useState(false);
  const [productModelBase64Src, setProductModelBase64Src] = useState<string | null>(
    null
  );
  const active = useMemo(
    () => features.find((feature) => feature.id === activeId) ?? features[0],
    [activeId]
  );

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/reference-media/base64/demo-product-model?v=5");
        if (!response.ok) return;
        const data = (await response.json()) as { src?: string };
        if (data.src) setProductModelBase64Src(data.src);
      } catch {}
    };
    load();
  }, []);

  const activeImageSrc = !isDemoUnlocked
    ? "/api/reference-media/demo-product-model-start?v=1"
    : active.id === "product-model" && productModelBase64Src
      ? productModelBase64Src
      : active.image;
  const isVideoActive = isDemoUnlocked && active.id === "make-video";

  const handleFeatureClick = (featureId: (typeof features)[number]["id"]) => {
    if (!isDemoUnlocked) {
      if (featureId !== "product-model") return;
      setIsDemoUnlocked(true);
      setActiveId("product-model");
      return;
    }
    setActiveId(featureId);
  };

  return (
    <section className="bg-[var(--primary)] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-1.5 text-sm font-medium text-[var(--gold)]">
            <Sparkles className="h-4 w-4" />
            Canlı Demo
          </div>
          <h2 className="mt-5 text-3xl font-bold text-white sm:text-5xl">
            Canlı olarak{" "}
            <span className="text-gold-gradient">görün</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/55">
            Dijital Mankenim ile neler yapabileceğinizi keşfedin.
          </p>
        </div>

        {/* Demo layout */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Görsel panel */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[var(--primary-light)] shadow-2xl">
            <div className="relative h-[440px] w-full">
              {isVideoActive ? (
                <video
                  key={active.id}
                  src={active.image}
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              ) : (
                <img
                  key={active.id}
                  src={activeImageSrc}
                  alt={active.resultLabel}
                  className="h-full w-full object-cover"
                />
              )}
              {/* Overlay gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--primary)]/40 via-transparent to-transparent" />
            </div>
            {/* Alt bar */}
            <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
              <span className="text-sm text-white/50">{active.resultLabel}</span>
              <button
                className="text-sm font-medium text-[var(--gold)] transition-opacity hover:opacity-75"
                onClick={() => setActiveId("product-model")}
              >
                Sıfırla
              </button>
            </div>
          </div>

          {/* Özellik listesi */}
          <div>
            {!isDemoUnlocked ? (
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-8 w-8 animate-bounce items-center justify-center rounded-full bg-[var(--gold)] text-[var(--primary)] shadow-lg shadow-[var(--gold)]/30">
                  <ArrowDown className="h-4 w-4" strokeWidth={3} />
                </div>
                <span className="text-base font-semibold text-[var(--gold)]">Buradan başlayın</span>
              </div>
            ) : null}

            <div className="mb-4">
              <p className="text-sm font-semibold text-white">Özellik Seçin</p>
              <p className="mt-0.5 text-xs text-white/40">Önizlemek için tıklayın</p>
            </div>

            <div className="flex lg:grid lg:grid-cols-1 gap-2 lg:gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 -mx-2 px-2 lg:mx-0 lg:px-0 snap-x snap-mandatory">
              {features.map((feature) => {
                const Icon = feature.icon;
                const isActive = activeId === feature.id;
                const isLocked = !isDemoUnlocked && feature.id !== "product-model";
                return (
                  <div
                    key={feature.id}
                    className="snap-start flex-shrink-0 lg:flex-shrink lg:w-full"
                  >
                    <button
                      onClick={() => handleFeatureClick(feature.id)}
                      disabled={isLocked}
                      className={cn(
                        "group h-14 lg:h-[68px] w-full min-w-[180px] lg:min-w-0 rounded-xl lg:rounded-2xl flex items-center justify-between px-4 lg:px-5 whitespace-nowrap transition-all duration-300 ease-out border relative overflow-hidden",
                        isActive
                          ? "bg-[var(--gold)]/15 text-[var(--gold)] border-[var(--gold)]/40 shadow-lg shadow-[var(--gold)]/10 lg:scale-[1.02]"
                          : "bg-white/5 text-white/70 border-white/10 hover:border-white/20 hover:bg-white/8 hover:text-white hover:scale-[1.01]",
                        isLocked ? "opacity-35 cursor-not-allowed hover:scale-100" : ""
                      )}
                    >
                      <div className="flex items-center gap-3 lg:gap-4 z-10">
                        <div
                          className={cn(
                            "w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-colors duration-300",
                            isActive
                              ? "bg-[var(--gold)]/20 text-[var(--gold)]"
                              : "bg-white/10 text-white/60"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-sm lg:text-base">{feature.title}</span>
                      </div>

                      <div className="z-10 flex-shrink-0 hidden lg:block">
                        <div
                          className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
                            isActive
                              ? "bg-[var(--gold)] text-[var(--primary)] scale-100 opacity-100"
                              : "bg-transparent scale-0 opacity-0"
                          )}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {isActive ? (
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-[var(--gold)]/10 to-transparent z-0" />
                      ) : null}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
