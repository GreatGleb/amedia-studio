"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/language-context";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ContactForm() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const formWrapperRef = useRef<HTMLDivElement>(null);
  
  const STEPS = [
    {
      id: "service",
      question: t('contact.questions.service'),
      options: [
        t('contact.options.performance'),
        t('contact.options.web'),
        t('contact.options.branding'),
        t('contact.options.production'),
        t('contact.options.consulting'),
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
        t('contact.options.goal_4'),
        t('contact.options.goal_5'),
        t('contact.options.goal_6')
      ],
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [contactFormData, setContactFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showContactInfo, setShowContactInfo] = useState(false);

  useGSAP(() => {
    if (!sectionRef.current || !formWrapperRef.current) return;

    // Premium entrance animation
    gsap.fromTo(formWrapperRef.current, 
      { opacity: 0, y: 100 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: sectionRef });

  const handleOptionSelect = (option: string) => {
    const stepId = STEPS[currentStep].id;
    setFormData((prev) => ({ ...prev, [stepId]: option }));
    
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowContactInfo(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    setIsSubmitting(true);

    try {
      const payload = {
        name: contactFormData.name.trim(),
        phone: contactFormData.phone.trim(),
        projectDetails: contactFormData.message.trim(),
        service: formData.service ?? '',
        budget: formData.budget ?? '',
      };

      const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

      if (!googleScriptUrl) {
        throw new Error('GOOGLE_SCRIPT_URL is not configured');
      }

      // Call Google Apps Script directly (client-side) since API routes
      // are not available in static export (GitHub Pages).
      await fetch(googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // With no-cors mode the response is opaque, so we assume success.
      setIsSubmitted(true);
    } catch (error) {
      console.error('Google Sheets submit error:', error);
      setSubmitError(t('contact.submit_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (showContactInfo) {
      setShowContactInfo(false);
      return;
    }

    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContactFieldChange = (field: keyof typeof contactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const selectedOption = formData[STEPS[currentStep]?.id];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-[#FAFAFA] py-16 sm:py-24 md:py-32 px-4 sm:px-6 min-h-screen flex items-center justify-center relative overflow-hidden z-10"
    >
      {/* Decorative background gradients for premium feel */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amedia-blue/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amedia-green/5 blur-[120px] rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      
      <div ref={formWrapperRef} className="max-w-4xl w-full relative z-10">
        {!isSubmitted ? (
          <div className="space-y-10 sm:space-y-16 bg-white p-6 sm:p-10 md:p-16 rounded-[24px] sm:rounded-[40px] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
            {/* Inner subtle glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amedia-blue/20 to-transparent" />
            
            <div className="space-y-4 sm:space-y-6 text-center md:text-left relative z-10">
              <span className="text-amedia-blue font-mono text-[10px] sm:text-sm tracking-[0.4em] uppercase font-semibold">
                {t('labels.ready')}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-none italic text-gray-900">
                {t('contact.title')}
              </h2>
              <div className="flex gap-2 sm:gap-3 max-w-xs mx-auto md:mx-0 pt-2 sm:pt-4">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1 sm:h-1.5 flex-1 rounded-full transition-all duration-700 ${
                      (showContactInfo ? i === 3 : i === currentStep)
                        ? 'bg-amedia-blue w-8 sm:w-12 shadow-[0_0_10px_rgba(50,94,252,0.4)]'
                        : (i < (showContactInfo ? 4 : currentStep) ? 'bg-amedia-blue/30' : 'bg-gray-100')
                    }`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!showContactInfo ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-10 relative z-10"
                >
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-800">
                    {STEPS[currentStep].question}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
                    {STEPS[currentStep].options.map((option) => {
                      const isSelected = selectedOption === option;

                      return (
                        <button
                          key={option}
                          onClick={() => handleOptionSelect(option)}
                          className={`group relative p-4 sm:p-6 md:p-8 text-left border rounded-xl sm:rounded-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 ${
                            isSelected
                              ? 'border-amedia-blue bg-amedia-blue/5 shadow-[0_8px_30px_rgb(50,94,252,0.12)]'
                              : 'border-gray-100 bg-white hover:border-amedia-blue/40 hover:bg-gray-50/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
                          }`}
                        >
                          <div className={`relative z-10 text-base sm:text-lg md:text-xl font-medium transition-colors duration-300 ${
                            isSelected ? 'text-amedia-blue' : 'text-gray-700 group-hover:text-amedia-blue'
                          }`}>
                            {option}
                          </div>
                          <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 hidden sm:block">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amedia-blue/10 flex items-center justify-center">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amedia-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {currentStep > 0 && (
                    <div className="flex justify-start">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="group relative px-5 sm:px-8 py-3 sm:py-4 border border-gray-300 text-gray-700 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold overflow-hidden hover:border-gray-400 transition-all duration-300 transform hover:-translate-y-0.5 hover:bg-gray-50"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {t('contact.back')}
                        </span>
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.form
                  key="contact-info"
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onSubmit={handleSubmit}
                  className="space-y-10 relative z-10"
                >
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-800">
                    {t('contact.step_info')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                    <div className="space-y-3">
                      <div className="min-h-6">
                        <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 ml-2 line-clamp-2">{t('contact.name')}</label>
                      </div>
                      <input 
                        required 
                        type="text"
                        value={contactFormData.name}
                        onChange={handleContactFieldChange('name')}
                        placeholder={t('contact.name_placeholder')}
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-base sm:text-xl text-gray-900 placeholder:text-gray-300 focus:bg-white focus:border-amedia-blue focus:ring-4 focus:ring-amedia-blue/10 outline-none transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="min-h-6">
                        <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 ml-2 line-clamp-2">{t('contact.telegram')}</label>
                      </div>
                      <input 
                        required 
                        type="tel"
                        value={contactFormData.phone}
                        onChange={handleContactFieldChange('phone')}
                        placeholder={t('contact.phone_placeholder')}
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-base sm:text-xl text-gray-900 placeholder:text-gray-300 focus:bg-white focus:border-amedia-blue focus:ring-4 focus:ring-amedia-blue/10 outline-none transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="min-h-6">
                      <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 ml-2 line-clamp-2">{t('contact.message')}</label>
                    </div>
                    <textarea
                      rows={5}
                      value={contactFormData.message}
                      onChange={handleContactFieldChange('message')}
                      placeholder={t('contact.message_placeholder')}
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-base sm:text-lg text-gray-900 placeholder:text-gray-300 focus:bg-white focus:border-amedia-blue focus:ring-4 focus:ring-amedia-blue/10 outline-none transition-all duration-300 resize-none"
                    />
                  </div>
                  <div className="flex gap-4 flex-col sm:flex-row justify-center md:justify-start">
                    <button 
                      type="button"
                      onClick={handleBack}
                      className="group relative px-6 sm:px-12 py-4 sm:py-6 border border-gray-300 text-gray-700 rounded-xl sm:rounded-2xl text-base sm:text-xl font-bold overflow-hidden hover:border-gray-400 transition-all duration-300 transform hover:-translate-y-1 hover:bg-gray-50"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {t('contact.back')}
                      </span>
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative px-6 sm:px-12 py-4 sm:py-6 bg-amedia-blue text-white rounded-xl sm:rounded-2xl text-base sm:text-xl font-bold overflow-hidden shadow-[0_10px_40px_-10px_rgba(50,94,252,0.6)] hover:shadow-[0_15px_50px_-10px_rgba(50,94,252,0.8)] transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {t('contact.submit')}
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </button>
                  </div>
                  {submitError ? (
                    <p className="text-sm text-red-600 font-medium">
                      {submitError}
                    </p>
                  ) : null}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-6 sm:space-y-10 py-12 sm:py-16 md:py-24 bg-white rounded-[24px] sm:rounded-[40px] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] px-4 sm:px-8 md:px-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-amedia-blue/5 to-transparent pointer-events-none" />
            
            <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-amedia-blue rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 shadow-[0_10px_40px_rgba(50,94,252,0.4)]">
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </motion.svg>
            </div>
            <div className="space-y-3 sm:space-y-4 md:space-y-6 relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight italic text-gray-900">{t('contact.success')}</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-500 font-light max-w-xl mx-auto leading-relaxed">
                {t('contact.success_text')}
              </p>
            </div>
            <button 
              onClick={() => { setIsSubmitted(false); setCurrentStep(0); setShowContactInfo(false); setSubmitError(''); }}
              className="relative z-10 text-amedia-blue uppercase tracking-[0.3em] text-sm font-bold hover:text-amedia-blue/80 transition-colors mt-8 inline-block"
            >
              {t('contact.back')}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
