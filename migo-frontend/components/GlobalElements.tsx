"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBotUrl } from '@/utils/bot';
import { useLanguage, T } from '@/context/LanguageContext';
import {
  Globe, MessageCircle, Briefcase, FileText, Send, MapPin, Menu, ChevronRight, PlayCircle, X
} from 'lucide-react';

import Image from 'next/image';

const LANGUAGES = [
  { code: 'RU', flagUrl: 'https://flagcdn.com/w40/ru.png', label: 'Русский' },
  { code: 'KZ', flagUrl: 'https://flagcdn.com/w40/kz.png', label: 'Қазақша' },
  { code: 'KG', flagUrl: 'https://flagcdn.com/w40/kg.png', label: 'Кыргызча' },
  { code: 'TJ', flagUrl: 'https://flagcdn.com/w40/tj.png', label: 'Тоҷикӣ' },
  { code: 'UZ', flagUrl: 'https://flagcdn.com/w40/uz.png', label: 'Oʻzbekcha' },
] as const;

export function GlobalHeader() {
  const { language: selectedLang, setLanguage: setSelectedLang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangIntro, setShowLangIntro] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('migo_lang')) {
      setShowLangIntro(true);
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLangSelect = (code: any) => {
    setSelectedLang(code);
    setShowLangIntro(false);

    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    const langCode = code.toLowerCase();

    const locales = ['ru', 'kz', 'kg', 'uz', 'tj'];
    if (segments.length > 1 && locales.includes(segments[1])) {
      segments[1] = langCode;
      window.location.href = segments.join('/');
    } else {
      window.location.href = `/${langCode}${pathname === '/' ? '' : pathname}`;
    }
  };

  const l = selectedLang.toLowerCase();

  return (
    <>
      {showLangIntro && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white p-6 animate-in fade-in duration-300">
          <Image src="/logo.webp" alt="MIGO" width={144} height={144} className="w-28 h-auto md:w-36 mb-8 object-contain drop-shadow-sm" priority />
          <h2 className="text-2xl md:text-3xl font-bold text-[#163A5C] mb-6 tracking-tight"><T path="lang_intro.title">Выберите язык</T></h2>
          <div className="w-full max-w-sm space-y-2.5">
            {LANGUAGES.map((lang) => (
              <button key={lang.code} onClick={() => handleLangSelect(lang.code)} className="w-full py-3.5 px-5 bg-white border border-gray-200 rounded-xl text-base font-medium text-[#163A5C] hover:border-[#2196D3] hover:bg-[#2196D3]/5 active:bg-gray-50 flex items-center justify-between transition-all">
                <span className="flex items-center gap-3">
                  <img src={lang.flagUrl} alt={lang.code} width="20" height="15" className="w-5 h-auto rounded-sm" />
                  {lang.label}
                </span>
                <ChevronRight className="text-gray-300 w-4 h-4" />
              </button>
            ))}
          </div>
          <button onClick={() => handleLangSelect('RU')} className="mt-7 text-[#2196D3] text-sm font-medium hover:text-[#1976B0] transition-colors">
            <T path="lang_intro.continue_ru">Продолжить на русском</T>
          </button>
        </div>
      )}

      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-5 flex justify-between items-center">
          <Link href={`/${l}/`} className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
            <Image src="/logo.webp" alt="MIGO" width={40} height={40} className="w-9 h-auto md:w-10 object-contain drop-shadow-sm" priority />
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-500">
            <Link href={`/${l}/work`} className="hover:text-[#2196D3] transition-colors cursor-pointer"><T path="nav.work">Работа</T></Link>
            <Link href={`/${l}/housing`} className="hover:text-[#2196D3] transition-colors cursor-pointer"><T path="nav.housing">Жильё</T></Link>
            <Link href={`/${l}/services`} className="hover:text-[#2196D3] transition-colors cursor-pointer"><T path="nav.services">Услуги</T></Link>
            <Link href={`/${l}/news`} className="hover:text-[#2196D3] transition-colors cursor-pointer"><T path="nav.news">Новости</T></Link>
            <Link href={`/${l}/about`} className="hover:text-[#2196D3] transition-colors cursor-pointer"><T path="nav.about">О проекте</T></Link>
            <Link href={`/${l}/contacts`} className="hover:text-[#2196D3] transition-colors cursor-pointer"><T path="nav.contacts">Контакты</T></Link>
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => setShowLangIntro(true)} className="cursor-pointer flex items-center gap-1.5 text-sm font-medium text-gray-500 bg-gray-50 hover:bg-gray-100 border border-gray-100 px-3 py-1.5 rounded-lg transition-colors">
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-xs"><T path="lang_intro.lang_label">Язык:</T></span>
              {(() => {
                const lang = LANGUAGES.find(l => l.code === selectedLang.toUpperCase());
                return lang ? <img src={lang.flagUrl} alt={lang.code} width="16" height="12" className="w-4 h-auto rounded-sm" /> : selectedLang;
              })()}
            </button>
            <Link href={getBotUrl({ source: 'site', medium: 'global' })} target="_blank" className="bg-[#2196D3] hover:bg-[#1976B0] p-2 md:px-4 md:py-2 md:rounded-lg rounded-full text-white transition-colors flex items-center gap-2 text-sm font-semibold cursor-pointer">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden md:inline"><T path="nav.support">Поддержка</T></span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export function GlobalFooter() {
  const { language } = useLanguage();
  const lang = language.toLowerCase();

  return (
    <footer className="bg-white pt-14 pb-28 sm:pb-14 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-1 md:col-span-2">
            <Link href={`/${lang}/`}><Image src="/logo.webp" alt="MIGO" width={40} height={40} className="w-10 h-auto mb-3 object-contain" /></Link>
            <p className="text-gray-500 text-sm max-w-sm mb-5 leading-relaxed"><T path="footer.desc_1">Сервис помощи гражданам СНГ в России.</T><br /><T path="footer.desc_2">Легально, безопасно, с поддержкой.</T></p>
            <div className="flex gap-3">
              <Link href={getBotUrl({ source: 'site', medium: 'global' })} target="_blank" className="w-9 h-9 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center hover:border-[#2196D3]/40 hover:bg-[#2196D3]/5 cursor-pointer transition-colors"><Send size={15} color="#163A5C" /></Link>
              <Link href={`/${lang}/contacts`} className="w-9 h-9 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center hover:border-[#2196D3]/40 hover:bg-[#2196D3]/5 cursor-pointer transition-colors"><MapPin size={15} color="#163A5C" /></Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 text-[#163A5C]"><T path="footer.docs_title">Документы</T></h4>
            <ul className="space-y-2.5 text-sm text-gray-500 font-medium">
              <li><Link href={`/${lang}/privacy`} className="hover:text-[#2196D3] underline decoration-transparent hover:decoration-[#2196D3] transition-all cursor-pointer"><T path="footer.privacy">Политика конфиденциальности</T></Link></li>
              <li><Link href={`/${lang}/terms`} className="hover:text-[#2196D3] underline decoration-transparent hover:decoration-[#2196D3] transition-all cursor-pointer"><T path="footer.terms">Пользовательское соглашение</T></Link></li>
              <li><Link href="/admin" className="text-gray-400 hover:text-[#2196D3] transition-colors cursor-pointer text-[10px] mt-2 block opacity-60"><T path="footer.admin">Админ-панель</T></Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 text-[#163A5C]"><T path="footer.contacts_title">Контакты</T></h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><T path="footer.company_name">ООО «ПРМ»</T></li>
              <li className="leading-snug"><T path="footer.address_msk">Москва, Армянский пер, д.9 стр. 1, Этаж 4, Офис 402-2</T></li>
              <li className="leading-snug"><T path="footer.address_kld">Калининград, пр-т Калинина 2, офис 4</T></li>
              <li><a href="tel:+79218543909" className="font-semibold text-base mt-1 inline-block text-[#163A5C] hover:text-[#2196D3] transition-colors">+7 921 854 39 09</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-300">
          <p><T path="footer.copyright">© 2026 Экосистема MIGO. Все права защищены. | Разработал:</T> <a href='https://t.me/xzibitum' target='_blank' className='text-[#2196D3] hover:text-[#163A5C] transition-colors'>XZiBiTuM</a></p>
        </div>
      </div>
    </footer>
  );
}

export function ConsultationButton() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 100);

      if (currentScrollY < lastScrollY && currentScrollY > 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      if (currentScrollY < 10) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-20 right-3 z-50 md:hidden">
      <div
        className={`transition-all duration-300 ease-in-out ${!isVisible ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
          }`}
      >
        <Link
          href={getBotUrl({ source: 'site', medium: 'global' })}
          target="_blank"
          className="flex items-center justify-center bg-gradient-to-r from-[#2196D3] to-[#00BCD4] text-white rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all duration-500 ease-out font-semibold text-sm h-13 px-4 cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
            <MessageCircle
              className={`absolute transition-all duration-500 ${isScrolled ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-180'
                }`}
              size={20}
            />
            <PlayCircle
              className={`absolute transition-all duration-500 ${isScrolled ? 'opacity-0 scale-50 rotate-180' : 'opacity-100 scale-100 rotate-0'
                }`}
              size={20}
            />
          </div>

          <span
            className={`overflow-hidden whitespace-nowrap transition-all duration-500 ease-out ${isScrolled ? 'max-w-0 opacity-0 ml-0' : 'max-w-[200px] opacity-100 ml-2'
              }`}
          >
            <T path="consultation.btn_text">Получить консультацию</T>
          </span>
        </Link>
      </div>
    </div>
  );
}

