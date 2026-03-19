from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import *


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'lead_type', 'city', 'is_processed', 'created_at')
    list_filter = ('is_processed', 'lead_type', 'citizenship', 'city')
    search_fields = ('name', 'phone', 'comment')
    readonly_fields = ('created_at', 'utm_source', 'utm_medium', 'utm_campaign', 'consent_given')

    def has_module_permission(self, request):
        if not request.user.is_authenticated: return False
        return request.user.role in [User.Role.ADMIN, User.Role.MODERATOR]

    actions = ['make_processed']

    @admin.action(description='Массово: Отметить как обработанные')
    def make_processed(self, request, queryset):
        queryset.update(is_processed=True)


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = ('title', 'city', 'salary', 'schedule', 'is_active', 'created_at')
    list_filter = ('is_active', 'city', 'housing_provided', 'docs_included')
    search_fields = ('title', 'city', 'description', 'requirements')
    prepopulated_fields = {'slug': ('title',)}

    def has_module_permission(self, request):
        if not request.user.is_authenticated: return False
        return request.user.role in [User.Role.ADMIN, User.Role.EDITOR]

    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'city', 'is_active')
        }),
        ('Условия работы', {
            'fields': ('salary', 'schedule')
        }),
        ('Дополнительные опции', {
            'fields': ('housing_provided', 'meals_provided', 'docs_included')
        }),
        ('Текстовые описания', {
            'fields': ('description', 'requirements', 'conditions')
        }),
    )

    actions = ['make_active', 'make_archived']

    @admin.action(description='Массово: Активировать вакансии')
    def make_active(self, request, queryset):
        queryset.update(is_active=True)

    @admin.action(description='Массово: Отправить в архив')
    def make_archived(self, request, queryset):
        queryset.update(is_active=False)


@admin.register(ServiceItem)
class ServiceItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'service_type', 'is_partner_service', 'is_active')
    list_filter = ('service_type', 'is_active', 'is_partner_service')
    search_fields = ('title', 'short_description', 'full_description')
    prepopulated_fields = {'slug': ('title',)}

    def has_module_permission(self, request):
        if not request.user.is_authenticated: return False
        return request.user.role in [User.Role.ADMIN, User.Role.EDITOR]

    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'service_type', 'is_active')
        }),
        ('Описания', {
            'fields': ('short_description', 'full_description')
        }),
        ('Условия и сроки', {
            'fields': ('documents_required', 'processing_time', 'price_conditions')
        }),
        ('Юридические настройки', {
            'fields': ('is_partner_service',)
        }),
    )


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'role', 'is_staff')
    list_filter = ('role', 'is_staff', 'is_active')
    search_fields = ('username', 'first_name', 'last_name', 'email')

    def has_module_permission(self, request):
        if not request.user.is_authenticated: return False
        return request.user.role == User.Role.ADMIN


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'language', 'status', 'published_at', 'author')
    list_filter = ('status', 'category', 'language', 'author', 'source')
    search_fields = ('title', 'lead', 'content', 'external_id')
    prepopulated_fields = {'slug': ('title',)}

    def has_module_permission(self, request):
        if not request.user.is_authenticated: return False
        return request.user.role in [User.Role.ADMIN, User.Role.EDITOR, User.Role.REVIEWER]

    def has_change_permission(self, request, obj=None):
        if not request.user.is_authenticated: return False
        if request.user.role == User.Role.ADMIN: return True
        # Reviewer может только просматривать или менять статус, но не сам текст (опционально)
        if request.user.role == User.Role.REVIEWER: return True 
        return request.user.role == User.Role.EDITOR

    fieldsets = (
        (_('Основной контент (Обязательно)'), {
            'fields': ('title', 'slug', 'category', 'language', 'content', 'cover_image')
        }),
        (_('Дополнительный контент (Опционально)'), {
            'classes': ('collapse',),
            'fields': ('lead',)
        }),
        (_('Кнопки CTA (Внизу новости)'), {
            'fields': ('show_question_btn', 'show_consult_btn')
        }),
        (_('Статус и Публикация'), {
            'fields': ('status', 'published_at', 'author')
        }),
        (_('SEO Настройки'), {
            'classes': ('collapse',),
            'fields': ('meta_title', 'meta_description')
        }),
        (_('API и Бот-интеграция (Техническое)'), {
            'classes': ('collapse',),
            'fields': ('source', 'external_id')
        }),
    )

    def save_model(self, request, obj, form, change):
        if not getattr(obj, 'author', None):
            obj.author = request.user
        super().save_model(request, obj, form, change)

    actions = ['make_published', 'make_draft']

    @admin.action(description=_('Массово: Опубликовать выбранные'))
    def make_published(self, request, queryset):
        queryset.update(status=News.Status.PUBLISHED)

    @admin.action(description=_('Массово: Вернуть в черновики'))
    def make_draft(self, request, queryset):
        queryset.update(status=News.Status.DRAFT)