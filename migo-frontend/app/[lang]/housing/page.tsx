import ClientHousing from './ClientHousing';

export const metadata = {
  title: 'Подобрать жильё в России | MIGO',
  description: 'Помощь в подборе общежитий, квартир и хостелов для граждан СНГ. Быстро, безопасно, рядом с работой.',
};

export default async function HousingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <ClientHousing lang={lang} />;
}