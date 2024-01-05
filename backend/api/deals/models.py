from django.core.validators import MaxValueValidator
from django.db import models
from users.models import Profile, User

from .validators import validate_deal


class Tag(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}"


class Tournament(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField()
    series = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}"


class Deal(models.Model):
    name = models.CharField(max_length=100, unique=True)
    tournament = models.ForeignKey(
        Tournament, on_delete=models.CASCADE, blank=True, null=True
    )
    deal_info = models.JSONField(validators=[validate_deal])
    result_table = models.JSONField(blank=True, null=True)
    trick_table = models.JSONField(blank=True, null=True)
    author = models.ForeignKey(
        Profile, on_delete=models.CASCADE, blank=False, null=False, related_name="deals"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    visibility = models.BooleanField()


class Comment(models.Model):
    body = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    visibility = models.BooleanField(default=True)
    difficulty = models.IntegerField(
        blank=True, null=True, validators=[MaxValueValidator(5)]
    )
    author = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
        related_name="comments",
    )
    deal = models.ForeignKey(
        Deal, on_delete=models.CASCADE, blank=False, null=False, related_name="comments"
    )
    directory = models.CharField(max_length=100, default="other")
    tags = models.ManyToManyField(Tag, related_name="comments", blank=True)
