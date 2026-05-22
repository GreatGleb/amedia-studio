"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/language-context";
import { SnowEffect } from "@/components/ui/snow-effect";
import { NetworkEffect } from "@/components/ui/network-effect";
import { BlobEffect } from "@/components/ui/blob-effect";
import { GanttEffect } from "@/components/ui/gantt-effect";

const teamMembers = [
  {
    id: "member-1",
    role: "Technical Lead",
    name: "Имя Фамилия",
    description: "Техническая реализация и архитектура проектов.",
    bgClass: "bg-amedia-green text-white",
    effect: "network",
  },
  {
    id: "member-2",
    role: "Creative Director",
    name: "Имя Фамилия",
    description: "Разработка концепций и креативный дизайн.",
    bgClass: "bg-amedia-blue text-white",
    effect: "blob",
  },
  {
    id: "member-3",
    role: "Project Manager",
    name: "Имя Фамилия",
    description: "Координация процессов и управление проектами.",
    bgClass: "bg-gray-100 text-amedia-green",
    effect: "gantt",
  }
];

export function Team() {
  const { t } = useTranslation();
  // By default, on desktop we might want none or the first one hovered.
  // We'll leave it null so all are equal until interacted with.
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-[1400px] w-full px-6 flex flex-col h-auto md:h-[600px]">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-black">
            {t('nav.team') || "Команда"}
          </h2>
          <p className="text-xl text-gray-500 font-light max-w-2xl">
            Лидеры, определяющие видение наших проектов.
          </p>
        </div>

        <div className="flex flex-col md:flex-row w-full flex-1 gap-4 h-[800px] md:h-auto">
          {teamMembers.map((member, index) => {
            const isHovered = hoveredIndex === index;
            // On mobile we don't have hover, so we can make it just flex equally or handle taps.
            // But Framer Motion handles tap/hover well enough for basic interactions.
            
            return (
              <motion.div
                key={member.id}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                layout
                initial={{ borderRadius: 24 }}
                animate={{ 
                  flex: isHovered ? 3 : 1,
                }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className={`relative overflow-hidden cursor-pointer p-8 flex flex-col justify-end min-h-[200px] md:min-h-0 ${member.bgClass}`}
                style={{ borderRadius: 24 }}
              >
                {/* Visual Effects */}
                <AnimatePresence>
                  {(member as any).effect === "snow" && isHovered && (
                    <SnowEffect color={member.bgClass.includes("bg-gray-100") ? "bg-amedia-green" : "bg-white"} />
                  )}
                  {(member as any).effect === "network" && isHovered && (
                    <NetworkEffect color={member.bgClass.includes("bg-gray-100") ? "39, 73, 73" : "255, 255, 255"} />
                  )}
                  {(member as any).effect === "blob" && isHovered && (
                    <BlobEffect color={member.bgClass.includes("bg-gray-100") ? "bg-amedia-green" : "bg-white"} />
                  )}
                  {(member as any).effect === "gantt" && isHovered && (
                    <GanttEffect color={member.bgClass.includes("bg-gray-100") ? "bg-amedia-green" : "bg-white"} />
                  )}
                </AnimatePresence>

                {/* Abstract visual element in the background */}
                <motion.div 
                  className="absolute right-0 bottom-0 w-64 h-64 bg-white opacity-5 blur-3xl rounded-full pointer-events-none"
                  animate={{ 
                    scale: isHovered ? 1.5 : 1,
                    x: isHovered ? "-10%" : "20%",
                    y: isHovered ? "-10%" : "20%"
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex items-start justify-between">
                    <motion.h3 
                      layout="position"
                      className="text-2xl md:text-4xl font-medium tracking-tight whitespace-nowrap"
                      animate={{
                        opacity: isHovered || hoveredIndex === null ? 1 : 0.6
                      }}
                    >
                      {member.role}
                    </motion.h3>
                  </div>
                  
                  <motion.div 
                    layout="position"
                    className="mt-auto flex flex-col"
                  >
                    <motion.h4 
                      layout="position"
                      className="text-2xl font-light whitespace-nowrap"
                      animate={{
                        opacity: isHovered || hoveredIndex === null ? 1 : 0.6
                      }}
                    >
                      {member.name}
                    </motion.h4>

                    <AnimatePresence mode="wait">
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="opacity-80 font-light text-base md:text-lg max-w-sm pt-4">
                            {member.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
