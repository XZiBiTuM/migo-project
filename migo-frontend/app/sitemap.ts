import { MetadataRoute } from 'next';

const locales = ['ru', 'kz', 'kg', 'uz', 'tj'] as const;

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
      url: `${baseUrl}/${lang}${segment}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: segment === '' ? 1 : 0.8,
    }))
  );

  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/`);
    if (res.ok) {
      const news = await res.json();
      dynamicRoutes = locales.flatMap((lang) => 
        news.map((item: any) => ({
          url: `${baseUrl}/${lang}/news/${item.slug}`,
          lastModified: new Date(item.updated_at || item.published_at || item.created_at || new Date()),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        }))
      );
    }
  } catch (error) { }

  return [...staticRoutes, ...dynamicRoutes];
}