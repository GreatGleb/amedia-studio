"use client";

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

interface ScrollDownArrowProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  onCustomClick?: () => void;
}

export function ScrollDownArrow({ containerRef, className = "", onCustomClick }: ScrollDownArrowProps) {
  const lenis = useLenis();

  const scrollToNext = () => {
    if (onCustomClick) {
      onCustomClick();
      return;
    }

    const nextElement = containerRef?.current?.nextElementSibling as HTMLElement;
    if (nextElement && lenis) {
      lenis.scrollTo(nextElement, { duration: 1.2 });
    } else if (nextElement) {
      window.scrollTo({
        top: nextElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.button
      onClick={scrollToNext}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 p-2 cursor-pointer transition-colors ${
        className ? className : "text-white/50 hover:text-white"
      }`}
      aria-label="Scroll to next section"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.div>
    </motion.button>
  );
}
