"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBotUrl } from '@/utils/bot';
import {
  ArrowLeft, Home, MessageCircle, MapPin,
  CheckCircle2, ShieldCheck, Send, Building2, BedDouble, ArrowRight
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

export default function ClientHousing() {
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
                <span className="w-2.5 h-2.5 rounded-full bg-[#2196D3] shadow-[0_0_10px_#2196D3]"></span>
                <p className="text-xs md:text-sm font-black text-[#1E58B1] uppercase tracking-[0.25em]"><T path="housing.hero.badge">Ваш новый дом в России</T></p>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#163A5C] leading-[0.95] mb-8 tracking-tighter">
                <T path="housing.hero.title_1">Комфортное жильё</T><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E58B1] to-[#2196D3]"><T path="housing.hero.title_highlight">рядом с работой</T></span>
              </h1>

              <p className="text-lg md:text-2xl text-gray-700/80 mb-12 max-w-xl leading-relaxed font-medium">
                <T path="housing.hero.subtitle">Помощь в подборе общежитий, квартир и хостелов. Быстро, официально и в удобном для вас районе.</T>
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full sm:w-auto">
                <Link
                  href={getBotUrl({ start: 'housing', source: 'site_housing', medium: 'housing' })}
                  target="_blank"
                  className="group bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] py-5 px-12 rounded-[32px] font-black text-xl flex items-center justify-center gap-3 shadow-[0_15px_30px_-5px_rgba(184,212,48,0.5)] transition-all hover:-translate-y-1.5 active:scale-95"
                >
                  <Home className="w-7 h-7" /> <T path="housing.hero.btn">Подобрать в Telegram</T>
                </Link>
              </div>
            </div>

            <div className="relative group perspective-[2000px] mt-0 lg:mt-8 md:mt-4">
              <div className="relative z-10 animate-float">
                <Image
                  src="/images/migo_housing.webp"
                  alt="MIGO Изображение с жильем и счастливыми жильцами"
                  width={800}
                  height={600}
                  className="w-full h-auto drop-shadow-[0_45px_45px_rgba(0,0,0,0.15)] rounded-[64px]"
                  priority
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-br from-[#2196D3]/10 to-transparent rounded-full -z-10 blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-5">
        <div className="bg-[#2196D3]/5 border border-[#2196D3]/15 rounded-[32px] p-8 md:p-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2196D3]/10 text-[#2196D3] font-black uppercase tracking-widest text-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-[#2196D3] animate-pulse"></span>
            <T path="housing.dev_notice.badge">В разработке</T>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-[#163A5C] mb-4"><T path="housing.dev_notice.title">Раздел «Жильё» скоро будет доступен</T></h3>
          <p className="text-gray-700 font-medium max-w-xl mx-auto mb-8 leading-relaxed">
            <T path="housing.dev_notice.desc">Мы готовим удобный сервис подбора проживания для граждан СНГ в России. А пока — напишите нам в Telegram, и мы поможем подобрать жильё вручную.</T>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={getBotUrl({ start: 'housing', source: 'site_housing' })}
              target="_blank"
              className="bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] py-4 px-10 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
            >
              <Home className="w-6 h-6" /> <T path="housing.dev_notice.btn_tg">Подобрать жильё через Telegram</T>
            </Link>
            <Link
              href={getBotUrl({ start: 'help', source: 'site_housing' })}
              target="_blank"
              className="bg-white hover:bg-gray-50 text-[#163A5C] py-4 px-10 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg border border-gray-100 transition-all hover:-translate-y-1 cursor-pointer"
            >
              <MessageCircle className="w-6 h-6" /> <T path="housing.dev_notice.btn_help">Нужна помощь сейчас?</T>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-4"><T path="housing.types.title">Варианты проживания</T></h2>
            <p className="text-gray-700 text-lg"><T path="housing.types.subtitle">Мы подберем вариант, который подходит именно вам — от бюджетного до комфортного.</T></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <HousingTypeCard
            title={<T path="housing.types.dorm_title">Общежития</T>}
            icon={<Building2 size={32} />}
            color={COLORS.blue}
            desc={<T path="housing.types.dorm_desc">Недорогие и проверенные варианты рядом с работой. Легальная регистрация для всех жителей.</T>}
          />
          <HousingTypeCard
            title={<T path="housing.types.hostel_title">Хостелы</T>}
            icon={<BedDouble size={32} />}
            color={COLORS.accent}
            desc={<T path="housing.types.hostel_desc">Идеально на первое время. Удобное расположение в Москве и Московской области.</T>}
          />
          <HousingTypeCard
            title={<T path="housing.types.apartment_title">Квартиры</T>}
            icon={<Home size={32} />}
            color={COLORS.navy}
            desc={<T path="housing.types.apartment_desc">Для комфортного проживания с семьей. Помогаем найти варианты без риска обмана.</T>}
          />
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-5">
        <div className="bg-[#1E58B1] rounded-[48px] p-8 md:p-20 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,#2196D380_0%,transparent_50%)] opacity-20"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 text-white">
              <div className="inline-flex items-center gap-2 text-[#B8D430] mb-6 font-bold uppercase tracking-widest text-sm">
                <ShieldCheck size={20} /> <T path="housing.trust.badge">Ваша безопасность</T>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight"><T path="housing.trust.title">Почему стоит доверять MIGO</T></h2>

              <div className="space-y-10">
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-lg group-hover:bg-[#B8D430] group-hover:text-[#1E58B1] transition-all duration-500">
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#B8D430] transition-colors uppercase tracking-tight"><T path="housing.trust.feature1_title">Никаких мошенников</T></h4>
                    <p className="text-white/80 leading-relaxed"><T path="housing.trust.feature1_desc">Мы работаем только с проверенными собственниками и администраторами общежитий.</T></p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-lg group-hover:bg-[#B8D430] group-hover:text-[#1E58B1] transition-all duration-500">
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#B8D430] transition-colors uppercase tracking-tight"><T path="housing.trust.feature2_title">Легальная регистрация</T></h4>
                    <p className="text-white/80 leading-relaxed"><T path="housing.trust.feature2_desc">Заселяясь через нас, вы получаете официальную регистрацию, необходимую для легальной работы в РФ.</T></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full lg:max-w-md">
              <div className="bg-white/10 backdrop-blur-3xl border border-white/20 p-10 rounded-[40px] shadow-2xl relative text-center">
                <ShieldCheck size={64} className="mx-auto text-[#B8D430] mb-8 animate-pulse" />
                <h3 className="text-3xl font-black text-white mb-4"><T path="housing.trust.safe_title">Безопасный переезд</T></h3>
                <p className="text-white/90 text-lg leading-relaxed mb-10"><T path="housing.trust.safe_desc">Напишите нам в Telegram до приезда в РФ, и мы заранее подберем вам место для проживания.</T></p>
                <Link
                  href={getBotUrl({ start: 'housing' })}
                  target="_blank"
                  className="inline-flex w-full items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-[#163A5C] font-black hover:scale-105 transition-transform shadow-xl"
                >
                  <MessageCircle size={24} /> <T path="housing.trust.btn">Написать сейчас</T>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function HousingTypeCard({ title, icon, color, desc }: { title: React.ReactNode, icon: React.ReactNode, color: string, desc: React.ReactNode }) {
  return (
    <div className="group bg-white rounded-[48px] p-8 md:p-12 border border-gray-100 hover:border-[#1E58B1] hover:shadow-[0_45px_75px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col h-full transform hover:-translate-y-2 shadow-sm">
      <div
        className="w-20 h-20 rounded-[28px] flex items-center justify-center mb-10 text-[#1E58B1] bg-[#1E58B1]/5 border border-gray-50 transform group-hover:scale-110 group-hover:bg-[#B8D430] group-hover:text-[#163A5C] transition-all duration-500 shadow-sm"
      >
        {React.cloneElement(icon as React.ReactElement<any>, { size: 36 })}
      </div>
      <h3 className="text-2xl md:text-3xl font-black text-[#163A5C] mb-6 group-hover:text-[#1E58B1] transition-colors tracking-tighter leading-tight">
        {title}
      </h3>
      <p className="text-gray-700 leading-relaxed mb-10 font-medium text-sm md:text-base">
        {desc}
      </p>
      <div className="mt-auto flex items-center gap-3 text-xs font-black text-gray-500 group-hover:text-[#2196D3] transition-all uppercase tracking-[0.2em] cursor-pointer">
        <T path="housing.types.more">Подробнее</T> <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
      </div>
    </div>
  );
}
