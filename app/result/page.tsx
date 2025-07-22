"use client"

import { useMemo } from 'react';
import { useResult } from '@/context/ResultContext';
import { ChartBarMultiple } from "@/components/bar-chart";
import { NavUser } from "../section/user-nav";
import { ChartPieLegend } from "@/components/ui/pie-chart-legend";
import { TopWordsBarChart } from '@/components/top-word-chart';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useRouter } from 'next/navigation';
import { Stemmer } from 'sastrawijs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ReviewData {
  Review: string;
  kelas: string;
  sentimen: 'Positive' | 'Negative' | 'Neutral';
}

interface AccordionData {
  categoryName: string;
  sentimentData: { name: string; value: number }[];
  topWords: { text: string; value: number }[];
}

const stemmer = new Stemmer();

function calculateWordFrequency(reviews: string[]): { text: string; value: number }[] {
  const wordCounts = new Map<string, number>();
  const stopWords = new Set(['dan', 'di', 'yang', 'ini', 'itu', 'tapi', 'kak', 'nya', 'aja', 'sih', 'kok', 'untuk', 'dari', 'dengan', 'juga', 'sudah', 'tadi', 'saya', 'udah', 'belum', 'pesan', 'beli', 'order', 'resto', 'kalo', 'kalau', 'ga', 'gak', 'tidak', 'yg', 'banget']);

  reviews.forEach(review => {
    if (review && typeof review === 'string') {
      const cleanedText = review.toLowerCase().replace(/[^a-z\s]/g, '');
      const words = cleanedText.split(/\s+/);

      words.forEach(word => {
        const rootWord = stemmer.stem(word);
        if (rootWord && rootWord.length >= 3 && !stopWords.has(rootWord)) {
          wordCounts.set(rootWord, (wordCounts.get(rootWord) || 0) + 1);
        }
      });
    }
  });

  const wordData = Array.from(wordCounts.entries()).map(([text, value]) => ({ text, value }));
  wordData.sort((a, b) => b.value - a.value);
  return wordData.slice(0, 10);
}

function processDetailedAccordionData(apiData: ReviewData[]): AccordionData[] {
  if (!apiData || apiData.length === 0) return [];
  const categoryData = new Map<string, {
    sentiments: { [key in ReviewData['sentimen']]: number };
    reviews: string[];
  }>();

  apiData.forEach(item => {
    const categories = item.kelas.split(',').map(cat => cat.trim());
    const reviewText = item.Review;

    categories.forEach(category => {
      if (!categoryData.has(category)) {
        categoryData.set(category, {
          sentiments: { Positive: 0, Negative: 0, Neutral: 0 },
          reviews: []
        });
      }
      const currentData = categoryData.get(category)!;
      currentData.sentiments[item.sentimen] += 1;
      currentData.reviews.push(reviewText);
    });
  });

  return Array.from(categoryData.entries()).map(([categoryName, data]) => ({
    categoryName,
    sentimentData: Object.entries(data.sentiments).map(([name, value]) => ({ name, value })),
    topWords: calculateWordFrequency(data.reviews)
  }));
}

export default function ResultPage() {
    const { resultData } = useResult();
    const router = useRouter();
    const accordionData = useMemo(() => processDetailedAccordionData(resultData), [resultData]);

    if (!resultData || resultData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-2xl font-semibold">Data Tidak Ditemukan</h2>
                <p className="text-muted-foreground mt-2">
                    Silakan kembali dan upload file terlebih dahulu.
                </p>
                <Button onClick={() => router.push('/dashboard')} className="mt-4 bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Kembali ke Halaman Upload
                </Button>
            </div>
        );
    }

    
    return(
        <>
            <nav>
                <NavUser />
            </nav>
            <div className="flex flex-col justify-center my-5 mx-8 max-w-full">
                <div className="flex w-full justify-center items-center m-12">
                    <div className="w-3/5">
                        <ChartBarMultiple /> 
                    </div>
                </div>
                <div className="flex flex-wrap gap-6 justify-center">
                    <Card className='w-full'>
                        <CardHeader>
                            <CardTitle><h2>Hasil Analisis Setiap Kelas</h2></CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full" defaultValue={accordionData[0]?.categoryName}>
                                {accordionData.map((item) => (
                                    <AccordionItem value={item.categoryName} key={item.categoryName}>
                                        <AccordionTrigger>{item.categoryName}</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                                <div className="flex justify-center">
                                                    <ChartPieLegend data={item.sentimentData} />
                                                </div>
                                                <div>
                                                    <TopWordsBarChart data={item.topWords} />
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}