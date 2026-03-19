import ClientServices from './ClientServices';

export const metadata = {
  title: 'Услуги и документы для мигрантов в РФ | MIGO',
  description: 'Помощь с оформлением патента, регистрации, переводом паспорта (нотариально), ДМС и банковских карт. Без скрытых доплат и очередей.',
};

export default async function ServicesPage() {
  let apiServices = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/`, {
      cache: 'no-store'
    });
    if (res.ok) {
      apiServices = await res.json();
    }
  } catch (error) {
    console.error("Ошибка SSR загрузки сервисов:", error);
  }

  return <ClientServices initialServices={apiServices} />;
}