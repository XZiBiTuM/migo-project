import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { getT } from '@/utils/translations.server';

function TrustFeature({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="w-14 h-14 rounded-[20px] bg-white flex items-center justify-center shrink-0 mt-1 shadow-2xl text-[#1E58B1] group-hover:bg-[#B8D430] group-hover:scale-110 transition-all duration-500">
        <CheckCircle2 size={28} />
      </div>
      <div>
        <h4 className="text-xl md:text-2xl font-black text-white mb-2 group-hover:text-[#B8D430] transition-colors">{title}</h4>
        <p className="text-white/70 leading-relaxed text-sm md:text-lg font-medium">{desc}</p>
      </div>
    </div>
  );
}

export default function Trust({ lang, children }: { lang: string, children: React.ReactNode }) {
  const t = getT(lang);

  return (
    <section className="py-24 max-w-7xl mx-auto px-5">
      <div className="bg-[#1E58B1] rounded-[40px] p-8 md:p-20 relative overflow-hidden group shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,#2196D380_0%,transparent_50%)] opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B8D430] rounded-full blur-[100px] opacity-10"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-white">
            <div className="inline-flex items-center gap-2 text-[#B8D430] mb-6 font-bold uppercase tracking-widest text-sm">
              <ShieldCheck size={20} /> {t('home.trust.badge')}
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight">{t('home.trust.title')}</h2>

            <div className="space-y-8">
              <TrustFeature
                title={t('home.trust.feature1_title')}
                desc={t('home.trust.feature1_desc')}
              />
              <TrustFeature
                title={t('home.trust.feature2_title')}
                desc={t('home.trust.feature2_desc')}
              />
              <TrustFeature
                title={t('home.trust.feature3_title')}
                desc={t('home.trust.feature3_desc')}
              />
            </div>
          </div>
          
          <div className="flex-1 w-full relative">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
