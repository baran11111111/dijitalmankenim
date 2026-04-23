import { TemplateForm } from "@/components/admin/template-form";

export default function AdminTemplatesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[var(--text)]">Sablon Yonetimi</h1>
      <TemplateForm />
    </div>
  );
}
