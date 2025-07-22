"use client"

// Impor semua yang kita butuhkan
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface PieChartData {
  name: string;
  value: number;
}

interface ChartPieLegendProps {
  data: PieChartData[];
}

const sentimentConfig = {
  Positive: {
    label: "Positif",
    color: "var(--chart-2)",
  },
  Negative: {
    label: "Negatif",
    color: "var(--destructive)",
  },
  Neutral: {
    label: "Netral",
    color: "var(--ring)",
  },
} satisfies ChartConfig;

export function ChartPieLegend({ data }: ChartPieLegendProps) {
  if (!data || data.length === 0) {
    return (
        <Card className="flex flex-col w-full max-w-lg mx-auto">
            <CardHeader className="items-center pb-0">
                <CardTitle>Distribusi Sentimen</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-center py-8">Data tidak tersedia.</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="flex flex-col w-full max-w-lg mx-auto">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribusi Sentimen</CardTitle>
        <CardDescription>Berdasarkan kategori yang dipilih</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 pb-4">
        <ChartContainer
          config={sentimentConfig}
          className="mx-auto aspect-square h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data} 
                dataKey="value"
                nameKey="name"
                innerRadius={0}
                outerRadius={75}
                strokeWidth={5}
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={sentimentConfig[entry.name as keyof typeof sentimentConfig]?.color || "#cccccc"}
                    className="focus:outline-none"
                  />
                ))}
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                className="mt-4 flex-wrap gap-2"
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}