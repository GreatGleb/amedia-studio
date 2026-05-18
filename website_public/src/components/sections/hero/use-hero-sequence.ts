"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface UseHeroSequenceProps {
  framesCount: number;
  imagesPath: string;
}

export function useHeroSequence({ framesCount, imagesPath }: UseHeroSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const frameObject = useRef({ frame: 0 });

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= framesCount; i++) {
      const img = new Image();
      // Expecting files like frame_0001.jpeg
      const frameIndex = i.toString().padStart(4, "0");
      img.src = `${imagesPath}/frame_${frameIndex}.jpeg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === framesCount) {
          setImagesLoaded(true);
        }
      };
      // Handle error by drawing placeholder if needed
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === framesCount) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, [framesCount, imagesPath]);

  useGSAP(() => {
    // Оптимизация: не инициализируем анимацию, пока не загружены картинки
    if (!imagesLoaded) return;
    
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas size
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    const render = () => {
      const frame = Math.floor(frameObject.current.frame);
      const img = imagesRef.current[frame];

      context.clearRect(0, 0, canvas.width, canvas.height);

      if (img && img.complete && img.naturalWidth > 0) {
        // 1. Draw Blurred Background
        const bgScale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const bgX = (canvas.width / 2) - (img.width / 2) * bgScale;
        const bgY = (canvas.height / 2) - (img.height / 2) * bgScale;
        
        context.save();
        context.filter = "blur(30px) brightness(0.5)";
        context.drawImage(img, bgX, bgY, img.width * bgScale, img.height * bgScale);
        context.restore();

        // 2. Draw Main Image (Fit height)
        const scale = canvas.height / img.height;
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = 0; // Top aligned
        
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
      } else {
        // Placeholder drawing if images are missing
        drawPlaceholder(context, canvas, frame);
      }
    };

    const drawPlaceholder = (
      ctx: CanvasRenderingContext2D,
      cvs: HTMLCanvasElement,
      frame: number
    ) => {
      const centerX = cvs.width / 2;
      const centerY = cvs.height / 2;
      const baseRadius = Math.min(cvs.width, cvs.height) * 0.1;
      
      // Stage 01-02: Zoom from macro (optical glass)
      const zoomScale = 1 + (frame / framesCount) * 10;
      const rotation = (frame / framesCount) * Math.PI * 2;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      
      // Draw something that looks like a camera lens
      ctx.beginPath();
      ctx.arc(0, 0, baseRadius * zoomScale, 0, Math.PI * 2);
      ctx.strokeStyle = "#325EFC";
      ctx.lineWidth = 5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, (baseRadius * 0.8) * zoomScale, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(39, 73, 73, 0.5)";
      ctx.fill();
      
      ctx.restore();

      ctx.fillStyle = "#ffffff";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`Кадр: ${frame + 1} / ${framesCount}`, centerX, cvs.height - 50);
      ctx.fillText("Пожалуйста, загрузите изображения в /public/hero-sequence/", centerX, cvs.height - 80);
    };

    const tl = gsap.to(frameObject.current, {
      frame: framesCount - 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // Smoother follow
        anticipatePin: 1,
      },
      onUpdate: render,
    });

    // Ensure the first frame is rendered
    render();

    window.addEventListener("resize", setSize);
    setSize();

    return () => {
      window.removeEventListener("resize", setSize);
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  }, [imagesLoaded, framesCount]);

  return {
    canvasRef,
    containerRef,
    imagesLoaded,
  };
}
