"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useTranslation } from "@/context/language-context";
import { ScrollDownArrow } from "@/components/ui/scroll-down-arrow";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "Nordic Elegance",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Digital Standard",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Focus Strategy",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Visionary Tech",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
];

export function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const lenis = useLenis();

  useGSAP(() => {
    if (!sectionRef.current || !triggerRef.current) return;

    const scrollWidth = sectionRef.current.offsetWidth - window.innerWidth;

    const pin = gsap.to(sectionRef.current, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      pin.kill();
    };
  }, { scope: triggerRef });

  const handleArrowClick = () => {
    if (!triggerRef.current || !lenis || !sectionRef.current) return;
    
    const sectionStart = triggerRef.current.offsetTop;
    const scrollWidth = sectionRef.current.offsetWidth - window.innerWidth;
    const currentScroll = window.scrollY;
    
    // If we are before the pinned section, scroll to the start of it
    if (currentScroll < sectionStart - 10) {
      lenis.scrollTo(sectionStart, { duration: 1.2 });
      return;
    }
    
    // If we are at or inside the pinned section, advance by one screen width (one slide)
    const nextPos = currentScroll + window.innerWidth;
    
    // If advancing would take us past the end of the pinned section, scroll to the next actual section
    if (nextPos >= sectionStart + scrollWidth) {
      const nextElement = document.getElementById('contact');
      if (nextElement) {
        lenis.scrollTo(nextElement, { duration: 1.2 });
      } else {
        // Fallback to absolute bottom
        lenis.scrollTo(document.body.scrollHeight, { duration: 1.2 });
      }
    } else {
      // Just advance one slide
      lenis.scrollTo(nextPos, { duration: 1.2 });
    }
  };

  return (
    <section ref={triggerRef} className="relative overflow-hidden z-20 bg-amedia-green">
      <div ref={sectionRef} className="flex h-screen w-[400vw]">
        {/* Intro Slide */}
        <div className="h-full w-screen flex flex-col items-center justify-center text-white px-12">
          <div className="max-w-4xl space-y-6">
            <span className="text-amedia-blue font-mono text-sm tracking-widest uppercase">
              {t('labels.cases')}
            </span>
            <h2 className="text-6xl md:text-8xl font-light tracking-tight whitespace-pre-line">
              {t('portfolio.title')}
            </h2>
            <p className="text-xl opacity-60">{t('portfolio.subtitle')}</p>
          </div>
        </div>

        {/* Project Slides */}
        {PROJECTS.map((project, index) => {
          const localizedProjects = t('portfolio.projects') as unknown as Array<{ title: string; category: string }>;
          const localized = localizedProjects?.[index];
          
          return (
            <div key={project.id} className="h-full w-screen flex items-center justify-center p-12">
              <div className="relative group w-full max-w-5xl aspect-video overflow-hidden rounded-2xl bg-white/5">
                <Image
                  src={project.image}
                  alt={localized?.title || project.title}
                  fill
                  className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amedia-green via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-12 left-12 text-white space-y-2">
                  <span className="text-sm font-mono text-amedia-blue uppercase tracking-widest">
                    {localized?.category || project.category}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-light tracking-tight">
                    {localized?.title || project.title}
                  </h3>
                </div>

                <div className="absolute top-12 right-12">
                  <button className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-amedia-blue hover:border-amedia-blue transition-all group/btn">
                    <svg className="w-6 h-6 text-white group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ScrollDownArrow onCustomClick={handleArrowClick} className="text-white/50 hover:text-white" />
    </section>
  );
}
