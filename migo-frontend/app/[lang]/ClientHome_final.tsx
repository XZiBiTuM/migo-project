"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBotUrl } from '@/utils/bot';
import { getCategoryLabel } from '@/utils/news';
import { useLanguage, T } from '@/context/LanguageContext';
import {
  Briefcase,
  Home,
  FileText,
  Smartphone,
  MessageCircle,
  Search,
  CheckCircle2,
  ChevronRight,
  PlayCircle,
  ArrowRight,
  HeartPulse,
  Wallet,
  ShieldCheck,
  Zap,
  Users,
  Scale
} from 'lucide-react';
import ServiceModal from '@/components/ServiceModal';

const COLORS = {
  navy: '#163A5C',
  blue: '#2196D3',
  accent: '#B8D430',
  bg: '#F8FAFC',
  white: '#FFFFFF',
  glass: 'rgba(255, 255, 255, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.5)',
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

const TESTIMONIALS = [
  {
    id: 1,
    text: "«Приехал из Ташкента, ничего не знал. Ребята из MIGO помогли с патентом, нашли приличное общежитие и устроили на склад крупного маркетплейса. Всё честно, выплаты вовремя. Спасибо!»",
    author: "Азиз Ходжаев",
    info: "Работает 1.5 года в Москве",
    avatar: "👨🏻"
  },
  {
    id: 2,
    text: "«Очень доволен поддержкой. Помогли с переводом документов и оформлением страховки. Всегда на связи в Telegram, отвечают быстро и по делу. Рекомендую всем соотечественникам.»",
    author: "Сардор Мирзоев",
    info: "Строитель, Санкт-Петербург",
    avatar: "🧔🏻"
  },
  {
    id: 3,
    text: "«MIGO — это прежде всего безопасность. Мне нашли работу рядом с домом, помогли с регистрацией. Теперь я спокоен за свое будущее и могу помогать семье.»",
    author: "Фарход Назаров",
    info: "Курьер, Екатеринбург",
    avatar: "👨🏽"
  },
  {
    id: 4,
    text: "«Раньше боялся обмана, но с MIGO все официально. Заключили договор, зарплата приходит вовремя. Если есть вопросы по законам — юрист всегда помогает бесплатно.»",
    author: "Нурдин Осмонов",
    info: "Сборщик, Казань",
    avatar: "👨🏽‍🦱"
  },
  {
    id: 5,
    text: "«Отличный сервис. Не пришлось самому бегать по инстанциям, всё подсказали. Уже перевез семью, планируем дальше работать.»",
    author: "Бекз�        <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden px-5 pt-32 pb-20 md:pt-0 md:pb-0">
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 right-0 w-full h-full md:w-3/4 md:h-3/4 opacity-20 md:opacity-40">
               <img src="/illustrations/hero.png" alt="" className="w-full h-full object-contain object-right-bottom" />
            </div>
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#2196D3]/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#B8D430]/10 rounded-full blur-[100px]"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mt-0 md:mt-16 flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/80 shadow-sm mb-8">
                <span className="w-2 h-2 rounded-full bg-[#B8D430]"></span>
                <p className="text-xs md:text-sm font-bold text-[#163A5C] uppercase tracking-[0.2em]"><T path="home.hero.badge">Ваш проводник в России</T></p>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-[#163A5C] leading-[1.05] mb-8 max-w-5xl tracking-tight">
                <T path="home.hero.title_1">Работа и жизнь</T><br /><T path="home.hero.title_2">в РФ</T><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2196D3] to-[#163A5C]"><T path="home.hero.title_highlight">без лишних хлопот</T></span>
              </h1>

              <p className="text-lg md:text-2xl text-gray-600 mb-12 max-w-2xl leading-relaxed">
                <T path="home.hero.subtitle">Помогаем гражданам СНГ с легальным трудоустройством, жильем и документами. Официально, быстро и с поддержкой 24/7.</T>
              </p>

              <div className="grid grid-cols-1 sm:flex gap-4 w-full sm:w-auto">
                <Link href={`/${langPath}/work`} className="group bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] py-4 px-10 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-[0_10px_20px_-5px_rgba(184,212,48,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_15px_25px_-5px_rgba(184,212,48,0.5)] active:scale-95">
                  <Briefcase className="w-6 h-6" /> <T path="home.hero.btn_work">Найти работу</T>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href={`/${langPath}/services`} className="bg-white hover:bg-gray-50 text-[#163A5C] py-4 px-10 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-all hover:-translate-y-1 border border-gray-100 active:scale-95">
                  <FileText className="w-6 h-6" /> <T path="home.hero.btn_services">Услуги</T>
                </Link>
                <Link href={getBotUrl({ start: 'help' })} target="_blank" className="bg-[#163A5C] hover:bg-[#0F2942] text-white py-4 px-10 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-all hover:-translate-y-1 active:scale-95">
                  <MessageCircle className="w-6 h-6" /> <T path="mobile_nav.telegram">Telegram</T>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/4 h-full bg-[#F8FAFC] rounded-l-[100px] -mr-20 z-0"></div>
          <div className="max-w-7xl mx-auto px-5 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2196D3]/10 text-[#2196D3] font-bold uppercase tracking-widest text-xs mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#2196D3] animate-pulse"></span>
                  <T path="home.about_section.badge">О проекте MIGO</T>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-8 leading-tight">
                  <T path="home.about_section.title">Больше, чем просто</T> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2196D3] to-[#B8D430]"><T path="home.about_section.title_highlight">сервис</T></span>
                </h2>
                <div className="space-y-6 text-lg text-gray-500 leading-relaxed">
                  <p>
                    <strong>MIGO</strong> <T path="home.about_section.desc_1">— это экосистема поддержки иностранных граждан в России. Мы создали платформу, которая объединяет все необходимые услуги для комфортной жизни и легальной работы в одном месте.</T>
                  </p>
                  <p>
                    <T path="home.about_section.desc_2">Наша миссия — избавить вас от бюрократии, очередей и рисков нарваться на мошенников. Мы перевели сложные процессы на понятный язык и автоматизировали их через удобный Telegram-бот.</T>
                  </p>
                </div>
                <div className="mt-10 grid grid-cols-3 gap-6">
                  <div className="flex flex-col">
                    <span className="text-3xl md:text-4xl font-black text-[#B8D430]">24/7</span>
                    <span className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-wider"><T path="home.about_section.stat_support">Поддержка</T></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl md:text-4xl font-black text-[#2196D3]">100%</span>
                    <span className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-wider"><T path="home.about_section.stat_legal">Легально</T></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl md:text-4xl font-black text-[#163A5C]">1 клик</span>
                    <span className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-wider"><T path="home.about_section.stat_click">В Telegram</T></span>
                  </div>
                </div>
              </div>

              <div className="relative h-full min-h-[400px] w-full rounded-[48px] overflow-hidden shadow-2xl group flex items-center justify-center bg-gray-50">
                <img src="/illustrations/ecosystem.png" alt="MIGO Ecosystem" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#163A5C]/80 to-transparent flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-opacity">
                   <h3 className="text-white text-2xl font-black mb-2"><T path="home.about_section.reliable_title">С нами надежнее</T></h3>
                   <p className="text-white/80 text-sm"><T path="home.about_section.reliable_desc">Мы работаем только с официальными ведомствами и проверенными работодателями.</T></p>
                </div>
              </div>
            </div>
          </div>
        </section>
/T></span>
                  </div>
                </div>
              </div>

              <div className="relative h-full min-h-[400px] w-full bg-gradient-to-br from-[#163A5C] to-[#0F2942] rounded-[48px] p-10 text-white flex flex-col justify-center overflow-hidden shadow-2xl group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#2196D3] rounded-full blur-[100px] opacity-30 transition-opacity group-hover:opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B8D430] rounded-full blur-[100px] opacity-20 transition-opacity group-hover:opacity-40"></div>

                <div className="relative z-10 flex flex-col items-center">
                  <ShieldCheck className="text-[#B8D430] w-16 h-16 mb-8" />
                  <h3 className="text-3xl font-black mb-6 text-center"><T path="home.about_section.reliable_title">С нами надежнее</T></h3>
                  <p className="text-lg text-white/70 leading-relaxed text-center">
                    <T path="home.about_section.reliable_desc">Мы работаем только с официальными ведомствами, проверенными работодателями и надежными арендодателями. Вы можете быть уверены в завтрашнем дне.</T>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 max-w-7xl mx-auto px-5">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-4"><T path="home.services_section.title">Наши сервисы</T></h2>
              <p className="text-gray-500 text-lg"><T path="home.services_section.subtitle">Комплексная поддержка на каждом этапе вашей жизни и работы в новой стране.</T></p>
            </div>
            <Link href={`/${langPath}/services`} className="px-6 py-3 rounded-xl bg-white border border-gray-200 font-bold text-[#163A5C] hover:border-[#2196D3] hover:text-[#2196D3] transition-all flex items-center gap-2 shadow-sm">
              <T path="home.services_section.all_services">Все услуги</T> <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
            <ServiceCard title={<T path="home.services_section.find_work">Найти работу</T>} icon={<Briefcase />} color={COLORS.accent} href={`/${langPath}/work`} delay={0} />
            <ServiceCard title={<T path="home.services_section.housing">Жильё</T>} icon={<Home />} color={COLORS.blue} href={`/${langPath}/housing`} delay={80} />

            {initialServices && initialServices.slice(0, 2).map((service, idx) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                icon={getServiceIcon(service.service_type)}
                color={getServiceColor(service.service_type)}
                delay={(idx + 2) * 80}
                href={`/${langPath}/services/${service.slug}`}
              />
            ))}
          </div>
        </section>

        <section className="py-24 bg-white border-y border-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(33,150,211,0.06)_0%,transparent_60%)]"></div>

          <div className="max-w-7xl mx-auto px-5 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-6"><T path="home.steps.title">4 шага к успеху с MIGO</T></h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto"><T path="home.steps.subtitle">Мы сделали процесс максимально простым и прозрачным, чтобы вы могли сосредоточиться на главном.</T></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
              {[
                { step: '01', title: <T path="home.steps.step1_title">Заявка</T>, desc: <T path="home.steps.step1_desc">Оставьте запрос в Telegram за 1 минуту</T>, icon: <MessageCircle /> },
                { step: '02', title: <T path="home.steps.step2_title">Подбор</T>, desc: <T path="home.steps.step2_desc">Найдем лучшие варианты под ваши критерии</T>, icon: <Search /> },
                { step: '03', title: <T path="home.steps.step3_title">Оформление</T>, desc: <T path="home.steps.step3_desc">Поможем со всеми документами официально</T>, icon: <ShieldCheck /> },
                { step: '04', title: <T path="home.steps.step4_title">Старт</T>, desc: <T path="home.steps.step4_desc">Начинайте работать и жить спокойно</T>, icon: <Zap /> },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group relative pt-4">
                  <div className="w-20 h-20 rounded-3xl bg-white border border-gray-100 shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2196D3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="text-[#2196D3] group-hover:scale-110 transition-transform">
                      {React.cloneElement(item.icon, { size: 32 })}
                    </div>
                  </div>
                  <div className="absolute -top-4 text-6xl font-black text-gray-200 select-none -z-10 group-hover:text-[#2196D3]/50 transition-colors">{item.step}</div>
                  <h3 className="text-xl font-bold text-[#163A5C] mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 max-w-7xl mx-auto px-5">
          <div className="bg-[#163A5C] rounded-[40px] p-8 md:p-20 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,#2196D380_0%,transparent_50%)] opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B8D430] rounded-full blur-[100px] opacity-10"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-white">
                <div className="inline-flex items-center gap-2 text-[#B8D430] mb-6 font-bold uppercase tracking-widest text-sm">
                  <ShieldCheck size={20} /> <T path="home.trust.badge">Почему нам доверяют</T>
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight"><T path="home.trust.title">MIGO — ваш надежный партнер в РФ</T></h2>

                <div className="space-y-8">
                  <TrustFeature
                    title={<T path="home.trust.feature1_title">Всё на родном языке</T>}
                    desc={<T path="home.trust.feature1_desc">Объясняем тонкости законодательства максимально просто и понятно.</T>}
                  />
                  <TrustFeature
                    title={<T path="home.trust.feature2_title">Юридическая защита</T>}
                    desc={<T path="home.trust.feature2_desc">Работаем только с проверенными работодателями и официальными документами.</T>}
                  />
                  <TrustFeature
                    title={<T path="home.trust.feature3_title">Всегда на связи</T>}
                    desc={<T path="home.trust.feature3_desc">Ваш личный менеджер в Telegram готов ответить на любой вопрос в любое время.</T>}
                  />
                </div>
              </div>

              <div className="flex-1 w-full relative">
                <div className="relative h-[550px] sm:h-[450px] md:h-[500px] lg:h-[420px] w-full perspective-[1500px]">
                  {TESTIMONIALS.map((t_item, idx) => {
                    const isActive = idx === activeTestimonial;
                    const diff = (idx - activeTestimonial + TESTIMONIALS.length) % TESTIMONIALS.length;

                    let styleClass = "opacity-0 translate-x-full pointer-events-none z-0";
                    let interactiveClass = "";

                    if (isActive) {
                      styleClass = "opacity-100 translate-x-0 z-20 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]";
                      interactiveClass = "pointer-events-auto cursor-default";
                    } else if (diff === TESTIMONIALS.length - 1) {
                      styleClass = "opacity-0 -translate-x-full z-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]";
                      interactiveClass = "pointer-events-none";
                    }

                    return (
                      <div
                        key={t_item.id}
                        className={`absolute inset-0 will-change-transform ${styleClass} ${interactiveClass}`}
                        style={{ transformOrigin: 'center' }}
                      >
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-[40px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] h-full flex flex-col justify-between overflow-hidden relative">
                          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

                          <div>
                            <div className="w-14 h-14 bg-[#B8D430] rounded-[20px] flex items-center justify-center text-3xl shadow-[0_15px_30px_-5px_rgba(184,212,48,0.4)] mb-6 transform -rotate-6">“</div>
                            <p className="text-base md:text-lg text-white font-medium italic leading-relaxed mb-6">
                              {t(`home.testimonials.t${t_item.id}_text`, t_item.text)}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 mt-auto border-t border-white/10 pt-6">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2196D3] to-[#163A5C] flex items-center justify-center text-xl border-2 border-white/20 shadow-lg shrink-0">
                              {t_item.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-black text-base truncate">{t(`home.testimonials.t${t_item.id}_author`, t_item.author)}</h4>
                              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-0.5 line-clamp-1 break-words">{t(`home.testimonials.t${t_item.id}_info`, t_item.info)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-center gap-3 mt-10 relative z-40">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      className={`h-2 rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${idx === activeTestimonial
                        ? 'w-14 bg-[#B8D430] shadow-[0_0_15px_rgba(184,212,48,0.6)]'
                        : 'w-2 bg-white/20 hover:bg-white/50'
                        }`}
                      aria-label={`Show testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-5">
            <div className="bg-[#F8FAFC] rounded-[48px] p-8 md:p-16 border border-gray-100 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-sm">
              <div className="flex-1 max-w-2xl relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-[#2196D3] font-bold uppercase tracking-widest text-xs mb-6 shadow-sm">
                  <Scale size={16} /> <T path="home.legal_aid.badge">Бесплатно</T>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-6 tracking-tight">
                  <T path="home.legal_aid.title">Правовая помощь</T> <span className="text-[#2196D3]"><T path="home.legal_aid.title_highlight">каждому</T></span>
                </h2>
                <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-8">
                  <T path="home.legal_aid.desc">Мы предоставляем бесплатные юридические консультации для граждан СНГ. Поможем разобраться с документами, патентами и защитим ваши права при трудоустройстве.</T>
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={getBotUrl({ start: 'law', source: 'home_aid' })} target="_blank" className="bg-[#163A5C] hover:bg-[#0F2942] text-white py-4 px-8 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:shadow-lg active:scale-95">
                    <MessageCircle size={20} /> <T path="home.legal_aid.btn">Задать вопрос юристу</T>
                  </Link>
                </div>
              </div>

              <div className="hidden md:flex flex-1 justify-end relative z-10">
                <div className="w-72 h-72 bg-gradient-to-br from-[#2196D3]/20 to-[#B8D430]/20 rounded-[40px] rotate-6 flex items-center justify-center border border-white/50 backdrop-blur-xl shadow-2xl relative">
                  <div className="absolute inset-0 border border-white/60 rounded-[40px] -rotate-12 transition-transform hover:rotate-0 duration-500"></div>
                  <Scale size={120} className="text-[#163A5C]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 max-w-7xl mx-auto px-5">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-[#163A5C]"><T path="home.news_section.title">Важное и полезное</T></h2>
            <Link href={`/${langPath}/news`} className="text-[#2196D3] font-bold hover:underline flex items-center gap-1">
              <T path="home.news_section.all_articles">Все статьи</T> <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initialNews && initialNews.length > 0 ? (
              initialNews.map((item: any, idx: number) => (
                <NewsCard
                  key={item.id}
                  tag={getCategoryLabel(item.category)}
                  title={item.title}
                  slug={item.slug}
                  date={new Date(item.published_at || item.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                  delay={idx * 150}
                  langPath={langPath}
                />
              ))
            ) : (
              <div className="col-span-3 bg-white p-20 rounded-[32px] text-center border border-gray-100 italic text-gray-400">
                <T path="home.news_section.no_news">Новостей пока нет, но скоро здесь будет много полезного!</T>
              </div>
            )}
          </div>
        </section>

        <section className="py-20 max-w-7xl mx-auto px-5">
          <div className="bg-gradient-to-br from-[#163A5C] via-[#1A4B75] to-[#2196D3] rounded-[48px] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-6xl font-black text-white mb-8"><T path="home.cta.title">Готовы начать новую жизнь в России?</T></h2>
              <p className="text-white/80 text-xl md:text-2xl mb-12 leading-relaxed">
                <T path="home.cta.subtitle">Не откладывайте на завтра. Бесплатная консультация в Telegram уже ждет вас.</T>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={getBotUrl({ source: 'home_cta' })} target="_blank" className="bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] py-5 px-12 rounded-[24px] font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-2xl">
                  <MessageCircle size={28} /> <T path="home.cta.btn_write">Написать нам</T>
                </Link>
                <Link href={`/${langPath}/services`} className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white py-5 px-12 rounded-[24px] font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-105">
                  <T path="home.cta.btn_services">Выбрать услуги</T>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
    </>
  );
}

function ServiceCard({ title, icon, color, large, href, onClick, delay }: any) {
  const content = (
    <div
      onClick={onClick}
      style={{ '--delay': `${delay}ms` } as React.CSSProperties}
      className={`group h-full bg-white rounded-[24px] p-6 border border-gray-100 hover:border-[#2196D3] hover:shadow-[0_20px_40px_-15px_rgba(33,150,211,0.2)] transition-all duration-500 cursor-pointer flex flex-col transform hover:-translate-y-2 animate-fade-in-up`}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:rotate-6 shadow-sm"
        style={{ backgroundColor: `${color}15`, color: color }}
      >
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <h3 className="font-black text-[#163A5C] group-hover:text-[#2196D3] transition-colors text-base mb-2">
        {title}
      </h3>
      <div className="mt-auto flex items-center gap-2 text-sm font-bold text-gray-300 group-hover:text-[#2196D3] transition-all">
        <T path="home.services_section.more">Подробнее</T> <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
      </div>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

function TrustFeature({ title, desc }: any) {
  return (
    <div className="flex gap-5 group">
      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1 shadow-lg group-hover:bg-[#B8D430] group-hover:text-[#163A5C] transition-all duration-300">
        <CheckCircle2 size={24} />
      </div>
      <div>
        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#B8D430] transition-colors">{title}</h4>
        <p className="text-white/80 leading-relaxed text-sm md:text-base">{desc}</p>
      </div>
    </div>
  );
}

function NewsCard({ tag, title, slug, date, delay, langPath }: any) {
  return (
    <Link
      href={`/${langPath}/news/${slug}`}
      style={{ '--delay': `${delay}ms` } as React.CSSProperties}
      className="bg-white rounded-[32px] p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 group flex flex-col hover:-translate-y-2 animate-fade-in-up"
    >
      <div className="flex justify-between items-center mb-6">
        <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#2196D3] bg-[#2196D3]/10">{tag}</span>
        <span className="text-xs font-bold text-gray-500">{date}</span>
      </div>
      <h3 className="font-extrabold text-[#163A5C] text-xl leading-tight group-hover:text-[#2196D3] transition-colors mb-8 line-clamp-3">
        {title}
      </h3>
      <div className="mt-auto flex items-center text-[#2196D3] font-black gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <T path="home.news_section.read_full">Читать полностью</T> <ArrowRight size={18} />
      </div>
    </Link>
  );
}

