import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface PremiumCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

/**
 * Пример премиальной карточки с использованием React 19, Tailwind CSS 4 и Framer Motion/GSAP.
 * Демонстрирует эффект глассморфизма и микро-анимации.
 */
export const PremiumCard: React.FC<PremiumCardProps> = ({ title, description, icon }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Пример использования GSAP для hover-эффекта (хотя Framer Motion тут тоже справится)
  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-shadow hover:shadow-2xl hover:shadow-primary/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Свечение на фоне (Tailwind 4 фичи могут быть использованы здесь) */}
      <div className="absolute -inset-px bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity hover:opacity-100" />

      <div className="relative z-10 flex flex-col gap-4">
        {icon && (
          <div className="text-primary text-3xl">
            {icon}
          </div>
        )}
        
        <h3 className="text-xl font-semibold text-white">
          {title}
        </h3>
        
        <p className="text-sm text-gray-400">
          {description}
        </p>
        
        <button className="mt-2 self-start text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          Подробнее →
        </button>
      </div>
    </motion.div>
  );
};
