"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const daily = [
  { day: "Pzt", value: 34 },
  { day: "Sal", value: 28 },
  { day: "Car", value: 43 },
  { day: "Per", value: 51 },
  { day: "Cum", value: 47 },
  { day: "Cmt", value: 39 },
  { day: "Paz", value: 56 },
];

export function StatsCharts() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Card>
        <CardContent>
          <h3 className="mb-4 font-semibold text-[var(--text)]">Gunluk Uretimler</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={daily}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#4a6670" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h3 className="mb-4 font-semibold text-[var(--text)]">Gelir Dagilimi</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={daily}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4a6670" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
