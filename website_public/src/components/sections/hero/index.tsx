"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslation } from "@/context/language-context";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amedia-green to-black text-white overflow-hidden"
    >
      {/* Placeholder Background Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amedia-blue rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amedia-green rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center space-y-8 flex flex-col items-center max-w-4xl px-6">
        <div className="relative h-32 w-32 bg-white shadow-2xl rounded-full p-6 flex items-center justify-center">
          <Image
            src="/logo-v3.png"
            alt="amediå"
            width={100}
            height={100}
            className="object-contain"
            priority
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
          {t('hero.title')}
        </h1>
        
        <p className="text-xl md:text-2xl font-light tracking-widest uppercase opacity-80">
          {t('hero.subtitle')}
        </p>

        <button className="mt-4 px-8 py-4 bg-amedia-blue text-white rounded-full font-medium uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors duration-300 shadow-lg hover:shadow-amedia-blue/20">
          {t('hero.cta')}
        </button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50">
        <span className="text-xs uppercase tracking-[0.3em]">{t('hero.scroll')}</span>
        <div className="w-[1px] h-12 bg-white animate-pulse" />
      </div>
    </section>
  );
}

export { ServicesSequence } from "./services-sequence";
