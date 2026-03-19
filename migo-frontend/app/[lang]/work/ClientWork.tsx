"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBotUrl } from '@/utils/bot';
import {
  ArrowLeft, Briefcase, PlayCircle, MessageCircle, Search,
  MapPin, CheckCircle2, ShieldCheck, XCircle, Send, Menu, FileText, Home, ArrowRight, Wallet, Clock
} from 'lucide-react';
import { T, useLanguage } from '@/context/LanguageContext';

export interface VacancyItem {
  id: number;
  title: string;
  slug: string;
  city: string;
  salary: string;
  schedule: string;
  housing_provided: boolean;
  meals_provided: boolean;
  docs_included: boolean;
  description: string;
  requirements: string;
  conditions: string;
  is_active: boolean;
}
import ServiceModal from '../../components/ServiceModal';

const COLORS = {
  navy: '#163A5C',
  blue: '#2196D3',
  accent: '#B8D430',
  green: '#27A15E',
  cyan: '#00BCD4',
  bg: '#F8FAFC',
  white: '#FFFFFF',
};

export default function ClientWork({ initialJobs = [] }: { initialJobs?: VacancyItem[] }) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="pb-24 bg-[#F8FAFC] selection:bg-[#B8D430]/30 min-h-screen">
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden px-5 pt-32 pb-20 md:pt-0 md:pb-0">
        <div className="absolute inset-0 z-0 text-center">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#B8D430]/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#2196D3]/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0)_0%,rgba(248,250,252,1)_100%)]"></div>
        </div>

        <div className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/80 shadow-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-[#B8D430]"></span>
              <p className="text-xs md:text-sm font-bold text-[#163A5C] uppercase tracking-[0.2em]"><T path="work.hero.badge">Проверенные вакансии</T></p>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#163A5C] leading-[1.05] mb-8 max-w-5xl tracking-tight">
              <T path="work.hero.title_1">Найдите работу в России </T><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2196D3] to-[#163A5C]"><T path="work.hero.title_highlight">через Telegram за 2 минуты</T></span>
            </h1>

            <p className="text-lg md:text-2xl text-gray-500/80 mb-12 max-w-2xl leading-relaxed">
              <T path="work.hero.subtitle">Без сложных сайтов и регистрации. Просто откройте бота и получите вакансии под ваши критерии под руководством личного менеджера.</T>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href={getBotUrl({ start: 'work', source: 'site_work_page', medium: 'work' })}
                target="_blank"
                className="group bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] py-5 px-12 rounded-[24px] font-black text-xl flex items-center justify-center gap-3 shadow-[0_10px_20px_-5px_rgba(184,212,48,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_15px_25px_-5px_rgba(184,212,48,0.5)] active:scale-95"
              >
                <Briefcase className="w-7 h-7" /> <T path="work.hero.btn">Найти работу в Telegram</T>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-6"><T path="work.steps.title">Как это работает</T></h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto"><T path="work.steps.subtitle">Мы сделали процесс поиска работы максимально прозрачным и безопасным.</T></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#2196D3]/10 via-gray-200 to-[#B8D430]/10"></div>
          {[
            { num: '01', title: <T path="work.steps.step1_title">Нажмите кнопку</T>, desc: <T path="work.steps.step1_desc">«Найти работу» на этом сайте</T>, icon: <MessageCircle /> },
            { num: '02', title: <T path="work.steps.step2_title">Откроется бот</T>, desc: <T path="work.steps.step2_desc">Ваш помощник в Telegram</T>, icon: <Search /> },
            { num: '03', title: <T path="work.steps.step3_title">Выберите город</T>, desc: <T path="work.steps.step3_desc">И желаемую профессию</T>, icon: <MapPin /> },
            { num: '04', title: <T path="work.steps.step4_title">Получите вакансии</T>, desc: <T path="work.steps.step4_desc">И напишите менеджеру напрямую</T>, icon: <CheckCircle2 /> },
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group relative pt-4">
              <div className="w-24 h-24 rounded-[32px] bg-white border border-gray-100 shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2196D3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-[#2196D3] group-hover:scale-110 transition-transform">
                  {React.cloneElement(step.icon, { size: 36 })}
                </div>
              </div>
              <div className="absolute top-0 text-7xl font-black text-gray-50 select-none -z-10 group-hover:text-[#2196D3]/10 transition-colors uppercase">{step.num}</div>
              <h3 className="text-xl font-bold text-[#163A5C] mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-4"><T path="work.advantages.title">Преимущества MIGO</T></h2>
              <p className="text-gray-500 text-lg"><T path="work.advantages.subtitle">Мы не просто ищем работу, мы обеспечиваем безопасность вашего трудоустройства.</T></p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <AdvantageCard icon={<ShieldCheck />} title={<T path="work.advantages.adv1_title">Проверка работодателей</T>} desc={<T path="work.advantages.adv1_desc">Работаем только с проверенными компаниями</T>} />
            <AdvantageCard icon={<Home />} title={<T path="work.advantages.adv2_title">Помощь с жильём</T>} desc={<T path="work.advantages.adv2_desc">Подберем общежитие рядом с работой</T>} />
            <AdvantageCard icon={<FileText />} title={<T path="work.advantages.adv3_title">Консультация по документам</T>} desc={<T path="work.advantages.adv3_desc">Поможем со списком для патента/регистрации</T>} />
            <AdvantageCard icon={<MessageCircle />} title={<T path="work.advantages.adv4_title">Поддержка 24/7</T>} desc={<T path="work.advantages.adv4_desc">Менеджер всегда на связи в Telegram</T>} />
            <AdvantageCard icon={<Briefcase />} title={<T path="work.advantages.adv5_title">Оплата без обмана</T>} desc={<T path="work.advantages.adv5_desc">Контролируем прозрачность выплат</T>} />
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F8FAFC] border-y border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-5">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-4"><T path="work.vacancies.title">Популярные вакансии</T></h2>
              <p className="text-gray-500 text-lg"><T path="work.vacancies.subtitle">Примеры актуальных предложений. Напишите в Telegram, чтобы получить полный список и подобрать работу индивидуально.</T></p>
            </div>
            <Link
                href={getBotUrl({ start: 'work' })}
                target="_blank"
                className="text-[#2196D3] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <T path="work.vacancies.all_in_tg">Все вакансии в Telegram</T> <ArrowRight size={18} />
            </Link>
          </div>

          {initialJobs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {initialJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-500 font-medium"><T path="work.vacancies.no_vacancies">Пока нет доступных вакансий. Загляните позже или напишите нам в Telegram для индивидуального подбора.</T></p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href={getBotUrl({ start: 'work', source: 'site_work_page', medium: 'catalog_btn' })}
              target="_blank"
              className="inline-flex items-center justify-center gap-3 bg-white border border-[#2196D3] text-[#2196D3] hover:bg-[#2196D3] hover:text-white transition-colors py-4 px-10 rounded-2xl font-black text-lg shadow-sm"
            >
              <Briefcase size={20} /> <T path="work.vacancies.other_options">Подобрать другие варианты</T>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-5">
        <h2 className="text-3xl md:text-5xl font-black text-center text-[#163A5C] mb-16"><T path="work.safety.title">Безопасность прежде всего</T></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-red-50/30 border border-red-100 p-10 rounded-[40px] group transition-all bg-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-4 right-6 px-3 py-1 bg-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-full">
              <T path="work.safety.risks_label">Риски</T>
            </div>
            <h3 className="text-2xl font-black text-red-600/60 mb-8 flex items-center gap-3">
              <XCircle className="text-red-400" /> <T path="work.safety.risks_title">Случайные чаты</T>
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-1"><XCircle size={14} className="text-red-500" /></div>
                <p className="text-gray-500 font-medium leading-relaxed"><T path="work.safety.risk1">Нет никакой проверки работодателя и условий труда</T></p>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-1"><XCircle size={14} className="text-red-500" /></div>
                <p className="text-gray-500 font-medium leading-relaxed"><T path="work.safety.risk2">Высокий риск обмана с зарплатой и графиком</T></p>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-1"><XCircle size={14} className="text-red-500" /></div>
                <p className="text-gray-500 font-medium leading-relaxed"><T path="work.safety.risk3">Никто не несет ответственности за вашу безопасность</T></p>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-[#2196D3]/20 p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2196D3]/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform"></div>
            <h3 className="text-2xl font-black text-[#163A5C] mb-8 flex items-center gap-3">
              <ShieldCheck className="text-[#2196D3]" /> MIGO
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-[#B8D430]/20 flex items-center justify-center shrink-0 mt-1"><CheckCircle2 size={14} className="text-[#163A5C]" /></div>
                <p className="text-[#163A5C] font-bold leading-relaxed"><T path="work.safety.migo1">Только проверенные вакансии с официальным оформлением</T></p>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-[#B8D430]/20 flex items-center justify-center shrink-0 mt-1"><CheckCircle2 size={14} className="text-[#163A5C]" /></div>
                <p className="text-[#163A5C] font-bold leading-relaxed"><T path="work.safety.migo2">Помощь в решении бытовых вопросов и жилья</T></p>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-[#B8D430]/20 flex items-center justify-center shrink-0 mt-1"><CheckCircle2 size={14} className="text-[#163A5C]" /></div>
                <p className="text-[#163A5C] font-bold leading-relaxed"><T path="work.safety.migo3">Полное сопровождение менеджером до выхода на работу</T></p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-5 text-center">
        <p className="text-[#163A5C]/40 font-black uppercase tracking-[0.2em] text-sm mb-10"><T path="work.countries.title">Работаем для граждан из</T></p>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { name: 'Киргизия', code: 'kg' },
            { name: 'Узбекистан', code: 'uz' },
            { name: 'Таджикистан', code: 'tj' },
            { name: 'Казахстан', code: 'kz' }
          ].map(country => (
            <div key={country.code} className="px-8 py-4 bg-white border border-gray-100 rounded-3xl font-black text-lg text-[#163A5C] shadow-sm transform hover:scale-105 transition-all flex items-center gap-3">
              <img src={`https://flagcdn.com/w40/${country.code}.png`} alt={t(`work.countries.${country.code}`, country.name)} className="w-6 h-auto rounded-sm" />
              <T path={`work.countries.${country.code}`}>{country.name}</T>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-5">
        <div className="bg-gradient-to-br from-[#163A5C] via-[#1A4B75] to-[#2196D3] rounded-[48px] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8"><T path="work.cta.title">Готовы начать работать?</T></h2>
            <p className="text-white/80 text-xl md:text-2xl mb-12 leading-relaxed font-medium">
              <T path="work.cta.subtitle">Не нужно ничего искать. Просто напишите нам в Telegram, и мы предложим лучшие вакансии сегодня.</T>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={getBotUrl({ start: 'work', source: 'site_work_page', medium: 'work' })} target="_blank" className="bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] py-5 px-12 rounded-[24px] font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-2xl">
                <MessageCircle size={28} /> <T path="work.cta.btn_tg">Написать в Telegram</T>
              </Link>
              <Link href={getBotUrl({ start: 'law', source: 'site_work_page', medium: 'work' })} target="_blank" className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white py-5 px-12 rounded-[24px] font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-105">
                <T path="work.cta.btn_legal">Юридическая помощь</T>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function AdvantageCard({ icon, title, desc }: { icon: React.ReactNode, title: React.ReactNode, desc: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-gray-100 hover:border-[#2196D3] hover:shadow-2xl transition-all duration-500 group flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-[#2196D3] bg-[#2196D3]/10 transform group-hover:scale-110 transition-transform">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 28 })}
      </div>
      <h3 className="font-black text-[#163A5C] mb-3 leading-snug">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function JobCard({ job }: { job: VacancyItem }) {
  const { t } = useLanguage();
  const tags = [];
  if (job.housing_provided) tags.push({ key: 'work.vacancies.housing_free', default: 'Проживание бесплатно' });
  if (job.meals_provided) tags.push({ key: 'work.vacancies.meals', default: 'Питание' });
  if (job.docs_included) tags.push({ key: 'work.vacancies.docs', default: 'Документы' });

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-[#B8D430] hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h3 className="text-2xl font-black text-[#163A5C]">{job.title}</h3>
          <div className="bg-[#B8D430]/10 text-[#27A15E] font-black px-4 py-2 rounded-xl whitespace-nowrap">
            {job.salary}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500 mb-6">
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
            <MapPin size={16} className="text-[#2196D3]" /> {job.city}
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
            <Clock size={16} className="text-[#2196D3]" /> {job.schedule}
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag, idx) => (
              <span key={idx} className="bg-[#163A5C]/5 text-[#163A5C] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                <T path={tag.key}>{tag.default}</T>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-50 mt-4">
        <Link
          href={getBotUrl({ start: 'work' })}
          target="_blank"
          className="flex-1 bg-[#163A5C] hover:bg-[#0F2942] text-white py-3.5 px-6 rounded-xl font-bold text-center transition-colors flex justify-center items-center gap-2"
        >
          <Send size={18} /> Откликнуться
        </Link>
      </div>
    </div>
  );
}
