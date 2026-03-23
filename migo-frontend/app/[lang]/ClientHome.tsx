"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Scale,
  XCircle,
  Pin,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  Info,
  Lock,
  Check,
  MessageSquare
} from 'lucide-react';
import ServiceModal from '@/components/ServiceModal';

const COLORS = {
  navy: '#1E58B1',
  textNavy: '#163A5C',
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
    avatar: "/images/avatar_1.webp"
  },
  {
    id: 2,
    text: "«Очень доволен поддержкой. Помогли с переводом документов и оформлением страховки. Всегда на связи в Telegram, отвечают быстро и по делу. Рекомендую всем соотечественникам.»",
    author: "Сардор Мирзоев",
    info: "Строитель, Санкт-Петербург",
    avatar: "/images/avatar_2.webp"
  },
  {
    id: 3,
    text: "«MIGO — это прежде всего безопасность. Мне нашли работу рядом с домом, помогли с регистрацией. Теперь я спокоен за свое будущее и могу помогать семье.»",
    author: "Фарход Назаров",
    info: "Курьер, Екатеринбург",
    avatar: "/images/avatar_3.webp"
  },
  {
    id: 4,
    text: "«Раньше боялся обмана, но с MIGO все официально. Заключили договор, зарплата приходит вовремя. Если есть вопросы по законам — юрист всегда помогает бесплатно.»",
    author: "Нурдин Осмонов",
    info: "Сборщик, Казань",
    avatar: "/images/avatar_4.webp"
  },
  {
    id: 5,
    text: "«Отличный сервис. Не пришлось самому бегать по инстанциям, всё подсказали. Уже перевез семью, планируем дальше работать.»",
    author: "Бекзод Алиев",
    info: "Водитель автобуса, Москва",
    avatar: "/images/avatar_5.webp"
  }
];

