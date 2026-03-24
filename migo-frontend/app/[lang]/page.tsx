import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import HomeServices from '@/components/home/HomeServices';
import PathSection from '@/components/home/PathSection';
import Reliability from '@/components/home/Reliability';
import Trust from '@/components/home/Trust';
import Testimonials from '@/components/home/Testimonials';
import LegalAid from '@/components/home/LegalAid';
import HomeNews from '@/components/home/HomeNews';
import CTA from '@/components/home/CTA';

export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  let news: any[] = [];
  let services: any[] = [];

  try {
    const urls = [
      `${process.env.NEXT_PUBLIC_API_URL}/api/news/`,
      `${process.env.NEXT_PUBLIC_API_URL}/api/services/`
    ];

    const [newsRes, servicesRes] = await Promise.all(
      urls.map(url => fetch(url, { next: { revalidate: 60 } }))
    );

    if (newsRes.ok) news = await newsRes.json();
    if (servicesRes.ok) services = await servicesRes.json();

  } catch (error) {
    console.error("Ошибка загрузки данных (SSR):", error);
  }

  return (
    <main className="pb-24 bg-[#F8FAFC] selection:bg-[#B8D430]/30">
      <Hero lang={lang} />
      <About lang={lang} />
      <HomeServices initialServices={services} lang={lang} />
      <PathSection lang={lang} />
      <Reliability lang={lang} />
      <Trust lang={lang}>
        <Testimonials />
      </Trust>
      <LegalAid lang={lang} />
      <HomeNews initialNews={news.slice(0, 3)} lang={lang} />
      <CTA lang={lang} />
    </main>
  );
}
