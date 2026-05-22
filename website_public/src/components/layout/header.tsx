"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "@/context/language-context";

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangHovered, setIsLangHovered] = useState(false);
  const { language, setLanguage, t } = useTranslation();

  const languages = ['no', 'ru', 'en'] as const;
  const currentIndex = languages.indexOf(language as any) >= 0 ? languages.indexOf(language as any) : 0;
  const nextIndex = (currentIndex + 1) % languages.length;

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-amedia-blue shadow-lg border-b border-white/10 ${
        isScrolled ? "py-3 md:py-4" : "py-6 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="relative h-14 w-40 bg-white/95 backdrop-blur-sm shadow-xl rounded-full px-5 py-2 flex items-center justify-center border border-white/20 hover:scale-105 transition-transform duration-300">
          <Image
            src="/logo-v3.png"
            alt="amediå"
            width={115}
            height={30}
            className="object-contain"
            priority
          />
        </div>

        <nav className="hidden md:flex gap-12 text-sm uppercase tracking-[0.2em] font-bold text-white/80">
          <a href="#about" className="hover:text-white transition-colors">{t('nav.vision')}</a>
          <a href="#roi" className="hover:text-white transition-colors">{t('nav.roi')}</a>
          <a href="#portfolio" className="hover:text-white transition-colors">{t('nav.portfolio')}</a>
          <a href="#contact" className="hover:text-white transition-colors">{t('nav.contact')}</a>
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden md:flex items-center justify-center h-[38px] px-5 sm:px-6 bg-white text-amedia-blue text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            {t('hero.cta_primary')}
          </a>

          <div 
            className="relative flex items-center w-[114px] h-[38px] bg-white/10 backdrop-blur-sm rounded-full p-[3px] cursor-pointer border border-white/20 transition-colors hover:bg-white/15"
            onClick={() => setLanguage(languages[nextIndex])}
            onMouseEnter={() => setIsLangHovered(true)}
            onMouseLeave={() => setIsLangHovered(false)}
          >
            {/* Hover indicator for the NEXT language path */}
            <motion.div
              className="absolute h-[32px] bg-white/20 rounded-full"
              initial={false}
              animate={{ 
                opacity: isLangHovered ? 1 : 0,
                x: isLangHovered ? Math.min(currentIndex, nextIndex) * 38 : currentIndex * 38,
                width: isLangHovered ? Math.abs(currentIndex - nextIndex) * 38 + 32 : 32
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />

            {/* The sliding active background */}
            <motion.div
              className="absolute w-[32px] h-[32px] bg-white rounded-full shadow-md"
              animate={{ 
                x: currentIndex * 38
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />

            {/* Text labels */}
            <div className="relative flex items-center w-full z-10 text-[11px] font-bold tracking-[0.1em]">
              {languages.map((lang, idx) => (
                <div 
                  key={lang} 
                  className={`w-[38px] flex justify-center transition-colors duration-300 ${
                    currentIndex === idx ? 'text-[#001838]' : 'text-white'
                  }`}
                >
                  {lang.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
