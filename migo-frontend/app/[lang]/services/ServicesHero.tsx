import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { T } from '@/context/LanguageContext';
import { getBotUrl } from '@/utils/bot';

export default function ServicesHero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-5 pt-32 pb-20 md:pt-0 md:pb-0">
            <div className="absolute inset-0 z-0 text-center">
                <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#2196D3]/15 rounded-full blur-[140px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#B8D430]/10 rounded-full blur-[120px]"></div>
                <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-white rounded-full blur-[100px] opacity-40"></div>
                <div className="absolute inset-0 bg-white/30"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-sm mb-8 animate-bounce-slow">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#B8D430] shadow-[0_0_10px_#B8D430]"></span>
                            <p className="text-xs md:text-sm font-black text-[#1E58B1] uppercase tracking-[0.25em]">
                                <T path="services.hero.badge">Сервисы и Документы</T>
                            </p>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#163A5C] leading-[0.95] mb-8 tracking-tighter">
                            <T path="services.hero.title_1">Все услуги для жизни</T><br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E58B1] to-[#2196D3]">
                                <T path="services.hero.title_highlight">в одном касании</T>
                            </span>
                        </h1>

                        <p className="text-lg md:text-2xl text-gray-700/80 mb-12 max-w-xl leading-relaxed font-medium">
                            <T path="services.hero.subtitle">От перевода документов до получения патента. Официально, быстро и без очередей через Telegram-бот.</T>
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full sm:w-auto">
                            <Link
                                href={getBotUrl({ start: 'services', source: 'site_services' })}
                                target="_blank"
                                className="group bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] py-5 px-10 rounded-[32px] font-black text-xl flex items-center justify-center gap-3 shadow-[0_15px_30px_-5px_rgba(184,212,48,0.5)] transition-all hover:-translate-y-1.5 active:scale-95"
                            >
                                <MessageCircle className="w-7 h-7" /> <T path="services.hero.btn">Заказать в Telegram</T>
                            </Link>
                        </div>
                    </div>

                    <div className="relative group perspective-[2000px] mt-0 lg:mt-8 md:mt-4">
                        <div className="relative z-10 animate-float">
                            <Image
                                src="/images/migo_services_friendly.webp"
                                alt="MIGO Изображение с счастливыми мигрантами и документами"
                                width={800}
                                height={600}
                                className="w-full h-auto shadow-[0_45px_45px_rgba(0,0,0,0.15)] rounded-[64px]"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-br from-[#1E58B1]/10 to-transparent rounded-full -z-10 blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}