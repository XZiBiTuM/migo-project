"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBotUrl } from '@/utils/bot';
import ServiceModal from '@/components/ServiceModal';
import {
  ArrowRight, MessageCircle, Globe, ChevronRight, Search, FileText, ShieldCheck,
  MapPin, CheckCircle2, ChevronDown, Briefcase, Smartphone, Landmark, HeartPulse,
  Wallet, Zap, Home, Send, CreditCard, Fingerprint, ClipboardList, Plane,
  Building, UserCheck, AlertTriangle, HelpCircle, Eye, Ban
} from 'lucide-react';
import { T, useLanguage } from '@/context/LanguageContext';

const COLORS = {
  navy: '#163A5C',
  blue: '#2196D3',
  accent: '#B8D430',
  green: '#27A15E',
  bg: '#F8FAFC',
  white: '#FFFFFF',
  orange: '#F59E0B',
  coral: '#EF6C53',
};

/* ─── Placeholder Image Component ─── */
function PlaceholderImage({ icon, color, label }: { icon: React.ReactNode; color: string; label?: string }) {
  return (
    <div
      className="w-full aspect-[4/3] rounded-[28px] flex flex-col items-center justify-center gap-3 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`,
        border: `1.5px solid ${color}20`,
      }}
    >
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
      <div className="relative z-10 text-current" style={{ color }}>
        {React.cloneElement(icon as React.ReactElement<any>, { size: 48, strokeWidth: 1.5 })}
      </div>
      {label && (
        <span className="relative z-10 text-xs font-bold uppercase tracking-[0.15em] opacity-40" style={{ color }}>
          {label}
        </span>
      )}
    </div>
  );
}

