import ClientHome from './ClientHome';

export default async function Home({ params }: { params: { lang: string } }) {
  let news: any[] = [];
  let services: any[] = [];

  try {
    const [newsRes, servicesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/`, {
        next: { revalidate: 60 }
      }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/`, {
        next: { revalidate: 3600 }
      })
    ]);

    if (newsRes.ok) news = await newsRes.json();
    if (servicesRes.ok) services = await servicesRes.json();

  } catch (error) {
    console.error("Ошибка загрузки данных (SSR):", error);
  }

  return <ClientHome initialNews={news} initialServices={services} />;
}
