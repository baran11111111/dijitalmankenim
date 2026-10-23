import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { categories } from "@/lib/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...categories.map((c) => ({
      url: `${SITE_URL}/cozumler/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/hakkimizda`, lastModified: now, priority: 0.4 },
    { url: `${SITE_URL}/iletisim`, lastModified: now, priority: 0.4 },
    { url: `${SITE_URL}/gizlilik`, lastModified: now, priority: 0.2 },
  ];
}
