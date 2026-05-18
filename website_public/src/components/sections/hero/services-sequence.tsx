"use client";

import { useHeroSequence } from "./use-hero-sequence";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/context/language-context";

export function ServicesSequence() {
  const { t } = useTranslation();
  
  // Инициализируем хук для анимации секвенции
  const { canvasRef, containerRef } = useHeroSequence({
    framesCount: 17,
    imagesPath: "/hero-sequence",
  });

  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Безопасно получаем массив услуг из локализации
  const servicesData = t('services.items');
  const services = Array.isArray(servicesData) ? servicesData : [];

  useGSAP(() => {
    if (services.length === 0) return;

    // Анимация подсветки текста при скролле
    textRefs.current.forEach((ref, i) => {
      if (!ref) return;

      gsap.fromTo(ref, 
        { opacity: 0.3, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ref,
            start: "top 70%",
            end: "top 30%",
            scrub: true,
          }
        }
      );
    });
  }, { scope: containerRef, dependencies: [services] });

  return (
    <section ref={containerRef} className="relative w-full bg-black text-white">
      <div className="flex flex-col md:flex-row">
        
        {/* Правая часть: Липкий Canvas (теперь первая в DOM для мобилок) */}
        <div className="w-full md:w-1/2 h-[40vh] md:h-screen sticky top-0 overflow-hidden bg-zinc-900 order-first md:order-last">
          <canvas ref={canvasRef} className="h-full w-full object-cover" />
        </div>

        {/* Левая часть: Список услуг */}
        <div className="w-full md:w-1/2 px-6 md:px-12 py-24 space-y-[40vh]">
          <div className="space-y-4">
            <span className="text-amedia-blue font-mono text-sm tracking-widest uppercase">
              {t('services.subtitle') || "Our Services"}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              {t('services.title') || "What We Do"}
            </h2>
            <p className="text-white/60 max-w-md">
              {t('services.desc') || "We help brands grow by combining strategy, creativity, and technology."}
            </p>
          </div>

          {services.map((service: any, i: number) => (
            <div
              key={i}
              ref={(el) => { textRefs.current[i] = el; }}
              className="service-item cursor-pointer origin-left transition-all duration-300 min-h-[30vh] flex flex-col justify-center"
            >
              <div className="text-sm font-mono text-amedia-blue mb-2">0{i + 1}</div>
              <h3 className="text-3xl md:text-5xl font-light hover:text-amedia-blue transition-colors">
                {service.title}
              </h3>
              <p className="mt-4 text-sm text-white/50 max-w-md">
                {service.desc}
              </p>
            </div>
          ))}
          
          {/* Пустой блок в конце, чтобы последний элемент успел подсветиться и мы доскроллили до конца */}
          <div className="h-[20vh]" />
        </div>

      </div>
    </section>
  );
}
