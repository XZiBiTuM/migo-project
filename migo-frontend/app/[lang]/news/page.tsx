import ClientNews from './ClientNews';

export const metadata = {
  title: 'Новости и статьи | MIGO',
  description: 'Актуальные изменения в законах, советы по документам, работе и жизни в РФ для граждан СНГ.',
};

export default async function NewsPage() {
  let initialNews = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/`, {
      cache: 'no-store'
    });

    if (res.ok) {
      initialNews = await res.json();
    }
  } catch (error) {}

  return <ClientNews initialNews={initialNews} />;
}