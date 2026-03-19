from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'admin', _('Admin (Админ)')
        EDITOR = 'editor', _('Editor (Контент)')
        MODERATOR = 'moderator', _('Moderator (Заявки)')
        REVIEWER = 'reviewer', _('Reviewer (Юрист)')
        VIEWER = 'viewer', _('Viewer (Просмотр)')

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.VIEWER,
        verbose_name=_('Роль пользователя')
    )

    class Meta:
        verbose_name = _('Пользователь')
        verbose_name_plural = _('Пользователи')

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


class News(models.Model):
    class Category(models.TextChoices):
        DOCUMENTS = 'documents', _('Документы')
        WORK = 'work', _('Работа')
        HOUSING = 'housing', _('Жильё')
        LAWS = 'laws', _('Законы')
        IMPORTANT = 'important', _('Важно')
        STORIES = 'stories', _('Истории')

    class Language(models.TextChoices):
        RU = 'ru', _('Русский')
        UZ = 'uz', _('O‘zbekcha')
        TG = 'tg', _('Тоҷикӣ')
        KG = 'kg', _('Кыргызча')
        KZ = 'kz', _('Қазақша')

    class Status(models.TextChoices):
        DRAFT = 'draft', _('Черновик')
        REVIEW = 'review', _('На проверке')
        PUBLISHED = 'published', _('Опубликовано')
        ARCHIVED = 'archive', _('Архив')

    # Основной контент
    title = models.CharField(max_length=255, verbose_name=_('Заголовок'))
    slug = models.SlugField(max_length=255, unique=True, verbose_name=_('URL (ЧПУ)'))
    lead = models.TextField(blank=True, verbose_name=_('Короткое описание (Анонс)'), help_text=_('Если пусто — сгенерируется из текста'))
    content = models.TextField(verbose_name=_('Текст новости'))
    category = models.CharField(max_length=20, choices=Category.choices, verbose_name=_('Тег/Категория'))
    language = models.CharField(max_length=5, choices=Language.choices, default=Language.RU, verbose_name=_('Язык'))
    cover_image = models.ImageField(upload_to='news_covers/%Y/%m/', blank=True, null=True, verbose_name=_('Обложка'))

    show_question_btn = models.BooleanField(default=False, verbose_name=_('Кнопка "Задать вопрос в Telegram"'))
    show_consult_btn = models.BooleanField(default=False, verbose_name=_('Кнопка "Получить консультацию"'))

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT, verbose_name=_('Статус публикации'))
    published_at = models.DateTimeField(default=timezone.now, verbose_name=_('Дата публикации'), help_text=_('Можно запланировать на будущее'))
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='news', verbose_name=_('Автор/Редактор'))

    source = models.CharField(max_length=50, blank=True, verbose_name=_('Источник'), help_text=_('Например: telegram_bot'))
    external_id = models.CharField(max_length=100, blank=True, verbose_name=_('ID внешнего поста (Telegram/VK)'))

    meta_title = models.CharField(max_length=255, blank=True, verbose_name=_('SEO Заголовок (Title)'))
    meta_description = models.TextField(blank=True, verbose_name=_('SEO Описание (Description)'))

    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Создано'))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_('Обновлено'))

    class Meta:
        verbose_name = _('Новость')
        verbose_name_plural = _('Новости')
        ordering = ['-published_at']

    def __str__(self):
        return f"[{self.get_language_display()}] {self.title} - {self.get_status_display()}"


class Vacancy(models.Model):
    title = models.CharField(max_length=255, verbose_name=_('Должность'))
    slug = models.SlugField(max_length=255, unique=True, verbose_name=_('URL (ЧПУ)'))
    city = models.CharField(max_length=100, verbose_name=_('Город/Регион'))
    salary = models.CharField(max_length=100, verbose_name=_('Ставка/Доход'))
    schedule = models.CharField(max_length=100, verbose_name=_('График работы'))

    housing_provided = models.BooleanField(default=False, verbose_name=_('Жильё предоставляется'))
    meals_provided = models.BooleanField(default=False, verbose_name=_('Питание предоставляется'))
    docs_included = models.BooleanField(default=False, verbose_name=_('Документы "под ключ"'))

    description = models.TextField(verbose_name=_('Описание вакансии'))
    requirements = models.TextField(verbose_name=_('Требования'))
    conditions = models.TextField(verbose_name=_('Условия'))

    is_active = models.BooleanField(default=True, verbose_name=_('Активна'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Создано'))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_('Обновлено'))

    class Meta:
        verbose_name = _('Вакансия')
        verbose_name_plural = _('Вакансии')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.city})"


class ServiceItem(models.Model):
    class ServiceType(models.TextChoices):
        DOCS = 'docs', _('Документы')
        FINANCE = 'finance', _('Финансы и Сервисы')
        HOUSING = 'housing', _('Жильё')

    title = models.CharField(max_length=255, verbose_name=_('Название услуги'))
    slug = models.SlugField(max_length=255, unique=True, verbose_name=_('URL (ЧПУ)'))
    service_type = models.CharField(max_length=20, choices=ServiceType.choices, verbose_name=_('Тип услуги'))

    short_description = models.CharField(max_length=255, verbose_name=_('Краткое описание (для карточки)'))
    full_description = models.TextField(verbose_name=_('Кому это нужно и что это'))
    documents_required = models.TextField(blank=True, verbose_name=_('Какие документы нужны'))
    processing_time = models.CharField(max_length=100, blank=True, verbose_name=_('Сроки'))
    price_conditions = models.CharField(max_length=255, blank=True, verbose_name=_('Стоимость/Условия'))

    is_partner_service = models.BooleanField(default=False, verbose_name=_('Партнёрский сервис (дисклеймер)'))
    is_active = models.BooleanField(default=True, verbose_name=_('Активна'))

    class Meta:
        verbose_name = _('Услуга/Сервис')
        verbose_name_plural = _('Услуги и Сервисы')

    def __str__(self):
        return self.title


class Lead(models.Model):
    class LeadType(models.TextChoices):
        JOB = 'job', _('Отклик на вакансию')
        HOUSING = 'housing', _('Подобрать жильё')
        SERVICE = 'service', _('Оформить документ/сервис')

    lead_type = models.CharField(max_length=20, choices=LeadType.choices, verbose_name=_('Тип заявки'))
    name = models.CharField(max_length=100, verbose_name=_('Имя'))
    phone = models.CharField(max_length=20, verbose_name=_('Телефон'))
    citizenship = models.CharField(max_length=100, verbose_name=_('Гражданство'))
    city = models.CharField(max_length=100, verbose_name=_('Город'))
    comment = models.TextField(blank=True, verbose_name=_('Комментарий'))
    telegram_id = models.CharField(max_length=100, blank=True, null=True, verbose_name=_('Telegram ID'))
    consent_given = models.BooleanField(default=False, verbose_name=_('Согласие на обработку ПДн'))

    is_processed = models.BooleanField(default=False, verbose_name=_('Обработано модератором'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Дата заявки'))

    utm_source = models.CharField(max_length=100, blank=True, verbose_name='UTM Source')
    utm_medium = models.CharField(max_length=100, blank=True, verbose_name='UTM Medium')
    utm_campaign = models.CharField(max_length=100, blank=True, verbose_name='UTM Campaign')

    class Meta:
        verbose_name = _('Лид / Заявка')
        verbose_name_plural = _('Лиды / Заявки')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.get_lead_type_display()} ({self.phone})"