import { notFound } from 'next/navigation';
import ClientServicesDetail from './ClientServicesDetail';

const FALLBACK_SERVICES: Record<string, any> = {
  'passport': {
    title: 'Перевод паспорта',
    slug: 'passport',
    service_type: 'docs',
    short_description: 'Официальный перевод паспорта для работы и банков.',
    full_description: 'Нотариально заверенный перевод паспорта необходим для легального трудоустройства, открытия банковских счетов и постановки на миграционный учёт.',
    documents_required: 'Оригинал паспорта\nВсе страницы с отметками',
    processing_time: '1-2 рабочих дня',
    price_conditions: 'от 1500 ₽'
  },
  'sim': {
    title: 'SIM-карта',
    slug: 'sim',
    service_type: 'docs',
    short_description: 'Помогаем подключить российскую связь без сложностей.',
    full_description: 'Подключение к российским операторам связи с выгодными тарифами для звонков домой и интернета.',
    documents_required: 'Паспорт\nРегистрация (желательно)',
    processing_time: '15 минут',
    price_conditions: 'Бесплатно (при пополнении баланса)'
  },
  'biometrics': {
    title: 'Биометрия',
    slug: 'biometrics',
    service_type: 'docs',
    short_description: 'Где и как пройти процедуру, какие документы нужны.',
    full_description: 'Обязательная процедура государственной дактилоскопической регистрации для иностранных граждан.',
    documents_required: 'Паспорт\nМиграционная карта',
    processing_time: '1 день',
    price_conditions: 'Бесплатно в ГЦМ'
  },
  'bank_card': {
    title: 'Банковская карта',
    slug: 'bank_card',
    service_type: 'finance',
    short_description: 'Поможем открыть карту для получения зарплаты.',
    full_description: 'Открытие дебетовой карты в надежных банках РФ для получения заработной платы и переводов.',
    documents_required: 'Паспорт\nПеревод паспорта\nРегистрация',
    processing_time: 'от 1 до 5 дней',
    price_conditions: 'Бесплатно'
  },
  'dms': {
    title: 'Полис ДМС',
    slug: 'dms',
    service_type: 'docs',
    short_description: 'Медицинский полис для легального нахождения в РФ.',
    full_description: 'Обязательное медицинское страхование для иностранных граждан, прибывших для работы.',
    documents_required: 'Паспорт',
    processing_time: '10 минут (электронный полис)',
    price_conditions: 'от 2500 ₽'
  },
  'loans': {
    title: 'Быстрые займы',
    slug: 'loans',
    service_type: 'finance',
    short_description: 'Финансовая поддержка при срочной необходимости.',
    full_description: 'Микрозаймы для граждан СНГ на прозрачных условиях от надежных партнеров.',
    documents_required: 'Паспорт\nТрудовой договор (иногда)',
    processing_time: '30 минут',
    price_conditions: 'Индивидуально',
    is_partner_service: true
  },
  'transfers': {
    title: 'Денежные переводы',
    slug: 'transfers',
    service_type: 'finance',
    short_description: 'Удобные способы перевода денег в СНГ.',
    full_description: 'Сервисы для быстрой и выгодной отправки денег семье без больших комиссий.',
    documents_required: 'Банковская карта\nПаспорт',
    processing_time: 'Мгновенно',
    price_conditions: 'Комиссия от 0%'
  }
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let service = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${slug}/`, {
      cache: 'no-store'
    });
    if (res.ok) {
      service = await res.json();
    }
  } catch (error) {
    console.error("Ошибка SSR загрузки услуги:", error);
  }

  // Если бэкенд не вернул, пробуем найти в статическом списке (для демо)
  if (!service) {
    service = FALLBACK_SERVICES[slug];
  }

  if (!service) {
    return notFound();
  }

  return <ClientServicesDetail service={service} />;
}
