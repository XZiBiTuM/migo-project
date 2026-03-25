import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, MessageCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { getT } from '@/utils/translations.server';
import { getBotUrl } from '@/utils/bot';

export default function Hero({ lang }: { lang: string }) {
  const t = getT(lang);

  return (
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
              <p className="text-[10px] md:text-sm font-black text-[#1E58B1] uppercase tracking-[0.15em] truncate">{t('home.hero.badge')}</p>
            </div>

            <div className="mb-6 overflow-hidden min-h-[32px]">
              <p className="text-[#1E58B1] font-black text-sm md:text-xl uppercase tracking-wider md:tracking-[0.4em] mb-4 opacity-90 whitespace-nowrap md:whitespace-normal">
                {t('home.hero.tagline')}
              </p>
            </div>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-[#163A5C] leading-[0.95] mb-8 tracking-tighter">
              {t('home.hero.title_1')}<br />
              <span className="text-transparent w-full inline-block bg-clip-text bg-gradient-to-r from-[#1E58B1] to-[#2196D3]">{t('home.hero.title_2')}</span>
            </h1>

            <p className="text-lg md:text-2xl text-gray-700/80 mb-12 max-w-2xl leading-relaxed font-medium">
              {t('home.hero.subtitle')}
            </p>

            <div className="grid grid-cols-1 sm:flex gap-4 w-full sm:w-auto">
              <Link href={`/${lang}/work`} className="group bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] py-5 px-10 rounded-[32px] font-black text-lg flex items-center justify-center gap-3 shadow-[0_15px_30px_-5px_rgba(184,212,48,0.5)] transition-all hover:scale-105 active:scale-95">
                <Briefcase className="w-6 h-6" /> {t('home.hero.btn_work')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link href={getBotUrl({ start: 'help' })} target="_blank" className="bg-white hover:bg-gray-50 text-[#1E58B1] py-5 px-10 rounded-[32px] font-black text-lg flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-105 border border-gray-100 active:scale-95">
                <MessageCircle className="w-6 h-6" /> {t('mobile_nav.telegram')}
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
                className="w-full h-auto shadow-[0_35px_35px_rgba(0,0,0,0.15)] rounded-[64px]"
                priority={true}
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
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
  );
}
