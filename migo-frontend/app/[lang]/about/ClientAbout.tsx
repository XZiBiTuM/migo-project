"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBotUrl } from '@/utils/bot';
import {
  ShieldCheck, MessageCircle, Zap, CheckCircle2,
  ArrowRight, Briefcase, Home, FileText, XCircle, ChevronRight
} from 'lucide-react';
import { T, useLanguage } from '@/context/LanguageContext';

const COLORS = {
  navy: '#1E58B1',
  textNavy: '#163A5C',
  blue: '#2196D3',
  accent: '#B8D430',
  green: '#27A15E',
  bg: '#F8FAFC',
  white: '#FFFFFF',
};

export default function ClientAbout() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="pb-24 bg-[#F8FAFC] selection:bg-[#B8D430]/30 min-h-screen">
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-5 pt-32 pb-20 md:pt-0 md:pb-0">
        <div className="absolute inset-0 z-0 text-center">
          <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#2196D3]/15 rounded-full blur-[140px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#B8D430]/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-white rounded-full blur-[100px] opacity-40"></div>
          <div className="absolute inset-0 bg-white/30"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-sm mb-8 animate-bounce-slow">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B8D430] shadow-[0_0_10px_#B8D430]"></span>
                <p className="text-xs md:text-sm font-black text-[#1E58B1] uppercase tracking-[0.25em]"><T path="about.hero.badge">Мы строим будущее</T></p>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#163A5C] leading-[0.95] mb-8 tracking-tighter">
                <T path="about.hero.title_1">Безопасный путь</T><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E58B1] to-[#2196D3]"><T path="about.hero.title_highlight">для каждого</T></span>
              </h1>

              <p className="text-lg md:text-2xl text-gray-700/80 mb-12 max-w-xl leading-relaxed font-medium">
                <T path="about.mission.p1">MIGO — это экосистема поддержки, созданная чтобы сделать жизнь и работу в России прозрачной и комфортной.</T>
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full sm:w-auto">
                <Link
                  href={getBotUrl({ start: 'about' })}
                  target="_blank"
                  className="group bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] py-5 px-10 rounded-[32px] font-black text-xl flex items-center justify-center gap-3 shadow-[0_15px_30px_-5px_rgba(184,212,48,0.5)] transition-all hover:-translate-y-1.5 active:scale-95"
                >
                  <MessageCircle size={28} /> <T path="about.cta.btn">Узнать больше</T>
                </Link>
              </div>
            </div>

            <div className="relative group perspective-[2000px] hidden lg:block mt-0 lg:mt-8 md:mt-4">
              <div className="relative z-10 animate-float">
                <Image
                  src="/images/migo_about_friendly.webp"
                  alt="MIGO Команда с работниками-мигрантами"
                  width={800}
                  height={600}
                  className="w-full h-auto shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-[64px]"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-br from-[#1E58B1]/10 to-transparent rounded-full -z-10 blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-5">
        <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-20 text-center tracking-tight uppercase"><T path="about.reasons.title">Почему мы это делаем</T></h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[600px]">
          <div className="md:col-span-8 bg-white rounded-[48px] p-12 border border-gray-100 shadow-xl flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 transform group-hover:scale-110 transition-transform">
              <Zap size={120} className="text-gray-50 -mr-10 -mt-10" />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-[#163A5C] mb-6"><T path="about.reasons.r1_title">Отсутствие достоверной информации</T></h3>
              <p className="text-xl text-gray-700 max-w-xl leading-relaxed"><T path="about.reasons.r1_desc">Многие сталкиваются с обманом, потому что не знают своих прав или не имеют доступа к проверенным работодателям.</T></p>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm font-black text-[#B8D430]">
              <span className="w-12 h-0.5 bg-[#B8D430]"></span> <T path="about.reasons.r1_label">ПРИЧИНА №1</T>
            </div>
          </div>

          <div className="md:col-span-4 bg-[#2196D3] rounded-[48px] p-12 text-white flex flex-col justify-between shadow-xl transform hover:-rotate-1 transition-transform">
            <ShieldCheck size={48} className="mb-8" />
            <div>
              <h3 className="text-2xl font-black mb-4"><T path="about.reasons.r2_title">Безопасность</T></h3>
              <p className="text-white/95 font-medium"><T path="about.reasons.r2_desc">Мы проверяем каждого партнера, чтобы вы были уверены в завтрашнем дне.</T></p>
            </div>
          </div>

          <div className="md:col-span-4 bg-[#1E58B1] rounded-[48px] p-12 text-white flex flex-col justify-between shadow-xl">
            <MessageCircle size={48} className="mb-8 text-[#B8D430]" />
            <div>
              <h3 className="text-2xl font-black mb-4"><T path="about.reasons.r3_title">Поддержка</T></h3>
              <p className="text-white/90 font-medium"><T path="about.reasons.r3_desc">Наш бот и менеджеры — ваши верные помощники 24/7.</T></p>
            </div>
          </div>

          <div className="md:col-span-8 bg-white rounded-[48px] p-12 border border-gray-100 shadow-xl flex flex-col justify-center group">
            <h3 className="text-3xl font-black text-[#163A5C] mb-6"><T path="about.reasons.r4_title">Технологии для людей</T></h3>
            <p className="text-xl text-gray-700 max-w-xl leading-relaxed"><T path="about.reasons.r4_desc">Мы используем Telegram, чтобы быть там, где вам удобно. Никаких сложных интерфейсов, только польза.</T></p>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-5">
        <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-20 text-center uppercase tracking-tight"><T path="about.partners.title">Наши партнёры</T></h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center place-items-center">
          <a href='https://ragradus.ru/' target='_blank' className="bg-[#C0C0C0] rounded-2xl p-6 border border-gray-300 shadow-sm hover:shadow-lg hover:scale-105 transition-all w-full flex items-center justify-center h-24">
            <Image src="/partners/gradus_optimized.webp" alt="Градус" width={140} height={60} className="object-contain h-full" />
          </a>
          <a href='https://ventra.ru/' target='_blank' className="bg-[#C0C0C0] rounded-2xl p-6 border border-gray-300 shadow-sm hover:shadow-lg hover:scale-105 transition-all w-full flex items-center justify-center h-24">
            <Image src="/partners/ventra_optimized.webp" alt="Вентра" width={140} height={60} className="object-contain h-full" />
          </a>
          <a href='https://migranto.ru/' target='_blank' className="bg-[#C0C0C0] rounded-2xl p-6 border border-gray-300 shadow-sm hover:shadow-lg hover:scale-105 transition-all w-full flex items-center justify-center h-24">
            <Image src="/partners/migranto_optimized.webp" alt="Мигранто" width={140} height={60} className="object-contain h-full" />
          </a>
          <a href='https://association.outsourcers.ru/' target='_blank' className="bg-[#C0C0C0] rounded-2xl p-6 border border-gray-300 shadow-sm hover:shadow-lg hover:scale-105 transition-all w-full flex items-center justify-center h-24">
            <Image src="/partners/outsource_optimized.webp" alt="Ассоциация Аутсорсеров" width={140} height={60} className="object-contain h-full" />
          </a>
          <a href='https://xn--b1aew.xn--p1ai/' target='_blank' className="bg-[#C0C0C0] rounded-2xl p-6 border border-gray-300 shadow-sm hover:shadow-lg hover:scale-105 transition-all w-full flex items-center justify-center h-24">
            <Image src="/partners/mvd.webp" alt="Ассоциация ветеранов МВД г. Москва" width={140} height={60} className="object-contain h-full" sizes="140px" />
          </a>
        </div>
      </section>

      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-6"><T path="about.faq.title">Частые вопросы</T></h2>
            <p className="text-gray-700 text-lg"><T path="about.faq.subtitle">Всё, что вам нужно знать о работе с платформой MIGO.</T></p>
          </div>

          <div className="space-y-6">
            <FAQItem
              question={<T path="about.faq.q1">Чем MIGO отличается от других сервисов?</T>}
              answer={<T path="about.faq.a1">Мы работаем как единая точка входа. Вам не нужно искать отдельно работу, отдельно жилье и разбираться в документах. Мы помогаем со всеми этапами «под ключ».</T>}
            />
            <FAQItem
              question={<T path="about.faq.q2">Ваши услуги бесплатны?</T>}
              answer={<T path="about.faq.a2">Телеграм-бот, каталог вакансий и базовые консультации предоставляются бесплатно. Дополнительные услуги (например, перевод документов или помощь в оформлении) оплачиваются согласно открытым тарифам.</T>}
            />
            <FAQItem
              question={<T path="about.faq.q3">Где вы находитесь?</T>}
              answer={<T path="about.faq.a3">Наши основные офисы предоставления услуг расположены в Москве и Калининграде, но наша поддержка работает дистанционно по всей России.</T>}
            />
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-5 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-[#163A5C] mb-10 leading-tight"><T path="about.cta.title">Давайте делать этот мир лучше вместе</T></h2>
          <p className="text-xl text-gray-700 mb-12 font-medium"><T path="about.cta.subtitle">Хотите стать нашим партнером или помочь в развитии проекта? Мы всегда открыты к предложениям.</T></p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href={getBotUrl({ start: 'about' })} target="_blank" className="bg-[#B8D430] hover:bg-[#A7C220] text-[#1E58B1] py-5 px-12 rounded-[24px] font-black text-xl shadow-2xl transition-all hover:scale-105">
              <T path="about.cta.btn">Связаться с нами</T>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FAQItem({ question, answer }: { question: React.ReactNode, answer: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-[48px] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-10 flex justify-between items-center group cursor-pointer"
      >
        <span className="text-2xl font-black text-[#163A5C] group-hover:text-[#1E58B1] transition-colors leading-tight">{question}</span>
        <ChevronRight className={`text-[#1E58B1] transition-transform duration-500 ${isOpen ? 'rotate-90' : ''}`} size={32} />
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="p-10 pt-0 text-gray-700 text-lg leading-relaxed font-medium border-t border-gray-50">
          {answer}
        </div>
      </div>
    </div>
  );
}