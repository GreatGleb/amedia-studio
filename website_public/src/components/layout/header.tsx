"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "@/context/language-context";

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useTranslation();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 bg-amedia-blue shadow-lg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="relative h-32 w-32 bg-white shadow-2xl rounded-full p-4 flex items-center justify-center -mb-8 border-4 border-white/20">
          <Image
            src="/logo-v3.png"
            alt="amediå"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>

        <nav className="hidden md:flex gap-12 text-sm uppercase tracking-[0.2em] font-bold text-white/80">
          <a href="#about" className="hover:text-white transition-colors">{t('nav.vision')}</a>
          <a href="#roi" className="hover:text-white transition-colors">{t('nav.roi')}</a>
          <a href="#portfolio" className="hover:text-white transition-colors">{t('nav.portfolio')}</a>
          <a href="#contact" className="hover:text-white transition-colors">{t('nav.contact')}</a>
        </nav>

        <div className="flex items-center gap-6">
          <div className="flex gap-4 text-xs font-bold tracking-[0.2em] text-white">
            <button 
              onClick={() => setLanguage('no')}
              className={`${language === 'no' ? 'opacity-100' : 'opacity-50'} hover:opacity-100 transition-opacity`}
            >
              NO
            </button>
            <span className="opacity-30">/</span>
            <button 
              onClick={() => setLanguage('ru')}
              className={`${language === 'ru' ? 'opacity-100' : 'opacity-50'} hover:opacity-100 transition-opacity`}
            >
              RU
            </button>
            <span className="opacity-30">/</span>
            <button 
              onClick={() => setLanguage('en')}
              className={`${language === 'en' ? 'opacity-100' : 'opacity-50'} hover:opacity-100 transition-opacity`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
