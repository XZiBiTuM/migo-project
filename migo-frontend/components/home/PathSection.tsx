import React from 'react';
import Image from 'next/image';
import { AlertCircle, TrendingUp, TrendingDown, XCircle, CheckCircle2, Pin } from 'lucide-react';
import { getT } from '@/utils/translations.server';

export default function PathSection({ lang }: { lang: string }) {
  const t = getT(lang);

  return (
    <section className="py-24 bg-white border-y border-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-[#F8FAFC] to-transparent pointer-events-none"></div>
      <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] bg-[#1E58B1]/5 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-[20%] left-[5%] w-[700px] h-[700px] bg-[#B8D430]/5 rounded-full blur-[140px] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="text-center mb-20 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-50 text-red-500 font-black uppercase tracking-[0.25em] text-[10px] mb-8 shadow-sm border border-red-100/50">
            <AlertCircle size={14} className="animate-pulse" /> {t('home.path_section.problem_badge')}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#163A5C] mb-10 leading-[0.85] tracking-tighter">
            {t('home.path_section.title')}
          </h2>
          <p className="text-gray-700/80 text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto mb-16 leading-relaxed font-medium">
            {t('home.path_section.subtitle')}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="px-8 py-5 rounded-[32px] bg-white/80 backdrop-blur-xl border border-gray-100 flex items-center gap-5 text-sm md:text-xl font-black text-[#163A5C] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.12)] transition-all cursor-default group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-2xl bg-[#2196D3]/10 flex items-center justify-center text-[#2196D3] group-hover:scale-110 group-hover:bg-[#2196D3] group-hover:text-white transition-all duration-500 shadow-sm">
                  <Pin size={24} className="group-hover:rotate-45 transition-transform" />
                </div>
                {t(`home.path_section.problem_${i}`)}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-32 items-stretch">
          {/* Путь БЕЗ MIGO */}
          <div className="relative group flex h-full">
            <div className="absolute -inset-4 bg-gradient-to-br from-red-50/50 to-transparent rounded-[72px] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative w-full bg-[#FCFBFB] rounded-[64px] p-8 md:p-14 border border-gray-100 shadow-[30px_50px_100px_-40px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-1000 hover:shadow-[40px_60px_120px_-30px_rgba(0,0,0,0.15)] flex flex-col items-stretch">
              <div className="flex items-start gap-6 mb-16 relative z-10">
                <div className="w-20 h-20 rounded-[28px] bg-red-50 flex items-center justify-center text-red-500 shadow-sm border border-red-100/50 group-hover:rotate-6 transition-transform duration-700">
                  <TrendingDown size={40} />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-[#163A5C] tracking-tighter leading-[0.9] uppercase max-w-[200px]">
                    {t('home.path_section.without_migo.title')}
                  </h3>
                  <p className="text-red-400 font-bold text-xs uppercase tracking-[0.3em] mt-3 flex items-center gap-2">
                    <AlertCircle size={14} className="animate-pulse" /> Хаос и риски
                  </p>
                </div>
              </div>

              <div className="relative flex-1">
                <div className="absolute left-[13px] top-8 bottom-8 w-[2px] border-l-2 border-dashed border-red-200/50 z-0"></div>
                <div className="space-y-12 relative z-10">
                  {[1, 2, 3, 4, 5, 6].map(idx => (
                    <div key={idx} className="flex gap-8 group/item translate-x-0 hover:translate-x-3 transition-all duration-500">
                      <div className="w-7 h-7 rounded-full bg-white border-4 border-red-100 shadow-md flex items-center justify-center shrink-0 mt-1.5 group-hover/item:bg-red-500 group-hover/item:border-red-200 transition-all duration-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-300 group-hover/item:bg-white scale-100 group-hover/item:scale-0 transition-transform"></div>
                      </div>
                      <div>
                        <h4 className="font-black text-[#163A5C] mb-3 text-2xl tracking-tight leading-tight group-hover/item:text-red-600 transition-colors">{t(`home.path_section.without_migo.step${idx}_title`)}</h4>
                        <p className="text-gray-700/80 leading-relaxed font-medium text-lg max-w-sm">{t(`home.path_section.without_migo.step${idx}_desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-20 bg-red-50/50 backdrop-blur-xl rounded-[40px] p-10 border border-red-100 shadow-sm relative overflow-hidden group/result">
                <div className="absolute top-0 right-0 p-6 opacity-5 translate-x-4 -translate-y-4 group-hover/result:translate-x-0 group-hover/result:translate-y-0 transition-transform duration-700">
                  <XCircle size={120} />
                </div>
                <div className="flex items-center gap-3 text-red-600 font-black mb-5 uppercase tracking-[0.3em] text-[11px] relative z-10">
                  <XCircle size={22} /> {t('home.path_section.without_migo.step_result_title')}
                </div>
                <p className="font-black text-[#163A5C] text-2xl md:text-3xl leading-tight relative z-10 tracking-tight">
                  {t('home.path_section.without_migo.step_result_desc')}
                </p>
              </div>

              <div className="mt-14 rounded-[48px] overflow-hidden border border-gray-100 shadow-2xl grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 group-hover:scale-[1.02] aspect-[3/2] relative">
                <Image src="/images/path_without_migo.webp" alt="Путь без MIGO" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Путь С MIGO */}
          <div className="relative group flex h-full">
            <div className="absolute -inset-6 bg-gradient-to-br from-[#2196D3]/20 to-[#B8D430]/20 rounded-[80px] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative w-full bg-white rounded-[64px] p-8 md:p-14 border border-[#2196D3]/10 shadow-[40px_70px_120px_-40px_rgba(33,150,211,0.2)] overflow-hidden transition-all duration-1000 hover:shadow-[50px_80px_140px_-30px_rgba(33,150,211,0.25)] flex flex-col items-stretch">
              <div className="flex items-start gap-6 mb-16 relative z-10">
                <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-[#2196D3] to-[#1E58B1] flex items-center justify-center text-white shadow-[0_20px_50px_-10px_rgba(33,150,211,0.5)] animate-float-slow">
                  <TrendingUp size={40} />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-[#1E58B1] tracking-tighter leading-[0.9] uppercase max-w-[200px]">
                    {t('home.path_section.with_migo.title')}
                  </h3>
                  <p className="text-[#B8D430] font-black text-xs uppercase tracking-[0.3em] mt-3 flex items-center gap-2">
                    <CheckCircle2 size={14} className="animate-bounce-slow" /> Полный контроль
                  </p>
                </div>
              </div>

              <div className="relative flex-1">
                <div className="absolute left-[15px] top-10 bottom-10 w-[4px] bg-gradient-to-b from-[#2196D3] via-[#B8D430] to-[#2196D3] z-0 shadow-[0_0_20px_rgba(33,150,211,0.4)] rounded-full"></div>
                <div className="space-y-12 relative z-10">
                  {[1, 2, 3, 4, 5, 6].map(idx => (
                    <div key={idx} className="flex gap-8 group/item translate-x-0 hover:translate-x-4 transition-all duration-500">
                      <div className="w-8 h-8 rounded-full bg-white border-[6px] border-[#2196D3] shadow-lg flex items-center justify-center shrink-0 mt-1 transition-all duration-500 group-hover/item:scale-125 group-hover/item:shadow-[0_0_20px_rgba(33,150,211,0.4)] ring-4 ring-white">
                        <div className="w-2 h-2 rounded-full bg-[#B8D430] animate-pulse"></div>
                      </div>
                      <div>
                        <h4 className="font-black text-[#163A5C] mb-3 text-2xl tracking-tight leading-tight group-hover/item:text-[#2196D3] transition-colors">{t(`home.path_section.with_migo.step${idx}_title`)}</h4>
                        <p className="text-gray-700/80 leading-relaxed font-medium text-lg max-w-sm">{t(`home.path_section.with_migo.step${idx}_desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-20 bg-gradient-to-br from-[#1E58B1] to-[#2196D3] rounded-[48px] p-10 border border-white/20 shadow-2xl relative overflow-hidden group/success">
                <div className="absolute inset-0 bg-[url('/patterns/cubes.webp')] opacity-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 p-8 opacity-10 translate-x-4 -translate-y-4 group-hover/success:translate-x-0 group-hover/success:translate-y-0 transition-transform duration-1000">
                  <CheckCircle2 size={140} />
                </div>
                <div className="flex items-center gap-3 text-[#B8D430] font-black mb-5 uppercase tracking-[0.3em] text-[11px] relative z-10">
                  <div className="w-2 h-1 md:h-2 lg:h-2 rounded-full bg-[#B8D430] animate-ping"></div> {t('home.path_section.with_migo.result')}
                </div>
                <p className="font-black text-white text-2xl md:text-3xl leading-tight relative z-10 tracking-tight">
                  {t('home.path_section.with_migo.desc')}
                </p>
              </div>

              <div className="mt-14 rounded-[48px] overflow-hidden border border-[#B8D430]/30 shadow-[0_40px_80px_-20px_rgba(184,212,48,0.3)] transition-all duration-1000 hover:scale-[1.03] group-hover:rotate-1 aspect-[3/2] relative">
                <Image src="/images/path_with_migo.webp" alt="Путь с MIGO" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

