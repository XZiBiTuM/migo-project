import ClientNews from './ClientNews';
import NewsHero from './NewsHero';

export default async function NewsPage() {
  let initialNews = [];
  const apiBase = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  
  try {
    const res = await fetch(`${apiBase}/api/news/`, {
      next: { revalidate: 60 }
    });
    if (res.ok) initialNews = await res.json();
  } catch (error) {
    console.error("SSR News Error:", error);
  }

  return (
    <>
      <NewsHero />
      <ClientNews initialNews={initialNews} />
    </>
  );
}