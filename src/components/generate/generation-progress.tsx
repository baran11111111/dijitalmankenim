import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

export function GenerationProgress({ progress }: { progress: number }) {
  return (
    <Card>
      <CardContent>
        <h3 className="text-lg font-semibold text-[var(--text)]">Uretim Durumu</h3>
        <div className="mt-4">
          <Progress value={progress} showLabel />
        </div>
      </CardContent>
    </Card>
  );
}
