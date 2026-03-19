"use client";

import React from 'react';
import Link from 'next/link';
import { getBotUrl } from '@/utils/bot';
import {
  ArrowLeft, Send, CheckCircle2, Clock,
  FileText, CreditCard, ShieldCheck, MessageCircle
} from 'lucide-react';
import { T, useLanguage } from '@/context/LanguageContext';

const COLORS = {
  navy: '#163A5C',
  blue: '#2196D3',
  accent: '#B8D430',
  cyan: '#00BCD4',
  bg: '#F0F7FC',
};

export default function ClientServicesDetail({ service }: { service: any }) {
  const { language, t } = useLanguage();
  const lang = language.toLowerCase();

  return (
    <main className="pt-28 md:pt-32 pb-20 min-h-screen bg-white">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
        <Link href={`/${lang}/services`} className="inline-flex items-center gap-2 text-gray-500 hover:text-[#2196D3] font-medium transition-colors mb-8 cursor-pointer">
           <ArrowLeft size={20} /> <T path="service_detail.back_btn">Ко всем услугам</T>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex-1">
            <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-[#2196D3] bg-[#2196D3]/10 mb-4">
              {service.service_type === 'docs' ? <T path="services.categories.docs">Документы</T> : service.service_type === 'finance' ? <T path="services.categories.finance">Финансы</T> : <T path="services.categories.other">Сервис</T>}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-[#163A5C] leading-tight mb-6">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl">
              {service.short_description}
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0">
            <Link
              href={getBotUrl({ start: service.slug, source: 'service_detail', medium: 'web' })}
              target="_blank"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl text-white font-bold text-xl hover:opacity-90 transition-all shadow-lg shadow-[#2196D3]/30 flex justify-center items-center gap-3 active:scale-[0.98] cursor-pointer"
              style={{ backgroundColor: COLORS.blue }}
            >
              <Send className="w-6 h-6" /> <T path="service_detail.cta_btn">Оформить в Telegram</T>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="md:col-span-2 space-y-12">

            <section>
              <h2 className="text-2xl font-bold text-[#163A5C] mb-6 flex items-center gap-3">
                <ShieldCheck className="text-[#2196D3]" /> <T path="service_detail.desc_title">Описание услуги</T>
              </h2>
              <div className="prose prose-lg text-gray-600">
                {service.full_description}
              </div>
            </section>

            {service.documents_required && (
              <section className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#163A5C] mb-6 flex items-center gap-3">
                  <FileText className="text-[#2196D3]" /> <T path="service_detail.docs_title">Необходимые документы</T>
                </h2>
                <div className="space-y-4">
                  {service.documents_required.split('\n').filter((line: string) => line.trim()).map((doc: string, idx: number) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <CheckCircle2 className="shrink-0 text-[#B8D430] mt-1" size={20} />
                      <span className="text-lg text-gray-700">{doc}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-[#163A5C] text-white rounded-[2rem] p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#2196D3] rounded-full opacity-10 -mr-10 -mt-10 blur-2xl"></div>
              <h3 className="text-2xl font-bold mb-4 relative z-10"><T path="service_detail.cta_questions_title">Остались вопросы?</T></h3>
              <p className="text-white/70 mb-8 relative z-10"><T path="service_detail.cta_questions_desc">Наши специалисты помогут собрать правильный пакет документов и ответят на все юридические вопросы.</T></p>
              <Link href={getBotUrl({ start: 'consult', source: 'service_detail', medium: 'web' })} target="_blank" className="inline-flex items-center gap-2 bg-[#00BCD4] text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform cursor-pointer">
                <MessageCircle size={20} /> <T path="service_detail.cta_consult_btn">Написать консультанту</T>
              </Link>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-[#2196D3]">
                <Clock size={24} />
                <span className="font-bold uppercase tracking-wider text-xs"><T path="service_detail.time_label">Сроки</T></span>
              </div>
              <p className="text-xl font-bold text-[#163A5C]">{service.processing_time || <T path="service_detail.time_placeholder">Уточняйте в боте</T>}</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-[#B8D430]">
                <CreditCard size={24} />
                <span className="font-bold uppercase tracking-wider text-xs"><T path="service_detail.price_label">Стоимость</T></span>
              </div>
              <p className="text-xl font-bold text-[#163A5C]">{service.price_conditions || 'Индивидуально'}</p>
            </div>

            {service.is_partner_service && (
              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                <p className="text-sm text-orange-800 font-medium">
                  ⚠️ Услуга предоставляется нашими проверенными партнёрами. MIGO осуществляет сопровождение и контроль качества.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

    </main>
  );
}
