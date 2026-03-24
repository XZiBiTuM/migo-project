import ru from '@/locales/ru.json';
import uz from '@/locales/uz.json';
import tj from '@/locales/tj.json';
import kg from '@/locales/kg.json';
import kz from '@/locales/kz.json';

const TRANSLATIONS: Record<string, any> = {
  ru,
  uz,
  tg: tj,
  kg,
  kk: kz,
};

export type ValidLang = 'ru' | 'uz' | 'tg' | 'kg' | 'kk';

export function getT(lang: string = 'ru') {
  const translations = TRANSLATIONS[lang] || TRANSLATIONS.ru;
  
  return (path: string, defaultValue?: string): string => {
    const keys = path.split('.');
    let result: any = translations;

    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        return defaultValue || path;
      }
    }

    return typeof result === 'string' ? result : (defaultValue || path);
  };
}
