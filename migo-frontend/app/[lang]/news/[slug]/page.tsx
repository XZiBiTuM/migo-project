import { notFound } from 'next/navigation';
import ClientNewsDetail from './ClientNewsDetail';

export async function generateStaticParams() {
  const apiBase = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  try {
    const res = await fetch(`${apiBase}/api/news/`);
    if (!res.ok) return [];
    const news = await res.json();

    const locales = ['ru', 'kk', 'kg', 'uz', 'tg'];

    return news.flatMap((article: any) =>
      locales.map((lang) => ({
        lang,
        slug: article.slug,
      }))
    );
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, lang: string }> }) {
  const { slug } = await params;
  const apiBase = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  try {
    const res = await fetch(`${apiBase}/api/news/${slug}/`, {
      next: { revalidate: 60 }
    });
    if (res.ok) {
      const article = await res.json();
      return {
        title: article.meta_title || `${article.title} | MIGO`,
        description: article.meta_description || article.short_description || article.lead || 'Полезная статья от сервиса MIGO',
        openGraph: {
          title: article.meta_title || article.title,
          description: article.meta_description || article.short_description || article.lead,
          images: article.cover_image ? [article.cover_image] : [],
        }
      };
    }
  } catch (error) { }
  return { title: 'Статья | MIGO' };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string, lang: string }> }) {
  const { slug, lang } = await params;
  let article: any = null;
  let relatedNews: any[] = [];
  const apiBase = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  
  try {
    const res = await fetch(`${apiBase}/api/news/${slug}/`, {
      next: { revalidate: 60 }
    });
    if (res.ok) {
      article = await res.json();
    }

    const allRes = await fetch(`${apiBase}/api/news/`, {
      next: { revalidate: 3600 }
    });
    if (allRes.ok) {
      const allNews = await allRes.json();
      relatedNews = allNews.filter((n: any) => n.slug !== slug && n.id !== article?.id).slice(0, 3);
    }
  } catch (error) { }

  if (!article) notFound();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": article.cover_image ? [article.cover_image] : ["https://migohelp.com/logo.webp"],
    "datePublished": article.published_at || article.created_at,
    "dateModified": article.updated_at || article.published_at || article.created_at,
    "author": [{
      "@type": "Person",
      "name": article.author?.first_name ? `${article.author.first_name} ${article.author.last_name || ''}`.trim() : "Команда MIGO",
      "url": "https://migohelp.com/about"
    }]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <ClientNewsDetail article={article} relatedNews={relatedNews} lang={lang} />
    </>
  );
}