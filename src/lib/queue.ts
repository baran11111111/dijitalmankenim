export async function enqueueGeneration(generationId: string) {
  return { queued: true, generationId };
}
