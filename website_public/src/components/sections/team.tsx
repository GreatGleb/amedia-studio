"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/language-context";
import Image from "next/image";
import { SnowEffect } from "@/components/ui/snow-effect";
import { NetworkEffect } from "@/components/ui/network-effect";
import { OrbitEffect } from "@/components/ui/orbit-effect";
import { GanttEffect } from "@/components/ui/gantt-effect";
import { ScrollDownArrow } from "@/components/ui/scroll-down-arrow";

const getTeamMembers = (t: any) => [
  {
    id: "member-1",
    role: t('team.roles.techLead') || "Technical Lead",
    name: "Gleb Sugakk",
    description: t('team.desc.techLead') || "Техническая реализация и архитектура проектов.",
    bgClass: "bg-amedia-green text-white",
    effect: "network",
    image: "/TechLead.png",
    imageOffset: true,
  },
  {
    id: "member-2",
    role: t('team.roles.generalDirector') || "CEO",
    name: "Nazar Berg",
    description: t('team.desc.generalDirector') || "Стратегическое управление и развитие агентства.",
    bgClass: "bg-amedia-blue text-white",
    effect: "orbit",
    image: "/PR.jpg",
    imageOffset: true,
  },
  {
    id: "member-3",
    role: t('team.roles.projectManager') || "Project Manager",
    name: "Lenor Hermansen",
    description: t('team.desc.projectManager') || "Координация процессов и управление проектами.",
    bgClass: "bg-gray-900 text-white", 
    effect: "gantt",
    image: "/Project Manager.jpg",
    imageOffset: true,
  }
];

export function Team() {
  const containerRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="team" ref={containerRef} className="relative py-16 sm:py-24 bg-white flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-[1400px] w-full px-4 sm:px-6 flex flex-col h-auto md:min-h-[600px]">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-3 sm:mb-4 text-black">
            {t('nav.team') || "Команда"}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 font-light max-w-2xl">
            Лидеры, определяющие видение наших проектов.
          </p>
        </div>

        <div className="flex flex-col md:flex-row w-full flex-1 gap-4 md:h-auto md:items-stretch">
          {getTeamMembers(t).map((member, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={member.id}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                layout
                initial={{ borderRadius: 24 }}
                animate={{ 
                  flex: 1,
                }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className={`relative overflow-hidden cursor-pointer p-5 sm:p-8 flex flex-col min-h-[200px] ${member.bgClass}`}
                style={{ borderRadius: 24 }}
              >
                {/* Background Image (Blurred Base) */}
                {member.image && (
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.role}
                      fill
                      className="object-cover object-top blur-2xl scale-125 opacity-70"
                    />
                  </div>
                )}

                {/* Brand gradient overlay — blue (top-left) to green (bottom-right) at 45° — above blur bg, below everything else */}
                <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-br from-[#325EFC]/60 to-[#274949]/60" />
                
                {/* Foreground Image — fixed height, centered horizontally */}
                {member.image && (
                  <div className="relative z-[2] h-[180px] sm:h-[200px] md:h-[300px] shrink-0 flex items-end justify-center overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.role}
                      className="h-full w-auto object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.15)]"
                    />
                  </div>
                )}

                {/* Global Gradient overlay to ensure text readability */}
                <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Visual Effects — only show on hover */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen">
                  {(member as any).effect === "snow" && isHovered && (
                    <SnowEffect color="bg-white" />
                  )}
                  {(member as any).effect === "network" && isHovered && (
                    <NetworkEffect color="255, 255, 255" />
                  )}
                  {(member as any).effect === "orbit" && isHovered && (
                    <OrbitEffect color="255, 255, 255" />
                  )}
                  {(member as any).effect === "gantt" && isHovered && (
                    <GanttEffect color="bg-white" />
                  )}
                </div>

                {/* Abstract visual element in the background */}
                <motion.div 
                  className="absolute right-0 bottom-0 w-64 h-64 bg-white opacity-5 blur-3xl rounded-full pointer-events-none z-0"
                  animate={{ 
                    scale: isHovered ? 1.5 : 1,
                    x: isHovered ? "-10%" : "20%",
                    y: isHovered ? "-10%" : "20%"
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />

                {/* Content — always visible */}
                <div className="relative z-10 flex flex-col justify-end min-h-[100px] sm:min-h-[120px] md:min-h-[160px]">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl sm:text-2xl md:text-4xl font-medium tracking-tight whitespace-nowrap">
                      {member.role}
                    </h3>
                  </div>
                  
                  <div className="flex flex-col">
                    <h4 className="text-lg sm:text-xl md:text-2xl font-light whitespace-nowrap">
                      {member.name}
                    </h4>
                    <p className="opacity-80 font-light text-sm sm:text-base md:text-lg max-w-sm pt-2 sm:pt-4">
                      {member.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <ScrollDownArrow containerRef={containerRef} className="text-zinc-900/40 hover:text-zinc-900" />
    </section>
  );
}
