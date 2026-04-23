import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function TemplateForm() {
  return (
    <Card>
      <CardContent className="space-y-4">
        <Input label="Sablon Adi" placeholder="Studio Kadin 01" />
        <Input label="Kategori" placeholder="Elbise" />
        <Input label="Thumbnail URL" placeholder="https://..." />
        <Button>Sablonu Kaydet</Button>
      </CardContent>
    </Card>
  );
}
