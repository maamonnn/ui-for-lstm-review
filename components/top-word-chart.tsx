"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
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
  ChartTooltipContent,
} from "@/components/ui/chart"

interface TopWordsData {
  text: string;
  value: number;
}

interface TopWordsBarChartProps {
  data: TopWordsData[];
}

const chartConfig = {
  count: {
    label: "Frekuensi",
    color: "#4A90E2",
  },
} satisfies ChartConfig;

export function TopWordsBarChart({ data }: TopWordsBarChartProps) {
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground text-center py-8">Tidak ada kata kunci untuk ditampilkan.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kata Kunci Teratas</CardTitle>
        <CardDescription>Kata yang paling sering muncul dalam kategori ini</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ResponsiveContainer>
            <BarChart layout="vertical" data={data} margin={{ left: 10 }}>
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="text"
                type="category"
                tickLine={false}
                tickMargin={5}
                axisLine={false}
                width={80}
              />
              <XAxis type="number" />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" hideLabel />}
              />
              <Bar 
                dataKey="value"
                fill="var(--color-chart-4)" 
                radius={4} 
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}