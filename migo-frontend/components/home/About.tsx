import React from 'react';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { getT } from '@/utils/translations.server';

export default function About({ lang }: { lang: string }) {
  const t = getT(lang);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/4 h-full bg-[#F8FAFC] rounded-l-[100px] -mr-20 z-0"></div>
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="pt-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2196D3]/10 text-[#1E58B1] font-black uppercase tracking-widest text-[10px] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#1E58B1] animate-pulse"></span>
              {t('home.about_section.badge')}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-[#163A5C] mb-8 leading-tight">
              {t('home.about_section.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E58B1] to-[#2196D3]">{t('home.about_section.title_highlight')}</span>
            </h2>
            <div className="space-y-6 text-base text-gray-700 leading-relaxed max-w-lg">
              <p>
                <strong>MIGO</strong> {t('home.about_section.desc_1')}
              </p>
              <p>
                {t('home.about_section.desc_2')}
              </p>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-black text-[#B8D430]">24/7</span>
                <span className="text-[10px] font-bold text-gray-700 mt-2 uppercase tracking-wider">{t('home.about_section.stat_support')}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-black text-[#2196D3]">100%</span>
                <span className="text-[10px] font-bold text-gray-700 mt-2 uppercase tracking-wider">{t('home.about_section.stat_legal')}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-black text-[#163A5C]">{t('home.about_section.stat_click')}</span>
                <span className="text-[10px] font-bold text-gray-700 mt-2 uppercase tracking-wider">{t('home.about_section.stat_telegram')}</span>
              </div>
            </div>
          </div>

          <div className="relative h-full min-h-[450px] w-full rounded-[48px] overflow-hidden shadow-2xl group">
            <Image
              src="/images/about.webp"
              alt={t('home.about_section.alt_image')}
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
  );
}
