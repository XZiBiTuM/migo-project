import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBotUrl } from '@/utils/bot';
import {
  ShieldCheck, MessageCircle, Zap, CheckCircle2,
  Briefcase, Home, FileText, ChevronRight,
  Globe, MapPin, Scale, Handshake, Users, Heart, Building2
} from 'lucide-react';
import { getT } from '@/utils/translations.server';
import { FAQItem } from '@/components/about/FAQItem';

export default function ClientAbout({ lang }: { lang: string }) {
  const t = getT(lang);

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
                <span className="w-2.5 h-2.5 rounded-full bg-[#B8D430] shadow-[0_0_10px_#B8D430]"></span>
                <p className="text-xs md:text-sm font-black text-[#1E58B1] uppercase tracking-[0.25em]">{t('about.hero.badge', 'Мы строим будущее')}</p>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#163A5C] leading-[0.95] mb-8 tracking-tighter">
                {t('about.hero.title_1', 'Безопасный путь')}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E58B1] to-[#2196D3]">{t('about.hero.title_highlight', 'для каждого')}</span>
              </h1>

              <p className="text-lg md:text-2xl text-gray-700/80 mb-12 max-w-xl leading-relaxed font-medium">
                {t('about.mission.p1', 'MIGO — это экосистема поддержки, созданная чтобы сделать жизнь и работу в России прозрачной и комфортной.')}
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full sm:w-auto">
                <Link
                  href={getBotUrl({ start: 'about' })}
                  target="_blank"
                  className="group bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] py-5 px-10 rounded-[32px] font-black text-xl flex items-center justify-center gap-3 shadow-[0_15px_30px_-5px_rgba(184,212,48,0.5)] transition-all hover:-translate-y-1.5 active:scale-95"
                >
                  <MessageCircle size={28} /> {t('about.cta.btn', 'Узнать больше')}
                </Link>
              </div>
            </div>

            <div className="relative group perspective-[2000px] hidden lg:block mt-0 lg:mt-8 md:mt-4">
              <div className="relative z-10 animate-float">
                <Image
                  src="/images/migo_about_friendly.webp"
                  alt="MIGO Команда с работниками-мигрантами"
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
        <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-20 text-center tracking-tight uppercase">{t('about.why.title', 'Почему мы это делаем')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[600px]">
          <div className="md:col-span-8 bg-white rounded-[48px] p-12 border border-gray-100 shadow-xl flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 transform group-hover:scale-110 transition-transform">
              <Zap size={120} className="text-gray-50 -mr-10 -mt-10" />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-[#163A5C] mb-6">{t('about.why.reason1_title', 'Отсутствие достоверной информации')}</h3>
              <p className="text-xl text-gray-700 max-w-xl leading-relaxed">{t('about.why.reason1_desc', 'Многие сталкиваются с обманом, потому что не знают своих прав или не имеют доступа к проверенным работодателям.')}</p>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm font-black text-[#B8D430]">
              <span className="w-12 h-0.5 bg-[#B8D430]"></span> {t('about.why.reason1_label', 'ПРИЧИНА №1')}
            </div>
          </div>

          <div className="md:col-span-4 bg-[#1E58B1] rounded-[48px] p-12 text-white flex flex-col justify-between shadow-xl transform hover:-rotate-1 transition-transform">
            <ShieldCheck size={48} className="mb-8" />
            <div>
              <h3 className="text-2xl font-black mb-4">{t('about.why.safety_title', 'Безопасность')}</h3>
              <p className="text-white/95 font-medium">{t('about.why.safety_desc', 'Мы проверяем каждого партнера, чтобы вы были уверены в завтрашнем дне.')}</p>
            </div>
          </div>

          <div className="md:col-span-4 bg-[#1E58B1] rounded-[48px] p-12 text-white flex flex-col justify-between shadow-xl">
            <MessageCircle size={48} className="mb-8 text-[#B8D430]" />
            <div>
              <h3 className="text-2xl font-black mb-4">{t('about.why.support_title', 'Поддержка')}</h3>
              <p className="text-white/90 font-medium">{t('about.why.support_desc', 'Наш бот и менеджеры — ваши верные помощники 24/7.')}</p>
            </div>
          </div>

          <div className="md:col-span-8 bg-white rounded-[48px] p-12 border border-gray-100 shadow-xl flex flex-col justify-center group">
            <h3 className="text-3xl font-black text-[#163A5C] mb-6">{t('about.why.tech_title', 'Технологии для людей')}</h3>
            <p className="text-xl text-gray-700 max-w-xl leading-relaxed">{t('about.why.tech_desc', 'Мы используем Telegram, чтобы быть там, где вам удобно. Никаких сложных интерфейсов, только польза.')}</p>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-5">
        <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-20 text-center uppercase tracking-tight">{t('about.partners.title', 'Наши партнёры')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center place-items-center">
          <a href='https://ragradus.ru/' target='_blank' className="bg-[#C0C0C0] rounded-2xl p-6 border border-gray-300 shadow-sm hover:shadow-lg hover:scale-105 transition-all w-full flex items-center justify-center h-24">
            <Image src="/partners/gradus_optimized.webp" alt="Градус" width={140} height={60} className="object-contain h-full" />
          </a>
          <a href='https://ventra.ru/' target='_blank' className="bg-[#C0C0C0] rounded-2xl p-6 border border-gray-300 shadow-sm hover:shadow-lg hover:scale-105 transition-all w-full flex items-center justify-center h-24">
            <Image src="/partners/ventra_optimized.webp" alt="Вентра" width={140} height={60} className="object-contain h-full" />
          </a>
          <a href='https://migranto.ru/' target='_blank' className="bg-[#C0C0C0] rounded-2xl p-6 border border-gray-300 shadow-sm hover:shadow-lg hover:scale-105 transition-all w-full flex items-center justify-center h-24">
            <Image src="/partners/migranto_optimized.webp" alt="Мигранто" width={140} height={60} className="object-contain h-full" />
          </a>
          <a href='https://association.outsourcers.ru/' target='_blank' className="bg-[#C0C0C0] rounded-2xl p-6 border border-gray-300 shadow-sm hover:shadow-lg hover:scale-105 transition-all w-full flex items-center justify-center h-24">
            <Image src="/partners/outsource_optimized.webp" alt="Ассоциация Аутсорсеров" width={140} height={60} className="object-contain h-full" />
          </a>
          <a href='https://xn--b1aew.xn--p1ai/' target='_blank' className="bg-[#C0C0C0] rounded-2xl p-6 border border-gray-300 shadow-sm hover:shadow-lg hover:scale-105 transition-all w-full flex items-center justify-center h-24">
            <Image src="/partners/mvd.webp" alt="Ассоциация ветеранов МВД г. Москва" width={140} height={60} className="object-contain h-full" sizes="140px" />
          </a>
        </div>
      </section>

      <section className="py-24 bg-[#F1F5F9]/50 border-y border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B8D430]/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2196D3]/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-sm border border-gray-100 mb-8">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E58B1] animate-pulse"></span>
                <p className="text-xs md:text-sm font-black text-[#1E58B1] uppercase tracking-[0.2em]">{t('about.project_info.title')}</p>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#163A5C] mb-8 leading-[1.1] tracking-tighter">
                {t('about.project_info.subtitle')}
              </h2>
              <p className="text-xl md:text-2xl text-gray-700/80 leading-relaxed font-bold border-l-4 border-[#B8D430] pl-8 py-2 mb-12">
                {t('about.project_info.intro')}
              </p>
              <div className="flex gap-4">
                <Link href={getBotUrl({ start: 'help' })} target="_blank" className="bg-[#1E58B1] hover:bg-[#163A5C] text-white px-8 py-4 rounded-2xl font-black transition-all shadow-lg hover:shadow-[#1E58B1]/30 hover:-translate-y-1">
                  {t('about.project_info.cta.help')}
                </Link>
                <Link href={getBotUrl({ start: 'question' })} target="_blank" className="bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] px-8 py-4 rounded-2xl font-black transition-all shadow-lg hover:shadow-[#B8D430]/30 hover:-translate-y-1">
                  {t('about.project_info.cta.telegram')}
                </Link>
              </div>
            </div>

            <div className={`relative`}>
              <div className="relative z-10">
                <Image
                  src="/images/migo_about_countries.webp"
                  alt={t('about.project_info.team_img_alt')}
                  width={800}
                  height={600}
                  className="rounded-[64px] shadow-2xl border-4 border-white object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-[32px] shadow-2xl border border-gray-100 hidden md:block animate-float">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#B8D430] rounded-xl flex items-center justify-center text-[#163A5C]">
                      <Users size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#163A5C] uppercase tracking-tighter">{t('about.project_info.migo_t')}</p>
                      <p className="text-xs text-gray-500 font-bold">{t('about.project_info.migo_t_desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#2196D3]/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">
            <div className="bg-white p-12 rounded-[56px] border border-gray-100 shadow-xl relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-12 text-[#2196D3]/5 group-hover:scale-110 transition-transform">
                <Globe size={180} />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#2196D3]/10 rounded-[20px] flex items-center justify-center text-[#2196D3] mb-10">
                  <Globe size={32} />
                </div>
                <h3 className="text-3xl font-black text-[#163A5C] mb-8 uppercase tracking-tight">
                  {t('about.project_info.geography.title')}
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="font-extrabold text-[#163A5C] flex items-start gap-4 text-lg">
                      <MapPin size={24} className="mt-1 flex-shrink-0 text-[#2196D3]" />
                      {t('about.project_info.geography.russia_title', 'Россия (Головные офисы)')}
                    </p>
                    <p className="text-gray-600 pl-10 mt-2 font-medium leading-relaxed">
                      {t('about.project_info.geography.russia_desc', 'Представлены в Москве (центральный офис) и Калининграде.')}
                    </p>
                  </div>

                  <div className="pt-8 border-t border-gray-100">
                    <p className="font-extrabold text-[#163A5C] mb-6 text-lg">{t('about.project_info.geography.cis_title', 'Центральная Азия')}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['kg', 'kz', 'tj', 'uz'].map((code) => (
                        <div key={code} className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl hover:bg-[#B8D430]/10 transition-colors">
                          <Image src={`/flags/${code}.webp`} alt={code} width={32} height={20} className="rounded shadow-sm" />
                          <span className="font-black text-[#163A5C] text-sm">{t(`about.project_info.geography.cities.${code}`)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm italic text-gray-500 mt-6 pl-6 border-l-2 border-[#B8D430]">
                    {t('about.project_info.geography.footer', 'Мы постоянно расширяем географию нашего присутствия.')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1E58B1] p-12 rounded-[56px] text-white shadow-xl relative group overflow-hidden">
              <div className="absolute bottom-0 right-0 p-12 text-white/5 group-hover:scale-110 transition-transform">
                <Scale size={200} />
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-16 h-16 bg-white/10 rounded-[20px] flex items-center justify-center text-[#B8D430] mb-10">
                  <Scale size={32} />
                </div>
                <h3 className="text-3xl font-black mb-8 uppercase tracking-tight">
                  {t('about.project_info.legal.title', 'Юридическая чистота')}
                </h3>
                <p className="text-xl font-bold text-[#B8D430] mb-10 leading-snug">
                  {t('about.project_info.legal.subtitle', 'Работаем строго в рамках законодательства РФ.')}
                </p>
                <ul className="space-y-4 mb-auto">
                  {[1, 2, 3].map(i => (
                    <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                      <CheckCircle2 size={24} className="text-[#B8D430] flex-shrink-0 mt-0.5" />
                      <span className="font-bold text-white/95 leading-relaxed">{t(`about.project_info.legal.feature${i}`)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-12 bg-white/10 p-6 rounded-[32px] text-center italic border border-white/5">
                  <p className="font-black text-white">{t('about.project_info.legal.footer')}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 bg-white p-12 rounded-[56px] border border-gray-100 shadow-xl group">
              <div className="w-16 h-16 bg-[#B8D430]/20 rounded-[20px] flex items-center justify-center text-[#163A5C] mb-10">
                <Handshake size={32} />
              </div>
              <h3 className="text-3xl font-black text-[#163A5C] mb-8 uppercase tracking-tight">
                {t('about.project_info.ecosystem.title', 'Экосистема MIGO')}
              </h3>
              <p className="text-gray-700 mb-10 font-bold text-lg">{t('about.project_info.ecosystem.subtitle')}</p>
              <div className="space-y-6">
                <div className="flex gap-6 items-center p-6 bg-gray-50 rounded-[32px] hover:-translate-y-1 transition-all">
                  <div className="w-16 h-16 bg-[#1E58B1] text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#1E58B1]/20">
                    <Building2 size={32} />
                  </div>
                  <div>
                    <p className="font-black text-[#163A5C] text-xl leading-tight">{t('about.project_info.ecosystem.banks_title', 'Банки-партнёры')}</p>
                    <p className="text-gray-600 mt-1 font-bold text-sm">{t('about.project_info.ecosystem.banks_desc')}</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center p-6 bg-gray-50 rounded-[32px] hover:-translate-y-1 transition-all">
                  <div className="w-16 h-16 bg-[#2196D3] text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#2196D3]/20">
                    <Briefcase size={32} />
                  </div>
                  <div>
                    <p className="font-black text-[#163A5C] text-xl leading-tight">{t('about.project_info.ecosystem.employers_title', 'Прямые работодатели')}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="bg-[#2196D3]/10 text-[#2196D3] px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter text-center flex flex-col justify-center items-center">{t('about.project_info.ecosystem.employers_desc1')}</span>
                      <span className="bg-[#B8D430]/20 text-[#163A5C] px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter text-center flex flex-col justify-center items-center">{t('about.project_info.ecosystem.employers_desc2')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-6 items-center p-6 bg-gray-50 rounded-[32px] hover:-translate-y-1 transition-all">
                  <div className="w-16 h-16 bg-[#B8D430] text-[#163A5C] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#B8D430]/20">
                    <Home size={32} />
                  </div>
                  <div>
                    <p className="font-black text-[#163A5C] text-xl leading-tight">{t('about.project_info.ecosystem.hostels_title', 'Хостелы и общежития')}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter text-center flex flex-col justify-center items-center">{t('about.project_info.ecosystem.hostels_desc1')}</span>
                      <span className="bg-[#1E58B1]/10 text-[#1E58B1] px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter text-center flex flex-col justify-center items-center">{t('about.project_info.ecosystem.hostels_desc2')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1E58B1] p-12 rounded-[56px] text-white shadow-xl relative group overflow-hidden">
              <div className="absolute top-0 left-0 p-12 text-white/5 group-hover:scale-110 transition-transform -rotate-12">
                <Heart size={200} />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-[20px] flex items-center justify-center text-[#B8D430] mb-10">
                  <Heart size={32} />
                </div>
                <h3 className="text-3xl font-black mb-8 uppercase tracking-tight">
                  {t('about.project_info.values.title', 'Наши ценности')}
                </h3>
                <p className="text-xl font-bold mb-10 text-white/90 leading-snug">
                  {t('about.project_info.values.subtitle')}
                </p>
                <div className="grid grid-cols-1 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center gap-4 bg-white/10 p-5 rounded-[28px] border border-white/10 hover:bg-white/15 transition-colors">
                      <div className="w-8 h-8 bg-[#B8D430] rounded-full flex items-center justify-center text-[#163A5C] flex-shrink-0">
                        <CheckCircle2 size={18} />
                      </div>
                      <span className="font-black text-white/95 text-sm uppercase tracking-tight">{t(`about.project_info.values.v${i}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-10 md:p-14 rounded-[48px] border border-gray-100 shadow-xl text-center max-w-4xl mx-auto">
              <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-[10px] md:text-xs font-black text-[#1E58B1] uppercase tracking-[0.4em] mb-6">
                  {t('about.project_info.idea.title')}
                </h3>
                <p className="text-xl md:text-2xl font-black text-[#163A5C] leading-relaxed">
                  {t('about.project_info.idea.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-6">{t('about.faq.title', 'Частые вопросы')}</h2>
            <p className="text-gray-700 text-lg">{t('about.faq.subtitle', 'Всё, что вам нужно знать о работе с платформой MIGO.')}</p>
          </div>

          <div className="space-y-6">
            <FAQItem
              question={t('about.faq.q1', 'Чем MIGO отличается от других сервисов?')}
              answer={t('about.faq.a1', 'Мы работаем как единая точка входа. Вам не нужно искать отдельно работу, отдельно жилье и разбираться в документах. Мы помогаем со всеми этапами «под ключ».')}
            />
            <FAQItem
              question={t('about.faq.q2', 'Ваши услуги бесплатны?')}
              answer={t('about.faq.a2', 'Телеграм-бот, каталог вакансий и базовые консультации предоставляются бесплатно. Дополнительные услуги (например, перевод документов или помощь в оформлении) оплачиваются согласно открытым тарифам.')}
            />
            <FAQItem
              question={t('about.faq.q3', 'Где вы находитесь?')}
              answer={t('about.faq.a3', 'Наши основные офисы предоставления услуг расположены в Москве и Калининграде, но наша поддержка работает дистанционно по всей России.')}
            />
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-5 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-[#163A5C] mb-10 leading-tight">{t('about.cta.title', 'Давайте делать этот мир лучше вместе')}</h2>
          <p className="text-xl text-gray-700 mb-12 font-medium">{t('about.cta.subtitle', 'Хотите стать нашим партнером или помочь в развитии проекта? Мы всегда открыты к предложениям.')}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href={getBotUrl({ start: 'about' })} target="_blank" className="bg-[#B8D430] hover:bg-[#A7C220] text-[#1E58B1] py-5 px-12 rounded-[24px] font-black text-xl shadow-2xl transition-all hover:scale-105">
              {t('about.cta.btn', 'Связаться с нами')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}