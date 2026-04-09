import React from 'react';
import Link from 'next/link';
import { getBotUrl } from '@/utils/bot';
import {
  MessageCircle, FileText, Send
} from 'lucide-react';
import { getT } from '@/utils/translations.server';
import ServiceCard from '@/components/services/ServiceCard';
import { FAQItem } from '@/components/about/FAQItem';

export default function ClientServices({ freeServices, docServices, extraServices, lang }: any) {
  const t = getT(lang);

  const cardTranslations = {
    freeTag: t('services.free_tag', 'Бесплатно'),
    orderTg: t('services.docs_section.order_tg', 'Узнать в Telegram'),
    orderSite: t('services.docs_section.order_site', 'Заявка'),
    more: t('services.extra_section.more', 'Подробнее'),
  };

  return (
    <div className="pb-24 bg-[#F8FAFC] selection:bg-[#B8D430]/30">
      {freeServices.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-5 scroll-mt-20" id="free">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-left">
            <div className="max-w-2xl">
              <p className="text-[#27A15E] font-black uppercase tracking-[0.3em] text-sm mb-4">{t('services.free_section.label', 'Бесплатная помощь')}</p>
              <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-4">{t('services.free_section.title', 'Сервисы по 0 рублей')}</h2>
              <p className="text-gray-700 text-lg">{t('services.free_section.subtitle', 'Помогаем адаптироваться и оформить базовые услуги бесплатно.')}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {freeServices.map((svc: any) => (
              <ServiceCard key={svc.id} svc={svc} lang={lang} translations={cardTranslations} />
            ))}
          </div>
        </section>
      )}

      <section className="py-24 max-w-7xl mx-auto px-5 scroll-mt-20" id="documents">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-left">
          <div className="max-w-2xl">
            <p className="text-[#B8D430] font-black uppercase tracking-[0.3em] text-sm mb-4">{t('services.docs_section.label', 'Документы')}</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-4">{t('services.docs_section.title', 'Оформление документов')}</h2>
            <p className="text-gray-700 text-lg">{t('services.docs_section.subtitle', 'Полный пакет документов для легальной работы и проживания.')}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {docServices.map((svc: any) => (
            <ServiceCard key={svc.id} svc={svc} lang={lang} translations={cardTranslations} />
          ))}
        </div>
      </section>

      <section className="py-24 bg-white border-y border-gray-100 scroll-mt-20" id="services">
        <div className="max-w-7xl mx-auto px-5 text-left">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <p className="text-[#2196D3] font-black uppercase tracking-[0.3em] text-sm mb-4">{t('services.extra_section.label', 'Сервисы')}</p>
              <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-4">{t('services.extra_section.title', 'Дополнительные услуги')}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {extraServices.map((svc: any) => (
              <ServiceCard key={svc.id} svc={svc} lang={lang} translations={cardTranslations} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-5">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-6">{t('services.steps.title', 'Как работает MIGO')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { num: '01', title: t('services.steps.step1_title'), desc: t('services.steps.step1_desc') },
            { num: '02', title: t('services.steps.step2_title'), desc: t('services.steps.step2_desc') },
            { num: '03', title: t('services.steps.step3_title'), desc: t('services.steps.step3_desc') },
            { num: '04', title: t('services.steps.step4_title'), desc: t('services.steps.step4_desc') },
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[#2196D3]/10 text-[#2196D3] flex items-center justify-center font-black text-xl mb-6 group-hover:bg-[#2196D3] group-hover:text-white transition-all">{step.num}</div>
              <h3 className="text-xl font-bold text-[#163A5C] mb-3">{step.title}</h3>
              <p className="text-gray-700 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white border-y border-gray-100 scroll-mt-20" id="faq">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#163A5C] mb-6">
              {t('services.faq.title', 'Часто задаваемые вопросы')}
            </h2>
          </div>

          <div className="space-y-6">
            <FAQItem
              question={t('services.faq.q1', 'Как быстро я получу ответ?')}
              answer={t('services.faq.a1', 'Наши менеджеры работают ежедневно. В Telegram боте вы получите первый ответ в течение 10-15 минут в рабочее время.')}
            />
            <FAQItem
              question={t('services.faq.q2', 'Нужно ли платить заранее?')}
              answer={t('services.faq.a2', 'Большинство консультаций бесплатны. Стоимость услуг фиксируется в начале работы и оплачивается по факту или этапами.')}
            />
            <FAQItem
              question={t('services.faq.q3', 'Помогаете ли вы с оформлением патента?')}
              answer={t('services.faq.a3', 'Да, мы предоставляем полный список документов и помогаем записаться в миграционный центр.')}
            />
            <FAQItem
              question={t('services.faq.q4', 'Какие документы нужны для перевода passports?')}
              answer={t('services.faq.a4', 'Достаточно оригинала паспорта. Мы делаем нотариальный перевод и заверение в течение 1 рабочего дня.')}
            />
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-5">
        <div className="bg-gradient-to-br from-[#2196D3] to-[#1E58B1] rounded-[48px] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
              {t('services.cta.title', 'Не нашли нужную услугу?')}
            </h2>
            <p className="text-white/80 text-xl font-medium mb-12">
              {t('services.cta.subtitle', 'Напишите нам в Telegram — мы поможем решить практически любой вопрос, связанный с работой и жизнью в России.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={getBotUrl({ start: 'support' })}
                target="_blank"
                className="bg-[#B8D430] hover:bg-[#A7C220] text-[#1E58B1] py-5 px-12 rounded-[24px] font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-105"
              >
                <MessageCircle size={28} /> {t('services.cta.btn', 'Написать менеджеру')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}