"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/language-context";
import { useLenis } from "lenis/react";
import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { ScrollDownArrow } from "@/components/ui/scroll-down-arrow";
import { asset } from "@/lib/utils";

interface BentoCase {
  id: number;
  title: string;
  promise: string;
  case_title: string;
  case_desc: string;
  metric: string;
}

const BACKGROUND_IMAGES: Record<number, string> = {
  1: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600', // Dashboard / ERP
  2: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600', // Modern furniture
  3: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600', // Web performance analytics
  4: 'https://images.unsplash.com/photo-1521405617584-1d9867aecad3?auto=format&fit=crop&q=80&w=1600', // Drone / Video Production
  5: 'https://images.unsplash.com/photo-1598440947619-2ce59f151322?auto=format&fit=crop&q=80&w=1600', // Eco cosmetics
  6: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1600', // Consulting strategy
};

const renderFormattedText = (text: string) => {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <React.Fragment key={i}>
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
             return <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    );
  });
};

const BentoCard = ({ 
  item, 
  isActive, 
  onClick, 
  onClose,
  ctaText
}: { 
  item: BentoCase; 
  isActive: boolean; 
  onClick: () => void; 
  onClose: () => void;
  ctaText: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const lenis = useLenis();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const contactSection = document.getElementById('contact');
    if (contactSection && lenis) {
      lenis.scrollTo(contactSection, { duration: 1.2 });
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  return (
    <>
      <motion.div
        layoutId={`card-${item.id}`}
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        className={`relative overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl cursor-pointer transition-colors duration-300 hover:border-white/20 ${isActive ? 'z-50' : 'z-10'} group`}
        style={isActive ? {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100dvh',
          cursor: 'default',
          borderRadius: 0,
        } : {
          height: '100%',
          minHeight: '280px',
          borderRadius: '2rem',
        }}
      >
        {/* Glow effect */}
        {!isActive && (
          <div 
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(50, 94, 252, 0.15), transparent 40%)`
            }}
          />
        )}
        {/* Background image for all cases */}
        <div 
          className="absolute inset-0 z-0 opacity-80 transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url("${BACKGROUND_IMAGES[item.id]}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Darkened glass effect over the image */}
        <div className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm group-hover:backdrop-blur-md transition-all duration-500" />
        
        <div className={`relative z-10 h-full flex flex-col p-5 sm:p-8 md:p-10 ${isActive ? 'overflow-y-auto' : ''}`}>
          {/* Spacer for fixed header when card is expanded */}
          {isActive && <div className="h-20 sm:h-24 md:h-28 flex-shrink-0" />}
          
          {/* Card Header (Visible in both states) */}
          <motion.div layoutId={`header-${item.id}`} className="space-y-2 sm:space-y-4 mb-4 sm:mb-8">
            <span className="text-amedia-blue font-mono text-[10px] sm:text-sm tracking-widest uppercase">
              {item.title}
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white leading-tight">
              {item.promise}
            </h3>
          </motion.div>

          {/* Collapsed State Content */}
          {!isActive && (
            <motion.div 
              initial={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="mt-auto flex items-end justify-end"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-amedia-blue group-hover:border-amedia-blue group-hover:scale-110 transition-all duration-300">
                <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </motion.div>
          )}

          {/* Expanded State Content */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2 }}
                className="flex-1 flex flex-col lg:flex-row gap-6 sm:gap-12 mt-4 sm:mt-8 border-t border-white/10 pt-4 sm:pt-10"
              >
                <div className="flex-1 space-y-10 flex flex-col">
                  <div>
                    <h4 className="text-white/50 uppercase tracking-widest text-[10px] sm:text-xs font-mono mb-2 sm:mb-4">Кейс</h4>
                    <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium">{item.case_title}</p>
                    <p className="text-sm sm:text-base md:text-lg text-white/70 mt-2 sm:mt-4 leading-relaxed whitespace-pre-line">{renderFormattedText(item.case_desc)}</p>
                  </div>
                  
                  <div className="p-4 sm:p-6 md:p-8 bg-amedia-blue/10 border border-amedia-blue/20 rounded-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-amedia-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <h4 className="text-amedia-blue uppercase tracking-widest text-[10px] sm:text-xs font-mono mb-2 sm:mb-3 relative z-10">Бизнес-результат</h4>
                    <p className="text-base sm:text-xl md:text-2xl text-white font-medium relative z-10">{item.metric}</p>
                  </div>

                  <div className="mt-auto pt-4 sm:pt-8">
                    <button
                      onClick={handleCtaClick}
                      className="group/btn flex items-center justify-center gap-3 sm:gap-4 bg-amedia-blue text-white px-6 sm:px-8 py-3 sm:py-5 rounded-full hover:bg-blue-600 transition-all font-medium hover:scale-105 active:scale-95 w-full sm:w-auto"
                    >
                      {ctaText}
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
                
                {/* Media/Screenshots */}
                {item.id === 1 ? (
                  <div className="flex-[1.2] relative bg-black/20 rounded-3xl p-4 flex flex-col gap-4 min-h-[400px]">
                     {/* 3 images in a Bento style grid inside the right panel */}
                     <div className="grid grid-cols-2 gap-4 h-full">
                       <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-48 md:h-auto">
                          <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Dashboard" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                       </div>
                       <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-40 md:h-auto">
                          <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600" alt="Analytics" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                       </div>
                       <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-40 md:h-auto">
                          <Image src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600" alt="Stats" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                       </div>
                     </div>
                  </div>
                ) : item.id === 2 ? (
                  <div className="flex-[1.2] relative bg-black/20 rounded-3xl p-4 flex flex-col gap-4 min-h-[400px]">
                     <div className="grid grid-cols-2 gap-4 h-full">
                       <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-48 md:h-auto">
                          <Image src={asset("/images/portfolio/furniture_hero.png")} alt="Furniture Hero" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                       </div>
                       <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-40 md:h-auto">
                          <Image src={asset("/images/portfolio/furniture_catalog.png")} alt="Furniture Catalog" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                       </div>
                       <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-40 md:h-auto">
                          <Image src={asset("/images/portfolio/furniture_product.png")} alt="Furniture Product" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                       </div>
                     </div>
                  </div>
                ) : item.id === 3 ? (
                  <div className="flex-[1.2] relative bg-black/20 rounded-3xl p-4 flex flex-col gap-4 min-h-[400px]">
                     <div className="grid grid-cols-2 gap-4 h-full">
                       <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-48 md:h-auto">
                          <Image src={asset("/images/portfolio/ecommerce_storefront.png")} alt="E-commerce Storefront" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                       </div>
                       <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-40 md:h-auto">
                          <Image src={asset("/images/portfolio/ecommerce_analytics.png")} alt="Performance Dashboard" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                       </div>
                       <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-40 md:h-auto">
                          <Image src={asset("/images/portfolio/ecommerce_checkout.png")} alt="Checkout Flow" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                       </div>
                     </div>
                  </div>
                ) : item.id === 4 ? (
                  <div className="flex-[1.2] relative bg-black/20 rounded-3xl p-4 flex flex-col gap-4 min-h-[400px]">
                     <div className="grid grid-cols-2 gap-4 h-full">
                       <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-48 md:h-auto">
                          <video src={asset("/videos/portfolio/lotus_video.mp4")} autoPlay loop muted playsInline className="object-cover w-full h-full object-center group-hover:scale-105 transition-transform duration-700" />
                       </div>
                       <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-40 md:h-auto">
                          <Image src={asset("/images/portfolio/lotus_1.jpg")} alt="Lotus Exige 1" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                       </div>
                       <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-40 md:h-auto">
                          <Image src={asset("/images/portfolio/lotus_2.jpg")} alt="Lotus Exige 2" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                       </div>
                     </div>
                  </div>
                ) : item.id === 5 ? (
                  <div className="flex-[1.2] relative bg-black/20 rounded-3xl p-4 flex flex-col gap-4 min-h-[400px]">
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
                       <div className="col-span-2 md:col-span-3 relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-64 md:h-80">
                          <Image src={asset("/images/portfolio/tea_bar/373318113550605.602a88dd76e08.jpg")} alt="Eco Cosmetics Main" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                       </div>
                       <div className="col-span-1 md:col-span-2 relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-48 md:h-64">
                          <Image src={asset("/images/portfolio/tea_bar/505e83113550605.602a84f2dc19d.webp")} alt="Eco Cosmetics 2" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                       </div>
                       <div className="col-span-1 md:col-span-1 relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-48 md:h-64">
                          <Image src={asset("/images/portfolio/tea_bar/0f22f4113550605.602a84f2d6c86.jpg")} alt="Eco Cosmetics 3" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                       </div>
                       <div className="col-span-1 md:col-span-1 relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-48 md:h-64">
                          <Image src={asset("/images/portfolio/tea_bar/585508113550605.602a8c871377e.jpg")} alt="Eco Cosmetics 4" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                       </div>
                       <div className="col-span-1 md:col-span-2 relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-48 md:h-64">
                          <Image src={asset("/images/portfolio/tea_bar/b31ee4113550605.602a84f25c7df.jpg")} alt="Eco Cosmetics 5" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                       </div>
                       <div className="col-span-1 md:col-span-2 relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-48 md:h-64">
                          <Image src={asset("/images/portfolio/tea_bar/b9c12e113550605.602a84f2d7ae2.jpg")} alt="Eco Cosmetics 6" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                       </div>
                       <div className="col-span-1 md:col-span-1 relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-48 md:h-64">
                          <Image src={asset("/images/portfolio/tea_bar/b8f7e1113550605.602a8dd772c3e.jpg")} alt="Eco Cosmetics 7" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                       </div>
                     </div>
                  </div>
                ) : item.id === 6 ? (
                  <div className="flex-[1.2] relative bg-black/20 rounded-3xl p-4 flex flex-col gap-4 h-max">
                     <div className="flex flex-col gap-4">
                       <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group">
                          <Image src={asset("/images/cases/logistic/1532d2248059303.69e8ddbdc1a99.png")} alt="Зависшая ERP-система 1" width={1600} height={900} className="w-full h-auto block group-hover:scale-105 transition-transform duration-700" />
                       </div>
                       <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group">
                          <Image src={asset("/images/cases/logistic/4f6bc6248059303.69e8e0fa4bc68.png")} alt="Зависшая ERP-система 2" width={1600} height={900} className="w-full h-auto block group-hover:scale-105 transition-transform duration-700" />
                       </div>
                     </div>
                  </div>
                ) : (
                  <div className="flex-[1.2] relative bg-black/40 rounded-3xl border border-white/5 flex items-center justify-center min-h-[400px] overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-br from-amedia-blue/20 to-amedia-green/20 mix-blend-overlay opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                     
                     {/* Abstract graphics instead of just text */}
                     <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                     
                     <div className="text-center p-8 relative z-10">
                        <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
                          <ArrowRight className="w-8 h-8 text-white/50 rotate-45" />
                        </div>
                        <div className="text-white/40 font-mono text-sm uppercase tracking-widest">Интерактивный контент кейса</div>
                        <div className="text-white/20 mt-2 text-xs">(Media Placeholder)</div>
                     </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Close button — outside motion.div so it's in root stacking context, above the header */}
      <AnimatePresence>
        {isActive && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="fixed top-20 sm:top-24 md:top-28 right-4 sm:right-6 md:right-8 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all border border-white/20 hover:scale-110 active:scale-95 z-[60] backdrop-blur-md"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export function Portfolio() {
  const containerRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const title = t('portfolio.title');
  const subtitle = t('portfolio.subtitle');
  const ctaText = t('portfolio.cta');
  
  // Safe cast since we know the structure
  const bentoCases = (t('portfolio.bento_cases') as unknown) as BentoCase[];

  // Disable scroll when modal is open
  useEffect(() => {
    if (activeCard !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeCard]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCard(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // If translations haven't loaded yet
  if (!Array.isArray(bentoCases)) return null;

  return (
    <section id="portfolio" ref={containerRef} className="relative bg-amedia-green py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 min-h-screen z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10 sm:mb-16 md:mb-20 space-y-3 sm:space-y-4 md:space-y-6">
          <span className="text-amedia-blue font-mono text-[10px] sm:text-sm tracking-widest uppercase">
            {t('labels.cases')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-white tracking-tight whitespace-pre-line">
            {title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 auto-rows-[minmax(280px,auto)]">
          {bentoCases.map((item, index) => {
            // Asymmetric layout logic
            const isLarge = index === 0 || index === 3;
            const isTall = index === 1;
            
            return (
              <div 
                key={item.id} 
                className={`
                  ${isLarge ? 'xl:col-span-2' : 'xl:col-span-1'}
                  ${isTall ? 'md:row-span-2' : ''}
                `}
              >
                <BentoCard 
                  item={item} 
                  isActive={activeCard === item.id} 
                  onClick={() => activeCard === null && setActiveCard(item.id)}
                  onClose={() => setActiveCard(null)}
                  ctaText={ctaText}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Backdrop for active card */}
      <AnimatePresence>
        {activeCard !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCard(null)}
            className="fixed inset-0 bg-[#274949]/80 backdrop-blur-xl z-40"
          />
        )}
      </AnimatePresence>
      <ScrollDownArrow containerRef={containerRef} />
    </section>
  );
}
