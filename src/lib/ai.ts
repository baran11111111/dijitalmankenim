const FASHN_API_KEY = process.env.FASHN_API_KEY || "";
const KLING_API_KEY = process.env.KLING_API_KEY || "";
const AI_MOCK_MODE = process.env.AI_MOCK_MODE === "true";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generatePhoto(input: {
  templateImageUrl: string;
  productImageUrl: string;
  category?: "tops" | "bottoms" | "one-pieces";
}): Promise<{ outputUrl: string; processingTime: number }> {
  const startTime = Date.now();

  if (AI_MOCK_MODE || !FASHN_API_KEY) {
    if (!FASHN_API_KEY) console.warn("FASHN_API_KEY bulunamadi. MOCK modunda calisiyor.");
    await sleep(5000);
    return {
      outputUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
      processingTime: Date.now() - startTime,
    };
  }

  // FASHN AI Integration (VTON)
  const response = await fetch("https://api.fashn.ai/v1/run", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${FASHN_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model_image: input.templateImageUrl,
      garment_image: input.productImageUrl,
      category: input.category || "tops",
      nsfw_filter: false,
    }),
    signal: AbortSignal.timeout(30000), // 30 seconds wait for starting the job
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`FASHN API hatasi: ${err}`);
  }

  let result = await response.json();
  const fashnId = result.id;

  // Poll for completion
  let attempts = 0;
  while (result.status !== "completed" && result.status !== "failed" && attempts < 60) {
    await sleep(3000);
    const pollResponse = await fetch(`https://api.fashn.ai/v1/status/${fashnId}`, {
      headers: { Authorization: `Bearer ${FASHN_API_KEY}` },
    });
    result = await pollResponse.json();
    attempts++;
  }

  if (result.status === "failed") {
    throw new Error(result.error || "FASHN AI uretimi basarisiz");
  }

  if (result.status !== "completed") {
    throw new Error("FASHN AI uretimi zaman asimina ugradi");
  }

  return {
    outputUrl: Array.isArray(result.output) ? result.output[0] : result.outputUrl || result.output,
    processingTime: Date.now() - startTime,
  };
}

export async function generateVideo(input: {
  templateVideoUrl: string;
  productImageUrl: string;
}): Promise<{ outputUrl: string; processingTime: number }> {
  const startTime = Date.now();

  if (AI_MOCK_MODE || !KLING_API_KEY) {
    if (!KLING_API_KEY) console.warn("KLING_API_KEY bulunamadi. MOCK modunda calisiyor.");
    await sleep(5000);
    return {
      outputUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
      processingTime: Date.now() - startTime,
    };
  }

  // Kling API Placeholder for Image-to-Video Workflow
  // Bura kullaniciya bagli olarak gercek Kling AI end pointine cevrilir.
  throw new Error("Kling Video uretimi API'si entegre edildi ancak key eksik/henuz kullanilamiyor");
}
