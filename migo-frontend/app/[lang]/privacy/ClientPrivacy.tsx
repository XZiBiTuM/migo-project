import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, ChevronRight } from 'lucide-react';
import { getT } from '@/utils/translations.server';

export default function ClientPrivacy({ lang }: { lang: string }) {
  const t = getT(lang);
  const currentLang = lang.toLowerCase();

  return (
    <main className="pb-24 bg-[#F8FAFC] selection:bg-[#B8D430]/30 min-h-screen">
      <section className="relative pt-32 pb-20 overflow-hidden px-5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#2196D3]/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#B8D430]/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Link href={`/${currentLang}/`} className="group flex items-center gap-3 text-[#163A5C] font-black uppercase tracking-widest text-xs hover:text-[#2196D3] transition-colors mb-12">
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#1E58B1] group-hover:text-white transition-all">
              <ArrowLeft size={18} />
            </div>
            {t('privacy.back_home', 'На главную')}
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#1E58B1]/5 flex items-center justify-center text-[#1E58B1]">
              <Shield size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#163A5C] tracking-tight">
              {t('privacy.title_1', 'Политика')} <br />
              {t('privacy.title_2', 'конфиденциальности')}
            </h1>
          </div>

          <p className="text-gray-400 font-medium text-lg max-w-2xl leading-relaxed">
            {t('privacy.subtitle', 'Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сервиса MIGO (ООО «ПРМ»).')}
          </p>
        </div>
      </section>

      <section className="px-5">
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] p-8 md:p-16 shadow-xl border border-gray-50">
          <div className="space-y-12 text-gray-600 leading-relaxed font-medium text-lg">

            <Section title={t('privacy.s1_title', '1. Сбор персональных данных')}>
              {t('privacy.s1_content', 'Мы собираем минимально необходимый объем данных для предоставления наших услуг. При оставлении заявки на сайте мы можем запрашивать:')}
              <ul className="mt-6 space-y-4">
                <ListItem>{t('privacy.s1_list_1', 'Имя;')}</ListItem>
                <ListItem>{t('privacy.s1_list_2', 'Номер телефона;')}</ListItem>
                <ListItem>{t('privacy.s1_list_3', 'Никнейм в Telegram (при переходе в бот).')}</ListItem>
              </ul>
            </Section>

            <Section title={t('privacy.s2_title', '2. Использование данных')}>
              {t('privacy.s2_content', 'Ваши персональные данные используются исключительно для:')}
              <ul className="mt-6 space-y-4">
                <ListItem>{t('privacy.s2_list_1', 'Связи с вами для оказания консультационных услуг;')}</ListItem>
                <ListItem>{t('privacy.s2_list_2', 'Подбора подходящих вакансий, жилья или услуг;')}</ListItem>
                <ListItem>{t('privacy.s2_list_3', 'Улучшения качества работы нашего сервиса.')}</ListItem>
              </ul>
            </Section>

            <Section title={t('privacy.s3_title', '3. Защита и передача данных')}>
              {t('privacy.s3_content', 'Мы предпринимаем все необходимые технические меры для защиты ваших данных от несанкционированного доступа. Мы не передаем ваши контактные данные третьим лицам без вашего явного согласия, за исключением случаев, предусмотренных законодательством РФ, или когда это необходимо для оказания услуги.')}
            </Section>

            <Section title={t('privacy.s4_title', '4. Контактная информация')}>
              {t('privacy.s4_content_1', 'Если у вас есть вопросы по поводу обработки ваших данных, вы можете связаться с нами по телефону ')} <span className="text-[#163A5C] font-black">+7 921 854 39 09</span> {t('privacy.s4_content_2', ' или написать в наш Telegram-бот.')}
            </Section>

          </div>

          <div className="mt-20 pt-10 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm font-black text-[#163A5C] uppercase tracking-widest opacity-40">{t('privacy.updated', 'Обновлено в 2026 году')}</div>
            <Link href={`/${currentLang}/terms`} className="flex items-center gap-2 text-[#2196D3] font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-transform">
              {t('privacy.terms_link', 'Пользовательское соглашение')} <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-black text-[#163A5C] mb-6 tracking-tight uppercase tracking-widest text-sm">{title}</h2>
      <div className="text-gray-500 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <div className="mt-2 w-2 h-2 rounded-full bg-[#B8D430] shrink-0" />
      <span>{children}</span>
    </li>
  );
}
