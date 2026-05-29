"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/context/language-context";
import { ScrollDownArrow } from "@/components/ui/scroll-down-arrow";
import Image from "next/image";
import { asset } from "@/lib/utils";
import { Layers, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const contentText = t('about.text');

  useGSAP(() => {
    if (!textRef.current) return;

    // Reveal text characters smoothly on scroll
    gsap.to(textRef.current.querySelectorAll(".char"), {
      opacity: 1,
      stagger: { amount: 1 }, // Distributes the stagger evenly across all letters
      duration: 0.5,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 85%", // Start when text is 85% down the screen
        end: "center 50%", // Finish exactly when the text is centered on screen!
        scrub: 1,
      },
    });
  }, { scope: containerRef, dependencies: [contentText] });
  
  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-amedia-green text-white px-4 sm:px-6 py-16 sm:py-24 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amedia-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
        
        {/* Left column: Text & Vision */}
        <div className="space-y-8 sm:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-amedia-blue font-mono text-xs sm:text-sm tracking-widest uppercase">
              {t('about.label')}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tight leading-tight">
              {t('about.title')}
            </h2>
          </motion.div>

          <div
            ref={textRef}
            className="text-lg sm:text-xl md:text-3xl font-light leading-relaxed tracking-tight max-w-2xl"
          >
            {contentText.split(" ").map((word, wIdx) => (
              <span key={wIdx} className="inline-block mr-2">
                {word.split("").map((char, cIdx) => (
                  <span key={cIdx} className="char opacity-20">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Right column: Bento Grid & Graphic Elements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Card 1: Experience Stat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-1 p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amedia-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-light mb-2">{t('about.stats.years_val')}</h3>
            <p className="text-xs sm:text-sm font-mono text-white/60 uppercase tracking-wider">{t('about.stats.years_txt')}</p>
          </motion.div>

          {/* Card 2: Projects Stat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="col-span-1 p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amedia-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-light mb-2">{t('about.stats.projects_val')}</h3>
            <p className="text-xs sm:text-sm font-mono text-white/60 uppercase tracking-wider">{t('about.stats.projects_txt')}</p>
          </motion.div>

          {/* Card 3: Graphic / Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="col-span-1 sm:col-span-2 relative min-h-[250px] sm:min-h-[300px] rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden group"
          >
            <Image
              src={asset("/about-bg.png")}
              alt="amediå agency"
              fill
              className="object-cover opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105"
            />
            {/* Overlay features */}
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end bg-gradient-to-t from-amedia-green/80 to-transparent">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                <div className="flex-1">
                  <Rocket className="w-6 sm:w-8 h-6 sm:h-8 text-amedia-blue mb-3 sm:mb-4" strokeWidth={1.5} />
                  <h4 className="text-lg sm:text-xl font-medium mb-2">{t('about.features.tech')}</h4>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{t('about.features.tech_desc')}</p>
                </div>
                <div className="flex-1">
                  <Layers className="w-6 sm:w-8 h-6 sm:h-8 text-amedia-blue mb-3 sm:mb-4" strokeWidth={1.5} />
                  <h4 className="text-lg sm:text-xl font-medium mb-2">{t('about.features.design')}</h4>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{t('about.features.design_desc')}</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
      <ScrollDownArrow containerRef={containerRef} />
    </section>
  );
}
