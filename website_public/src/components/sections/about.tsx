"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/context/language-context";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useGSAP(() => {
    if (!textRef.current) return;

    // Reveal text characters or lines on scroll
    gsap.from(textRef.current.querySelectorAll(".char"), {
      opacity: 0.1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  const contentText = t('about.text');
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-amedia-green text-white px-6 py-24"
    >
      <div className="max-w-4xl w-full space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <span className="text-amedia-blue font-mono text-sm tracking-widest uppercase">
            {t('labels.vision')}
          </span>
          <h2 className="text-5xl md:text-7xl font-light tracking-tight leading-tight">
            Focus <br /> to Vision
          </h2>
        </motion.div>

        <div 
          ref={textRef}
          className="text-2xl md:text-4xl font-light leading-relaxed tracking-tight opacity-90"
        >
          {contentText.split(" ").map((word, i) => (
            <span key={i} className="char inline-block mr-3">
              {word}
            </span>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-[1px] w-full bg-white/20 origin-left"
        />
      </div>
    </section>
  );
}
