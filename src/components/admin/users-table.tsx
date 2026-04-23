import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const users = [
  { email: "admin@dijitalmankenim.com", role: "ADMIN", photoTokens: 999, videoTokens: 999 },
  { email: "test@test.com", role: "USER", photoTokens: 10, videoTokens: 0 },
];

export function UsersTable() {
  return (
    <Card>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[var(--text-muted)]">
              <th className="py-2">E-posta</th>
              <th className="py-2">Rol</th>
              <th className="py-2">Fotoğraf Token</th>
              <th className="py-2">Video Token</th>
              <th className="py-2">Islem</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email} className="border-t border-[var(--border-light)]">
                <td className="py-3">{user.email}</td>
                <td className="py-3">{user.role}</td>
                <td className="py-3">{user.photoTokens}</td>
                <td className="py-3">{user.videoTokens}</td>
                <td className="py-3">
                  <Button size="sm" variant="outline">
                    Token Ekle
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
