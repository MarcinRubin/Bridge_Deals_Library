from django.db import models
from users.models import User


class Tag(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}"


class Tournament(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField()
    series = models.CharField()

    def __str__(self):
        return f"{self.name}"


class Deal(models.Model):
    name = models.CharField(max_length=100)
    tournament = models.ForeignKey(
        Tournament, on_delete=models.CASCADE, blank=True, null=True
    )
    deal_info = models.JSONField(blank=True, null=True)
    result_table = models.JSONField(blank=True, null=True)
    trick_table = models.JSONField(blank=True, null=True)


class Comment(models.Model):
    body = models.TextField(blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    visibility = models.BooleanField(default=True)
    difficulty = models.IntegerField(blank=False, null=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    deal = models.ForeignKey(
        Deal, on_delete=models.CASCADE, blank=False, null=False, related_name="comments"
    )
    tag = models.ManyToManyField(Tag)
