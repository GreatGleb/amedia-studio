"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function GanttEffect({ color = "bg-white" }: { color?: string }) {
  const [tasks, setTasks] = useState<Array<{ id: number, width: number, top: number, duration: number, delay: number, opacity: number, progress: number }>>([]);

  useEffect(() => {
    // 6 "дорожек" (lanes) для имитации структуры таск-трекера
    const lanes = [15, 30, 45, 60, 75, 90];

    const newTasks = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      width: Math.random() * 120 + 80, // Ширина задачи
      top: lanes[Math.floor(Math.random() * lanes.length)], // Привязка к конкретной строке!
      duration: Math.random() * 15 + 25, // Медленный, строгий скролл таймлайна
      delay: -(Math.random() * 40), 
      opacity: Math.random() * 0.4 + 0.4, // Плотный цвет
      progress: Math.random() * 70 + 10, // Имитация заполненности задачи (%)
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
      {/* Вертикальная линия "сегодняшнего дня" на диаграмме Ганта */}
      <div className="absolute top-0 bottom-0 right-[30%] w-[1px] bg-amedia-green/20 border-r border-dashed border-amedia-green/30" />

      {tasks.map((task) => (
        <motion.div
          key={task.id}
          className={`absolute rounded-sm overflow-hidden flex items-center shadow-sm ${color}`}
          style={{
            height: "14px", // Похоже на реальный блок задачи
            width: `${task.width}px`,
            top: `calc(${task.top}% - 7px)`,
            right: "-300px", 
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
          {/* Индикатор "прогресса" внутри задачи */}
          <div 
            className="h-full bg-black/20" 
            style={{ width: `${task.progress}%` }} 
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
