"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function NetworkEffect({ color = "255, 255, 255" }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Node definition
    const numNodes = 50; // Amount of nodes
    const maxDistance = 150; // Distance to form connections
    const nodes = Array.from({ length: numNodes }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8, // Slow velocity X
      vy: (Math.random() - 0.5) * 0.8, // Slow velocity Y
      radius: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Update positions
      for (let i = 0; i < numNodes; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Soft boundary bounce
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
            // Opacity falls off as nodes get further apart
            const opacity = 1 - dist / maxDistance;
            ctx.strokeStyle = `rgba(${color}, ${opacity * 0.4})`; // Subtle lines
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes (vertices)
      for (let i = 0; i < numNodes; i++) {
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, nodes[i].radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.7)`; // Slightly more opaque dots
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color]);

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
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </motion.div>
  );
}
