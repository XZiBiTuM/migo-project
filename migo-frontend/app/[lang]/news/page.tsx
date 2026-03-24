import ClientNews from './ClientNews';
import NewsHero from './NewsHero';

export default async function NewsPage() {
  let initialNews = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/`, {
      next: { revalidate: 60 }
    });
    if (res.ok) initialNews = await res.json();
  } catch (error) { }

  return (
    <>
      <NewsHero />
      <ClientNews initialNews={initialNews} />
    </>
  );
}