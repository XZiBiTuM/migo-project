import ServicesHero from './ServicesHero';
import ClientServices from './ClientServices';

export default async function ServicesPage() {
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

  return (
    <main>
      <ServicesHero />
      <ClientServices initialServices={apiServices} />
    </main>
  );
}