import { notFound } from 'next/navigation';
import ClientNewsDetail from './ClientNewsDetail';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${slug}/`, { cache: 'no-store' });
    if (res.ok) {
      const article = await res.json();
      return {
        title: `${article.title} | MIGO`,
        description: article.short_description || article.lead || 'Полезная статья от сервиса MIGO',
      };
    }
  } catch (error) {}
  return { title: 'Статья | MIGO' };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let article: any = null;
  let relatedNews: any[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${slug}/`, { cache: 'no-store' });
    if (res.ok) {
      article = await res.json();
    }

    const allRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/`, { cache: 'no-store' });
    if (allRes.ok) {
      const allNews = await allRes.json();
      relatedNews = allNews.filter((n: any) => n.slug !== slug && n.id !== article?.id).slice(0, 3);
    }
  } catch (error) {}

  if (!article) {
    notFound();
  }

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <ClientNewsDetail article={article} relatedNews={relatedNews} />
    </>
  );
}