"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HeroCanvas } from "./hero-canvas";
import Image from "next/image";
import { useTranslation } from "@/context/language-context";

const SERVICES = ["Performance", "Branding", "Creative", "Strategy"];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useGSAP(() => {
    gsap.from(".service-chip", {
      opacity: 0,
      scale: 0,
      y: 50,
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "80% bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full">
      <HeroCanvas framesCount={17} imagesPath="/hero-sequence" />
      
      {/* Text Overlays */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center text-white mix-blend-difference">
          <div className="text-center space-y-8 flex flex-col items-center">
            <div className="relative h-48 w-48 bg-white shadow-2xl rounded-full p-10 flex items-center justify-center">
              <Image
                src="/logo-v3.png"
                alt="amediå"
                width={140}
                height={140}
                className="object-contain"
                priority
              />
            </div>
            <p className="text-xl md:text-2xl font-light tracking-widest uppercase opacity-80">
              {t('hero.subtitle')}
            </p>
          </div>
          
          {/* Floating Chips Stage 04 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
            {SERVICES.map((service, i) => (
              <div
                key={service}
                className={`service-chip absolute px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs uppercase tracking-widest font-medium transition-colors hover:bg-amedia-blue hover:border-amedia-blue cursor-pointer`}
                style={{
                  transform: `rotate(${i * 90}deg) translateY(-250px) rotate(-${i * 90}deg)`,
                }}
              >
                {service}
              </div>
            ))}
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50">
            <span className="text-xs uppercase tracking-[0.3em]">{t('hero.scroll')}</span>
            <div className="w-[1px] h-12 bg-white animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
