"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Calendar, ArrowRight, Tag, Search,
  MessageCircle, Globe, ChevronRight
} from 'lucide-react';
import { getCategoryLabel } from '@/utils/news';
import { T, useLanguage } from '@/context/LanguageContext';

const COLORS = {
  navy: '#163A5C',
  blue: '#2196D3',
  accent: '#B8D430',
  green: '#27A15E',
  bg: '#F8FAFC',
  white: '#FFFFFF',
};

const CATEGORIES = [
  { id: 'all', key: 'news.categories.all', label: 'Все новости' },
  { id: 'documents', key: 'news.categories.documents', label: 'Документы' },
  { id: 'work', key: 'news.categories.work', label: 'Работа' },
  { id: 'housing', key: 'news.categories.housing', label: 'Жильё' },
  { id: 'laws', key: 'news.categories.laws', label: 'Законы' },
  { id: 'important', key: 'news.categories.important', label: 'Важно' },
  { id: 'stories', key: 'news.categories.stories', label: 'Истории' },
];

interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  published_at?: string;
  slug: string;
}

interface ClientNewsProps {
  initialNews: NewsItem[];
}

export default function ClientNews({ initialNews }: ClientNewsProps) {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredNews = selectedCategory === 'all'
    ? initialNews
    : initialNews.filter(n => n.category === selectedCategory);

  return (
    <main className="pb-24 bg-[#F8FAFC] selection:bg-[#B8D430]/30 min-h-screen">
      <section className="relative min-h-[50vh] flex flex-col justify-center overflow-hidden px-5 pt-32 pb-20 md:pt-0 md:pb-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#B8D430]/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#2196D3]/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0)_0%,rgba(248,250,252,1)_100%)]"></div>
        </div>

        <div className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mt-12 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#163A5C] leading-[1.05] mb-8 max-w-5xl tracking-tight">
              <T path="news.hero.title_1">Новости</T> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2196D3] to-[#163A5C]"><T path="news.hero.title_highlight">и полезные статьи</T></span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 max-w-2xl leading-relaxed">
              <T path="news.hero.subtitle">Узнавайте первыми об изменениях в законах, новых вакансиях и лайфхаках для жизни в России.</T>
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-5 relative z-20">
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-500 border shadow-sm ${selectedCategory === cat.id
                ? 'bg-[#163A5C] text-white border-[#163A5C] scale-105'
                : 'bg-white/50 backdrop-blur-md text-[#163A5C] border-white/80 hover:bg-white hover:border-[#2196D3]'
                }`}
            >
              <T path={cat.key}>{cat.label}</T>
            </button>
          ))}
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-5">
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[48px] border border-dashed border-gray-200">
            <Search size={48} className="mx-auto text-gray-300 mb-6" />
            <h3 className="text-2xl font-black text-[#163A5C] mb-2"><T path="news.empty_title">Ничего не найдено</T></h3>
            <p className="text-gray-400 font-medium"><T path="news.empty_desc">Попробуйте выбрать другую категорию</T></p>
          </div>
        )}
      </section>

      <section className="py-24 max-w-7xl mx-auto px-5">
        <div className="bg-[#163A5C] rounded-[48px] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(184,212,48,0.1)_0%,transparent_50%)]"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8"><T path="news.cta.title">Не пропускайте важное</T></h2>
            <p className="text-white/60 text-xl font-medium mb-12">
              <T path="news.cta.subtitle">Подпишитесь на наш Telegram-канал, где мы ежедневно публикуем актуальные новости и советы по миграционному праву.</T>
            </p>
            <Link
              href="https://t.me/migo_news"
              target="_blank"
              className="inline-flex items-center gap-4 bg-[#B8D430] hover:bg-[#A7C220] text-[#163A5C] py-5 px-12 rounded-[24px] font-black text-xl transition-all hover:scale-105 shadow-xl"
            >
              <MessageCircle size={28} /> <T path="news.cta.btn">Подписаться в Telegram</T>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function NewsCard({ news }: { news: NewsItem }) {
  const { t, language } = useLanguage();
  const dateObj = new Date(news.published_at || news.created_at);
  const isValidDate = !isNaN(dateObj.getTime());
  const dateStr = isValidDate
    ? dateObj.toLocaleDateString(language === 'RU' ? 'ru-RU' : 'uz-UZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    : t('news.card.no_date', 'Дата не указана');

  const categoryLabel = getCategoryLabel(news.category);

  return (
    <Link
      href={`/${language.toLowerCase()}/news/${news.slug}`}
      className="group bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col h-full transform hover:-translate-y-2 outline-offset-4 focus:ring-4 focus:ring-[#2196D3]/30"
    >
      <div className="relative h-64 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2196D3]/20 to-[#163A5C]/20 group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="absolute top-6 left-6">
          <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[#163A5C] text-xs font-black uppercase tracking-widest shadow-sm">
            <T path={`news.categories.${news.category}`}>{getCategoryLabel(news.category)}</T>
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#163A5C]/20 backdrop-blur-[2px]">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#163A5C] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
            <ArrowRight size={28} />
          </div>
        </div>
      </div>

      <div className="p-10 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">
          <Calendar size={14} className="text-[#B8D430]" />
          {dateStr}
        </div>

        <h3 className="text-2xl font-black text-[#163A5C] mb-6 leading-tight group-hover:text-[#2196D3] transition-colors line-clamp-2">
          {news.title}
        </h3>

        <div className="text-gray-600 font-medium leading-relaxed mb-8 line-clamp-3">
          {news.content.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').substring(0, 150)}...
        </div>

        <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
          <span className="text-sm font-black text-[#163A5C] group-hover:text-[#2196D3] transition-colors uppercase tracking-widest"><T path="news.card.read_more">Читать статью</T></span>
          <ChevronRight size={20} className="text-[#B8D430] group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </Link>
  );
}