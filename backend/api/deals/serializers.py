from rest_framework import serializers

from .models import Comment, Deal, Tag, Tournament


class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class TournamentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = "__all__"


class DealsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deal
        fields = "__all__"


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
