"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  name: string;
  image: string;
}

export function TemplateSelector({
  templates,
  selectedId,
  onSelect,
}: {
  templates: Template[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className={cn(
            "overflow-hidden rounded-xl border bg-white text-left transition-colors",
            selectedId === template.id
              ? "border-[var(--primary)]"
              : "border-[var(--border)] hover:border-[var(--primary)]/40"
          )}
        >
          <div className="relative h-36">
            <Image src={template.image} alt={template.name} fill className="object-cover" sizes="20vw" />
          </div>
          <div className="p-3 text-sm font-medium text-[var(--text)]">{template.name}</div>
        </button>
      ))}
    </div>
  );
}
