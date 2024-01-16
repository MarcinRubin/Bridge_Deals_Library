from rest_framework import serializers
from users.models import Profile

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
    author = serializers.SlugRelatedField(
        slug_field="username", queryset=Profile.objects.all()
    )
    tournament = serializers.SlugRelatedField(slug_field="name", read_only=True)

    class Meta:
        model = Deal
        fields = "__all__"


class CommentsSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(
        many=True, slug_field="name", queryset=Tag.objects.all()
    )
    deal = DealsSerializer()
    author = serializers.SlugRelatedField(
        slug_field="username", queryset=Profile.objects.all()
    )

    class Meta:
        model = Comment
        fields = "__all__"

    def create(self, validated_data):
        deal_data = validated_data.pop("deal")
        deal_instance = Deal.objects.create(**deal_data)
        validated_data.update({"deal": deal_instance})
        return super().create(validated_data)
