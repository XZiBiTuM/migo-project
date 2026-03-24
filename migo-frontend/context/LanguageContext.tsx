"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

import ru from '@/locales/ru.json';

type Language = 'RU' | 'UZ' | 'TJ' | 'KG' | 'KZ';

const getTranslations = async (lang: Language) => {
  try {
    switch (lang) {
      case 'RU': return ru;
      case 'UZ': return (await import('@/locales/uz.json')).default;
      case 'TJ': return (await import('@/locales/tj.json')).default;
      case 'KG': return (await import('@/locales/kg.json')).default;
      case 'KZ': return (await import('@/locales/kz.json')).default;
      default: return ru;
    }
  } catch (error) {
    console.error('Failed to load translations for', lang, error);
    return ru;
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: any;
  t: (path: string, defaultValue?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLanguage
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguage] = useState<Language>(initialLanguage || 'RU');
  // Initialize with Russian synchronously, other languages will load async
  const [translations, setTranslations] = useState<any>(ru);

  useEffect(() => {
    const initLang = async () => {
      let langToLoad = initialLanguage || 'RU';
      
      if (!initialLanguage) {
        const saved = localStorage.getItem('migo_lang') as Language;
        if (saved && ['RU', 'UZ', 'TJ', 'KG', 'KZ'].includes(saved)) {
          langToLoad = saved;
        }
      }

      setLanguage(langToLoad);
      const data = await getTranslations(langToLoad);
      setTranslations(data);
      if (langToLoad === initialLanguage) {
        localStorage.setItem('migo_lang', langToLoad);
      }
    };
    initLang();
  }, [initialLanguage]);

  const handleSetLanguage = async (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('migo_lang', lang);
    const data = await getTranslations(lang);
    setTranslations(data);
  };

  const t = useCallback((path: string, defaultValue?: string): string => {
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
  }, [translations]);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: handleSetLanguage,
      translations,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage должен использоваться в рамках LanguageProvider');
  }
  return context;
}

export function T({ path, children }: { path: string; children?: React.ReactNode }) {
  const { t } = useLanguage();
  const translated = t(path, children?.toString());
  return <>{translated}</>;
}
