import ClientWork from './ClientWork';

export const metadata = {
  title: 'Найти работу в России | MIGO',
  description: 'Найдите легальную и проверенную работу в России через Telegram за 2 минуты. Помощь с жильём и документами.',
};

export default async function WorkPage() {
  let initialJobs = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vacancies/`, {
      cache: 'no-store'
    });

    if (res.ok) {
      initialJobs = await res.json();
    }
  } catch (error) {}

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