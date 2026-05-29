"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function OrbitEffect({ color = "255, 255, 255" }: { color?: string }) {
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
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    // Center of the orbit system
    const cx = width * 0.75;
    const cy = height * 0.5;

    // Orbital rings
    const rings = [
      { radius: 60, speed: 0.008, particles: 6, size: 2.5 },
      { radius: 100, speed: -0.005, particles: 10, size: 2 },
      { radius: 145, speed: 0.003, particles: 14, size: 1.5 },
      { radius: 190, speed: -0.002, particles: 18, size: 1.2 },
    ];

    // Generate particles with initial angles
    const particles = rings.flatMap((ring) =>
      Array.from({ length: ring.particles }).map((_, i) => ({
        angle: (Math.PI * 2 * i) / ring.particles + Math.random() * 0.1,
        radius: ring.radius,
        speed: ring.speed,
        size: ring.size,
        opacity: Math.random() * 0.4 + 0.3,
        trail: [] as { x: number; y: number; opacity: number }[],
      }))
    );

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time++;

      // Draw faint orbital rings
      rings.forEach((ring) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, ring.radius, ring.radius * 0.6, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${color}, 0.08)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Update and draw particles
      particles.forEach((p) => {
        p.angle += p.speed;

        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * 0.6; // Flatten vertically for perspective

        // Draw trail
        p.trail.push({ x, y, opacity: p.opacity * 0.3 });
        if (p.trail.length > 8) p.trail.shift();

        for (let i = 0; i < p.trail.length; i++) {
          const t = p.trail[i];
          const fade = (i / p.trail.length) * t.opacity;
          ctx.beginPath();
          ctx.arc(t.x, t.y, p.size * (i / p.trail.length) * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${fade})`;
          ctx.fill();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
        ctx.fill();

        // Glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, p.size * 4);
        gradient.addColorStop(0, `rgba(${color}, ${p.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        ctx.beginPath();
        ctx.arc(x, y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Center glow
      const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
      centerGlow.addColorStop(0, `rgba(${color}, 0.15)`);
      centerGlow.addColorStop(1, `rgba(${color}, 0)`);
      ctx.beginPath();
      ctx.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx.fillStyle = centerGlow;
      ctx.fill();

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
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </motion.div>
  );
}
