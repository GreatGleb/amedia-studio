"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslation } from "@/context/language-context";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangHovered, setIsLangHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();
  const lenis = useLenis();

  const languages = ['no', 'ru', 'en'] as const;
  const currentIndex = languages.indexOf(language as any) >= 0 ? languages.indexOf(language as any) : 0;
  const nextIndex = (currentIndex + 1) % languages.length;

  const handleScrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.5 });
    } else {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  }, [lenis]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navLinks = [
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#portfolio', label: t('nav.portfolio') },
    { href: '#team', label: t('nav.team') },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-amedia-blue shadow-lg border-b border-white/10 ${
          isScrolled ? "py-3 md:py-4" : "py-4 md:py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="relative h-12 sm:h-14 w-36 sm:w-40 bg-white/95 backdrop-blur-sm shadow-xl rounded-full px-4 sm:px-5 py-2 flex items-center justify-center border border-white/20 hover:scale-105 transition-transform duration-300">
            <Image
              src="/logo-v3.png"
              alt="amediå"
              width={115}
              height={30}
              className="object-contain"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-12 text-sm uppercase tracking-[0.2em] font-bold text-white/80">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            {/* Desktop CTA */}
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="hidden md:flex items-center justify-center h-[38px] px-5 sm:px-6 bg-white text-amedia-blue text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              {t('hero.cta_primary')}
            </a>

            {/* Language Switcher */}
            <div
              className="relative flex items-center w-[114px] h-[38px] bg-white/10 backdrop-blur-sm rounded-full p-[3px] cursor-pointer border border-white/20 transition-colors hover:bg-white/15"
              onClick={() => setLanguage(languages[nextIndex])}
              onMouseEnter={() => setIsLangHovered(true)}
              onMouseLeave={() => setIsLangHovered(false)}
            >
              {/* Hover indicator for the NEXT language path */}
              <motion.div
                className="absolute h-[32px] bg-white/20 rounded-full"
                initial={false}
                animate={{
                  opacity: isLangHovered ? 1 : 0,
                  x: isLangHovered ? Math.min(currentIndex, nextIndex) * 38 : currentIndex * 38,
                  width: isLangHovered ? Math.abs(currentIndex - nextIndex) * 38 + 32 : 32
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />

              {/* The sliding active background */}
              <motion.div
                className="absolute w-[32px] h-[32px] bg-white rounded-full shadow-md"
                animate={{
                  x: currentIndex * 38
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />

              {/* Text labels */}
              <div className="relative flex items-center w-full z-10 text-[11px] font-bold tracking-[0.1em]">
                {languages.map((lang, idx) => (
                  <div
                    key={lang}
                    className={`w-[38px] flex justify-center transition-colors duration-300 ${
                      currentIndex === idx ? 'text-[#001838]' : 'text-white'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-amedia-blue z-50 md:hidden shadow-2xl border-l border-white/10"
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-8">
                {/* Close button inside panel */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="text-2xl font-bold text-white/80 hover:text-white transition-colors py-4 border-b border-white/10"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <motion.a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, '#contact')}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-auto flex items-center justify-center h-[56px] bg-white text-amedia-blue text-sm font-bold uppercase tracking-widest rounded-full shadow-md hover:scale-105 transition-all duration-300"
                >
                  {t('hero.cta_primary')}
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
