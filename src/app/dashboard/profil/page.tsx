import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfilPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[var(--text)]">Profil</h1>
      <Card>
        <CardContent className="space-y-4">
          <Input label="Ad Soyad" defaultValue="Demo Kullanici" />
          <Input label="E-posta" defaultValue="demo@dijitalmankenim.com" />
          <Input label="Yeni Sifre" type="password" placeholder="••••••••" />
          <Button>Degisiklikleri Kaydet</Button>
        </CardContent>
      </Card>
    </div>
  );
}
