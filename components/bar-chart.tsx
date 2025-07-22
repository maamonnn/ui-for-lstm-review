"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { useResult } from "@/context/ResultContext"

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ReviewData {
  Review: string;
  kelas: string;
  sentimen: string;
}

function processCategoryData(apiData: ReviewData[]) {
  if (!apiData || apiData.length === 0) return { labels: [], counts: [] };
  const categoryCounts = new Map<string, number>();
  apiData.forEach(item => {
    const categories = item.kelas.split(',').map(cat => cat.trim());
    categories.forEach(category => {
      categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
    });
  });
  const sorted = Array.from(categoryCounts.entries()).sort((a, b) => b[1] - a[1]);
  return {
    labels: sorted.map(item => item[0]),
    counts: sorted.map(item => item[1]),
  };
}


// 2. Hapus props `data` dari signature fungsi
export function ChartBarMultiple() {
  // 3. Ambil dan olah data langsung di dalam komponen ini
  const { resultData } = useResult();
  const categoryChartData = useMemo(() => processCategoryData(resultData), [resultData]);

  // Transformasi data untuk Recharts
  const chartData = categoryChartData.labels.map((label, index) => ({
    name: label,
    count: categoryChartData.counts[index],
  }));

  const chartConfig = {
    count: {
      label: "Jumlah Ulasan",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  // Tampilkan pesan jika tidak ada data
  if (chartData.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Frekuensi Kategori Ulasan</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Data tidak tersedia untuk ditampilkan.</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frekuensi Kategori Ulasan</CardTitle>
        <CardDescription>Berdasarkan total ulasan yang dianalisis</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ResponsiveContainer>
            <BarChart layout="vertical" data={chartData} margin={{ left: 20 }}>
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                width={80}
                interval={0}
              />
              <XAxis type="number" />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="count" fill="var(--chart-1)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}