"use client";

import { useState, useCallback, useRef } from "react";

interface GenerationState {
  status: "idle" | "uploading" | "processing" | "completed" | "failed";
  progress: number;
  outputUrl: string | null;
  error: string | null;
  generationId: string | null;
}

export function useGeneration() {
  const [state, setState] = useState<GenerationState>({
    status: "idle",
    progress: 0,
    outputUrl: null,
    error: null,
    generationId: null,
  });
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const startGeneration = useCallback(
    async (templateId: string, inputImageUrl: string, type: "PHOTO" | "VIDEO" = "PHOTO", category: "tops" | "bottoms" | "one-pieces" = "tops") => {
      setState({
        status: "processing",
        progress: 10,
        outputUrl: null,
        error: null,
        generationId: null,
      });

      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ templateId, inputImageUrl, type, category }),
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || "Uretim baslatilamadi");
        }

        const { generationId } = await response.json();
        setState((prev) => ({ ...prev, generationId, progress: 30 }));

        // Poll for status
        const poll = async () => {
          try {
            const res = await fetch(`/api/generate/${generationId}`);
            const data = await res.json();

            if (data.status === "COMPLETED") {
              setState({
                status: "completed",
                progress: 100,
                outputUrl: data.outputImageUrl || data.outputVideoUrl,
                error: null,
                generationId,
              });
              return;
            }

            if (data.status === "FAILED") {
              setState({
                status: "failed",
                progress: 0,
                outputUrl: null,
                error: data.errorMessage || "Uretim basarisiz oldu",
                generationId,
              });
              return;
            }

            setState((prev) => ({
              ...prev,
              progress: Math.min(prev.progress + 10, 90),
            }));
            pollingRef.current = setTimeout(poll, 2000);
          } catch {
            setState((prev) => ({
              ...prev,
              status: "failed",
              error: "Baglanti hatasi",
            }));
          }
        };

        pollingRef.current = setTimeout(poll, 2000);
      } catch (error) {
        setState({
          status: "failed",
          progress: 0,
          outputUrl: null,
          error: error instanceof Error ? error.message : "Bilinmeyen hata",
          generationId: null,
        });
      }
    },
    []
  );

  const reset = useCallback(() => {
    if (pollingRef.current) clearTimeout(pollingRef.current);
    setState({
      status: "idle",
      progress: 0,
      outputUrl: null,
      error: null,
      generationId: null,
    });
  }, []);

  return { ...state, startGeneration, reset };
}
