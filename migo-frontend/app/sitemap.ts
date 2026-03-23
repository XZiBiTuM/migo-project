import { MetadataRoute } from 'next';

const locales = ['ru', 'kk', 'kg', 'uz', 'tg'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://migohelp.com';

  const staticSegments = [
    '',
    '/work',
    '/services',
    '/housing',
    '/about',
    '/contacts',
    '/news',
    '/privacy',
    '/terms'
  ];

  // Создаем все статические пути для всех локалей
  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((lang) => 
    staticSegments.map((segment) => ({
      url: `${baseUrl}/${lang}${segment}/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: segment === '' ? 1 : 0.8,
    }))
  );

  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const [newsRes, servicesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/`)
    ]);

    if (newsRes.ok) {
      const news = await newsRes.json();
      const newsRoutes = locales.flatMap((lang) => 
        news.map((item: any) => ({
          url: `${baseUrl}/${lang}/news/${item.slug}`,
          lastModified: new Date(item.updated_at || item.published_at || item.created_at || new Date()),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        }))
      );
      dynamicRoutes = [...dynamicRoutes, ...newsRoutes];
    }

    if (servicesRes.ok) {
      const services = await servicesRes.json();
      const servicesRoutes = locales.flatMap((lang) => 
        services.map((item: any) => ({
          url: `${baseUrl}/${lang}/services/${item.slug}`,
          lastModified: new Date(item.updated_at || item.created_at || new Date()),
          changeFrequency: 'monthly' as const,
          priority: 0.9,
        }))
      );
      dynamicRoutes = [...dynamicRoutes, ...servicesRoutes];
    }
  } catch (error) { }

  return [...staticRoutes, ...dynamicRoutes];
}