"use client";

interface TemplateFiltersProps {
  gender: string;
  category: string;
  onGenderChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export function TemplateFilters({
  gender,
  category,
  onGenderChange,
  onCategoryChange,
}: TemplateFiltersProps) {
  return (
    <div className="grid gap-3 rounded-xl border border-[var(--border)] bg-white p-4 sm:grid-cols-2">
      <select
        className="h-11 rounded-lg border border-[var(--border)] px-3 text-sm"
        value={gender}
        onChange={(event) => onGenderChange(event.target.value)}
      >
        <option value="all">Tum Cinsiyetler</option>
        <option value="Kadin">Kadin</option>
        <option value="Erkek">Erkek</option>
        <option value="Cocuk">Cocuk</option>
      </select>
      <select
        className="h-11 rounded-lg border border-[var(--border)] px-3 text-sm"
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="all">Tum Kategoriler</option>
        <option value="Ust Giyim">Ust Giyim</option>
        <option value="Alt Giyim">Alt Giyim</option>
        <option value="Elbise">Elbise</option>
        <option value="Dis Giyim">Dis Giyim</option>
      </select>
    </div>
  );
}
