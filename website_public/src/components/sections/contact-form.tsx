"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/language-context";

export function ContactForm() {
  const { t } = useTranslation();
  
  const STEPS = [
    {
      id: "service",
      question: t('contact.questions.service'),
      options: [
        t('contact.options.performance'),
        t('contact.options.web'),
        t('contact.options.branding'),
        t('contact.options.partnership')
      ],
    },
    {
      id: "budget",
      question: t('contact.questions.budget'),
      options: [
        t('contact.options.budget_1'),
        t('contact.options.budget_2'),
        t('contact.options.budget_3'),
        t('contact.options.budget_4')
      ],
    },
    {
      id: "goal",
      question: t('contact.questions.goal'),
      options: [
        t('contact.options.goal_1'),
        t('contact.options.goal_2'),
        t('contact.options.goal_3'),
        t('contact.options.goal_4')
      ],
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const handleOptionSelect = (option: string) => {
    const stepId = STEPS[currentStep].id;
    setFormData((prev) => ({ ...prev, [stepId]: option }));
    
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowContactInfo(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="bg-amedia-green py-32 px-6 min-h-screen flex items-center justify-center text-white relative overflow-hidden z-10">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amedia-blue/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-4xl w-full relative z-10">
        {!isSubmitted ? (
          <div className="space-y-16">
            <div className="space-y-6 text-center md:text-left">
              <span className="text-amedia-blue font-mono text-sm tracking-[0.4em] uppercase">
                {t('labels.ready')}
              </span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none italic">
                {t('contact.title')}
              </h2>
              <div className="flex gap-3 max-w-xs mx-auto md:mx-0">
                {[0, 1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className={`h-1 flex-1 rounded-full transition-all duration-700 ${
                      (showContactInfo ? i === 3 : i === currentStep) ? 'bg-amedia-blue w-12' : (i < (showContactInfo ? 4 : currentStep) ? 'bg-white/40' : 'bg-white/10')
                    }`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!showContactInfo ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-10"
                >
                  <h3 className="text-3xl md:text-4xl font-light text-white/90">
                    {STEPS[currentStep].question}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {STEPS[currentStep].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        className="group relative p-8 text-left border border-white/10 rounded-2xl hover:border-amedia-blue transition-all bg-white/5 hover:bg-white/10 overflow-hidden backdrop-blur-sm"
                      >
                        <div className="relative z-10 text-xl font-medium text-white group-hover:text-amedia-blue transition-colors">
                          {option}
                        </div>
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <svg className="w-6 h-6 text-amedia-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-info"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  onSubmit={handleSubmit}
                  className="space-y-10"
                >
                  <h3 className="text-3xl md:text-4xl font-light text-white/90">
                    {t('contact.step_info')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-white/40 ml-4">{t('contact.name')}</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="Amedia"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl focus:border-amedia-blue outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-white/40 ml-4">{t('contact.telegram')}</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="@amedia"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl focus:border-amedia-blue outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="w-full md:w-auto px-12 py-6 bg-amedia-blue text-white rounded-2xl text-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amedia-blue/20"
                  >
                    {t('contact.submit')}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-20 bg-white/5 backdrop-blur-xl rounded-[40px] border border-white/10"
          >
            <div className="w-24 h-24 bg-amedia-blue rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-amedia-blue/40">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-4">
              <h2 className="text-5xl font-bold tracking-tight italic">{t('contact.success')}</h2>
              <p className="text-2xl text-white/60 font-light max-w-xl mx-auto">
                {t('contact.success_text')}
              </p>
            </div>
            <button 
              onClick={() => { setIsSubmitted(false); setCurrentStep(0); setShowContactInfo(false); }}
              className="text-amedia-blue uppercase tracking-[0.3em] text-sm font-bold hover:opacity-70 transition-opacity"
            >
              Back
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
