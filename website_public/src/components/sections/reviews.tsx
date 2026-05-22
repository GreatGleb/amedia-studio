"use client";

import { useTranslation } from "@/context/language-context";

export function Reviews() {

  return (
    <section className="py-24 bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl w-full px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-light mb-8 text-black">
          Отзывы
        </h2>
        <p className="text-xl text-gray-600 font-light">
          Здесь скоро появится полноценный блок с отзывами наших клиентов.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50 grayscale blur-[2px] select-none pointer-events-none">
          {/* Temporary mock reviews */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
              <div className="h-3 bg-gray-100 rounded w-full mx-auto mb-1" />
              <div className="h-3 bg-gray-100 rounded w-5/6 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
