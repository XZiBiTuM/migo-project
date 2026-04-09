import ServicesHero from './ServicesHero';
import ClientServices from './ClientServices';

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  let apiServices = [];
  const apiBase = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  
  try {
    const res = await fetch(`${apiBase}/api/services/`, {
      next: { revalidate: 3600 }
    });
    if (res.ok) apiServices = await res.json();
  } catch (error) {
    console.error("SSR Services Error:", error);
  }

  const freeServices = apiServices.filter((s: any) => s.price_conditions?.toLowerCase().includes('бесплатно'));
  const docServices = apiServices.filter((s: any) => s.service_type === 'docs' && !s.price_conditions?.toLowerCase().includes('бесплатно'));
  const extraServices = apiServices.filter((s: any) => s.service_type !== 'docs' && !s.price_conditions?.toLowerCase().includes('бесплатно'));

  return (
    <main>
      <ServicesHero lang={lang} />
      <ClientServices 
        freeServices={freeServices} 
        docServices={docServices} 
        extraServices={extraServices} 
        lang={lang} 
      />
    </main>
  );
}