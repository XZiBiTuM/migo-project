import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, ChevronRight } from 'lucide-react';
import { getT } from '@/utils/translations.server';

export default function ClientTerms({ lang }: { lang: string }) {
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
            {t('terms.back_home', 'На главную')}
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#1E58B1]/5 flex items-center justify-center text-[#1E58B1]">
              <FileText size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#163A5C] tracking-tight">
              {t('terms.title', 'Пользовательское соглашение')}
            </h1>
          </div>

          <p className="text-gray-400 font-medium text-lg max-w-2xl leading-relaxed">
            {t('terms.subtitle', 'Настоящее Пользовательское соглашение регулирует отношения между пользователем и сервисом MIGO (ООО «ПРМ») по использованию сайта и связанных с ним Telegram-ботов.')}
          </p>
        </div>
      </section>

      <section className="px-5">
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] p-8 md:p-16 shadow-xl border border-gray-50">
          <div className="space-y-12 text-gray-600 leading-relaxed font-medium text-lg">

            <Section title={t('terms.s1_title', '1. Предмет соглашения')}>
              {t('terms.s1_content', 'MIGO оказывает информационные и консультационные услуги, связанные с адаптацией, поиском работы, жилья и оформлением документов на территории РФ. Сервис не является государственным органом. Окончательное оформление всех документов производится в соответствующих уполномоченных организациях (ММЦ, МВД, банки и т.д.).')}
            </Section>

            <Section title={t('terms.s2_title', '2. Обязанности сторон')}>
              <ul className="space-y-4">
                <ListItem>{t('terms.s2_list_1', 'Пользователь обязуется предоставлять достоверную информацию о себе при составлении заявок.')}</ListItem>
                <ListItem>{t('terms.s2_list_2', 'MIGO обязуется предоставлять актуальную информацию и прилагать максимальные усилия для качественного консультирования пользователя.')}</ListItem>
              </ul>
            </Section>

            <Section title={t('terms.s3_title', '3. Ограничение ответственности')}>
              {t('terms.s3_content', 'Сайт и предоставленная на нем информация носят ознакомительный характер и не являются публичной офертой. Администрация сервиса не несет ответственности за решения, принятые государственными органами в отношении пользователя (например, отказ в выдаче патента или регистрации), если они не зависят от действий сервиса.')}
            </Section>

            <Section title={t('terms.s4_title', '4. Изменения условий')}>
              {t('terms.s4_content', 'Администрация оставляет за собой право вносить изменения в настоящее соглашение в любое время. Продолжение использования сайта после внесения изменений означает ваше согласие с новыми условиями.')}
            </Section>

          </div>

          <div className="mt-20 pt-10 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm font-black text-[#163A5C] uppercase tracking-widest opacity-40">{t('terms.updated', 'Редакция от 2026 года')}</div>
            <Link href={`/${currentLang}/privacy`} className="flex items-center gap-2 text-[#2196D3] font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-transform">
              {t('terms.privacy_link', 'Политика конфиденциальности')} <ChevronRight size={16} />
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
