import ClientPrivacy from './ClientPrivacy';

export const metadata = {
  title: 'Политика конфиденциальности | MIGO',
  description: 'Политика обработки персональных данных сервиса MIGO.',
};

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <ClientPrivacy lang={lang} />;
}