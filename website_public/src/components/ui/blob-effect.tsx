"use client";

import { motion } from "framer-motion";

export function BlobEffect({ color = "bg-white" }: { color?: string }) {
  return (
    <>
      <style>
        {`
          @keyframes morph {
            0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
            50% { border-radius: 30% 70% 70% 30% / 50% 60% 30% 60%; }
            100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          }
          .organic-blob {
            animation: morph 5s ease-in-out infinite;
          }
        `}
      </style>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-end pr-10"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, transparent 20%, black 80%, black 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 20%, black 80%, black 100%)"
        }}
      >
        <div className="relative w-[300px] h-[300px] flex items-center justify-center">
          {/* Blob 1 - Большой и медленный */}
          <motion.div
            className={`absolute blur-[25px] opacity-40 organic-blob ${color}`}
            style={{ width: "280px", height: "280px" }}
            animate={{ 
              rotate: 360,
              x: [0, 45, -30, 0],
              y: [0, -45, 30, 0]
            }}
            transition={{ 
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              x: { duration: 9, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          {/* Blob 2 - Средний, вращается в обратную сторону */}
          <motion.div
            className={`absolute blur-[20px] opacity-50 organic-blob ${color}`}
            style={{ width: "220px", height: "220px", animationDelay: "-1.5s" }}
            animate={{ 
              rotate: -360,
              x: [0, -60, 45, 0],
              y: [0, 60, -45, 0]
            }}
            transition={{ 
              rotate: { duration: 9, repeat: Infinity, ease: "linear" },
              x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          {/* Blob 3 - Ядро, смещенное от центра для создания сложных пересечений */}
          <motion.div
            className={`absolute blur-[15px] opacity-60 organic-blob ${color}`}
            style={{ width: "160px", height: "160px", animationDelay: "-3s" }}
            animate={{ 
              rotate: 360,
              x: [0, 90, -60, 0],
              y: [0, -90, 60, 0]
            }}
            transition={{ 
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              x: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </div>
      </motion.div>
    </>
  );
}
