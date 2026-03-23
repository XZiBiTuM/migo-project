from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import News, ServiceItem, Lead

class ApiSmokeTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Create a sample news item
        self.news = News.objects.create(
            title="Тестовая новость",
            slug="test-news",
            content="Содержимое новости",
            category=News.Category.DOCUMENTS,
            status=News.Status.PUBLISHED
        )

    def test_news_list(self):
        """Проверка получения списка новостей"""
        response = self.client.get('/api/news/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Проверяем что новость в списке (может быть вложена в results если есть пагинация)
        data = response.json()
        if isinstance(data, dict) and 'results' in data:
            data = data['results']
        self.assertTrue(any(item['slug'] == 'test-news' for item in data))

    def test_lead_creation(self):
        """Проверка создания заявки (лида)"""
        payload = {
            "name": "Иван Тестов",
            "phone": "+79991234567",
            "citizenship": "Узбекистан",
            "city": "Москва",
            "lead_type": Lead.LeadType.JOB,
            "consent_given": True
        }
        response = self.client.post('/api/leads/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Lead.objects.count(), 1)

    def test_lead_validation_no_consent(self):
        """Проверка что заявка не создается без согласия"""
        payload = {
            "name": "Иван Тестов",
            "phone": "+79991234567",
            "consent_given": False
        }
        response = self.client.post('/api/leads/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
