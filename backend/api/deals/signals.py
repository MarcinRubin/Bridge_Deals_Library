from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Deal


@receiver(post_save, sender=Deal)
def create_comment(sender, instance, created, **kwargs):
    if created:
        print("receiver obtained signal")
        print(kwargs)
        # Comment.objects.create(deal=instance)
