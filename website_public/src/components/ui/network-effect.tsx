"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function NetworkEffect({ color = "255, 255, 255" }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;

    const resize = () => {
      // Ensure canvas internal resolution matches CSS display size
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse listeners for interactivity
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Node definition
    const numNodes = 60; // Увеличил количество узлов для плотности
    const maxDistance = 140; // Оптимальная дистанция связи
    const mouseInteractionRadius = 180; // Радиус взаимодействия с мышью

    const nodes = Array.from({ length: numNodes }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6, // Очень плавное движение
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 1.5 + 0.5, // Более изящные точки
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Update positions
      for (let i = 0; i < numNodes; i++) {
        const node = nodes[i];
        
        // Базовое движение
        node.x += node.vx;
        node.y += node.vy;

        // Взаимодействие с мышью (отталкивание и связи)
        const dxMouse = node.x - mouseRef.current.x;
        const dyMouse = node.y - mouseRef.current.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < mouseInteractionRadius) {
          // Легкое отталкивание от курсора (эффект магнита)
          const force = (mouseInteractionRadius - distMouse) / mouseInteractionRadius;
          node.x += (dxMouse / distMouse) * force * 1.5;
          node.y += (dyMouse / distMouse) * force * 1.5;

          // Отрисовка линии к курсору (курсор становится узлом сети!)
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(${color}, ${force * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Мягкий отскок от границ
        if (node.x <= 0 || node.x >= width) node.vx *= -1;
        if (node.y <= 0 || node.y >= height) node.vy *= -1;
      }

      // Draw connections (edges)
      for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            // Плавное затухание линии в зависимости от расстояния
            const opacity = Math.pow(1 - dist / maxDistance, 1.5); // Квадратичное затухание выглядит красивее
            ctx.strokeStyle = `rgba(${color}, ${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes (vertices)
      for (let i = 0; i < numNodes; i++) {
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, nodes[i].radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.8)`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-0 overflow-hidden" // Убрал pointer-events-none, чтобы ловить события мыши
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, transparent 40%, black 80%, black 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 40%, black 80%, black 100%)"
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </motion.div>
  );
}
