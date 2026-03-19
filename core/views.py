from rest_framework import viewsets, mixins, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from django.db.models import Count
from .models import News, Vacancy, ServiceItem, Lead, User
from .serializers import NewsSerializer, VacancySerializer, ServiceItemSerializer, LeadSerializer, UserSerializer
from .permissions import IsAdmin, IsEditor, IsModerator


class LeadViewSet(mixins.CreateModelMixin, 
                  mixins.ListModelMixin, 
                  mixins.RetrieveModelMixin, 
                  viewsets.GenericViewSet):
    """
    Заявки с сайта. 
    """
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    def get_throttles(self):
        if self.action == 'create':
            # Ограничиваем только создание заявок (защита от спама)
            self.throttle_scope = 'forms'
            return [ScopedRateThrottle()]
        return []

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [IsModerator()]

    @action(detail=True, methods=['post'], permission_classes=[IsModerator])
    def process(self, request, pk=None):
        lead = self.get_object()
        lead.is_processed = True
        lead.save()
        return Response({'status': 'lead marked as processed'})


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Просмотр команды (только для админов).
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]


class StatsView(APIView):
    """
    Статистика для дашборда.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        data = {
            'news': News.objects.count(),
            'leads': Lead.objects.count(),
            'unprocessed': Lead.objects.filter(is_processed=False).count(),
            'users': User.objects.count(),
        }
        return Response(data)


class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    lookup_field = 'slug'

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [IsEditor()]

    def get_queryset(self):
        qs = super().get_queryset()
        if not (self.request.user and self.request.user.is_authenticated and 
                self.request.user.role in ['admin', 'editor']):
            return qs.filter(status=News.Status.PUBLISHED)
        return qs

    @action(detail=True, methods=['post'], permission_classes=[IsAdmin])
    def publish(self, request, slug=None):
        news_item = self.get_object()
        news_item.status = News.Status.PUBLISHED
        news_item.save()
        return Response({'status': 'published'})


class VacancyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Vacancy.objects.filter(is_active=True)
    serializer_class = VacancySerializer
    lookup_field = 'slug'
    permission_classes = [permissions.AllowAny]


class ServiceItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceItem.objects.filter(is_active=True)
    serializer_class = ServiceItemSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.AllowAny]