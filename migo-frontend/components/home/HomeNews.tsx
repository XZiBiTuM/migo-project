import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FileText, Zap } from 'lucide-react';
import { getT } from '@/utils/translations.server';
import { getCategoryLabel } from '@/utils/news';

function NewsCard({ tag, title, slug, image, date, delay, lang, t }: { tag: string, title: string, slug: string, image: string, date: string, delay: number, lang: string, t: any }) {
  const imageUrl = image
    ? (image.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_API_URL}${image}`)
    : null;

  return (
    <Link
      href={`/${lang}/news/${slug}`}
      style={{ '--delay': `${delay}ms` } as React.CSSProperties}
      className="bg-white rounded-[40px] p-2 border border-gray-100 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 group flex flex-col hover:-translate-y-3 animate-fade-in-up shadow-sm h-full overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] mb-6">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1E58B1]/5 to-[#2196D3]/5 flex items-center justify-center text-[#1E58B1]/20">
            <FileText size={48} />
          </div>
        )}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-[#1E58B1] bg-white/90 backdrop-blur-md shadow-sm border border-white/50">{tag}</span>
        </div>
      </div>

      <div className="px-6 pb-8 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-bold text-gray-700">{date}</span>
        </div>
        <h3
          className="font-black text-[#163A5C] text-xl md:text-2xl leading-tight group-hover:text-[#1E58B1] transition-colors mb-8 line-clamp-3 tracking-tight text-pretty"
          style={{ textWrap: 'balance' } as any}
        >
          {title.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').replace(/\s+(?=[,.:;!?])/g, '').replace(/,(\s)+/g, ', ').trim()}
        </h3>
        <div className="mt-auto flex items-center text-[#1E58B1] font-black gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 uppercase tracking-widest text-xs">
          {t('home.news_section.read_full')} <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}

export default function HomeNews({ initialNews, lang }: { initialNews: any[], lang: string }) {
  const t = getT(lang);

  return (
    <section className="py-20 max-w-7xl mx-auto px-5">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-[#163A5C]">
          {t('home.news_section.title')}
        </h2>
        <Link href={`/${lang}/news`} className="text-[#2196D3] font-bold hover:underline flex items-center gap-1">
          {t('home.news_section.all_articles')} <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {initialNews && initialNews.length > 0 ? (
          initialNews.map((news, idx) => (
            <NewsCard
              key={news.id}
              tag={getCategoryLabel(news.category)}
              title={news.title}
              slug={news.slug}
              image={news.cover_image}
              date={new Date(news.published_at || news.created_at).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'short' })}
              delay={idx * 150}
              lang={lang}
              t={t}
            />
          ))
        ) : (
          <div className="col-span-3 bg-white p-20 rounded-[32px] text-center border border-gray-100 italic text-gray-700">
            {t('home.news_section.no_news')}
          </div>
        )}
      </div>
    </section>
  );
}

