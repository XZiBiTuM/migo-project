"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Импортируем переводы сразу, так как они небольшие и это надежнее
import ru from '@/locales/ru.json';
import uz from '@/locales/uz.json';
import tj from '@/locales/tj.json';
import kg from '@/locales/kg.json';
import kz from '@/locales/kz.json';

const TRANSLATIONS_MAP: Record<string, any> = {
  RU: ru,
  UZ: uz,
  TJ: tj,
  KG: kg,
  KZ: kz,
};

type Language = 'RU' | 'UZ' | 'TJ' | 'KG' | 'KZ';

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
  const [translations, setTranslations] = useState<any>(TRANSLATIONS_MAP[initialLanguage || 'RU'] || ru);

  useEffect(() => {
    // Если есть начальный язык из URL, устанавливаем его
    if (initialLanguage && TRANSLATIONS_MAP[initialLanguage]) {
      setLanguage(initialLanguage);
      setTranslations(TRANSLATIONS_MAP[initialLanguage]);
      localStorage.setItem('migo_lang', initialLanguage);
    } else {
      // Иначе ищем в localStorage
      const saved = localStorage.getItem('migo_lang') as Language;
      if (saved && TRANSLATIONS_MAP[saved]) {
        setLanguage(saved);
        setTranslations(TRANSLATIONS_MAP[saved]);
      }
    }
  }, [initialLanguage]);

  const handleSetLanguage = (lang: Language) => {
    if (TRANSLATIONS_MAP[lang]) {
      setLanguage(lang);
      setTranslations(TRANSLATIONS_MAP[lang]);
      localStorage.setItem('migo_lang', lang);
    }
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

/**
 * Оболочка для перевода текста.
 * Использование: <T path="home.hero.title">Fallback текст</T>
 */
export function T({ path, children }: { path: string; children?: React.ReactNode }) {
  const { t } = useLanguage();
  const translated = t(path, children?.toString());
  return <>{translated}</>;
}
