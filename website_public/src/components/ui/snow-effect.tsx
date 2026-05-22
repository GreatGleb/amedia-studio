"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function SnowEffect({ color = "bg-white" }: { color?: string }) {
  const [flakes, setFlakes] = useState<Array<{ id: number, left: number, animationDuration: number, delay: number, size: number, opacity: number }>>([]);

  useEffect(() => {
    // Генерируем снежинки только на клиенте
    const newFlakes = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Стартовая позиция по X (%)
      animationDuration: Math.random() * 3 + 2.5, // 2.5 - 5.5 сек на падение
      delay: Math.random() * 3, // Разная задержка для естественности
      size: Math.random() * 3 + 2, // Размер от 2 до 5px
      opacity: Math.random() * 0.5 + 0.3, // Прозрачность от 0.3 до 0.8
    }));
    setFlakes(newFlakes);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, transparent 40%, black 80%, black 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 40%, black 80%, black 100%)"
      }}
    >
      {flakes.map((flake) => (
        <motion.div
          key={flake.id}
          className={`absolute rounded-full ${color}`}
          style={{
            width: flake.size,
            height: flake.size,
            left: `${flake.left}%`,
            top: -20, // Начинают падать чуть выше карточки
            opacity: flake.opacity
          }}
          animate={{
            // Падают вниз и смещаются влево (по диагонали)
            y: ["0px", "800px"],
            x: ["0px", "-100px"] 
          }}
          transition={{
            duration: flake.animationDuration,
            repeat: Infinity,
            delay: flake.delay,
            ease: "linear"
          }}
        />
      ))}
    </motion.div>
  );
}
