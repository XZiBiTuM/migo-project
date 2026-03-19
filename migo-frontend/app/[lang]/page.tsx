import ClientHome from './ClientHome';

export default async function Home({ params }: { params: { lang: string } }) {
  let news: any[] = [];
  let services: any[] = [];

  try {
    const [newsRes, servicesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/`, { cache: 'no-store' }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/`, { cache: 'no-store' })
    ]);

    if (newsRes.ok) news = await newsRes.json();
    if (servicesRes.ok) services = await servicesRes.json();

  } catch (error) {
    console.error("Ошибка загрузки данных (SSR):", error);
  }

  return <ClientHome initialNews={news} initialServices={services} />;
}
