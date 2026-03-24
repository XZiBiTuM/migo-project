"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage, T } from '@/context/LanguageContext';

const TESTIMONIALS_DATA = [
  { id: 1, avatar: "/images/avatar_1.webp" },
  { id: 2, avatar: "/images/avatar_2.webp" },
  { id: 3, avatar: "/images/avatar_3.webp" },
  { id: 4, avatar: "/images/avatar_4.webp" },
  { id: 5, avatar: "/images/avatar_5.webp" }
];

export default function Testimonials() {
  const { language, t } = useLanguage();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 w-full relative">
      <div className="relative h-[550px] sm:h-[450px] md:h-[500px] lg:h-[420px] w-full perspective-[1500px]">
        {TESTIMONIALS_DATA.map((t_item, idx) => {
          const isActive = idx === activeTestimonial;
          const diff = (idx - activeTestimonial + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length;

          let styleClass = "opacity-0 translate-x-full pointer-events-none z-0";
          let interactiveClass = "";

          if (isActive) {
            styleClass = "opacity-100 translate-x-0 z-20 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]";
            interactiveClass = "pointer-events-auto cursor-default";
          } else if (diff === TESTIMONIALS_DATA.length - 1) {
            styleClass = "opacity-0 -translate-x-full z-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]";
            interactiveClass = "pointer-events-none";
          }

          return (
            <div
              key={t_item.id}
              className={`absolute inset-0 will-change-transform ${styleClass} ${interactiveClass}`}
              style={{ transformOrigin: 'center' }}
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-[40px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] h-full flex flex-col justify-between overflow-hidden relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

                <div>
                  <div className="w-14 h-14 bg-[#B8D430] rounded-[20px] flex items-center justify-center text-3xl shadow-[0_15px_30px_-5px_rgba(184,212,48,0.4)] mb-6 transform -rotate-6 font-serif">“</div>
                  <p className="text-base md:text-lg text-white font-medium italic leading-relaxed mb-6">
                    <T path={`home.testimonials.t${t_item.id}_text`} />
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-auto border-t border-white/10 pt-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-lg shrink-0 relative">
                    <Image
                      src={t_item.avatar}
                      alt="Avatar"
                      fill
                      className="object-cover scale-125"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-black text-base truncate">
                      <T path={`home.testimonials.t${t_item.id}_author`} />
                    </h3>
                    <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-0.5 line-clamp-1 break-words">
                      <T path={`home.testimonials.t${t_item.id}_info`} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-3 mt-10 relative z-40">
        {TESTIMONIALS_DATA.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTestimonial(idx)}
            className={`h-5 rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${idx === activeTestimonial
              ? 'w-14 bg-[#B8D430] shadow-[0_0_15px_rgba(184,212,48,0.6)]'
              : 'w-5 bg-white/20 hover:bg-white/50'
              }`}
            aria-label={`Show testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
