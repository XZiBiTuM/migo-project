import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Send, MapPin } from 'lucide-react';
import { getT } from '@/utils/translations.server';
import { getBotUrl } from '@/utils/bot';

export function GlobalFooter({ lang }: { lang: string }) {
  const t = getT(lang);

  return (
    <footer className="bg-white pt-14 pb-28 sm:pb-14 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-1 md:col-span-2">
            <Link href={`/${lang}/`} aria-label="MIGO Home"><Image src="/logo.webp" alt="MIGO" width={40} height={40} className="w-10 h-10 mb-3 object-contain" /></Link>
            <p className="text-gray-700 text-sm max-w-sm mb-5 leading-relaxed">
              {t('footer.desc_1', 'Сервис помощи гражданам СНГ в России.')}<br />
              {t('footer.desc_2', 'Легально, безопасно, с поддержкой.')}
            </p>
            <div className="flex gap-3">
              <Link href={getBotUrl({ source: 'site', medium: 'global' })} target="_blank" className="w-9 h-9 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center hover:border-[#2196D3]/40 hover:bg-[#2196D3]/5 cursor-pointer transition-colors" aria-label="Telegram"><Send size={15} color="#1E58B1" /></Link>
              <Link href={`/${lang}/contacts`} className="w-9 h-9 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center hover:border-[#2196D3]/40 hover:bg-[#2196D3]/5 cursor-pointer transition-colors" aria-label="Contacts"><MapPin size={15} color="#1E58B1" /></Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 text-[#163A5C]">{t('footer.docs_title', 'Документы')}</h4>
            <ul className="space-y-2.5 text-sm text-gray-700 font-medium">
              <li><Link href={`/${lang}/privacy`} className="hover:text-[#2196D3] underline decoration-transparent hover:decoration-[#2196D3] transition-all cursor-pointer">{t('footer.privacy', 'Политика конфиденциальности')}</Link></li>
              <li><Link href={`/${lang}/terms`} className="hover:text-[#2196D3] underline decoration-transparent hover:decoration-[#2196D3] transition-all cursor-pointer">{t('footer.terms', 'Пользовательское соглашение')}</Link></li>
              <li><Link href="/admin" className="text-gray-500 hover:text-[#2196D3] transition-colors cursor-pointer text-[10px] mt-2 block opacity-60">{t('footer.admin', 'Админ-панель')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 text-[#163A5C]">{t('footer.contacts_title', 'Контакты')}</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>{t('footer.company_name', 'ООО «ПРМ»')}</li>
              <li className="leading-snug">{t('footer.address_msk', 'Москва, Армянский пер, д.9 стр. 1, Этаж 4, Офис 402-2')}</li>
              <li className="leading-snug">{t('footer.address_kld', 'Калининград, пр-т Калинина 2, офис 4')}</li>
              <li><a href="tel:+79218543909" className="font-semibold text-base mt-1 inline-block text-[#163A5C] hover:text-[#2196D3] transition-colors">+7 921 854 39 09</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-300">
          <p>{t('footer.copyright', '© 2026 Экосистема MIGO. Все права защищены. | Разработал:')} <a href='https://t.me/xzibitum' target='_blank' className='text-[#2196D3] hover:text-[#163A5C] transition-colors'>XZiBiTuM</a></p>
        </div>
      </div>
    </footer>
  );
}
