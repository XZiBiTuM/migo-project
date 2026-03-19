from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils.html import strip_tags
from .models import News

@receiver(pre_save, sender=News)
def auto_fill_news_fields(sender, instance, **kwargs):
    if not instance.lead and instance.content:
        clean_text = strip_tags(instance.content)
        instance.lead = clean_text[:157] + '...' if len(clean_text) > 160 else clean_text

    if not instance.cover_image:
        default_images = {
            'documents': 'default_covers/docs.jpg',
            'work': 'default_covers/work.jpg',
            'housing': 'default_covers/housing.jpg',
            'laws': 'default_covers/laws.jpg',
            'important': 'default_covers/important.jpg',
            'stories': 'default_covers/stories.jpg',
        }
        instance.cover_image = default_images.get(instance.category, 'default_covers/default.jpg')