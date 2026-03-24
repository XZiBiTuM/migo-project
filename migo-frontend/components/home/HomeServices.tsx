"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase, Home, Wallet, Zap, MessageCircle, ChevronRight, FileText
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { getBotUrl } from '@/utils/bot';
import { T } from '@/context/LanguageContext';

const ServiceModal = dynamic(() => import('@/components/ServiceModal'), {
  ssr: false,
});

const getServiceIcon = (type: string) => {
  switch (type) {
    case 'housing': return <Home />;
    case 'docs': return <FileText />;
    case 'finance': return <Wallet />;
    default: return <Zap />;
  }
};

export default function HomeServices({ initialServices, lang }: { initialServices: any[], lang: string }) {
  const getLocalizedTitle = (s: any) => {
    const l = lang.toLowerCase();
    if (l === 'uz' && s.title_uz) return s.title_uz;
    if (l === 'tg' && s.title_tg) return s.title_tg;
    if (l === 'tj' && s.title_tg) return s.title_tg;
    if (l === 'kg' && s.title_kg) return s.title_kg;
    if (l === 'kk' && s.title_kk) return s.title_kk;
    return s.title;
  };

  return (
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
            { title: <T path="home.services_section.find_work">Найти работу</T>, icon: <Briefcase />, href: `/${lang}/work` },
            { title: <T path="home.services_section.housing">Жильё</T>, icon: <Home />, href: `/${lang}/housing` },
            ...(initialServices || []).map(s => ({
              title: getLocalizedTitle(s),
              icon: getServiceIcon(s.service_type),
              href: `/${lang}/services/${s.slug}`,
            }))
          ].map((service, idx) => (
            <Link
              key={idx}
              href={service.href || '#'}
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
            href={`/${lang}/services`}
            className="w-full sm:w-auto px-10 py-5 rounded-[24px] bg-white border border-gray-200 text-[#163A5C] font-black text-lg flex items-center justify-center gap-2 hover:border-[#2196D3] hover:text-[#2196D3] transition-all shadow-sm"
          >
            <T path="home.services_section.all_services">Все услуги</T> <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
