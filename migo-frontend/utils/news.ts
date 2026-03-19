export const NEWS_CATEGORIES: Record<string, string> = {
  'documents': 'Документы',
  'work': 'Работа',
  'housing': 'Жильё',
  'laws': 'Законы',
  'important': 'Важно',
  'stories': 'Истории',
};

export function getCategoryLabel(category: string): string {
  return NEWS_CATEGORIES[category] || category || 'Важное';
}
