from rest_framework import serializers
from .models import News, Vacancy, ServiceItem, Lead, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'role', 'email', 'is_active', 'last_login']

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = [
            'id', 'title', 'slug', 'lead', 'content', 'category', 'language',
            'cover_image', 'show_question_btn', 'show_consult_btn', 'status',
            'published_at', 'source', 'external_id', 'meta_title', 'meta_description'
        ]

class VacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = [
            'id', 'title', 'slug', 'city', 'salary', 'schedule',
            'housing_provided', 'meals_provided', 'docs_included',
            'description', 'requirements', 'conditions', 'is_active'
        ]

class ServiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceItem
        fields = '__all__'


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = '__all__'

    def validate_consent_given(self, value):
        if not value:
            raise serializers.ValidationError("Обязательное согласие на обработку персональных данных.")
        return value