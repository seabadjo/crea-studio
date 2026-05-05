import { useState, useEffect, useCallback } from 'react';
import { DollarSign, MousePointerClick, TrendingUp } from 'lucide-react';

interface RevenueData {
  daily: number;
  total: number;
  clicks: number;
  lastReset: string;
}

const STORAGE_KEY = 'devmaster_revenue';

function loadData(): RevenueData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: RevenueData = JSON.parse(saved);
      if (parsed.lastReset !== new Date().toDateString()) {
        parsed.daily = 0;
        parsed.clicks = 0;
        parsed.lastReset = new Date().toDateString();
      }
      return parsed;
    }
  } catch {
    // ignore
  }
  return { daily: 0, total: 0, clicks: 0, lastReset: new Date().toDateString() };
}

export function useRevenue() {
  const [data, setData] = useState<RevenueData>(loadData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addRevenue = useCallback((amount: number) => {
    setData(prev => ({
      ...prev,
      daily: prev.daily + amount,
      total: prev.total + amount,
      clicks: prev.clicks + 1,
    }));
  }, []);

  const addClick = useCallback(() => {
    setData(prev => ({
      ...prev,
      clicks: prev.clicks + 1,
    }));
  }, []);

  // Passive revenue simulation (CPM)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setData(prev => ({
          ...prev,
          daily: prev.daily + 0.02,
          total: prev.total + 0.02,
        }));
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return { data, addRevenue, addClick };
}

interface RevenueBarProps {
  data: RevenueData;
}

export default function RevenueBar({ data }: RevenueBarProps) {
  const visible = data.clicks > 0 || data.total > 0;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] glass-strong transition-transform duration-500 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-green-400">
            <DollarSign className="w-4 h-4" />
            <span className="text-cream/60">Aujourd'hui:</span>
            <span className="font-semibold">€{data.daily.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp className="w-4 h-4" />
            <span className="text-cream/60">Total:</span>
            <span className="font-semibold">€{data.total.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-cream/60">
          <MousePointerClick className="w-4 h-4" />
          <span>{data.clicks} clics</span>
        </div>
      </div>
    </div>
  );
}