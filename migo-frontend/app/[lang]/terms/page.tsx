import ClientTerms from './ClientTerms';

export const metadata = {
  title: 'Пользовательское соглашение | MIGO',
  description: 'Условия использования сервиса MIGO.',
};

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <ClientTerms lang={lang} />;
}