/* ─── Service Item (individual service within a group) ─── */
function ServiceItem({ icon, title, color }: { icon: React.ReactNode; title: React.ReactNode; color: string }) {
  return (
    <div className="flex items-center gap-4 py-3 group">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
        style={{ backgroundColor: `${color}12`, color }}
      >
        {React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
      </div>
      <span className="text-[#163A5C] font-semibold text-base leading-snug group-hover:text-[#2196D3] transition-colors">
        {title}
      </span>
    </div>
  );
}

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

  const openAskModal = (groupTitle: string, icon: React.ReactNode, color: string) => {
    setModalService({ title: groupTitle, icon, color });
  };

  return (
    <main className="pt-20 md:pt-32 pb-24 bg-[#F8FAFC] selection:bg-[#B8D430]/30 min-h-screen">
      {/* ═══ HERO ═══ */}
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

      {/* ═══ SECTION 1: БЕСПЛАТНЫЕ УСЛУГИ ═══ */}
      <section id="free-services" className="py-20 md:py-28 max-w-7xl mx-auto px-5">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
          {/* Left: Image placeholder */}
          <div className="w-full md:w-5/12 lg:w-5/12 shrink-0 sticky top-32">
            <PlaceholderImage
              icon={<HeartPulse />}
              color={COLORS.green}
              label="MIGO Free"
            />
          </div>

          {/* Right: Content */}
          <div className="w-full md:w-7/12 lg:w-7/12">
            {/* Badge + Title */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#27A15E]/10 text-[#27A15E] font-black uppercase tracking-[0.25em] text-[11px] mb-5">
              <span className="w-2 h-2 rounded-full bg-[#27A15E] animate-pulse"></span>
              <T path="services.free.badge">Бесплатно</T>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-4 leading-tight tracking-tight">
              <T path="services.free.title">Бесплатные услуги</T>
            </h2>

            <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              <T path="services.free.subtitle">Расскажем всё подробно по шагам: как зарегистрироваться, как получить — вместе пройдем этот путь, так что у вас не будет вопросов.</T>
            </p>

            {/* Services List */}
            <div className="bg-white rounded-[32px] border border-gray-100 p-6 md:p-8 shadow-sm mb-8">
              <ServiceItem
                icon={<Smartphone />}
                title={<T path="services.free.sim">SIM-карта — поможем подключить и настроить</T>}
                color={COLORS.green}
              />
              <div className="border-t border-gray-50 my-1" />
              <ServiceItem
                icon={<Fingerprint />}
                title={<T path="services.free.bio">Биометрия — расскажем, как и где сдать</T>}
                color={COLORS.green}
              />
              <div className="border-t border-gray-50 my-1" />
              <ServiceItem
                icon={<Globe />}
                title={<T path="services.free.gosuslugi">Госуслуги — регистрация и настройка аккаунта</T>}
                color={COLORS.green}
              />
              <div className="border-t border-gray-50 my-1" />
              <ServiceItem
                icon={<CreditCard />}
                title={<T path="services.free.bank">Банковская карта — подскажем, как оформить</T>}
                color={COLORS.green}
              />
              <div className="border-t border-gray-50 my-1" />
              <ServiceItem
                icon={<HelpCircle />}
                title={<T path="services.free.docs_help">Поможем с вашими документами — ответим на все вопросы</T>}
                color={COLORS.green}
              />
            </div>

            {/* CTA Button */}
            <button
              onClick={() => openAskModal(
                t('services.free.title', 'Бесплатные услуги'),
                <HeartPulse />,
                COLORS.green
              )}
              className="group inline-flex items-center gap-3 bg-[#27A15E] hover:bg-[#1F8A4E] text-white py-4 px-8 rounded-2xl font-bold text-base transition-all hover:shadow-[0_12px_28px_-6px_rgba(39,161,94,0.45)] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            >
              <MessageCircle size={20} />
              <T path="services.free.cta_btn">Задать вопрос</T>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: ПОДГОТОВКА ДОКУМЕНТОВ ═══ */}
      <section id="document-services" className="py-20 md:py-28 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-col md:flex-row-reverse gap-12 lg:gap-20 items-start">
            {/* Right: Image placeholder */}
            <div className="w-full md:w-5/12 lg:w-5/12 shrink-0 md:sticky md:top-32">
              <PlaceholderImage
                icon={<FileText />}
                color={COLORS.navy}
                label="MIGO Docs"
              />
            </div>

            {/* Left: Content */}
            <div className="w-full md:w-7/12 lg:w-7/12">
              {/* Badge + Title */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#163A5C]/10 text-[#163A5C] font-black uppercase tracking-[0.25em] text-[11px] mb-5">
                <span className="w-2 h-2 rounded-full bg-[#163A5C]"></span>
                <T path="services.docs.badge">Документы</T>
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-4 leading-tight tracking-tight">
                <T path="services.docs.title">Подготовка документов</T>
              </h2>

              <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                <T path="services.docs.subtitle">Сформируем правильный пакет документов, поможем пройти быстро по всем кабинетам. С нами вы не потеряете время, а значит сможете быстрее и больше заработать.</T>
              </p>

              {/* Services Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <ShieldCheck />, titlePath: 'services.docs.snils', fallback: 'СНИЛС — оформление и получение' },
                  { icon: <ClipboardList />, titlePath: 'services.docs.inn', fallback: 'ИНН — постановка на учёт' },
                  { icon: <Fingerprint />, titlePath: 'services.docs.dactyl', fallback: 'Дактилоскопия — запись и прохождение' },
                  { icon: <HeartPulse />, titlePath: 'services.docs.amma', fallback: 'Медкомиссия (Амина) — полное прохождение' },
                  { icon: <ShieldCheck />, titlePath: 'services.docs.green_card', fallback: 'Зелёная карта — подготовка документов' },
                  { icon: <Briefcase />, titlePath: 'services.docs.patent', fallback: 'Патент — полный пакет для оформления' },
                  { icon: <FileText />, titlePath: 'services.docs.passport_translation', fallback: 'Перевод паспорта — нотариальный перевод' },
                ].map((svc, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F8FAFC] rounded-[24px] p-5 border border-gray-100 hover:border-[#2196D3]/30 hover:shadow-lg transition-all duration-400 group"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${COLORS.navy}10`, color: COLORS.navy }}
                      >
                        {React.cloneElement(svc.icon as React.ReactElement<any>, { size: 20 })}
                      </div>
                      <p className="text-[#163A5C] font-semibold text-sm leading-snug pt-2 group-hover:text-[#2196D3] transition-colors">
                        <T path={svc.titlePath}>{svc.fallback}</T>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => openAskModal(
                    t('services.docs.title', 'Подготовка документов'),
                    <FileText />,
                    COLORS.navy
                  )}
                  className="group inline-flex items-center gap-3 bg-[#163A5C] hover:bg-[#0F2942] text-white py-4 px-8 rounded-2xl font-bold text-base transition-all hover:shadow-[0_12px_28px_-6px_rgba(22,58,92,0.45)] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
                >
                  <MessageCircle size={20} />
                  <T path="services.docs.cta_btn">Задать вопрос</T>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <Link
                  href={getBotUrl({ start: 'docs' })}
                  target="_blank"
                  className="group inline-flex items-center gap-3 bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] py-4 px-8 rounded-2xl font-bold text-base transition-all hover:shadow-[0_12px_28px_-6px_rgba(184,212,48,0.45)] hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <Send size={18} />
                  <T path="services.docs.cta_tg">Оформить в Telegram</T>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: ПОМОЖЕМ ═══ */}
      <section id="help-services" className="py-20 md:py-28 max-w-7xl mx-auto px-5">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
          {/* Left: Image placeholder */}
          <div className="w-full md:w-5/12 lg:w-5/12 shrink-0 md:sticky md:top-32">
            <PlaceholderImage
              icon={<Users />}
              color={COLORS.blue}
              label="MIGO Help"
            />
            {/* Trust badge below the image */}
            <div className="mt-6 bg-gradient-to-br from-[#163A5C] to-[#0F2942] rounded-[24px] p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2196D3] rounded-full blur-[60px] opacity-20"></div>
              <div className="relative z-10">
                <AlertTriangle size={24} className="text-[#F59E0B] mb-3" />
                <p className="text-sm font-bold leading-relaxed text-white/90">
                  <T path="services.help.warning">Подскажем каждый шаг, где вы рискуете, когда Вам нужно обновить документы. Избавим вас от ошибок, которые допускают многие, а затем получают ограничение и депортацию.</T>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full md:w-7/12 lg:w-7/12">
            {/* Badge + Title */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2196D3]/10 text-[#2196D3] font-black uppercase tracking-[0.25em] text-[11px] mb-5">
              <span className="w-2 h-2 rounded-full bg-[#2196D3] animate-pulse"></span>
              <T path="services.help.badge">Поддержка</T>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-4 leading-tight tracking-tight">
              <T path="services.help.title">Поможем</T>
            </h2>

            <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              <T path="services.help.subtitle">Мы рядом на каждом этапе. Подскажем, проверим, поможем — чтобы вы чувствовали себя уверенно.</T>
            </p>

            {/* Services */}
            <div className="space-y-4 mb-8">
              {[
                { icon: <Home />, titlePath: 'services.help.housing', fallback: 'Найти жильё — общежития, квартиры, хостелы' },
                { icon: <Briefcase />, titlePath: 'services.help.work', fallback: 'Найти официальную легальную работу' },
                { icon: <Plane />, titlePath: 'services.help.tickets', fallback: 'Купить авиабилеты — подберём лучшие варианты' },
                { icon: <Eye />, titlePath: 'services.help.check_docs', fallback: 'Проверим ваши документы на ошибки' },
                { icon: <Search />, titlePath: 'services.help.check_registry', fallback: 'Проверка в реестре контролируемых лиц' },
                { icon: <Ban />, titlePath: 'services.help.check_restrictions', fallback: 'Проверка ограничений на въезд или выезд' },
                { icon: <HelpCircle />, titlePath: 'services.help.complex', fallback: 'Подскажем, куда обратиться со сложной проблемой' },
              ].map((svc, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-[24px] p-5 border border-gray-100 hover:border-[#2196D3]/30 hover:shadow-lg transition-all duration-400 flex items-center gap-4"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: `${COLORS.blue}12`, color: COLORS.blue }}
                  >
                    {React.cloneElement(svc.icon as React.ReactElement<any>, { size: 22 })}
                  </div>
                  <p className="text-[#163A5C] font-semibold text-base leading-snug group-hover:text-[#2196D3] transition-colors">
                    <T path={svc.titlePath}>{svc.fallback}</T>
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => openAskModal(
                t('services.help.title', 'Поможем'),
                <Building />,
                COLORS.blue
              )}
              className="group inline-flex items-center gap-3 bg-[#2196D3] hover:bg-[#1A7FB8] text-white py-4 px-8 rounded-2xl font-bold text-base transition-all hover:shadow-[0_12px_28px_-6px_rgba(33,150,211,0.45)] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            >
              <MessageCircle size={20} />
              <T path="services.help.cta_btn">Задать вопрос</T>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS (steps) ═══ */}
      <section className="py-24 bg-white border-y border-gray-100 max-w-7xl mx-auto px-5">
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

      {/* ═══ FAQ ═══ */}
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
            <FAQItem
              question={<T path="services.faq.q5">Какие услуги бесплатные?</T>}
              answer={<T path="services.faq.a5">Мы бесплатно поможем с подключением SIM-карты, регистрацией на Госуслугах, оформлением банковской карты и биометрии. Также бесплатно проконсультируем по любым вопросам о ваших документах.</T>}
            />
            <FAQItem
              question={<T path="services.faq.q6">Можете ли вы проверить мои документы?</T>}
              answer={<T path="services.faq.a6">Да, мы проверим ваши документы на ошибки, проверим статус в реестре контролируемых лиц и наличие ограничений на въезд или выезд.</T>}
            />
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
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

/* ─── FAQ Item ─── */
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

/* ─── Users icon (imported separately to avoid conflict) ─── */
function Users(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}