import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBotUrl } from '@/utils/bot';
import {
  ArrowLeft, Calendar, MessageCircle,
  Briefcase, Clock, ChevronRight, ArrowRight, Edit3, Send
} from 'lucide-react';
import { getCategoryLabel } from '@/utils/news';
import { getT } from '@/utils/translations.server';
import NewsDetailActions from '@/components/news/NewsDetailActions';

export default function ClientNewsDetail({ article, relatedNews = [], lang }: { article: any, relatedNews?: any[], lang: string }) {
  const t = getT(lang);

  const publishDate = new Date(article.published_at || article.created_at);
  const dateStr = !isNaN(publishDate.getTime()) 
    ? publishDate.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : '';

  return (
    <main className="pb-24 min-h-screen">
      <section className="relative pt-32 pb-4 overflow-hidden px-5">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
            <Link href={`/${lang}/news`} className="group flex items-center gap-3 text-[#163A5C] font-black uppercase tracking-widest text-xs hover:text-[#2196D3] transition-colors">
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#1E58B1] group-hover:text-white transition-all">
                <ArrowLeft size={18} />
              </div>
              {t('news_detail.back_btn', 'Вернуться назад')}
            </Link>
          </div>

          <div className="inline-flex items-center gap-4 mb-8">
            <span className="px-4 py-2 rounded-full bg-[#1E58B1] text-white text-[10px] font-black uppercase tracking-[0.2em]">
              {t(`news.categories.${article.category}`, getCategoryLabel(article.category))}
            </span>
            <div className="flex items-center gap-2 text-gray-700 text-xs font-bold uppercase tracking-widest">
              <Calendar size={14} className="text-[#B8D430]" />
              {dateStr}
            </div>
          </div>

          <h1
            className="text-4xl md:text-6xl font-black text-[#163A5C] leading-[1.1] mb-4 tracking-tight text-pretty"
          >
            {article.title.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').replace(/\s+(?=[,.:;!?])/g, '').replace(/,(\s)+/g, ', ').trim()}
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-between py-8 pb-4 border-t border-gray-100 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1E58B1] flex items-center justify-center text-white font-black text-xl">
                M
              </div>
              <div>
                <div className="font-black text-[#163A5C]">{t('news_detail.author', 'Команда MIGO')}</div>
                <div className="text-xs text-gray-600 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Clock size={12} /> 2 {t('news_detail.reading_time', 'мин чтения')}
                </div>
              </div>
            </div>
            
            <NewsDetailActions 
              articleTitle={article.title} 
              articleUrl="" 
              goBtnText={t('news_detail.go_to_article', 'Перейти к статье')} 
            />
          </div>
        </div>
      </section>

      {article.cover_image && (
        <section className="px-5 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[21/9] rounded-[48px] overflow-hidden shadow-2xl border border-white/50 bg-gray-50">
              <Image
                src={article.cover_image.startsWith('http') ? article.cover_image : `${process.env.NEXT_PUBLIC_API_URL}${article.cover_image}`}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#163A5C]/40 to-transparent"></div>
            </div>
          </div>
        </section>
      )}

      <section id="article-content" className="px-5 mb-24 scroll-mt-24">
        <div className="max-w-4xl mx-auto bg-white rounded-[48px] p-8 md:p-20 shadow-xl border border-gray-50">
          <article
            className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none text-gray-700 break-words overflow-hidden text-pretty
              prose-headings:text-[#163A5C] prose-headings:font-black prose-headings:tracking-tight
              prose-p:leading-relaxed prose-p:font-medium
              prose-a:text-[#2196D3] prose-a:font-black prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#163A5C] prose-strong:font-black
              prose-ul:list-disc prose-ul:marker:text-[#B8D430]
              prose-blockquote:border-l-4 prose-blockquote:border-[#B8D430] prose-blockquote:bg-gray-50 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic
              prose-img:rounded-3xl prose-img:shadow-lg
            "
            dangerouslySetInnerHTML={{
              __html: article.content
                .replace(/&nbsp;/g, ' ')
                .replace(/\s+(?=[,.:;!?])/g, '')
                .replace(/,(\s)+/g, ', ')
            }}
          />

          <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-gray-600 font-medium">{t('news_detail.share_text', 'Статья была полезной? Поделитесь ей:')}</div>
            <div className="flex gap-4">
              <NewsDetailActions 
                articleTitle={article.title} 
                articleUrl="" 
                goBtnText={t('news_detail.go_to_article', 'Перейти к статье')} 
              />
            </div>
          </div>
        </div>
      </section>

      {relatedNews && relatedNews.length > 0 && (
        <section className="px-5 mb-24 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <h2 className="text-3xl md:text-5xl font-black text-[#163A5C]">{t('news_detail.related_title', 'Читайте также')}</h2>
            <Link href={`/${lang}/news`} className="text-[#2196D3] font-black uppercase tracking-widest text-sm hover:underline flex items-center gap-2">
              {t('news_detail.all_articles', 'Все статьи')} <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedNews.map((news) => (
              <RelatedNewsCard key={news.id} news={news} lang={lang} />
            ))}
          </div>
        </section>
      )}

      <section className="max-w-5xl mx-auto px-5">
        <div className="bg-[#1E58B1] rounded-[64px] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#B8D430]/5 rounded-full blur-[100px]"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight uppercase tracking-tight">{t('news_detail.cta_title', 'Появились вопросы?')}</h2>
            <p className="text-white/80 text-xl font-medium mb-12">
              {t('news_detail.cta_subtitle', 'Мы всегда на связи. Наши юристы и эксперты готовы помочь вам разобраться в любых тонкостях миграционного учета или трудоустройства.')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href={getBotUrl({ start: 'law', source: 'news_detail' })}
                target="_blank"
                className="group flex items-center justify-between bg-white text-[#1E58B1] p-6 rounded-[32px] font-black transition-all hover:scale-105 shadow-xl hover:bg-[#B8D430]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#2196D3]">
                    <MessageCircle size={24} />
                  </div>
                  <span className="text-left tracking-tight">{t('news_detail.cta_law_btn', 'Спросить юриста')}</span>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-[#163A5C]" />
              </Link>

              <Link
                href={getBotUrl({ start: 'work', source: 'news_detail' })}
                target="_blank"
                className="group flex items-center justify-between bg-[#2196D3] text-white p-6 rounded-[32px] font-black transition-all hover:scale-105 shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Briefcase size={24} />
                  </div>
                  <span className="text-left tracking-tight">{t('news_detail.cta_work_btn', 'Найти работу')}</span>
                </div>
                <ChevronRight size={20} className="text-white/30 group-hover:text-white" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function RelatedNewsCard({ news, lang }: { news: any, lang: string }) {
  const t = getT(lang);
  const dateObj = new Date(news.published_at || news.created_at);
  const dateStr = !isNaN(dateObj.getTime())
    ? dateObj.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    : t('news.card.no_date', 'Дата не указана');

  return (
    <Link
      href={`/${lang}/news/${news.slug}`}
      className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:border-[#2196D3] hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden bg-gray-50">
        {news.cover_image ? (
          <Image
            src={news.cover_image.startsWith('http') ? news.cover_image : `${process.env.NEXT_PUBLIC_API_URL}${news.cover_image}`}
            alt={news.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2196D3]/10 to-[#1E58B1]/10 flex items-center justify-center text-[#2196D3]/20">
            <Edit3 size={32} />
          </div>
        )}
      </div>
      <div className="p-8">
        <div className="flex items-center gap-2 text-gray-700 text-[10px] font-black uppercase tracking-widest mb-4">
          <Calendar size={12} className="text-[#B8D430]" />
          {dateStr}
        </div>
        <h3
          className="text-xl font-black text-[#163A5C] group-hover:text-[#2196D3] transition-colors mb-4 line-clamp-3 leading-tight text-pretty"
        >
          {news.title.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').replace(/\s+(?=[,.:;!?])/g, '').replace(/,(\s)+/g, ', ').trim()}
        </h3>
        <div className="mt-auto flex items-center text-sm font-black text-[#2196D3] uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
          {t('news_detail.related_card.read', 'Читать')} <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}