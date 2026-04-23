"use client";

import { useMemo, useState } from "react";
import { TemplateFilters } from "@/components/gallery/template-filters";
import { TemplateGrid } from "@/components/gallery/template-grid";

const templates = [
  {
    name: "Studio Kadin 01",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop",
    category: "Elbise",
    gender: "Kadin",
  },
  {
    name: "Outdoor Erkek 02",
    image:
      "https://images.unsplash.com/photo-1464863979621-258859e62245?w=900&auto=format&fit=crop",
    category: "Dis Giyim",
    gender: "Erkek",
  },
  {
    name: "Casual Cocuk 03",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop",
    category: "Ust Giyim",
    gender: "Cocuk",
  },
  {
    name: "Video Kadin 04",
    image:
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=900&auto=format&fit=crop",
    category: "Elbise",
    gender: "Kadin",
    isVideo: true,
  },
];

export default function GaleriPage() {
  const [gender, setGender] = useState("all");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () =>
      templates.filter(
        (template) =>
          (gender === "all" || template.gender === gender) &&
          (category === "all" || template.category === category)
      ),
    [gender, category]
  );

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-semibold text-[var(--text)]">Galeri</h1>
      <TemplateFilters
        gender={gender}
        category={category}
        onGenderChange={setGender}
        onCategoryChange={setCategory}
      />
      <TemplateGrid templates={filtered} />
    </div>
  );
}
