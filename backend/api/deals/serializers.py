from rest_framework import serializers

from .models import Comment, Deal, Tag, Tournament


class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("name",)


class TournamentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = "__all__"


class DealsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deal
        fields = "__all__"


class CommentsSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(
        many=True, queryset=Tag.objects.all(), slug_field="name"
    )

    class Meta:
        model = Comment
        fields = "__all__"
