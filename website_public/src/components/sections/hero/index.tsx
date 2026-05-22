"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/language-context";
import { useLenis } from "lenis/react";
import { ScrollDownArrow } from "@/components/ui/scroll-down-arrow";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const lenis = useLenis();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2 });
    } else {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Handle smooth snap scroll to next section
  useEffect(() => {
    let isScrolling = false;
    
    const handleWheel = (e: WheelEvent) => {
      // Only act if we are at the very top of the page
      if (window.scrollY > 10) return;
      
      // If scrolling down
      if (e.deltaY > 0 && !isScrolling) {
        e.preventDefault();
        isScrolling = true;
        
        const nextElement = containerRef.current?.nextElementSibling as HTMLElement;
        if (nextElement && lenis) {
          lenis.scrollTo(nextElement, { duration: 1.2 });
        } else if (nextElement) {
          window.scrollTo({
            top: nextElement.offsetTop,
            behavior: 'smooth'
          });
        }
        
        setTimeout(() => {
          isScrolling = false;
        }, 1200);
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY > 10) return;
      
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      // If swiping up (scrolling down)
      if (deltaY > 50 && !isScrolling) {
        isScrolling = true;
        
        const nextElement = containerRef.current?.nextElementSibling as HTMLElement;
        if (nextElement && lenis) {
          lenis.scrollTo(nextElement, { duration: 1.2 });
        } else if (nextElement) {
          window.scrollTo({
            top: nextElement.offsetTop,
            behavior: 'smooth'
          });
        }
        
        setTimeout(() => {
          isScrolling = false;
        }, 1200);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen flex flex-col text-white overflow-hidden bg-zinc-950"
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover object-center w-full h-full brightness-[0.7] contrast-[1.05]"
          >
            <source src="/videos/18660951-hd_1920_1080_30fps.mp4" type="video/mp4" media="(min-width: 1280px)" />
            <source src="/videos/18660951-hd_1280_720_30fps.mp4" type="video/mp4" media="(min-width: 768px)" />
            <source src="/videos/18660951-sd_640_360_30fps.mp4" type="video/mp4" media="(min-width: 480px)" />
            <source src="/videos/18660951-sd_426_240_30fps.mp4" type="video/mp4" />
          </video>
        </motion.div>
        
        {/* Gradients to blend the background and ensure absolute readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/30 z-10" />
      </div>

      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 flex-1 flex flex-col justify-center">
        <div className="w-full lg:w-[65%] xl:w-[60%] flex flex-col space-y-6 md:space-y-8 pt-32 pb-24 md:pt-44 md:pb-32">
          
          {/* Eyebrow */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="flex items-center space-x-3 text-amedia-blue font-mono text-xs md:text-sm tracking-[0.25em] uppercase"
          >
            <span className="w-8 h-[2px] bg-amedia-blue inline-block"></span>
            <span>{t('hero.eyebrow')}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
          >
            {t('hero.title')}
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="text-base md:text-lg text-white/70 max-w-xl font-light leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a 
              href="#contact" 
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="group px-8 py-4 bg-amedia-blue text-white rounded-full font-semibold tracking-wider text-xs md:text-sm flex items-center gap-2 hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-amedia-blue/20 hover:shadow-white/10"
            >
              <span>{t('hero.cta_primary')}</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a 
              href="#roi" 
              onClick={(e) => handleScrollTo(e, '#roi')}
              className="px-8 py-4 bg-transparent border border-white/20 hover:border-white text-white rounded-full font-semibold tracking-wider text-xs md:text-sm hover:bg-white/5 transition-all duration-300"
            >
              {t('hero.cta_secondary')}
            </a>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10 max-w-2xl"
          >
            <div className="space-y-1">
              <div className="text-2xl md:text-4xl font-bold text-white font-mono">{t('hero.metric_1_val')}</div>
              <div className="text-[10px] md:text-xs uppercase tracking-wider text-white/50">{t('hero.metric_1_txt')}</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl md:text-4xl font-bold text-white font-mono">{t('hero.metric_2_val')}</div>
              <div className="text-[10px] md:text-xs uppercase tracking-wider text-white/50">{t('hero.metric_2_txt')}</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl md:text-4xl font-bold text-white font-mono">{t('hero.metric_3_val')}</div>
              <div className="text-[10px] md:text-xs uppercase tracking-wider text-white/50">{t('hero.metric_3_txt')}</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-6 md:left-12 flex items-center space-x-4 z-20 select-none pointer-events-none"
      >
        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-mono text-white">{t('hero.scroll')}</span>
        <div className="w-12 h-[1px] bg-white/20 relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-amedia-blue w-4"
            animate={{ 
              x: [0, 48 - 16, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              ease: "easeInOut" 
            }}
          />
        </div>
      </motion.div>
      <ScrollDownArrow containerRef={containerRef} />
    </section>
  );
}

export { ServicesSequence } from "./services-sequence";
