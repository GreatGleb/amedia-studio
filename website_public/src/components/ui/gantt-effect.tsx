"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function GanttEffect({ color = "bg-white" }: { color?: string }) {
  const [tasks, setTasks] = useState<Array<{ id: number, width: number, top: number, duration: number, delay: number, opacity: number, progress: number }>>([]);

  useEffect(() => {
    // 10 дорожек для более плотной сетки
    const lanes = [8, 18, 28, 38, 48, 58, 68, 78, 88, 95];

    const newTasks = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      width: Math.random() * 120 + 80, // Чуть шире полоски
      top: lanes[Math.floor(Math.random() * lanes.length)],
      duration: Math.random() * 12 + 18, // Разная скорость
      delay: -(Math.random() * 25),
      opacity: Math.random() * 0.3 + 0.3, // Ярче — 0.3-0.6
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
    >
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          className={`absolute rounded-sm overflow-hidden flex items-center ${color}`}
          style={{
            height: "8px", // Чуть толще линии
            width: `${task.width}px`,
            top: `calc(${task.top}% - 4px)`,
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
          {/* Прогресс-бар */}
          <div
            className="h-full bg-black/20"
            style={{ width: `${task.progress}%` }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
