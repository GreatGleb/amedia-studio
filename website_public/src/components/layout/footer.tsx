"use client";

import { useTranslation } from "@/context/language-context";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-amedia-green text-white py-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-2xl font-bold tracking-tighter italic">amediå</div>
        <div className="flex gap-8 text-sm uppercase tracking-widest opacity-60">
          <a href="#" className="hover:text-amedia-blue transition-colors">
            {t('footer.privacy') || "Privacy"}
          </a>
          <a href="#" className="hover:text-amedia-blue transition-colors">Instagram</a>
          <a href="#" className="hover:text-amedia-blue transition-colors">LinkedIn</a>
        </div>
        <div className="text-xs opacity-30">
          {t('footer.rights') || "© 2026 amediå agency. All rights reserved."}
        </div>
      </div>
    </footer>
  );
}
