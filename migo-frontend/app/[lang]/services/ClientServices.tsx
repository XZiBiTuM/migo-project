"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBotUrl } from '@/utils/bot';
import ServiceModal from '@/components/ServiceModal';
import {
  ArrowRight, MessageCircle, ChevronRight, Search, FileText, ShieldCheck,
  Home, Send, Zap, Wallet
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

const getServiceIcon = (type: string) => {
  switch (type) {
    case 'housing': return <Home />;
    case 'docs': return <FileText />;
    case 'finance': return <Wallet />;
    default: return <Zap />;
  }
};

const getServiceColor = (type: string) => {
  switch (type) {
    case 'housing': return COLORS.blue;
    case 'docs': return COLORS.navy;
    case 'finance': return COLORS.accent;
    default: return COLORS.blue;
  }
};

function ServiceCard({ svc, t, language, setModalService }: any) {
  const icon = getServiceIcon(svc.service_type);
  const color = getServiceColor(svc.service_type);
  const lang = language.toLowerCase();
  const title = (lang !== 'ru' && svc[`title_${lang}`]) || svc.title;
  const description = (lang !== 'ru' && svc[`short_description_${lang}`]) || svc.short_description;
  const priceConditions = (lang !== 'ru' && svc[`price_conditions_${lang}`]) || svc.price_conditions;

  const isFree = priceConditions?.toString().toLowerCase().includes('бесплатно') ||
    priceConditions?.toString().toLowerCase().includes('bepul') ||
    priceConditions?.toString().toLowerCase().includes('tegin');

  return (
    <div className="group bg-white rounded-[48px] p-8 md:p-10 border border-gray-100 hover:border-[#1E58B1] hover:shadow-[0_45px_75px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col transform hover:-translate-y-2 h-full shadow-sm">
      <div className="flex justify-between items-start mb-10">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#1E58B1] bg-[#1E58B1]/5 transform group-hover:scale-110 group-hover:bg-[#B8D430] group-hover:text-[#163A5C] transition-all duration-500 shadow-sm overflow-hidden">
          {svc.image ? (
            <div className="relative w-full h-full">
              <Image
                src={svc.image.startsWith('http') ? svc.image : `${process.env.NEXT_PUBLIC_API_URL}${svc.image}`}
                alt={title} fill className="object-cover scale-110"
              />
            </div>
          ) : (
            React.cloneElement(icon as React.ReactElement, { size: 32 } as any)
          )}
        </div>
        {isFree && (
          <span className="px-4 py-1.5 rounded-full bg-[#27A15E]/10 text-[#27A15E] text-xs font-black uppercase tracking-widest border border-[#27A15E]/20">
            <T path="services.free_tag">Бесплатно</T>
          </span>
        )}
      </div>
      <h3 className="text-2xl md:text-3xl font-black text-[#163A5C] mb-6 group-hover:text-[#1E58B1] transition-colors leading-tight tracking-tighter">{title}</h3>
      <p className="text-gray-700 leading-relaxed mb-8 font-medium">{description}</p>
      <div className="mt-auto flex flex-col gap-4">
        <Link href={getBotUrl({ start: svc.slug })} target="_blank" className="inline-flex items-center justify-center gap-3 bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] py-5 px-8 rounded-[24px] font-black text-lg transition-all hover:scale-105 shadow-[0_10px_20px_-5px_rgba(184,212,48,0.3)]">
          <Send size={20} /> <T path="services.docs_section.order_tg">Узнать в Telegram</T>
        </Link>
        <div className="flex gap-2 flex-col">
          <Link href={`/${lang}/services/${svc.slug}`} className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 py-4 px-4 rounded-[20px] font-bold text-sm border border-gray-100 transition-all hover:shadow-md">
            <T path="services.extra_section.more">Подробнее</T> <ArrowRight size={16} />
          </Link>
          <button onClick={() => setModalService({ title, icon, color, image: svc.image })} className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#1E58B1] py-4 px-4 rounded-[20px] font-bold text-sm border border-gray-100 transition-all hover:shadow-md">
            <FileText size={18} /> <T path="services.docs_section.order_site">Заявка</T>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ClientServices({ initialServices }: any) {
  const { t, language } = useLanguage();
  const [modalService, setModalService] = useState<any>(null);

  const freeServices = initialServices.filter((s: any) => s.price_conditions?.toLowerCase().includes('бесплатно'));
  const docServices = initialServices.filter((s: any) => s.service_type === 'docs' && !s.price_conditions?.toLowerCase().includes('бесплатно'));
  const extraServices = initialServices.filter((s: any) => s.service_type !== 'docs' && !s.price_conditions?.toLowerCase().includes('бесплатно'));

  return (
    <div className="pb-24 bg-[#F8FAFC] selection:bg-[#B8D430]/30">
      {freeServices.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-5 scroll-mt-20" id="free">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-left">
            <div className="max-w-2xl">
              <p className="text-[#27A15E] font-black uppercase tracking-[0.3em] text-sm mb-4"><T path="services.free_section.label">Бесплатная помощь</T></p>
              <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-4"><T path="services.free_section.title">Сервисы по 0 рублей</T></h2>
              <p className="text-gray-700 text-lg"><T path="services.free_section.subtitle">Помогаем адаптироваться и оформить базовые услуги бесплатно.</T></p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {freeServices.map((svc: any) => <ServiceCard key={svc.id} svc={svc} t={t} language={language} setModalService={setModalService} />)}
          </div>
        </section>
      )}

      <section className="py-24 max-w-7xl mx-auto px-5 scroll-mt-20" id="documents">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-left">
          <div className="max-w-2xl">
            <p className="text-[#B8D430] font-black uppercase tracking-[0.3em] text-sm mb-4"><T path="services.docs_section.label">Документы</T></p>
            <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-4"><T path="services.docs_section.title">Оформление документов</T></h2>
            <p className="text-gray-700 text-lg"><T path="services.docs_section.subtitle">Полный пакет документов для легальной работы и проживания.</T></p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {docServices.map((svc: any) => <ServiceCard key={svc.id} svc={svc} t={t} language={language} setModalService={setModalService} />)}
        </div>
      </section>

      <section className="py-24 bg-white border-y border-gray-100 scroll-mt-20" id="services">
        <div className="max-w-7xl mx-auto px-5 text-left">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <p className="text-[#2196D3] font-black uppercase tracking-[0.3em] text-sm mb-4"><T path="services.extra_section.label">Сервисы</T></p>
              <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-4"><T path="services.extra_section.title">Дополнительные услуги</T></h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {extraServices.map((svc: any) => <ServiceCard key={svc.id} svc={svc} t={t} language={language} setModalService={setModalService} />)}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-5">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-6"><T path="services.steps.title">Как работает MIGO</T></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { num: '01', title: <T path="services.steps.step1_title" />, desc: <T path="services.steps.step1_desc" /> },
            { num: '02', title: <T path="services.steps.step2_title" />, desc: <T path="services.steps.step2_desc" /> },
            { num: '03', title: <T path="services.steps.step3_title" />, desc: <T path="services.steps.step3_desc" /> },
            { num: '04', title: <T path="services.steps.step4_title" />, desc: <T path="services.steps.step4_desc" /> },
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[#2196D3]/10 text-[#2196D3] flex items-center justify-center font-black text-xl mb-6 group-hover:bg-[#2196D3] group-hover:text-white transition-all">{step.num}</div>
              <h3 className="text-xl font-bold text-[#163A5C] mb-3">{step.title}</h3>
              <p className="text-gray-700 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white border-y border-gray-100 scroll-mt-20" id="faq">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-6">
              <T path="services.faq.title">Часто задаваемые вопросы</T>
            </h2>
          </div>

          <div className="space-y-6">
            <FAQItem
              question={<T path="services.faq.q1">Как быстро я получу ответ?</T>}
              answer={<T path="services.faq.a1">Наши менеджеры работают ежедневно. В Telegram боте вы получите первый ответ в течение 10-15 минут в рабочее время.</T>}
            />
            <FAQItem
              question={<T path="services.faq.q2">Нужно ли платить заранее?</T>}
              answer={<T path="services.faq.a2">Большинство консультаций бесплатны. Стоимость услуг фиксируется в начале работы и оплачивается по факту или этапами.</T>}
            />
            <FAQItem
              question={<T path="services.faq.q3">Помогаете ли вы с оформлением патента?</T>}
              answer={<T path="services.faq.a3">Да, мы предоставляем полный список документов и помогаем записаться в миграционный центр.</T>}
            />
            <FAQItem
              question={<T path="services.faq.q4">Какие документы нужны для перевода паспорта?</T>}
              answer={<T path="services.faq.a4">Достаточно оригинала паспорта. Мы делаем нотариальный перевод и заверение в течение 1 рабочего дня.</T>}
            />
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-5">
        <div className="bg-gradient-to-br from-[#2196D3] to-[#1E58B1] rounded-[48px] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
              <T path="services.cta.title">Не нашли нужную услугу?</T>
            </h2>
            <p className="text-white/80 text-xl font-medium mb-12">
              <T path="services.cta.subtitle">Напишите нам в Telegram — мы поможем решить практически любой вопрос, связанный с работой и жизнью в России.</T>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={getBotUrl({ start: 'support' })}
                target="_blank"
                className="bg-[#B8D430] hover:bg-[#A7C220] text-[#1E58B1] py-5 px-12 rounded-[24px] font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-105"
              >
                <MessageCircle size={28} /> <T path="services.cta.btn">Написать менеджеру</T>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ServiceModal
        isOpen={!!modalService}
        onClose={() => setModalService(null)}
        service={modalService}
      />
    </div>
  );
}

function FAQItem({ question, answer }: { question: React.ReactNode, answer: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden transition-all duration-300 hover:shadow-xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-8 flex justify-between items-center group cursor-pointer"
      >
        <span className="text-xl font-black text-[#163A5C] group-hover:text-[#2196D3] transition-colors">{question}</span>
        <ChevronRight className={`text-[#2196D3] transition-transform duration-500 ${isOpen ? 'rotate-90' : ''}`} size={24} />
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="p-8 pt-0 text-gray-700 leading-relaxed font-medium border-t border-gray-50">
          {answer}
        </div>
      </div>
    </div>
  );
}