export function GlobalMobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();
  const lang = language.toLowerCase();

  return (
    <>
      <nav className="fixed bottom-0 w-full bg-white/95 backdrop-blur-sm border-t border-gray-100 flex justify-between px-2 pb-safe pt-2 z-50 shadow-sm md:hidden">
        <Link href={`/${lang}/work`} onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center justify-center w-full py-2 gap-1 text-gray-400 hover:text-gray-600 transition-colors">
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px] font-medium"><T path="mobile_nav.work">Работа</T></span>
        </Link>
        <Link href={`/${lang}/services`} onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center justify-center w-full py-2 gap-1 text-gray-400 hover:text-gray-600 transition-colors">
          <FileText className="w-5 h-5" />
          <span className="text-[10px] font-medium"><T path="mobile_nav.services">Услуги</T></span>
        </Link>
        <Link href={getBotUrl({ source: 'site', medium: 'global' })} target="_blank" className="flex flex-col items-center justify-center w-full py-2 gap-1 text-[#2196D3] transition-colors cursor-pointer">
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-medium"><T path="mobile_nav.telegram">Telegram</T></span>
        </Link>
        <button onClick={() => setIsMenuOpen(true)} className="flex flex-col items-center justify-center w-full py-2 gap-1 text-gray-400 hover:text-gray-600 transition-colors">
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-medium"><T path="mobile_nav.menu">Меню</T></span>
        </button>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col md:hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex justify-between items-center p-5 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <Image src="/logo.webp" alt="MIGO" width={28} height={28} className="w-7 h-auto object-contain drop-shadow-sm" />
              <span className="text-lg font-bold text-[#163A5C]" style={{ fontFamily: 'var(--font-outfit), sans-serif', letterSpacing: '-0.03em' }}>MIGO</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col p-4 gap-1 overflow-y-auto pb-24">
            <Link href={`/${lang}/`} onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-[#163A5C] p-4 hover:bg-gray-50 rounded-xl transition-colors"><T path="mobile_nav.home">Главная</T></Link>
            <Link href={`/${lang}/work`} onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-[#163A5C] p-4 hover:bg-gray-50 rounded-xl transition-colors"><T path="mobile_nav.work">Работа</T></Link>
            <Link href={`/${lang}/housing`} onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-[#163A5C] p-4 hover:bg-gray-50 rounded-xl transition-colors"><T path="mobile_nav.housing">Жильё</T></Link>
            <Link href={`/${lang}/services`} onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-[#163A5C] p-4 hover:bg-gray-50 rounded-xl transition-colors"><T path="mobile_nav.services_long">Документы и Сервисы</T></Link>
            <Link href={`/${lang}/news`} onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-[#163A5C] p-4 hover:bg-gray-50 rounded-xl transition-colors"><T path="mobile_nav.news_long">Журнал и Новости</T></Link>
            <Link href={`/${lang}/about`} onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-[#163A5C] p-4 hover:bg-gray-50 rounded-xl transition-colors"><T path="mobile_nav.about">О проекте</T></Link>
            <Link href={`/${lang}/contacts`} onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-[#163A5C] p-4 hover:bg-gray-50 rounded-xl transition-colors"><T path="mobile_nav.contacts">Контакты</T></Link>

            <div className="mt-4 pt-5 border-t border-gray-50 flex flex-col gap-3">
              <a href="tel:+79218543909" className="text-gray-500 text-sm font-medium px-4">+7 921 854 39 09</a>
              <Link href={getBotUrl({ source: 'site', medium: 'global' })} target="_blank" className="bg-[#2196D3] text-white p-4 rounded-xl font-semibold text-center cursor-pointer">
                <T path="mobile_nav.support">Написать в поддержку</T>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function GlobalCookieBanner() {
  const [show, setShow] = useState(false);
  const { language } = useLanguage();
  const lang = language.toLowerCase();

  useEffect(() => {
    if (!localStorage.getItem('migo_cookie_consent')) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-0 right-0 z-[110] px-4 md:px-0 flex justify-center animate-in slide-in-from-bottom-5">
      <div className="bg-white border border-gray-100 shadow-lg p-4 md:p-5 rounded-2xl max-w-2xl w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 text-center md:text-left leading-relaxed">
          <T path="cookie.text">Мы используем файлы cookie для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с нашей</T> <Link href={`/${lang}/privacy`} className="text-[#2196D3] cursor-pointer"><T path="cookie.policy_link">Политикой конфиденциальности</T></Link>.
        </p>
        <button onClick={() => { localStorage.setItem('migo_cookie_consent', 'true'); setShow(false); }} className="bg-[#163A5C] text-white px-6 py-2.5 rounded-lg font-semibold text-sm w-full md:w-auto shrink-0 hover:bg-opacity-90 transition-colors">
          <T path="cookie.agree">Я согласен</T>
        </button>
      </div>
    </div>
  );
}