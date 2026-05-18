"use client";

import { useHeroSequence } from "./use-hero-sequence";

interface HeroCanvasProps {
  framesCount: number;
  imagesPath: string;
}

export function HeroCanvas({ framesCount, imagesPath }: HeroCanvasProps) {
  const { canvasRef, containerRef } = useHeroSequence({
    framesCount,
    imagesPath,
  });

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas ref={canvasRef} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
