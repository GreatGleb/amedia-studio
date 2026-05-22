"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function GanttEffect({ color = "bg-white" }: { color?: string }) {
  const [tasks, setTasks] = useState<Array<{ id: number, width: number, top: number, duration: number, delay: number, opacity: number, progress: number }>>([]);

  useEffect(() => {
    // 8 тонких дорожек для более изящной сетки
    const lanes = [10, 20, 32, 45, 55, 68, 80, 90];

    const newTasks = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      width: Math.random() * 100 + 60, // Более аккуратная ширина
      top: lanes[Math.floor(Math.random() * lanes.length)],
      duration: Math.random() * 10 + 20, // Оптимальная скорость
      delay: -(Math.random() * 30), 
      opacity: Math.random() * 0.2 + 0.15, // Мягкая, премиальная полупрозрачность
      progress: Math.random() * 60 + 20,
    }));
    setTasks(newTasks);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, transparent 20%, black 80%, black 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 20%, black 80%, black 100%)"
      }}
    >
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          className={`absolute rounded-sm overflow-hidden flex items-center ${color}`}
          style={{
            height: "6px", // Тонкие, элегантные линии
            width: `${task.width}px`,
            top: `calc(${task.top}% - 3px)`,
            right: "-200px", 
            opacity: task.opacity,
          }}
          animate={{
            x: ["0px", "-1600px"], 
          }}
          transition={{
            duration: task.duration,
            repeat: Infinity,
            delay: task.delay,
            ease: "linear",
          }}
        >
          {/* Очень деликатный прогресс */}
          <div 
            className="h-full bg-black/10" 
            style={{ width: `${task.progress}%` }} 
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
