import ClientContacts from './ClientContacts';

export const metadata = {
  title: 'Контакты MIGO | Офисы и поддержка',
  description: 'Свяжитесь с нами: адреса офисов в Москве, телефон, социальные сети и юридическая информация ООО «ПРМ».',
};

export default async function ContactsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <ClientContacts lang={lang} />;
}