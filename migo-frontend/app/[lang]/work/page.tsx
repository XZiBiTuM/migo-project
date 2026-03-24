import ClientWork from './ClientWork';

export const metadata = {
  title: 'Найти работу в России | MIGO',
  description: 'Найдите легальную и проверенную работу в России через Telegram за 2 минуты. Помощь с жильём и документами.',
};

export async function generateStaticParams() {
  return [
    { lang: 'ru' },
    { lang: 'kk' },
    { lang: 'kg' },
    { lang: 'uz' },
    { lang: 'tg' },
  ];
}

export default async function WorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  let initialJobs = [];
  const apiBase = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  
  try {
    const res = await fetch(`${apiBase}/api/vacancies/`, {
      next: { revalidate: 300 }
    });
 
    if (res.ok) {
      initialJobs = await res.json();
    }
  } catch (error) {
    console.error("SSR Jobs Error:", error);
  }

  const jsonLd = initialJobs.map((job: any) => ({
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description || job.title,
    "datePosted": job.updated_at || new Date().toISOString(),
    "hiringOrganization": {
      "@type": "Organization",
      "name": "MIGO",
      "sameAs": "https://migohelp.com",
      "logo": "https://migohelp.com/logo.webp"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.city || "Россия",
        "addressCountry": "RU"
      }
    }
  }));

  return (
    <>
      {jsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ClientWork initialJobs={initialJobs} />
    </>
  );
}