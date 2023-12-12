from django.db.models import Avg, Count
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
    author = serializers.SlugRelatedField(read_only=True, slug_field="username")

    class Meta:
        model = Deal
        fields = "__all__"


class DealsSerializerGeneral(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(read_only=True, slug_field="username")
    avg_difficulty = serializers.SerializerMethodField(read_only=True)
    most_popular_tags = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.DateTimeField(format="%d %B %Y")

    class Meta:
        model = Deal
        fields = (
            "id",
            "name",
            "tournament",
            "deal_info",
            "author",
            "created_at",
            "avg_difficulty",
            "most_popular_tags",
        )

    def get_avg_difficulty(self, obj):
        return list(obj.comments.aggregate(Avg("difficulty")).values())[0]

    def get_most_popular_tags(self, obj):
        return (
            obj.comments.values("tags__name")
            .annotate(count=Count("tags__name"))
            .order_by("-count")[:3]
            .values_list("tags__name", flat=True)
        )


class CommentsSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(read_only=True, slug_field="username")
    tags = serializers.SlugRelatedField(
        many=True, queryset=Tag.objects.all(), slug_field="name"
    )
    deal = DealsSerializer()

    class Meta:
        model = Comment
        fields = "__all__"

    def create(self, validated_data):
        deal_data = validated_data.pop("deal")
        deal = Deal.objects.create(**deal_data)
        validated_data.update({"deal": deal})
        return super().create(validated_data)
