import { TemplateCard } from "./template-card";

interface Template {
  name: string;
  image: string;
  category: string;
  gender: string;
  isVideo?: boolean;
}

export function TemplateGrid({ templates }: { templates: Template[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {templates.map((template) => (
        <TemplateCard key={template.name} {...template} />
      ))}
    </div>
  );
}
