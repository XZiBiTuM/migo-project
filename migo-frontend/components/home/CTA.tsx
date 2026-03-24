import React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { getT } from '@/utils/translations.server';
import { getBotUrl } from '@/utils/bot';

export default function CTA({ lang }: { lang: string }) {
  const t = getT(lang);

  return (
    <section className="py-20 max-w-7xl mx-auto px-5">
      <div className="bg-gradient-to-br from-[#1E58B1] via-[#1A4B75] to-[#2196D3] rounded-[64px] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('/patterns/cubes.webp')] opacity-10"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-6xl font-black text-white mb-8">{t('home.cta.title')}</h2>
          <p className="text-white/90 text-xl md:text-2xl mb-12 leading-relaxed">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={getBotUrl({ source: 'home_cta' })} 
              target="_blank" 
              className="bg-[#B8D430] hover:bg-[#A7C220] text-[#1E58B1] py-6 px-12 rounded-[32px] font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-2xl"
            >
              <MessageCircle size={28} /> {t('home.cta.btn_write')}
            </Link>
            <Link 
              href={`/${lang}/services`} 
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white py-6 px-12 rounded-[32px] font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-105"
            >
              {t('home.cta.btn_services')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

