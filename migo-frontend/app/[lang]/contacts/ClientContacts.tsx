"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBotUrl } from '@/utils/bot';
import {
  MessageCircle, MapPin, Globe, Phone, Mail,
  Clock, ShieldCheck, ArrowUpRight, Send
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

export default function ClientContacts() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="pb-24 bg-[#F8FAFC] selection:bg-[#B8D430]/30 min-h-screen">
      <section className="relative min-h-[50vh] flex flex-col justify-center overflow-hidden px-5 pt-32 pb-20 md:pt-0 md:pb-0">
        <div className="absolute inset-0 z-0 text-center">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#2196D3]/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#B8D430]/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0)_0%,rgba(248,250,252,1)_100%)]"></div>
        </div>

        <div className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mt-12 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#163A5C] leading-[1.05] mb-8 max-w-5xl tracking-tight">
              <T path="contacts.hero.title_1">Мы всегда</T> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2196D3] to-[#163A5C]"><T path="contacts.hero.title_highlight">на связи с вами</T></span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-500/80 max-w-2xl leading-relaxed">
              <T path="contacts.hero.subtitle">Выберите удобный для вас способ связи. Наши менеджеры готовы ответить на любые вопросы в Telegram или по телефону.</T>
            </p>
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
                    <p className="text-gray-400 text-sm flex items-center gap-2"><Clock size={14} /> <T path="contacts.offices.hours">Уточняйте время работы в Telegram</T></p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] flex items-center justify-center shrink-0 text-[#2196D3] group-hover:bg-[#2196D3] group-hover:text-white transition-all duration-500 shadow-sm">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-[#163A5C] mb-2 uppercase tracking-tighter"><T path="contacts.offices.office2">Метро Саларьево</T></h4>
                    <p className="text-gray-400 text-sm flex items-center gap-2"><Clock size={14} /> <T path="contacts.offices.hours">Уточняйте время работы в Telegram</T></p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] flex items-center justify-center shrink-0 text-[#2196D3] group-hover:bg-[#2196D3] group-hover:text-white transition-all duration-500 shadow-sm">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-[#163A5C] mb-2 uppercase tracking-tighter"><T path="contacts.offices.office3">Метро Домодедовская</T></h4>
                    <p className="text-gray-400 text-sm flex items-center gap-2"><Clock size={14} /> <T path="contacts.offices.hours">Уточняйте время работы в Telegram</T></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-10 md:p-16 rounded-[48px] border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-black text-[#163A5C] mb-8 uppercase tracking-widest flex items-center gap-3">
                <ShieldCheck className="text-[#B8D430]" /> <T path="contacts.legal.title">Юридическая информация</T>
              </h2>
              <div className="space-y-6 text-gray-500 font-medium leading-relaxed">
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
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Af793e1577903cf44540898555e718276f7f32617781b0f92b704c7c8441113ed&amp;source=constructor"
            width="100%"
            height="500"
            frameBorder="0"
            className="relative z-10"
          ></iframe>
        </div>
      </section>

      <section className="py-24 bg-[#163A5C] rounded-[64px] mx-5 overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#B8D430]/10 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-white max-w-xl">
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight uppercase tracking-tight"><T path="contacts.social.title">Подписывайтесь на нас</T></h2>
            <p className="text-white/60 text-lg font-medium"><T path="contacts.social.subtitle">Следите за новостями проекта, новыми вакансиями и полезными советами в наших социальных сетях.</T></p>
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
      className="group bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm"
        style={{ backgroundColor: `${color}15`, color: color }}
      >
        {icon}
      </div>
      <h3 className="text-xs font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">{title}</h3>
      <div className="text-2xl font-black text-[#163A5C] mb-4 break-words group-hover:text-[#2196D3] transition-colors">{value}</div>
      <p className="text-gray-500 font-medium leading-relaxed mt-auto relative z-10">
        {desc}
      </p>
      <div className="mt-8 flex items-center gap-2 text-sm font-black text-[#2196D3] opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 tracking-widest uppercase">
        <T path="contacts.cards.connect">Связаться</T> <ArrowUpRight size={18} />
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
      <span className="text-white font-black text-sm uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{platform}</span>
    </a>
  );
}