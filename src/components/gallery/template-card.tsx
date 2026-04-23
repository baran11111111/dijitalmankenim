import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface TemplateCardProps {
  name: string;
  image: string;
  category: string;
  gender: string;
  isVideo?: boolean;
}

export function TemplateCard({
  name,
  image,
  category,
  gender,
  isVideo,
}: TemplateCardProps) {
  return (
    <Card hover className="overflow-hidden">
      <div className="relative h-56">
        <Image src={image} alt={name} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 20vw" />
      </div>
      <CardContent>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold text-[var(--text)]">{name}</h3>
          {isVideo ? <Badge variant="warning">Video</Badge> : <Badge>Foto</Badge>}
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          {gender} / {category}
        </p>
      </CardContent>
    </Card>
  );
}
