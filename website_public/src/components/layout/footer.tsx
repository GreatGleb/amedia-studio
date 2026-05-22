"use client";

import { useTranslation } from "@/context/language-context";
import Link from "next/link";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-amedia-green text-white py-16 px-6 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <div className="text-3xl font-bold tracking-tighter italic">amediå</div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              {t('footer.positioning')}
            </p>
            <div className="text-white/40 text-xs mt-4">
              {t('footer.company_info')}
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-medium tracking-wide">{t('footer.services_title')}</h4>
            <ul className="flex flex-col gap-3 text-white/60 text-sm">
              <li><Link href="#services" className="hover:text-amedia-blue transition-colors inline-block">{t('footer.services.marketing')}</Link></li>
              <li><Link href="#services" className="hover:text-amedia-blue transition-colors inline-block">{t('footer.services.web')}</Link></li>
              <li><Link href="#services" className="hover:text-amedia-blue transition-colors inline-block">{t('footer.services.consulting')}</Link></li>
              <li><Link href="#services" className="hover:text-amedia-blue transition-colors inline-block">{t('footer.services.crisis')}</Link></li>
              <li><Link href="#services" className="hover:text-amedia-blue transition-colors inline-block">{t('footer.services.enterprise')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Agency */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-medium tracking-wide">{t('footer.agency_title')}</h4>
            <ul className="flex flex-col gap-3 text-white/60 text-sm">
              <li><Link href="#vision" className="hover:text-amedia-blue transition-colors inline-block">{t('footer.agency.about')}</Link></li>
              <li><Link href="#cases" className="hover:text-amedia-blue transition-colors inline-block">{t('footer.agency.projects')}</Link></li>
              <li><Link href="#careers" className="hover:text-amedia-blue transition-colors inline-block">{t('footer.agency.careers')}</Link></li>
              <li><Link href="#contact" className="hover:text-amedia-blue transition-colors inline-block">{t('footer.agency.contact')}</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-medium tracking-wide">{t('footer.contact_title')}</h4>
            <ul className="flex flex-col gap-3 text-white/60 text-sm">
              <li><a href="mailto:hello@amedia.agency" className="hover:text-amedia-blue transition-colors inline-block">hello@amedia.agency</a></li>
              <li><a href="tel:+4799999999" className="hover:text-amedia-blue transition-colors inline-block">+47 99 99 99 99</a></li>
              <li className="mt-4 flex gap-6 text-sm uppercase tracking-widest font-medium">
                <a href="#" className="hover:text-amedia-blue transition-colors inline-block">Instagram</a>
                <a href="#" className="hover:text-amedia-blue transition-colors inline-block">LinkedIn</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <div>
            {t('footer.rights')}
          </div>
          <div className="flex gap-6">
            <Link href="#privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link href="#terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
