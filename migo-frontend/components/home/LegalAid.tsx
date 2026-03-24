import React from 'react';
import Link from 'next/link';
import { Scale, MessageCircle } from 'lucide-react';
import { getT } from '@/utils/translations.server';
import { getBotUrl } from '@/utils/bot';

export default function LegalAid({ lang }: { lang: string }) {
  const t = getT(lang);

  return (
    <section className="py-24 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-5">
        <div className="bg-[#F8FAFC] rounded-[48px] p-8 md:p-16 border border-gray-100 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-sm">
          <div className="flex-1 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-[#2196D3] font-bold uppercase tracking-widest text-xs mb-6 shadow-sm">
              <Scale size={16} /> {t('home.legal_aid.badge')}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-6 tracking-tight">
              {t('home.legal_aid.title')} <span className="text-[#2196D3]">{t('home.legal_aid.title_highlight')}</span>
            </h2>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
              {t('home.legal_aid.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={getBotUrl({ start: 'law', source: 'home_aid' })}
                target="_blank"
                className="bg-[#1E58B1] hover:bg-[#16489a] text-white py-4 px-8 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:shadow-lg active:scale-95"
              >
                <MessageCircle size={20} /> {t('home.legal_aid.btn')}
              </Link>
            </div>
          </div>

          <div className="hidden md:flex flex-1 justify-end relative z-10">
            <div className="w-72 h-72 bg-gradient-to-br from-[#2196D3]/20 to-[#B8D430]/20 rounded-[40px] rotate-6 flex items-center justify-center border border-white/50 backdrop-blur-xl shadow-2xl relative">
              <div className="absolute inset-0 border border-white/60 rounded-[40px] -rotate-12 transition-transform hover:rotate-0 duration-500"></div>
              <Scale size={120} className="text-[#163A5C]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


