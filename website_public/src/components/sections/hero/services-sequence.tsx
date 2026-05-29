"use client";

import { useHeroSequence } from "./use-hero-sequence";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/context/language-context";
import { ScrollDownArrow } from "@/components/ui/scroll-down-arrow";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  title: string;
  desc: string;
}

export function ServicesSequence() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  const { canvasRef, containerRef } = useHeroSequence({
    framesCount: 17,
    imagesPath: "/hero-sequence",
  });

  // Refs
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const chipsWrapRef = useRef<HTMLDivElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descRefs = useRef<(HTMLDivElement | null)[]>([]);

  const servicesData = t("services.items");
  const services: ServiceItem[] = Array.isArray(servicesData)
    ? (servicesData as ServiceItem[])
    : [];

  // Track viewport size for responsive GSAP params
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ─── Главная GSAP анимация ─────────────────────────────────────────────────
  useGSAP(
    () => {
      if (!stickyRef.current || !canvasWrapRef.current || !chipsWrapRef.current)
        return;

      const isMobileView = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => `top ${window.innerWidth >= 768 ? 88 : 80}px`,
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Инициализация заголовка (центр)
      if (titleWrapRef.current) {
        gsap.set(titleWrapRef.current, { xPercent: -50 });
      }

      // ── Фаза 1 (0–15%): появление плашек ───────────────────────────────────
      chipRefs.current.forEach((chip, i) => {
        if (!chip) return;
        gsap.set(chip, { autoAlpha: 0, scale: 0.85 });
        tl.to(
          chip,
          { autoAlpha: 1, scale: 1, duration: 0.15, ease: "back.out(1.4)" },
          i * 0.04
        );
      });

      // ── Фаза 2 (15–30%): Canvas → вправо, плашки → влево, заголовок → влево вверх ────
      // На мобильных canvas уходит полностью (ширина 0), на десктопе — до 20%
      const canvasTargetWidth = isMobileView ? "0%" : "20%";
      tl.to(
        canvasWrapRef.current,
        {
          width: canvasTargetWidth,
          right: "0%",
          duration: 0.25,
          ease: "power3.inOut",
        },
        0.18
      );

      // Заголовок уходит влево — на мобильных меньше смещение
      const titleLeft = isMobileView ? "5%" : "10%";
      const titleScale = isMobileView ? 0.65 : 0.8;
      tl.to(
        titleWrapRef.current,
        {
          left: titleLeft,
          xPercent: 0,
          scale: titleScale,
          duration: 0.25,
          ease: "power3.inOut",
        },
        0
      );

      // Анимация цвета заголовка с синего на зеленый
      const titleH2 = titleWrapRef.current?.querySelector("h2");
      if (titleH2) {
        tl.to(
          titleH2,
          {
            color: "#274949",
            duration: 0.25,
            ease: "power3.inOut",
          },
          0
        );
      }

      // ── Фаза 3 (30–100%): по очереди появляются описания ──────────────────
      const descStartAt = 0.32;
      const descStep = 0.17;

      // На мобильных сдвигаем меньше, т.к. контент короче
      const shiftAmount = isMobileView ? "-40vh" : "-80vh";
      tl.to(
        [titleWrapRef.current, chipsWrapRef.current],
        {
          y: shiftAmount,
          duration: 1 - descStartAt,
          ease: "none",
        },
        descStartAt
      );

      descRefs.current.forEach((desc, i) => {
        if (!desc) return;
        gsap.set(desc, { autoAlpha: 0, height: 0, overflow: "hidden" });
        
        // Раскрытие блока (высота)
        tl.to(
          desc,
          {
            autoAlpha: 1,
            height: "auto",
            duration: 0.15,
            ease: "power2.out",
          },
          descStartAt + i * descStep
        );

        // Посимвольное закрашивание текста
        const chars = desc.querySelectorAll(".char");
        if (chars.length > 0) {
          tl.to(
            chars,
            {
              color: "rgba(39, 73, 73, 0.9)",
              duration: 0.05,
              stagger: 0.2 / chars.length,
              ease: "none",
            },
            descStartAt + i * descStep + 0.05
          );
        }
      });
    },
    { scope: containerRef, dependencies: [services, isMobile] }
  );

  // ── Левитация (не зависит от скролла) ────────────────────────────────────
  useGSAP(
    () => {
      chipRefs.current.forEach((chip, i) => {
        if (!chip) return;
        gsap.to(chip, {
          y: "+=14",
          duration: 2.2 + i * 0.3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });
    },
    { scope: containerRef, dependencies: [services] }
  );

  // ── Магнитный ховер (только на десктопе) ────────────────────────────────
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    chipRefs.current.forEach((chip) => {
      if (!chip) return;
      const inner = chip.querySelector<HTMLElement>(".chip-inner");
      if (!inner) return;

      const onMove = (e: MouseEvent) => {
        const rect = inner.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(inner, { x: x * 0.28, y: y * 0.28, duration: 0.35, ease: "power2.out" });
      };
      const onLeave = () => {
        gsap.to(inner, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.35)" });
      };

      inner.addEventListener("mousemove", onMove);
      inner.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        inner.removeEventListener("mousemove", onMove);
        inner.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [services]);

  return (
    /* Высокий контейнер — пространство для скролл-анимации */
    <section
      id="services"
      ref={containerRef}
      className="relative w-full bg-[#EEF4F4]"
      style={{ minHeight: "450vh" }}
    >
      {/* Scroll Down Arrow */}
      <ScrollDownArrow containerRef={containerRef} className="text-[#274949]/40 hover:text-[#274949]" />

      {/* ─── Sticky viewport ─────────────────────────────────────────── */}
      <div
        ref={stickyRef}
        className="sticky top-[80px] md:top-[88px] w-full overflow-hidden bg-[#EEF4F4] h-[calc(100svh-80px)] md:h-[calc(100svh-88px)]"
      >
        {/* Заголовок — внутри sticky, GSAP управляет его ложным скроллом */}
        <div
          ref={titleWrapRef}
          className="absolute z-40 text-left flex flex-col items-start"
          style={{ 
            top: "12vh", 
            left: "50%"
          }}
        >
          <span className="text-[#325EFC] font-mono text-[10px] sm:text-xs md:text-sm tracking-widest uppercase mb-1 sm:mb-2">
            {t("services.title") || "Что мы делаем"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold tracking-tight text-[#325EFC] whitespace-nowrap">
            {t("services.subtitle") || "Наши услуги"}
          </h2>
        </div>
        {/* Canvas — изначально 50% по центру, затем уходит вправо */}
        <div
          ref={canvasWrapRef}
          className="absolute top-0 bottom-0 z-10 overflow-hidden shadow-[-30px_0_80px_rgba(39,73,73,0.15)]"
          style={{ width: "50%", right: "25%" }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* ─── Плашки ───────────────────────────────────────────────── */}
        <div
          ref={chipsWrapRef}
          className="absolute inset-x-0 z-30"
          style={{ top: "28vh" }}
        >
          {/* На мобильных плашки занимают всю ширину */}
          <div className="w-full md:w-[75%] lg:w-[55%] px-4 sm:px-8 md:px-[10%] pb-24 sm:pb-32 md:pb-[20vh] flex flex-col gap-0">
            {services.map((service, i) => (
              <div
                key={i}
                ref={(el) => {
                  chipRefs.current[i] = el;
                }}
                className="flex flex-col"
              >
                {/* Плашка */}
                <div className="chip-inner inline-flex self-start cursor-pointer px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-white border border-transparent shadow-[0_8px_32px_rgba(39,73,73,0.08)] hover:border-[#325EFC]/30 hover:shadow-[0_8px_32px_rgba(50,94,252,0.15)] transition-all duration-300">
                  <span className="font-mono text-[10px] sm:text-[11px] text-[#325EFC] mr-2 sm:mr-3 mt-px select-none">
                    0{i + 1}
                  </span>
                  <span className="text-[#274949] text-sm sm:text-base md:text-xl font-semibold tracking-wide">
                    {service.title}
                  </span>
                </div>

                {/* Описание — раскрывается по скроллу */}
                <div
                  ref={(el) => {
                    descRefs.current[i] = el;
                  }}
                  className="overflow-hidden"
                  style={{ height: 0, opacity: 0, visibility: "hidden" }}
                >
                  <p className="pl-3 sm:pl-4 pt-3 sm:pt-4 pb-6 sm:pb-8 text-xs sm:text-sm md:text-base leading-relaxed max-w-full md:max-w-md border-l border-[#274949]/15 flex flex-wrap gap-x-[0.25em]">
                    {service.desc.split(" ").map((word, wIdx) => (
                      <span key={wIdx} className="inline-block whitespace-nowrap">
                        {word.split("").map((char, cIdx) => (
                          <span key={cIdx} className="char text-[#274949]/30 transition-colors">
                            {char}
                          </span>
                        ))}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Декоративная метка Stage 04 — скрываем на мобильных */}
        <div className="hidden sm:block absolute bottom-8 right-[22%] z-40 text-[#274949]/30 font-mono text-[10px] tracking-[0.3em] uppercase pointer-events-none select-none">
          Stage 04
        </div>
      </div>
    </section>
  );
}
