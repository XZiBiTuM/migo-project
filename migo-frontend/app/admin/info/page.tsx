"use client";

import React from 'react';
import {
   Info, Globe, Server, Code, Database,
   MessageCircle, ExternalLink, ShieldCheck, Zap
} from 'lucide-react';

export default function ProjectInfoPage() {
   return (
      <div className="pb-20 max-w-5xl">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
               <h1 className="text-3xl font-extrabold text-[#163A5C] mb-2 flex items-center gap-3">
                  <Info className="text-[#2196D3]" /> Информация о проекте
               </h1>
               <p className="text-gray-500 font-medium">Общие сведения о платформе MIGO и её архитектуре</p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm relative overflow-hidden group">
               <Globe className="text-[#2196D3]/10 absolute -right-10 -bottom-10 group-hover:scale-110 transition-transform" size={240} />
               <h2 className="text-2xl font-black text-[#163A5C] mb-6 flex items-center gap-3">
                  Миссия MIGO
               </h2>
               <p className="text-gray-600 font-medium leading-relaxed mb-6">
                  MIGO — это единая цифровая платформа для мигрантов, объединяющая в себе инструменты поиска жилья, работы и юридической помощи. Наша цель — сделать процесс легализации и интеграции максимально прозрачным и безопасным.
               </p>
               <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm font-bold text-[#163A5C]">
                     <div className="w-1.5 h-1.5 bg-[#B8D430] rounded-full"></div> Поиск проверенных вакансий
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-[#163A5C]">
                     <div className="w-1.5 h-1.5 bg-[#B8D430] rounded-full"></div> Аренда безопасного жилья
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-[#163A5C]">
                     <div className="w-1.5 h-1.5 bg-[#B8D430] rounded-full"></div> Юридическая поддержка 24/7
                  </li>
               </ul>
            </div>

            <div className="bg-[#163A5C] rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center">
               <Zap className="text-[#B8D430]/10 absolute -left-10 -bottom-10" size={200} />
               <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                  Технологический стек
               </h2>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <Code className="text-[#2196D3]" size={18} />
                        <div>
                           <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Frontend</div>
                           <div className="text-sm font-bold">Next.js + Tailwind</div>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <Server className="text-[#B8D430]" size={18} />
                        <div>
                           <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Backend</div>
                           <div className="text-sm font-bold">Django REST</div>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <Database className="text-[#2196D3]" size={18} />
                        <div>
                           <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Database</div>
                           <div className="text-sm font-bold">PostgreSQL</div>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <MessageCircle className="text-[#B8D430]" size={18} />
                        <div>
                           <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Integration</div>
                           <div className="text-sm font-bold">Telegram API</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm mb-12">
            <h2 className="text-xl font-black text-[#163A5C] mb-8 flex items-center gap-3">
               <ShieldCheck className="text-[#2196D3]" size={24} /> Статус системы и Безопасность
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-6 bg-gray-50 rounded-[32px] border border-gray-100">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Версия</div>
                  <div className="text-lg font-black text-[#163A5C]">v2.4.0-release</div>
               </div>
               <div className="p-6 bg-gray-50 rounded-[32px] border border-gray-100">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Безопасность</div>
                  <div className="text-lg font-black text-green-600">JWT SSL SSL/TLS</div>
               </div>
               <div className="p-6 bg-gray-50 rounded-[32px] border border-gray-100">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Локализация</div>
                  <div className="text-lg font-black text-[#163A5C]">RU / UZ / KG / KZ</div>
               </div>
            </div>
         </div>

         <div className="text-center">
            <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">Связь с разработчиком</p>
            <a
               href="https://t.me/xzibitum"
               target="_blank"
               rel="noreferrer"
               className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-gray-100 rounded-full text-[#163A5C] font-bold shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
               <MessageCircle size={20} className="text-[#2196D3]" /> Написать в поддержку <ExternalLink size={16} className="text-gray-300 group-hover:text-[#2196D3]" />
            </a>
         </div>
      </div>
   );
}
