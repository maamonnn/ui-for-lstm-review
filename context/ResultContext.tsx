"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface ReviewData {
  Review: string;
  kelas: string;
  sentimen: 'Positive' | 'Negative' | 'Neutral';
}

interface ResultContextType {
  resultData: ReviewData[];
  setResultData: (data: ReviewData[]) => void;
}

const ResultContext = createContext<ResultContextType | undefined>(undefined);

export function ResultProvider({ children }: { children: ReactNode }) {
  const [resultData, setResultData] = useState<ReviewData[]>([]);

  return (
    <ResultContext.Provider value={{ resultData, setResultData }}>
      {children}
    </ResultContext.Provider>
  );
}

export function useResult() {
  const context = useContext(ResultContext);
  if (context === undefined) {
    throw new Error('useResult must be used within a ResultProvider');
  }
  return context;
}