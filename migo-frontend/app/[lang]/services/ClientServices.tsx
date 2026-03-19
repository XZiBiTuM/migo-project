"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBotUrl } from '@/utils/bot';
import ServiceModal from '@/components/ServiceModal';
import {
  ArrowRight, MessageCircle, Globe, ChevronRight, Search, FileText, ShieldCheck,
  MapPin, CheckCircle2, ChevronDown, Briefcase, Smartphone, Landmark, HeartPulse,
  Wallet, Zap, Home, Send
} from 'lucide-react';
import { T, useLanguage } from '@/context/LanguageContext';

const COLORS = {
  navy: '#163A5C',
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

interface Service {
  id: number;
  slug: string;
  title: string;
  service_type: string;
  short_description: string;
  is_partner_service: boolean;
}

interface ClientServicesProps {
  initialServices: Service[];
}

export default function ClientServices({ initialServices }: ClientServicesProps) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [modalService, setModalService] = useState<{ title: string; icon: React.ReactNode; color: string } | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="pt-20 md:pt-32 pb-24 bg-[#F8FAFC] selection:bg-[#B8D430]/30 min-h-screen">
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden px-5 pt-10 pb-10 md:pt-0 md:pb-0">
        <div className="absolute inset-0 z-0 text-center">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#2196D3]/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#B8D430]/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0)_0%,rgba(248,250,252,1)_100%)]"></div>
        </div>

        <div className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/80 shadow-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-[#B8D430]"></span>
              <p className="text-xs md:text-sm font-bold text-[#163A5C] uppercase tracking-[0.2em]"><T path="services.hero.badge">Профессиональная помощь</T></p>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#163A5C] leading-[1.05] mb-8 max-w-5xl tracking-tight">
              <T path="services.hero.title_1">Наши услуги</T> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2196D3] to-[#163A5C]"><T path="services.hero.title_highlight">для вашей жизни в России</T></span>
            </h1>

            <p className="text-lg md:text-2xl text-gray-500/80 mb-12 max-w-2xl leading-relaxed">
              <T path="services.hero.subtitle">От юридической помощи до бытовых вопросов. Мы поддерживаем вас на каждом этапе вашей адаптации и работы.</T>
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-[#B8D430] font-black uppercase tracking-[0.3em] text-sm mb-4"><T path="services.docs_section.label">Документы</T></p>
            <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-4"><T path="services.docs_section.title">Оформление документов</T></h2>
            <p className="text-gray-500 text-lg"><T path="services.docs_section.subtitle">Полный пакет документов для легальной работы и проживания в России.</T></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialServices.filter(s => s.service_type === 'docs').map((doc) => {
            const icon = getServiceIcon(doc.service_type);
            const color = getServiceColor(doc.service_type);
            return (
              <div key={doc.id} className="group bg-white rounded-[40px] p-10 border border-gray-100 hover:border-[#2196D3] hover:shadow-2xl transition-all duration-500 flex flex-col transform hover:-translate-y-2 h-full">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                  style={{ backgroundColor: `${color}15`, color: color }}
                >
                  {React.cloneElement(icon as React.ReactElement, { size: 28 })}
                </div>

                <h3 className="text-2xl font-black text-[#163A5C] mb-4 group-hover:text-[#2196D3] transition-colors leading-tight">
                  {doc.title}
                </h3>

                <p className="text-gray-500 leading-relaxed mb-6 font-medium">
                  {doc.short_description}
                </p>

                <Link
                  href={`/services/${doc.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#2196D3] transition-colors mb-8 group/link cursor-pointer"
                >
                  <T path="services.docs_section.more">Подробнее</T> <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>

                <div className="mt-auto flex flex-col gap-3">
                  <Link
                    href={getBotUrl({ start: doc.slug })}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] py-3 px-6 rounded-2xl font-bold text-sm transition-all hover:shadow-lg cursor-pointer"
                  >
                    <Send size={16} /> <T path="services.docs_section.order_tg">Оформить в Telegram</T>
                  </Link>
                  <button
                    onClick={() => setModalService({ title: doc.title, icon: icon, color: color })}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#163A5C] py-3 px-6 rounded-2xl font-bold text-sm border border-gray-200 transition-all hover:shadow-md cursor-pointer"
                  >
                    <FileText size={16} /> <T path="services.docs_section.order_site">Оставить заявку на сайте</T>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <p className="text-[#2196D3] font-black uppercase tracking-[0.3em] text-sm mb-4"><T path="services.extra_section.label">Сервисы</T></p>
              <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-4"><T path="services.extra_section.title">Дополнительные услуги</T></h2>
              <p className="text-gray-500 text-lg"><T path="services.extra_section.subtitle">Мы помогаем решить бытовые и финансовые вопросы, чтобы вы чувствовали себя как дома.</T></p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initialServices.filter(s => s.service_type === 'finance' || s.service_type === 'housing').map((svc) => {
              const icon = getServiceIcon(svc.service_type);
              const color = getServiceColor(svc.service_type);
              return (
                <div key={svc.id} className="group bg-[#F8FAFC] rounded-[40px] p-10 border border-gray-100 hover:border-[#2196D3] hover:shadow-2xl transition-all duration-500 flex flex-col transform hover:-translate-y-2 h-full">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                    style={{ backgroundColor: `${color}15`, color: color }}
                  >
                    {React.cloneElement(icon as React.ReactElement, { size: 28 })}
                  </div>

                  <h3 className="text-2xl font-black text-[#163A5C] mb-4 group-hover:text-[#2196D3] transition-colors leading-tight">
                    {svc.title}
                  </h3>

                  <p className="text-gray-500 leading-relaxed mb-4 font-medium">
                    {svc.short_description}
                  </p>

                  <Link
                    href={`/services/${svc.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#2196D3] transition-colors mb-6 group/link cursor-pointer"
                  >
                    <T path="services.extra_section.more">Подробнее</T> <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>

                  {svc.is_partner_service && (
                    <p className="text-xs text-gray-400 italic mb-6 leading-relaxed">
                      <T path="services.extra_section.partner_note">Услуга предоставляется партнёрами. MIGO не является финансовой организацией.</T>
                    </p>
                  )}

                  <div className="mt-auto flex flex-col gap-3">
                    <Link
                      href={getBotUrl({ start: svc.slug })}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-2 bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] py-3 px-6 rounded-2xl font-bold text-sm transition-all hover:shadow-lg cursor-pointer"
                    >
                      <Send size={16} /> <T path="services.extra_section.learn_tg">Узнать в Telegram</T>
                    </Link>
                    <button
                      onClick={() => setModalService({ title: svc.title, icon: icon, color: color })}
                      className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#163A5C] py-3 px-6 rounded-2xl font-bold text-sm border border-gray-200 transition-all hover:shadow-md cursor-pointer"
                    >
                      <FileText size={16} /> <T path="services.extra_section.order_site">Оставить заявку</T>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-5">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-6"><T path="services.steps.title">Как работает MIGO</T></h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto"><T path="services.steps.subtitle">Четыре простых шага к решению вашего вопроса.</T></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { num: '01', title: <T path="services.steps.step1_title">Обращаетесь к нам</T>, desc: <T path="services.steps.step1_desc">В Telegram боте или по телефону</T>, icon: <MessageCircle /> },
            { num: '02', title: <T path="services.steps.step2_title">Получаете расчет</T>, desc: <T path="services.steps.step2_desc">Бесплатная консультация и цена</T>, icon: <Search /> },
            { num: '03', title: <T path="services.steps.step3_title">Работа с экспертом</T>, desc: <T path="services.steps.step3_desc">Ваш менеджер всегда на связи</T>, icon: <FileText /> },
            { num: '04', title: <T path="services.steps.step4_title">Результат</T>, desc: <T path="services.steps.step4_desc">Готовые документы или услуга</T>, icon: <ShieldCheck /> },
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[#2196D3]/10 text-[#2196D3] flex items-center justify-center font-black text-xl mb-6 group-hover:bg-[#2196D3] group-hover:text-white transition-all duration-500">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-[#163A5C] mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-6"><T path="services.faq.title">Часто задаваемые вопросы</T></h2>
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
        <div className="bg-gradient-to-br from-[#2196D3] to-[#163A5C] rounded-[48px] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8"><T path="services.cta.title">Не нашли нужную услугу?</T></h2>
            <p className="text-white/80 text-xl font-medium mb-12">
              <T path="services.cta.subtitle">Напишите нам в Telegram — мы поможем решить практически любой вопрос, связанный с работой и жизнью в России.</T>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={getBotUrl({ start: 'support' })}
                target="_blank"
                className="bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] py-5 px-12 rounded-[24px] font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-105"
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
    </main>
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
        <div className="p-8 pt-0 text-gray-500 leading-relaxed font-medium border-t border-gray-50">
          {answer}
        </div>
      </div>
    </div>
  );
}