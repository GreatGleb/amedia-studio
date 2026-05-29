"use client";

import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/language-context";
import { ScrollDownArrow } from "@/components/ui/scroll-down-arrow";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (val: number) => void;
}

function Slider({ label, value, min, max, step = 1, unit = "", onChange }: SliderProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-[10px] sm:text-sm font-medium uppercase tracking-wider opacity-60">
          {label}
        </label>
        <span className="text-base sm:text-xl font-light">
          {value.toLocaleString()}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 sm:h-1 bg-amedia-green/10 rounded-lg appearance-none cursor-pointer accent-amedia-blue"
      />
    </div>
  );
}

export function ROICalculator() {
  const containerRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const [leads, setLeads] = useState(100);
  const [conversion, setConversion] = useState(5);
  const [ltv, setLtv] = useState(1000);
  const [cost, setCost] = useState(2000);

  const roi = useMemo(() => {
    const revenue = leads * (conversion / 100) * ltv;
    if (cost === 0) return 0;
    return ((revenue - cost) / cost) * 100;
  }, [leads, conversion, ltv, cost]);

  const revenue = leads * (conversion / 100) * ltv;

  return (
    <section id="roi" ref={containerRef} className="relative bg-[#f8f8f8] py-16 sm:py-24 px-4 sm:px-6 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center w-full">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <span className="text-amedia-blue font-mono text-[10px] sm:text-sm tracking-widest uppercase">
              {t('labels.performance')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-amedia-green leading-tight">
              {t('roi.title')}
            </h2>
            <p className="text-amedia-green/70 text-base sm:text-lg leading-relaxed max-w-xl whitespace-pre-line">
              {t('roi.description')}
            </p>
          </div>

          <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm space-y-5 sm:space-y-8 text-amedia-green">
            <Slider
              label={t('roi.leads')}
              value={leads}
              min={10}
              max={1000}
              onChange={setLeads}
            />
            <Slider
              label={t('roi.conversion')}
              value={conversion}
              min={0.1}
              max={20}
              step={0.1}
              unit="%"
              onChange={setConversion}
            />
            <Slider
              label={t('roi.ltv')}
              value={ltv}
              min={100}
              max={10000}
              step={100}
              unit="€"
              onChange={setLtv}
            />
            <Slider
              label={t('roi.cost')}
              value={cost}
              min={500}
              max={50000}
              step={500}
              unit="€"
              onChange={setCost}
            />
          </div>
        </div>

        <div className="bg-amedia-green text-white p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl space-y-8 sm:space-y-12 flex flex-col justify-between min-h-[350px] sm:min-h-[500px]">
          <div className="space-y-1 sm:space-y-2">
            <span className="text-[10px] sm:text-sm uppercase tracking-widest opacity-60">{t('roi.revenue')}</span>
            <div className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tighter break-all sm:break-normal">
              {revenue.toLocaleString()}€
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="h-[1px] w-full bg-white/10" />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0">
              <div className="space-y-1 sm:space-y-2">
                <span className="text-[10px] sm:text-sm uppercase tracking-widest opacity-60">{t('roi.result')}</span>
                <div className={`text-3xl sm:text-4xl font-bold ${roi >= 0 ? 'text-amedia-blue' : 'text-red-400'}`}>
                  {roi.toFixed(0)}%
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-amedia-blue text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-[10px] sm:text-sm uppercase tracking-widest font-medium w-full sm:w-auto"
              >
                {t('roi.audit')}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      <ScrollDownArrow containerRef={containerRef as any} className="text-zinc-900/40 hover:text-zinc-900" />
    </section>
  );
}
