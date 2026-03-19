from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NewsViewSet, VacancyViewSet, ServiceItemViewSet, LeadViewSet, UserViewSet, StatsView

router = DefaultRouter()
router.register(r'news', NewsViewSet, basename='news')
router.register(r'vacancies', VacancyViewSet, basename='vacancies')
router.register(r'services', ServiceItemViewSet, basename='services')
router.register(r'leads', LeadViewSet, basename='leads')
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/stats/', StatsView.as_view(), name='stats'),
]