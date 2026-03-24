import ServicesHero from './ServicesHero';
import ClientServices from './ClientServices';

export default async function ServicesPage() {
  let apiServices = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/`, {
      next: { revalidate: 3600 }
    });
    if (res.ok) apiServices = await res.json();
  } catch (error) {
    console.error("SSR Error:", error);
  }

  return (
    <main>
      <ServicesHero />
      <ClientServices initialServices={apiServices} />
    </main>
  );
}