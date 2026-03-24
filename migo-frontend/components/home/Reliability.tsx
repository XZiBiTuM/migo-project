import React from 'react';
import { ShieldCheck, Check, Lock, Zap, XCircle } from 'lucide-react';
import { getT } from '@/utils/translations.server';

export default function Reliability({ lang }: { lang: string }) {
  const t = getT(lang);

  return (
    <section className="bg-white pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 relative">
        <div className="bg-white/40 backdrop-blur-xl border border-white/80 rounded-[56px] p-8 md:p-16 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden group">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1E58B1 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,#B8D43015_0%,transparent_40%)] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-3 mb-10 px-4 md:px-6 py-2.5 md:py-3 rounded-full bg-white border border-gray-100 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.05)] text-[#1E58B1] font-black uppercase tracking-wide md:tracking-[0.3em] text-[8px] md:text-[10px] max-w-full">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-[10px] md:rounded-xl bg-[#B8D430] flex items-center justify-center text-white shadow-[0_5px_15px_-3px_rgba(184,212,48,0.4)] flex-none">
                <ShieldCheck size={14} className="md:size-4" />
              </div>
              <span className="truncate md:whitespace-normal">{t('home.path_section.reliability.title')}</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-8 leading-tight tracking-tight">
              {t('home.path_section.reliability.priority_title')}
            </h2>

            <p className="text-gray-700/80 text-lg md:text-xl mb-12 font-medium leading-relaxed max-w-xl">
              {t('home.path_section.reliability.subtitle')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="flex items-center gap-4 group/feat">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#B8D430] shadow-sm border border-gray-100 shrink-0 group-hover/feat:bg-[#B8D430] group-hover/feat:text-white transition-all flex-none aspect-square">
                    <Check size={22} strokeWidth={3} />
                  </div>
                  <span className="font-bold text-[#163A5C] text-sm md:text-base tracking-tight leading-snug">{t(`home.path_section.reliability.feat${i}`)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group/card-3d perspective-[2000px]">
            <div className="absolute -inset-20 bg-gradient-to-br from-[#1E58B1]/10 via-transparent to-[#B8D430]/10 rounded-full blur-[100px] opacity-60"></div>

            <div className="relative bg-[#1E58B1] p-8 md:p-12 rounded-[56px] shadow-[0_40px_100px_-20px_rgba(30,88,177,0.3)]">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20"></div>
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Lock size={120} className="text-white transform rotate-12" />
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center text-[#B8D430] mb-10 shadow-inner">
                <Zap size={32} className="animate-float" />
              </div>

              <div className="space-y-10 relative z-10">
                <div className="flex items-start gap-6 group/bad-idea">
                  <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center text-white/50 shrink-0 mt-1">
                    <XCircle size={22} />
                  </div>
                  <p className="font-bold text-lg md:text-2xl text-white/60 italic leading-tight group-hover/bad-idea:text-white/95 transition-colors">
                    {t('home.path_section.main_idea.without')}
                  </p>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                <div className="flex items-start gap-6 group/good-idea">
                  <p className="font-black text-2xl md:text-4xl text-white text-center leading-tight tracking-tight">
                    {t('home.path_section.main_idea.with')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
