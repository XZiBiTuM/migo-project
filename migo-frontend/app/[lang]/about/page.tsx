import ClientAbout from './ClientAbout';

export const metadata = {
  title: 'О проекте MIGO | Помощь гражданам СНГ в России',
  description: 'MIGO — сервис помощи гражданам СНГ в РФ. Делаем легальную работу и жизнь безопасной: без обмана, с поддержкой на каждом шаге.',
};

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <ClientAbout lang={lang} />;
}