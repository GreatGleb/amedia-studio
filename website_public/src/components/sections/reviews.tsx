"use client";

import { useRef } from "react";
import { useTranslation } from "@/context/language-context";
import { Quote } from "lucide-react";
import { ScrollDownArrow } from "@/components/ui/scroll-down-arrow";

type ReviewItem = {
  id: number;
  client: string;
  company: string;
  text: string;
  className: string;
  largeText?: boolean;
};

export function Reviews() {
  const containerRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const reviewsData = t("reviews.items") as unknown as ReviewItem[];
  const REVIEWS: ReviewItem[] = Array.isArray(reviewsData)
    ? reviewsData.map((item, index) => ({
        ...item,
        id: index + 1,
        className: [
          "md:col-span-2 md:row-span-2 bg-white/5 text-white border border-white/10 backdrop-blur-sm",
          "bg-amedia-blue text-white shadow-lg",
          "bg-transparent border border-white/20 text-white",
          "md:col-span-2 bg-white text-amedia-green shadow-xl",
        ][index],
        largeText: index === 0,
      }))
    : [];

  return (
    <section ref={containerRef} className="relative py-16 sm:py-24 md:py-32 bg-amedia-green flex items-center justify-center">
      <div className="max-w-7xl w-full px-4 sm:px-6">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 text-white tracking-tight">
            {t('reviews.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 font-light max-w-2xl">
            {t('reviews.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
          {REVIEWS.map((review) => {
            const isWhiteCard = review.className.includes("bg-white ");
            return (
              <div
                key={review.id}
                className={`p-5 sm:p-8 md:p-10 flex flex-col justify-between rounded-2xl sm:rounded-3xl transition-transform hover:-translate-y-1 duration-300 ${review.className}`}
              >
                <div className="mb-4 sm:mb-8">
                  <Quote
                    className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 opacity-20 mb-3 sm:mb-4 md:mb-6 ${isWhiteCard ? "text-amedia-green" : "text-white"}`}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                  <p className={`font-light leading-relaxed ${review.largeText ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl' : 'text-sm sm:text-base md:text-lg lg:text-xl'}`}>
                    {review.text}
                  </p>
                </div>
                
                <div className="mt-auto">
                  <div className={`font-medium text-sm sm:text-base ${isWhiteCard ? "text-amedia-green" : "text-white"}`}>
                    {review.client}
                  </div>
                  <div className={`text-xs sm:text-sm mt-1 ${isWhiteCard ? "text-amedia-green/70" : "text-white/60"}`}>
                    {review.company}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ScrollDownArrow containerRef={containerRef} />
    </section>
  );
}
