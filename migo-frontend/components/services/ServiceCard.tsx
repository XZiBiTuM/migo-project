"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBotUrl } from '@/utils/bot';
import ServiceModal from '@/components/ServiceModal';
import {
  ArrowRight, FileText, Send, Zap, Wallet, Home
} from 'lucide-react';

const COLORS = {
  navy: '#1E58B1',
  textNavy: '#163A5C',
  blue: '#2196D3',
  accent: '#B8D430',
  green: '#27A15E',
  bg: '#F8FAFC',
  white: '#FFFFFF',
};

const getServiceIcon = (type: string) => {
  switch (type) {
    case 'housing': return <Home />;
    case 'docs': return <FileText />;
    case 'finance': return <Wallet />;
    default: return <Zap />;
  }
};

const getServiceColor = (type: string) => {
  switch (type) {
    case 'housing': return COLORS.blue;
    case 'docs': return COLORS.navy;
    case 'finance': return COLORS.accent;
    default: return COLORS.blue;
  }
};

export default function ServiceCard({ svc, lang, translations }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const icon = getServiceIcon(svc.service_type);
  const color = getServiceColor(svc.service_type);
  
  const title = (lang !== 'ru' && svc[`title_${lang}`]) || svc.title;
  const description = (lang !== 'ru' && svc[`short_description_${lang}`]) || svc.short_description;
  const priceConditions = (lang !== 'ru' && svc[`price_conditions_${lang}`]) || svc.price_conditions;

  const isFree = priceConditions?.toString().toLowerCase().includes('бесплатно') ||
    priceConditions?.toString().toLowerCase().includes('bepul') ||
    priceConditions?.toString().toLowerCase().includes('tegin');

  const modalService = { title, icon, color, image: svc.image };

  return (
    <>
      <div className="group bg-white rounded-[48px] p-8 md:p-10 border border-gray-100 hover:border-[#1E58B1] hover:shadow-[0_45px_75px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col transform hover:-translate-y-2 h-full shadow-sm">
        <div className="flex justify-between items-start mb-10">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#1E58B1] bg-[#1E58B1]/5 transform group-hover:scale-110 group-hover:bg-[#B8D430] group-hover:text-[#163A5C] transition-all duration-500 shadow-sm overflow-hidden">
            {svc.image ? (
              <div className="relative w-full h-full">
                <Image
                  src={svc.image.startsWith('http') ? svc.image : `${process.env.NEXT_PUBLIC_API_URL}${svc.image}`}
                  alt={title} fill className="object-cover scale-110"
                />
              </div>
            ) : (
              React.cloneElement(icon as React.ReactElement, { size: 32 } as any)
            )}
          </div>
          {isFree && (
            <span className="px-4 py-1.5 rounded-full bg-[#27A15E]/10 text-[#27A15E] text-xs font-black uppercase tracking-widest border border-[#27A15E]/20">
              {translations.freeTag}
            </span>
          )}
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-[#163A5C] mb-6 group-hover:text-[#1E58B1] transition-colors leading-tight tracking-tighter">{title}</h3>
        <p className="text-gray-700 leading-relaxed mb-8 font-medium">{description}</p>
        <div className="mt-auto flex flex-col gap-4">
          <Link href={getBotUrl({ start: svc.slug })} target="_blank" className="inline-flex items-center justify-center gap-3 bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] py-5 px-8 rounded-[24px] font-black text-lg transition-all hover:scale-105 shadow-[0_10px_20px_-5px_rgba(184,212,48,0.3)]">
            <Send size={20} /> {translations.orderTg}
          </Link>
          <div className="flex gap-2 flex-col">
            <Link href={`/${lang}/services/${svc.slug}`} className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 py-4 px-4 rounded-[20px] font-bold text-sm border border-gray-100 transition-all hover:shadow-md">
              {translations.more} <ArrowRight size={16} />
            </Link>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex-1 cursor-pointer inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#1E58B1] py-4 px-4 rounded-[20px] font-bold text-sm border border-gray-100 transition-all hover:shadow-md"
            >
              <FileText size={18} /> {translations.orderSite}
            </button>
          </div>
        </div>
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={modalService}
      />
    </>
  );
}