export default function ClientHome({ initialNews, initialServices }: { initialNews: any[], initialServices: any[] }) {
  const { language, t } = useLanguage();
  const langPath = language.toLowerCase();

  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main className="pb-24 bg-[#F8FAFC] selection:bg-[#B8D430]/30">

        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-5 pt-32 pb-20 md:pt-0 md:pb-0">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#2196D3]/15 rounded-full blur-[140px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#B8D430]/10 rounded-full blur-[120px]"></div>
            <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-white rounded-full blur-[100px] opacity-40"></div>
            <div className="absolute inset-0 bg-white/30"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-6">
                <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-sm mb-8 animate-bounce-slow max-w-full">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B8D430] shadow-[0_0_10px_#B8D430] shrink-0"></span>
                  <p className="text-[10px] md:text-sm font-black text-[#1E58B1] uppercase tracking-[0.15em] truncate"><T path="home.hero.badge">Ваш проводник в России</T></p>
                </div>

                <div className="mb-6 overflow-hidden">
                  <p className="text-[#2196D3] font-black text-sm md:text-xl uppercase tracking-wider md:tracking-[0.4em] mb-4 opacity-80 whitespace-nowrap md:whitespace-normal">
                    <T path="home.hero.tagline">Надежно • Понятно • Полезно</T>
                  </p>
                </div>

                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-[#163A5C] leading-[0.95] mb-8 tracking-tighter">
                  <T path="home.hero.title_1">Работа и жизнь</T><br />
                  <span className="text-transparent w-full inline-block bg-clip-text bg-gradient-to-r from-[#1E58B1] to-[#2196D3]"><T path="home.hero.title_2">в России</T></span>
                </h1>

                <p className="text-lg md:text-2xl text-gray-700/80 mb-12 max-w-2xl leading-relaxed font-medium">
                  <T path="home.hero.subtitle">Помогаем гражданам СНГ с легальным трудоустройством, жильем и документами. Официально, надежно и всегда на связи.</T>
                </p>

                <div className="grid grid-cols-1 sm:flex gap-4 w-full sm:w-auto">
                  <Link href={`/${langPath}/work`} className="group bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] py-5 px-10 rounded-[32px] font-black text-lg flex items-center justify-center gap-3 shadow-[0_15px_30px_-5px_rgba(184,212,48,0.5)] transition-all hover:scale-105 active:scale-95">
                    <Briefcase className="w-6 h-6" /> <T path="home.hero.btn_work">Найти работу</T>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                  <Link href={getBotUrl({ start: 'help' })} target="_blank" className="bg-white hover:bg-gray-50 text-[#1E58B1] py-5 px-10 rounded-[32px] font-black text-lg flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-105 border border-gray-100 active:scale-95">
                    <MessageCircle className="w-6 h-6" /> <T path="mobile_nav.telegram">Telegram Поддержка</T>
                  </Link>
                </div>
              </div>

              <div className="relative group perspective-[2000px] lg:col-span-6 mt-0 lg:mt-8 md:mt-4">
                <div className="relative z-10 animate-float">
                  <Image
                    src="/images/hero.webp"
                    alt="MIGO Главное изображение"
                    width={800}
                    height={800}
                    className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] rounded-[64px]"
                    priority
                  />

                  <div className="hidden absolute top-10 -left-10 w-24 h-24 bg-white rounded-3xl shadow-2xl lg:flex items-center justify-center text-[#B8D430] animate-bounce-slow border border-gray-100/50 backdrop-blur-sm bg-white/80">
                    <ShieldCheck size={48} />
                  </div>
                  <div className="hidden absolute bottom-20 -right-5 w-20 h-20 bg-[#2196D3] rounded-2xl shadow-2xl lg:flex items-center justify-center text-white animate-float-delayed">
                    <CheckCircle2 size={40} />
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-[#2196D3]/10 to-transparent rounded-full -z-10 blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/4 h-full bg-[#F8FAFC] rounded-l-[100px] -mr-20 z-0"></div>
          <div className="max-w-7xl mx-auto px-5 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="pt-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2196D3]/10 text-[#2196D3] font-bold uppercase tracking-widest text-[10px] mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#2196D3] animate-pulse"></span>
                  <T path="home.about_section.badge">О проекте MIGO</T>
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-[#163A5C] mb-8 leading-tight">
                  <T path="home.about_section.title">Больше, чем просто</T> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2196D3] to-[#B8D430]"><T path="home.about_section.title_highlight">сервис</T></span>
                </h2>
                <div className="space-y-6 text-base text-gray-700 leading-relaxed max-w-lg">
                  <p>
                    <strong>MIGO</strong> <T path="home.about_section.desc_1">— это экосистема поддержки иностранных граждан в России. Мы создали платформу, которая объединяет все необходимые услуги для комфортной жизни и легальной работы в одном месте.</T>
                  </p>
                  <p>
                    <T path="home.about_section.desc_2">Наша миссия — избавить вас от бюрократии, очередей и рисков нарваться на мошенников. Мы перевели сложные процессы на понятный язык и автоматизировали их через удобный Telegram-бот.</T>
                  </p>
                </div>
                <div className="mt-16 grid grid-cols-3 gap-6">
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-3xl font-black text-[#B8D430]">24/7</span>
                    <span className="text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-wider"><T path="home.about_section.stat_support">Поддержка</T></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-3xl font-black text-[#2196D3]">100%</span>
                    <span className="text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-wider"><T path="home.about_section.stat_legal">Легально</T></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-3xl font-black text-[#163A5C]"><T path="home.about_section.stat_click">1 клик</T></span>
                    <span className="text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-wider"><T path="home.about_section.stat_telegram">В Telegram</T></span>
                  </div>
                </div>
              </div>

              <div className="relative h-full min-h-[450px] w-full rounded-[48px] overflow-hidden shadow-2xl group">
                <Image
                  src="/images/about.webp"
                  alt={t('home.about_section.alt_image', 'MIGO Ecosystem')}
                  width={800}
                  height={600}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E58B1]/40 to-transparent"></div>
                <div className="absolute bottom-10 left-10 z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl">
                    <ShieldCheck size={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 max-w-7xl mx-auto px-5 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-br from-[#2196D3]/5 to-[#B8D430]/5 rounded-full blur-[120px] -z-10"></div>

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E58B1]/5 text-[#1E58B1] font-bold uppercase tracking-widest text-[10px] mb-6 border border-[#1E58B1]/10">
              <Zap size={14} className="animate-pulse" /> <T path="home.services_section.title">Наши сервисы</T>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#163A5C] mb-6 tracking-tight">
              <T path="home.services_section.subtitle">Всё, что нужно для жизни в России</T>
            </h2>
          </div>

          <div className="bg-white/40 backdrop-blur-xl border border-white/80 rounded-[56px] p-8 md:p-16 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#2196D3]/10 to-transparent rounded-full -mr-32 -mt-32"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 mb-16">
              {[
                { title: <T path="home.services_section.find_work">Найти работу</T>, icon: <Briefcase />, href: `/${langPath}/work` },
                { title: <T path="home.services_section.housing">Жильё</T>, icon: <Home />, href: `/${langPath}/housing` },
                ...(initialServices || []).map(s => ({
                  title: s.title,
                  icon: getServiceIcon(s.service_type),
                  href: `/${langPath}/services/${s.slug}`
                }))
              ].map((service, idx) => (
                <Link
                  key={idx}
                  href={service.href}
                  className="flex items-center gap-5 p-2 rounded-2xl hover:translate-x-2 transition-all group/item"
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#2196D3] group-hover/item:bg-[#2196D3] group-hover/item:text-white group-hover/item:shadow-[0_10px_20px_-5px_rgba(33,150,211,0.4)] transition-all duration-300">
                    {React.cloneElement(service.icon as React.ReactElement<any>, { size: 22 })}
                  </div>
                  <span className="font-bold text-[#163A5C] text-lg md:text-xl tracking-tight group-hover/item:text-[#2196D3] transition-colors">{service.title}</span>
                </Link>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10 border-t border-gray-100/50">
              <Link
                href={getBotUrl({ source: 'home_services', start: 'services' })}
                target="_blank"
                className="w-full sm:w-auto px-10 py-5 rounded-[24px] bg-[#2196D3] text-white font-black text-lg flex items-center justify-center gap-3 shadow-[0_15px_30px_-5px_rgba(33,150,211,0.4)] hover:-translate-y-1 transition-all active:scale-95"
              >
                <MessageCircle size={24} /> <T path="home.services_section.tg_btn">Узнать подробнее в Телеграм</T>
              </Link>
              <Link
                href={`/${langPath}/services`}
                className="w-full sm:w-auto px-10 py-5 rounded-[24px] bg-white border border-gray-200 text-[#163A5C] font-black text-lg flex items-center justify-center gap-2 hover:border-[#2196D3] hover:text-[#2196D3] transition-all shadow-sm"
              >
                <T path="home.services_section.all_services">Все услуги</T> <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white border-y border-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-[#F8FAFC] to-transparent pointer-events-none"></div>
          <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] bg-[#1E58B1]/5 rounded-full blur-[120px] opacity-40"></div>
          <div className="absolute bottom-[20%] left-[5%] w-[700px] h-[700px] bg-[#B8D430]/5 rounded-full blur-[140px] opacity-30"></div>

          <div className="max-w-7xl mx-auto px-5 relative z-10">
            <div className="text-center mb-20 max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-50 text-red-500 font-black uppercase tracking-[0.25em] text-[10px] mb-8 shadow-sm border border-red-100/50">
                <AlertCircle size={14} className="animate-pulse" /> <T path="home.path_section.problem_badge">Проблема мигранта</T>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-[#163A5C] mb-10 leading-[0.85] tracking-tighter">
                <T path="home.path_section.title">Путь мигранта: <br className="hidden md:block" />как это бывает на самом деле</T>
              </h2>
              <p className="text-gray-700/80 text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto mb-16 leading-relaxed font-medium">
                <T path="home.path_section.subtitle">Каждый человек, который приезжает в Россию на заработки, проходит через один и тот же путь. И почти всегда этот путь — хаотичный, дорогой и опасный.</T>
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="px-8 py-5 rounded-[32px] bg-white/80 backdrop-blur-xl border border-gray-100 flex items-center gap-5 text-sm md:text-xl font-black text-[#163A5C] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.12)] transition-all cursor-default group hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-2xl bg-[#2196D3]/10 flex items-center justify-center text-[#2196D3] group-hover:scale-110 group-hover:bg-[#2196D3] group-hover:text-white transition-all duration-500 shadow-sm">
                      <Pin size={24} className="group-hover:rotate-45 transition-transform" />
                    </div>
                    <T path={`home.path_section.problem_${i}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-32 items-stretch">

              <div className="relative group flex h-full">
                <div className="absolute -inset-4 bg-gradient-to-br from-red-50/50 to-transparent rounded-[72px] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>

                <div className="relative w-full bg-[#FCFBFB] rounded-[64px] p-8 md:p-14 border border-gray-100 shadow-[30px_50px_100px_-40px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-1000 hover:shadow-[40px_60px_120px_-30px_rgba(0,0,0,0.15)] flex flex-col items-stretch">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_center,#ef444408_0%,transparent_70%)] -mr-48 -mt-48 pointer-events-none"></div>
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                  <div className="flex items-start gap-6 mb-16 relative z-10">
                    <div className="w-20 h-20 rounded-[28px] bg-red-50 flex items-center justify-center text-red-500 shadow-sm border border-red-100/50 group-hover:rotate-6 transition-transform duration-700">
                      <TrendingDown size={40} />
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-black text-[#163A5C] tracking-tighter leading-[0.9] uppercase max-w-[200px]">
                        <T path="home.path_section.without_migo.title">ПУТЬ БЕЗ MIGO</T>
                      </h3>
                      <p className="text-red-400 font-bold text-xs uppercase tracking-[0.3em] mt-3 flex items-center gap-2">
                        <AlertCircle size={14} className="animate-pulse" /> Хаос и риски
                      </p>
                    </div>
                  </div>

                  <div className="relative flex-1">
                    <div className="absolute left-[13px] top-8 bottom-8 w-[2px] border-l-2 border-dashed border-red-200/50 z-0"></div>

                    <div className="space-y-12 relative z-10">
                      {[1, 2, 3, 4, 5, 6].map(idx => (
                        <div key={idx} className="flex gap-8 group/item translate-x-0 hover:translate-x-3 transition-all duration-500">
                          <div className="w-7 h-7 rounded-full bg-white border-4 border-red-100 shadow-md flex items-center justify-center shrink-0 mt-1.5 group-hover/item:bg-red-500 group-hover/item:border-red-200 transition-all duration-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-300 group-hover/item:bg-white scale-100 group-hover/item:scale-0 transition-transform"></div>
                          </div>
                          <div>
                            <h4 className="font-black text-[#163A5C] mb-3 text-2xl tracking-tight leading-tight group-hover/item:text-red-600 transition-colors"><T path={`home.path_section.without_migo.step${idx}_title`} /></h4>
                            <p className="text-gray-700/80 leading-relaxed font-medium text-lg max-w-sm"><T path={`home.path_section.without_migo.step${idx}_desc`} /></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-20 bg-red-50/50 backdrop-blur-xl rounded-[40px] p-10 border border-red-100 shadow-sm relative overflow-hidden group/result">
                    <div className="absolute top-0 right-0 p-6 opacity-5 translate-x-4 -translate-y-4 group-hover/result:translate-x-0 group-hover/result:translate-y-0 transition-transform duration-700">
                      <XCircle size={120} />
                    </div>
                    <div className="flex items-center gap-3 text-red-600 font-black mb-5 uppercase tracking-[0.3em] text-[11px] relative z-10">
                      <XCircle size={22} /> <T path="home.path_section.without_migo.step_result_title">Итог</T>
                    </div>
                    <p className="font-black text-[#163A5C] text-2xl md:text-3xl leading-tight relative z-10 tracking-tight">
                      <T path="home.path_section.without_migo.step_result_desc" />
                    </p>
                  </div>

                  <div className="mt-14 rounded-[48px] overflow-hidden border border-gray-100 shadow-2xl grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 group-hover:scale-[1.02]">
                    <Image src="/images/path_without_migo.webp" alt="Путь без MIGO" width={600} height={400} className="w-full h-auto object-cover" />
                  </div>
                </div>
              </div>

              <div className="relative group flex h-full">
                <div className="absolute -inset-6 bg-gradient-to-br from-[#2196D3]/20 to-[#B8D430]/20 rounded-[80px] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>

                <div className="relative w-full bg-white rounded-[64px] p-8 md:p-14 border border-[#2196D3]/10 shadow-[40px_70px_120px_-40px_rgba(33,150,211,0.2)] overflow-hidden transition-all duration-1000 hover:shadow-[50px_80px_140px_-30px_rgba(33,150,211,0.25)] flex flex-col items-stretch">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_center,#B8D43020_0%,transparent_70%)] -mr-48 -mt-48 pointer-events-none"></div>
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1E58B1 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>

                  <div className="flex items-start gap-6 mb-16 relative z-10">
                    <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-[#2196D3] to-[#1E58B1] flex items-center justify-center text-white shadow-[0_20px_50px_-10px_rgba(33,150,211,0.5)] animate-float-slow">
                      <TrendingUp size={40} />
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-black text-[#1E58B1] tracking-tighter leading-[0.9] uppercase max-w-[200px]">
                        <T path="home.path_section.with_migo.title">ПУТЬ С MIGO</T>
                      </h3>
                      <p className="text-[#B8D430] font-black text-xs uppercase tracking-[0.3em] mt-3 flex items-center gap-2">
                        <CheckCircle2 size={14} className="animate-bounce-slow" /> Полный контроль
                      </p>
                    </div>
                  </div>

                  <div className="relative flex-1">
                    <div className="absolute left-[15px] top-10 bottom-10 w-[4px] bg-gradient-to-b from-[#2196D3] via-[#B8D430] to-[#2196D3] z-0 shadow-[0_0_20px_rgba(33,150,211,0.4)] rounded-full"></div>

                    <div className="space-y-12 relative z-10">
                      {[1, 2, 3, 4, 5, 6].map(idx => (
                        <div key={idx} className="flex gap-8 group/item translate-x-0 hover:translate-x-4 transition-all duration-500">
                          <div className="w-8 h-8 rounded-full bg-white border-[6px] border-[#2196D3] shadow-lg flex items-center justify-center shrink-0 mt-1 transition-all duration-500 group-hover/item:scale-125 group-hover/item:shadow-[0_0_20px_rgba(33,150,211,0.4)] ring-4 ring-white">
                            <div className="w-2 h-2 rounded-full bg-[#B8D430] animate-pulse"></div>
                          </div>
                          <div>
                            <h4 className="font-black text-[#163A5C] mb-3 text-2xl tracking-tight leading-tight group-hover/item:text-[#2196D3] transition-colors"><T path={`home.path_section.with_migo.step${idx}_title`} /></h4>
                            <p className="text-gray-700/80 leading-relaxed font-medium text-lg max-w-sm"><T path={`home.path_section.with_migo.step${idx}_desc`} /></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-20 bg-gradient-to-br from-[#1E58B1] to-[#2196D3] rounded-[48px] p-10 border border-white/20 shadow-2xl relative overflow-hidden group/success">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 p-8 opacity-10 translate-x-4 -translate-y-4 group-hover/success:translate-x-0 group-hover/success:translate-y-0 transition-transform duration-1000">
                      <CheckCircle2 size={140} />
                    </div>
                    <div className="flex items-center gap-3 text-[#B8D430] font-black mb-5 uppercase tracking-[0.3em] text-[11px] relative z-10">
                      <div className="w-2 h-1 md:h-2 lg:h-2 rounded-full bg-[#B8D430] animate-ping"></div> <T path="home.path_section.with_migo.result">Результат</T>
                    </div>
                    <p className="font-black text-white text-2xl md:text-3xl leading-tight relative z-10 tracking-tight">
                      <T path="home.path_section.with_migo.desc" />
                    </p>
                  </div>

                  <div className="mt-14 rounded-[48px] overflow-hidden border border-[#B8D430]/30 shadow-[0_40px_80px_-20px_rgba(184,212,48,0.3)] transition-all duration-1000 hover:scale-[1.03] group-hover:rotate-1">
                    <Image src="/images/path_with_migo.webp" alt="Путь с MIGO" width={600} height={400} className="w-full h-auto object-cover" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-32">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1E58B1]/10 via-[#2196D3]/10 to-[#B8D430]/10 rounded-[80px] blur-[100px] -z-10"></div>
              <div className="bg-white/40 backdrop-blur-3xl border border-white/60 p-6 md:p-24 rounded-[40px] md:rounded-[80px] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.1)] relative overflow-hidden group/blueprint">

                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1E58B1 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,#B8D43015_0%,transparent_40%)] pointer-events-none"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  <div>
                    <div className="inline-flex items-center gap-3 mb-10 px-4 md:px-6 py-2.5 md:py-3 rounded-full bg-white border border-gray-100 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.05)] text-[#1E58B1] font-black uppercase tracking-wide md:tracking-[0.3em] text-[8px] md:text-[10px] max-w-full">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-[10px] md:rounded-xl bg-[#B8D430] flex items-center justify-center text-white shadow-[0_5px_15px_-3px_rgba(184,212,48,0.4)] flex-none">
                        <ShieldCheck size={14} className="md:size-4" />
                      </div>
                      <span className="truncate md:whitespace-normal"><T path="home.path_section.reliability.title">С MIGO вы под надежной защитой</T></span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-8 leading-tight tracking-tight">
                      <T path="home.path_section.reliability.priority_title">Ваша безопасность — наш главный приоритет</T>
                    </h2>

                    <p className="text-gray-700/80 text-lg md:text-xl mb-12 font-medium leading-relaxed max-w-xl">
                      <T path="home.path_section.reliability.subtitle">Мы убрали все риски, чтобы ваш путь был максимально комфортным и безопасным.</T>
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="flex items-center gap-4 group/feat">
                          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#B8D430] shadow-sm border border-gray-100 shrink-0 group-hover/feat:bg-[#B8D430] group-hover/feat:text-white transition-all flex-none aspect-square">
                            <Check size={22} strokeWidth={3} />
                          </div>
                          <span className="font-bold text-[#163A5C] text-sm md:text-base tracking-tight leading-snug"><T path={`home.path_section.reliability.feat${i}`} /></span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative group/card-3d perspective-[2000px]">
                    <div className="absolute -inset-20 bg-gradient-to-br from-[#1E58B1]/10 via-transparent to-[#B8D430]/10 rounded-full blur-[100px] opacity-60"></div>

                    <div className="relative bg-[#1E58B1] p-8 md:p-12 rounded-[56px] shadow-[0_40px_100px_-20px_rgba(30,88,177,0.3)]">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20"></div>
                      <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Lock size={120} className="text-white transform rotate-12" />
                      </div>

                      <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center text-[#B8D430] mb-10 shadow-inner">
                        <Zap size={32} className="animate-float" />
                      </div>

                      <div className="space-y-10 relative z-10">
                        <div className="flex items-start gap-6 group/bad-idea">
                          <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center text-white/50 shrink-0 mt-1">
                            <XCircle size={22} />
                          </div>
                          <p className="font-bold text-lg md:text-2xl text-white/60 italic leading-tight group-hover/bad-idea:text-white/95 transition-colors">
                            <T path="home.path_section.main_idea.without" />
                          </p>
                        </div>

                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                        <div className="flex items-start gap-6 group/good-idea">
                          <p className="font-black text-2xl md:text-4xl text-white text-center leading-tight tracking-tight">
                            <T path="home.path_section.main_idea.with" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 max-w-7xl mx-auto px-5">
          <div className="bg-[#1E58B1] rounded-[40px] p-8 md:p-20 relative overflow-hidden group shadow-2xl">
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
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-lg shrink-0 relative">
                              <Image
                                src={t_item.avatar}
                                alt={t(`home.testimonials.t${t_item.id}_author`, t_item.author)}
                                fill
                                className="object-cover scale-125"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-white font-black text-base truncate">{t(`home.testimonials.t${t_item.id}_author`, t_item.author)}</h3>
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
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
                  <T path="home.legal_aid.desc">Мы предоставляем бесплатные юридические консультации для граждан СНГ. Поможем разобраться с документами, патентами и защитим ваши права при трудоустройстве.</T>
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={getBotUrl({ start: 'law', source: 'home_aid' })} target="_blank" className="bg-[#1E58B1] hover:bg-[#16489a] text-white py-4 px-8 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:shadow-lg active:scale-95">
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
                  image={item.cover_image}
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
          <div className="bg-gradient-to-br from-[#1E58B1] via-[#1A4B75] to-[#2196D3] rounded-[64px] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-6xl font-black text-white mb-8"><T path="home.cta.title">Готовы начать новую жизнь в России?</T></h2>
              <p className="text-white/80 text-xl md:text-2xl mb-12 leading-relaxed">
                <T path="home.cta.subtitle">Не откладывайте на завтра. Бесплатная консультация в Telegram уже ждет вас.</T>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={getBotUrl({ source: 'home_cta' })} target="_blank" className="bg-[#B8D430] hover:bg-[#A7C220] text-[#1E58B1] py-6 px-12 rounded-[32px] font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-2xl">
                  <MessageCircle size={28} /> <T path="home.cta.btn_write">Написать нам</T>
                </Link>
                <Link href={`/${langPath}/services`} className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white py-6 px-12 rounded-[32px] font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-105">
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



function TrustFeature({ title, desc }: any) {
  return (
    <div className="flex gap-6 group">
      <div className="w-14 h-14 rounded-[20px] bg-white flex items-center justify-center shrink-0 mt-1 shadow-2xl text-[#1E58B1] group-hover:bg-[#B8D430] group-hover:scale-110 transition-all duration-500">
        <CheckCircle2 size={28} />
      </div>
      <div>
        <h4 className="text-xl md:text-2xl font-black text-white mb-2 group-hover:text-[#B8D430] transition-colors">{title}</h4>
        <p className="text-white/70 leading-relaxed text-sm md:text-lg font-medium">{desc}</p>
      </div>
    </div>
  );
}

function NewsCard({ tag, title, slug, image, date, delay, langPath }: any) {
  const imageUrl = image
    ? (image.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_API_URL}${image}`)
    : null;

  return (
    <Link
      href={`/${langPath}/news/${slug}`}
      style={{ '--delay': `${delay}ms` } as React.CSSProperties}
      className="bg-white rounded-[40px] p-2 border border-gray-100 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 group flex flex-col hover:-translate-y-3 animate-fade-in-up shadow-sm h-full overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] mb-6">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1E58B1]/5 to-[#2196D3]/5 flex items-center justify-center text-[#1E58B1]/20">
            <FileText size={48} />
          </div>
        )}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-[#1E58B1] bg-white/90 backdrop-blur-md shadow-sm border border-white/50">{tag}</span>
        </div>
      </div>

      <div className="px-6 pb-8 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-bold text-gray-500">{date}</span>
        </div>
        <h3
          className="font-black text-[#163A5C] text-xl md:text-2xl leading-tight group-hover:text-[#1E58B1] transition-colors mb-8 line-clamp-3 tracking-tight text-pretty"
          style={{ textWrap: 'balance' } as any}
        >
          {title.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').replace(/\s+(?=[,.:;!?])/g, '').replace(/,(\s)+/g, ', ').trim()}
        </h3>
        <div className="mt-auto flex items-center text-[#1E58B1] font-black gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 uppercase tracking-widest text-xs">
          <T path="home.news_section.read_full">Читать статью</T> <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}
