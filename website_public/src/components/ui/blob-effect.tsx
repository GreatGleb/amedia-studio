"use client";

import { motion } from "framer-motion";

export function BlobEffect({ color = "bg-white" }: { color?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-end pr-12"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, transparent 30%, black 70%, black 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 30%, black 70%, black 100%)"
      }}
    >
      {/* Главная капля */}
      <motion.div
        className={`absolute blur-[20px] opacity-50 rounded-full ${color}`}
        style={{
          width: "250px",
          height: "250px",
          right: "0%",
        }}
        animate={{
          scaleX: [1, 1.5, 0.6, 1.3, 1],
          scaleY: [1, 0.7, 1.4, 0.8, 1],
          rotate: [0, 90, 180, 270, 360],
          x: ["0%", "-30%", "20%", "-15%", "0%"],
          y: ["0%", "20%", "-20%", "15%", "0%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Вторая, меньшая капля для сложного смешивания */}
      <motion.div
        className={`absolute blur-[15px] opacity-40 rounded-full ${color}`}
        style={{
          width: "180px",
          height: "180px",
          right: "15%",
          top: "10%"
        }}
        animate={{
          scaleX: [1, 0.7, 1.5, 0.8, 1],
          scaleY: [1, 1.3, 0.7, 1.4, 1],
          rotate: [360, 270, 180, 90, 0],
          x: ["0%", "30%", "-25%", "20%", "0%"],
          y: ["0%", "-30%", "25%", "-15%", "0%"],
        }}
        transition={{
          duration: 10.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
