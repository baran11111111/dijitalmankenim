import Image from "next/image";
import { Card } from "@/components/ui/card";

export function TemplatePreview({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-96">
        <Image src={image} alt={title} fill className="object-cover" sizes="40vw" />
      </div>
    </Card>
  );
}
