"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBotUrl } from '@/utils/bot';
import {
  MessageCircle, MapPin, Globe, Phone, Mail,
  Clock, ShieldCheck, ArrowUpRight, Send
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

export default function ClientContacts() {
  const { t, language } = useLanguage();

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
            <div className={`flex flex-col items-center lg:items-start text-center lg:text-left`}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-sm mb-8 animate-bounce-slow">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E58B1] shadow-[0_0_10px_#1E58B1]"></span>
                <p className="text-xs md:text-sm font-black text-[#1E58B1] uppercase tracking-[0.25em]"><T path="contacts.hero.badge">Контакт-центр MIGO</T></p>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#163A5C] leading-[0.95] mb-8 tracking-tighter">
                <T path="contacts.hero.title_1">Мы всегда</T><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E58B1] to-[#2196D3]"><T path="contacts.hero.title_highlight">на связи с вами</T></span>
              </h1>

              <p className="text-lg md:text-2xl text-gray-700/80 mb-12 max-w-xl leading-relaxed font-medium">
                <T path="contacts.hero.subtitle">Выберите удобный для вас способ связи. Наши менеджеры готовы ответить на любые вопросы в Telegram или по телефону.</T>
              </p>
            </div>

            <div className="relative group perspective-[2000px] hidden mt-0 lg:mt-8 md:mt-4 lg:block">
              <div className="relative z-10 animate-float">
                <Image
                  src="/images/migo_contacts_friendly.webp"
                  alt="MIGO Контактный центр"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ContactCard
            title={<T path="contacts.cards.tg_title">Telegram</T>}
            value="@migo_work"
            link={getBotUrl({ start: 'contacts' })}
            icon={<MessageCircle size={32} />}
            color="#229ED9"
            desc={<T path="contacts.cards.tg_desc">Самый быстрый способ получить ответ от менеджера.</T>}
          />
          <ContactCard
            title={<T path="contacts.cards.phone_title">Телефон</T>}
            value="+7 921 854 39 09"
            link="tel:+79218543909"
            icon={<Phone size={32} />}
            color={COLORS.blue}
            desc={<T path="contacts.cards.phone_desc">Звоните нам ежедневно с 9:00 до 20:00 по Москве.</T>}
          />
          <ContactCard
            title={<T path="contacts.cards.email_title">Email</T>}
            value="support@migohelp.com"
            link="mailto:support@migohelp.com"
            icon={<Mail size={32} />}
            color={COLORS.navy}
            desc={<T path="contacts.cards.email_desc">Для официальных запросов и предложений о партнерстве.</T>}
          />
        </div>
      </section>

      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#163A5C] mb-12 uppercase tracking-tight"><T path="contacts.offices.title">Офисы предоставления услуг</T></h2>
              <div className="space-y-10">
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] flex items-center justify-center shrink-0 text-[#2196D3] group-hover:bg-[#2196D3] group-hover:text-white transition-all duration-500 shadow-sm">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-[#163A5C] mb-2 uppercase tracking-tighter"><T path="contacts.offices.office1">Метро Лесопарковая</T></h4>
                    <p className="text-gray-700 text-sm flex items-center gap-2"><Clock size={14} /> <T path="contacts.offices.hours">Уточняйте время работы в Telegram</T></p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] flex items-center justify-center shrink-0 text-[#2196D3] group-hover:bg-[#2196D3] group-hover:text-white transition-all duration-500 shadow-sm">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-[#163A5C] mb-2 uppercase tracking-tighter"><T path="contacts.offices.office2">Метро Саларьево</T></h4>
                    <p className="text-gray-700 text-sm flex items-center gap-2"><Clock size={14} /> <T path="contacts.offices.hours">Уточняйте время работы в Telegram</T></p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] flex items-center justify-center shrink-0 text-[#2196D3] group-hover:bg-[#2196D3] group-hover:text-white transition-all duration-500 shadow-sm">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-[#163A5C] mb-2 uppercase tracking-tighter"><T path="contacts.offices.office3">Метро Домодедовская</T></h4>
                    <p className="text-gray-700 text-sm flex items-center gap-2"><Clock size={14} /> <T path="contacts.offices.hours">Уточняйте время работы в Telegram</T></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-10 md:p-16 rounded-[48px] border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-black text-[#163A5C] mb-8 uppercase tracking-widest flex items-center gap-3">
                <ShieldCheck className="text-[#B8D430]" /> <T path="contacts.legal.title">Юридическая информация</T>
              </h2>
              <div className="space-y-6 text-gray-700 font-medium leading-relaxed">
                <p><span className="text-[#163A5C] font-black uppercase text-xs tracking-widest block mb-1"><T path="contacts.legal.name_label">Наименование</T></span> ООО «ПРМ»</p>
                <p><span className="text-[#163A5C] font-black uppercase text-xs tracking-widest block mb-1"><T path="contacts.legal.address_label">Фактический адрес</T></span> <T path="contacts.legal.address_value">г. Москва, Армянский пер., 9 стр. 1, оф. 204</T></p>
                <p><span className="text-[#163A5C] font-black uppercase text-xs tracking-widest block mb-1"><T path="contacts.legal.phone_label">Телефон</T></span> <a href="tel:+79218543909" className="text-[#2196D3] hover:underline">+7 921 854 39 09</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-5">
        <div className="rounded-[48px] overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 h-[500px] relative group">
          <div className="absolute inset-0 bg-gray-200 animate-pulse group-hover:opacity-0 transition-opacity flex items-center justify-center">
            <MapPin size={48} className="text-gray-300" />
          </div>
          <iframe
            src={`https://yandex.ru/map-widget/v1/?ll=37.589140,55.658250&z=10&pt=37.637046,55.760100,pm2rdm1~37.576944,55.582222,pm2blm2~37.425514,55.621453,pm2blm3~37.717906,55.611681,pm2blm4&lang=${(language || 'RU') === 'RU' ? 'ru_RU' : 'en_US'}`}
            width="100%"
            height="500"
            frameBorder="0"
            className="relative z-10"
          ></iframe>
        </div>
      </section>

      <section className="py-24 bg-[#1E58B1] mx-auto rounded-[64px] mx-5 overflow-hidden max-w-7xl relative shadow-2xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#B8D430]/10 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-white max-w-xl">
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight uppercase tracking-tight"><T path="contacts.social.title">Подписывайтесь на нас</T></h2>
            <p className="text-white/90 text-lg font-medium"><T path="contacts.social.subtitle">Следите за новостями проекта, новыми вакансиями и полезными советами в наших социальных сетях.</T></p>
          </div>
          <div className="flex gap-10 flex-wrap justify-center">
            <SocialLink href="https://t.me/migo_work" platform="Telegram" color="#229ED9" />
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactCard({ title, value, link, icon, color, desc }: { title: React.ReactNode, value: string, link: string, icon: React.ReactNode, color: string, desc: React.ReactNode }) {
  return (
    <a
      href={link}
      target="_blank"
      className="group bg-white rounded-[48px] p-8 md:p-12 border border-gray-100 shadow-sm hover:shadow-[0_45px_75px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-3 flex flex-col h-full"
    >
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center mb-10 transform group-hover:scale-110 group-hover:bg-[#B8D430] group-hover:text-[#163A5C] transition-all duration-500 shadow-sm"
        style={{ backgroundColor: `${color}15`, color: color }}
      >
        {React.cloneElement(icon as React.ReactElement<any>, { size: 36 })}
      </div>
      <h3 className="text-xs font-black text-gray-700 mb-4 uppercase tracking-[0.25em]">{title}</h3>
      <div className="text-xl md:text-3xl font-black text-[#163A5C] mb-6 break-words group-hover:text-[#1E58B1] transition-colors leading-tight tracking-tighter">{value}</div>
      <p className="text-gray-700 font-medium leading-relaxed mt-auto text-sm md:text-base mb-8">
        {desc}
      </p>
      <div className="flex items-center gap-3 text-xs font-black text-[#1E58B1] opacity-60 group-hover:opacity-100 transition-all uppercase tracking-[0.2em]">
        <T path="contacts.cards.connect">Связаться</T> <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </div>
    </a>
  );
}

function SocialLink({ href, platform, color }: any) {
  return (
    <a
      href={href}
      target="_blank"
      className="flex flex-col items-center group"
    >
      <div
        className="w-20 h-20 rounded-[28px] bg-white/5 border border-white/10 flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-gray-200 group-hover:scale-110 group-hover:shadow-2xl"
        style={{ color: 'white' }}
      >
        <span className="group-hover:scale-110 transition-transform" style={{ color: 'inherit' }}>
          {platform === 'Telegram' ? <Send size={32} /> : <Globe size={32} />}
        </span>
      </div>
      <span className="text-white font-black text-sm uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">{platform}</span>
    </a>
  );
}